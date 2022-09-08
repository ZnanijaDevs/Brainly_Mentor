import locales from "@locales";
import moment from "moment";
import GetPage from "./GetPage";

export interface UserBanDetails {
  banCount: number;
  active?: {
    givenBy: {
      link: string;
      nick: string;
    };
    type: string;
    expiresIn: Date;
  }
}

export default async (userId: number): Promise<UserBanDetails> => {
  const doc = await GetPage(`/profil/__nick__-${userId}`);

  const modPanel = doc.querySelector(".mod-profile-panel");
  const cancelBanElement = doc.querySelector(`a[href^="/bans/cancel"]`)
    ?.parentElement?.parentElement;

  const activeBanDetails = {} as UserBanDetails["active"];
  const banDetails = {} as UserBanDetails;

  if (cancelBanElement) {
    activeBanDetails.type = cancelBanElement.nextElementSibling
      ?.querySelector(".orange")
      ?.textContent;

    const moderatorLink = cancelBanElement.nextElementSibling
      ?.nextElementSibling
      ?.querySelector("a");

    activeBanDetails.givenBy = {
      link: moderatorLink.href,
      nick: moderatorLink.textContent,
    };

    const expiresDateText = cancelBanElement.nextElementSibling
      ?.nextElementSibling?.nextElementSibling
      ?.querySelector(".orange")
      ?.textContent;

    if (expiresDateText)
      activeBanDetails.expiresIn = moment(expiresDateText).tz(locales.timezone, true).toDate();

    banDetails.active = activeBanDetails;
  }

  let banCount = +modPanel.querySelectorAll(".fright > .orange")?.[1]?.textContent;
  if (isNaN(banCount)) banCount = 0; // User is a moderator

  banDetails.banCount = banCount;

  return banDetails;
};