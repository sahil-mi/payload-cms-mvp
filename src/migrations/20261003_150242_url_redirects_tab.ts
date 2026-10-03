import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_old_urls" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "_pages_v_version_old_urls" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "path" varchar;
  ALTER TABLE "pages" ADD COLUMN "last_published_path" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_path" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_last_published_path" varchar;
  ALTER TABLE "redirects" ADD COLUMN "managed_key" varchar;
  ALTER TABLE "pages_old_urls" ADD CONSTRAINT "pages_old_urls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_old_urls" ADD CONSTRAINT "_pages_v_version_old_urls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_old_urls_order_idx" ON "pages_old_urls" USING btree ("_order");
  CREATE INDEX "pages_old_urls_parent_id_idx" ON "pages_old_urls" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_old_urls_order_idx" ON "_pages_v_version_old_urls" USING btree ("_order");
  CREATE INDEX "_pages_v_version_old_urls_parent_id_idx" ON "_pages_v_version_old_urls" USING btree ("_parent_id");
  CREATE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "redirects_managed_key_idx" ON "redirects" USING btree ("managed_key");`)

  // Backfill: every existing page gets its current URL; published pages also record it as the
  // last published URL, so the first slug change after this migration creates its redirect
  await db.execute(sql`
   UPDATE "pages" SET "path" = CASE WHEN "slug" = 'home' THEN '/' ELSE '/' || "slug" END WHERE "slug" IS NOT NULL;
  UPDATE "pages" SET "last_published_path" = "path" WHERE "_status" = 'published';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_old_urls" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_old_urls" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_old_urls" CASCADE;
  DROP TABLE "_pages_v_version_old_urls" CASCADE;
  DROP INDEX "pages_path_idx";
  DROP INDEX "_pages_v_version_version_path_idx";
  DROP INDEX "redirects_managed_key_idx";
  ALTER TABLE "pages" DROP COLUMN "path";
  ALTER TABLE "pages" DROP COLUMN "last_published_path";
  ALTER TABLE "_pages_v" DROP COLUMN "version_path";
  ALTER TABLE "_pages_v" DROP COLUMN "version_last_published_path";
  ALTER TABLE "redirects" DROP COLUMN "managed_key";`)
}
