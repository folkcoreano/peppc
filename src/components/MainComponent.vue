<script setup>
import services from "@/stores/services.json";

const savedServices = ref(useLocalStorage("services", []));

const monthPrice = ref("");
const periodPrice = ref("");

const finalUrl = ref("");

const justWatch = ref("https://justwatch.com/br");
const justWatchSolo = ref(justWatch.value + "/provedor/");
const justWatchMulti = ref(justWatch.value + "?providers=");

const colors = [
  { type: "Fixo", color: "bg-green-400", period: 12 },
  { type: "Rotativo", color: "bg-blue-400", period: 6 },
  { type: "Pontual", color: "bg-purple-400", period: 4 },
];

const addService = (service) => {
  if (savedServices.value.some((e) => e.short_code === service.short_code)) {
    savedServices.value.splice(
      savedServices.value.findIndex((e) => e.short_code === service.short_code),
      1
    );
  } else {
    savedServices.value.push(service);
  }

  if (savedServices.value.length > 0) {
    if (savedServices.value.length > 1) {
      finalUrl.value = `${justWatchMulti.value}${[
        ...new Set(savedServices.value.flatMap((e) => e.short_code).sort()),
      ]}`;
    } else {
      if (service.combo) {
        finalUrl.value = `${justWatchMulti.value}${[
          ...new Set(savedServices.value.flatMap((e) => e.short_code).sort()),
        ]}`;
      } else {
        finalUrl.value = `${justWatchSolo.value}${savedServices.value[0].code}`;
      }
    }
  } else {
    finalUrl.value = "";
  }
};

const checkService = (id) => {
  return savedServices.value.flatMap((e) => e.short_code).some((e) => e === id)
    ? "filter grayscale-0 opacity-100 border-[2px] border-green-500"
    : "filter grayscale-100 opacity-50";
};

const clearServices = () => (savedServices.value = []);

const copyServices = async () =>
  await navigator.clipboard.writeText(localStorage.getItem("services"));

const pasteServices = async () => {
  const item = await navigator.clipboard.readText();
  if (item.includes('[{"')) {
    savedServices.value = JSON.parse(await navigator.clipboard.readText());
  }
};

const formatPrice = (price) =>
  Intl.NumberFormat("pt-BR", { currency: "BRL", style: "currency" }).format(
    price
  );

const checkPeriod = (type) => colors.find((e) => e.period === type)?.color;

const checkPeriodTime = (type) => {
  if (colors.some((c) => c.type === type)) {
    return colors.find((e) => e.type === type)?.period;
  } else {
    return +type;
  }
};

const iconPath = (icon) =>
  `https://ik.imagekit.io/yonas/PEPPC/${icon}.webp?tr=w-100`;

watchEffect(() => {
  if (savedServices.value.length > 0) {
    if (savedServices.value.filter((e) => e.price).length) {
      monthPrice.value = savedServices.value
        .filter((e) => e.price)
        .flatMap((e) => e.price)
        .reduce((a, b) => a + b);
    }

    periodPrice.value = savedServices.value
      .flatMap((e) => {
        if (colors.some((c) => c.type === e.type)) {
          return e.price * checkPeriodTime(e.type);
        } else {
          return e.price * +e.type;
        }
      })
      .reduce((a, b) => a + b);

    if (savedServices.value.length > 1) {
      finalUrl.value = `${justWatchMulti.value}${[
        ...new Set(savedServices.value.flatMap((e) => e.short_code).sort()),
      ]}`;
    } else {
      finalUrl.value = `${justWatchSolo.value}${savedServices.value[0].code}`;
    }
  } else {
    finalUrl.value = "";
  }
});

