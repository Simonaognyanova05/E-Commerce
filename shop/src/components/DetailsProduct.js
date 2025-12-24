import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/getProductById";
import { addToCart } from "../services/addToCart";
import { useAuth } from "../contexts/AuthContext";
import { checkIfAdmin } from "../services/checkIfAdmin";

export default function DetailsProduct() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { productId } = useParams();
    const [details, setDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);

    let isAdmin = checkIfAdmin(user);


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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "products", id));
            navigate("/shop");
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting the product!");
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            alert("You must be logged in to add products to cart");
            return;
        }

        try {
            await addToCart(user.uid, details, quantity);
            alert("Product added to cart 🛒");
        } catch (error) {
            console.error(error);
            alert("Error adding to cart");
        }
    };


    const loggedUser = (
        <button onClick={handleAddToCart} className="main_btn">Add to Cart</button>
    );

    const loggedAdmin = (
        <>
            <Link to={`/editProduct/${details.id}`} className="main_btn">Edit</Link>
            <button onClick={() => handleDelete(details.id)} className="main_btn">Delete</button>
        </>
    );

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
                                    {Boolean(user.email) ? loggedUser : ""}
                                    {isAdmin ? loggedAdmin : ""}
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
