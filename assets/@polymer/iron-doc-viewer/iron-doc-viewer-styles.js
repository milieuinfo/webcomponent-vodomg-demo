/// BareSpecifier=@polymer/iron-doc-viewer/iron-doc-viewer-styles
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/

const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="iron-doc-viewer-styles">
  <template>
    <style>
      :host {
        @apply --iron-doc-font-body;

        color: #212121;
        display: block;

        --iron-doc-accent-color-internal: var(--iron-doc-accent-color, #1565c0);
      }

      h1 {
        @apply --iron-doc-title;
      }

      h2 {
        @apply --iron-doc-heading;
        padding-top: 12px;
      }

      [hidden] {
        display: none !important;
      }

      .inheritedFrom {
        font-style: italic;
        margin: 10px 0 0 0px;
      }

      .inheritedFrom code {
        color: var(--iron-doc-accent-color-internal);
      }

      iron-doc-summary, iron-doc-function, iron-doc-property {
        padding: 12px 16px;
      }

      .deeplink {
        color: currentcolor;
        text-decoration: none;
      }

      .deeplink:hover {
        color: var(--iron-doc-accent-color-internal);
      }

      [anchor-id]:not(.scrolled) {
        transition: background-color 0.3s linear;
      }

      [anchor-id].scrolled {
        background-color: rgba(255, 210, 0, 0.25);
      }

      .name {
        @apply --iron-doc-font-code;
        font-weight: bold;
      }

      code, pre {
        @apply --iron-doc-font-code;
      }

      #description marked-element {
        padding-left: 16px;
      }

      .markdown-html pre {
        background-color: #f5f5f5;
        border-radius: 3px;
        overflow-x: auto;
        padding: 12px 24px;
        word-wrap: break-word;
      }

      .markdown-html table {
        background-color: #f5f5f5;
        border-collapse: collapse;
        margin: 12px 0;
        width: 100%;
      }

      .markdown-html tr {
        padding: 0 18px;
      }

      .markdown-html td,
      .markdown-html th {
        padding: 6px 12px;
      }

      .markdown-html td:first-child,
      .markdown-html th:first-child {
        padding-left: 24px;
      }

      .markdown-html td:last-child,
      .markdown-html th:last-child {
        padding-right: 24px;
      }

      .markdown-html td:first-child > code {
        color: black;
        font-weight: bold;
      }

      .markdown-html code {
        @apply --iron-doc-font-code;
        background-color: #f5f5f5;
        border-radius: 3px;
      }

      .markdown-html p {
        padding: 0;
      }

      .markdown-html a {
        @apply --iron-doc-font-body;
        background: none;
        color: #1565c0;
        font-weight: 500;
        text-decoration: none;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);