import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import "./Searchbar.css";

export const SearchBar = () => {
  const { setSearchInputFilter } = useGamerdise();
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchInputFilter(e.target.value)}
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
};
