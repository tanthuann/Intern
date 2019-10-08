import React from "react";
import FilterLink from "../containers/FilterLink";
import CONSTANTS from "../constants/constants";

const { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } = CONSTANTS.VISIBILITY_FILTER;
const Footer = () => (
  <p>
    Show:{" "}
    <FilterLink filter={SHOW_ALL} hihi="oke">
      All
    </FilterLink>
    {", "}
    <FilterLink filter={SHOW_ACTIVE}>Active</FilterLink>
    {", "}
    <FilterLink filter={SHOW_COMPLETED}>Completed</FilterLink>
  </p>
);

export default Footer;
