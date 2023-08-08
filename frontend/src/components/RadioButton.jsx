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
          value="male"
          checked={gender === "male"}
          onChange={handleGenderChange}
        />
        Male
      </label>
      <label className="radio-button-label">
        <input
          type="radio"
          value="female"
          checked={gender === "female"}
          onChange={handleGenderChange}
        />
        Female
      </label>
      <label className="radio-button-label">
        <input
          type="radio"
          value="other"
          checked={gender === "other"}
          onChange={handleGenderChange}
        />
        Other
      </label>
    </div>
  );
});

export default RadioButton;
