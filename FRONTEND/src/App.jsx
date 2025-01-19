import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Response from "./pages/Response";
function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/response" element={<Response />} />
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
