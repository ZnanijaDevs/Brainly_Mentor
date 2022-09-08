import BrainlyApi from "@brainly/index";
import storage from "@lib/storage";
import locales from "@locales";
import flash from "@utils/flashes";

storage.get(`authToken_${locales.market}`).then(async function(token) {
  if (token) return;

  try {
    const userConversation = await BrainlyApi.GetDM(locales.botUserId);

    const mentorTokenRegex = /(?<=\[).+(?=__brainly-mentor]$)/;

    const lastMessage = userConversation.data.messages
      .reverse()
      .find(message => 
        message.user_id === locales.botUserId &&
        message.content.match(mentorTokenRegex)
      );

    const mentorToken = lastMessage.content
      .split("\n")
      .pop()
      .match(mentorTokenRegex)?.[0];
    
    if (!mentorToken) throw Error(locales.errors.couldNotFindAuthTokenInDM);

    await storage.set({ [`authToken_${locales.market}`]: mentorToken });

    flash("success", locales.common.youHaveBeenAuthorized);

    window.location.reload();
  } catch (err) {
    flash("info", `${locales.errors.couldNotAuthorizeYou}: ${err.message}`);
  }
});