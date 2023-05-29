import { useState, useEffect } from "react";
import NoPic from "../../assets/images/NoImage.png";
import { handleDate } from "../../core/Utils/handleDate";
import http from "../../core/services/Interceptor";
import { useParams } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ReviewCustomer() {
  const [reviews, setReviews] = useState([]);
  const param = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await http.get("/comments/");
      const resultfilter = result.data.filter(
        (comment) => comment.postId === param.id && comment.verified === true
      );
      setReviews(resultfilter);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-background-800">
      <div>
        <div className="my-10 sm:mx-20">
          <h2 className="text-2xl text-textHead-900 font-bold mb-4 mx-4 sm:mx-0">
            نظرات کاربران
          </h2>
          {reviews.length !== 0 ? (
            <div>
              {reviews.map((review, reviewIdx) => (
                <div
                  key={review._id}
                  className="flex text-sm text-toz space-x-4"
                >
                  <div className="flex-none py-10 px-5">
                    <img
                      src={NoPic}
                      alt=""
                      className="w-10 h-10 bg-background-600 rounded-full"
                    />
                  </div>
                  <div
                    className={classNames(
                      reviewIdx === 0 ? "" : "border-t border-gray-300",
                      "flex-1 py-10"
                    )}
                  >
                    <h3 className="font-medium text-textHead-900">
                      {review.username}
                    </h3>
                    <p>
                      <time
                        dateTime={handleDate(review.createDate.slice(0, 10))}
                      >
                        {handleDate(review.createDate.slice(0, 10))}
                      </time>
                    </p>
                    <div
                      className="mt-4 prose prose-sm max-w-none text-toz"
                      dangerouslySetInnerHTML={{ __html: review.comment }}
                    />
                    {review.answer ? (
                      <div className="border border-slate-200 mr-8 mt-4 px-4 py-3 bg-yellow-100 rounded-md">
                        پاسخ: {review.answer}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center focus:outline-none">
              <span className="mt-2 block text-sm font-medium text-textHead-800">
                نظری ثبت نشده است
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
