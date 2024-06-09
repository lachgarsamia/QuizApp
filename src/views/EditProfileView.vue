<template>
    <div class="signup-container">
        <h3 class="title-signup" v-show="completeSignUp">Almost there, how about customizing your experience?</h3>
        <form @submit.prevent="editProfile">
            <label>Choose at least 1 quiz category</label>
            <multiselect :multiple="true" :clear-on-select="false" :close-on-select="false" v-model="categories"
                :options="options"></multiselect>
            <label>Description</label>
            <textarea v-model="description"></textarea>
            <input type="file" @change="uploadImage" />
            <input type="submit" value="Confirm Changes">
        </form>
    </div>
</template>

<script>
import {app} from '@/firebase/config';
import { storage } from '@/firebase/config';
import Multiselect from 'vue-multiselect';
import {isLogged, getUser}from '@/composables/getUser';

export default {
    components: { Multiselect },
    data() {
        return {
            completeSignUp: true,
            categories: null,
            options: ["General Knowledge", "Science & Nature", "History & Geography", "Entertainment & Pop Culture", "Sports & Recreation", "Literature & Arts"],
            imageURL: null,
            description: ''
        };
    },
    methods: {
        async uploadImage(event) {
            const file = event.target.files[0];
            if (isLogged()) {
                const user = getUser();
                const storageRef = storage.ref(`images/${user.uid}/profile.jpg`);
                try {
                    const snapshot = await storageRef.put(file);
                    this.imageURL = await snapshot.ref.getDownloadURL();
                    console.log('File uploaded:', this.imageURL);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        },
        editProfile() {
            const user = getUser();
            app.collection('users').doc(user.uid).update({description: this.description, categories: this.categories});
            this.$router.push(`/profile/${user.uid}`)
        }
    },
};


</script>

<style scoped>
.signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #000000;
    /* Black */
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 50px auto;
}

.title-signup {
    color: #cb42d4;
    /* Purple */
    margin-bottom: 30px;
    font-weight: 700;
    font-size: 2rem;
}

.signup-container form {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.signup-container input {
    margin-bottom: 15px;
    padding: 12px;
    border: 1px solid #8259ec;
    /* Violet */
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
}

.signup-container input:focus {
    border-color: #517af7;
    /* Blue */
}

.signup-container button {
    background-color: #735DEF;
    color: #ffffff;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: background-color 0.3s ease;
}

.signup-container button:hover {
    background-color: #cb42d4;
    /* Purple */
}

.signup-container button:active {
    background-color: #8259ec;
    /* Violet */
}

.signup-container input::placeholder {
    color: #999999;
}

.signup-container button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(81, 122, 247, 0.5);
    /* Blue */
}
</style>