<template>
    <NavbarSignedin />
    <div class="profile-container">
        <router-link :to="`/editprofile/${userid}`" class="edit-profile-btn">Edit Profile</router-link>
        <div class="profile-header">
            <div class="profile-info">
                <img :src="photoURL" alt="Profile Picture" class="profile-picture" />
                <div class="profile-details">
                    <p class="username">{{ username }}</p>
                    <p class="description">{{ description }}</p>
                    <div class="categories-container">
                        <div class="category" v-for="category in categories" :key="category">
                            {{ category }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="best-standing">
                <p>Best Standing <span class="standing">#{{ standing }}</span></p>
                <p>in {{ quiz_title }}</p>
            </div>
        </div>

        <div class="quizzes-taken">
            <p class="profile-title">Participated in {{ quizzes_taken.length }} Quizzes</p>
            <div class="quizzes-grid">
                <div v-for="(quiz, index) in quizzes_taken" :key="index" class="quiz-card">
                    <div class="card-body">
                        <h5 class="quiz-title">{{ quiz.title }}</h5>
                        <p class="quiz-score">Score: {{ quiz.score }}</p>
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
import NavbarSignedin from "@/components/NavbarSignedin.vue";
export default {
    name: 'Profile',
    components: { NavbarSignedin },
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
                try {
                    const res = await app.collection('quizzes').doc(quizID).get();
                    const quiz = res.data();
                    this.quizzes.push(quiz);
                }
                catch (err) {
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

.profile-container {
    width: 100%;
    margin: 40px auto;
    padding: 30px;
}

.edit-profile-btn {
    display: inline-block;
    margin-bottom: 20px;
    padding: 12px 25px;
    background-color: #F59931;
    color: #FEFEFE;
    text-decoration: none;
    border-radius: 5px;
    text-align: center;
    font-weight: 500;
    transition: background-color 0.3s, transform 0.3s;
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

.profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 10px solid #674BF5;
    background-color: #fff; 
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 20px;
    max-width: 700px;
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
    transition: transform 0.3s;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.profile-picture:hover {
    transform: scale(1.1);
}

.username {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 5px;
}

.description {
    font-size: 18px;
}

.categories-container {
    text-align: center;
    margin-top: 10px;
    display: flex;
    gap: 10px;
}

.category {
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    background-color: #F59931;
    color: #FEFEFE;
    transition: background-color 0.3s, transform 0.3s;
}

.category:hover {
    background-color: #EF42BA;
    transform: translateY(-2px);
}

.best-standing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F59931;
    padding: 20px;
    border-radius: 12px;
    color: #343a40;
    text-align: center;
    max-width: 300px;
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
    background: linear-gradient(135deg, #EF42BA, #190976);
    border: 1px solid #dee2e6;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
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
</style>