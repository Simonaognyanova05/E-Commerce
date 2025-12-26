import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';
import { useEffect, useState } from 'react';
import { getLastThreeProducts } from '../../services/getLastThreeProducts';

export default function Home() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getLastThreeProducts()
            .then(res => {
                setProduct(res);
            })
            .catch(e => {
                alert(e);
            })
    }, []);

    return (
        <>
            <section className="home_banner_area mb-40">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content row">
                            <div className="col-lg-12">
                                <p className="sub text-uppercase">НАШИЯТ НОВ ОНЛАЙН МАГАЗИН</p>
                                <h3><span>ЗА</span> ВСЕКИ <br />ПО <span>НЕЩО</span></h3>
                                <h4>Намерете всичко необходимо - от детски играчки, до домакински уреди, инструменти и градински мебели.</h4>
                                <Link className="main_btn mt-40" to="/shop">Вижте каталога ни</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="feature-area section_gap_bottom_custom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature">
                                <a href="#" className="title">
                                    <i className="flaticon-money"></i>
                                    <h3>Гаранция за връщане на парите</h3>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature">
                                <a href="#" className="title">
                                    <i className="flaticon-truck"></i>
                                    <h3>Бърза доставка</h3>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature">
                                <a href="#" className="title">
                                    <i className="flaticon-support"></i>
                                    <h3>Отговаряме 24/7</h3>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature">
                                <a href="#" className="title">
                                    <i className="flaticon-blockchain"></i>
                                    <h3>Сигурно плащане</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="feature_product_area section_gap_bottom_custom">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="main_title">
                                <h2><span>Най-нови продукти</span></h2>
                                <p>Тук виждате последните добавени продукти</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {product.map(x => <ProductItem key={x.id} item={x} />)}
                        
                    </div>
                </div>
            </section>


            <section className="blog-area section-gap">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="main_title">
                                <h2><span>latest blog</span></h2>
                                <p>Bring called seed first of third give itself now ment</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/b1.jpg" alt="" />
                                </div>
                                <div className="short_details">
                                    <div className="meta-top d-flex">
                                        <a href="#">By Admin</a>
                                        <a href="#"><i className="ti-comments-smiley"></i>2 Comments</a>
                                    </div>
                                    <a className="d-block" href="single-blog.html">
                                        <h4>Ford clever bed stops your sleeping
                                            partner hogging the whole</h4>
                                    </a>
                                    <div className="text-wrap">
                                        <p>
                                            Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light
                                            Forth.
                                        </p>
                                    </div>
                                    <a href="#" className="blog_btn">Learn More <span className="ml-2 ti-arrow-right"></span></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/b2.jpg" alt="" />
                                </div>
                                <div className="short_details">
                                    <div className="meta-top d-flex">
                                        <a href="#">By Admin</a>
                                        <a href="#"><i className="ti-comments-smiley"></i>2 Comments</a>
                                    </div>
                                    <a className="d-block" href="single-blog.html">
                                        <h4>Ford clever bed stops your sleeping
                                            partner hogging the whole</h4>
                                    </a>
                                    <div className="text-wrap">
                                        <p>
                                            Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light
                                            Forth.
                                        </p>
                                    </div>
                                    <a href="#" className="blog_btn">Learn More <span className="ml-2 ti-arrow-right"></span></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog">
                                <div className="thumb">
                                    <img className="img-fluid" src="img/b3.jpg" alt="" />
                                </div>
                                <div className="short_details">
                                    <div className="meta-top d-flex">
                                        <a href="#">By Admin</a>
                                        <a href="#"><i className="ti-comments-smiley"></i>2 Comments</a>
                                    </div>
                                    <a className="d-block" href="single-blog.html">
                                        <h4>Ford clever bed stops your sleeping
                                            partner hogging the whole</h4>
                                    </a>
                                    <div className="text-wrap">
                                        <p>
                                            Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light
                                            Forth.
                                        </p>
                                    </div>
                                    <a href="#" className="blog_btn">Learn More <span className="ml-2 ti-arrow-right"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}