<template>
  <div class="innova_bg">
    <form class="login" @submit.prevent>
        <img src="/src/assets/logo.svg" class="innova_logo">
        <div class="SignIn">
            <input class="username" type="text" v-model="username" placeholder="Username" required>
            <input class="password" type="password" v-model="password" placeholder="Password" required>
            <div class="check">
                <input class="checkbox" type="checkbox" label="Remember me" :model-value="true">
                <p class="remember">Remember me</p>
            </div>
            <p v-if="error" style="color:red;">{{ error }}</p>
            <button class="loginbtn" type="button" @click="login">LOGIN</button>
        </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');

async function login() {
  try {
    const res = await fetch('http://localhost:4001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    });
    const data = await res.json();
    console.log('Response:', data);
    if (data.status === 'success') {
      localStorage.setItem('logged_in_user', data.user_info._id);
      localStorage.setItem('user_role', data.user_info.user_role);
      if (data.user_info.user_role == 1) {
        router.push('/admin');
      } else {
        router.push('/');
      }
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
