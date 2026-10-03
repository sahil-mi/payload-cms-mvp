import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_html_embed_width" AS ENUM('container', 'narrow', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_html_embed_width" AS ENUM('container', 'narrow', 'full');
  CREATE TABLE "pages_blocks_html_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"width" "enum_pages_blocks_html_embed_width" DEFAULT 'container',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_html_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"width" "enum__pages_v_blocks_html_embed_width" DEFAULT 'container',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_html_embed" ADD CONSTRAINT "pages_blocks_html_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_html_embed" ADD CONSTRAINT "_pages_v_blocks_html_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_html_embed_order_idx" ON "pages_blocks_html_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_html_embed_parent_id_idx" ON "pages_blocks_html_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_html_embed_path_idx" ON "pages_blocks_html_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_html_embed_order_idx" ON "_pages_v_blocks_html_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_html_embed_parent_id_idx" ON "_pages_v_blocks_html_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_html_embed_path_idx" ON "_pages_v_blocks_html_embed" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_html_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_html_embed" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_html_embed_width";
  DROP TYPE "public"."enum__pages_v_blocks_html_embed_width";`)
}
