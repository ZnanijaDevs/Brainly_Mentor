import renderApp from "./renderApp";

class Dashboard {
  private openButton: HTMLButtonElement;
  private dashboardContainer: HTMLDivElement;

  constructor() {
    this.RenderOpenButton();
    this.RenderApp();
    this.AddCloseDashboardListener();
    this.AddOpenButtonObserver();
    this.AddOpenButtonListeners();
  }

  RenderOpenButton() {
    document.body.insertAdjacentHTML("beforeend", `
      <button class="open-mentees-dashboard sg-button sg-button--facebook sg-button--s sg-button--icon-only">
        <span class="sg-button__icon">
          <div class="sg-icon sg-icon--adaptive sg-icon--x16">
            <svg class="sg-icon__svg"><use xlink:href="#icon-academic_cap" aria-hidden="true"></use></svg>
          </div>
        </span>
      </button>
      <div id="mentors-modal-container" class="mentors-modal-hidden"></div>
    `);

    this.openButton = document.querySelector(".open-mentees-dashboard");
    this.dashboardContainer = document.querySelector("#mentors-modal-container");
  }

  AddOpenButtonObserver() {
    let modPanelContent = document.querySelector(".brn-moderation-panel__content");

    if (!modPanelContent) return;

    if (modPanelContent.classList.contains("js-hidden")) {
      this.openButton.classList.add("to-bottom");
    }

    const observer = new MutationObserver(() => 
      this.openButton.classList.toggle("to-bottom")
    );
    observer.observe(modPanelContent, { attributes: true });
  }

  AddOpenButtonListeners() {
    this.openButton.onclick = () => {
      const modalContainer: HTMLDivElement = document.querySelector("#mentors-modal-container");

      modalContainer.classList.toggle("mentors-modal-hidden");
    };
  }

  AddCloseDashboardListener() {
    this.dashboardContainer.onclick = e => {
      let target = e.target as HTMLDivElement;

      if (target === this.dashboardContainer) target.classList.add("mentors-modal-hidden");
    };
  }

  RenderApp() {
    renderApp(this.dashboardContainer);
  }
}

new Dashboard();