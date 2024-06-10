import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import store from '../../store/TeacherStore';
import '../teacher/Teacher.css';

const Teachers= observer(() => {
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
      store.setteacher(data); // Set the fetched data directly into the store's students array
      store.setshowTable(true); // Show the table after fetching data
    
      // console.log(store.setteacher)
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
  
  const toggleForm=()=>{
    store.setshowForm(false)
  }
  const toggleUpdate=()=>{ 
    store.setshowupload(false)
  }
  const handleAddStudent = async (e) => {
    e.preventDefault();
    const Teachers = {
      id: store.formFields.id,
      firstName: store.formFields.firstName,
      lastName: store.formFields.lastName,
      gender: store.formFields.gender,
      status: store.formFields.status,
    };
    try {
      const response = await axios.post(
        'https://dummy.restapiexample.com/api/v1/create'
        , Teachers);
      console.log('Teacher added:', response.data);
      store.addTeacher(Teachers);

      //Clear the form fields after successful submission
      store.setFormField('id', '');
      store.setFormField('firstName', '');
      store.setFormField('lastName', '');
      store.setFormField('gender', '');
      store.setFormField('status', '');
      alert('You have successfully added a Teacher!');
      store.setshowForm(true);
    } catch (error) {
      console.error('Error adding Teacher:', error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    store.setFormField(name, value);
  };

  return (
    <div className="Teacher-component">
      <div className="button-row">
        <button className="BUTTON" onClick={toggleTable}>
          <i className="fa fa-users" /> All Teachers
        </button>

        <button className="BUTTON" onClick={toggleForm}>
          <i className="fa fa-plus" /> Add Teacher
        </button>

        <button className="BUTTON" onClick={toggleUpdate}>
          <i className="fa fa-upload" /> Upload Teachers
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
            </tr>
          </thead>
          <tbody>
            {store.teacher.map((student) => (
              <tr key={student}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.gender}</td>
                <td>{student.status}</td>
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

export default Teachers;
