import React, { useContext } from "react";
import { EcomContext } from "./EcomStore";
import NavBar from "./NavBar";

function Dashboard() {
  const { state} = useContext(EcomContext);

  return (
    <>
      <NavBar />
      <div className="dashboard m-4 bg-white p-4 shadow">
        {state.user ? <><h3>Welcome {state.user.email}</h3>
          <h5 className="text-center">Products Table</h5>
          <table className="table tab--products text-center">
            <thead className="bg-light">
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {state.products.map((ele, index) => {
                return (
                  <tr key={ele.id}>
                    <td>{ele.id}</td>
                    <td>
                      <img
                        className="tab--products__prodpic"
                        src={ele.thumbnail}
                        alt={ele.title}
                      />
                    </td>
                    <td>{ele.title}</td>
                    <td>{ele.brand}</td>
                    <td>{ele.category}</td>
                    <td>{ele.price}</td>
                    <td>{ele.stock}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </>:<h3 className="text-center">Sign in to view dashboard</h3>}
      </div>
    </>
  );
}

export default Dashboard;
