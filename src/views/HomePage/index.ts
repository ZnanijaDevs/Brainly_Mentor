import _API from "@lib/api/extension";

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

    const candidates = await _API.GetCandidates(
      items.map(item => findUserId(item.querySelector("a[href*=profil]")))
    );

    for (let item of items) {
      const candidate = candidates.candidates.find(candidate =>
        findUserId(item.querySelector("a:first-child")) === candidate.id
      );
      
      const candidateColor = /отказ/i.test(candidate?.status) ? "red" :
        /актив/i.test(candidate?.status) ? "#6322ff" : "#55ab80";

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