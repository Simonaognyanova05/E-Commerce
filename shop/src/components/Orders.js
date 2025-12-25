export default function Orders() {
    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>Admin Orders</h2>
                                <p>Manage all customer orders</p>
                            </div>
                            <div className="page_link">
                                <a href="/">Home</a>
                                <a href="#">Admin Orders</a>
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
                                <h3>Orders List</h3>

                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>User Email</th>
                                                <th>Date</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Details</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {/* Order row */}
                                            <tr>
                                                <td>#ORD-001</td>
                                                <td>user@email.com</td>
                                                <td>2025-01-10</td>
                                                <td>€ 54</td>
                                                <td>
                                                    <span className="badge badge-warning">
                                                        Pending
                                                    </span>
                                                </td>
                                                <td>
                                                    <a href="#" className="genric-btn info small">
                                                        Завършена
                                                    </a>
                                                    <a href="#" className="genric-btn info small">
                                                        Отказана
                                                    </a>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>#ORD-002</td>
                                                <td>admin@email.com</td>
                                                <td>2025-01-11</td>
                                                <td>€ 120</td>
                                                <td>
                                                    <span className="badge badge-success">
                                                        Completed
                                                    </span>
                                                </td>
                                                <td>
                                                    <a href="#" className="genric-btn info small">
                                                        View
                                                    </a>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>#ORD-003</td>
                                                <td>client@email.com</td>
                                                <td>2025-01-12</td>
                                                <td>€ 34</td>
                                                <td>
                                                    <span className="badge badge-danger">
                                                        Cancelled
                                                    </span>
                                                </td>
                                                <td>
                                                    <a href="#" className="genric-btn info small">
                                                        View
                                                    </a>
                                                </td>
                                            </tr>
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
