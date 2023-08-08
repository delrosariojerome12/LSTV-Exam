import React from "react";

const RadioButton = React.memo(({setGender, gender}) => {
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <div className="radio-button-container">
      <p>Gender:</p>
      <label className="radio-button-label">
        <input
          type="radio"
          value="Male"
          checked={gender === "Male"}
          onChange={handleGenderChange}
        />
        Male
      </label>
      <label className="radio-button-label">
        <input
          type="radio"
          value="Female"
          checked={gender === "Female"}
          onChange={handleGenderChange}
        />
        Female
      </label>
      <label className="radio-button-label">
        <input
          type="radio"
          value="Other"
          checked={gender === "Other"}
          onChange={handleGenderChange}
        />
        Other
      </label>
    </div>
  );
});

export default RadioButton;
