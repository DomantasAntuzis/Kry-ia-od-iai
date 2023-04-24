import React, {useState} from "react";

export default function Login() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const [formData, setFormData] = useState({
        email: null,
        password: null,
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
                    localStorage.setItem('isLoggedIn', 'true');

                    const event = new Event("storage");
                    window.dispatchEvent(event);

                    setLoginSuccess(true);
                    console.log(response);
                    // Registration success, clear form data
                    setFormData({
                        name: "",
                        password: "",
                    });

                    console.log("Login success!");
                    // Parse the JSON response
                    return response.json();
                } else {
                    // Handle error response
                    throw new Error("Login failed.");
                }
            })
            .then((data) => {
                // Access the data in the response
                console.log(data.message);
                console.log("Naujas_Token", data.sukurtas_token);
            })
            .catch((error) => {
                console.error("Login failed.", error);
            });
    };


    // Access login success state
    if (loginSuccess) {
        console.log(loginSuccess);
    }
    
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" name="email" value={formData.email || ''} onChange={handleChange}/>
                <input type="password" placeholder="Password" name="password" value={formData.password || ''}
                       onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
