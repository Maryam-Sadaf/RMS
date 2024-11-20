import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashbord/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Todos from "./components/todos/Todos";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="todos" element={<Todos />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
