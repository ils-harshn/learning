import Dropdown from "../components/Dropdown/Dropdown";

const DropDownPage = () => {
  const options = [
    { value: 1, label: "Apple" },
    { value: 2, label: "Boy" },
    { value: 3, label: "Cat" },
    { value: 4, label: "Dog" },
    { value: 5, label: "Elephant" },
    { value: 6, label: "Fish" },
  ];

  return (
    <div>
      <h2>Dropdown Page</h2>
      <Dropdown

        options={options}
        onSelect={(values) => {
          console.log(values);
        }}
      />
    </div>
  );
};

export default DropDownPage;
