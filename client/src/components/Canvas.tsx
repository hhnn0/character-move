import React, { Ref } from "react";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import Map from "../assets/map.png";
import Characters from "../assets/characters.png";

interface Character {
  direction: string;
  positionX: number;
  positionY: number;
  currentFrame: number;
  characterImg: number[];
}

export default function Canvas() {
  const [pressedKey, setPressedKey] = useState(false);
  const [background, setBackground] = useState({ x: 0, y: 0 });
  const [character, setCharacter] = useState<Character[]>([
    {
      direction: "down",
      positionX: 0,
      positionY: 0,
      currentFrame: 0,
      characterImg: [33, 192],
    },
  ]);
  const animationArray = [32, 0, 64];

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = () => {
    const canvasCur = canvasRef.current as HTMLCanvasElement;
    const ctx = canvasCur.getContext("2d");
    const bgImage = new Image();
    bgImage.src = Map;
    if (ctx === null) return;
    ctx.drawImage(bgImage, 33, 0, 552, 651, 0, 0, 510, 600);
  };

  const drawCharacter = (e: any) => {
    let [x, y] = characterDirection(e);
    const canvasCur = canvasRef.current as HTMLCanvasElement;
    const ctx = canvasCur.getContext("2d");
    if (ctx === null) return;
    const characterImage = new Image();
    characterImage.src = Characters;
    characterImage.onload = function () {
      ctx.drawImage(
        characterImage,
        x + animationArray[e.currentFrame],
        y,
        31,
        31,
        e.positionX, //
        e.positionY, //
        30,
        30
      );
    };
  };

  const characterDirection = (e: any) => {
    switch (e.direction) {
      case "left":
        return [e.characterImg[0], e.characterImg[1] + 32];
      case "right":
        return [e.characterImg[0], e.characterImg[1] + 64];
      case "up":
        return [e.characterImg[0], e.characterImg[1] + 96];
      default:
        return [e.characterImg[0], e.characterImg[1]];
    }
  };

  const handleCharacter = (e: any) => {
    let myCharacter = character[0];
    switch (e.key) {
      case "ArrowUp":
        if (!pressedKey) {
          let frame = 0;
          let cnt = 0;
          let prevY = myCharacter.positionY;
          const timer = setInterval(() => {
            prevY -= 5;
            setCharacter((prevCharacter) => {
              if (frame < 2) {
                frame += 1;
              } else {
                frame = 0;
              }
              return [
                {
                  ...myCharacter,
                  positionY: prevY,
                  currentFrame: frame,
                  direction: "up",
                },
              ];
            });
            cnt++;
            if (cnt === 6) {
              setPressedKey(false);
              clearInterval(timer);
            }
          }, 40);
        }
        break;
      case "ArrowDown":
        if (!pressedKey) {
          let frame = 0;
          let cnt = 0;
          let prevY = myCharacter.positionY;
          const timer = setInterval(() => {
            prevY += 5;
            setCharacter((prevCharacter) => {
              if (frame < 2) {
                frame += 1;
              } else {
                frame = 0;
              }
              return [
                {
                  ...myCharacter,
                  positionY: prevY,
                  currentFrame: frame,
                  direction: "down",
                },
              ];
            });
            cnt++;
            if (cnt === 6) {
              setPressedKey(false);
              clearInterval(timer);
            }
          }, 40);
        }
        break;
      case "ArrowLeft":
        if (!pressedKey) {
          let frame = 0;
          let cnt = 0;
          let prevX = myCharacter.positionX;
          const timer = setInterval(() => {
            prevX -= 5;
            setCharacter((prevCharacter) => {
              if (frame < 2) {
                frame += 1;
              } else {
                frame = 0;
              }
              return [
                {
                  ...myCharacter,
                  positionX: prevX,
                  currentFrame: frame,
                  direction: "left",
                },
              ];
            });
            cnt++;
            if (cnt === 6) {
              setPressedKey(false);
              clearInterval(timer);
            }
          }, 40);
        }
        break;
      case "ArrowRight":
        if (!pressedKey) {
          let frame = 0;
          let cnt = 0;
          let prevX = myCharacter.positionX;
          const timer = setInterval(() => {
            prevX += 5;
            setCharacter((prevCharacter) => {
              if (frame < 2) {
                frame += 1;
              } else {
                frame = 0;
              }
              return [
                {
                  ...myCharacter,
                  positionX: prevX,
                  currentFrame: frame,
                  direction: "right",
                },
              ];
            });
            cnt++;
            if (cnt === 6) {
              setPressedKey(false);
              clearInterval(timer);
            }
          }, 40);
        }
        break;
      default:
    }
  };

  useEffect(() => {
    drawBackground();
    drawCharacter(character[0]);
  }, [background, character]);

  return (
    <Wrapper>
      <canvas
        ref={canvasRef}
        width="510px"
        height="600px"
        onKeyDown={handleCharacter}
        tabIndex={0}
      ></canvas>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const CanvasComponent = styled.canvas``;
