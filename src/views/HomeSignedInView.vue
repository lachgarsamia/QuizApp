<template>
    <NavbarSignedin />
    <div>
        <h1>Home</h1>
    </div>
</template>

<script>
import NavbarSignedin from '@/components/NavbarSignedin.vue';

export default {
    name: 'HomeSignedInView',
    components: {
        NavbarSignedin
    }
}
</script>