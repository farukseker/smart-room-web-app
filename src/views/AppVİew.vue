<script setup>
import ESPRoomList from "@/components/RoleComponent.vue";

</script>

<template>
<section class="d-flex bg-dark app-bg" style="height: 100vh">
  <article class="container border rounded position-relative p-2 justify-content-center m-auto" >
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
