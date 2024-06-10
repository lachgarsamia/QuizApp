<template>
  <div id="app" class="d-flex flex-column align-items-center justify-content-center min-vh-100">
    <div id="quiz-container" class="container mt-5 p-4 rounded shadow">
      <div class="text-center mb-4">
        <img src="@/assets/logo.png" class="logo" alt="Logo">
      </div>
      <h2 class="text-center text-primary mb-4">Create a Quiz</h2>
      <div class="form-group mb-4">
        <label for="title" class="form-label">Quiz Title:</label>
        <input v-model="title" id="title" type="text" class="form-control border border-info" placeholder="Enter quiz title" />
      </div>
      <div class="form-group mb-4">
        <label for="category" class="form-label">Select Category:</label>
        <select v-model="selectedCategory" id="category" class="form-select border border-info">
          <option value="" disabled>Select a category</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="form-group mb-4">
        <label for="difficulty" class="form-label">Select Difficulty Level:</label>
        <select v-model="selectedDifficulty" id="difficulty" class="form-select border border-info">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div class="form-group mb-4">
        <label for="description" class="form-label">Quiz Description:</label>
        <textarea v-model="description" id="description" rows="4" class="form-control border border-info" placeholder="Enter quiz description"></textarea>
      </div>
      <div id="question-container" class="mb-4">
        <div v-for="(question, index) in questions" :key="question.id" class="question-block p-3 rounded mb-3 shadow-sm border border-info">
          <h4 class="text-secondary">Question {{ index + 1 }}</h4>
          <input v-model="question.text" type="text" :placeholder="'Enter question ' + (index + 1) + ' text'" class="form-control mb-3 border border-info" />
          <ul class="list-unstyled">
            <li v-for="(response, responseIndex) in question.responses" :key="response.id" class="mb-2">
              <input v-model="response.text" type="text" :placeholder="'Enter response ' + (responseIndex + 1)" class="form-control mb-2 border border-info" />
              <div class="form-check">
                <input type="checkbox" :value="response.id" v-model="question.correctResponseIds" class="form-check-input border border-info" />
                <label class="form-check-label">Correct</label>
              </div>
            </li>
          </ul>
          <button class="btn btn-sm btn-outline-success mt-2" @click="addResponse(question.id)">
            <i class="fas fa-plus"></i> Add Response
          </button>
        </div>
      </div>
      <button class="btn btn-outline-primary btn-block mb-3" @click="addQuestion">
        <i class="fas fa-plus"></i> Add Question
      </button>
      <br>
      <button class="btn btn-success btn-block" @click="submitQuiz" :disabled="!isFormValid">
        <i class="fas fa-paper-plane"></i> Submit Quiz
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateQuizView",
  data() {
    return {
      categories: [
        'Exciting Biology', 'Captivating Chemistry', 'Phenomenal Physics', 'Marvelous Mathematics', 'World Wonders History', 'Global Geography', 'Provocative Philosophy', 'Amazing Art History'
      ],
      title: '',
      selectedCategory: '',
      selectedDifficulty: '',
      description: '',
      questions: [
        {
          id: 1,
          text: '',
          responses: [{ id: 1, text: '' }],
          correctResponseIds: []
        }
      ],
      nextQuestionId: 2
    };
  },
  computed: {
    isFormValid() {
      return (
        this.title &&
        this.selectedCategory &&
        this.selectedDifficulty &&
        this.description &&
        this.questions.length > 0 &&
        this.questions.every(q => q.text.trim() !== '' && q.responses.some(r => r.text.trim() !== ''))
      );
    }
  },
  methods: {
    addQuestion() {
      this.questions.push(this.createQuestion(this.nextQuestionId++));
    },
    addResponse(questionId) {
      const question = this.questions.find(q => q.id === questionId);
      if (question) {
        question.responses.push(this.createResponse(question.responses.length + 1));
      }
    },
    submitQuiz() {
      if (this.isFormValid) {
        console.log("Quiz submitted!", {
          title: this.title,
          category: this.selectedCategory,
          difficulty: this.selectedDifficulty,
          description: this.description,
          questions: this.questions
        });
      } else {
        alert("Please fill out all required fields and select correct answers.");
      }
    },
    createQuestion(id) {
      return {
        id,
        text: '',
        responses: [this.createResponse(1)],
        correctResponseIds: []
      };
    },
    createResponse(id) {
      return { id, text: '' };
    }
  }
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Poppins:wght@400;600;700&display=swap');
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

