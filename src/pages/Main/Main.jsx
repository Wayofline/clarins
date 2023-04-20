import AreaButtons from "../../components/AreaButtons/AreaButtons";
import VideoButtons from "../../components/VideoButtons/VideoButtons";
import React, { useState } from "react";
import { getResolution } from "../../services/responsive";
import { steps } from "../../services/steps";
import logo from "../../assets/logo.svg";
import returns from "../../assets/return.svg";


const videoResolution = getResolution()
  .reverse()
  .join("x");

let
  $landscape,
  $video,
  limits,
  // tempo,
  hasListener = false,
  playFromStartPoint = false;


/**
* @component
* @returns {React.ReactElement}
*/
export default function Main() {

  const [lang, setLang] = useState("Fr");
  const [current, setCurrent] = useState({
    step: -1,
    seq: -1
  });

  function toggleLang() {
    lang === "Fr"
      ? setLang("En")
      : setLang("Fr");
  }

  function checkTime() {
    // if (limits?.next) {
    //   // console.log("checkTime", $video.currentTime)
    // }
    if (limits?.loop && $video.currentTime >= limits.loop) $video.currentTime = limits.start;
    if (limits?.next && $video.currentTime >= limits.next) {
      // console.log("next current.step", current.step, $video.currentTime, limits.next)
      current.step === 6
        ? setStepOnly(2)
        : setStepOnly(current.step + 1);
    }
    if (limits?.stop && $video.currentTime >= limits.stop) {
      $video.pause();
      // tempo = setTimeout(()=>setStep(6), 3000); //TODO remettre
    }
  }


  function setLimits(newStep, newSequence) {
    // console.log(">>", )
    limits = newStep <= 2
      ? steps[newStep]
      : steps[newStep][newSequence];
    // console.log(newStep, "/", newSequence, " : limits",limits, steps)
  }

  function setSequence(newStep, newSequence) {
    // console.log("setSequence : newStep", newStep, "newSequence:", newSequence, current);
    if (current.step === newStep && current.step !== 3) return;
    if (newStep <= 2) {
      setLimits(newStep, -1);
      // if (newStep === 2 || newStep === 0) playNewPosition();
    }
    else setLimits(newStep, newSequence);
    if (playFromStartPoint) {
      $video.currentTime = limits.start;
      $video.play();
      playFromStartPoint = false;
    }
    if ($video.paused) $video.play();
    setCurrent({
      step: newStep,
      seq: newSequence
    });
  }

  function replayVideo() {
    $video.currentTime = limits.start;
    $video.play();
  }

  function startApp() {
    // console.log("start")
    if (!hasListener) {
      $video = document.querySelector("video");
      $landscape = document.querySelector(".landscape");
      window.screen.orientation.addEventListener('change', rotateScreen);
      playFromStartPoint = true;
      setStepOnly(0);
      hasListener = true;
    }
  }

  function showVideo() {
    if (current.step !== 3) return;  //TODO change because the condition is useless => visible only when needed
    playFromStartPoint = true;
    setStepOnly(4);
  }

  function setStepOnly(newStep) {
    setSequence(newStep, current.seq);
  }

  function clickVideo() {
    switch (current.step) {
      case 0:
        playFromStartPoint = true;
        setStepOnly(1);
        break;
      case 5:
        playFromStartPoint = true;
        setStepOnly(6);
        break;
      default: return;
    }
  }

  function backHome() {
    if (current.step === 0) return;
    playFromStartPoint = true;
    setStepOnly(0);
  }

  function clickArea(newStep, newSequence) {
    playFromStartPoint = true;
    setSequence(newStep, newSequence)
  }

  function rotateScreen() {
    window.screen.orientation.type === "landscape-primary"
      ? $landscape.classList.add("visible")
      : $landscape.classList.remove("visible")
  }

  const currentLang = lang.toLowerCase();


  return (
    <main className={"main resolution" + videoResolution}>
      <video
        autoPlay
        preload="auto" muted
        loop
        src={"/media/" + videoResolution + "-" + currentLang + ".mp4"}
        onClick={clickVideo}
        onPlay={startApp}
        // onCanPlay={(e)=>console.log("canplay")}
        // onLoadedMetadata={(e)=>console.log("onLoadedMetadata",e)}
        // onProgressCapture={(e)=>console.log("onProgressCapture",e)}
        onTimeUpdate={checkTime}
      // onProgress={ckeckProgress}
      ></video>

      <div className={"btnContainer step" + current.step + " seq" + current.seq} >
        <button className="langButton" onClick={toggleLang}></button>
        <AreaButtons setSequence={clickArea} />
        <VideoButtons showVideo={showVideo} />
        <button className="replay" onClick={replayVideo} />
      </div>

      <img className="logo" src={logo} alt="logo" onClick={backHome} />
      <div className="landscape">
        <h1>return please</h1>
        <img src={returns} alt="return" />
      </div>

    </main>
  );
}