import React from "react";
import "../sidebar/sidebar.css";
import { observer } from "mobx-react-lite";
import mylogo from "../../asset/VibesXchange Logo.png";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { menuItem } from "../sidebar/Route";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { sidebarStore } from "../../store/StoreSidebar";
import Header from "../sidebar/Header";
const Sidebar = observer(() => {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/sidebar";
  const closeSidebar = () => {
    sidebarStore.setSidebarOpen(false);
  };
  const toggleMenu = (index) => {
    sidebarStore.toggleMenu(index);
  };

  return (
    <>
      <div className="grid-container">
        {/* <Header /> */}
        <aside
          id="sidebar"
          className={sidebarStore.sidebarOpen ? "sidebar-responsive" : ""}
        >
          <div className="sidebar-title">
            <div className="sidebar-brand">
              <img src={mylogo} alt="Logo" style={{ width: "165px" }} />
            </div>
            <span
              className="material-icons-outlined"
              onClick={closeSidebar}
              style={{ cursor: "pointer" }}
            >
              <FaTimes />
            </span>
          </div>
          <ul className="link">
            {menuItem.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path} className="navlink">
                  <div className="navlink1" onClick={() => toggleMenu(index)}>
                    <div className="main-icon-name">
                      <div className="icon">{item.icon}</div>
                      {item.name}
                    </div>
                    <div className="main-menu-item-arrow">
                      {item.subitems && (
                        <div className="menu-item-arrow">
                          {sidebarStore.openMenus.includes(index) ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </NavLink>
                {item.subitems && sidebarStore.openMenus.includes(index) && (
                  <ul className="sub-menu">
                    {item.subitems.map((subitems, subIndex) => (
                      <li key={subIndex}>
                        <NavLink to={subitems.path} className="navlink">
                          <div className="navlink1">{subitems.name}</div>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>
        <main
          className={`main-container ${
            isDashboardPage ? "dashboard-content" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
});

export default Sidebar;
