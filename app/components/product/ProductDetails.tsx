"use client";

import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SetColor from "./SetColor";
import SetQuantity from "./SetQuantity";
import Button from "../Button";
import ProductImage from "./ProductImage";
import { useCart } from "@/app/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: selectedImgType;
  quantity: number;
  price: number;
};

export type selectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const CartMessage = () => {
    const router = useRouter();
  
    return (
      <>
        <p className="flex items-center gap-1 mb-2 text-slate-500">
          <MdCheckCircle className="text-teal-400" size={20} />
          <span>Product Added to cart!</span>
        </p>
        <div className="max-w-[300px]">
          <Button label="View Cart" outline onClick={() => router.push('/cart')} />
        </div>
      </>
    );
  };

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, cartProducts, cartTotalQty } = useCart();
    
 

  const [isProductInCart, setIsProductInCart] = useState(false);

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const productRating =
    product.reviews.reduce((acc: number, item: any) => {
      return item.rating + acc;
    }, 0) / product.reviews.length;

  const handleColorSelect = useCallback(
    (value: selectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    console.log("Increasing quantity");
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
        console.log("Previous quantity:", prev.quantity);
        toast.success("qty inc")
        return { ...prev, quantity: prev.quantity + 1 };

    });
  }, [cartProduct.quantity]);

  const handleQtyDecrease = useCallback(() => {
    console.log("Decreasing quantity");
    if (cartProduct.quantity === 1) {
      return;
    }

    setCartProduct((prev) => {
        console.log("Previous quantity:", prev.quantity);
        toast.success("qty dec")
        return { ...prev, quantity: prev.quantity - 1 };
   
    });
  }, [cartProduct.quantity]);

  console.log(cartTotalQty);

  useEffect(() => {
    // setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm ">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY: </span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND: </span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
              {isProductInCart ? <CartMessage /> : <>
              <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
        />
        <Horizontal />
        <SetQuantity
          cartProduct={cartProduct}
          handleQtyDecrease={handleQtyDecrease}
          handleQtyIncrease={handleQtyIncrease}
        />
        <Horizontal />
        <div className="max-w-[300px]">
          <Button
            label="Add to cart"
            onClick={() => {
              handleAddProductToCart(cartProduct);
            }}
          />
        </div>
              </>}

        
      </div>
    </div>
  );
};

export default ProductDetails;
