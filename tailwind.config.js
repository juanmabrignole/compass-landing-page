/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import { addDynamicIconSelectors } from '@iconify/tailwind'
import plugin from 'tailwindcss/plugin'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: [ "Montserrat", ...defaultTheme.fontFamily.sans],
			mono: ["'Roboto Mono'", ...defaultTheme.fontFamily.mono],
			inter: [ "Inter", ...defaultTheme.fontFamily.sans],
		},
		container: {
			center: true,
		},	  
		extend: {
			colors: {
				gray: {
					50: "#f3f6f5",
					100: "#ccd0cf",
					200: "#a7aaaa",
					300: "#848786",
					400: "#626564",
					500: "#444444",
					600: "#46363a",
					700: "#43242e",
					800: "#3d0f21",
					900: "#340017"
				},
				blue: {
					50: "#E9EAFB",
					100: "#D3D6F8",
					200: "#A4A9EF",
					300: "#7880E8",
					400: "#4D56E0",
					500: "#242FD2",
					600: "#1D27AA",
					700: "#161D7E",
					800: "#0E1353",
					900: "#070A2C",
					950: "#040516"
				},
				red: {
					50: "#fff2f0",
					100: "#ffd1cd",
					200: "#ffafa9",
					300: "#ff8983",
					400: "#e7716d",
					500: "#d05a57",
					600: "#be3337",
					700: "#970019",
					800: "#61000c",
					900: "#360004"
				}
			}
		}
	},
	plugins: [
		addDynamicIconSelectors(),
		plugin(function ({ addVariant, addUtilities }) {
			addUtilities({
				".no-scrollbar::-webkit-scrollbar": {
					display: "none",
				},
				".no-scrollbar": {
					"-ms-overflow-style": "none",
					"scrollbar-width": "none",
				},
			})	

			addVariant("await", "&.await")
			addVariant('group-await', ':merge(.group).await &')
			addVariant('peer-await', ':merge(.peer).await ~ &')

			addVariant("then", "&.then")
			addVariant('group-then', ':merge(.group).then &')
			addVariant('peer-then', ':merge(.peer).then ~ &')

			addVariant("catch", "&.catch")
			addVariant('group-catch', ':merge(.group).catch &')
			addVariant('peer-catch', ':merge(.peer).catch ~ &')
		}),
	],
}
