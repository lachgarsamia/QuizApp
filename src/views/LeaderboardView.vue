<template>
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
        <tr v-for="(player, index) in players" :key="player.username">
        <td>{{ index + 1 }}</td>
        <td>{{ player.username }}</td>
        <td>{{ player.score }}</td>
        </tr>
    </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
        players: [
            { username: 'Alice', score: 100 },
            { username: 'Bob', score: 200 },
            { username: 'Charlie', score: 300 },
        ],
        };
    },
};
</script>