:root {
  --primary-color: #429AF8; /* Dodger Blue */
  --secondary-color: #EF42BA; /* Shocking Pink */
  --tertiary-color: #F59931; /* Carrot Orange */
  --quaternary-color: #735DEF; /* Medium Slate Blue */
  --background-color: #FEFEFE; /* White */
  --text-color: #343a40;
  --border-color: #dee2e6;
  --hover-color: #f5f5f5;
  --transition-duration: 0.3s;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(45deg, #EF42BA, #735DEF, #429AF8, #F59931);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  color: var(--text-color);
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

#quiz-container {
  background-color: var(--background-color);
  border: 2px solid var(--primary-color);
  border-radius: 15px;
  padding: 30px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo {
  max-width: 150px;
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.logo:hover {
  transform: scale(1.1);
}

h2 {
  margin-bottom: 30px;
  color: var(--primary-color);
  font-weight: 700;
  position: relative;
  font-size: 2rem;
}

h2::after {
  content: '';
  width: 60px;
  height: 4px;
  background-color: var(--secondary-color);
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--quaternary-color);
}

.form-control, .form-select {
  transition: box-shadow var(--transition-duration);
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 2px solid var(--secondary-color);
}

.form-control:focus, .form-select:focus {
  box-shadow: 0 0 8px rgba(66, 154, 248, 0.5);
  border-color: var(--secondary-color);
}

textarea.form-control {
  resize: none;
}

.form-select:hover {
  border-color: var(--tertiary-color);
}

.form-select option:hover {
  background-color: var(--hover-color);
}

.question-block {
  border: 2px solid var(--tertiary-color);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: var(--background-color);
  position: relative;
  margin-bottom: 20px;
}

.question-block h4 {
  margin-bottom: 15px;
  font-weight: 500;
  color: var(--tertiary-color);
  position: relative;
}

.question-block h4::before {
  content: '';
  width: 10px;
  height: 100%;
  background-color: var(--primary-color);
  position: absolute;
  left: -20px;
  top: 0;
  transition: left var(--transition-duration);
}

.question-block:hover h4::before {
  left: 0;
}

.question-block input, .question-block textarea {
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  border: 2px solid var(--quaternary-color);
  border-radius: 8px;
  font-size: 1rem;
}

.question-block input:focus, .question-block textarea:focus {
  box-shadow: 0 0 8px rgba(66, 154, 248, 0.5);
  border-color: var(--quaternary-color);
}

.form-check-input {
  margin-top: 0.3rem;
  margin-left: 0;
}

.form-check-label {
  margin-left: 1.25rem;
  margin-bottom: 0;
}

.form-check-input:focus {
  border-color: var(--tertiary-color);
  box-shadow: 0 0 5px rgba(245, 153, 49, 0.5);
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: background-color var(--transition-duration), box-shadow var(--transition-duration);
}

.btn:hover {
  box-shadow: 0 4px 8px var(--shadow-color);
}

.btn-outline-success {
  border-color: var(--secondary-color);
  color: var(--secondary-color);
}

.btn-outline-success:hover {
  background-color: var(--secondary-color);
  color: var(--background-color);
}

.btn-outline-primary {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  color: var(--background-color);
}

.btn-success {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.btn-success:hover {
  background-color: var(--quaternary-color);
  border-color: var(--quaternary-color);
}

#question-container {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

#question-container::-webkit-scrollbar {
  width: 6px;
}

#question-container::-webkit-scrollbar-thumb {
  background-color: var(--primary-color);
  border-radius: 3px;
}

#question-container::-webkit-scrollbar-track {
  background-color: var(--background-color);
}

@media (max-width: 768px) {
  #quiz-container {
    padding: 20px;
  }

  .question-block {
    padding: 15px;
  }
}
</style>
