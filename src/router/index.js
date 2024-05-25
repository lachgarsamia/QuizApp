import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '@/views/WelcomeView.vue';
import SignUpView from '@/views/SignupView.vue';
import LoginView from '@/views/LoginView.vue';
import HomeSignedInView from '@/views/HomeSignedInView.vue';
import ProfileView from '@/views/ProfileView.vue';

const routes = [
  { path: '/welcome', component: WelcomeView },
  { path: '/signup', component: SignUpView },
  { path: '/login', component: LoginView },
  { path: '/home', component: HomeSignedInView},
  { path: '/profile', component: ProfileView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
