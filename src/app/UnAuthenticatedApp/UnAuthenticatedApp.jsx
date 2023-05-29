import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "../../screens/Landing/Landing";
import Course from "../../screens/Course/Course";
import NotFound from "../../components/Others/NotFound";
import MainLayout from "../../components/MainLayout/MainLayout";
import CourseDetail from "../../screens/CourseDetail/CourseDetail";
import News from "../../screens/News/News";
import NewsDetail from "../../screens/NewsDetail/NewsDetail";
import Teachers from "../../screens/Teachers/Teachers";
import SignIn from "../../screens/SignIn/SignIn";
import SignUp from "../../screens/SignUp/SignUp";
import ForgetPassword from "../../screens/ForgetPassword/ForgetPassword";
import ResetPassword from "../../components/Log/ResetPassword";
import NotAllow from "../../components/Others/NotAllow";
import Account from "../../components/Log/account";
import NoData from "../../components/Others/NoData";

const UnAuthenticatedApp = ({ onLoggin }) => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="Course" element={<Course />} />
        <Route path="Course/:id" element={<CourseDetail />} />
        <Route path="News" element={<News />} />
        <Route path="News/:id" element={<NewsDetail />} />
        <Route path="Teachers" element={<Teachers />} />
        <Route path="ShoppingCart" element={<Navigate to="/" />} />
      </Route>
      <Route path="/account" element={<Account />}>
        <Route path="SignIn" element={<SignIn onLoggin={onLoggin} />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="Dashboard" element={<SignIn />} />
        <Route path="ForgetPassword" element={<ForgetPassword />} />
        <Route path="ResetPassword" element={<ResetPassword />} />
        <Route path="ResetPassword/:token" element={<ResetPassword />} />
        <Route path="" element={<Navigate to="/Account/SignIn" />} />
      </Route>
      <Route path="403" element={<NotAllow />} />
      <Route path="404" element={<NotFound />} />
      <Route path="503" element={<NoData />} />
      <Route path="/panel/*" element={<Navigate to="/403" />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default UnAuthenticatedApp;
