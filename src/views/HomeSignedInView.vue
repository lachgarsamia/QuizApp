<template>
  <NavbarSignedin />
  <div class="home-container">
    <div class="home-panel">
      <h2 class="home-title">Trending quizzes in your feed</h2>
      <router-link to="/createquiz" v-if="isAdmin" class="create-form-btn">Create New</router-link>
    </div>
    <div class="quizzes-container">
      <router-link v-for="(quiz, index) in quizzes" :key="index" :to="{ name: 'quiz', params: { questionIndex: 0 } }" class="quiz-card">
        <div class="quiz-title">{{ quiz.title }}</div>
        <img :src="quiz.url" class="quiz-image" />
      </router-link>
    </div>
  </div>
</template>

<script>
import NavbarSignedin from "@/components/NavbarSignedin.vue"; 

export default {
  name: "HomeSignedInView",
  components: {
    NavbarSignedin,
  },
  data() {
    return {
      quizzes: [
        { id: 1, title: "Science Quiz", url: require("@/assets/think.jpg") },
        { id: 2, title: "Math Quiz", url: require("@/assets/tomobil.jpg") },
        { id: 3, title: "History Quiz", url: require("@/assets/think.jpg") },
        { id: 4, title: "Geography Quiz", url: require("@/assets/tomobil.jpg") },
        { id: 5, title: "Philosophy Quiz", url: require("@/assets/think.jpg") },
        { id: 6, title: "Physics Quiz", url: require("@/assets/tomobil.jpg") },
        { id: 7, title: "Poetry Quiz", url: require("@/assets/think.jpg") },
        { id: 8, title: "Arts Quiz", url: require("@/assets/tomobil.jpg") },
      ],
      isAdmin: true, 
    };
  },
  methods: {
    quizhover(event) {
      event.target.querySelector(".quiz-title").textContent = "Take Quiz";
      event.target.querySelector(".quiz-title").style.mixBlendMode = "normal";
      event.target.querySelector(".quiz-image").style.display = "none";
      event.target.style.background =
        "linear-gradient(90deg, #ef42ba, #735def)";
    },
    quizregular(event, idx) {
      event.target.querySelector(".quiz-title").textContent =
        this.quizzes[idx].title;
      event.target.querySelector(".quiz-image").style.display = "block";
      event.target.querySelector(".quiz-title").style.mixBlendMode = "difference";
      event.target.style.background = "#fefefe";
    }
  },
};
</script>

<style scoped>
.home-container {
  margin-top: 100px;
}

.home-title {
  text-align: left;
  font-weight: 700;
  background: -webkit-linear-gradient(0deg, #735def, #a51eb7);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 10px 30px 20px 30px;
}

.home-panel {
  display: flex;
  align-items: baseline;
}

.quizzes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  width: 100%;
}

.quiz-card {
  position: relative;
  background-color: #fefefe;
  border: 2px solid #735def;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  height: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  cursor: pointer;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.quiz-title {
  position: absolute;
  font-size: 1.5em;
  font-weight: 600;
  color: #fff;
  mix-blend-mode: difference;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 100%;
}

.quiz-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  filter: blur(3px);
}

.create-form-btn {
  text-decoration: none;
  background-color: #F59931;
  color: #ffffff;
  padding: 8px 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.create-form-btn:hover {
  background-color: #cb42d4;
}

.create-form-btn:active {
  background-color: #8259ec;
}

@media (max-width: 600px) {
  .quizzes-container {
    flex-direction: column;
    align-items: center;
  }

  .quiz-card {
    width: 90%;
  }
}
</style>
