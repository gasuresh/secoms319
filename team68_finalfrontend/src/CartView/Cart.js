import React, {useEffect} from 'react';
const Cart = ({cart, cartTotal, setCartTotal, cartTax, setCartTax}) => {

  

    const total = () => {
        let totalVal = 0;
        let tax = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += (cart[i].price * cart[i].quantity);
        }
        tax = totalVal * 0.05
        setCartTotal(totalVal);
        setCartTax(tax);
    };
  
    useEffect(() => {
      total();
    });
  
    
  
    const listItems = cart.map((el) => (
        <div className="row border-top border-bottom" key={el._id}>
            <div className="row main align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={el.image} alt={el.title}/>
                </div>
                <div className="col">
                    <div className="row text-muted">{el.title}</div>
                    <div className="row">{el.category}</div>
                </div>
                <div className="col">
                    ${el.price} <span className="close">&#10005;</span>{el.quantity}
                </div>
            </div>
        </div>
    ));
  
    return (
      <div>
        {cart.length > 0 ? (
          <>
            
            
            <div className="card">
              <div className="row">
                {/* HERE, IT IS THE SHOPPING CART */}
                <div className="col-md-8 cart">
                  <div className="title">
                    <div className="row">
                      <div className="col">
                        <h4>
                          <b>319 Shopping Cart</b>
                        </h4>
                      </div>
                      <div className="col align-self-center text-right text-muted">
                        Products selected {cart.length}
                      </div>
                    </div>
                  </div>
                  <div>{listItems}</div>
                </div>
                <div className="float-end">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Subtotal:</span>
                    <span className="lead fw-normal">${cartTotal.toFixed(2)}</span>
                  </p>
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Tax:</span>
                    <span className="lead fw-normal">${cartTax.toFixed(2)}</span>
                  </p>
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span>
                    <span className="lead fw-normal">${(cartTotal + cartTax).toFixed(2)}</span>
                  </p>
                  
                </div>
              </div>
            </div>
            
          </>
  
        ) : (
          <>
            
            <h1 className="display-6">
              <b>319 Shopping Cart</b>
            </h1>
            <h1 className="display-1">No Items in Cart</h1>
          </>
          
        )}
      </div>
    );
  }

export default Cart;