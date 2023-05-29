import React, { useState, useEffect } from "react";
import { applyTheme } from "../../core/Utils/theme/utils";
import baseTheme from "../../core/Utils/theme/base";
import darkTheme from "../../core/Utils/theme/dark";
import { HiMoon, HiSun } from "react-icons/hi";
import { getItemGeneric, setItem } from "../../core/services/LocalStorage";
//import { setItem } from "../../core/services/LocalStorage";

const DarkmodeToggle = () => {
  const getDefultTheme = () => {
    const jsonTheme = getItemGeneric("theme");
    return jsonTheme ? jsonTheme : "light";
  };
  const [theme, setTheme] = useState(getDefultTheme());

  useEffect(() => {
    applyTheme("theme",theme === "dark" ? darkTheme : baseTheme);
  }, [theme]);

  const changeThemeMode = () => {
    const currentTheme = theme === "light" ? "dark" : "light";
    setTheme(currentTheme);
    setItem("theme", currentTheme);
  };
  return (
    <>
      <div className="relative flex flex-col ml-2 items-center justify-center min-h-screen overflow-hidden">
        <div className="flex">
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              readOnly
            />
            <div
              onClick={changeThemeMode}
              className="w-11 h-6 bg-gray-200   rounded-full peer  peer-focus:ring-background-900  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-background-700"
            >
              {theme === "dark" ? (
                <HiMoon className=" mr-6 mt-1 text-gray-100" />
              ) : (
                <HiSun className="mt-1 text-yellow-500 mr-1" />
              )}
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export { DarkmodeToggle };
