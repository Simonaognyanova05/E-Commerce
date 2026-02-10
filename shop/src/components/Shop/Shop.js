import './Shop.css';
import { useEffect, useState } from "react";
import { getProducts } from "../../services/getProducts";
import ShopItem from "./ShopItem";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [sortType, setSortType] = useState("default");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    // LOAD PRODUCTS
    useEffect(() => {
        getProducts()
            .then(res => {
                setProducts(res);
                setFilteredProducts(res);

                const uniqueCategories = [
                    ...new Set(res.map(p => p.category).filter(Boolean))
                ];
                setCategories(uniqueCategories);
            })
            .catch(() => {
                alert("Възникна грешка при зареждане на продуктите!");
            });
    }, []);

    // FILTER + SORT
    useEffect(() => {
        let result = [...products];

        if (selectedCategory !== "all") {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (sortType === "price-asc") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sortType === "price-desc") {
            result.sort((a, b) => b.price - a.price);
        }

        if (sortType === "name") {
            result.sort((a, b) =>
                (a.name || "").localeCompare(b.name || "")
            );
        }

        setFilteredProducts(result);
        setCurrentPage(1); // reset pagination
    }, [products, sortType, selectedCategory]);

    // PAGINATION LOGIC
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content">
                            <h2>Нашите продукти</h2>
                            <p>Тук ще намерите всички продукти, предложени от нас.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cat_product_area section_gap">
                <div className="container">
                    <div className="row flex-row-reverse">

                        {/* PRODUCTS */}
                        <div className="col-lg-9">
                            <div className="product_top_bar">
                                <select
                                    className="sorting"
                                    value={sortType}
                                    onChange={(e) => setSortType(e.target.value)}
                                >
                                    <option value="default">Default sorting</option>
                                    <option value="price-asc">Цена ↑</option>
                                    <option value="price-desc">Цена ↓</option>
                                    <option value="name">Име (A–Z)</option>
                                </select>
                            </div>

                            <div className="latest_product_inner">
                                <div className="row">
                                    {currentProducts.length > 0 ? (
                                        currentProducts.map(p => (
                                            <ShopItem key={p.id} product={p} />
                                        ))
                                    ) : (
                                        <p>Няма продукти в тази категория.</p>
                                    )}
                                </div>

                                {/* PAGINATION */}
                                {totalPages > 1 && (
                                    <div className="pagination-wrapper">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                                setCurrentPage(prev => prev - 1)
                                            }
                                        >
                                            ← Предишна
                                        </button>

                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                className={
                                                    currentPage === i + 1 ? "active" : ""
                                                }
                                                onClick={() => setCurrentPage(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() =>
                                                setCurrentPage(prev => prev + 1)
                                            }
                                        >
                                            Следваща →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SIDEBAR */}
                        <div className="col-lg-3">
                            <aside className="left_widgets p_filter_widgets">
                                <div className="l_w_title">
                                    <h3>Категории</h3>
                                </div>
                                <div className="widgets_inner">
                                    <ul className="list">
                                        <li>
                                            <label className="radio-item">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value="all"
                                                    checked={selectedCategory === "all"}
                                                    onChange={() =>
                                                        setSelectedCategory("all")
                                                    }
                                                />
                                                <span>Всички</span>
                                            </label>
                                        </li>

                                        {categories.map(cat => (
                                            <li key={cat}>
                                                <label className="radio-item">
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        value={cat}
                                                        checked={
                                                            selectedCategory === cat
                                                        }
                                                        onChange={() =>
                                                            setSelectedCategory(cat)
                                                        }
                                                    />
                                                    <span>{cat}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </aside>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
