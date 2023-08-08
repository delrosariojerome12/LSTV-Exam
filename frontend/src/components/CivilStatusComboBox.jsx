import React, {useState} from "react";
import Select from "react-select";

const CivilStatusComboBox = React.memo(({civilstatus, setCivilStatus}) => {
  const civilStatusOptions = [
    {value: "single", label: "Single"},
    {value: "married", label: "Married"},
    {value: "divorced", label: "Divorced"},
    {value: "widowed", label: "Widowed"},
    {value: "other", label: "Other"},
  ];

  const handleCivilStatusChange = (selectedOption) => {
    setCivilStatus(selectedOption);
  };

  return (
    <div>
      <Select
        value={civilstatus}
        onChange={handleCivilStatusChange}
        options={civilStatusOptions}
        placeholder="Civil Status"
      />

      {/* {civilstatus && <p>Selected Civil Status: {civilstatus.label}</p>} */}
    </div>
  );
});

export default CivilStatusComboBox;
