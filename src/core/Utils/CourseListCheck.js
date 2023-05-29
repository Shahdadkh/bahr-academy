export const CourseListCheck = (courseId) => {
  const files = localStorage.getItem("persist:root")
    ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).courseList)
    : [];
  const data = files.filter((item) => item.id === courseId);
  if (data.length !== 0) {
    return true;
  } else {
    return false;
  }
};
