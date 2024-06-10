import { makeObservable, observable, action } from 'mobx';

class StudentStore {
  showTable = true;
  showForm = false;
  showupload = false;
  formFields = {
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    status: '',
  };
  students = [];
  selectedStudent = null;

  constructor() {
    makeObservable(this, {
      formFields: observable,
      showTable: observable,
      students: observable,
      showForm: observable,
      showupload: observable,
      selectedStudent: observable,
      addStudent:action,
      setshowTable: action,
      setshowForm: action,
      setshowupload: action,
      setFormField: action,
      deleteStudent:action,
      clearFormFields:action,
      editStudent:action,
      setStudents: action,
      editStudent:action,
      
      // selectedstudent:null, 
      // Mark setStudents as an action
    });
  }
  deleteStudent(studentId) {
    // Find the index of the student with the given ID
    const index = this.students.findIndex((student) => student.id === studentId);
    // If the student is found, remove it from the students array
    if (index !== -1) {
      this.students.splice(index, 1);
    }
  }
  editStudent(studentData) {
  
    this.selectedStudent = studentData;
    this.setFormField('id', studentData.id);
    this.setFormField('firstName', studentData.firstName);
    this.setFormField('lastName', studentData.lastName);
    this.setFormField('gender', studentData.gender);
    this.setFormField('status', studentData.status); 
  }

  setFormField(field, value) {
    this.formFields[field] = value;
  }

  setshowTable() {
    this.showTable = true;
    this.showForm = false;
  }

  setshowForm() {
    this.showForm = true;
    this.showTable = false;
    this.showupload = false;
  }

  setshowupload() {
    this.showTable = false;
    this.showForm = false;
    this.showupload = true;
  }

  setStudents(students) {
    this.students = students;
  }
  addStudent(student) {
    this.students.push(student);
  }
  clearFormFields() {
    this.formFields = {
      id: '',
      firstName: '',
      lastName: '',
      gender: '',
      status: '',
    };
  }
}

const store = new StudentStore();

export default store;
