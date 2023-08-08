import React, {useState} from "react";
import Select from "react-select";

const CivilStatusComboBox = React.memo(({civilstatus, setCivilStatus}) => {
  const civilStatusOptions = [
    {value: "Single", label: "Single"},
    {value: "Married", label: "Married"},
    {value: "Divorced", label: "Divorced"},
    {value: "Widowed", label: "Widowed"},
    {value: "Other", label: "Other"},
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
