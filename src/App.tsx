import "./App.scss";
import ActionButton from "./components/ActionButton/ActionButton";
import Columns from "./components/Columns/Columns";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import { useActionButton } from "./zustand/store";

function App() {
  const { actionButtonState } = useActionButton();
  return (
    <>
      {actionButtonState == "GO" && <SplashScreen />}
      {actionButtonState == "GRADE" && <Columns />}
      <ActionButton />
    </>
  );
}

export default App;
