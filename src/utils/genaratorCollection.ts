export function genarateRandomColor() {
  const red = Math.floor(Math.random() * 155) + 100;
  const green = Math.floor(Math.random() * 155) + 100;
  const blue = Math.floor(Math.random() * 155) + 100;
  return `rgb(${red},${green},${blue})`;
}
