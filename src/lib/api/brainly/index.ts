import locales from "@locales";
import type { 
  CommonResponse,
  GetConversationResponse,
  GetMessagesResponse
} from "@typings/brainly";

class BrainlyApi {
  private graphqlPath = "/graphql/ru";
  private legacyApiPath = "/api/28";

  private readonly userToken: string;

  constructor() {
    this.userToken = document.cookie
      .split("; ")
      .find(cookie => /\[Token\]\[Long\]/.test(cookie))
      ?.split("=")
      ?.pop();
  }

  private async Legacy<T>(
    method: "GET" | "POST",
    apiMethod: string,
    body?
  ): Promise<CommonResponse<T>> {
    const res = await fetch(`${this.legacyApiPath}/${apiMethod}`, {
      method,
      body: method === "GET" ? null : JSON.stringify(body),
      credentials: "include"
    }).then(data => data.json());

    if (!res.success) throw Error(res.message || locales.errors.brainlyError);

    return res;
  }

  async GQL(query: string) {
    const r = await fetch(this.graphqlPath, {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "X-B-Token-Long": this.userToken,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json());

    if ("errors" in r) {
      console.error(r);

      throw Error(locales.errors.brainlyError);
    }

    return r;
  }

  /* eslint-disable max-len */
  async GetDM(userId: number): Promise<GetMessagesResponse> {
    const conversation: GetConversationResponse = await this.Legacy(
      "POST", 
      "api_messages/check", 
      { user_id: userId }
    );

    return await this.Legacy(
      "GET", 
      `api_messages/get_messages/${conversation.data.conversation_id}`
    );
  }

  async GetModerationItems(): Promise<CommonResponse> {
    return await this.Legacy("POST", "moderation_new/index", {
      category_id: 0,
      subject_id: 0
    });
  }
}

export default new BrainlyApi();