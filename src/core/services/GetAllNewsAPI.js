import http from "./Interceptor";

const GetAllNewsAPI = async (setIsLoad, setData) => {
  try {
    setIsLoad(true);
    const result = await http.get("/news/");
    setData(result.data.result);
    setIsLoad(false);
    return result.data.result;
  } catch (error) {}
};
export default GetAllNewsAPI ;
