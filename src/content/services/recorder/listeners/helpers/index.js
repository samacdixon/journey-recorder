import $ from 'jquery';

export function isExtensionElement(event) {
    return event.target.id === "jr-anchor" ||
        $(event.target).closest('#jr-anchor').length;
}