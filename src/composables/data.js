import { app } from "@/firebase/config";

const addQuizzesToFirestore = async (quizzesData) => {
  try {
    for (const quiz of quizzesData) {
      const quizRef = await app.collection("quizzes").add({
        title: quiz.title,
        category: quiz.category,
        questions: quiz.questions,
        difficulty: quiz.difficulty,
        description: quiz.description,
        authorID: quiz.authorID,
      });
    }
    console.log("Quizzes added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding quizzes to Firestore: ", error);
  }
};

export default addQuizzesToFirestore;