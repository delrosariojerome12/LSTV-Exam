import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editEmployee, handleEditModal} from "../features/employees/employees";
import RadioButton from "./RadioButton";
import CivilStatusComboBox from "./CivilStatusComboBox";

const EditModal = React.memo(() => {
  const {selectedEmployee} = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const [fullname, setFullName] = useState(selectedEmployee.fullname);
  const [gender, setGender] = useState(selectedEmployee.gender);
  const [age, setAge] = useState(selectedEmployee.age);
  const [birthdate, setBirthDate] = useState(selectedEmployee.birthdate);
  const [address, setAddress] = useState(selectedEmployee.address);
  const [contactnumber, setContactNumber] = useState(
    selectedEmployee.contactnum
  );
  const [civilstatus, setCivilStatus] = useState(selectedEmployee.civilstat);
  const [salary, setSalary] = useState(selectedEmployee.salary);
  const [isactive, setIsActive] = useState(selectedEmployee.isactive);
  const [isNumberValid, setNumberValid] = useState(false);
  const [isFullNameValid, setFullNameValid] = useState(false);
  const [isSubmitFine, setIsSubmitFine] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (value, id) => {
    switch (id) {
      case "fullname":
        setFullName(value);
        const fullNameRegex = /^[A-Za-z\s]+$/;
        const isFullNameValid = fullNameRegex.test(value);
        isFullNameValid ? setFullNameValid(true) : setFullNameValid(false);
        console.log(isFullNameValid);
        return;
      case "age":
        setAge(value);
        return;
      case "birthdate":
        setBirthDate(value);
        return;
      case "contactnum":
        setContactNumber(value);
        const passwordRegex = /^(09|\+639)\d{9}$/;
        let isConctactValid = passwordRegex.test(value);
        isConctactValid ? setNumberValid(true) : setNumberValid(false);
        return;
      case "salary":
        setSalary(value);
        return;
      case "address":
        setAddress(value);
        return;

      default:
        return;
    }
  };

  const getEighteenYearsAgo = () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today);
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    return eighteenYearsAgo.toISOString().split("T")[0];
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="edit-modal crud">
        <header>
          <h3>Edit Employee</h3>
          {isSubmitFine === false && (
            <h4 style={{color: "red"}}>Fill the fields with proper inputs!</h4>
          )}
        </header>
        <form onSubmit={handleSubmit}>
          <div className="input-contain">
            <input
              id="fullname"
              type="text"
              value={fullname}
              required
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={
                  fullname ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>FullName</div>
              </label>
            </div>
            {!isFullNameValid && fullname.length > 0 && (
              <p className="error-message">Invalid Input</p>
            )}
          </div>
          <div className="input-contain">
            <input
              id="address"
              type="text"
              value={address}
              required
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={
                  address ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>Address</div>
              </label>
            </div>
          </div>

          <div className="input-contain">
            <input
              id="birthdate"
              type="date"
              value={birthdate}
              required
              max={getEighteenYearsAgo()} // Set max to 18 years ago
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={
                  birthdate ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>Birth Date</div>
              </label>
            </div>
          </div>

          <div className="input-contain">
            <input
              id="age"
              type="number"
              value={age}
              required
              min={18}
              max={60}
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={age ? "placeholder-text active" : "placeholder-text"}
              >
                <div className={"text"}>Age</div>
              </label>
            </div>
          </div>

          <div className="input-contain">
            <input
              id="contactnum"
              type="text"
              value={contactnumber}
              required
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />

            <div className="placeholder-container">
              <label
                className={
                  contactnumber ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>Contact Number</div>
              </label>
            </div>
            {!isNumberValid && contactnumber.length > 0 && (
              <p className="error-message">Invalid Number</p>
            )}
          </div>

          <div className="input-contain">
            <input
              min={10000}
              id="salary"
              type="number"
              value={salary}
              required
              onChange={(e) => {
                handleOnChange(e.target.value, e.target.id);
              }}
            />
            <div className="placeholder-container">
              <label
                className={
                  salary ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>Salary</div>
              </label>
            </div>
          </div>

          <RadioButton gender={gender} setGender={setGender} />
          <CivilStatusComboBox
            civilstatus={civilstatus}
            setCivilStatus={setCivilStatus}
          />

          <div className="isactive-container">
            <label>Is Active:</label>
            <input
              type="checkbox"
              name="isactive"
              checked={isactive}
              onChange={() => setIsActive(!isactive)}
            />
          </div>
          <div className="btn-container">
            <button
              onClick={() => dispatch(handleEditModal({employee: null}))}
              type="button"
            >
              Cancel
            </button>
            <button type="submit">Edit</button>
          </div>
        </form>
      </div>
    </>
  );
});

export default EditModal;
