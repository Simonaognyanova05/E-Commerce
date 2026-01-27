import { useEffect, useState } from "react";
import { getAllOrders } from "../services/getAllOrders";
import { updateOrderStatus } from "../services/updateOrderStatus";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllOrders()
            .then(res => {
                setOrders(res || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleStatusChange = async (orderId, status) => {
        try {
            await updateOrderStatus(orderId, status);

            setOrders(state =>
                state.map(o =>
                    o.id === orderId ? { ...o, status } : o
                )
            );
        } catch (err) {
            console.error(err);
            alert("Грешка при смяна на статус");
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "-";
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

    if (loading) {
        return <p style={{ textAlign: "center" }}>Зареждане на поръчки...</p>;
    }

    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>Поръчки</h2>
                                <p>Тук са всички направени поръчки</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section_gap">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="order_box">
                                <h3>Списък с поръчки</h3>

                                {orders.length === 0 && (
                                    <p>Все още няма направени поръчки.</p>
                                )}

                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Номер на поръчка</th>
                                                <th>Имейл на потребител</th>
                                                <th>Дата на създаване</th>
                                                <th>Общо</th>
                                                <th>Статус на поръчка</th>
                                                <th>Доставка / Действие</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order.id}>
                                                    <td>{order.id}</td>
                                                    <td>{order.email}</td>
                                                    <td>{formatDate(order.createdAt)}</td>
                                                    <td>€ {order.total}</td>
                                                    <td>
                                                        {order.status === "pending" && (
                                                            <span className="badge badge-warning">
                                                                Изчакване
                                                            </span>
                                                        )}
                                                        {order.status === "completed" && (
                                                            <span className="badge badge-success">
                                                                Завършена
                                                            </span>
                                                        )}
                                                        {order.status === "cancelled" && (
                                                            <span className="badge badge-danger">
                                                                Отказана
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <div style={{ fontSize: "14px", lineHeight: "1.4" }}>
                                                            <strong>Инфо за доставка</strong>
                                                            <br />

                                                            {order.shippingData ? (
                                                                <>
                                                                    {order.shippingData.firstName} {order.shippingData.lastName}
                                                                    <br />
                                                                    {order.shippingData.phone}
                                                                    <br />
                                                                    {order.shippingData.address}
                                                                    <br />
                                                                    {order.shippingData.city}, {order.shippingData.zip}
                                                                </>
                                                            ) : (
                                                                <span>-</span>
                                                            )}

                                                            <hr />

                                                            {order.status === "pending" ? (
                                                                <>
                                                                    <a
                                                                        href="#"
                                                                        className="genric-btn success small"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleStatusChange(order.id, "completed");
                                                                        }}
                                                                    >
                                                                        Завършена
                                                                    </a>

                                                                    <a
                                                                        href="#"
                                                                        className="genric-btn danger small"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleStatusChange(order.id, "cancelled");
                                                                        }}
                                                                    >
                                                                        Отказана
                                                                    </a>
                                                                </>
                                                            ) : (
                                                                <span>-</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
