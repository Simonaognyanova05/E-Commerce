import { useEffect, useState } from "react";
import { getProducts } from "../../services/getProducts";
import ShopItem from "./ShopItem";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [sortType, setSortType] = useState("default");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // 📦 Load products
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

    // 🔄 Filter + Sort logic (COMBINED)
    useEffect(() => {
        let result = [...products];

        // 🎯 Filter by category
        if (selectedCategory !== "all") {
            result = result.filter(
                p => p.category === selectedCategory
            );
        }

        // 🔃 Sorting
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
    }, [products, sortType, selectedCategory]);

    return (
        <>
            {/* Banner */}
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

            {/* Shop */}
            <section className="cat_product_area section_gap">
                <div className="container">
                    <div className="row flex-row-reverse">

                        {/* Products */}
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
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map(p => (
                                            <ShopItem key={p.id} product={p} />
                                        ))
                                    ) : (
                                        <p>Няма продукти в тази категория.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
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
                                                    onChange={() => setSelectedCategory("all")}
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
                                                        checked={selectedCategory === cat}
                                                        onChange={() => setSelectedCategory(cat)}
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
