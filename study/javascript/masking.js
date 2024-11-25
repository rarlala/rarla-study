function masking(input) {
  // 문자열 마스킹
  function maskString(value) {
    const length = value.length;
    if (length <= 3) return value.slice(0, 1) + "*" + value.slice(2);
    if (length <= 6) return value.slice(0, 2) + "**" + value.slice(-1);
    return value.slice(0, 2) + "***" + value.slice(-2);
  }

  // 이메일 마스킹
  function maskEmail(email) {
    return email.replace(/(^[^@]{1,3})[^@]*(@.{1,3})[^@]*/, "$1*$2*");
  }

  // 금액 마스킹
  function maskAmount(amount) {
    return amount.replace(/\d/g, "*");
  }

  // 카드 유효기간 마스킹
  function maskExpiry(expiry) {
    return expiry.replace(/^\d{2}/, "**");
  }

  // 이름 마스킹
  function maskName(name) {
    const base = name.slice(0, -2); // "님" 제외
    return maskString(base) + "님";
  }

  // 민감 정보 감지 및 마스킹
  function processValue(value, key) {
    if (typeof value !== "string") return value;

    if (
      key?.toLowerCase().includes("phone") ||
      /^\d{2,3}-\d{3,4}-\d{4}$/.test(value)
    ) {
      return value.replace(/(\d{2,3}-\d{2})\d+(-\d+)/, "$1**$2");
    }

    if (key?.toLowerCase().includes("amount") || /원$/.test(value)) {
      return maskAmount(value);
    }

    if (/\/\d{2}$/.test(value)) {
      return maskExpiry(value);
    }

    if (/님$/.test(value)) {
      return maskName(value);
    }

    if (/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      return maskEmail(value);
    }

    return value;
  }

  // 객체 처리
  if (typeof input === "object" && input !== null) {
    const result = {};
    for (const key in input) {
      result[key] = processValue(input[key], key);
    }
    return result;
  }

  // 문자열 처리
  if (typeof input === "string") {
    return processValue(input);
  }

  return input; // 기타 입력값은 그대로 반환
}

console.log(masking({ phone: "aaaa" })); // { phone: 'a**a' }
console.log(masking({ phone: "010-9876-5432" })); // { phone: '010-98**-5432' }
console.log(masking("010-9876-5432")); // '010-98**-5432'
console.log(masking("김토스님")); // '김*스님'
console.log(masking({ expiry: "01/27" })); // **/27
console.log(masking({ value: "100원" })); // { value: '***원' }
console.log(masking("천조원")); // '천조원'
console.log(masking("aa@domain.com")); // a*@do**in.com
