import React, { useState, useEffect } from "react";
import { applyTheme } from "../../core/Utils/theme/utils";
import baseTheme from "../../core/Utils/theme/base";
import darkTheme from "../../core/Utils/theme/dark";
import {
  getItemGeneric,
  setItemGeneric,
} from "../../core/services/LocalStorage";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Darkmode = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const getDefultTheme = () => {
    const jsonTheme = getItemGeneric("mode");
    return jsonTheme ? jsonTheme : "light";
  };
  const [theme, setTheme] = useState(getDefultTheme());

  useEffect(() => {
    applyTheme("theme", theme === "dark" ? darkTheme : baseTheme);
  }, [theme]);

  const changeThemeMode = (checked) => {
    const currentTheme = theme === "light" ? "dark" : "light";
    setTheme(currentTheme);
    setDarkMode(checked);
  };

  return (
    <>
      <div className="fixed p-2 bottom-4 right-7 bg-white border-4 border-button-800 rounded-full top">
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={changeThemeMode}
          size={28}
          sunColor={"gray"}
          moonColor={"gray"}
        />
      </div>
    </>
  );
};
export default Darkmode;
