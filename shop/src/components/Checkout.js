import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUserCart } from "../services/getUserCart";
import { createOrder } from "../services/createOrder";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!user) return;

        getUserCart(user.uid)
            .then(res => {
                setCartItems(res);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [user]);

    if (!user) {
        return <p style={{ textAlign: "center" }}>Please login to checkout</p>;
    }

    if (loading) {
        return <p style={{ textAlign: "center" }}>Loading checkout...</p>;
    }

    const subtotal = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
    );

    const shipping = subtotal > 0 ? 4 : 0;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        try {
            setIsSubmitting(true);
            const orderId = await createOrder(user, cartItems);
            navigate("/order-success");
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>Product Checkout</h2>
                                <p>Very us move be blessed multiply night</p>
                            </div>
                            <div className="page_link">
                                <a href="/">Home</a>
                                <a href="#">Product Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="checkout_area section_gap">
                <div className="container">
                    <div className="billing_details">
                        <div className="row">
                            <div className="col-lg-8">
                                <h3>Billing Details</h3>
                                <form className="row contact_form">
                                </form>
                            </div>

                            <div className="col-lg-4">
                                <div className="order_box">
                                    <h2>Your Order</h2>

                                    <ul className="list">
                                        <li>
                                            <a href="#">
                                                Product
                                                <span>Total</span>
                                            </a>
                                        </li>

                                        {cartItems.map(item => (
                                            <li key={item.id}>
                                                <a href="#">
                                                    {item.productName}
                                                    <span className="middle">
                                                        x {item.quantity}
                                                    </span>
                                                    <span className="last">
                                                        € {Number(item.price) * Number(item.quantity)}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className="list list_2">
                                        <li>
                                            <a href="#">
                                                Subtotal
                                                <span>€ {subtotal}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Shipping
                                                <span>Flat rate: € {shipping}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Total
                                                <span>€ {total}</span>
                                            </a>
                                        </li>
                                    </ul>

                                    <a
                                        className="main_btn"
                                        href="#"
                                        onClick={handleCheckout}
                                        style={{
                                            pointerEvents: isSubmitting ? "none" : "auto",
                                            opacity: isSubmitting ? 0.6 : 1
                                        }}
                                    >
                                        {isSubmitting ? "Processing..." : "Proceed to Paypal"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
