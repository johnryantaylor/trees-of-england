# Trees of England

A mobile website in the form of a well-worn pocket field guide. Start at page one. At each page a question narrows the tree; the answer names the next page. Continue until the tree is identified.

The guide covers **76 trees** commonly found growing wild in England — natives and long-naturalised introductions of wood, hedge, heath, river, dune, roadside and waste ground. Garden ornaments are omitted.

## Open the guide

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`. On a phone, add it to the home screen if you like; it is built as a small standalone page.

The live guide is at <https://johnryantaylor.github.io/trees-of-england/>.

## How it works

- Page 1 is the title-page. Page 2 explains the key. The key itself begins on page 3.
- Each key page offers two or three statements. Tap the **page number** to turn to that page.
- The worn corners at the foot turn one page back or on, as in a physical book. Swipe left or right, or use the arrow keys.
- The **acorn** at the top of every page returns you to the beginning.
- When a tree is named, its page shows a pencil plate of the useful characters, with notes on leaf, bark, flower, fruit, habitat, and similar species (with page numbers).
- An index of common names is at the back.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The book |
| `css/guide.css` | Worn-paper layout |
| `js/data.js` | The dichotomous key |
| `js/species.js` | Species accounts |
| `js/illustrations.js` | Graphite plates |
| `js/app.js` | Page turning |
| `js/validate.js` | Checks that every question leads somewhere, and every tree can be reached |

```bash
node js/validate.js
```

That check confirms every question leads to a real page, every tree can be reached from the start, and every species has a pencil plate.
