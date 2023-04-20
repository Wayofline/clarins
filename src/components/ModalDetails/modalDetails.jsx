import React from "react";
import { translations } from "../../services/lang";
const popups = Array(5).fill(null);

/**
 * @component
 * @returns {React.ReactElement}
 */
export default function ModalDetails({ lang }) {

  // const step = popupStep();// "closed" | "opening" | "closing"


  function contentPopup(id) {
    return (
      <div className={"modal color" + id} key={"modal" + id}>
        <img id="close" onClick={window.closePopup} src={"/media/CloseBtn-" + id + ".svg"} alt="close icon" />
        <hr className={"color" + id} />
        <h1>{translations[lang][id].title}</h1>
        <p>{translations[lang][id].text}</p>
      </div>
    )
  }

  return (
    <div className="modal-container">
      <div className="modal-background" onClick={window.closePopup}>
        {
          popups.map((el, index) => contentPopup(index))
        }
      </div>
    </div>
  );
}