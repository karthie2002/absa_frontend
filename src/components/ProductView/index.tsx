import { useEffect, useState } from "react";
import axios from "axios";

const ProductReview = ({ pid }: any) => {
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
  useEffect(() => {
    async function fetchData() {
      try {
        const val = await axios.get(
          `https://backend-absa.vercel.app/groupReviews/${pid}`
        );
        setData(val.data);
        console.log(val.data);
      } catch (error) {
        console.log("error");
      }
    }

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
  return (
    <div>
      {dat ? (
        <div className="flex h-[100vh] mb-8">
          <div className="w-[50%] flex justify-center items-center pr-20">
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
          <div className="w-[50%] flex flex-col p-20 ">
            <div className="flex flex-col gap-3">
              <div className="text-4xl font-bold">
                {dat?.details.product_title}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl font-semibold text-green-500">
                  {pVal}%
                </div>
                <div>
                  <img src="../../../tick.png" height={20} width={20} />
                </div>
              </div>
            </div>
            <div className="pt-3 justify-start items-center">
              <hr />
            </div>
            <div className="flex flex-col pb-3">
              <div className="pt-3 text-3xl font-bold">$30</div>
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
            <div className="flex w-full justify-center pb-7 items-center">
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
            <div className="pb-7">
              {dat.predictions.map((rev: any, i: any) => (
                <div
                  key={i}
                  className="w-[100%] bg-gray-200 p-4 bg-opacity-50 backdrop-blur-xl rounded-xl  mb-3"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-2xl">
                      {rev.product_review.summary}
                    </div>
                    <span
                      className="absolute inset-x-0 bottom-0 h-1 rounded-b-xl"
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
                        className="p-2 rounded-xl"
                        style={{
                          backgroundColor:
                            rev.aspect_sentiment_polarities[ind] == "positive"
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
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <img src="../../../loader.gif" />
        </div>
      )}
    </div>
  );
};

export default ProductReview;
