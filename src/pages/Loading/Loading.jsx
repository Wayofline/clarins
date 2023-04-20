import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState } from "react";
import { videoResolution } from "../../services/responsive";
import logo from "../../assets/logo.svg";

const limitLoaded = 98;

let loaded = [
  false,
  false
]


/**
* @component
* @returns {React.ReactElement}
*/
export default function Loading({setLoaded}) {

  const [stateFR, setStateFR] = useState(0);
  const [stateEN, setStateEN] = useState(0);
  let $videos = [];

  function getVideoRef(id) {
    if (!$videos[id]) $videos[id] = document.querySelectorAll("video")[id];
  }

  function ckeckProgress(id) {
    // if (loaded[id]) return;
    getVideoRef(id);
    try {
      update(id, percent($videos[id].buffered.end(0)));
    }
    catch (e) {
      console.log("ckeckProgress", id, "failed")
    }
  }

  function update(id, value) {
    const ref = id === 0
      ? stateFR
      : stateEN;
    if (ref >= value) return;
    if (value >= limitLoaded) loaded[id] = true;
    if (loaded[0] && loaded[1]) {
      console.log("all loaded");
      localStorage.setItem("isInstalled", "true");
      setLoaded(true);
    }
    else {
      id === 0
        ? setStateFR(value)
        : setStateEN(value);
    }
  }

  function percent(value) {
    return Math.round(value * 100 / $videos[0].duration);
  }

  function checkTime(id) {
    // if (loaded[id]) return;
    getVideoRef(id);
    try {
      update(id, percent($videos[id].currentTime));
    } catch (error) {
      console.log("chekTime", id, "failed");
    }
  }

  return (
    <main className="loading">

      <img className="logo" src={logo} alt="logo" />
      <div className="videoContainer">
        <video
          autoPlay
          muted
          onProgress={() => ckeckProgress(0)}
          onTimeUpdate={() => checkTime(0)}
          src={"/media/" + videoResolution + "-fr.mp4"}
        ></video>
        <video
          autoPlay
          muted
          onProgress={() => ckeckProgress(1)}
          onTimeUpdate={() => checkTime(1)}
          src={"/media/" + videoResolution + "-en.mp4"}
        ></video >
      </div>


      <p>loading</p>
      <small>Français</small>
      <ProgressBar
        className="bar"
        bgColor="#b40024"
        baseBgColor="#6b0117"
        completed={stateFR} />
      <small>English</small>
      <ProgressBar
        className="bar"
        bgColor="#b40024"
        baseBgColor="#6b0117"
        completed={stateEN} />
    </main >
  );
}