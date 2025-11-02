import "./App.css";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <AppRoutes isAuth={isAuth} setIsAuth={setIsAuth} />
    </BrowserRouter>
  );
}

export default App;
