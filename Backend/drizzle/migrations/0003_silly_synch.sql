ALTER TABLE "submission" ADD COLUMN "ai_explanation" text;--> statement-breakpoint
ALTER TABLE "questionBank" DROP COLUMN IF EXISTS "ai_explanation";