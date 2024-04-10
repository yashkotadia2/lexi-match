import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { wordsKeyPair } from "../../data/words";
import {
  useActionButton,
  useResultModal,
  useSelectedKeyValue,
} from "../../zustand/store";
import { useEffect, useState } from "react";
import clickSound from "../../assets/sounds/button/button-click.mp3";
import useSound from "use-sound";

const ResultModal = () => {
  const { setActionButtonState } = useActionButton();
  const { wantsToOpen, setWantsToOpen } = useResultModal();
  const { selectedKeyValue, setSelectedKeyValue } = useSelectedKeyValue();
  const [resultString, setResultString] = useState<String>("");
  const [playClick] = useSound(clickSound, {
    volume: 1,
    playbackRate: 1,
  });

  const onCloseModal = () => {
    setWantsToOpen(false);
  };

  function compareObjects(
    obj1: Record<string, any>,
    obj2: Record<string, any>
  ): number {
    let count = 0;

    // Iterate over the keys of obj1
    for (const key in obj1) {
      // Check if the key exists in obj2 and the values are equal
      if (obj2.hasOwnProperty(key) && obj1[key] === obj2[key]) {
        console.log("key", key, "value1", obj1[key], "value2", obj2[key]);

        count++;
      }
    }

    return count;
  }

  useEffect(() => {
    if (wantsToOpen) {
      let score = compareObjects(selectedKeyValue, wordsKeyPair);
      setResultString(
        `You got ${score} out of ${
          Object.keys(selectedKeyValue).length
        } correct! (${
          Math.round(
            ((score / Object.keys(selectedKeyValue).length) * 100 +
              Number.EPSILON) *
              100
          ) / 100
        }%)`
      );
    }
  }, [wantsToOpen]);

  const onRestart = () => {
    // set to initial state
    playClick();
    setWantsToOpen(false);
    setActionButtonState("GO");
    setSelectedKeyValue({});
  };

  return (
    <div>
      <Modal open={wantsToOpen} onClose={() => onCloseModal()} center>
        <h2>Score:</h2>
        <p
          style={{
            fontSize: "20px",
            marginTop: "20px",
          }}
        >
          {resultString}
        </p>
        <button
          style={{
            backgroundColor: "orange",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={() => onRestart()}
        >
          Restart
        </button>
      </Modal>
    </div>
  );
};

export default ResultModal;
