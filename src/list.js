import React, { useState } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import './ShoppingList.css';

const ShoppingList = () => {
    const [cart, setCart] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
  
    const addItem = () => {
      if (itemName === '' || itemPrice === '' || isNaN(itemPrice)) {
        alert('Please enter a valid item name and price.');
        return;
      }
      const newItem = { name: itemName, price: parseFloat(itemPrice) };
      setCart([...cart, newItem]);
      setTotalPrice(totalPrice + newItem.price);
      setItemName('');
      setItemPrice('');
    };
  
    const removeItem = (index) => {
      const itemToRemove = cart[index];
      setTotalPrice(totalPrice - itemToRemove.price); 
      setCart(cart.filter((_, i) => i !== index));
    };
  
    return (
      <div className="cart-container">
        <Typography variant="h4" gutterBottom>
          Shopping Cart List
        </Typography>
  
        <TextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          variant="outlined"
          className="input-field"
        />
        <TextField
          label="Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          variant="outlined"
          type="number"
          className="input-field"
        />
        <Button variant="contained" color="primary" onClick={addItem} className="add-button">
          Add Item
        </Button>
  
        <List className="cart-list">
          {cart.length === 0 ? (
            <Typography variant="body1">Your cart is empty</Typography>
          ) : (
            cart.map((item, index) => (
              <ListItem key={index} className="cart-item">
                <ListItemText
                  primary={item.name}
                  secondary={`Price: ₱${item.price.toFixed(2)}`}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => removeItem(index)}
                >
                  Remove Item
                </Button>
              </ListItem>
            ))
          )}
        </List>
  
        <Typography variant="h6" className="total-price">
          Total Price: ₱{totalPrice.toFixed(2)}
        </Typography>
      </div>
    );
};

export default ShoppingList;