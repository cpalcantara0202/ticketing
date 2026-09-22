<template>
  <div class="innova_bg">
    <form class="login" @submit.prevent="login">
      <img src="assets/logo.svg" class="innova_logo" alt="logo">
      <div class="SignIn">
        <input class="username" type="text" v-model="form.username" placeholder="Username" required>
        <input class="password" type="password" v-model="form.password" placeholder="Password" required>
        <div class="check">
          <input class="checkbox" type="checkbox" :checked="true">
          <p class="remember">Remember me</p>
        </div>
        <p v-if="errors.login" style="color:red;">{{ errors.login }}</p>
        <button class="loginbtn" type="submit" :disabled="form.processing">LOGIN</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';

// Server-provided validation errors (from the /login POST handler).
defineProps({
  errors: { type: Object, default: () => ({}) },
});

const form = useForm({
  username: '',
  password: '',
});

function login() {
  form.post('/login');
}
</script>

<!-- No layout for the auth screen. -->
<script>
export default { layout: null };
</script>

<style lang="scss" scoped src="src/components/Login.scss"></style>
