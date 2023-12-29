<script setup>
import ESPRoomList from "@/components/RoleComponent.vue";

</script>

<template>
<section class="d-flex bg-danger app-bg" style="height: 100vh">
  <article class="container border rounded position-relative p-2 justify-content-center m-auto" >
    <e-s-p-room-list />
  </article>
</section>
</template>

<style scoped>
.app-bg{
  height: 100vh;
  background: url("@/assets/mohammad-alizade-unsplash.jpg") no-repeat center;
  object-fit: contain;
}
</style>
