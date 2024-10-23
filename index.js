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

  Object.defineProperty(StorageBucketManager.prototype, Symbol.toStringTag, {
    configurable: true,
    enumerable: false,
    value: 'StorageBucketManager',
    writable: false,
  })

  const $open = async function (name) {
    const storageBucket = new StorageBucket(symbol, name)
    return storageBucket
  }

  Object.defineProperty($open, 'name', {
    configurable: true,
    enumerable: true,
    value: 'open',
    writable: true,
  })

  Object.defineProperty(StorageBucketManager.prototype, 'open', {
    configurable: true,
    enumerable: false,
    value: $open,
    writable: false,
  })

  const $keys = async function () {
    try {
      const root = await global.navigator.storage.getDirectory()
      const file = await root.getFileHandle(MetaDataStorageKey)
      const data = await file.getFile()
      const list = await data.text()
      const keys = Object.keys(JSON.parse(list))
      return keys
    } catch (error) {
      if (error instanceof DOMException && error.code === DOMException.NOT_SUPPORTED_ERR) {
        return []
      } else {
        throw error
      }
    }
  }

  Object.defineProperty($keys, 'name', {
    configurable: true,
    enumerable: false,
    value: 'keys',
    writable: false,
  })

  Object.defineProperty(StorageBucketManager.prototype, 'keys', {
    configurable: true,
    enumerable: true,
    value: $keys,
    writable: true,
  })

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

  Object.defineProperty(StorageBucket.prototype, Symbol.toStringTag, {
    configurable: true,
    enumerable: false,
    value: 'StorageBucket',
    writable: false,
  })

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
