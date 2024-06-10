import React from 'react';
import { observer } from 'mobx-react';
import '../../src/screen/header.css';
import logo3 from '../../src/asset/Edureka.png';
// import storelogin from '../store/storelogin';
import storelogin from '../store/Storelogin';
// import { useNavigate } from 'react-router-dom';
import Herosection from '../screen/Herosection';
import LoginPopup from './LoginPopup';



const Header = () => {
  const handleLogin = () => {
    storelogin.setIsPopupOpen(true);
    console.log(storelogin.isPopupOpen)
  };
  return (
    <>
      <header>
        <div className="logo">
          <img src={logo3} alt="" />
        </div>
        <nav>
          <ul>
            <li>
              <a >Home</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Feedback</a>
            </li>
          </ul>
        </nav>
        <div className="login">
          <button onClick={handleLogin}>Login</button>
        </div>
      </header>
      {
        storelogin.isPopupOpen && <LoginPopup />
      }

      < Herosection />

    </>
  );
};

export default observer(Header);