import type {
  Mentee, 
  BasicSuccessResponse,
  Mentor,
  MenteeCommonData,
  Candidate
} from "@typings";
import locales from "@locales";
import storage from "@lib/storage";
import type { ServerConfig } from "@typings/extension";

const ERRORS = locales.errors;

class Api {
  private serverUrl = "https://mentors-v2.br-helper.com";

  private extensionConfig: ServerConfig;

  get config(): ServerConfig {
    if (!this.extensionConfig) {
      let configInLS = localStorage.getItem("BRAINLY_MENTOR_EXTENSION_CONFIG");
      this.extensionConfig = JSON.parse(configInLS);
    }

    return this.extensionConfig;
  }

  get serverURL() {
    return this.serverUrl;
  }

  private async Req(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    apiMethod: string,
    body?
  ) {
    const authToken = await storage.get("token");
    if (!authToken) throw Error(ERRORS.notAuthed);

    const requestUrl = `${this.serverURL}/${apiMethod}`;
    const requestHeaders = {
      "Authorization": `Bearer ${authToken}`
    };

    if (body) {
      body = JSON.stringify(body);
      requestHeaders["Content-Type"] = "application/json";
    }

    // TODO: handle errors
    const res = await fetch(requestUrl, {
      method,
      body,
      headers: requestHeaders
    });

    const data = await res.json();

    return data;
  }

  async GetMenteesWithoutStats(): Promise<{
    mentees: MenteeCommonData[];
  }> {
    return await this.Req("GET", "mentees?withoutStats=true");
  }

  async GetMentees(mentorId?: number): Promise<{
    mentees: Mentee[];
  }> {
    let path = `mentees`;
    if (mentorId) path += `?id=${mentorId}`;

    return await this.Req("GET", path);
  }

  async AddMentee(userId: number, mentorId: number): Promise<{
    mentee: Mentee;
  }> {
    return await this.Req("POST", "mentees", { 
      id: userId,
      mentorId
    });
  }
  
  async EditMentee(mentorId: number, menteeId: number, data: {
    note: string;
  }): Promise<BasicSuccessResponse> {
    return await this.Req("PUT", `mentees/${mentorId}/${menteeId}`, data);
  }

  async DeleteMentee(mentorId: number, userId: number): Promise<BasicSuccessResponse> {
    return await this.Req("DELETE", `mentees/${mentorId}/${userId}`);
  }

  async GetMentors(): Promise<{ mentors: Mentor[] }> {
    return await this.Req("GET", "mentors");
  }

  async GetCommonMentorsData(): Promise<{
    mentors: {id: number; nick: string}[]
  }> {
    return await this.Req("GET", "mentors?includeMentees=false");
  }

  async GetMe(): Promise<{ mentor: Mentor }> {
    return await this.Req("GET", "mentors/me");
  }

  async AddMentor(data: {
    mentorId: number;
    senior: boolean;
  }): Promise<{
    mentor: Mentor
  }> {
    return await this.Req("POST", "mentors", data);
  }

  async DeleteMentor(mentorId: number): Promise<BasicSuccessResponse> {
    return await this.Req("DELETE", `mentors/${mentorId}`);
  }

  async EditMentor(mentorId: number, data: {
    senior: boolean;
  }): Promise<BasicSuccessResponse> {
    return await this.Req("PUT", `mentors/${mentorId}`, data);
  }

  async GetCandidates(ids: number[]): Promise<{
    count: number;
    candidates: Candidate[];
  }> {
    return await this.Req("GET", `candidates?ids=${ids.join(",")}`);
  }

  /* async GetCandidates(id?: number): Promise<{
    candidates: Candidate[];
  }> {
    let path = "candidates";
    if (id) path += `?id=${id}`;

    return await this.Req("GET", path);
  }

  async ReviewCandidate(id: number): Promise<{ warnings: string[] }> {
    return await this.Req("POST", `candidates/review/${id}`);
  }*/

  async GetConfig(): Promise<ServerConfig> {
    return await this.Req("GET", "config.json");
  }

}

const _API = new Api();
export default _API;