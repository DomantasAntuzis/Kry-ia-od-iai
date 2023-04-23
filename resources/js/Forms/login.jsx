import React, {useState} from "react";
import Registration from "@/Forms/registration";
import Home from "@/Home/Home";

export default function Login() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(csrfToken)
        fetch("api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    // Set login success state to true
                    setLoginSuccess(true);

                    // Registration success, clear form data
                    setFormData({
                        name: "",
                        password: "",
                    });

                    console.log("Login success!");
                } else {
                    // Registration failed, handle error
                    console.error("Login failed.");
                }
            })
            .catch((error) => {
                console.error("Login failed.", error);
            });
    };

    // Access login success state
    if (loginSuccess) {
        console.log(loginSuccess);
    }


    // const LogOut = () =>{
    //     fetch("api/logout", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             "X-CSRF-TOKEN": csrfToken,
    //         },
    //     })
    // }
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>
                <input type="password" placeholder="Password" name="password" value={formData.password}
                       onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
    <Home loginSuccess={loginSuccess} />
        </div>
    );
}
