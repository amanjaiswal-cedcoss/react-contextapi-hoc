import React, { useEffect, useState } from "react";
import loader from '../assets/loading.gif'

export const LoaderHoc = (Component) => {
  const WithLoader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    }, []);

    return <>{loading?<div className="d-inline-flex align-items-center border m-2 p-2 rounded bg-white position-absolute top-50 start-50 translate-middle"><span>Loading..</span><img className="loader" src={loader} alt='loading'/></div>:<Component/>}</>;
  };
  return WithLoader;
};
