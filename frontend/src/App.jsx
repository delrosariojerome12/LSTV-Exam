import React from "react";
import {Route, Routes} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import HomeMenu from "./pages/HomeMenu";
import PageNotFound from "./pages/PageNotFound";
import {useSelector} from "react-redux";

const App = React.memo(() => {
  const {user} = useSelector((state) => state.auth);

  console.log(user);

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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </section>
  );
});

export default App;
