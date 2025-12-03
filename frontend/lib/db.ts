import { supabase } from "./supabase";

export interface EmployerVerification {
  id?: string;
  fullName: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  roleHiringFor: string;
  salaryRange: string;
  jobLocation: string;
  token: string;
  isVerified: boolean;
  idProofUrl?: string;
  createdAt?: string;
}

export async function createEmployerVerification(data: Omit<EmployerVerification, "id" | "isVerified" | "createdAt">): Promise<EmployerVerification> {
  try {
    const insertData = {
      ...data,
      isVerified: false,
    };

    console.log("Attempting to insert data:", insertData);

    const { data: result, error } = await supabase.client
      .from("EmployerVerification")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("Database error details:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    if (!result) {
      throw new Error("No data returned from database insert");
    }

    console.log("Successfully inserted data:", result);
    return result;
  } catch (err: any) {
    console.error("Exception in createEmployerVerification:", err);
    throw err;
  }
}

export async function getEmployerByToken(token: string): Promise<EmployerVerification | null> {
  const { data, error } = await supabase.client
    .from("EmployerVerification")
    .select("*")
    .eq("token", token)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function updateEmployerVerification(
  token: string,
  updates: Partial<EmployerVerification>
): Promise<void> {
  const { error } = await supabase.client
    .from("EmployerVerification")
    .update(updates)
    .eq("token", token);

  if (error) {
    throw new Error(`Update failed: ${error.message}`);
  }
}

export async function getAllEmployers(): Promise<EmployerVerification[]> {
  const { data, error } = await supabase.client
    .from("EmployerVerification")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }

  return data || [];
}
