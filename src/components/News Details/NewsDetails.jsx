import { useParams } from "react-router-dom";
import {
  handleAuthor,
  handleTitle,
  handleTime,
} from "../../core/Utils/handleSplitText";
import http from "../../core/services/Interceptor";
import { useState, useEffect } from "react";

export default function NewsDetails() {
  const [data, setData] = useState([]);
  const param = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await http.get("/news/" + param.id);
      setData(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-8/12 mx-auto relative py-16 bg-background-800 overflow-hidden">
      {data.length !== 0 ? (
        <div className="relative px-4 sm:px-6 lg:px-8">
          <figure className="w-10/12 sm:w-7/12 mx-auto">
            <img
              className="w-full rounded-lg mx-auto"
              src={data.image}
              alt=""
              width={500}
              height={500}
            />
            <figcaption className="mx-auto">
              <span className="text-toz">{handleAuthor(data.title)}</span>
              <span className="mr-2 text-toz">{handleTime(data.title)}</span>
            </figcaption>
          </figure>
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-textHead-800 sm:text-3xl">
                {handleTitle(data.title)}
              </span>
            </h1>
          </div>

          <div className="mt-6 prose prose-indigo prose-lg text-toz mx-auto">
            <p className="leading-8">{data.text}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
