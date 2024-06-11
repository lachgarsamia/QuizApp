<template>
  <NavbarSignedin />
  <form @submit.prevent="editProfile" class="profile-container">
    <h2 class="profile-title">Customize your Profile</h2>
    <div class="profile-header">
      <input type="submit" value="Confirm Changes" class="edit-profile-btn" />
      <div class="profile-info">
        <div class="profile-pic">
          <img :src="photoURL" alt="Profile Picture" class="profile-picture" />
          <input type="file" class="upload-image" @change="uploadImage" />
        </div>
        <div class="profile-details">
          <div class="flex">
            <input type="text" v-model="username" class="username" placeholder="Username" />
            <font-awesome-icon class="verified" v-if="isAdmin" :icon="['fas', 'certificate']" />
          </div>
          <p class="user-email">{{ userEmail }}</p>
          <p class="joined-date">Joined on {{ userJoinedDate }}</p>
          <div class="other-info">
            <textarea maxlength="200" cols="200" class="description" v-model="description"
              placeholder="Tell us about yourself"></textarea>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import NavbarSignedin from '@/components/NavbarSignedin.vue';
import { waitForAuthInit } from "@/composables/getUser";
import { app, auth } from '@/firebase/config';
import { storage } from '@/firebase/config';
import { isLogged, getUser } from '@/composables/getUser';

export default {
  components: { NavbarSignedin },
  data() {
    return {
      categories: [''],
      photoURL: null,
      description: '',
      standings: [],
      username: '',
      userEmail: '',
      userJoinedDate: '',
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
          this.photoURL = await snapshot.ref.getDownloadURL();
          console.log('File uploaded:', this.imageURL);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    },
    editProfile() {
      const user = getUser();
      app.collection('users').doc(user.uid).update({
        username: this.username,
        description: this.description,
      });
      this.$router.push(`/profile/${user.uid}`);
    },
    async fetchData() {
      const user = auth.currentUser;
      const ref = await app.collection('users').doc(user.uid).get();
      if (user) {
        const actual_user = ref.data();
        this.username = actual_user.username;
        this.standings = actual_user.standings;
        this.categories = actual_user.categories;
        this.description = actual_user.description;
        this.userJoinedDate = new Date(user.metadata.creationTime).toLocaleDateString();
        this.userid = user.uid;
        this.userEmail = user.email;
        this.photoURL = await storage.ref(`images/${user.uid}/profile.jpg`).getDownloadURL();
      }
    },
  },
  mounted() {
    waitForAuthInit().then(() => {
      this.fetchData();
    })
  }
};
</script>

<style scoped>
.profile-container {
  width: 100%;
  margin: 100px auto;
  padding: 30px;
}

.edit-profile-btn {
  display: inline-block;
  margin-bottom: 20px;
  padding: 12px 25px;
  background-color: #F59931;
  border: none;
  color: #FEFEFE;
  text-decoration: none;
  border-radius: 25px;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.3s;
  position: absolute;
  top: -20px;
  right: -20px;
}

.edit-profile-btn:hover {
  background-color: #EF42BA;
  transform: translateY(-2px);
}

.profile-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #343a40;
}

.flex {
  display: flex;
  align-items: center;
  gap: 5px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 10px solid #674BF5;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 20px;
  width: 50%;
  position: relative;
}

.verified {
  color: #429AF8;
}

.profile-info {
  display: flex;
  align-items: flex-start;
  flex: 1;
  width: fit-content;
}

.profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.profile-picture {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.profile-pic{
  position: relative;
}

.upload-image{
  cursor: pointer;
  position: absolute;
  top: 40px;
  left:10px;
  background-color: transparent;
}

.username {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
}

.user-email {
  font-size: 0.8em;
  color: grey;
  margin-bottom: 5px;
}

.joined-date {
  font-size: 0.8em;
  color: grey;
  margin-bottom: 5px;
}

.other-info {
  flex: 2;
  margin-left: 20px;
  position: relative;
}

.description {
  outline: none;
  border: 1px solid #343a40;
  font-size: 1em;
  margin-top: 20px;
  margin-left: 10px;
  width: 100%;
  word-wrap: break-word;
}

.quizzes-taken {
  margin-top: 40px;
}

.quizzes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.quiz-card {
  background: linear-gradient(135deg, #EF42BA, #F59931);
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 220px;
  height: 220px;
  color: #fff;
  cursor: pointer;
}

.quiz-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.quiz-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #343a40;
}

.quiz-score {
  font-size: 16px;
  font-weight: bold;
  color: #343a40;
}

@media (max-width: 800px) {
  .profile-header {
    flex-direction: column;
    width: 100%;
    /* Stack vertically on smaller screens */
  }

  .quizzes-taken {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .quizzes-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }

  .best-standing {
    position: static;
    margin-top: 20px;
    max-width: 100%;
    width: 100%;
  }

  .other-info {
    margin-left: 0;
  }
}
</style>