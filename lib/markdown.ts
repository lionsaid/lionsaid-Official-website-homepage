const escapeHtml = (input: string) =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatInline = (input: string) => {
  let text = escapeHtml(input);
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return text;
};

const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const markdownToHtml = (markdown: string) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let inCode = false;
  let listType: "ul" | "ol" | null = null;
  let paragraphCount = 0;
  const headingIds = new Map<string, number>();

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      if (inCode) {
        html.push("</code></pre>");
        inCode = false;
      } else {
        closeList();
        html.push("<pre><code>");
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      html.push(`${escapeHtml(rawLine)}\n`);
      continue;
    }

    if (line.trim() === "") {
      closeList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      const rawHeading = headingMatch[2];
      const content = formatInline(rawHeading);
      let id = slugify(rawHeading);
      const count = headingIds.get(id) ?? 0;
      if (count > 0) id = `${id}-${count + 1}`;
      headingIds.set(slugify(rawHeading), count + 1);
      html.push(`<h${level} id="${id}">${content}</h${level}>`);
      continue;
    }

    const quoteMatch = line.match(/^>\s+(.*)$/);
    if (quoteMatch) {
      closeList();
      html.push(`<blockquote>${formatInline(quoteMatch[1])}</blockquote>`);
      continue;
    }

    const orderedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      if (listType !== "ol") {
        closeList();
        listType = "ol";
        html.push("<ol>");
      }
      html.push(`<li>${formatInline(orderedMatch[2])}</li>`);
      continue;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.*)$/);
    if (unorderedMatch) {
      if (listType !== "ul") {
        closeList();
        listType = "ul";
        html.push("<ul>");
      }
      html.push(`<li>${formatInline(unorderedMatch[1])}</li>`);
      continue;
    }

    closeList();
    paragraphCount += 1;
    const paragraphClass = paragraphCount === 1 ? " class=\"lead\"" : "";
    html.push(`<p${paragraphClass}>${formatInline(line)}</p>`);
  }

  closeList();
  if (inCode) {
    html.push("</code></pre>");
  }

  return html.join("\n");
};
