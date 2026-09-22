declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      SUPABASE_S3_ENDPOINT: string
      SUPABASE_S3_REGION: string
      SUPABASE_S3_ACCESS_KEY_ID: string
      SUPABASE_S3_SECRET_ACCESS_KEY: string
      SUPABASE_S3_BUCKET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
