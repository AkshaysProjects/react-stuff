import { createLazyFileRoute } from "@tanstack/react-router";
import { FormattedNumber, IntlProvider } from "react-intl";
import productList from "../data/product_list.json";
import useCart from "../hooks/useCart";

export const Route = createLazyFileRoute("/cart")({
  component: Cart,
});

function Cart() {
  const {
    cart,
    discount,
    totalPrice,
    discountedTotal,
    updateQuantity,
    removeProduct,
    handleDiscountChange,
  } = useCart(productList);

  return (
    <IntlProvider locale="en-IN" defaultLocale="en">
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Your Shopping Cart
              </h1>
              <div className="space-y-4">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between rounded-lg bg-gray-50 p-4 shadow-sm sm:flex-row sm:items-center"
                  >
                    <div className="mb-2 sm:mb-0">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h2>
                      <p className="text-gray-600">
                        Price:{" "}
                        <FormattedNumber
                          value={product.price}
                          style="currency"
                          currency="INR"
                          minimumFractionDigits={0}
                          maximumFractionDigits={0}
                        />
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            product.id,
                            parseInt(e.target.value, 10),
                          )
                        }
                        className="w-16 rounded-md border p-2 text-center"
                      />
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="rounded-md bg-red-500 px-3 py-2 text-white transition duration-150 ease-in-out hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Discount (%):
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => handleDiscountChange(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </label>
              </div>
              <div className="mt-8 rounded-lg bg-gray-50 p-4 shadow-sm">
                <p className="text-lg font-semibold text-gray-900">
                  Total:{" "}
                  <FormattedNumber
                    value={totalPrice}
                    style="currency"
                    currency="INR"
                    minimumFractionDigits={0}
                    maximumFractionDigits={0}
                  />
                </p>
                <p className="mt-2 text-xl font-semibold text-indigo-600">
                  Discounted Total:{" "}
                  <FormattedNumber
                    value={discountedTotal}
                    style="currency"
                    currency="INR"
                    minimumFractionDigits={0}
                    maximumFractionDigits={0}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
}
