import ext from "webextension-polyfill";

const storage = {
  get: async <T>(
    key: string, 
    storageType: "L" | "S" = "S" // Whether we use local/sync storage
  ): Promise<T> => {
    let obj = await ext.storage[storageType === "L" ? "local" : "sync"].get(key);
    return obj?.[key];
  },
  set: async (data) => ext.storage.sync.set(data),
  delete: async (key: string) => ext.storage.sync.remove(key)
};

export default storage;