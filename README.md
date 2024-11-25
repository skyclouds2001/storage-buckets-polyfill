# storage-buckets-polyfill

The polyfill of the [Storage Buckets API](https://wicg.github.io/storage-buckets/).

## Limitations

* HTTP header is not supported:
  * clean up storage bucket via `Clear-Site-Data` header is not supported
* make persistence of a storage bucket is not supported:
  * `options.persisted` of `StorageBucketManager.open()` takes no effect
  * `StorageBucket.persisted()` and `StorageBucket.persist()` will only return true when the browsing context's storage is persisted
* measure quota of a storage bucket is not supported:
  * `options.quota` of `StorageBucketManager.open()` takes no effect
  * `StorageBucket.estimate()` will always report `usage` as 0 while `quota` as `(await global.navigator.storage.estimate()).quota`
* others:
  * call `CacheStorage.match()` without specifying `options.cacheName` will match entries even not in the storage bucket
