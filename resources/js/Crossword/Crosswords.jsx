import {useState, useEffect} from "react";

export default function crosswords(props) {

    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {

        console.log(!props.crosswords_loaded);
        if (!props.crosswords_loaded) {
            fetch("api/main", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Something wrong!");
                    }
                })
                .then((data) => {
                    console.log(data);

                    props.set_crossword_loaded(true);
                    props.setfetch_crossword(
                        <div className="container">
                            <div className="row row-cols-1 row-cols-md-4 g-4">
                                {data.map((element, index) => (
                                    <div className="col">
                                        <div className="card border-success mb-3" style={{maxWidth: "18rem"}}
                                             key={index}>
                                            <div
                                                className="card-header bg-transparent border-success text-center">{element.name}</div>
                                            <div className="card-body ">
                                                <p className="card-text">
                                                    {element.difficulty === 1 ? (
                                                        <p className="text-success">easy</p>
                                                    ) : element.difficulty === 2 ? (
                                                        <p className="text-warning">medium</p>
                                                    ) : (
                                                        <p className="text-danger">hard</p>
                                                    )}
                                                </p>
                                            </div>
                                            <div className="card-footer bg-transparent border-success">Žodžių
                                                kiekis {element.words.length}</div>
                                            {/*<h1>{element._id}</h1>*/}
                                            <button onClick={() => setSelectedId(element._id)}
                                                    className="btn btn-outline-dark">Žaisti
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );

                })

                .catch((error) => {
                    console.error("Something wrong!.", error);
                });
        }

    }, [props.fetch_crossword, props.crosswords_loaded]);

    useEffect(() => {
        if (selectedId !== null) {
            fetch(`/api/show/${selectedId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        console.log(response);
                        return response.json();
                    } else {
                        throw new Error("Something wrong!");
                    }
                })
                .then((data) => {
                    // Handle the response data here
                    console.log(data.crossword.name);
                })
                .catch((error) => {
                    console.error("Something wrong!.", error);
                });
        }
    }, [selectedId]);

    console.log(props.fetch_crossword);

    return <div>{props.fetch_crossword}</div>;
}
