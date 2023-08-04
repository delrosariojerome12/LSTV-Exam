import React from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import Logo from "../assets/logo.jpg";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const links = [
    // {
    //   path: "/",
    //   page: "Landing Page",
    // },
    {
      path: "/login",
      page: "Login",
    },
    {
      path: "/home",
      page: "Home",
    },
  ];

  return (
    <nav className="navbar">
      <div className="logo-holder" onClick={() => navigate("/")}>
        <img src={Logo} alt="LSTV Logo" />
        <h1>Lee Systems Technology Ventures</h1>
      </div>
      <ul className="links-holder">
        {links.map((item, index) => {
          const {page, path} = item;
          return (
            <button
              onClick={() => {
                navigate(path);
              }}
              key={index}
            >
              {page}
            </button>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
