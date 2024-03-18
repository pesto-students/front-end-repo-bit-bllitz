import React, { useState } from "react";
import styles from "../../app/profile/profile.module.scss";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CustomInput from "../auth/input/CustomInput";
import CustomButton from "../button/CustomButton";
import { supabase } from "../../supabase/supabase";
const PersonalInfo = ({userEmail}) => {
  
  const [formData, setFormData] = useState({
    gender: "", // Initialize gender as an empty string
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    city: "",
    pincode: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value, "nameval");
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveInfo = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      console.log("Profile updated successfully:", response);
      return response;
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    // Handle saving form data here
    // Just logging for now, you can implement saving logic
  };
  return (
    <div>
      <Typography variant="h5" className={styles.infoCopy}>
        Personal Information
      </Typography>
      <FormControl className={styles.genderContainer}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="gender"
          className={styles.row}
          value={formData.gender}
          onChange={handleChange}
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
            className={styles.gender}
          />
          <FormControlLabel
            value="male"
            className={styles.gender}
            control={<Radio />}
            label="Male"
          />
        </RadioGroup>
      </FormControl>
      <Grid container>
        <Grid item md={5.8} sm={12} xs={12}>
          <div className={styles.label}>Firstname</div>
          <CustomInput
            inputName={"first_name"}
            height={"2rem"}
            placeholder={"Firstname"}
            type={"text"}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={0.4} />
        <Grid item md={5.8} sm={12} xs={12}>
          <div className={styles.label}>Lastname</div>

          <CustomInput
            height={"2rem"}
            type={"text"}
            inputName={"last_name"}
            placeholder={"Lastname"}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <div className={styles.label}>Email</div>

        <CustomInput
          height={"2rem"}
          placeholder={"Email"}
          onChange={handleChange}
          type={"email"}
          inputName={"email"}
          value={userEmail}
        />
      </Grid>
      <Grid container>
        <Grid item md={5.8} sm={12} xs={12}>
          <div className={styles.label}>Phone Number</div>

          <CustomInput
            height={"2rem"}
            placeholder={"Phone number"}
            onChange={handleChange}
            type={"tel"}
            inputName={"phone_number"}
          />
        </Grid>
        <Grid item md={0.4} />
        <Grid item md={5.8} sm={12} xs={12}>
          <div className={styles.label}>D.O.B</div>

          <CustomInput
            height={"2rem"}
            placeholder={"DOB"}
            type={"date"}
            inputName={"date_of_birth"}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={5.8} sm={12} xs={12}>
          <div className={styles.label}>Location</div>

          <CustomInput
            height={"2rem"}
            inputName={"city"}
            placeholder={"Location"}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={0.4} />
        <Grid item md={5.8} sm={12} xs={12}>
          <div className={styles.label}>Pincode</div>

          <CustomInput
            height={"2rem"}
            placeholder={"Pincode"}
            onChange={handleChange}
            inputName={"pincode"}
            type={"number"}
          />
        </Grid>
      </Grid>
      <CustomButton text={"Save Changes"} onClick={handleSaveInfo} />
    </div>
  );
};

export default PersonalInfo;
