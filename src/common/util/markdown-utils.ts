const regexes = {
  links: /\[(.*)\]\((.*)\)/g
}

export function parseMarkdown(markdown: string) {
  return markdown.replace(regexes.links, `<a href="$2" title="$1">$1</a>`);
}
