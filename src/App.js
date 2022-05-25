import produce from "immer";
import { useState, useCallback, useRef } from "react";

const numRows = 40;
const numCols = 85;

const neighboursAddress = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

function App() {
  const blanKGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };
  const [grid, setGrid] = useState(blanKGrid);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const handleGrid = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    console.log(runningRef.current);
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            neighboursAddress.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(handleGrid, 100);
  }, []);

  return (
    <div className="m-auto">
      <div>
        <button
          className="px-5 bg-slate-400 p-1 m-3 rounded-md ring-1"
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              handleGrid();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          className="px-5 bg-slate-400 p-1 m-3 rounded-md ring-1"
          onClick={() => setGrid(blanKGrid)}
        >
          Clear
        </button>
      </div>
      {grid.map((row, i) => (
        <div
          className="m-auto"
          key={i}
          style={{ display: "flex", felxDirection: "column" }}
        >
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
                backgroundColor: col ? "green" : null,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
