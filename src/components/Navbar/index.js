import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import Profile from "../Profile";
import { useSelector } from "react-redux";
import ThemeToggle from "../Theme";

function Navbar() {
  const [sidebar, setSidebar] = useState(windowWidth);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionSelected, setSuggestionSelected] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { theme } = useSelector((state) => state.theme);
  const fetchSuggestions = async (query) => {
    return SidebarData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const SidebarData = [
    {
      title: "Home",
      path: "/",
      icon: <AiIcons.AiFillHome fill={theme === "dark" ? "#fff" : "black"} />,
      cName: "nav-text",
    },
    {
      title: "Todo List",
      path: "/todo-list",
      icon: <IoIcons.IoIosPaper fill={theme === "dark" ? "#fff" : "black"} />,
      cName: "nav-text",
    },
    {
      title: "Movie App",
      path: "/movie",
      icon: <IoIcons.IoMdFilm fill={theme === "dark" ? "#fff" : "black"} />,
      cName: "nav-text",
    },
    {
      title: "Weather",
      path: "/weather",
      icon: <FaIcons.FaSun fill={theme === "dark" ? "#fff" : "black"} />,
      cName: "nav-text",
    },
    {
      title: "Recipe App",
      path: "/recipe",
      icon: <IoIcons.IoIosCafe fill={theme === "dark" ? "#fff" : "black"} />,
      cName: "nav-text",
    },
    {
      title: "FileConverter",
      path: "/fileconverter",
      icon: <FaIcons.FaFile fill={theme === "dark" ? "#fff" : "black"} />,
      cName: "nav-text",
    },
    {
      title: "TicTacToe",
      path: "/tictactoe",
      icon: <FaIcons.FaGamepad fill={theme === "dark" ? "#fff" : "black"} />,
      cName: "nav-text",
    },
    {
      title: "Drawing",
      path: "/drawing",
      icon: <FaIcons.FaPen fill={theme === "dark" ? "#fff" : "black"} />,
      cName: "nav-text",
    },
    {
      title: "Stopwatch",
      path: "/stopwatch",
      icon: <FaIcons.FaClock fill={theme === "dark" ? "#fff" : "black"} />,
      cName: "nav-text",
    },
    {
      title: "QR Code",
      path: "/qrcode",
      icon: (
        <IoIcons.IoMdQrScanner fill={theme === "dark" ? "#fff" : "black"} />
      ),
      cName: "nav-text",
    },
  ];

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value === "") {
      setSuggestions([]);
    } else {
      const suggestions = await fetchSuggestions(value);
      setSuggestions(suggestions);
      setSuggestionSelected(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Open the sidebar by default on mobile devices (adjust the width as needed)
    if (windowWidth >= 768) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  }, [windowWidth]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={`navbar ${theme === "dark" ? "dark-theme" : ""}`}>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars
              onClick={showSidebar}
              fill={theme === "dark" ? "#fff" : "black"}
            />
          </Link>
          <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              placeholder="Search"
              type="search"
              className="input"
              value={searchTerm}
              onChange={handleInputChange}
            />
            {suggestionSelected && (
              <div className="suggestions-div">
                {suggestions.map((suggestion, index) => (
                  <span key={index} className="list-suggesstions">
                    <Link
                      to={suggestion.path}
                      className="list-link"
                      onClick={() => {
                        showSidebar();
                        setSuggestionSelected(false);
                      }}
                    >
                      {suggestion.title}
                    </Link>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="check">
            <ThemeToggle />
          </div>
        </div>
        <nav
          className={`nav-menu ${
            sidebar ? (theme === "dark" ? "dark-theme" : "active") : ""
          }`}
        >
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars-1">
                <AiIcons.AiOutlineClose
                  fill={theme === "dark" ? "#fff" : "black"}
                />
              </Link>
            </li>
            <Profile />
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
