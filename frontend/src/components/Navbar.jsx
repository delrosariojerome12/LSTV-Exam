import React from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import Logo from "../assets/logo.jpg";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
const Navbar = () => {
  const {user} = useSelector((state) => state.auth);
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

  const renderLinks = () => {
    if (!user) {
      return links
        .filter((item) => {
          return item.page != "Home";
        })
        .map((item, index) => {
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
        });
    }
    return links.map((item, index) => {
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
    });
  };

  return (
    <nav className="navbar">
      <div className="logo-holder" onClick={() => navigate("/")}>
        <img src={Logo} alt="LSTV Logo" />
        <h1>Lee Systems Technology Ventures</h1>
      </div>
      <ul className="links-holder">{renderLinks()}</ul>
    </nav>
  );
};

export default Navbar;
