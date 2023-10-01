import React from "react";

const SearchBar = (props) => {
  const { value, isLoading, handleSubmit, onChange } = props;
  return (
    <div class="wrap">
      <form onSubmit={handleSubmit} className="search1">
        <input
          value={value}
          disabled={isLoading}
          className="searchTerm"
          onChange={onChange}
          placeholder="Search Recipe"
        />
        <button
          type="submitm"
          className="searchButton"
          disabled={isLoading || !value}
        >
          <i class="fa fa-search"></i> stub
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
