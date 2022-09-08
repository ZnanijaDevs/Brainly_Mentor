import BrainlyApi from ".";
import type { GetActionsDataType } from "@typings";
import GetBrainlyActions from "./GetBrainlyActions";

export default async function GetActions(moderatorId: number, pageId: number): Promise<
  GetActionsDataType
> {
  const data = await GetBrainlyActions(moderatorId, pageId);
  const actions = data.actions;

  // Get extra data
  let usersDataQuery = "";
  actions.forEach(action => {
    let userId = action.user.id;

    usersDataQuery += `_${userId}: user(id: "${btoa(`user:${userId}`)}") {
      avatar {thumbnailUrl url} 
      specialRanks {name id} 
      rank {name}
    } `;
  });

  let extraData = await BrainlyApi.GQL(`query { ${usersDataQuery} }`);

  let users = Object.keys(extraData.data).map(x => 
    ({ ...extraData.data[x], id: +x.replace("_", "") })
  );

  for (let action of actions) {
    let userData = users.find(user => user.id === action.user.id);

    action.user.avatar = userData?.avatar?.url || "";
    action.user.isModerator = !!userData?.specialRanks?.length;
    action.user.rank = userData?.rank?.name || "";
  }

  return data;
}