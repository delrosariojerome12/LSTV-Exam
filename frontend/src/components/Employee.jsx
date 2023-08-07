import React from "react";

const Employee = React.memo(({employeeDetails}) => {
  console.log(employeeDetails);
  const {
    address,
    age,
    birthdate,
    civilstat,
    contactnum,
    fullname,
    gender,
    isactive,
    recid,
    salary,
  } = employeeDetails;
  return <div className="employee"></div>;
});

export default Employee;
