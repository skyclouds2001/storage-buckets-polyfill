(function (global) {
  const isInWindow = typeof Window !== 'undefined'

  const isInWorker = typeof WorkerGlobalScope !== 'undefined'

  const isInSupportedPlatform = isInWindow || isInWorker

  if (!global.STORAGE_BUCKETS_POLYFILL_DISABLE_SUPPORTED_PLATFORM_CHECK && !isInSupportedPlatform) {
    throw new TypeError('Invalid calling environment')
  }

  const isInSecureContext = global.isSecureContext

  if (!global.STORAGE_BUCKETS_POLYFILL_DISABLE_SECURE_CONTEXT_CHECK && !isInSecureContext) {
    return
  }

  const isBuiltinSupported = typeof StorageBucketManager !== 'undefined' && typeof StorageBucket !== 'undefined'

  if (!global.STORAGE_BUCKETS_POLYFILL_DISABLE_BUILTIN_CHECK && isBuiltinSupported) {
    return
  }

  const symbol = Symbol()

  const MetaDataStorageKey = 'storage-buckets-polyfill'

  const $StorageBucketManager = function StorageBucketManager(sym) {
    if (!Object.is(sym, symbol)) {
      throw new TypeError('Illegal constructor')
    }
  }

  Object.defineProperty($StorageBucketManager, 'name', {
    configurable: true,
    enumerable: false,
    value: 'StorageBucketManager',
    writable: false,
  })

  Object.defineProperty($StorageBucketManager.prototype, Symbol.toStringTag, {
    configurable: true,
    enumerable: false,
    value: 'StorageBucketManager',
    writable: false,
  })

  Object.defineProperty(global, 'StorageBucketManager', {
    configurable: true,
    enumerable: false,
    value: $StorageBucketManager,
    writable: true,
  })

  const $open = async function (name) {
    try {
      const rootHandle = await global.navigator.storage.getDirectory()
      await rootHandle.getFileHandle(MetaDataStorageKey)
    } catch (error) {
      if (error instanceof DOMException && error.code === DOMException.NOT_FOUND_ERR) {
        const rootHandle = await global.navigator.storage.getDirectory()
        const fileHandle = await rootHandle.getFileHandle(MetaDataStorageKey, { create: true })
        const writableStream = await fileHandle.createWritable()
        const data = JSON.stringify({})
        await writableStream.write(data)
        await writableStream.close()
      } else {
        throw error
      }
    }
    const storageBucket = new $StorageBucket(symbol, name)
    return storageBucket
  }

  Object.defineProperty($open, 'name', {
    configurable: true,
    enumerable: true,
    value: 'open',
    writable: true,
  })

  Object.defineProperty($StorageBucketManager.prototype, 'open', {
    configurable: true,
    enumerable: false,
    value: $open,
    writable: false,
  })

  const $keys = async function () {
    try {
      const rootHandle = await global.navigator.storage.getDirectory()
      const fileHandle = await rootHandle.getFileHandle(MetaDataStorageKey)
      const file = await fileHandle.getFile()
      const data = await file.text()
      const entries = JSON.parse(data)
      const keys = Object.keys(entries)
      return keys
    } catch (error) {
      if (error instanceof DOMException && error.code === DOMException.NOT_FOUND_ERR) {
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

  Object.defineProperty($StorageBucketManager.prototype, 'keys', {
    configurable: true,
    enumerable: true,
    value: $keys,
    writable: true,
  })

  const $delete = async function (name) {
    try {
      const rootHandle = await global.navigator.storage.getDirectory()
      const fileHandle = await rootHandle.getFileHandle(MetaDataStorageKey)
      const file = await fileHandle.getFile()
      const data = await file.text()
      const entries = JSON.parse(data)
      const entry = entries[name]
      if (entry == null) {
        return
      }

      const { indexdb, cache, opfs } = entry
      indexdb.forEach((el) => {
        global.indexedDB.deleteDatabase(MetaDataStorageKey + name + el)
      })
      cache.forEach((el) => {
        global.caches.delete(MetaDataStorageKey + name + el)
      })
      opfs.forEach((el) => {
        rootHandle.removeEntry(MetaDataStorageKey + name + el)
      })
    } catch (error) {
      if (error instanceof DOMException && error.code === DOMException.NOT_FOUND_ERR) {
        return
      } else {
        throw error
      }
    }
  }

  Object.defineProperty($delete, 'name', {
    configurable: true,
    enumerable: false,
    value: 'delete',
    writable: false,
  })

  Object.defineProperty($StorageBucketManager.prototype, 'delete', {
    configurable: true,
    enumerable: true,
    value: $delete,
    writable: true,
  })

  const $StorageBucket = function StorageBucket(sym, name) {
    if (!Object.is(sym, symbol)) {
      throw new TypeError('Illegal constructor')
    }

    const $name = name

    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: true,
      get: () => $name,
      set: undefined,
    })

    const searchReg = new RegExp('^' + MetaDataStorageKey + $name)

    const $indexedDB = new Proxy(global.indexedDB, {
      get: (target, p, receiver) => {
        switch (p) {
          case 'cmp':
            return (first, second) => Reflect.get(target, 'cmp', receiver)(first, second)
          case 'databases':
            return () => Reflect.get(target, 'databases', receiver)().then((databases) => databases.filter((database) => database.startsWith(MetaDataStorageKey + $name)).map(({ name, version }) => ({ name: name.replace(searchReg, ''), version })))
          case 'deleteDatabase':
            return (name) => Reflect.get(target, 'deleteDatabase', receiver)(MetaDataStorageKey + $name + name)
          case 'open':
            return (name, version) => Reflect.get(target, 'open', receiver)(MetaDataStorageKey + $name + name, version)
        }
      },
    })

    Object.defineProperty(this, 'indexedDB', {
      configurable: true,
      enumerable: true,
      get: () => $indexedDB,
      set: undefined,
    })

    const $caches = new Proxy(global.caches, {
      get: (target, p, receiver) => {
        switch (p) {
          case 'delete':
            return (cacheName) => Reflect.get(target, 'delete', receiver)(MetaDataStorageKey + $name + cacheName)
          case 'has':
            return (cacheName) => Reflect.get(target, 'has', receiver)(MetaDataStorageKey + $name + cacheName)
          case 'keys':
            return () => Reflect.get(target, 'keys', receiver)().then((keys) => keys.map(key => key.replace(searchReg, '')))
          case 'match':
            return (request, options) => Reflect.get(target, 'match', receiver)(request, options)
          case 'open':
            return (cacheName) => Reflect.get(target, 'open', receiver)(MetaDataStorageKey + $name + cacheName)
        }
      },
    })

    Object.defineProperty(this, 'caches', {
      configurable: true,
      enumerable: true,
      get: () => $caches,
      set: undefined,
    })
  }

  Object.defineProperty($StorageBucket, 'name', {
    configurable: true,
    enumerable: false,
    value: 'StorageBucket',
    writable: false,
  })

  Object.defineProperty($StorageBucket.prototype, Symbol.toStringTag, {
    configurable: true,
    enumerable: false,
    value: 'StorageBucket',
    writable: false,
  })

  Object.defineProperty(global, 'StorageBucket', {
    configurable: true,
    enumerable: false,
    value: $StorageBucket,
    writable: true,
  })

  const storageBuckets = new $StorageBucketManager(symbol)

  Object.defineProperty(Object.getPrototypeOf(global.navigator), 'storageBuckets', {
    configurable: true,
    enumerable: true,
    get: () => storageBuckets,
    set: undefined,
  })
})(globalThis)
