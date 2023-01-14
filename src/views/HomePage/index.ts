import _API from "@lib/api/extension";
import renderRecommendedCandidates from "./renderRecommendedCandidates";

const findUserId = (link: HTMLLinkElement) => +/\d+$/.exec(link.href);

class Homepage {
  #box: HTMLDivElement;

  constructor() {
    this.Init();
  }

  Init() {
    let box: HTMLDivElement = document.querySelector(`div[data-testid=ranking-content]`);

    if (!box) return setTimeout(this.Init, 1000);

    this.#box = box;

    this.BindMutationObserver();
    this.RenderLabels();
    renderRecommendedCandidates();
  }

  BindMutationObserver() {
    const observer = new MutationObserver(this.RenderLabels.bind(this));
    observer.observe(this.#box, { 
      childList: true, 
      subtree: true
    });
  }

  async RenderLabels() {
    const items = [...this.#box.querySelectorAll(`[data-testid=ranking-item]:not(.candidate)`)];
    if (!items.length) return;

    const candidatesIdsToFetch = items.map(item => 
      findUserId(item.querySelector("a[href*=profil]"))
    );
  
    const candidates = await _API.GetCandidates(candidatesIdsToFetch, 50);

    for (let item of items) {
      const candidate = candidates.candidates.find(candidate =>
        findUserId(item.querySelector("a:first-child")) === candidate.znanijaId
      );
      
      const candidateColor = /отказ/i.test(candidate?.status) ? "red" :
        candidate?.isInactive ? "#55ab80" : "#6322ff";

      item.classList.add("candidate");
      if (candidate) {
        item.querySelector(".sg-avatar").insertAdjacentHTML("afterend", `
          <div style="border-color: ${candidateColor}" class="candidate-label" title="${candidate.status}">К</div>
        `);
      }
    }
  }
}

new Homepage();