import React, {useEffect, useState, useMemo} from "react";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {getAllEmployees} from "../features/employees/employees";
import Navbar from "../components/Navbar";
import Employee from "../components/Employee";
import {useTable} from "react-table";
import {FaTrash, FaEdit} from "react-icons/fa";
import CreateEmployee from "../components/CreateEmployee";

const HomeMenu = React.memo(() => {
  const [isAddEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const {employees, isFetchAllLoading, isFetchAllError} = useSelector(
    (state) => state.employees
  );
  const dispatch = useDispatch();

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
        Header: "Gender",
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

  return (
    <section className="home-menu">
      <Navbar />
      <div className="middle-bar">
        <button
          onClick={() => {
            setAddEmployeeOpen(true);
          }}
        >
          Add Employee
        </button>
      </div>

      {isFetchAllLoading ? (
        <h1>Loading...</h1>
      ) : isFetchAllError ? (
        <h1>Error fetching data from the server.</h1>
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
                  <th>Actions</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                    <td>
                      <button onClick={() => handleEdit(row.original)}>
                        <FaEdit />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(row.original)}>
                        <FaTrash />
                        <p>Delete</p>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {isAddEmployeeOpen && (
        <CreateEmployee setAddEmployeeOpen={setAddEmployeeOpen} />
      )}
    </section>
  );
});

export default HomeMenu;
