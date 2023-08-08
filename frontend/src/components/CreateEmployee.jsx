import React, {useState} from "react";
import RadioButton from "./RadioButton";
import CivilStatusComboBox from "./CivilStatusComboBox";

const CreateEmployee = React.memo(({setAddEmployeeOpen}) => {
  const [fullname, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [civilstatus, setCivilStatus] = useState("");
  const [salary, setSalary] = useState("");
  const [isActive, setIsActive] = useState("");
  const [isNumberValid, setNumberValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");
  };

  const handleOnChange = (value, id) => {
    switch (id) {
      case "fullname":
        setFullName(value);
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

        console.log(isConctactValid);
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
      <div className="add-employee crud">
        <header>
          <h3>Add Employee</h3>
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
            {!isNumberValid && <p className="error-message">Invalid Number</p>}
          </div>

          <div className="input-contain">
            <input
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
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
          </div>

          <button type="submit">Add Employee</button>
        </form>
        <button onClick={() => setAddEmployeeOpen(false)}>Cancel</button>
      </div>
    </>
  );
});

export default CreateEmployee;
