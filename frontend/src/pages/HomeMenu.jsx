import React, {useEffect, useState, useMemo} from "react";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {getAllEmployees} from "../features/employees/employees";
import Navbar from "../components/Navbar";
import Employee from "../components/Employee";
import {useTable} from "react-table";

const HomeMenu = React.memo(() => {
  const [isTile, setTile] = useState(false);
  const {employees, isFetchAllLoading, isFetchAllError} = useSelector(
    (state) => state.employees
  );
  const dispatch = useDispatch();

  const renderEmployees = () => {
    return employees.map((item, index) => {
      return <Employee key={index} employeeDetails={item} />;
    });
  };

  // const data = useMemo(() => employees, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "recid",
      },
      {
        Header: "Full Name",
        accessor: "fullname",
      },
      {
        Header: "gender",
        accessor: "gender",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Birth Date",
        accessor: "birthdate",
      },
      {
        Header: "Civil Status",
        accessor: "civilstat",
      },
      {
        Header: "Contact",
        accessor: "contactnum",
      },
      {
        Header: "Salary",
        accessor: "salary",
      },
      {
        Header: "isActive",
        accessor: "isactive",
      },
    ],
    []
  );
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({
      columns,
      data: employees,
    });

  useEffect(() => {
    dispatch(getAllEmployees({x: "test"}));
  }, []);

  // if (isFetchAllLoading) {
  //   return (
  //     <section className="home-menu">
  //       <Navbar />
  //       <h1>Loading...</h1>
  //     </section>
  //   );
  // }

  // if (employees.length === 0) {
  //   return (
  //     <section className="home-menu">
  //       <Navbar />
  //       <h1>No employees</h1>
  //     </section>
  //   );
  // }

  console.log(employees);

  return (
    <section className="home-menu">
      <Navbar />
      {isFetchAllLoading ? (
        <h1>Loading...</h1>
      ) : employees.length === 0 ? (
        <h1>No employees</h1>
      ) : (
        <div className="employees-container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row); // Call prepareRow before mapping over cells
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
});

export default HomeMenu;
