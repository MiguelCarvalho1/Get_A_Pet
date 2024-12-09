import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Navigate,
} from 'react-router-dom';

import Home from './components/pages/Auth/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container'
import Message from './components/layout/Message';

/*context*/ 
import { UserProvider } from './context/UserContext';



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
      </Routes>
      </Container>
      <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
