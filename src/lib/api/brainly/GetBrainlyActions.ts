import type { 
  Action,
  GetActionsDataType 
} from "@typings";
import getShortDeleteReason from "@lib/getShortDeleteReason";
import locales from "@locales";
import GetPage from "./GetPage";

const REGEXPS = locales.regexps;
const LOCALIZED_TYPES = locales.localizedActionTypes;

export default async function GetBrainlyActions(
  userId: number, 
  pageId: number
): Promise<GetActionsDataType> {
  const doc = await GetPage(
    `/moderation_new/view_moderator/${userId}/page:${pageId}`
  );

  const actions: Action[] = [];

  for (let row of doc.querySelectorAll(".activities tr")) {
    let action = {} as Action;

    let taskId = +row.querySelector(".dataTime > a").textContent;
    action.task = {
      id: taskId,
      link: `/task/${taskId}`
    };

    let content = row.querySelector("td:nth-child(2)").childNodes?.[6]?.textContent;
    action.content = content.trim();

    let userLink: HTMLLinkElement = row.querySelector("td:nth-child(2) > a");
    action.user = {
      id: +userLink.href.match(/\d+$/),
      nick: userLink.textContent,
      link: userLink.href
    };

    action.date = row.querySelector(".dataTime").lastChild.textContent
      .trim()
      .split(" ")
      .join("T");

    let reason = row.querySelector("td:nth-child(2)")
      .childNodes[12]
      ?.textContent
      ?.replace(/^:\s?/, "");
    
    let beautifiedReason = getShortDeleteReason(reason);
    action.reason = {
      id: beautifiedReason?.id,
      shortReason: beautifiedReason?.name,
      fullText: reason
    };

    let actionType = row.querySelector(".reason").textContent;

    if (!actionType.match(REGEXPS.accepted) && content === "\n") {
      action.contentType = "attachment";
      action.type = "DELETED";
      action.icon = "attachment";
      action.localizedType = LOCALIZED_TYPES.ATTACHMENT_DELETED;
    } else if (actionType.match(REGEXPS.accepted)) {
      action.type = "ACCEPTED";
      action.localizedType = LOCALIZED_TYPES.ACCEPTED;
      action.icon = "check";
      action.contentType = "unknown";
    } else if (actionType.match(REGEXPS.deleted)) {
      action.type = "DELETED";

      let isQuestion = REGEXPS.question.test(actionType);
      action.contentType = isQuestion ? "question" : "answer";
      action.icon = isQuestion ? "ask_bubble" : "answer";

      action.localizedType = LOCALIZED_TYPES.DELETED;
    } else if (actionType.match(REGEXPS.incorrect)) {
      action.contentType = "answer";
      action.type = "REPORTED_FOR_CORRECTION";
      action.localizedType = LOCALIZED_TYPES.REPORTED_FOR_CORRECTION;
      action.icon = "pencil";
    } else {
      action.contentType = "comment";
      action.type = "DELETED";
      action.icon = "comment";
      action.localizedType = LOCALIZED_TYPES.COMMENT_DELETED;
    }

    if (action.reason.shortReason)
      action.localizedType = action.reason.shortReason;

    action.iconColor = action.type === "ACCEPTED" ? "icon-green-50" :
      action.type === "REPORTED_FOR_CORRECTION" ? "icon-blue-50" : 
        `icon-${action.contentType === "answer" ? "blue" : "indigo"}-50`;

    actions.push(action);
  }

  if (!actions.length) throw Error(locales.errors.noActions);

  let currentPage = doc.querySelector("span.current");

  return {
    actions,
    hasMore: !!currentPage?.nextElementSibling,
    pageId: +currentPage?.textContent
  };
}