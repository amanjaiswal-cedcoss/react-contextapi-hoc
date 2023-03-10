import React, { useContext, useMemo } from "react";
import { EcomContext } from "./EcomStore";
import NavBar from "./NavBar";
import { SearchHoc } from "../higherOrderComponents/SearchHoc";
import Products from "./Products";
import { LoaderHoc } from "../higherOrderComponents/LoaderHoc";

function Home() {
  const { setState } = useContext(EcomContext);

  const searchProducts = (e) => {
    let value = e.target.value;
    setState((prev) => {
      return { ...prev, search: value };
    });
  };

  const SearchWithDebounce = useMemo(() => SearchHoc(searchProducts), []);

  const ProductsWithLoader = LoaderHoc(Products);

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
                onChange={(e) => searchProducts(e)}
              />
            </div>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0 rounded-0">
                <i className="bi bi-search"></i>
              </span>
              <SearchWithDebounce />
            </div>
          </div>
          <ProductsWithLoader />
        </section>
      </main>
    </>
  );
}

export default Home;
