import { supabase } from '@/supabase/supabase';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   async generateOrder(state, action) {
        try {
            const { customerId, cartItems } = action.payload;
            // Calculate total amount and other necessary details for the order
            const totalAmount = calculateTotalAmount(cartItems); // Implement this function

        
            // Insert order into Supabase
            const { data, error } = await supabase.from('orders').insert([
              { waiter_id: customerId, total_amount: totalAmount ,
            created_at:Date.now(),updated_at: null,status:active
        },
            ]);
    
            if (error) {
              throw error;
            }
    
            // Push the order data to the state if insertion is successful
            state.orders.push(data);
    
          } catch (error) {
            console.error('Error generating order:', error);
            throw error;
          }
    },
  },
});
const calculateTotalAmount=(items)=>{
    return items.reduce((total, item) => {
        return total + item.price; // Assuming each item has a "price" property
      }, 0);
    
}

export const { generateOrder } = orderSlice.actions;
export default orderSlice.reducer;
