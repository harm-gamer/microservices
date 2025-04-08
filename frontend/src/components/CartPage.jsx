import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

        <div className="flex gap-4 items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Product"
            className="w-24 h-24 object-cover rounded-xl"
          />

          <div className="flex-1">
            <h3 className="text-lg font-medium">Product Name</h3>
            <div className="flex items-center mt-2 gap-4">
              <button
                onClick={decrement}
                className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <Minus size={20} />
              </button>

              <span className="text-lg font-semibold">{quantity}</span>

              <button
                onClick={increment}
                className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
