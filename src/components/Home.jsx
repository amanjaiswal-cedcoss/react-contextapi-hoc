import React, { useContext, useMemo } from "react";
import { EcomContext } from "./EcomStore";
import NavBar from "./NavBar";
import noResultsFound from "../assets/no-results-found.jpg";
import { SearchHoc } from "../higherOrderComponents/SearchHoc";

function Home() {
  const { state, setState } = useContext(EcomContext);

  const search = (e) => {
    let value = e.target.value;
    setState(prev=>{return {...prev,search:value}});
  };

  const SearchWithDebounce = useMemo(() => SearchHoc(search), []);

//   variable to contain products matching with search value only
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
      <NavBar />
      <main className="home d-flex align-items-start position-relative">
        <section className="productsarea flex-grow-1 px-3">
          <div className="productsarea__features my-1 my-sm-4 d-flex flex-sm-row flex-column gap-2">
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0 rounded-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 p-2 rounded-0"
                placeholder="Search for products, brands and more."
                onChange={(e) => search(e)}
              />
            </div>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0 rounded-0">
                <i className="bi bi-search"></i>
              </span>
              <SearchWithDebounce />
            </div>
          </div>
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
        </section>
      </main>
    </>
  );
}

export default Home;
