<template>
  <div id="quiz-container" class="container mt-5 p-4 rounded shadow bg-light">
    <router-link to="/home">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="App Logo" class="logo" @click="goHome">
      </div>
    </router-link>
    <div v-if="!showResults">
      <QuizQuestion :quiz="quiz" :questionIndex="currentQuestionIndex" @answer="handleAnswer" />
    </div>
    <div v-else class="quiz-results text-center">
      <div class="congrats-message">
        <h2>Congratulations!</h2>
        <p>You have completed the quiz.</p>
      </div>
      <div class="score-container">
        <p>Your Score:</p>
        <div class="progress-bar">
          <div class="progress" :style="{ width: scorePercentage + '%' }"></div>
        </div>
        <p>{{ score }}/{{ quiz.questions.length }}</p>
      </div>
      <div class="feedback-container">
        <h3>Quiz Feedback:</h3>
        <ul>
          <li v-for="(question, index) in quiz.questions" :key="index" class="feedback-item">
            <div class="question-text">
              <strong>Question {{ index + 1 }}:</strong> {{ question.text }}
            </div>
            <div :class="answerClass(question, index)" class="answer">
              <i :class="iconClass(question, index)"></i>
              <span>{{ displayAnswer(index) }}</span>
            </div>
            <div v-if="isIncorrect(question, index)" class="correct-answer">
              Correct Answer(s): {{ correctAnswers(question) }}
            </div>
          </li>
        </ul>
      </div>
      <div class="button-group">
        <button @click="restartQuiz" class="btn btn-success mt-3">Restart Quiz</button>
        <router-link to="/home" class="btn btn-primary mt-3">Go Back Home</router-link>
        <router-link :to="`/quiz/${quizID}/leaderboard`" class="btn btn-primary mt-3">View Leaderboard</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import QuizQuestion from "@/components/QuizQuestion.vue";
import getQuiz from "@/composables/getQuiz";
import { app } from "@/firebase/config";
import { getUser } from "@/composables/getUser";

export default {
  name: "QuizView",
  components: {
    QuizQuestion,
  },
  data() {
    return {
      quiz: '',
      currentQuestionIndex: 0,
      answers: [],
      showResults: false,
    };
  },
  computed: {
    quizID() {
      return this.$route.params.id;
    },
    score() {
      return this.answers.filter(
        (answer, index) => this.quiz.questions[index].correct.includes(answer)
      ).length;
    },
    scorePercentage() {
      return (this.score / this.quiz.questions.length) * 100;
    }
  },
  async created() {
    try {
      const { quiz, error, load } = getQuiz(this.quizID);
      await load();
      this.quiz = quiz.value;
      console.log(this.quiz.players);
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    showResults(value) {
      if (value) {
        this.addPlayerToQuiz();
      }
    }
  }
  ,
  methods: {
    handleAnswer(answer) {
      this.answers[this.currentQuestionIndex] = answer;
      this.nextQuestion();
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.showResults = true;
        console.log(this.score);
      }
    },
    restartQuiz() {
      this.answers = [];
      this.currentQuestionIndex = 0;
      this.showResults = false;
    },
    answerClass(question, index) {
      return {
        'answer-correct': question.correct.includes(this.answers[index]),
        'answer-incorrect': !question.correct.includes(this.answers[index])
      };
    },
    iconClass(question, index) {
      return {
        'fa fa-check correct-icon': question.correct.includes(this.answers[index]),
        'fa fa-times incorrect-icon': !question.correct.includes(this.answers[index])
      };
    },
    displayAnswer(index) {
      return this.answers[index] !== undefined ? this.answers[index] : 'No answer';
    },
    isIncorrect(question, index) {
      return !question.correct.includes(this.answers[index]);
    },
    correctAnswers(question) {
      return question.correct.map(answer => answer).join(', ');
    },
    async addPlayerToQuiz() {
      const user = getUser();
      const userRef = (await app.collection('users').doc(user.uid).get()).data();
      const quizRef = app.collection('quizzes').doc(this.quizID);
      const quizData = (await quizRef.get()).data();
      const players = quizData.players;

      let playerExists = false;
      const updatedPlayers = players.map(player => {
        if (player.id === user.uid) {
          playerExists = true;
          return { id: user.uid, player: userRef.username, score: Math.max(player.score, this.score) };
        }
        return player;
      });
      if (!playerExists) {
        const userDoc = app.collection('users').doc(user.uid);
        await userDoc.update({
          quizzes_taken: [...userRef.quizzes_taken, this.quizID]
        });
        updatedPlayers.push({ id: user.uid, player: userRef.username, score: this.score });
      }
      await quizRef.update({
        players: updatedPlayers
      });
    }

  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

#quiz-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border: 4px solid;
  border-image: linear-gradient(to right, #ff6ec4, #7873f5) 1;
  position: relative;
  font-family: 'Arial', sans-serif;
  animation: fadeIn 1s ease-in-out;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  max-width: 100px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.quiz-results {
  text-align: center;
  margin-top: 20px;
  animation: fadeIn 1s ease-in-out;
}

.congrats-message h2 {
  font-size: 2.5rem;
  color: dodgerblue;
  margin-bottom: 10px;
  animation: pulse 1s infinite;
}

.congrats-message p {
  font-size: 1.25rem;
  color: #495057;
  margin-bottom: 20px;
}

.score-container {
  margin-top: 20px;
}

.score-container p {
  font-size: 1.25rem;
  color: #495057;
}

.progress-bar {
  width: 100%;
  height: 30px;
  background-color: #e9ecef;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
}

.progress {
  height: 100%;
  background: linear-gradient(to right, #ff6ec4, #7873f5);
  transition: width 0.3s ease;
}

.feedback-container {
  text-align: left;
  margin-top: 30px;
}

.feedback-container h3 {
  font-size: 1.5rem;
  color: #343a40;
  margin-bottom: 20px;
}

.feedback-container ul {
  list-style: none;
  padding: 0;
}

.feedback-container li {
  margin-bottom: 20px;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.5s ease-in-out;
}

.question-text {
  margin-bottom: 10px;
}

.answer {
  display: flex;
  align-items: center;
  font-size: 1rem;
}

.answer.correct {
  color: #28a745;
}

.answer.incorrect {
  color: #dc3545;
}

.icon {
  margin-right: 10px;
}

.correct-icon {
  color: #28a745;
}

.incorrect-icon {
  color: #dc3545;
}

.correct-answer {
  color: #495057;
  margin-top: 5px;
}

.btn {
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 5px;
  margin-top: 20px;
}

.btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.btn-primary {
  background: linear-gradient(to right, #ff6ec4, #7873f5);
  color: white;
  border: none;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary:hover {
  background-color: #ff6ec4;
}

.btn-success {
  background-color: dodgerblue;
  color: white;
  border: none;
}

.btn-success:hover {
  background-color: aqua;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
