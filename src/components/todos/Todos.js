import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { SC } from "../../../src/services/serverCall"; // Assuming SC is your service for making API calls
import "./todos.css";
import Popup from "./TodosPopup";
import Pagination from "./Pagination";

const Todos = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const [todosPerPage] = useState(10);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const fetchTodos = async () => {
    try {
      const response = await SC.getCall("/todos");
      console.log("response", response);
      if (response.status === 200) {
        setTodos(response.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (todoId) => {
    try {
      await SC.deleteCall(`/todos/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [isPopupOpen]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleEdit = (todo) => {
    setSelectedTodo(todo); // Selected todo ko state mein set karo
    handleOpenPopup(); // Popup ko open karo
  };

  return (
    <div className="todosContainer">
      <div className="topBar">
        <div className="searchContainer">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Search todos..."
            className="searchInput"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button className="createButton" onClick={handleOpenPopup}>
          Create Todos
        </button>
      </div>

      <div className="todosHeading">Todos</div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className="todosTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Icon</th>
                <th>Slag</th>
                <th>APK Link</th>
                <th>IOS Link</th>
                <th>Background Color</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTodos.length === 0 ? (
                <tr>
                  <td colSpan="8">No todos available</td>
                </tr>
              ) : (
                currentTodos.map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.name}</td>
                    <td>{todo.icon}</td>
                    <td>{todo.slag}</td>
                    <td>{todo.apkLink}</td>
                    <td>{todo.iosLink}</td>
                    <td>{todo.bgColor}</td>
                    <td>{todo.description}</td>
                    <td>
                      {/* <FaEdit className="editIcon" onClick={handleEdit(todo)} /> */}
                      <FaEdit
                        className="editIcon"
                        onClick={() => handleEdit(todo)}
                      />
                      <FaTrash
                        className="deleteIcon"
                        onClick={() => handleDelete(todo.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalItems={filteredTodos.length}
            itemsPerPage={todosPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {isPopupOpen && <Popup onClose={handleClosePopup} todo={selectedTodo} />}
    </div>
  );
};

export default Todos;
