const result = document.getElementById('result')

const expect = (result) => {
  const toBe = (value) => {
    if (!Object.is(result, value)) {
      throw `Expected to be ${value}; Got ${result}`
    }
  }

  const toBeDefined = () => {
    if (result === undefined) {
      throw `Expected not to be undefined; Got ${result}`
    }
  }

  const toBeUndefined = () => {
    if (result !== undefined) {
      throw `Expected to be undefined; Got ${result}`
    }
  }

  const toBeNull = () => {
    if (result !== null) {
      throw `Expected to be null; Got ${result}`
    }
  }

  const toBeNaN = () => {
    if (!Number.isNaN(result)) {
      throw `Expected to be NaN; Got ${result}`
    }
  }

  const toThrow = () => {
    try {
      result()
      throw `Expected to throw`
    } catch { }
  }

  return {
    toBe,
    toBeDefined,
    toBeUndefined,
    toBeNull,
    toBeNaN,
    toThrow,
  }
}

result.textContent = 'Test Running...'

try {
  /**
   * StorageBucketManager & StorageBucket must be defined, which must be defined, writable, not enumerable and configurable
   */
  expect(globalThis.StorageBucketManager).toBeDefined()
  expect(Object.getOwnPropertyDescriptor(globalThis, 'StorageBucketManager').writable).toBe(true)
  expect(Object.getOwnPropertyDescriptor(globalThis, 'StorageBucketManager').enumerable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis, 'StorageBucketManager').configurable).toBe(true)
  expect(globalThis.StorageBucket).toBeDefined()
  expect(Object.getOwnPropertyDescriptor(globalThis, 'StorageBucket').writable).toBe(true)
  expect(Object.getOwnPropertyDescriptor(globalThis, 'StorageBucket').enumerable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis, 'StorageBucket').configurable).toBe(true)

  /**
   * StorageBucketManager & StorageBucket must be specified `name` property, which must be defined, not writable, not enumerable and configurable
   */
  expect(globalThis.StorageBucketManager.name).toBe('StorageBucketManager')
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager, 'name').writable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager, 'name').enumerable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager, 'name').configurable).toBe(true)
  expect(globalThis.StorageBucket.name).toBe('StorageBucket')
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket, 'name').writable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket, 'name').enumerable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket, 'name').configurable).toBe(true)

  /**
   * StorageBucketManager.prototype & StorageBucket.prototype must be specified `Symbol.toStringTag` property, which must be defined, not writable, not enumerable and configurable
   */
  expect(globalThis.StorageBucketManager.prototype[Symbol.toStringTag]).toBe('StorageBucketManager')
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, Symbol.toStringTag).writable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, Symbol.toStringTag).enumerable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, Symbol.toStringTag).configurable).toBe(true)
  expect(globalThis.StorageBucket.prototype[Symbol.toStringTag]).toBe('StorageBucket')
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, Symbol.toStringTag).writable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, Symbol.toStringTag).enumerable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, Symbol.toStringTag).configurable).toBe(true)

  /**
   * StorageBucketManager.prototype & StorageBucket.prototype must be specified `constructor` property and must be equal to StorageBucketManager & StorageBucket, which must be defined, writable, not enumerable and configurable
   */
  expect(globalThis.StorageBucketManager.prototype.constructor).toBe(globalThis.StorageBucketManager)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, 'constructor').writable).toBe(true)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, 'constructor').enumerable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, 'constructor').configurable).toBe(true)
  expect(globalThis.StorageBucket.prototype.constructor).toBe(globalThis.StorageBucket)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, 'constructor').writable).toBe(true)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, 'constructor').enumerable).toBe(false)
  expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, 'constructor').configurable).toBe(true)

  /**
   * calling StorageBucketManager & StorageBucket must throw
   */
  expect(() => new globalThis.StorageBucketManager()).toThrow()
  expect(() => new globalThis.StorageBucket()).toThrow()

  /**
   * Navigator.prototype must be specified `storageBuckets` property, which must has getter but without setter, enumerable and configurable
   */
  expect(Object.getOwnPropertyDescriptor(Navigator.prototype, 'storageBuckets').get).toBeDefined()
  expect(Object.getOwnPropertyDescriptor(Navigator.prototype, 'storageBuckets').set).toBeUndefined()
  expect(Object.getOwnPropertyDescriptor(Navigator.prototype, 'storageBuckets').enumerable).toBe(true)
  expect(Object.getOwnPropertyDescriptor(Navigator.prototype, 'storageBuckets').configurable).toBe(true)

  /**
   * access `storageBuckets` property via Navigator.prototype must throw
   */
  expect(() => Navigator.prototype.storageBuckets).toThrow()

  /**
   * `navigator.storageBuckets` property must always return a sample object
   */
  expect(navigator.storageBuckets).toBe(navigator.storageBuckets)

  for (const key of ['open', 'keys', 'delete']) {
    /**
     * StorageBucketManager's function members must be defined, writable, enumerable and configurable
     */
    expect(globalThis.StorageBucketManager.prototype[key]).toBeDefined()
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, key).writable).toBe(true)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, key).enumerable).toBe(true)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, key).configurable).toBe(true)

    /**
     * StorageBucketManager's function members must have `name` property and should be equal to the member's name, which should be configurable, not writable and not enumerable
     */
    expect(globalThis.StorageBucketManager.prototype[key].name).toBe(key)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager, 'name').writable).toBe(false)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager, 'name').enumerable).toBe(false)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager, 'name').configurable).toBe(true)

    /**
     * StorageBucketManager's function members must throw if not call as StorageBucketManager's member
     */
    const fn = globalThis.StorageBucketManager.prototype[key]
    try {
      await fn('sample')
      throw 'Expected to throw'
    } catch { }
  }

  /**
   * clean up storage buckets before storage bucket management feature test
   */
  for (const key of await navigator.storageBuckets.keys()) {
    await navigator.storageBuckets.delete(key)
  }

  /**
   * StorageBucketManager should be able to enum storage buckets, open storage buckets and delete storage buckets
   */
  expect((await navigator.storageBuckets.keys()).length).toBe(0)
  expect(await navigator.storageBuckets.open('sample')).toBeDefined()
  expect((await navigator.storageBuckets.keys()).length).toBe(1)
  expect(await navigator.storageBuckets.open('sample-sample')).toBeDefined()
  expect((await navigator.storageBuckets.keys()).length).toBe(2)
  expect(await navigator.storageBuckets.delete('sample')).toBeUndefined()
  expect((await navigator.storageBuckets.keys()).length).toBe(1)
  expect(await navigator.storageBuckets.delete('sample-sample')).toBeUndefined()
  expect((await navigator.storageBuckets.keys()).length).toBe(0)

  /**
   * StorageBucketManager should throw if open storage buckets and delete storage buckets without passing name parameters
   */
  try {
    await navigator.storageBuckets.open()
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.delete()
    throw 'Expected to throw'
  } catch { }

  /**
   * StorageBucketManager should always return different storage buckets when open storage bucket
   */
  expect(await navigator.storageBuckets.open('sample') !== await navigator.storageBuckets.open('sample'))

  /**
   * clean up storage buckets after storage bucket management feature test
   */
  for (const key of await navigator.storageBuckets.keys()) {
    await navigator.storageBuckets.delete(key)
  }

  for (const key of ['name', 'indexedDB', 'caches']) {
    /**
     * StorageBucket's property members must throw if not call as StorageBucket's member
     */
    try {
      globalThis.StorageBucket.prototype[key]
      throw 'Expected to throw'
    } catch { }

    /**
     * StorageBucket's property members must be defined as getter and without setter, enumerable and configurable
     */
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, key).get).toBeDefined()
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, key).set).toBeUndefined()
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, key).enumerable).toBe(true)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, key).configurable).toBe(true)
  }

  for (const key of ['getDirectory', 'expires', 'setExpires']) {
    /**
     * StorageBucket's function members must be defined, writable, enumerable and configurable
     */
    expect(globalThis.StorageBucket.prototype[key]).toBeDefined()
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, key).writable).toBe(true)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, key).enumerable).toBe(true)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket.prototype, key).configurable).toBe(true)

    /**
     * StorageBucket's function members must have `name` property and should be equal to the member's name, which should be configurable, not writable and not enumerable
     */
    expect(globalThis.StorageBucket.prototype[key].name).toBe(key)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket, 'name').writable).toBe(false)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket, 'name').enumerable).toBe(false)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucket, 'name').configurable).toBe(true)

    /**
     * StorageBucket's function members must throw if not call as StorageBucket's member
     */
    const fn = globalThis.StorageBucket.prototype[key]
    try {
      await fn()
      throw 'Expected to throw'
    } catch { }
  }

  /**
   * create storage bucket before storage bucket feature test
   */
  const storageBucket = await navigator.storageBuckets.open('sample')

  /**
   * StorageBucket must have a name and should be equal to the passing parameter when initial
   */
  expect(storageBucket.name).toBeDefined()
  expect(storageBucket.name).toBe('sample')

  /**
   * clean up Cache Storage before Cache Storage feature test
   */
  for (const key of await window.caches.keys()) {
    await window.caches.delete(key)
  }

  /**
   * StorageBucket must support manage Cache Storage
   */
  expect(await storageBucket.caches.has('sample')).toBe(false)
  expect((await storageBucket.caches.keys()).length).toBe(0)
  expect((await storageBucket.caches.keys()).includes('sample')).toBe(false)
  expect(await storageBucket.caches.delete('sample')).toBe(false)

  const cache = await storageBucket.caches.open('sample')
  expect(cache).toBeDefined()

  expect(await window.caches.has('sample')).toBe(false)

  expect(await storageBucket.caches.has('sample')).toBe(true)
  expect((await storageBucket.caches.keys()).length).toBe(1)
  expect((await storageBucket.caches.keys()).includes('sample')).toBe(true)

  const req = new Request(location.href + 'sample')
  const res = new Response(location.href + 'sample')

  expect(await cache.delete(req)).toBe(false)
  expect(await storageBucket.caches.match(req)).toBeUndefined()
  expect((await cache.keys()).length).toBe(0)
  expect(await cache.match(req)).toBeUndefined()
  expect((await cache.matchAll(req)).length).toBe(0)

  await cache.put(req, res)

  expect(await storageBucket.caches.match(req)).toBeDefined()
  expect((await cache.keys()).length).toBe(1)
  expect(await cache.match(req)).toBeDefined()
  expect((await cache.matchAll(req)).length).toBe(1)

  expect(await cache.delete(req)).toBe(true)

  expect(await cache.delete(req)).toBe(false)
  expect(await storageBucket.caches.match(req)).toBeUndefined()
  expect((await cache.keys()).length).toBe(0)
  expect(await cache.match(req)).toBeUndefined()
  expect((await cache.matchAll(req)).length).toBe(0)

  expect(await storageBucket.caches.delete('sample')).toBe(true)

  expect(await storageBucket.caches.has('sample')).toBe(false)
  expect((await storageBucket.caches.keys()).length).toBe(0)
  expect((await storageBucket.caches.keys()).includes('sample')).toBe(false)
  expect(await storageBucket.caches.delete('sample')).toBe(false)

  /**
   * clean up Cache Storage after Cache Storage feature test
   */
  for (const key of await window.caches.keys()) {
    await window.caches.delete(key)
  }

  /**
   * clean up IndexDB before IndexDB feature test
   */
  for (const database of await window.indexedDB.databases()) {
    await new Promise((resolve, reject) => {
      const req = window.indexedDB.deleteDatabase(database.name)

      req.onerror = () => reject(req.error)
      req.onsuccess = () => resolve(req.result)
    })
  }

  /**
   * StorageBucket must support manage IndexDB
   */
  expect((await storageBucket.indexedDB.databases()).length).toBe(0)

  await new Promise((resolve, reject) => {
    const req = storageBucket.indexedDB.open('sample')

    req.onerror = () => reject(req.error)
    req.onsuccess = () => resolve(req.result)
  })

  expect((await window.indexedDB.databases()).some((db) => db.name === 'sample')).toBe(false)

  expect((await storageBucket.indexedDB.databases()).length).toBe(1)

  await new Promise((resolve, reject) => {
    const req = storageBucket.indexedDB.deleteDatabase('sample')

    req.onerror = () => reject(req.error)
    req.onsuccess = () => resolve(req.result)
  })

  expect((await storageBucket.indexedDB.databases()).length).toBe(0)

  expect(storageBucket.indexedDB.cmp(1, 0)).toBe(1)
  expect(storageBucket.indexedDB.cmp(0, 0)).toBe(0)
  expect(storageBucket.indexedDB.cmp(0, 1)).toBe(-1)

  /**
   * clean up IndexDB after IndexDB feature test
   */
  for (const database of await window.indexedDB.databases()) {
    await new Promise((resolve, reject) => {
      const req = window.indexedDB.deleteDatabase(database.name)

      req.onerror = () => reject(req.error)
      req.onsuccess = () => resolve(req.result)
    })
  }

  const rootHandle = await navigator.storage.getDirectory()

  /**
   * clean up Origin Private File System before File System feature test
   */
  for await (const [name] of rootHandle) {
    if (name !== 'storage-buckets-polyfill') {
      await rootHandle.removeEntry(name, { recursive: true })
    }
  }

  /**
   * StorageBucket must support manage Origin Private File System
   */
  const root = await storageBucket.getDirectory()
  expect(root.name).toBe('')
  expect(root.kind).toBe('directory')

  expect((await Array.fromAsync(root.keys())).length).toBe(0)
  expect((await Array.fromAsync(root.values())).length).toBe(0)
  expect((await Array.fromAsync(root.entries())).length).toBe(0)

  try {
    await root.removeEntry('sample-directory')
    throw 'Expected to throw'
  } catch { }

  try {
    await root.removeEntry('sample-file')
    throw 'Expected to throw'
  } catch { }

  const dir = await root.getDirectoryHandle('sample-directory', { create: true })
  expect(dir.name).toBe('sample-directory')
  expect(dir.kind).toBe('directory')
  const file = await root.getFileHandle('sample-file', { create: true })
  expect(file.name).toBe('sample-file')
  expect(file.kind).toBe('file')

  expect((await Array.fromAsync(root.keys())).length).toBe(2)
  expect((await Array.fromAsync(root.values())).length).toBe(2)
  expect((await Array.fromAsync(root.entries())).length).toBe(2)

  expect(await root.isSameEntry(root)).toBe(true)
  expect(await root.isSameEntry(dir)).toBe(false)
  expect(await root.isSameEntry(file)).toBe(false)
  expect(await root.isSameEntry(await storageBucket.getDirectory())).toBe(true)
  expect(await root.isSameEntry(await navigator.storage.getDirectory())).toBe(false)

  expect((await root.resolve(dir)).length).toBe(1)
  expect((await root.resolve(file)).length).toBe(1)
  expect((await root.resolve(dir)).at(0)).toBe('sample-directory')
  expect((await root.resolve(file)).at(0)).toBe('sample-file')

  await root.removeEntry('sample-directory')
  await root.removeEntry('sample-file')

  expect((await Array.fromAsync(root.keys())).length).toBe(0)
  expect((await Array.fromAsync(root.values())).length).toBe(0)
  expect((await Array.fromAsync(root.entries())).length).toBe(0)

  /**
   * clean up Origin Private File System after File System feature test
   */
  for await (const [name] of rootHandle) {
    if (name !== 'storage-buckets-polyfill') {
      await rootHandle.removeEntry(name, { recursive: true })
    }
  }

  /**
   * delete storage bucket after storage bucket feature test
   */
  await navigator.storageBuckets.delete('sample')

  /**
   * should throw with invalid storage bucket
   */
  try {
    await navigator.storageBuckets.open('ABCDEFG')
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('我')
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('')
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('sample5-sample5-sample5-sample5-sample5-sample5-sample5-sample5-')
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('-abcdefg')
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('_abcdefg')
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('abcdefg', { expires: 0 })
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('abcdefg', { expires: -Date.now() })
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('abcdefg', { expires: Date.now() })
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('abcdefg', { quota: 0 })
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('abcdefg', { quota: -10 })
    throw 'Expected to throw'
  } catch { }
  try {
    await navigator.storageBuckets.open('abcdefg', { quota: 10 })
  } catch {
    throw 'Expected not to throw'
  }

  {
    await navigator.storageBuckets.open('abcdefg', { expires: Date.now() + 2000 })
    await new Promise((resolve) => setTimeout(resolve, 2000))
    expect((await navigator.storageBuckets.keys()).includes('abcdefg')).toBe(true)
  }

  {
    const timestamp = Date.now() + 10000
    const storageBucket = await navigator.storageBuckets.open('abcdefg')
    expect(await storageBucket.expires()).toBe(null)
    await storageBucket.setExpires(timestamp)
    expect(await storageBucket.expires()).toBe(timestamp)
    await storageBucket.setExpires(timestamp + 10000)
    expect(await storageBucket.expires()).toBe(timestamp + 10000)

    try {
      await storageBucket.setExpires()
      throw 'Expected to throw'
    } catch { }
  }

  result.textContent = 'Test Succeeded!'

  console.log('Test Succeeded!')
} catch (error) {
  result.textContent = 'Test failed!'

  console.error('Test failed: ', error)
}
