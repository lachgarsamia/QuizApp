# quizz-app

## admin account:
email: ahmed.bentajer@gmail.com
password: 123456

## firebase link:
quizz-app-a108c.web.app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
"# QuizApp" 


QuizApp is a web application designed to allow users to take quizzes and receive instant feedback on their performance. The application leverages Firebase for authentication and data storage and is built using Vue.js.

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

## Features

- **User Authentication:**
  - Secure user signup, login, and logout using Firebase Authentication.

- **Quiz Creation and Management:**
  - Admin users can create, edit, and delete quizzes.
  - Quizzes can be categorized by topics or difficulty levels.

- **Quiz Taking:**
  - Users can browse and select quizzes.
  - User-friendly quiz interface presenting questions one at a time.
  - Support for multiple question types (e.g., multiple-choice, true/false).
  - Instant feedback on answer submission.

- **Scoring and Results:**
  - Score calculation based on correct answers.
  - Detailed results display after quiz completion.
  - Score history tracking in user profiles.

- **Leaderboard:**
  - Global and quiz-specific leaderboards.
  - Real-time updates to leaderboard data.

- **Responsive Design:**
  - Optimized for desktops, tablets, and smartphones.

- **Data Storage:**
  - Secure storage of quiz questions, user responses, and leaderboard data in Firebase Cloud Firestore.
## Usage

- **Signup/Login:** Create a new account or log in with existing credentials.
- **Profile:** Edit your profile details.
- **Create Quiz:** Admin users can create new quizzes.
- **Edit Quiz:** Admin users can edit their created quizzes.
- **Take Quiz:** Users can attempt quizzes and view their results.
- **Leaderboard:** View the global and quiz-specific leaderboards.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**

    ```bash
    git checkout -b feature-branch
    ```

3. **Commit your changes:**

    ```bash
    git commit -m 'Add some feature'
    ```

4. **Push to the branch:**

    ```bash
    git push origin feature-branch
    ```

5. **Create a new Pull Request.**
