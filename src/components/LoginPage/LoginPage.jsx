import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import "./LoginPage.css"

function LoginPage() {
  const history = useHistory();

  return (
    <div>
    <div className="login-page">

<img src={require("./tealbox.jpg")} />
      <LoginForm />

  
    </div>
    <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
