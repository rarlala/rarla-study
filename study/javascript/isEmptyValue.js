function isEmptyValue(value) {
  // 1. null, undefined, ''은 비어있는 값으로 간주
  if (value === null || value === undefined || value === "") {
    return true;
  }

  // 2. 배열 처리
  if (Array.isArray(value)) {
    return value.every(isEmptyValue);
  }

  // 3. 객체 처리
  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return true;
    }

    return keys.every((key) => isEmptyValue(value[key]));
  }

  // 4. 나머지는 비어있지 않은 값으로 간주
  return false;
}

// true
console.log(isEmptyValue(null));
console.log(isEmptyValue(undefined));
console.log(isEmptyValue(""));
console.log(isEmptyValue([]));
console.log(isEmptyValue([{}, { a: [] }]));
console.log(isEmptyValue({}));
console.log(isEmptyValue({ a: { b: [] }, c: null }));

// false
console.log(isEmptyValue(0));
console.log(isEmptyValue({ a: { b: [1] }, c: null }));
