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
                <tr v-for="(player, index) in players.slice(0, 10)" :key="player.username" :class="{
                    'first-rank': index === 0,
                    'second-rank': index === 1,
                    'third-rank': index === 2,
                }">
                    <td>
                        <span class="rank-number">{{ index + 1 }}</span>
                        <span v-if="index === 0">🥇</span>
                        <span v-if="index === 1">🥈</span>
                        <span v-if="index === 2">🥉</span>
                    </td>
                    <td>{{ player.player }}</td>
                    <td>{{ player.score }}</td>
                </tr>
                <tr class="user-score">
                    <td>{{ user.index }}</td>
                    <td>{{ user.player }}</td>
                    <td>{{ user.score }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import NavbarSignedin from '@/components/NavbarSignedin.vue';
import { getUser } from "@/composables/getUser";
import { app } from '@/firebase/config';
import getQuiz from '@/composables/getQuiz';

export default {
    data() {
        return {
            players: [],
            user: { player: '', score: 0, index: 0 },
        }
    },
    components: { NavbarSignedin },
    computed: {
        quizID() {
            return this.$route.params.id;
        },
    },
    async created() {
        const user = getUser();
        try {
            const { quiz, error, load } = getQuiz(this.quizID);
            await load();
            this.players = quiz.value.players.sort((a, b) => b.score - a.score);
            if (user) {
                this.players.find((player, index) => {
                    if (player.id === user.uid) {
                        this.user.player = player.player;
                        this.user.score = player.score;
                        this.user.index = index + 1;
                    };
                })
            };
        } catch(error) {
        console.log(error);
    }
}
};
</script>

<style scoped>
.leaderboard-container {
    background: linear-gradient(135deg, #429af8, #ab9cfc);
    color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    margin: 60px auto;
    padding: 2.5rem;
    animation: fadeIn 0.6s ease-in-out;
}

.leaderboard-title {
    color: #ffffff;
    font-weight: 800;
    font-size: 2.5rem;
    margin-bottom: 30px;
    text-align: center;
    animation: slideIn 0.6s ease-in-out;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0;
}

.table th,
.table td {
    padding: 15px;
    text-align: center;
    transition: background-color 0.3s, color 0.3s;
}

.table thead th {
    background-color: #429af8;
    /* Dodger Blue */
    color: #ffffff;
    font-weight: 700;
    font-size: 1.2rem;
    text-transform: uppercase;
}

.table tbody tr {
    background-color: #ffffff;
    color: #333;
    border-bottom: 1px solid #ccc;
}

.table tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
}

.table tbody tr:hover {
    background-color: #ff1493;
    color: #ffffff;
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.rank-number {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    background-color: #fff;
    color: #333;
    font-weight: bold;
    margin-right: 5px;
}

.first-rank {
    background-color: #ffd700;
    color: #333;
    font-weight: bold;
    animation: shine 1s infinite;
}

.second-rank {
    background-color: #c0c0c0;
    color: #333;
    font-weight: bold;
    animation: shine 1s infinite;
}

.third-rank {
    background-color: #cd7f32;
    color: #333;
    font-weight: bold;
    animation: shine 1s infinite;
}

.user-score {
    background-color: #ccc;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
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

@keyframes shine {
    0% {
        box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
    }

    50% {
        box-shadow: 0 0 20px rgba(255, 215, 0, 1);
    }

    100% {
        box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
    }
}
</style>
