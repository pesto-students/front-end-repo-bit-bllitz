import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { supabase } from "../../../supabase/supabase";
export async function POST(request) {
  const { data: signIn, error: signinerror } =
    await supabase.auth.signInWithPassword({
      email: "zeenatkm301@gmail.com",
      password: "Malik@987",
    });
  console.log(signIn.session.user.id, "authId");
  const { data: userData, error } = await supabase.auth.getSession();
  console.log("sessionDataa", userData);
  console.log("sessionDataaError", error);
  try {
    const data = await request.json();
    console.log("datainuser", userData);
    const {
      gender,
      first_name,
      last_name,
      avatar_url,
      username,
      phone_number,
      date_of_birth,
      city,
      pincode,
    } = data;

    const { data: profileData, error } = await supabase
      .from("profiles")
      .update({
        gender,
        first_name,
        last_name,
        avatar_url,
        username,
        phone_number,
        date_of_birth,
        city,
        pincode,
      })
      .eq("id", userData.session.user.id)
      .select();
    if (error) {
      console.log("errr", error);
    }
    console.log("profiles", profileData);
    return NextResponse.json({
      success: true,
      data: profileData,
      message:'Profile updated successfully'
    });
  } catch (error) {
    console.log("error", error);
  }
}

