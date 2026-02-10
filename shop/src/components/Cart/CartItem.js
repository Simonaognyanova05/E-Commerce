export default function CartItem({ product, onRemove }) {
    const handleRemove = () => {
        if (window.confirm("Сигурен ли си, че искаш да премахнеш продукта?")) {
            onRemove(product.id);
        }
    };

    return (
        <tr>
            <td>
                <div className="media align-items-center">
                    <div className="d-flex">
                        <img
                            src={product.img}
                            alt={product.productName}
                            style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                            }}
                        />
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
                    <input
                        type="text"
                        value={product.quantity}
                        readOnly
                        className="input-text qty"
                    />
                </div>
            </td>

            <td>
                <h5>€ {Number(product.quantity) * Number(product.price)}</h5>
            </td>

            <td>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={handleRemove}
                >
                    ✕
                </button>
            </td>
        </tr>
    );
}
