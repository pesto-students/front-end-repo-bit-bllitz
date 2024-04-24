"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
const supabase = createClient();

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  console.log("data in user", data);
  console.log("error in user", error);
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { data: "ok", error };
};
export async function login({ email, password }) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const loginData = {
    email,
    password,
  };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  return { data, error };
}

export async function signup(formData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const signupData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data, error } = await supabase.auth.signUp(signupData);

  return { data, error };
}
