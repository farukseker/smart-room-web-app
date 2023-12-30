<script setup>
import {ref} from 'vue'
import AuthService from "@/composables/AuthService";
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const remember_me = ref(false)
const login_submit_btn = ref()

const otp_code = ref('')
const otp_form = ref(false)
const otp_submit_btn = ref()

const debug = process.env.VUE_APP_DEBUG
const test_user = {
  username: process.env.VUE_APP_TEST_USERNAME,
  password: process.env.VUE_APP_TEST_PASSWORD
}



const send_login_request = ref(false)
const send_otp_request = ref(false)
const router = useRouter()

async function send_login() {
  send_login_request.value = true
  const login_data = await AuthService.login({
    username:username.value, password:password.value,remember_me: remember_me
  })
  console.log(login_data)
  if  (login_data.has_otp){
    otp_form.value = true
  }else if (login_data.login) {
    go_home_page()
  } else {
    await shake_form_btn(login_submit_btn.value)
  }
  send_login_request.value = false

}

async function send_otp() {
  send_otp_request.value = true
  try {
    const status = await AuthService.otp(otp_code.value)
    if (status !== 200){
      await shake_form_btn(otp_submit_btn.value)
    } else {
      go_home_page()
    }
  } catch (e) {
    Promise.reject(e)
  }
  send_otp_request.value = false
}

async function shake_form_btn(btn){
  btn.classList.add('form-error')
  await sleep(500)
  btn.classList.remove('form-error')
}

function go_home_page(){
  router.push({'name': 'home'})
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function use_fake_login(){
  username.value = test_user.username
  password.value = test_user.password
  send_login()
}

</script>

<template>
<section class="d-flex" style="background:url('https://res.cloudinary.com/dlusw5ukg/image/upload/v1703897850/my_smart_room/hannah-montez-2VslRz5G8fo-unsplash_drtt8m.jpg')  no-repeat center; object-fit: cover; height: 100vh">
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
      <div>
        <input v-model="remember_me" type="checkbox" id="remember_me">
        <label class="fw-semibold ms-1 text-danger" for="remember_me">remember me! (15day)</label>
      </div>
      <hr>
      <button ref="login_submit_btn" class="btn btn-primary w-100 shadow border" type="submit" style="border-color: rgba(255,255,255,0.53)!important;" :disabled="send_login_request">
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
      <button ref="otp_submit_btn" class="btn btn-primary w-100 shadow border" style="border-color: rgba(255,255,255,0.53)!important;" type="submit">
        <span v-if="send_otp_request" class="spinner-grow spinner-grow-sm text-light" role="status">
          <span class="sr-only">Loading...</span>
        </span>
        <span v-else>SEND</span>
      </button>
    </form>
    <button v-if="debug" @click="use_fake_login" class="btn btn-danger W-100">LOGIN</button>
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

.form-error{
  animation: shake 0.5s;
  animation-iteration-count: infinite;
  background-color: var(--bs-danger);
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
