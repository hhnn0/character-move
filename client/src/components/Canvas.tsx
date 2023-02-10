import React, { Ref } from "react";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import Tree from "../assets/tree.png";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawBackground = () => {
    const canvasCur = canvasRef.current as HTMLCanvasElement;
    const ctx = canvasCur.getContext("2d");
    const bgImage = new Image();
    bgImage.src = Tree;
    if (ctx === null) return;
    ctx.drawImage(bgImage, 0, 0, window.innerWidth, window.innerHeight);
  };

  return <Wrapper></Wrapper>;
}
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
