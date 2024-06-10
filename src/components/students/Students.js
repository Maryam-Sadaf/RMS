import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import store from '../../store/StudentStore';
import { FaEdit, FaTrash } from 'react-icons/fa';
// Import the required icons from react-icons
import '../students/Student.css';
const Students = observer(() => {
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        'https://dummyjson.com/users'
      );
      const data = response.data.users;
      console.log('API Response:', data);
      store.setStudents(data); // Set the fetched data directly into the store's students array
      store.setshowTable(true); // Show the table after fetching data

      // console.log(store.setStudents)
    } catch (error) {
      console.error('Error fetching students:', error);
      // Add more detailed logging for debugging purposes
      console.log('Error response:', error.response);
      console.log('Error message:', error.message);
      console.log('Error config:', error.config);
    }
  };
  const toggleTable = () => {
    store.setshowTable(true); // Set showTable to true when the "All Students" button is clicked
  };

  const toggleForm = () => {
    store.setshowForm(false)
  }
  const toggleUpdate = () => {
    store.setshowupload(false)
  }
  const handleAddStudent = async (e) => {
    e.preventDefault();
    const student = {
      id: store.formFields.id,
      firstName: store.formFields.firstName,
      lastName: store.formFields.lastName,
      gender: store.formFields.gender,
      status: store.formFields.status,
    };

    const existingStudent = store.students.find((s) => s.id === student.id);
    if (existingStudent) {
      // Update the existing student data at the same location in the array
      Object.assign(existingStudent, student);
    } else {
      // Add the new student to the array
      store.addStudent(student);
    }

    try {
      // Your API call code here
      // ...
      const response = await axios.post(
        'https://dummy.restapiexample.com/api/v1/create'
        , student);
      console.log('Student added:', response.data);
      store.addStudent(student);

      // Clear the form fields after successful submission
      store.clearFormFields();
      alert('You have successfully added or updated a student!');
      store.setshowForm(false);
      store.setshowTable(true);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // const handleAddStudent = async (e,) => {
  //   e.preventDefault();
  //   const student = {
  //     id: store.formFields.id,
  //     firstName: store.formFields.firstName,
  //     lastName: store.formFields.lastName,
  //     gender: store.formFields.gender,
  //     status: store.formFields.status,
  //   };


  //   try {
  //     const response = await axios.post(
  //       'https://dummy.restapiexample.com/api/v1/create'
  //       , student);
  //     console.log('Student added:', response.data);
  //     store.addStudent(student);

  //     //Clear the form fields after successful submission
  //     store.setFormField('id', '');
  //     store.setFormField('firstName', '');
  //     store.setFormField('lastName', '');
  //     store.setFormField('gender', '');
  //     store.setFormField('status', '');
  //     alert('You have successfully added a student!');
  //     store.setshowForm(true);
  //   } catch (error) {
  //     console.error('Error adding student:', error);
  //   }
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    store.setFormField(name, value);
  };
  const handleDeleteStudent = (studentId) => {
    console.log('Deleting student with id ${studentId}')
    store.deleteStudent(studentId)
  }
  const handleEditStudent = (studentData) => {
    store.editStudent(studentData);
    store.setshowForm(true);
    // studentData=(store.selectedStudent)


  };

  return (
    <div className="student-component">
      <div className="button-row">
        <button className="BUTTON" onClick={toggleTable}>
          <i className="fa fa-users" /> All Students
        </button>
        <button className="BUTTON" onClick={toggleForm}>
          <i className="fa fa-plus" /> Add Student
        </button>
        <button className="BUTTON" onClick={toggleUpdate}>
          <i className="fa fa-upload" /> Upload Students
        </button>
      </div>
      {store.showTable && (
        <table id="student-table" className="student-table">
          <thead>
            <tr>
              <th>id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Class</th>
              <th>Gender</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {store.students.map((student) => (
              <tr key={student}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.gender}</td>
                <td>{student.status}</td>
                <td>
                  <FaEdit onClick={() => handleEditStudent(student)} style={{ margin: 8 }} />
                  <FaTrash onClick={() => handleDeleteStudent(student.id)} style={{ color: "red", fontSize: "16px", margin: "8px" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}



      {store.showForm && (
        <form id="add-student-form" onSubmit={handleAddStudent}>
          {/* Form fields */}
          <div id="form-row">
            {/* Admission No field */}
            <div id="form-field">
              <label htmlFor="admissionNo">Id</label>
              <input
                type="text"
                id="id"
                name="id"
                value={store.formFields.id}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Name field */}
            <div id="form-field">
              <label htmlFor="name">FirstName</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={store.formFields.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div id="form-row">
            {/* Class field */}
            <div id="form-field">
              <label htmlFor="classValue">LastName</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={store.formFields.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Gender field */}
            <div id="form-field">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={store.formFields.gender}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div id="form-row">
            {/* Status field */}
            <div id="form-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                name="status"
                value={store.formFields.status}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button type="submit" className='submitbtn'>Add Student</button>
        </form>
      )}

    </div>
  );
});

export default Students;
