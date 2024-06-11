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

import { isLogged, waitForAuthInit } from '@/composables/getUser'; 

const routes = [
  { path: '/welcome', component: WelcomeView, meta: {logged: false} },
  { path: '/signup', component: SignUpView},
  { path: '/login', component: LoginView },
  { path: '/home', component: HomeSignedInView, meta: {logged: true}},
  { path: '/profile/:id', component: ProfileView, meta: {logged: true}},
  { path: '/leaderboard', component: LeaderboardView, meta: {logged: true}},
  { path: '/createquiz', component: CreateQuizView, meta: {logged: true}},
  { path: '/editprofile/:id', component: EditProfileView, meta: {logged: true}},
  { path: '/', redirect: '/redirect' },
  {
    path: '/quizquestion/:questionIndex',
    name: 'QuizQuestion',
    component: () => import('@/components/QuizQuestion.vue'),
    props: true,
    meta: {logged: false}},
  {
    path: '/quiz/:id',
    name: 'quiz',
    component: QuizView, meta: {logged: false}
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const logged = to.matched.some(record => record.meta.logged);

  waitForAuthInit().then(() => {
    
    if (to.path === '/redirect') {
      if (isLogged()) {
        next({path: '/home'});
        return;
      } else {
        next({path: '/welcome'});
        return;
      }
    } 

    if (logged && !isLogged()) {
      alert("You need to be logged in to access this page");
      next({path: '/login'});
    } else {
      next();
    }
  });
});

export default router;





