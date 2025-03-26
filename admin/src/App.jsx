import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterStudent from "./pages/Students/RegisterStudent";
import AllStudents from "./pages/Students/AllStudents";
import RegisterTeacher from "./pages/Teachers/RegisterTeacher";
import AllTeachers from "./pages/Teachers/AllTeachers";
import RegisterAdmin from "./pages/Admins/RegisterAdmin";
import AllAdmins from "./pages/Admins/AllAdmins";
import StudentDetails from "./pages/Students/StudentDetails";
import EditStudent from "./pages/Students/EditStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/> } />
        <Route path="/students" element={<RegisterStudent />} />
        <Route path="/teachers" element={<RegisterTeacher />} />
        <Route path="/admins" element={<RegisterAdmin />} />
        <Route path="/allstudents" element={<AllStudents />} />
        <Route path="/allTeachers" element={<AllTeachers />} />
        <Route path="/alladmins" element={<AllAdmins />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/students/:id/edit" element={<EditStudent />} />

      </Routes>
    </Router>
  );
}

export default App;
