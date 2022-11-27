import type { Anime } from "@prisma/client";

export function getColorType(color: string) {
  let c = color.substring(1);
  let rgb = parseInt(c, 16);
  let r = (rgb >> 16) & 0xff;
  let g = (rgb >> 8) & 0xff;
  let b = (rgb >> 0) & 0xff;
  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  if (luma < 40) {
    return "dark";
  } else {
    return "light";
  }
}

function hexToRgb(hex: string) {
  hex = hex.replace("#", "");
  let aRgbHex = hex.match(/.{1,2}/g);
  if (!aRgbHex) return;
  var aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
  return {
    red: aRgb[0],
    green: aRgb[1],
    blue: aRgb[2],
  };
}

export function lightOrDark(colorHex: string) {
  let { red, green, blue } = hexToRgb(colorHex) ?? {
    red: 0,
    green: 0,
    blue: 0,
  };
  let hsp = red * 0.299 + green * 0.587 + blue * 0.114;
  // Using the HSP value, determine whether the color is light or dark
  console.log({ red, green, blue });
  if (hsp > 150) {
    return "light";
  } else {
    return "dark";
  }
}

const genreColors = ["#742802", "#c14a09", "#b0306a", "#985538", "#35654d"];

export function getGenreColor(name: string) {
  let index = (name.length + name.charCodeAt(1)) % genreColors.length;
  return genreColors[index];
}

export function getTitle(anime: Anime): string {
  return (anime.title_en || anime.title || anime.title_jp) ?? '';
}

export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export function getNumberOfLines(elementId: string) {
  let element = document.getElementById(elementId);
  console.log(element, elementId);
  if (!element) return 0;
  let lineHeight = getComputedStyle(element).getPropertyValue("line-height");
  let elementHeight = element.clientHeight;
  return Math.floor(elementHeight / parseInt(lineHeight));
}

export function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
