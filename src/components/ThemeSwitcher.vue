<script setup lang="ts">
const themeON = () => {
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
};
const themeOFF = () => {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
  localStorage.setItem("theme", "light");
};

const changeTheme = () => {
  console.log(localStorage.getItem("theme"));

  if (localStorage.getItem("theme") === "dark") {
    themeOFF();
  } else {
    themeON();
  }
};

localStorage.getItem("theme") === "dark" ? themeON() : themeOFF();
</script>

<template>
  <button
    class="rounded-full bg-black text-white py-2 px-5"
    @click="changeTheme"
  >
    mudar
  </button>
</template>
