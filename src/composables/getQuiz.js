import { ref } from 'vue'
import { app } from '@/firebase/config'

const getQuiz = (id) => {

  const quiz = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      let res = await app.collection('quizzes').doc(id).get()

      if (!res.exists) {
        throw Error('Uh oh! This quiz does not exist!')
      }
      quiz.value = { ...res.data(), id: res.id }
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { quiz, error, load } 
}

export default getQuiz