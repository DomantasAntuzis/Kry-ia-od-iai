export default (lentele, x, y, len, dir) => {
  //   console.log(x);
  //   console.log(y);
  //   console.log(len);
  //   console.log(dir);

  x--;
  y--;

  let zodis = "";
  for (let i = 0; i < len; i++) {
    if (dir == 1) {
      if (lentele[y] && lentele[y][x + i]) {
        zodis += lentele[y][x + i];
      } else {
        zodis = "";
        break;
      }
    } else if (dir == 2) {
      if (lentele[y + i] && lentele[y + i][x]) {
        zodis += lentele[y + i][x];
      } else {
        zodis = "";
        break;
      }
    } else if (dir == 3) {
      if (lentele[y + i] && lentele[y + i][x + i]) {
        zodis += lentele[y + i][x + i];
      } else {
        zodis = "";
        break;
      }
    }
  }
  //   console.log(zodis);
  return zodis;
};
