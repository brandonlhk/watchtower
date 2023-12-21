import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Landing from "./pages/landingPage";
import Signup from "./pages/Signup"

export default function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </Router>
  )
}


