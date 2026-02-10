export default function ProductItem({ item }) {
    return (<div className="col-lg-4 col-md-6">
        <div className="single-product">
            <div className="product-img">
                <img className="img-fluid w-100" src={item.img1} alt="" />
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
                    <h4>{item.productName}</h4>
                </a>
                <div className="mt-3">
                    <span className="mr-4">€ {item.price}</span>
                </div>
            </div>
        </div>
    </div>)
}