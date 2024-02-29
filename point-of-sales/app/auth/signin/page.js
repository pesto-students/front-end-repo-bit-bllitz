import CustomInput from "@/components/auth/input/CustomInput";
import Sidebar from "@/components/auth/sidebar/Sidebar";
import CustomButton from "@/components/button/CustomButton";
import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "../auth.module.scss"
import React from "react";

const signin = () => {
  return (
    <div>
      <Sidebar
        title={"Welcome Back!"}
        subtitle={"Please, sign in to continue"}
        actionText={"Don’t have an account?"}
        linkText={"Go to registration"}
        navigateLink={"/auth/signup"}
      >
        <CustomInput placeholder={"Sales ID"} />
        <CustomInput placeholder={"Password"} />
        <CustomButton text={"Sign in"} />
        <Typography variant="body1" className={styles.link}>
          <Link href={"/auth/reset"}>Forgot Password?</Link>
        </Typography>
      </Sidebar>
    </div>
  );
};

export default signin;
