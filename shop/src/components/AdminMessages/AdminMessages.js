import { useEffect, useState } from "react";
import { getMessages } from "../../services/getMessages";
import { deleteMessage } from "../../services/deleteMessage";

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMessages()
            .then(res => {
                setMessages(res || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            await deleteMessage(id);
            setMessages(prev => prev.filter(m => m.id !== id));
        } catch (err) {
            console.error("Error deleting message:", err);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "-";
        return new Date(timestamp.seconds * 1000).toLocaleString();
    };

    if (loading) {
        return <p style={{ textAlign: "center" }}>Зареждане на съобщения...</p>;
    }

    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div>
                                <h2>Съобщения от потребители</h2>
                                <p>Всички съобщения от потребители</p>
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
                                <h3>Съобщения</h3>

                                {messages.length === 0 && (
                                    <p>Нямате нови съобщения.</p>
                                )}

                                {messages.length > 0 && (
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Имейл</th>
                                                    <th>Съобщения</th>
                                                    <th>Дата на изпращане</th>
                                                    <th>Статус</th>
                                                    <th>Действие</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {messages.map((msg, index) => (
                                                    <tr key={msg.id}>
                                                        <td>{index + 1}</td>

                                                        <td>
                                                            <strong>{msg.email}</strong>
                                                        </td>

                                                        <td>{msg.message}</td>

                                                        <td>{formatDate(msg.createdAt)}</td>

                                                        <td>
                                                            {msg.isRead ? (
                                                                <span className="badge badge-success">
                                                                    Прочетено
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-warning">
                                                                    Непрочетено
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-success"
                                                                onClick={() => handleMarkAsRead(msg.id)}
                                                            >
                                                                Маркирай като прочетено
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
