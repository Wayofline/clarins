import React from "react";

const btVideo = [
  "Doigts",
  "Croissant",
  "Paume",
  "Venus",
  "Talon"
];

/**
 * @component
 * @returns {React.ReactElement}
 */
export default function AreaButton({showVideo}) {

  return (
    <>
      {btVideo.map((el, index) =>
        <button
            key={"btnVideo"+index}
            className={"videoButton btn" + btVideo[index]}
            onClick={showVideo}
          ></button>
      )}
    </>
  );
}