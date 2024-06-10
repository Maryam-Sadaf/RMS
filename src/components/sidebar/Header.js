
import React from 'react';
import { observer } from 'mobx-react-lite';
import { FaBars, FaBell, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import {  useNavigate,useLocation } from "react-router-dom";
// import { sidebarStore } from '../../Store/Sidebarstore/SideStore';
import {sidebarStore} from '../../store/StoreSidebar'
// import { authStore } from '../../Store/LoginStore/AuthStore';
import store from '../../store/StudentStore';
import '../sidebar/header.css';

const Header = observer(() => {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/sidebar';
  const logoutnavigate = useNavigate();
  const handeLogout = () => {
    // authStore.logout();
     if (!store.isLoggedIn) {
      return logoutnavigate("/");
     }
  };

  

  return (
    <>
      <header className={`header ${isDashboardPage ? 'dashboard-header' : ''}`}>
          <div className="menu-icon" onClick={() => sidebarStore.setSidebarOpen(true)}>
          <span className="material-icons-outlined" style={{cursor:'pointer'}}><FaBars/></span>
          </div>
      
        <div className="header-left">
          <form id="animated-icon">
            <FaSearch className="search-icon" />
            <input type="text" name="search" placeholder="Search.." />
          </form>
        </div>
        <div className={`header-right ${isDashboardPage ? 'dashboard-header-right' : ''}`}>
          <span id="header-icon"><FaBell /></span>
          <span id="header-icon"><FaUserCircle /></span>
          <button id='logoutbtn' onClick={handeLogout}>Logout <span className="material-icons-outlined"><FaSignOutAlt /></span></button>
        </div>
      </header>
    </>
  );
});

export default Header;