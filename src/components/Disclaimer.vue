<script setup lang="ts">
const showHelp = useHelperStore();
</script>

<template>
	<div>
		<div class="flex flex-row items-center justify-center gap-1">
			<div class="py-6"></div>
			<button
				@click="showHelp.help = !showHelp.help"
				class="uppercase font-bold text-lg py-1 px-2 rounded cursor-pointer border-green-900 hover:bg-green-700 transition-all hover:border-r-[0px] border-r-[2px] border-b-[2px] hover:border-b-[0px] bg-green-500"
			>
				voltar
			</button>
		</div>

		<div class="py-5 uppercase text-lg font-bold flex flex-col gap-2">
			<p>
				esse site foi desenvolvido com base
				<a
					class="underline"
					href="https://youtu.be/wNI4u1d-sF0"
					>neste vídeo</a
				>
				de
				<a
					class="underline"
					href="https://twitter.com/phsantos"
					>@phsantos</a
				>.
			</p>
			<p>
				é até recomendável assistir ao vídeo dele para você poder entender
				melhor todo o conceito por trás do plano econômico para pessoas
				cinéfilas.
			</p>
			<p>na verdade seria até cômodo colocar o vídeo aqui logo, né?</p>
			<p>pois aqui está:</p>

			<p>
				<iframe
					width="720"
					height="351"
					src="https://www.youtube-nocookie.com/embed/wNI4u1d-sF0"
					title="PH Santos: Streamings: Como economizar? Tenho um plano!"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</p>
		</div>
	</div>
</template>
