import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Employeelist from './components/EmployeeList';
import EmployeePerformance from './components/EmployeePerformance';
import AdminRegisterForm from './components/AdminRegistration';
import AddEmployeeForm from './components/addEmployeeForm';
import EvaluateEmployee from './components/EvaluateEmployee';
import ResetPassword from './components/ResetPassword';
import HrEvaluate from './components/HrEvaluate';
import ManagerEvaluate from './components/ManagerEvaluate';
import EditTlEvaluation from './components/EditTlEvaluation';
import EditHrEvaluation from './components/EditHrEvaluation';
import EditEmployee from './components/EditEmployee';

import Header from './components/Header';




function App() {
  return (
    <>
   
    <Router>
    <Header/>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* <Route path="/" element={<Admin />} /> */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/employees" element={<Employeelist />} />
      <Route path="/employeeRegistration" element={<AdminRegisterForm/>}/>
      <Route path="/employee/add" element={<AddEmployeeForm />} />
      <Route path="/employee/edit/:id" element={<EditEmployee />} />
      <Route path="/employee/performance/:employeeID" element={<EmployeePerformance />} />
      <Route path="/evaluate-employee/:employeeID" element={<EvaluateEmployee />} />
      <Route path="/hr-evaluate-employee/:employeeID" element={<HrEvaluate />} />
      <Route path="/manager-evaluate-employee/:employeeID" element={<ManagerEvaluate />} />
      <Route path="/edit-tl-evaluation/:id" element={<EditTlEvaluation />} />
      <Route path="/edit-hr-evaluation/:id" element={<EditHrEvaluation />} />
      </Routes>
    </Router>
    </>
  );

}

export default App;
