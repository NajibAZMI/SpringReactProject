// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Login/LoginForm';
import AddUserForm from './Admin/AddUserForm.jsx';
import AddDatasetForm from './Admin/AddDatasetForm.jsx';
import DataSetList from './Admin/DataSetList.jsx';
import DatasetDetail from './Admin/DataSetDetail.jsx';
import AffecterAnnotateurs from './Admin/AffecterAnnotateurs.jsx';
import TachesList from './Annotateur/TachesList.jsx';
import TravaillerTache from './Annotateur/TravaillerTache.jsx';
import GestionAnntateurs from './Admin/GestionAnnotateurs.jsx';
import Dashboard from './Admin/Dashboard.jsx';
import UserDashboard from './Annotateur/UserDashboard.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Admin/admin-dashboard" element={<Dashboard />} />
        <Route path="/User/user-dashboard" element={<UserDashboard />} />
        <Route path="/Admin/ajouter-utilisateur/:id?" element={<AddUserForm />} /> 
        <Route path="/Admin/GestionAnntateurs" element={<GestionAnntateurs />} /> 
        <Route path="/Admin/AddDataset" element={<AddDatasetForm />} /> 
        <Route path="/Admin/DashBoard" element={<Dashboard />} /> 
        <Route path="/Admin/DataSetList" element={<DataSetList />} /> 
        <Route path="/Admin/datasets/:id" element={<DatasetDetail />} />
        <Route path="/Admin/datasets/AddAnnotateurs/:datasetId" element={<AffecterAnnotateurs />} />
        <Route path="/User/TachesList/:id" element={<TachesList />} />
        <Route path="/User/TravaillerTache/:idTache" element={<TravaillerTache />} />
      </Routes>
    </Router>
  );
}

export default App;
