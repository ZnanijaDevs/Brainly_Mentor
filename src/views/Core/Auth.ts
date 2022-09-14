import BrainlyApi from "@brainly/index";
import storage from "@lib/storage";
import locales from "@locales";
import flash from "@utils/flashes";

storage.get("token").then(async token => {
  if (token) {
    console.debug(`Mentor authed. Token: ${token}`);
    return;
  }

  try {
    const userConversation = await BrainlyApi.GetDM(locales.authUserId);

    const mentorTokenRegex = /(?<=\[mentor-ext-).+(?=\])/;

    const lastMessage = userConversation.data.messages
      .reverse()
      .find(message => 
        message.user_id === locales.authUserId &&
        message.content.match(mentorTokenRegex)
      );

    const mentorToken = lastMessage?.content
      .split("\n")
      .pop()
      .match(mentorTokenRegex)?.[0];
    
    if (!mentorToken) throw Error(locales.errors.couldNotFindAuthTokenInDM);

    await storage.set({ token: mentorToken });

    flash("success", locales.common.youHaveBeenAuthorized);

    window.location.reload();
  } catch (err) {
    flash("info", `${locales.errors.couldNotAuthorizeYou}: ${err.message}`);
  }
});