# DOM Clobbering Generator

An online version of the tool can be found at: [domclob.xanhacks.xyz](https://domclob.xanhacks.xyz/).

![Example of usage](./assets/example_of_usage.png)

## Getting started

**DOM Clobbering** is a vulnerability that originates from a naming collision between JavaScript variables and named HTML markups, where browsers replace pre-existing content of an undefined variable with an HTML element when the element's `id` (or `name`) attribute match.

Detailed article on [OffensiveWeb](https://www.offensiveweb.com/docs/client-side/dom-clobbering/).

## Examples

### Attribute id

Example with a random tag with a `id` attribute:

```html
<h1 id="hd">Super title !</h1>

<script>
console.log(hd);            // <h1 id="hd">Super title !</h1>
console.log(window.hd);     // <h1 id="hd">Super title !</h1>
console.log(document.hd);   // undefined
console.log(hd.toString()); // [object HTMLHeadingElement]
console.log(hd.innerText);  // Super title !
</script>
```

### Attribute name

Example with a `form` tag with a `name` attribute:

```html
<form name="fm" method="GET" action="/login"></form>

<script>
console.log(fm);          // <form name="fm"></form>
console.log(window.fm);   // <form name="fm"></form>
console.log(document.fm); // <form name="fm"></form>
console.log(fm.method);   // get
console.log(fm.action);   // http://localhost/login
</script>
```

List of tags which supports the name attribute:
- `embed`, `form`, `iframe`, `image`, `img`, `object`

### Depth 1

- Set `window.link` to `https://example.com`

```html
<a id="link" href="https://example.com"></a>
```

### Depth 2

- Set `video.lang` to `Hello!`

```html
<a id="video" lang="Hello!"></a>
<form id="video" lang="Hello!"></form>
<form name="video" lang="Hello!"></form>
<input id="video" lang="Hello!"></input>
<iframe id="video" lang="Hello!"></iframe>
<iframe name="video" lang="Hello!"></iframe>
<a id="video"></a><a id="video" name="lang" href="a:Hello!"></a>
```

### Depth 3

- Set `users.permission.role` to `admin`

```html
<form id="users" name="permission">
    <input id="role" value="admin">
</form>
<form id="users">
```

### Depth 4

- Set `music.metadata.sound.max` to `100%`

```html
<form id="music" name="metadata">
    <input id="sound" max="100%">
</form>
<form id="music">
```

## Special Attributes

```js
const tags = ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "portal", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"];
const attributes = ["accept", "accept-charset", "accesskey", "action", "align", "allow", "alt", "async", "autocapitalize", "autocomplete", "autofocus", "autoplay", "background", "bgcolor", "border", "buffered", "capture", "challenge", "charset", "checked", "cite", "class", "code", "codebase", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "crossorigin", "csp", "data", "data-*", "datetime", "decoding", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "enctype", "enterkeyhint", "for", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "id", "integrity", "intrinsicsize", "inputmode", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "loading", "list", "loop", "low", "manifest", "max", "maxlength", "minlength", "media", "method", "min", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "readonly", "referrerpolicy", "rel", "required", "reversed", "role", "rows", "rowspan", "sandbox", "scope", "scoped", "selected", "shape", "size", "sizes", "slot", "span", "spellcheck", "src", "srcdoc", "srclang", "srcset", "start", "step", "style", "summary", "tabindex", "target", "title", "translate", "type", "usemap", "value", "width", "wrap"];

var valids = {};
tags.forEach(tag => {
    attributes.forEach(attribute => {
        if (attribute != "id" && attribute != "name") {
            document.body.innerHTML = `<${tag} id="xyz" ${attribute}="xanhacks"></${tag}>`;
            try {
                if (eval(`xyz.${attribute} == "xanhacks"`)) {
                    if (!valids.hasOwnProperty(tag)) {
                        valids[tag] = [];
                    }
                    valids[tag].push(attribute);
                }
            } catch (e) {}
        }
    });
});
console.log(valids);
```

## TODO

- A lot of variables are defined under an `iframe`, like `alert`, `atob`, `location`, `length`...

## References

- [PortSwigger - DOM clobbering](https://portswigger.net/web-security/dom-based/dom-clobbering)
- JavaScript for hackers - Gareth Heyes (book)
- [OWASP CS - DOM Clobbering](https://cheatsheetseries.owasp.org/cheatsheets/DOM_Clobbering_Prevention_Cheat_Sheet.html)
- [DOM Clobbering - Frederik Braun](https://www.htmhell.dev/adventcalendar/2022/12/)
- [WHATWG - Named access on the Window object](https://html.spec.whatwg.org/multipage/nav-history-apis.html#named-access-on-the-window-object)
- [It’s (DOM) Clobbering Time: Attack Techniques, Prevalence, and Defenses](https://scnps.co/papers/sp23_domclob.pdf)
