import { useEffect, useState } from "react";
import CartItemCard from "../../Components/CartItemCard";
import { getCartProducts, get_token } from "../../api"
import MainLoader from "../../Components/MainLoader";
import { useNavigate } from "react-router-dom";


const CartDetails = () => {
    const [items, setItems] = useState({})
    const [loading, setLoading] = useState(true);
    const token = get_token();
    let varTotal = 0;
    let varActualPrice = 0;
    const navigate = useNavigate();

    const fetchData = async () => {
        // setLoading(true);
        let data = await getCartProducts(token);
        if (data) {
            setItems(data)
            setLoading(false);
        }
        else alert("Something went wrong")
    }

    useEffect(() => {
        if (loading) fetchData();
    }, [loading])

    return <>
        {
            loading ?
                <MainLoader /> :
                <section>
                    <div className="container h-100 py-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-10">
                                {
                                    (items.length != 0) &&
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                                        <div>
                                            <p className="mb-0">
                                                <span className="text-muted">Total Items: {items.count}</span>
                                            </p>
                                        </div>
                                    </div>
                                }
                                {
                                    items.length ? items.map(ele => {
                                        varTotal += (ele.quantity * ele.product.discounted_price);
                                        varActualPrice += (ele.quantity * ele.product.price);
                                        return (
                                            <CartItemCard product={ele.product} key={ele.id} quantity={ele.quantity} reload={setLoading} />
                                        )
                                    }) : <h3>Nothing added in cart</h3>
                                }
                                {
                                    (items.length != 0) &&
                                    <>
                                        <div className="d-flex justify-content-between px-x">
                                            <p className="fw-bold">Discount:</p>
                                            <p className="fw-bold">₹{varActualPrice - varTotal}</p>
                                        </div>
                                        <div
                                            className="d-flex justify-content-between p-2 mb-2"
                                            style={{ backgroundColor: "#e1f5fe" }}
                                        >
                                            <h5 className="fw-bold mb-0">Total:</h5>
                                            <h5 className="fw-bold mb-0">₹{varTotal}</h5>
                                        </div>
                                    </>
                                }
                                <div className="card mb-4">
                                    <div className="card-body">
                                        {
                                            (items.length != 0) &&
                                            <>
                                                <button type="button" className="btn btn-warning btn-block btn-lg" onClick={() => navigate("/cart/order/")}>
                                                    Proceed to Pay
                                                </button>
                                                <p style={{ textAlign: "center", marginTop: 12 }}>OR</p>
                                            </>
                                        }
                                        <button type="button" className="btn btn-primary btn-block btn-lg" onClick={() => navigate("/")}>
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        }

    </>
}

export default CartDetails;