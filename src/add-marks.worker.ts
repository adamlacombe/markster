export async function addMarks(text: string, words: string) {
  if (words.length === 0) return text;

  const replaceAll = (str: string, find: string, replace: string) => str.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);

  const searchWords = words.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').split(" ").filter(i => i.trim().length > 0);
  const markedText = text.replace(new RegExp(searchWords.join("|"), "gi"), matched => `<mark>${matched}</mark>`);

  // https://stackoverflow.com/a/7671978/9238321
  // remove <mark></mark> from any html attributes
  return markedText.replace(new RegExp(/[\w:\-]+ ?= ?("[^"]+"|'[^']+'|\w+)/, 'g'), matched => replaceAll(replaceAll(matched, '</mark>', ''), '<mark>', ''));
}