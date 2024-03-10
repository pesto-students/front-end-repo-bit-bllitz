"use client"; // This is a client component 👈🏽
import CustomInput from "@/components/auth/input/CustomInput";
import Sidebar from "@/components/auth/sidebar/Sidebar";
import CustomButton from "@/components/button/CustomButton";
import { Typography } from "@mui/material";
import styles from "../auth.module.scss";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/lib/redux/slices/userSlice";
import { supabase } from "../../../supabase/supabase";
import { useRouter } from "next/navigation";
const signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [user, setUser] = useState(undefined);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleUserData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      console.log(error.message);
    } else {
      setUser(data);
    }
  };

  return (
    <div className={styles.signup}>
      <Sidebar
        title={"Welcome!"}
        subtitle={"Please, sign up to continue"}
        actionText={
          user
            ? "Success! Please check your email for further instructions "
            : "Already have an account?"
        }
        linkText={user ? "" : "Go to Login"}
        navigateLink={"/auth/signin"}
      >
        <CustomInput
          placeholder={"Fullname"}
          onChange={handleUserData}
          inputName={"fullName"}
        />
        <CustomInput
          placeholder={"Email"}
          onChange={handleUserData}
          inputName={"email"}
        />
        <CustomInput
          placeholder={"Password"}
          onChange={handleUserData}
          inputName={"password"}
        />
        <CustomInput
          placeholder={"Confirm password"}
          onChange={handleUserData}
          inputName={"confirmPassword"}
        />
        <CustomButton text={"Sign up"} onClick={handleSignup} />
      </Sidebar>
    </div>
  );
};

export default signup;
