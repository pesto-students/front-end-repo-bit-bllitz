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
import { useRouter } from "next/navigation";
import { supabase } from "../../supabase/supabase";
import Progress from "@/components/progress/Progress";
import { useAppContext } from "@/context";
import { useDispatch } from "react-redux";

import Loading from "@/components/loading/Loading";
import { resetState } from "@/lib/redux/slices/resetSlice";

const page = () => {
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
  const { setUser } = useAppContext();
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    profileInfo: {},
    userId: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [deleteModal, setDelModal] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const getUserData = async () => {

    // setLoading(true);

    const { data: userData, error } = await supabase.auth.getSession();
    // setUser(userData);
    console.log("userData in profile", userData);
    if (userData.session) {
      const userId = userData.session.user.id;
      const { data: profileFromId, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);

      if (error) console.log("profilesErr", error);
      console.log("profilesData", profileFromId[0]);
      const fullname = profileFromId[0]?.fullname;
      const [first_name, last_name] = fullname ? fullname.split(" ") : ["", ""]; // Split fullname into first_name and last_name
      setFormData({ ...profileFromId[0], first_name, last_name });
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  const dispatch = useDispatch();

  const handleListItemClick = async (event, index) => {
    setSelectedIndex(index);
    switch (index) {
      case 3:
        setLoading(true);
        const signoutRes = await supabase.auth.signOut();
        console.log("signout res", signoutRes);


        dispatch(resetState());

        router.push("/auth/signin");
        router.refresh();

        setLoading(false);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    console.log("selectedInd", selectedIndex);
  }, [selectedIndex]);


  const getContent = () => {
    switch (selectedIndex) {
      case 1:
        return <PersonalInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <UserLoginData formData={formData} setFormData={setFormData} />;
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
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.profileContainer}>
          <Typography variant="h5" className={styles.header}>
            Profile
          </Typography>

          <Grid container className={styles.dataContainer}>
            <Grid
              item
              md={3.5}
              sm={12}
              xs={12}
              className={styles.cardContainer}
            >
              <Card className={styles.personalData} elevation={2}>
                <Avatar
                  src={"/images/avatar.png"}
                  sx={{ width: 120, height: 120 }}
                  className={styles.avatar}
                >
                  Z
                </Avatar>
                <Typography variant="h6" className={styles.staffData}>
                  {formData.fullname}
                </Typography>
                <Typography variant="body2" className={styles.staffSub}>
                  {formData.role}
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
      )}
    </>
  );
};

export default page;
