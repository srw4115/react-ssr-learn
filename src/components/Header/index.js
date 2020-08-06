import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ display: "flex" }}>
      <div style={{ marginRight: "20px" }}>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/detail">detail</Link>
      </div>
    </header>
  );
};

export default Header;
