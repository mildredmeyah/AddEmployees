import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddEmployee from "./components/AddEmployee";
import EmployeesList from "./components/EmployeesList";
import "./App.css";

function App() {
  const [employeeId, setEmployeeId] = useState("");

  const getEmployeeIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setEmployeeId(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home" className="logo">Emp-APP</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddEmployee id={employeeId} setEmployeeId={setEmployeeId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <EmployeesList getemployeeId={getEmployeeIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

