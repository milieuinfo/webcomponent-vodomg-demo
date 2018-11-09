/// BareSpecifier=@polymer/app-layout/app-scroll-effects/test/x-container
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '../../../polymer/polymer-legacy.js';

import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../polymer/lib/utils/html-tag.js';

import { AppScrollEffectsBehavior } from '../app-scroll-effects-behavior.js';

Polymer({
  _template: html`
    <style>
      :host {
        position: relative;
        display: block;
      }

      #background,
      #backgroundFrontLayer,
      #backgroundRearLayer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      #backgroundFrontLayer {
        bottom: -200px;
      }

      #mainTitle, #condensedTitle {
        display: block;
        overflow: hidden;
        margin: 0;
        padding: 0;
        position: absolute;
      }

      #mainTitle {
        height: 18px;
        top: 0;
        left: 0;
      }

      #condensedTitle {
        height: 37px;
        top: 100px;
        left: 100px;
      }

    </style>

    <div id="background"></div>
    <div id="backgroundFrontLayer"></div>
    <div id="backgroundRearLayer"></div>
    <h4 id="mainTitle">Title</h4>
    <h1 id="condensedTitle">Condensed title</h1>
`,

  is: 'x-container',
  behaviors: [AppScrollEffectsBehavior],
  properties: { shadow: { type: Boolean, reflectToAttribute: true } },
  observers: ['_xScrollEffectChanged(effects)'],

  _getDOMRef: function (id) {
    return this.$[id] || null;
  },

  _updateScrollState: function (scrollTop) {
    this._runEffects(scrollTop / this.offsetHeight, scrollTop);
  },

  _xScrollEffectChanged: function () {
    this._updateScrollState(this._scrollTop);
  }
});