<template>
  <div class="quiz-container">
    <form @submit.prevent="submitQuiz" class="form-container">
      <div class="create-quiz">
        <router-link to="/home" class="back-button">
          <img src="@/assets/logo.png" class="logo" alt="Logo" />
          </router-link>
        <h2 class="title">Create a Quiz</h2>
        <input type="submit" value="Add Quiz" class="submit-button" />
      </div>

      <div class="quiz-info">
        <h2>Quiz Information</h2>
        <input v-model="title" id="title" type="text" placeholder="Enter quiz title" required class="form-control" />
        <select v-model="category" id="category" required class="form-control">
          <option value="" disabled>Select a category</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>

        <select v-model="difficulty" id="difficulty" required class="form-control">
          <option value="" disabled>Select a difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <textarea v-model="description" id="description" rows="2" placeholder="Enter quiz description"
          class="form-control"></textarea>
      </div>

      <div class="questions-index">
        <button type="button" @click="addQuestion" class="add-question-button">Add Question</button>
        <ul :class="['question-index', { 'scrollable': questions.length > 5 }]">
          <li v-for="(question, index) in questions" :key="index">
            <button type="button" @click="selectQuestion(index)" class="index-button">
              Question {{ index + 1 }}
            </button>
            <font-awesome-icon @click="removeQuestion(index)" v-if="questions.length > 1"
              :icon="['fas', 'window-close']" />
          </li>
        </ul>
      </div>

      <div v-if="selectedQuestionIndex !== null" class="edit-question">
        <h2>Editing Question {{ selectedQuestionIndex + 1 }}</h2>
        <input v-model="selectedQuestion.text" type="text" placeholder="Enter question text" required
          class="form-control" />
        <ul>
          <li v-for="(response, responseIndex) in selectedQuestion.options" :key="responseIndex" class="response-item">
            <font-awesome-icon @click="addResponse(selectedQuestionIndex)" class="add-response-button"
              :icon="['fas', 'plus']" />
            <input v-model="response.text" type="text" :placeholder="'Enter response ' + (responseIndex + 1)" required
              class="form-control" />
            <input type="checkbox" class="correct" :value="response.text" v-model="selectedQuestion.correct" />
            <font-awesome-icon class="remove-response-button" @click="removeResponse(responseIndex, selectedQuestionIndex)"
              v-if="selectedQuestion.options.length > 1" :icon="['fas', 'window-close']" />
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import { app } from "@/firebase/config";
import {getUser} from "@/composables/getUser";
export default {
  name: "CreateQuizView",
  data() {
    return {
      categories: ["General Knowledge", "Science & Nature", "History & Geography", "Entertainment & Pop Culture", "Sports & Recreation", "Literature & Arts"],
      title: '',
      category: '',
      difficulty: '',
      description: '',
      questions: [
        {
          text: '',
          options: [{text: '' }],
          correct: []
        }
      ],
      selectedQuestionIndex: 0,
      user: ''
    };
  },
  computed: {
    selectedQuestion() {
      if (this.selectedQuestionIndex !== null) {
        return this.questions[this.selectedQuestionIndex];
      }
      return null;
    }
  },
  async created() {
    this.user = await getUser();
  },
  methods: {
    addQuestion() {
      this.questions.push(this.createQuestion(this.nextQuestionId++));
    },
    addResponse(idx) {
      const question = this.questions[idx];
      if (question.options.length < 4) {
        question.options.push({text: '' });
      }
    },
    createQuestion() {
      return {
        text: '',
        options: [{text: ''}],
        correct: []
      };
    },
    removeResponse(responseIndex, questionIndex) {
      const question = this.questions[questionIndex];
      if (question) {
        question.options.splice(responseIndex, 1);
      }
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
      if (this.selectedQuestionIndex === index) {
        this.selectedQuestionIndex = null;
      }
    },
    selectQuestion(index) {
      this.selectedQuestionIndex = index;
    },
    async submitQuiz() {
      const uid = this.user.uid;
      const quizData = {
        author: uid,
        title: this.title,
        category: this.category,
        difficulty: this.difficulty,
        description: this.description,
        questions: this.questions.map((question) => {
          return {
            text: question.text,
            options: question.options.map((option) => {
              return option.text;
            }),
            correct: question.correct
          };
        }),
        players: []
      };
      const Ref = await app.collection('quizzes').add(quizData);
      const quizID = Ref.id;
      const author = app.collection('users').doc(uid);
      const user = await author.get();
      const currentQuizzes = (user.data().created_quizzes == null) ? user.data().quizzes : [];
      currentQuizzes.push(quizID);
      await author.update({ created_quizzes: currentQuizzes });
      this.$router.push("/home");
    }
  }
};
</script>


<style scoped>
.quiz-container {
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
}

.form-container {
  display: grid;
  gap: 20px;
  width: 100%;
}

@media screen and (min-width: 992px) {
  .form-container {
    grid-template-columns: 1.1fr 1.3fr 0.6fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "create-quiz create-quiz create-quiz"
      "quiz-info edit-question questions-index";
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .form-container {
    grid-template-columns: 1.7fr 0.7fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "create-quiz create-quiz"
      "quiz-info quiz-info"
      "edit-question questions-index";
  }
}

@media screen and (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    grid-template-areas:
      "create-quiz"
      "quiz-info"
      "questions-index"
      "edit-question";
    gap: 15px;
  }
}

.create-quiz {
  grid-area: create-quiz;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quiz-info {
  grid-area: quiz-info;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quiz-info h2 {
  font-weight: 700;
  color: #735DEF;
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
}

.questions-index {
  grid-area: questions-index;
  background: #f8f8f8;
  padding: 5px 8px;
  border-radius: 10px;
}

.questions-index ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 300px;
  overflow-y: scroll;
}

.questions-index li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

.questions-index li:hover {
  background: #735DEF;
  color: #fff;
}

.edit-question {
  grid-area: edit-question;
  background: #735DEF;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
}

.edit-question h2 {
  font-weight: 700;
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
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
  width: 70px;
  margin-right: 10px;
  transition: transform 0.3s;
}

.logo:hover {
  transform: scale(1.1);
}

.title {
  margin-bottom: 10px;
  color: #735DEF;
  font-weight: 700;
  position: relative;
  font-size: 2rem;
}

.submit-button {
  background-color: #F59931;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: transform 0.3s, background-color 0.3s;
}

.submit-button:hover {
  transform: scale(1.05);
  background-color: #EF42BA;
}

.form-control {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #735DEF;
  transition: box-shadow 0.3s;
}

.form-control:focus {
  box-shadow: 0 0 8px rgba(66, 154, 248, 0.5);
  border: 1px solid transparent;
}

select {
  cursor: pointer;
}

.index-button {
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  border: none;
  color: inherit;
  background-color: inherit;
}

.add-question-button,
.add-response-button {
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: #735DEF;
  color: #fff;
  margin: 10px auto;
  transition: background-color 0.3s;
}

.add-question-button:hover,
.add-response-button:hover {
  background-color: #F59931;
}

.add-response-button {
  padding: 10px 12px;
  border-radius: 50px;
}

.response-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.correct {
  cursor: pointer;
  padding: 20px;
  border: 2px solid #ddd;
}

.correct:checked {
  border: none;
  padding: 20px;
}

.remove-response-button {
  border-radius: 10px;
  padding: 2px 8px;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.remove-response-button:hover {
  color: #EF42BA;
}
</style>
