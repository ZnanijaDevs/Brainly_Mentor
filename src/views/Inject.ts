/* eslint-disable no-useless-escape */
import ToBackground from "@lib/ToBackground";

const SCRIPTS_BY_ROUTES: Record<string, string[]> = {
  "\/moderation_new\/view_moderator\/\\d+": [
    "ModeratorActions/index.js", 
    "ModeratorActions/style.css"
  ],
  "\/profil\/[A-Za-z0-9]+-\\d+": ["UserProfile/index.js", "UserProfile/style.css"],
  "\/$|\/(subject|predmet)\/": ["HomePage/index.js", "HomePage/style.css"],
  "(\/$)|(\/task\/\\d+)|(\/subject\/\\w+)": [
    "Core/index.js",
    "Dashboard/index.js",
    "Dashboard/style.css"
  ]
};

class Core {
  private path = window.location.href;

  private Path(pattern: RegExp | string): boolean {
    if (typeof pattern === "string") pattern = new RegExp(pattern);

    return pattern.test(this.path);
  }

  constructor() {
    this.InjectContent();
  }

  async InjectContent() {
    Object.entries(SCRIPTS_BY_ROUTES).forEach(([pathRegex, scripts]) => {
      if (this.Path(pathRegex)) this.InjectFiles(scripts);
    });
  }

  /** Inject content scripts and CSS */
  private async InjectFiles(files: string[]) {
    files = files.map(file => `content-scripts/${file}`);

    const jsFiles = files.filter(file => file.match(/\.js$/));
    const cssFiles = files.filter(file => file.match(/\.css$/));

    if (cssFiles.length) ToBackground("InjectStyles", cssFiles);

    window.addEventListener("load", async function() {
      return await ToBackground("InjectScripts", jsFiles);
    });
  }
}

new Core();