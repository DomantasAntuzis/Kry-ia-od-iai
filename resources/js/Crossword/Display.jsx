import React, { useState, useEffect } from "react";
import "../../scss/styles.scss";

export default function Maker(props) {
    const [name, setName] = useState("");
    const [gridSize, setGridSize] = useState({ rows: 10, cols: 15 });
    const [grid, setGrid] = useState(
        Array.from({ length: gridSize.rows }).map(() =>
            Array.from({ length: gridSize.cols }).fill({
                letter: null,
                selected: false,
            })
        )
    );
    const [words, setWords] = useState([]);
    const [usedWords, setUsedWords] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const apiToken = props.apiToken;

    useEffect(() => {
        setGrid(
            Array.from({ length: gridSize.rows }).map(() =>
                Array.from({ length: gridSize.cols }).fill({
                    letter: null,
                    // selected: false,
                })
            )
        );
    }, []);

    useEffect(() => {
        setGrid(
            Array.from({ length: gridSize.rows }).map(() =>
                Array.from({ length: gridSize.cols }).fill({
                    letter: null,
                    // selected: false,
                })
            )
        );
    }, [gridSize]);

    // check if word can be added

    const canAddWord = (word, startRow, startCol, grid) => {
        const { direction } = word;
        const letters = word.word.split("");

        for (let i = 0; i < letters.length; i++) {
            let row, col;
            if (direction === "right") {
                row = startRow;
                col = startCol + i;
            } else if (direction === "down") {
                row = startRow + i;
                col = startCol;
            } else if (direction === "left") {
                row = startRow;
                col = startCol - i;
            } else if (direction === "up") {
                row = startRow - i;
                col = startCol;
            }

            // Check if the letter in the grid matches the letter in the word
            if (grid[row][col].letter && grid[row][col].letter !== letters[i]) {
                return false;
            }

            // Check if the letter in the grid is shared with another word
            if (grid[row][col].word) {
                const sharedLetter = grid[row][col].word.find(
                    (letter) => letter === letters[i]
                );
                if (sharedLetter && sharedLetter !== letters[i]) {
                    return false;
                }
            }
        }

        return true;
    };

    const handleCellClick = (row, col) => {
        if (selectedWord) {
            const startRowIndex = row;
            const startColIndex = col;

            if (canAddWord(selectedWord, startRowIndex, startColIndex, grid)) {
                // Add the selected word to the grid
                setGrid((prevGrid) => {
                    const newGrid = [...prevGrid];

                    // Add the word horizontally
                    if (selectedWord.direction === "right") {
                        for (
                            let coll = 0;
                            coll < selectedWord.word.length;
                            coll++
                        ) {
                            const letter = selectedWord.word.charAt(coll);
                            newGrid[startRowIndex][startColIndex + coll] = {
                                letter,
                                selected: false,
                            };
                        }
                        setUsedWords([
                            ...usedWords,
                            {
                                word: selectedWord.word,
                                direction: "right",
                            },
                        ]);
                        // console.log(selectedWord)
                    }

                    // Add the word vertically
                    else if (selectedWord.direction === "down") {
                        for (
                            let roww = 0;
                            roww < selectedWord.word.length;
                            roww++
                        ) {
                            const letter = selectedWord.word.charAt(roww);
                            newGrid[startRowIndex + roww][startColIndex] = {
                                letter,
                                selected: false,
                            };
                        }
                        setUsedWords([
                            ...usedWords,
                            {
                                word: selectedWord.word,
                                direction: "down",
                            },
                        ]);
                    }

                    // Add the word from right to left
                    else if (selectedWord.direction === "left") {
                        for (
                            let coll = 0;
                            coll < selectedWord.word.length;
                            coll++
                        ) {
                            const letter = selectedWord.word.charAt(coll);
                            newGrid[startRowIndex][startColIndex - coll] = {
                                letter,
                                selected: false,
                            };
                        }
                        setUsedWords([
                            ...usedWords,
                            {
                                word: selectedWord.word,
                                direction: "left",
                            },
                        ]);
                    }

                    // Add the word from bottom to top
                    else if (selectedWord.direction === "up") {
                        for (
                            let roww = 0;
                            roww < selectedWord.word.length;
                            roww++
                        ) {
                            const letter = selectedWord.word.charAt(roww);
                            newGrid[startRowIndex - roww][startColIndex] = {
                                letter,
                                selected: false,
                            };
                        }
                        setUsedWords([
                            ...usedWords,
                            {
                                word: selectedWord.word,
                                direction: "up",
                            },
                        ]);
                    }

                    return newGrid;
                });
            }
        }
    };

    const handleAddWord = (event) => {
        event.preventDefault();
        const input = event.target.elements.word;
        const newWord = input.value;
        setWords([
            ...words,
            {
                word: newWord,
                direction: "right",
            },
        ]);
        input.value = "";
    };

    const handleWordSelection = (word) => {
        setSelectedWord(word);
        //  handleAddSelectedWord(word);
        console.log(word);
    };

    const handleWordChange = (event, i, key) => {
        const newWords = [...words];
        newWords[i][key] = event.target.value;
        setWords(newWords);
    };

    // change grid size
    const handleGridSizeChange = (rows, cols) => {
        setGridSize({ rows, cols });
        console.log(grid);
    };

    //fill empty spaces
    const fillEmptySquares = () => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row) =>
                row.map((cell) => {
                    if (!cell.letter) {
                        const randomLetter = String.fromCharCode(
                            65 + Math.floor(Math.random() * 26)
                        );
                        return { ...cell, letter: randomLetter };
                    }
                    return cell;
                })
            );
            console.log(newGrid);
            return newGrid;
        });
    };

    const test = () => {
        console.log(grid);
        console.log(usedWords);
        console.log(apiToken);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { name: name, grid: grid, usedWords:usedWords };
        console.log(data)
        // url kad ir koks jis yra.
        fetch("api/store", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Authorization: `Bearer ${apiToken}`,
        },
        //   "X-CSRF-TOKEN": csrfToken,
          body: JSON.stringify(data),
        })
          .then((response) => {
            console.log("Form submitted successfully");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
      };
    

    return (
        <div className="crossword">
            <div className="table-container">
                <div id="addWord">
                    <form onSubmit={handleAddWord} id="addWordForm">
                        <input
                            type="text"
                            name="word"
                            placeholder="Enter a word"
                        />
                        <button type="submit">Add</button>
                    </form>
                    <div>
                        <h2>Words</h2>
                        <ul className="wordList">
                            {words.map((word, i) => (
                                <li key={i}>
                                    <input
                                        type="text"
                                        value={word.word}
                                        onChange={(event) =>
                                            handleWordChange(event, i, "word")
                                        }
                                        readOnly
                                    />
                                    <select
                                        value={word.direction}
                                        onChange={(event) =>
                                            handleWordChange(
                                                event,
                                                i,
                                                "direction"
                                            )
                                        }
                                    >
                                        <option value="right">Right</option>
                                        <option value="down">Down</option>
                                        <option value="left">Left</option>
                                        <option value="up">Up</option>
                                    </select>
                                    <button
                                        onClick={() =>
                                            handleWordSelection(word)
                                        }
                                    >
                                        Select
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <table>
                    <tbody>
                        {grid.map((row, i) => (
                            <tr key={i}>
                                {row.map(({ letter, selected }, j) => (
                                    <td
                                        key={`${i}-${j}`}
                                        className={selected ? "selected" : ""}
                                        data-row={i}
                                        data-col={j}
                                        onClick={() => handleCellClick(i, j)}
                                    >
                                        {letter}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedWord && (
                    <div id="selectedWord">
                        <h2>Selected Word</h2>
                        <h5>Choose starting square</h5>
                        <p>Word: {selectedWord.word}</p>
                        <p>Direction: {selectedWord.direction}</p>
                    </div>
                )}
            </div>
            <div id="functionBtns">
                <div>
                    <h2>Grid Size</h2>
                    <button onClick={() => handleGridSizeChange(5, 10)}>
                        5x10
                    </button>
                    <button onClick={() => handleGridSizeChange(10, 15)}>
                        10x15
                    </button>
                    <button onClick={() => handleGridSizeChange(15, 20)}>
                        15x20
                    </button>
                </div>
                <div>
                    <h2>fill empty spaces</h2>
                    <button onClick={fillEmptySquares}>fill</button>
                    <button onClick={test}>current grid</button>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
