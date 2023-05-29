import { setItemGeneric } from "../../services/LocalStorage";

export function applyTheme(key,theme) {
  setItemGeneric(key,theme)
  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar]);
  });
}

export function createTheme({
  background4,
  background5,
  background550,
  background6,
  background7,
  background750,
  background8,
  background9,
  textHead8,
  textHead9,
  toz,
}) {
  return {
    "--theme-background4": background4,
    "--theme-background5": background5,
    "--theme-background550": background550,
    "--theme-background6": background6,
    "--theme-background7": background7,
    "--theme-background750": background750,
    "--theme-background8": background8,
    "--theme-background9": background9,
    "--theme-text-head8": textHead8,
    "--theme-text-head9": textHead9,
    "--theme-toz": toz,
  };
}

export function mainTheme({
  text2,
  text3,
  text4,
  text5,
  text6,
  text7,
  text8,
  text9,
  button2,
  button3,
  button4,
  button5,
  button6,
  button7,
  button8,
  button9,
}) {
  return {
    "--theme-text2": text2,
    "--theme-text3": text3,
    "--theme-text4": text4,
    "--theme-text5": text5,
    "--theme-text6": text6,
    "--theme-text7": text7,
    "--theme-text8": text8,
    "--theme-text9": text9,
    "--theme-button2": button2,
    "--theme-button3": button3,
    "--theme-button4": button4,
    "--theme-button5": button5,
    "--theme-button6": button6,
    "--theme-button7": button7,
    "--theme-button8": button8,
    "--theme-button9": button9,
  };
}
