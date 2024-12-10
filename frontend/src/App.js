import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Navigate,
} from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Profile from './components/pages/User/Profile';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container'
import Message from './components/layout/Message';

/*context*/ 
import { UserProvider } from './context/UserContext';
import MyPets from './components/pages/Pet/MyPets';
import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';



function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <Message/>
      <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/pet/mypets" element={<MyPets />} />
        <Route path="/pet/add" element={<AddPet />} />
        <Route path="/pet/edit/:id" element={<EditPet />}/>
      </Routes>
      </Container>
      <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
