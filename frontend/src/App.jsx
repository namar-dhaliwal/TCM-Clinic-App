import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import About from './pages/AboutUs'
import Contact from './pages/Contact'
import Treatments from './pages/Treatments'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />
            <Route
              path="/treatments"
              element={<Treatments />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;