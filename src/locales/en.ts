export default {
  "market": "us",
  "marketURL": "https://brainly.com",
  "marketHost": "brainly.com",
  "marketName": "brainly",
  "common": {
    "accountDeleted": "Account deleted",
    "chooseMentor": "Choose a mentor",
    "daily": "daily",
    "weekly": "weekly",
    "monthly": "monthly",
    "withWarn": "with warn",
    "as": "as",
    "questionLog": "Log",
    "pts": "pts",
    "hasNotStartedYet": "Hasn't started yet",
    "bans": "Bans",
    "bans_LEFT": "Left",
    "givenBy": "Given by",
    "noWarns": "No warnings",
    "question": "Question",
    "answer": "Answer",
    "areYouSureToDeleteMentee": "Are you sure to delete this mentee?\nAll data, including statistics, approved and disapproved actions, will be permanently deleted.",
    "areYouSureToDeleteMentor": "Are you sure to delete this mentor?",
    "deleteMentee": "Delete mentee",
    "deleteMentor": "Delete mentor",
    "youHaveBeenAuthorized": "You have been successfully authorized in the extension!",
    "deletionReason": "Deletion reason",
    "dateBetween": "Date between",
    "close": "Close",
    "reload": "Reload",
    "today": "today",
    "yesterday": "yesterday",
    "nDaysAgo": "%{days} days ago",
    "all": "All",
    "nick": "Nick",
    "filters": "Filters",
    "viewActions": "View actions",
    "viewMentor": "View mentor",
    "loading": "Loading...",
    "actions": "Actions",
    "tryAgain": "Try again",
    "approveAction": "Approve!",
    "disapproveAction": "Disapprove!",
    "revertAction": "Revert this action",
    "answerDeleted": "Answer deleted",
    "questionDeleted": "Question deleted",
    "commentDeleted": "Comment deleted",
    "attachmentDeleted": "Attachment deleted",
    "contentAccepted": "Content accepted",
    "toCorrect": "Asked for correction",
    "previousPage": "Previous page",
    "nextPage": "Next page",
    "deleted": "Deleted",
    "yourMentees": "Your mentees",
    "mentors": "Mentors",
    "mentees": "Mentees",
    "noMentees": "No mentees",
    "toMentors": "To the mentors",
    "toUMentees": "To your mentees",
    "note": "Note",
    "senior": "Senior",
    "contentType": "Content type",
    "actionType": "Action type",
    "noActionsMatchingFilters": "There are no actions matching your filters",
    "noReason": "No reason",
    "hideComments": "Hide comments",
    "nextPagesMayContainActions": "The next pages can also contain actions matching your filters",
    "actionFilters": {
      "contentTypes": [
        {"value": "answer", "text": "Answers"},
        {"value": "question", "text": "Questions"},
        {"value": "comment", "text": "Comments"},
        {"value": "attachment", "text": "Attachments"},
      ],
      "actionTypes": [
        {"value": "DELETED", "text": "Deleted"},
        {"value": "ACCEPTED", "text": "Accepted"},
        {"value": "REPORTED_FOR_CORRECTION", "text": "Reported for correction"},
      ],
    },
    "user": "User",
    "nickEqualsTo": "nick equals to",
    "idEqualsTo": "ID equals to",
    "rankEqualsTo": "rank equals to",
    "addMentee": "Add mentee",
    "addMentor": "Add mentor",
    "linkToUserProfile": "Link to user profile"
  },
  "errors": {
    "accountDeleted": "Account deleted",
    "couldNotLoadActions": "We could not load moderator actions :(",
    "notAuthorizedToUseExtension": "You are not authorized to use this extension",
    "couldNotAuthorizeYou": "Could not authorize you",
    "couldNotFindAuthTokenInDM": "Couldn't find auth token in DM",

    // Server errors
    "notAuthed": "You are not authorized",
    "brainlyError": "Brainly error",
    "invalidUserOrPage": "Invalid user or page ID",
    "pageNotFound": "Page not found",
    "databaseUnavailable": "The extension database is temporarily unavailable 😞",
    "internalError": "An unexpected error has occured",
    "userNotFound": "User not found",
    "invalidUser": "Invalid user",
    "invalidPayload": "Invalid payload",
    "notModerator": "The user is not a moderator",
    "marketNotSupported": "This market is not supported",
    "noActions": "This user has no actions. Yet...",
    "tokenInvalid": "Your auth token is invalid",
    "mentorNotFound": "Mentor not found",
    "cannotReviewYourActions": "You can't review your actions",
    "alreadyReviewed": "This action has already been reviewed",
    "notReviewed": "This action has not been reviewed",
    "actionNotFound": "Action not found",
    "couldNotFetchSavedActions": "We could not fetch saved actions",
    "noPrivileges": "You have no privileges to perform this operation",
    "wannaAddYourself": "Wanna add yourself? 👁️",
    "userAlreadyExists": "User already exists",
    "accountDeactivated": "Account has been deactivated",
    "menteeNotFound": "Mentee not found"
  },
  "profilePath": "/profile",
  "taskPath": "/question",
  "dateTimeFormat": "MM/DD/YYYY hh:mm:ss",
  "dateFormat": "MM/DD/YYYY",
  "timezone": "America/New_York",
  "botUserId": 54605682,
  "regexps": {
    "accepted": /accepted/i,
    "deleted": /deleted/i,
    "question": /question/i,
    "incorrect": /incorrect/i
  },
  "localizedActionTypes": {
    "ATTACHMENT_DELETED": "Attachment deleted",
    "ACCEPTED": "Accepted",
    "DELETED": "Deleted",
    "REPORTED_FOR_CORRECTION": "Reported for correction",
    "COMMENT_DELETED": "Comment deleted"
  },
};