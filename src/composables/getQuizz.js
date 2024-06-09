import { ref } from 'vue'
import { app } from '@/firebase/config'

const getRecipe = (id) => {

  const quizz = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      let res = await app.collection('quizzes').doc(id).get()

      if (!res.exists) {
        throw Error('Uh oh! This recipe does not exist!')
      }
      quizz.value = { ...res.data(), id: res.id }
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { quizz, error, load } 
}

export default getRecipe