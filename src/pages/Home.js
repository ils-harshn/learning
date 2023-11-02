import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to={"function-curring-in-event-handler"}>
        Function curring in event handler
      </Link>
      <br />
      <Link to={"best-way-to-use-custom-hooks"}>
        Best way to use custom hooks
      </Link>
      <br />
      <Link to={"use-enum-for-conditional-rendering"}>
        Use enum for conditional rendering
      </Link>
      <br />
      <Link to={"count-down-hook"}>
        Count Down Hook
      </Link>
      <br />
    </div>
  );
};

export default Home;
