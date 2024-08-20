import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import {
  Options,
  Highlighter,
  registerLanguages,
  htmlRender,
  init,
  process,
  JavaScript,
  TypeScript,
  Markdown,
  Python,
  JSON,
} from 'highlight-ts';

// Register languages
registerLanguages(JavaScript, TypeScript, Python, JSON, Markdown);

const options: Options = {
  classPrefix: 'hljs-',
  useBr: true,
};

const highlighter: Highlighter<string> = init(htmlRender, options);

@customElement('syntax-hl')
export class SyntaxHighlighter extends LitElement {
  @property({ type: String }) lang = 'plaintext';
  @property({ type: String }) code = '';

  static styles = css`
    /*
    
    Intellij Idea-like styling (c) Vasily Polovnyov <vast@whiteants.net>
    
    */

    .hljs {
      display: block;
      overflow-x: auto;
      padding: 0.5em;
      color: #000;
      background: #fff;
    }

    .hljs-subst,
    .hljs-title {
      font-weight: normal;
      color: #000;
    }

    .hljs-comment,
    .hljs-quote {
      color: #808080;
      font-style: italic;
    }

    .hljs-meta {
      color: #808000;
    }

    .hljs-tag {
      background: #efefef;
    }

    .hljs-section,
    .hljs-name,
    .hljs-literal,
    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-type,
    .hljs-selector-id,
    .hljs-selector-class {
      font-weight: bold;
      color: #000080;
    }

    .hljs-attribute,
    .hljs-number,
    .hljs-regexp,
    .hljs-link {
      font-weight: bold;
      color: #0000ff;
    }

    .hljs-number,
    .hljs-regexp,
    .hljs-link {
      font-weight: normal;
    }

    .hljs-string {
      color: #008000;
      font-weight: bold;
    }

    .hljs-symbol,
    .hljs-bullet,
    .hljs-formula {
      color: #000;
      background: #d0eded;
      font-style: italic;
    }

    .hljs-doctag {
      text-decoration: underline;
    }

    .hljs-variable,
    .hljs-template-variable {
      color: #660e7a;
    }

    .hljs-addition {
      background: #baeeba;
    }

    .hljs-deletion {
      background: #ffc8bd;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: bold;
    }
  `;

  render() {
    const highlightedCode = process(highlighter, this.code, this.lang);
    return html`<pre>${unsafeHTML(highlightedCode.value)}</pre>`;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.code) {
      this.code = this.textContent || '';
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syntax-hl': SyntaxHighlighter;
  }
}