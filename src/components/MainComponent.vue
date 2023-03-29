<script setup>
import services from "@/stores/services.json";

const savedServices = useLocalStorage("services", []);

const monthPrice = ref("");
const periodPrice = ref("");

const finalUrl = ref("");

const justWatch = ref("https://justwatch.com/br");
const justWatchSolo = ref(justWatch.value + "/provedor/");
const justWatchMulti = ref(justWatch.value + "?providers=");

const colors = [
	{type: "Fixo", color: "bg-green-400", period: 12},
	{type: "Rotativo", color: "bg-blue-400", period: 6},
	{type: "Pontual", color: "bg-purple-400", period: 4},
];

const addService = (service) => {
	if (savedServices.value.some((e) => e.code === service.code)) {
		savedServices.value.splice(
			savedServices.value.findIndex((e) => e.code === service.code),
			1,
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
	return savedServices.value.flatMap((e) => e.code).some((e) => e === id)
		? "filter grayscale-0 opacity-100 border-2 border-green-500"
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
	Intl.NumberFormat("pt-BR", {currency: "BRL", style: "currency"}).format(
		price,
	);

const checkPeriod = (type) => colors.find((e) => e.period === type)?.color;

const checkPeriodTime = (type) => {
	if (colors.some((c) => c.type === type)) {
		return colors.find((e) => e.type === type)?.period;
	} else {
		return +type;
	}
};

const iconPath = (icon) => `/icons/${icon}.webp`;

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
		(e) => e.name === service.name,
	);
	const isEqual = JSON.stringify(item.plans) === JSON.stringify(service.plans);

	if (!isEqual) {
		savedServices.value.at(itemIndex).plans = item.plans;
	}
}
</script>

<template>
	<div class="flex flex-col gap-3">
		<div class="flex flex-row flex-wrap gap-2 text-lg justify-end my-1">
			<div class="font-bold uppercase text-lg flex-1">serviços:</div>
			<button
				v-if="finalUrl"
				class="cursor-pointer border-r-2 border-b-2 border-green-8 uppercase bg-green-5 font-bold px-2 rounded active:(bg-green-6 border-r-0 border-b-0 px-2.2)"
				@click="copyServices"
				@keydown.space.enter="copyServices"
			>
				copiar
			</button>

			<button
				class="cursor-pointer border-r-2 border-b-2 border-violet-8 uppercase bg-violet-5 font-bold px-2 rounded active:(bg-violet-6 border-r-0 border-b-0 px-2.2)"
				@click="pasteServices"
				@keydown.space.enter="pasteServices"
			>
				colar
			</button>

			<button
				v-if="finalUrl"
				class="cursor-pointer border-r-2 border-b-2 border-red-8 uppercase bg-red-5 font-bold px-2 rounded active:(bg-red-6 border-r-0 border-b-0 px-2.2)"
				@click="clearServices"
				@keydown.space.enter="clearServices"
			>
				apagar
			</button>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex flex-row flex-wrap justify-start gap-2">
				<div
					class="cursor-pointer"
					@click="addService(service)"
					v-for="service of services.filter((e) => !e.combo)"
					tabindex="0"
					@keydown.space.enter="addService(service)"
				>
					<img
						width="55"
						height="55"
						class="rounded-lg transition-all ease-linear"
						:class="checkService(service.code)"
						:src="iconPath(service.short_code)"
						:alt="service.name"
						:title="service.name"
					/>
				</div>
			</div>

			<div class="font-bold uppercase text-lg">combos:</div>

			<div class="flex flex-col gap-2">
				<div
					class="cursor-pointer flex flex-row flex-wrap gap-2 items-center justify-start"
					@click="addService(service)"
					v-for="service of services.filter((e) => e.combo)"
					tabindex="0"
					@keydown.space.enter="addService(service)"
				>
					<div class="flex flex-row items-center gap-1 flex-wrap">
						<img
							width="35"
							height="35"
							:class="checkService(service.code)"
							class="rounded transition-all ease-linear"
							v-for="img in service.short_code"
							:src="iconPath(img)"
							alt=""
						/>
					</div>

					<div class="font-bold uppercase">{{ service.name }}</div>
				</div>
			</div>
		</div>

		<div class="flex flex-row flex-wrap gap-1 justify-between items-center">
			<div
				v-if="savedServices.length"
				class="py-2 font-bold uppercase text-lg"
			>
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
				class="cursor-pointer border-r-2 border-b-2 border-green-8 uppercase bg-green-5 font-bold px-3 py-1 text-lg rounded active:(bg-green-6 border-r-0 border-b-0)"
			>
				checar catálogo
			</a>
		</div>

		<div
			v-if="
				savedServices.length > 0 && savedServices.filter((e) => e.price).length
			"
			class="flex flex-col gap-2 py-3 text-lg"
		>
			<div
				class="uppercase font-bold flex flex-row justify-between border-dotted border-b-2 border-b-white"
			>
				<span>média por mês</span>

				<span>{{ formatPrice(periodPrice / 12) }}</span>
			</div>

			<div
				class="uppercase font-bold flex flex-row justify-between border-dotted border-b-2 border-b-white"
			>
				<span>total do ano</span>

				<span>{{ formatPrice(periodPrice) }}</span>
			</div>
		</div>

		<div class="flex flex-col gap-3">
			<div
				class="flex flex-col gap-1 font-bold"
				v-for="service of savedServices"
			>
				<div class="flex flex-col gap-1 uppercase">
					<div class="flex flex-row gap-1 items-center flex-wrap">
						<template v-if="service.combo">
							<img
								v-for="img in service.short_code"
								width="35"
								height="35"
								class="rounded-md"
								:src="iconPath(img)"
								:alt="service.name"
							/>
						</template>

						<template v-else>
							<img
								width="35"
								height="35"
								class="rounded-md"
								:src="iconPath(service.short_code)"
								:alt="service.name"
							/>
						</template>
					</div>

					<div class="flex flex-row gap-1">
						<div class="flex-1">
							{{ service.name }}
						</div>

						<div v-if="service.type">
							{{ formatPrice(service.price * checkPeriodTime(service.type)) }}
							em
							{{
								checkPeriodTime(service.type) +
								(checkPeriodTime(service.type) > 1 ? " meses" : " mês")
							}}
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<div class="flex flex-row gap-1">
						<select
							class="flex-1 select"
							v-model="service.price"
						>
							<option value="">selecionar plano</option>

							<option
								v-for="plan of service.plans"
								:value="plan.price"
							>
								{{ plan.name }}
							</option>
						</select>

						<label
							class=""
							for="price"
						>
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

					<div class="flex flex-row gap-1">
						<select
							id="selmeses"
							name="selmeses"
							class="flex-1 select"
							v-model="service.type"
							:class="checkPeriod(service.type)"
						>
							<option value="">selecionar período</option>
							<option
								v-for="tp of colors"
								:value="tp.period"
							>
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
