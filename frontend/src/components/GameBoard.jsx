import React, { useState } from "react";
import rock from "../assets/rock.webp";
import paper from "../assets/paper.png";
import scissor from "../assets/scissor.jpg";
const GameBoard = () => {
  const imagesArray = [rock, paper, scissor];
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className="flex h-[100vh]">
      <div className="flex h-full flex-1 justify-center px-10">
        <ul className="h-full flex flex-col justify-evenly">
          {imagesArray.map((image, index) => {
            return (
              <li className="" key={index}>
                <img
                  className="w-60 h-full"
                  onClick={() => setActiveImage(imagesArray[index])}
                  src={image}
                  alt=""
                />
              </li>
            );
          })}
        </ul>
        <div className="w-full pl-6 flex justify-center align-middle">
          <img className="my-auto h-60" src={activeImage} alt="" />
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default GameBoard;
