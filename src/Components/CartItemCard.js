import { useNavigate } from "react-router-dom";
import { get_token, removeProductFromCartFromId, updateProductToCartFromID } from "../api";
import { useState } from "react";

const CartItemCard = ({ product, quantity, reload }) => {
    const navigate = useNavigate();
    const token = get_token();

    const [itemQuantity, setItemQuantity] = useState(quantity);

    const handleDelete = async (id) => {
        let data = await removeProductFromCartFromId(id, token);
        if (data == false) alert("Something went wrong");
        reload(true);
    }

    const handleUpdate = async (id) => {
        let data = await updateProductToCartFromID(id, itemQuantity, token);
        if (data == false) alert("Something went wrong");
        reload(true);
    }

    return <div className="card rounded-3 mb-4">
        <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
                <div className="col-md-2 col-lg-2 col-xl-2">
                    <img
                        src={product.img_url}
                        className="img-fluid rounded-3"
                        alt="Cotton T-shirt"
                    />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3" style={{ cursor: "pointer" }} onClick={() => {
                    navigate(`/product/${product.id}`);
                }}>
                    <p className="lead fw-normal mb-2" style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                    }}>{product.title}</p>
                    <p>
                        <span className="text-muted">Dicount: {product.discount_percentage}%</span><br />
                        <span className="text-muted">Original Price: ₹{product.price}</span><br />
                        <span className="text-muted">Discounted Price: ₹{product.discounted_price}</span>
                    </p>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <button
                        className="btn btn-link px-2"
                    >
                    </button>
                    <input
                        id="form1"
                        min={1}
                        name="quantity"
                        value={itemQuantity}
                        max={product.quantity}
                        type="number"
                        className="form-control form-control-sm"

                        onChange={(e) => setItemQuantity(e.target.value)}
                    />
                    <button
                        className="btn btn-link px-2"
                        onClick={() => handleUpdate(product.id)}
                        disabled={((!itemQuantity) || itemQuantity > product.quantity || itemQuantity < 1 || itemQuantity == quantity)}
                    >
                        Update
                    </button>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h5 className="mb-0">₹{product.discounted_price * quantity} </h5>
                </div>
                <div className="col-md-1 col-lg-1 col-xl-1 text-end" style={{ cursor: "pointer" }}>
                    <a className="text-danger" onClick={() => handleDelete(product.id)}>
                        <i className="fas fa-trash fa-lg" />
                    </a>
                </div>
            </div>
        </div>
    </div>
}

export default CartItemCard;