import locales from "@locales";

export default (fullReason?: string) => {
  let match = locales.deletionReasons.find(
    reason => fullReason?.includes(reason.text)
  );
  
  return match || { id: 0, name: "" };
};