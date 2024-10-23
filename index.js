(function (global) {
  const isInWindow = typeof Window !== 'undefined'

  const isInWorker = typeof WorkerGlobalScope !== 'undefined'

  const isInSupportedPlatform = isInWindow || isInWorker

  if (!isInSupportedPlatform) {
    throw new TypeError('Invalid calling environment')
  }

  const isInSecureContext = global.isSecureContext

  if (!isInSecureContext) {
    return
  }

  const isBuiltinSupported = typeof StorageBucketManager !== 'undefined' && typeof StorageBucket !== 'undefined'

  if (isBuiltinSupported) {
    return
  }

  const symbol = Symbol()

  const MetaDataStorageKey = 'storage-buckets-polyfill'

  const StorageBucketManager = function StorageBucketManager(sym) {
    if (!Object.is(sym, symbol)) {
      throw new TypeError('Illegal constructor')
    }
  }

  StorageBucketManager.prototype.open = async function open(name) {
    const storageBucket = new StorageBucket(symbol, name)
    return storageBucket
  }

  StorageBucketManager.prototype.keys = async function keys() {
    const root = await navigator.storage.getDirectory()
    const file = await root.getFileHandle(MetaDataStorageKey, { create: true })
    const data = await file.getFile()
    const list = await data.text()
    return JSON.parse(list)
  }

  const StorageBucket = function StorageBucket(sym, name) {
    if (!Object.is(sym, symbol)) {
      throw new TypeError('Illegal constructor')
    }

    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: true,
      get: () => name,
      set: undefined,
    })
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
