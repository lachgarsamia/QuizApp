<template>
    <div class="profile-container">
        <router-link :to="`/editprofile/${userid}`" class="edit-profile-btn">Edit Profile</router-link>
        <h2 class="profile-title">Your Profile</h2>
        <div class="profile-line">
            <div class="profile-info">
                <img :src="photoURL" alt="Profile Picture" class="profile-picture" />
                <p class="username">{{ username }}</p>
                <p class="description">{{ description }}</p>
                <div class="categories">
                    <div class="category" v-for="category in categories" :key="category">
                        {{ category }}
                    </div>
                </div>
            </div>
            <div class="best-standing">
                <p>Best Standing: <span class="standing">{{ standing }}</span></p>
                <p>in {{ quiz_title }}</p>
            </div>
        </div>
        <div class="quizzes-taken">
            <p class="profile-title">Participated in {{ quizzes_taken.length }} Quizzes</p>
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
            description: '',
            quizzes_taken: [],
            standings: [],
            categories: [],
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
            if (user && ref.exists) {
                const userData = ref.data();
                this.username = userData.username;
                this.description = userData.description;
                this.standings = userData.standings;
                this.categories = userData.categories;
                this.userid = user.uid;
                this.photoURL = await storage.ref(`images/${user.uid}/jester.png`).getDownloadURL();

                const quizList = userData.quizzes_taken || [];
                this.quizzes_taken = await Promise.all(quizList.map(async (quizID) => {
                    const quizRef = await app.collection('quizzes').doc(quizID).get();
                    return quizRef.exists ? quizRef.data() : null;
                })).then(quizzes => quizzes.filter(quiz => quiz !== null));
            }
        }
    },
    mounted() {
        waitForAuthInit().then(() => {
            this.fetchData();
        });
    }
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

:root {
    --primary-color: #F59931;
    --secondary-color: #EF42BA;
    --background-color: #FEFEFE;
    --text-color: #343a40;
    --border-color: #dee2e6;
    --hover-color: #F5F5F5;
    --gradient-start: #EF42BA;
    --gradient-end: #735DEF;
    --transition-speed: 0.3s;
}

body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    color: var(--text-color);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.profile-container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background-color: var(--background-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.edit-profile-btn {
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: var(--background-color);
    text-decoration: none;
    border-radius: 5px;
    text-align: center;
    transition: background-color var(--transition-speed);
}

.edit-profile-btn:hover {
    background-color: var(--secondary-color);
}

.profile-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
    color: var(--secondary-color);
    text-align: center;
}

.profile-line {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    padding: 20px;
    border-radius: 8px;
    color: var(--background-color);
    margin-bottom: 20px;
}

.profile-info {
    text-align: center;
    padding: 20px;
    background: var(--background-color);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-picture {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
    transition: transform var(--transition-speed);
}

.profile-picture:hover {
    transform: scale(1.1);
}

.username {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: var(--text-color);
}

.description {
    font-size: 16px;
    margin-bottom: 10px;
    color: var(--text-color);
}

.categories {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
    flex-wrap: wrap;
}

.category {
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    background-color: var(--primary-color);
    color: var(--background-color);
    transition: background-color var(--transition-speed);
}

.category:hover {
    background-color: var(--secondary-color);
}

.best-standing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    padding: 20px;
    border-radius: 8px;
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.quiz-card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: transform var(--transition-speed);
}

.quiz-card:hover {
    transform: translateY(-10px);
}

.quiz-title {
    font-size: 18px;
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
    font-size: 14px;
    font-weight: bold;
    color: var(--text-color);
}

</style>
