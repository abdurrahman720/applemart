import Container from "@/app/components/Container";
import ProductDetails from "@/app/components/product/ProductDetails";
import { product } from "@/app/utils/product";
import ListRating from "./ListRating";

interface Iparams{
    productId?: string;
}

const Product = ({ params }: { params: Iparams }) => {
    console.log("params", params);



    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product} />
                <div className="flex flex-col mt-20 gap-4">
                    <div>Add Rating</div>
                    <ListRating product={product} />
                </div>
         </Container>
        </div>
    );
};

export default Product;