for (const service of savedServices.value) {
  const item = services.find((e) => e.name === service.name);
  const itemIndex = savedServices.value.findIndex(
    (e) => e.name === service.name
  );
  const isEqual = JSON.stringify(item.plans) === JSON.stringify(service.plans);

  if (!isEqual) {
    savedServices.value.at(itemIndex).plans = item.plans;
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-wrap justify-between items-center px-0.5 uppercase">
      <div class="py-2 font-bold">serviços</div>
      <div class="flex flex-col justify-center items-center">
        <div class="flex flex-wrap gap-1">
          <button
            v-if="finalUrl"
            class="cursor-pointer border-green-900 uppercase hover:bg-green-700 transition-all hover:border-r-[0px] border-r-[2px] border-b-[2px] hover:border-b-[0px] bg-green-500 font-bold px-2 rounded"
            @click="copyServices"
            @keydown.space.enter="copyServices"
          >
            copiar
          </button>
          <button
            class="cursor-pointer border-purple-900 uppercase hover:bg-purple-700 transition-all hover:border-r-[0px] border-r-[2px] border-b-[2px] hover:border-b-[0px] bg-purple-500 font-bold px-2 rounded"
            @click="pasteServices"
            @keydown.space.enter="pasteServices"
          >
            colar
          </button>
          <button
            v-if="finalUrl"
            class="cursor-pointer border-red-900 uppercase hover:bg-red-700 transition-all hover:border-r-[0px] border-r-[2px] border-b-[2px] hover:border-b-[0px] bg-red-500 font-bold px-2 rounded"
            @click="clearServices"
            @keydown.space.enter="clearServices"
          >
            apagar
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-1">
      <div
        class="cursor-pointer"
        @click="
          addService({
            code,
            name,
            plans,
            short_code,
            type,
            combo,
            price,
            period_price,
          })
        "
        v-for="{
          code,
          period_price,
          name,
          plans,
          short_code,
          type,
          combo,
          price,
        } of services.filter((service) => !service.combo)"
        tabindex="0"
        @keydown.space.enter="
          addService({
            code,
            name,
            plans,
            short_code,
            type,
            combo,
            price,
            period_price,
          })
        "
      >
        <img
          width="55"
          height="55"
          class="rounded-lg transition-all ease-linear"
          :class="checkService(short_code)"
          :src="iconPath(short_code)"
          :alt="name"
          :title="name"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-1 justify-between items-center">
      <div v-if="savedServices.length" class="py-2 font-bold uppercase">
        {{
          savedServices.length > 1
            ? `${savedServices.length} serviços`
            : `${savedServices.length} serviço`
        }}
      </div>
      <a
        v-if="finalUrl"
        :href="finalUrl"
        target="_blank"
        class="transition-all bg-green-600 border-green-900 hover:border-r-[0px] border-r-[2px] border-b-[2px] hover:border-b-[0px] hover:bg-green-700 transition-all uppercase font-bold rounded-md py-1 px-3"
      >
        checar catálogo
      </a>
    </div>

    <div
      v-if="
        savedServices.length > 0 && savedServices.filter((e) => e.price).length
      "
      class="flex flex-col gap-2 py-3"
    >
      <div class="borda">
        <span>média por mês</span>
        <span>{{ formatPrice(periodPrice / 12) }}</span>
      </div>

      <div class="borda">
        <span>total do ano</span>
        <span>{{ formatPrice(periodPrice) }}</span>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div
        class="flex flex-col gap-2 font-bold"
        v-for="service of savedServices"
      >
        <div class="flex gap-1 items-center uppercase">
          <div>
            <img
              width="35"
              height="35"
              class="rounded-md"
              :src="iconPath(service.short_code)"
              :alt="service.name"
            />
          </div>
          <div>
            {{ service.name }}
          </div>
          <div v-if="service.type">-</div>
          <div v-if="service.type">
            {{ formatPrice(service.price * checkPeriodTime(service.type)) }}
            em
            {{
              checkPeriodTime(service.type) +
              (checkPeriodTime(service.type) > 1 ? " meses" : " mês")
            }}
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex gap-1">
            <select class="flex-1 select" v-model="service.price">
              <option value="">selecionar plano</option>
              <option v-for="plan of service.plans" :value="plan.price">
                {{ plan.name }}
              </option>
            </select>

            <label class="" for="price">
              <input
                id="price"
                name="price"
                class="input"
                placeholder="preço..."
                type="number"
                min="0"
                v-model="service.price"
              />
            </label>
          </div>

          <div class="flex gap-1">
            <select
              id="selmeses"
              name="selmeses"
              class="flex-1 select"
              v-model="service.type"
              :class="checkPeriod(service.type)"
            >
              <option value="">selecionar período</option>
              <option v-for="tp of colors" :value="tp.period">
                {{ tp.type }}
              </option>
            </select>

            <label for="meses">
              <input
                name="meses"
                id="meses"
                class="input"
                placeholder="meses..."
                min="0"
                :type="
                  colors.some((e) => e.type === service.type)
                    ? 'text'
                    : 'number'
                "
                v-model="service.type"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  /* outline: 1px dotted red; */
  color: inherit;
}

.borda {
  border-bottom: 2px dotted #eee;
  @apply uppercase font-bold flex justify-between;
}

::-webkit-scrollbar {
  @apply bg-indigo-600 w-1.5;
}

::-webkit-scrollbar-thumb {
  @apply bg-indigo-400 cursor-pointer;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-indigo-300 cursor-pointer;
}

:where(html, body) {
  height: 100%;
}

.select {
  @apply text-black font-bold py-1 px-2 rounded-sm cursor-pointer;
}

.select > * {
  @apply text-black font-bold;
}

.input {
  max-width: 5.55rem;
  @apply text-black font-bold py-1 px-2 rounded-sm;
}
</style>
