<template>
    <div class="profile-container container mt-5 p-4 rounded shadow bg-light">
        <router-link :to="`/editprofile/${userid}`" class="btn btn-primary mb-4">Edit Profile</router-link>
        <h2 class="profile-title text-center">Your Profile</h2>
        <div class="profile-line row bg-primary text-white p-3 rounded mb-4">
            <div class="profile-info col-md-8">
                <img :src="photoURL" alt="Profile Picture" class="rounded-circle" width="100" height="100" />
                <p class="username">{{ username }}</p>
                <p class="description">{{ description }}</p>
                <div class="categories">
                    <div class="badge badge-pill badge-info category" v-for="category in categories" :key="category">
                        {{ category }}
                    </div>
                </div>
            </div>
            <div class="best-standing col-md-4 text-center">
                <p>Best Standing: <span class="standing">{{ standing }}</span></p>
                <p>in {{ quiz_title }}</p>
            </div>
        </div>
        <div class="quizzes-taken">
            <p class="profile-title">Participated in {{ quizzes_taken.length }} Quizzes</p>
            <div class="row">
                <div v-for="(quiz, index) in quizzes_taken" :key="index" class="quiz-card col-md-4 mb-4">
                    <div class="card">
                        <img :src="quiz.url" class="card-img-top quiz-image" alt="Quiz image" />
                        <div class="card-body">
                            <h5 class="card-title quiz-title">{{ quiz.title }}</h5>
                            <p class="card-text quiz-score">Score: {{ quiz.score }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { app, auth } from "@/firebase/config";
import { waitForAuthInit } from "@/composables/getUser";
import { storage } from '@/firebase/config';

export default {
    name: 'Profile',
    data() {
        return {
            username: '',
            description: '',
            quizzes_taken: [
                { title: '', link: '', score: 0 },
            ],
            standings: [],
            categories: [''],
            userid: '',
            photoURL: ''
        };
    },
    computed: {
        standing() {
            return Math.min(...this.standings);
        },
    },
    methods: {
    async fetchData() {
      const user = auth.currentUser;
      const ref = await app.collection('users').doc(user.uid).get();
      const quizlist = ref.data().quizzes_taken;
      for (const quizID of quizlist) {
        try{
          const res = await app.collection('quizzes').doc(quizID).get()
          const quiz = res.data();
          this.quizzes.push(quiz);
        }
        catch (err){
          console.log(err);
        }
      }
      if (user) {
        const actual_user = ref.data();
        this.username = actual_user.username;
        this.standings = actual_user.standings;
        this.categories = actual_user.categories;
        this.quizzes_taken = actual_user.quizzes_taken;
        this.description = actual_user.description;
        this.userJoinedDate = new Date(user.metadata.creationTime).toLocaleDateString();
        this.userid = user.uid;
        this.userEmail = user.email;
        this.photoURL = await storage.ref(`images/${user.uid}/jester.png`).getDownloadURL();
      }
    }
  },
  mounted() {
    waitForAuthInit().then(() => {
      this.fetchData();
    })
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

:root {
    --primary-color: #007bff;
    --secondary-color: #28a745;
    --background-color: #f8f9fa;
    --text-color: #343a40;
    --border-color: #dee2e6;
    --hover-color: #f5f5f5;
    --transition-duration: 0.3s;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-color);
}

.profile-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.profile-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.profile-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--primary-color);
    padding: 20px;
    border-radius: 8px;
    color: white;
}

.profile-info {
    flex: 1;
    margin-right: 20px;
}

.username {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.description {
    font-size: 14px;
    margin-bottom: 10px;
}

.categories {
    display: flex;
    gap: 10px;
}

.category {
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    background-color: var(--secondary-color);
}

.best-standing {
    background-color: #ffb74d;
    padding: 20px;
    border-radius: 8px;
    color: black;
    text-align: center;
}

.best-standing .standing {
    font-size: 36px;
    font-weight: bold;
}

.quizzes-taken {
    margin-top: 40px;
}

.quiz-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    margin-bottom: 20px;
}

.quiz-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.quiz-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
}

.quiz-score {
    font-size: 14px;
    font-weight: bold;
}
</style>
