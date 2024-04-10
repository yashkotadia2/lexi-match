import { useEffect, useState } from "react";
import "animate.css";
import "../SplashScreen/SplashScreen.scss";

const SplashScreen = () => {
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimateTitle(true);
    }, 1000);
  }, []);

  return (
    <div className="splash-screen-container">
      {animateTitle && (
        <div className="splash-screen animate__animated animate__jello">
          <h1 className="game-title">Lexi Match</h1>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
