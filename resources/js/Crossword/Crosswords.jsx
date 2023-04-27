export default function crosswords(){

    fetch("api/main", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                // localStorage.setItem('isLoggedIn', 'true');
// console.log(response);
                // const event = new Event("storage");
                // window.dispatchEvent(event);

                // setLoginSuccess(true);
                // console.log(response);
                // Registration success, clear form data
                // setFormData({
                //     name: "",
                //     password: "",
                // });

                // console.log("Login success!");
                // Parse the JSON response
                return response.json();
            } else {
                // Handle error response
                throw new Error("Something wrong!");
            }
        })
        .then((data) => {
            // Access the data in the response
            console.log("Naujas_Token", data);
            data.foreach(name) => {
                console.log
            }
            // props.setApiToken(data);
            const title = data.name;
            const difficulty = data.difficulty;
            const words = data.words;
            const length = words.length;
        })
        .catch((error) => {
            console.error("Something wrong!.", error);
        });


}
