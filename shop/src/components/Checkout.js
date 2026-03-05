import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUserCart } from "../services/getUserCart";
import { createOrder } from "../services/createOrder";
import { clearUserCart } from "../services/clearUserCart";
import { useNavigate } from "react-router-dom";
import HelmetComponent from "./HelmetComponent";

export default function Checkout() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [shippingData, setShippingData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("card");

    // Генерираме номер на поръчка (за основание)
    const orderNumber = `ORD-${Date.now()}`;

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
        return <p style={{ textAlign: "center" }}>Моля, влезте в профила си</p>;
    }

    if (loading) {
        return <p style={{ textAlign: "center" }}>Зареждане...</p>;
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

        for (let key in shippingData) {
            if (!shippingData[key]) {
                alert("Моля, попълнете всички полета");
                return;
            }
        }

        try {
            setIsSubmitting(true);

            await createOrder({
                orderNumber,
                userId: user.uid,
                email: user.email,
                items: cartItems,
                subtotal,
                status: paymentMethod === "bank" ? "waiting_for_payment" : "pending",
                createdAt: new Date()
            });

            await clearUserCart(user.uid);

            navigate("/order-success");

        } catch (err) {
            console.error(err);
            alert("Грешка при завършване на поръчката");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <HelmetComponent title="Завършване на поръчка" />
            <section className="checkout_area section_gap">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-8">
                            <h3>Детайли за поръчка</h3>

                            <form className="row contact_form" onSubmit={handleCheckout}>

                                <div className="col-md-6 form-group">
                                    <input type="text" name="firstName" placeholder="Име"
                                        value={shippingData.firstName}
                                        onChange={onChangeHandler}
                                        className="form-control" />
                                </div>

                                <div className="col-md-6 form-group">
                                    <input type="text" name="lastName" placeholder="Фамилия"
                                        value={shippingData.lastName}
                                        onChange={onChangeHandler}
                                        className="form-control" />
                                </div>

                                <div className="col-md-12 form-group">
                                    <input type="email" name="email" placeholder="Имейл"
                                        value={shippingData.email}
                                        onChange={onChangeHandler}
                                        className="form-control" />
                                </div>

                                {/* PAYMENT */}
                                <div className="col-md-12 mt-4">
                                    <h4>Начин на плащане</h4>

                                    <div className="border rounded p-3">


                                        <div className="mt-3 p-3 bg-light rounded border">
                                            <h5>Данни за банков превод</h5>

                                            <p><strong>Получател:</strong> My Company Ltd</p>
                                            <p><strong>Банка:</strong> DSK Bank</p>
                                            <p><strong>IBAN:</strong> BG12STSA93000012345678</p>
                                            <p><strong>BIC:</strong> STSABGSF</p>
                                            <p>
                                                <strong>Основание:</strong> {orderNumber}
                                            </p>

                                            <small className="text-muted">
                                                Моля, въведете точно основанието за плащане,
                                                за да обработим поръчката Ви по-бързо.
                                            </small>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-md-12 mt-4">
                                    <button
                                        type="submit"
                                        className="main_btn w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Обработване..." : `Завърши поръчката (€ ${total.toFixed(2)})`}
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}