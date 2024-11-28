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

  let allowConstruct = false

  const MetaDataStorageKey = 'storage-buckets-polyfill'

  /**
   * @param {string} name
   */
  const $validateStorageBucketName = (name) => {
    return Array.from(name)
      .every(
        (_, i) =>
          name.charCodeAt(i) >= 48 && name.charCodeAt(i) <= 57 ||
          name.charCodeAt(i) >= 97 && name.charCodeAt(i) <= 122 ||
          name.charCodeAt(i) === 45 ||
          name.charCodeAt(i) === 95
      ) &&
      name.length > 0 &&
      name.length < 64 &&
      !name.startsWith('-') &&
      !name.startsWith('_')
  }

  const $createEntry = ({
    name,
    options = {},
  }) => {
    return {
      name,
      persisted: options.persisted ?? false,
      quota: options.quota ?? Number.POSITIVE_INFINITY,
      expires: options.expires ?? null,
    }
  }

  const $readEntries = async () => {
    const rootHandle = await global.navigator.storage.getDirectory()
    const fileHandle = await rootHandle.getFileHandle(MetaDataStorageKey)
    const file = await fileHandle.getFile()
    const data = await file.text()
    const entries = JSON.parse(data)
    return entries
  }

  const $writeEntries = async (entries) => {
    const rootHandle = await global.navigator.storage.getDirectory()
    const fileHandle = await rootHandle.getFileHandle(MetaDataStorageKey, { create: true })
    const writableStream = await fileHandle.createWritable({ keepExistingData: false, mode: 'exclusive' })
    const data = JSON.stringify(entries)
    await writableStream.write(data)
    await writableStream.close()
  }

  const $$removed = Symbol()

  /** @type {StorageBucketManager} */
  const $StorageBucketManager = function StorageBucketManager() {
    if (!allowConstruct) {
      throw new TypeError('Illegal constructor')
    }

    this[$$removed] = false
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

  /** @type {StorageBucketManager['open']} */
  const $open = async function (name, options) {
    try {
      if (Object.getPrototypeOf(this) !== $StorageBucketManager.prototype) {
        throw new TypeError('Failed to execute \'open\' on \'StorageBucketManager\': Illegal invocation')
      }

      if (arguments.length === 0) {
        throw new TypeError('Failed to execute \'open\' on \'StorageBucketManager\': 1 argument required, but only 0 present.')
      }

      if (!$validateStorageBucketName(name)) {
        throw new TypeError(`The bucket name '${name}' is not a valid name.`)
      }

      if (options != null) {
        if (options.expires != null && options.expires <= global.performance.timeOrigin + global.performance.now()) {
          throw new TypeError('The bucket expiration is invalid.')
        }

        if (options.quota != null && options.quota <= 0) {
          throw new TypeError('The bucket\'s quota cannot less than or equal zero.')
        }

        if (options.quota != null) {
          options.quota = (await global.navigator.storage.estimate()).quota
        }

        if (options.persisted != null) {
          options.persisted = await global.navigator.storage.persisted()
        }
      }

      const entries = await $readEntries()
      if (entries[name] == null) {
        entries[name] = $createEntry({
          name,
          options,
        })
        await $writeEntries(entries)
      } else {
        if (entries[name].expires != null && entries[name].expires <= global.performance.timeOrigin + global.performance.now()) {
          await global.navigator.storageBuckets.delete(name)
          entries[name] = $createEntry({
            name,
            options,
          })
          await $writeEntries(entries)
        }
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'NotFoundError') {
        const entries = {}
        entries[name] = $createEntry({
          name,
          options,
        })
        await $writeEntries(entries)
      } else {
        throw error
      }
    }

    allowConstruct = true
    const storageBucket = new $StorageBucket(name, options)
    allowConstruct = false
    return storageBucket
  }

  Object.defineProperty($open, 'name', {
    configurable: true,
    enumerable: false,
    value: 'open',
    writable: false,
  })

  Object.defineProperty($StorageBucketManager.prototype, 'open', {
    configurable: true,
    enumerable: true,
    value: $open,
    writable: true,
  })

  /** @type {StorageBucketManager['keys']} */
  const $keys = async function () {
    try {
      if (Object.getPrototypeOf(this) !== $StorageBucketManager.prototype) {
        throw new TypeError('Failed to execute \'keys\' on \'StorageBucketManager\': Illegal invocation')
      }

      const entries = await $readEntries()
      const keys = Object.values(entries).filter((entry) => entry.expires == null || entry.expires > global.performance.timeOrigin + global.performance.now()).map((entry) => entry.name)
      return keys
    } catch (error) {
      if (error instanceof DOMException && error.name === 'NotFoundError') {
        const keys = []
        return keys
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

  /** @type {StorageBucketManager['delete']} */
  const $delete = async function (name) {
    try {
      if (Object.getPrototypeOf(this) !== $StorageBucketManager.prototype) {
        throw new TypeError('Failed to execute \'delete\' on \'StorageBucketManager\': Illegal invocation')
      }

      if (arguments.length === 0) {
        throw new TypeError('Failed to execute \'delete\' on \'StorageBucketManager\': 1 argument required, but only 0 present.')
      }

      if (!$validateStorageBucketName(name)) {
        throw new TypeError(`The bucket name '${name}' is not a valid name.`)
      }

      const entries = await $readEntries()
      const entry = entries[name]
      if (entry == null) {
        return
      }

      const searchReg = new RegExp(`^${MetaDataStorageKey}-${name}-`)

      await Promise.all([
        Promise.all(
          global.indexedDB.databases().then((databases) => databases.filter((database) => searchReg.test(database.name)).map((database) => global.indexedDB.deleteDatabase(database.name)))
        ),
        Promise.all(
          global.caches.keys().then((caches) => caches.filter((cache) => searchReg.test(cache)).map((cache) => global.caches.delete(cache)))
        ),
        navigator.storage.getDirectory().then((root) => root.removeEntry(`${MetaDataStorageKey}-${name}`, { recursive: true })),
      ])

      delete entries[name]
      await $writeEntries(entries)

      this[$$removed] = true
    } catch (error) {
      if (error instanceof DOMException && error.name === 'NotFoundError') {
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

  const $$name = Symbol()
  const $$persistence = Symbol()
  const $$quota = Symbol()
  const $$expiration = Symbol()

  /** @type {StorageBucket} */
  const $StorageBucket = function StorageBucket(name, options = {}) {
    if (!allowConstruct) {
      throw new TypeError('Illegal constructor')
    }

    this[$$name] = name
    this[$$persistence] = options.persisted ?? false
    this[$$quota] = options.quota ?? Number.POSITIVE_INFINITY
    this[$$expiration] = options.expires ?? null
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

  /** @type {() => StorageBucket['name']} */
  const $name = function () {
    if (Object.getPrototypeOf(this) !== $StorageBucket.prototype) {
      throw new TypeError('Illegal invocation')
    }

    return this[$$name]
  }

  Object.defineProperty($StorageBucket.prototype, 'name', {
    configurable: true,
    enumerable: true,
    get: $name,
    set: undefined,
  })

  /** @type {() => StorageBucket['indexedDB']} */
  const $indexedDB = function () {
    const searchReg = new RegExp(`^${MetaDataStorageKey}-${this[$$name]}-`)

    return new Proxy(global.indexedDB, {
      get: (target, p, receiver) => {
        switch (p) {
          case 'cmp':
            return (first, second) => Reflect.get(target, 'cmp', receiver).call(target, first, second)
          case 'databases':
            return () => Reflect.get(target, 'databases', receiver).call(target).then((databases) => databases.filter((database) => searchReg.test(database.name)).map(({ name, version }) => ({ name: name.replace(searchReg, ''), version })))
          case 'deleteDatabase':
            return (name) => Reflect.get(target, 'deleteDatabase', receiver).call(target, `${MetaDataStorageKey}-${this[$$name]}-${name}`)
          case 'open':
            return (name, version) => Reflect.get(target, 'open', receiver).call(target, `${MetaDataStorageKey}-${this[$$name]}-${name}`, version)
        }
      },
    })
  }

  Object.defineProperty($StorageBucket.prototype, 'indexedDB', {
    configurable: true,
    enumerable: true,
    get: $indexedDB,
    set: undefined,
  })

  /** @type {() => StorageBucket['caches']} */
  const $caches = function () {
    const searchReg = new RegExp(`^${MetaDataStorageKey}-${this[$$name]}-`)

    return new Proxy(global.caches, {
      get: (target, p, receiver) => {
        switch (p) {
          case 'delete':
            return (cacheName) => Reflect.get(target, 'delete', receiver).call(target, `${MetaDataStorageKey}-${this[$$name]}-${cacheName}`)
          case 'has':
            return (cacheName) => Reflect.get(target, 'has', receiver).call(target, `${MetaDataStorageKey}-${this[$$name]}-${cacheName}`)
          case 'keys':
            return () => Reflect.get(target, 'keys', receiver).call(target).then((keys) => keys.map(key => key.replace(searchReg, '')))
          case 'match':
            return (request, options) => Reflect.get(target, 'match', receiver).call(target, request, options)
          case 'open':
            return (cacheName) => Reflect.get(target, 'open', receiver).call(target, `${MetaDataStorageKey}-${this[$$name]}-${cacheName}`)
        }
      },
    })
  }

  Object.defineProperty($StorageBucket.prototype, 'caches', {
    configurable: true,
    enumerable: true,
    get: $caches,
    set: undefined,
  })

  /** @type {StorageBucket['getDirectory']} */
  const $getDirectory = async function () {
    if (Object.getPrototypeOf(this) !== $StorageBucket.prototype) {
      throw new TypeError('Failed to execute \'getDirectory\' on \'StorageBucket\': Illegal invocation')
    }

    const rootHandle = await global.navigator.storage.getDirectory()

    const storageBucketHandle = await rootHandle.getDirectoryHandle(`${MetaDataStorageKey}-${this[$$name]}`, { create: true })

    Object.defineProperty(storageBucketHandle, 'name', {
      configurable: true,
      enumerable: true,
      get: () => '',
      set: undefined,
    })

    Object.defineProperty(storageBucketHandle, 'kind', {
      configurable: true,
      enumerable: true,
      get: () => 'directory',
      set: undefined,
    })

    return storageBucketHandle
  }

  Object.defineProperty($getDirectory, 'name', {
    configurable: true,
    enumerable: false,
    value: 'getDirectory',
    writable: false,
  })

  Object.defineProperty($StorageBucket.prototype, 'getDirectory', {
    configurable: true,
    enumerable: true,
    value: $getDirectory,
    writable: true,
  })

  const $setExpires = async function (expires) {
    if (Object.getPrototypeOf(this) !== $StorageBucket.prototype) {
      throw new TypeError('Failed to execute \'setExpires\' on \'StorageBucket\': Illegal invocation')
    }

    if (arguments.length === 0) {
      throw new TypeError('Failed to execute \'setExpires\' on \'StorageBucket\': 1 argument required, but only 0 present.')
    }

    if (this[$$removed]) {
      throw new DOMException('Unknown error occurred while setting expires.', 'InvalidStateError')
    }

    this[$$expiration] = expires
  }

  Object.defineProperty($setExpires, 'name', {
    configurable: true,
    enumerable: false,
    value: 'setExpires',
    writable: false,
  })

  Object.defineProperty($StorageBucket.prototype, 'setExpires', {
    configurable: true,
    enumerable: true,
    value: $setExpires,
    writable: true,
  })

  const $expires = async function () {
    if (Object.getPrototypeOf(this) !== $StorageBucket.prototype) {
      throw new TypeError('Failed to execute \'expires\' on \'StorageBucket\': Illegal invocation')
    }

    if (this[$$removed]) {
      throw new DOMException('Unknown error occurred while getting expires.', 'InvalidStateError')
    }

    return this[$$expiration]
  }

  Object.defineProperty($expires, 'name', {
    configurable: true,
    enumerable: false,
    value: 'expires',
    writable: false,
  })

  Object.defineProperty($StorageBucket.prototype, 'expires', {
    configurable: true,
    enumerable: true,
    value: $expires,
    writable: true,
  })

  const $estimate = async function () {
    if (Object.getPrototypeOf(this) !== $StorageBucket.prototype) {
      throw new TypeError('Failed to execute \'estimate\' on \'StorageBucket\': Illegal invocation')
    }

    if (this[$$removed]) {
      throw new DOMException('Unknown error occurred while getting estimate.', 'InvalidStateError')
    }

    return {
      quota: (await global.navigator.storage.estimate()).quota,
      usage: 0,
    }
  }

  Object.defineProperty($estimate, 'name', {
    configurable: true,
    enumerable: false,
    value: 'estimate',
    writable: false,
  })

  Object.defineProperty($StorageBucket.prototype, 'estimate', {
    configurable: true,
    enumerable: true,
    value: $estimate,
    writable: true,
  })

  const $persist = async function () {
    if (Object.getPrototypeOf(this) !== $StorageBucket.prototype) {
      throw new TypeError('Failed to execute \'persist\' on \'StorageBucket\': Illegal invocation')
    }

    if (this[$$removed]) {
      throw new DOMException('Unknown error occurred while requesting persist.', 'InvalidStateError')
    }

    return await navigator.storage.persisted()
  }

  Object.defineProperty($persist, 'name', {
    configurable: true,
    enumerable: false,
    value: 'persist',
    writable: false,
  })

  Object.defineProperty($StorageBucket.prototype, 'persist', {
    configurable: true,
    enumerable: true,
    value: $persist,
    writable: true,
  })

  const $persisted = async function () {
    if (Object.getPrototypeOf(this) !== $StorageBucket.prototype) {
      throw new TypeError('Failed to execute \'persisted\' on \'StorageBucket\': Illegal invocation')
    }

    if (this[$$removed]) {
      throw new DOMException('Unknown error occurred while getting persisted.', 'InvalidStateError')
    }

    return await navigator.storage.persisted()
  }

  Object.defineProperty($persisted, 'name', {
    configurable: true,
    enumerable: false,
    value: 'persisted',
    writable: false,
  })

  Object.defineProperty($StorageBucket.prototype, 'persisted', {
    configurable: true,
    enumerable: true,
    value: $persisted,
    writable: true,
  })

  allowConstruct = true
  const $storageBuckets = new $StorageBucketManager()
  allowConstruct = false

  if (isInWindow) {
    Object.defineProperty(Navigator.prototype, 'storageBuckets', {
      configurable: true,
      enumerable: true,
      get: function () {
        if ((Object.getPrototypeOf(this) !== Navigator.prototype)) {
          throw new TypeError('Illegal invocation')
        }
        return $storageBuckets
      },
      set: undefined,
    })
  }
  if (isInWorker) {
    Object.defineProperty(WorkerNavigator.prototype, 'storageBuckets', {
      configurable: true,
      enumerable: true,
      get: function () {
        if ((Object.getPrototypeOf(this) !== WorkerNavigator.prototype)) {
          throw new TypeError('Illegal invocation')
        }
        return $storageBuckets
      },
      set: undefined,
    })
  }
})(globalThis)
