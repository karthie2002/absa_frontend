import CategoryDisplay from "./components/CategoryDisplay";
import ProductReview from "./components/ProductView";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<CategoryDisplay />} />
      <Route path="product/:productId" element={<ProductReview />} />
    </Routes>
  );
}

export default App;
