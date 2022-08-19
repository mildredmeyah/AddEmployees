import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const employeeCollectionRef = collection(db, "employee");
class EmployeeDataService {
  addEmployees = (newEmployee) => {
    return addDoc(employeeCollectionRef, newEmployee);
  };

  updateEmployee = (id, updatedEmployee) => {
    const employeeDoc = doc(db, "employee", id);
    return updateDoc(employeeDoc, updatedEmployee);
  };

  deleteEmployee = (id) => {
    const employeeDoc = doc(db, "employee", id);
    return deleteDoc(employeeDoc);
  };

  getAllEmployees = () => {
    return getDocs(employeeCollectionRef);
  };

  getEmployee = (id) => {
    const employeeDoc = doc(db, "employee", id);
    return getDoc(employeeDoc);
  };
}

export default new EmployeeDataService();
