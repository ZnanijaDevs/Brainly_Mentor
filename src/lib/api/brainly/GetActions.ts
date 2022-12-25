import BrainlyApi from ".";
import type { GetActionsDataType, SuspensionType } from "@typings";
import GetBrainlyActions from "./GetBrainlyActions";

const GET_USER_DATA_FRAGMENT = `
avatar {
  thumbnailUrl
  url
}
specialRanks {name id}
rank {name}
suspensions {
  active {
    issuer {nick}
    type
  }
}
statistics {
  warningsCount
  suspensionsCount
}
`;

type GQLUserData = {
  avatar?: {
    thumbnailUrl: string;
    url: string;
  }
  specialRanks: {
    name: string;
    id: string;
  }[];
  statistics: {
    warningsCount: number;
    suspensionsCount: number;
  };
  suspensions: {
    active?: {
      issuer: { nick: string; };
      type: SuspensionType;
    }
  };
  rank?: {
    name: string;
  }
};

export default async function GetActions(
  moderatorId: number,
  pageId: number,
  limit: number
): Promise<GetActionsDataType> {
  const data = await GetBrainlyActions(moderatorId, pageId, limit);
  const actions = data.actions;

  // Get extra data
  let usersDataQuery = "";
  actions.forEach(action => {
    let userId = action.user.id;

    usersDataQuery += `_${userId}: user(id: "${btoa(`user:${userId}`)}") {
      ${GET_USER_DATA_FRAGMENT}
    } `;
  });

  let extraData = await BrainlyApi.GQL(`query { ${usersDataQuery} }`);

  let users = Object.keys(extraData.data).map(key => {
    let user: GQLUserData = extraData.data[key];

    return { ...user, id: +key.replace("_", "") };
  });

  for (let action of actions) {
    let userData = users.find(user => user.id === action.user.id);

    action.user = {
      ...action.user,
      avatar: userData?.avatar?.url || "",
      isModerator: !!userData?.specialRanks?.length,
      rank: userData?.rank?.name || "",
      suspensionsCount: userData.statistics?.suspensionsCount ?? 0,
      warningsCount: userData.statistics?.warningsCount ?? 0,
    };

    let activeSuspension = userData.suspensions?.active;
    if (activeSuspension) {
      action.user.activeSuspension = {
        issuer: activeSuspension.issuer?.nick,
        type: activeSuspension.type
      };
    }
  }

  return data;
}