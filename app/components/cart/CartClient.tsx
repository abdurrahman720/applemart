import Link from "next/link";
import { useCart } from "../../hooks/useCart";
import { MdArrowBack } from "react-icons/md";
import Heading from "../Heading";
import Button from "../Button";
import CartItem from "./CartItem";
import { formatPrice } from "@/app/utils/formatPrice";
import { useCallback, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const [loc, setLoc] = useState(true);
  const [deliveryFee,setDeliveryFee] = useState(80);


  const toggleLoc = useCallback(() => {
    if (loc === true) {
      setLoc(false);
      setDeliveryFee(150)
    }
    else {
      setLoc(true);
      setDeliveryFee(80)
    }
 
  },[loc])

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center ">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="flex items-center  text-slate-500 gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Heading title="Shoppig Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center ">
        <div className="col-span-2 justify-self-start">Product</div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-center">Quantity</div>
        <div className="justify-self-end">Total</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <CartItem key={item.id} item={item} />
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="w-[90px]">
          <Button label="Clear Cart" onClick={() => {handleClearCart()}} small outline />
        </div>

        <div className="w-full md:w-[400px] text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <div className="flex items-center gap-1">
              Delivery Fee {loc ? '(inside dhaka)' : '(outside dhaka)'}
              <div className="cursor-pointer" onClick={toggleLoc}>
              <FaArrowsRotate />
         </div>
            </div>
            <span>
              {formatPrice(deliveryFee)}
            </span>
          </div>
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>
              {formatPrice(cartTotalAmount + deliveryFee )}
            </span>
          </div>

          <p className="text-slate-500">
            Cash on Delivery available!
          </p>
          <Button label="Checkout" onClick={() => {}} />
          <div>
            <Link
              href={"/"}
              className="flex items-center  text-slate-500 gap-1 mt-2"
            >
              <MdArrowBack />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
