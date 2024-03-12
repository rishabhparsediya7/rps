import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GameBoard from "./GameBoard";

const Game = ({ state }) => {
  const [data, setData] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameId = localStorage.getItem("gameId");
        const response = await axios.get(
          `http://localhost:8000/game/${gameId}`
        );
        setData(response.data);
        console.log(response.data.game.joined);
        if (response.data.game.joined == true) {
          clearInterval(fetchDataInterval);
          setHasJoined(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 2000);

    const redirectTimeout = setTimeout(() => {
      if (!hasJoined) {
        navigate("/");
        alert("The user did not join. Redirecting back...");
      }
      clearInterval(fetchDataInterval);
      clearTimeout(redirectTimeout);
    }, 120000);

    if (hasJoined) {
      clearInterval(fetchDataInterval);
      clearTimeout(redirectTimeout);
    }
    console.log(hasJoined);
    fetchData();

    return () => {
      clearInterval(fetchDataInterval);
      clearTimeout(redirectTimeout);
    };
  }, [hasJoined]);

  return (
    <div>{hasJoined ? <GameBoard /> : <div>Awaiting users to join</div>}</div>
  );
};

export default Game;
