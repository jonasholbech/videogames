export function autoExpandTextarea() {
  const toggle = document.querySelector("button.toggle");
  const body = document.body;

  toggle.addEventListener("click", (_) => body.classList.toggle("alt"));

  document.querySelectorAll("textarea").forEach((el) => {
    el.style.height = el.setAttribute(
      "style",
      "height: " + el.scrollHeight + "px"
    );
    el.classList.add("auto");
    el.addEventListener("input", (e) => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    });
  });
}
