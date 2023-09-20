import React, { useEffect, useState } from "react";

const Home = () => {
  const [xTurn, setXTurn] = useState(true);
  const [won, setWon] = useState();
  const [winner, setWinner] = useState();
  const [boardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });

  const Winningcombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    function checkWinner() {
      for (const keys of Winningcombo) {
        const value = keys.map((k) => boardData[k]);
           if (value.every((v) => v === "x")) {
          setWon(true);
          setWinner("x");
          console.log("called 1");
                    } else if (value.every((v) => v === "o")) {
               setWon(true);
          setWinner("o");
console.log("called 2");  
        }
      }
      if (Object.values(boardData).every((v) => v === "x" || v === "o")) {
        setWon(true);
        setWinner("draw");
 console.log("call 3");
      }
    }

    checkWinner();
  }, [boardData]);

  const updateBoardData = (idx) => {
    if (won || boardData[idx] || Object.values(boardData).every((v) => v === "x" || v === "o")) {
      return;
    }
    let value = xTurn ? "x" : "o";
    setBoardData({ ...boardData, [idx]: value });
  setXTurn(!xTurn);
  };

  const resetgame = () => {
    setBoardData({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setWinner(null);
    setXTurn(false);
    setWon()
  };

  return (
    <div><h1 className= "flex items-center place-content-center leading-10">tik tak</h1>
    <div className="flex items-center place-content-center py-16">
    
      {(winner === "o" || winner === "x") && (
        <h1 className="text-2xl mt-4">Winner : {winner}</h1>
      )}
      <div className="grid gap-4 grid-cols-3 grid-rows-3 bg-slate-300">
        {[...Array(9)].map((value, idx) => (
          <div
            key={idx}
            onClick={() => updateBoardData(idx)}
            className="border border-white w-16 h-16 text-white flex items-center justify-center text-[30px] hover:bg-slate-300  bg-slate-500"
          >
            {boardData[idx]}
          </div>
        ))}
      </div>
      {winner && (
        <button
          onClick={resetgame}
          className="mt-4 bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600"
        >
          Reset Game
        </button>
      )}
    </div> 
    </div>   
  );

};

export default Home;
