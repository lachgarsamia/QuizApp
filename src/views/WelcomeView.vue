<template>
  <div class="container text-center my-5">
    <h1 class="mb-4">Welcome to QuizzApp</h1>
    <router-link to="/signup">
      <button class="btn btn-primary mb-4">Sign Up</button>
    </router-link>
    <div class="carousel-container">
      <div class="carousel" ref="carousel">
        <div
          v-for="(quiz, index) in quizzes"
          :key="quiz.id"
          class="carousel-item"
          :class="{ active: index === activeIndex }"
        >
          <div class="card p-3">
            <div class="card-body">
              <h5 class="card-title">{{ quiz.title }}</h5>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" @click="prev">‹</button>
      <button class="carousel-control-next" @click="next">›</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'WelcomePage',
  setup() {
    const quizzes = ref([
      { id: 1, title: 'Science Quiz' },
      { id: 2, title: 'Math Quiz' },
      { id: 3, title: 'History Quiz' },
      { id: 4, title: 'Geography Quiz' },
      { id: 5, title: 'Philo Quiz' },
      { id: 6, title: 'Physics Quiz' },
      { id: 7, title: 'Poetry Quiz' },
      { id: 8, title: 'Arts Quiz' },
    ]);

    const activeIndex = ref(0);
    let autoplayInterval = null;

    const next = () => {
      activeIndex.value = (activeIndex.value + 1) % quizzes.value.length;
    };

    const prev = () => {
      activeIndex.value =
        (activeIndex.value - 1 + quizzes.value.length) % quizzes.value.length;
    };

    const startAutoplay = () => {
      autoplayInterval = setInterval(next, 5000);
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    onMounted(() => {
      startAutoplay();
    });

    onBeforeUnmount(() => {
      stopAutoplay();
    });

    return {
      quizzes,
      activeIndex,
      next,
      prev,
    };
  },
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  margin-top: 40px;
}

.carousel {
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
}

.carousel-item {
  flex: 0 0 33.3333%;
  transition: transform 1s ease;
  display: none;
}

.carousel-item.active {
  display: block;
  transform: translateX(0);
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.carousel-control-prev {
  left: 10px;
}

.carousel-control-next {
  right: 10px;
}

.card {
  background-color: #f9f9f9;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-title {
  font-size: 18px;
}
</style>
