import * as jsonData from "../../../public/products.json";
const ProductReview = () => {
  const prod = jsonData.products;
  return (
    <div className="flex">
      <div className="w-[50%]">
        <div>
          {prod.map((p) => (
            <div>{p.product_desc}</div>
          ))}
        </div>
      </div>
      <div className="w-[50%]">hi</div>
    </div>
  );
};

export default ProductReview;
