<template>
    <div class="profile-container">
        <router-link :to="`/editprofile/${userid}`" class="edit-profile-btn">Edit Profile</router-link>
        <h2 class="profile-title">Welcome {{ username }}</h2>
        <div class="profile-header">
            <div class="profile-info">
                <img :src="photoURL" alt="Profile Picture" class="profile-picture" />
                <div class="profile-details">
                    <p class="username">{{ username }}</p>
                    <p class="description">{{ description }}</p>
                </div>
            </div>
            <div class="best-standing">
                <p>Best Standing: <span class="standing">{{ standing }}</span></p>
                <p>in {{ quiz_title }}</p>
            </div>
        </div>
        <div class="categories-container">
            <h3 class="categories-title">Categories</h3>
            <div class="categories">
                <div class="category" v-for="category in categories" :key="category">
                    {{ category }}
                </div>
            </div>
        </div>
        <div class="quizzes-taken">
            <h3 class="profile-title">Participated in {{ quizzes_taken.length }} Quizzes</h3>
            <div class="quizzes-grid">
                <div v-for="(quiz, index) in quizzes_taken" :key="index" class="quiz-card">
                    <div class="card">
                        <img :src="quiz.url" class="quiz-image" alt="Quiz image" />
                        <div class="card-body">
                            <h5 class="quiz-title">{{ quiz.title }}</h5>
                            <p class="quiz-score">Score: {{ quiz.score }}</p>
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
            username: '',
            description: '',
            quizzes_taken: [],
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
          const res = await app.collection('quizzes').doc(quizID).get();
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
    --primary-color: #F59931;
    --secondary-color: #EF42BA;
    --background-color: #FEFEFE;
    --text-color: #343a40;
    --border-color: #dee2e6;
    --hover-color: #F5F5F5;
    --gradient-start: #EF42BA;
    --gradient-end: #190976;
    --transition-speed: 0.3s;
}

body {
    font-family: 'Roboto', sans-serif;
    color: var(--text-color);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background:linear-gradient(135deg, var(--gradient-start), var(--gradient-end));;
}

.profile-container {
    max-width: 1000px;
    margin: 40px auto;
    padding: 30px;
    background-color: var(--background-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}

.edit-profile-btn {
    display: inline-block;
    margin-bottom: 20px;
    padding: 12px 25px;
    background-color: var(--primary-color);
    color: var(--background-color);
    text-decoration: none;
    border-radius: 5px;
    text-align: center;
    font-weight: 500;
    transition: background-color var(--transition-speed), transform var(--transition-speed);
}

.edit-profile-btn:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
}

.profile-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--text-color);
    text-align: center;
}

.profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:linear-gradient(135deg, var(--gradient-start), var(--gradient-end));;
    padding: 30px;
    border-radius: 12px;
    color: black;
    margin-bottom: 20px;

}

.profile-info {
    display: flex;
    align-items: center;
}

.profile-details {
    margin-left: 20px;
}

.profile-picture {
    border-radius: 50%;
    width: 180px;
    height: 180px;
    object-fit: cover;
    transition: transform var(--transition-speed);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.profile-picture:hover {
    transform: scale(1.1);
}

.username {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--background-color);
}

.description {
    font-size: 18px;
    color: var(--background-color);
}

.categories-container {
    text-align: center;
    margin-bottom: 20px;
    padding: 20px; /* Added padding for better spacing */
    background: rgb(232, 231, 231);
    border: 5px solid transparent; /* Ensure the border has some space */
    border-image: linear-gradient(135deg, var(--gradient-start), var(--gradient-end)) 1; /* Gradient border */
    border-radius: 60x; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added shadow for better separation */
}


.categories-title {
    font-size: 24px;
    font-weight: 600;
    margin: 20px;
    color: black; 
    text-align: center; 
    height: 100px;
    width: 100px;
    border-radius: 5%;
    display: flex; 
    align-items: center; 
    justify-content: center; 
}


.categories {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}

.category {
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    background-color: var(--primary-color);
    color: var(--background-color);
    transition: background-color var(--transition-speed), transform var(--transition-speed);
}

.category:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
}

.best-standing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    padding: 20px;
    border-radius: 12px;
    color: var(--background-color);
    text-align: center;
}

.best-standing .standing {
    font-size: 36px;
    font-weight: bold;
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
    background:  linear-gradient(135deg, var(--gradient-start), var(--gradient-end)) ;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
}

.quiz-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.quiz-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: var(--text-color);
}

.quiz-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
}

.quiz-score {
    font-size: 16px;
    font-weight: bold;
    color: var(--text-color);
}
</style>
