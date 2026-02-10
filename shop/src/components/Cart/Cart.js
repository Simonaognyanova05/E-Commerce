import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getUserCart } from "../../services/getUserCart";
import { deleteCartItem } from "../../services/deleteCartItem";

export default function Cart() {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (!user) return;

        getUserCart(user.uid)
            .then(setCart)
            .catch(console.error);
    }, [user]);

    const removeFromCart = async (productId) => {
        if (!user) return;

        try {
            // 1. Backend / Firestore
            await deleteCartItem(user.uid, productId);

            // 2. Local state
            setCart(prev =>
                prev.filter(item => item.id !== productId)
            );
        } catch (err) {
            console.error(err);
        }
    };

    const totalSum = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>Количка</h2>
                                <p>Тук са продуктите, които желаете да закупите</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cart_area">
                <div className="container">
                    <div className="cart_inner">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Продукт</th>
                                        <th>Цена</th>
                                        <th>Количество</th>
                                        <th>Обща сума</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <CartItem
                                            key={item.id}
                                            product={item}
                                            onRemove={removeFromCart}
                                        />
                                    ))}

                                    <tr>
                                        <td colSpan="2"></td>
                                        <td><h5>Общо</h5></td>
                                        <td><h5>€ {totalSum.toFixed(2)}</h5></td>
                                    </tr>

                                    <tr className="out_button_area">
                                        <td colSpan="3"></td>
                                        <td>
                                            <div className="checkout_btn_inner">
                                                <Link className="gray_btn" to="/shop">
                                                    Продължете пазаруването
                                                </Link>
                                                <Link className="main_btn" to="/checkout">
                                                    Плащане
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
