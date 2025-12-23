import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/getProductById";

export default function DetailsProduct() {
    const { productId } = useParams();
    const [details, setDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        getProductById(productId)
            .then((res) => setDetails(res))
            .catch(() => {
                alert("Възникна грешка при зареждане на подробностите");
            });
    }, [productId]);

    if (!details) {
        return <p style={{ textAlign: "center" }}>Loading...</p>;
    }

    const increaseQty = () => setQuantity((q) => q + 1);
    const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    return (
        <>
            {/* ===== Banner ===== */}
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div>
                                <h2>Product Details</h2>
                                <p>Very us move be blessed multiply night</p>
                            </div>
                            <div className="page_link">
                                <a href="/">Home</a>
                                <a href="#">Product Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Product ===== */}
            <div className="product_image_area">
                <div className="container">
                    <div className="row s_product_inner">
                        <div className="col-lg-6">
                            <div className="s_product_img">
                                <img
                                    className="img-fluid"
                                    src={details.img1}
                                    alt={details.productName}
                                />
                            </div>
                        </div>

                        <div className="col-lg-5 offset-lg-1">
                            <div className="s_product_text">
                                <h3>{details.productName}</h3>
                                <h2>€ {details.price}</h2>

                                <ul className="list">
                                    <li>
                                        <span>Category</span> : Household
                                    </li>
                                    <li>
                                        <span>Availability</span> : In Stock
                                    </li>
                                </ul>

                                <p>{details.description}</p>

                                {/* ===== Quantity ===== */}
                                <div className="product_count">
                                    <label htmlFor="qty">Quantity:</label>
                                    <input
                                        type="text"
                                        id="qty"
                                        value={quantity}
                                        readOnly
                                        className="input-text qty"
                                    />
                                    <button
                                        onClick={increaseQty}
                                        className="increase items-count"
                                        type="button"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={decreaseQty}
                                        className="reduced items-count"
                                        type="button"
                                    >
                                        −
                                    </button>
                                </div>

                                <div className="card_area">
                                    <button className="main_btn">Add to Cart</button>
                                    <Link to={`/editProduct/${details.id}`} className="main_btn">Edit</Link>
                                    <Link className="main_btn">Delete</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Description ===== */}
            <section className="product_description_area">
                <div className="container">
                </div>
            </section>
        </>
    );
}
