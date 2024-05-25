<template>
    <div class="container">
        <div>
        </div>
        <div class="browse-bar">
            <input type="text" class="browse">
            <font-awesome-icon :icon="['fas', 'caret-down']" />
            <div class="dropdown-menu">
                <p class="choice" id="geography">Geography</p>
                <p class="choice" id="history">History</p>
                <p class="choice" id="science">Science</p>
                <p class="choice" id="litterature">Literature</p>
                <p class="choice" id="popculture">Pop Culture</p>
            </div>
        </div>
            
        <button class="browse-btn">browse</button> 
        <button class="account">Account</button>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    background-color: #4ecdc4;
    font-family: 'Helvetica';
    margin: 0;
    padding: 0;
    align-items: center;
}

.browse-bar {
    margin: 10px auto;
}

.dropdown-menu {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 2px;
    background-color: #1a535c;
}

.choice {
    padding: 5px;
    font-size: 0.8em;
    color: white;
    text-align: center;
    border-radius: 5px;
    border: 1px solid white;
}
</style>