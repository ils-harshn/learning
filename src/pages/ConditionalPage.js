import { Link, useLocation } from "react-router-dom";

const NormalPlan = () => {
  return <div>Normal Plan (Use Enum Conditional Rendering)</div>;
};

const ProPlan = () => {
  return <div>Pro Plan (Use Enum Conditional Rendering)</div>;
};

const PremiumPlan = () => {
  return <div>Premium Plan (Use Enum Conditional Rendering)</div>;
};

const NoPlanSelected = () => {
  return (
    <>
      <br />
      <Link to={"/use-enum-for-conditional-rendering?plan=premium"}>
        Premium Plan
      </Link>
      <br />
      <Link to={"/use-enum-for-conditional-rendering?plan=pro"}>Pro Plan</Link>
      <br />
      <Link to={"/use-enum-for-conditional-rendering?plan=normal"}>
        Normal Plan
      </Link>
      <br />
    </>
  );
};

const views = {
  premium: PremiumPlan,
  pro: ProPlan,
  normal: NormalPlan,
};

const ConditionalPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const CurrentView = views[searchParams.get("plan")] || NoPlanSelected;
  return (
    <div>
      Instead using switch or if/else use enum
      <CurrentView />
    </div>
  );
};

export default ConditionalPage;
