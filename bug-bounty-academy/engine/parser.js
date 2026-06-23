// ==========================================
// V2 SECURE CLIENT-SIDE MARKDOWN PARSER
// ==========================================

window.MarkdownParser = {
  parse(text) {
    if (!text) return '';

    // Check if CDN marked.js is available
    if (window.marked && typeof window.marked.parse === 'function') {
      return window.marked.parse(text);
    }

    // Fallback Regex parser for offline compatibility
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Italics
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Code blocks
      .replace(/\`\`\`([\s\S]*?)\`\`\`/gim, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/\`(.*?)\`/gim, '<code>$1</code>')
      // Line breaks
      .replace(/\n$/gim, '<br />')
      // Unordered lists
      .replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>')
      .replace(/<\/ul>\s*<ul>/gim, ''); // Merge list items

    return html;
  }
};
