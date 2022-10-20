import locales from "@locales";

const domParser = new DOMParser();

export default async (
  path: string
) => {
  let url = `${locales.marketURL}${path}?client=moderator-extension`;
  let res = await fetch(url, {
    redirect: "error",
    credentials: "include",
    headers: {
      "X-Extension-Client": "Brainly_Mentor"
    }
  });

  const statusCode = res.status;

  if (statusCode !== 200) {
    if (statusCode === 410) throw Error(locales.errors.accountDeleted);
    
    throw Error(locales.errors.brainlyError);
  }

  const htmlData = await res.text();
  const parsedDocument = domParser.parseFromString(htmlData, "text/html");

  return parsedDocument;
};