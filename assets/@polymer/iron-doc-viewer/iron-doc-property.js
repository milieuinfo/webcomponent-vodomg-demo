/// BareSpecifier=@polymer/iron-doc-viewer/iron-doc-property
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
import '../polymer/polymer-legacy.js';

import '../marked-element/marked-element.js';
import './iron-doc-viewer-styles.js';
import { Polymer } from '../polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="iron-doc-property">
  <template strip-whitespace>
    <style include="iron-doc-viewer-styles"></style>
    <style>
      :host {
        display: block;
      }

      #polymer {
        margin-left: 12px;
      }

      #polymer > * {
        background-color: #efefef;
        color: var(--iron-doc-accent-color-internal);
        padding: 1px 6px;
        margin-left: 8px;
        border-radius: 8px;
      }

      .type {
        color: #666;
      }

      .default {
        color: var(--iron-doc-accent-color-internal);
      }

      .privacy {
        color: #666;
      }
    </style>

    <div id="signature">
      <code class="privacy">[[_privacy]] </code>

      <a href\$="#[[anchorId]]" class="name deeplink">[[descriptor.name]]</a><!--
     --><code id="type" hidden\$="[[!descriptor.type]]">:
          <span class="type">[[descriptor.type]]</span>
        </code>
      <code id="default" hidden\$="[[!descriptor.defaultValue]]"> =
        <span class="default">[[descriptor.defaultValue]]</span>
      </code>

      <span id="polymer">
        <code hidden\$="[[!descriptor.metadata.polymer.notify]]">notify</code>
        <code hidden\$="[[!descriptor.metadata.polymer.readOnly]]">readOnly</code>
        <code hidden\$="[[!descriptor.metadata.polymer.reflectToAttribute]]">reflectToAttribute</code>
      </span>
    </div>

    <p hidden\$="[[!descriptor.inheritedFrom]]" class="inheritedFrom">
      Inherited from <code>[[descriptor.inheritedFrom]]</code>
    </p>

    <div id="details">
      <marked-element sanitize id="desc" markdown="[[descriptor.description]]" hidden\$="[[!descriptor.description]]">
        <div slot="markdown-html" class="markdown-html"></div>
      </marked-element>
    </div>
  </template>

  
</dom-module>`;

document.head.appendChild($_documentContainer.content);

/*
Renders documentation describing a specific property of an element, mixin,
class, etc.
*/
Polymer({
  is: 'iron-doc-property',

  properties: {
    descriptor: { type: Object },

    _privacy: { type: String, computed: '_computePrivacy(descriptor)' },

    /**
     * Unique anchor ID for deep-linking.
     */
    anchorId: { type: String, reflectToAttribute: true, value: '' }
  },

  _computePrivacy: function (descriptor) {
    if (!descriptor || !descriptor.privacy || descriptor.privacy === 'public') {
      return '';
    }
    return descriptor.privacy;
  }
});