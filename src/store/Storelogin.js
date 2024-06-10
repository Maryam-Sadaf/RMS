import { makeObservable, observable, action } from 'mobx';

class StoreLogin {
  isPopupOpen = false;
  isLoggedIn = false;
  formFields = {
    username: '',
    password: '',
    rememberMe:false,
  };
  errors = '';

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      formFields: observable,
      setIsPopupOpen: action,
      setFormField: action,
      clearFormFields: action,
      validateForm: action,
    });
  }
  setFormField(field, value) {
    this.formFields[field] = value;
  }

  clearFormFields() {
    this.formFields = {
      username: '',
      password: '',
    };
  }

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }
  setIsPopupOpen(value) {
    this.isPopupOpen = value;
  }
  setError(error) {
    this.errors = error;
  }


  logout() {
    // Perform logout logic here
    this.isLoggedIn = false;
    this.clearFormFields();
  }
  validateForm(){
    if (!this.formFields.username || !this.formFields.password) {
      this.setError ('Please fill in all fields');
      return false;
    }
    if (!this.formFields.username) {
      this.setError ('Please enter a valid username');
      return false;
    }
    if (this.formFields.password.length < 6) {
      this.setError ('Password should be at least 6 characters');
      return false;
    }
    this.setError ('');
    return true;
  };

  login() {
    // Perform login logic here
    this.isLoggedIn = true;
  }

    // if (!this.errors) {
      // Simulate authentication (replace this with backend authentication)
      // if (
      //   this.formFields.username === this.validUsername &&
      //   this.formFields.password === this.validPassword
      // ) {
        // Perform login actions here (if needed)
        // For example, you can store the authentication token in localStorage
        // and use it for subsequent API requests to the server

        // Clear form fields and close the popup
        // this.clearFormFields();
        // this.togglePopup();

        // Set isLoggedIn flag to true to indicate the user is logged in
       
        // Navigate to the navbar (replace this with your actual navigation logic)
        // Here, we are updating the isLoggedIn flag to true to indicate the user is logged in
        // this.isLoggedIn = true;
        // You can also redirect to the navbar route using react-router or any other navigation library
        // For example, if you're using react-router, you can do:
        // history.push('/navbar');
      // } else {
        // If authentication fails, display an error message
        //this.errors = 'Invalid username or password.';
      //}
   // }
     //else {
      // If the form is not valid, display an alert
     // alert('Please fill in all the required fields.');
    //}
  
}





const storelogin = new StoreLogin();
export default storelogin;