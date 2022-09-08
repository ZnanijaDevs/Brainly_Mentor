import type { Warn } from "@typings";
import GetPage from "./GetPage";

export default async (userId: number) => {
  const doc = await GetPage(`/users/view_user_warns/${userId}`);

  const warns: Warn[] = [];

  for (let row of doc.querySelectorAll("tr")) {
    const fields = row.querySelectorAll("td");
    if (fields.length !== 7) continue;

    const warnObject = {} as Warn;
    warnObject.time = fields[0].innerText;
    warnObject.reason = fields[1].innerHTML;
    warnObject.content = fields[2].innerHTML;
    warnObject.taskId = parseInt(fields[3].querySelector("a")?.href.match(/\d+/)[0]);
    warnObject.warner = fields[4].innerText.trim();
    warnObject.active = !!fields[5].querySelector(`a[href*="cancel"]`);
      
    warns.push(warnObject);
  }

  return warns;
};