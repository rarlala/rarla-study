function isPalindromicGrid(text) {
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < text[i].length; j++) {
      if (text[i][j] !== text[j][i]) {
        return false;
      }
    }
  }
  return true;
}

console.log(isPalindromicGrid(["WOW", "OEO", "WOW"]));
console.log(isPalindromicGrid(["HEL", "LOO", "OLE"]));
console.log(isPalindromicGrid(["SATOR", "AREPO", "TENET", "OPERA", "ROTAS"]));
console.log(isPalindromicGrid(["ABCDE", "FGHIJ", "KLMNO", "PQRST", "UVXYZ"]));
