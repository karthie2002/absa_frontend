import * as jsonData from "../../../public/products.json";
const ProductReview = () => {
  const prod = {
    product_id: "ACCFZGAQJGYCYDCM",
    product_desc: "Lorem ipsum dolor sit amet, consectetur adipis",
    product_title:
      "BoAt Rockerz 235v2 with ASAP charging Version 5.0 Bluetooth Headset",
    category: "Electronics",
    overall_score: 80,
    reviews: [
      {
        review_id: 101,
        review_content:
          "1-more flexible2-bass is very high3-sound clarity is good 4-battery back up to 6 to 8 hour's 5-main thing is fastest charging system is available in that. Only 20 min charge and get long up to 4 hours back up 6-killing look awesome 7-for gaming that product does not support 100% if you want for gaming then I'll recommend you please don't buy but you want for only music then this product is very well for you.. 8-no more wireless headphones are comparing with that headphones at this pric...",
        aspect_terms: ["quality", "performance"],
        sentiment_polarities: ["positive", "positive"],
        overall_sentiment: "negative",
      },
      {
        review_id: 102,
        review_content:
          "For the first time, I am posting a review, just because the product compelled me to do so. Icouldn't find a single aspect missed or mis-handled by Boat. Well this is called, quality engineering. Well, some people say Boat enhances bass and thus compensates with clarity, but I would give my neutral and true feedbackBass : 10/10Clarity : 9/10Comfort ease n looks : 15/10Features :10/10The best buy from flipkart yet..",
        aspect_terms: ["durability", "price"],
        sentiment_polarities: ["negative", "negative"],
        overall_sentiment: "negative",
      },
    ],
  };
  return (
    <div className="flex h-[100vh]">
      <div className="w-[50%] flex justify-center items-center pr-20">
        <img
          src={`../../../public/${prod.category}.jpg`}
          style={{ height: "80%", width: "60%", borderRadius: "10px" }}
        />
      </div>
      <div className="w-[50%] flex flex-col p-20 ">
        <div className="flex flex-col gap-3">
          <div className="text-4xl">{prod.product_title}</div>
          <div className="text-xl">{prod.product_desc}</div>
          <div>{prod.overall_score}</div>
        </div>
        <div className="pt-3 justify-start items-center"><hr/></div>
      </div>
    </div>
  );
};

export default ProductReview;
