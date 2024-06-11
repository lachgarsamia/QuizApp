<template>
    <NavbarSignedin />
    <div class="profile-container">
        <div class="profile-header">
            <router-link :to="`/editprofile/${userid}`" class="edit-profile-btn">Edit Profile</router-link>
            <button @click="logout" class="logout-btn">Logout</button>
            <div class="profile-info">
                <img :src="photoURL" alt="Profile Picture" class="profile-picture" />
                <div class="profile-details">
                    <div class="flex">
                        <p class="username">{{ username }}</p>
                        <font-awesome-icon class="verified" v-if="isAdmin" :icon="['fas', 'certificate']" />
                    </div>

                    <p class="user-email">{{ userEmail }}</p>
                    <p class="joined-date">Joined on {{ userJoinedDate }}</p>
                </div>
            </div>
            <div class="other-info">
                <p class="description">{{ description }}</p>
            </div>
        </div>

        <div class="quiz-flex">
            <div class="quizzes-taken">
                <div class="quizzes-grid">
                    <h2 class="bold">Taken Quizzes</h2>
                    <div v-if="quizzes_taken.length !== 0" v-for="(quiz, index) in quizzes_taken" :key="index"
                        class="quiz-card">
                        <div class="card-body">
                            <router-link :to="`/quiz/${quiz.id}`">
                                <h5 class="quiz-title"> {{ quiz.data.title }}</h5>
                            </router-link>
                            <p class="quiz-score">Score: {{ quiz.data.players.find((player) => player.id === userid).score }}</p>
                        </div>
                    </div>
                    <div v-else>
                        No quizzes taken yet.
                    </div>
                </div>
            </div>
            <div class="quizzes-taken">
                <div class="quizzes-grid">
                    <div v-if="isAdmin">
                        <h2 class="bold">Your Created Quizzes</h2>
                        <div v-for="(quiz, index) in created_quizzes" :key="index" class="quiz-card">
                            <router-link :to="`/quiz/${quiz.id}`">
                                <h5 class="quiz-title"> {{ quiz.data.title }}</h5>
                            </router-link>
                            <router-link :to="`/edit-quiz/${quiz.id}`">Edit Quiz</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser } from "@/composables/getUser";
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
            description: '',
            quizzes_taken: [],
            created_quizzes: [],
            standings: [],
            categories: [''],
            userid: '',
            photoURL: '',
            userJoinedDate: '',
            isAdmin: false,
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

                const quizzes_taken = actual_user.quizzes_taken;
                for (const quizID of quizzes_taken) {
                    const quiz = (await app.collection("quizzes").doc(quizID).get()).data();
                    this.quizzes_taken.push({ id: quizID, data: quiz });
                }

                if (actual_user.role === "admin") {
                    const quizzes_created = actual_user.created_quizzes;
                    for (const quizID of quizzes_created) {
                        const quiz = (await app.collection("quizzes").doc(quizID).get()).data();
                        this.created_quizzes.push({ id: quizID, data: quiz });
                    }
                }
            }
        },
        logout() {
            auth.signOut().then(() => {
                console.log('User signed out');
            }).catch(error => {
                console.error('Error signing out:', error);
            });
            this.$router.push('/welcome');
        },
        async userChanged(user) {
            this.user = user;
        }
    },
    async mounted() {
        waitForAuthInit().then(() => {
            this.fetchData();
        })
        const user = getUser();
        const userRole = (await app.collection("users").doc(user.uid).get()).data().role;
        this.isAdmin = userRole === "admin";
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
    padding: 12px 20px;
    background-color: #F59931;
    color: #FEFEFE;
    text-decoration: none;
    border-radius: 25px;
    text-align: center;
    font-weight: 500;
    transition: background-color 0.3s, transform 0.3s;
    position: absolute;
    top: -20px;
    right: 120px;
    width: 120px;
}

.edit-profile-btn:hover {
    background-color: #EF42BA;
    transform: translateY(-2px);
}

.logout-btn{
    display: inline-block;
    margin-bottom: 20px;
    padding: 12px 25px;
    background-color: #343a40;
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
    width: 120px;
}

.bold {
    font-weight: 600;
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

.quiz-flex {
    display: flex;
    gap: 20px;
    align-items: start;
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
    font-size: 1em;
    margin-top: 20px;
    margin-left: 10px;
    width: 75%;
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