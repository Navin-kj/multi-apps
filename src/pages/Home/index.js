import React from "react";
import "./style.css";
import { SidebarData } from "../../components/Navbar/sidebar";
import { useSelector } from "react-redux";

const Home = () => {
  const { theme } = useSelector((state) => state.theme);
  const handleClick = (path) => {
    window.location.href = path;
  };
  return (
    <div
      className={`${theme === "dark" ? "dark-theme home-page" : "home-page"}`}
    >
      <div className="home-container">
        {SidebarData.map((item, index) => {
          return (
            <div
              className="home-card"
              key={index}
              onClick={() => handleClick(item.path)}
            >
              <span>{item.title}</span>
              <img src={item.image} className="img-style" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
