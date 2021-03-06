/// BareSpecifier=@polymer/iron-doc-viewer/iron-doc-module
/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '../polymer/polymer-legacy.js';
import '../marked-element/marked-element.js';
import '../prism-element/prism-highlighter.js';
import '../prism-element/prism-theme-default.js';
import './iron-doc-behavior.js';
import './iron-doc-element.js';
import './iron-doc-class.js';
import './iron-doc-function.js';
import './iron-doc-mixin.js';
import './iron-doc-summary.js';
import './iron-doc-viewer-styles.js';

import { Polymer } from '../polymer/lib/legacy/polymer-fn.js';
import { html } from '../polymer/lib/utils/html-tag.js';

import { IronDocViewerBehavior } from './iron-doc-viewer-behavior.js';

/**
 * `iron-doc-module` renders documentation about a JavaScript Module from a
 * JSON descriptor output by
 * [Polymer Analyzer](https://github.com/Polymer/polymer-analyzer).
 *
 * The descriptor should be an analysis format Analysis object, filtered
 * down to contain only the exported contents of a single module.
 */
Polymer({
  _template: html`
    <style include="iron-doc-viewer-styles prism-theme-default">
      :host {
        @apply --iron-doc-docs;
      }
    </style>

    <prism-highlighter></prism-highlighter>

    <template is="dom-if" if="[[moduleSpecifier]]">
      <code>import {} from '[[moduleSpecifier]]';</code>
    </template>

    <h1>[[title]]</h1>
    <p hidden\$="[[!descriptor.summary]]">[[descriptor.summary]]</p>

    <section id="description" anchor-id\$="[[fragmentPrefix]]description" hidden\$="[[!descriptor.description]]">
      <h2>
        <a href\$="#[[fragmentPrefix]]description" class="deeplink">Description</a>
      </h2>
      <marked-element sanitize markdown="[[descriptor.description]]">
        <div slot="markdown-html" class="markdown-html"></div>
      </marked-element>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]elements" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'elements')]]">
      <template is="dom-repeat" items="[[descriptor.elements]]" sort="_compareDescriptors">
        <iron-doc-element descriptor="[[item]]" anchor-id\$="[[fragmentPrefix]][[item.name]]" fragment-prefix="[[fragmentPrefix]][[item.name]]-">
        </iron-doc-element>
      </template>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]classes" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'classes')]]">
      <template is="dom-repeat" items="[[descriptor.classes]]" sort="_compareDescriptors">
        <iron-doc-class descriptor="{{item}}" anchor-id\$="[[fragmentPrefix]][[item.name]]" fragment-prefix="[[fragmentPrefix]][[item.name]]-">
        
      </iron-doc-class></template>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]mixins" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'mixins')]]">
      <template is="dom-repeat" items="[[descriptor.mixins]]" sort="_compareDescriptors">
        <iron-doc-mixin descriptor="[[item]]" anchor-id\$="[[fragmentPrefix]][[item.name]]" fragment-prefix="[[fragmentPrefix]][[item.name]]-">
        </iron-doc-mixin>
      </template>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]behaviors" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'behaviors')]]">
      <template is="dom-repeat" items="[[_getPolymerBehaviors(descriptor)]]" sort="_compareDescriptors">
        <iron-doc-behavior descriptor="[[item]]" anchor-id\$="[[fragmentPrefix]][[item.name]]" fragment-prefix="[[fragmentPrefix]][[item.name]]-">
        
      </iron-doc-behavior></template>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]functions" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'functions')]]">
      <h2>
        <a href\$="#[[fragmentPrefix]]functions" class="deeplink">
          Exported Functions
        </a>
      </h2>
      <template is="dom-repeat" items="[[descriptor.functions]]" sort="_compareDescriptors">
        <iron-doc-function anchor-id\$="[[fragmentPrefix]][[item.name]]" descriptor="[[item]]">
        </iron-doc-function>
      </template>
    </section>
`,

  is: 'iron-doc-module',
  behaviors: [IronDocViewerBehavior],

  properties: {
    /**
     * The module specifier of this module, used to give an example of
     * how to import it. So if this is 'foo' we will tell users to do:
     * `import {} from 'foo';`
     */
    moduleSpecifier: String
  }
});