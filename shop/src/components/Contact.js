import { useEffect } from "react";

export default function Contact() {
    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>Contact Us</h2>
                                <p>Very us move be blessed multiply night</p>
                            </div>
                            <div className="page_link">
                                <a href="/">Home</a>
                                <a href="/contact">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section_gap">
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <h2 className="contact-title">Get in Touch</h2>
                        </div>

                        <div className="col-lg-8">
                            <form className="form-contact contact_form" noValidate>
                                <div className="row">
                                    <div className="col-12">
                                        <textarea
                                            className="form-control w-100"
                                            rows="9"
                                            placeholder="Enter Message"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <input
                                            className="form-control"
                                            type="email"
                                            placeholder="Enter email address"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Subject"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="main_btn mt-3">
                                    Send Message
                                </button>
                            </form>
                        </div>

                        <div className="col-lg-4">
                            <div className="media contact-info">
                                <div className="media-body">
                                    <h3>Buttonwood, California</h3>
                                    <p>Rosemead, CA 91770</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
