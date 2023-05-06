import React, { useState, useEffect } from "react";

function OrderHistory({ currUser }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Fetch orders from MongoDB database using the current user's ID
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/history?userId=${currUser._id}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [currUser._id]);

  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order {order._id}</h3>
            <h4>Cart:</h4>
            <ul>
              {order.cart.map((item) => (
                <li key={item._id}>
                  {item.title} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <h4>Form Data:</h4>
            <p>Full Name: {order.formData.fullName}</p>
            <p>Email: {order.formData.email}</p>
            <p>Address 1: {order.formData.address1}</p>
            <p>Address 2: {order.formData.address2}</p>
            <p>City: {order.formData.city}</p>
            <p>State: {order.formData.state}</p>
            <p>Zip: {order.formData.zip}</p>
          </div>
        ))
      ) : (
        <p>No orders found for this user.</p>
      )}
    </div>
  );
}

export default OrderHistory;

