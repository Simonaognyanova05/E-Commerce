import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function UserProfile() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            try {
                // Взимаме ВСИЧКИ поръчки на потребителя
                const q = query(
                    collection(db, "orders"),
                    where("userId", "==", user.uid)
                );

                const snapshot = await getDocs(q);

                const userOrders = snapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    // филтрираме в кода
                    .filter(order =>
                        order.status === "paid" ||
                        order.status === "completed"
                    )
                    // сортиране
                    .sort((a, b) =>
                        (b.createdAt?.seconds || 0) -
                        (a.createdAt?.seconds || 0)
                    );

                setOrders(userOrders);
            } catch (err) {
                console.error("Error loading orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (!user) {
        return <p style={{ textAlign: "center" }}>Моля, влезте в профила си</p>;
    }

    if (loading) {
        return <p style={{ textAlign: "center" }}>Зареждане...</p>;
    }

    return (
        <section className="section_gap">
            <div className="container">
                <h2 className="mb-4">Моите закупени материали</h2>

                {orders.length === 0 ? (
                    <div className="alert alert-info">
                        Все още нямате платени поръчки.
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="card mb-4 shadow-sm">
                            <div className="card-body">

                                <div className="d-flex justify-content-between mb-2">
                                    <h5>Поръчка: {order.orderNumber || order.id}</h5>

                                    <span className="badge bg-success">
                                        {order.status === "completed"
                                            ? "Доставена"
                                            : "Платена"}
                                    </span>
                                </div>

                                <ul className="list-group">
                                    {order.items?.map((item, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between"
                                        >
                                            <span>
                                                {item.productName} x {item.quantity}
                                            </span>
                                            <span>
                                                € {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-end mt-3 fw-bold">
                                    Общо: € {order.subtotal?.toFixed(2)}
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}