const Footer = () => {
    return (
        <footer
            className="text-center text-white mt-4"
            style={{ backgroundColor: "#607D8B" }}
        >
            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", textColor: "#E0E0E0" }}
            >
                © 2023 Copyright:
                <a className="text-white" href="#">
                    Cart JS
                </a>
            </div>
        </footer>

    )
}

export default Footer;