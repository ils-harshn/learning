import { GreetUserModal } from "../components/Modal/Modal";

const ModalPage = () => {
  return (
    <div>
      Modal Page (usage of portals) <br />
      <GreetUserModal name={"First One"} />
      <GreetUserModal name={"First Second"} />
    </div>
  );
};

export default ModalPage;
