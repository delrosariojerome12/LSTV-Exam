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
    setCivilStatus(selectedOption.value);
  };

  return (
    <div>
      <Select
        value={civilStatusOptions.find(
          (option) => option.value === civilstatus
        )}
        onChange={handleCivilStatusChange}
        options={civilStatusOptions}
        placeholder="Civil Status"
      />
    </div>
  );
});

export default CivilStatusComboBox;
