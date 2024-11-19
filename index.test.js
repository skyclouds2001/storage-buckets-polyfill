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

  const toBeThrown = () => {
    try {
      result()
      throw 'Expected to thrown'
    } catch { }
  }

  return {
    toBe,
    toBeDefined,
    toBeUndefined,
    toBeThrown,
  }
}

const expectAsync = async (result) => expect(await result)

result.textContent = 'Test Running...'

try {
  /**
   * StorageBucketManager & StorageBucket must be defined
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
   * StorageBucketManager & StorageBucket must be specified `name` property
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
   * StorageBucketManager.prototype & StorageBucket.prototype must be specified `Symbol.toStringTag` property
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
   * StorageBucketManager.prototype & StorageBucket.prototype must be specified `constructor` property and must be equal to StorageBucketManager & StorageBucket
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
  expect(() => new globalThis.StorageBucketManager()).toBeThrown()
  expect(() => new globalThis.StorageBucket()).toBeThrown()

  /**
   * Navigator.prototype must be specified `storageBuckets` property
   */
  expect(Object.getOwnPropertyDescriptor(Navigator.prototype, 'storageBuckets').get).toBeDefined()
  expect(Object.getOwnPropertyDescriptor(Navigator.prototype, 'storageBuckets').set).toBeUndefined()
  expect(Object.getOwnPropertyDescriptor(Navigator.prototype, 'storageBuckets').enumerable).toBe(true)
  expect(Object.getOwnPropertyDescriptor(Navigator.prototype, 'storageBuckets').configurable).toBe(true)

  /**
   * access `storageBuckets` property via Navigator.prototype must throw, via navigator must not throw
   */
  expect(navigator.storageBuckets).toBeDefined()
  expect(() => Navigator.prototype.storageBuckets).toBeThrown()

  const sbmsm = ['open', 'keys', 'delete']
  for (const sbm of sbmsm) {
    /**
     * StorageBucketManager's function members must be defined, writable, enumerable and configurable
     */
    expect(globalThis.StorageBucketManager.prototype[sbm]).toBeDefined()
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, sbm).writable).toBe(true)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, sbm).enumerable).toBe(true)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager.prototype, sbm).configurable).toBe(true)

    /**
     * StorageBucketManager's function members must have `name` property and should be equal to the member's name, which should be configurable, not writable and not enumerable
     */
    expect(globalThis.StorageBucketManager.prototype[sbm].name).toBe(sbm)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager, 'name').writable).toBe(false)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager, 'name').enumerable).toBe(false)
    expect(Object.getOwnPropertyDescriptor(globalThis.StorageBucketManager, 'name').configurable).toBe(true)

    /**
     * StorageBucketManager's function members must throw if not call as StorageBucketManager's member
     */
    const fn = globalThis.StorageBucketManager.prototype[sbm]
    void (await expectAsync(() => fn('sample'))).toBeThrown()
  }

  /**
   * clean up storage buckets for feature test
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
  expect(await navigator.storageBuckets.delete('sample')).toBeUndefined()

  /**
   * StorageBucketManager should throw if open storage buckets and delete storage buckets without parameters
   */
  void (await expectAsync(() => navigator.storageBuckets.open())).toBeThrown()
  void (await expectAsync(() => navigator.storageBuckets.delete())).toBeThrown()

  /**
   * clean up storage buckets for feature test
   */
  for (const key of await navigator.storageBuckets.keys()) {
    await navigator.storageBuckets.delete(key)
  }

  result.textContent = 'Test Succeeded!'

  console.log('Test Succeeded!')
} catch (error) {
  result.textContent = 'Test failed!'

  console.error('Test failed: ', error)
}
