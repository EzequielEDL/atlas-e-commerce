import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchSearchProducts } from "../../stores/products/actions";
import { InputBase, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import useStyle from "./styles";
import { Link } from "react-router-dom";

const SearchBar = ({ fetchSearchProducts }) => {
  const classes = useStyle();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchProducts(value);
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      className={classes.searchForm}
    >
      <InputBase
        id="search-bar"
        placeholder="Search"
        value={value}
        onChange={handleChange}
        className={classes.searchInput}
      />
      <Link to={`/products/${value.toLowerCase()}`} className={classes.link}>
        <IconButton
          className={classes.searchButton}
          aria-label="search"
          type="submit"
          variant={"palette.text.secondary"}
        >
          <SearchOutlinedIcon />
        </IconButton>
      </Link>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    handlePageChange: state.productsReducer.handleChange,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchSearchProducts: (value) => dispatch(fetchSearchProducts(value)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(SearchBar);
