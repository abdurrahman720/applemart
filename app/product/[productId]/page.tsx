import Container from "@/app/components/Container";
import ProductDetails from "@/app/components/product/ProductDetails";
import { product } from "@/app/utils/product";

interface Iparams{
    productId?: string;
}

const Product = ({ params }: { params: Iparams }) => {
    console.log("params", params);



    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product} />
         </Container>
        </div>
    );
};

export default Product;