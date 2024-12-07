import { useState } from "react";
import Input from "../../form/Input";
import styles from "../../form/Form.module.css";
import { Link } from "react-router-dom";


function Register() {

   const [user, setUser] = useState({})

function handleChange(e) {
    setUser({...user, [e.target.name] : e.target.value});

}

function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
}


  return (
    <section className={styles.form_container}>
      <h>Register</h>
      <form onSubmit={handleSubmit}>
        <Input
          text="Name"
          type="text"
          name="name"
          placeholder="Type your name"
          handleOnChange={handleChange}
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          placeholder="Type your phone"
          handleOnChange={handleChange}
        />
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Type your email"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Type your password"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirm Password"
          type="password"
          name="confirmpassword"
          placeholder="Confirm password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Register" />
      </form>
      <p>
        Already have an account? <Link to="/login"> Click here</Link>
      </p>
    </section>
  );
}
export default Register;
