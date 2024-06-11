<template>
    <div id="leaderboard-container" class="container mt-5 p-4 rounded shadow">
      <h1 class="text-center">Leaderboard</h1>
      <table class="table table-striped table-hover">
        <thead class="thead-dark">
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
    --primary-color-start: #c5167f;
    --primary-color-end: #7873f5;
    --text-color: #333333;
    --hover-color: #f5f5f5;
    --transition-duration: 0.3s;
  }
  
  #leaderboard-container {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, var(--primary-color-start), var(--primary-color-end));
    color: var(--text-color);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: fadeIn var(--transition-duration) ease-in-out;
    max-width: 800px;
    margin: auto;
    padding: 2rem;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  h1 {
    color: var(--text-color);
    font-weight: 500;
    margin-bottom: 20px;
    animation: slideIn var(--transition-duration) ease-in-out;
  }
  
  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0;
  }
  
  .table th, .table td {
    padding: 10px;
    text-align: left;
    transition: background-color var(--transition-duration), color var(--transition-duration);
  }
  
  .table thead {
    background-color: var(--primary-color-start);
    color: #fff;
  }
  
  .table thead th {
    text-align: center;
  }
  
  .table tbody tr:nth-child(even) {
    background-color: var(--hover-color);
  }
  
  .table tbody tr:hover {
    background-color: var(--primary-color-end);
    color: #fff;
    transform: scale(1.02);
  }
  
  .table tbody tr td:first-child {
    text-align: center;
    font-weight: bold;
  }
  
  .table tbody tr:hover td {
    color: #fff;
  }
  
  .table tbody tr {
    transition: transform var(--transition-duration), background-color var(--transition-duration), color var(--transition-duration);
  }
  </style>
  