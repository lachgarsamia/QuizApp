<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
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
  background-color: #f5f5f5; /* Light Gray */
  color: #000000; /* Black */
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
}

.signup-container h2 {
  color: #cb42d4; /* Purple */
  margin-bottom: 30px;
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
  background-color: #517af7; /* Blue */
  color: #ffffff;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.signup-container button:hover {
  background-color: #cb42d4; /* Purple */
}

.signup-container button:active {
  background-color: #8259ec; /* Violet */
}

.signup-container input::placeholder {
  color: #999999;
}

.signup-container button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(81, 122, 247, 0.5); /* Blue */
}
</style>
