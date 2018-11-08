import { PolymerElement, html } from '../../node_modules/@polymer/polymer.js';
import '../../node_modules/@polymer/iron-component-page.js';

class VodomgDemo extends PolymerElement {
    static get is() { return 'vodomg-demo'; }
    
    static get template() {
    	return html`
    		<style>
				:host {
					--iron-component-page-header-color: #333;
		  		}
			</style>
			<iron-component-page></iron-component-page>
    	`;
    }
}

customElements.define(VodomgDemo.is, VodomgDemo);
