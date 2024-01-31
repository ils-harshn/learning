import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerPage = () => {
  const [datePicked, setDatePicked] = useState(null);
  const [datePicked2, setDatePicked2] = useState(new Date());
  return (
    <>
      <ReactDatePicker
        selected={datePicked}
        utcOffset={0}
        onChange={(date) => {
          console.log(date.toISOString(), "ISO");
          console.log(date);
          console.log("WITH NULL DATE SELECTED");
          setDatePicked(date);
        }}
        startDate={null}
      ></ReactDatePicker>
      <ReactDatePicker
        selected={datePicked2}
        utcOffset={0}
        onChange={(date) => {
          console.log(date.toISOString(), "ISO");
          console.log(date);
          console.log("WITH DATE SELECTED");
          setDatePicked2(date);
        }}
        startDate={null}
      ></ReactDatePicker>
    </>
  );
};

export default DatePickerPage;
