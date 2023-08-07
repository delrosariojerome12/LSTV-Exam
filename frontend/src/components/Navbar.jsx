import React from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import Logo from "../assets/logo.jpg";
import {useNavigate, useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {handleClearUserStatus} from "../features/auth/auth";

const Navbar = React.memo(() => {
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
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
    return links
      .filter((item) => {
        if (currentPath.includes("home")) {
          return item.page != "Home" && item.page != "Login";
        }
        return item.page != "Login";
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
  };

  return (
    <nav className="navbar">
      <div className="logo-holder" onClick={() => navigate("/")}>
        <img src={Logo} alt="LSTV Logo" />
        <h1>Lee Systems Technology Ventures</h1>
      </div>
      <ul className="links-holder">
        {renderLinks()}
        {user && (
          <button
            onClick={() => {
              dispatch(handleClearUserStatus());
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
});

export default Navbar;
