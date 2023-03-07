import React, { useContext, useMemo } from 'react'
import { EcomContext } from './EcomStore';
import NavBar from './NavBar';
import emptyCart from '../assets/emptycart.png'

function Cart() {
  const {state,setState}=useContext(EcomContext)

   // useMemo hook used to calculate sum of all the products in cart
   const subtotal = useMemo(
    () =>
      state.cart.reduce(
        (total, ele) => total + ele.quantity * ele.price,
        0
      ),
    [state.cart]
  );

  // fn to remove product from cart
  const removeProduct=(index)=>{
    state.cart.splice(index,1)
    setState({...state})
  }

  return (
    <>
    <NavBar/>
      <section className="cart d-flex flex-wrap justify-content-center bg-white my-2 shadow-sm pb-2">
        {state.cart.length > 0 ? (
          <>
            <div className="cart__products border-end p-2">
              {state.cart.map((ele, index) => {
                return (
                  <div
                    key={ele.title}
                    className="cart__product d-flex p-2 gap-3 border my-2 rounded-2"
                  >
                    <img
                      className="cart__productpic "
                      src={ele.thumbnail}
                      alt={ele.title}
                    />
                    <div className="cart__productdetails d-flex flex-column align-items-start py-2">
                      <h6>{ele.title}</h6>
                      <span className="shorttxt">{ele.brand}</span>
                      <span className="d-flex align-items-center">
                        <span className="shorttxt">Quantity:</span>
                          <span className='px-2'>{ele.quantity}</span>
                      </span>
                      <div className="d-flex gap-1 align-items-center">
                        <span className="fw-bold">₹{ele.price}</span>
                        <span className="text-seconday text-decoration-line-through shorttxt">
                          ₹
                          {(
                            (ele.price * 100) /
                            (100 - ele.discountPercentage)
                          ).toFixed()}
                        </span>
                        <span className="shorttxt text-danger">
                          ({ele.discountPercentage.toFixed()}% OFF)
                        </span>
                      </div>
                      <button
                        className="btn btn-sm px-0 text-danger"
                        onClick={() => {
                          removeProduct(index)
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart__pricedetails d-flex flex-column pt-4 ps-4">
              <h6>PRICE DETAILS :({state.cart.length} items)</h6>
              <div className="d-flex justify-content-between shorttxt my-1">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between shorttxt my-1">
                <span>Delivery Fee</span>
                <span>₹99</span>
              </div>
              <div className="d-flex justify-content-between shorttxt mt-1 mb-3 pt-2 border-1 border-top fw-bold">
                <span>Total Amount</span>
                <span>₹{subtotal + 99}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img
              className="cart__emptypic mb-2"
              src={emptyCart}
              alt="empty cart pic"
            />
            <span className="fs-4 text-secondary">Your cart is empty :(</span>
            <span className="text-secondary">Go add some products!!</span>
          </div>
        )}
      </section>
    </>
  )
}

export default Cart