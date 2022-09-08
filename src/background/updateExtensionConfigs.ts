import ext from "webextension-polyfill";
import storage from "@lib/storage";

ext.runtime.onInstalled.addListener(async () => {
  const currentTokenInStorage = await storage.get<string>("authToken_ru", "L");

  if (!currentTokenInStorage) return;

  await storage.set({ token: currentTokenInStorage });
});