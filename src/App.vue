<script setup>
import Disclaimer from "./components/Disclaimer.vue";
import MainComponent from "./components/MainComponent.vue";

const showHelp = ref(false);
const comp = shallowRef(MainComponent);

const changeThing = () => {
  showHelp.value = !showHelp.value;
  showHelp.value ? (comp.value = Disclaimer) : (comp.value = MainComponent);
};
</script>

<template>
  <header class="flex flex-col gap-2 justify-center items-center py-3">
    <iconify-icon class="text-[2.55rem]" icon="twemoji:compass" />
    <h1 class="text-2xl font-bold uppercase select-none">PEPPC</h1>
    <h2 class="text-xl font-bold text-center uppercase select-none">
      plano econômico para pessoas cinéfilas
    </h2>
    <!-- <button @click="changeThing">ajuda?</button> -->
  </header>
  <main class="flex-1 px-2">
    <Transition mode="out-in">
      <Component :is="comp" />
    </Transition>
  </main>
  <footer class="flex flex-wrap gap-2 justify-center items-center py-3">
    <p class="text-lg font-bold uppercase">
      desenvolvido por
      <a target="_blank" href="https://twitter.com/folkcoreano">@folkcoreano</a>
    </p>
  </footer>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 180ms linear;
}

.v-enter-from,
.v-leave-to {
  translate: 0 1rem;
}
</style>
