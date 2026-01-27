import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../services/login";

export default function Login() {
    const navigate = useNavigate();
    const { onLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData);

        const result = await login(email, password);
        alert("Успешно влизане!");
        onLogin(result);
        navigate('/');
    };

    return (
        <section className="login_area section_gap">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-10">
                        <div className="login_form_inner p-4 shadow-sm bg-white rounded">
                            <h3 className="text-center mb-4">Влизане</h3>

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

                                <div className="form-group text-center">
                                    <button
                                        type="submit"
                                        className="main_btn w-100"
                                    >
                                        Влизане
                                    </button>
                                </div>

                                <div className="text-center mt-3">
                                    <a href="#" className="small">
                                       Забравена парола?
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
