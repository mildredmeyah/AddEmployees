import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import EmployeeDataService from "../services/employee.services";
import "../components/employee.css"

const AddEmployee = ({ id, setEmployeeId }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("permenant");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || email === "") {
      setMessage({ error: true, msg: "All fields are empty!" });
      return;
    }
    const newEmployee = {
      name,
      surname,
      status,
      email,
    };
    console.log(newEmployee);

    try {
      if (id !== undefined && id !== "") {
        await EmployeeDataService.updateEmployee(id, newEmployee);
        setEmployeeId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await EmployeeDataService.addEmployees(newEmployee);
        setMessage({ error: false, msg: "New employee added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setEmail("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await EmployeeDataService.getEmployee(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setSurname(docSnap.data().surname);
      setStatus(docSnap.data().status);
      setEmail(docSnap.data().email);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
          className="msg"
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="Form">
          <h1>EMPLOYEE APP </h1>
          <Form.Group className="mb-3" controlId="formemployee">
            <InputGroup>
              <InputGroup.Text id="form" className="txt">name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={name}
                className="txt"
onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="surname">
            <InputGroup>
              <InputGroup.Text id="surname" className="txt">surname</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="enter surname"
                value={surname}
                className="txt"
                onChange={(e) => setSurname(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="surname">
            <InputGroup>
              <InputGroup.Text id="email"className="txt">email</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="enter email"
                value={email}
                className="txt"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <br></br>
          <br></br>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              className="btn"
              onClick={(e) => {
                setStatus("permenant");
                setFlag(true);
                
              }}
            >
              permenant
            </Button>
           
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("temporary");
                setFlag(false);
                
              }}
            >
              temporary
            </Button>
            <br></br>
          <br></br>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddEmployee;
