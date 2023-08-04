import React from "react";
import {Route, Routes} from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/Login";
import HomeMenu from "./pages/HomeMenu";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <section className="container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeMenu />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </section>
  );
};

export default App;
