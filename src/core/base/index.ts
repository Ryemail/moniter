import { beaconRequset, imageRequest } from '@/shard/request'
import { isFunction, listenerPagehide } from '@/shard/util'
import type { Mointer, MointerData, MonitorOption, Plugin } from 'types'

export default function createMoniter(options: MonitorOption): Mointer {
	const installedPlugins = new Set()
	const config: MonitorOption = { mode: 'beacon', maxCount: 10, ...options }

	const moniter: Mointer = {
		data: [],

		config,

		use(plugin: Plugin, ...rest: any[]) {
			if (installedPlugins.has(plugin)) {
				console.warn(`Plugin registered`)
			} else if (plugin && isFunction(plugin.install)) {
				installedPlugins.add(plugin)
				plugin.install(moniter, ...rest)
			} else if (typeof plugin === 'function') {
				installedPlugins.add(plugin)
				plugin(moniter, ...rest)
			}

			return moniter
		},

		// 监控数据转化函数
		dataTransform(data: MointerData[]) {
			if (typeof config.transform === 'function') {
				return config.transform(data)
			}

			return data
		},

		// 数据请求
		request(parmas) {
			const data = moniter.dataTransform(parmas)
			const { mode, repartURL } = config

			if (mode === 'img') {
				return imageRequest(repartURL, data)
			}

			return beaconRequset(repartURL, { data })
		},

		// 采集数据
		repart(item, options) {
			const { maxCount } = config

			// 存储数据
			if (item) {
				moniter.data.push(item)
			}

			// 立即上报
			if (options?.immediate) {
				moniter.request(moniter.data)
			}

			// 当数据量达到 maxCount 立即上报
			if (moniter.data.length === maxCount) {
				moniter.request(moniter.data)
			}
		},
	}

	// 监听页面关闭发送数据
	listenerPagehide(() => {
		if (moniter.data.length) {
			moniter.request(moniter.data)
		}
	})

	return moniter
}
