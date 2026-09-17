// Small builder helpers for hand-authoring Lexical `richText` JSON in seed data.
// Payload's Lexical editor is strict about the fields present on each node, so these
// helpers exist to avoid re-typing the full verbose node shape everywhere.

type SerializedEditorState = {
  root: {
    type: 'root'
    children: LexicalNode[]
    direction: 'ltr'
    format: ''
    indent: 0
    version: 1
  }
}

export type LexicalNode = {
  type: string
  version: number
  [key: string]: unknown
}

type InlineLeaf =
  | { text: string; bold?: boolean; italic?: boolean }
  | { text: string; url: string; newTab?: boolean }

/**
 * A plain text leaf node.
 */
export const lexicalText = (text: string, opts?: { bold?: boolean; italic?: boolean }): LexicalNode => {
  let format = 0
  if (opts?.bold) format |= 1
  if (opts?.italic) format |= 2

  return {
    type: 'text',
    detail: 0,
    format,
    mode: 'normal',
    style: '',
    text,
    version: 1,
  }
}

/**
 * An inline link leaf node (wraps its own text child).
 */
export const lexicalLink = (text: string, url: string, newTab = false): LexicalNode => {
  return {
    type: 'link',
    children: [lexicalText(text)],
    direction: 'ltr',
    fields: {
      linkType: 'custom',
      newTab,
      url,
    },
    format: '',
    indent: 0,
    version: 3,
  }
}

const toInlineChildren = (children: string | InlineLeaf[]): LexicalNode[] => {
  if (typeof children === 'string') {
    return [lexicalText(children)]
  }

  return children.map((leaf) => {
    if ('url' in leaf) {
      return lexicalLink(leaf.text, leaf.url, leaf.newTab)
    }
    return lexicalText(leaf.text, { bold: leaf.bold, italic: leaf.italic })
  })
}

/**
 * A paragraph node. Accepts either a plain string, or a mixed array of text/link leaves
 * for paragraphs that need inline formatting or an inline link.
 */
export const lexicalParagraph = (children: string | InlineLeaf[]): LexicalNode => {
  return {
    type: 'paragraph',
    children: toInlineChildren(children),
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

/**
 * A heading node (h1-h4).
 */
export const lexicalHeading = (
  tag: 'h1' | 'h2' | 'h3' | 'h4',
  children: string | InlineLeaf[],
): LexicalNode => {
  return {
    type: 'heading',
    children: toInlineChildren(children),
    direction: 'ltr',
    format: '',
    indent: 0,
    tag,
    version: 1,
  }
}

/**
 * An unordered list of plain-text items.
 */
export const lexicalList = (items: string[]): LexicalNode => {
  return {
    type: 'list',
    children: items.map((item) => ({
      type: 'listitem',
      children: toInlineChildren(item),
      direction: 'ltr',
      format: '',
      indent: 0,
      value: 1,
      version: 1,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    version: 1,
  }
}

/**
 * Wraps a list of nodes in the full Lexical `SerializedEditorState` envelope.
 */
export const richText = (nodes: LexicalNode[]): SerializedEditorState => {
  return {
    root: {
      type: 'root',
      children: nodes,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Convenience: renders a list of plain-text paragraphs.
 */
export const richTextFromStrings = (paragraphs: string[]): SerializedEditorState => {
  return richText(paragraphs.map((paragraph) => lexicalParagraph(paragraph)))
}
