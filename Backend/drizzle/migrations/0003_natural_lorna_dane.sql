ALTER TABLE "submission" DROP CONSTRAINT "submission_tid_test_tid_fk";
--> statement-breakpoint
ALTER TABLE "submission" DROP CONSTRAINT "submission_uid_user_uid_fk";
--> statement-breakpoint
ALTER TABLE "submission" ADD COLUMN "tmid" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_tmid_testManager_tmid_fk" FOREIGN KEY ("tmid") REFERENCES "public"."testManager"("tmid") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "submission" DROP COLUMN IF EXISTS "tid";--> statement-breakpoint
ALTER TABLE "submission" DROP COLUMN IF EXISTS "uid";