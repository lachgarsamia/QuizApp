<template>
  <NavbarSignedin />
      <form @submit.prevent="editProfile">
        <multiselect
          id="categories"
          :multiple="true"
          :clear-on-select="false"
          :close-on-select="false"
          v-model="categories"
          :options="options"
        ></multiselect>
        <textarea
          id="description"
          v-model="description"
          placeholder="Tell us about yourself"
        ></textarea>
        <input type="file" id="profile-image" @change="uploadImage" />
        <input type="submit" value="Confirm Changes" class="submit-button" />
      </form>
  </template>
  
  <script>
  import NavbarSignedin from '@/components/NavbarSignedin.vue';
  import { app } from '@/firebase/config';
  import { storage } from '@/firebase/config';
  import Multiselect from 'vue-multiselect';
  import { isLogged, getUser } from '@/composables/getUser';
  
  export default {
    components: { Multiselect, NavbarSignedin },
    data() {
      return {
        categories: null,
        options: [
          'General Knowledge',
          'Science & Nature',
          'History & Geography',
          'Entertainment & Pop Culture',
          'Sports & Recreation',
          'Literature & Arts',
        ],
        imageURL: null,
        description: '',
      };
    },
    methods: {
      async uploadImage(event) {
        const file = event.target.files[0];
        if (isLogged()) {
          const user = getUser();
          const storageRef = storage.ref(`images/${user.uid}/profile.jpg`);
          try {
            const snapshot = await storageRef.put(file);
            this.imageURL = await snapshot.ref.getDownloadURL();
            console.log('File uploaded:', this.imageURL);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }
      },
      editProfile() {
        const user = getUser();
        app.collection('users').doc(user.uid).update({
          description: this.description,
          categories: this.categories,
        });
        this.$router.push(`/profile/${user.uid}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .body{
    background: white;
  }
  .signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 50px auto;
    background: linear-gradient(90deg, #ef42ba, #735def);
    color: #fff; /* Ensure text is readable against the gradient background */
  }
  
  .title-signup {
    color: #ffffff;
    margin-bottom: 30px;
    font-weight: 700;
    font-size: 2rem;
    text-align: center;
  }
  
  .signup-container form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .signup-container label {
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  .signup-container input,
  .signup-container textarea,
  .signup-container .multiselect {
    margin-bottom: 15px;
    padding: 12px;
    border: 1px solid #fff;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
    background-color: rgba(255, 255, 255, 0.2); /* Slightly transparent background */
    color: #fff; /* Ensure text is readable */
  }
  
  .signup-container input:focus,
  .signup-container textarea:focus,
  .signup-container .multiselect:focus {
    border-color: #ffffff;
  }
  
  .signup-container textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  .submit-button {
    background-color: #ffffff;
    color: #735def;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #cb42d4;
    color: #fff;
  }
  
  .submit-button:active {
    background-color: #8259ec;
    color: #fff;
  }
  
  .signup-container input::placeholder,
  .signup-container textarea::placeholder {
    color: #ddd;
  }
  
  .submit-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
  }
  </style>
  