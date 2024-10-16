interface Navigator {
  readonly storageBuckets: StorageBucketManager
}

interface WorkerNavigator {
  readonly storageBuckets: StorageBucketManager
}

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
