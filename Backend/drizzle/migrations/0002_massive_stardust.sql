ALTER TABLE "submission" ADD COLUMN "submittedAnswer" json;--> statement-breakpoint
ALTER TABLE "submission" DROP COLUMN IF EXISTS "answer";