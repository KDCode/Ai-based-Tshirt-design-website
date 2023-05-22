//It is the positioning of the camera

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "../store";
//we are passing some children component to camera rig -- centre and camera-rig
const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  //this hook allows us to execute the code on every render frame(update control, render effect)

  useFrame((state, delta) => {
    //for responsive
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    //set the initial of the model
    let targetPosition = [-0.4, 0, 2];
    //if we are on home page
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }
    //set camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    //set the model rotaion
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
