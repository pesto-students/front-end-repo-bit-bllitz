"use client"; // This is a client component 👈🏽

import CustomInput from "@/components/auth/input/CustomInput";
import Sidebar from "@/components/auth/sidebar/Sidebar";
import CustomButton from "@/components/button/CustomButton";
import { Snackbar, Typography } from "@mui/material";
import Link from "next/link";
import styles from "../auth.module.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../../../supabase/supabase";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/lib/redux/slices/userSlice";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, msg: " " });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const userState = useSelector((state) => state.auth);
  const { user = {} } = userState;
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      router.push("/dashboard");
    }
  }, []);
  const dispatch = useDispatch();
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email.length < 4 || password.length < 4) {
      return alert("PLease enter a valid email and password");
    }
    try {
      const { data: dataSupabase, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (error) {
        console.log(error.message, "error in signin");
        setError("Sorry! something went wrong.");
        setLoading(false);
        setToast({
          visible: true,
          msg: error.message,
        });
      } else {
        setLoading(true);

        // if (dataSupabase)
        if (dataSupabase) {
          router.push("/dashboard");
          console.log("in supabase");
          router.refresh();

          dispatch(setUserData(dataSupabase.user));
          const { user, session } = dataSupabase;
          console.log("user in signin supabase", user);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Ensure loading is set to false in the finally block
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
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={toast.visible}
            onClose={() => setToast({ visible: false, msg: "" })}
            message={toast.msg}
          />
        </div>
      )}
    </>
  );
};

export default Signin;
