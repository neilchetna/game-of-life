import produce from "immer";
import { useState, useCallback } from "react";

const numRows = 85;
const numCols = 40;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numCols; i++) {
      rows.push(Array.from(Array(numRows), () => 0));
    }
    return rows;
  });
  const [running, setRunning] = useState(false);

  const handleGrid = useCallback(() => {
    setTimeout(handleGrid, 1000);
  }, []);

  return (
    <div>
      <button>{running ? "start" : "stop"}</button>
      {grid.map((row, i) => (
        <div key={i} style={{ display: "flex", felxDirection: "column" }}>
          {row.map((col, j) => (
            <div
              key={j}
              onClick={() => {
                const newState = produce(grid, (draft) => {
                  draft[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newState);
              }}
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: col ? "black" : null,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
