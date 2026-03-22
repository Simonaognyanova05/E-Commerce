import { Link } from "react-router-dom";

export default function BlogItem({ article }) {
    return (
        <article className="blog_item">
            <div className="blog_item_img">
                <img className="card-img rounded-0" src={article.img} alt="" />
                <Link to={`/details/${article.id}`} className="blog_item_date">
                    <h3>15</h3>
                    <p>Jan</p>
                </Link>
            </div>

            <div className="blog_details">
                <Link className="d-inline-block" to={`/details/${article.id}`}>
                    <h2>{article.title}</h2>
                </Link>
                <p>{article.description}</p>
                <ul className="blog-info-link">
                    <li><a href="#"><i className="ti-user"></i> {article.category}</a></li>
                    <li><a href="#"><i className="ti-comments"></i> 03 Comments</a></li>
                </ul>
            </div>
        </article>
    );
}