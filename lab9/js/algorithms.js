// Lab 9 — JavaScript algorithm practice
// Бэлэн алгоритмын функц ашиглахгүйгээр өөрсдөө хэрэгжүүлэв.

function sumTo(n) {
  if (!Number.isInteger(n) || n < 0) return null;
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

function factorial(n) {
  if (!Number.isInteger(n) || n < 0) return null;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function fizzBuzz(n) {
  if (!Number.isInteger(n) || n < 1) return [];
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i);
  }
  return result;
}

function countVowels(value) {
  const vowels = "aeiouаеёиоуыэюяөүAEIOUАЕЁИОУЫЭЮЯӨҮ";
  let count = 0;
  const text = String(value);
  for (const character of text) {
    if (vowels.includes(character)) count++;
  }
  return count;
}

function isPalindrome(value) {
  const normalized = String(value).toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  if (normalized.length === 0) return false;
  let left = 0;
  let right = normalized.length - 1;
  while (left < right) {
    if (normalized[left] !== normalized[right]) return false;
    left++;
    right--;
  }
  return true;
}

function maxOf(values) {
  if (!Array.isArray(values) || values.length === 0) return null;
  let maximum = Number(values[0]);
  if (!Number.isFinite(maximum)) return null;
  for (let i = 1; i < values.length; i++) {
    const current = Number(values[i]);
    if (!Number.isFinite(current)) return null;
    if (current > maximum) maximum = current;
  }
  return maximum;
}

function digitSum(value) {
  if (!Number.isFinite(Number(value))) return null;
  let number = Math.floor(Math.abs(Number(value)));
  let sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  return sum;
}

window.Algorithms = {
  sumTo, factorial, isPrime, fizzBuzz,
  countVowels, isPalindrome, maxOf, digitSum
};
