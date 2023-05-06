import React, { useState, useEffect } from "react";

function OrderHistory({ currUser }) {
  const [orders, setOrders] = useState([]);
/*
  useEffect(() => {
    fetch(`http://localhost:4000/orders/${currUser._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  }, [currUser._id]);*/

  useEffect(() => {
    fetch(`http://localhost:4000/history/${currUser._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
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

