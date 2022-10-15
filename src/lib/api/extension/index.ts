import type { Mentor, Candidate, RecommendedCandidate } from "@typings";
import type { 
  GetQuestionResponseDataType, 
  QuestionLogEntriesByDateDataType,
} from "@typings/responses";

import locales from "@locales";
import storage from "@lib/storage";

const ERRORS = locales.errors;

class Api {
  private serverUrl = "https://mentors-v2.br-helper.com";
  private authToken: string;

  get serverURL() {
    return this.serverUrl;
  }

  private async Req(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    apiMethod: string,
    body?
  ) {
    if (!this.authToken) {
      let savedToken = await storage.get<string>("token");
      if (!savedToken) throw Error(ERRORS.notAuthed);

      this.authToken = savedToken;
    }

    const requestUrl = `${this.serverURL}/api/${apiMethod}`;
    const requestHeaders = {
      "Authorization": `Bearer ${this.authToken}`
    };

    if (body) {
      body = JSON.stringify(body);
      requestHeaders["Content-Type"] = "application/json";
    }

    const res = await fetch(requestUrl, {
      method,
      body,
      headers: requestHeaders
    });

    const data = await res.json();

    if ("error" in data) throw new Error(data.error);

    return data;
  }

  async GetMentors(): Promise<Mentor[]> {
    return await this.Req("GET", "mentors");
  }

  async GetMe(): Promise<Mentor> {
    return await this.Req("GET", "me");
  }

  async AddMentor(data: {
    id: number;
    senior: boolean;
  }): Promise<Mentor> {
    return await this.Req("POST", "mentors", data);
  }

  async RemoveMentor(mentorId: number) {
    const res: { deleted: boolean } = await this.Req("DELETE", `mentors/${mentorId}`);

    if (!res.deleted) throw Error(ERRORS.internalError);
  }

  async UpdateMentor(mentorId: number, data: {
    senior: boolean;
  }): Promise<Mentor> {
    return await this.Req("PUT", `mentors/${mentorId}`, data);
  }

  async GetCandidates(ids: number[], limit: number): Promise<{
    count: number;
    candidates: Candidate[];
  }> {
    return await this.Req("GET", `candidates?limit=${limit}&ids=${ids.join(",")}`);
  }

  async GetQuestion(id: number): Promise<GetQuestionResponseDataType> {
    return await this.Req("GET", `questions/${id}`);
  }

  async GetQuestionLog(questionId: number): Promise<QuestionLogEntriesByDateDataType> {
    return await this.Req("GET", `questions/log/${questionId}`);
  }

  async GetRecommendedCandidates(): Promise<RecommendedCandidate[]> {
    return await this.Req("GET", "candidates/recommended");
  }
}

const _API = new Api();
export default _API;