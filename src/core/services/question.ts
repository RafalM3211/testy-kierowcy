export async function getQuestion() {
  return await fetch("/question").then((res) => res?.json);
}
