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
      <p class="fs-4">Your Score: {{ score }}/{{ quiz.questions.length }}</p>
      <button @click="restartQuiz" class="btn btn-success mt-3">Restart Quiz</button>
    </div>
  </div>
</template>

<script>
import QuizQuestion from "@/components/QuizQuestion.vue";

export default {
  name: "QuizView",
  components: {
    QuizQuestion,
  },
  data() {
    return {
      quiz: {
        title: "Sample Quiz",
        questions: [
          {
            text: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correct: "Paris",
          },
          {
            text: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correct: "4",
          },
          {
            text: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct: "Jupiter",
          },
          {
            text: "What is the boiling point of water?",
            options: ["90°C", "100°C", "110°C", "120°C"],
            correct: "100°C",
          },
          {
            text: "Who wrote 'To be, or not to be'?",
            options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
            correct: "William Shakespeare",
          },
          {
            text: "What is the chemical symbol for water?",
            options: ["H2O", "O2", "CO2", "NaCl"],
            correct: "H2O",
          },
          {
            text: "What is the square root of 16?",
            options: ["2", "4", "6", "8"],
            correct: "4",
          },
          {
            text: "Who is known as the father of computers?",
            options: ["Albert Einstein", "Isaac Newton", "Charles Babbage", "Nikola Tesla"],
            correct: "Charles Babbage",
          },
          {
            text: "What year did the Titanic sink?",
            options: ["1905", "1912", "1918", "1923"],
            correct: "1912",
          },
          {
            text: "What is the smallest prime number?",
            options: ["0", "1", "2", "3"],
            correct: "2",
          },
          {
            text: "Which element has the chemical symbol 'O'?",
            options: ["Oxygen", "Gold", "Silver", "Hydrogen"],
            correct: "Oxygen",
          },
          {
            text: "How many continents are there on Earth?",
            options: ["5", "6", "7", "8"],
            correct: "7",
          },
          {
            text: "What is the tallest mountain in the world?",
            options: ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"],
            correct: "Mount Everest",
          },
          {
            text: "What is the longest river in the world?",
            options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
            correct: "Nile River",
          },
          {
            text: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Claude Monet", "Leonardo da Vinci", "Pablo Picasso"],
            correct: "Leonardo da Vinci",
          },
        ],
      },
      currentQuestionIndex: 0,
      answers: [],
      showResults: false,
    };
  },
  computed: {
    score() {
      return this.answers.filter(
        (answer, index) => answer === this.quiz.questions[index].correct
      ).length;
    },
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
