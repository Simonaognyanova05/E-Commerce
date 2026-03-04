import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

export default function UserProfile() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            try {
                const q = query(
                    collection(db, "orders"),
                    where("userId", "==", user.uid),
                    where("status", "==", "paid"),
                    orderBy("createdAt", "desc")
                );

                const snapshot = await getDocs(q);

                const userOrders = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

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
                <h2 className="mb-4">Профил на потребителя</h2>

                {orders.length === 0 ? (
                    <div className="alert alert-info">
                        Нямате закупени материали.
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <h5>
                                        Поръчка: {order.orderNumber}
                                    </h5>
                                    <span className="badge bg-success">
                                        Платена
                                    </span>
                                </div>

                                <ul className="list-group">
                                    {order.items.map((item, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <div>
                                                <strong>{item.productName}</strong>
                                                <div className="text-muted">
                                                    Количество: {item.quantity}
                                                </div>
                                            </div>

                                            <span>
                                                € {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-end mt-3 fw-bold">
                                    Общо: € {order.total?.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}