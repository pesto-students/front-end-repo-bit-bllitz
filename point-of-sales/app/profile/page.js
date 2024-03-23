"use client";
import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItemButton,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import PersonalInfo from "@/components/profile/PersonalInfo";
import UserLoginData from "@/components/profile/UserLoginData";
import { redirect, useRouter } from "next/navigation";
import { supabase } from "../../supabase/supabase";
import { setUserData } from "@/lib/redux/slices/userSlice";
import Progress from "@/components/progress/Progress";
import { useAppContext } from "@/context";
import { NextResponse } from "next/server";
const page = () => {
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const { data: userData, error } = await supabase.auth.getUser();
    console.log("userData", userData);
    if (userData.user) {
      const profile = userData.user.email;
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const {
    data: { user: { email: userEmail = "", id: userId = "" } = {} } = {},
  } = userData;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 3,
  };
  const [selectedIndex, setSelectedIndex] = useState(1);
  const router = useRouter();
  const handleListItemClick = async (event, index) => {
    setSelectedIndex(index);
    switch (index) {
      case 3:
        setLoading(true);
        await supabase.auth.signOut();
        router.refresh();
        router.push("/auth/signin");
        setLoading(false);
        break;

      default:
        break;
    }
  };
  const [deleteModal, setDelModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("selectedInd", selectedIndex);
  }, [selectedIndex]);

  const getContent = () => {
    switch (selectedIndex) {
      case 1:
        return <PersonalInfo userEmail={userEmail} />;
      case 2:
        return <UserLoginData userEmail={userEmail} userId={userId} />;
      case 3:
        return <Progress loading={loading} />;
      default:
        break;
    }
  };
  const handleDeleteAcc = async () => {
    if (!deleteModal) {
      setDelModal(true);
    } else {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      console.log("user", userData.user.id);
      const { data: profiles, error } = await supabase.auth.admin.deleteUser(
        userData.user.id
      );
      console.log("error", error);
      console.log("datasup", profiles);
      // setDelModal(false);
      // await supabase.auth.signOut();
      // router.push("/auth/signin");
    }
  };
  return (
    <div className={styles.profileContainer}>
      <Typography variant="h5" className={styles.header}>
        Profile
      </Typography>

      <Grid container className={styles.dataContainer}>
        <Grid item md={3.5} sm={12} xs={12} className={styles.cardContainer}>
          <Card className={styles.personalData} elevation={2}>
            <Avatar
              src={"/images/avatar.png"}
              sx={{ width: 120, height: 120 }}
              className={styles.avatar}
            >
              Z
            </Avatar>
            <Typography variant="h6" className={styles.staffData}>
              Riya Pathak
            </Typography>
            <Typography variant="body2" className={styles.staffSub}>
              Waiter
            </Typography>
            <Grid container className={styles.workData}>
              <Grid item md={6} sm={6} xs={12} className={styles.income}>
                <Typography variant="h6" className={styles.main}>
                  77,551
                </Typography>
                <Typography variant="body2" className={styles.sub}>
                  Income
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={12} className={styles.orders}>
                <Typography variant="h6" className={styles.main}>
                  50
                </Typography>
                <Typography variant="body2" className={styles.sub}>
                  Orders
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ width: "100%" }} />
            <List className={styles.listContainer}>
              <ListItemButton
                selected={selectedIndex == 1}
                onClick={(event) => handleListItemClick(event, 1)}
                className={styles.listBtn}
              >
                Personal information
              </ListItemButton>
              <ListItemButton
                className={styles.listBtn}
                selected={selectedIndex == 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                Login and Password
              </ListItemButton>
              <ListItemButton
                className={styles.listBtn}
                selected={selectedIndex == 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                Logout
              </ListItemButton>
            </List>
            <div className={styles.btnContainer}>
              <Button
                variant="text"
                startIcon={<DeleteIcon />}
                className={styles.delBtn}
                onClick={handleDeleteAcc}
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={5} className={styles.formContainer} sm={12} xs={12}>
          {getContent()}
        </Grid>
        <Grid item md={2.5} xs={0} />
      </Grid>
      {deleteModal && (
        <Modal open={deleteModal} onClose={() => setDelModal(false)}>
          <Box sx={style}>
            <ReportIcon sx={{ color: "#c3040a", fontSize: "3rem " }} />
            <Typography
              id="modal-modal-title"
              className={styles.modalTitle}
              variant="h6"
              component="h2"
            >
              Are you sure you want to delete your account permanently?
            </Typography>
            <Typography
              id="modal-modal-description"
              className={styles.modalSub}
              sx={{ mt: 2 }}
            >
              Deleting your account will lead to the permanent loss of data.{" "}
            </Typography>
            <div className={styles.modalBtn}>
              <Button variant="outlined" onClick={() => setDelModal(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleDeleteAcc}>
                Yes, Delete
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default page;
