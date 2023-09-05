const ProductReview = () => {
  const prod = {
    product_id: "ACCFZGAQJGYCYDCM",
    product_review_total: 186,
    product_price: 580,
    product_positive: 20,
    product_negative: 80,
    product_neutral: 86,
    product_desc: "Lorem ipsum dolor sit amet, consectetur adipis",
    product_title:
      "BoAt Rockerz 235v2 with ASAP charging Version 5.0 Bluetooth Headset",
    category: "Electronics",
    overall_score: 80,

    reviews: [
      {
        review_id: 101,
        review_summary: "Awesome",
        review_content:
          "1-more flexible2-bass is very high3-sound quatlity is good 4-battery back up to 6 to 8 hour's 5-main thing is fastest charging system is available in that performance. Only 20 min charge and get long up to 4 hours back up 6-killing look awesome 7-for gaming that product does not support 100% if you want for gaming then I'll recommend you please don't buy but you want for only music then this product is very well for you.. 8-no more wireless headphones are comparing with that headphones at this pric...",
        aspect_terms: ["quality", "performance", "performance", "performance", "performance", "performance", "performance", "performance", "performance", "performance", "performance", "performance", "performance", "performance", "performance"],
        sentiment_polarities: ["neutral", "positive", "positive", "positive", "positive", "positive", "positive", "positive", "positive", "positive", "positive", "positive", "positive", "positive"],
        overall_sentiment: "negative",
      },
      {
        review_id: 102,
        review_summary: "Marvelous",
        review_content:
          "durability For the first time, I am posting a review, just because the product compelled me to do so. Icouldn't find a single aspect missed or mis-handled by Boat. Well this is called, quality engineering. Well, some people say Boat enhances bass and thus compensates with clarity, but I would give my neutral and true feedbackBass : 10/10Clarity : 9/10Comfort ease n looks : 15/10Features price :10/10The best buy from flipkart yet..",
        aspect_terms: ["durability", "price"],
        sentiment_polarities: ["negative", "positive"],
        overall_sentiment: "negative",
      },
    ],
  };
  const pVal = (prod.product_positive / prod.product_review_total) * 100;
  const nVal = (prod.product_neutral / prod.product_review_total) * 100;
  const negVal = (prod.product_negative / prod.product_review_total) * 100;
  return (
    <div className="flex h-[100vh] mb-8">
      <div className="w-[50%] flex justify-center items-center pr-20">
        {prod.category == "default" ? (
          <img
            src={`../../../public/default.jpg`}
            style={{ height: "80%", width: "60%", borderRadius: "10px" }}
          />
        ) : (
          <img
            src={`../../../public/${prod.category}.jpg`}
            style={{ height: "80%", width: "60%", borderRadius: "10px" }}
          />
        )}
      </div>
      <div className="w-[50%] flex flex-col p-20 ">
        <div className="flex flex-col gap-3">
          <div className="text-4xl font-bold">{prod.product_title}</div>
          <div className="text-xl">{prod.product_desc}</div>
          <div>{prod.overall_score}</div>
        </div>
        <div className="pt-3 justify-start items-center">
          <hr />
        </div>
        <div className="flex flex-col pb-3">
          <div className="pt-3 text-3xl font-bold">${prod.product_price}</div>
          <div>Suggested payments with 6 months special financing</div>
        </div>
        <div className="justify-start items-center">
          <hr />
        </div>
        <div className="font-bold text-3xl pt-3 pb-3">Reviews</div>
        {/* <div className="flex w-full justify-between pb-3">
          <div className="flex gap-2 bg-green-100 p-3 rounded-xl">
            <div className="bg-black text-white rounded-full w-7 flex justify-center">
              {prod.product_positive}
            </div>
            Positive
          </div>
          <div className="flex gap-2 bg-gray-300 p-3 rounded-xl">
            <div className="bg-black text-white rounded-full w-7 flex justify-center">
              {prod.product_neutral}
            </div>
            Neutral
          </div>
          <div className="flex gap-2 bg-red-100 p-3 rounded-xl">
            <div className="bg-black text-white rounded-full w-7 flex justify-center">
              {prod.product_negative}
            </div>
            Negative
          </div>
        </div> */}
        <div className="flex w-full justify-center pb-7 items-center">
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
            {prod.product_positive}
          </div>
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
            {prod.product_neutral}
          </div>
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
            {prod.product_negative}
          </div>
        </div>
        <div className="pb-7">
          {prod.reviews.map((rev, i) => (
            <div
              key={i}
              className="w-[100%] bg-white bg-opacity-50 backdrop-blur-xl rounded-xl drop-shadow-lg p-5 mb-3"
            >
              <div className="font-bold text-2xl">{rev.review_summary}</div>
              <div className="text-2xl">{rev.review_content}</div>
              <div className="flex gap-2 pt-2 overflow-x-scroll">
                {rev.aspect_terms.map((as, ind) => (
                  <div
                    className="p-2 rounded-xl"
                    style={{
                      backgroundColor:
                        rev.sentiment_polarities[ind] == "positive"
                          ? "rgb(220 252 231)"
                          : rev.sentiment_polarities[ind] == "negative"
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
  );
};

export default ProductReview;
