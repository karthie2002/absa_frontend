import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductReview = () => {
  const options: {
    year: "numeric";
    month: "short";
    day: "numeric";
  } = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const today = new Date();
  const dateVal = today.toLocaleDateString("en-US", options);

  const { productId } = useParams();
  const [inputRev, setInputRevValue] = useState("");
  const [inputSummary, setInputSummary] = useState("");
  const [clicked, isClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");
  const [dat, setData] = useState<{
    details: {
      product_categry: string;
      product_title: string;
    };
    predictions: [
      {
        aspect_sentiment_polarities: [];
        aspect_terms: [];
        overall_sentiment_polarities: string;
        pred_id: string;
        product_review: {
          date: string;
          id: string;
          review: string;
          summary: string;
        };
      }
    ];
  }>();
  async function fetchData() {
    try {
      const val = await axios.get(
        `https://backend-absa.vercel.app/groupReviews/${productId}`
      );
      setData(val.data);
      console.log(val.data);
      return "true";
    } catch (error) {
      console.log("error");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const product_review_total = dat?.predictions.length || 0;
  var pCount = 0;
  var nCount = 0;
  var negCount = 0;
  dat?.predictions.map((e) => {
    if (e.overall_sentiment_polarities == "positive") {
      pCount++;
    } else if (e.overall_sentiment_polarities == "negative") {
      negCount++;
    } else {
      nCount++;
    }
  });

  const pVal = (pCount / product_review_total) * 100;

  const nVal = (nCount / product_review_total) * 100;
  const negVal = (negCount / product_review_total) * 100;
  const handleInputChange = (event: any) => {
    setInputRevValue(event.target.value);
  };
  const handleClick = () => {
    isClicked(!clicked);
  };
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleSummaryChange = (event: any) => {
    setInputSummary(event.target.value);
  };
  async function handleSubmit(event: any) {
    event.preventDefault();

    isClicked(false);

    // console.log(inpValues);
    const data = await axios
      .post(
        "https://d5bf-35-240-151-45.ngrok-free.app/generate/",

        {
          inputs: inputRev,
          parameters: {},
        }
      )
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    const aspect_terms_sentiment = JSON.parse(data["generated_text"]);
    const overall_sentiment_polarity = JSON.parse(
      data["overall_sentiment_polarity"]
    )[0];
    console.log(aspect_terms_sentiment, overall_sentiment_polarity);
    axios
      .post("https://backend-absa.vercel.app/post", {
        product_id: productId,
        product_title: dat?.details.product_title,
        product_category: dat?.details.product_categry,
        rating: 0,
        review: inputRev,
        summary: inputSummary,
        date: dateVal,
        aspect_terms_sentiment: aspect_terms_sentiment,
        overall_sentiment_polarity: overall_sentiment_polarity,
      })
      .then(function (response) {
        console.log(response.data);
        var v = fetchData();
        console.log(v);
        postPcone();
      });
  }
  async function postPcone() {
    const getOne = await axios.get(
      `https://backend-absa.vercel.app/getOne/${productId}`
    );
    console.log(getOne);
    axios
      .post(
        "https://7fce-35-237-56-204.ngrok-free.app/getReview/",

        {
          details: getOne.data,
        }
      )
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      {dat ? (
        <div className="flex h-[100vh] mb-8">
          <div className="max-md:hidden w-[50%] flex justify-center items-center pr-20">
            {dat?.details.product_categry == "default" ? (
              <img
                src={`../../../public/default.jpg`}
                style={{ height: "80%", width: "60%", borderRadius: "10px" }}
              />
            ) : (
              <img
                src={`../../../${dat?.details.product_categry}.jpg`}
                style={{ height: "80%", width: "60%", borderRadius: "10px" }}
              />
            )}
          </div>
          <div className="w-[50%] max-md:w-full flex flex-col p-20 max-md:p-8">
            <div className="flex flex-col gap-3">
              <div className="text-4xl font-bold">
                {dat?.details.product_title}
              </div>
              <div className="flex items-center gap-2">
                {pVal >= negVal ? (
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-semibold text-green-500">
                      {Math.round(pVal)}%
                    </div>
                    <div>
                      <img src="../../../happy.png" height={25} width={25} />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-semibold text-red-500">
                      {Math.round(negVal)}%
                    </div>
                    <div>
                      <img src="../../../unhappy.png" height={25} width={25} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="pt-3 justify-start items-center">
              <hr />
            </div>
            <div className="flex flex-col pb-3">
              <div className="pt-3 text-3xl font-bold">$100</div>
              <div>Suggested payments with 6 months special financing</div>
            </div>
            <div className="justify-start items-center">
              <hr />
            </div>
            <div className="flex items-center justify-between">
              <div className="font-bold text-3xl pt-3 pb-3">Reviews</div>
              <div className="text-xl font-normal text-gray-500">
                Total: {product_review_total}
              </div>
            </div>
            <div className="flex w-full justify-center pb-5 items-center">
              {pVal != 0 && (
                <div
                  style={{
                    display: "flex",
                    width: pVal + "%",
                    backgroundColor: "rgb(220 252 231)",
                    height: "40px",
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {pCount}
                </div>
              )}
              {nVal != 0 && (
                <div
                  style={{
                    display: "flex",
                    width: nVal + "%",
                    backgroundColor: "rgb(243 244 246)",
                    height: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {nCount}
                </div>
              )}
              {negVal != 0 && (
                <div
                  style={{
                    display: "flex",
                    width: negVal + "%",
                    backgroundColor: "rgb(254 226 226)",
                    height: "40px",
                    borderTopRightRadius: "12px",
                    borderBottomRightRadius: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {negCount}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mb-4">
              <div
                onClick={handleClick}
                className="text-blue-500 cursor-pointer font-bold p-2 rounded-2xl w-fit border-2 border-blue-500 flex justify-center items-center gap-3 "
              >
                <div>
                  {clicked == false ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M7 11h10v2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"
                      />
                    </svg>
                  )}
                </div>
                <div>Add Reviews</div>
              </div>
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
              >
                <option value="all">All</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
            {clicked && (
              <form onSubmit={handleSubmit}>
                <textarea
                  id="message"
                  onChange={handleSummaryChange}
                  rows={1}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                  placeholder="Post your summary"
                ></textarea>
                <br />
                <textarea
                  id="message"
                  onChange={handleInputChange}
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                  placeholder="Post your comments"
                ></textarea>
                <br />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {selectedOption == "all" && (
              <div className="pb-7">
                {dat.predictions
                  .slice()
                  .reverse()
                  .map((rev: any, i: any) => (
                    <div
                      key={i}
                      className="w-[100%] bg-gray-200 drop-shadow-sm p-4 bg-opacity-50 backdrop-blur-xl rounded-xl  mb-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-bold text-2xl">
                          {rev.product_review.summary}
                        </div>
                        <span
                          className="absolute inset-x-0 bottom-0 h-1.5 justify-center items-center rounded-b-xl"
                          style={{
                            backgroundColor:
                              rev.overall_sentiment_polarities == "positive"
                                ? "rgb(74, 222, 128)"
                                : rev.overall_sentiment_polarities == "negative"
                                ? "rgb(248, 113, 113)"
                                : " rgb(156, 163, 175)",
                          }}
                        ></span>
                        <div>{rev.product_review.date}</div>
                      </div>
                      <div className="text-xl">{rev.product_review.review}</div>
                      <div className="flex gap-2 pt-5 flex-wrap">
                        {rev.aspect_terms.map((as: any, ind: any) => (
                          <div
                            key={ind}
                            className="p-2 rounded-xl"
                            style={{
                              backgroundColor:
                                rev.aspect_sentiment_polarities[ind] ==
                                "positive"
                                  ? "rgb(220 252 231)"
                                  : rev.aspect_sentiment_polarities[ind] ==
                                    "negative"
                                  ? "rgb(254 226 226)"
                                  : " rgb(209 213 219)",
                            }}
                          >
                            {as}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {selectedOption == "positive" && (
              <div className="pb-7">
                {!pCount ? (
                  <div className="flex justify-center items-center p-4 text-2xl text-gray-400">
                    No Reviews
                  </div>
                ) : (
                  dat.predictions
                    .slice()
                    .reverse()
                    .map(
                      (rev: any, i: any) =>
                        rev.overall_sentiment_polarities == "positive" && (
                          <div
                            key={i}
                            className="w-[100%] bg-gray-200 drop-shadow-sm p-4 bg-opacity-50 backdrop-blur-xl rounded-xl  mb-4"
                          >
                            <div className="flex justify-between items-center">
                              <div className="font-bold text-2xl">
                                {rev.product_review.summary}
                              </div>
                              <span
                                className="absolute inset-x-0 bottom-0 h-1.5 justify-center items-center rounded-b-xl"
                                style={{
                                  backgroundColor:
                                    rev.overall_sentiment_polarities ==
                                    "positive"
                                      ? "rgb(74, 222, 128)"
                                      : rev.overall_sentiment_polarities ==
                                        "negative"
                                      ? "rgb(248, 113, 113)"
                                      : " rgb(156, 163, 175)",
                                }}
                              ></span>
                              <div>{rev.product_review.date}</div>
                            </div>
                            <div className="text-xl">
                              {rev.product_review.review}
                            </div>
                            <div className="flex gap-2 pt-5 flex-wrap">
                              {rev.aspect_terms.map((as: any, ind: any) => (
                                <div
                                  key={ind}
                                  className="p-2 rounded-xl"
                                  style={{
                                    backgroundColor:
                                      rev.aspect_sentiment_polarities[ind] ==
                                      "positive"
                                        ? "rgb(220 252 231)"
                                        : rev.aspect_sentiment_polarities[
                                            ind
                                          ] == "negative"
                                        ? "rgb(254 226 226)"
                                        : " rgb(209 213 219)",
                                  }}
                                >
                                  {as}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                    )
                )}
              </div>
            )}
            {selectedOption == "negative" && (
              <div className="pb-7">
                {!negCount ? (
                  <div className="flex justify-center items-center p-4 text-2xl text-gray-400">
                    No Reviews Found
                  </div>
                ) : (
                  dat.predictions
                    .slice()
                    .reverse()
                    .map(
                      (rev: any, i: any) =>
                        rev.overall_sentiment_polarities == "negative" && (
                          <div
                            key={i}
                            className="w-[100%] bg-gray-200 drop-shadow-sm p-4 bg-opacity-50 backdrop-blur-xl rounded-xl  mb-4"
                          >
                            <div className="flex justify-between items-center">
                              <div className="font-bold text-2xl">
                                {rev.product_review.summary}
                              </div>
                              <span
                                className="absolute inset-x-0 bottom-0 h-1.5 justify-center items-center rounded-b-xl"
                                style={{
                                  backgroundColor:
                                    rev.overall_sentiment_polarities ==
                                    "positive"
                                      ? "rgb(74, 222, 128)"
                                      : rev.overall_sentiment_polarities ==
                                        "negative"
                                      ? "rgb(248, 113, 113)"
                                      : " rgb(156, 163, 175)",
                                }}
                              ></span>
                              <div>{rev.product_review.date}</div>
                            </div>
                            <div className="text-xl">
                              {rev.product_review.review}
                            </div>
                            <div className="flex gap-2 pt-5 flex-wrap">
                              {rev.aspect_terms.map((as: any, ind: any) => (
                                <div
                                  key={ind}
                                  className="p-2 rounded-xl"
                                  style={{
                                    backgroundColor:
                                      rev.aspect_sentiment_polarities[ind] ==
                                      "positive"
                                        ? "rgb(220 252 231)"
                                        : rev.aspect_sentiment_polarities[
                                            ind
                                          ] == "negative"
                                        ? "rgb(254 226 226)"
                                        : " rgb(209 213 219)",
                                  }}
                                >
                                  {as}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                    )
                )}
              </div>
            )}
            {selectedOption == "neutral" && (
              <div className="pb-7">
                {!nCount ? (
                  <div className="flex justify-center items-center p-4 text-2xl text-gray-400">
                    No Reviews
                  </div>
                ) : (
                  dat.predictions.map(
                    (rev: any, i: any) =>
                      rev.overall_sentiment_polarities == "neutral" && (
                        <div
                          key={i}
                          className="w-[100%] relative bg-gray-200 drop-shadow-sm p-4 bg-opacity-50 backdrop-blur-xl rounded-xl  mb-4"
                        >
                          <div className="flex justify-between items-center">
                            <div className="font-bold text-2xl">
                              {rev.product_review.summary}
                            </div>
                            <span
                              className="absolute inset-x-0 bottom-0 h-1.5 justify-center items-center rounded-b-xl"
                              style={{
                                backgroundColor:
                                  rev.overall_sentiment_polarities == "positive"
                                    ? "rgb(74, 222, 128)"
                                    : rev.overall_sentiment_polarities ==
                                      "negative"
                                    ? "rgb(248, 113, 113)"
                                    : " rgb(156, 163, 175)",
                              }}
                            ></span>
                            <div>{rev.product_review.date}</div>
                          </div>
                          <div className="text-xl">
                            {rev.product_review.review}
                          </div>
                          <div className="flex gap-2 pt-5 flex-wrap">
                            {rev.aspect_terms.map((as: any, ind: any) => (
                              <div
                                key={ind}
                                className="p-2 rounded-xl"
                                style={{
                                  backgroundColor:
                                    rev.aspect_sentiment_polarities[ind] ==
                                    "positive"
                                      ? "rgb(220 252 231)"
                                      : rev.aspect_sentiment_polarities[ind] ==
                                        "negative"
                                      ? "rgb(254 226 226)"
                                      : " rgb(209 213 219)",
                                }}
                              >
                                {as}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                  )
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <g stroke="currentColor">
              <circle
                cx="12"
                cy="12"
                r="9.5"
                fill="none"
                strokeLinecap="round"
                strokeWidth="3"
              >
                <animate
                  attributeName="stroke-dasharray"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                  keyTimes="0;0.475;0.95;1"
                  repeatCount="indefinite"
                  values="0 150;42 150;42 150;42 150"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                  keyTimes="0;0.475;0.95;1"
                  repeatCount="indefinite"
                  values="0;-16;-59;-59"
                />
              </circle>
              <animateTransform
                attributeName="transform"
                dur="2s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
