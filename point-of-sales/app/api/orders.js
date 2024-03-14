import { supabase } from "../../../supabase/supabase"
export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        // Fetch orders from the "orders" table
        const { data, error } = await supabase.from('orders').select('*');
  
        if (error) {
          throw error;
        }
  
        // Return the fetched orders
        res.status(200).json(data);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ error: 'Error fetching orders' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
    if (req.method === 'POST') {
    try {
      // Extract data from the request body
      const { price, total_amount } = req.body;

      // Get the current user's information from Supabase Auth
      const { user, error } = await supabase.auth.getUser();

      if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Create the order in the database
      const { data, error: insertError } = await supabase.from('orders').insert([
        {
          waiter_id: user.id,
          price,
          total_amount,
          status: 'active',
          order_time: new Date().toISOString()
        }
      ]);

      if (insertError) {
        throw insertError;
      }

      // Return the created order
      res.status(201).json(data[0]);
    } catch (error) {
      console.error('Error creating order:', error.message);
      res.status(500).json({ error: 'Error creating order' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}