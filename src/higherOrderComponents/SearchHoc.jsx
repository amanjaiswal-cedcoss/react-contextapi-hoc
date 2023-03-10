import React from "react";

export const SearchHoc = (searchfn) => {
  const withDebounce = () => {
    const search = (e) => {
      setTimeout(() => {
        searchfn(e);
      }, 1000);
    };

    return (
      <input
        type="text"
        className="form-control border-start-0 p-2 rounded-0"
        placeholder="Debouncing search"
        onChange={search}
      />
    );
  };
  return withDebounce;
};
