// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Login/LoginForm';
import AdminHome from './Admin/AdminHome.jsx';
import UserHome from './Annotateur/UserHome.jsx';
import AddUserForm from './Admin/AddUserForm.jsx';
import UserList from './Admin/UserList.jsx';
import AddDatasetForm from './Admin/AddDatasetForm.jsx';
import DataSetList from './Admin/DataSetList.jsx';
import DatasetDetail from './Admin/DataSetDetail.jsx';
import AffecterAnnotateurs from './Admin/AffecterAnnotateurs.jsx';
import TachesList from './Annotateur/TachesList.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Admin/admin-dashboard" element={<AdminHome />} />
        <Route path="/User/user-dashboard" element={<UserHome />} />
        <Route path="/Admin/ajouter-utilisateur" element={<AddUserForm />} /> 
        <Route path="/Admin/UserList" element={<UserList />} /> 
        <Route path="/Admin/AddDataset" element={<AddDatasetForm />} /> 
        <Route path="/Admin/DataSetList" element={<DataSetList />} /> 
        <Route path="/Admin/datasets/:id" element={<DatasetDetail />} />
        <Route path="/Admin/datasets/AddAnnotateurs/:datasetId" element={<AffecterAnnotateurs />} />
        <Route path="/User/TachesList/:id" element={<TachesList />} />
      
      </Routes>
    </Router>
  );
}

export default App;
