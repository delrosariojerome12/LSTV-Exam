import React, {useState, useRef, useEffect} from "react";
import AnimatedBg from "../components/AnimatedBg";
import {FaEye, FaEyeSlash, FaLock, FaUser} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Logo from "../assets/logo.jpg";
import {handleLogin} from "../features/auth/auth";
const Login = React.memo(() => {
  const {isLoginError, isLoginLoading, user, statusMessage} = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const refPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      console.log("complete the fields!");
    } else {
      console.log("submit");
      dispatch(handleLogin({user: {username, password}}));
      // navigate("/home");
    }
  };

  const handleOnChange = (value, id) => {
    if (id === "username") {
      setUser(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
    if (refPassword.current.type === "password") {
      refPassword.current.type = "text";
    } else {
      refPassword.current.type = "password";
    }
  };

  const renderEyeIcon = () => {
    return isPasswordShown ? (
      <FaEye onClick={handleShowPassword} />
    ) : (
      <FaEyeSlash onClick={handleShowPassword} />
    );
  };

  return (
    <section className="login-page">
      <div className="left-side">
        <div className="logo-holder" onClick={() => navigate("/")}>
          <img src={Logo} alt="LSTV Logo" />
          <h1>Lee Systems Technology Ventures</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-contain">
            <input
              id="username"
              type="text"
              value={username}
              required
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={
                  username ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>
                  <span>
                    <FaUser />
                  </span>
                  User
                </div>
              </label>
            </div>
          </div>
          <div className="input-contain">
            <input
              type="password"
              id="password"
              ref={refPassword}
              required
              value={password}
              onChange={(e) => handleOnChange(e.target.value, e.target.id)}
            />

            <div className="placeholder-container">
              <label
                className={
                  password ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>
                  <span>
                    <FaLock />
                  </span>
                  Password
                </div>
              </label>
            </div>
            <div className="eye-container">{renderEyeIcon()}</div>
          </div>
          {isLoginError && <p style={{color: "red"}}>{statusMessage}</p>}
          <button type="submit">
            {isLoginLoading ? "Logging in" : "Log in"}
          </button>
        </form>
      </div>
      <div className="right-side">
        <AnimatedBg />
      </div>
    </section>
  );
});

export default Login;
