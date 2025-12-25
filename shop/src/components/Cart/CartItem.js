export default function CartItem({ product }) {
    return (
        <tr>
            <td>
                <div className="media">
                    <div className="d-flex">
                        <img src={product.img} style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover"
                        }} alt="" />
                    </div>
                    <div className="media-body">
                        <p>{product.productName}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>€ {product.price}</h5>
            </td>
            <td>
                <div className="product_count">
                    <input type="text" name="qty" id="sst" maxlength="12" value={product.quantity} title="Quantity:"
                        className="input-text qty" />

                </div>
            </td>
            <td>
                <h5>€ {Number(product.quantity) * Number(product.price)}</h5>
            </td>
        </tr>
    );
}