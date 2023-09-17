import { useEffect, useState } from "react";
import * as jsonData from "../../../public/products.json";
import { Link } from "react-router-dom";

interface CategoryInterface {
  product_id: string;
  product_title: string;
}

const CategoryDisplay = () => {
  const [reviews, setReviews] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    fetch("https://backend-absa.vercel.app/categories/findAllCategories")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        console.log(reviews);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // const categories: string[] = [
  //   "Accent Chairs",
  //   "Armchairs",
  //   "Dining Chairs",
  //   "Office Chairs",
  //   "Lounge Chairs",
  //   "Outdoor Chairs",
  //   "Bean Bag Chairs",
  //   "Convertible Chairs",
  // ];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-5/6">
        <div className="flex mt-20 bg-[#aeabae] rounded-2xl justify-around">
          <div className="flex flex-col justify-center text-5xl font-semibold">
            <p>Explore a World of Earphones,</p>
            <p> Crafted For You</p>
          </div>
          <img
            src="https://prod4-sprcdn-assets.sprinklr.com/200052/8797ad9e-cc75-4b75-a27e-320a6310dc15-468706698/450.png"
            alt="Product Image"
            width={300}
            height={400}
          />
        </div>
        <div className="flex justify-start my-7 gap-9">
          <div className="flex flex-col bg-[#f3f4f6] max-w-[300px] gap-4 h-max py-5 rounded-lg">
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
            {reviews.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 gap-2"
                >
                  <div>{item.product_title}</div>
                  <Link to={`product/${item.product_id}`}>
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
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-10 w-full">
            <div className="text-3xl font-semibold">Earphones</div>
            <div className="grid grid-cols-3 grid-flow-row gap-y-10">
              {reviews.map((item, i) => {
                return (
                  <div key={i} className="w-48">
                    <Link to={`product/${item.product_id}`}>
                      <div className="bg-[#d8d8d8] rounded-xl w-52 h-52">
                        <img
                          src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1689320106/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/275212_io0vgm.png?tr=w-600"
                          alt={item.product_title}
                        />
                      </div>
                      <div>{item.product_title}</div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 mt-20 mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <circle cx="8" cy="8" r="6.25" />
              <path d="M10 6.75s-.75-1-2-1s-2.25 1-2.25 2.25s1 2.25 2.25 2.25s2-1 2-1" />
            </g>
          </svg>
          core_dumped
        </div>
      </div>
    </div>
  );
};

export default CategoryDisplay;
