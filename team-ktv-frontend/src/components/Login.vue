<template>
  <div class="innova_bg">
    <!-- Abstract floating shapes -->
    <div class="abstract-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
      <div class="shape shape-6"></div>
    </div>
    <form class="login" @submit.prevent>
        <img :src="logo" class="innova_logo">
        <div class="SignIn">
            <input class="username" type="text" v-model="username" placeholder="Username" required>
            <input class="password" type="password" v-model="password" placeholder="Password" required>
            <div class="check">
                <input class="checkbox" type="checkbox" v-model="rememberMe">
                <p class="remember">Remember me</p>
            </div>
            <p v-if="error" style="color:red;">{{ error }}</p>
            <button class="loginbtn" type="button" @click="login">LOGIN</button>
        </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from 'src/assets/logo.svg';

const router = useRouter();
const username = ref('');
const password = ref('');
const rememberMe = ref(true);
const error = ref('');

async function login() {
  try {
    const res = await fetch(`${process.env.API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    });
    const data = await res.json();
    if (data.status === 'success') {
      localStorage.setItem('token', data.user_info._id);
      localStorage.setItem('logged_in_user', data.user_info._id);
      localStorage.setItem('user_role', data.user_info.user_role);
      localStorage.setItem(
        'user_name',
        `${data.user_info.firstname ?? ''} ${data.user_info.lastname ?? ''}`.trim()
      );
      router.push('/dashboard');
    } else {
      error.value = data.message;
    }
  } catch (err) {
    console.error('Login error:', err);
    error.value = 'Login failed. Please try again.';
  }
}
</script>

<style lang="scss" scoped src="./Login.scss"></style>
