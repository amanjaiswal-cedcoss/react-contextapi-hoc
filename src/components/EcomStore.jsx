import React, { createContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoaderHoc } from "../higherOrderComponents/LoaderHoc";
import Cart from "./Cart";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";

export const EcomContext = createContext();


function EcomStore() {
  const [state, setState] =useState({
    products: [],
    cart: [],
    user: undefined,
    search: "",
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setState({ ...state, products: data.products });
      });
  }, []);

  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <>
      <EcomContext.Provider value={{ state, setState }}>
        <RouterProvider router={router} />
      </EcomContext.Provider>
    </>
  );
}

export default EcomStore;
