export const flexCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export function backgroundImg(url: string) {
  return {
    backgroundImage: `url(${url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
}
