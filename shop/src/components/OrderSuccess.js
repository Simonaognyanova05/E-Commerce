import { Link } from "react-router-dom";

export default function OrderSuccess() {
    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div>
                                <h2>Успешна поръчка</h2>
                                <p>Благодарим Ви, че пазарувахте от нас</p>
                            </div>
                            <div className="page_link">
                                <Link to="/">Начало</Link>
                                <Link to="#">Поръчка</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="checkout_area section_gap">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div
                                style={{
                                    background: "#fff",
                                    padding: "40px",
                                    borderRadius: "8px",
                                    boxShadow: "0 0 20px rgba(0,0,0,0.05)"
                                }}
                            >
                                <h2 style={{ marginBottom: "20px" }}>
                                    🎉 Благодарим за поръчката!
                                </h2>

                                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                                    Вашата поръчка беше приета успешно и в момента се обработва.
                                </p>

                                <p style={{ fontSize: "15px", marginBottom: "20px" }}>
                                    Ще получите имейл с подробности за поръчката и информация за доставката.
                                </p>

                                <p style={{ fontSize: "14px", color: "#777" }}>
                                    Ако имате въпроси, не се колебайте да се свържете с нас.
                                </p>

                                <div style={{ marginTop: "30px" }}>
                                    <Link to="/" className="main_btn">
                                        Към началната страница
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
