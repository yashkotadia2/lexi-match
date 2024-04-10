import "../Columns/Columns.scss";
import { wordsKeyPair } from "../../data/words.ts";
import ResultModal from "../ResultModal/ResultModal.tsx";
import { useEffect, useState } from "react";
import { useSelectedKeyValue, useResultModal } from "../../zustand/store";

const Columns = () => {
  const { selectedKeyValue } = useSelectedKeyValue();
  const { setWantsToOpen } = useResultModal();
  const [isColumOneDisabled, setIsColumnOneDisabled] = useState(false);
  const [col1, setCol1] = useState<String[]>([]); // [1]
  const [col2, setCol2] = useState<String[]>([]); // [2]
  const [colorMap, setColorMap] = useState<Record<number, string>>({}); // [3]
  const randomizeArray = (newArray: String[]) => {
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  function generateRandomColors(n: number): Record<number, string> {
    const colors: Record<string, boolean> = {}; // Object to store generated colors
    const colorMap: Record<number, string> = {}; // Final result

    // Function to generate a random color
    const generateColor = (): string => {
      const hexChars = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    for (let i = 0; i < n; i++) {
      let color = generateColor();
      // Ensure color is distinct
      while (colors[color]) {
        color = generateColor();
      }
      colors[color] = true;
      colorMap[i] = color;
    }

    return colorMap;
  }

  useEffect(() => {
    setCol1(randomizeArray(Object.keys(wordsKeyPair)));
    setCol2(randomizeArray(Object.values(wordsKeyPair)));
  }, []);

  useEffect(() => {
    setColorMap(generateRandomColors(col1.length));
  }, [col1]);

  const handleWordSelection = (e: React.MouseEvent<HTMLElement>) => {
    const contentDiv = e.target as HTMLElement; // Type assertion
    const innerText = contentDiv.innerText; // Now TypeScript knows innerText exists

    if (contentDiv.classList.contains("english")) {
      setIsColumnOneDisabled(true);
      let currentColor: string = colorMap[Object.keys(selectedKeyValue).length];

      contentDiv.setAttribute("style", `background-color: ${currentColor}; pointer-events:none;`);
      selectedKeyValue[innerText] = "";
    } else {
      setIsColumnOneDisabled(false);
      const key: string =
        Object.keys(selectedKeyValue).find(
          (key) => selectedKeyValue[key] === ""
        ) || "";

      let enlishWordMatchingColor: string =
        colorMap[Object.keys(selectedKeyValue).indexOf(key)];
      if (key !== undefined || key !== "") {
        contentDiv.setAttribute(
          "style",
          `background-color: ${enlishWordMatchingColor}; pointer-events: none; cursor: not-allowed;`
        );
        selectedKeyValue[key] = innerText;
      }
      if (Object.keys(selectedKeyValue).length === col1.length) {
        setWantsToOpen(true);
      }
    }

  };
  console.log(selectedKeyValue);

  return (
    <div className="wrapper animate__animated animate__fadeIn">
      <div className="header-container">
        <h1 className="header">
          Match English Words to Their French counterparts
        </h1>
      </div>
      <div className="columns-container">
        <div
          style={{ pointerEvents: isColumOneDisabled ? "none" : "auto" }}
          className="column column-1"
        >
          <div className="column-header">
            <h3>English Words</h3>
          </div>
          {col1.map((word, index) => {
            return (
              <div
                className="column-content english"
                onClick={(e) => handleWordSelection(e)}
                key={index}
              >
                {word}
              </div>
            );
          })}
        </div>
        <div
          style={{ pointerEvents: isColumOneDisabled ? "auto" : "none" }}
          className="column column-2"
        >
          <div className="column-header">
            <h3>French Words</h3>
          </div>
          {col2.map((word, index) => {
            return (
              <div
                className="column-content french"
                onClick={(e) => handleWordSelection(e)}
                key={index}
              >
                {word}
              </div>
            );
          })}
        </div>
      </div>
      <ResultModal />
    </div>
  );
};

export default Columns;
