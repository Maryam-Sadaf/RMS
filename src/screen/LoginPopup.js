// LoginPopup.js

import React from 'react';
import { observer } from 'mobx-react';
import { RiCloseLine } from 'react-icons/ri';
import { FaUser, FaLock } from 'react-icons/fa';
import group2 from '../asset/Frame 1.png';
import storelogin from '../store/Storelogin';
import '../../src/screen/header.css';
import { useNavigate } from 'react-router-dom';

const LoginPopup = observer(() => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    storelogin.togglePopup();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    storelogin.setFormField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storelogin.formFields.username || !storelogin.formFields.password) {
      alert('Please fill in all the required fields.');
      return;
    }
    storelogin.clearFormFields();
    storelogin.setIsPopupOpen(false);
  
    navigate('sidebar');
  };
  
    // const isValid = storelogin.validateForm();
    // if (isValid) {
      // Perform the login logic here if needed
      // storelogin.login();

      // Clear form fields
    //   storelogin.clearFormFields();

    //   // Close the popup
    //   storelogin.setIsPopupOpen(false);

      // Navigate to the '/navbar' route
    //   navigate('/Sidebar');
    // }
  
  return storelogin.isPopupOpen ? (
    <div className="popup">
      <div className="form-container">
        <div className="top-heading" onClick={handleIconClick}>
          <img src={group2} alt="Logo" className="img-container" />
          <span className="closeicon">
            <RiCloseLine />
          </span>
        </div>
        <h2 className="admin-heading">Admin</h2>
        <div className="input-field">
          <div className="paas-icon">
            <FaUser className="icon" />
          </div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            autoComplete="username"
            value={storelogin.formFields.username}
            onChange={handleInputChange}
        
          />
        </div>
        <div className="input-field">
          <div className="pass-icon">
            <FaLock className="icon" />
          </div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            autoComplete="password"
            value={storelogin.formFields.password}
            onChange={handleInputChange}
        
          />
        </div>
        {/* {storelogin.errors && <p className="error-message">{storelogin.errors}</p>} */}
        <button className="login-button" onClick={handleSubmit}>Login
        </button>
      </div>
    </div>
  ) : null;
});

export default LoginPopup;
