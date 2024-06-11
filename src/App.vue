<template>
  <router-view/>
</template>

<script>
import {getUser, waitForAuthInit} from '@/composables/getUser';

export default {
  name: 'App',
 
}
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
