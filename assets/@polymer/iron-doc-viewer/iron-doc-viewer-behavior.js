/// BareSpecifier=@polymer/iron-doc-viewer/iron-doc-viewer-behavior
import { flush } from '../polymer/lib/legacy/polymer.dom.js';
import { afterNextRender } from '../polymer/lib/utils/render-status.js';

/**
 * @polymerBehavior
 */
export const IronDocViewerBehavior = {

  properties: {
    /**
     * The [Polymer
     * Analyzer](https://github.com/Polymer/polymer-analyzer)-generated element
     * descriptor to display details for.
     */
    descriptor: {
      type: Object
    },

    /**
     * The base href where this doc viewer is located.
     */
    baseHref: { type: String, value: '' },

    /**
     * Prefix for fragment identifiers used in anchors.
     * For static routing `iron-component-page` can
     * set this to a string identifying the current component.
     */
    fragmentPrefix: { type: String, value: '' },

    /**
     * Whether protected members should be hidden or shown.
     */
    _showProtected: {
      type: Boolean,
      value: false
    },

    /**
     * Whether inherited members should be hidden or shown.
     */
    _showInherited: {
      type: Boolean,
      value: true
    }
  },

  _filterMembers: function (items, showProtected, showInherited) {
    return (items || []).filter(function (i) {
      // If privacy not specified, better to err on the side of showing
      // something instead of nothing. Also some things like namespaces
      // don't have privacy anyway.
      var privacy = i.privacy || 'public';
      var privacyOk = privacy === 'public';
      if (showProtected) {
        privacyOk = privacyOk || privacy === 'protected';
      }
      var inheritedOk = showInherited || i.inheritedFrom == null;
      return privacyOk && inheritedOk;
    });
  },

  _noneToShow: function (showProtected, showInherited, descriptor, name) {
    if (!descriptor) {
      return true;
    }
    var items = name === 'behaviors' ? this._getPolymerBehaviors(descriptor) : descriptor[name];
    if (!items) {
      return true;
    }
    var filteredItems = this._filterMembers(items, showProtected, showInherited);
    return filteredItems.length === 0;
  },

  /**
   * Scroll to the descriptor (element, function, etc.) with an `anchor-id`
   * matching the given URL hash (`#` optional). If no hash is specified,
   * uses `window.location.hash`.
   *
   * Whichever element or script is in charge of routing should call this
   * method on initial page load and on `hashchange` events.
   */
  scrollToAnchor: function (hash) {
    hash = hash || window.location.hash;
    if (!hash || hash.length === 0) {
      return;
    }
    if (hash.indexOf('#') === 0) {
      hash = hash.substring(1);
    }
    // Ensure dom-repeats have stamped.
    flush();
    var anchor = this.fragmentPrefix + hash;
    var element = this.$$('[anchor-id="' + anchor + '"]');
    if (element) {
      // Don't scroll until we've drawn the next frame, otherwise our
      // element might not know it's final screen position yet.
      afterNextRender(this, function () {
        element.scrollIntoView({ behavior: 'smooth' });
        // Highlight the section for a moment so we can tell where
        // exactly we were deep-linked.
        element.classList.add('scrolled');
        this.async(function () {
          element.classList.remove('scrolled');
        }, 1000);
      });
      return;
    }
    // Maybe our API section has this anchor.
    var api = this.$$('iron-doc-api');
    if (api) {
      api.scrollToAnchor(hash);
      return;
    }

    // Maybe some other subsection has the anchor.
    var subElements = this.root.querySelectorAll('*');
    for (var i = 0; i < subElements.length; i++) {
      var element = subElements[i];
      if (element.fragmentPrefix && element.scrollToAnchor && hash.indexOf(element.fragmentPrefix) === 0) {
        element.scrollToAnchor(hash.slice(element.fragmentPrefix.length));
        return;
      }
    }
  },

  _getElementName: function (element) {
    var name = '';
    if (element.tagname) {
      name += '<' + element.tagname + '>';
      if (element.name) {
        name += ' (' + element.name + ')';
      }
    } else if (element.name) {
      name += element.name;
    }
    return name;
  },

  _getElementId: function (element) {
    return element.name || element.tagname;
  },

  _getPolymerBehaviors: function (descriptor) {
    return (((descriptor || {}).metadata || {}).polymer || {}).behaviors || [];
  },

  /**
   * Compare two analysis descriptors (elements, functions, etc.) by
   * display name.
   */
  _compareDescriptors: function (a, b) {
    // Elements display as "<tagname> (name)" or "name", while
    // everything else displays as "name".
    if (a.name != b.name) {
      return compareUnderscoresLast(a.name || '', b.name || '');
    }
    if (a.tagname != b.tagname) {
      return compareUnderscoresLast(a.tagname || '', b.tagname || '');
    }
    return 0;
  }

};

/**
 * Compare two strings such that more leading underscores sort later.
 */
function compareUnderscoresLast(a, b) {
  var numA = numLeadingUnderscores(a);
  var numB = numLeadingUnderscores(b);
  if (numA !== numB) {
    return numA - numB;
  }
  return a.localeCompare(b);
}

function numLeadingUnderscores(str) {
  return str.match(/^_*/)[0].length;
}