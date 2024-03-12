import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GameBoard from "./GameBoard";
const Joingame = () => {
  const [code, setCode] = useState("");
  const [redirect, setRedirect] = useState(false);
  const submitHandler = async () => {
    try {
      const response = await axios.patch(`http://localhost:8000/game/join`, {
        code: code,
      });
      console.log(response.data.game);
      if (response.data.game.joined == true) {
        setRedirect(true);
        localStorage.setItem("usertype", "receiver");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {redirect ? (
        <GameBoard />
      ) : (
        <div className="w-full sm:w-96 transition-opacity z-20 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto px-10 sm:px-0">
          <div className="border-gray-400 border-[0.020rem] p-10 rounded-md border-dashed">
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="name"
                className="absolute -top-3 left-2 text-sm bg-white px-1"
              >
                Code
              </label>
              <input
                type="text"
                id="name"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="outline-none border-2 border-gray-400 p-1 rounded-md"
              />
              <button
                onClick={() => submitHandler()}
                className="bg-black uppercase text-center w-full text-white p-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Joingame;
