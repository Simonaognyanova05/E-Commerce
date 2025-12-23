import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/getProductById";
import { editProduct } from "../services/editProduct";


export default function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        productName: "",
        category: "",
        description: "",
        price: "",
        img1: "",
        img2: "",
        img3: "",
    });

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const data = await getProductById(id);
                if (data) setProduct(data);
            } catch (err) {
                console.error("Error loading article:", err);
                alert("Failed to load information.");
            }
        };
        fetchOffer();
    }, [id]);

    const editHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        const updatedData = Object.fromEntries(formData);

        await editProduct(id, updatedData);
        alert("Продуктът е редактиран успешно!");
        navigate('/shop');
    }

    return (
        <section className="login_area section_gap">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-10">
                        <div className="login_form_inner p-4 shadow-sm bg-white rounded">
                            <h3 className="text-center mb-4">Редактиране на продукт</h3>

                            <form onSubmit={editHandler}>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="productName"
                                        className="form-control"
                                        placeholder="Име на продукт"
                                        defaultValue={product.productName}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="category"
                                        className="form-control"
                                        placeholder="Категория"
                                        defaultValue={product.category}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="description"
                                        className="form-control"
                                        placeholder="Описание на продукта"
                                        defaultValue={product.description}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        placeholder="Цена"
                                        defaultValue={product.price}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="img1"
                                        className="form-control"
                                        placeholder="Линк към снимка 1"
                                        defaultValue={product.img1}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="img2"
                                        className="form-control"
                                        placeholder="Линк към снимка 2"
                                        defaultValue={product.img2}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        name="img3"
                                        className="form-control"
                                        placeholder="Линк към снимка 3"
                                        defaultValue={product.img3}
                                        required
                                    />
                                </div>

                                <div className="form-group text-center">
                                    <button
                                        type="submit"
                                        className="main_btn w-100"
                                    >
                                        Редактиране
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
