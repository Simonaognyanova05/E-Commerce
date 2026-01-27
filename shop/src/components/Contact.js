import { useNavigate } from "react-router-dom";
import {sendMessage} from "../services/sendMessage";

export default function Contact() {
    const navigate = useNavigate();
    
    const submitHandler = async(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const {message, name, email, subject} = Object.fromEntries(formData);
        
        
        let result = await sendMessage(message, name, email, subject);

        if(result.status === 200){
            alert("Съобщението е изпратено успешно!");
            navigate('/');
        }
    }
    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>Контакти</h2>
                                <p>Тук може да комуникирате с нас чрез формата по-надолу.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section_gap">
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <h2 className="contact-title">Пишете ни</h2>
                        </div>

                        <div className="col-lg-8">
                            <form className="form-contact contact_form" onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col-12">
                                        <textarea
                                            className="form-control w-100"
                                            rows="9"
                                            name="message"
                                            placeholder="Вашето съобщение"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            placeholder="Вашето име"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            placeholder="Вашият имейл"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="subject"
                                            placeholder="Тема"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="main_btn mt-3">
                                    Изпрати
                                </button>
                            </form>
                        </div>

                        <div className="col-lg-4">
                            <div className="media contact-info">
                                <div className="media-body">
                                    <h3>София, България</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
