import * as jsonData from "../../../public/products.json";

const CategoryDisplay = () => {
  const products = jsonData.products;

  const categories: string[] = [
    "Accent Chairs",
    "Armchairs",
    "Dining Chairs",
    "Office Chairs",
    "Lounge Chairs",
    "Outdoor Chairs",
    "Bean Bag Chairs",
    "Convertible Chairs",
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-5/6">
        <div className="flex mt-20 bg-[#aeabae] rounded-2xl justify-around">
          <div className="flex flex-col justify-center text-5xl font-semibold">
            <p>Explore a World of Chairs,</p>
            <p> Crafted For You</p>
          </div>
          <img
            src="https://prod4-sprcdn-assets.sprinklr.com/200052/8797ad9e-cc75-4b75-a27e-320a6310dc15-468706698/450.png"
            alt="Product Image"
            width={300}
            height={400}
          />
        </div>
        <div className="flex justify-start mt-7 gap-9">
          <div className="flex flex-col bg-[#f3f4f6] py-5 rounded-lg">
            <div className="flex justify-between text-lg bg-[#e7eae8] font-semibold mx-2 px-2 rounded-md">
              <div>Category</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                  />
                </svg>
              </div>
            </div>
            {categories.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 gap-2"
                >
                  <div>{item}</div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-3xl font-semibold">Chairs</div>
            <div>
              {products.map((item, i) => {
                return (
                  <div key={i}>
                    <div>hi</div>
                    <div>hi</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDisplay;
