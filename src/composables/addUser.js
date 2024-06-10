import { auth } from "@/firebase/config"
import { app } from "@/firebase/config"
import { ref } from "vue"

const error = ref(null)

const signup = async (email, password, username) => {
    error.value = null
    try {
        const response = await auth.createUserWithEmailAndPassword(email, password)

        if(!response)
            throw new Error('Could not signup')
        
        await response.user.updateProfile({username: username})
        const userdata = { username: username, quizzes_taken: [{title: '', link: '', score: 0}], standings: [], categories : [], role: 'user'};
        await app.collection('users').doc(response.user.uid).set(userdata);
        
        error.value = null
        return response.message
    } catch (err) {
        console.log(err)
        error.value = err.message
    }
}

const registerUser = () => {
    return {error, signup}
}

export default registerUser