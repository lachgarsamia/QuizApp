<template>
    <div class="custom-container">
        <router-link class="rm" to="/">
            <div class="logo-container">
                <img src="@/assets/logo-OYJ34ERC.png">
                <p class="title-quizzapp"><span class="fancy">Quizz</span>App</p>
            </div>
        </router-link>
        <div class="browse-bar">
            <input type="text" class="browse" placeholder="Search for a quiz..">
            <font-awesome-icon :icon="['fas', 'caret-down']" class="fa-icon" @mouseenter="show = true" />
            <div class="dropdown-menu" v-show="show" @mouseleave="show = false">
                <p class="choice" v-for="choice in choices">{{ choice }}</p>
            </div>
            <button class="browse-btn">Browse</button>
        </div>
        <router-link to="profile" class="account-desktop">Account</router-link>
        <router-link to="profile"><font-awesome-icon :icon="['fas', 'user']" class="account-phone" /></router-link>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const choices = ref(['All', 'Music', 'Movies', 'TV Shows', 'Books', 'Podcasts', 'Newspapers', 'Magazines'])
        const show = ref(false)
        return {
            choices,
            show
        }
    }
}
</script>

<style scoped>
.custom-container {
    position: fixed;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    font-family: 'Helvetica', 'Helvetica Light', 'Arial', sans-serif;
    padding: 0 20px;
    align-items: center;
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo-container img {
    display: block;
    max-width: 80%;
    max-height: 80px;
    margin: 0 auto;
}

.logo-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}

.rm {
    text-decoration: none;
}

.title-quizzapp {
    margin-top: 20px;
    margin-left: 10px;
    color: #1b0f61;
    font-weight: 800;
    font-size: 1.5em;
}

.fancy {
    font-family: Geneva, Verdana, sans-serif;
    background: -webkit-linear-gradient(0deg, #F59931, #EF42BA, #429AF8, #735def);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.browse-bar {
    margin: 10px auto;
    display: flex;
    align-items: center;
    position: relative;
    gap: 10px;
    flex: 1;
    justify-content: center;
}

.browse-bar input.browse {
    padding: 10px 15px;
    border-radius: 20px;
    border: 1px solid #735def;
    width: 100%;
    max-width: 350px;
    height: 45px;
    font-size: 0.9em;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.browse-bar input.browse:focus {
    outline: none;
    border-color: #F59931;
    box-shadow: 0 0 5px rgba(245, 153, 49, 0.5);
}

.fa-icon {
    color: #735def;
    cursor: pointer;
    transition: transform 0.3s;
}

.fa-icon:hover {
    transform: rotate(180deg);
}

.dropdown-menu {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: linear-gradient(90deg, #ef42ba, #735def);
    height: fit-content;
    border-radius: 5px;
    border: 1px solid transparent;
    padding: 10px;
    z-index: 1000;
}

.choice {
    padding: 20px 10px;
    font-size: 0.9em;
    color: white;
    text-align: center;
    border-radius: 7px;
    margin: 4px;
    border: 1px solid white;
    height: 30px;
    cursor: pointer;
    font-weight: 550;
    width: 100px;
    transition: background-color 0.3s, opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.choice:hover {
    background-color: rgba(255, 255, 255, 0.2);
    opacity: 0.8;
}

.browse-btn {
    background-color: #735def;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 600;
    padding: 10px 18px;
    transition: background-color 0.3s, box-shadow 0.3s;
}

.browse-btn:hover {
    background-color: #ef42ba;
    box-shadow: 0 0 5px rgba(229, 137, 40, 0.5);
}

.account-desktop {
    text-decoration: none;
    background-color: #1b0f61;
    border: 2px solid #1b0f61;
    color: #fff;
    box-shadow: 0 0 5px rgba(115, 93, 239, 0.5);
    border-radius: 15px;
    cursor: pointer;
    font-size: 1em;
    font-weight: 600;
    padding: 10px 20px;
    margin-right: 50px;
}

.account-desktop:hover {
    transition-duration: 300ms;
    background-color: #EF42BA;
    border: 2px solid #EF42BA;
    box-shadow: 0 0 10px rgba(115, 93, 239, 0.5);
}

.account-phone {
    display: none;
}

@media (max-width: 768px) {
    .custom-container {
        height: auto;
        padding: 10px;
        gap: 5px;
    }

    .browse-bar {
        max-width: 100%;
        margin: 10px 0;
    }

    .browse-bar input.browse {
        width: 100%;
    }

    .logo-container img {
        max-width: 70%;
        max-height: 70px;
    }

    .browse-btn {
        display: none;
    }

    .account-desktop {
        display: none;
    }

    .account-phone {
        display: block;
    }
}


@media screen and (max-width: 800px) {
    .title-quizzapp {
        display: none;
    }
}

@media screen and (max-width: 500px) {
    .dropdown-menu {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
