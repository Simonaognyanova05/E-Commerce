import { useEffect, useState } from "react";
import { getBlogs } from '../../services/getBlogs';
import BlogItem from "./BlogItem";

export default function Blog() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getBlogs()
            .then(res => {
                setArticles(res);
            })
            .catch(e => console.log(e));
    }, [articles])

    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>Блог</h2>
                                <p>Нека тук обменим опит и си дадем съвети като начинаещи програмисти</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog_area section_gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="blog_left_sidebar">

                                {articles.length > 0 ? articles.map(x => (
                                    <BlogItem key={x.id} article={x} />
                                )) : 'Няма нови статии'}

                                <nav className="blog-pagination justify-content-center d-flex">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a href="#" className="page-link" aria-label="Previous">
                                                <span aria-hidden="true">
                                                    <span className="ti-arrow-left"></span>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a href="#" className="page-link">1</a>
                                        </li>
                                        <li className="page-item active">
                                            <a href="#" className="page-link">2</a>
                                        </li>
                                        <li className="page-item">
                                            <a href="#" className="page-link" aria-label="Next">
                                                <span aria-hidden="true">
                                                    <span className="ti-arrow-right"></span>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}