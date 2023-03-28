<script setup>
import Disclaimer from "@/components/Disclaimer.vue";
import MainComponent from "@/components/MainComponent.vue";
import {useHelperStore} from "@/stores/helper";

const showHelp = useHelperStore();

const comp = shallowRef(MainComponent);

watchEffect(() => {
	showHelp.help ? (comp.value = Disclaimer) : (comp.value = MainComponent);
});
</script>

<template>
	<header class="flex flex-col gap-2 justify-center items-center py-3">
		<div class="pointer-events-none select-none">
			<img
				src="/192.png"
				alt="icon"
				class="max-w-[3.55rem]"
			/>
		</div>
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

	<ReloadPrompt />

	<footer class="flex flex-col items-center py-2">
		<div class="font-bold uppercase">versão: 1.5.1</div>
		<div class="flex flex-row flex-wrap gap-1 uppercase font-bold">
			<button
				@click="showHelp.help = !showHelp.help"
				class="cursor-pointer underline underline-offset-3 underline-2 uppercase font-bold"
			>
				sobre
			</button>

			<p>&sdot;</p>

			<p>
				desenvolvido por
				<a
					class="underline underline-2 underline-offset-3"
					target="_blank"
					href="https://folkcoreano.vercel.app/"
					>folkcoreano</a
				>
			</p>
		</div>
	</footer>
</template>
