// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Login/LoginForm';
import AdminHome from './Admin/AdminHome.jsx';
import UserHome from './Annotateur/UserHome.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin-dashboard" element={<AdminHome />} />
        <Route path="/user-dashboard" element={<UserHome />} />
      </Routes>
    </Router>
  );
}

export default App;
