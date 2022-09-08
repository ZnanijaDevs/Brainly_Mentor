import _API from "@brainly/index";

export type MyMenteeDataType = {
  nick: string;
  id: number;
  dailyActionsCount: number;
};

type UserRankingPlace = {
  place: number;
  points: number;
  user: {
    id: string;
  };
}

const toUserId = (encodedId: string) => +atob(encodedId).split(":").pop();

export default async (): Promise<MyMenteeDataType[]> => {
  const [
    moderationItemsRes,
    extraGraphqlRes
  ] = await Promise.all([
    _API.GetModerationItems(),
    _API.GQL(`
      query {
        viewer { user {id} }
        userRankings(rankingType: MODERATOR_DAILY) {
          place
          user {id}
        }
      }
    `)
  ]);

  const myUserId = toUserId(extraGraphqlRes.data.viewer.user.id);
  const userRankings: UserRankingPlace[] = extraGraphqlRes.data.userRankings;

  const mentees: MyMenteeDataType[] = [];

  for (let user of moderationItemsRes.users_data) {
    if (user.id === myUserId) break;

    let graphqlUserPlaceData = userRankings.find(
      place => toUserId(place.user.id) === user.id
    );

    mentees.push({
      nick: user.nick,
      id: user.id,
      dailyActionsCount: graphqlUserPlaceData?.points ?? 0
    });
  }

  return mentees;
};