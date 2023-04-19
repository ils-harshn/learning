import { useNavigate } from "react-router-dom";

const CartItemCard = ({ product, quantity }) => {
    const navigate = useNavigate();

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
                <div className="col-md-3 col-lg-3 col-xl-3" style={{cursor: "pointer"}} onClick={() => {
                    navigate(`/product/${product.id}`);
                }}>
                    <p className="lead fw-normal mb-2" style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                    }}>{product.title}</p>
                    <p>
                        <span className="text-muted">Dicount: {product.discount_percentage}%</span><br/>
                        <span className="text-muted">Original Price: ₹{product.price}</span>
                    </p>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <button
                        className="btn btn-link px-2"
                    >
                        <i className="fas fa-minus" />
                    </button>
                    <input
                        id="form1"
                        min={0}
                        name="quantity"
                        value={quantity}
                        type="number"
                        className="form-control form-control-sm"
                    />
                    <button
                        className="btn btn-link px-2"
                    >
                        <i className="fas fa-plus" />
                    </button>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h5 className="mb-0">₹{product.discounted_price}</h5>
                </div>
                <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                    <a href="#!" className="text-danger">
                        <i className="fas fa-trash fa-lg" />
                    </a>
                </div>
            </div>
        </div>
    </div>
}

export default CartItemCard;