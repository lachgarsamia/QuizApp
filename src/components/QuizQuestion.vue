<template>
  <div v-if="quiz && currentQuestion" class="question-container">
    <h3>Question {{ questionIndex + 1 }}</h3>
    <p v-if="currentQuestion">{{ currentQuestion.text }}</p>
    <div class="options">
      <div 
        v-for="(option, index) in currentQuestion.options" 
        :key="index" 
        :class="{'correct': isAnswered && currentQuestion.correct.includes(option), 'incorrect': isAnswered && option === selectedOption && !currentQuestion.correct.includes(option)}"
        class="option"
      >
        <input 
          :id="'option-' + index" 
          type="radio" 
          :name="'question-' + questionIndex" 
          :value="option" 
          v-model="selectedOption" 
          :disabled="isAnswered"
        />
        <label :for="'option-' + index">{{ option }}</label>
      </div>
    </div>
    <button @click="submitAnswer" class="next-btn" :disabled="isAnswered && !selectedOption">
      {{ isLastQuestion ? 'Finish the Quiz' : 'Next' }}
    </button>
  </div>
</template>

<script>
export default {
  name: "QuizQuestion",
  props: {
    quiz: {
      type: Object,
      required: true,
    },
    questionIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: null,
      isAnswered: false,
    };
  },
  computed: {
    currentQuestion() {
      return this.quiz.questions[this.questionIndex];
    },
    isLastQuestion() {
      return this.questionIndex === this.quiz.questions.length - 1;
    }
  },
  methods: {
    submitAnswer() {
      this.isAnswered = true;
      setTimeout(() => {
        this.$emit('answer', this.selectedOption);
        this.selectedOption = null;
        this.isAnswered = false;
      }, 1000); 
    },
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.question-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  border-image: linear-gradient(to right, #ff6ec4, #7873f5) 1;
  font-family: 'Arial', sans-serif;
  animation: fadeIn 1s ease-in-out;
}

.question-container h3 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #343a40;
  text-align: center;
  animation: pulse 1s infinite;
}

.question-container p {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #495057;
  text-align: center;
}

.options {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.option {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 12px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.option input[type="radio"] {
  margin-right: 10px;
  accent-color: #007bff;
}

.option label {
  font-size: 1.25rem;
  color: #495057;
  flex-grow: 1;
}

.option.correct {
  background-color: #d4edda;
}

.option.incorrect {
  background-color: #f8d7da;
}

.option:hover {
  background-color: #f1f1f1;
  transform: translateY(-2px);
}

.next-btn {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 20px auto 0;
  background: linear-gradient(to right, #ff6ec4, #7873f5);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.next-btn:hover {
  background: linear-gradient(to right, #7873f5, #ff6ec4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.next-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>
