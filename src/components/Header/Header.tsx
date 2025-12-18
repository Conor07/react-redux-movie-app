import React from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import "./header.scss";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="Header">
      <Link className="LogoContainer" to="/">
        <div className="Logo">Movie App</div>
      </Link>

      <div className="UserImage">
        <FaRegUserCircle className="Logo" />
      </div>
    </div>
  );
};

export default Header;
