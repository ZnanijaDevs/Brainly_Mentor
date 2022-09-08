export default (
  type: "info" | "error" | "success" | "default",
  text: string
) => {
  const element = document.createElement("div");

  element.onclick = () => element.remove();
  setTimeout(() => element.remove(), 5000);

  element.classList.add("sg-flash");

  element.innerHTML = `
    <div class="sg-flash__message sg-flash__message--${type}">
      <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${text}</div>
    </div>
  `;

  document.querySelector(".flash-messages-container").appendChild(element);
};