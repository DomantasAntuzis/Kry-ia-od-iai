import React, { useState } from "react";

export default function Crossword(props) {
    const [formData, setFormData] = useState({
        name: "",
        words: [],
        difficulty: "1",
    });

    const handleRadio = (value) => {
        setFormData({
            name: "",
        words: [],
        difficulty: value,
        });
        console.log(`Radio button with value ${value} clicked`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const renderWordInputs = () => {
        if (formData.difficulty === "1") {
            // Render 4 word input fields for difficulty level 1
            const wordInputs = [];
            for (let i = 1; i <= 4; i++) {
                wordInputs.push(
                    <input
                        key={i}
                        type="text"
                        placeholder={`Word ${i}`}
                        name={`word-${i}`} // Update name attribute
                        value={formData[`word-${i}`] || ""} // Update value and handleChange
                        onChange={handleChange}
                    />
                );
                console.log(formData)
            }
            return wordInputs;
        } else if (formData.difficulty === "2") {
            // Render 8 word input fields for difficulty level 2
            const wordInputs = [];
            for (let i = 1; i <= 8; i++) {
                wordInputs.push(
                    <input
                        key={i}
                        type="text"
                        placeholder={`Word ${i}`}
                        name={`word-${i}`} // Update name attribute
                        value={formData[`word-${i}`] || ""} // Update value and handleChange
                        onChange={handleChange}
                    />
                );
            }
            console.log(formData)
            return wordInputs;
        } else if (formData.difficulty === "3") {
            // Render 12 word input fields for difficulty level 3
            const wordInputs = [];
            for (let i = 1; i <= 12; i++) {
                wordInputs.push(
                    <input
                        key={i}
                        type="text"
                        placeholder={`Word ${i}`}
                        name={`word-${i}`} // Update name attribute
                        value={formData[`word-${i}`] || ""} // Update value and handleChange
                        onChange={handleChange}
                    />
                );
            }
            return wordInputs;
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        // Perform API call or other actions
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <label className="d-block">
                    easy
                    <input
                        type="radio"
                        value="1"
                        checked={formData.difficulty === "1"}
                        onClick={() => handleRadio("1")}
                        name="difficulty"
                    />
                </label>
                <label className="d-block">
                    medium
                    <input
                        type="radio"
                        value="2"
                        checked={formData.difficulty === "2"}
                        onClick={() => handleRadio("2")}
                        name="difficulty"
                    />
                </label>
                <label className="d-block">
                    hard
                    <input
                        type="radio"
                        value="3"
                        checked={formData.difficulty === "3"}
                        onClick={() => handleRadio("3")}
                        name="difficulty"
                    />
                </label>

                {renderWordInputs()}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
