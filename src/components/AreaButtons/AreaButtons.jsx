import React from "react";
const popupsBtn = [0, 0, 1, 2, 3, 4];
const areaButton = [
  "DoigtsA",
  "DoigtsB",
  "Croissant",
  "Paume",
  "Venus",
  "Talon"
]

/**
 * @component
 * @returns {React.ReactElement}
 */
export default function AreaButton({setSequence}) {

  return (
    <>
      {popupsBtn.map((el, index) =>
        <button
          key={"areaBtn" + index}
          className={"areaButton btn" + areaButton[index]}
          onClick={() => setSequence(3, el)}
        ></button>
      )}
    </>
  );
}