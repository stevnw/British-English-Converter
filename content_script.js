let isEnabled = true;

// Mapped American English spellings to British English spellings - probably will find more as I experiment with this lol.
const AMERICAN_TO_BRITISH_SPELLINGS = {
    // -or to -our
    'color': 'colour',
    'flavor': 'flavour',
    'humor': 'humour',
    'labor': 'labour',
    'neighbor': 'neighbour',
    'honor': 'honour',
    'valor': 'valour',
    'favor': 'favour',
    'endeavor': 'endeavour',
    'parlor': 'parlour',
    'rumor': 'rumour',
    'splendor': 'splendour',
    'tumor': 'tumour',
    'vapor': 'vapour',
    'ardor': 'ardour',
    // -er to -re
    'center': 'centre',
    'theater': 'theatre',
    'liter': 'litre',
    'meter': 'metre',
    'saber': 'sabre',
    'fiber': 'fibre',
    'massacre': 'massacre',
    'caliber': 'calibre',
    'lustre': 'lustre',
    'specter': 'spectre',
    'treater': 'treater',

    // -ize to -ise (and common inflections)
    'realize': 'realise',
    'realized': 'realised',
    'realizing': 'realising',
    'organize': 'organise',
    'organized': 'organised',
    'organizing': 'organising',
    'analyze': 'analyse',
    'analyzed': 'analysed',
    'analyzing': 'analysing',
    'criticize': 'criticise',
    'criticized': 'criticised',
    'criticizing': 'criticising',
    'apologize': 'apologise',
    'apologized': 'apologised',
    'apologizing': 'apologising',
    'civilize': 'civilise',
    'civilized': 'civilised',
    'civilizing': 'civilising',
    'familiarize': 'familiarise',
    'familiarized': 'familiarised',
    'familiarizing': 'familiarising',
    'generalize': 'generalise',
    'generalized': 'generalised',
    'generalizing': 'generalising',
    'memorize': 'memorise',
    'memorized': 'memorised',
    'memorizing': 'memorising',
    'recognize': 'recognise',
    'recognized': 'recognised',
    'recognizing': 'recognising',
    'specialize': 'specialise',
    'specialized': 'specialised',
    'specializing': 'specialising',
    'summarize': 'summarise',
    'summarized': 'summarised',
    'summarizing': 'summarising',
    'utilize': 'utilise',
    'utilized': 'utilised',
    'utilizing': 'utilising',
    'authorize': 'authorise',
    'authorized': 'authorised',
    'authorizing': 'authorising',
    'colonize': 'colonise',
    'colonized': 'colonised',
    'colonizing': 'colonising',
    'demoralize': 'demoralise',
    'demoralized': 'demoralised',
    'demoralizing': 'demoralising',
    'emphasize': 'emphasise',
    'emphasized': 'emphasised',
    'emphasizing': 'emphasising',
    'fertilize': 'fertilise',
    'fertilized': 'fertilised',
    'fertilizing': 'fertilising',
    'legalize': 'legalise',
    'legalized': 'legalised',
    'legalizing': 'legalising',
    'normalize': 'normalise',
    'normalized': 'normalised',
    'normalizing': 'normalising',
    'optimize': 'optimise',
    'optimized': 'optimised',
    'optimizing': 'optimising',
    'patronize': 'patronise',
    'patronized': 'patronised',
    'patronizing': 'patronising',
    'prioritize': 'prioritise',
    'prioritized': 'prioritised',
    'prioritizing': 'prioritising',
    'standardize': 'standardise',
    'standardized': 'standardised',
    'standardizing': 'standardising',
    'sterilize': 'sterilise',
    'sterilized': 'sterilised',
    'sterilizing': 'sterilising',
    'sympathize': 'sympathise',
    'sympathized': 'sympathised',
    'sympathizing': 'sympathising',
    'terrorize': 'terrorise',
    'terrorized': 'terrorised',
    'terrorizing': 'terrorising',
    'victimize': 'victimise',
    'victimized': 'victimisied',
    'victimizing': 'victimising',

    // -log to -logue
    'dialog': 'dialogue',
    'analog': 'analogue',
    'catalog': 'catalogue',
    'monolog': 'monologue',

    // -ense to -ence
    'defense': 'defence',
    'offense': 'offence',
    'pretense': 'pretence',
    'license': 'licence',

    // Other specific words
    'aluminum': 'aluminium',
    'tire': 'tyre',
    'check': 'cheque',
    'gray': 'grey',
    'jewelry': 'jewellery',
    'draft': 'draught',
    'plow': 'plough',
    'ax': 'axe',
    'omelet': 'omelette',
    'mold': 'mould',
    'program': 'programme',
    'mom': 'mum'
};


