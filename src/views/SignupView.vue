<template>
  <div class="signup-container">
    <h3 class="title-signup">Sign Up</h3>
    <form v-show="signUp" @submit.prevent="signUp">
      <input type="text" v-model="username" placeholder="Username" required/>
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import registerUser from '@/composables/addUser';
import {getUser} from '@/composables/getUser';

export default {
  data()  {
    return {
      username: '',
      email: '',
      password: ''
    }
  },

  methods: {
    async signUp() {
      const { error, signup } = registerUser();

      await signup(this.email, this.password, this.username);

      if (!error.value) {
        const user = getUser();
        this.$router.push(`/editprofile/${user.uid}`);
      }
    }
  },
};


</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000000;
  /* Black */
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;
}

.title-signup {
  color: #cb42d4;
  /* Purple */
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
  border: 1px solid #8259ec;
  /* Violet */
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.signup-container input:focus {
  border-color: #517af7;
  /* Blue */
}

.signup-container button {
  background-color: #735DEF;
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
  background-color: #cb42d4;
  /* Purple */
}

.signup-container button:active {
  background-color: #8259ec;
  /* Violet */
}

.signup-container input::placeholder {
  color: #999999;
}

.signup-container button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(81, 122, 247, 0.5);
  /* Blue */
}
</style>
