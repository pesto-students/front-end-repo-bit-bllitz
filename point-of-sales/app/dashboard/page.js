"use client";
import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { Grid, Typography, Box, Tab, Card, Avatar, Chip } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  DoughnutController,
  ArcElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import LinearProgressComponent from "@/components/linearProgress/LinearProgress";
import { supabase } from "../../supabase/supabase";
// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  DoughnutController,
  ArcElement,
  Tooltip
);
const Dashboard = () => {
  const [value, setValue] = useState("1");
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getPercentageOfOrders=(data)=>{

  }
  const getTotalOrders = async () => {
    try {
      const totalOrders = await fetch("/api/orders");
      console.log("totalOrders", totalOrders.data);
      const data=totalOrders.data
      setOrders
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };
  useEffect(() => {
    getTotalOrders();
  }, []);
  const options = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(0) + "%";
          return percentage;
        },
        color: "#fff",
      },
    },
  };

  const doughnutData = {
    labels: ["Food", "Drinks"],
    datasets: [
      {
        data: [30, 70], // Percentage values for food and drinks
        backgroundColor: ["#FFCA40", "#C8161D"], // Colors for food and drinks
        hoverBackgroundColor: ["#FFCA40", "#C8161D"],
      },
    ],
  };

  const dummyData = [
    {
      id: 1,
      type: "food",
      item: "Cheeseburger",
      price: 67,
    },
    {
      id: 2,
      type: "food",
      item: "Cheeseburger",
      price: 67,
    },
    {
      id: 3,
      type: "food",
      item: "Cheeseburger",
      price: 67,
    },
    {
      id: 4,
      type: "food",
      item: "Cheeseburger",
      price: 67,
    },
  ];

  return (
    <div className={styles.analytics}>
      <div className={styles.breadcrumbs}>Dashboard / Analytics</div>
      <Grid container className={styles.header}>
        <Grid item xs={6} className={styles.headerContent}>
          <Typography variant="h5" className={styles.title}>
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={6} className={styles.tabs}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Yesterday" value="1" className={styles.tab} />
                <Tab label="Today" value="2" className={styles.tab} />
                <Tab label="Week" value="3" className={styles.tab} />
                <Tab label="Month" value="4" className={styles.tab} />
                <Tab label="Year" value="5" className={styles.tab} />
              </TabList>
            </Box>
          </TabContext>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4} className={styles.lineChart}>
          <Card elevation={2} className={styles.chartCard}>
            <Typography variant="h6" className={styles.title}>
              Daily Sales
            </Typography>
            <div className={styles.chart}>
              <Line
                data={{
                  labels: [
                    "9:00 am",
                    "10:00 am",
                    "11:00 am",
                    "12:00 pm",
                    "1:00 pm",
                    "2:00 pm",
                  ],
                  datasets: [
                    {
                      data: [1000, 2000, 4000, 3000, 5000, 6000],
                      borderColor: "#c8161d",
                      borderWidth: 2, // Adjust the border width as needed
                      tension: 0.4, // Adjust the tension to make the curve smoother
                      borderCapStyle: "round", // Set border cap style to round
                      borderJoinStyle: "round",
                      pointRadius: 4, // Increase point radius to make the padding more visible
                      pointHoverBorderWidth: 10,
                    },
                  ],
                }}
              />
            </div>
          </Card>
        </Grid>
        <Grid item xs={4} className={styles.doughnutChart}>
          <Card elevation={2} className={styles.chartCard}>
            <Typography variant="h6" className={styles.title}>
              Total income
            </Typography>
            <div className={styles.chart}>
              <Doughnut data={doughnutData} title="doughnt" options={options} />
            </div>
          </Card>
        </Grid>
        <Grid item xs={4} className={styles.progressChart}>
          <Card className={styles.chartCard}>
            <LinearProgressComponent
              title={"Total Orders"}
              data={"89"}
              progress={totalOrdersCount}
              color={"#C8161D"}
            />
          </Card>
          <Card className={styles.chartCard}>
            <LinearProgressComponent
              title={"New Customers"}
              data={"256"}
              progress={70}
              color={"#FFD049"}
            />
          </Card>
        </Grid>
        <Grid item xs={4} className={styles.trending}>
          <Card elevation={2} className={styles.chartCard}>
            <Typography variant="h6" className={styles.title}>
              Trending Dishes
            </Typography>
            <div className={styles.headContainer}>
              <Typography variant="body2" className={styles.head}>
                Dishes
              </Typography>
              <Typography variant="body2" className={styles.head}>
                Orders
              </Typography>
            </div>
            <div className={styles.chart}>
              <div className={styles.trendingTable}>
                {dummyData.map((item, i) => (
                  <div className={styles.details}>
                    <div className={styles.itemDets}>
                      <Avatar></Avatar>
                      <div className={styles.specs}>
                        <Chip
                          label="Food"
                          variant="contained"
                          className={styles.chip}
                          color={"primary"}
                        />
                        <Typography variant="body2" className={styles.item}>
                          Cheeseburgers
                        </Typography>
                      </div>
                    </div>
                    <div className={styles.itemPrice}>₹36</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={4} className={styles.tableData}>
          <Card elevation={2} className={styles.chartCard}>
            <Typography variant="h6" className={styles.title}>
              Best Employees
            </Typography>
            <div className={styles.headContainer}>
              <Typography variant="body2" className={styles.head}>
                Employees
              </Typography>
              <Typography variant="body2" className={styles.head}>
                Earnings
              </Typography>
            </div>
            <div className={styles.chart}>
              <div className={styles.trendingTable}>
                {dummyData.map((item, i) => (
                  <div className={styles.details}>
                    <div className={styles.itemDets}>
                      <Avatar></Avatar>
                      <div className={styles.specs}>
                        <Typography variant="body2" className={styles.item1}>
                          Theresa Web
                        </Typography>
                        <Typography variant="body2" className={styles.item}>
                          Wait
                        </Typography>
                      </div>
                    </div>
                    <div className={styles.itemPrice}>₹23</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
