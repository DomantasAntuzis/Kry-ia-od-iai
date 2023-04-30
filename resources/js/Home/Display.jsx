import React, { useState, useEffect } from "react";
import "../../scss/styles.scss";

const GRID_SIZE = { rows: 10, cols: 15 };

export default function Home() {
  const [grid, setGrid] = useState(
    Array.from({ length: GRID_SIZE.rows }).map(() =>
      Array.from({ length: GRID_SIZE.cols }).fill({ letter: null, selected: false })
    )
  );
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    setGrid(
      Array.from({ length: GRID_SIZE.rows }).map(() =>
        Array.from({ length: GRID_SIZE.cols }).fill({ letter: null, selected: false })
      )
    );
  }, []);

  // check if word can be added

  const canAddWord = (word, startRow, startCol, grid) => {
    const { direction } = word;
    const letters = word.word.split("");
  
    for (let i = 0; i < letters.length; i++) {
      const row = direction === "across" ? startRow : startRow + i;
      const col = direction === "across" ? startCol + i : startCol;
  
      // Check if the letter in the grid matches the letter in the word
      if (grid[row][col].letter && grid[row][col].letter !== letters[i]) {
        return false;
      }
  
      // Check if the letter in the grid is shared with another word
      if (grid[row][col].word) {
        const sharedLetter = grid[row][col].word.find((letter) => letter === letters[i]);
        if (sharedLetter && sharedLetter !== letters[i]) {
          return false;
        }
      }
    }
  
    return true;
  };
  

  const handleCellClick = (row, col) => {
    
    if(selectedWord){
      
      const startRowIndex = row;
      const startColIndex = col;
      
      if (canAddWord(selectedWord, startRowIndex, startColIndex, grid )){
        // Add the selected word to the grid
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          
          // Add the word horizontally
          if (selectedWord.direction === "across") {
            for (let coll = 0; coll < selectedWord.word.length; coll++) {
              const letter = selectedWord.word.charAt(coll);
              newGrid[startRowIndex][startColIndex + coll] = { letter, selected: false };
            }
          }
          
          // Add the word vertically
          else {
            for (let roww = 0; roww < selectedWord.word.length; roww++) {
              const letter = selectedWord.word.charAt(roww);
              newGrid[startRowIndex + roww][startColIndex] = { letter, selected: false };
            }
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
        direction: "across"
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
  
  return (
  <div className="crossword">
  <div className="table-container">
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
  </div>
  <form onSubmit={handleAddWord}>
  <input type="text" name="word" placeholder="Enter a word" />
  <button type="submit">Add</button>
  </form>
  <div>
  <h2>Words</h2>
  <ul>
  {words.map((word, i) => (
  <li key={i}>
  <input
  type="text"
  value={word.word}
  onChange={(event) => handleWordChange(event, i, "word")}
  />
  <select
  value={word.direction}
  onChange={(event) => handleWordChange(event, i, "direction")}
  >
  <option value="across">Across</option>
  <option value="down">Down</option>
  </select>
  <button onClick={() => handleWordSelection(word)}>Select</button>
  </li>
  ))}
  </ul>
  </div>
  </div>
  );
};

