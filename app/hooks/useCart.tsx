import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../components/product/ProductDetails";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number,
    cartProducts: CartProductType[] | null,
    handleAddProductToCart : (product: CartProductType) =>void,
}



export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any
}

export const CartContextProvider = (props:Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    
    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product]
            }
            else {
                updatedCart = [product]
            }
            console.log("add cart btn clicked");
            toast.success("Product Added to Cart!")
            localStorage.setItem("appleMartCart", JSON.stringify(updatedCart));
        
            return updatedCart;
        })
    }, []);

    useEffect(() => {
        const cartItems: any = localStorage.getItem("appleMartCart");
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);

        setCartProducts(cProducts)
    },[])

    const value= {cartTotalQty, cartProducts, handleAddProductToCart}

    return <CartContext.Provider value={value} {...props} />

}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error ("useCart must be used within a CartContextProvider")
    }

    return context;
}