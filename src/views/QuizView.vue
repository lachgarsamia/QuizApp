<template>
  <div id="quiz-container" class="container mt-5 p-4 rounded shadow bg-light">
    <div v-if="!showResults">
      <QuizQuestion
        :quiz="quiz"
        :questionIndex="currentQuestionIndex"
        @answer="handleAnswer"
      />
      <button @click="nextQuestion" class="btn btn-primary mt-3">Next</button>
    </div>
    <div v-else class="quiz-results text-center">
      <h2 class="text-success">Quiz Completed!</h2>
      <p class="fs-4">Your Score: {{ score }}/{{ quiz.questions.length}}</p>
      <button @click="restartQuiz" class="btn btn-success mt-3">Restart Quiz</button>
    </div>
  </div>
</template>

<script>
import QuizQuestion from "@/components/QuizQuestion.vue";
import getQuiz from "@/composables/getQuiz";

export default {
  name: "QuizView",
  components: {
    QuizQuestion,
  },
  async created() {
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
        (answer, index) => answer === this.quiz.questions[index].correct
      ).length;
    },
  },
  async created() {
    try {
      const { quiz, error, load } = getQuiz(this.quizID);
      await load();
      this.quiz = quiz.value;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    handleAnswer(answer) {
      this.answers.push(answer);
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.showResults = true;
        console.log(this.score)
      }
    },
    restartQuiz() {
      this.answers = [];
      this.currentQuestionIndex = 0;
      this.showResults = false;
    }
  },
};
</script>

<style scoped>
#quiz-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.quiz-results {
  text-align: center;
}

.btn {
  transition: background-color 0.3s, box-shadow 0.3s;
}

.btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}
</style>
