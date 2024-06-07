import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrders() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('userEmail'));
    try {
      const response = await fetch('http://localhost:5000/api/auth/myOrderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.orderData
            ? orderData.orderData.order_data.slice(0).reverse().map((order, index) => (
                order.map((item, itemIndex) => (
                  <div key={`${index}-${itemIndex}`}>
                    {item.Order_date ? (
                      <div className="m-auto mt-5">
                        <strong>{item.Order_date}</strong>
                        <hr />
                      </div>
                    ) : (
                      <div className="col-12 col-md-6 col-lg-3" key={item.id}>
                        <div className="card mt-3" style={{ width: '16rem', maxHeight: '360px' }}>
                          <img
                            src={item.img}
                            className="card-img-top"
                            alt={item.name}
                            style={{ height: '120px', objectFit: 'fill' }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className="container w-100 p-0" style={{ height: '38px' }}>
                              <span className="m-1">{item.qty}</span>
                              <span className="m-1">{item.size}</span>
                              <span className="m-1">{item.Order_date}</span>
                              <div className="d-inline ms-2 h-100 w-20 fs-5">₹{item.price}/-</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ))
            : 'No orders found.'}
        </div>
      </div>
      <Footer />
    </div>
  );
}
