import React, {useEffect} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import HomeMenu from "./pages/HomeMenu";
import PageNotFound from "./pages/PageNotFound";
import {useSelector, useDispatch} from "react-redux";
import {handleUserActive} from "./features/auth/auth";

const App = React.memo(() => {
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      dispatch(handleUserActive());
    }
  }, []);

  if (!user) {
    return (
      <section className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </section>
    );
  }

  return (
    <section className="container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeMenu />} />
        <Route path="/login" element={<Navigate to={"/home"} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </section>
  );
});

export default App;
