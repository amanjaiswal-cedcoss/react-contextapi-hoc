import React, { useContext } from 'react'
import noResultsFound from "../assets/no-results-found.jpg";
import { EcomContext } from './EcomStore';

function Products() {
    // this component is made justb to show the utility of loader HOC
    const { state, setState } = useContext(EcomContext);

    // refined products store the products matching with the value in search input
    const refinedProducts =
    state.search === ""
      ? state.products
      : state.products.filter(
          (ele) =>
            ele.brand.toLowerCase().includes(state.search.toLowerCase()) ||
            ele.title.toLowerCase().includes(state.search.toLowerCase())
        );

        const addToCart = (id) => {
            let found = false;
            // looping through the cart products of user to check whether the product user wants to add is already in his cart
            state.cart.forEach((ele, i) => {
              // condition for product added is already present in his cart
              if (ele.id === id) {
                found = true;
                // condition to check whether the product is available in stock
                if (ele.quantity < ele.stock) {
                  state.cart[i].quantity++;
                } else {
                  alert(`Current stock of this product is ${ele.stock}`);
                }
              }
            });
            // condition to add a product to cart when it is not found in cart
            if (!found) {
              let productIndex = state.products.findIndex((ele) => ele.id === id);
              if (productIndex !== -1) {
                let product = { ...state.products[productIndex], quantity: 1 };
                state.cart.push(product);
              }
            }
            setState({ ...state });
          };

  return (
    <>
    {refinedProducts !== undefined && refinedProducts.length > 0 ? (
            <section className="products my-2">
              {refinedProducts.map((ele) => {
                return (
                  <div
                    key={ele.id}
                    className="product d-flex flex-column align-items-center border rounded-2 "
                  >
                    <img
                      className="product__pic"
                      src={ele.thumbnail}
                      alt={ele.title}
                    />
                    <span className="product__rating shorttxt fw-bold bg-white px-1 rounded-1">
                      {ele.rating}
                      <i className="bi bi-star-fill ms-1"></i>
                    </span>
                    <div className="product__details card-body w-100 d-flex gap-2 flex-column justify-content-between">
                      <h6 className="product__details__title my-1">
                        {ele.title}
                      </h6>
                      <span className="shorttxt">by {ele.brand}</span>
                      <div className="product__details__price d-flex gap-1 align-items-center">
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
                      {ele.stock > 0 ? (
                        <button
                          onClick={() => addToCart(ele.id)}
                          className="product__btncta border-0 py-2 shorttxt"
                        >
                          ADD TO CART
                        </button>
                      ) : (
                        <button className="btn-warning text-white fw-bold border-0 py-2 shorttxt">
                          OUT OF STOCK
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          ) : (
            <div className="bg-white text-center vh-100">
              <img className="my-4" src={noResultsFound} alt="no results pic" />
              <h4>Sorry! No results found :(</h4>
            </div>
          )}
    </>
  )
}

export default Products