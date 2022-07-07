import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPages from "./pages/Login";
import RegisterPages from "./pages/Register";
import CalculatorPages from "./pages/Calculator";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import ProtectAfterLogin from "./pages/ProtecAfterLogin";
function App(props) {
  return (
    <Router>
      <div>
        <Routes>
          <Route element={<ProtectAfterLogin />}>
            <Route
              exact
              path="/"
              element={<Navigate to="/login" replace />}
            ></Route>
            <Route exact path="/login" element={<LoginPages />}></Route>
          </Route>
          <Route exact path="/register" element={<RegisterPages />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route
              exact
              path="/calculator"
              element={<CalculatorPages />}
            ></Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
