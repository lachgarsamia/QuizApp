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

    <div class="quiz-sections">
      <div class="quizzes-taken">
        <h2 class="section-title">Taken Quizzes</h2>
        <div class="quizzes-grid">
          <div v-if="quizzes_taken.length !== 0" v-for="(quiz, index) in quizzes_taken" :key="index" class="quiz-card">
            <router-link :to="`/quiz/${quiz.id}`" class="card-link">
              <div class="card-body">
                <h5 class="quiz-title">{{ quiz.data.title }}</h5>
                <p class="quiz-score">
                  Score: {{ quiz.data.players.find((player) => player.id === userid).score }}
                </p>
              </div>
            </router-link>
          </div>
          <div v-else>
            No quizzes taken yet.
          </div>
        </div>
      </div>

      <div class="created-quizzes" v-if="isAdmin">
        <h2 class="section-title">Your Created Quizzes</h2>
        <div class="quizzes-grid">
          <div v-for="(quiz, index) in created_quizzes" :key="index" class="quiz-card">
            <router-link :to="`/quiz/${quiz.id}`" class="card-link">
              <div class="card-body">
                <h5 class="quiz-title">{{ quiz.data.title }}</h5>
              </div>
            </router-link>
            <button class="delete-button" @click="deleteQuiz(index)">×</button>
            <router-link :to="`/edit-quiz/${quiz.id}`" class="edit-link">Edit Quiz</router-link>
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
    methods: {
        async fetchData() {
            await waitForAuthInit();
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
                try {
                    const profilePhotoRef = storage.ref(`images/${user.uid}/profile.jpg`);
                    const profilePhotoSnapshot = await profilePhotoRef.getMetadata();
                    this.photoURL = await profilePhotoRef.getDownloadURL();
                } catch (error) {
                    console.log(error);
                }
                const quizzes_taken = actual_user.quizzes_taken;
                console.log(quizzes_taken);
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
        async deleteQuiz(idx) {
            const deletedQuiz = this.created_quizzes[idx];
            await app.collection('quizzes').doc(deletedQuiz.id).delete();

            // delete quiz from author
            const author =  app.collection('users').doc(deletedQuiz.data.author);
            const authorCreatedQuizzes = (await author.get()).data().created_quizzes;
            const deletedIdx = authorCreatedQuizzes.find((quiz, index) => quiz === deletedQuiz.id);
            if (deletedIdx !== -1) {
                authorCreatedQuizzes.splice(deletedIdx, 1);
                await author.update({ created_quizzes: authorCreatedQuizzes });
            }

            // delete quiz from users
            for (const user of deletedQuiz.data.players) {
                let userRef = app.collection('users').doc(user.id);
                let userQuizzesTaken = (await userRef.get()).data().quizzes_taken;
                let deletedIdx = userQuizzesTaken.find((quiz, index) => quiz === deletedQuiz.id);
                if (deletedIdx !== -1) {
                    userQuizzesTaken.splice(deletedIdx, 1);
                    await userRef.update({ quizzes_taken: userQuizzesTaken });
                }
            }
            location.replace(location.href);
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
    max-width: 1200px;
    margin: 100px auto;
    padding: 30px;
}

.edit-profile-btn,
.logout-btn {
    display: inline-block;
    margin-bottom: 20px;
    padding: 12px 20px;
    text-decoration: none;
    border-radius: 25px;
    text-align: center;
    font-weight: 500;
    transition: background-color 0.3s, transform 0.3s;
    position: absolute;
    top: -20px;
    width: 120px;
}

.edit-profile-btn {
    right: 150px;
    background-color: #F59931;
    color: #FEFEFE;
}

.edit-profile-btn:hover {
    background-color: #EF42BA;
    transform: translateY(-2px);
}

.logout-btn {
    right: 20px;
    background-color: #343a40;
    color: #FEFEFE;
}

.logout-btn:hover {
    background-color: #EF42BA;
    transform: translateY(-2px);
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

.profile-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border: 2px solid #674BF5;
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 40px;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.verified {
    color: #429AF8;
}

.profile-info {
    display: flex;
    align-items: center;
    flex: 1;
}

.profile-details {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
}

.profile-picture {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.username {
    font-size: 1.4em;
    font-weight: bold;
    margin-bottom: 5px;
}

.user-email,
.joined-date {
    font-size: 0.9em;
    color: grey;
    margin-bottom: 5px;
}

.other-info {
    flex: 2;
    margin-left: 20px;
}

.description {
    font-size: 1em;
    margin-top: 20px;
    width: 75%;
    word-wrap: break-word;
}

.quiz-sections {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.section-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #343a40;
}

.quizzes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
}

.delete-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ef9342;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 16px;
    color: #343a40;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.quiz-card {
    background: #fff;
    border: 1px solid #dee2e6;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    overflow: hidden;
}

.quiz-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card-link {
    text-decoration: none;
    color: inherit;
}

.card-body {
    padding: 20px;
    text-align: center;
}

.quiz-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: rgb(138, 5, 138);
}

.quiz-score {
    font-size: 16px;
    font-weight: bold;
    color: dodgerblue;
}

.edit-link {
    display: block;
    margin: 10px 20px;
    padding: 10px;
    background-color: #f8f9fa;
    text-align: center;
    text-decoration: none;
    color: #343a40;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
}

.edit-link:hover {
    background-color: pink;
    color: #fff;
}

@media (max-width: 800px) {
    .profile-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .quiz-sections {
        align-items: center;
    }

    .profile-details {
        margin-left: 0;
        text-align: center;
    }

    .other-info {
        margin-left: 0;
    }
}
</style>