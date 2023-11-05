export const validateData = (name, email, password, signUp) =>{
    if(name === '' && signUp) return "Name is required!";
    if(email === '') return "Email is required!";
    if(password === '') return "Password is required!";
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(password);
    // if(!isValidPassword) return "Password requires Min 8 & max 10 char, at least one uppercase letter, one lowercase letter, one number and one special character."
    return null;
}