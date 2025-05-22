<script setup>
import ESPRoomList from "@/components/RoleComponent.vue";
import AuthService from "@/composables/AuthService";
import {useRouter} from "vue-router";

const router = useRouter()

function logout() {
  AuthService.logout()
  router.push({
    name:'login'
  })
}

</script>

<template>
<section class="d-flex bg-dark app-bg overflow-y-auto" style="height: 100vh">
  <article class="container rounded position-relative p-2 justify-content-center m-auto" >
    <div class="d-flex px-3 py-2 rounded justify-content-between fw-bold text-dark shadow sticky-top" style="backdrop-filter: blur(3px); background-color: rgba(var(--bs-light-rgb),.5);">
      <span>SMART ROOM</span>
      <span>WELCOME</span>
      <div @click="logout" CLASS="link-danger">LOGOUT</div>
    </div>
    <e-s-p-room-list />
  </article>
</section>
</template>

<style scoped>
.app-bg{
  height: 100vh;
  background: url("https://res.cloudinary.com/dlusw5ukg/image/upload/v1703897740/my_smart_room/tianshu-liu-aqZ3UAjs_M4-unsplash_jzr9lg.jpg") no-repeat center;
  object-fit: contain;
}
</style>
