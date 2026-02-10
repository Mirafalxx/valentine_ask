import { useState, useRef, useEffect } from "react";

import envelopeImg from "./assets/envelope.png";
import yesImg from "./assets/yes.png";
import noImg from "./assets/no.png";
import catHeart from "./assets/cat_heart.gif";
import catDance from "./assets/cat_dance.gif";

export default function ValentineLetter() {
  const [isNoClickedOneCounter, setIsNoClikedCounter] = useState(0);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [showDisappointedCondition, setShowDisappointedCondition] = useState(false);
  const [title, setTitle] = useState("Будешь моей валентинкой?");
  const [catSrc, setCatSrc] = useState(catHeart);

  const noBtnRef = useRef(null);
  const letterWindowRef = useRef(null);

  // Открыть конверт
  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);

    setTimeout(() => {
      setIsLetterOpen(true);
    }, 50);
  };

  const handleNoHover = () => {
    const min = 200;
    const max = 200;
    setIsNoClikedCounter(1);
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    if (isNoClickedOneCounter) {
      if (noBtnRef.current) {
        noBtnRef.current.style.transition = "transform 0.3s ease";
        noBtnRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    }
  };

  // Нажали YES
  const handleYesClick = () => {
    setTitle("Yippeeee!");
    setCatSrc(catDance);
    setIsFinal(true);

    if (letterWindowRef.current) {
      letterWindowRef.current.classList.add("final");
    }
  };

  useEffect(() => {
    // [1, 3, 5].includes(isNoClickedOneCounter)
    if (isNoClickedOneCounter === 1) {
      const showTimeout = setTimeout(() => setShowDisappointedCondition(true), 500);
      const hideTimeout = setTimeout(() => setShowDisappointedCondition(false), 5000);

      return () => {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [isNoClickedOneCounter]);

  // useEffect(() => {
  //   if (isNoClickedOneCounter === 1) {
  //     setTimeout(() => {
  //       setShowDisappointedCondition(true);
  //     }, 500);
  //     setTimeout(() => {
  //       setShowDisappointedCondition(false);
  //     }, 5000);
  //   }
  // }, [isNoClickedOneCounter]);

  return (
    <div>
      {/* Envelope Screen */}

      {!isEnvelopeOpen && (
        <div id="envelope-container" onClick={handleOpenEnvelope}>
          <img src={envelopeImg} alt="Envelope" id="envelope" />
          <p>♡ Письмо для тебя ♡</p>
        </div>
      )}

      {/* Letter Screen */}
      {isEnvelopeOpen && (
        <div id="letter-container" style={{ display: "flex" }}>
          <div ref={letterWindowRef} className={`letter-window ${isLetterOpen ? "open" : ""}`}>
            <h1 id="letter-title">{title}</h1>
            <div className={`dissapointed_img ${showDisappointedCondition ? "open" : ""}`}></div>

            <img src={catSrc} className="cat" id="letter-cat" />
            {(!isFinal || showDisappointedCondition) && (
              <div className="buttons" id="letter-buttons">
                <img src={yesImg} className="btn yes-btn" alt="Yes" onClick={handleYesClick} />

                <div className="no-wrapper">
                  <img ref={noBtnRef} src={noImg} className="btn no-btn" alt="No" onMouseOver={handleNoHover} />
                </div>
              </div>
            )}
            {isFinal && (
              <p id="final-text" className="final-text">
                <strong> Встретимся в Москве. Нарядись красиво! 💖 ЦМОК</strong>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
