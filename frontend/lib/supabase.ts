import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials are not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env.local file.");
    }

    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  }

  return supabaseInstance;
}

export const supabase = {
  get client() {
    return getSupabaseClient();
  }
};

export async function uploadFile(file: File, bucket: string = "id proof"): Promise<string> {
  const client = getSupabaseClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  console.log("Attempting to upload to bucket:", bucket);
  console.log("File name:", fileName);
  console.log("Supabase URL:", process.env.SUPABASE_URL);
  
  // List buckets to debug
  const { data: buckets, error: bucketsError } = await client.storage.listBuckets();
  console.log("Available buckets:", buckets);
  if (bucketsError) {
    console.error("Error listing buckets:", bucketsError);
  }
  
  const { data, error } = await client.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error details:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }

  console.log("Upload successful:", data);

  const { data: urlData } = client.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}
