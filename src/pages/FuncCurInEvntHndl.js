import { useState } from "react";

const FuncCurInEvntHndl = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleTextChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="email"
        name="email"
        value={formData.email}
        onChange={handleTextChange("email")}
      ></input>
      <input
        type="password"
        placeholder="password"
        name="password"
        value={formData.password}
        onChange={handleTextChange("password")}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FuncCurInEvntHndl;
