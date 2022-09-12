import _API from "@lib/api/extension";

const helpedInfoSelector = document.querySelector(".helped_info");
const nickSelector: HTMLLinkElement = document.querySelector(".info .info_top > .ranking > h2 > a");

const userId = +nickSelector.href.match(/\d+$/);
const userNick = nickSelector.textContent.trim();

(async function() {
  if (
    !userId || 
    !userNick || 
    !document.getElementById("UserBanAddForm") ||
    !helpedInfoSelector
  ) return;

  const data = await _API.GetCandidates([userId], 1);
  const candidateIsFound = data.count > 0;

  helpedInfoSelector.insertAdjacentHTML("beforebegin", `
    <div title="Кандидат" class="candidate-label">
      <span class="candidate-${candidateIsFound ? "" : "not"}-found">K</span>
      ${candidateIsFound ? `<span>${data.candidates[0].status}</span>` : ""}
    </div>
  `);
})();