import { useAuth } from "../contexts/AuthContext";
import { Form, useNavigate } from "react-router-dom";
import { register } from "../services/register";

export default function Register() {
    const navigate = useNavigate();
    const { onRegister } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password, rePass } = Object.fromEntries(formData);

        if (password !== rePass) {
            alert("Паролите не съвпадат!");
            return;
        };

        try {
            const result = await register(email, password);
            onRegister(result);
            alert("Успешна регистрация!");
            navigate('/');
        } catch (err) {
            alert(err.message);
        }

    }
    return (
        <section className="login_area section_gap">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-10">
                        <div className="login_form_inner p-4 shadow-sm bg-white rounded">
                            <h3 className="text-center mb-4">Регистрация</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Имейл"
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Парола"
                                        required
                                    />
                                </div>


                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                        name="rePass"
                                        className="form-control"
                                        placeholder="Потвърдете паролата"
                                        required
                                    />
                                </div>

                                <div className="form-group text-center">
                                    <button
                                        type="submit"
                                        className="main_btn w-100"
                                    >
                                        Регистрация
                                    </button>
                                </div>

                                <div className="text-center mt-3">
                                    <a href="#" className="small">
                                        Вече имате профил?
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
