<template>
    <div class="signup-container">
      <h2>Log In</h2>
      <form @submit.prevent="logIn">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Log in</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Signup',
    setup() {
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const role = ref('user');
  
      const signUp = () => {
        alert(`User signed up with email: ${email.value}, username: ${username.value}`);
      };
  
      return { username, email, password, role, signUp };
    },
  };
  </script>
  
  <style scoped>
  .signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #000000; /* Black */
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 50px auto;
  }
  
  .signup-container h2 {
    color: #735DEF;
    margin-bottom: 30px;
    font-weight: 700;
    font-size: 2rem;
  }
  
  .signup-container form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .signup-container input {
    margin-bottom: 15px;
    padding: 12px;
    border: 1px solid #8259ec; /* Violet */
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .signup-container input:focus {
    border-color: #517af7; /* Blue */
  }
  
  .signup-container button {
    background-color: #517af7;
    color: #ffffff;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }
  .signup-container button:hover {
    background-color: #735DEF;
  }
  
  .signup-container button:active {
    background-color: #8259ec;
  }
  
  .signup-container input::placeholder {
    color: #999999;
  }
  
  .signup-container button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(81, 122, 247, 0.5); /* Blue */
  }
  </style>
  