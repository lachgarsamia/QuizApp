<template>
    <div class="container">
        <div>
        </div>
        <div class="browse-bar">
            <input type="text" class="browse" placeholder="Search for a quiz..">
            <font-awesome-icon :icon="['fas', 'caret-down']" class="fa-icon" @mouseenter="show=true"/>
            <div class="dropdown-menu" v-show="show" @mouseleave="show = false" >
                <p class=choice v-for="choice in choices">{{ choice }}</p>
            </div>
            <button class="browse-btn">Browse</button> 
        </div>
            
        <button class="account">Account</button>
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
.container {
    display: flex;
    justify-content: space-between;
    background: linear-gradient(90deg, #ef42ba, #735def);
    font-family: 'Helvetica', 'Helvetica Light', 'Arial', sans-serif;
    margin: 0;
    padding: 0 20px;
    align-items: center;
    height: 100px;
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

.fa-icon {
    color: white;
    cursor: pointer;
    transition: transform 0.3s;
}

.fa-icon:hover {
    transform: rotate(180deg);
}

.browse {
    padding: 10px 15px;
    border-radius: 20px;
    border: 1px solid white;
    width: 300px;
    height: 28px;
    font-size: 0.9em;
    transition: border-color 0.3s;
}

.browse:focus {
    outline: none;
    border-color: #F59931;
    font-weight: lighter;
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
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.choice {
    padding: 10px;
    font-size: 0.9em;
    color: white;
    text-align: center;
    border-radius: 7px;
    margin: 4px;
    border: 1px solid white;
    height: 30px;
    cursor: pointer;
    font-weight: 550;
    width: 85px;
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
    background-color: #F59931;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 600;
    padding: 10px 15px;
    transition: background-color 0.3s;
}

.browse-btn:hover {
    background-color: #e58928;
}

.account {
    background-color: transparent;
    border: 2px solid white;
    border-radius: 15px;
    color: white;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 600;
    padding: 10px 20px;
    transition: background-color 0.3s, color 0.3s;
}

.account:hover {
    background-color: white;
    color: #735def;
}
</style>