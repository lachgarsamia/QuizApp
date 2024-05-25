<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <input type="text" v-model="username" placeholder="Username"/>
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

</style>
