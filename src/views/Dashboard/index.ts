import renderApp from "./renderApp";

class Dashboard {
  private openButton: HTMLButtonElement;

  constructor() {
    this.RenderOpenButton();
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
      <div id="mentors-modal-container"></div>
    `);

    this.openButton = document.querySelector(".open-mentees-dashboard");
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

      renderApp(modalContainer);
    };
  }
  /* private openDashboardButton: HTMLButtonElement;
  private dashboardOverlay: HTMLDivElement;
  private body = document.body;

  constructor() {
    this.Build();
  }

  private async Build() {
    await this.InsertButtons();
    await this.BindButtonListener();
  }

  private async InsertButtons() {
    document.body.insertAdjacentHTML("beforeend", `
      <button class="open-mentees-dashboard sg-button sg-button--facebook sg-button--s sg-button--icon-only">
        <span class="sg-button__icon">
          <div class="sg-icon sg-icon--adaptive sg-icon--x16">
            <svg class="sg-icon__svg" role="img" focusable="false"><use xlink:href="#icon-academic_cap" aria-hidden="true"></use></svg>
          </div>
        </span>
      </button>
      <div class="overlay hidden"></div>
    `);

    this.openDashboardButton = document.querySelector(".open-mentees-dashboard");
    this.dashboardOverlay = document.querySelector(".overlay");

    const modPanelContent = document.querySelector(".brn-moderation-panel__content");

    if (!modPanelContent) return;
    if (modPanelContent.classList.contains("js-hidden")) 
      this.openDashboardButton.classList.add("to-bottom");

    const observer = new MutationObserver(() =>
      this.openDashboardButton.classList.toggle("to-bottom")
    );
    observer.observe(modPanelContent, { attributes: true });
  }

  private async BindButtonListener() {
    this.openDashboardButton.onclick = () => {
      ShowElement(this.dashboardOverlay);
      this.body.style.overflow = "hidden";

      if (!this.dashboardOverlay.children.length) return RenderApp();
    };
  }*/
}

new Dashboard();