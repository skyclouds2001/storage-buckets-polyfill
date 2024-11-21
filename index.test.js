const result = document.getElementById('result')

const expect = (result) => {
  const toBe = (value) => {
    if (!Object.is(result, value)) {
      throw `Expected: ${value}, Got: ${result}`
    }
  }

  const toBeDefined = () => {
    if (result === undefined) {
      throw `Expected to be defined`
    }
  }

  const toBeUndefined = () => {
    if (result !== undefined) {
      throw `Expected to be undefined`
    }
  }

  const toThrow = () => {
    try {
      result()
      throw 'Expected to throw'
    } catch { }
  }

  return {
    toBe,
    toBeDefined,
    toBeUndefined,
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
   * clean up storage buckets before feature test
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
   * clean up storage buckets after feature test
   */
  for (const key of await navigator.storageBuckets.keys()) {
    await navigator.storageBuckets.delete(key)
  }

  for (const key of ['name']) {
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

  for (const key of []) {
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
   * create storage bucket before feature test
   */
  const storageBucket = await navigator.storageBuckets.open('sample')

  /**
   * StorageBucket must have a name and should be equal to the passing parameter when initial
   */
  expect(storageBucket.name).toBeDefined()
  expect(storageBucket.name).toBe('sample')

  /**
   * delete storage bucket after feature test
   */
  await navigator.storageBuckets.delete('sample')

  result.textContent = 'Test Succeeded!'

  console.log('Test Succeeded!')
} catch (error) {
  result.textContent = 'Test failed!'

  console.error('Test failed: ', error)
}
