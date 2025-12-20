import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/createProduct";

export default function Create() {
    const navigate = useNavigate();

    const createHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const productData = Object.fromEntries(formData);
        console.log(productData);
        

        await createProduct(
            productData
        );
        alert("Успешно създаване на продукт");
        navigate('/');
    }

    return (
        <section className="login_area section_gap">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-10">
                        <div className="login_form_inner p-4 shadow-sm bg-white rounded">
                            <h3 className="text-center mb-4">Създаване на продукт</h3>

                            <form onSubmit={createHandler}>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="productName"
                                        className="form-control"
                                        placeholder="Име на продукт"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="category"
                                        className="form-control"
                                        placeholder="Категория"
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="description"
                                        className="form-control"
                                        placeholder="Описание на продукта"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        placeholder="Цена"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="img1"
                                        className="form-control"
                                        placeholder="Линк към снимка 1"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="img2"
                                        className="form-control"
                                        placeholder="Линк към снимка 2"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="img3"
                                        className="form-control"
                                        placeholder="Линк към снимка 3"
                                        required
                                    />
                                </div>

                                <div className="form-group text-center">
                                    <button
                                        type="submit"
                                        className="main_btn w-100"
                                    >
                                        Създаване
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
