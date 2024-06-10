import Header from './screen/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashbord/Dashboard';
import Students from './components/students/Students';
import Sidebar from './components/sidebar/Sidebar';
import Teachers from './components/teacher/Teachers';
import Subjects from './components/subjects/Subjects';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Header/>}/>
        <Route path='sidebar' element={<Sidebar />}>

          <Route index element={<Dashboard />} />
          <Route path='teacher' element={<Teachers />} />
          <Route path='students' element={<Students />} />
          <Route path='subject' element={<Subjects />} />
          {/* <Route path='test' element={<Test />} />
          <Route path='Result' element={<Result />} />
          <Route path='settings' element={<settings />} />
          <Route path='report' element={<Report />} />
          <Route path='features' element={<Features />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
