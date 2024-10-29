import {
	QueryClient,
	QueryKey,
	QueryObserver,
	QueryObserverOptions
} from "@tanstack/react-query"
import { computed, createAtom, makeObservable, reaction } from "mobx"

export class MobxQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
> {
	private atom = createAtom(
		"MobxQuery",
		() => this.startTracking(),
		() => this.stopTracking()
	)

	private queryObserver: QueryObserver<
		TQueryFnData,
		TError,
		TData,
		TQueryData,
		TQueryKey
	>

	constructor(
		private getOptions: () => QueryObserverOptions<
			TQueryFnData,
			TError,
			TData,
			TQueryData,
			TQueryKey
		>,
		private queryClient: QueryClient
	) {
		this.queryObserver = new QueryObserver(
			this.queryClient,
			this.defaultQueryOptions
		)
		makeObservable(this, {
			data: computed
		})
	}

	get result() {
		this.atom.reportObserved()
		this.queryObserver.setOptions(this.defaultQueryOptions)
		return this.queryObserver.getOptimisticResult(this.defaultQueryOptions)
	}

	get data(): TData {
		const data = this.result.data

		if (!data) {
			throw this.queryObserver.fetchOptimistic(this.defaultQueryOptions)
		}

		return data
	}

	getData = async (): Promise<TData | undefined> => {
		const data = this.result.data

		try {
			if (!data || this.result.isStale) {
				const fetchedData = await this.queryObserver.fetchOptimistic(
					this.defaultQueryOptions
				)

				return fetchedData.data ?? undefined
			}

			return data
		} catch (error) {
			console.error("Ошибка при получении данных:", error)

			return undefined
		}
	}

	private unsubscribe = () => {}

	private startTracking() {
		const unsubscribeReaction = reaction(
			() => this.defaultQueryOptions,
			() => {
				this.queryObserver.setOptions(this.defaultQueryOptions)
			}
		)

		const unsubscribeObserver = this.queryObserver.subscribe(() => {
			this.atom.reportChanged()
		})

		this.unsubscribe = () => {
			unsubscribeReaction()
			unsubscribeObserver()
		}
	}
	private stopTracking() {
		this.unsubscribe()
	}

	private get defaultQueryOptions() {
		return this.queryClient.defaultQueryOptions(this.getOptions())
	}
}
