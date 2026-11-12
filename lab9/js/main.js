// Lab 9 — Form validation, type experiments and algorithm examples
const { validateName, validateEmail, validatePassword, validateMessage } = window.Validators;

const typeExamples = [
  { value: "Шинэбаяр", type: typeof "Шинэбаяр" },
  { value: 2026, type: typeof 2026 },
  { value: true, type: typeof true },
  { value: null, type: typeof null },
  { value: Number("42"), type: typeof Number("42") },
  { value: String(42), type: typeof String(42) }
];
console.table(typeExamples);
console.log("0.1 + 0.2 =", 0.1 + 0.2);
console.log("0.1 + 0.2 === 0.3:", 0.1 + 0.2 === 0.3);
console.log("Number('25'):", Number("25"), "| String(25):", String(25));

const examples = [
  ["sumTo(5)", window.Algorithms.sumTo(5)],
  ["factorial(5)", window.Algorithms.factorial(5)],
  ["isPrime(17)", window.Algorithms.isPrime(17)],
  ["fizzBuzz(15)", window.Algorithms.fizzBuzz(15)],
  ["countVowels('Сайн байна уу')", window.Algorithms.countVowels("Сайн байна уу")],
  ["isPalindrome('level')", window.Algorithms.isPalindrome("level")],
  ["maxOf([3, 9, 2])", window.Algorithms.maxOf([3, 9, 2])],
  ["digitSum(2026)", window.Algorithms.digitSum(2026)]
];
console.table(examples.map(([functionName, result]) => ({ functionName, result: Array.isArray(result) ? result.join(", ") : result })));

const form = document.querySelector("#feedbackForm");
const fields = {
  name: { input: document.querySelector("#name"), validate: validateName },
  email: { input: document.querySelector("#email"), validate: validateEmail },
  password: { input: document.querySelector("#password"), validate: validatePassword },
  message: { input: document.querySelector("#message"), validate: validateMessage }
};

function showFieldResult(field, result) {
  const feedback = field.input.parentElement.querySelector(".field-feedback");
  field.input.classList.toggle("is-valid", result.valid);
  field.input.classList.toggle("is-invalid", !result.valid);
  field.input.setAttribute("aria-invalid", String(!result.valid));
  feedback.textContent = result.message;
  feedback.classList.toggle("success", result.valid);
  feedback.classList.toggle("error", !result.valid);
  return result.valid;
}

Object.values(fields).forEach((field) => {
  field.input.addEventListener("blur", () => {
    showFieldResult(field, field.validate(field.input.value));
  });
  field.input.addEventListener("input", () => {
    if (field.input.classList.contains("is-invalid") || field.input.classList.contains("is-valid")) {
      showFieldResult(field, field.validate(field.input.value));
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formIsValid = true;

  Object.values(fields).forEach((field) => {
    const valid = showFieldResult(field, field.validate(field.input.value));
    if (!valid) formIsValid = false;
  });

  const status = document.querySelector("#formStatus");
  if (formIsValid) {
    status.textContent = "Баярлалаа! Таны санал хүсэлт амжилттай шалгагдлаа.";
    status.className = "form-status success";
    form.reset();
    Object.values(fields).forEach((field) => {
      field.input.classList.remove("is-valid", "is-invalid");
      field.input.removeAttribute("aria-invalid");
      field.input.parentElement.querySelector(".field-feedback").textContent = "";
    });
  } else {
    status.textContent = "Оруулсан мэдээллээ шалгаад дахин оролдоно уу.";
    status.className = "form-status error";
  }
});
