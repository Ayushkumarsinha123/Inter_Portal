import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css'; 

function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2>Intern Login</h2>
        <input className={styles.inputField} type="email" placeholder="Email" />
        <input className={styles.inputField} type="password" placeholder="Password" />
        <Link to="/dashboard">
          <button className={styles.loginButton}>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;