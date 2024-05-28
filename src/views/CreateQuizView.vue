<template>
    <div id="quiz-container">
      <h2>Create a Quiz</h2>
      <div class="form-group">
        <label for="title">Quiz Title:</label>
        <input v-model="title" id="title" type="text" placeholder="Enter quiz title" />
      </div>
      <div class="form-group">
        <label for="category">Select Category:</label>
        <select v-model="selectedCategory" id="category">
          <option value="" disabled>Select a category</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="description">Quiz Description:</label>
        <textarea v-model="description" id="description" rows="4" placeholder="Enter quiz description"></textarea>
      </div>
      <div id="question-container">
        <div v-for="(question, index) in questions" :key="question.id" class="question-block">
          <h3>Question {{ index + 1 }}</h3>
          <input v-model="question.text" type="text" :placeholder="'Enter question ' + (index + 1) + ' text'" class="question-input" />
          <ul class="responses">
            <li v-for="(response, responseIndex) in question.responses" :key="response.id">
              <input v-model="response.text" type="text" :placeholder="'Enter response ' + (responseIndex + 1)" />
              <label>
                <input type="checkbox" :value="response.id" v-model="question.correctResponseIds" />
                Correct
              </label>
            </li>
          </ul>
          <button class="add-response-btn" @click="addResponse(question.id)">Add Response</button>
        </div>
      </div>
      <button id="add-question-btn" @click="addQuestion">Add Question</button>
      <button id="submit-quiz-btn" @click="submitQuiz" :disabled="!isFormValid">Submit Quiz</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "CreateQuizView",
    data() {
      return {
        categories: [
          'Science Quiz',
          'Math Quiz',
          'History Quiz',
          'Geography Quiz',
          'Philosophy Quiz',
          'Physics Quiz',
          'Poetry Quiz',
          'Arts Quiz'
        ],
        title: '',
        selectedCategory: '',
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
    --primary-color: #0075b0;
    --secondary-color: #8a5cff;
    --background-color: #ffffff;
    --text-color: #333333;
    --border-color: #dddddd;
    --button-background-color: #0075b0;
    --button-hover-color: #0056b3;
  }
  
  #quiz-container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    color: var(--text-color);
    font-weight: 500;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  #title, #category, #description {
    display: block;
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
  }
  
  #title:focus, #category:focus, #description:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(0, 117, 176, 0.5);
    outline: none;
  }
  
  .question-block {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  
  .question-input {
    width: calc(100% - 20px);
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  .question-input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(0, 117, 176, 0.5);
    outline: none;
  }
  
  .responses {
    list-style-type: none;
    padding: 0;
  }
  
  .responses li {
    margin-bottom: 10px;
  }
  
  input[type="text"] {
    margin-bottom: 10px;
    padding: 10px;
    width: calc(100% - 20px);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  input[type="text"]:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(0, 117, 176, 0.5);
    outline: none;
  }
  
  button {
    padding: 10px 20px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    background-color: var(--button-background-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
  
  button:hover:enabled {
    background-color: var(--button-hover-color);
    transform: scale(1.05);
  }
  
  #add-question-btn {
    display: block;
    width: 100%;
    margin-top: 20px;
  }
  
  #submit-quiz-btn {
    display: block;
    width: 100%;
    margin-top: 20px;
    background-color: var(--primary-color);
  }
  
  .add-response-btn {
    display: block;
    margin-top: 10px;
    background-color: #28a745;
  }
  
  .add-response-btn:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
  </style>
  