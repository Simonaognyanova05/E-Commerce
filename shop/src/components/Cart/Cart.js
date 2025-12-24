import CartItem from "./CartItem";
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from "react";
import { getUserCart } from "../../services/getUserCart";

export default function Cart() {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    let totalSum = 0;

    useEffect(() => {
        if (!user) return;

        getUserCart(user.uid)
            .then(setCart)
            .catch(console.error);
    }, [user]);

    cart.forEach(x => totalSum += x.quantity * x.price)

    return (
        <>

            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>Cart</h2>
                                <p>Very us move be blessed multiply night</p>
                            </div>
                            <div className="page_link">
                                <a href="index.html">Home</a>
                                <a href="cart.html">Cart</a>
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
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {cart.map(x => <CartItem key={x.id} product={x} />)}

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <h5>Subtotal</h5>
                                        </td>
                                        <td>
                                            <h5>€ {Number(totalSum)}</h5>
                                        </td>
                                    </tr>
                                    <tr className="out_button_area">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div className="checkout_btn_inner">
                                                <a className="gray_btn" href="#">Continue Shopping</a>
                                                <a className="main_btn" href="#">Proceed to checkout</a>
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
    )
}