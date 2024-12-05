export const validateForm = (data) => {
    const { fname, email, password, cpassword } = data;
  
    if (!fname) {
      return 'Please enter your fullname';
    }
  
    if (!email) {
      return 'Please enter your email';
    }
  
    if (!email.includes('@')) {
      return 'Please enter a valid email';
    }
  
    if (!password) {
      return 'Password field cannot be empty';
    }
  
    if (password.length < 6) {
      return 'Password length is too small, at least 6 characters required';
    }
  
    if (!cpassword) {
      return 'Please confirm your password';
    }
  
    if (password !== cpassword) {
      return 'Passwords do not match';
    }
  
    return null;
  };
  