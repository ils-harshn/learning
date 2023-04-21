import { useEffect, useState } from "react"
import MainLoader from "../../Components/MainLoader"
import { getCartProducts, get_token, placeOrderFromCart } from "../../api"
import { useNavigate } from "react-router-dom"

const CheckoutForm = () => {
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [phone, setPhone] = useState("");
    const [addressError, setAddressError] = useState(true);
    const [pincodeError, setPincodeError] = useState(true);
    const [phoneError, setPhoneError] = useState(true);
    const [loading, setLoading] = useState(false);
    const token = get_token();
    const navigate = useNavigate();

    const handleOrderPlaceByCart = async () => {
        setLoading(true);
        let data = await placeOrderFromCart(address, pincode, phone, token);
        navigate("/");
    }

    return <div className="card p-4 border" style={{ marginTop: "46px" }}>
        <p className="mb-0">Address</p>
        <div className="form-outline border">
            <input
                type="text"
                className="form-control"
                placeholder="Address"
                aria-label="Address"
                aria-describedby="basic-addon1"
                value={address}
                onChange={(e) => {
                    let value = e.target.value;
                    setAddress(value);
                    if (value == "") setAddressError("*Required")
                    else setAddressError(false);
                }}
            />
        </div>
        <small className="text-danger" style={{
            height: 20,
        }}>{addressError}</small>
        <div className="row">
            <div className="col-lg-4 col-md-12 mb-0">
                <p className="mb-0">Pin Code</p>
                <div className="form-outline border">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Pin Code"
                        aria-label="Pin Code"
                        aria-describedby="basic-addon1"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => {
                            let value = e.target.value;
                            setPincode(value);
                            if (value.length == 6) setPincodeError(false)
                            else setPincodeError("*Please Enter Valid Pincode")
                        }}
                    />
                </div>
                <small className="text-danger" style={{
                    height: 20,
                }}>{pincodeError}</small>
            </div>
            <div className="col-lg-4 col-md-12 mb-4">
                <p className="mb-0">Phone</p>
                <div className="form-outline border">
                    <input type="number" className="form-control" id="phone"
                        value={phone}
                        onChange={(e) => {
                            let value = e.target.value;
                            setPhone(value);
                            if (value.length == 10) setPhoneError(false);
                            else setPhoneError("*Please Enter Valid Phone Number")
                        }} />
                </div>
                <small className="text-danger" style={{
                    height: 20,
                }}>{phoneError}</small>
            </div>

        </div>
        <button className="btn btn-primary" type="button" disabled={addressError || pincodeError || phoneError || loading} onClick={handleOrderPlaceByCart}>
            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :  "Continue to checkout"}
        </button>
    </div>
}


const SidecartItem = ({ product }) => {
    const navigate = useNavigate();
    return <li className="list-group-item d-flex justify-content-between" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: "pointer" }}>
        <div style={{
            width: "75%",
        }}>
            <h6 className="my-0" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.title}</h6>
            <small className="text-muted">Actual Price: ₹{product.price}</small>
        </div>
        <span className="text-muted">₹{product.discounted_price}</span>
    </li>
}

const Sidecart = ({ items }) => {
    let total = 0;
    return (<div className="col-md-4 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge rounded-pill badge-primary">{items.length}</span>
        </h4>
        <ul className="list-group mb-3">
            {items.map(item => {
                total += item.product.discounted_price;
                return <SidecartItem product={item.product} key={item.id} />
            })}
            <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>₹{total}</strong>
            </li>
        </ul>
    </div>)
}

const CartOrder = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const token = get_token()

    const fetchData = async () => {
        // setLoading(true);
        let data = await getCartProducts(token);
        if (data) {
            setData(data)
            setLoading(false);
        }
        else alert("Something went wrong")
    }

    useEffect(() => {
        fetchData();
    }, [])

    return <>
        {loading ? <MainLoader /> : <main className="mt-5 pt-4">
            <div className="container">
                <h2 className="my-5 text-center">Checkout form</h2>
                <div className="row">
                    <div className="col-md-8 mb-4">
                        <CheckoutForm />
                    </div>
                    <Sidecart items={data} />
                </div>
            </div>
        </main>
        }
    </>
}

export default CartOrder;