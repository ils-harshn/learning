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
      <Link to={"modal-page"}>Modal Page (usage of portals)</Link>
      <br />
      <Link to={"infinite-scroll-page"}>Infinite Scroll Page</Link>
      <br />
      <Link to={"rich-text-editor-page"}>Rich Text Editor Page</Link>
      <br />
      <Link to={"error-boundary-page"}>Error Boundary page</Link>
      <br />
      <Link to={"date-picker-page"}>Date picker page</Link>
      <br />
      <Link to={"pdf-generation-from-html"}>Generate PDF from HTML</Link>
      <br />
      <Link to={"table-with-checkboxes"}>Table with checkboxes</Link>
      <br />
      <Link to={"msg-with-files"}>Message with files</Link>
      <br />
      <Link to={"react-VR-DOM"}>React Virtual DOM concept</Link>
      <br />
    </div>
  );
};

export default Home;
