from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from rouge_score import rouge_scorer
import re
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

model = SentenceTransformer('paraphrase-mpnet-base-v2')

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),  
)


class EvaluationRequest(BaseModel):
    student_answer: str
    teacher_answer: str


def preprocess_text(text):
    return re.sub(r'[^\w\s]', '', text.lower())

def calculate_length_penalty(student_answer, teacher_answer):
    student_len = len(student_answer.split())
    teacher_len = len(teacher_answer.split())
    length_ratio = student_len / teacher_len

    
    if length_ratio < 0.7:
        penalty = 0.8  
    elif 0.7 <= length_ratio < 1:
        penalty = 1 - (length_ratio - 0.7) / 0.3  
    else:
        penalty = 0  

    return penalty

def generate_analysis(student_answer, teacher_answer):
    prompt = f"""
    Please provide a brief and thoughtful analysis of the student's answer in comparison to the teacher's answer.
    Highlight key differences, areas of improvement, and any strengths in the student's response.
    Keep the analysis under 50 words and be gentle in your tone.
    Do not involve any comparison based on punctuation.
    
    Student Answer: {student_answer}
    Teacher Answer: {teacher_answer}
"""

    
  
    completion = client.chat.completions.create(
        model="openai/gpt-4o-mini-2024-07-18",
        messages=[{
            "role": "user",
            "content": prompt
        }]
    )

    
    analysis = completion.choices[0].message.content
    return analysis

def evaluate_student_answer(student_answer, teacher_answer):
   
    
    teacher_answer = preprocess_text(teacher_answer)
    student_answer = preprocess_text(student_answer)

   
    teacher_embedding = model.encode(teacher_answer).tolist()
    student_embedding = model.encode(student_answer).tolist()

   
    similarity_score = cosine_similarity([student_embedding], [teacher_embedding])[0][0]

    
    scorer = rouge_scorer.RougeScorer(['rouge1', 'rougeL'], use_stemmer=True)
    rouge_scores = scorer.score(student_answer, teacher_answer)

   
    rouge1_f1 = rouge_scores['rouge1'].fmeasure
    rougeL_f1 = rouge_scores['rougeL'].fmeasure

  
    length_penalty = calculate_length_penalty(student_answer, teacher_answer)

    analysis = generate_analysis(student_answer, teacher_answer)

    similarity_weight = 0.5
    rouge_weight = 0.3
    length_penalty_weight = 0.2

    final_score = (similarity_score * similarity_weight) + \
                  ((rouge1_f1 + rougeL_f1) / 2 * rouge_weight) * \
                  (1 - length_penalty * length_penalty_weight)

    return {
        "final_score": f"{round(final_score, 2)*100}%", 
        "analysis": analysis  
    }


@app.post("/evaluate")
async def evaluate(request: EvaluationRequest):
    
    if not request.student_answer or not request.teacher_answer:
        raise HTTPException(status_code=400, detail="Both 'student_answer' and 'teacher_answer' are required.")

   
    results = evaluate_student_answer(request.student_answer, request.teacher_answer)
    return results
