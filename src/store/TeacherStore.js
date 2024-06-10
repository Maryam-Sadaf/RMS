import { makeObservable, observable, action } from 'mobx';

class TeacherStore{
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
  teacher = [];

  constructor() {
    makeObservable(this, {
      formFields: observable,
      showTable: observable,
      teacher: observable,
      showForm: observable,
      showupload: observable,
      addTeacher:action,
      setshowTable: action,
      setshowForm: action,
      setshowupload: action,
      setFormField: action,
      
      clearFormFields:action,
      setteacher: action, // Mark setteacher as an action
    });
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

  setteacher(teacher) {
    this.teacher = teacher;
  }
  addTeacher(student) {
    this.teacher.push(student);
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
const store = new TeacherStore();
export default store;