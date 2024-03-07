"use client"; // This is a client component 👈🏽

import CustomInput from "@/components/auth/input/CustomInput";
import Sidebar from "@/components/auth/sidebar/Sidebar";
import CustomButton from "@/components/button/CustomButton";
import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "../auth.module.scss";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase/supabase";

const signin = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setAlert({ msg: error.message, type: "error" });
    setLoading(false);
    if (data.session) push("/menu/categories");
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
          placeholder={"Sales ID"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <CustomInput
          placeholder={"Password"}
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

export default signin;
