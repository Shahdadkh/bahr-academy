import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "../../screens/Landing/Landing";
import Course from "../../screens/Course/Course";
import NotFound from "../../components/Others/NotFound";
import MainLayout from "../../components/MainLayout/MainLayout";
import CourseDetail from "../../screens/CourseDetail/CourseDetail";
import News from "../../screens/News/News";
import NewsDetail from "../../screens/NewsDetail/NewsDetail";
import ShoppingCarts from "../../screens/ShoppingCart/ShoppingCarts";
import Teachers from "../../screens/Teachers/Teachers";
import Dashboard from "../../screens/Panel/Dashboard";
import PasswordChange from "../../screens/Panel/PasswordChange";
import ProfileEdit from "../../screens/Panel/ProfileEdit";
import PanelLayout from "../../components/panelLayout/PanelLayout";
import PanelCourse from "../../screens/Panel/PanelCourses";
import ShoppingCart from "../../components/Others/ShoppingCart";
import PanelFavourite from "../../components/Panel/PanelFavourite";
import NoData from "../../components/Others/NoData";
import PanelPayment from "../../components/Panel/PanelPayment";
import AllCourses from "../../components/Panel/AllCourses";
import { PanelTheme } from "../../components/Panel/PanelTheme";

const AuthenticatedApp = ({ isExit }) => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout isExit={isExit} />}>
        <Route index element={<Landing />} />
        <Route path="Course" element={<Course />} />
        <Route path="Course/:id" element={<CourseDetail />} />
        <Route path="News" element={<News />} />
        <Route path="News/:id" element={<NewsDetail />} />
        <Route path="ShoppingCart" element={<ShoppingCarts />} />
        <Route path="Teachers" element={<Teachers />} />
      </Route>
      <Route path="/Panel" element={<PanelLayout isExit={isExit} />}>
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="AllCourses" element={<AllCourses />} />
        <Route path="Courses" element={<PanelCourse />} />
        <Route path="PasswordChange" element={<PasswordChange />} />
        <Route path="ProfileEdit" element={<ProfileEdit />} />
        <Route path="Favourite" element={<PanelFavourite />} />
        <Route path="Payment" element={<PanelPayment />} />
        <Route path="ThemeChange" element={<PanelTheme />} />
        <Route path="" element={<Navigate to="/Panel/Dashboard" />} />
      </Route>
      <Route path="ShoppingCart" element={<ShoppingCart />} />
      <Route path="/Account/SignIn" element={<Navigate to="/" />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="503" element={<NoData />} />
    </Routes>
  );
};

export default AuthenticatedApp;
