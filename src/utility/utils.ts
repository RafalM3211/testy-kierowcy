export function trimText(text: string, limit: number) {
  let returnedText = text;
  if (text.length > limit) {
    returnedText = text.slice(0, limit - 1) + "...";
  }
  return returnedText;
}

export function isImage(name: string) {
  const extension = name.slice(name.lastIndexOf(".") + 1);
  return extension === "jpg";
}
