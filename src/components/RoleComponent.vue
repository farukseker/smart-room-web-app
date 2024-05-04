<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";


const ws = ref()
const esp_list = ref([])
const connect = ref(false)
const router = useRouter()

onMounted(async ()=>{
  await connect_to_ws()

})

function esp_sync(list) {
  esp_list.value = list
}

function toggle_key(key_id, status){
  ws.value.send(JSON.stringify({
    "type":"change_key_status_request",
    "key_id":key_id,
    "status":!status
  }))
}

async function get_ws_accesses(){
  try {
    const response = await axios.post('ws/socket_accesses/')
    return response.data.accesses
  } catch (e) {
    router.push({
      name:'login'
    })
    Promise.reject(e)
  }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function connect_to_ws(){
  const token = await get_ws_accesses()
  if (token){
    ws.value = new WebSocket(process.env.VUE_APP_WS_PATH + token)
    ws.value.onopen = (ws)=>{
      connect.value = true
      console.log('esp')
      console.log(ws)
    }
    ws.value.onmessage = (event)=>{
      const data = JSON.parse(event.data)
      if (data.type === 'esp_sync'){
        esp_sync(data.esp_list)
      }
    }
    ws.value.onerror = event => {
      console.log(event)
    }
    ws.value.onclose =  async () =>{
      connect.value = false
      await sleep(1000)
      this.connect_to_ws()
    }
  }
}

</script>

<template>
<div v-if="connect">
<section class="card border mt-3" style="backdrop-filter: blur(3px); background-color: rgba(var(--bs-light-rgb),.5);" v-for="esp in esp_list" v-bind:key="esp.esp_id">
  <article class="card-header shadow-sm d-flex fw-bold text-light position-relative">
    <div style="min-width: max-content"><i class="fa-solid fa-person-shelter me-1"></i> {{ esp.name }} </div>
    <div class="w-100 text-center "></div>
    <div class="d-flex" style="min-width: max-content">
      <i class="fa-solid fa-window-minimize"></i>
      <i class="fa-regular fa-window-restore mx-2"></i>
      <i class="fa-regular fa-rectangle-xmark"></i>
    </div>
  </article>
  <article class="card-body row m-0">
    <div class="d-inline-block col-6 col-md-3 col-lg-2 col-xl-1 p-2" v-for="key in esp.keys" v-bind:key="key.id" @click="toggle_key(key.id, key.current)" >
      <div class="position-relative">
        <Transition>
          <img v-if="key.current" src="@/assets/sun.png" alt="light" class="shadow-lg rounded-circle position-absolute ratio ratio-1x1" style="/*width: 150px;height: 150px;*/text-shadow:rgb(240 240 240 / 35%) 1px 1px">
          <img v-else src="@/assets/moon.png" alt="dark" class="shadow rounded-circle position-absolute ratio ratio-1x1" style="/*width: 150px;height: 150px;*/text-shadow:rgb(240 240 240 / 35%) 1px 1px">
        </Transition>
      </div>
      <div class="ratio ratio-1x1" style="/*height: 150px;width: 150px*/"></div>
      <div class="text-center fw-bold m-auto h3 text-light mt-2" style="text-shadow:rgb(240 240 240 / 35%) 1px 1px">
        {{ key.name }}</div>
    </div>
  </article>
  <article class="card-footer position-relative d-flex">
   <div style="min-width: max-content">
      <span :class="(esp.is_connected ? 'text-success':'text-danger') + ' ' + 'fw-bold'">
       {{ esp.is_connected ?  'Connected' : 'Disconnected' }}
    </span>
     {{ esp.name }}
   </div>
    <div class="w-100 "></div>
    <div class="text-primary fw-semibold" style="min-width: max-content">
      <a class="link-primary" href="#">See Log</a>
    </div>
  </article>
</section>
</div>

<div v-else class="spinner-grow text-light" role="status">
  <span class="sr-only">Loading...</span>
</div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  visibility: visible;
  opacity: 0;
}
</style>
