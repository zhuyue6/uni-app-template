import { defineConfig, PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni';
import { viteMockServe } from "vite-plugin-mock";
import { origin, api } from './src/api.config'
import process from 'node:process'

const plugins: PluginOption[] = [
	uni()
]

const isMock = process.argv.at(-1) === 'mock'
if (isMock) plugins.push(
	viteMockServe({
		mockPath: "./src/mocks",
		localEnabled: true,
		supportTs: true,
		watchFiles: true
	})
)

export default defineConfig({
	plugins,
	resolve: {
		alias: { '@': './src' },
		extensions: ['.ts', '.d.ts', '.js', '.mjs', '.json', '.vue'],
	},
	server: {
		open: true,
		proxy: {
			[api]: { 
				target: origin,
				changeOrigin: true,
			}
		},
		cors: true
	}
});