<template>
    <div id="leaderboard-container">
        <h1>Leaderboard</h1>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(player, index) in players.slice(0, 10)" :key="player.username">
                    <td>{{ index + 1 }}</td>
                    <td>{{ player.username }}</td>
                    <td>{{ player.score }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            players: [
                { username: 'Alice', score: 300 },
                { username: 'Bob', score: 500 },
                { username: 'Charlie', score: 100 },
                { username: 'David', score: 200 },
                { username: 'Eve', score: 400 },
                { username: 'Frank', score: 250 },
                { username: 'Grace', score: 350 },
                { username: 'Henry', score: 150 },
                { username: 'Isabella', score: 450 },
                { username: 'Jack', score: 100 },
                { username: 'Kate', score: 550 },
                { username: 'Liam', score: 50 },
                { username: 'Mia', score: 600 },
                { username: 'Nathan', score: 50 },
            ].sort((a, b) => b.score - a.score),
        };
    },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

:root {
    --primary-color: #4a86f9; /* Dominant color (Blue) */
    --secondary-color: #ef5cda; /* Complementary color 1 (Pink) */
    --tertiary-color: #4b84e1; /* Complementary color 2 (Dark Blue) */
    --quaternary-color: #f27b5c; /* Complementary color 3 (Orange) */
    --quinary-color: #ab4be1; /* Complementary color 4 (Purple) */
    --background-color: #ffffff;
    --text-color: #333333;
    --border-color: #dddddd;
    --hover-color: #f5f5f5;
    --transition-duration: 0.3s;
}

#leaderboard-container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--tertiary-color));
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: fadeIn var(--transition-duration) ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

h1 {
    text-align: center;
    color: var(--background-color);
    font-weight: 500;
    margin-bottom: 20px;
    animation: slideIn var(--transition-duration) ease-in-out;
}

@keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

table {
    width: 100%;
    border-collapse: collapse;
    animation: fadeIn var(--transition-duration) ease-in-out;
}

th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    transition: background-color var(--transition-duration), color var(--transition-duration);
}

th {
    background-color: var(--primary-color);
    color: #fff;
    text-align: center;
    cursor: pointer;
}

th:hover {
    background-color: var(--secondary-color);
}

tr:nth-child(even) {
    background-color: var(--hover-color);
}

tr:hover {
    background-color: var(--quaternary-color);
    color: #fff;
    transform: scale(1.02);
}

tr td:first-child {
    text-align: center;
    font-weight: bold;
}

tbody tr:hover td {
    color: #fff;
}

tr {
    transition: transform var(--transition-duration), background-color var(--transition-duration), color var(--transition-duration);
}

</style>
