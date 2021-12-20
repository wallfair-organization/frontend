export const handleVisibilityChange = (hiddenCb, shownCb) => {
    // Get the prefix for this browser.  
    let prefix = getPrefix();

    // Prefix the document properties/events we will be using.
    let hidden = getHiddenProperty(prefix);
    let visibilityChangeEvent = getVisibilityEvent(prefix);

    // Listen for the visibilitychange event.
    const handler = (e) => {
        if (document[hidden]) {
            // Document is hidden.
            if (hiddenCb) hiddenCb();
        } else {
            // Document is shown
            if (shownCb) shownCb();

        }
    }

    document.addEventListener(visibilityChangeEvent, handler);

    return () => {
        document.removeEventListener(visibilityChangeEvent, handler);
    }
}

// Get the prefix for this browser.
function getPrefix() {
    // Check to see if the browser supports the unprefixed property.
    if ('hidden' in document) {
        // No prefix needed, return null.
        return null;
    }

    // Loop through all the possible prefixes.
    let prefixes = ['moz', 'ms', 'o', 'webkit'];

    for (let i = 0; i < prefixes.length; i++) {
        let testPrefix = prefixes[i] + 'Hidden';
        if (testPrefix in document) {
            return prefixes[i];
        }
    }

    // The API must not be supported in this browser.
    return null;
}

// Prefix the hidden property.
function getHiddenProperty(prefix) {
    if (prefix) {
        return prefix + 'Hidden';
    } else {
        return 'hidden';
    }
}

// Prefix the visibilitychange event.
function getVisibilityEvent(prefix) {
    if (prefix) {
        return prefix + 'visibilitychange';
    } else {
        return 'visibilitychange';
    }
}