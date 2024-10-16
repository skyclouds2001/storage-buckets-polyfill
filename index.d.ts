interface Navigator {
  readonly storageBuckets: StorageBucketManager
}

interface WorkerNavigator {
  readonly storageBuckets: StorageBucketManager
}

// [SecureContext]
// interface mixin NavigatorStorageBuckets {
//   [SameObject] readonly attribute StorageBucketManager storageBuckets;
// };
// Navigator includes NavigatorStorageBuckets;
// WorkerNavigator includes NavigatorStorageBuckets;

interface StorageBucketManager {
  open(name: string, options?: StorageBucketOptions): Promise<StorageBucket>
  keys(): Promise<string[]>
  delete(name: string): Promise<undefined>
}

interface StorageBucketOptions {
  persisted?: boolean
  quota?: number
  expires?: DOMHighResTimeStamp
}

// [Exposed=(Window,Worker),
//  SecureContext]
// interface StorageBucketManager {
//     Promise<StorageBucket> open(DOMString name, optional StorageBucketOptions options = {});
//     Promise<sequence<DOMString>> keys();
//     Promise<undefined> delete(DOMString name);
// };

// dictionary StorageBucketOptions {
//   boolean persisted = false;
//   unsigned long long quota;
//   DOMHighResTimeStamp expires;
// };

interface StorageBucket {
  readonly name: string

  persist(): Promise<boolean>
  persisted(): Promise<boolean>

  estimate(): Promise<StorageEstimate>

  setExpires(expires: DOMHighResTimeStamp): Promise<undefined>
  expires(): Promise<DOMHighResTimeStamp | null>

  readonly indexedDB: IDBFactory

  readonly caches: CacheStorage

  getDirectory(): Promise<FileSystemDirectoryHandle>
}

// [Exposed=(Window,Worker),
//  SecureContext]
// interface StorageBucket {
//   readonly attribute DOMString name;

//   [Exposed=Window] Promise<boolean> persist();
//   Promise<boolean> persisted();

//   Promise<StorageEstimate> estimate();

//   Promise<undefined> setExpires(DOMHighResTimeStamp expires);
//   Promise<DOMHighResTimeStamp?> expires();

//   [SameObject] readonly attribute IDBFactory indexedDB;

//   [SameObject] readonly attribute CacheStorage caches;

//   Promise<FileSystemDirectoryHandle> getDirectory();
// };
