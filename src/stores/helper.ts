import { defineStore } from "pinia";

export const useHelperStore = defineStore("helper", () => {
  const help = ref(false);

  return { help };
});
