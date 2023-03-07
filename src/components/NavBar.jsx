import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { EcomContext } from './EcomStore';

function NavBar() {
  const { state} = useContext(EcomContext);

  return (
    <header className="header border border-bottom position-sticky top-0">
      <nav className="navbar navbar-light bg-white py-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-shop"></i>
            <span>OneStopShop</span>
          </Link>
          <ul className="list-unstyled d-flex align-items-center gap-3 mb-0">
                <li>
                  <Link
                    className="text-decoration-none text-dark position-relative"
                    to="/cart"
                  >
                    <span>Cart</span>
                    <i className="bi bi-cart ms-1 fs-5"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                      {state.cart.length > 0 &&
                        state.cart.length}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-dark"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
            <li>
            <Link className="text-decoration-none text-dark" to="/login">
                  LogIn
                </Link>
              {/* {ecomState.user.email === "" ? (
                <Link className="text-decoration-none text-dark" to="signupin">
                  <a className="text-decoration-none text-dark">Sign In/Up</a>
                </Link>
              ) : (
                <button
                //   onClick={signOut}
                  className="btn p-0 text-decoration-none text-dark"
                >
                  SignOut<i className="bi bi-box-arrow-right ms-1 fs-5"></i>
                </button>
              )} */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default NavBar