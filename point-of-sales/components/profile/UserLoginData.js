import React, { useEffect, useState } from "react";
import styles from "../../app/profile/profile.module.scss";
import { Grid, Typography } from "@mui/material";
import CustomInput from "../auth/input/CustomInput";
import KeyIcon from "@mui/icons-material/Key";
import CustomButton from "../button/CustomButton";
import { supabase } from "../../supabase/supabase";
const UserLoginData = ({ userEmail, userId }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value, "nameval");
    setEmail(value); // Update state with the new value
  };
  return (
    <div>
      <Typography variant="h5" className={styles.infoCopy}>
        Login & Password
      </Typography>
      <Grid container className={styles.loginForm}>
        <Grid item md={5.8} sm={5}>
          <div className={styles.label}>Username</div>
          <CustomInput
            placeholder={"email"}
            inputName={"email"}
            onChange={handleChange}
            height={"2rem"}
            value={userEmail}
          />
        </Grid>
        <Grid item md={0.4} sm={1} />
        <Grid item md={5.8} sm={5}>
          <div className={styles.label}>Your sales ID number</div>
          <CustomInput
            placeholder={"sales-id"}
            inputName={"salesId"}
            onChange={handleChange}
            height={"2rem"}
            value={userId}
          />
        </Grid>
        <Grid item md={5.8} sm={5}>
          <div className={styles.label}>Password</div>
          <CustomInput
            placeholder={"password"}
            inputName={"password"}
            onChange={handleChange}
            height={"2rem"}
          />
        </Grid>
        <Grid item md={0.4} />
        <Grid item md={5.8} sm={5} className={styles.changePass}>
          <Typography variant="body2" className={styles.copy}>
            <KeyIcon /> Change Password
          </Typography>
        </Grid>
      </Grid>
      <CustomButton text={"Save changes"} />
    </div>
  );
};

export default UserLoginData;
