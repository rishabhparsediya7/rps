import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const submitHandler = () => {
    localStorage.setItem("username", name);
    navigate("/start");
  };
  useEffect(() => {
    const username = localStorage.getItem("username");
    localStorage.clear();
    localStorage.setItem('username', username)
  }, []);
  const startGame = () => {
    if (!localStorage.getItem("username")) {
      setModalOpen(!modalOpen);
    } else {
      navigate("/start");
    }
  };
  return (
    <div className="w-full">
      {modalOpen && (
        <div className="w-96 transition-opacity z-20 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto border-[0.020rem] border-dashed border-gray-400 rounded-md">
          <div
            className="absolute -right-2 -top-3"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <i className="bi bi-x-square-fill text-lg cursor-pointer"></i>
          </div>
          <div className="p-10">
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="name"
                className="absolute -top-3 left-2 text-sm bg-white px-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none border-2 border-gray-400 p-1 rounded-md"
              />
              <button
                onClick={submitHandler}
                className="bg-black uppercase text-center w-full text-white p-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="absolute w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex w-full justify-between">
          <button
            onClick={startGame}
            className="bg-black text-center w-40 text-white p-2 rounded-md"
          >
            Start Game
          </button>
          <a
            href="/join-game"
            className="bg-black text-center w-40 text-white p-2 rounded-md"
          >
            Join a Game
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
