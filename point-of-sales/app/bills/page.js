"use client"; // This is a client component 👈🏽

// import {
//   Box,
//   Button,
//   Divider,
//   Typography,
//   Table,
//   TableContainer,
//   TableCell,
//   TableRow,
//   TableHead,
//   TableBody,
// } from "@mui/material";
// import styles from "./bills.module.scss";
// import React from "react";
// import Chip from "../../components/chip/Chip.js";
// import CustomButton from "@/components/button/CustomButton";
// const BillsSection = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         const response = await fetch("/api/orders"); // Fetch orders from your API endpoint
//         const data = await response.json();
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error.message);
//       }
//     }

//     fetchOrders();
//   }, []);
// } 

// const Bills = () => {
//   return (
//     <>
//       <div className={styles.billContainer}>
//         <Box className={styles.orderBox}>
//           <Chip name={"Order#35"} price={"450Rs"} />
//           <Chip name={"Order#35"} price={"450Rs"} />
//         </Box>
//         <Box className={styles.box}>
//           <div>
//             <Typography variant="h6">Payment History</Typography>
//             <Typography variant="h5">
//               Order#35
//               <Button className={styles.statusButton} variant="contained">
//                 Active
//               </Button>
//               <Divider className={styles.divider} />
//             </Typography>
//             <Typography variant="h6">Details</Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Customer Name</TableCell>
//                     <TableCell align="right">Guest No.</TableCell>
//                     <TableCell align="right">Table No.</TableCell>
//                     <TableCell align="right">Payment</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow className={styles.row}>
//                     <TableCell component="th" scope="row">
//                       Kate Willson
//                     </TableCell>
//                     <TableCell align="right">2</TableCell>
//                     <TableCell align="right">2</TableCell>
//                     <TableCell align="right">By Cash</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Typography variant="h6">Order Info</Typography>
//             <Chip name={"1xHamburger"} price={"450Rs"} />
//           </div>
//           <>
//             <CustomButton text={"Charger Customer 450Rs"} />
//           </>
//         </Box>
//       </div>
//     </>
//   );
// };

// export default Bills;
// Import necessary dependencies
import {
  Box,
  Button,
  Divider,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Chip,
} from "@mui/material";
import styles from "./bills.module.scss";
import React from "react";
import CustomChip from "../../components/chip/CustomChip.js";
import CustomButton from "@/components/button/CustomButton";
import { supabase } from "../../supabase/supabase";

const mockOrders = [
  {
    order_id: "Order#35",
    price: "450Rs",
  },
  {
    order_id: "Order#34",
    price: "650Rs",
  },
  {
    order_id: "Order#33",
    price: "350Rs",
  },
];

const currentOrderDetails = {
  order_id: " Order#35",
  status: "Active",
  guest: {
    name: "Kate Willson",
    totalGuests: 2,
    tableNumber: 5,
    paymentType: "Cash",
  },
  total_amount: "900Rs",
  orders: [
    {
      quantity: 1,
      price: "450Rs",
      name: "Hamburger",
    },
    {
      quantity: 1,
      price: "450Rs",
      name: "Pizza",
    },
  ],
};

const Bills = () => {
  return (
    <>
      <div className={styles.billContainer}>
        <Box className={styles.orderBox}>
          {mockOrders.map((order) => (
            <CustomChip name={order.order_id} price={order.price} />
          ))}
        </Box>
        <Box className={styles.box}>
          <div>
            <Typography variant="h6">Payment History</Typography>
            <Typography variant="h5">
              {currentOrderDetails.order_id}
              <Chip
                className={styles.statusButton}
                variant="contained"
                label={currentOrderDetails.status}
              />
              <Divider className={styles.divider} />
            </Typography>
            <Typography variant="h6">Details</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell align="right">Guest No.</TableCell>
                    <TableCell align="right">Table No.</TableCell>
                    <TableCell align="right">Payment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className={styles.row}>
                    <TableCell component="th" scope="row">
                      {currentOrderDetails.guest.name}
                    </TableCell>
                    <TableCell align="right">
                      {currentOrderDetails.guest.totalGuests}
                    </TableCell>
                    <TableCell align="right">
                      {currentOrderDetails.guest.tableNumber}
                    </TableCell>
                    <TableCell align="right">
                      {currentOrderDetails.guest.paymentType}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6">Order Info</Typography>
            {currentOrderDetails.orders.map((order) => (
              <CustomChip name={`${order.quantity} x ${order.name}`} price={order.price} />
            ))}
          </div>
          <>
            <CustomButton
              text={`Charger Customer ${currentOrderDetails.total_amount}`}
            />
          </>
        </Box>
      </div>
    </>
  );
};

export default Bills;
