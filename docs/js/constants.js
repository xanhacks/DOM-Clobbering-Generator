const HTML_DELAY = '<style>@import "https://example.com"</style>';
const SUPPORTS_NAME_ATTR = ["embed", "form", "iframe", "image", "img", "object"];
const ATTRIBUTES = {
    "a": [
        "charset",
        "coords",
        "download",
        "hreflang",
        "lang",
        "ping",
        "rel",
        "role",
        "shape",
        "slot",
        "target",
        "title",
        "type"
    ],
    "abbr": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "acronym": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "address": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "applet": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "area": [
        "alt",
        "coords",
        "download",
        "lang",
        "ping",
        "rel",
        "role",
        "shape",
        "slot",
        "target",
        "title"
    ],
    "article": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "aside": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "audio": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "b": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "base": [
        "lang",
        "role",
        "slot",
        "target",
        "title"
    ],
    "bdi": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "bdo": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "bgsound": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "big": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "blink": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "blockquote": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "br": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "button": [
        "lang",
        "role",
        "slot",
        "title",
        "value"
    ],
    "canvas": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "center": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "cite": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "code": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "data": [
        "lang",
        "role",
        "slot",
        "title",
        "value"
    ],
    "datalist": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "dd": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "del": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "details": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "dfn": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "dialog": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "dir": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "div": [
        "align",
        "lang",
        "role",
        "slot",
        "title"
    ],
    "dl": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "dt": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "em": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "embed": [
        "align",
        "height",
        "lang",
        "role",
        "slot",
        "title",
        "type",
        "width"
    ],
    "fieldset": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "figcaption": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "figure": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "font": [
        "color",
        "lang",
        "role",
        "size",
        "slot",
        "title"
    ],
    "footer": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "form": [
        "lang",
        "rel",
        "role",
        "slot",
        "target",
        "title"
    ],
    "h1": [
        "align",
        "lang",
        "role",
        "slot",
        "title"
    ],
    "header": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "hgroup": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "hr": [
        "align",
        "color",
        "lang",
        "role",
        "size",
        "slot",
        "title",
        "width"
    ],
    "i": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "iframe": [
        "align",
        "allow",
        "csp",
        "height",
        "lang",
        "role",
        "sandbox",
        "slot",
        "srcdoc",
        "title",
        "width"
    ],
    "image": [
        "align",
        "alt",
        "border",
        "lang",
        "role",
        "sizes",
        "slot",
        "srcset",
        "title"
    ],
    "img": [
        "align",
        "alt",
        "border",
        "lang",
        "role",
        "sizes",
        "slot",
        "srcset",
        "title"
    ],
    "input": [
        "accept",
        "align",
        "alt",
        "lang",
        "max",
        "min",
        "pattern",
        "placeholder",
        "role",
        "slot",
        "step",
        "title",
        "value"
    ],
    "ins": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "kbd": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "keygen": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "label": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "legend": [
        "align",
        "lang",
        "role",
        "slot",
        "title"
    ],
    "li": [
        "lang",
        "role",
        "slot",
        "title",
        "type"
    ],
    "link": [
        "charset",
        "hreflang",
        "integrity",
        "lang",
        "media",
        "rel",
        "role",
        "sizes",
        "slot",
        "target",
        "title",
        "type"
    ],
    "main": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "map": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "mark": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "marquee": [
        "height",
        "lang",
        "role",
        "slot",
        "title",
        "width"
    ],
    "menu": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "menuitem": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "meta": [
        "content",
        "lang",
        "media",
        "role",
        "slot",
        "title"
    ],
    "meter": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "nav": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "nobr": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "noembed": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "noframes": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "noscript": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "object": [
        "align",
        "border",
        "code",
        "height",
        "lang",
        "role",
        "slot",
        "title",
        "type",
        "width"
    ],
    "ol": [
        "lang",
        "role",
        "slot",
        "title",
        "type"
    ],
    "optgroup": [
        "label",
        "lang",
        "role",
        "slot",
        "title"
    ],
    "option": [
        "label",
        "lang",
        "role",
        "slot",
        "title",
        "value"
    ],
    "output": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "p": [
        "align",
        "lang",
        "role",
        "slot",
        "title"
    ],
    "param": [
        "lang",
        "role",
        "slot",
        "title",
        "type",
        "value"
    ],
    "picture": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "plaintext": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "portal": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "pre": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "progress": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "q": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "rb": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "rp": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "rt": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "rtc": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "ruby": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "s": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "samp": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "script": [
        "charset",
        "integrity",
        "lang",
        "role",
        "slot",
        "title",
        "type"
    ],
    "section": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "select": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "slot": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "small": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "source": [
        "lang",
        "media",
        "role",
        "sizes",
        "slot",
        "srcset",
        "title",
        "type"
    ],
    "spacer": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "span": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "strike": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "strong": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "style": [
        "lang",
        "media",
        "role",
        "slot",
        "title",
        "type"
    ],
    "sub": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "summary": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "sup": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "table": [
        "align",
        "border",
        "lang",
        "role",
        "slot",
        "summary",
        "title",
        "width"
    ],
    "template": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "textarea": [
        "lang",
        "placeholder",
        "role",
        "slot",
        "title",
        "wrap"
    ],
    "time": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "title": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "track": [
        "label",
        "lang",
        "role",
        "slot",
        "srclang",
        "title"
    ],
    "tt": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "u": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "ul": [
        "lang",
        "role",
        "slot",
        "title",
        "type"
    ],
    "var": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "video": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "wbr": [
        "lang",
        "role",
        "slot",
        "title"
    ],
    "xmp": [
        "lang",
        "role",
        "slot",
        "title"
    ]
};

