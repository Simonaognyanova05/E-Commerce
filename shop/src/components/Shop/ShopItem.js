import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ShopItem({ product }) {
    const { user } = useAuth();


    return (
        <div className="col-lg-4 col-md-6">
            <div className="single-product">
                <div className="product-img">
                    <img
                        className="card-img"
                        src={product.img1}
                        alt=""
                    />
                    <div className="p_icon">
                        <Link to={`/product/${product.id}`}>
                            <i className="ti-eye"></i>
                        </Link>
                        {
                            Boolean(user.email)
                                ? <a href="#">
                                    <i className="ti-shopping-cart"></i>
                                </a>
                                : ""
                        }

                    </div>
                </div>
                <div className="product-btm">
                    <Link to={`/product/${product.id}`} className="d-block">
                        <h4>{product.productName}</h4>
                    </Link>
                    <div className="mt-3">
                        <span className="mr-4">€ {product.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}