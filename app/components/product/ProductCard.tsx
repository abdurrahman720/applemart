"use client"

import { formatPrice } from "@/app/utils/formatPrice";
import { truncateText } from "@/app/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps{
    product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const router = useRouter();

    
    const productRating = product.reviews.reduce((acc: number, item: any) => {
        return (item.rating + acc)
    }, 0) / product.reviews.length;
    



    return (
        <div onClick={()=>router.push(`/product/${product.id}`)} className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
            <div className="flex flex-col items-center w-full gap-1"> 
            <div className="aspect-square overflow-hidden relative w-full">
                <Image fill className="w-full h-full object-contain" src={product.images[0].image} alt={product.name} />
                </div>
                <div className="mt-4">
              {truncateText(product.name)}
                </div>
                <div>
                    <Rating value={productRating} readOnly/>
                </div>
                <div>
                    {product.reviews.length} reviews
                </div>
                <div className="font-semibold ">
                    {formatPrice(product.price)}
                </div>
            </div>

            
        </div>
    );
};

export default ProductCard;