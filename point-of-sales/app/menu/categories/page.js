"use client"; // This is a client component 👈🏽

import React, { useState, useCallback, useEffect } from "react";
import ActionAreaCard from "../../../components/card/ActionAreaCard.js";
import styles from "../menu.module.scss";
import { Grid } from "@mui/material";
import CustomModal from "@/components/modal/CustomModal.js";
import CustomInput from "@/components/auth/input/CustomInput.js";
import CustomButton from "@/components/button/CustomButton.js";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase/supabase.js";
import Header from "@/components/header/Header.js";
import { useDispatch, useSelector } from "react-redux";
import { setSubcategory } from "@/lib/redux/slices/sidePanelSlice.js";
import Loading from "@/components/loading/Loading.js";

import { addTableData } from "@/lib/redux/slices/tableSlice.js";


const Categories = () => {
  const tableDetails = useSelector((state) => state.table.tableDetails);
  const [openModal, setOpenModal] = useState(
    () => Object.keys(tableDetails).length == 0
  );
  const { push } = useRouter();
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    totalGuests: "",
    assignedTable: "",
  });
  const [loading, setLoading] = useState(true);

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleTableData = () => {
    dispatch(addTableData(values));
    setOpenModal(false)
  };

  const getCategories = useCallback(async () => {
    try {
      // setLoading(true);
      const { data: category, error } = await supabase
        .from("category")
        .select("*");

      if (error) {
        throw error;
      }

      if (category) {
        setCategories(category);

        setLoading(false)

      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getCategories();
  }, []);
  const dispatch = useDispatch();

  const onClickHandle = (category) => {
    dispatch(setSubcategory(category.name));
    push(`/menu/categories/subCategories?category_id=${category.id}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header padding={"1rem 2.5rem"} title={"Categories"} />
          <Grid container className={styles.menu}>
            {categories.map((category) => (
              <Grid item md={3} className={styles.categories}>
                <ActionAreaCard data={category} onClick={onClickHandle} />
              </Grid>
            ))}
          </Grid>
          <CustomModal
            openModal={openModal}
            onClose={() => setOpenModal(false)}
          >
            <CustomInput
              placeholder={"Enter number of Guests"}
              onChange={handleUserData}
              value={values.totalGuests}

              type={"number"}

              inputName={"totalGuests"}
            />
            <CustomInput
              placeholder={"Enter table number"}
              onChange={handleUserData}
              value={values.assignedTable}

              type={"number"}

              inputName={"assignedTable"}
            />
            <CustomButton
              text={"Assign Table"}

              onClick={() => handleTableData()}

            />
          </CustomModal>
        </>
      )}
    </>
  );
};

export default Categories;
