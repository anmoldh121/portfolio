import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import Navbar from "./components/navbar";
import Intro from "./components/intro";
import Rotator from "./components/rotator";

function Box(props) {
  return (
    <mesh {...props}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

function Sphere(props) {
  const mesh = useRef();
  const toggle = useRef();
  toggle.current = true;

  useFrame(() => {
    if (mesh.current.position.y < 3 || mesh.current.position.y > 3.8) {
      toggle.current = !toggle.current;
    }
    mesh.current.position.y =
      mesh.current.position.y + (toggle.current ? 0.02 : -0.02);
  });

  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="#5DC2A4"
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Canvas camera={{ position: [5, 2, 5] }} style={{ height: "100vh" }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          intensity={0.5}
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
        />
        <spotLight position={[14, 0, 0]} angle={0.5} />
        <group position={[-0.15, -4.4, 0]}>
          <Box scale={[3, 4, 1]} position={[1.5, 0, -0.1]} />
          <Box scale={[1, 4, 2]} position={[0, 0, 0.4]} />
          <Box scale={[1, 4, 2]} position={[1.2, 0, 1.9]} />
          <Box scale={[1, 4, 1]} position={[0.2, 0, 2.4]} />
          <Box scale={[1, 4, 1]} position={[2.5, 0, 0.9]} />
          <Sphere position={[0, 3, 0]} scale={[0.8, 0.8, 0.8]} />
        </group>
      </Canvas>
      <Intro />
      {/* <Rotator
        elements={["Developer", "Engineer", "Learner"]}
        id="primary-rotator"
      /> */}
    </>
  );
}

export default App;
