import { useEffect } from "react";
import ForgetPass from "./../../components/Log/ForgetPassword";

const ForgetPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-4 sm:p-10 h-fit">
      <ForgetPass />
    </div>
  );
};

export default ForgetPassword;
