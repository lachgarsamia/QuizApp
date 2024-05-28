<template>
    <div class="profile-container">
        <h2 class="profile-title">Profile</h2>
        <div class="profile-line">
            <div class="profile-info">
                <p>Username: {{ username }}</p>
                <p class="description"> {{ description }}</p>
                <div v-for="category in categories">
                    <p>{{ category }}</p>
                </div>
            </div>
            <div class="best-standing">
                <p>Best Standing: <span class="standing">{{ standing }}</span></p>
                <p>in {{ quiz_title }}</p>"
            </div>
        </div>
        <div class="quizzes-taken">
            <p class="profile-title">Participated in {{ quizzes_taken.length }} Quizzes</p>
            <div v-for="(quiz, index) in quizzes_taken" :key="index" class="quiz-card">
                <div class="quiz-title">{{ quiz.title }}</div>
                <img :src="quiz.url" class="quiz-image" />
                <p class="quiz-score">Score: {{ score }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    data() {
        return {
            username: 'johndoe',
            quizzes_taken: [
                { title: 'Science Quiz', url: require('@/assets/think.jpg'), score: 85 },
                { title: 'Math Quiz', url: require('@/assets/tomobil.jpg'), score: 90 },
                { title: 'History Quiz', url: require('@/assets/think.jpg'), score: 75 },
            ],
            standings: [5, 8, 2, 4, 3]
        };
    },
    computed: {
        standing() {
            return Math.min(...this.standings);
        },
    },
};
</script>


<style scoped>
.profile-container {
    width: 100%;
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
    background-color: #6200ea;
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
}

.category-pink {
    background-color: #ff4081;
}

.category-orange {
    background-color: #ff9800;
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