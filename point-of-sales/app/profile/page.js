"use client";
import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import {
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
import PersonalInfo from "@/components/profile/PersonalInfo";
import UserLoginData from "@/components/profile/UserLoginData";
import { redirect, useRouter } from "next/navigation";
import { supabase } from "../../supabase/supabase";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/lib/redux/slices/userSlice";
const page = () => {
  const auth = useSelector((state) => state.auth);
  console.log("authinprof", auth);
  const { user: { metadata = {} } = {} } = auth;

  const { email = "" } = metadata;
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const user = await supabase.auth.getUser();
    console.log("userData", user);
    setUserData(user);
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
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [selectedIndex, setSelectedIndex] = useState(1);
  const router = useRouter();
  const handleListItemClick = async (event, index) => {
    setSelectedIndex(index);
    switch (index) {
      case 3:
        const data = await supabase.auth.signOut();
        console.log("datainauth", data);
        break;

      default:
        break;
    }
  };
  const [deleteModal, setDelModal] = useState(false);

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
        router.push("/auth/signin");
      default:
        break;
    }
  };
  const handleDeleteAcc = () => {
    setDelModal(true);
  };
  return (
    <div className={styles.profileContainer}>
      <div className={styles.breadcrumbs}>Dashboard / Analytics</div>
      <Typography variant="h5" className={styles.profile}>
        Profile
      </Typography>

      <Grid container className={styles.dataContainer}>
        <Grid item md={3.5} sm={12} xs={12} className={styles.cardContainer}>
          <Card className={styles.personalData} elevation={2}>
            <Avatar sx={{ width: 120, height: 120 }} className={styles.avatar}>
              Z
            </Avatar>
            <Typography variant="h6" className={styles.staffData}>
              Theresa Web
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
        <Modal
          open={deleteModal}
          onClose={() => setDelModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete your account permanently?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Deleting{" "}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default page;
