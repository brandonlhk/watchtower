import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Landing from "./pages/landingPage";
import Signup from "./pages/signupPage"
import Tracking from "./pages/trackingPage"

export default function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/tracking" element={<Tracking />} />
        </Routes>
    </Router>
  )
}