// --- Core Functions ---

/**
 * Applies the correct casing (initial cap or all caps) to a British English word
 * based on the casing of the original American English word.
 * @param {string} originalWord The original American English word matched.
 * @param {string} britishWord The British English equivalent (lowercase).
 * @returns {string} The British English word with adjusted casing.
 */
function applyCasing(originalWord, britishWord) {
    if (originalWord === originalWord.toUpperCase()) {
        // If original word is all uppercase, make British word all uppercase
        return britishWord.toUpperCase();
    } else if (originalWord.charAt(0) === originalWord.charAt(0).toUpperCase()) {
        // If original word starts with a capital, capitalize the British word
        return britishWord.charAt(0).toUpperCase() + britishWord.slice(1);
    }
    // Otherwise, return British word as is (lowercase)
    return britishWord;
}

/**
 * Replaces American English spellings with British English spellings in a given text.
 * @param {string} text The input text.
 * @returns {string} The text with spellings replaced.
 */
function replaceSpellings(text) {
    let newText = text;
    for (const americanWord in AMERICAN_TO_BRITISH_SPELLINGS) {
        const britishEquivalent = AMERICAN_TO_BRITISH_SPELLINGS[americanWord];
        const regex = new RegExp('\\b' + americanWord + '\\b', 'gi');

        newText = newText.replace(regex, (match) => {
            return applyCasing(match, britishEquivalent);
        });
    }
    return newText;
}


function processTextNode(node) {
    if (!isEnabled) return;

    const parentTagName = node.parentNode?.tagName;
    if (parentTagName === 'SCRIPT' || parentTagName === 'STYLE' ||
        parentTagName === 'INPUT' || parentTagName === 'TEXTAREA' ||
        parentTagName === 'CODE' || parentTagName === 'PRE') {
        return;
    }

    const originalText = node.textContent;
    const newText = replaceSpellings(originalText);

    if (originalText !== newText) {
        node.textContent = newText;
    }
}

function traverseAndProcess(node) {
    const treeWalker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                const parentTagName = node.parentNode?.tagName;
                if (parentTagName === 'SCRIPT' || parentTagName === 'STYLE' ||
                    parentTagName === 'INPUT' || parentTagName === 'TEXTAREA' ||
                    parentTagName === 'CODE' || parentTagName === 'PRE') {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        processTextNode(currentNode);
        currentNode = treeWalker.nextNode();
    }
}

function processInitialPage() {
    if (!isEnabled) return;
    console.log("Content Script: Processing initial page.");
    traverseAndProcess(document.body);
}


const observer = new MutationObserver(mutations => {
    if (!isEnabled) return;

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                traverseAndProcess(node);
            } else if (node.nodeType === Node.TEXT_NODE) {
                processTextNode(node);
            }
        });
    });
});

browser.runtime.onMessage.addListener(msg => {
    if (msg.action === 'toggle') {
        isEnabled = msg.enabled;
        console.log("Content Script: Toggled to", isEnabled);
        if (!isEnabled) {
            observer.disconnect();
        } else {

            processInitialPage();
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }
});

browser.runtime.sendMessage({ action: "getState" })
    .then(response => {
        if (response && response.enabled !== undefined) {
            isEnabled = response.enabled;
            console.log("Content Script: Initial state from background:", isEnabled);
            if (isEnabled) {
                processInitialPage();
                observer.observe(document.body, { childList: true, subtree: true });
            } else {
                observer.disconnect();
            }
        }
    })
    .catch(error => console.error("Content Script: Error getting initial state from background:", error));

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processInitialPage);
} else {
    processInitialPage();
}
