import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/createBlog";
import HelmetComponent from "./HelmetComponent";

export default function CreateBlog() {
    const navigate = useNavigate();

    const createHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const productData = Object.fromEntries(formData);
        console.log(productData);


        await createBlog(
            productData
        );
        alert("Успешно създаване на статия");
        navigate('/');
    }

    return (
        <>
            <HelmetComponent title="Създаване на продукт" />
            <section className="login_area section_gap">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7 col-sm-10">
                            <div className="login_form_inner p-4 shadow-sm bg-white rounded">
                                <h3 className="text-center mb-4">Създаване на статия</h3>

                                <form onSubmit={createHandler}>
                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            placeholder="Заглавие на статия"
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
                                        <textarea
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            placeholder="Описание на статия"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            name="img"
                                            className="form-control"
                                            placeholder="Линк към снимка"
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
        </>
    );
}
