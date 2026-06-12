const form = document.querySelector(".signup-form");
const formNote = document.querySelector("#form-note");
const typewriterSource = document.querySelector("[data-typewriter-source]");
const typewriterOutput = document.querySelector("[data-typewriter-output]");

if (form && formNote) {
  form.addEventListener("submit", (event) => {
    if (form.getAttribute("action") === "#") {
      event.preventDefault();
      formNote.textContent = "Almost ready: connect this form to your newsletter service before publishing.";
    }
  });
}

if (typewriterSource && typewriterOutput) {
  const paragraphs = Array.from(typewriterSource.querySelectorAll("p"))
    .map((paragraph) => paragraph.textContent.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    typewriterOutput.innerHTML = paragraphs
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");
  } else {
    typewriterOutput.classList.add("is-typing");

    const typeParagraph = (paragraph, index) => {
      const node = document.createElement("p");
      typewriterOutput.append(node);
      let character = 0;

      const typeNextCharacter = () => {
        node.textContent = paragraph.slice(0, character);
        character += 1;

        if (character <= paragraph.length) {
          window.setTimeout(typeNextCharacter, 8);
          return;
        }

        if (index + 1 < paragraphs.length) {
          window.setTimeout(() => typeParagraph(paragraphs[index + 1], index + 1), 220);
          return;
        }

        typewriterOutput.classList.remove("is-typing");
      };

      typeNextCharacter();
    };

    if (paragraphs.length > 0) {
      window.setTimeout(() => typeParagraph(paragraphs[0], 0), 420);
    }
  }
}
