(function (global) {
  const isInWindow = typeof Window !== 'undefined'

  const isInWorker = typeof WorkerGlobalScope !== 'undefined'

  const isInSupportedPlatform = isInWindow || isInWorker

  if (!isInSupportedPlatform) {
    throw new TypeError('Invalid calling environment')
  }

  const isBuiltinSupported = typeof StorageBucketManager !== 'undefined' && typeof StorageBucket !== 'undefined'

  if (isBuiltinSupported) {
    return
  }

  const symbol = Symbol()

  const metaDataStorageKey = 'storage-buckets-polyfill'

  const StorageBucketManager = function StorageBucketManager(sym) {
    if (!Object.is(sym, symbol)) {
      throw new TypeError('Illegal constructor')
    }
  }

  const StorageBucket = function StorageBucket(sym) {
    if (!Object.is(sym, symbol)) {
      throw new TypeError('Illegal constructor')
    }
  }

  const storageBuckets = new StorageBucketManager()

  Object.defineProperty(global, 'StorageBucketManager', {
    configurable: true,
    enumerable: false,
    value: StorageBucketManager,
    writable: true,
  })

  Object.defineProperty(global, 'StorageBucket', {
    configurable: true,
    enumerable: false,
    value: StorageBucket,
    writable: true,
  })

  Object.defineProperty(Object.getPrototypeOf(global.navigator), 'storageBuckets', {
    configurable: true,
    enumerable: true,
    get: () => storageBuckets,
    set: undefined,
  })
})(globalThis)
