import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import "ts/components/lit/componentSwitcher.ts";
import "ts/components/lit/syntaxHighlighter.ts"
import "ts/components/lit/foldableCard.ts"
import "ts/components/lit/serverUpdatesComponent.ts"
import "ts/components/lit/geoTestCard.ts"
import "ts/components/lit/targetListByTile.ts"

@customElement('targets-menu')
export class TargetsMenu extends LitElement {
    render() {
        return html`
      <h1>Demo menu for Targets:</h1>
      <component-switcher>
        <switchable-component name="Updates from the server">
            <server-updates></server-updates>
        </switchable-component>
        <switchable-component name="Target capture">
            <geo-test-card></geo-test-card>
        </switchable-component>
        <switchable-component name="Targets list by tile">
            <target-list-by-tile></target-list-by-tile>
        </switchable-component>
      </component-switcher>
    `;
    }
}