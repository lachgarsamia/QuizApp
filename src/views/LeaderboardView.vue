<template>
  <NavbarSignedin />
  <div class="leaderboard-container">
    <h1 class="leaderboard-title">Leaderboard</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
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
import NavbarSignedin from '@/components/NavbarSignedin.vue';
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
  components: { NavbarSignedin },
};
</script>

<style scoped>

.leaderboard-container {
  background: linear-gradient(135deg,#429af8, #ab9cfc);
  color: #333333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
  max-width: 800px;
  margin: 100px auto;
  padding: 2rem;
}

.table tbody tr:hover {
  background-color: #429af8;
  color: #fff;
  transform: scale(1.02);
} 

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.leaderboard-title {
  color: #fff;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0;
}

.table td, th {
  padding: 10px;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
}

.table tbody tr td:first-child {
  text-align: center;
  font-weight: bold;
}

.table tbody tr:hover td {
  background-color: #EF42BA;
  cursor: pointer;
}

.table tbody tr {
  transition: transform 0.3s, background-color 0.3s, color 0.3s;
}
</style>
