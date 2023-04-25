import React, {useState, useEffect} from "react";
import Registration from "../Forms/registration";
import Login from "../Forms/login";

export default function Home() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [apiToken, setApiToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

    useEffect(() => {
        function handleStorageChange() {
            setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
        }

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    //display register form

    const displayRegisterForm = () => {
        setShowRegister(!showRegister);
        setShowLogin(false);
    };

    //display login form

    const displayLoginForm = () => {
        setShowLogin(!showLogin);
        setShowRegister(false);
    };

    //logout logic

    const handleLogout = () => {
        // console.log(csrfToken)
        fetch('api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "X-CSRF-TOKEN": csrfToken,
                'Authorization': `Bearer ${apiToken}`
            },
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (response.ok) {
                    localStorage.removeItem('IsLoggedIn');
                    setIsLoggedIn(false);
                    console.log('User logged out successfully.');
                } else {
                    throw new Error('Logout failed.');
                }
            })
            //this should be before fetch
            .then((data) => {
                // Access the data in the response
                // console.log(data.message);
                // const token = data.sukurtas_token;
                // console.log("Naujas_Token", token);
            })
            .catch((error) => {
                console.error('Logout failed.', error);
            });
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Navbar
                    </a>
                    <div className="d-flex">
                        {isLoggedIn ? (
                            <button
                                className="btn btn-outline-success"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        ) : (
                            <div>
                                <button
                                    className="btn btn-outline-success"
                                    onClick={displayLoginForm}
                                >
                                    Login
                                </button>
                                <button
                                    className="btn btn-outline-success"
                                    onClick={displayRegisterForm}
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {showRegister && !isLoggedIn && <Registration setApiToken={setApiToken}></Registration>}
            {showLogin && !isLoggedIn && <Login setApiToken={setApiToken}></Login>}
        </>
    );
}
