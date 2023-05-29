import React from "react";
import zxcvbn from "zxcvbn";
export const PasswordChecker = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return "خیلی ضعیف";
      case 1:
        return "ضعیف";
      case 2:
        return "متوسط";
      case 3:
        return "خوب";
      case 4:
        return "قدرتمند";
      default:
        return "none";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FADD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00B500";
      default:
        return "none";
    }
  };
  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "7px",
  });
  return (
    <>
      <div className="block">
        <p
          className="float-right text-xs mt-1"
          style={{ color: funcProgressColor() }}
        >
          {createPassLabel()}
        </p>
        <div className="h-2 w-2/3 inline-block float-left bg-gray-300 my-2 rounded-full overflow-hidden">
          <div style={changePasswordColor()}></div>
        </div>
      </div>
    </>
  );
};
