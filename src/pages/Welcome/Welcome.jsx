import React from "react";
import { extractResolution, getResolution } from "../../services/responsive";
import logo from "../../assets/logo.svg"

/**
 * @component
 * @returns {React.ReactElement}
 */
export default function Welcome() {
  let widths= [];
  let heights= [];
  const [width, height] = getResolution();
  for (const ratio of Object.values(extractResolution())){
    widths = widths.concat(ratio.width);
    heights = heights.concat(ratio.height);
  };

  return (
    <main className="welcome">
      <img src={logo} alt="logo" />
      <h1>device is currently unsupported</h1>
      <p>the resolution of your device is {width} x {height} (pixels)</p>
      <p>curently supported resolutions</p>
      <ul>
        {widths.map((el, index)=> {return <li key={"r"+index}>{el} x {heights[index]}</li>})}
      </ul>
    </main>
  );
}