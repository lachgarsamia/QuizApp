import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '@/views/WelcomeView.vue';
import SignUpView from '@/views/SignupView.vue';
import LoginView from '@/views/LoginView.vue';
import HomeSignedInView from '@/views/HomeSignedInView.vue';
import ProfileView from '@/views/ProfileView.vue';
import LeaderboardView from '@/views/LeaderboardView.vue';
import CreateQuizView from '@/views/CreateQuizView.vue';
import QuizView from '@/views/QuizView.vue';
import EditProfileView from '@/views/EditProfileView.vue';

const routes = [
  { path: '/welcome', component: WelcomeView },
  { path: '/signup', component: SignUpView },
  { path: '/login', component: LoginView },
  { path: '/home', component: HomeSignedInView},
  { path: '/profile/:id', component: ProfileView},
  { path: '/leaderboard', component: LeaderboardView},
  { path: '/createquiz', component: CreateQuizView},
  { path: '/editprofile/:id', component: EditProfileView},
  { path: '/', redirect: '/welcome' },
  {
    path: '/quiz/:questionIndex',
    name: 'QuizQuestion',
    component: () => import('@/components/QuizQuestion.vue'),
    props: true,
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;





