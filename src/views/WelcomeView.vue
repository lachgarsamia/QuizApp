<template>
  <div class="container-fluid p-0">
    <!-- Header Section -->
    <header class="d-flex justify-content-between align-items-center p-4 bg-dark text-white">
      <img src="@/assets/logo-OYJ34ERC.png" alt="QuizzApp Logo" class="logo">
      <router-link to="/signup">
        <button class="btn btn-outline-light btn-lg">Sign Up</button>
      </router-link>
    </header>

    <!-- Hero Section -->
    <section class="hero d-flex flex-column align-items-center justify-content-center text-center text-white position-relative w-100">
      <div class="hero-content">
        <img src="@/assets/logo-OYJ34ERC.png" alt="QuizzApp Logo" class="logo mb-4">
        <h1 class="display-3 fw-bold" editable="inline">Welcome to QuizzApp</h1>
        <p class="lead" editable="inline">Test your knowledge with our engaging quizzes!</p>
        <router-link to="/start-quiz">
          <button class="btn btn-primary btn-lg mt-4">Start Quiz</button>
        </router-link>
      </div>
    </section>

    <!-- Swiper Section -->
    <section class="quizzes py-5">
      <div class="container">
        <h2 class="text-center mb-5" editable="inline">Popular Quizzes</h2>
        <div class="swiper-container-wrapper">
          <div class="swiper-container position-relative">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="quiz in quizzes" :key="quiz.id">
                <div class="card p-3 border-0 shadow-lg">
                  <div class="card-body text-center">
                    <h5 class="card-title" editable="inline">{{ quiz.title }}</h5>
                    <p class="card-text" editable="inline">Challenge yourself with our {{ quiz.title }}.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features py-5 bg-light">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-4 mb-4">
            <div class="feature-icon mb-3">
              <i class="bi bi-lightbulb-fill"></i>
            </div>
            <h4 editable="inline">Engaging Quizzes</h4>
            <p class="text-muted" editable="inline">Discover a wide variety of quizzes across different topics.</p>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-icon mb-3">
              <i class="bi bi-trophy-fill"></i>
            </div>
            <h4 editable="inline">Competitive Fun</h4>
            <p class="text-muted" editable="inline">Compete with friends and climb the leaderboard.</p>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-icon mb-3">
              <i class="bi bi-people-fill"></i>
            </div>
            <h4 editable="inline">Community Driven</h4>
            <p class="text-muted" editable="inline">Join a community of quiz enthusiasts.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="text-center py-4 bg-dark text-white">
      <img src="@/assets/logo-OYJ34ERC.png" alt="QuizzApp Logo" class="logo mb-2">
      <p editable="inline">&copy; 2024 QuizzApp. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

export default {
  name: 'WelcomePage',
  setup() {
    const quizzes = ref([
      { id: 1, title: 'Science Quiz' },
      { id: 2, title: 'Math Quiz' },
      { id: 3, title: 'History Quiz' },
      { id: 4, title: 'Geography Quiz' },
      { id: 5, title: 'Philosophy Quiz' },
      { id: 6, title: 'Physics Quiz' },
      { id: 7, title: 'Poetry Quiz' },
      { id: 8, title: 'Arts Quiz' },
    ]);

    onMounted(() => {
      new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
      });
    });

    return {
      quizzes,
    };
  },
};
</script>

<style scoped>
/* General Styling */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

/* Header Styling */
header {
  background-color: #212529;
  padding: 1rem 2rem;
  z-index: 10;
  position: relative;
}

.logo {
  width: 80px;
  height: auto;
}

.btn-outline-light {
  border: 2px solid #fff;
}

.btn-outline-light:hover {
  background-color: #fff;
  color: #212529;
}

.hero {
  height: 90vh;
  background: linear-gradient(15deg, #ff6ec4, #7873f5);
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 5;
  padding: 4%;
  margin-left: 80px;
  width: 100%;
  padding-left: 10%;
}

.hero-content {
  max-width: 90%; 
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.5rem;
}

.hero button {
  background-color: #ff6ec4;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  border-radius: 25px;
  transition: transform 0.3s ease;
}

.hero button:hover {
  transform: scale(1.05);
}

.quizzes {
  padding: 3rem 0;
  background-color: #f8f9fa;
}

.swiper-container-wrapper {
  max-width: 100%;
  margin: 0 auto;
}

.swiper-container {
  width: 100%;
  height: auto;
  z-index: 1;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.card {
  width: 100%;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-body {
  text-align: center;
  padding: 20px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #555;
}

.swiper-pagination {
  bottom: 10px;
}

.swiper-button-next,
.swiper-button-prev {
  color: #000;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 10px;
  transition: background-color 0.3s ease;
  top: 50%;
  transform: translateY(-50%);
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: rgba(255, 255, 255, 1);
}

.features {
  background-color: #f8f9fa;
}

.feature-icon {
  font-size: 2rem;
  padding: 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6ec4, #7873f5);
  color: white;
}

.feature-icon i {
  font-size: 2rem;
}

footer {
  background-color: #212529;
  color: #fff;
  padding: 1rem 0;
}
</style>
