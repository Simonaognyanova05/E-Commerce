import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUserCart } from "../services/getUserCart";
import { createOrder } from "../services/createOrder";
import { clearUserCart } from "../services/clearUserCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 📦 Данни за доставка
    const [shippingData, setShippingData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        zip: "",
    });

    useEffect(() => {
        if (!user) return;

        getUserCart(user.uid)
            .then(res => {
                setCartItems(res || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [user]);

    if (!user) {
        return <p style={{ textAlign: "center" }}>Моля, влезте в профила си, за да продължите</p>;
    }

    if (loading) {
        return <p style={{ textAlign: "center" }}>Зареждане на плащане...</p>;
    }

    const subtotal = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
    );

    const shipping = subtotal > 0 ? 4 : 0;
    const total = subtotal + shipping;

    const onChangeHandler = (e) => {
        setShippingData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!cartItems.length) {
            alert("Количката е празна");
            return;
        }

        // 🛑 basic validation
        for (let key in shippingData) {
            if (!shippingData[key]) {
                alert("Моля, попълнете всички данни за доставка");
                return;
            }
        }

        try {
            setIsSubmitting(true);

            await createOrder({
                userId: user.uid,
                email: user.email,
                items: cartItems,
                shippingData,
                subtotal,
                shipping,
                total,
            });

            await clearUserCart(user.uid);

            navigate("/order-success");
        } catch (err) {
            console.error("Checkout error:", err);
            alert(err.message || "Грешка при завършване на поръчката");
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
                                <h2>Завършване на поръчка</h2>
                                <p>Попълнете всички полета, за да завършите поръчката</p>
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
                                <h3>Детайли за поръчка</h3>

                                <form className="row contact_form">
                                    <div className="col-md-6 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            placeholder="Име"
                                            value={shippingData.firstName}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            placeholder="Фамилия"
                                            value={shippingData.lastName}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            placeholder="Телефон"
                                            value={shippingData.phone}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Имейл"
                                            value={shippingData.email}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="col-md-12 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            placeholder="Адрес"
                                            value={shippingData.address}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            placeholder="Град/Село"
                                            value={shippingData.city}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="zip"
                                            placeholder="Пощенски код"
                                            value={shippingData.zip}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="col-lg-4">
                                <div className="order_box">
                                    <h2>Вашата поръчка</h2>

                                    <ul className="list">
                                        <li>
                                            <a href="#">
                                                Продукт
                                                <span>Общо</span>
                                            </a>
                                        </li>

                                        {cartItems.map(item => (
                                            <li key={item.id}>
                                                <a href="#">
                                                    {item.productName}
                                                    <span className="middle">x {item.quantity}</span>
                                                    <span className="last">
                                                        € {Number(item.price) * Number(item.quantity)}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className="list list_2">
                                        <li>
                                            <a href="#">Цена за продуктите <span>€ {subtotal}</span></a>
                                        </li>
                                        <li>
                                            <a href="#">Доставка <span>€ {shipping}</span></a>
                                        </li>
                                        <li>
                                            <a href="#">Общо <span>€ {total}</span></a>
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
                                        {isSubmitting ? "Зареждане..." : "Завършване на поръчка"}
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
