import React, { useState } from 'react';
import LoginPage from './LoginAndRegistration/LoginPage';
import RegistrationPage from './LoginAndRegistration/RegistrationPage';

function App() {

  const [switchToLogin, setSwitchToLogin] = useState(true);
  const [switchToRegister, setSwitchToRegister] = useState(false);

  const handleSwitchToLogin = () => {
    setSwitchToLogin(true);
    setSwitchToRegister(false);
  };

  const handleSwitchToRegister = () => {
    setSwitchToLogin(false);
    setSwitchToRegister(true);
  };

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  
  const [registrationInfo, setRegistrationInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleLogRegInputChange = (event, formType) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
  
    if (formType === "login") {
      setLoginInfo(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else if (formType === "registration") {
      setRegistrationInfo(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.value)
    if (registrationInfo.password !== registrationInfo.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  

    const newUser = {
      email: registrationInfo.email,
      password: registrationInfo.password,
      username: registrationInfo.username,
    };

    console.log(newUser);
  
    fetch("http://localhost:4000/registerUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User creation completed");
        alert("User created successfully!");
        handleSwitchToLogin();
      });

      
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    fetch(`http://localhost:4000/findUser?email=${email}&password=${password}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then((data) => {
        
        if (data) {
          setSwitchToLogin(false);
          setSwitchToRegister(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Invalid credentials');
      });
  }

  



  return (
    <>
      {switchToLogin &&
        <LoginPage
          handleSwitchToLogin={handleSwitchToLogin}
          handleSwitchToRegister={handleSwitchToRegister}
          handleLoginSubmit={handleLoginSubmit}
          handleLogRegInputChange={handleLogRegInputChange}
        />}
      {switchToRegister &&
        <RegistrationPage
          handleSwitchToLogin={handleSwitchToLogin}
          handleSwitchToRegister={handleSwitchToRegister}
          handleRegistrationSubmit={handleRegistrationSubmit}
          handleLogRegInputChange={handleLogRegInputChange}
        />}
    </>
  );
}

export default App;
