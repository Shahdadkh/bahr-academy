import React, { useState, useEffect } from "react";

import blueTheme from "../../core/Utils/theme/blue";
import roseTheme from "../../core/Utils/theme/rose";
import indigoTheme from "../../core/Utils/theme/indigo";
import greenTheme from "../../core/Utils/theme/green";
import purpleTheme from "../../core/Utils/theme/purple";
import { getItemGeneric } from "../../core/services/LocalStorage";
import { applyTheme } from "./../../core/Utils/theme/utils";

export const PanelTheme = () => {
  const [color, setColor] = useState(false);

  const Themes = [
    { name: "آبی", value: blueTheme, class: "bg-blue-500 h-full" },
    { name: "قرمز", value: roseTheme, class: "bg-rose-500 h-full" },
    { name: "نیلی", value: indigoTheme, class: "bg-indigo-500 h-full" },
    { name: "سبز", value: greenTheme, class: "bg-green-500 h-full" },
    { name: "بنفش", value: purpleTheme, class: "bg-purple-500 h-full" },
  ];
  const getDefultTheme = () => {
    const jsonTheme = getItemGeneric("color");
    return jsonTheme ? jsonTheme : blueTheme;
  };
  const [theme, setTheme] = useState(getDefultTheme());
  useEffect(() => {
    applyTheme("color", theme);
  }, [theme]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-5">
        {Themes.map((theme, index) => (
          <div
            key={index}
            onClick={() => setTheme(theme.value)}
            className="cursor-pointer overflow-hidden mx-auto rounded-lg h-44 w-44 relative"
          >
            <div className={theme.class}></div>
            <div className="absolute right-5 left-5 top-5 bottom-5 rounded-full bg-background-700 p-12"></div>
          </div>
        ))}
      </div>
    </>
  );
};
