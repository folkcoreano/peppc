import {defineConfig} from "unocss";
import presetUno from "unocss/preset-uno";

import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
	presets: [presetUno()],
	transformers: [transformerVariantGroup(), transformerDirectives()],
});
