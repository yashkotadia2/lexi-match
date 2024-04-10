import { useEffect, useState } from "react";
import useSound from "use-sound";
import buttonClickSound from "../../assets/sounds/button/button-click.mp3";
import bgMusic from "../../assets/sounds/splash/splash-bg-sound.mp3";
import "../ActionButton/ActionButton.scss";
import "animate.css";
import { useActionButton, useResultModal } from "../../zustand/store";

const ActionButton = () => {
  const [animateTitle, setAnimateTitle] = useState(false);
  const [position, setPosition] = useState({
    x: (window.innerWidth * 0.5) - 80,
    y: window.innerHeight * 0.6,
  });
  const [scalePercent, setScalePercent] = useState(1);
  const { actionButtonState, setActionButtonState } = useActionButton();
  const { setWantsToOpen } = useResultModal();

  const [playClick] = useSound(buttonClickSound, {
    volume: 1,
    playbackRate: 1,
  });
  const [playBgMusic] = useSound(bgMusic, {
    volume: 0.1,
    playbackRate: 1,
    loop: true,
    interrupt: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setAnimateTitle(true);
    }, 2000);
  }, []);

  const handleActionButtonClick = () => {
    playClick();
    playBgMusic();
    if (actionButtonState === "GO") {
      setActionButtonState("GRADE");
    } else {
      setWantsToOpen(true);
    }
  };

  useEffect(() => {
    if (actionButtonState === "GO") {
      setPosition({
        x: (window.innerWidth * 0.5) - 80 ,
        y: window.innerHeight * 0.6,
      });
      setScalePercent(1);
    }
    if (actionButtonState === "GRADE") {
      setPosition({
        x: 20,
        y: 20,
      });
      setScalePercent(0.5);
    }
  }, [actionButtonState]);

  return (
    <>
      {animateTitle && (
        <div
          style={{
            right: `${position.x}px`,
            top: `${position.y}px`,
            width: `${160 * scalePercent}px`,
          }}
          className="action-button-container"
        >
          <button
          style={{
            fontSize: `${32 * scalePercent}px`,
            padding: `${16 * scalePercent}px`,
            borderRadius: `${16 * scalePercent}px`,
          }}
            onClick={() => handleActionButtonClick()}
            className="action-button animate__animated animate__bounceIn"
          >
            {actionButtonState}
          </button>
        </div>
      )}
    </>
  );
};

export default ActionButton;
