<template>
  <div v-if="quiz && currentQuestion" class="question-container">
    <h3>Question {{ questionIndex + 1 }}</h3>
    <p v-if="currentQuestion">{{ currentQuestion.text }}</p>
    <div class="options">
      <div v-for="(option, index) in currentQuestion.options" :key="index">
        <input :id="'option-' + index" type="radio" :name="'question-' + questionIndex" :value="option" v-model="selectedOption" />
        <label :for="'option-' + index">{{ option }}</label>
      </div>
    </div>
    <button @click="submitAnswer" :disabled="!selectedOption" class="next-btn">Submit Answer</button>
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
    };
  },
  computed: {
    currentQuestion() {
      return this.quiz.questions[this.questionIndex];
    },
  },
  methods: {
    submitAnswer() {
      this.$emit('answer', this.selectedOption);
      this.selectedOption = null;  
    },
  },
};
</script>

<style scoped>
.question-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.options {
  margin-top: 10px;
}

.next-btn {
  background-color: #4a86f9;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
}

.next-btn:disabled {
  background-color: #cccccc;
}
</style>
