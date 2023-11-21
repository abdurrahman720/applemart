import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../components/product/ProductDetails";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number,
    cartTotalAmount:number,
    cartProducts: CartProductType[] | null,
    handleAddProductToCart: (product: CartProductType) => void,
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleClearCart: () => void,
    handleCartQtyIncrease:(product: CartProductType) => void,
    handleCartQtyDecrease:(product: CartProductType) => void,
    
}



export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any
}

export const CartContextProvider = (props:Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    const handleClearCart = useCallback(() => {
        setCartTotalQty(0);
        setCartProducts(null);
        localStorage.removeItem("appleMartCart");
        toast.success("Cart Cleared!")
    },[])
    
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
    }, [cartProducts]);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter(p => p.id !== product.id);

            setCartProducts(filteredProducts);
            toast.success("Product removed from Cart!")
            localStorage.setItem("appleMartCart", JSON.stringify(filteredProducts));
        }
        
    }, [cartProducts])
    
    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if (product.quantity === 99) {
            return toast.error("Maximum reached")
        }
        
        if (cartProducts) {
            updatedCart = [...cartProducts];
            
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );
            if (existingIndex >= 0) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity + 1;
            }

            setCartProducts(updatedCart);
            localStorage.setItem("appleMartCart", JSON.stringify(updatedCart));

        }


    }, [cartProducts]);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if (product.quantity === 1) {
                return toast.error("Minimum reached")
        }
        
        if (cartProducts) {
            updatedCart = [...cartProducts];
            
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
              );
            if (existingIndex >= 0) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity - 1;
            

            }

            setCartProducts(updatedCart);
          
            localStorage.setItem("appleMartCart", JSON.stringify(updatedCart));

        }


    },[cartProducts])

    useEffect(() => {
        const cartItems: any = localStorage.getItem("appleMartCart");
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);

        setCartProducts(cProducts)
    }, [])
    
    useEffect(() => {
        const getTotal = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce((acc, item) => { 
                const itemTotal = item.price * item.quantity;
                acc.total = acc.total + itemTotal;
                acc.qty = acc.qty + item.quantity;
                return acc;
            }, {  // deafult value of acc data
                total: 0,
                qty: 0
                })
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
            
        }
        getTotal();

    }, [cartProducts])
    
 

    const value= {cartTotalQty,cartTotalAmount, cartProducts, handleAddProductToCart, handleRemoveProductFromCart, handleClearCart,handleCartQtyIncrease,handleCartQtyDecrease }

    return <CartContext.Provider value={value} {...props} />

}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error ("useCart must be used within a CartContextProvider")
    }

    return context;
}