import { store } from '../../../redux/store'; // Import your Redux store
import { addToCart } from '../../../redux/actions/cartActions'; // Import your addToCart action

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { item } = req.body; // Assuming item contains the food details
    try {
      // Dispatch action to add item to cart
      await store.dispatch(addToCart(item));
      res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
