import _API from "@lib/api/extension";
import locales from "@locales";
import type { RecommendedCandidate } from "@typings";

const renderCandidatesSection = (candidates: RecommendedCandidate[]) => {
  return candidates.map(candidate => `
  <div class="candidates-section__entry">
    <img src="${candidate.avatar}">
    <div>
      <div class="candidate-info">
        <a class="blue-bold-link" target="_blank" href="/users/redirect_user/${candidate.znanijaId}">
          ${candidate.nick}
        </a>
        <span> • ${candidate.rank}</span>
      </div>
      <span>${candidate.answersCount} ${locales.common.ans} • ${candidate.subjects[0]}</span>
    </div>
  </div>
  `).join("");
};

async function renderRecommendedCandidates() {
  let candidates = await _API.GetRecommendedCandidates();

  let candidatesSection = document.querySelector(".candidates-section");

  if (!candidatesSection) {
    let asideBox = document.querySelector(".sg-layout__aside-content > .sg-flex:first-child");
    asideBox.insertAdjacentHTML("afterend", `<div class="candidates-section">
      <div class="sg-flex sg-flex--justify-content-space-between sg-flex--align-items-center sg-flex--margin-bottom-xs">
        <h2 class="sg-headline">${locales.common.candidates}</h2>
        <span class="reload-candidates-section">обновить</span>
      </div>
      <div class="candidates-entries">
      ${renderCandidatesSection(candidates)}
      </div>
    </div>`);

    document.querySelector<HTMLButtonElement>(".reload-candidates-section").onclick = () => 
      renderRecommendedCandidates();
  } else {
    candidatesSection.querySelector(".candidates-entries").innerHTML = renderCandidatesSection(
      candidates
    );
  }
}

export default renderRecommendedCandidates;