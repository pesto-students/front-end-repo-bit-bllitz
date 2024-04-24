"use client"; // This is a client component 👈🏽

import CustomInput from "@/components/auth/input/CustomInput";
import Sidebar from "@/components/auth/sidebar/Sidebar";
import CustomButton from "@/components/button/CustomButton";
import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "../auth.module.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/lib/redux/slices/userSlice";
import { login } from "@/app/api/auth/actions";
import { useAppContext } from "@/context";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAppContext();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email.length < 4 || password.length < 4) {
      return alert("PLease enter a valid email and password");
    }
    try {
      setLoading(true);
      const { data, error } = await login({ email, password });
      if (error) {
        console.log("error in signin", error);
      } else {
        setUser(data.user);
        console.log(data.user,'signin data');
        router.push("/dashboard");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default Signin;
