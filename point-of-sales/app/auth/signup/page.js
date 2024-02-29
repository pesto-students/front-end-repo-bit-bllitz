import CustomInput from "@/components/auth/input/CustomInput";
import Sidebar from "@/components/auth/sidebar/Sidebar";
import CustomButton from "@/components/button/CustomButton";
import { Typography } from "@mui/material";
import styles from "../auth.module.scss";
import React from "react";
import Link from "next/link";

const signup = () => {
  return (
    <div className={styles.signup}>
      <Sidebar
        title={"Welcome!"}
        subtitle={"Please, sign up to continue"}
        actionText={"Already have an account?"}
        linkText={"Go to Login"}
        navigateLink={"/auth/signin"}
      >
        <CustomInput placeholder={"Fullname"} />
        <CustomInput placeholder={"Email"} />
        <CustomInput placeholder={"Password"} />
        <CustomInput placeholder={"Confirm password"} />
        <CustomButton text={"Sign up"} />
      </Sidebar>
    </div>
  );
};

export default signup;
