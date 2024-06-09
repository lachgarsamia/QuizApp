import { projectFirestore } from "@/firebase/config";
const quizzesData = [
  {
    title: "General Knowledge Quiz",
    category: "General Knowledge",
    difficulty: "medium",
    description: "A simple quiz to test your general knowledge.",
    questions: [
      {
        text: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
      },
      {
        text: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4"
      },
      {
        text: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Jupiter"
      }
    ],
    authorID: "userID_1",
    tags: ["general", "knowledge", "fun"]
  },
  {
    title: "Exciting Biology Quiz",
    category: "Exciting Biology",
    difficulty: "medium",
    description: "Test your knowledge of biology.",
    questions: [
      {
        text: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        correct: "Mitochondria"
      },
      {
        text: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        correct: "H2O"
      },
      {
        text: "What is the largest organ in the human body?",
        options: ["Heart", "Liver", "Skin", "Lungs"],
        correct: "Skin"
      }
    ],
    authorID: "userID_1",
    tags: ["biology", "science", "fun"]
  },
  {
    title: "Captivating Chemistry Quiz",
    category: "Captivating Chemistry",
    difficulty: "medium",
    description: "A quiz to challenge your chemistry knowledge.",
    questions: [
      {
        text: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        correct: "Au"
      },
      {
        text: "What is the pH level of pure water?",
        options: ["5", "7", "9", "11"],
        correct: "7"
      },
      {
        text: "Who is known as the father of modern chemistry?",
        options: ["Isaac Newton", "Albert Einstein", "Antoine Lavoisier", "Marie Curie"],
        correct: "Antoine Lavoisier"
      }
    ],
    authorID: "userID_1",
    tags: ["chemistry", "science", "fun"]
  },
  {
    title: "Phenomenal Physics Quiz",
    category: "Phenomenal Physics",
    difficulty: "medium",
    description: "A quiz to test your physics knowledge.",
    questions: [
      {
        text: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "400,000 km/s", "200,000 km/s"],
        correct: "300,000 km/s"
      },
      {
        text: "Who formulated the theory of relativity?",
        options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Niels Bohr"],
        correct: "Albert Einstein"
      },
      {
        text: "What is the unit of force?",
        options: ["Newton", "Joule", "Watt", "Pascal"],
        correct: "Newton"
      }
    ],
    authorID: "userID_1",
    tags: ["physics", "science", "fun"]
  },
  {
    title: "Marvelous Mathematics Quiz",
    category: "Marvelous Mathematics",
    difficulty: "medium",
    description: "Test your mathematical skills with this quiz.",
    questions: [
      {
        text: "What is the value of pi?",
        options: ["3.14", "2.71", "1.62", "1.41"],
        correct: "3.14"
      },
      {
        text: "What is the square root of 144?",
        options: ["10", "12", "14", "16"],
        correct: "12"
      },
      {
        text: "What is 5 factorial (5!)?",
        options: ["60", "120", "180", "240"],
        correct: "120"
      }
    ],
    authorID: "userID_1",
    tags: ["mathematics", "math", "fun"]
  },
  {
    title: "World Wonders History Quiz",
    category: "World Wonders History",
    difficulty: "medium",
    description: "Learn about the wonders of the world.",
    questions: [
      {
        text: "What is the Great Wall of China?",
        options: ["A palace", "A fortress", "A wall", "A tomb"],
        correct: "A wall"
      },
      {
        text: "Where is the Taj Mahal located?",
        options: ["India", "Pakistan", "China", "Nepal"],
        correct: "India"
      },
      {
        text: "Who built the pyramids of Giza?",
        options: ["Romans", "Greeks", "Egyptians", "Persians"],
        correct: "Egyptians"
      }
    ],
    authorID: "userID_1",
    tags: ["history", "wonders", "fun"]
  },
  {
    title: "Global Geography Quiz",
    category: "Global Geography",
    difficulty: "medium",
    description: "A quiz to test your geography knowledge.",
    questions: [
      {
        text: "What is the largest continent?",
        options: ["Africa", "Asia", "Europe", "Australia"],
        correct: "Asia"
      },
      {
        text: "Which is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        correct: "Nile"
      },
      {
        text: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correct: "Canberra"
      }
    ],
    authorID: "userID_1",
    tags: ["geography", "world", "fun"]
  },
  {
    title: "Provocative Philosophy Quiz",
    category: "Provocative Philosophy",
    difficulty: "medium",
    description: "Challenge your mind with these philosophical questions.",
    questions: [
      {
        text: "Who wrote 'The Republic'?",
        options: ["Aristotle", "Plato", "Socrates", "Descartes"],
        correct: "Plato"
      },
      {
        text: "What is the meaning of life according to existentialism?",
        options: ["Predetermined", "Subjective", "Objective", "Irrelevant"],
        correct: "Subjective"
      },
      {
        text: "What is the branch of philosophy that deals with knowledge?",
        options: ["Ethics", "Metaphysics", "Epistemology", "Logic"],
        correct: "Epistemology"
      }
    ],
    authorID: "userID_1",
    tags: ["philosophy", "thought", "fun"]
  },
  {
    title: "Amazing Art History Quiz",
    category: "Amazing Art History",
    difficulty: "medium",
    description: "A quiz to test your knowledge of art history.",
    questions: [
      {
        text: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Claude Monet", "Leonardo da Vinci", "Pablo Picasso"],
        correct: "Leonardo da Vinci"
      },
      {
        text: "What is the art style of Salvador Dalí?",
        options: ["Cubism", "Surrealism", "Impressionism", "Realism"],
        correct: "Surrealism"
      },
      {
        text: "Who painted the ceiling of the Sistine Chapel?",
        options: ["Michelangelo", "Raphael", "Donatello", "Leonardo da Vinci"],
        correct: "Michelangelo"
      }
    ],
    authorID: "userID_1",
    tags: ["art", "history", "fun"]
  }
];

const addQuizzesToFirestore = async (quizzesData) => {
  try {
    for (const quiz of quizzesData) {
      const quizRef = await projectFirestore.collection("quizzes").add({
        title: quiz.title,
        category: quiz.category,
        difficulty: quiz.difficulty,
        description: quiz.description,
        authorID: quiz.authorID,
        tags: quiz.tags
      });

      for (const question of quiz.questions) {
        await projectFirestore.collection("quizzes").doc(quizRef.id).collection("questions").add(question);
      }
    }
    console.log("Quizzes added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding quizzes to Firestore: ", error);
  }
};

addQuizzesToFirestore(quizzesData);
