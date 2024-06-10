import{FaChalkboardTeacher, FaUserGraduate, FaLayerGroup, FaChartBar, FaCog, FaColumns ,FaCalendarAlt} from 'react-icons/fa'
export const menuItem = [
    {
      path: ".",
      name: "Dashboard",
      icon: <FaColumns />,
    },
    {
      path: "teacher",
      name: "Teachers",
      icon: <FaChalkboardTeacher />, 
    },
    {
      path: "students",
      name: "Students",
      icon: <FaUserGraduate />,
    },
    {
      path: "Subjects",
      name: "Subjects",
      icon: <FaCalendarAlt />,
    },
    {
      path: "test",
      name: "Test",
      icon: <FaCalendarAlt />,
      
    },
    {
      path: "Result",
      name: "Result",
      icon: <FaCalendarAlt />,
      
    },
    {
      path: "settings",
      name: "Settings",
      icon: <FaCog />,
    },
    {
      path: "report",
      name: "Report",
      icon: <FaChartBar />,
    },
    {
      path: "features",
      name: "Features",
      icon: <FaLayerGroup />,
    },
  ];
