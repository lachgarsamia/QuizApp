<template>
  <div class="carousel-container">
    <swiper :slides-per-view="3" :space-between="30" loop>
      <swiper-slide v-for="quiz in quizzes" :key="quiz.id">
        <div class="quiz-card">{{ quiz.title }}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  name: 'QuizCarousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    quizzes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.carousel-container {
  margin-top: 40px;
}

.quiz-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 18px;
}
</style>
