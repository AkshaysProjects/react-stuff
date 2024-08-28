import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const useCart = (productList: CartItem[] = []) => {
  const [cart, setCart] = useState<CartItem[]>(productList);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id: number, quantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: isNaN(quantity) ? 1 : Math.max(0, quantity) }
          : item,
      ),
    );
  };

  const removeProduct = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountedTotal = totalPrice * (1 - discount / 100);

  const handleDiscountChange = (value: string) => {
    const discountValue = parseFloat(value);
    setDiscount(
      isNaN(discountValue) ? 0 : Math.min(100, Math.max(0, discountValue)),
    );
  };

  return {
    cart,
    discount,
    totalPrice,
    discountedTotal,
    updateQuantity,
    removeProduct,
    handleDiscountChange,
  };
};

export default useCart;
