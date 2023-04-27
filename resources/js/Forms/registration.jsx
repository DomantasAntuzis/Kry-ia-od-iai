import React, { useState } from "react";

const Registration = (props) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    localStorage.setItem('isLoggedIn', 'true');

                    const event = new Event("storage");
                    window.dispatchEvent(event);

                    // Registration success, clear form data
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                    });
                    console.log("Registration success!");
                    return response.json();
                } else {
                    // Registration failed, handle error
                    console.error("Registration failed.");
                }
            }).then((data) => {
                // Access the data in the response
                // console.log(data.message);
                console.log("Naujas_Token", data.token);
                props.setApiToken(data.token);
            })
            .catch((error) => {
                console.error("Registration failed.", error);
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Registration;
