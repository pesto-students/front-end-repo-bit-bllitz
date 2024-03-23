"use client"; // This is a client component 👈🏽
import CustomInput from "@/components/auth/input/CustomInput";
import Sidebar from "@/components/auth/sidebar/Sidebar";
import CustomButton from "@/components/button/CustomButton";
import { Snackbar, Typography } from "@mui/material";
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
  const [toast, setToast] = useState({ visible: false, msg: " " });
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
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setToast({ msg: "All fields are required", visible: true });
      console.log("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      setToast({ msg: "Passwords do not match", visible: true });
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setToast({
        visible: true,
        msg: error.message,
      });
      console.log("error msg", error);
    } else {
      setUser(data);
      console.log("userData", data);
      const { data: profileUpdate, error } = await supabase
        .from("profiles")
        .update("username")
        .eq("id", user.id);
      console.log("error", error);
      console.log("data", profileUpdate);
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
          type={"text"}
        />
        <CustomInput
          placeholder={"Email"}
          onChange={handleUserData}
          inputName={"email"}
          type={"email"}
        />
        <CustomInput
          placeholder={"Password"}
          onChange={handleUserData}
          inputName={"password"}
          type={"password"}
        />
        <CustomInput
          placeholder={"Confirm password"}
          onChange={handleUserData}
          inputName={"confirmPassword"}
          type={"password"}
        />
        <CustomButton text={"Sign up"} onClick={handleSignup} />
      </Sidebar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={toast.visible}
        onClose={() => setToast({ visible: false, msg: "" })}
        message={toast.msg}
      />
    </div>
  );
};

export default signup;
