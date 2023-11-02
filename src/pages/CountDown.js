import useCountDown from "../hooks/useCountDown";

const CountDown = () => {
  const { seconds } = useCountDown(20);
  return <div>{seconds}</div>;
};

export default CountDown;
