export default function ShopItem({product}) {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="single-product">
                <div className="product-img">
                    <img
                        className="card-img"
                        src={product.img1}
                        alt=""
                    />
                    <div className="p_icon">
                        <a href="#">
                            <i className="ti-eye"></i>
                        </a>
                        <a href="#">
                            <i className="ti-shopping-cart"></i>
                        </a>
                    </div>
                </div>
                <div className="product-btm">
                    <a href="#" className="d-block">
                        <h4>{product.productName}</h4>
                    </a>
                    <div className="mt-3">
                        <span className="mr-4">€ {product.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}