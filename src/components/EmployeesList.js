import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import EmployeeDataService from "../services/employee.services";

const EmployeesList = ({ getEmployeeId }) => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const data = await EmployeeDataService.getAllEmployees();
    console.log(data.docs);
    setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await EmployeeDataService.deleteEmployee(id);
    getEmployees();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getEmployees}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(employees, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.surname}</td>
                <td>{doc.email}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getEmployeeId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                    
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default EmployeesList;
