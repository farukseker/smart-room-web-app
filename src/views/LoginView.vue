<script setup>
import {ref} from 'vue'
import AuthService from "@/composables/AuthService";
import { useRouter } from 'vue-router'


const username = ref('')
const password = ref('')
const otp_code = ref('')
const otp_form = ref(false)
const send_login_request = ref(false)
const router = useRouter()

async function send_login() {
  send_login_request.value = true
  const login_data = await AuthService.login({
    username:username.value, password:password.value
  })
  if  (login_data.has_otp){
    otp_form.value = true
  }else {
      router.push({'name': 'home'})
  }
  send_login_request.value = false

}

function send_otp() {
  AuthService.otp_test()
}

</script>

<template>
<section class="d-flex" style="background:url('https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')  no-repeat center; object-fit: cover; height: 100vh">
  <article class="justify-content-center  m-auto col-12 col-sm-10 col-md-4 col-lg-3" style="background: transparent!important;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);">
    <form @submit.prevent="send_login" v-if="!otp_form" class="border rounded p-3 shadow" style="border-color: rgba(255,255,255,0.53)!important;background: transparent!important;">
      <div class="mb-3">
        <label for="email_input" class="form-label text-light fw-bold">Email<span class="text-danger ms-1">*</span></label>
        <input v-model="username" type="text" class="form-control text-light fw-bold shadow" id="email_input" placeholder="username" required  style="border-color: rgba(255,255,255,0.53)!important;background: transparent!important;">
      </div>
      <div class="mb-3">
        <label for="password_input" class="form-label">Name<span class="text-dangertext-light fw-bold ms-1">*</span></label>
        <input v-model="password" type="password" class="form-control text-light fw-bold shadow" id="password_input" placeholder="password" required name="password" autocomplete="on" style="border-color: rgba(255,255,255,0.53)!important;background: transparent!important;">
      </div>
      <hr>
      <button class="btn btn-primary w-100 shadow border" type="submit" style="border-color: rgba(255,255,255,0.53)!important;" :disabled="send_login_request">
        <span v-if="send_login_request" class="spinner-grow spinner-grow-sm text-light" role="status">
          <span class="sr-only">Loading...</span>
        </span>
      <span v-else>Login</span>
      </button>
    </form>
    <form @submit.prevent="send_otp" v-else class="border rounded p-3 shadow" style="border-color: rgba(255,255,255,0.53)!important;background: transparent!important;">
      <div class="mb-3">
        <label for="otp_input" class="form-label text-light fw-bold">OTP<span class="text-danger ms-1">*</span></label>
        <input v-model="otp_code" type="number" class="form-control text-light fw-bold shadow" id="otp_input" placeholder="OTP :)" required  style="border-color: rgba(255,255,255,0.53)!important;background: transparent!important;">
      </div>
      <hr>
      <button class="btn btn-primary w-100 shadow border" style="border-color: rgba(255,255,255,0.53)!important;">SEND</button>
    </form>
  </article>
</section>
<footer class="position-absolute bottom-0 pb-3 w-100" style="background: linear-gradient(90deg, rgba(20,0,36,.01) 0%, rgba(45,171,228,.1) 50%, rgba(1,212,255,.01) 100%);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);">
  <article class="container fw-bold text-light">
      Pars Border Service!
  </article>
</footer>
</template>

<style scoped>
input {
  background: transparent !important;
}
label{
  color: var(--bs-primary);
}
</style>
