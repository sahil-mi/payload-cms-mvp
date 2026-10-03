import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_meta_schema_type" AS ENUM('WebPage', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TYPE "public"."enum__pages_v_version_meta_schema_type" AS ENUM('WebPage', 'AboutPage', 'ContactPage', 'CollectionPage');
  ALTER TABLE "pages" ADD COLUMN "meta_og_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_og_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_canonical_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_no_index" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "meta_no_follow" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "meta_schema_type" "enum_pages_meta_schema_type" DEFAULT 'WebPage';
  ALTER TABLE "pages" ADD COLUMN "meta_json_ld" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_og_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_og_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_canonical_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_no_index" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_no_follow" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_schema_type" "enum__pages_v_version_meta_schema_type" DEFAULT 'WebPage';
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_json_ld" jsonb;
  ALTER TABLE "posts" ADD COLUMN "meta_og_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_og_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_canonical_url" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_no_index" boolean DEFAULT false;
  ALTER TABLE "posts" ADD COLUMN "meta_no_follow" boolean DEFAULT false;
  ALTER TABLE "posts" ADD COLUMN "meta_json_ld" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_og_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_og_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_canonical_url" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_no_index" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_no_follow" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_json_ld" jsonb;
  ALTER TABLE "projects" ADD COLUMN "meta_og_title" varchar;
  ALTER TABLE "projects" ADD COLUMN "meta_og_description" varchar;
  ALTER TABLE "projects" ADD COLUMN "meta_canonical_url" varchar;
  ALTER TABLE "projects" ADD COLUMN "meta_no_index" boolean DEFAULT false;
  ALTER TABLE "projects" ADD COLUMN "meta_no_follow" boolean DEFAULT false;
  ALTER TABLE "projects" ADD COLUMN "meta_json_ld" jsonb;
  ALTER TABLE "_projects_v" ADD COLUMN "version_meta_og_title" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_meta_og_description" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_meta_canonical_url" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_meta_no_index" boolean DEFAULT false;
  ALTER TABLE "_projects_v" ADD COLUMN "version_meta_no_follow" boolean DEFAULT false;
  ALTER TABLE "_projects_v" ADD COLUMN "version_meta_json_ld" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "meta_og_title";
  ALTER TABLE "pages" DROP COLUMN "meta_og_description";
  ALTER TABLE "pages" DROP COLUMN "meta_canonical_url";
  ALTER TABLE "pages" DROP COLUMN "meta_no_index";
  ALTER TABLE "pages" DROP COLUMN "meta_no_follow";
  ALTER TABLE "pages" DROP COLUMN "meta_schema_type";
  ALTER TABLE "pages" DROP COLUMN "meta_json_ld";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_og_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_og_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_canonical_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_no_index";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_no_follow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_schema_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_json_ld";
  ALTER TABLE "posts" DROP COLUMN "meta_og_title";
  ALTER TABLE "posts" DROP COLUMN "meta_og_description";
  ALTER TABLE "posts" DROP COLUMN "meta_canonical_url";
  ALTER TABLE "posts" DROP COLUMN "meta_no_index";
  ALTER TABLE "posts" DROP COLUMN "meta_no_follow";
  ALTER TABLE "posts" DROP COLUMN "meta_json_ld";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_og_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_og_description";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_canonical_url";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_no_index";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_no_follow";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_json_ld";
  ALTER TABLE "projects" DROP COLUMN "meta_og_title";
  ALTER TABLE "projects" DROP COLUMN "meta_og_description";
  ALTER TABLE "projects" DROP COLUMN "meta_canonical_url";
  ALTER TABLE "projects" DROP COLUMN "meta_no_index";
  ALTER TABLE "projects" DROP COLUMN "meta_no_follow";
  ALTER TABLE "projects" DROP COLUMN "meta_json_ld";
  ALTER TABLE "_projects_v" DROP COLUMN "version_meta_og_title";
  ALTER TABLE "_projects_v" DROP COLUMN "version_meta_og_description";
  ALTER TABLE "_projects_v" DROP COLUMN "version_meta_canonical_url";
  ALTER TABLE "_projects_v" DROP COLUMN "version_meta_no_index";
  ALTER TABLE "_projects_v" DROP COLUMN "version_meta_no_follow";
  ALTER TABLE "_projects_v" DROP COLUMN "version_meta_json_ld";
  DROP TYPE "public"."enum_pages_meta_schema_type";
  DROP TYPE "public"."enum__pages_v_version_meta_schema_type";`)
}
