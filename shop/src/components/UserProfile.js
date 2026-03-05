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
                    .filter(order => order.status === "paid" || order.status === "completed")
                    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

                setOrders(userOrders);
            } catch (err) {
                console.error("Error loading orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const formatDate = (timestamp) => {
        if (!timestamp?.seconds) return "-";
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

    if (!user) {
        return <p className="text-center mt-5">Моля, влезте в профила си</p>;
    }

    if (loading) {
        return <p className="text-center mt-5">Зареждане...</p>;
    }

    return (
        <section className="section_gap">
            <div className="container">
                <h2 className="mb-4 text-center">Моите закупени материали</h2>

                {orders.length === 0 ? (
                    <div className="alert alert-info text-center">
                        Все още нямате платени поръчки.
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="card mb-4 shadow-sm border-0">
                            <div className="card-header d-flex justify-content-between align-items-center bg-light">
                                <h5 className="mb-0">
                                    Поръчка: {order.orderNumber || order.id}
                                </h5>
                                <span
                                    className={`badge ${
                                        order.status === "completed"
                                            ? "bg-primary"
                                            : "bg-success"
                                    }`}
                                >
                                    {order.status === "completed" ? "Доставена" : "Платена"}
                                </span>
                            </div>

                            <div className="card-body">
                                <p className="text-muted mb-3">
                                    Дата на поръчка: {formatDate(order.createdAt)}
                                </p>

                                <ul className="list-group mb-3">
                                    {order.items?.map((item, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row"
                                        >
                                            <div>
                                                <strong>{item.productName}</strong>
                                                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                                                    Количество: {item.quantity}
                                                </div>
                                            </div>

                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary btn-sm mt-2 mt-md-0"
                                                >
                                                    Виж продукта
                                                </a>
                                            )}

                                            <span className="mt-2 mt-md-0">
                                                € {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-end fw-bold fs-5">
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