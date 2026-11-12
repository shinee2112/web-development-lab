// Lab 9 — Feedback form validators
// Функц бүр { valid, message, value } объект буцаана.

function validateName(value) {
  const cleaned = String(value ?? "").trim();
  if (!cleaned) return { valid: false, message: "Нэрээ оруулна уу.", value: cleaned };
  if (cleaned.length < 2 || cleaned.length > 50) {
    return { valid: false, message: "Нэр 2–50 тэмдэгттэй байна.", value: cleaned };
  }
  if (/[0-9]/.test(cleaned)) {
    return { valid: false, message: "Нэр тоо агуулах ёсгүй.", value: cleaned };
  }
  return { valid: true, message: "Нэр зөв байна.", value: cleaned };
}

function validateEmail(value) {
  const email = String(value ?? "");
  if (!email) return { valid: false, message: "Имэйл хаягаа оруулна уу.", value: email };
  if (/\s/.test(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, message: "Имэйл нэр@домэйн.өргөтгөл хэлбэртэй байна.", value: email };
  }
  return { valid: true, message: "Имэйл зөв байна.", value: email };
}

function validatePassword(value) {
  const password = String(value ?? "");
  if (password.length < 8) {
    return { valid: false, message: "Нууц үг дор хаяж 8 тэмдэгт байна.", value: password };
  }
  if (/\s/.test(password)) {
    return { valid: false, message: "Нууц үг хоосон зай агуулахгүй.", value: password };
  }
  if (!/[A-Za-zА-Яа-яЁёӨөҮү]/.test(password) || !/[0-9]/.test(password)) {
    return { valid: false, message: "Нууц үг үсэг болон тоо агуулна.", value: password };
  }
  return { valid: true, message: "Нууц үг зөв байна.", value: password };
}

function validateMessage(value) {
  const cleaned = String(value ?? "").trim();
  if (cleaned.length < 10 || cleaned.length > 500) {
    return { valid: false, message: "Зурвас 10–500 тэмдэгттэй байна.", value: cleaned };
  }
  return { valid: true, message: "Зурвас зөв байна.", value: cleaned };
}

window.Validators = {
  validateName, validateEmail, validatePassword, validateMessage
};
