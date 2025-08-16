import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from './components/products/index.jsx'
import Home from './components/home/index.jsx'
import './App.css'

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
      </Routes>
     </Router>
  )
}

export default App
