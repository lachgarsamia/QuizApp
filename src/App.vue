<template>
  <div class="links">
    <router-link to="/welcome">Welcome</router-link>
    <router-link to="/home">Home</router-link>
    <router-link to="/signup">Signup</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/leaderboard">Leaderboard</router-link>
    <router-link to="/createquiz">Create Quiz</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.links {
  display: flex;
  justify-content: space-around;
  font-family: 'Helvetica';
  margin: 0;
  padding: 0;
  align-items: center;
}
  body {
    font-family: 'Helvetica';
    margin: 0;
    padding: 0;
  }
</style>
