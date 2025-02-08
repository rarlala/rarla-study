function formatNumbers(num, maxKoreanUnitCount, roundDownUnder1K = false) {
  const unit = ["만", "억", "조", "경"];

  const isNegative = num.includes("-");

  let left = num;
  let right = "";

  if (isNegative) {
    left = left.replace("-", "");
  }

  if (num.includes(".")) {
    [left, right] = num.split(".");
  }

  let arr = [];
  left = left.split("").reverse().join("");
  for (let i = 0; i < left.length; i += 4) {
    arr.push(left.slice(i, i + 4));
  }

  arr = arr.map((v) => v.split("").reverse().join(""));

  if (roundDownUnder1K) {
    arr[0] = Math.round(Number(arr[0]) / 1000) * 1000;
    right = "";
  }

  let result = arr
    .map((v, idx) => {
      return v + (idx > 0 ? unit[idx - 1] : "");
    })
    .reverse();

  if (maxKoreanUnitCount) {
    const unitLimit = result.slice(0, maxKoreanUnitCount).join(" ");
    result = unitLimit;
  }

  if (isNegative) {
    result = "-" + result;
  }

  if (right !== "") {
    result = result + "." + right;
  }

  return result;
}

console.log(formatNumbers("1234567890", 1, false));
console.log(formatNumbers("9876543210", 2, true));
console.log(formatNumbers("123.456789", 5, false));
