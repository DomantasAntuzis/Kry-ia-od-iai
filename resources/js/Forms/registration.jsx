import React, { useState } from "react";

const Registration = () => {
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
    // console.log("CSRF Token:", csrfToken);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + csrfToken,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Registration success, redirect to login page or do something else
          console.log("Registration success!");
        } else {
          // Registration failed, handle error
          console.error("Registration failed.");
          //   console.log(response);
        }
      })
      .catch((error) => {
        console.error("Registration failed.", error);
      });
  };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" name="name" />
                <input type="email" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Registration;
