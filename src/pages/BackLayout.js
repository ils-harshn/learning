import { Link, Outlet } from "react-router-dom";

const BackLayout = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Link to={"/"} style={{marginRight: "20px"}}>Home</Link>
        <Link onClick={handleGoBack}>Back</Link>
      </div>
      <Outlet />
    </>
  );
};

export default BackLayout;
