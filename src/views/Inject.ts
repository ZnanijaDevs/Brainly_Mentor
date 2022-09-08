import ToBackground from "@lib/ToBackground";
import type { ServerConfig } from "@typings/extension";
import _API from "@lib/api/extension";

class Core {
  private path = window.location.href;

  private Path(pattern: RegExp): boolean {
    return pattern.test(this.path);
  }

  constructor() {
    this.InjectContent();
  }

  async SetExtensionConfigs() {
    let config: ServerConfig = {
      deletionReasons: [],
      subjects: []
    };

    try {
      config = await _API.GetConfig();
    } catch (err) {
      console.error("Failed to fetch the extension config. Maybe not logged in?", err);
    }

    localStorage.setItem("BRAINLY_MENTOR_EXTENSION_CONFIG", JSON.stringify(config));
  }

  async InjectContent() {
    if (this.Path(/\/moderation_new\/view_moderator\/\d+/)) {
      this.InjectFiles([
        "content-scripts/ModeratorActions/index.js",
        "styles/ModeratorActions/styles.css"
      ]);//, { oldPage: true, cleanBody: true, loadConfig: true });
    }

    if (this.Path(/\/profil\/[A-Za-z0-9]+-\d+/)) {
      this.InjectFiles([
        "content-scripts/UserProfile/index.js",
        "styles/UserProfile/styles.css"
      ]);
    }

    if (this.Path(/\/$|\/(subject|predmet)\//)) {
      this.InjectFiles([
        "content-scripts/HomePage/index.js",
        "styles/HomePage/styles.css"
      ]);
    }

    if (this.Path(/(\/$)|(\/(question|task|devoir)\/\d+)|(\/(subject|matiere)\/\w+)/)) {
      this.InjectFiles([
        "content-scripts/Core/index.js",
        "content-scripts/Dashboard/index.js",
        "styles/Dashboard/styles.css"
      ]);
    }
  }

  /** Inject content scripts and CSS */
  private async InjectFiles(
    files: string[],
    //options: FileInjectionOptions = { oldPage: false, cleanBody: false, loadConfig: false }
  ) {
    // if (options.loadConfig) await this.SetExtensionConfigs();

    const jsFiles = files.filter(file => file.match(/\.js$/));
    const cssFiles = files.filter(file => file.match(/\.css$/));

    if (cssFiles.length) ToBackground("InjectStyles", cssFiles);

    window.addEventListener("load", async function() {
      return await ToBackground("InjectScripts", jsFiles);
    });
  }
}

new Core();