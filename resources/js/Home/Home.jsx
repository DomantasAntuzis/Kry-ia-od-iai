import React, { useState } from "react"
import Registration from "../Forms/registration";
import Login from "../Forms/login";

export default function Home() {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const displayRegisterForm = () => {
        setShowRegister(!showRegister);
        setShowLogin(false)
      };

    const displayLoginForm = () => {
        setShowLogin(!showLogin);
        setShowRegister(false);
      };

    return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                Navbar
                </a>
                <div className="d-flex">
                    <button className="btn btn-outline-success" onClick={displayLoginForm}>Login</button>
                    <button className="btn btn-outline-success" onClick={displayRegisterForm}>
                        Register
                    </button>
                </div>
            </div>
        </nav>
    {showRegister && (
        <Registration></Registration>
    )}
    {showLogin && (
        <Login></Login>
    )}
    </>
  )
}
