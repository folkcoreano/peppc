<script setup lang="ts">
import {version} from "@/stores/version";
import {useRegisterSW} from "virtual:pwa-register/vue";

const {offlineReady, needRefresh, updateServiceWorker} = useRegisterSW();

const close = async () => {
	offlineReady.value = false;
	needRefresh.value = false;
};
</script>

<template>
	<div
		v-if="offlineReady || needRefresh"
		class="right-0 bottom-0 fixed z-1 bg-indigo-6 outline-indigo-4 py-2 px-3 m-3 transition-all shadow outline outline-2 rounded-sm"
		role="alert"
	>
		<div class="flex flex-col gap-2">
			<div class="message font-bold">
				<span v-if="offlineReady">Prontinho para funcionar offline!</span>
				<span v-else>Nova versão dispinível: {{ version }}</span>
			</div>
			<button
				class="pwa-button"
				v-if="needRefresh"
				@click="updateServiceWorker()"
			>
				Atualizar
			</button>
			<button
				class="pwa-button"
				@click="close"
			>
				Fechar
			</button>
		</div>
	</div>
</template>

<style>
.pwa-button {
	@apply bg-indigo-5 outline-indigo-4 py-1.5 px-3 transition-all font-bold uppercase shadow outline outline-2 rounded-sm;
}
</style>
