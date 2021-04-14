import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import Navbar from "./components/navbar";
import Intro from "./components/intro";
import Pageable from "pageable";

function Box(props) {
  return (
    <mesh {...props}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color={props.color} />
    </mesh>
  );
}

function Sphere(props) {
  const mesh = useRef();
  const toggle = useRef();
  const aboutgroupref = useRef();
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

const Group = ({ children }) => {};

function App() {
  const anchors = ["Page 1", "Page 2"];
  const pageable = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    pageable.current = new Pageable("#container", {
      childSelector: "[data-anchor]",
      anchors: anchors,
      pips: true,
      animation: 300,
      delay: 0,
      throttle: 50,
      orientation: "vertical",
      swipeThreshold: 50, // swipe / mouse drag distance (px) before firing the page change event
      freeScroll: false, // allow manual scrolling when dragging instead of automatically moving to next page
      navPrevEl: false, // define an element to use to scroll to the previous page (CSS3 selector string or Element reference)
      navNextEl: false, // define an element to use to scroll to the next page (CSS3 selector string or Element reference)
      infinite: false, // enable infinite scrolling (from 0.4.0)
      slideshow: false,
      events: {
        wheel: true, // enable / disable mousewheel scrolling
        mouse: true, // enable / disable mouse drag scrolling
        touch: true, // enable / disable touch / swipe scrolling
        keydown: true, // enable / disable keyboard navigation
      },
      easing: function (currentTime, startPos, endPos, interval) {
        // the easing function used for the scroll animation
        return (
          -endPos * (currentTime /= interval) * (currentTime - 2) + startPos
        );
      },
      onInit: function () {
        // do something when the instance is ready
      },
      onUpdate: function (event) {
        // do something when the instance updates
      },
      onBeforeStart: function () {
        // do something before scrolling begins
      },
      onStart: function () {
        // do something when scrolling begins
      },
      onScroll: function () {
        // do something during scroll
      },
      onFinish: function (event) {
        // do something when scrolling ends
        console.log(event);
        setCurrentPage(event.index);
      },
    });
  }, []);

  const onPipClick = (anch) => {
    pageable.current.scrollToPage(anch + 1);
  };

  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <div className="pips pg-pips">
        {anchors.map((el, index) => (
          <div
            className={`pips-item ${
              currentPage === index ? "large-pip" : "small-pip"
            }`}
            // style={{
            //   boxShadow: currentPage === index ? "0 30px 40px rgb(93, 194, 164, 0.1)" : "none",
            // }}
            onClick={() => onPipClick(index)}
          ></div>
        ))}
      </div>
      <div id="container" style={{ position: "relative" }}>
        <div data-anchor="Page 1">
          <div
            className="canvas-container"
            style={{ position: "relative", zIndex: 0 }}
          >
            <Canvas
              camera={{ position: [5, 2, 5] }}
              style={{ height: "100vh" }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight
                intensity={0.5}
                castShadow
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
              />
              <spotLight position={[14, 0, 0]} angle={0.5} />
              <group position={[-0.15, -4.4, 0]}>
                <Box
                  scale={[3, 4, 1]}
                  position={[1.5, 0, -0.1]}
                  color="white"
                />
                <Box scale={[1, 4, 2]} position={[0, 0, 0.4]} color="white" />
                <Box scale={[1, 4, 2]} position={[1.2, 0, 1.9]} color="white" />
                <Box scale={[1, 4, 1]} position={[0.2, 0, 2.4]} color="white" />
                <Box scale={[1, 4, 1]} position={[2.5, 0, 0.9]} color="white" />
                <Sphere
                  position={[0, 3, 0]}
                  scale={[0.8, 0.8, 0.8]}
                  color="white"
                />
              </group>
            </Canvas>
            <Intro />
          </div>
        </div>
        <div data-anchor="Page 2">
          <div className="canvas-container" style={{ position: "relative" }}>
            <Canvas
              camera={{ position: [6, 2, 6] }}
              style={{ height: "100vh", backgroundColor: "#5dc2a4" }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight
                intensity={0.5}
                castShadow
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
              />
              <spotLight position={[14, 0, 0]} angle={0.5} />
              <group position={[0, -4, 0]}>
                <Box
                  scale={[2, 1, 2]}
                  position={[1.5, 0, 1.5]}
                  color="#5dc2a4"
                />
                <Box scale={[1, 4, 1]} position={[0, 0, 0]} color="#5dc2a4" />
                <Box scale={[1, 4, 1]} position={[2.5, 0, 0]} color="#5dc2a4" />
                <Box
                  scale={[1, 4, 1]}
                  position={[2.5, 0, 2.5]}
                  color="#5dc2a4"
                />
                <Box scale={[1, 4, 1]} position={[0, 0, 2.5]} color="#5dc2a4" />
              </group>
            </Canvas>
            <section
              className="container jumbotron heading jc-center"
              style={{ position: "absolute", top: "0.8vh", width: "100%" }}
            >
              About
            </section>
            <section
              className="about-container"
              style={{
                position: "absolute",
                top: "15vh",
                left: 0,
                backround: "red",
              }}
            >
              <p className="para">
                Hi...I'm a passionate, enthusiastic and professional Developer
                who loves nothing more than creating and developing beautiful
                web apps using all the skills I've acquired.
                <br />
                <br />
                I've experience working as a fullstack developer.
                <br />
                My favourite Technologies and skills are React, Golang, Node.js
                and ThreeJS
                <br />
                My goal is to listen, learn, understand and then execute my
                solution to the highest level.
                <br />
                <br />
                Best Regards, <br />
                Anmol Dhiman
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
