import React, {useEffect} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
const HomeMenu = React.memo(() => {
  const getData = async () => {
    const url = `http://localhost/LSTV/backend/api.php`;
    const {data: res} = await axios.get(url);
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="home-menu">
      <Navbar />
    </section>
  );
});

export default HomeMenu;
