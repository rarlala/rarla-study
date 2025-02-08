import React, { useState } from "react";

export function App() {
  const [size, setSize] = useState(0);

  const handleDraw = () => {
    const square = Array.from({ length: size }, () => Array(size).fill("O"));

    for (let i = 0; i < size; i++) {
      square[i][0] = "X";
      square[0][i] = "X";
      square[i][size - 1] = "X";
      square[size - 1][i] = "X";
      square[i][i] = "X";
      square[i][size - 1 - i] = "X";
    }

    window.alert(square.map((row) => row.join("")).join("\n"));
  };

  return (
    <div className="App">
      <h1>Draw Square</h1>
      <div>
        Input Size:{" "}
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
        <button onClick={handleDraw}>Go</button>
      </div>
    </div>
  );
}
