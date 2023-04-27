import React, { useState, useEffect } from "react";
import "../../scss/styles.scss";

const words = [
  "zodis",
  "grazu",
  "veikia",
  "puikiai",
  "namas",
  "super",
  "testas"
];

const GRID_SIZE = { rows: 10, cols: 15 };

export default function Home() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const newGrid = Array.from({ length: GRID_SIZE.rows }).map(() =>
      Array.from({ length: GRID_SIZE.cols }).fill(null)
    );

    // word directions
    words.forEach((word) => {
      const directions = [
        [-1, 0], // up
        [0, -1], // left
        [1, 0], // down
        [0, 1], // right
      ];

      const row = Math.floor(Math.random() * GRID_SIZE.rows);
      const col = Math.floor(Math.random() * GRID_SIZE.cols);
      const [dRow, dCol] = directions[Math.floor(Math.random() * 4)];

      //word placement
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + i * dRow;
        const c = col + i * dCol;
        if (r < 0 || r >= GRID_SIZE.rows || c < 0 || c >= GRID_SIZE.cols) {
          fits = false;
          break;
        }
        if (newGrid[r][c] !== null && newGrid[r][c] !== word[i]) {
          fits = false;
          break;
        }
      }

      if (fits) {
        for (let i = 0; i < word.length; i++) {
          const r = row + i * dRow;
          const c = col + i * dCol;
          newGrid[r][c] = word[i];
        }
      }
    });

    // Fill the remaining spaces with random letters
    for (let r = 0; r < GRID_SIZE.rows; r++) {
      for (let c = 0; c < GRID_SIZE.cols; c++) {
        if (newGrid[r][c] === null) {
          newGrid[r][c] = String.fromCharCode(
            Math.floor(Math.random() * 26) + 65
          );
        }
      }
    }

    setGrid(newGrid);
  }, []);

  return (
    <div className="table-container">
      <table>
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={`${i}-${j}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
