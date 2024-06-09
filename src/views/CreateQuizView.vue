<template>
  <div id="quiz-container" class="container mt-5 p-4 rounded shadow bg-light">
    <h2 class="text-center text-primary mb-4">Create a Quiz</h2>
    <div class="form-group mb-4">
      <label for="title" class="form-label">Quiz Title:</label>
      <input v-model="title" id="title" type="text" class="form-control" placeholder="Enter quiz title" />
    </div>
    <div class="form-group mb-4">
      <label for="category" class="form-label">Select Category:</label>
      <select v-model="selectedCategory" id="category" class="form-select">
        <option value="" disabled>Select a category</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <div class="form-group mb-4">
      <label for="difficulty" class="form-label">Select Difficulty Level:</label>
      <select v-model="selectedDifficulty" id="difficulty" class="form-select">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <div class="form-group mb-4">
      <label for="description" class="form-label">Quiz Description:</label>
      <textarea v-model="description" id="description" rows="4" class="form-control" placeholder="Enter quiz description"></textarea>
    </div>
    <div id="question-container" class="mb-4">
      <div v-for="(question, index) in questions" :key="question.id" class="question-block p-3 rounded mb-3 shadow-sm">
        <h4 class="text-secondary">Question {{ index + 1 }}</h4>
        <input v-model="question.text" type="text" :placeholder="'Enter question ' + (index + 1) + ' text'" class="form-control mb-3" />
        <ul class="list-unstyled">
          <li v-for="(response, responseIndex) in question.responses" :key="response.id" class="mb-2">
            <input v-model="response.text" type="text" :placeholder="'Enter response ' + (responseIndex + 1)" class="form-control mb-2" />
            <div class="form-check">
              <input type="checkbox" :value="response.id" v-model="question.correctResponseIds" class="form-check-input" />
              <label class="form-check-label">Correct</label>
            </div>
          </li>
        </ul>
        <button class="btn btn-sm btn-outline-success mt-2" @click="addResponse(question.id)">Add Response</button>
      </div>
    </div>
    <button class="btn btn-outline-primary btn-block mb-3" @click="addQuestion">Add Question</button> <br>
    <button class="btn btn-success btn-block" @click="submitQuiz" :disabled="!isFormValid">Submit Quiz</button>
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

:root {
  --primary-color: #007bff;
  --secondary-color: #28a745;
  --background-color: #f8f9fa;
  --text-color: #343a40;
  --border-color: #dee2e6;
  --hover-color: #f5f5f5;
  --transition-duration: 0.3s;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
}

#quiz-container {
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px var(--shadow-color);
}

h2 {
  margin-bottom: 20px;
  color: var(--primary-color);
  font-weight: 700;
}

.form-group label {
  font-weight: 500;
}

.form-control, .form-select {
  transition: border-color var(--transition-duration), box-shadow var(--transition-duration);
  border-radius: 8px;
}

.form-control:focus, .form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.question-block {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px var(--shadow-color);
  background-color: white;
}

.question-block h4 {
  margin-bottom: 15px;
  font-weight: 500;
}

.btn {
  transition: background-color var(--transition-duration), box-shadow var(--transition-duration);
  border-radius: 8px;
}

.btn:hover {
  box-shadow: 0 4px 8px var(--shadow-color);
}

.btn-outline-success {
  border-color: var(--secondary-color);
}

.btn-outline-success:hover {
  background-color: var(--secondary-color);
  color: white;
}

.form-check-input:focus {
  border-color: var(--secondary-color);
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}
</style>
