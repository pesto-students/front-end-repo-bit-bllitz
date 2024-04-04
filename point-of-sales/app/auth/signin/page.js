"use client"; // This is a client component 👈🏽

import CustomInput from "@/components/auth/input/CustomInput";
import Sidebar from "@/components/auth/sidebar/Sidebar";
import CustomButton from "@/components/button/CustomButton";
import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "../auth.module.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../../../supabase/supabase";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchSession = async () => {
      const signinSession = await supabase.auth.getSession();
      console.log("signing data", signinSession);
      if (signinSession?.data?.session) {
        console.log("signin if block");
        router.push("/dashboard");
      }
    };
    fetchSession();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email.length < 4 || password.length < 4) {
      return alert("PLease enter a valid email and password");
    }
    try {
      setLoading(true);

      const { data: dataSupabase, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (error) return setError("Sorry! something went wrong.");
      console.log("data in signin supabase", dataSupabase);
      // if (dataSupabase) setLoading(false);
      if (dataSupabase) {
        router.refresh();
        router.push("/dashboard");
        const { user, session } = dataSupabase;
        console.log("user in signin supabase", user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Sidebar
        title={"Welcome Back!"}
        subtitle={"Please, sign in to continue"}
        actionText={"Don’t have an account?"}
        linkText={"Go to registration"}
        navigateLink={"/auth/signup"}
      >
        <CustomInput
          placeholder={"Email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type={"email"}
        />
        <CustomInput
          placeholder={"Password"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <CustomButton text={"Sign in"} onClick={handleSignIn} />
        <Typography variant="body1" className={styles.link}>
          <Link href={"/auth/reset"}>Forgot Password?</Link>
        </Typography>
      </Sidebar>
    </div>
  );
};

export default Signin;
