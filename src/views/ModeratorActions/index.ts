import { version as brainlyStyleGuideVersion } from "brainly-style-guide/package.json";
import injectApp from "./injectApp";

document.body.innerHTML = "";

// Remove Brainly stylesheets and scripts
document.querySelectorAll(`
  script[src*="zadanium"], 
  script[src*="chat/bind"],
  link[rel="stylesheet"]
`).forEach(element => element.remove());

import("@assets/styleguide-icons.js");
        
document.head.innerHTML += `
  <link href="https://styleguide.brainly.com/${brainlyStyleGuideVersion}/style-guide.css" rel="stylesheet" />
`;

document.body.insertAdjacentHTML("afterbegin", `
  <div class="flash-messages-container"></div>
  <div id="app"></div>
  <div id="question-preview-modal-container"></div>
`);

document.body.id = "brainly-mentor";

injectApp();