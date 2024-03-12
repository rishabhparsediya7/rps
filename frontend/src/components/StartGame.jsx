import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const StartGame = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleStartGame = async () => {
    const response = await axios.post("http://localhost:8000/game/create", {
      code: code,
      codeGeneratedBy: localStorage.getItem("username"),
      joined: false,
    });
    console.log(response);
    if (response.status == 200) {
      localStorage.setItem("gameId", response.data.gameId);
      localStorage.setItem("usertype", "creator");
      navigate("/game");
    }
  };
  useEffect(() => {
    function generateCode() {
      let string =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXVZ1234567890";
      let generatedCode = "";
      for (var i = 0; i < 10; i++) {
        generatedCode += string[Math.floor(Math.random() * string.length)];
      }
      setCode(generatedCode);
      localStorage.setItem("code", generatedCode);
    }
    generateCode();
  }, []);

  return (
    <div className="w-full">
      <div className="absolute flex flex-col gap-2 w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex w-full justify-center">
          <div className="text-center border-2 border-dashed flex-grow flex align-middle justify-center">
            <h1 className="my-auto">{code}</h1>
          </div>
          <button
            onClick={handleCopy}
            className="bg-black text-center w-28 uppercase tracking-wider text-white p-2 rounded-r-md"
          >
            Copy
          </button>
        </div>
        <div className="w-full">
          <button
            onClick={() => handleStartGame()}
            className="bg-black w-full text-center uppercase tracking-wider text-white p-2"
          >
            Start Game
          </button>
        </div>
        <div>
          <p className="text-center p-2 bg-lime-200 text-green-700 rounded-lg">
            Copy and share this code to your friend and start the game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartGame;
