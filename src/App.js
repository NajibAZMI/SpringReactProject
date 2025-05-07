// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Login/LoginForm';
import AdminHome from './Admin/AdminHome.jsx';
import UserHome from './Annotateur/UserHome.jsx';
import AddUserForm from './Admin/AddUserForm.jsx';
import UserList from './Admin/UserList.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Admin/admin-dashboard" element={<AdminHome />} />
        <Route path="/User/user-dashboard" element={<UserHome />} />
        <Route path="/Admin/ajouter-utilisateur" element={<AddUserForm />} /> 
        <Route path="/Admin/UserList" element={<UserList />} /> 
      </Routes>
    </Router>
  );
}

export default App;
