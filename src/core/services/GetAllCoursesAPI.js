import http from "./Interceptor";

const GetAllCoursesAPI = async (setIsLoad, setData) => {
  try {
    setIsLoad(true);
    const result = await http.get("course/getall");
    setData(result.data.result);
    setIsLoad(false);
    return result.data.result;
  } catch (error) {}
};
export { GetAllCoursesAPI };
