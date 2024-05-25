<template>
  <div>
    <router-link to="/welcome">Welcome</router-link>
    <router-link to="/home">Home</router-link>
    <router-link to="/signup">Signup</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/profile">Profile</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
div {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
