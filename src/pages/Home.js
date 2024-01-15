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
      <Link to={"count-down-hook"}>Count Down Hook</Link>
      <br />
      <Link to={"drop-down-page"}>Drop Down Page</Link>
      <br />
      <Link to={"overflow-for-elements-checker"}>
        Overflow For Elements Checker
      </Link>
      <br />
      <Link to={"call-multiple-apis"}>Call Multiple APIs</Link>
      <br />
    </div>
  );
};

export default Home;
