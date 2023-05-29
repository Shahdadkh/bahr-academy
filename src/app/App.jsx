import { useState, useEffect } from "react";
import { getItem, getItemGeneric } from "../core/services/LocalStorage";
import AuthenticatedApp from "./AuthenticatedApp/AuthenticatedApp";
import UnAuthenticatedApp from "./UnAuthenticatedApp/UnAuthenticatedApp";
import "simplebar-react/dist/simplebar.min.css";
import Portal from "../components/Portal/Portal";
import CustomScrollbar from "../components/common/CustomScrollbar";
import "react-loading-skeleton/dist/skeleton.css";
import blueTheme from "../core/Utils/theme/blue";
import { applyTheme } from "../core/Utils/theme/utils";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getItem("token") !== false);
  useEffect(
    () =>
      applyTheme(
        "color",
        getItemGeneric("color") ? getItemGeneric("color") : blueTheme
      ),
    []
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleExit = () => {
    setIsLoggedIn(false);
  };
  return (
    <CustomScrollbar boxClassName="max-h-screen overflow-x-hidden">
      <Portal />
      {isLoggedIn ? (
        <AuthenticatedApp isExit={handleExit} />
      ) : (
        <UnAuthenticatedApp onLoggin={handleLogin} />
      )}
    </CustomScrollbar>
  );
};

export default App;
