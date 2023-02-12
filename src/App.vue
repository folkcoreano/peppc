<script setup>
import Disclaimer from "@/components/Disclaimer.vue";
import MainComponent from "@/components/MainComponent.vue";
import { useHelperStore } from "@/stores/helper";

const showHelp = useHelperStore();

const comp = shallowRef(MainComponent);

watchEffect(() => {
  showHelp.help ? (comp.value = Disclaimer) : (comp.value = MainComponent);
});
</script>

<template>
  <header class="flex flex-col gap-2 justify-center items-center py-3">
    <iconify-icon class="text-[2.55rem]" icon="twemoji:compass" />
    <h1 class="text-2xl font-bold uppercase select-none">PEPPC</h1>
    <h2 class="text-xl font-bold text-center uppercase select-none">
      plano econômico para pessoas cinéfilas
    </h2>
  </header>
  <main class="flex-1 px-2">
    <Transition mode="out-in">
      <KeepAlive>
        <Component :is="comp" />
      </KeepAlive>
    </Transition>
  </main>
  <footer
    class="text-lg font-bold uppercase flex flex-wrap gap-2 justify-center items-center py-3"
  >
    <button
      @click="showHelp.help = !showHelp.help"
      class="text-lg font-bold uppercase cursor-pointer underline"
    >
      sobre
    </button>
    <p>&sdot;</p>
    <p>
      desenvolvido por
      <a
        class="underline"
        target="_blank"
        href="https://twitter.com/folkcoreano"
        >@folkcoreano</a
      >.
    </p>
  </footer>
</template>
