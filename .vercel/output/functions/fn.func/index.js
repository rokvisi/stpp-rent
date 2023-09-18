globalThis.global = globalThis;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc2 = __getOwnPropDesc(from, key2)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component7) {
  current_component = component7;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component7, name2) {
  if (!component7 || !component7.$$render) {
    if (name2 === "svelte:component")
      name2 += " this={...}";
    throw new Error(
      `<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name2}>.`
    );
  }
  return component7;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css3) => css3.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name2, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name2}${assignment}`;
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/index.js
function error(status, body) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, body);
}
function redirect(status, location) {
  if (isNaN(status) || status < 300 || status > 308) {
    throw new Error("Invalid status code");
  }
  return new Redirect(status, location.toString());
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    const encoded = encoder.encode(body);
    headers.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers
    });
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
var HttpError, Redirect, ActionFailure, encoder;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = class {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body) {
        this.status = status;
        if (typeof body === "string") {
          this.body = { message: body };
        } else if (body) {
          this.body = body;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    ActionFailure = class {
      /**
       * @param {number} status
       * @param {T} [data]
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder = new TextEncoder();
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index11 = 0;
      while (index11 < str.length) {
        var eqIdx = str.indexOf("=", index11);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index11);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index11 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index11, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index11 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name2, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name2)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name2 + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name2 = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name: name2,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name2 = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name2 = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name: name2, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var FontPreload, css, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    FontPreload = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { paths } = $$props;
      if ($$props.paths === void 0 && $$bindings.paths && paths !== void 0)
        $$bindings.paths(paths);
      return `${each(paths, (href) => {
        let type = href.substring(href.lastIndexOf(".") + 1);
        return ` <link rel="preload"${add_attribute("href", href, 0)} as="font" type="${"font/" + escape(type, true)}" crossorigin="anonymous">`;
      })}`;
    });
    css = {
      code: "html{--tw-bg-opacity:1;background-color:rgb(24 24 27 / var(--tw-bg-opacity));font-family:Overpass, sans-serif;--tw-text-opacity:1;color:rgb(214 211 209 / var(--tw-text-opacity))\n}",
      map: null
    };
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css);
      return `${$$result.head += `<!-- HEAD_svelte-1dafacz_START -->${$$result.title = `<title>Rentee</title>`, ""}${validate_component(FontPreload, "FontPreload").$$render(
        $$result,
        {
          paths: [
            "/fonts/overpass/overpass-v13-latin-regular.woff2",
            "/fonts/overpass/overpass-v13-latin-600.woff2",
            "/fonts/overpass/overpass-v13-latin-700.woff2",
            "/fonts/overpass/overpass-mono-v16-latin-regular.woff2"
          ]
        },
        {},
        {}
      )}<!-- HEAD_svelte-1dafacz_END -->`, ""} ${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    imports = ["_app/immutable/nodes/0.18ea4a85.js", "_app/immutable/chunks/scheduler.e108d1fd.js", "_app/immutable/chunks/index.c5e6bafe.js", "_app/immutable/chunks/each.c0e137c1.js"];
    stylesheets = ["_app/immutable/assets/0.f1973a79.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_ssr();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.5dda7aa8.js", "_app/immutable/chunks/scheduler.e108d1fd.js", "_app/immutable/chunks/index.c5e6bafe.js", "_app/immutable/chunks/stores.4267bdef.js", "_app/immutable/chunks/singletons.c3d64619.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/chunks/Footer.js
var Footer;
var init_Footer = __esm({
  ".svelte-kit/output/server/chunks/Footer.js"() {
    init_ssr();
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<footer class="bg-zinc-800 flex items-center justify-between px-12 py-4 shadow" data-svelte-h="svelte-28y4vu"><div><p>T120B165 Saityno taikom\u0173j\u0173 program\u0173 projektavimas</p> <p>D\u0117stytojas: Tomas Bla\u017Eauskas</p></div> <p>Rokas Vi\u0161inskas - IFF-0/1</p></footer>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/(app)/_layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => Layout2
});
var Layout2;
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/(app)/_layout.svelte.js"() {
    init_ssr();
    init_Footer();
    Layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="relative grid grid-rows-[auto_1fr_auto] min-h-screen"><header class="bg-zinc-800 px-12 flex items-center justify-between shadow py-4" data-svelte-h="svelte-120xihe"><span class="text-lg text-mono uppercase tracking-wider">Rentee</span> <span>TODO Header</span> <nav><a href="/docs/api/v1">Docs</a></nav></header> <div class="grid grid-cols-[auto_1fr]"><main class="pt-20 pb-10 px-12">${slots.default ? slots.default({}) : ``}</main></div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_layout_svelte2(), layout_svelte_exports2))).default);
    imports3 = ["_app/immutable/nodes/2.4994092f.js", "_app/immutable/chunks/scheduler.e108d1fd.js", "_app/immutable/chunks/index.c5e6bafe.js", "_app/immutable/chunks/Footer.f164d0a0.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/test.js
var resources;
var init_test = __esm({
  ".svelte-kit/output/server/chunks/test.js"() {
    resources = [
      {
        method: "GET",
        resource: "users",
        resource_url: "api/v1/users",
        description: "Gets a list of all registered users.",
        information: {
          response_format: "JSON",
          requires_auth: false
        },
        parameters: [],
        responses: [
          {
            code: 200,
            reason: "Successful request"
          },
          {
            code: 403,
            reason: "Database is unavailable"
          }
        ],
        sample_request: "api/v1/users",
        sample_response: [
          {
            id: 1,
            name: "baharie",
            address: "Mehmet Sultan sok. 48"
          },
          {
            id: 2,
            name: "Silainiai 1",
            address: "Baltu pr. 3"
          }
        ]
      },
      {
        method: "GET",
        resource: "houses",
        resource_url: "api/v1/houses",
        description: "Gets a list of all existing houses",
        information: {
          response_format: "JSON",
          requires_auth: false
        },
        parameters: [],
        responses: [
          {
            code: 200,
            reason: "Successful request"
          }
        ]
      }
    ];
  }
});

// .svelte-kit/output/server/entries/pages/(docs)/docs/_layout.svelte.js
var layout_svelte_exports3 = {};
__export(layout_svelte_exports3, {
  default: () => Layout3
});
var Layout3;
var init_layout_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/(docs)/docs/_layout.svelte.js"() {
    init_ssr();
    init_stores();
    init_Footer();
    init_test();
    Layout3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<div class="relative grid grid-rows-[auto_1fr_auto] min-h-screen"><header class="bg-zinc-800 px-12 flex items-center justify-between shadow py-4" data-svelte-h="svelte-ug33c"><span class="text-lg text-mono uppercase tracking-wider">Rentee</span> <span>API Reference</span> <nav><a href="/">Home</a></nav></header> <div class="grid grid-cols-[auto_1fr]"><aside class="bg-neutral-800 pl-8 pt-20 pr-24 text-neutral-400 border-r border-stone-500"><p class="font-semibold tracking-widest uppercase pb-2" data-svelte-h="svelte-1j2xizo">Resources</p> <ul>${each(resources, (resource) => {
        let pathname = `/docs/api/v1/${resource.resource}`;
        return ` <li class="pb-1"><a class="aria-[current]:font-bold aria-[current]:text-neutral-200"${add_attribute("aria-current", $page.url.pathname === pathname ? "true" : void 0, 0)}${add_attribute("href", pathname, 0)}>${escape(resource.method)} ${escape(resource.resource)}</a> </li>`;
      })}</ul></aside> <main class="pt-20 pb-10 px-12">${slots.default ? slots.default({}) : ``}</main></div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ?? (component_cache4 = (await Promise.resolve().then(() => (init_layout_svelte3(), layout_svelte_exports3))).default);
    imports4 = ["_app/immutable/nodes/3.e17c7d45.js", "_app/immutable/chunks/scheduler.e108d1fd.js", "_app/immutable/chunks/index.c5e6bafe.js", "_app/immutable/chunks/each.c0e137c1.js", "_app/immutable/chunks/stores.4267bdef.js", "_app/immutable/chunks/singletons.c3d64619.js", "_app/immutable/chunks/Footer.f164d0a0.js", "_app/immutable/chunks/test.e18d91b4.js"];
    stylesheets4 = [];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(app)/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/(app)/_page.svelte.js"() {
    init_ssr();
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1 class="text-5xl pb-4" data-svelte-h="svelte-9sdigf">Home page</h1>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ?? (component_cache5 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    imports5 = ["_app/immutable/nodes/4.264e7ce5.js", "_app/immutable/chunks/scheduler.e108d1fd.js", "_app/immutable/chunks/index.c5e6bafe.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(docs)/docs/_page.ts.js
var page_ts_exports = {};
__export(page_ts_exports, {
  load: () => load
});
function load() {
  throw redirect(308, "/docs/api/v1");
}
var init_page_ts = __esm({
  ".svelte-kit/output/server/entries/pages/(docs)/docs/_page.ts.js"() {
    init_chunks();
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6,
  universal: () => page_ts_exports,
  universal_id: () => universal_id
});
var index6, universal_id, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_page_ts();
    index6 = 5;
    universal_id = "src/routes/(docs)/docs/+page.ts";
    imports6 = ["_app/immutable/nodes/5.75e9d3ea.js", "_app/immutable/chunks/index.d7eb2526.js", "_app/immutable/chunks/control.f5b05b5f.js"];
    stylesheets6 = [];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(docs)/docs/api/_page.ts.js
var page_ts_exports2 = {};
__export(page_ts_exports2, {
  load: () => load2
});
function load2() {
  throw redirect(308, "/docs/api/v1");
}
var init_page_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/(docs)/docs/api/_page.ts.js"() {
    init_chunks();
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7,
  universal: () => page_ts_exports2,
  universal_id: () => universal_id2
});
var index7, universal_id2, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_page_ts2();
    index7 = 6;
    universal_id2 = "src/routes/(docs)/docs/api/+page.ts";
    imports7 = ["_app/immutable/nodes/6.75e9d3ea.js", "_app/immutable/chunks/index.d7eb2526.js", "_app/immutable/chunks/control.f5b05b5f.js"];
    stylesheets7 = [];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(docs)/docs/api/v1/_page.ts.js
var page_ts_exports3 = {};
__export(page_ts_exports3, {
  load: () => load3
});
function load3() {
  throw redirect(308, `/docs/api/v1/${resources[0].resource}`);
}
var init_page_ts3 = __esm({
  ".svelte-kit/output/server/entries/pages/(docs)/docs/api/v1/_page.ts.js"() {
    init_chunks();
    init_test();
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8,
  universal: () => page_ts_exports3,
  universal_id: () => universal_id3
});
var index8, universal_id3, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    init_page_ts3();
    index8 = 7;
    universal_id3 = "src/routes/(docs)/docs/api/v1/+page.ts";
    imports8 = ["_app/immutable/nodes/7.89afea9f.js", "_app/immutable/chunks/index.d7eb2526.js", "_app/immutable/chunks/control.f5b05b5f.js", "_app/immutable/chunks/test.e18d91b4.js"];
    stylesheets8 = [];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(docs)/docs/api/v1/_resource_/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
function getType(i) {
  if (i === null)
    return "null";
  return typeof i;
}
function format(i) {
  const t = getType(i);
  if (t === "string")
    return `"${i}"`;
  if (t === "function")
    return "f () {...}";
  if (t === "symbol")
    return i.toString();
  return i;
}
var css$1, JsonView, css2, Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/(docs)/docs/api/v1/_resource_/_page.svelte.js"() {
    init_ssr();
    init_test();
    init_stores();
    css$1 = {
      code: ".svelte-6z96o6:where(._jsonList){list-style:none;margin:0;padding:0;padding-left:var(--jsonPaddingLeft, 1rem);border-left:var(--jsonBorderLeft, 1px dotted)}.svelte-6z96o6:where(._jsonBkt){color:var(--jsonBracketColor, currentcolor)}.svelte-6z96o6:where(._jsonBkt):not(.empty):hover{cursor:pointer;background:var(--jsonBracketHoverBackground, #e5e7eb)}.svelte-6z96o6:where(._jsonSep){color:var(--jsonSeparatorColor, currentcolor)}.svelte-6z96o6:where(._jsonKey){color:var(--jsonKeyColor, currentcolor)}.svelte-6z96o6:where(._jsonVal){color:var(--jsonValColor, #9ca3af)}:where(._jsonVal).string.svelte-6z96o6{color:var(--jsonValStringColor, #059669)}:where(._jsonVal).number.svelte-6z96o6{color:var(--jsonValNumberColor, #d97706)}:where(._jsonVal).boolean.svelte-6z96o6{color:var(--jsonValBooleanColor, #2563eb)}",
      map: null
    };
    JsonView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { json: json3 } = $$props;
      let { depth = Infinity } = $$props;
      let { _cur = 0 } = $$props;
      let { _last = true } = $$props;
      let items;
      let isArray = false;
      let brackets = ["", ""];
      let collapsed = false;
      if ($$props.json === void 0 && $$bindings.json && json3 !== void 0)
        $$bindings.json(json3);
      if ($$props.depth === void 0 && $$bindings.depth && depth !== void 0)
        $$bindings.depth(depth);
      if ($$props._cur === void 0 && $$bindings._cur && _cur !== void 0)
        $$bindings._cur(_cur);
      if ($$props._last === void 0 && $$bindings._last && _last !== void 0)
        $$bindings._last(_last);
      $$result.css.add(css$1);
      {
        {
          items = getType(json3) === "object" ? Object.keys(json3) : [];
          isArray = Array.isArray(json3);
          brackets = isArray ? ["[", "]"] : ["{", "}"];
        }
      }
      collapsed = depth < _cur;
      return `${!items.length ? `<span class="${["_jsonBkt empty svelte-6z96o6", isArray ? "isArray" : ""].join(" ").trim()}">${escape(brackets[0])}${escape(brackets[1])}</span>${!_last ? `<span class="_jsonSep svelte-6z96o6" data-svelte-h="svelte-1f29ohw">,</span>` : ``}` : `${collapsed ? `<span class="${["_jsonBkt svelte-6z96o6", isArray ? "isArray" : ""].join(" ").trim()}" role="button" tabindex="0">${escape(brackets[0])}...${escape(brackets[1])}</span>${!_last && collapsed ? `<span class="_jsonSep svelte-6z96o6" data-svelte-h="svelte-1inngla">,</span>` : ``}` : `<span class="${["_jsonBkt svelte-6z96o6", isArray ? "isArray" : ""].join(" ").trim()}" role="button" tabindex="0">${escape(brackets[0])}</span> <ul class="_jsonList svelte-6z96o6">${each(items, (i, idx) => {
        return `<li class="svelte-6z96o6">${!isArray ? `<span class="_jsonKey svelte-6z96o6">&quot;${escape(i)}&quot;</span><span class="_jsonSep svelte-6z96o6" data-svelte-h="svelte-168684w">:</span>` : ``} ${getType(json3[i]) === "object" ? `${validate_component(JsonView, "svelte:self").$$render(
          $$result,
          {
            json: json3[i],
            depth,
            _cur: _cur + 1,
            _last: idx === items.length - 1
          },
          {},
          {}
        )}` : `<span class="${"_jsonVal " + escape(getType(json3[i]), true) + " svelte-6z96o6"}">${escape(format(json3[i]))}</span>${idx < items.length - 1 ? `<span class="_jsonSep svelte-6z96o6" data-svelte-h="svelte-1inngla">,</span>` : ``}`} </li>`;
      })}</ul> <span class="${["_jsonBkt svelte-6z96o6", isArray ? "isArray" : ""].join(" ").trim()}" role="button" tabindex="0">${escape(brackets[1])}</span>${!_last ? `<span class="_jsonSep svelte-6z96o6" data-svelte-h="svelte-1inngla">,</span>` : ``}`}`}`;
    });
    css2 = {
      code: ".json-wrapper.svelte-159rr0q{--jsonPaddingLeft:2rem}",
      map: null
    };
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let resource;
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$result.css.add(css2);
      resource = resources.find((r) => r.resource === $page.params.resource);
      $$unsubscribe_page();
      return `<div class="flex flex-col gap-4"><section><h1 class="text-5xl pb-4">${escape(resource.method)} ${escape(resource.resource)}</h1> <p>${escape(resource.description)}</p></section> <section><h2 class="text-4xl pb-6" data-svelte-h="svelte-17gj13b">Resource URL</h2> ${resource.method === "GET" ? `<a class="text-red-500 font-mono underline underline-offset-4" href="${escape($page.url.origin, true) + "/" + escape(resource.resource_url, true)}">${escape($page.url.origin)}/${escape(resource.resource_url)}</a>` : `<code class="text-red-500">${escape($page.url.origin)}/${escape(resource.resource_url)}</code>`}</section> <section><h2 class="text-4xl pb-6" data-svelte-h="svelte-xzians">Resource Information</h2> <table class="rounded overflow-hidden"><tr class="bg-zinc-800 border-b"><td class="p-2 border-r" data-svelte-h="svelte-dmvkbs">Response formats</td> <td class="p-2">${escape(resource.information.response_format)}</td></tr> <tr class="bg-zinc-700"><td class="p-2 border-r" data-svelte-h="svelte-12jwuuq">Requires authentication?</td> <td class="p-2">${escape(resource.information.requires_auth ? "Yes" : "No")}</td></tr></table></section> <section><h2 class="text-4xl pb-6" data-svelte-h="svelte-1w9hm1m">Parameters</h2> ${resource.parameters.length === 0 ? `<p data-svelte-h="svelte-1cfsefb">-</p>` : `<p data-svelte-h="svelte-1xg7emz">TODO!</p>`}</section> <section><h2 class="text-4xl pb-6" data-svelte-h="svelte-zkl3tf">Response codes</h2> <table class="rounded overflow-hidden"><thead data-svelte-h="svelte-173em9r"><tr class="border-b bg-zinc-800"><th class="border-r p-2">Code</th> <th class="p-2">Reason</th></tr></thead> <tbody>${each(resource.responses, (response) => {
        return `<tr class="odd:bg-zinc-700 even:bg-zinc-800"><td class="p-2 border-r">${escape(response.code)}</td> <td class="p-2">${escape(response.reason)}</td> </tr>`;
      })}</tbody></table></section> <section><h2 class="text-4xl pb-6" data-svelte-h="svelte-11pajpr">Example Request</h2> <p class="text-red-500 bg-zinc-800 p-2 rounded font-mono">${escape(resource.method)} ${escape($page.url.origin)}/${escape(resource.sample_request)}</p></section> <section><h2 class="text-4xl pb-6" data-svelte-h="svelte-a1q8bz">Example Response</h2> <div class="bg-zinc-700 rounded p-2 font-mono json-wrapper svelte-159rr0q">${validate_component(JsonView, "JsonView").$$render($$result, { json: resource.sample_response }, {}, {})}</div></section> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component6,
  fonts: () => fonts9,
  imports: () => imports9,
  index: () => index9,
  stylesheets: () => stylesheets9
});
var index9, component_cache6, component6, imports9, stylesheets9, fonts9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    index9 = 8;
    component6 = async () => component_cache6 ?? (component_cache6 = (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default);
    imports9 = ["_app/immutable/nodes/8.974f6040.js", "_app/immutable/chunks/scheduler.e108d1fd.js", "_app/immutable/chunks/index.c5e6bafe.js", "_app/immutable/chunks/each.c0e137c1.js", "_app/immutable/chunks/test.e18d91b4.js", "_app/immutable/chunks/stores.4267bdef.js", "_app/immutable/chunks/singletons.c3d64619.js"];
    stylesheets9 = ["_app/immutable/assets/8.da1d174e.css"];
    fonts9 = [];
  }
});

// node_modules/@neondatabase/serverless/index.js
var require_serverless = __commonJS({
  "node_modules/@neondatabase/serverless/index.js"(exports, module) {
    "use strict";
    var Zs = Object.create;
    var _e2 = Object.defineProperty;
    var Js = Object.getOwnPropertyDescriptor;
    var Xs = Object.getOwnPropertyNames;
    var eo = Object.getPrototypeOf;
    var to = Object.prototype.hasOwnProperty;
    var ro = (r, e, t) => e in r ? _e2(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
    var a = (r, e) => _e2(r, "name", { value: e, configurable: true });
    var W = (r, e) => () => (r && (e = r(r = 0)), e);
    var I = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
    var Y = (r, e) => {
      for (var t in e)
        _e2(r, t, { get: e[t], enumerable: true });
    };
    var An = (r, e, t, n) => {
      if (e && typeof e == "object" || typeof e == "function")
        for (let i of Xs(e))
          !to.call(r, i) && i !== t && _e2(r, i, { get: () => e[i], enumerable: !(n = Js(e, i)) || n.enumerable });
      return r;
    };
    var Ne = (r, e, t) => (t = r != null ? Zs(eo(r)) : {}, An(e || !r || !r.__esModule ? _e2(t, "default", {
      value: r,
      enumerable: true
    }) : t, r));
    var U = (r) => An(_e2({}, "__esModule", { value: true }), r);
    var T = (r, e, t) => (ro(r, typeof e != "symbol" ? e + "" : e, t), t);
    var Tn = I((nt) => {
      "use strict";
      p2();
      nt.byteLength = io;
      nt.toByteArray = oo;
      nt.fromByteArray = co;
      var oe = [], J = [], no = typeof Uint8Array < "u" ? Uint8Array : Array, Tt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (xe = 0, Cn = Tt.length; xe < Cn; ++xe)
        oe[xe] = Tt[xe], J[Tt.charCodeAt(xe)] = xe;
      var xe, Cn;
      J["-".charCodeAt(0)] = 62;
      J["_".charCodeAt(
        0
      )] = 63;
      function In(r) {
        var e = r.length;
        if (e % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var t = r.indexOf("=");
        t === -1 && (t = e);
        var n = t === e ? 0 : 4 - t % 4;
        return [t, n];
      }
      a(In, "getLens");
      function io(r) {
        var e = In(r), t = e[0], n = e[1];
        return (t + n) * 3 / 4 - n;
      }
      a(io, "byteLength");
      function so(r, e, t) {
        return (e + t) * 3 / 4 - t;
      }
      a(so, "_byteLength");
      function oo(r) {
        var e, t = In(r), n = t[0], i = t[1], s2 = new no(so(r, n, i)), o = 0, u = i > 0 ? n - 4 : n, c2;
        for (c2 = 0; c2 < u; c2 += 4)
          e = J[r.charCodeAt(c2)] << 18 | J[r.charCodeAt(c2 + 1)] << 12 | J[r.charCodeAt(
            c2 + 2
          )] << 6 | J[r.charCodeAt(c2 + 3)], s2[o++] = e >> 16 & 255, s2[o++] = e >> 8 & 255, s2[o++] = e & 255;
        return i === 2 && (e = J[r.charCodeAt(c2)] << 2 | J[r.charCodeAt(c2 + 1)] >> 4, s2[o++] = e & 255), i === 1 && (e = J[r.charCodeAt(c2)] << 10 | J[r.charCodeAt(c2 + 1)] << 4 | J[r.charCodeAt(c2 + 2)] >> 2, s2[o++] = e >> 8 & 255, s2[o++] = e & 255), s2;
      }
      a(oo, "toByteArray");
      function ao(r) {
        return oe[r >> 18 & 63] + oe[r >> 12 & 63] + oe[r >> 6 & 63] + oe[r & 63];
      }
      a(ao, "tripletToBase64");
      function uo(r, e, t) {
        for (var n, i = [], s2 = e; s2 < t; s2 += 3)
          n = (r[s2] << 16 & 16711680) + (r[s2 + 1] << 8 & 65280) + (r[s2 + 2] & 255), i.push(ao(n));
        return i.join("");
      }
      a(uo, "encodeChunk");
      function co(r) {
        for (var e, t = r.length, n = t % 3, i = [], s2 = 16383, o = 0, u = t - n; o < u; o += s2)
          i.push(uo(r, o, o + s2 > u ? u : o + s2));
        return n === 1 ? (e = r[t - 1], i.push(oe[e >> 2] + oe[e << 4 & 63] + "==")) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1], i.push(oe[e >> 10] + oe[e >> 4 & 63] + oe[e << 2 & 63] + "=")), i.join("");
      }
      a(co, "fromByteArray");
    });
    var Pn = I((Pt) => {
      p2();
      Pt.read = function(r, e, t, n, i) {
        var s2, o, u = i * 8 - n - 1, c2 = (1 << u) - 1, h = c2 >> 1, f2 = -7, m2 = t ? i - 1 : 0, x = t ? -1 : 1, _ = r[e + m2];
        for (m2 += x, s2 = _ & (1 << -f2) - 1, _ >>= -f2, f2 += u; f2 > 0; s2 = s2 * 256 + r[e + m2], m2 += x, f2 -= 8)
          ;
        for (o = s2 & (1 << -f2) - 1, s2 >>= -f2, f2 += n; f2 > 0; o = o * 256 + r[e + m2], m2 += x, f2 -= 8)
          ;
        if (s2 === 0)
          s2 = 1 - h;
        else {
          if (s2 === c2)
            return o ? NaN : (_ ? -1 : 1) * (1 / 0);
          o = o + Math.pow(2, n), s2 = s2 - h;
        }
        return (_ ? -1 : 1) * o * Math.pow(2, s2 - n);
      };
      Pt.write = function(r, e, t, n, i, s2) {
        var o, u, c2, h = s2 * 8 - i - 1, f2 = (1 << h) - 1, m2 = f2 >> 1, x = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _ = n ? 0 : s2 - 1, P = n ? 1 : -1, k = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, o = f2) : (o = Math.floor(Math.log(e) / Math.LN2), e * (c2 = Math.pow(2, -o)) < 1 && (o--, c2 *= 2), o + m2 >= 1 ? e += x / c2 : e += x * Math.pow(2, 1 - m2), e * c2 >= 2 && (o++, c2 /= 2), o + m2 >= f2 ? (u = 0, o = f2) : o + m2 >= 1 ? (u = (e * c2 - 1) * Math.pow(
          2,
          i
        ), o = o + m2) : (u = e * Math.pow(2, m2 - 1) * Math.pow(2, i), o = 0)); i >= 8; r[t + _] = u & 255, _ += P, u /= 256, i -= 8)
          ;
        for (o = o << i | u, h += i; h > 0; r[t + _] = o & 255, _ += P, o /= 256, h -= 8)
          ;
        r[t + _ - P] |= k * 128;
      };
    });
    var $n = I((Te) => {
      "use strict";
      p2();
      var Bt = Tn(), Ce = Pn(), Bn = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
      Te.Buffer = l;
      Te.SlowBuffer = mo;
      Te.INSPECT_MAX_BYTES = 50;
      var it = 2147483647;
      Te.kMaxLength = it;
      l.TYPED_ARRAY_SUPPORT = ho();
      !l.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
      function ho() {
        try {
          let r = new Uint8Array(1), e = { foo: function() {
            return 42;
          } };
          return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(r, e), r.foo() === 42;
        } catch {
          return false;
        }
      }
      a(ho, "typedArraySupport");
      Object.defineProperty(
        l.prototype,
        "parent",
        { enumerable: true, get: function() {
          if (l.isBuffer(this))
            return this.buffer;
        } }
      );
      Object.defineProperty(l.prototype, "offset", { enumerable: true, get: function() {
        if (l.isBuffer(
          this
        ))
          return this.byteOffset;
      } });
      function le(r) {
        if (r > it)
          throw new RangeError('The value "' + r + '" is invalid for option "size"');
        let e = new Uint8Array(r);
        return Object.setPrototypeOf(e, l.prototype), e;
      }
      a(le, "createBuffer");
      function l(r, e, t) {
        if (typeof r == "number") {
          if (typeof e == "string")
            throw new TypeError('The "string" argument must be of type string. Received type number');
          return Mt(r);
        }
        return Mn(r, e, t);
      }
      a(l, "Buffer");
      l.poolSize = 8192;
      function Mn(r, e, t) {
        if (typeof r == "string")
          return fo(r, e);
        if (ArrayBuffer.isView(r))
          return po(r);
        if (r == null)
          throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
        if (ae(r, ArrayBuffer) || r && ae(r.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ae(r, SharedArrayBuffer) || r && ae(r.buffer, SharedArrayBuffer)))
          return Rt(
            r,
            e,
            t
          );
        if (typeof r == "number")
          throw new TypeError('The "value" argument must not be of type number. Received type number');
        let n = r.valueOf && r.valueOf();
        if (n != null && n !== r)
          return l.from(n, e, t);
        let i = yo(r);
        if (i)
          return i;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r[Symbol.toPrimitive] == "function")
          return l.from(r[Symbol.toPrimitive](
            "string"
          ), e, t);
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
      }
      a(
        Mn,
        "from"
      );
      l.from = function(r, e, t) {
        return Mn(r, e, t);
      };
      Object.setPrototypeOf(
        l.prototype,
        Uint8Array.prototype
      );
      Object.setPrototypeOf(l, Uint8Array);
      function Dn(r) {
        if (typeof r != "number")
          throw new TypeError('"size" argument must be of type number');
        if (r < 0)
          throw new RangeError(
            'The value "' + r + '" is invalid for option "size"'
          );
      }
      a(Dn, "assertSize");
      function lo(r, e, t) {
        return Dn(r), r <= 0 ? le(r) : e !== void 0 ? typeof t == "string" ? le(r).fill(e, t) : le(r).fill(
          e
        ) : le(r);
      }
      a(lo, "alloc");
      l.alloc = function(r, e, t) {
        return lo(r, e, t);
      };
      function Mt(r) {
        return Dn(r), le(r < 0 ? 0 : Dt(r) | 0);
      }
      a(Mt, "allocUnsafe");
      l.allocUnsafe = function(r) {
        return Mt(
          r
        );
      };
      l.allocUnsafeSlow = function(r) {
        return Mt(r);
      };
      function fo(r, e) {
        if ((typeof e != "string" || e === "") && (e = "utf8"), !l.isEncoding(e))
          throw new TypeError("Unknown encoding: " + e);
        let t = kn(r, e) | 0, n = le(t), i = n.write(r, e);
        return i !== t && (n = n.slice(0, i)), n;
      }
      a(fo, "fromString");
      function Lt(r) {
        let e = r.length < 0 ? 0 : Dt(r.length) | 0, t = le(e);
        for (let n = 0; n < e; n += 1)
          t[n] = r[n] & 255;
        return t;
      }
      a(Lt, "fromArrayLike");
      function po(r) {
        if (ae(r, Uint8Array)) {
          let e = new Uint8Array(r);
          return Rt(e.buffer, e.byteOffset, e.byteLength);
        }
        return Lt(
          r
        );
      }
      a(po, "fromArrayView");
      function Rt(r, e, t) {
        if (e < 0 || r.byteLength < e)
          throw new RangeError(
            '"offset" is outside of buffer bounds'
          );
        if (r.byteLength < e + (t || 0))
          throw new RangeError(
            '"length" is outside of buffer bounds'
          );
        let n;
        return e === void 0 && t === void 0 ? n = new Uint8Array(
          r
        ) : t === void 0 ? n = new Uint8Array(r, e) : n = new Uint8Array(r, e, t), Object.setPrototypeOf(
          n,
          l.prototype
        ), n;
      }
      a(Rt, "fromArrayBuffer");
      function yo(r) {
        if (l.isBuffer(r)) {
          let e = Dt(
            r.length
          ) | 0, t = le(e);
          return t.length === 0 || r.copy(t, 0, 0, e), t;
        }
        if (r.length !== void 0)
          return typeof r.length != "number" || Ut(r.length) ? le(0) : Lt(r);
        if (r.type === "Buffer" && Array.isArray(r.data))
          return Lt(r.data);
      }
      a(yo, "fromObject");
      function Dt(r) {
        if (r >= it)
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + it.toString(16) + " bytes");
        return r | 0;
      }
      a(Dt, "checked");
      function mo(r) {
        return +r != r && (r = 0), l.alloc(+r);
      }
      a(mo, "SlowBuffer");
      l.isBuffer = a(function(e) {
        return e != null && e._isBuffer === true && e !== l.prototype;
      }, "isBuffer");
      l.compare = a(function(e, t) {
        if (ae(e, Uint8Array) && (e = l.from(e, e.offset, e.byteLength)), ae(t, Uint8Array) && (t = l.from(t, t.offset, t.byteLength)), !l.isBuffer(e) || !l.isBuffer(t))
          throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (e === t)
          return 0;
        let n = e.length, i = t.length;
        for (let s2 = 0, o = Math.min(n, i); s2 < o; ++s2)
          if (e[s2] !== t[s2]) {
            n = e[s2], i = t[s2];
            break;
          }
        return n < i ? -1 : i < n ? 1 : 0;
      }, "compare");
      l.isEncoding = a(function(e) {
        switch (String(e).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      }, "isEncoding");
      l.concat = a(function(e, t) {
        if (!Array.isArray(e))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (e.length === 0)
          return l.alloc(0);
        let n;
        if (t === void 0)
          for (t = 0, n = 0; n < e.length; ++n)
            t += e[n].length;
        let i = l.allocUnsafe(t), s2 = 0;
        for (n = 0; n < e.length; ++n) {
          let o = e[n];
          if (ae(o, Uint8Array))
            s2 + o.length > i.length ? (l.isBuffer(
              o
            ) || (o = l.from(o)), o.copy(i, s2)) : Uint8Array.prototype.set.call(i, o, s2);
          else if (l.isBuffer(
            o
          ))
            o.copy(i, s2);
          else
            throw new TypeError('"list" argument must be an Array of Buffers');
          s2 += o.length;
        }
        return i;
      }, "concat");
      function kn(r, e) {
        if (l.isBuffer(r))
          return r.length;
        if (ArrayBuffer.isView(r) || ae(r, ArrayBuffer))
          return r.byteLength;
        if (typeof r != "string")
          throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r);
        let t = r.length, n = arguments.length > 2 && arguments[2] === true;
        if (!n && t === 0)
          return 0;
        let i = false;
        for (; ; )
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return t;
            case "utf8":
            case "utf-8":
              return Ft(r).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return t * 2;
            case "hex":
              return t >>> 1;
            case "base64":
              return Gn(r).length;
            default:
              if (i)
                return n ? -1 : Ft(r).length;
              e = ("" + e).toLowerCase(), i = true;
          }
      }
      a(kn, "byteLength");
      l.byteLength = kn;
      function go(r, e, t) {
        let n = false;
        if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, e >>>= 0, t <= e))
          return "";
        for (r || (r = "utf8"); ; )
          switch (r) {
            case "hex":
              return Io(
                this,
                e,
                t
              );
            case "utf8":
            case "utf-8":
              return On(this, e, t);
            case "ascii":
              return Ao(
                this,
                e,
                t
              );
            case "latin1":
            case "binary":
              return Co(this, e, t);
            case "base64":
              return vo(
                this,
                e,
                t
              );
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return To(this, e, t);
            default:
              if (n)
                throw new TypeError("Unknown encoding: " + r);
              r = (r + "").toLowerCase(), n = true;
          }
      }
      a(
        go,
        "slowToString"
      );
      l.prototype._isBuffer = true;
      function Ee(r, e, t) {
        let n = r[e];
        r[e] = r[t], r[t] = n;
      }
      a(Ee, "swap");
      l.prototype.swap16 = a(function() {
        let e = this.length;
        if (e % 2 !== 0)
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let t = 0; t < e; t += 2)
          Ee(this, t, t + 1);
        return this;
      }, "swap16");
      l.prototype.swap32 = a(function() {
        let e = this.length;
        if (e % 4 !== 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let t = 0; t < e; t += 4)
          Ee(this, t, t + 3), Ee(this, t + 1, t + 2);
        return this;
      }, "swap32");
      l.prototype.swap64 = a(function() {
        let e = this.length;
        if (e % 8 !== 0)
          throw new RangeError(
            "Buffer size must be a multiple of 64-bits"
          );
        for (let t = 0; t < e; t += 8)
          Ee(this, t, t + 7), Ee(this, t + 1, t + 6), Ee(this, t + 2, t + 5), Ee(this, t + 3, t + 4);
        return this;
      }, "swap64");
      l.prototype.toString = a(function() {
        let e = this.length;
        return e === 0 ? "" : arguments.length === 0 ? On(
          this,
          0,
          e
        ) : go.apply(this, arguments);
      }, "toString");
      l.prototype.toLocaleString = l.prototype.toString;
      l.prototype.equals = a(function(e) {
        if (!l.isBuffer(e))
          throw new TypeError(
            "Argument must be a Buffer"
          );
        return this === e ? true : l.compare(this, e) === 0;
      }, "equals");
      l.prototype.inspect = a(function() {
        let e = "", t = Te.INSPECT_MAX_BYTES;
        return e = this.toString(
          "hex",
          0,
          t
        ).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
      }, "inspect");
      Bn && (l.prototype[Bn] = l.prototype.inspect);
      l.prototype.compare = a(function(e, t, n, i, s2) {
        if (ae(e, Uint8Array) && (e = l.from(e, e.offset, e.byteLength)), !l.isBuffer(e))
          throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
        if (t === void 0 && (t = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), s2 === void 0 && (s2 = this.length), t < 0 || n > e.length || i < 0 || s2 > this.length)
          throw new RangeError("out of range index");
        if (i >= s2 && t >= n)
          return 0;
        if (i >= s2)
          return -1;
        if (t >= n)
          return 1;
        if (t >>>= 0, n >>>= 0, i >>>= 0, s2 >>>= 0, this === e)
          return 0;
        let o = s2 - i, u = n - t, c2 = Math.min(o, u), h = this.slice(i, s2), f2 = e.slice(t, n);
        for (let m2 = 0; m2 < c2; ++m2)
          if (h[m2] !== f2[m2]) {
            o = h[m2], u = f2[m2];
            break;
          }
        return o < u ? -1 : u < o ? 1 : 0;
      }, "compare");
      function Un(r, e, t, n, i) {
        if (r.length === 0)
          return -1;
        if (typeof t == "string" ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, Ut(t) && (t = i ? 0 : r.length - 1), t < 0 && (t = r.length + t), t >= r.length) {
          if (i)
            return -1;
          t = r.length - 1;
        } else if (t < 0)
          if (i)
            t = 0;
          else
            return -1;
        if (typeof e == "string" && (e = l.from(e, n)), l.isBuffer(e))
          return e.length === 0 ? -1 : Ln(r, e, t, n, i);
        if (typeof e == "number")
          return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(r, e, t) : Uint8Array.prototype.lastIndexOf.call(r, e, t) : Ln(
            r,
            [e],
            t,
            n,
            i
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      a(Un, "bidirectionalIndexOf");
      function Ln(r, e, t, n, i) {
        let s2 = 1, o = r.length, u = e.length;
        if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
          if (r.length < 2 || e.length < 2)
            return -1;
          s2 = 2, o /= 2, u /= 2, t /= 2;
        }
        function c2(f2, m2) {
          return s2 === 1 ? f2[m2] : f2.readUInt16BE(m2 * s2);
        }
        a(c2, "read");
        let h;
        if (i) {
          let f2 = -1;
          for (h = t; h < o; h++)
            if (c2(r, h) === c2(e, f2 === -1 ? 0 : h - f2)) {
              if (f2 === -1 && (f2 = h), h - f2 + 1 === u)
                return f2 * s2;
            } else
              f2 !== -1 && (h -= h - f2), f2 = -1;
        } else
          for (t + u > o && (t = o - u), h = t; h >= 0; h--) {
            let f2 = true;
            for (let m2 = 0; m2 < u; m2++)
              if (c2(r, h + m2) !== c2(e, m2)) {
                f2 = false;
                break;
              }
            if (f2)
              return h;
          }
        return -1;
      }
      a(Ln, "arrayIndexOf");
      l.prototype.includes = a(function(e, t, n) {
        return this.indexOf(e, t, n) !== -1;
      }, "includes");
      l.prototype.indexOf = a(function(e, t, n) {
        return Un(this, e, t, n, true);
      }, "indexOf");
      l.prototype.lastIndexOf = a(function(e, t, n) {
        return Un(this, e, t, n, false);
      }, "lastIndexOf");
      function wo(r, e, t, n) {
        t = Number(t) || 0;
        let i = r.length - t;
        n ? (n = Number(n), n > i && (n = i)) : n = i;
        let s2 = e.length;
        n > s2 / 2 && (n = s2 / 2);
        let o;
        for (o = 0; o < n; ++o) {
          let u = parseInt(e.substr(o * 2, 2), 16);
          if (Ut(u))
            return o;
          r[t + o] = u;
        }
        return o;
      }
      a(wo, "hexWrite");
      function bo(r, e, t, n) {
        return st(Ft(
          e,
          r.length - t
        ), r, t, n);
      }
      a(bo, "utf8Write");
      function So(r, e, t, n) {
        return st(Ro(e), r, t, n);
      }
      a(So, "asciiWrite");
      function xo(r, e, t, n) {
        return st(Gn(e), r, t, n);
      }
      a(xo, "base64Write");
      function Eo(r, e, t, n) {
        return st(Fo(e, r.length - t), r, t, n);
      }
      a(Eo, "ucs2Write");
      l.prototype.write = a(function(e, t, n, i) {
        if (t === void 0)
          i = "utf8", n = this.length, t = 0;
        else if (n === void 0 && typeof t == "string")
          i = t, n = this.length, t = 0;
        else if (isFinite(t))
          t = t >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
        else
          throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        let s2 = this.length - t;
        if ((n === void 0 || n > s2) && (n = s2), e.length > 0 && (n < 0 || t < 0) || t > this.length)
          throw new RangeError(
            "Attempt to write outside buffer bounds"
          );
        i || (i = "utf8");
        let o = false;
        for (; ; )
          switch (i) {
            case "hex":
              return wo(this, e, t, n);
            case "utf8":
            case "utf-8":
              return bo(this, e, t, n);
            case "ascii":
            case "latin1":
            case "binary":
              return So(this, e, t, n);
            case "base64":
              return xo(
                this,
                e,
                t,
                n
              );
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return Eo(this, e, t, n);
            default:
              if (o)
                throw new TypeError("Unknown encoding: " + i);
              i = ("" + i).toLowerCase(), o = true;
          }
      }, "write");
      l.prototype.toJSON = a(function() {
        return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
      }, "toJSON");
      function vo(r, e, t) {
        return e === 0 && t === r.length ? Bt.fromByteArray(r) : Bt.fromByteArray(r.slice(e, t));
      }
      a(vo, "base64Slice");
      function On(r, e, t) {
        t = Math.min(r.length, t);
        let n = [], i = e;
        for (; i < t; ) {
          let s2 = r[i], o = null, u = s2 > 239 ? 4 : s2 > 223 ? 3 : s2 > 191 ? 2 : 1;
          if (i + u <= t) {
            let c2, h, f2, m2;
            switch (u) {
              case 1:
                s2 < 128 && (o = s2);
                break;
              case 2:
                c2 = r[i + 1], (c2 & 192) === 128 && (m2 = (s2 & 31) << 6 | c2 & 63, m2 > 127 && (o = m2));
                break;
              case 3:
                c2 = r[i + 1], h = r[i + 2], (c2 & 192) === 128 && (h & 192) === 128 && (m2 = (s2 & 15) << 12 | (c2 & 63) << 6 | h & 63, m2 > 2047 && (m2 < 55296 || m2 > 57343) && (o = m2));
                break;
              case 4:
                c2 = r[i + 1], h = r[i + 2], f2 = r[i + 3], (c2 & 192) === 128 && (h & 192) === 128 && (f2 & 192) === 128 && (m2 = (s2 & 15) << 18 | (c2 & 63) << 12 | (h & 63) << 6 | f2 & 63, m2 > 65535 && m2 < 1114112 && (o = m2));
            }
          }
          o === null ? (o = 65533, u = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), n.push(o), i += u;
        }
        return _o(n);
      }
      a(On, "utf8Slice");
      var Rn = 4096;
      function _o(r) {
        let e = r.length;
        if (e <= Rn)
          return String.fromCharCode.apply(String, r);
        let t = "", n = 0;
        for (; n < e; )
          t += String.fromCharCode.apply(String, r.slice(n, n += Rn));
        return t;
      }
      a(_o, "decodeCodePointsArray");
      function Ao(r, e, t) {
        let n = "";
        t = Math.min(r.length, t);
        for (let i = e; i < t; ++i)
          n += String.fromCharCode(r[i] & 127);
        return n;
      }
      a(Ao, "asciiSlice");
      function Co(r, e, t) {
        let n = "";
        t = Math.min(r.length, t);
        for (let i = e; i < t; ++i)
          n += String.fromCharCode(r[i]);
        return n;
      }
      a(Co, "latin1Slice");
      function Io(r, e, t) {
        let n = r.length;
        (!e || e < 0) && (e = 0), (!t || t < 0 || t > n) && (t = n);
        let i = "";
        for (let s2 = e; s2 < t; ++s2)
          i += Mo[r[s2]];
        return i;
      }
      a(Io, "hexSlice");
      function To(r, e, t) {
        let n = r.slice(e, t), i = "";
        for (let s2 = 0; s2 < n.length - 1; s2 += 2)
          i += String.fromCharCode(n[s2] + n[s2 + 1] * 256);
        return i;
      }
      a(To, "utf16leSlice");
      l.prototype.slice = a(function(e, t) {
        let n = this.length;
        e = ~~e, t = t === void 0 ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
        let i = this.subarray(
          e,
          t
        );
        return Object.setPrototypeOf(i, l.prototype), i;
      }, "slice");
      function q(r, e, t) {
        if (r % 1 !== 0 || r < 0)
          throw new RangeError("offset is not uint");
        if (r + e > t)
          throw new RangeError(
            "Trying to access beyond buffer length"
          );
      }
      a(q, "checkOffset");
      l.prototype.readUintLE = l.prototype.readUIntLE = a(function(e, t, n) {
        e = e >>> 0, t = t >>> 0, n || q(e, t, this.length);
        let i = this[e], s2 = 1, o = 0;
        for (; ++o < t && (s2 *= 256); )
          i += this[e + o] * s2;
        return i;
      }, "readUIntLE");
      l.prototype.readUintBE = l.prototype.readUIntBE = a(function(e, t, n) {
        e = e >>> 0, t = t >>> 0, n || q(e, t, this.length);
        let i = this[e + --t], s2 = 1;
        for (; t > 0 && (s2 *= 256); )
          i += this[e + --t] * s2;
        return i;
      }, "readUIntBE");
      l.prototype.readUint8 = l.prototype.readUInt8 = a(function(e, t) {
        return e = e >>> 0, t || q(e, 1, this.length), this[e];
      }, "readUInt8");
      l.prototype.readUint16LE = l.prototype.readUInt16LE = a(function(e, t) {
        return e = e >>> 0, t || q(e, 2, this.length), this[e] | this[e + 1] << 8;
      }, "readUInt16LE");
      l.prototype.readUint16BE = l.prototype.readUInt16BE = a(function(e, t) {
        return e = e >>> 0, t || q(e, 2, this.length), this[e] << 8 | this[e + 1];
      }, "readUInt16BE");
      l.prototype.readUint32LE = l.prototype.readUInt32LE = a(function(e, t) {
        return e = e >>> 0, t || q(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
      }, "readUInt32LE");
      l.prototype.readUint32BE = l.prototype.readUInt32BE = a(function(e, t) {
        return e = e >>> 0, t || q(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
      }, "readUInt32BE");
      l.prototype.readBigUInt64LE = de(a(function(e) {
        e = e >>> 0, Ie(e, "offset");
        let t = this[e], n = this[e + 7];
        (t === void 0 || n === void 0) && Qe(e, this.length - 8);
        let i = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, s2 = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
        return BigInt(i) + (BigInt(s2) << BigInt(32));
      }, "readBigUInt64LE"));
      l.prototype.readBigUInt64BE = de(a(function(e) {
        e = e >>> 0, Ie(e, "offset");
        let t = this[e], n = this[e + 7];
        (t === void 0 || n === void 0) && Qe(e, this.length - 8);
        let i = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], s2 = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
        return (BigInt(
          i
        ) << BigInt(32)) + BigInt(s2);
      }, "readBigUInt64BE"));
      l.prototype.readIntLE = a(function(e, t, n) {
        e = e >>> 0, t = t >>> 0, n || q(e, t, this.length);
        let i = this[e], s2 = 1, o = 0;
        for (; ++o < t && (s2 *= 256); )
          i += this[e + o] * s2;
        return s2 *= 128, i >= s2 && (i -= Math.pow(2, 8 * t)), i;
      }, "readIntLE");
      l.prototype.readIntBE = a(function(e, t, n) {
        e = e >>> 0, t = t >>> 0, n || q(e, t, this.length);
        let i = t, s2 = 1, o = this[e + --i];
        for (; i > 0 && (s2 *= 256); )
          o += this[e + --i] * s2;
        return s2 *= 128, o >= s2 && (o -= Math.pow(2, 8 * t)), o;
      }, "readIntBE");
      l.prototype.readInt8 = a(function(e, t) {
        return e = e >>> 0, t || q(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
      }, "readInt8");
      l.prototype.readInt16LE = a(function(e, t) {
        e = e >>> 0, t || q(e, 2, this.length);
        let n = this[e] | this[e + 1] << 8;
        return n & 32768 ? n | 4294901760 : n;
      }, "readInt16LE");
      l.prototype.readInt16BE = a(
        function(e, t) {
          e = e >>> 0, t || q(e, 2, this.length);
          let n = this[e + 1] | this[e] << 8;
          return n & 32768 ? n | 4294901760 : n;
        },
        "readInt16BE"
      );
      l.prototype.readInt32LE = a(function(e, t) {
        return e = e >>> 0, t || q(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
      }, "readInt32LE");
      l.prototype.readInt32BE = a(function(e, t) {
        return e = e >>> 0, t || q(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
      }, "readInt32BE");
      l.prototype.readBigInt64LE = de(a(function(e) {
        e = e >>> 0, Ie(e, "offset");
        let t = this[e], n = this[e + 7];
        (t === void 0 || n === void 0) && Qe(
          e,
          this.length - 8
        );
        let i = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
        return (BigInt(
          i
        ) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
      }, "readBigInt64LE"));
      l.prototype.readBigInt64BE = de(a(function(e) {
        e = e >>> 0, Ie(e, "offset");
        let t = this[e], n = this[e + 7];
        (t === void 0 || n === void 0) && Qe(e, this.length - 8);
        let i = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
        return (BigInt(i) << BigInt(32)) + BigInt(
          this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n
        );
      }, "readBigInt64BE"));
      l.prototype.readFloatLE = a(function(e, t) {
        return e = e >>> 0, t || q(e, 4, this.length), Ce.read(
          this,
          e,
          true,
          23,
          4
        );
      }, "readFloatLE");
      l.prototype.readFloatBE = a(function(e, t) {
        return e = e >>> 0, t || q(e, 4, this.length), Ce.read(this, e, false, 23, 4);
      }, "readFloatBE");
      l.prototype.readDoubleLE = a(function(e, t) {
        return e = e >>> 0, t || q(e, 8, this.length), Ce.read(this, e, true, 52, 8);
      }, "readDoubleLE");
      l.prototype.readDoubleBE = a(function(e, t) {
        return e = e >>> 0, t || q(e, 8, this.length), Ce.read(this, e, false, 52, 8);
      }, "readDoubleBE");
      function G(r, e, t, n, i, s2) {
        if (!l.isBuffer(
          r
        ))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > i || e < s2)
          throw new RangeError('"value" argument is out of bounds');
        if (t + n > r.length)
          throw new RangeError(
            "Index out of range"
          );
      }
      a(G, "checkInt");
      l.prototype.writeUintLE = l.prototype.writeUIntLE = a(function(e, t, n, i) {
        if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
          let u = Math.pow(2, 8 * n) - 1;
          G(
            this,
            e,
            t,
            n,
            u,
            0
          );
        }
        let s2 = 1, o = 0;
        for (this[t] = e & 255; ++o < n && (s2 *= 256); )
          this[t + o] = e / s2 & 255;
        return t + n;
      }, "writeUIntLE");
      l.prototype.writeUintBE = l.prototype.writeUIntBE = a(function(e, t, n, i) {
        if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
          let u = Math.pow(2, 8 * n) - 1;
          G(this, e, t, n, u, 0);
        }
        let s2 = n - 1, o = 1;
        for (this[t + s2] = e & 255; --s2 >= 0 && (o *= 256); )
          this[t + s2] = e / o & 255;
        return t + n;
      }, "writeUIntBE");
      l.prototype.writeUint8 = l.prototype.writeUInt8 = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || G(this, e, t, 1, 255, 0), this[t] = e & 255, t + 1;
      }, "writeUInt8");
      l.prototype.writeUint16LE = l.prototype.writeUInt16LE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || G(
          this,
          e,
          t,
          2,
          65535,
          0
        ), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
      }, "writeUInt16LE");
      l.prototype.writeUint16BE = l.prototype.writeUInt16BE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || G(
          this,
          e,
          t,
          2,
          65535,
          0
        ), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
      }, "writeUInt16BE");
      l.prototype.writeUint32LE = l.prototype.writeUInt32LE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || G(
          this,
          e,
          t,
          4,
          4294967295,
          0
        ), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e & 255, t + 4;
      }, "writeUInt32LE");
      l.prototype.writeUint32BE = l.prototype.writeUInt32BE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || G(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
      }, "writeUInt32BE");
      function qn(r, e, t, n, i) {
        Hn(
          e,
          n,
          i,
          r,
          t,
          7
        );
        let s2 = Number(e & BigInt(4294967295));
        r[t++] = s2, s2 = s2 >> 8, r[t++] = s2, s2 = s2 >> 8, r[t++] = s2, s2 = s2 >> 8, r[t++] = s2;
        let o = Number(e >> BigInt(32) & BigInt(4294967295));
        return r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, t;
      }
      a(qn, "wrtBigUInt64LE");
      function Nn(r, e, t, n, i) {
        Hn(e, n, i, r, t, 7);
        let s2 = Number(e & BigInt(4294967295));
        r[t + 7] = s2, s2 = s2 >> 8, r[t + 6] = s2, s2 = s2 >> 8, r[t + 5] = s2, s2 = s2 >> 8, r[t + 4] = s2;
        let o = Number(e >> BigInt(32) & BigInt(4294967295));
        return r[t + 3] = o, o = o >> 8, r[t + 2] = o, o = o >> 8, r[t + 1] = o, o = o >> 8, r[t] = o, t + 8;
      }
      a(Nn, "wrtBigUInt64BE");
      l.prototype.writeBigUInt64LE = de(a(function(e, t = 0) {
        return qn(this, e, t, BigInt(0), BigInt(
          "0xffffffffffffffff"
        ));
      }, "writeBigUInt64LE"));
      l.prototype.writeBigUInt64BE = de(a(function(e, t = 0) {
        return Nn(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
      }, "writeBigUInt64BE"));
      l.prototype.writeIntLE = a(function(e, t, n, i) {
        if (e = +e, t = t >>> 0, !i) {
          let c2 = Math.pow(
            2,
            8 * n - 1
          );
          G(this, e, t, n, c2 - 1, -c2);
        }
        let s2 = 0, o = 1, u = 0;
        for (this[t] = e & 255; ++s2 < n && (o *= 256); )
          e < 0 && u === 0 && this[t + s2 - 1] !== 0 && (u = 1), this[t + s2] = (e / o >> 0) - u & 255;
        return t + n;
      }, "writeIntLE");
      l.prototype.writeIntBE = a(function(e, t, n, i) {
        if (e = +e, t = t >>> 0, !i) {
          let c2 = Math.pow(
            2,
            8 * n - 1
          );
          G(this, e, t, n, c2 - 1, -c2);
        }
        let s2 = n - 1, o = 1, u = 0;
        for (this[t + s2] = e & 255; --s2 >= 0 && (o *= 256); )
          e < 0 && u === 0 && this[t + s2 + 1] !== 0 && (u = 1), this[t + s2] = (e / o >> 0) - u & 255;
        return t + n;
      }, "writeIntBE");
      l.prototype.writeInt8 = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || G(
          this,
          e,
          t,
          1,
          127,
          -128
        ), e < 0 && (e = 255 + e + 1), this[t] = e & 255, t + 1;
      }, "writeInt8");
      l.prototype.writeInt16LE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || G(this, e, t, 2, 32767, -32768), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
      }, "writeInt16LE");
      l.prototype.writeInt16BE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || G(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
      }, "writeInt16BE");
      l.prototype.writeInt32LE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || G(this, e, t, 4, 2147483647, -2147483648), this[t] = e & 255, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
      }, "writeInt32LE");
      l.prototype.writeInt32BE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || G(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
      }, "writeInt32BE");
      l.prototype.writeBigInt64LE = de(a(function(e, t = 0) {
        return qn(this, e, t, -BigInt(
          "0x8000000000000000"
        ), BigInt("0x7fffffffffffffff"));
      }, "writeBigInt64LE"));
      l.prototype.writeBigInt64BE = de(a(function(e, t = 0) {
        return Nn(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      }, "writeBigInt64BE"));
      function Qn(r, e, t, n, i, s2) {
        if (t + n > r.length)
          throw new RangeError("Index out of range");
        if (t < 0)
          throw new RangeError(
            "Index out of range"
          );
      }
      a(Qn, "checkIEEE754");
      function Wn(r, e, t, n, i) {
        return e = +e, t = t >>> 0, i || Qn(r, e, t, 4, 34028234663852886e22, -34028234663852886e22), Ce.write(
          r,
          e,
          t,
          n,
          23,
          4
        ), t + 4;
      }
      a(Wn, "writeFloat");
      l.prototype.writeFloatLE = a(function(e, t, n) {
        return Wn(
          this,
          e,
          t,
          true,
          n
        );
      }, "writeFloatLE");
      l.prototype.writeFloatBE = a(function(e, t, n) {
        return Wn(
          this,
          e,
          t,
          false,
          n
        );
      }, "writeFloatBE");
      function jn(r, e, t, n, i) {
        return e = +e, t = t >>> 0, i || Qn(
          r,
          e,
          t,
          8,
          17976931348623157e292,
          -17976931348623157e292
        ), Ce.write(r, e, t, n, 52, 8), t + 8;
      }
      a(jn, "writeDouble");
      l.prototype.writeDoubleLE = a(function(e, t, n) {
        return jn(
          this,
          e,
          t,
          true,
          n
        );
      }, "writeDoubleLE");
      l.prototype.writeDoubleBE = a(function(e, t, n) {
        return jn(
          this,
          e,
          t,
          false,
          n
        );
      }, "writeDoubleBE");
      l.prototype.copy = a(function(e, t, n, i) {
        if (!l.isBuffer(
          e
        ))
          throw new TypeError("argument should be a Buffer");
        if (n || (n = 0), !i && i !== 0 && (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0)
          return 0;
        if (t < 0)
          throw new RangeError("targetStart out of bounds");
        if (n < 0 || n >= this.length)
          throw new RangeError("Index out of range");
        if (i < 0)
          throw new RangeError(
            "sourceEnd out of bounds"
          );
        i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
        let s2 = i - n;
        return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, i) : Uint8Array.prototype.set.call(e, this.subarray(n, i), t), s2;
      }, "copy");
      l.prototype.fill = a(function(e, t, n, i) {
        if (typeof e == "string") {
          if (typeof t == "string" ? (i = t, t = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string")
            throw new TypeError("encoding must be a string");
          if (typeof i == "string" && !l.isEncoding(i))
            throw new TypeError("Unknown encoding: " + i);
          if (e.length === 1) {
            let o = e.charCodeAt(0);
            (i === "utf8" && o < 128 || i === "latin1") && (e = o);
          }
        } else
          typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
        if (t < 0 || this.length < t || this.length < n)
          throw new RangeError("Out of range index");
        if (n <= t)
          return this;
        t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
        let s2;
        if (typeof e == "number")
          for (s2 = t; s2 < n; ++s2)
            this[s2] = e;
        else {
          let o = l.isBuffer(e) ? e : l.from(e, i), u = o.length;
          if (u === 0)
            throw new TypeError(
              'The value "' + e + '" is invalid for argument "value"'
            );
          for (s2 = 0; s2 < n - t; ++s2)
            this[s2 + t] = o[s2 % u];
        }
        return this;
      }, "fill");
      var Ae = {};
      function kt(r, e, t) {
        var n;
        Ae[r] = (n = class extends t {
          constructor() {
            super(), Object.defineProperty(this, "message", {
              value: e.apply(this, arguments),
              writable: true,
              configurable: true
            }), this.name = `${this.name} [${r}]`, this.stack, delete this.name;
          }
          get code() {
            return r;
          }
          set code(s2) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value: s2,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${r}]: ${this.message}`;
          }
        }, a(n, "NodeError"), n);
      }
      a(kt, "E");
      kt("ERR_BUFFER_OUT_OF_BOUNDS", function(r) {
        return r ? `${r} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      }, RangeError);
      kt("ERR_INVALID_ARG_TYPE", function(r, e) {
        return `The "${r}" argument must be of type number. Received type ${typeof e}`;
      }, TypeError);
      kt("ERR_OUT_OF_RANGE", function(r, e, t) {
        let n = `The value of "${r}" is out of range.`, i = t;
        return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i = Fn(String(t)) : typeof t == "bigint" && (i = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i = Fn(i)), i += "n"), n += ` It must be ${e}. Received ${i}`, n;
      }, RangeError);
      function Fn(r) {
        let e = "", t = r.length, n = r[0] === "-" ? 1 : 0;
        for (; t >= n + 4; t -= 3)
          e = `_${r.slice(t - 3, t)}${e}`;
        return `${r.slice(
          0,
          t
        )}${e}`;
      }
      a(Fn, "addNumericalSeparator");
      function Po(r, e, t) {
        Ie(e, "offset"), (r[e] === void 0 || r[e + t] === void 0) && Qe(e, r.length - (t + 1));
      }
      a(Po, "checkBounds");
      function Hn(r, e, t, n, i, s2) {
        if (r > t || r < e) {
          let o = typeof e == "bigint" ? "n" : "", u;
          throw s2 > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${o} and < 2${o} ** ${(s2 + 1) * 8}${o}` : u = `>= -(2${o} ** ${(s2 + 1) * 8 - 1}${o}) and < 2 ** ${(s2 + 1) * 8 - 1}${o}` : u = `>= ${e}${o} and <= ${t}${o}`, new Ae.ERR_OUT_OF_RANGE(
            "value",
            u,
            r
          );
        }
        Po(n, i, s2);
      }
      a(Hn, "checkIntBI");
      function Ie(r, e) {
        if (typeof r != "number")
          throw new Ae.ERR_INVALID_ARG_TYPE(e, "number", r);
      }
      a(Ie, "validateNumber");
      function Qe(r, e, t) {
        throw Math.floor(r) !== r ? (Ie(r, t), new Ae.ERR_OUT_OF_RANGE(
          t || "offset",
          "an integer",
          r
        )) : e < 0 ? new Ae.ERR_BUFFER_OUT_OF_BOUNDS() : new Ae.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${e}`, r);
      }
      a(Qe, "boundsError");
      var Bo = /[^+/0-9A-Za-z-_]/g;
      function Lo(r) {
        if (r = r.split("=")[0], r = r.trim().replace(Bo, ""), r.length < 2)
          return "";
        for (; r.length % 4 !== 0; )
          r = r + "=";
        return r;
      }
      a(Lo, "base64clean");
      function Ft(r, e) {
        e = e || 1 / 0;
        let t, n = r.length, i = null, s2 = [];
        for (let o = 0; o < n; ++o) {
          if (t = r.charCodeAt(o), t > 55295 && t < 57344) {
            if (!i) {
              if (t > 56319) {
                (e -= 3) > -1 && s2.push(239, 191, 189);
                continue;
              } else if (o + 1 === n) {
                (e -= 3) > -1 && s2.push(239, 191, 189);
                continue;
              }
              i = t;
              continue;
            }
            if (t < 56320) {
              (e -= 3) > -1 && s2.push(
                239,
                191,
                189
              ), i = t;
              continue;
            }
            t = (i - 55296 << 10 | t - 56320) + 65536;
          } else
            i && (e -= 3) > -1 && s2.push(
              239,
              191,
              189
            );
          if (i = null, t < 128) {
            if ((e -= 1) < 0)
              break;
            s2.push(t);
          } else if (t < 2048) {
            if ((e -= 2) < 0)
              break;
            s2.push(t >> 6 | 192, t & 63 | 128);
          } else if (t < 65536) {
            if ((e -= 3) < 0)
              break;
            s2.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
          } else if (t < 1114112) {
            if ((e -= 4) < 0)
              break;
            s2.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
          } else
            throw new Error("Invalid code point");
        }
        return s2;
      }
      a(
        Ft,
        "utf8ToBytes"
      );
      function Ro(r) {
        let e = [];
        for (let t = 0; t < r.length; ++t)
          e.push(r.charCodeAt(
            t
          ) & 255);
        return e;
      }
      a(Ro, "asciiToBytes");
      function Fo(r, e) {
        let t, n, i, s2 = [];
        for (let o = 0; o < r.length && !((e -= 2) < 0); ++o)
          t = r.charCodeAt(o), n = t >> 8, i = t % 256, s2.push(i), s2.push(n);
        return s2;
      }
      a(Fo, "utf16leToBytes");
      function Gn(r) {
        return Bt.toByteArray(Lo(r));
      }
      a(Gn, "base64ToBytes");
      function st(r, e, t, n) {
        let i;
        for (i = 0; i < n && !(i + t >= e.length || i >= r.length); ++i)
          e[i + t] = r[i];
        return i;
      }
      a(st, "blitBuffer");
      function ae(r, e) {
        return r instanceof e || r != null && r.constructor != null && r.constructor.name != null && r.constructor.name === e.name;
      }
      a(ae, "isInstance");
      function Ut(r) {
        return r !== r;
      }
      a(Ut, "numberIsNaN");
      var Mo = function() {
        let r = "0123456789abcdef", e = new Array(256);
        for (let t = 0; t < 16; ++t) {
          let n = t * 16;
          for (let i = 0; i < 16; ++i)
            e[n + i] = r[t] + r[i];
        }
        return e;
      }();
      function de(r) {
        return typeof BigInt > "u" ? Do : r;
      }
      a(de, "defineBigIntMethod");
      function Do() {
        throw new Error("BigInt not supported");
      }
      a(Do, "BufferBigIntNotDefined");
    });
    var w;
    var b;
    var E;
    var g;
    var d;
    var y;
    var p2 = W(() => {
      "use strict";
      w = globalThis, b = globalThis.setImmediate ?? ((r) => setTimeout(
        r,
        0
      )), E = globalThis.clearImmediate ?? ((r) => clearTimeout(r)), g = globalThis.crypto ?? {};
      g.subtle ?? (g.subtle = {});
      d = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : $n().Buffer, y = globalThis.process ?? {};
      y.env ?? (y.env = {});
      try {
        y.nextTick(() => {
        });
      } catch {
        let e = Promise.resolve();
        y.nextTick = e.then.bind(e);
      }
    });
    var Kn = {};
    Y(Kn, { parse: () => Ot });
    function Ot(r, e = false) {
      let { protocol: t } = new URL(r), n = "http:" + r.substring(t.length), {
        username: i,
        password: s2,
        host: o,
        hostname: u,
        port: c2,
        pathname: h,
        search: f2,
        searchParams: m2,
        hash: x
      } = new URL(n);
      s2 = decodeURIComponent(s2);
      let _ = i + ":" + s2, P = e ? Object.fromEntries(m2.entries()) : f2;
      return {
        href: r,
        protocol: t,
        auth: _,
        username: i,
        password: s2,
        host: o,
        hostname: u,
        port: c2,
        pathname: h,
        search: f2,
        query: P,
        hash: x
      };
    }
    var qt = W(
      () => {
        p2();
        a(Ot, "parse");
      }
    );
    var ye = I((Jc, Nt) => {
      "use strict";
      p2();
      var Pe = typeof Reflect == "object" ? Reflect : null, Vn = Pe && typeof Pe.apply == "function" ? Pe.apply : a(function(e, t, n) {
        return Function.prototype.apply.call(e, t, n);
      }, "ReflectApply"), ot;
      Pe && typeof Pe.ownKeys == "function" ? ot = Pe.ownKeys : Object.getOwnPropertySymbols ? ot = a(function(e) {
        return Object.getOwnPropertyNames(
          e
        ).concat(Object.getOwnPropertySymbols(e));
      }, "ReflectOwnKeys") : ot = a(function(e) {
        return Object.getOwnPropertyNames(e);
      }, "ReflectOwnKeys");
      function ko(r) {
        console && console.warn && console.warn(r);
      }
      a(ko, "ProcessEmitWarning");
      var Yn = Number.isNaN || a(function(e) {
        return e !== e;
      }, "NumberIsNaN");
      function R() {
        R.init.call(this);
      }
      a(R, "EventEmitter");
      Nt.exports = R;
      Nt.exports.once = No;
      R.EventEmitter = R;
      R.prototype._events = void 0;
      R.prototype._eventsCount = 0;
      R.prototype._maxListeners = void 0;
      var zn = 10;
      function at(r) {
        if (typeof r != "function")
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
      }
      a(at, "checkListener");
      Object.defineProperty(R, "defaultMaxListeners", { enumerable: true, get: function() {
        return zn;
      }, set: function(r) {
        if (typeof r != "number" || r < 0 || Yn(r))
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
        zn = r;
      } });
      R.init = function() {
        (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
      };
      R.prototype.setMaxListeners = a(function(e) {
        if (typeof e != "number" || e < 0 || Yn(
          e
        ))
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
        return this._maxListeners = e, this;
      }, "setMaxListeners");
      function Zn(r) {
        return r._maxListeners === void 0 ? R.defaultMaxListeners : r._maxListeners;
      }
      a(Zn, "_getMaxListeners");
      R.prototype.getMaxListeners = a(
        function() {
          return Zn(this);
        },
        "getMaxListeners"
      );
      R.prototype.emit = a(function(e) {
        for (var t = [], n = 1; n < arguments.length; n++)
          t.push(arguments[n]);
        var i = e === "error", s2 = this._events;
        if (s2 !== void 0)
          i = i && s2.error === void 0;
        else if (!i)
          return false;
        if (i) {
          var o;
          if (t.length > 0 && (o = t[0]), o instanceof Error)
            throw o;
          var u = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
          throw u.context = o, u;
        }
        var c2 = s2[e];
        if (c2 === void 0)
          return false;
        if (typeof c2 == "function")
          Vn(c2, this, t);
        else
          for (var h = c2.length, f2 = ri(c2, h), n = 0; n < h; ++n)
            Vn(f2[n], this, t);
        return true;
      }, "emit");
      function Jn(r, e, t, n) {
        var i, s2, o;
        if (at(t), s2 = r._events, s2 === void 0 ? (s2 = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (s2.newListener !== void 0 && (r.emit("newListener", e, t.listener ? t.listener : t), s2 = r._events), o = s2[e]), o === void 0)
          o = s2[e] = t, ++r._eventsCount;
        else if (typeof o == "function" ? o = s2[e] = n ? [t, o] : [o, t] : n ? o.unshift(t) : o.push(t), i = Zn(r), i > 0 && o.length > i && !o.warned) {
          o.warned = true;
          var u = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          u.name = "MaxListenersExceededWarning", u.emitter = r, u.type = e, u.count = o.length, ko(u);
        }
        return r;
      }
      a(Jn, "_addListener");
      R.prototype.addListener = a(function(e, t) {
        return Jn(
          this,
          e,
          t,
          false
        );
      }, "addListener");
      R.prototype.on = R.prototype.addListener;
      R.prototype.prependListener = a(function(e, t) {
        return Jn(this, e, t, true);
      }, "prependListener");
      function Uo() {
        if (!this.fired)
          return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
      }
      a(Uo, "onceWrapper");
      function Xn(r, e, t) {
        var n = {
          fired: false,
          wrapFn: void 0,
          target: r,
          type: e,
          listener: t
        }, i = Uo.bind(n);
        return i.listener = t, n.wrapFn = i, i;
      }
      a(Xn, "_onceWrap");
      R.prototype.once = a(function(e, t) {
        return at(t), this.on(e, Xn(this, e, t)), this;
      }, "once");
      R.prototype.prependOnceListener = a(function(e, t) {
        return at(t), this.prependListener(e, Xn(this, e, t)), this;
      }, "prependOnceListener");
      R.prototype.removeListener = a(function(e, t) {
        var n, i, s2, o, u;
        if (at(t), i = this._events, i === void 0)
          return this;
        if (n = i[e], n === void 0)
          return this;
        if (n === t || n.listener === t)
          --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
        else if (typeof n != "function") {
          for (s2 = -1, o = n.length - 1; o >= 0; o--)
            if (n[o] === t || n[o].listener === t) {
              u = n[o].listener, s2 = o;
              break;
            }
          if (s2 < 0)
            return this;
          s2 === 0 ? n.shift() : Oo(n, s2), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit(
            "removeListener",
            e,
            u || t
          );
        }
        return this;
      }, "removeListener");
      R.prototype.off = R.prototype.removeListener;
      R.prototype.removeAllListeners = a(function(e) {
        var t, n, i;
        if (n = this._events, n === void 0)
          return this;
        if (n.removeListener === void 0)
          return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
        if (arguments.length === 0) {
          var s2 = Object.keys(n), o;
          for (i = 0; i < s2.length; ++i)
            o = s2[i], o !== "removeListener" && this.removeAllListeners(o);
          return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
        }
        if (t = n[e], typeof t == "function")
          this.removeListener(e, t);
        else if (t !== void 0)
          for (i = t.length - 1; i >= 0; i--)
            this.removeListener(e, t[i]);
        return this;
      }, "removeAllListeners");
      function ei(r, e, t) {
        var n = r._events;
        if (n === void 0)
          return [];
        var i = n[e];
        return i === void 0 ? [] : typeof i == "function" ? t ? [i.listener || i] : [i] : t ? qo(i) : ri(i, i.length);
      }
      a(ei, "_listeners");
      R.prototype.listeners = a(function(e) {
        return ei(this, e, true);
      }, "listeners");
      R.prototype.rawListeners = a(function(e) {
        return ei(this, e, false);
      }, "rawListeners");
      R.listenerCount = function(r, e) {
        return typeof r.listenerCount == "function" ? r.listenerCount(e) : ti.call(r, e);
      };
      R.prototype.listenerCount = ti;
      function ti(r) {
        var e = this._events;
        if (e !== void 0) {
          var t = e[r];
          if (typeof t == "function")
            return 1;
          if (t !== void 0)
            return t.length;
        }
        return 0;
      }
      a(ti, "listenerCount");
      R.prototype.eventNames = a(function() {
        return this._eventsCount > 0 ? ot(this._events) : [];
      }, "eventNames");
      function ri(r, e) {
        for (var t = new Array(e), n = 0; n < e; ++n)
          t[n] = r[n];
        return t;
      }
      a(ri, "arrayClone");
      function Oo(r, e) {
        for (; e + 1 < r.length; e++)
          r[e] = r[e + 1];
        r.pop();
      }
      a(Oo, "spliceOne");
      function qo(r) {
        for (var e = new Array(r.length), t = 0; t < e.length; ++t)
          e[t] = r[t].listener || r[t];
        return e;
      }
      a(qo, "unwrapListeners");
      function No(r, e) {
        return new Promise(
          function(t, n) {
            function i(o) {
              r.removeListener(e, s2), n(o);
            }
            a(i, "errorListener");
            function s2() {
              typeof r.removeListener == "function" && r.removeListener("error", i), t([].slice.call(
                arguments
              ));
            }
            a(s2, "resolver"), ni(r, e, s2, { once: true }), e !== "error" && Qo(r, i, { once: true });
          }
        );
      }
      a(No, "once");
      function Qo(r, e, t) {
        typeof r.on == "function" && ni(r, "error", e, t);
      }
      a(
        Qo,
        "addErrorHandlerIfEventEmitter"
      );
      function ni(r, e, t, n) {
        if (typeof r.on == "function")
          n.once ? r.once(e, t) : r.on(e, t);
        else if (typeof r.addEventListener == "function")
          r.addEventListener(
            e,
            a(function i(s2) {
              n.once && r.removeEventListener(e, i), t(s2);
            }, "wrapListener")
          );
        else
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
      }
      a(ni, "eventTargetAgnosticAddListener");
    });
    var si = {};
    Y(si, { Socket: () => me, isIP: () => Wo });
    function Wo(r) {
      return 0;
    }
    var ii;
    var S;
    var me;
    var ut = W(() => {
      "use strict";
      p2();
      ii = Ne(ye(), 1);
      a(Wo, "isIP");
      S = class S2 extends ii.EventEmitter {
        constructor() {
          super(...arguments);
          T(this, "opts", {});
          T(this, "connecting", false);
          T(this, "pending", true);
          T(this, "writable", true);
          T(this, "encrypted", false);
          T(this, "authorized", false);
          T(this, "destroyed", false);
          T(this, "ws", null);
          T(this, "writeBuffer");
          T(this, "tlsState", 0);
          T(
            this,
            "tlsRead"
          );
          T(this, "tlsWrite");
        }
        static get poolQueryViaFetch() {
          return S2.opts.poolQueryViaFetch ?? S2.defaults.poolQueryViaFetch;
        }
        static set poolQueryViaFetch(t) {
          S2.opts.poolQueryViaFetch = t;
        }
        static get fetchEndpoint() {
          return S2.opts.fetchEndpoint ?? S2.defaults.fetchEndpoint;
        }
        static set fetchEndpoint(t) {
          S2.opts.fetchEndpoint = t;
        }
        static get fetchConnectionCache() {
          return S2.opts.fetchConnectionCache ?? S2.defaults.fetchConnectionCache;
        }
        static set fetchConnectionCache(t) {
          S2.opts.fetchConnectionCache = t;
        }
        static get fetchFunction() {
          return S2.opts.fetchFunction ?? S2.defaults.fetchFunction;
        }
        static set fetchFunction(t) {
          S2.opts.fetchFunction = t;
        }
        static get webSocketConstructor() {
          return S2.opts.webSocketConstructor ?? S2.defaults.webSocketConstructor;
        }
        static set webSocketConstructor(t) {
          S2.opts.webSocketConstructor = t;
        }
        get webSocketConstructor() {
          return this.opts.webSocketConstructor ?? S2.webSocketConstructor;
        }
        set webSocketConstructor(t) {
          this.opts.webSocketConstructor = t;
        }
        static get wsProxy() {
          return S2.opts.wsProxy ?? S2.defaults.wsProxy;
        }
        static set wsProxy(t) {
          S2.opts.wsProxy = t;
        }
        get wsProxy() {
          return this.opts.wsProxy ?? S2.wsProxy;
        }
        set wsProxy(t) {
          this.opts.wsProxy = t;
        }
        static get coalesceWrites() {
          return S2.opts.coalesceWrites ?? S2.defaults.coalesceWrites;
        }
        static set coalesceWrites(t) {
          S2.opts.coalesceWrites = t;
        }
        get coalesceWrites() {
          return this.opts.coalesceWrites ?? S2.coalesceWrites;
        }
        set coalesceWrites(t) {
          this.opts.coalesceWrites = t;
        }
        static get useSecureWebSocket() {
          return S2.opts.useSecureWebSocket ?? S2.defaults.useSecureWebSocket;
        }
        static set useSecureWebSocket(t) {
          S2.opts.useSecureWebSocket = t;
        }
        get useSecureWebSocket() {
          return this.opts.useSecureWebSocket ?? S2.useSecureWebSocket;
        }
        set useSecureWebSocket(t) {
          this.opts.useSecureWebSocket = t;
        }
        static get forceDisablePgSSL() {
          return S2.opts.forceDisablePgSSL ?? S2.defaults.forceDisablePgSSL;
        }
        static set forceDisablePgSSL(t) {
          S2.opts.forceDisablePgSSL = t;
        }
        get forceDisablePgSSL() {
          return this.opts.forceDisablePgSSL ?? S2.forceDisablePgSSL;
        }
        set forceDisablePgSSL(t) {
          this.opts.forceDisablePgSSL = t;
        }
        static get disableSNI() {
          return S2.opts.disableSNI ?? S2.defaults.disableSNI;
        }
        static set disableSNI(t) {
          S2.opts.disableSNI = t;
        }
        get disableSNI() {
          return this.opts.disableSNI ?? S2.disableSNI;
        }
        set disableSNI(t) {
          this.opts.disableSNI = t;
        }
        static get pipelineConnect() {
          return S2.opts.pipelineConnect ?? S2.defaults.pipelineConnect;
        }
        static set pipelineConnect(t) {
          S2.opts.pipelineConnect = t;
        }
        get pipelineConnect() {
          return this.opts.pipelineConnect ?? S2.pipelineConnect;
        }
        set pipelineConnect(t) {
          this.opts.pipelineConnect = t;
        }
        static get subtls() {
          return S2.opts.subtls ?? S2.defaults.subtls;
        }
        static set subtls(t) {
          S2.opts.subtls = t;
        }
        get subtls() {
          return this.opts.subtls ?? S2.subtls;
        }
        set subtls(t) {
          this.opts.subtls = t;
        }
        static get pipelineTLS() {
          return S2.opts.pipelineTLS ?? S2.defaults.pipelineTLS;
        }
        static set pipelineTLS(t) {
          S2.opts.pipelineTLS = t;
        }
        get pipelineTLS() {
          return this.opts.pipelineTLS ?? S2.pipelineTLS;
        }
        set pipelineTLS(t) {
          this.opts.pipelineTLS = t;
        }
        static get rootCerts() {
          return S2.opts.rootCerts ?? S2.defaults.rootCerts;
        }
        static set rootCerts(t) {
          S2.opts.rootCerts = t;
        }
        get rootCerts() {
          return this.opts.rootCerts ?? S2.rootCerts;
        }
        set rootCerts(t) {
          this.opts.rootCerts = t;
        }
        wsProxyAddrForHost(t, n) {
          let i = this.wsProxy;
          if (i === void 0)
            throw new Error("No WebSocket proxy is configured. Please refer to https://github.com/neondatabase/serverless#run-your-own-websocket-proxy");
          return typeof i == "function" ? i(t, n) : `${i}?address=${t}:${n}`;
        }
        setNoDelay() {
          return this;
        }
        setKeepAlive() {
          return this;
        }
        ref() {
          return this;
        }
        unref() {
          return this;
        }
        async connect(t, n, i) {
          this.connecting = true, i && this.once("connect", i);
          let s2;
          try {
            s2 = this.wsProxyAddrForHost(
              n,
              typeof t == "string" ? parseInt(t, 10) : t
            );
          } catch (o) {
            this.emit("error", o), this.emit("close");
            return;
          }
          return this.ws = await new Promise(async (o) => {
            try {
              let c2 = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + s2, h;
              if (this.webSocketConstructor !== void 0)
                h = new this.webSocketConstructor(
                  c2
                );
              else
                try {
                  h = new WebSocket(c2);
                } catch {
                  h = new __unstable_WebSocket(c2);
                }
              h.addEventListener(
                "open",
                () => {
                  o(h);
                }
              );
            } catch (u) {
              try {
                let h = (this.useSecureWebSocket ? "https:" : "http:") + "//" + s2;
                await fetch(h, { headers: { Upgrade: "websocket" } }).then((f2) => {
                  let m2 = f2.webSocket;
                  if (m2 == null)
                    throw u;
                  m2.accept(), o(m2);
                });
              } catch {
                this.emit("error", new Error("All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless#run-on-node")), this.emit("close");
                return;
              }
            }
          }), this.ws.binaryType = "arraybuffer", this.ws.addEventListener("error", (o) => {
            this.emit(
              "error",
              o
            ), this.emit("close");
          }), this.ws.addEventListener("close", () => {
            this.emit(
              "close"
            );
          }), this.ws.addEventListener("message", (o) => {
            if (this.tlsState === 0) {
              let u = d.from(o.data);
              this.emit("data", u);
            }
          }), this.connecting = false, this.pending = false, this.emit(
            "connect"
          ), this.emit("ready"), this;
        }
        async startTls(t) {
          if (this.subtls === void 0)
            throw new Error(
              "For Postgres SSL connections, you must set `neonConfig.subtls` to the subtls library. See https://github.com/neondatabase/serverless/blob/main/CONFIG.md for more information."
            );
          this.tlsState = 1;
          let n = this.subtls.TrustedCert.fromPEM(this.rootCerts), i = new this.subtls.WebSocketReadQueue(this.ws), s2 = i.read.bind(i), o = this.rawWrite.bind(
            this
          ), [u, c2] = await this.subtls.startTls(t, n, s2, o, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
          this.tlsRead = u, this.tlsWrite = c2, this.tlsState = 2, this.encrypted = true, this.authorized = true, this.emit("secureConnection", this), this.tlsReadLoop();
        }
        async tlsReadLoop() {
          for (; ; ) {
            let t = await this.tlsRead();
            if (t === void 0)
              break;
            {
              let n = d.from(t);
              this.emit(
                "data",
                n
              );
            }
          }
        }
        rawWrite(t) {
          if (!this.coalesceWrites) {
            this.ws.send(t);
            return;
          }
          if (this.writeBuffer === void 0)
            this.writeBuffer = t, setTimeout(() => {
              this.ws.send(this.writeBuffer), this.writeBuffer = void 0;
            }, 0);
          else {
            let n = new Uint8Array(this.writeBuffer.length + t.length);
            n.set(this.writeBuffer), n.set(t, this.writeBuffer.length), this.writeBuffer = n;
          }
        }
        write(t, n = "utf8", i = (s2) => {
        }) {
          return t.length === 0 ? i() : (typeof t == "string" && (t = d.from(
            t,
            n
          )), this.tlsState === 0 ? this.rawWrite(t) : this.tlsState === 1 ? this.once("secureConnection", () => this.write(t, n, i)) : this.tlsWrite(t), true);
        }
        end(t = d.alloc(0), n = "utf8", i) {
          return this.write(t, n, () => {
            this.ws.close(), i && i();
          }), this;
        }
        destroy() {
          return this.destroyed = true, this.end();
        }
      };
      a(S, "Socket"), T(S, "defaults", {
        poolQueryViaFetch: false,
        fetchEndpoint: (t) => "https://" + t + "/sql",
        fetchConnectionCache: false,
        fetchFunction: void 0,
        webSocketConstructor: void 0,
        wsProxy: (t) => t + "/v2",
        useSecureWebSocket: true,
        forceDisablePgSSL: true,
        coalesceWrites: true,
        pipelineConnect: "password",
        subtls: void 0,
        rootCerts: "",
        pipelineTLS: false,
        disableSNI: false
      }), T(S, "opts", {});
      me = S;
    });
    function We(r) {
      let e = 1779033703, t = 3144134277, n = 1013904242, i = 2773480762, s2 = 1359893119, o = 2600822924, u = 528734635, c2 = 1541459225, h = 0, f2 = 0, m2 = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ], x = a(
        (B, v) => B >>> v | B << 32 - v,
        "rrot"
      ), _ = new Uint32Array(64), P = new Uint8Array(64), k = a(
        () => {
          for (let L = 0, C = 0; L < 16; L++, C += 4)
            _[L] = P[C] << 24 | P[C + 1] << 16 | P[C + 2] << 8 | P[C + 3];
          for (let L = 16; L < 64; L++) {
            let C = x(_[L - 15], 7) ^ x(_[L - 15], 18) ^ _[L - 15] >>> 3, H = x(_[L - 2], 17) ^ x(_[L - 2], 19) ^ _[L - 2] >>> 10;
            _[L] = _[L - 16] + C + _[L - 7] + H | 0;
          }
          let B = e, v = t, te = n, be = i, Z = s2, pe = o, re = u, ie = c2;
          for (let L = 0; L < 64; L++) {
            let C = x(Z, 6) ^ x(Z, 11) ^ x(Z, 25), H = Z & pe ^ ~Z & re, ce = ie + C + H + m2[L] + _[L] | 0, se = x(B, 2) ^ x(B, 13) ^ x(B, 22), ne2 = B & v ^ B & te ^ v & te, he = se + ne2 | 0;
            ie = re, re = pe, pe = Z, Z = be + ce | 0, be = te, te = v, v = B, B = ce + he | 0;
          }
          e = e + B | 0, t = t + v | 0, n = n + te | 0, i = i + be | 0, s2 = s2 + Z | 0, o = o + pe | 0, u = u + re | 0, c2 = c2 + ie | 0, f2 = 0;
        },
        "process"
      ), z2 = a((B) => {
        typeof B == "string" && (B = new TextEncoder().encode(B));
        for (let v = 0; v < B.length; v++)
          P[f2++] = B[v], f2 === 64 && k();
        h += B.length;
      }, "add"), ue = a(() => {
        if (P[f2++] = 128, f2 == 64 && k(), f2 + 8 > 64) {
          for (; f2 < 64; )
            P[f2++] = 0;
          k();
        }
        for (; f2 < 58; )
          P[f2++] = 0;
        let B = h * 8;
        P[f2++] = B / 1099511627776 & 255, P[f2++] = B / 4294967296 & 255, P[f2++] = B >>> 24, P[f2++] = B >>> 16 & 255, P[f2++] = B >>> 8 & 255, P[f2++] = B & 255, k();
        let v = new Uint8Array(32);
        return v[0] = e >>> 24, v[1] = e >>> 16 & 255, v[2] = e >>> 8 & 255, v[3] = e & 255, v[4] = t >>> 24, v[5] = t >>> 16 & 255, v[6] = t >>> 8 & 255, v[7] = t & 255, v[8] = n >>> 24, v[9] = n >>> 16 & 255, v[10] = n >>> 8 & 255, v[11] = n & 255, v[12] = i >>> 24, v[13] = i >>> 16 & 255, v[14] = i >>> 8 & 255, v[15] = i & 255, v[16] = s2 >>> 24, v[17] = s2 >>> 16 & 255, v[18] = s2 >>> 8 & 255, v[19] = s2 & 255, v[20] = o >>> 24, v[21] = o >>> 16 & 255, v[22] = o >>> 8 & 255, v[23] = o & 255, v[24] = u >>> 24, v[25] = u >>> 16 & 255, v[26] = u >>> 8 & 255, v[27] = u & 255, v[28] = c2 >>> 24, v[29] = c2 >>> 16 & 255, v[30] = c2 >>> 8 & 255, v[31] = c2 & 255, v;
      }, "digest");
      return r === void 0 ? { add: z2, digest: ue } : (z2(
        r
      ), ue());
    }
    var oi = W(() => {
      "use strict";
      p2();
      a(We, "sha256");
    });
    var O;
    var je;
    var ai = W(() => {
      "use strict";
      p2();
      O = class O2 {
        constructor() {
          T(
            this,
            "_dataLength",
            0
          );
          T(this, "_bufferLength", 0);
          T(this, "_state", new Int32Array(4));
          T(
            this,
            "_buffer",
            new ArrayBuffer(68)
          );
          T(this, "_buffer8");
          T(this, "_buffer32");
          this._buffer8 = new Uint8Array(
            this._buffer,
            0,
            68
          ), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
        }
        static hashByteArray(e, t = false) {
          return this.onePassHasher.start().appendByteArray(e).end(t);
        }
        static hashStr(e, t = false) {
          return this.onePassHasher.start().appendStr(e).end(t);
        }
        static hashAsciiStr(e, t = false) {
          return this.onePassHasher.start().appendAsciiStr(e).end(t);
        }
        static _hex(e) {
          let t = O2.hexChars, n = O2.hexOut, i, s2, o, u;
          for (u = 0; u < 4; u += 1)
            for (s2 = u * 8, i = e[u], o = 0; o < 8; o += 2)
              n[s2 + 1 + o] = t.charAt(i & 15), i >>>= 4, n[s2 + 0 + o] = t.charAt(i & 15), i >>>= 4;
          return n.join("");
        }
        static _md5cycle(e, t) {
          let n = e[0], i = e[1], s2 = e[2], o = e[3];
          n += (i & s2 | ~i & o) + t[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s2) + t[1] - 389564586 | 0, o = (o << 12 | o >>> 20) + n | 0, s2 += (o & n | ~o & i) + t[2] + 606105819 | 0, s2 = (s2 << 17 | s2 >>> 15) + o | 0, i += (s2 & o | ~s2 & n) + t[3] - 1044525330 | 0, i = (i << 22 | i >>> 10) + s2 | 0, n += (i & s2 | ~i & o) + t[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s2) + t[5] + 1200080426 | 0, o = (o << 12 | o >>> 20) + n | 0, s2 += (o & n | ~o & i) + t[6] - 1473231341 | 0, s2 = (s2 << 17 | s2 >>> 15) + o | 0, i += (s2 & o | ~s2 & n) + t[7] - 45705983 | 0, i = (i << 22 | i >>> 10) + s2 | 0, n += (i & s2 | ~i & o) + t[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s2) + t[9] - 1958414417 | 0, o = (o << 12 | o >>> 20) + n | 0, s2 += (o & n | ~o & i) + t[10] - 42063 | 0, s2 = (s2 << 17 | s2 >>> 15) + o | 0, i += (s2 & o | ~s2 & n) + t[11] - 1990404162 | 0, i = (i << 22 | i >>> 10) + s2 | 0, n += (i & s2 | ~i & o) + t[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s2) + t[13] - 40341101 | 0, o = (o << 12 | o >>> 20) + n | 0, s2 += (o & n | ~o & i) + t[14] - 1502002290 | 0, s2 = (s2 << 17 | s2 >>> 15) + o | 0, i += (s2 & o | ~s2 & n) + t[15] + 1236535329 | 0, i = (i << 22 | i >>> 10) + s2 | 0, n += (i & o | s2 & ~o) + t[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s2 | i & ~s2) + t[6] - 1069501632 | 0, o = (o << 9 | o >>> 23) + n | 0, s2 += (o & i | n & ~i) + t[11] + 643717713 | 0, s2 = (s2 << 14 | s2 >>> 18) + o | 0, i += (s2 & n | o & ~n) + t[0] - 373897302 | 0, i = (i << 20 | i >>> 12) + s2 | 0, n += (i & o | s2 & ~o) + t[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s2 | i & ~s2) + t[10] + 38016083 | 0, o = (o << 9 | o >>> 23) + n | 0, s2 += (o & i | n & ~i) + t[15] - 660478335 | 0, s2 = (s2 << 14 | s2 >>> 18) + o | 0, i += (s2 & n | o & ~n) + t[4] - 405537848 | 0, i = (i << 20 | i >>> 12) + s2 | 0, n += (i & o | s2 & ~o) + t[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s2 | i & ~s2) + t[14] - 1019803690 | 0, o = (o << 9 | o >>> 23) + n | 0, s2 += (o & i | n & ~i) + t[3] - 187363961 | 0, s2 = (s2 << 14 | s2 >>> 18) + o | 0, i += (s2 & n | o & ~n) + t[8] + 1163531501 | 0, i = (i << 20 | i >>> 12) + s2 | 0, n += (i & o | s2 & ~o) + t[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s2 | i & ~s2) + t[2] - 51403784 | 0, o = (o << 9 | o >>> 23) + n | 0, s2 += (o & i | n & ~i) + t[7] + 1735328473 | 0, s2 = (s2 << 14 | s2 >>> 18) + o | 0, i += (s2 & n | o & ~n) + t[12] - 1926607734 | 0, i = (i << 20 | i >>> 12) + s2 | 0, n += (i ^ s2 ^ o) + t[5] - 378558 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s2) + t[8] - 2022574463 | 0, o = (o << 11 | o >>> 21) + n | 0, s2 += (o ^ n ^ i) + t[11] + 1839030562 | 0, s2 = (s2 << 16 | s2 >>> 16) + o | 0, i += (s2 ^ o ^ n) + t[14] - 35309556 | 0, i = (i << 23 | i >>> 9) + s2 | 0, n += (i ^ s2 ^ o) + t[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s2) + t[4] + 1272893353 | 0, o = (o << 11 | o >>> 21) + n | 0, s2 += (o ^ n ^ i) + t[7] - 155497632 | 0, s2 = (s2 << 16 | s2 >>> 16) + o | 0, i += (s2 ^ o ^ n) + t[10] - 1094730640 | 0, i = (i << 23 | i >>> 9) + s2 | 0, n += (i ^ s2 ^ o) + t[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s2) + t[0] - 358537222 | 0, o = (o << 11 | o >>> 21) + n | 0, s2 += (o ^ n ^ i) + t[3] - 722521979 | 0, s2 = (s2 << 16 | s2 >>> 16) + o | 0, i += (s2 ^ o ^ n) + t[6] + 76029189 | 0, i = (i << 23 | i >>> 9) + s2 | 0, n += (i ^ s2 ^ o) + t[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s2) + t[12] - 421815835 | 0, o = (o << 11 | o >>> 21) + n | 0, s2 += (o ^ n ^ i) + t[15] + 530742520 | 0, s2 = (s2 << 16 | s2 >>> 16) + o | 0, i += (s2 ^ o ^ n) + t[2] - 995338651 | 0, i = (i << 23 | i >>> 9) + s2 | 0, n += (s2 ^ (i | ~o)) + t[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s2)) + t[7] + 1126891415 | 0, o = (o << 10 | o >>> 22) + n | 0, s2 += (n ^ (o | ~i)) + t[14] - 1416354905 | 0, s2 = (s2 << 15 | s2 >>> 17) + o | 0, i += (o ^ (s2 | ~n)) + t[5] - 57434055 | 0, i = (i << 21 | i >>> 11) + s2 | 0, n += (s2 ^ (i | ~o)) + t[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s2)) + t[3] - 1894986606 | 0, o = (o << 10 | o >>> 22) + n | 0, s2 += (n ^ (o | ~i)) + t[10] - 1051523 | 0, s2 = (s2 << 15 | s2 >>> 17) + o | 0, i += (o ^ (s2 | ~n)) + t[1] - 2054922799 | 0, i = (i << 21 | i >>> 11) + s2 | 0, n += (s2 ^ (i | ~o)) + t[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s2)) + t[15] - 30611744 | 0, o = (o << 10 | o >>> 22) + n | 0, s2 += (n ^ (o | ~i)) + t[6] - 1560198380 | 0, s2 = (s2 << 15 | s2 >>> 17) + o | 0, i += (o ^ (s2 | ~n)) + t[13] + 1309151649 | 0, i = (i << 21 | i >>> 11) + s2 | 0, n += (s2 ^ (i | ~o)) + t[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s2)) + t[11] - 1120210379 | 0, o = (o << 10 | o >>> 22) + n | 0, s2 += (n ^ (o | ~i)) + t[2] + 718787259 | 0, s2 = (s2 << 15 | s2 >>> 17) + o | 0, i += (o ^ (s2 | ~n)) + t[9] - 343485551 | 0, i = (i << 21 | i >>> 11) + s2 | 0, e[0] = n + e[0] | 0, e[1] = i + e[1] | 0, e[2] = s2 + e[2] | 0, e[3] = o + e[3] | 0;
        }
        start() {
          return this._dataLength = 0, this._bufferLength = 0, this._state.set(O2.stateIdentity), this;
        }
        appendStr(e) {
          let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s2, o;
          for (o = 0; o < e.length; o += 1) {
            if (s2 = e.charCodeAt(o), s2 < 128)
              t[i++] = s2;
            else if (s2 < 2048)
              t[i++] = (s2 >>> 6) + 192, t[i++] = s2 & 63 | 128;
            else if (s2 < 55296 || s2 > 56319)
              t[i++] = (s2 >>> 12) + 224, t[i++] = s2 >>> 6 & 63 | 128, t[i++] = s2 & 63 | 128;
            else {
              if (s2 = (s2 - 55296) * 1024 + (e.charCodeAt(++o) - 56320) + 65536, s2 > 1114111)
                throw new Error("Unicode standard supports code points up to U+10FFFF");
              t[i++] = (s2 >>> 18) + 240, t[i++] = s2 >>> 12 & 63 | 128, t[i++] = s2 >>> 6 & 63 | 128, t[i++] = s2 & 63 | 128;
            }
            i >= 64 && (this._dataLength += 64, O2._md5cycle(this._state, n), i -= 64, n[0] = n[16]);
          }
          return this._bufferLength = i, this;
        }
        appendAsciiStr(e) {
          let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s2, o = 0;
          for (; ; ) {
            for (s2 = Math.min(e.length - o, 64 - i); s2--; )
              t[i++] = e.charCodeAt(o++);
            if (i < 64)
              break;
            this._dataLength += 64, O2._md5cycle(
              this._state,
              n
            ), i = 0;
          }
          return this._bufferLength = i, this;
        }
        appendByteArray(e) {
          let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s2, o = 0;
          for (; ; ) {
            for (s2 = Math.min(e.length - o, 64 - i); s2--; )
              t[i++] = e[o++];
            if (i < 64)
              break;
            this._dataLength += 64, O2._md5cycle(
              this._state,
              n
            ), i = 0;
          }
          return this._bufferLength = i, this;
        }
        getState() {
          let e = this._state;
          return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e[0], e[1], e[2], e[3]] };
        }
        setState(e) {
          let t = e.buffer, n = e.state, i = this._state, s2;
          for (this._dataLength = e.length, this._bufferLength = e.buflen, i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], s2 = 0; s2 < t.length; s2 += 1)
            this._buffer8[s2] = t.charCodeAt(s2);
        }
        end(e = false) {
          let t = this._bufferLength, n = this._buffer8, i = this._buffer32, s2 = (t >> 2) + 1;
          this._dataLength += t;
          let o = this._dataLength * 8;
          if (n[t] = 128, n[t + 1] = n[t + 2] = n[t + 3] = 0, i.set(O2.buffer32Identity.subarray(s2), s2), t > 55 && (O2._md5cycle(this._state, i), i.set(O2.buffer32Identity)), o <= 4294967295)
            i[14] = o;
          else {
            let u = o.toString(16).match(/(.*?)(.{0,8})$/);
            if (u === null)
              return;
            let c2 = parseInt(
              u[2],
              16
            ), h = parseInt(u[1], 16) || 0;
            i[14] = c2, i[15] = h;
          }
          return O2._md5cycle(this._state, i), e ? this._state : O2._hex(this._state);
        }
      };
      a(O, "Md5"), T(O, "stateIdentity", new Int32Array(
        [1732584193, -271733879, -1732584194, 271733878]
      )), T(O, "buffer32Identity", new Int32Array(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      )), T(O, "hexChars", "0123456789abcdef"), T(O, "hexOut", []), T(O, "onePassHasher", new O());
      je = O;
    });
    var Qt = {};
    Y(Qt, { createHash: () => Ho, createHmac: () => Go, randomBytes: () => jo });
    function jo(r) {
      return g.getRandomValues(d.alloc(r));
    }
    function Ho(r) {
      if (r === "sha256")
        return { update: function(e) {
          return { digest: function() {
            return d.from(We(e));
          } };
        } };
      if (r === "md5")
        return { update: function(e) {
          return { digest: function() {
            return typeof e == "string" ? je.hashStr(e) : je.hashByteArray(
              e
            );
          } };
        } };
      throw new Error(`Hash type '${r}' not supported`);
    }
    function Go(r, e) {
      if (r !== "sha256")
        throw new Error(`Only sha256 is supported (requested: '${r}')`);
      return {
        update: function(t) {
          return { digest: function() {
            typeof e == "string" && (e = new TextEncoder().encode(e)), typeof t == "string" && (t = new TextEncoder().encode(t));
            let n = e.length;
            if (n > 64)
              e = We(e);
            else if (n < 64) {
              let c2 = new Uint8Array(64);
              c2.set(e), e = c2;
            }
            let i = new Uint8Array(
              64
            ), s2 = new Uint8Array(64);
            for (let c2 = 0; c2 < 64; c2++)
              i[c2] = 54 ^ e[c2], s2[c2] = 92 ^ e[c2];
            let o = new Uint8Array(
              t.length + 64
            );
            o.set(i, 0), o.set(t, 64);
            let u = new Uint8Array(64 + 32);
            return u.set(s2, 0), u.set(We(o), 64), d.from(We(u));
          } };
        }
      };
    }
    var Wt = W(() => {
      p2();
      oi();
      ai();
      a(jo, "randomBytes");
      a(Ho, "createHash");
      a(Go, "createHmac");
    });
    var Ht = I((ui) => {
      "use strict";
      p2();
      ui.parse = function(r, e) {
        return new jt(r, e).parse();
      };
      var ct = class ct2 {
        constructor(e, t) {
          this.source = e, this.transform = t || $o, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
        }
        isEof() {
          return this.position >= this.source.length;
        }
        nextCharacter() {
          var e = this.source[this.position++];
          return e === "\\" ? { value: this.source[this.position++], escaped: true } : { value: e, escaped: false };
        }
        record(e) {
          this.recorded.push(e);
        }
        newEntry(e) {
          var t;
          (this.recorded.length > 0 || e) && (t = this.recorded.join(""), t === "NULL" && !e && (t = null), t !== null && (t = this.transform(t)), this.entries.push(
            t
          ), this.recorded = []);
        }
        consumeDimensions() {
          if (this.source[0] === "[")
            for (; !this.isEof(); ) {
              var e = this.nextCharacter();
              if (e.value === "=")
                break;
            }
        }
        parse(e) {
          var t, n, i;
          for (this.consumeDimensions(); !this.isEof(); )
            if (t = this.nextCharacter(), t.value === "{" && !i)
              this.dimension++, this.dimension > 1 && (n = new ct2(this.source.substr(this.position - 1), this.transform), this.entries.push(
                n.parse(true)
              ), this.position += n.position - 2);
            else if (t.value === "}" && !i) {
              if (this.dimension--, !this.dimension && (this.newEntry(), e))
                return this.entries;
            } else
              t.value === '"' && !t.escaped ? (i && this.newEntry(true), i = !i) : t.value === "," && !i ? this.newEntry() : this.record(
                t.value
              );
          if (this.dimension !== 0)
            throw new Error("array dimension not balanced");
          return this.entries;
        }
      };
      a(ct, "ArrayParser");
      var jt = ct;
      function $o(r) {
        return r;
      }
      a($o, "identity");
    });
    var Gt = I((mh, ci) => {
      p2();
      var Ko = Ht();
      ci.exports = { create: function(r, e) {
        return { parse: function() {
          return Ko.parse(r, e);
        } };
      } };
    });
    var fi = I((wh, li) => {
      "use strict";
      p2();
      var Vo = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, zo = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, Yo = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, Zo = /^-?infinity$/;
      li.exports = a(function(e) {
        if (Zo.test(e))
          return Number(e.replace("i", "I"));
        var t = Vo.exec(e);
        if (!t)
          return Jo(e) || null;
        var n = !!t[8], i = parseInt(t[1], 10);
        n && (i = hi(i));
        var s2 = parseInt(
          t[2],
          10
        ) - 1, o = t[3], u = parseInt(t[4], 10), c2 = parseInt(t[5], 10), h = parseInt(t[6], 10), f2 = t[7];
        f2 = f2 ? 1e3 * parseFloat(f2) : 0;
        var m2, x = Xo(e);
        return x != null ? (m2 = new Date(Date.UTC(
          i,
          s2,
          o,
          u,
          c2,
          h,
          f2
        )), $t(i) && m2.setUTCFullYear(i), x !== 0 && m2.setTime(m2.getTime() - x)) : (m2 = new Date(
          i,
          s2,
          o,
          u,
          c2,
          h,
          f2
        ), $t(i) && m2.setFullYear(i)), m2;
      }, "parseDate");
      function Jo(r) {
        var e = zo.exec(r);
        if (e) {
          var t = parseInt(e[1], 10), n = !!e[4];
          n && (t = hi(t));
          var i = parseInt(
            e[2],
            10
          ) - 1, s2 = e[3], o = new Date(t, i, s2);
          return $t(t) && o.setFullYear(t), o;
        }
      }
      a(Jo, "getDate");
      function Xo(r) {
        if (r.endsWith("+00"))
          return 0;
        var e = Yo.exec(r.split(" ")[1]);
        if (e) {
          var t = e[1];
          if (t === "Z")
            return 0;
          var n = t === "-" ? -1 : 1, i = parseInt(e[2], 10) * 3600 + parseInt(
            e[3] || 0,
            10
          ) * 60 + parseInt(e[4] || 0, 10);
          return i * n * 1e3;
        }
      }
      a(Xo, "timeZoneOffset");
      function hi(r) {
        return -(r - 1);
      }
      a(hi, "bcYearToNegativeYear");
      function $t(r) {
        return r >= 0 && r < 100;
      }
      a(
        $t,
        "is0To99"
      );
    });
    var di = I((xh, pi) => {
      p2();
      pi.exports = ta;
      var ea = Object.prototype.hasOwnProperty;
      function ta(r) {
        for (var e = 1; e < arguments.length; e++) {
          var t = arguments[e];
          for (var n in t)
            ea.call(
              t,
              n
            ) && (r[n] = t[n]);
        }
        return r;
      }
      a(ta, "extend");
    });
    var gi = I((_h2, mi) => {
      "use strict";
      p2();
      var ra = di();
      mi.exports = Be;
      function Be(r) {
        if (!(this instanceof Be))
          return new Be(r);
        ra(this, da(r));
      }
      a(Be, "PostgresInterval");
      var na = ["seconds", "minutes", "hours", "days", "months", "years"];
      Be.prototype.toPostgres = function() {
        var r = na.filter(this.hasOwnProperty, this);
        return this.milliseconds && r.indexOf("seconds") < 0 && r.push("seconds"), r.length === 0 ? "0" : r.map(function(e) {
          var t = this[e] || 0;
          return e === "seconds" && this.milliseconds && (t = (t + this.milliseconds / 1e3).toFixed(6).replace(
            /\.?0+$/,
            ""
          )), t + " " + e;
        }, this).join(" ");
      };
      var ia = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, sa = ["years", "months", "days"], oa = ["hours", "minutes", "seconds"];
      Be.prototype.toISOString = Be.prototype.toISO = function() {
        var r = sa.map(t, this).join(""), e = oa.map(t, this).join("");
        return "P" + r + "T" + e;
        function t(n) {
          var i = this[n] || 0;
          return n === "seconds" && this.milliseconds && (i = (i + this.milliseconds / 1e3).toFixed(6).replace(
            /0+$/,
            ""
          )), i + ia[n];
        }
      };
      var Kt = "([+-]?\\d+)", aa = Kt + "\\s+years?", ua = Kt + "\\s+mons?", ca = Kt + "\\s+days?", ha = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", la = new RegExp([
        aa,
        ua,
        ca,
        ha
      ].map(function(r) {
        return "(" + r + ")?";
      }).join("\\s*")), yi = {
        years: 2,
        months: 4,
        days: 6,
        hours: 9,
        minutes: 10,
        seconds: 11,
        milliseconds: 12
      }, fa = ["hours", "minutes", "seconds", "milliseconds"];
      function pa(r) {
        var e = r + "000000".slice(r.length);
        return parseInt(
          e,
          10
        ) / 1e3;
      }
      a(pa, "parseMilliseconds");
      function da(r) {
        if (!r)
          return {};
        var e = la.exec(
          r
        ), t = e[8] === "-";
        return Object.keys(yi).reduce(function(n, i) {
          var s2 = yi[i], o = e[s2];
          return !o || (o = i === "milliseconds" ? pa(o) : parseInt(o, 10), !o) || (t && ~fa.indexOf(i) && (o *= -1), n[i] = o), n;
        }, {});
      }
      a(da, "parse");
    });
    var bi = I((Ih, wi) => {
      "use strict";
      p2();
      wi.exports = a(function(e) {
        if (/^\\x/.test(e))
          return new d(
            e.substr(2),
            "hex"
          );
        for (var t = "", n = 0; n < e.length; )
          if (e[n] !== "\\")
            t += e[n], ++n;
          else if (/[0-7]{3}/.test(e.substr(n + 1, 3)))
            t += String.fromCharCode(parseInt(e.substr(n + 1, 3), 8)), n += 4;
          else {
            for (var i = 1; n + i < e.length && e[n + i] === "\\"; )
              i++;
            for (var s2 = 0; s2 < Math.floor(i / 2); ++s2)
              t += "\\";
            n += Math.floor(i / 2) * 2;
          }
        return new d(t, "binary");
      }, "parseBytea");
    });
    var Ci = I((Bh, Ai) => {
      p2();
      var He = Ht(), Ge = Gt(), ht = fi(), xi = gi(), Ei = bi();
      function lt2(r) {
        return a(function(t) {
          return t === null ? t : r(t);
        }, "nullAllowed");
      }
      a(lt2, "allowNull");
      function vi(r) {
        return r === null ? r : r === "TRUE" || r === "t" || r === "true" || r === "y" || r === "yes" || r === "on" || r === "1";
      }
      a(vi, "parseBool");
      function ya(r) {
        return r ? He.parse(r, vi) : null;
      }
      a(ya, "parseBoolArray");
      function ma(r) {
        return parseInt(r, 10);
      }
      a(ma, "parseBaseTenInt");
      function Vt(r) {
        return r ? He.parse(r, lt2(ma)) : null;
      }
      a(Vt, "parseIntegerArray");
      function ga(r) {
        return r ? He.parse(r, lt2(function(e) {
          return _i2(e).trim();
        })) : null;
      }
      a(ga, "parseBigIntegerArray");
      var wa = a(function(r) {
        if (!r)
          return null;
        var e = Ge.create(r, function(t) {
          return t !== null && (t = Jt(t)), t;
        });
        return e.parse();
      }, "parsePointArray"), zt = a(function(r) {
        if (!r)
          return null;
        var e = Ge.create(r, function(t) {
          return t !== null && (t = parseFloat(t)), t;
        });
        return e.parse();
      }, "parseFloatArray"), X = a(function(r) {
        if (!r)
          return null;
        var e = Ge.create(r);
        return e.parse();
      }, "parseStringArray"), Yt = a(function(r) {
        if (!r)
          return null;
        var e = Ge.create(r, function(t) {
          return t !== null && (t = ht(t)), t;
        });
        return e.parse();
      }, "parseDateArray"), ba = a(function(r) {
        if (!r)
          return null;
        var e = Ge.create(r, function(t) {
          return t !== null && (t = xi(t)), t;
        });
        return e.parse();
      }, "parseIntervalArray"), Sa = a(function(r) {
        return r ? He.parse(r, lt2(Ei)) : null;
      }, "parseByteAArray"), Zt = a(function(r) {
        return parseInt(
          r,
          10
        );
      }, "parseInteger"), _i2 = a(function(r) {
        var e = String(r);
        return /^\d+$/.test(e) ? e : r;
      }, "parseBigInteger"), Si = a(
        function(r) {
          return r ? He.parse(r, lt2(JSON.parse)) : null;
        },
        "parseJsonArray"
      ), Jt = a(function(r) {
        return r[0] !== "(" ? null : (r = r.substring(1, r.length - 1).split(","), { x: parseFloat(r[0]), y: parseFloat(r[1]) });
      }, "parsePoint"), xa = a(function(r) {
        if (r[0] !== "<" && r[1] !== "(")
          return null;
        for (var e = "(", t = "", n = false, i = 2; i < r.length - 1; i++) {
          if (n || (e += r[i]), r[i] === ")") {
            n = true;
            continue;
          } else if (!n)
            continue;
          r[i] !== "," && (t += r[i]);
        }
        var s2 = Jt(e);
        return s2.radius = parseFloat(t), s2;
      }, "parseCircle"), Ea = a(function(r) {
        r(
          20,
          _i2
        ), r(21, Zt), r(23, Zt), r(26, Zt), r(700, parseFloat), r(701, parseFloat), r(16, vi), r(
          1082,
          ht
        ), r(1114, ht), r(1184, ht), r(600, Jt), r(651, X), r(718, xa), r(1e3, ya), r(1001, Sa), r(
          1005,
          Vt
        ), r(1007, Vt), r(1028, Vt), r(1016, ga), r(1017, wa), r(1021, zt), r(1022, zt), r(1231, zt), r(1014, X), r(1015, X), r(1008, X), r(1009, X), r(1040, X), r(1041, X), r(1115, Yt), r(1182, Yt), r(1185, Yt), r(1186, xi), r(1187, ba), r(17, Ei), r(114, JSON.parse.bind(JSON)), r(3802, JSON.parse.bind(JSON)), r(199, Si), r(3807, Si), r(3907, X), r(2951, X), r(791, X), r(1183, X), r(
          1270,
          X
        );
      }, "init");
      Ai.exports = { init: Ea };
    });
    var Ti = I((Fh, Ii) => {
      "use strict";
      p2();
      var $ = 1e6;
      function va(r) {
        var e = r.readInt32BE(
          0
        ), t = r.readUInt32BE(4), n = "";
        e < 0 && (e = ~e + (t === 0), t = ~t + 1 >>> 0, n = "-");
        var i = "", s2, o, u, c2, h, f2;
        {
          if (s2 = e % $, e = e / $ >>> 0, o = 4294967296 * s2 + t, t = o / $ >>> 0, u = "" + (o - $ * t), t === 0 && e === 0)
            return n + u + i;
          for (c2 = "", h = 6 - u.length, f2 = 0; f2 < h; f2++)
            c2 += "0";
          i = c2 + u + i;
        }
        {
          if (s2 = e % $, e = e / $ >>> 0, o = 4294967296 * s2 + t, t = o / $ >>> 0, u = "" + (o - $ * t), t === 0 && e === 0)
            return n + u + i;
          for (c2 = "", h = 6 - u.length, f2 = 0; f2 < h; f2++)
            c2 += "0";
          i = c2 + u + i;
        }
        {
          if (s2 = e % $, e = e / $ >>> 0, o = 4294967296 * s2 + t, t = o / $ >>> 0, u = "" + (o - $ * t), t === 0 && e === 0)
            return n + u + i;
          for (c2 = "", h = 6 - u.length, f2 = 0; f2 < h; f2++)
            c2 += "0";
          i = c2 + u + i;
        }
        return s2 = e % $, o = 4294967296 * s2 + t, u = "" + o % $, n + u + i;
      }
      a(va, "readInt8");
      Ii.exports = va;
    });
    var Fi = I((kh, Ri) => {
      p2();
      var _a299 = Ti(), F = a(function(r, e, t, n, i) {
        t = t || 0, n = n || false, i = i || function(_, P, k) {
          return _ * Math.pow(2, k) + P;
        };
        var s2 = t >> 3, o = a(function(_) {
          return n ? ~_ & 255 : _;
        }, "inv"), u = 255, c2 = 8 - t % 8;
        e < c2 && (u = 255 << 8 - e & 255, c2 = e), t && (u = u >> t % 8);
        var h = 0;
        t % 8 + e >= 8 && (h = i(0, o(r[s2]) & u, c2));
        for (var f2 = e + t >> 3, m2 = s2 + 1; m2 < f2; m2++)
          h = i(h, o(r[m2]), 8);
        var x = (e + t) % 8;
        return x > 0 && (h = i(h, o(r[f2]) >> 8 - x, x)), h;
      }, "parseBits"), Li = a(function(r, e, t) {
        var n = Math.pow(2, t - 1) - 1, i = F(r, 1), s2 = F(r, t, 1);
        if (s2 === 0)
          return 0;
        var o = 1, u = a(function(h, f2, m2) {
          h === 0 && (h = 1);
          for (var x = 1; x <= m2; x++)
            o /= 2, (f2 & 1 << m2 - x) > 0 && (h += o);
          return h;
        }, "parsePrecisionBits"), c2 = F(r, e, t + 1, false, u);
        return s2 == Math.pow(2, t + 1) - 1 ? c2 === 0 ? i === 0 ? 1 / 0 : -1 / 0 : NaN : (i === 0 ? 1 : -1) * Math.pow(2, s2 - n) * c2;
      }, "parseFloatFromBits"), Aa = a(function(r) {
        return F(r, 1) == 1 ? -1 * (F(r, 15, 1, true) + 1) : F(r, 15, 1);
      }, "parseInt16"), Pi = a(function(r) {
        return F(r, 1) == 1 ? -1 * (F(
          r,
          31,
          1,
          true
        ) + 1) : F(r, 31, 1);
      }, "parseInt32"), Ca = a(function(r) {
        return Li(r, 23, 8);
      }, "parseFloat32"), Ia = a(function(r) {
        return Li(r, 52, 11);
      }, "parseFloat64"), Ta = a(function(r) {
        var e = F(r, 16, 32);
        if (e == 49152)
          return NaN;
        for (var t = Math.pow(1e4, F(r, 16, 16)), n = 0, i = [], s2 = F(r, 16), o = 0; o < s2; o++)
          n += F(r, 16, 64 + 16 * o) * t, t /= 1e4;
        var u = Math.pow(10, F(r, 16, 48));
        return (e === 0 ? 1 : -1) * Math.round(n * u) / u;
      }, "parseNumeric"), Bi = a(function(r, e) {
        var t = F(
          e,
          1
        ), n = F(e, 63, 1), i = new Date((t === 0 ? 1 : -1) * n / 1e3 + 9466848e5);
        return r || i.setTime(i.getTime() + i.getTimezoneOffset() * 6e4), i.usec = n % 1e3, i.getMicroSeconds = function() {
          return this.usec;
        }, i.setMicroSeconds = function(s2) {
          this.usec = s2;
        }, i.getUTCMicroSeconds = function() {
          return this.usec;
        }, i;
      }, "parseDate"), $e = a(function(r) {
        for (var e = F(r, 32), t = F(r, 32, 32), n = F(r, 32, 64), i = 96, s2 = [], o = 0; o < e; o++)
          s2[o] = F(r, 32, i), i += 32, i += 32;
        var u = a(function(h) {
          var f2 = F(r, 32, i);
          if (i += 32, f2 == 4294967295)
            return null;
          var m2;
          if (h == 23 || h == 20)
            return m2 = F(r, f2 * 8, i), i += f2 * 8, m2;
          if (h == 25)
            return m2 = r.toString(this.encoding, i >> 3, (i += f2 << 3) >> 3), m2;
          console.log("ERROR: ElementType not implemented: " + h);
        }, "parseElement"), c2 = a(function(h, f2) {
          var m2 = [], x;
          if (h.length > 1) {
            var _ = h.shift();
            for (x = 0; x < _; x++)
              m2[x] = c2(h, f2);
            h.unshift(
              _
            );
          } else
            for (x = 0; x < h[0]; x++)
              m2[x] = u(f2);
          return m2;
        }, "parse");
        return c2(s2, n);
      }, "parseArray"), Pa = a(function(r) {
        return r.toString("utf8");
      }, "parseText"), Ba = a(function(r) {
        return r === null ? null : F(r, 8) > 0;
      }, "parseBool"), La = a(function(r) {
        r(20, _a299), r(21, Aa), r(23, Pi), r(
          26,
          Pi
        ), r(1700, Ta), r(700, Ca), r(701, Ia), r(16, Ba), r(1114, Bi.bind(null, false)), r(1184, Bi.bind(
          null,
          true
        )), r(1e3, $e), r(1007, $e), r(1016, $e), r(1008, $e), r(1009, $e), r(25, Pa);
      }, "init");
      Ri.exports = { init: La };
    });
    var Di = I((qh, Mi) => {
      p2();
      Mi.exports = {
        BOOL: 16,
        BYTEA: 17,
        CHAR: 18,
        INT8: 20,
        INT2: 21,
        INT4: 23,
        REGPROC: 24,
        TEXT: 25,
        OID: 26,
        TID: 27,
        XID: 28,
        CID: 29,
        JSON: 114,
        XML: 142,
        PG_NODE_TREE: 194,
        SMGR: 210,
        PATH: 602,
        POLYGON: 604,
        CIDR: 650,
        FLOAT4: 700,
        FLOAT8: 701,
        ABSTIME: 702,
        RELTIME: 703,
        TINTERVAL: 704,
        CIRCLE: 718,
        MACADDR8: 774,
        MONEY: 790,
        MACADDR: 829,
        INET: 869,
        ACLITEM: 1033,
        BPCHAR: 1042,
        VARCHAR: 1043,
        DATE: 1082,
        TIME: 1083,
        TIMESTAMP: 1114,
        TIMESTAMPTZ: 1184,
        INTERVAL: 1186,
        TIMETZ: 1266,
        BIT: 1560,
        VARBIT: 1562,
        NUMERIC: 1700,
        REFCURSOR: 1790,
        REGPROCEDURE: 2202,
        REGOPER: 2203,
        REGOPERATOR: 2204,
        REGCLASS: 2205,
        REGTYPE: 2206,
        UUID: 2950,
        TXID_SNAPSHOT: 2970,
        PG_LSN: 3220,
        PG_NDISTINCT: 3361,
        PG_DEPENDENCIES: 3402,
        TSVECTOR: 3614,
        TSQUERY: 3615,
        GTSVECTOR: 3642,
        REGCONFIG: 3734,
        REGDICTIONARY: 3769,
        JSONB: 3802,
        REGNAMESPACE: 4089,
        REGROLE: 4096
      };
    });
    var ze = I((Ve) => {
      p2();
      var Ra = Ci(), Fa = Fi(), Ma = Gt(), Da = Di();
      Ve.getTypeParser = ka;
      Ve.setTypeParser = Ua;
      Ve.arrayParser = Ma;
      Ve.builtins = Da;
      var Ke = { text: {}, binary: {} };
      function ki(r) {
        return String(
          r
        );
      }
      a(ki, "noParse");
      function ka(r, e) {
        return e = e || "text", Ke[e] && Ke[e][r] || ki;
      }
      a(
        ka,
        "getTypeParser"
      );
      function Ua(r, e, t) {
        typeof e == "function" && (t = e, e = "text"), Ke[e][r] = t;
      }
      a(Ua, "setTypeParser");
      Ra.init(function(r, e) {
        Ke.text[r] = e;
      });
      Fa.init(function(r, e) {
        Ke.binary[r] = e;
      });
    });
    var Ye = I((Hh, Xt) => {
      "use strict";
      p2();
      Xt.exports = {
        host: "localhost",
        user: y.platform === "win32" ? y.env.USERNAME : y.env.USER,
        database: void 0,
        password: null,
        connectionString: void 0,
        port: 5432,
        rows: 0,
        binary: false,
        max: 10,
        idleTimeoutMillis: 3e4,
        client_encoding: "",
        ssl: false,
        application_name: void 0,
        fallback_application_name: void 0,
        options: void 0,
        parseInputDatesAsUTC: false,
        statement_timeout: false,
        lock_timeout: false,
        idle_in_transaction_session_timeout: false,
        query_timeout: false,
        connect_timeout: 0,
        keepalives: 1,
        keepalives_idle: 0
      };
      var Le = ze(), Oa = Le.getTypeParser(
        20,
        "text"
      ), qa = Le.getTypeParser(1016, "text");
      Xt.exports.__defineSetter__("parseInt8", function(r) {
        Le.setTypeParser(20, "text", r ? Le.getTypeParser(23, "text") : Oa), Le.setTypeParser(1016, "text", r ? Le.getTypeParser(1007, "text") : qa);
      });
    });
    var Ze = I(($h, Oi) => {
      "use strict";
      p2();
      var Na = (Wt(), U(Qt)), Qa = Ye();
      function Wa(r) {
        var e = r.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        return '"' + e + '"';
      }
      a(Wa, "escapeElement");
      function Ui(r) {
        for (var e = "{", t = 0; t < r.length; t++)
          t > 0 && (e = e + ","), r[t] === null || typeof r[t] > "u" ? e = e + "NULL" : Array.isArray(r[t]) ? e = e + Ui(r[t]) : r[t] instanceof d ? e += "\\\\x" + r[t].toString("hex") : e += Wa(ft(r[t]));
        return e = e + "}", e;
      }
      a(Ui, "arrayString");
      var ft = a(function(r, e) {
        if (r == null)
          return null;
        if (r instanceof d)
          return r;
        if (ArrayBuffer.isView(r)) {
          var t = d.from(r.buffer, r.byteOffset, r.byteLength);
          return t.length === r.byteLength ? t : t.slice(
            r.byteOffset,
            r.byteOffset + r.byteLength
          );
        }
        return r instanceof Date ? Qa.parseInputDatesAsUTC ? Ga(r) : Ha(r) : Array.isArray(r) ? Ui(r) : typeof r == "object" ? ja(r, e) : r.toString();
      }, "prepareValue");
      function ja(r, e) {
        if (r && typeof r.toPostgres == "function") {
          if (e = e || [], e.indexOf(r) !== -1)
            throw new Error('circular reference detected while preparing "' + r + '" for query');
          return e.push(r), ft(r.toPostgres(ft), e);
        }
        return JSON.stringify(r);
      }
      a(ja, "prepareObject");
      function Q(r, e) {
        for (r = "" + r; r.length < e; )
          r = "0" + r;
        return r;
      }
      a(
        Q,
        "pad"
      );
      function Ha(r) {
        var e = -r.getTimezoneOffset(), t = r.getFullYear(), n = t < 1;
        n && (t = Math.abs(t) + 1);
        var i = Q(t, 4) + "-" + Q(r.getMonth() + 1, 2) + "-" + Q(r.getDate(), 2) + "T" + Q(r.getHours(), 2) + ":" + Q(r.getMinutes(), 2) + ":" + Q(r.getSeconds(), 2) + "." + Q(
          r.getMilliseconds(),
          3
        );
        return e < 0 ? (i += "-", e *= -1) : i += "+", i += Q(Math.floor(e / 60), 2) + ":" + Q(e % 60, 2), n && (i += " BC"), i;
      }
      a(Ha, "dateToString");
      function Ga(r) {
        var e = r.getUTCFullYear(), t = e < 1;
        t && (e = Math.abs(e) + 1);
        var n = Q(e, 4) + "-" + Q(r.getUTCMonth() + 1, 2) + "-" + Q(r.getUTCDate(), 2) + "T" + Q(r.getUTCHours(), 2) + ":" + Q(r.getUTCMinutes(), 2) + ":" + Q(r.getUTCSeconds(), 2) + "." + Q(r.getUTCMilliseconds(), 3);
        return n += "+00:00", t && (n += " BC"), n;
      }
      a(Ga, "dateToStringUTC");
      function $a(r, e, t) {
        return r = typeof r == "string" ? { text: r } : r, e && (typeof e == "function" ? r.callback = e : r.values = e), t && (r.callback = t), r;
      }
      a($a, "normalizeQueryConfig");
      var er = a(function(r) {
        return Na.createHash("md5").update(r, "utf-8").digest("hex");
      }, "md5"), Ka = a(function(r, e, t) {
        var n = er(e + r), i = er(d.concat([d.from(n), t]));
        return "md5" + i;
      }, "postgresMd5PasswordHash");
      Oi.exports = { prepareValue: a(function(e) {
        return ft(
          e
        );
      }, "prepareValueWrapper"), normalizeQueryConfig: $a, postgresMd5PasswordHash: Ka, md5: er };
    });
    var Xe = {};
    Y(Xe, { default: () => Va });
    var Va;
    var et = W(() => {
      p2();
      Va = {};
    });
    var Hi = I((rl, ji) => {
      "use strict";
      p2();
      var rr = (Wt(), U(Qt));
      function za(r) {
        if (r.indexOf(
          "SCRAM-SHA-256"
        ) === -1)
          throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
        let e = rr.randomBytes(18).toString("base64");
        return { mechanism: "SCRAM-SHA-256", clientNonce: e, response: "n,,n=*,r=" + e, message: "SASLInitialResponse" };
      }
      a(za, "startSession");
      function Ya(r, e, t) {
        if (r.message !== "SASLInitialResponse")
          throw new Error(
            "SASL: Last message was not SASLInitialResponse"
          );
        if (typeof e != "string")
          throw new Error(
            "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
          );
        if (typeof t != "string")
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
        let n = Xa(t);
        if (n.nonce.startsWith(r.clientNonce)) {
          if (n.nonce.length === r.clientNonce.length)
            throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
        } else
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
        var i = d.from(n.salt, "base64"), s2 = ru(
          e,
          i,
          n.iteration
        ), o = Re(s2, "Client Key"), u = tu(o), c2 = "n=*,r=" + r.clientNonce, h = "r=" + n.nonce + ",s=" + n.salt + ",i=" + n.iteration, f2 = "c=biws,r=" + n.nonce, m2 = c2 + "," + h + "," + f2, x = Re(u, m2), _ = Wi(
          o,
          x
        ), P = _.toString("base64"), k = Re(s2, "Server Key"), z2 = Re(k, m2);
        r.message = "SASLResponse", r.serverSignature = z2.toString("base64"), r.response = f2 + ",p=" + P;
      }
      a(Ya, "continueSession");
      function Za(r, e) {
        if (r.message !== "SASLResponse")
          throw new Error("SASL: Last message was not SASLResponse");
        if (typeof e != "string")
          throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
        let { serverSignature: t } = eu(
          e
        );
        if (t !== r.serverSignature)
          throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
      }
      a(Za, "finalizeSession");
      function Ja(r) {
        if (typeof r != "string")
          throw new TypeError("SASL: text must be a string");
        return r.split("").map(
          (e, t) => r.charCodeAt(t)
        ).every((e) => e >= 33 && e <= 43 || e >= 45 && e <= 126);
      }
      a(Ja, "isPrintableChars");
      function Ni(r) {
        return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(r);
      }
      a(Ni, "isBase64");
      function Qi(r) {
        if (typeof r != "string")
          throw new TypeError(
            "SASL: attribute pairs text must be a string"
          );
        return new Map(r.split(",").map((e) => {
          if (!/^.=/.test(e))
            throw new Error("SASL: Invalid attribute pair entry");
          let t = e[0], n = e.substring(2);
          return [t, n];
        }));
      }
      a(Qi, "parseAttributePairs");
      function Xa(r) {
        let e = Qi(
          r
        ), t = e.get("r");
        if (t) {
          if (!Ja(t))
            throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
        } else
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
        let n = e.get("s");
        if (n) {
          if (!Ni(n))
            throw new Error(
              "SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64"
            );
        } else
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
        let i = e.get("i");
        if (i) {
          if (!/^[1-9][0-9]*$/.test(i))
            throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
        } else
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
        let s2 = parseInt(i, 10);
        return { nonce: t, salt: n, iteration: s2 };
      }
      a(Xa, "parseServerFirstMessage");
      function eu(r) {
        let t = Qi(r).get("v");
        if (t) {
          if (!Ni(t))
            throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
        } else
          throw new Error(
            "SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing"
          );
        return { serverSignature: t };
      }
      a(eu, "parseServerFinalMessage");
      function Wi(r, e) {
        if (!d.isBuffer(r))
          throw new TypeError(
            "first argument must be a Buffer"
          );
        if (!d.isBuffer(e))
          throw new TypeError("second argument must be a Buffer");
        if (r.length !== e.length)
          throw new Error("Buffer lengths must match");
        if (r.length === 0)
          throw new Error("Buffers cannot be empty");
        return d.from(r.map((t, n) => r[n] ^ e[n]));
      }
      a(Wi, "xorBuffers");
      function tu(r) {
        return rr.createHash(
          "sha256"
        ).update(r).digest();
      }
      a(tu, "sha256");
      function Re(r, e) {
        return rr.createHmac(
          "sha256",
          r
        ).update(e).digest();
      }
      a(Re, "hmacSha256");
      function ru(r, e, t) {
        for (var n = Re(
          r,
          d.concat([e, d.from([0, 0, 0, 1])])
        ), i = n, s2 = 0; s2 < t - 1; s2++)
          n = Re(r, n), i = Wi(i, n);
        return i;
      }
      a(ru, "Hi");
      ji.exports = { startSession: za, continueSession: Ya, finalizeSession: Za };
    });
    var nr = {};
    Y(nr, { join: () => nu });
    function nu(...r) {
      return r.join("/");
    }
    var ir = W(() => {
      p2();
      a(nu, "join");
    });
    var sr = {};
    Y(sr, { stat: () => iu });
    function iu(r, e) {
      e(new Error("No filesystem"));
    }
    var or2 = W(
      () => {
        p2();
        a(iu, "stat");
      }
    );
    var ar = {};
    Y(ar, { default: () => su });
    var su;
    var ur = W(() => {
      p2();
      su = {};
    });
    var Gi = {};
    Y(Gi, { StringDecoder: () => cr });
    var hr;
    var cr;
    var $i = W(() => {
      p2();
      hr = class hr {
        constructor(e) {
          T(this, "td");
          this.td = new TextDecoder(e);
        }
        write(e) {
          return this.td.decode(e, { stream: true });
        }
        end(e) {
          return this.td.decode(e);
        }
      };
      a(hr, "StringDecoder");
      cr = hr;
    });
    var Yi = I((fl, zi) => {
      "use strict";
      p2();
      var { Transform: ou } = (ur(), U(ar)), { StringDecoder: au } = ($i(), U(Gi)), ge = Symbol("last"), dt = Symbol("decoder");
      function uu(r, e, t) {
        let n;
        if (this.overflow) {
          if (n = this[dt].write(r).split(this.matcher), n.length === 1)
            return t();
          n.shift(), this.overflow = false;
        } else
          this[ge] += this[dt].write(r), n = this[ge].split(this.matcher);
        this[ge] = n.pop();
        for (let i = 0; i < n.length; i++)
          try {
            Vi(this, this.mapper(n[i]));
          } catch (s2) {
            return t(
              s2
            );
          }
        if (this.overflow = this[ge].length > this.maxLength, this.overflow && !this.skipOverflow) {
          t(new Error("maximum buffer reached"));
          return;
        }
        t();
      }
      a(uu, "transform");
      function cu(r) {
        if (this[ge] += this[dt].end(), this[ge])
          try {
            Vi(this, this.mapper(this[ge]));
          } catch (e) {
            return r(e);
          }
        r();
      }
      a(cu, "flush");
      function Vi(r, e) {
        e !== void 0 && r.push(e);
      }
      a(Vi, "push");
      function Ki(r) {
        return r;
      }
      a(Ki, "noop");
      function hu(r, e, t) {
        switch (r = r || /\r?\n/, e = e || Ki, t = t || {}, arguments.length) {
          case 1:
            typeof r == "function" ? (e = r, r = /\r?\n/) : typeof r == "object" && !(r instanceof RegExp) && !r[Symbol.split] && (t = r, r = /\r?\n/);
            break;
          case 2:
            typeof r == "function" ? (t = e, e = r, r = /\r?\n/) : typeof e == "object" && (t = e, e = Ki);
        }
        t = Object.assign({}, t), t.autoDestroy = true, t.transform = uu, t.flush = cu, t.readableObjectMode = true;
        let n = new ou(t);
        return n[ge] = "", n[dt] = new au("utf8"), n.matcher = r, n.mapper = e, n.maxLength = t.maxLength, n.skipOverflow = t.skipOverflow || false, n.overflow = false, n._destroy = function(i, s2) {
          this._writableState.errorEmitted = false, s2(i);
        }, n;
      }
      a(hu, "split");
      zi.exports = hu;
    });
    var Xi = I((yl, fe) => {
      "use strict";
      p2();
      var Zi = (ir(), U(nr)), lu = (ur(), U(ar)).Stream, fu = Yi(), Ji = (et(), U(Xe)), pu = 5432, yt = y.platform === "win32", tt = y.stderr, du = 56, yu = 7, mu = 61440, gu = 32768;
      function wu(r) {
        return (r & mu) == gu;
      }
      a(wu, "isRegFile");
      var Fe = [
        "host",
        "port",
        "database",
        "user",
        "password"
      ], lr = Fe.length, bu = Fe[lr - 1];
      function fr() {
        var r = tt instanceof lu && tt.writable === true;
        if (r) {
          var e = Array.prototype.slice.call(arguments).concat(`
`);
          tt.write(Ji.format.apply(Ji, e));
        }
      }
      a(fr, "warn");
      Object.defineProperty(
        fe.exports,
        "isWin",
        { get: function() {
          return yt;
        }, set: function(r) {
          yt = r;
        } }
      );
      fe.exports.warnTo = function(r) {
        var e = tt;
        return tt = r, e;
      };
      fe.exports.getFileName = function(r) {
        var e = r || y.env, t = e.PGPASSFILE || (yt ? Zi.join(e.APPDATA || "./", "postgresql", "pgpass.conf") : Zi.join(e.HOME || "./", ".pgpass"));
        return t;
      };
      fe.exports.usePgPass = function(r, e) {
        return Object.prototype.hasOwnProperty.call(y.env, "PGPASSWORD") ? false : yt ? true : (e = e || "<unkn>", wu(r.mode) ? r.mode & (du | yu) ? (fr('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', e), false) : true : (fr(
          'WARNING: password file "%s" is not a plain file',
          e
        ), false));
      };
      var Su = fe.exports.match = function(r, e) {
        return Fe.slice(0, -1).reduce(
          function(t, n, i) {
            return i == 1 && Number(r[n] || pu) === Number(e[n]) ? t && true : t && (e[n] === "*" || e[n] === r[n]);
          },
          true
        );
      };
      fe.exports.getPassword = function(r, e, t) {
        var n, i = e.pipe(fu());
        function s2(c2) {
          var h = xu(
            c2
          );
          h && Eu(h) && Su(r, h) && (n = h[bu], i.end());
        }
        a(s2, "onLine");
        var o = a(function() {
          e.destroy(), t(n);
        }, "onEnd"), u = a(function(c2) {
          e.destroy(), fr("WARNING: error on reading file: %s", c2), t(void 0);
        }, "onErr");
        e.on("error", u), i.on("data", s2).on("end", o).on(
          "error",
          u
        );
      };
      var xu = fe.exports.parseLine = function(r) {
        if (r.length < 11 || r.match(/^\s+#/))
          return null;
        for (var e = "", t = "", n = 0, i = 0, s2 = 0, o = {}, u = false, c2 = a(function(f2, m2, x) {
          var _ = r.substring(
            m2,
            x
          );
          Object.hasOwnProperty.call(y.env, "PGPASS_NO_DEESCAPE") || (_ = _.replace(
            /\\([:\\])/g,
            "$1"
          )), o[Fe[f2]] = _;
        }, "addToObj"), h = 0; h < r.length - 1; h += 1) {
          if (e = r.charAt(h + 1), t = r.charAt(
            h
          ), u = n == lr - 1, u) {
            c2(n, i);
            break;
          }
          h >= 0 && e == ":" && t !== "\\" && (c2(n, i, h + 1), i = h + 2, n += 1);
        }
        return o = Object.keys(o).length === lr ? o : null, o;
      }, Eu = fe.exports.isValidEntry = function(r) {
        for (var e = {
          0: function(o) {
            return o.length > 0;
          },
          1: function(o) {
            return o === "*" ? true : (o = Number(o), isFinite(
              o
            ) && o > 0 && o < 9007199254740992 && Math.floor(o) === o);
          },
          2: function(o) {
            return o.length > 0;
          },
          3: function(o) {
            return o.length > 0;
          },
          4: function(o) {
            return o.length > 0;
          }
        }, t = 0; t < Fe.length; t += 1) {
          var n = e[t], i = r[Fe[t]] || "", s2 = n(i);
          if (!s2)
            return false;
        }
        return true;
      };
    });
    var ts = I((bl, pr) => {
      "use strict";
      p2();
      var wl = (ir(), U(nr)), es = (or2(), U(sr)), mt = Xi();
      pr.exports = function(r, e) {
        var t = mt.getFileName();
        es.stat(t, function(n, i) {
          if (n || !mt.usePgPass(i, t))
            return e(void 0);
          var s2 = es.createReadStream(t);
          mt.getPassword(
            r,
            s2,
            e
          );
        });
      };
      pr.exports.warnTo = mt.warnTo;
    });
    var dr = I((xl, rs) => {
      "use strict";
      p2();
      var vu = ze();
      function gt2(r) {
        this._types = r || vu, this.text = {}, this.binary = {};
      }
      a(gt2, "TypeOverrides");
      gt2.prototype.getOverrides = function(r) {
        switch (r) {
          case "text":
            return this.text;
          case "binary":
            return this.binary;
          default:
            return {};
        }
      };
      gt2.prototype.setTypeParser = function(r, e, t) {
        typeof e == "function" && (t = e, e = "text"), this.getOverrides(e)[r] = t;
      };
      gt2.prototype.getTypeParser = function(r, e) {
        return e = e || "text", this.getOverrides(e)[r] || this._types.getTypeParser(r, e);
      };
      rs.exports = gt2;
    });
    var ns = {};
    Y(ns, { default: () => _u });
    var _u;
    var is2 = W(() => {
      p2();
      _u = {};
    });
    var os = I((Al, ss) => {
      "use strict";
      p2();
      var Au = (qt(), U(Kn)), yr = (or2(), U(sr));
      function mr(r) {
        if (r.charAt(0) === "/") {
          var t = r.split(" ");
          return { host: t[0], database: t[1] };
        }
        var e = Au.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r) ? encodeURI(r).replace(
          /\%25(\d\d)/g,
          "%$1"
        ) : r, true), t = e.query;
        for (var n in t)
          Array.isArray(t[n]) && (t[n] = t[n][t[n].length - 1]);
        var i = (e.auth || ":").split(":");
        if (t.user = i[0], t.password = i.splice(1).join(":"), t.port = e.port, e.protocol == "socket:")
          return t.host = decodeURI(e.pathname), t.database = e.query.db, t.client_encoding = e.query.encoding, t;
        t.host || (t.host = e.hostname);
        var s2 = e.pathname;
        if (!t.host && s2 && /^%2f/i.test(s2)) {
          var o = s2.split("/");
          t.host = decodeURIComponent(
            o[0]
          ), s2 = o.splice(1).join("/");
        }
        switch (s2 && s2.charAt(0) === "/" && (s2 = s2.slice(1) || null), t.database = s2 && decodeURI(s2), (t.ssl === "true" || t.ssl === "1") && (t.ssl = true), t.ssl === "0" && (t.ssl = false), (t.sslcert || t.sslkey || t.sslrootcert || t.sslmode) && (t.ssl = {}), t.sslcert && (t.ssl.cert = yr.readFileSync(t.sslcert).toString()), t.sslkey && (t.ssl.key = yr.readFileSync(
          t.sslkey
        ).toString()), t.sslrootcert && (t.ssl.ca = yr.readFileSync(t.sslrootcert).toString()), t.sslmode) {
          case "disable": {
            t.ssl = false;
            break;
          }
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full":
            break;
          case "no-verify": {
            t.ssl.rejectUnauthorized = false;
            break;
          }
        }
        return t;
      }
      a(mr, "parse");
      ss.exports = mr;
      mr.parse = mr;
    });
    var wt = I((Tl, cs) => {
      "use strict";
      p2();
      var Cu = (is2(), U(ns)), us = Ye(), as = os().parse, j = a(
        function(r, e, t) {
          return t === void 0 ? t = y.env["PG" + r.toUpperCase()] : t === false || (t = y.env[t]), e[r] || t || us[r];
        },
        "val"
      ), Iu = a(function() {
        switch (y.env.PGSSLMODE) {
          case "disable":
            return false;
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full":
            return true;
          case "no-verify":
            return { rejectUnauthorized: false };
        }
        return us.ssl;
      }, "readSSLConfigFromEnvironment"), Me = a(
        function(r) {
          return "'" + ("" + r).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
        },
        "quoteParamValue"
      ), ee = a(function(r, e, t) {
        var n = e[t];
        n != null && r.push(t + "=" + Me(n));
      }, "add"), wr = class wr {
        constructor(e) {
          e = typeof e == "string" ? as(e) : e || {}, e.connectionString && (e = Object.assign({}, e, as(e.connectionString))), this.user = j("user", e), this.database = j("database", e), this.database === void 0 && (this.database = this.user), this.port = parseInt(
            j("port", e),
            10
          ), this.host = j("host", e), Object.defineProperty(this, "password", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: j("password", e)
          }), this.binary = j("binary", e), this.options = j("options", e), this.ssl = typeof e.ssl > "u" ? Iu() : e.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = true), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: false }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this.client_encoding = j("client_encoding", e), this.replication = j("replication", e), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = j("application_name", e, "PGAPPNAME"), this.fallback_application_name = j("fallback_application_name", e, false), this.statement_timeout = j("statement_timeout", e, false), this.lock_timeout = j(
            "lock_timeout",
            e,
            false
          ), this.idle_in_transaction_session_timeout = j("idle_in_transaction_session_timeout", e, false), this.query_timeout = j("query_timeout", e, false), e.connectionTimeoutMillis === void 0 ? this.connect_timeout = y.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(e.connectionTimeoutMillis / 1e3), e.keepAlive === false ? this.keepalives = 0 : e.keepAlive === true && (this.keepalives = 1), typeof e.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(e.keepAliveInitialDelayMillis / 1e3));
        }
        getLibpqConnectionString(e) {
          var t = [];
          ee(t, this, "user"), ee(t, this, "password"), ee(t, this, "port"), ee(t, this, "application_name"), ee(t, this, "fallback_application_name"), ee(t, this, "connect_timeout"), ee(
            t,
            this,
            "options"
          );
          var n = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
          if (ee(t, n, "sslmode"), ee(t, n, "sslca"), ee(t, n, "sslkey"), ee(t, n, "sslcert"), ee(t, n, "sslrootcert"), this.database && t.push("dbname=" + Me(this.database)), this.replication && t.push("replication=" + Me(this.replication)), this.host && t.push("host=" + Me(this.host)), this.isDomainSocket)
            return e(null, t.join(" "));
          this.client_encoding && t.push("client_encoding=" + Me(this.client_encoding)), Cu.lookup(this.host, function(i, s2) {
            return i ? e(i, null) : (t.push("hostaddr=" + Me(s2)), e(null, t.join(" ")));
          });
        }
      };
      a(wr, "ConnectionParameters");
      var gr = wr;
      cs.exports = gr;
    });
    var fs = I((Ll, ls) => {
      "use strict";
      p2();
      var Tu = ze(), hs = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, Sr = class Sr {
        constructor(e, t) {
          this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = t, this.RowCtor = null, this.rowAsArray = e === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
        }
        addCommandComplete(e) {
          var t;
          e.text ? t = hs.exec(e.text) : t = hs.exec(e.command), t && (this.command = t[1], t[3] ? (this.oid = parseInt(t[2], 10), this.rowCount = parseInt(t[3], 10)) : t[2] && (this.rowCount = parseInt(
            t[2],
            10
          )));
        }
        _parseRowAsArray(e) {
          for (var t = new Array(e.length), n = 0, i = e.length; n < i; n++) {
            var s2 = e[n];
            s2 !== null ? t[n] = this._parsers[n](s2) : t[n] = null;
          }
          return t;
        }
        parseRow(e) {
          for (var t = {}, n = 0, i = e.length; n < i; n++) {
            var s2 = e[n], o = this.fields[n].name;
            s2 !== null ? t[o] = this._parsers[n](
              s2
            ) : t[o] = null;
          }
          return t;
        }
        addRow(e) {
          this.rows.push(e);
        }
        addFields(e) {
          this.fields = e, this.fields.length && (this._parsers = new Array(e.length));
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            this._types ? this._parsers[t] = this._types.getTypeParser(n.dataTypeID, n.format || "text") : this._parsers[t] = Tu.getTypeParser(n.dataTypeID, n.format || "text");
          }
        }
      };
      a(Sr, "Result");
      var br = Sr;
      ls.exports = br;
    });
    var ms = I((Ml, ys) => {
      "use strict";
      p2();
      var { EventEmitter: Pu } = ye(), ps = fs(), ds = Ze(), Er = class Er extends Pu {
        constructor(e, t, n) {
          super(), e = ds.normalizeQueryConfig(e, t, n), this.text = e.text, this.values = e.values, this.rows = e.rows, this.types = e.types, this.name = e.name, this.binary = e.binary, this.portal = e.portal || "", this.callback = e.callback, this._rowMode = e.rowMode, y.domain && e.callback && (this.callback = y.domain.bind(e.callback)), this._result = new ps(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = false, this._canceledDueToError = false, this._promise = null;
        }
        requiresPreparation() {
          return this.name || this.rows ? true : !this.text || !this.values ? false : this.values.length > 0;
        }
        _checkForMultirow() {
          this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new ps(
            this._rowMode,
            this.types
          ), this._results.push(this._result));
        }
        handleRowDescription(e) {
          this._checkForMultirow(), this._result.addFields(e.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
        }
        handleDataRow(e) {
          let t;
          if (!this._canceledDueToError) {
            try {
              t = this._result.parseRow(e.fields);
            } catch (n) {
              this._canceledDueToError = n;
              return;
            }
            this.emit("row", t, this._result), this._accumulateRows && this._result.addRow(t);
          }
        }
        handleCommandComplete(e, t) {
          this._checkForMultirow(), this._result.addCommandComplete(e), this.rows && t.sync();
        }
        handleEmptyQuery(e) {
          this.rows && e.sync();
        }
        handleError(e, t) {
          if (this._canceledDueToError && (e = this._canceledDueToError, this._canceledDueToError = false), this.callback)
            return this.callback(e);
          this.emit("error", e);
        }
        handleReadyForQuery(e) {
          if (this._canceledDueToError)
            return this.handleError(
              this._canceledDueToError,
              e
            );
          if (this.callback)
            try {
              this.callback(null, this._results);
            } catch (t) {
              y.nextTick(() => {
                throw t;
              });
            }
          this.emit("end", this._results);
        }
        submit(e) {
          if (typeof this.text != "string" && typeof this.name != "string")
            return new Error("A query must have either text or a name. Supplying neither is unsupported.");
          let t = e.parsedStatements[this.name];
          return this.text && t && this.text !== t ? new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`) : this.values && !Array.isArray(this.values) ? new Error("Query values must be an array") : (this.requiresPreparation() ? this.prepare(e) : e.query(this.text), null);
        }
        hasBeenParsed(e) {
          return this.name && e.parsedStatements[this.name];
        }
        handlePortalSuspended(e) {
          this._getRows(e, this.rows);
        }
        _getRows(e, t) {
          e.execute(
            { portal: this.portal, rows: t }
          ), t ? e.flush() : e.sync();
        }
        prepare(e) {
          this.isPreparedStatement = true, this.hasBeenParsed(e) || e.parse({ text: this.text, name: this.name, types: this.types });
          try {
            e.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: ds.prepareValue });
          } catch (t) {
            this.handleError(t, e);
            return;
          }
          e.describe(
            { type: "P", name: this.portal || "" }
          ), this._getRows(e, this.rows);
        }
        handleCopyInResponse(e) {
          e.sendCopyFail("No source stream defined");
        }
        handleCopyData(e, t) {
        }
      };
      a(Er, "Query");
      var xr = Er;
      ys.exports = xr;
    });
    var Zr = I((A) => {
      "use strict";
      p2();
      Object.defineProperty(A, "__esModule", { value: true });
      A.NoticeMessage = A.DataRowMessage = A.CommandCompleteMessage = A.ReadyForQueryMessage = A.NotificationResponseMessage = A.BackendKeyDataMessage = A.AuthenticationMD5Password = A.ParameterStatusMessage = A.ParameterDescriptionMessage = A.RowDescriptionMessage = A.Field = A.CopyResponse = A.CopyDataMessage = A.DatabaseError = A.copyDone = A.emptyQuery = A.replicationStart = A.portalSuspended = A.noData = A.closeComplete = A.bindComplete = A.parseComplete = void 0;
      A.parseComplete = { name: "parseComplete", length: 5 };
      A.bindComplete = { name: "bindComplete", length: 5 };
      A.closeComplete = { name: "closeComplete", length: 5 };
      A.noData = { name: "noData", length: 5 };
      A.portalSuspended = { name: "portalSuspended", length: 5 };
      A.replicationStart = { name: "replicationStart", length: 4 };
      A.emptyQuery = { name: "emptyQuery", length: 4 };
      A.copyDone = { name: "copyDone", length: 4 };
      var Ur = class Ur extends Error {
        constructor(e, t, n) {
          super(
            e
          ), this.length = t, this.name = n;
        }
      };
      a(Ur, "DatabaseError");
      var vr = Ur;
      A.DatabaseError = vr;
      var Or = class Or {
        constructor(e, t) {
          this.length = e, this.chunk = t, this.name = "copyData";
        }
      };
      a(Or, "CopyDataMessage");
      var _r = Or;
      A.CopyDataMessage = _r;
      var qr = class qr {
        constructor(e, t, n, i) {
          this.length = e, this.name = t, this.binary = n, this.columnTypes = new Array(i);
        }
      };
      a(qr, "CopyResponse");
      var Ar = qr;
      A.CopyResponse = Ar;
      var Nr = class Nr {
        constructor(e, t, n, i, s2, o, u) {
          this.name = e, this.tableID = t, this.columnID = n, this.dataTypeID = i, this.dataTypeSize = s2, this.dataTypeModifier = o, this.format = u;
        }
      };
      a(Nr, "Field");
      var Cr = Nr;
      A.Field = Cr;
      var Qr = class Qr {
        constructor(e, t) {
          this.length = e, this.fieldCount = t, this.name = "rowDescription", this.fields = new Array(
            this.fieldCount
          );
        }
      };
      a(Qr, "RowDescriptionMessage");
      var Ir = Qr;
      A.RowDescriptionMessage = Ir;
      var Wr = class Wr {
        constructor(e, t) {
          this.length = e, this.parameterCount = t, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
        }
      };
      a(Wr, "ParameterDescriptionMessage");
      var Tr = Wr;
      A.ParameterDescriptionMessage = Tr;
      var jr = class jr {
        constructor(e, t, n) {
          this.length = e, this.parameterName = t, this.parameterValue = n, this.name = "parameterStatus";
        }
      };
      a(jr, "ParameterStatusMessage");
      var Pr = jr;
      A.ParameterStatusMessage = Pr;
      var Hr = class Hr {
        constructor(e, t) {
          this.length = e, this.salt = t, this.name = "authenticationMD5Password";
        }
      };
      a(Hr, "AuthenticationMD5Password");
      var Br = Hr;
      A.AuthenticationMD5Password = Br;
      var Gr = class Gr {
        constructor(e, t, n) {
          this.length = e, this.processID = t, this.secretKey = n, this.name = "backendKeyData";
        }
      };
      a(
        Gr,
        "BackendKeyDataMessage"
      );
      var Lr = Gr;
      A.BackendKeyDataMessage = Lr;
      var $r = class $r {
        constructor(e, t, n, i) {
          this.length = e, this.processId = t, this.channel = n, this.payload = i, this.name = "notification";
        }
      };
      a($r, "NotificationResponseMessage");
      var Rr = $r;
      A.NotificationResponseMessage = Rr;
      var Kr = class Kr {
        constructor(e, t) {
          this.length = e, this.status = t, this.name = "readyForQuery";
        }
      };
      a(Kr, "ReadyForQueryMessage");
      var Fr = Kr;
      A.ReadyForQueryMessage = Fr;
      var Vr = class Vr {
        constructor(e, t) {
          this.length = e, this.text = t, this.name = "commandComplete";
        }
      };
      a(Vr, "CommandCompleteMessage");
      var Mr = Vr;
      A.CommandCompleteMessage = Mr;
      var zr = class zr {
        constructor(e, t) {
          this.length = e, this.fields = t, this.name = "dataRow", this.fieldCount = t.length;
        }
      };
      a(zr, "DataRowMessage");
      var Dr = zr;
      A.DataRowMessage = Dr;
      var Yr = class Yr {
        constructor(e, t) {
          this.length = e, this.message = t, this.name = "notice";
        }
      };
      a(Yr, "NoticeMessage");
      var kr = Yr;
      A.NoticeMessage = kr;
    });
    var gs = I((bt) => {
      "use strict";
      p2();
      Object.defineProperty(bt, "__esModule", { value: true });
      bt.Writer = void 0;
      var Xr = class Xr {
        constructor(e = 256) {
          this.size = e, this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(e);
        }
        ensure(e) {
          var t = this.buffer.length - this.offset;
          if (t < e) {
            var n = this.buffer, i = n.length + (n.length >> 1) + e;
            this.buffer = d.allocUnsafe(
              i
            ), n.copy(this.buffer);
          }
        }
        addInt32(e) {
          return this.ensure(4), this.buffer[this.offset++] = e >>> 24 & 255, this.buffer[this.offset++] = e >>> 16 & 255, this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
        }
        addInt16(e) {
          return this.ensure(2), this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
        }
        addCString(e) {
          if (!e)
            this.ensure(1);
          else {
            var t = d.byteLength(e);
            this.ensure(t + 1), this.buffer.write(
              e,
              this.offset,
              "utf-8"
            ), this.offset += t;
          }
          return this.buffer[this.offset++] = 0, this;
        }
        addString(e = "") {
          var t = d.byteLength(e);
          return this.ensure(t), this.buffer.write(e, this.offset), this.offset += t, this;
        }
        add(e) {
          return this.ensure(e.length), e.copy(this.buffer, this.offset), this.offset += e.length, this;
        }
        join(e) {
          if (e) {
            this.buffer[this.headerPosition] = e;
            let t = this.offset - (this.headerPosition + 1);
            this.buffer.writeInt32BE(t, this.headerPosition + 1);
          }
          return this.buffer.slice(e ? 0 : 5, this.offset);
        }
        flush(e) {
          var t = this.join(e);
          return this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(this.size), t;
        }
      };
      a(Xr, "Writer");
      var Jr = Xr;
      bt.Writer = Jr;
    });
    var bs = I((xt) => {
      "use strict";
      p2();
      Object.defineProperty(xt, "__esModule", { value: true });
      xt.serialize = void 0;
      var en = gs(), M = new en.Writer(), Bu = a((r) => {
        M.addInt16(3).addInt16(
          0
        );
        for (let n of Object.keys(r))
          M.addCString(n).addCString(r[n]);
        M.addCString("client_encoding").addCString("UTF8");
        var e = M.addCString("").flush(), t = e.length + 4;
        return new en.Writer().addInt32(t).add(e).flush();
      }, "startup"), Lu = a(() => {
        let r = d.allocUnsafe(8);
        return r.writeInt32BE(8, 0), r.writeInt32BE(80877103, 4), r;
      }, "requestSsl"), Ru = a((r) => M.addCString(r).flush(112), "password"), Fu = a(function(r, e) {
        return M.addCString(r).addInt32(
          d.byteLength(e)
        ).addString(e), M.flush(112);
      }, "sendSASLInitialResponseMessage"), Mu = a(
        function(r) {
          return M.addString(r).flush(112);
        },
        "sendSCRAMClientFinalMessage"
      ), Du = a(
        (r) => M.addCString(r).flush(81),
        "query"
      ), ws2 = [], ku = a((r) => {
        let e = r.name || "";
        e.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", e, e.length), console.error("This can cause conflicts and silent errors executing queries"));
        let t = r.types || ws2;
        for (var n = t.length, i = M.addCString(e).addCString(r.text).addInt16(n), s2 = 0; s2 < n; s2++)
          i.addInt32(t[s2]);
        return M.flush(80);
      }, "parse"), De = new en.Writer(), Uu = a(function(r, e) {
        for (let t = 0; t < r.length; t++) {
          let n = e ? e(r[t], t) : r[t];
          n == null ? (M.addInt16(0), De.addInt32(-1)) : n instanceof d ? (M.addInt16(1), De.addInt32(n.length), De.add(n)) : (M.addInt16(0), De.addInt32(d.byteLength(
            n
          )), De.addString(n));
        }
      }, "writeValues"), Ou = a((r = {}) => {
        let e = r.portal || "", t = r.statement || "", n = r.binary || false, i = r.values || ws2, s2 = i.length;
        return M.addCString(e).addCString(t), M.addInt16(s2), Uu(i, r.valueMapper), M.addInt16(s2), M.add(De.flush()), M.addInt16(n ? 1 : 0), M.flush(66);
      }, "bind"), qu = d.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), Nu = a((r) => {
        if (!r || !r.portal && !r.rows)
          return qu;
        let e = r.portal || "", t = r.rows || 0, n = d.byteLength(e), i = 4 + n + 1 + 4, s2 = d.allocUnsafe(1 + i);
        return s2[0] = 69, s2.writeInt32BE(i, 1), s2.write(e, 5, "utf-8"), s2[n + 5] = 0, s2.writeUInt32BE(t, s2.length - 4), s2;
      }, "execute"), Qu = a((r, e) => {
        let t = d.allocUnsafe(16);
        return t.writeInt32BE(16, 0), t.writeInt16BE(1234, 4), t.writeInt16BE(5678, 6), t.writeInt32BE(
          r,
          8
        ), t.writeInt32BE(e, 12), t;
      }, "cancel"), tn = a(
        (r, e) => {
          let n = 4 + d.byteLength(e) + 1, i = d.allocUnsafe(1 + n);
          return i[0] = r, i.writeInt32BE(n, 1), i.write(e, 5, "utf-8"), i[n] = 0, i;
        },
        "cstringMessage"
      ), Wu = M.addCString("P").flush(68), ju = M.addCString("S").flush(68), Hu = a((r) => r.name ? tn(68, `${r.type}${r.name || ""}`) : r.type === "P" ? Wu : ju, "describe"), Gu = a(
        (r) => {
          let e = `${r.type}${r.name || ""}`;
          return tn(67, e);
        },
        "close"
      ), $u = a((r) => M.add(r).flush(
        100
      ), "copyData"), Ku = a((r) => tn(102, r), "copyFail"), St = a((r) => d.from([r, 0, 0, 0, 4]), "codeOnlyBuffer"), Vu = St(72), zu = St(83), Yu = St(88), Zu = St(99), Ju = {
        startup: Bu,
        password: Ru,
        requestSsl: Lu,
        sendSASLInitialResponseMessage: Fu,
        sendSCRAMClientFinalMessage: Mu,
        query: Du,
        parse: ku,
        bind: Ou,
        execute: Nu,
        describe: Hu,
        close: Gu,
        flush: () => Vu,
        sync: () => zu,
        end: () => Yu,
        copyData: $u,
        copyDone: () => Zu,
        copyFail: Ku,
        cancel: Qu
      };
      xt.serialize = Ju;
    });
    var Ss = I((Et) => {
      "use strict";
      p2();
      Object.defineProperty(Et, "__esModule", { value: true });
      Et.BufferReader = void 0;
      var Xu = d.allocUnsafe(0), nn = class nn {
        constructor(e = 0) {
          this.offset = e, this.buffer = Xu, this.encoding = "utf-8";
        }
        setBuffer(e, t) {
          this.offset = e, this.buffer = t;
        }
        int16() {
          let e = this.buffer.readInt16BE(this.offset);
          return this.offset += 2, e;
        }
        byte() {
          let e = this.buffer[this.offset];
          return this.offset++, e;
        }
        int32() {
          let e = this.buffer.readInt32BE(this.offset);
          return this.offset += 4, e;
        }
        string(e) {
          let t = this.buffer.toString(this.encoding, this.offset, this.offset + e);
          return this.offset += e, t;
        }
        cstring() {
          let e = this.offset, t = e;
          for (; this.buffer[t++] !== 0; )
            ;
          return this.offset = t, this.buffer.toString(this.encoding, e, t - 1);
        }
        bytes(e) {
          let t = this.buffer.slice(this.offset, this.offset + e);
          return this.offset += e, t;
        }
      };
      a(nn, "BufferReader");
      var rn = nn;
      Et.BufferReader = rn;
    });
    var xs = {};
    Y(xs, { default: () => ec });
    var ec;
    var Es = W(() => {
      p2();
      ec = {};
    });
    var As = I((ke) => {
      "use strict";
      p2();
      var tc = ke && ke.__importDefault || function(r) {
        return r && r.__esModule ? r : { default: r };
      };
      Object.defineProperty(ke, "__esModule", { value: true });
      ke.Parser = void 0;
      var D = Zr(), rc = Ss(), nc = tc((Es(), U(xs))), sn = 1, ic = 4, vs = sn + ic, _s = d.allocUnsafe(
        0
      ), an = class an {
        constructor(e) {
          if (this.buffer = _s, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new rc.BufferReader(), e?.mode === "binary")
            throw new Error("Binary mode not supported yet");
          this.mode = e?.mode || "text";
        }
        parse(e, t) {
          this.mergeBuffer(e);
          let n = this.bufferOffset + this.bufferLength, i = this.bufferOffset;
          for (; i + vs <= n; ) {
            let s2 = this.buffer[i], o = this.buffer.readUInt32BE(i + sn), u = sn + o;
            if (u + i <= n) {
              let c2 = this.handlePacket(
                i + vs,
                s2,
                o,
                this.buffer
              );
              t(c2), i += u;
            } else
              break;
          }
          i === n ? (this.buffer = _s, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = n - i, this.bufferOffset = i);
        }
        mergeBuffer(e) {
          if (this.bufferLength > 0) {
            let t = this.bufferLength + e.byteLength;
            if (t + this.bufferOffset > this.buffer.byteLength) {
              let i;
              if (t <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength)
                i = this.buffer;
              else {
                let s2 = this.buffer.byteLength * 2;
                for (; t >= s2; )
                  s2 *= 2;
                i = d.allocUnsafe(s2);
              }
              this.buffer.copy(i, 0, this.bufferOffset, this.bufferOffset + this.bufferLength), this.buffer = i, this.bufferOffset = 0;
            }
            e.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = t;
          } else
            this.buffer = e, this.bufferOffset = 0, this.bufferLength = e.byteLength;
        }
        handlePacket(e, t, n, i) {
          switch (t) {
            case 50:
              return D.bindComplete;
            case 49:
              return D.parseComplete;
            case 51:
              return D.closeComplete;
            case 110:
              return D.noData;
            case 115:
              return D.portalSuspended;
            case 99:
              return D.copyDone;
            case 87:
              return D.replicationStart;
            case 73:
              return D.emptyQuery;
            case 68:
              return this.parseDataRowMessage(e, n, i);
            case 67:
              return this.parseCommandCompleteMessage(
                e,
                n,
                i
              );
            case 90:
              return this.parseReadyForQueryMessage(e, n, i);
            case 65:
              return this.parseNotificationMessage(e, n, i);
            case 82:
              return this.parseAuthenticationResponse(
                e,
                n,
                i
              );
            case 83:
              return this.parseParameterStatusMessage(e, n, i);
            case 75:
              return this.parseBackendKeyData(e, n, i);
            case 69:
              return this.parseErrorMessage(e, n, i, "error");
            case 78:
              return this.parseErrorMessage(e, n, i, "notice");
            case 84:
              return this.parseRowDescriptionMessage(
                e,
                n,
                i
              );
            case 116:
              return this.parseParameterDescriptionMessage(e, n, i);
            case 71:
              return this.parseCopyInMessage(e, n, i);
            case 72:
              return this.parseCopyOutMessage(e, n, i);
            case 100:
              return this.parseCopyData(e, n, i);
            default:
              nc.default.fail(`unknown message code: ${t.toString(16)}`);
          }
        }
        parseReadyForQueryMessage(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.string(1);
          return new D.ReadyForQueryMessage(t, i);
        }
        parseCommandCompleteMessage(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.cstring();
          return new D.CommandCompleteMessage(
            t,
            i
          );
        }
        parseCopyData(e, t, n) {
          let i = n.slice(e, e + (t - 4));
          return new D.CopyDataMessage(
            t,
            i
          );
        }
        parseCopyInMessage(e, t, n) {
          return this.parseCopyMessage(e, t, n, "copyInResponse");
        }
        parseCopyOutMessage(e, t, n) {
          return this.parseCopyMessage(e, t, n, "copyOutResponse");
        }
        parseCopyMessage(e, t, n, i) {
          this.reader.setBuffer(e, n);
          let s2 = this.reader.byte() !== 0, o = this.reader.int16(), u = new D.CopyResponse(t, i, s2, o);
          for (let c2 = 0; c2 < o; c2++)
            u.columnTypes[c2] = this.reader.int16();
          return u;
        }
        parseNotificationMessage(e, t, n) {
          this.reader.setBuffer(
            e,
            n
          );
          let i = this.reader.int32(), s2 = this.reader.cstring(), o = this.reader.cstring();
          return new D.NotificationResponseMessage(t, i, s2, o);
        }
        parseRowDescriptionMessage(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.int16(), s2 = new D.RowDescriptionMessage(t, i);
          for (let o = 0; o < i; o++)
            s2.fields[o] = this.parseField();
          return s2;
        }
        parseField() {
          let e = this.reader.cstring(), t = this.reader.int32(), n = this.reader.int16(), i = this.reader.int32(), s2 = this.reader.int16(), o = this.reader.int32(), u = this.reader.int16() === 0 ? "text" : "binary";
          return new D.Field(e, t, n, i, s2, o, u);
        }
        parseParameterDescriptionMessage(e, t, n) {
          this.reader.setBuffer(
            e,
            n
          );
          let i = this.reader.int16(), s2 = new D.ParameterDescriptionMessage(t, i);
          for (let o = 0; o < i; o++)
            s2.dataTypeIDs[o] = this.reader.int32();
          return s2;
        }
        parseDataRowMessage(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.int16(), s2 = new Array(i);
          for (let o = 0; o < i; o++) {
            let u = this.reader.int32();
            s2[o] = u === -1 ? null : this.reader.string(u);
          }
          return new D.DataRowMessage(
            t,
            s2
          );
        }
        parseParameterStatusMessage(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.cstring(), s2 = this.reader.cstring();
          return new D.ParameterStatusMessage(t, i, s2);
        }
        parseBackendKeyData(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.int32(), s2 = this.reader.int32();
          return new D.BackendKeyDataMessage(t, i, s2);
        }
        parseAuthenticationResponse(e, t, n) {
          this.reader.setBuffer(
            e,
            n
          );
          let i = this.reader.int32(), s2 = { name: "authenticationOk", length: t };
          switch (i) {
            case 0:
              break;
            case 3:
              s2.length === 8 && (s2.name = "authenticationCleartextPassword");
              break;
            case 5:
              if (s2.length === 12) {
                s2.name = "authenticationMD5Password";
                let u = this.reader.bytes(4);
                return new D.AuthenticationMD5Password(t, u);
              }
              break;
            case 10:
              s2.name = "authenticationSASL", s2.mechanisms = [];
              let o;
              do
                o = this.reader.cstring(), o && s2.mechanisms.push(o);
              while (o);
              break;
            case 11:
              s2.name = "authenticationSASLContinue", s2.data = this.reader.string(t - 8);
              break;
            case 12:
              s2.name = "authenticationSASLFinal", s2.data = this.reader.string(t - 8);
              break;
            default:
              throw new Error("Unknown authenticationOk message type " + i);
          }
          return s2;
        }
        parseErrorMessage(e, t, n, i) {
          this.reader.setBuffer(e, n);
          let s2 = {}, o = this.reader.string(1);
          for (; o !== "\0"; )
            s2[o] = this.reader.cstring(), o = this.reader.string(1);
          let u = s2.M, c2 = i === "notice" ? new D.NoticeMessage(
            t,
            u
          ) : new D.DatabaseError(u, t, i);
          return c2.severity = s2.S, c2.code = s2.C, c2.detail = s2.D, c2.hint = s2.H, c2.position = s2.P, c2.internalPosition = s2.p, c2.internalQuery = s2.q, c2.where = s2.W, c2.schema = s2.s, c2.table = s2.t, c2.column = s2.c, c2.dataType = s2.d, c2.constraint = s2.n, c2.file = s2.F, c2.line = s2.L, c2.routine = s2.R, c2;
        }
      };
      a(an, "Parser");
      var on = an;
      ke.Parser = on;
    });
    var un = I((we) => {
      "use strict";
      p2();
      Object.defineProperty(we, "__esModule", { value: true });
      we.DatabaseError = we.serialize = we.parse = void 0;
      var sc = Zr();
      Object.defineProperty(
        we,
        "DatabaseError",
        { enumerable: true, get: function() {
          return sc.DatabaseError;
        } }
      );
      var oc = bs();
      Object.defineProperty(we, "serialize", { enumerable: true, get: function() {
        return oc.serialize;
      } });
      var ac = As();
      function uc(r, e) {
        let t = new ac.Parser();
        return r.on("data", (n) => t.parse(
          n,
          e
        )), new Promise((n) => r.on("end", () => n()));
      }
      a(uc, "parse");
      we.parse = uc;
    });
    var Cs = {};
    Y(Cs, { connect: () => cc });
    function cc({ socket: r, servername: e }) {
      return r.startTls(
        e
      ), r;
    }
    var Is = W(() => {
      p2();
      a(cc, "connect");
    });
    var ln = I((sf, Bs) => {
      "use strict";
      p2();
      var Ts = (ut(), U(si)), hc = ye().EventEmitter, {
        parse: lc,
        serialize: N
      } = un(), Ps = N.flush(), fc = N.sync(), pc = N.end(), hn = class hn extends hc {
        constructor(e) {
          super(), e = e || {}, this.stream = e.stream || new Ts.Socket(), this._keepAlive = e.keepAlive, this._keepAliveInitialDelayMillis = e.keepAliveInitialDelayMillis, this.lastBuffer = false, this.parsedStatements = {}, this.ssl = e.ssl || false, this._ending = false, this._emitMessage = false;
          var t = this;
          this.on("newListener", function(n) {
            n === "message" && (t._emitMessage = true);
          });
        }
        connect(e, t) {
          var n = this;
          this._connecting = true, this.stream.setNoDelay(true), this.stream.connect(
            e,
            t
          ), this.stream.once("connect", function() {
            n._keepAlive && n.stream.setKeepAlive(
              true,
              n._keepAliveInitialDelayMillis
            ), n.emit("connect");
          });
          let i = a(function(s2) {
            n._ending && (s2.code === "ECONNRESET" || s2.code === "EPIPE") || n.emit("error", s2);
          }, "reportStreamError");
          if (this.stream.on("error", i), this.stream.on("close", function() {
            n.emit("end");
          }), !this.ssl)
            return this.attachListeners(this.stream);
          this.stream.once("data", function(s2) {
            var o = s2.toString("utf8");
            switch (o) {
              case "S":
                break;
              case "N":
                return n.stream.end(), n.emit("error", new Error("The server does not support SSL connections"));
              default:
                return n.stream.end(), n.emit("error", new Error("There was an error establishing an SSL connection"));
            }
            var u = (Is(), U(Cs));
            let c2 = { socket: n.stream };
            n.ssl !== true && (Object.assign(
              c2,
              n.ssl
            ), "key" in n.ssl && (c2.key = n.ssl.key)), Ts.isIP(t) === 0 && (c2.servername = t);
            try {
              n.stream = u.connect(c2);
            } catch (h) {
              return n.emit("error", h);
            }
            n.attachListeners(n.stream), n.stream.on("error", i), n.emit("sslconnect");
          });
        }
        attachListeners(e) {
          e.on("end", () => {
            this.emit("end");
          }), lc(e, (t) => {
            var n = t.name === "error" ? "errorMessage" : t.name;
            this._emitMessage && this.emit("message", t), this.emit(n, t);
          });
        }
        requestSsl() {
          this.stream.write(N.requestSsl());
        }
        startup(e) {
          this.stream.write(N.startup(e));
        }
        cancel(e, t) {
          this._send(N.cancel(e, t));
        }
        password(e) {
          this._send(N.password(e));
        }
        sendSASLInitialResponseMessage(e, t) {
          this._send(N.sendSASLInitialResponseMessage(
            e,
            t
          ));
        }
        sendSCRAMClientFinalMessage(e) {
          this._send(N.sendSCRAMClientFinalMessage(e));
        }
        _send(e) {
          return this.stream.writable ? this.stream.write(e) : false;
        }
        query(e) {
          this._send(N.query(
            e
          ));
        }
        parse(e) {
          this._send(N.parse(e));
        }
        bind(e) {
          this._send(N.bind(e));
        }
        execute(e) {
          this._send(N.execute(e));
        }
        flush() {
          this.stream.writable && this.stream.write(Ps);
        }
        sync() {
          this._ending = true, this._send(Ps), this._send(fc);
        }
        ref() {
          this.stream.ref();
        }
        unref() {
          this.stream.unref();
        }
        end() {
          if (this._ending = true, !this._connecting || !this.stream.writable) {
            this.stream.end();
            return;
          }
          return this.stream.write(pc, () => {
            this.stream.end();
          });
        }
        close(e) {
          this._send(N.close(e));
        }
        describe(e) {
          this._send(N.describe(e));
        }
        sendCopyFromChunk(e) {
          this._send(N.copyData(e));
        }
        endCopyFrom() {
          this._send(N.copyDone());
        }
        sendCopyFail(e) {
          this._send(N.copyFail(e));
        }
      };
      a(hn, "Connection");
      var cn = hn;
      Bs.exports = cn;
    });
    var Fs = I((cf, Rs) => {
      "use strict";
      p2();
      var dc = ye().EventEmitter, uf = (et(), U(Xe)), yc = Ze(), fn = Hi(), mc = ts(), gc = dr(), wc = wt(), Ls = ms(), bc = Ye(), Sc = ln(), pn = class pn extends dc {
        constructor(e) {
          super(), this.connectionParameters = new wc(e), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: this.connectionParameters.password }), this.replication = this.connectionParameters.replication;
          var t = e || {};
          this._Promise = t.Promise || w.Promise, this._types = new gc(t.types), this._ending = false, this._connecting = false, this._connected = false, this._connectionError = false, this._queryable = true, this.connection = t.connection || new Sc({ stream: t.stream, ssl: this.connectionParameters.ssl, keepAlive: t.keepAlive || false, keepAliveInitialDelayMillis: t.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = t.binary || bc.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || false, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this._connectionTimeoutMillis = t.connectionTimeoutMillis || 0;
        }
        _errorAllQueries(e) {
          let t = a(
            (n) => {
              y.nextTick(() => {
                n.handleError(e, this.connection);
              });
            },
            "enqueueError"
          );
          this.activeQuery && (t(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(t), this.queryQueue.length = 0;
        }
        _connect(e) {
          var t = this, n = this.connection;
          if (this._connectionCallback = e, this._connecting || this._connected) {
            let i = new Error("Client has already been connected. You cannot reuse a client.");
            y.nextTick(() => {
              e(i);
            });
            return;
          }
          this._connecting = true, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
            n._ending = true, n.stream.destroy(new Error("timeout expired"));
          }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
            t.ssl ? n.requestSsl() : n.startup(t.getStartupConf());
          }), n.on("sslconnect", function() {
            n.startup(t.getStartupConf());
          }), this._attachListeners(n), n.once("end", () => {
            let i = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
            clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(i), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(i) : this._handleErrorEvent(i) : this._connectionError || this._handleErrorEvent(
              i
            )), y.nextTick(() => {
              this.emit("end");
            });
          });
        }
        connect(e) {
          if (e) {
            this._connect(e);
            return;
          }
          return new this._Promise((t, n) => {
            this._connect((i) => {
              i ? n(i) : t();
            });
          });
        }
        _attachListeners(e) {
          e.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), e.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), e.on("authenticationSASL", this._handleAuthSASL.bind(this)), e.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), e.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), e.on("backendKeyData", this._handleBackendKeyData.bind(this)), e.on("error", this._handleErrorEvent.bind(this)), e.on(
            "errorMessage",
            this._handleErrorMessage.bind(this)
          ), e.on("readyForQuery", this._handleReadyForQuery.bind(this)), e.on("notice", this._handleNotice.bind(this)), e.on("rowDescription", this._handleRowDescription.bind(this)), e.on("dataRow", this._handleDataRow.bind(this)), e.on("portalSuspended", this._handlePortalSuspended.bind(this)), e.on(
            "emptyQuery",
            this._handleEmptyQuery.bind(this)
          ), e.on("commandComplete", this._handleCommandComplete.bind(this)), e.on("parseComplete", this._handleParseComplete.bind(this)), e.on("copyInResponse", this._handleCopyInResponse.bind(this)), e.on("copyData", this._handleCopyData.bind(this)), e.on("notification", this._handleNotification.bind(this));
        }
        _checkPgPass(e) {
          let t = this.connection;
          typeof this.password == "function" ? this._Promise.resolve().then(
            () => this.password()
          ).then((n) => {
            if (n !== void 0) {
              if (typeof n != "string") {
                t.emit("error", new TypeError("Password must be a string"));
                return;
              }
              this.connectionParameters.password = this.password = n;
            } else
              this.connectionParameters.password = this.password = null;
            e();
          }).catch((n) => {
            t.emit("error", n);
          }) : this.password !== null ? e() : mc(
            this.connectionParameters,
            (n) => {
              n !== void 0 && (this.connectionParameters.password = this.password = n), e();
            }
          );
        }
        _handleAuthCleartextPassword(e) {
          this._checkPgPass(() => {
            this.connection.password(this.password);
          });
        }
        _handleAuthMD5Password(e) {
          this._checkPgPass(() => {
            let t = yc.postgresMd5PasswordHash(
              this.user,
              this.password,
              e.salt
            );
            this.connection.password(t);
          });
        }
        _handleAuthSASL(e) {
          this._checkPgPass(() => {
            this.saslSession = fn.startSession(e.mechanisms), this.connection.sendSASLInitialResponseMessage(
              this.saslSession.mechanism,
              this.saslSession.response
            );
          });
        }
        _handleAuthSASLContinue(e) {
          fn.continueSession(this.saslSession, this.password, e.data), this.connection.sendSCRAMClientFinalMessage(
            this.saslSession.response
          );
        }
        _handleAuthSASLFinal(e) {
          fn.finalizeSession(
            this.saslSession,
            e.data
          ), this.saslSession = null;
        }
        _handleBackendKeyData(e) {
          this.processID = e.processID, this.secretKey = e.secretKey;
        }
        _handleReadyForQuery(e) {
          this._connecting && (this._connecting = false, this._connected = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback && (this._connectionCallback(null, this), this._connectionCallback = null), this.emit("connect"));
          let { activeQuery: t } = this;
          this.activeQuery = null, this.readyForQuery = true, t && t.handleReadyForQuery(this.connection), this._pulseQueryQueue();
        }
        _handleErrorWhileConnecting(e) {
          if (!this._connectionError) {
            if (this._connectionError = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback)
              return this._connectionCallback(e);
            this.emit("error", e);
          }
        }
        _handleErrorEvent(e) {
          if (this._connecting)
            return this._handleErrorWhileConnecting(e);
          this._queryable = false, this._errorAllQueries(e), this.emit("error", e);
        }
        _handleErrorMessage(e) {
          if (this._connecting)
            return this._handleErrorWhileConnecting(e);
          let t = this.activeQuery;
          if (!t) {
            this._handleErrorEvent(
              e
            );
            return;
          }
          this.activeQuery = null, t.handleError(e, this.connection);
        }
        _handleRowDescription(e) {
          this.activeQuery.handleRowDescription(e);
        }
        _handleDataRow(e) {
          this.activeQuery.handleDataRow(
            e
          );
        }
        _handlePortalSuspended(e) {
          this.activeQuery.handlePortalSuspended(this.connection);
        }
        _handleEmptyQuery(e) {
          this.activeQuery.handleEmptyQuery(this.connection);
        }
        _handleCommandComplete(e) {
          this.activeQuery.handleCommandComplete(e, this.connection);
        }
        _handleParseComplete(e) {
          this.activeQuery.name && (this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text);
        }
        _handleCopyInResponse(e) {
          this.activeQuery.handleCopyInResponse(
            this.connection
          );
        }
        _handleCopyData(e) {
          this.activeQuery.handleCopyData(e, this.connection);
        }
        _handleNotification(e) {
          this.emit("notification", e);
        }
        _handleNotice(e) {
          this.emit("notice", e);
        }
        getStartupConf() {
          var e = this.connectionParameters, t = { user: e.user, database: e.database }, n = e.application_name || e.fallback_application_name;
          return n && (t.application_name = n), e.replication && (t.replication = "" + e.replication), e.statement_timeout && (t.statement_timeout = String(parseInt(
            e.statement_timeout,
            10
          ))), e.lock_timeout && (t.lock_timeout = String(parseInt(e.lock_timeout, 10))), e.idle_in_transaction_session_timeout && (t.idle_in_transaction_session_timeout = String(parseInt(
            e.idle_in_transaction_session_timeout,
            10
          ))), e.options && (t.options = e.options), t;
        }
        cancel(e, t) {
          if (e.activeQuery === t) {
            var n = this.connection;
            this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
              n.cancel(
                e.processID,
                e.secretKey
              );
            });
          } else
            e.queryQueue.indexOf(t) !== -1 && e.queryQueue.splice(e.queryQueue.indexOf(t), 1);
        }
        setTypeParser(e, t, n) {
          return this._types.setTypeParser(e, t, n);
        }
        getTypeParser(e, t) {
          return this._types.getTypeParser(e, t);
        }
        escapeIdentifier(e) {
          return '"' + e.replace(
            /"/g,
            '""'
          ) + '"';
        }
        escapeLiteral(e) {
          for (var t = false, n = "'", i = 0; i < e.length; i++) {
            var s2 = e[i];
            s2 === "'" ? n += s2 + s2 : s2 === "\\" ? (n += s2 + s2, t = true) : n += s2;
          }
          return n += "'", t === true && (n = " E" + n), n;
        }
        _pulseQueryQueue() {
          if (this.readyForQuery === true)
            if (this.activeQuery = this.queryQueue.shift(), this.activeQuery) {
              this.readyForQuery = false, this.hasExecuted = true;
              let e = this.activeQuery.submit(this.connection);
              e && y.nextTick(() => {
                this.activeQuery.handleError(e, this.connection), this.readyForQuery = true, this._pulseQueryQueue();
              });
            } else
              this.hasExecuted && (this.activeQuery = null, this.emit("drain"));
        }
        query(e, t, n) {
          var i, s2, o, u, c2;
          if (e == null)
            throw new TypeError("Client was passed a null or undefined query");
          return typeof e.submit == "function" ? (o = e.query_timeout || this.connectionParameters.query_timeout, s2 = i = e, typeof t == "function" && (i.callback = i.callback || t)) : (o = this.connectionParameters.query_timeout, i = new Ls(
            e,
            t,
            n
          ), i.callback || (s2 = new this._Promise((h, f2) => {
            i.callback = (m2, x) => m2 ? f2(m2) : h(x);
          }))), o && (c2 = i.callback, u = setTimeout(() => {
            var h = new Error("Query read timeout");
            y.nextTick(
              () => {
                i.handleError(h, this.connection);
              }
            ), c2(h), i.callback = () => {
            };
            var f2 = this.queryQueue.indexOf(i);
            f2 > -1 && this.queryQueue.splice(f2, 1), this._pulseQueryQueue();
          }, o), i.callback = (h, f2) => {
            clearTimeout(u), c2(h, f2);
          }), this.binary && !i.binary && (i.binary = true), i._result && !i._result._types && (i._result._types = this._types), this._queryable ? this._ending ? (y.nextTick(() => {
            i.handleError(
              new Error("Client was closed and is not queryable"),
              this.connection
            );
          }), s2) : (this.queryQueue.push(i), this._pulseQueryQueue(), s2) : (y.nextTick(
            () => {
              i.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
            }
          ), s2);
        }
        ref() {
          this.connection.ref();
        }
        unref() {
          this.connection.unref();
        }
        end(e) {
          if (this._ending = true, !this.connection._connecting)
            if (e)
              e();
            else
              return this._Promise.resolve();
          if (this.activeQuery || !this._queryable ? this.connection.stream.destroy() : this.connection.end(), e)
            this.connection.once("end", e);
          else
            return new this._Promise((t) => {
              this.connection.once("end", t);
            });
        }
      };
      a(pn, "Client");
      var vt = pn;
      vt.Query = Ls;
      Rs.exports = vt;
    });
    var Us = I((ff, ks) => {
      "use strict";
      p2();
      var xc = ye().EventEmitter, Ms = a(function() {
      }, "NOOP"), Ds = a(
        (r, e) => {
          let t = r.findIndex(e);
          return t === -1 ? void 0 : r.splice(t, 1)[0];
        },
        "removeWhere"
      ), mn = class mn {
        constructor(e, t, n) {
          this.client = e, this.idleListener = t, this.timeoutId = n;
        }
      };
      a(mn, "IdleItem");
      var dn = mn, gn = class gn {
        constructor(e) {
          this.callback = e;
        }
      };
      a(gn, "PendingItem");
      var Ue = gn;
      function Ec() {
        throw new Error("Release called on client which has already been released to the pool.");
      }
      a(Ec, "throwOnDoubleRelease");
      function _t(r, e) {
        if (e)
          return { callback: e, result: void 0 };
        let t, n, i = a(function(o, u) {
          o ? t(o) : n(u);
        }, "cb"), s2 = new r(function(o, u) {
          n = o, t = u;
        }).catch((o) => {
          throw Error.captureStackTrace(
            o
          ), o;
        });
        return { callback: i, result: s2 };
      }
      a(_t, "promisify");
      function vc(r, e) {
        return a(
          function t(n) {
            n.client = e, e.removeListener("error", t), e.on("error", () => {
              r.log("additional client error after disconnection due to error", n);
            }), r._remove(e), r.emit("error", n, e);
          },
          "idleListener"
        );
      }
      a(vc, "makeIdleListener");
      var wn = class wn extends xc {
        constructor(e, t) {
          super(), this.options = Object.assign({}, e), e != null && "password" in e && Object.defineProperty(
            this.options,
            "password",
            { configurable: true, enumerable: false, writable: true, value: e.password }
          ), e != null && e.ssl && e.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: false }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || false, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
          }, this.Client = this.options.Client || t || At().Client, this.Promise = this.options.Promise || w.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = false, this.ended = false;
        }
        _isFull() {
          return this._clients.length >= this.options.max;
        }
        _pulseQueue() {
          if (this.log("pulse queue"), this.ended) {
            this.log("pulse queue ended");
            return;
          }
          if (this.ending) {
            this.log(
              "pulse queue on ending"
            ), this._idle.length && this._idle.slice().map((t) => {
              this._remove(
                t.client
              );
            }), this._clients.length || (this.ended = true, this._endCallback());
            return;
          }
          if (!this._pendingQueue.length) {
            this.log("no queued requests");
            return;
          }
          if (!this._idle.length && this._isFull())
            return;
          let e = this._pendingQueue.shift();
          if (this._idle.length) {
            let t = this._idle.pop();
            clearTimeout(t.timeoutId);
            let n = t.client;
            n.ref && n.ref();
            let i = t.idleListener;
            return this._acquireClient(n, e, i, false);
          }
          if (!this._isFull())
            return this.newClient(e);
          throw new Error("unexpected condition");
        }
        _remove(e) {
          let t = Ds(this._idle, (n) => n.client === e);
          t !== void 0 && clearTimeout(t.timeoutId), this._clients = this._clients.filter((n) => n !== e), e.end(), this.emit("remove", e);
        }
        connect(e) {
          if (this.ending) {
            let i = new Error("Cannot use a pool after calling end on the pool");
            return e ? e(i) : this.Promise.reject(
              i
            );
          }
          let t = _t(this.Promise, e), n = t.result;
          if (this._isFull() || this._idle.length) {
            if (this._idle.length && y.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis)
              return this._pendingQueue.push(new Ue(t.callback)), n;
            let i = a((u, c2, h) => {
              clearTimeout(
                o
              ), t.callback(u, c2, h);
            }, "queueCallback"), s2 = new Ue(i), o = setTimeout(() => {
              Ds(
                this._pendingQueue,
                (u) => u.callback === i
              ), s2.timedOut = true, t.callback(new Error("timeout exceeded when trying to connect"));
            }, this.options.connectionTimeoutMillis);
            return this._pendingQueue.push(s2), n;
          }
          return this.newClient(new Ue(t.callback)), n;
        }
        newClient(e) {
          let t = new this.Client(this.options);
          this._clients.push(t);
          let n = vc(this, t);
          this.log("checking client timeout");
          let i, s2 = false;
          this.options.connectionTimeoutMillis && (i = setTimeout(() => {
            this.log("ending client due to timeout"), s2 = true, t.connection ? t.connection.stream.destroy() : t.end();
          }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), t.connect((o) => {
            if (i && clearTimeout(i), t.on("error", n), o)
              this.log("client failed to connect", o), this._clients = this._clients.filter((u) => u !== t), s2 && (o.message = "Connection terminated due to connection timeout"), this._pulseQueue(), e.timedOut || e.callback(
                o,
                void 0,
                Ms
              );
            else {
              if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
                let u = setTimeout(() => {
                  this.log("ending client due to expired lifetime"), this._expired.add(t), this._idle.findIndex((h) => h.client === t) !== -1 && this._acquireClient(
                    t,
                    new Ue((h, f2, m2) => m2()),
                    n,
                    false
                  );
                }, this.options.maxLifetimeSeconds * 1e3);
                u.unref(), t.once(
                  "end",
                  () => clearTimeout(u)
                );
              }
              return this._acquireClient(t, e, n, true);
            }
          });
        }
        _acquireClient(e, t, n, i) {
          i && this.emit("connect", e), this.emit("acquire", e), e.release = this._releaseOnce(e, n), e.removeListener("error", n), t.timedOut ? i && this.options.verify ? this.options.verify(
            e,
            e.release
          ) : e.release() : i && this.options.verify ? this.options.verify(e, (s2) => {
            if (s2)
              return e.release(s2), t.callback(s2, void 0, Ms);
            t.callback(void 0, e, e.release);
          }) : t.callback(
            void 0,
            e,
            e.release
          );
        }
        _releaseOnce(e, t) {
          let n = false;
          return (i) => {
            n && Ec(), n = true, this._release(
              e,
              t,
              i
            );
          };
        }
        _release(e, t, n) {
          if (e.on("error", t), e._poolUseCount = (e._poolUseCount || 0) + 1, this.emit("release", n, e), n || this.ending || !e._queryable || e._ending || e._poolUseCount >= this.options.maxUses) {
            e._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(e), this._pulseQueue();
            return;
          }
          if (this._expired.has(e)) {
            this.log("remove expired client"), this._expired.delete(e), this._remove(e), this._pulseQueue();
            return;
          }
          let s2;
          this.options.idleTimeoutMillis && (s2 = setTimeout(() => {
            this.log("remove idle client"), this._remove(e);
          }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && s2.unref()), this.options.allowExitOnIdle && e.unref(), this._idle.push(new dn(e, t, s2)), this._pulseQueue();
        }
        query(e, t, n) {
          if (typeof e == "function") {
            let s2 = _t(this.Promise, e);
            return b(function() {
              return s2.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
            }), s2.result;
          }
          typeof t == "function" && (n = t, t = void 0);
          let i = _t(this.Promise, n);
          return n = i.callback, this.connect((s2, o) => {
            if (s2)
              return n(s2);
            let u = false, c2 = a((h) => {
              u || (u = true, o.release(h), n(h));
            }, "onError");
            o.once("error", c2), this.log("dispatching query");
            try {
              o.query(e, t, (h, f2) => {
                if (this.log("query dispatched"), o.removeListener("error", c2), !u)
                  return u = true, o.release(h), h ? n(h) : n(
                    void 0,
                    f2
                  );
              });
            } catch (h) {
              return o.release(h), n(h);
            }
          }), i.result;
        }
        end(e) {
          if (this.log("ending"), this.ending) {
            let n = new Error("Called end on pool more than once");
            return e ? e(n) : this.Promise.reject(n);
          }
          this.ending = true;
          let t = _t(this.Promise, e);
          return this._endCallback = t.callback, this._pulseQueue(), t.result;
        }
        get waitingCount() {
          return this._pendingQueue.length;
        }
        get idleCount() {
          return this._idle.length;
        }
        get expiredCount() {
          return this._clients.reduce((e, t) => e + (this._expired.has(t) ? 1 : 0), 0);
        }
        get totalCount() {
          return this._clients.length;
        }
      };
      a(wn, "Pool");
      var yn = wn;
      ks.exports = yn;
    });
    var Os = {};
    Y(Os, { default: () => _c5 });
    var _c5;
    var qs = W(() => {
      p2();
      _c5 = {};
    });
    var Ns = I((mf, Ac) => {
      Ac.exports = { name: "pg", version: "8.8.0", description: "PostgreSQL client - pure javascript & libpq with the same API", keywords: [
        "database",
        "libpq",
        "pg",
        "postgre",
        "postgres",
        "postgresql",
        "rdbms"
      ], homepage: "https://github.com/brianc/node-postgres", repository: { type: "git", url: "git://github.com/brianc/node-postgres.git", directory: "packages/pg" }, author: "Brian Carlson <brian.m.carlson@gmail.com>", main: "./lib", dependencies: {
        "buffer-writer": "2.0.0",
        "packet-reader": "1.0.0",
        "pg-connection-string": "^2.5.0",
        "pg-pool": "^3.5.2",
        "pg-protocol": "^1.5.0",
        "pg-types": "^2.1.0",
        pgpass: "1.x"
      }, devDependencies: { async: "2.6.4", bluebird: "3.5.2", co: "4.6.0", "pg-copy-streams": "0.3.0" }, peerDependencies: { "pg-native": ">=3.0.1" }, peerDependenciesMeta: {
        "pg-native": { optional: true }
      }, scripts: { test: "make test-all" }, files: ["lib", "SPONSORS.md"], license: "MIT", engines: { node: ">= 8.0.0" }, gitHead: "c99fb2c127ddf8d712500db2c7b9a5491a178655" };
    });
    var js = I((gf, Ws) => {
      "use strict";
      p2();
      var Qs = ye().EventEmitter, Cc = (et(), U(Xe)), bn = Ze(), Oe = Ws.exports = function(r, e, t) {
        Qs.call(this), r = bn.normalizeQueryConfig(r, e, t), this.text = r.text, this.values = r.values, this.name = r.name, this.callback = r.callback, this.state = "new", this._arrayMode = r.rowMode === "array", this._emitRowEvents = false, this.on("newListener", function(n) {
          n === "row" && (this._emitRowEvents = true);
        }.bind(this));
      };
      Cc.inherits(
        Oe,
        Qs
      );
      var Ic = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
      Oe.prototype.handleError = function(r) {
        var e = this.native.pq.resultErrorFields();
        if (e)
          for (var t in e) {
            var n = Ic[t] || t;
            r[n] = e[t];
          }
        this.callback ? this.callback(r) : this.emit("error", r), this.state = "error";
      };
      Oe.prototype.then = function(r, e) {
        return this._getPromise().then(r, e);
      };
      Oe.prototype.catch = function(r) {
        return this._getPromise().catch(r);
      };
      Oe.prototype._getPromise = function() {
        return this._promise ? this._promise : (this._promise = new Promise(function(r, e) {
          this._once("end", r), this._once(
            "error",
            e
          );
        }.bind(this)), this._promise);
      };
      Oe.prototype.submit = function(r) {
        this.state = "running";
        var e = this;
        this.native = r.native, r.native.arrayMode = this._arrayMode;
        var t = a(
          function(s2, o, u) {
            if (r.native.arrayMode = false, b(function() {
              e.emit("_done");
            }), s2)
              return e.handleError(s2);
            e._emitRowEvents && (u.length > 1 ? o.forEach((c2, h) => {
              c2.forEach((f2) => {
                e.emit(
                  "row",
                  f2,
                  u[h]
                );
              });
            }) : o.forEach(function(c2) {
              e.emit("row", c2, u);
            })), e.state = "end", e.emit(
              "end",
              u
            ), e.callback && e.callback(null, u);
          },
          "after"
        );
        if (y.domain && (t = y.domain.bind(
          t
        )), this.name) {
          this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error(
            "You supplied %s (%s)",
            this.name,
            this.name.length
          ), console.error("This can cause conflicts and silent errors executing queries"));
          var n = (this.values || []).map(bn.prepareValue);
          if (r.namedQueries[this.name]) {
            if (this.text && r.namedQueries[this.name] !== this.text) {
              let s2 = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
              return t(s2);
            }
            return r.native.execute(this.name, n, t);
          }
          return r.native.prepare(
            this.name,
            this.text,
            n.length,
            function(s2) {
              return s2 ? t(s2) : (r.namedQueries[e.name] = e.text, e.native.execute(e.name, n, t));
            }
          );
        } else if (this.values) {
          if (!Array.isArray(this.values)) {
            let s2 = new Error("Query values must be an array");
            return t(s2);
          }
          var i = this.values.map(bn.prepareValue);
          r.native.query(this.text, i, t);
        } else
          r.native.query(this.text, t);
      };
    });
    var Ks = I((xf, $s) => {
      "use strict";
      p2();
      var Tc = (qs(), U(Os)), Pc = dr(), Sf = Ns(), Hs = ye().EventEmitter, Bc = (et(), U(Xe)), Lc = wt(), Gs = js(), V = $s.exports = function(r) {
        Hs.call(this), r = r || {}, this._Promise = r.Promise || w.Promise, this._types = new Pc(r.types), this.native = new Tc({ types: this._types }), this._queryQueue = [], this._ending = false, this._connecting = false, this._connected = false, this._queryable = true;
        var e = this.connectionParameters = new Lc(
          r
        );
        this.user = e.user, Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: e.password
        }), this.database = e.database, this.host = e.host, this.port = e.port, this.namedQueries = {};
      };
      V.Query = Gs;
      Bc.inherits(V, Hs);
      V.prototype._errorAllQueries = function(r) {
        let e = a(
          (t) => {
            y.nextTick(() => {
              t.native = this.native, t.handleError(r);
            });
          },
          "enqueueError"
        );
        this._hasActiveQuery() && (e(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(e), this._queryQueue.length = 0;
      };
      V.prototype._connect = function(r) {
        var e = this;
        if (this._connecting) {
          y.nextTick(() => r(new Error("Client has already been connected. You cannot reuse a client.")));
          return;
        }
        this._connecting = true, this.connectionParameters.getLibpqConnectionString(function(t, n) {
          if (t)
            return r(
              t
            );
          e.native.connect(n, function(i) {
            if (i)
              return e.native.end(), r(i);
            e._connected = true, e.native.on("error", function(s2) {
              e._queryable = false, e._errorAllQueries(s2), e.emit("error", s2);
            }), e.native.on("notification", function(s2) {
              e.emit("notification", { channel: s2.relname, payload: s2.extra });
            }), e.emit("connect"), e._pulseQueryQueue(true), r();
          });
        });
      };
      V.prototype.connect = function(r) {
        if (r) {
          this._connect(r);
          return;
        }
        return new this._Promise(
          (e, t) => {
            this._connect((n) => {
              n ? t(n) : e();
            });
          }
        );
      };
      V.prototype.query = function(r, e, t) {
        var n, i, s2, o, u;
        if (r == null)
          throw new TypeError("Client was passed a null or undefined query");
        if (typeof r.submit == "function")
          s2 = r.query_timeout || this.connectionParameters.query_timeout, i = n = r, typeof e == "function" && (r.callback = e);
        else if (s2 = this.connectionParameters.query_timeout, n = new Gs(r, e, t), !n.callback) {
          let c2, h;
          i = new this._Promise((f2, m2) => {
            c2 = f2, h = m2;
          }), n.callback = (f2, m2) => f2 ? h(f2) : c2(m2);
        }
        return s2 && (u = n.callback, o = setTimeout(() => {
          var c2 = new Error("Query read timeout");
          y.nextTick(() => {
            n.handleError(c2, this.connection);
          }), u(c2), n.callback = () => {
          };
          var h = this._queryQueue.indexOf(n);
          h > -1 && this._queryQueue.splice(h, 1), this._pulseQueryQueue();
        }, s2), n.callback = (c2, h) => {
          clearTimeout(o), u(c2, h);
        }), this._queryable ? this._ending ? (n.native = this.native, y.nextTick(() => {
          n.handleError(
            new Error("Client was closed and is not queryable")
          );
        }), i) : (this._queryQueue.push(
          n
        ), this._pulseQueryQueue(), i) : (n.native = this.native, y.nextTick(() => {
          n.handleError(
            new Error("Client has encountered a connection error and is not queryable")
          );
        }), i);
      };
      V.prototype.end = function(r) {
        var e = this;
        this._ending = true, this._connected || this.once(
          "connect",
          this.end.bind(this, r)
        );
        var t;
        return r || (t = new this._Promise(function(n, i) {
          r = a((s2) => s2 ? i(s2) : n(), "cb");
        })), this.native.end(function() {
          e._errorAllQueries(new Error(
            "Connection terminated"
          )), y.nextTick(() => {
            e.emit("end"), r && r();
          });
        }), t;
      };
      V.prototype._hasActiveQuery = function() {
        return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
      };
      V.prototype._pulseQueryQueue = function(r) {
        if (this._connected && !this._hasActiveQuery()) {
          var e = this._queryQueue.shift();
          if (!e) {
            r || this.emit("drain");
            return;
          }
          this._activeQuery = e, e.submit(this);
          var t = this;
          e.once(
            "_done",
            function() {
              t._pulseQueryQueue();
            }
          );
        }
      };
      V.prototype.cancel = function(r) {
        this._activeQuery === r ? this.native.cancel(function() {
        }) : this._queryQueue.indexOf(r) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(r), 1);
      };
      V.prototype.ref = function() {
      };
      V.prototype.unref = function() {
      };
      V.prototype.setTypeParser = function(r, e, t) {
        return this._types.setTypeParser(r, e, t);
      };
      V.prototype.getTypeParser = function(r, e) {
        return this._types.getTypeParser(r, e);
      };
    });
    var Sn = I((_f2, Vs) => {
      "use strict";
      p2();
      Vs.exports = Ks();
    });
    var At = I((Cf, rt) => {
      "use strict";
      p2();
      var Rc = Fs(), Fc = Ye(), Mc = ln(), Dc = Us(), { DatabaseError: kc } = un(), Uc = a((r) => {
        var e;
        return e = class extends Dc {
          constructor(n) {
            super(n, r);
          }
        }, a(e, "BoundPool"), e;
      }, "poolFactory"), xn = a(function(r) {
        this.defaults = Fc, this.Client = r, this.Query = this.Client.Query, this.Pool = Uc(this.Client), this._pools = [], this.Connection = Mc, this.types = ze(), this.DatabaseError = kc;
      }, "PG");
      typeof y.env.NODE_PG_FORCE_NATIVE < "u" ? rt.exports = new xn(Sn()) : (rt.exports = new xn(Rc), Object.defineProperty(rt.exports, "native", { configurable: true, enumerable: false, get() {
        var r = null;
        try {
          r = new xn(Sn());
        } catch (e) {
          if (e.code !== "MODULE_NOT_FOUND")
            throw e;
        }
        return Object.defineProperty(rt.exports, "native", { value: r }), r;
      } }));
    });
    var qc = {};
    Y(qc, {
      Client: () => Ct,
      ClientBase: () => K.ClientBase,
      Connection: () => K.Connection,
      DatabaseError: () => K.DatabaseError,
      Pool: () => En,
      Query: () => K.Query,
      defaults: () => K.defaults,
      neon: () => pt,
      neonConfig: () => me,
      types: () => K.types
    });
    module.exports = U(qc);
    p2();
    p2();
    qt();
    ut();
    var qi = Ne(Ze());
    var tr = class tr extends Error {
      constructor() {
        super(...arguments);
        T(this, "name", "NeonDbError");
        T(this, "code", null);
        T(this, "sourceError");
      }
    };
    a(tr, "NeonDbError");
    var Je = tr;
    function pt(r, { arrayMode: e, fullResults: t, fetchOptions: n, queryCallback: i, resultCallback: s2 } = {}) {
      if (!r)
        throw new Error("No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?");
      let o;
      try {
        o = Ot(r);
      } catch {
        throw new Error(
          "Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(r)
        );
      }
      let { protocol: u, username: c2, password: h, hostname: f2, port: m2, pathname: x } = o;
      if (u !== "postgres:" && u !== "postgresql:" || !c2 || !h || !f2 || !x)
        throw new Error("Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value");
      return async function(_, ...P) {
        let k = e ?? false, z2 = t ?? false, ue = n ?? {}, B;
        if (typeof _ == "string") {
          B = _;
          let C = P[1];
          C !== void 0 && (C.arrayMode !== void 0 && (k = C.arrayMode), C.fullResults !== void 0 && (z2 = C.fullResults), C.fetchOptions !== void 0 && (ue = { ...ue, ...C.fetchOptions })), P = P[0] ?? [];
        } else {
          B = "";
          for (let C = 0; C < _.length; C++)
            B += _[C], C < P.length && (B += "$" + (C + 1));
        }
        P = P.map((C) => (0, qi.prepareValue)(C));
        let {
          fetchEndpoint: v,
          fetchConnectionCache: te,
          fetchFunction: be
        } = me, Z = typeof v == "function" ? v(f2, m2) : v, pe = te === true ? { "Neon-Pool-Opt-In": "true" } : {}, re = { query: B, params: P };
        i && i(re);
        let ie = { cache: "no-store" };
        try {
          new Request("x:", ie);
        } catch {
          ie = {};
        }
        let L;
        try {
          L = await (be ?? fetch)(Z, {
            method: "POST",
            body: JSON.stringify(re),
            headers: { "Neon-Connection-String": r, "Neon-Raw-Text-Output": "true", "Neon-Array-Mode": "true", ...pe },
            ...ie,
            ...ue
          });
        } catch (C) {
          let H = new Je(
            `Error connecting to database: ${C.message}`
          );
          throw H.sourceError = C, H;
        }
        if (L.ok) {
          let C = await L.json(), H = C.fields.map((ne2) => ne2.name), ce = C.fields.map((ne2) => K.types.getTypeParser(ne2.dataTypeID)), se = k === true ? C.rows.map((ne2) => ne2.map((he, ve) => he === null ? null : ce[ve](he))) : C.rows.map((ne2) => Object.fromEntries(ne2.map((he, ve) => [H[ve], he === null ? null : ce[ve](he)])));
          return s2 && s2(re, C, se, { arrayMode: k, fullResults: z2 }), z2 ? (C.viaNeonFetch = true, C.rowAsArray = k, C.rows = se, C) : se;
        } else {
          let { status: C } = L;
          if (C === 400) {
            let { message: H, code: ce } = await L.json(), se = new Je(H);
            throw se.code = ce, se;
          } else {
            let H = await L.text();
            throw new Je(`Database error (HTTP status ${C}): ${H}`);
          }
        }
      };
    }
    a(pt, "neon");
    var It = Ne(At());
    ut();
    var zs = Ne(wt());
    var K = Ne(At());
    var vn = class vn extends It.Client {
      constructor(t) {
        super(t);
        this.config = t;
      }
      get neonConfig() {
        return this.connection.stream;
      }
      connect(t) {
        let { neonConfig: n } = this;
        n.forceDisablePgSSL && (this.ssl = this.connection.ssl = false), this.ssl && n.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
        let i = this.config?.host !== void 0 || this.config?.connectionString !== void 0 || y.env.PGHOST !== void 0, s2 = y.env.USER ?? y.env.USERNAME;
        if (!i && this.host === "localhost" && this.user === s2 && this.database === s2 && this.password === null)
          throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s2}, db: ${s2}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
        let o = super.connect(t), u = n.pipelineTLS && this.ssl, c2 = n.pipelineConnect === "password";
        if (!u && !n.pipelineConnect)
          return o;
        let h = this.connection;
        if (u && h.on("connect", () => h.stream.emit("data", "S")), c2) {
          h.removeAllListeners(
            "authenticationCleartextPassword"
          ), h.removeAllListeners("readyForQuery"), h.once(
            "readyForQuery",
            () => h.on("readyForQuery", this._handleReadyForQuery.bind(this))
          );
          let f2 = this.ssl ? "sslconnect" : "connect";
          h.on(f2, () => {
            this._handleAuthCleartextPassword(), this._handleReadyForQuery();
          });
        }
        return o;
      }
      async _handleAuthSASLContinue(t) {
        let n = this.saslSession, i = this.password, s2 = t.data;
        if (n.message !== "SASLInitialResponse" || typeof i != "string" || typeof s2 != "string")
          throw new Error("SASL: protocol error");
        let o = Object.fromEntries(s2.split(",").map((qe) => {
          if (!/^.=/.test(qe))
            throw new Error("SASL: Invalid attribute pair entry");
          let Se = qe[0], Ys = qe.substring(2);
          return [Se, Ys];
        })), u = o.r, c2 = o.s, h = o.i;
        if (!u || !/^[!-+--~]+$/.test(u))
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable");
        if (!c2 || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(c2))
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64");
        if (!h || !/^[1-9][0-9]*$/.test(h))
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count");
        if (!u.startsWith(n.clientNonce))
          throw new Error(
            "SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce"
          );
        if (u.length === n.clientNonce.length)
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
        let f2 = parseInt(h, 10), m2 = d.from(c2, "base64"), x = new TextEncoder(), _ = x.encode(i), P = await g.subtle.importKey("raw", _, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]), k = new Uint8Array(await g.subtle.sign("HMAC", P, d.concat([m2, d.from(
          [0, 0, 0, 1]
        )]))), z2 = k;
        for (var ue = 0; ue < f2 - 1; ue++)
          k = new Uint8Array(await g.subtle.sign(
            "HMAC",
            P,
            k
          )), z2 = d.from(z2.map((qe, Se) => z2[Se] ^ k[Se]));
        let B = z2, v = await g.subtle.importKey(
          "raw",
          B,
          { name: "HMAC", hash: { name: "SHA-256" } },
          false,
          ["sign"]
        ), te = new Uint8Array(await g.subtle.sign("HMAC", v, x.encode("Client Key"))), be = await g.subtle.digest(
          "SHA-256",
          te
        ), Z = "n=*,r=" + n.clientNonce, pe = "r=" + u + ",s=" + c2 + ",i=" + f2, re = "c=biws,r=" + u, ie = Z + "," + pe + "," + re, L = await g.subtle.importKey(
          "raw",
          be,
          { name: "HMAC", hash: { name: "SHA-256" } },
          false,
          ["sign"]
        );
        var C = new Uint8Array(await g.subtle.sign("HMAC", L, x.encode(ie))), H = d.from(te.map((qe, Se) => te[Se] ^ C[Se])), ce = H.toString("base64");
        let se = await g.subtle.importKey("raw", B, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]), ne2 = await g.subtle.sign("HMAC", se, x.encode("Server Key")), he = await g.subtle.importKey("raw", ne2, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
        var ve = d.from(await g.subtle.sign("HMAC", he, x.encode(ie)));
        n.message = "SASLResponse", n.serverSignature = ve.toString("base64"), n.response = re + ",p=" + ce, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
      }
    };
    a(vn, "NeonClient");
    var Ct = vn;
    function Oc(r, e) {
      if (e)
        return {
          callback: e,
          result: void 0
        };
      let t, n, i = a(function(o, u) {
        o ? t(o) : n(u);
      }, "cb"), s2 = new r(function(o, u) {
        n = o, t = u;
      });
      return { callback: i, result: s2 };
    }
    a(Oc, "promisify");
    var _n = class _n extends It.Pool {
      constructor() {
        super(...arguments);
        T(this, "Client", Ct);
        T(this, "hasFetchUnsupportedListeners", false);
      }
      on(t, n) {
        return t !== "error" && (this.hasFetchUnsupportedListeners = true), super.on(t, n);
      }
      query(t, n, i) {
        if (!me.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof t == "function")
          return super.query(t, n, i);
        typeof n == "function" && (i = n, n = void 0);
        let s2 = Oc(
          this.Promise,
          i
        );
        i = s2.callback;
        try {
          let o = new zs.default(this.options), u = encodeURIComponent, c2 = encodeURI, h = `postgresql://${u(o.user)}:${u(o.password)}@${u(o.host)}/${c2(o.database)}`, f2 = typeof t == "string" ? t : t.text, m2 = n ?? t.values ?? [];
          pt(h, { fullResults: true, arrayMode: t.rowMode === "array" })(f2, m2).then((_) => i(void 0, _)).catch((_) => i(_));
        } catch (o) {
          i(o);
        }
        return s2.result;
      }
    };
    a(_n, "NeonPool");
    var En = _n;
  }
});

// node_modules/@neondatabase/serverless/index.mjs
var import_index, Client, ClientBase, Connection, DatabaseError, Pool, Query, defaults, neon, neonConfig, types;
var init_serverless = __esm({
  "node_modules/@neondatabase/serverless/index.mjs"() {
    import_index = __toESM(require_serverless(), 1);
    Client = import_index.default.Client;
    ClientBase = import_index.default.ClientBase;
    Connection = import_index.default.Connection;
    DatabaseError = import_index.default.DatabaseError;
    Pool = import_index.default.Pool;
    Query = import_index.default.Query;
    defaults = import_index.default.defaults;
    neon = import_index.default.neon;
    neonConfig = import_index.default.neonConfig;
    types = import_index.default.types;
  }
});

// node_modules/@vercel/postgres/dist/chunk-O2LRBNW4.js
function postgresConnectionString(type = "pool") {
  let connectionString;
  switch (type) {
    case "pool": {
      connectionString = process.env.POSTGRES_URL;
      break;
    }
    case "direct": {
      connectionString = process.env.POSTGRES_URL_NON_POOLING;
      break;
    }
    default: {
      const _exhaustiveCheck = type;
      const str = _exhaustiveCheck;
      throw new VercelPostgresError(
        "invalid_connection_type",
        `Unhandled type: ${str}`
      );
    }
  }
  if (connectionString === "undefined")
    connectionString = void 0;
  return connectionString;
}
function isPooledConnectionString(connectionString) {
  return connectionString.includes("-pooler.");
}
function isLocalhostConnectionString(connectionString) {
  try {
    const withHttpsProtocol = connectionString.startsWith("postgresql://") ? connectionString.replace("postgresql://", "https://") : connectionString;
    return new URL(withHttpsProtocol).hostname === "localhost";
  } catch (err) {
    if (err instanceof TypeError) {
      return false;
    }
    if (typeof err === "object" && err !== null && "message" in err && typeof err.message === "string" && err.message === "Invalid URL") {
      return false;
    }
    throw err;
  }
}
function sqlTemplate(strings, ...values) {
  var _a299, _b13;
  if (!isTemplateStringsArray(strings) || !Array.isArray(values)) {
    throw new VercelPostgresError(
      "incorrect_tagged_template_call",
      "It looks like you tried to call `sql` as a function. Make sure to use it as a tagged template.\n	Example: sql`SELECT * FROM users`, not sql('SELECT * FROM users')"
    );
  }
  let result = (_a299 = strings[0]) != null ? _a299 : "";
  for (let i = 1; i < strings.length; i++) {
    result += `$${i}${(_b13 = strings[i]) != null ? _b13 : ""}`;
  }
  return [result, values];
}
function isTemplateStringsArray(strings) {
  return Array.isArray(strings) && "raw" in strings && Array.isArray(strings.raw);
}
function createPool(config) {
  var _a299;
  const connectionString = (_a299 = config == null ? void 0 : config.connectionString) != null ? _a299 : postgresConnectionString("pool");
  if (!connectionString)
    throw new VercelPostgresError(
      "missing_connection_string",
      "You did not supply a 'connectionString' and no 'POSTGRES_URL' env var was found."
    );
  if (!isLocalhostConnectionString(connectionString) && !isPooledConnectionString(connectionString))
    throw new VercelPostgresError(
      "invalid_connection_string",
      "This connection string is meant to be used with a direct connection. Make sure to use a pooled connection string or try `createClient()` instead."
    );
  let maxUses = config == null ? void 0 : config.maxUses;
  let max = config == null ? void 0 : config.max;
  if (typeof EdgeRuntime !== "undefined") {
    if (maxUses && maxUses !== 1) {
      console.warn(
        "@vercel/postgres: Overriding `maxUses` to 1 because the EdgeRuntime does not support client reuse."
      );
    }
    if (max && max !== 1e4) {
      console.warn(
        "@vercel/postgres: Overriding `max` to 10,000 because the EdgeRuntime does not support client reuse."
      );
    }
    maxUses = 1;
    max = 1e4;
  }
  const pool2 = new VercelPool({
    ...config,
    connectionString,
    maxUses,
    max
  });
  return pool2;
}
var VercelPostgresError, VercelClient, VercelPool, pool, sql;
var init_chunk_O2LRBNW4 = __esm({
  "node_modules/@vercel/postgres/dist/chunk-O2LRBNW4.js"() {
    init_serverless();
    init_serverless();
    VercelPostgresError = class extends Error {
      constructor(code, message) {
        super(`VercelPostgresError - '${code}': ${message}`);
        this.code = code;
        this.name = "VercelPostgresError";
      }
    };
    VercelClient = class extends Client {
      /**
       * A template literal tag providing safe, easy to use SQL parameterization.
       * Parameters are substituted using the underlying Postgres database, and so must follow
       * the rules of Postgres parameterization.
       * @example
       * ```ts
       * const pool = createClient();
       * const userId = 123;
       * await client.connect();
       * const result = await pool.sql`SELECT * FROM users WHERE id = ${userId}`;
       * // Equivalent to: await pool.query('SELECT * FROM users WHERE id = $1', [id]);
       * await client.end();
       * ```
       * @returns A promise that resolves to the query result.
       */
      async sql(strings, ...values) {
        const [query, params] = sqlTemplate(strings, ...values);
        return this.query(query, params);
      }
    };
    VercelPool = class extends Pool {
      constructor(config) {
        var _a299;
        super(config);
        this.Client = VercelClient;
        this.connectionString = (_a299 = config.connectionString) != null ? _a299 : "";
      }
      /**
       * A template literal tag providing safe, easy to use SQL parameterization.
       * Parameters are substituted using the underlying Postgres database, and so must follow
       * the rules of Postgres parameterization.
       * @example
       * ```ts
       * const pool = createPool();
       * const userId = 123;
       * const result = await pool.sql`SELECT * FROM users WHERE id = ${userId}`;
       * // Equivalent to: await pool.query('SELECT * FROM users WHERE id = $1', [id]);
       * ```
       * @returns A promise that resolves to the query result.
       */
      async sql(strings, ...values) {
        const [query, params] = sqlTemplate(strings, ...values);
        const sql22 = neon(this.connectionString, {
          fullResults: true
        });
        return sql22(query, params);
      }
      connect(callback) {
        return super.connect(
          callback
        );
      }
    };
    sql = new Proxy(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {
      },
      {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        get(_, prop) {
          if (!pool) {
            pool = createPool();
          }
          const val = Reflect.get(pool, prop);
          if (typeof val === "function") {
            return val.bind(pool);
          }
          return val;
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        apply(_, __, argumentsList) {
          if (!pool) {
            pool = createPool();
          }
          return pool.sql(...argumentsList);
        }
      }
    );
  }
});

// node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/@vercel/postgres/dist/index-node.js
var import_ws;
var init_index_node = __esm({
  "node_modules/@vercel/postgres/dist/index-node.js"() {
    init_chunk_O2LRBNW4();
    init_serverless();
    import_ws = __toESM(require_browser(), 1);
    if (neonConfig) {
      neonConfig.webSocketConstructor = import_ws.default;
    }
  }
});

// node_modules/drizzle-orm/alias-cf8e03cd.mjs
function is(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(`Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
  }
  let cls = value.constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}
function mapResultRow(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce((result2, { path, field }, columnIndex) => {
    let decoder;
    if (is(field, Column)) {
      decoder = field;
    } else if (is(field, SQL)) {
      decoder = field.decoder;
    } else {
      decoder = field.sql.decoder;
    }
    let node = result2;
    for (const [pathChunkIndex, pathChunk] of path.entries()) {
      if (pathChunkIndex < path.length - 1) {
        if (!(pathChunk in node)) {
          node[pathChunk] = {};
        }
        node = node[pathChunk];
      } else {
        const rawValue = row[columnIndex];
        const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
        if (joinsNotNullableMap && is(field, Column) && path.length === 2) {
          const objectName = path[0];
          if (!(objectName in nullifyMap)) {
            nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
          } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) {
            nullifyMap[objectName] = false;
          }
        }
      }
    }
    return result2;
  }, {});
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) {
      if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
        result[objectName] = null;
      }
    }
  }
  return result;
}
function orderSelectedFields(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name2, field]) => {
    if (typeof name2 !== "string") {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name2] : [name2];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased)) {
      result.push({ path: newPath, field });
    } else if (is(field, Table)) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
}
function mapUpdateSet(table, values) {
  const entries = Object.entries(values).filter(([, value]) => value !== void 0).map(([key2, value]) => {
    if (is(value, SQL)) {
      return [key2, value];
    } else {
      return [key2, new Param(value, table[Table.Symbol.Columns][key2])];
    }
  });
  if (entries.length === 0) {
    throw new Error("No values to set");
  }
  return Object.fromEntries(entries);
}
function applyMixins(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name2 of Object.getOwnPropertyNames(extendedClass.prototype)) {
      Object.defineProperty(baseClass.prototype, name2, Object.getOwnPropertyDescriptor(extendedClass.prototype, name2) || /* @__PURE__ */ Object.create(null));
    }
  }
}
function getTableColumns(table) {
  return table[Table.Symbol.Columns];
}
function getTableLikeName(table) {
  return is(table, Subquery) ? table[SubqueryConfig].alias : is(table, View) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : table[Table.Symbol.IsAlias] ? table[Table.Symbol.Name] : table[Table.Symbol.BaseName];
}
function iife(fn, ...args) {
  return fn(...args);
}
function isTable(table) {
  return typeof table === "object" && table !== null && IsDrizzleTable in table;
}
function getTableName(table) {
  return table[TableName];
}
function pgTableWithSchema(name2, columns, extraConfig, schema2, baseName = name2) {
  const rawTable = new PgTable(name2, schema2, baseName);
  const builtColumns = Object.fromEntries(Object.entries(columns).map(([name3, colBuilderBase]) => {
    const colBuilder = colBuilderBase;
    const column = colBuilder.build(rawTable);
    rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
    return [name3, column];
  }));
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  if (extraConfig) {
    table[PgTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
function uniqueKeyName(table, columns) {
  return `${table[PgTable.Symbol.Name]}_${columns.join("_")}_unique`;
}
function parsePgArrayValue(arrayString, startFrom, inQuotes) {
  for (let i = startFrom; i < arrayString.length; i++) {
    const char = arrayString[i];
    if (char === "\\") {
      i++;
      continue;
    }
    if (char === '"') {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i + 1];
    }
    if (inQuotes) {
      continue;
    }
    if (char === "," || char === "}") {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i];
    }
  }
  return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
}
function parsePgNestedArray(arrayString, startFrom = 0) {
  const result = [];
  let i = startFrom;
  let lastCharIsComma = false;
  while (i < arrayString.length) {
    const char = arrayString[i];
    if (char === ",") {
      if (lastCharIsComma || i === startFrom) {
        result.push("");
      }
      lastCharIsComma = true;
      i++;
      continue;
    }
    lastCharIsComma = false;
    if (char === "\\") {
      i += 2;
      continue;
    }
    if (char === '"') {
      const [value2, startFrom2] = parsePgArrayValue(arrayString, i + 1, true);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    if (char === "}") {
      return [result, i + 1];
    }
    if (char === "{") {
      const [value2, startFrom2] = parsePgNestedArray(arrayString, i + 1);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    const [value, newStartFrom] = parsePgArrayValue(arrayString, i, false);
    result.push(value);
    i = newStartFrom;
  }
  return [result, i];
}
function parsePgArray(arrayString) {
  const [result] = parsePgNestedArray(arrayString, 1);
  return result;
}
function makePgArray(array2) {
  return `{${array2.map((item) => {
    if (Array.isArray(item)) {
      return makePgArray(item);
    }
    if (typeof item === "string" && item.includes(",")) {
      return `"${item.replace(/"/g, '\\"')}"`;
    }
    return `${item}`;
  }).join(",")}}`;
}
function timestamp(name2, config = {}) {
  if (config.mode === "string") {
    return new PgTimestampStringBuilder(name2, config.withTimezone ?? false, config.precision);
  }
  return new PgTimestampBuilder(name2, config.withTimezone ?? false, config.precision);
}
function pgViewWithSchema(name2, selection, schema2) {
  if (selection) {
    return new ManualViewBuilder(name2, selection, schema2);
  }
  return new ViewBuilder(name2, schema2);
}
function pgMaterializedViewWithSchema(name2, selection, schema2) {
  if (selection) {
    return new ManualMaterializedViewBuilder(name2, selection, schema2);
  }
  return new MaterializedViewBuilder(name2, schema2);
}
function getOperators() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql: sql2
  };
}
function getOrderByOperators() {
  return {
    sql: sql2,
    asc,
    desc
  };
}
function extractTablesRelationalConfig(schema2, configHelpers) {
  if (Object.keys(schema2).length === 1 && "default" in schema2 && !is(schema2["default"], Table)) {
    schema2 = schema2["default"];
  }
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key2, value] of Object.entries(schema2)) {
    if (isTable(value)) {
      const dbName = value[Table.Symbol.Name];
      const bufferedRelations = relationsBuffer[dbName];
      tableNamesMap[dbName] = key2;
      tablesConfig[key2] = {
        tsName: key2,
        dbName: value[Table.Symbol.Name],
        columns: value[Table.Symbol.Columns],
        relations: bufferedRelations?.relations ?? {},
        primaryKey: bufferedRelations?.primaryKey ?? []
      };
      for (const column of Object.values(value[Table.Symbol.Columns])) {
        if (column.primary) {
          tablesConfig[key2].primaryKey.push(column);
        }
      }
      const extraConfig = value[Table.Symbol.ExtraConfigBuilder]?.(value);
      if (extraConfig) {
        for (const configEntry of Object.values(extraConfig)) {
          if (is(configEntry, PrimaryKeyBuilder)) {
            tablesConfig[key2].primaryKey.push(...configEntry.columns);
          }
        }
      }
    } else if (is(value, Relations)) {
      const dbName = value.table[Table.Symbol.Name];
      const tableName = tableNamesMap[dbName];
      const relations2 = value.config(configHelpers(value.table));
      let primaryKey2;
      for (const [relationName, relation] of Object.entries(relations2)) {
        if (tableName) {
          const tableConfig = tablesConfig[tableName];
          tableConfig.relations[relationName] = relation;
        } else {
          if (!(dbName in relationsBuffer)) {
            relationsBuffer[dbName] = {
              relations: {},
              primaryKey: primaryKey2
            };
          }
          relationsBuffer[dbName].relations[relationName] = relation;
        }
      }
    }
  }
  return { tables: tablesConfig, tableNamesMap };
}
function createOne(sourceTable) {
  return function one(table, config) {
    return new One(sourceTable, table, config, config?.fields.reduce((res, f2) => res && f2.notNull, true) ?? false);
  };
}
function createMany(sourceTable) {
  return function many(referencedTable, config) {
    return new Many(sourceTable, referencedTable, config);
  };
}
function normalizeRelation(schema2, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references
    };
  }
  const referencedTableTsName = tableNamesMap[relation.referencedTable[Table.Symbol.Name]];
  if (!referencedTableTsName) {
    throw new Error(`Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`);
  }
  const referencedTableConfig = schema2[referencedTableTsName];
  if (!referencedTableConfig) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[sourceTable[Table.Symbol.Name]];
  if (!sourceTableTsName) {
    throw new Error(`Table "${sourceTable[Table.Symbol.Name]}" not found in schema`);
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(referencedTableConfig.relations)) {
    if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName ? new Error(`There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`) : new Error(`There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`);
  }
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields
    };
  }
  throw new Error(`There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`);
}
function createTableRelationsHelpers(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable)
  };
}
function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
  const result = {};
  for (const [selectionItemIndex, selectionItem] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
      result[selectionItem.tsKey] = is(relation, One) ? subRows && mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRows, selectionItem.selection, mapColumnValue) : subRows.map((subRow) => mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRow, selectionItem.selection, mapColumnValue));
    } else {
      const value = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
    }
  }
  return result;
}
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) {
    return new Param(value, column);
  }
  return value;
}
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c2) => c2 !== void 0);
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql2.join(conditions, new StringChunk(" and ")),
    new StringChunk(")")
  ]);
}
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c2) => c2 !== void 0);
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql2.join(conditions, new StringChunk(" or ")),
    new StringChunk(")")
  ]);
}
function not(condition) {
  return sql2`not ${condition}`;
}
function inArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      throw new Error("inArray requires at least one value");
    }
    return sql2`${column} in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql2`${column} in ${bindIfParam(values, column)}`;
}
function notInArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      throw new Error("notInArray requires at least one value");
    }
    return sql2`${column} not in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql2`${column} not in ${bindIfParam(values, column)}`;
}
function isNull(value) {
  return sql2`${value} is null`;
}
function isNotNull(value) {
  return sql2`${value} is not null`;
}
function exists(subquery) {
  return sql2`exists (${subquery})`;
}
function notExists(subquery) {
  return sql2`not exists (${subquery})`;
}
function between(column, min, max) {
  return sql2`${column} between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
}
function notBetween(column, min, max) {
  return sql2`${column} not between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
}
function like(column, value) {
  return sql2`${column} like ${value}`;
}
function notLike(column, value) {
  return sql2`${column} not like ${value}`;
}
function ilike(column, value) {
  return sql2`${column} ilike ${value}`;
}
function notIlike(column, value) {
  return sql2`${column} not ilike ${value}`;
}
function asc(column) {
  return sql2`${column} asc`;
}
function desc(column) {
  return sql2`${column} desc`;
}
function isSQLWrapper(value) {
  return typeof value === "object" && value !== null && "getSQL" in value && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
function sql2(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
function fillPlaceholders(params, values) {
  return params.map((p2) => {
    if (is(p2, Placeholder)) {
      if (!(p2.name in values)) {
        throw new Error(`No value for placeholder "${p2.name}" was provided`);
      }
      return values[p2.name];
    }
    return p2;
  });
}
function aliasedTable(table, tableAlias) {
  return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
}
function aliasedTableColumn(column, tableAlias) {
  return new Proxy(column, new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false))));
}
function mapColumnsInAliasedSQLToAlias(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
function mapColumnsInSQLToAlias(query, alias) {
  return sql2.join(query.queryChunks.map((c2) => {
    if (is(c2, Column)) {
      return aliasedTableColumn(c2, alias);
    }
    if (is(c2, SQL)) {
      return mapColumnsInSQLToAlias(c2, alias);
    }
    if (is(c2, SQL.Aliased)) {
      return mapColumnsInAliasedSQLToAlias(c2, alias);
    }
    return c2;
  }));
}
var entityKind, hasOwnEntityKind, _a, Column, ViewBaseConfig, _a2, _b, View, SubqueryConfig, _a3, _b2, Subquery, _a4, WithSubquery, _a5, _SelectionProxyHandler, SelectionProxyHandler, TableName, Schema, Columns, OriginalName, BaseName, IsAlias, ExtraConfigBuilder, IsDrizzleTable, _a6, _b3, _c, _d, _e, _f, _g, _h, _i, Table, _a7, _b4, QueryPromise, tracer, _a8, _DrizzleError, DrizzleError, _a9, TransactionRollbackError, InlineForeignKeys, _a10, _b5, _c2, PgTable, pgTable, _a11, CheckBuilder, _a12, Check, _a13, ForeignKeyBuilder, _a14, ForeignKey, _a15, IndexBuilderOn, _a16, IndexBuilder, _a17, Index, _a18, PrimaryKeyBuilder, _a19, PrimaryKey, _a20, UniqueConstraintBuilder, _a21, UniqueOnConstraintBuilder, _a22, UniqueConstraint, _a23, ColumnBuilder, _a24, PgColumnBuilder, _a25, PgColumn, _a26, PgArrayBuilder, _a27, _PgArray, PgArray, _a28, PgDateColumnBaseBuilder, _a29, PgDateBuilder, _a30, PgDate, _a31, PgDateStringBuilder, _a32, PgDateString, _a33, PgJsonBuilder, _a34, PgJson, _a35, PgJsonbBuilder, _a36, PgJsonb, _a37, PgNumericBuilder, _a38, PgNumeric, _a39, PgTimeBuilder, _a40, PgTime, _a41, PgTimestampBuilder, _a42, PgTimestamp, _a43, PgTimestampStringBuilder, _a44, PgTimestampString, _a45, PgUUIDBuilder, _a46, PgUUID, _a47, PgDialect, _a48, TypedQueryBuilder, _a49, PgSelectBuilder, _a50, PgSelectQueryBuilder, _a51, PgSelect, _a52, QueryBuilder, _a53, DefaultViewBuilderCore, _a54, ViewBuilder, _a55, ManualViewBuilder, _a56, MaterializedViewBuilderCore, _a57, MaterializedViewBuilder, _a58, ManualMaterializedViewBuilder, _a59, PgViewBase, PgViewConfig, _a60, _b6, PgView, PgMaterializedViewConfig, _a61, _b7, PgMaterializedView, _a62, Relation, _a63, Relations, _a64, _One, One, _a65, _Many, Many, eq, ne, gt, gte, lt, lte, _a66, FakePrimitiveParam, _a67, StringChunk, _a68, _SQL, SQL, _a69, Name, noopDecoder, noopEncoder, noopMapper, _a70, Param, _a71, Placeholder, _a72, ColumnAliasProxyHandler, _a73, TableAliasProxyHandler, _a74, RelationTableAliasProxyHandler;
var init_alias_cf8e03cd = __esm({
  "node_modules/drizzle-orm/alias-cf8e03cd.mjs"() {
    entityKind = Symbol.for("drizzle:entityKind");
    hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");
    Column = class {
      constructor(table, config) {
        __publicField(this, "table");
        __publicField(this, "name");
        __publicField(this, "primary");
        __publicField(this, "notNull");
        __publicField(this, "default");
        __publicField(this, "defaultFn");
        __publicField(this, "hasDefault");
        __publicField(this, "isUnique");
        __publicField(this, "uniqueName");
        __publicField(this, "uniqueType");
        __publicField(this, "dataType");
        __publicField(this, "columnType");
        __publicField(this, "enumValues");
        __publicField(this, "config");
        this.table = table;
        this.config = config;
        this.name = config.name;
        this.notNull = config.notNull;
        this.default = config.default;
        this.defaultFn = config.defaultFn;
        this.hasDefault = config.hasDefault;
        this.primary = config.primaryKey;
        this.isUnique = config.isUnique;
        this.uniqueName = config.uniqueName;
        this.uniqueType = config.uniqueType;
        this.dataType = config.dataType;
        this.columnType = config.columnType;
      }
      mapFromDriverValue(value) {
        return value;
      }
      mapToDriverValue(value) {
        return value;
      }
    };
    _a = entityKind;
    __publicField(Column, _a, "Column");
    ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");
    View = class {
      constructor({ name: name2, schema: schema2, selectedFields, query }) {
        /** @internal */
        __publicField(this, _b);
        this[ViewBaseConfig] = {
          name: name2,
          originalName: name2,
          schema: schema2,
          selectedFields,
          query,
          isExisting: !query,
          isAlias: false
        };
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a2 = entityKind, _b = ViewBaseConfig;
    __publicField(View, _a2, "View");
    SubqueryConfig = Symbol.for("drizzle:SubqueryConfig");
    Subquery = class {
      constructor(sql3, selection, alias, isWith = false) {
        /** @internal */
        __publicField(this, _b2);
        this[SubqueryConfig] = {
          sql: sql3,
          selection,
          alias,
          isWith
        };
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a3 = entityKind, _b2 = SubqueryConfig;
    __publicField(Subquery, _a3, "Subquery");
    WithSubquery = class extends Subquery {
    };
    _a4 = entityKind;
    __publicField(WithSubquery, _a4, "WithSubquery");
    _SelectionProxyHandler = class _SelectionProxyHandler {
      constructor(config) {
        __publicField(this, "config");
        this.config = { ...config };
      }
      get(subquery, prop) {
        if (prop === SubqueryConfig) {
          return {
            ...subquery[SubqueryConfig],
            selection: new Proxy(subquery[SubqueryConfig].selection, this)
          };
        }
        if (prop === ViewBaseConfig) {
          return {
            ...subquery[ViewBaseConfig],
            selectedFields: new Proxy(subquery[ViewBaseConfig].selectedFields, this)
          };
        }
        if (typeof prop === "symbol") {
          return subquery[prop];
        }
        const columns = is(subquery, Subquery) ? subquery[SubqueryConfig].selection : is(subquery, View) ? subquery[ViewBaseConfig].selectedFields : subquery;
        const value = columns[prop];
        if (is(value, SQL.Aliased)) {
          if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
            return value.sql;
          }
          const newValue = value.clone();
          newValue.isSelectionField = true;
          return newValue;
        }
        if (is(value, SQL)) {
          if (this.config.sqlBehavior === "sql") {
            return value;
          }
          throw new Error(`You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`);
        }
        if (is(value, Column)) {
          if (this.config.alias) {
            return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(value.table, new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false))));
          }
          return value;
        }
        if (typeof value !== "object" || value === null) {
          return value;
        }
        return new Proxy(value, new _SelectionProxyHandler(this.config));
      }
    };
    _a5 = entityKind;
    __publicField(_SelectionProxyHandler, _a5, "SelectionProxyHandler");
    SelectionProxyHandler = _SelectionProxyHandler;
    TableName = Symbol.for("drizzle:Name");
    Schema = Symbol.for("drizzle:Schema");
    Columns = Symbol.for("drizzle:Columns");
    OriginalName = Symbol.for("drizzle:OriginalName");
    BaseName = Symbol.for("drizzle:BaseName");
    IsAlias = Symbol.for("drizzle:IsAlias");
    ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
    IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");
    Table = class {
      constructor(name2, schema2, baseName) {
        /**
         * @internal
         * Can be changed if the table is aliased.
         */
        __publicField(this, _b3);
        /**
         * @internal
         * Used to store the original name of the table, before any aliasing.
         */
        __publicField(this, _c);
        /** @internal */
        __publicField(this, _d);
        /** @internal */
        __publicField(this, _e);
        /**
         *  @internal
         * Used to store the table name before the transformation via the `tableCreator` functions.
         */
        __publicField(this, _f);
        /** @internal */
        __publicField(this, _g, false);
        /** @internal */
        __publicField(this, _h);
        __publicField(this, _i, true);
        this[TableName] = this[OriginalName] = name2;
        this[Schema] = schema2;
        this[BaseName] = baseName;
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a6 = entityKind, _b3 = TableName, _c = OriginalName, _d = Schema, _e = Columns, _f = BaseName, _g = IsAlias, _h = ExtraConfigBuilder, _i = IsDrizzleTable;
    __publicField(Table, _a6, "Table");
    /** @internal */
    __publicField(Table, "Symbol", {
      Name: TableName,
      Schema,
      OriginalName,
      Columns,
      BaseName,
      IsAlias,
      ExtraConfigBuilder
    });
    QueryPromise = class {
      constructor() {
        __publicField(this, _b4, "QueryPromise");
      }
      catch(onRejected) {
        return this.then(void 0, onRejected);
      }
      finally(onFinally) {
        return this.then((value) => {
          onFinally?.();
          return value;
        }, (reason) => {
          onFinally?.();
          throw reason;
        });
      }
      then(onFulfilled, onRejected) {
        return this.execute().then(onFulfilled, onRejected);
      }
    };
    _a7 = entityKind, _b4 = Symbol.toStringTag;
    __publicField(QueryPromise, _a7, "QueryPromise");
    tracer = {
      startActiveSpan(name2, fn) {
        {
          return fn();
        }
      }
    };
    _DrizzleError = class _DrizzleError extends Error {
      constructor(message) {
        super(message);
        this.name = "DrizzleError";
      }
      static wrap(error2, message) {
        return error2 instanceof Error ? new _DrizzleError(message ? `${message}: ${error2.message}` : error2.message) : new _DrizzleError(message ?? String(error2));
      }
    };
    _a8 = entityKind;
    __publicField(_DrizzleError, _a8, "DrizzleError");
    DrizzleError = _DrizzleError;
    TransactionRollbackError = class extends DrizzleError {
      constructor() {
        super("Rollback");
      }
    };
    _a9 = entityKind;
    __publicField(TransactionRollbackError, _a9, "TransactionRollbackError");
    InlineForeignKeys = Symbol.for("drizzle:PgInlineForeignKeys");
    PgTable = class extends Table {
      constructor() {
        super(...arguments);
        /**@internal */
        __publicField(this, _b5, []);
        /** @internal */
        __publicField(this, _c2);
      }
    };
    _a10 = entityKind, _b5 = InlineForeignKeys, _c2 = Table.Symbol.ExtraConfigBuilder;
    __publicField(PgTable, _a10, "PgTable");
    /** @internal */
    __publicField(PgTable, "Symbol", Object.assign({}, Table.Symbol, {
      InlineForeignKeys
    }));
    pgTable = (name2, columns, extraConfig) => {
      return pgTableWithSchema(name2, columns, extraConfig, void 0);
    };
    CheckBuilder = class {
      constructor(name2, value) {
        __publicField(this, "name");
        __publicField(this, "value");
        __publicField(this, "brand");
        this.name = name2;
        this.value = value;
      }
      /** @internal */
      build(table) {
        return new Check(table, this);
      }
    };
    _a11 = entityKind;
    __publicField(CheckBuilder, _a11, "PgCheckBuilder");
    Check = class {
      constructor(table, builder) {
        __publicField(this, "table");
        __publicField(this, "name");
        __publicField(this, "value");
        this.table = table;
        this.name = builder.name;
        this.value = builder.value;
      }
    };
    _a12 = entityKind;
    __publicField(Check, _a12, "PgCheck");
    ForeignKeyBuilder = class {
      constructor(config, actions) {
        /** @internal */
        __publicField(this, "reference");
        /** @internal */
        __publicField(this, "_onUpdate", "no action");
        /** @internal */
        __publicField(this, "_onDelete", "no action");
        this.reference = () => {
          const { columns, foreignColumns } = config();
          return { columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions) {
          this._onUpdate = actions.onUpdate;
          this._onDelete = actions.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action === void 0 ? "no action" : action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action === void 0 ? "no action" : action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey(table, this);
      }
    };
    _a13 = entityKind;
    __publicField(ForeignKeyBuilder, _a13, "PgForeignKeyBuilder");
    ForeignKey = class {
      constructor(table, builder) {
        __publicField(this, "table");
        __publicField(this, "reference");
        __publicField(this, "onUpdate");
        __publicField(this, "onDelete");
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      getName() {
        const { columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[PgTable.Symbol.Name],
          ...columnNames,
          foreignColumns[0].table[PgTable.Symbol.Name],
          ...foreignColumnNames
        ];
        return `${chunks.join("_")}_fk`;
      }
    };
    _a14 = entityKind;
    __publicField(ForeignKey, _a14, "PgForeignKey");
    IndexBuilderOn = class {
      constructor(unique2, name2) {
        __publicField(this, "unique");
        __publicField(this, "name");
        this.unique = unique2;
        this.name = name2;
      }
      on(...columns) {
        return new IndexBuilder(columns, this.unique, false, this.name);
      }
      onOnly(...columns) {
        return new IndexBuilder(columns, this.unique, true, this.name);
      }
    };
    _a15 = entityKind;
    __publicField(IndexBuilderOn, _a15, "PgIndexBuilderOn");
    IndexBuilder = class {
      constructor(columns, unique2, only, name2) {
        /** @internal */
        __publicField(this, "config");
        this.config = {
          name: name2,
          columns,
          unique: unique2,
          only
        };
      }
      concurrently() {
        this.config.concurrently = true;
        return this;
      }
      using(method) {
        this.config.using = method;
        return this;
      }
      asc() {
        this.config.order = "asc";
        return this;
      }
      desc() {
        this.config.order = "desc";
        return this;
      }
      nullsFirst() {
        this.config.nulls = "first";
        return this;
      }
      nullsLast() {
        this.config.nulls = "last";
        return this;
      }
      where(condition) {
        this.config.where = condition;
        return this;
      }
      /** @internal */
      build(table) {
        return new Index(this.config, table);
      }
    };
    _a16 = entityKind;
    __publicField(IndexBuilder, _a16, "PgIndexBuilder");
    Index = class {
      constructor(config, table) {
        __publicField(this, "config");
        this.config = { ...config, table };
      }
    };
    _a17 = entityKind;
    __publicField(Index, _a17, "PgIndex");
    PrimaryKeyBuilder = class {
      constructor(columns) {
        /** @internal */
        __publicField(this, "columns");
        this.columns = columns;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey(table, this.columns);
      }
    };
    _a18 = entityKind;
    __publicField(PrimaryKeyBuilder, _a18, "PgPrimaryKeyBuilder");
    PrimaryKey = class {
      constructor(table, columns) {
        __publicField(this, "table");
        __publicField(this, "columns");
        this.table = table;
        this.columns = columns;
      }
      getName() {
        return `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    };
    _a19 = entityKind;
    __publicField(PrimaryKey, _a19, "PgPrimaryKey");
    UniqueConstraintBuilder = class {
      constructor(columns, name2) {
        __publicField(this, "name");
        /** @internal */
        __publicField(this, "columns");
        /** @internal */
        __publicField(this, "nullsNotDistinctConfig", false);
        this.name = name2;
        this.columns = columns;
      }
      nullsNotDistinct() {
        this.nullsNotDistinctConfig = true;
        return this;
      }
      /** @internal */
      build(table) {
        return new UniqueConstraint(table, this.columns, this.nullsNotDistinctConfig, this.name);
      }
    };
    _a20 = entityKind;
    __publicField(UniqueConstraintBuilder, _a20, "PgUniqueConstraintBuilder");
    UniqueOnConstraintBuilder = class {
      constructor(name2) {
        /** @internal */
        __publicField(this, "name");
        this.name = name2;
      }
      on(...columns) {
        return new UniqueConstraintBuilder(columns, this.name);
      }
    };
    _a21 = entityKind;
    __publicField(UniqueOnConstraintBuilder, _a21, "PgUniqueOnConstraintBuilder");
    UniqueConstraint = class {
      constructor(table, columns, nullsNotDistinct, name2) {
        __publicField(this, "table");
        __publicField(this, "columns");
        __publicField(this, "name");
        __publicField(this, "nullsNotDistinct", false);
        this.table = table;
        this.columns = columns;
        this.name = name2 ?? uniqueKeyName(this.table, this.columns.map((column) => column.name));
        this.nullsNotDistinct = nullsNotDistinct;
      }
      getName() {
        return this.name;
      }
    };
    _a22 = entityKind;
    __publicField(UniqueConstraint, _a22, "PgUniqueConstraint");
    ColumnBuilder = class {
      constructor(name2, dataType, columnType) {
        __publicField(this, "config");
        /**
         * Alias for {@link $defaultFn}.
         */
        __publicField(this, "$default", this.$defaultFn);
        this.config = {
          name: name2,
          notNull: false,
          default: void 0,
          hasDefault: false,
          primaryKey: false,
          isUnique: false,
          uniqueName: void 0,
          uniqueType: void 0,
          dataType,
          columnType
        };
      }
      /**
       * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
       *
       * @example
       * ```ts
       * const users = pgTable('users', {
       * 	id: integer('id').$type<UserId>().primaryKey(),
       * 	details: json('details').$type<UserDetails>().notNull(),
       * });
       * ```
       */
      $type() {
        return this;
      }
      /**
       * Adds a `not null` clause to the column definition.
       *
       * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
       */
      notNull() {
        this.config.notNull = true;
        return this;
      }
      /**
       * Adds a `default <value>` clause to the column definition.
       *
       * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
       *
       * If you need to set a dynamic default value, use {@link $defaultFn} instead.
       */
      default(value) {
        this.config.default = value;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Adds a dynamic default value to the column.
       * The function will be called when the row is inserted, and the returned value will be used as the column value.
       *
       * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
       */
      $defaultFn(fn) {
        this.config.defaultFn = fn;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
       *
       * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
       */
      primaryKey() {
        this.config.primaryKey = true;
        this.config.notNull = true;
        return this;
      }
    };
    _a23 = entityKind;
    __publicField(ColumnBuilder, _a23, "ColumnBuilder");
    PgColumnBuilder = class extends ColumnBuilder {
      constructor() {
        super(...arguments);
        __publicField(this, "foreignKeyConfigs", []);
      }
      array(size) {
        return new PgArrayBuilder(this.config.name, this, size);
      }
      references(ref, actions = {}) {
        this.foreignKeyConfigs.push({ ref, actions });
        return this;
      }
      unique(name2, config) {
        this.config.isUnique = true;
        this.config.uniqueName = name2;
        this.config.uniqueType = config?.nulls;
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions }) => {
          return iife((ref2, actions2) => {
            const builder = new ForeignKeyBuilder(() => {
              const foreignColumn = ref2();
              return { columns: [column], foreignColumns: [foreignColumn] };
            });
            if (actions2.onUpdate) {
              builder.onUpdate(actions2.onUpdate);
            }
            if (actions2.onDelete) {
              builder.onDelete(actions2.onDelete);
            }
            return builder.build(table);
          }, ref, actions);
        });
      }
    };
    _a24 = entityKind;
    __publicField(PgColumnBuilder, _a24, "PgColumnBuilder");
    PgColumn = class extends Column {
      constructor(table, config) {
        if (!config.uniqueName) {
          config.uniqueName = uniqueKeyName(table, [config.name]);
        }
        super(table, config);
        __publicField(this, "table");
        this.table = table;
      }
    };
    _a25 = entityKind;
    __publicField(PgColumn, _a25, "PgColumn");
    PgArrayBuilder = class extends PgColumnBuilder {
      constructor(name2, baseBuilder, size) {
        super(name2, "array", "PgArray");
        this.config.baseBuilder = baseBuilder;
        this.config.size = size;
      }
      /** @internal */
      build(table) {
        const baseColumn = this.config.baseBuilder.build(table);
        return new PgArray(table, this.config, baseColumn);
      }
    };
    _a26 = entityKind;
    __publicField(PgArrayBuilder, _a26, "PgArrayBuilder");
    _PgArray = class _PgArray extends PgColumn {
      constructor(table, config, baseColumn, range) {
        super(table, config);
        __publicField(this, "baseColumn");
        __publicField(this, "range");
        __publicField(this, "size");
        this.baseColumn = baseColumn;
        this.range = range;
        this.size = config.size;
      }
      getSQLType() {
        return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          value = parsePgArray(value);
        }
        return value.map((v) => this.baseColumn.mapFromDriverValue(v));
      }
      mapToDriverValue(value, isNestedArray = false) {
        const a = value.map((v) => v === null ? null : is(this.baseColumn, _PgArray) ? this.baseColumn.mapToDriverValue(v, true) : this.baseColumn.mapToDriverValue(v));
        if (isNestedArray)
          return a;
        return makePgArray(a);
      }
    };
    _a27 = entityKind;
    __publicField(_PgArray, _a27, "PgArray");
    PgArray = _PgArray;
    PgDateColumnBaseBuilder = class extends PgColumnBuilder {
      defaultNow() {
        return this.default(sql2`now()`);
      }
    };
    _a28 = entityKind;
    __publicField(PgDateColumnBaseBuilder, _a28, "PgDateColumnBaseBuilder");
    PgDateBuilder = class extends PgDateColumnBaseBuilder {
      constructor(name2) {
        super(name2, "date", "PgDate");
      }
      /** @internal */
      build(table) {
        return new PgDate(table, this.config);
      }
    };
    _a29 = entityKind;
    __publicField(PgDateBuilder, _a29, "PgDateBuilder");
    PgDate = class extends PgColumn {
      getSQLType() {
        return "date";
      }
      mapFromDriverValue(value) {
        return new Date(value);
      }
      mapToDriverValue(value) {
        return value.toISOString();
      }
    };
    _a30 = entityKind;
    __publicField(PgDate, _a30, "PgDate");
    PgDateStringBuilder = class extends PgDateColumnBaseBuilder {
      constructor(name2) {
        super(name2, "string", "PgDateString");
      }
      /** @internal */
      build(table) {
        return new PgDateString(table, this.config);
      }
    };
    _a31 = entityKind;
    __publicField(PgDateStringBuilder, _a31, "PgDateStringBuilder");
    PgDateString = class extends PgColumn {
      getSQLType() {
        return "date";
      }
    };
    _a32 = entityKind;
    __publicField(PgDateString, _a32, "PgDateString");
    PgJsonBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "json", "PgJson");
      }
      /** @internal */
      build(table) {
        return new PgJson(table, this.config);
      }
    };
    _a33 = entityKind;
    __publicField(PgJsonBuilder, _a33, "PgJsonBuilder");
    PgJson = class extends PgColumn {
      constructor(table, config) {
        super(table, config);
      }
      getSQLType() {
        return "json";
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      }
    };
    _a34 = entityKind;
    __publicField(PgJson, _a34, "PgJson");
    PgJsonbBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "json", "PgJsonb");
      }
      /** @internal */
      build(table) {
        return new PgJsonb(table, this.config);
      }
    };
    _a35 = entityKind;
    __publicField(PgJsonbBuilder, _a35, "PgJsonbBuilder");
    PgJsonb = class extends PgColumn {
      constructor(table, config) {
        super(table, config);
      }
      getSQLType() {
        return "jsonb";
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      }
    };
    _a36 = entityKind;
    __publicField(PgJsonb, _a36, "PgJsonb");
    PgNumericBuilder = class extends PgColumnBuilder {
      constructor(name2, precision, scale) {
        super(name2, "string", "PgNumeric");
        this.config.precision = precision;
        this.config.scale = scale;
      }
      /** @internal */
      build(table) {
        return new PgNumeric(table, this.config);
      }
    };
    _a37 = entityKind;
    __publicField(PgNumericBuilder, _a37, "PgNumericBuilder");
    PgNumeric = class extends PgColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "precision");
        __publicField(this, "scale");
        this.precision = config.precision;
        this.scale = config.scale;
      }
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
          return `numeric(${this.precision}, ${this.scale})`;
        } else if (this.precision === void 0) {
          return "numeric";
        } else {
          return `numeric(${this.precision})`;
        }
      }
    };
    _a38 = entityKind;
    __publicField(PgNumeric, _a38, "PgNumeric");
    PgTimeBuilder = class extends PgDateColumnBaseBuilder {
      constructor(name2, withTimezone, precision) {
        super(name2, "string", "PgTime");
        __publicField(this, "withTimezone");
        __publicField(this, "precision");
        this.withTimezone = withTimezone;
        this.precision = precision;
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
      }
      /** @internal */
      build(table) {
        return new PgTime(table, this.config);
      }
    };
    _a39 = entityKind;
    __publicField(PgTimeBuilder, _a39, "PgTimeBuilder");
    PgTime = class extends PgColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "withTimezone");
        __publicField(this, "precision");
        this.withTimezone = config.withTimezone;
        this.precision = config.precision;
      }
      getSQLType() {
        const precision = this.precision === void 0 ? "" : `(${this.precision})`;
        return `time${precision}${this.withTimezone ? " with time zone" : ""}`;
      }
    };
    _a40 = entityKind;
    __publicField(PgTime, _a40, "PgTime");
    PgTimestampBuilder = class extends PgDateColumnBaseBuilder {
      constructor(name2, withTimezone, precision) {
        super(name2, "date", "PgTimestamp");
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
      }
      /** @internal */
      build(table) {
        return new PgTimestamp(table, this.config);
      }
    };
    _a41 = entityKind;
    __publicField(PgTimestampBuilder, _a41, "PgTimestampBuilder");
    PgTimestamp = class extends PgColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "withTimezone");
        __publicField(this, "precision");
        __publicField(this, "mapFromDriverValue", (value) => {
          return new Date(this.withTimezone ? value : value + "+0000");
        });
        __publicField(this, "mapToDriverValue", (value) => {
          return this.withTimezone ? value.toUTCString() : value.toISOString();
        });
        this.withTimezone = config.withTimezone;
        this.precision = config.precision;
      }
      getSQLType() {
        const precision = this.precision === void 0 ? "" : ` (${this.precision})`;
        return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
      }
    };
    _a42 = entityKind;
    __publicField(PgTimestamp, _a42, "PgTimestamp");
    PgTimestampStringBuilder = class extends PgDateColumnBaseBuilder {
      constructor(name2, withTimezone, precision) {
        super(name2, "string", "PgTimestampString");
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
      }
      /** @internal */
      build(table) {
        return new PgTimestampString(table, this.config);
      }
    };
    _a43 = entityKind;
    __publicField(PgTimestampStringBuilder, _a43, "PgTimestampStringBuilder");
    PgTimestampString = class extends PgColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "withTimezone");
        __publicField(this, "precision");
        this.withTimezone = config.withTimezone;
        this.precision = config.precision;
      }
      getSQLType() {
        const precision = this.precision === void 0 ? "" : `(${this.precision})`;
        return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
      }
    };
    _a44 = entityKind;
    __publicField(PgTimestampString, _a44, "PgTimestampString");
    PgUUIDBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "string", "PgUUID");
      }
      /**
       * Adds `default gen_random_uuid()` to the column definition.
       */
      defaultRandom() {
        return this.default(sql2`gen_random_uuid()`);
      }
      /** @internal */
      build(table) {
        return new PgUUID(table, this.config);
      }
    };
    _a45 = entityKind;
    __publicField(PgUUIDBuilder, _a45, "PgUUIDBuilder");
    PgUUID = class extends PgColumn {
      getSQLType() {
        return "uuid";
      }
    };
    _a46 = entityKind;
    __publicField(PgUUID, _a46, "PgUUID");
    PgDialect = class {
      async migrate(migrations, session) {
        const migrationTableCreate = sql2`
			CREATE TABLE IF NOT EXISTS "drizzle"."__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
        await session.execute(sql2`CREATE SCHEMA IF NOT EXISTS "drizzle"`);
        await session.execute(migrationTableCreate);
        const dbMigrations = await session.all(sql2`select id, hash, created_at from "drizzle"."__drizzle_migrations" order by created_at desc limit 1`);
        const lastDbMigration = dbMigrations[0];
        await session.transaction(async (tx) => {
          for await (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration.created_at) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                await tx.execute(sql2.raw(stmt));
              }
              await tx.execute(sql2`insert into "drizzle"."__drizzle_migrations" ("hash", "created_at") values(${migration.hash}, ${migration.folderMillis})`);
            }
          }
        });
      }
      escapeName(name2) {
        return `"${name2}"`;
      }
      escapeParam(num) {
        return `$${num + 1}`;
      }
      escapeString(str) {
        return `'${str.replace(/'/g, "''")}'`;
      }
      buildDeleteQuery({ table, where, returning }) {
        const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql2` where ${where}` : void 0;
        return sql2`delete from ${table}${whereSql}${returningSql}`;
      }
      buildUpdateSet(table, set) {
        const setEntries = Object.entries(set);
        const setSize = setEntries.length;
        return sql2.join(setEntries.flatMap(([colName, value], i) => {
          const col = table[Table.Symbol.Columns][colName];
          const res = sql2`${sql2.identifier(col.name)} = ${value}`;
          if (i < setSize - 1) {
            return [res, sql2.raw(", ")];
          }
          return [res];
        }));
      }
      buildUpdateQuery({ table, set, where, returning }) {
        const setSql = this.buildUpdateSet(table, set);
        const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql2` where ${where}` : void 0;
        return sql2`update ${table} set ${setSql}${whereSql}${returningSql}`;
      }
      /**
       * Builds selection SQL with provided fields/expressions
       *
       * Examples:
       *
       * `select <selection> from`
       *
       * `insert ... returning <selection>`
       *
       * If `isSingleTable` is true, then columns won't be prefixed with table name
       */
      buildSelection(fields, { isSingleTable = false } = {}) {
        const columnsLen = fields.length;
        const chunks = fields.flatMap(({ field }, i) => {
          const chunk = [];
          if (is(field, SQL.Aliased) && field.isSelectionField) {
            chunk.push(sql2.identifier(field.fieldAlias));
          } else if (is(field, SQL.Aliased) || is(field, SQL)) {
            const query = is(field, SQL.Aliased) ? field.sql : field;
            if (isSingleTable) {
              chunk.push(new SQL(query.queryChunks.map((c2) => {
                if (is(c2, PgColumn)) {
                  return sql2.identifier(c2.name);
                }
                return c2;
              })));
            } else {
              chunk.push(query);
            }
            if (is(field, SQL.Aliased)) {
              chunk.push(sql2` as ${sql2.identifier(field.fieldAlias)}`);
            }
          } else if (is(field, Column)) {
            if (isSingleTable) {
              chunk.push(sql2.identifier(field.name));
            } else {
              chunk.push(field);
            }
          }
          if (i < columnsLen - 1) {
            chunk.push(sql2`, `);
          }
          return chunk;
        });
        return sql2.join(chunks);
      }
      buildSelectQuery({ withList, fields, fieldsFlat, where, having, table, joins, orderBy, groupBy, limit, offset, lockingClauses, distinct }) {
        const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
        for (const f2 of fieldsList) {
          if (is(f2.field, Column) && getTableName(f2.field.table) !== (is(table, Subquery) ? table[SubqueryConfig].alias : is(table, PgViewBase) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : getTableName(table)) && !((table2) => joins?.some(({ alias }) => alias === (table2[Table.Symbol.IsAlias] ? getTableName(table2) : table2[Table.Symbol.BaseName])))(f2.field.table)) {
            const tableName = getTableName(f2.field.table);
            throw new Error(`Your "${f2.path.join("->")}" field references a column "${tableName}"."${f2.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
          }
        }
        const isSingleTable = !joins || joins.length === 0;
        let withSql;
        if (withList?.length) {
          const withSqlChunks = [sql2`with `];
          for (const [i, w] of withList.entries()) {
            withSqlChunks.push(sql2`${sql2.identifier(w[SubqueryConfig].alias)} as (${w[SubqueryConfig].sql})`);
            if (i < withList.length - 1) {
              withSqlChunks.push(sql2`, `);
            }
          }
          withSqlChunks.push(sql2` `);
          withSql = sql2.join(withSqlChunks);
        }
        let distinctSql;
        if (distinct) {
          distinctSql = distinct === true ? sql2` distinct` : sql2` distinct on (${sql2.join(distinct.on, ", ")})`;
        }
        const selection = this.buildSelection(fieldsList, { isSingleTable });
        const tableSql = (() => {
          if (is(table, Table) && table[Table.Symbol.OriginalName] !== table[Table.Symbol.Name]) {
            let fullName = sql2`${sql2.identifier(table[Table.Symbol.OriginalName])}`;
            if (table[Table.Symbol.Schema]) {
              fullName = sql2`${sql2.identifier(table[Table.Symbol.Schema])}.${fullName}`;
            }
            return sql2`${fullName} ${sql2.identifier(table[Table.Symbol.Name])}`;
          }
          return table;
        })();
        const joinsArray = [];
        if (joins) {
          for (const [index11, joinMeta] of joins.entries()) {
            if (index11 === 0) {
              joinsArray.push(sql2` `);
            }
            const table2 = joinMeta.table;
            const lateralSql = joinMeta.lateral ? sql2` lateral` : void 0;
            if (is(table2, PgTable)) {
              const tableName = table2[PgTable.Symbol.Name];
              const tableSchema = table2[PgTable.Symbol.Schema];
              const origTableName = table2[PgTable.Symbol.OriginalName];
              const alias = tableName === origTableName ? void 0 : joinMeta.alias;
              joinsArray.push(sql2`${sql2.raw(joinMeta.joinType)} join${lateralSql} ${tableSchema ? sql2`${sql2.identifier(tableSchema)}.` : void 0}${sql2.identifier(origTableName)}${alias && sql2` ${sql2.identifier(alias)}`} on ${joinMeta.on}`);
            } else if (is(table2, View)) {
              const viewName = table2[ViewBaseConfig].name;
              const viewSchema = table2[ViewBaseConfig].schema;
              const origViewName = table2[ViewBaseConfig].originalName;
              const alias = viewName === origViewName ? void 0 : joinMeta.alias;
              joinsArray.push(sql2`${sql2.raw(joinMeta.joinType)} join${lateralSql} ${viewSchema ? sql2`${sql2.identifier(viewSchema)}.` : void 0}${sql2.identifier(origViewName)}${alias && sql2` ${sql2.identifier(alias)}`} on ${joinMeta.on}`);
            } else {
              joinsArray.push(sql2`${sql2.raw(joinMeta.joinType)} join${lateralSql} ${table2} on ${joinMeta.on}`);
            }
            if (index11 < joins.length - 1) {
              joinsArray.push(sql2` `);
            }
          }
        }
        const joinsSql = sql2.join(joinsArray);
        const whereSql = where ? sql2` where ${where}` : void 0;
        const havingSql = having ? sql2` having ${having}` : void 0;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
          orderBySql = sql2` order by ${sql2.join(orderBy, sql2`, `)}`;
        }
        let groupBySql;
        if (groupBy && groupBy.length > 0) {
          groupBySql = sql2` group by ${sql2.join(groupBy, sql2`, `)}`;
        }
        const limitSql = limit ? sql2` limit ${limit}` : void 0;
        const offsetSql = offset ? sql2` offset ${offset}` : void 0;
        const lockingClausesSql = sql2.empty();
        if (lockingClauses) {
          for (const { strength, config } of lockingClauses) {
            const clauseSql = sql2` for ${sql2.raw(strength)}`;
            if (config.of) {
              clauseSql.append(sql2` of ${config.of}`);
            }
            if (config.noWait) {
              clauseSql.append(sql2` no wait`);
            } else if (config.skipLocked) {
              clauseSql.append(sql2` skip locked`);
            }
            lockingClausesSql.append(clauseSql);
          }
        }
        return sql2`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}${lockingClausesSql}`;
      }
      buildInsertQuery({ table, values, onConflict, returning }) {
        const valuesSqlList = [];
        const columns = table[Table.Symbol.Columns];
        const colEntries = Object.entries(columns);
        const insertOrder = colEntries.map(([, column]) => sql2.identifier(column.name));
        for (const [valueIndex, value] of values.entries()) {
          const valueList = [];
          for (const [fieldName, col] of colEntries) {
            const colValue = value[fieldName];
            if (colValue === void 0 || is(colValue, Param) && colValue.value === void 0) {
              if (col.defaultFn !== void 0) {
                const defaultFnResult = col.defaultFn();
                const defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql2.param(defaultFnResult, col);
                valueList.push(defaultValue);
              } else {
                valueList.push(sql2`default`);
              }
            } else {
              valueList.push(colValue);
            }
          }
          valuesSqlList.push(valueList);
          if (valueIndex < values.length - 1) {
            valuesSqlList.push(sql2`, `);
          }
        }
        const valuesSql = sql2.join(valuesSqlList);
        const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const onConflictSql = onConflict ? sql2` on conflict ${onConflict}` : void 0;
        return sql2`insert into ${table} ${insertOrder} values ${valuesSql}${onConflictSql}${returningSql}`;
      }
      buildRefreshMaterializedViewQuery({ view, concurrently, withNoData }) {
        const concurrentlySql = concurrently ? sql2` concurrently` : void 0;
        const withNoDataSql = withNoData ? sql2` with no data` : void 0;
        return sql2`refresh materialized view${concurrentlySql} ${view}${withNoDataSql}`;
      }
      prepareTyping(encoder3) {
        if (is(encoder3, PgJsonb) || is(encoder3, PgJson)) {
          return "json";
        } else if (is(encoder3, PgNumeric)) {
          return "decimal";
        } else if (is(encoder3, PgTime)) {
          return "time";
        } else if (is(encoder3, PgTimestamp)) {
          return "timestamp";
        } else if (is(encoder3, PgDate)) {
          return "date";
        } else if (is(encoder3, PgUUID)) {
          return "uuid";
        } else {
          return "none";
        }
      }
      sqlToQuery(sql3) {
        return sql3.toQuery({
          escapeName: this.escapeName,
          escapeParam: this.escapeParam,
          escapeString: this.escapeString,
          prepareTyping: this.prepareTyping
        });
      }
      // buildRelationalQueryWithPK({
      // 	fullSchema,
      // 	schema,
      // 	tableNamesMap,
      // 	table,
      // 	tableConfig,
      // 	queryConfig: config,
      // 	tableAlias,
      // 	isRoot = false,
      // 	joinOn,
      // }: {
      // 	fullSchema: Record<string, unknown>;
      // 	schema: TablesRelationalConfig;
      // 	tableNamesMap: Record<string, string>;
      // 	table: PgTable;
      // 	tableConfig: TableRelationalConfig;
      // 	queryConfig: true | DBQueryConfig<'many', true>;
      // 	tableAlias: string;
      // 	isRoot?: boolean;
      // 	joinOn?: SQL;
      // }): BuildRelationalQueryResult<PgTable, PgColumn> {
      // 	// For { "<relation>": true }, return a table with selection of all columns
      // 	if (config === true) {
      // 		const selectionEntries = Object.entries(tableConfig.columns);
      // 		const selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = selectionEntries.map((
      // 			[key, value],
      // 		) => ({
      // 			dbKey: value.name,
      // 			tsKey: key,
      // 			field: value as PgColumn,
      // 			relationTableTsKey: undefined,
      // 			isJson: false,
      // 			selection: [],
      // 		}));
      // 		return {
      // 			tableTsKey: tableConfig.tsName,
      // 			sql: table,
      // 			selection,
      // 		};
      // 	}
      // 	// let selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = [];
      // 	// let selectionForBuild = selection;
      // 	const aliasedColumns = Object.fromEntries(
      // 		Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)]),
      // 	);
      // 	const aliasedRelations = Object.fromEntries(
      // 		Object.entries(tableConfig.relations).map(([key, value]) => [key, aliasedRelation(value, tableAlias)]),
      // 	);
      // 	const aliasedFields = Object.assign({}, aliasedColumns, aliasedRelations);
      // 	let where, hasUserDefinedWhere;
      // 	if (config.where) {
      // 		const whereSql = typeof config.where === 'function' ? config.where(aliasedFields, operators) : config.where;
      // 		where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
      // 		hasUserDefinedWhere = !!where;
      // 	}
      // 	where = and(joinOn, where);
      // 	// const fieldsSelection: { tsKey: string; value: PgColumn | SQL.Aliased; isExtra?: boolean }[] = [];
      // 	let joins: Join[] = [];
      // 	let selectedColumns: string[] = [];
      // 	// Figure out which columns to select
      // 	if (config.columns) {
      // 		let isIncludeMode = false;
      // 		for (const [field, value] of Object.entries(config.columns)) {
      // 			if (value === undefined) {
      // 				continue;
      // 			}
      // 			if (field in tableConfig.columns) {
      // 				if (!isIncludeMode && value === true) {
      // 					isIncludeMode = true;
      // 				}
      // 				selectedColumns.push(field);
      // 			}
      // 		}
      // 		if (selectedColumns.length > 0) {
      // 			selectedColumns = isIncludeMode
      // 				? selectedColumns.filter((c) => config.columns?.[c] === true)
      // 				: Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
      // 		}
      // 	} else {
      // 		// Select all columns if selection is not specified
      // 		selectedColumns = Object.keys(tableConfig.columns);
      // 	}
      // 	// for (const field of selectedColumns) {
      // 	// 	const column = tableConfig.columns[field]! as PgColumn;
      // 	// 	fieldsSelection.push({ tsKey: field, value: column });
      // 	// }
      // 	let initiallySelectedRelations: {
      // 		tsKey: string;
      // 		queryConfig: true | DBQueryConfig<'many', false>;
      // 		relation: Relation;
      // 	}[] = [];
      // 	// let selectedRelations: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = [];
      // 	// Figure out which relations to select
      // 	if (config.with) {
      // 		initiallySelectedRelations = Object.entries(config.with)
      // 			.filter((entry): entry is [typeof entry[0], NonNullable<typeof entry[1]>] => !!entry[1])
      // 			.map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey]! }));
      // 	}
      // 	const manyRelations = initiallySelectedRelations.filter((r) =>
      // 		is(r.relation, Many)
      // 		&& (schema[tableNamesMap[r.relation.referencedTable[Table.Symbol.Name]]!]?.primaryKey.length ?? 0) > 0
      // 	);
      // 	// If this is the last Many relation (or there are no Many relations), we are on the innermost subquery level
      // 	const isInnermostQuery = manyRelations.length < 2;
      // 	const selectedExtras: {
      // 		tsKey: string;
      // 		value: SQL.Aliased;
      // 	}[] = [];
      // 	// Figure out which extras to select
      // 	if (isInnermostQuery && config.extras) {
      // 		const extras = typeof config.extras === 'function'
      // 			? config.extras(aliasedFields, { sql })
      // 			: config.extras;
      // 		for (const [tsKey, value] of Object.entries(extras)) {
      // 			selectedExtras.push({
      // 				tsKey,
      // 				value: mapColumnsInAliasedSQLToAlias(value, tableAlias),
      // 			});
      // 		}
      // 	}
      // 	// Transform `fieldsSelection` into `selection`
      // 	// `fieldsSelection` shouldn't be used after this point
      // 	// for (const { tsKey, value, isExtra } of fieldsSelection) {
      // 	// 	selection.push({
      // 	// 		dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey]!.name,
      // 	// 		tsKey,
      // 	// 		field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
      // 	// 		relationTableTsKey: undefined,
      // 	// 		isJson: false,
      // 	// 		isExtra,
      // 	// 		selection: [],
      // 	// 	});
      // 	// }
      // 	let orderByOrig = typeof config.orderBy === 'function'
      // 		? config.orderBy(aliasedFields, orderByOperators)
      // 		: config.orderBy ?? [];
      // 	if (!Array.isArray(orderByOrig)) {
      // 		orderByOrig = [orderByOrig];
      // 	}
      // 	const orderBy = orderByOrig.map((orderByValue) => {
      // 		if (is(orderByValue, Column)) {
      // 			return aliasedTableColumn(orderByValue, tableAlias) as PgColumn;
      // 		}
      // 		return mapColumnsInSQLToAlias(orderByValue, tableAlias);
      // 	});
      // 	const limit = isInnermostQuery ? config.limit : undefined;
      // 	const offset = isInnermostQuery ? config.offset : undefined;
      // 	// For non-root queries without additional config except columns, return a table with selection
      // 	if (
      // 		!isRoot
      // 		&& initiallySelectedRelations.length === 0
      // 		&& selectedExtras.length === 0
      // 		&& !where
      // 		&& orderBy.length === 0
      // 		&& limit === undefined
      // 		&& offset === undefined
      // 	) {
      // 		return {
      // 			tableTsKey: tableConfig.tsName,
      // 			sql: table,
      // 			selection: selectedColumns.map((key) => ({
      // 				dbKey: tableConfig.columns[key]!.name,
      // 				tsKey: key,
      // 				field: tableConfig.columns[key] as PgColumn,
      // 				relationTableTsKey: undefined,
      // 				isJson: false,
      // 				selection: [],
      // 			})),
      // 		};
      // 	}
      // 	const selectedRelationsWithoutPK:
      // 	// Process all relations without primary keys, because they need to be joined differently and will all be on the same query level
      // 	for (
      // 		const {
      // 			tsKey: selectedRelationTsKey,
      // 			queryConfig: selectedRelationConfigValue,
      // 			relation,
      // 		} of initiallySelectedRelations
      // 	) {
      // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
      // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
      // 		const relationTableTsName = tableNamesMap[relationTableName]!;
      // 		const relationTable = schema[relationTableTsName]!;
      // 		if (relationTable.primaryKey.length > 0) {
      // 			continue;
      // 		}
      // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
      // 		const joinOn = and(
      // 			...normalizedRelation.fields.map((field, i) =>
      // 				eq(
      // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
      // 					aliasedTableColumn(field, tableAlias),
      // 				)
      // 			),
      // 		);
      // 		const builtRelation = this.buildRelationalQueryWithoutPK({
      // 			fullSchema,
      // 			schema,
      // 			tableNamesMap,
      // 			table: fullSchema[relationTableTsName] as PgTable,
      // 			tableConfig: schema[relationTableTsName]!,
      // 			queryConfig: selectedRelationConfigValue,
      // 			tableAlias: relationTableAlias,
      // 			joinOn,
      // 			nestedQueryRelation: relation,
      // 		});
      // 		const field = sql`${sql.identifier(relationTableAlias)}.${sql.identifier('data')}`.as(selectedRelationTsKey);
      // 		joins.push({
      // 			on: sql`true`,
      // 			table: new Subquery(builtRelation.sql as SQL, {}, relationTableAlias),
      // 			alias: relationTableAlias,
      // 			joinType: 'left',
      // 			lateral: true,
      // 		});
      // 		selectedRelations.push({
      // 			dbKey: selectedRelationTsKey,
      // 			tsKey: selectedRelationTsKey,
      // 			field,
      // 			relationTableTsKey: relationTableTsName,
      // 			isJson: true,
      // 			selection: builtRelation.selection,
      // 		});
      // 	}
      // 	const oneRelations = initiallySelectedRelations.filter((r): r is typeof r & { relation: One } =>
      // 		is(r.relation, One)
      // 	);
      // 	// Process all One relations with PKs, because they can all be joined on the same level
      // 	for (
      // 		const {
      // 			tsKey: selectedRelationTsKey,
      // 			queryConfig: selectedRelationConfigValue,
      // 			relation,
      // 		} of oneRelations
      // 	) {
      // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
      // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
      // 		const relationTableTsName = tableNamesMap[relationTableName]!;
      // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
      // 		const relationTable = schema[relationTableTsName]!;
      // 		if (relationTable.primaryKey.length === 0) {
      // 			continue;
      // 		}
      // 		const joinOn = and(
      // 			...normalizedRelation.fields.map((field, i) =>
      // 				eq(
      // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
      // 					aliasedTableColumn(field, tableAlias),
      // 				)
      // 			),
      // 		);
      // 		const builtRelation = this.buildRelationalQueryWithPK({
      // 			fullSchema,
      // 			schema,
      // 			tableNamesMap,
      // 			table: fullSchema[relationTableTsName] as PgTable,
      // 			tableConfig: schema[relationTableTsName]!,
      // 			queryConfig: selectedRelationConfigValue,
      // 			tableAlias: relationTableAlias,
      // 			joinOn,
      // 		});
      // 		const field = sql`case when ${sql.identifier(relationTableAlias)} is null then null else json_build_array(${
      // 			sql.join(
      // 				builtRelation.selection.map(({ field }) =>
      // 					is(field, SQL.Aliased)
      // 						? sql`${sql.identifier(relationTableAlias)}.${sql.identifier(field.fieldAlias)}`
      // 						: is(field, Column)
      // 						? aliasedTableColumn(field, relationTableAlias)
      // 						: field
      // 				),
      // 				sql`, `,
      // 			)
      // 		}) end`.as(selectedRelationTsKey);
      // 		const isLateralJoin = is(builtRelation.sql, SQL);
      // 		joins.push({
      // 			on: isLateralJoin ? sql`true` : joinOn,
      // 			table: is(builtRelation.sql, SQL)
      // 				? new Subquery(builtRelation.sql, {}, relationTableAlias)
      // 				: aliasedTable(builtRelation.sql, relationTableAlias),
      // 			alias: relationTableAlias,
      // 			joinType: 'left',
      // 			lateral: is(builtRelation.sql, SQL),
      // 		});
      // 		selectedRelations.push({
      // 			dbKey: selectedRelationTsKey,
      // 			tsKey: selectedRelationTsKey,
      // 			field,
      // 			relationTableTsKey: relationTableTsName,
      // 			isJson: true,
      // 			selection: builtRelation.selection,
      // 		});
      // 	}
      // 	let distinct: PgSelectConfig['distinct'];
      // 	let tableFrom: PgTable | Subquery = table;
      // 	// Process first Many relation - each one requires a nested subquery
      // 	const manyRelation = manyRelations[0];
      // 	if (manyRelation) {
      // 		const {
      // 			tsKey: selectedRelationTsKey,
      // 			queryConfig: selectedRelationQueryConfig,
      // 			relation,
      // 		} = manyRelation;
      // 		distinct = {
      // 			on: tableConfig.primaryKey.map((c) => aliasedTableColumn(c as PgColumn, tableAlias)),
      // 		};
      // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
      // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
      // 		const relationTableTsName = tableNamesMap[relationTableName]!;
      // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
      // 		const joinOn = and(
      // 			...normalizedRelation.fields.map((field, i) =>
      // 				eq(
      // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
      // 					aliasedTableColumn(field, tableAlias),
      // 				)
      // 			),
      // 		);
      // 		const builtRelationJoin = this.buildRelationalQueryWithPK({
      // 			fullSchema,
      // 			schema,
      // 			tableNamesMap,
      // 			table: fullSchema[relationTableTsName] as PgTable,
      // 			tableConfig: schema[relationTableTsName]!,
      // 			queryConfig: selectedRelationQueryConfig,
      // 			tableAlias: relationTableAlias,
      // 			joinOn,
      // 		});
      // 		const builtRelationSelectionField = sql`case when ${
      // 			sql.identifier(relationTableAlias)
      // 		} is null then '[]' else json_agg(json_build_array(${
      // 			sql.join(
      // 				builtRelationJoin.selection.map(({ field }) =>
      // 					is(field, SQL.Aliased)
      // 						? sql`${sql.identifier(relationTableAlias)}.${sql.identifier(field.fieldAlias)}`
      // 						: is(field, Column)
      // 						? aliasedTableColumn(field, relationTableAlias)
      // 						: field
      // 				),
      // 				sql`, `,
      // 			)
      // 		})) over (partition by ${sql.join(distinct.on, sql`, `)}) end`.as(selectedRelationTsKey);
      // 		const isLateralJoin = is(builtRelationJoin.sql, SQL);
      // 		joins.push({
      // 			on: isLateralJoin ? sql`true` : joinOn,
      // 			table: isLateralJoin
      // 				? new Subquery(builtRelationJoin.sql as SQL, {}, relationTableAlias)
      // 				: aliasedTable(builtRelationJoin.sql as PgTable, relationTableAlias),
      // 			alias: relationTableAlias,
      // 			joinType: 'left',
      // 			lateral: isLateralJoin,
      // 		});
      // 		// Build the "from" subquery with the remaining Many relations
      // 		const builtTableFrom = this.buildRelationalQueryWithPK({
      // 			fullSchema,
      // 			schema,
      // 			tableNamesMap,
      // 			table,
      // 			tableConfig,
      // 			queryConfig: {
      // 				...config,
      // 				where: undefined,
      // 				orderBy: undefined,
      // 				limit: undefined,
      // 				offset: undefined,
      // 				with: manyRelations.slice(1).reduce<NonNullable<typeof config['with']>>(
      // 					(result, { tsKey, queryConfig: configValue }) => {
      // 						result[tsKey] = configValue;
      // 						return result;
      // 					},
      // 					{},
      // 				),
      // 			},
      // 			tableAlias,
      // 		});
      // 		selectedRelations.push({
      // 			dbKey: selectedRelationTsKey,
      // 			tsKey: selectedRelationTsKey,
      // 			field: builtRelationSelectionField,
      // 			relationTableTsKey: relationTableTsName,
      // 			isJson: true,
      // 			selection: builtRelationJoin.selection,
      // 		});
      // 		// selection = builtTableFrom.selection.map((item) =>
      // 		// 	is(item.field, SQL.Aliased)
      // 		// 		? { ...item, field: sql`${sql.identifier(tableAlias)}.${sql.identifier(item.field.fieldAlias)}` }
      // 		// 		: item
      // 		// );
      // 		// selectionForBuild = [{
      // 		// 	dbKey: '*',
      // 		// 	tsKey: '*',
      // 		// 	field: sql`${sql.identifier(tableAlias)}.*`,
      // 		// 	selection: [],
      // 		// 	isJson: false,
      // 		// 	relationTableTsKey: undefined,
      // 		// }];
      // 		// const newSelectionItem: (typeof selection)[number] = {
      // 		// 	dbKey: selectedRelationTsKey,
      // 		// 	tsKey: selectedRelationTsKey,
      // 		// 	field,
      // 		// 	relationTableTsKey: relationTableTsName,
      // 		// 	isJson: true,
      // 		// 	selection: builtRelationJoin.selection,
      // 		// };
      // 		// selection.push(newSelectionItem);
      // 		// selectionForBuild.push(newSelectionItem);
      // 		tableFrom = is(builtTableFrom.sql, PgTable)
      // 			? builtTableFrom.sql
      // 			: new Subquery(builtTableFrom.sql, {}, tableAlias);
      // 	}
      // 	if (selectedColumns.length === 0 && selectedRelations.length === 0 && selectedExtras.length === 0) {
      // 		throw new DrizzleError(`No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")`);
      // 	}
      // 	let selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'];
      // 	function prepareSelectedColumns() {
      // 		return selectedColumns.map((key) => ({
      // 			dbKey: tableConfig.columns[key]!.name,
      // 			tsKey: key,
      // 			field: tableConfig.columns[key] as PgColumn,
      // 			relationTableTsKey: undefined,
      // 			isJson: false,
      // 			selection: [],
      // 		}));
      // 	}
      // 	function prepareSelectedExtras() {
      // 		return selectedExtras.map((item) => ({
      // 			dbKey: item.value.fieldAlias,
      // 			tsKey: item.tsKey,
      // 			field: item.value,
      // 			relationTableTsKey: undefined,
      // 			isJson: false,
      // 			selection: [],
      // 		}));
      // 	}
      // 	if (isRoot) {
      // 		selection = [
      // 			...prepareSelectedColumns(),
      // 			...prepareSelectedExtras(),
      // 		];
      // 	}
      // 	if (hasUserDefinedWhere || orderBy.length > 0) {
      // 		tableFrom = new Subquery(
      // 			this.buildSelectQuery({
      // 				table: is(tableFrom, PgTable) ? aliasedTable(tableFrom, tableAlias) : tableFrom,
      // 				fields: {},
      // 				fieldsFlat: selectionForBuild.map(({ field }) => ({
      // 					path: [],
      // 					field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
      // 				})),
      // 				joins,
      // 				distinct,
      // 			}),
      // 			{},
      // 			tableAlias,
      // 		);
      // 		selectionForBuild = selection.map((item) =>
      // 			is(item.field, SQL.Aliased)
      // 				? { ...item, field: sql`${sql.identifier(tableAlias)}.${sql.identifier(item.field.fieldAlias)}` }
      // 				: item
      // 		);
      // 		joins = [];
      // 		distinct = undefined;
      // 	}
      // 	const result = this.buildSelectQuery({
      // 		table: is(tableFrom, PgTable) ? aliasedTable(tableFrom, tableAlias) : tableFrom,
      // 		fields: {},
      // 		fieldsFlat: selectionForBuild.map(({ field }) => ({
      // 			path: [],
      // 			field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
      // 		})),
      // 		where,
      // 		limit,
      // 		offset,
      // 		joins,
      // 		orderBy,
      // 		distinct,
      // 	});
      // 	return {
      // 		tableTsKey: tableConfig.tsName,
      // 		sql: result,
      // 		selection,
      // 	};
      // }
      buildRelationalQueryWithoutPK({ fullSchema, schema: schema2, tableNamesMap, table, tableConfig, queryConfig: config, tableAlias, nestedQueryRelation, joinOn }) {
        let selection = [];
        let limit, offset, orderBy = [], where;
        const joins = [];
        if (config === true) {
          const selectionEntries = Object.entries(tableConfig.columns);
          selection = selectionEntries.map(([key2, value]) => ({
            dbKey: value.name,
            tsKey: key2,
            field: aliasedTableColumn(value, tableAlias),
            relationTableTsKey: void 0,
            isJson: false,
            selection: []
          }));
        } else {
          const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key2, value]) => [key2, aliasedTableColumn(value, tableAlias)]));
          if (config.where) {
            const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, getOperators()) : config.where;
            where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
          }
          const fieldsSelection = [];
          let selectedColumns = [];
          if (config.columns) {
            let isIncludeMode = false;
            for (const [field, value] of Object.entries(config.columns)) {
              if (value === void 0) {
                continue;
              }
              if (field in tableConfig.columns) {
                if (!isIncludeMode && value === true) {
                  isIncludeMode = true;
                }
                selectedColumns.push(field);
              }
            }
            if (selectedColumns.length > 0) {
              selectedColumns = isIncludeMode ? selectedColumns.filter((c2) => config.columns?.[c2] === true) : Object.keys(tableConfig.columns).filter((key2) => !selectedColumns.includes(key2));
            }
          } else {
            selectedColumns = Object.keys(tableConfig.columns);
          }
          for (const field of selectedColumns) {
            const column = tableConfig.columns[field];
            fieldsSelection.push({ tsKey: field, value: column });
          }
          let selectedRelations = [];
          if (config.with) {
            selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
          }
          let extras;
          if (config.extras) {
            extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql: sql2 }) : config.extras;
            for (const [tsKey, value] of Object.entries(extras)) {
              fieldsSelection.push({
                tsKey,
                value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
              });
            }
          }
          for (const { tsKey, value } of fieldsSelection) {
            selection.push({
              dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
              tsKey,
              field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
              relationTableTsKey: void 0,
              isJson: false,
              selection: []
            });
          }
          let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, getOrderByOperators()) : config.orderBy ?? [];
          if (!Array.isArray(orderByOrig)) {
            orderByOrig = [orderByOrig];
          }
          orderBy = orderByOrig.map((orderByValue) => {
            if (is(orderByValue, Column)) {
              return aliasedTableColumn(orderByValue, tableAlias);
            }
            return mapColumnsInSQLToAlias(orderByValue, tableAlias);
          });
          limit = config.limit;
          offset = config.offset;
          for (const { tsKey: selectedRelationTsKey, queryConfig: selectedRelationConfigValue, relation } of selectedRelations) {
            const normalizedRelation = normalizeRelation(schema2, tableNamesMap, relation);
            const relationTableName = relation.referencedTable[Table.Symbol.Name];
            const relationTableTsName = tableNamesMap[relationTableName];
            const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
            const joinOn2 = and(...normalizedRelation.fields.map((field2, i) => eq(aliasedTableColumn(normalizedRelation.references[i], relationTableAlias), aliasedTableColumn(field2, tableAlias))));
            const builtRelation = this.buildRelationalQueryWithoutPK({
              fullSchema,
              schema: schema2,
              tableNamesMap,
              table: fullSchema[relationTableTsName],
              tableConfig: schema2[relationTableTsName],
              queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
              tableAlias: relationTableAlias,
              joinOn: joinOn2,
              nestedQueryRelation: relation
            });
            const field = sql2`${sql2.identifier(relationTableAlias)}.${sql2.identifier("data")}`.as(selectedRelationTsKey);
            joins.push({
              on: sql2`true`,
              table: new Subquery(builtRelation.sql, {}, relationTableAlias),
              alias: relationTableAlias,
              joinType: "left",
              lateral: true
            });
            selection.push({
              dbKey: selectedRelationTsKey,
              tsKey: selectedRelationTsKey,
              field,
              relationTableTsKey: relationTableTsName,
              isJson: true,
              selection: builtRelation.selection
            });
          }
        }
        if (selection.length === 0) {
          throw new DrizzleError(`No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")`);
        }
        let result;
        where = and(joinOn, where);
        if (nestedQueryRelation) {
          let field = sql2`json_build_array(${sql2.join(selection.map(({ field: field2, tsKey, isJson }) => isJson ? sql2`${sql2.identifier(`${tableAlias}_${tsKey}`)}.${sql2.identifier("data")}` : is(field2, SQL.Aliased) ? field2.sql : field2), sql2`, `)})`;
          if (is(nestedQueryRelation, Many)) {
            field = sql2`coalesce(json_agg(${field}${orderBy.length > 0 ? sql2` order by ${sql2.join(orderBy, sql2`, `)}` : void 0}), '[]'::json)`;
          }
          const nestedSelection = [{
            dbKey: "data",
            tsKey: "data",
            field: field.as("data"),
            isJson: true,
            relationTableTsKey: tableConfig.tsName,
            selection
          }];
          const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
          if (needsSubquery) {
            result = this.buildSelectQuery({
              table: aliasedTable(table, tableAlias),
              fields: {},
              fieldsFlat: [{
                path: [],
                field: sql2.raw("*")
              }],
              where,
              limit,
              offset,
              orderBy
            });
            where = void 0;
            limit = void 0;
            offset = void 0;
            orderBy = [];
          } else {
            result = aliasedTable(table, tableAlias);
          }
          result = this.buildSelectQuery({
            table: is(result, PgTable) ? result : new Subquery(result, {}, tableAlias),
            fields: {},
            fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
              path: [],
              field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
            })),
            joins,
            where,
            limit,
            offset,
            orderBy
          });
        } else {
          result = this.buildSelectQuery({
            table: aliasedTable(table, tableAlias),
            fields: {},
            fieldsFlat: selection.map(({ field }) => ({
              path: [],
              field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
            })),
            joins,
            where,
            limit,
            offset,
            orderBy
          });
        }
        return {
          tableTsKey: tableConfig.tsName,
          sql: result,
          selection
        };
      }
    };
    _a47 = entityKind;
    __publicField(PgDialect, _a47, "PgDialect");
    TypedQueryBuilder = class {
      /** @internal */
      getSelectedFields() {
        return this._.selectedFields;
      }
    };
    _a48 = entityKind;
    __publicField(TypedQueryBuilder, _a48, "TypedQueryBuilder");
    PgSelectBuilder = class {
      constructor(config) {
        __publicField(this, "fields");
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "withList", []);
        __publicField(this, "distinct");
        this.fields = config.fields;
        this.session = config.session;
        this.dialect = config.dialect;
        if (config.withList) {
          this.withList = config.withList;
        }
        this.distinct = config.distinct;
      }
      /**
       * Specify the table, subquery, or other target that you're
       * building a select query against.
       *
       * {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FROM|Postgres from documentation}
       */
      from(source) {
        const isPartialSelect = !!this.fields;
        let fields;
        if (this.fields) {
          fields = this.fields;
        } else if (is(source, Subquery)) {
          fields = Object.fromEntries(Object.keys(source[SubqueryConfig].selection).map((key2) => [key2, source[key2]]));
        } else if (is(source, PgViewBase)) {
          fields = source[ViewBaseConfig].selectedFields;
        } else if (is(source, SQL)) {
          fields = {};
        } else {
          fields = getTableColumns(source);
        }
        return new PgSelect({
          table: source,
          fields,
          isPartialSelect,
          session: this.session,
          dialect: this.dialect,
          withList: this.withList,
          distinct: this.distinct
        });
      }
    };
    _a49 = entityKind;
    __publicField(PgSelectBuilder, _a49, "PgSelectBuilder");
    PgSelectQueryBuilder = class extends TypedQueryBuilder {
      constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
        super();
        __publicField(this, "_");
        __publicField(this, "config");
        __publicField(this, "joinsNotNullableMap");
        __publicField(this, "tableName");
        __publicField(this, "isPartialSelect");
        __publicField(this, "session");
        __publicField(this, "dialect");
        /**
         * For each row of the table, include
         * values from a matching row of the joined
         * table, if there is a matching row. If not,
         * all of the columns of the joined table
         * will be set to null.
         */
        __publicField(this, "leftJoin", this.createJoin("left"));
        /**
         * Includes all of the rows of the joined table.
         * If there is no matching row in the main table,
         * all the columns of the main table will be
         * set to null.
         */
        __publicField(this, "rightJoin", this.createJoin("right"));
        /**
         * This is the default type of join.
         *
         * For each row of the table, the joined table
         * needs to have a matching row, or it will
         * be excluded from results.
         */
        __publicField(this, "innerJoin", this.createJoin("inner"));
        /**
         * Rows from both the main & joined are included,
         * regardless of whether or not they have matching
         * rows in the other table.
         */
        __publicField(this, "fullJoin", this.createJoin("full"));
        this.config = {
          withList,
          table,
          fields: { ...fields },
          distinct
        };
        this.isPartialSelect = isPartialSelect;
        this.session = session;
        this.dialect = dialect;
        this._ = {
          selectedFields: fields
        };
        this.tableName = getTableLikeName(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
      }
      createJoin(joinType) {
        return (table, on) => {
          const baseTableName = this.tableName;
          const tableName = getTableLikeName(table);
          if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (!this.isPartialSelect) {
            if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
              this.config.fields = {
                [baseTableName]: this.config.fields
              };
            }
            if (typeof tableName === "string" && !is(table, SQL)) {
              const selection = is(table, Subquery) ? table[SubqueryConfig].selection : is(table, View) ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
              this.config.fields[tableName] = selection;
            }
          }
          if (typeof on === "function") {
            on = on(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
          }
          if (!this.config.joins) {
            this.config.joins = [];
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          if (typeof tableName === "string") {
            switch (joinType) {
              case "left": {
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
              case "right": {
                this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key2]) => [key2, false]));
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "inner": {
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "full": {
                this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key2]) => [key2, false]));
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
            }
          }
          return this;
        };
      }
      /**
       * Specify a condition to narrow the result set. Multiple
       * conditions can be combined with the `and` and `or`
       * functions.
       *
       * ## Examples
       *
       * ```ts
       * // Find cars made in the year 2000
       * db.select().from(cars).where(eq(cars.year, 2000));
       * ```
       */
      where(where) {
        if (typeof where === "function") {
          where = where(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
        }
        this.config.where = where;
        return this;
      }
      /**
       * Sets the HAVING clause of this query, which often
       * used with GROUP BY and filters rows after they've been
       * grouped together and combined.
       *
       * {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-HAVING|Postgres having clause documentation}
       */
      having(having) {
        if (typeof having === "function") {
          having = having(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
        }
        this.config.having = having;
        return this;
      }
      groupBy(...columns) {
        if (typeof columns[0] === "function") {
          const groupBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
          this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
        } else {
          this.config.groupBy = columns;
        }
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
          this.config.orderBy = Array.isArray(orderBy) ? orderBy : [orderBy];
        } else {
          this.config.orderBy = columns;
        }
        return this;
      }
      /**
       * Set the maximum number of rows that will be
       * returned by this query.
       *
       * ## Examples
       *
       * ```ts
       * // Get the first 10 people from this query.
       * db.select().from(people).limit(10);
       * ```
       *
       * {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-LIMIT|Postgres LIMIT documentation}
       */
      limit(limit) {
        this.config.limit = limit;
        return this;
      }
      /**
       * Skip a number of rows when returning results
       * from this query.
       *
       * ## Examples
       *
       * ```ts
       * // Get the 10th-20th people from this query.
       * db.select().from(people).offset(10).limit(10);
       * ```
       */
      offset(offset) {
        this.config.offset = offset;
        return this;
      }
      /**
       * The FOR clause specifies a lock strength for this query
       * that controls how strictly it acquires exclusive access to
       * the rows being queried.
       *
       * {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE|Postgres locking clause documentation}
       */
      for(strength, config = {}) {
        if (!this.config.lockingClauses) {
          this.config.lockingClauses = [];
        }
        this.config.lockingClauses.push({ strength, config });
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildSelectQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      as(alias) {
        return new Proxy(new Subquery(this.getSQL(), this.config.fields, alias), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
    _a50 = entityKind;
    __publicField(PgSelectQueryBuilder, _a50, "PgSelectQueryBuilder");
    PgSelect = class extends PgSelectQueryBuilder {
      constructor() {
        super(...arguments);
        __publicField(this, "execute", (placeholderValues) => {
          return tracer.startActiveSpan("drizzle.operation", () => {
            return this._prepare().execute(placeholderValues);
          });
        });
      }
      _prepare(name2) {
        const { session, config, dialect, joinsNotNullableMap } = this;
        if (!session) {
          throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        }
        return tracer.startActiveSpan("drizzle.prepareQuery", () => {
          const fieldsList = orderSelectedFields(config.fields);
          const query = session.prepareQuery(dialect.sqlToQuery(this.getSQL()), fieldsList, name2);
          query.joinsNotNullableMap = joinsNotNullableMap;
          return query;
        });
      }
      /**
       * Create a prepared statement for this query. This allows
       * the database to remember this query for the given session
       * and call it by name, rather than specifying the full query.
       *
       * {@link https://www.postgresql.org/docs/current/sql-prepare.html|Postgres prepare documentation}
       */
      prepare(name2) {
        return this._prepare(name2);
      }
    };
    _a51 = entityKind;
    __publicField(PgSelect, _a51, "PgSelect");
    applyMixins(PgSelect, [QueryPromise]);
    QueryBuilder = class {
      constructor() {
        __publicField(this, "dialect");
      }
      $with(alias) {
        const queryBuilder = this;
        return {
          as(qb) {
            if (typeof qb === "function") {
              qb = qb(queryBuilder);
            }
            return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
          }
        };
      }
      with(...queries) {
        const self = this;
        function select(fields) {
          return new PgSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new PgSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            distinct: true
          });
        }
        function selectDistinctOn(on, fields) {
          return new PgSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            distinct: { on }
          });
        }
        return { select, selectDistinct, selectDistinctOn };
      }
      select(fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect()
        });
      }
      selectDistinct(fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect(),
          distinct: true
        });
      }
      selectDistinctOn(on, fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect(),
          distinct: { on }
        });
      }
      // Lazy load dialect to avoid circular dependency
      getDialect() {
        if (!this.dialect) {
          this.dialect = new PgDialect();
        }
        return this.dialect;
      }
    };
    _a52 = entityKind;
    __publicField(QueryBuilder, _a52, "PgQueryBuilder");
    DefaultViewBuilderCore = class {
      constructor(name2, schema2) {
        __publicField(this, "name");
        __publicField(this, "schema");
        __publicField(this, "config", {});
        this.name = name2;
        this.schema = schema2;
      }
      with(config) {
        this.config.with = config;
        return this;
      }
    };
    _a53 = entityKind;
    __publicField(DefaultViewBuilderCore, _a53, "PgDefaultViewBuilderCore");
    ViewBuilder = class extends DefaultViewBuilderCore {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder());
        }
        const selectionProxy = new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        });
        const aliasedSelection = new Proxy(qb.getSelectedFields(), selectionProxy);
        return new Proxy(new PgView({
          pgConfig: this.config,
          config: {
            name: this.name,
            schema: this.schema,
            selectedFields: aliasedSelection,
            query: qb.getSQL().inlineParams()
          }
        }), selectionProxy);
      }
    };
    _a54 = entityKind;
    __publicField(ViewBuilder, _a54, "PgViewBuilder");
    ManualViewBuilder = class extends DefaultViewBuilderCore {
      constructor(name2, columns, schema2) {
        super(name2, schema2);
        __publicField(this, "columns");
        this.columns = getTableColumns(pgTable(name2, columns));
      }
      existing() {
        return new Proxy(new PgView({
          pgConfig: void 0,
          config: {
            name: this.name,
            schema: this.schema,
            selectedFields: this.columns,
            query: void 0
          }
        }), new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        }));
      }
      as(query) {
        return new Proxy(new PgView({
          pgConfig: this.config,
          config: {
            name: this.name,
            schema: this.schema,
            selectedFields: this.columns,
            query: query.inlineParams()
          }
        }), new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        }));
      }
    };
    _a55 = entityKind;
    __publicField(ManualViewBuilder, _a55, "PgManualViewBuilder");
    MaterializedViewBuilderCore = class {
      constructor(name2, schema2) {
        __publicField(this, "name");
        __publicField(this, "schema");
        __publicField(this, "config", {});
        this.name = name2;
        this.schema = schema2;
      }
      using(using) {
        this.config.using = using;
        return this;
      }
      with(config) {
        this.config.with = config;
        return this;
      }
      tablespace(tablespace) {
        this.config.tablespace = tablespace;
        return this;
      }
      withNoData() {
        this.config.withNoData = true;
        return this;
      }
    };
    _a56 = entityKind;
    __publicField(MaterializedViewBuilderCore, _a56, "PgMaterializedViewBuilderCore");
    MaterializedViewBuilder = class extends MaterializedViewBuilderCore {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder());
        }
        const selectionProxy = new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        });
        const aliasedSelection = new Proxy(qb.getSelectedFields(), selectionProxy);
        return new Proxy(new PgMaterializedView({
          pgConfig: {
            with: this.config.with,
            using: this.config.using,
            tablespace: this.config.tablespace,
            withNoData: this.config.withNoData
          },
          config: {
            name: this.name,
            schema: this.schema,
            selectedFields: aliasedSelection,
            query: qb.getSQL().inlineParams()
          }
        }), selectionProxy);
      }
    };
    _a57 = entityKind;
    __publicField(MaterializedViewBuilder, _a57, "PgMaterializedViewBuilder");
    ManualMaterializedViewBuilder = class extends MaterializedViewBuilderCore {
      constructor(name2, columns, schema2) {
        super(name2, schema2);
        __publicField(this, "columns");
        this.columns = getTableColumns(pgTable(name2, columns));
      }
      existing() {
        return new Proxy(new PgMaterializedView({
          pgConfig: void 0,
          config: {
            name: this.name,
            schema: this.schema,
            selectedFields: this.columns,
            query: void 0
          }
        }), new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        }));
      }
      as(query) {
        return new Proxy(new PgMaterializedView({
          pgConfig: void 0,
          config: {
            name: this.name,
            schema: this.schema,
            selectedFields: this.columns,
            query: query.inlineParams()
          }
        }), new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        }));
      }
    };
    _a58 = entityKind;
    __publicField(ManualMaterializedViewBuilder, _a58, "PgManualMaterializedViewBuilder");
    PgViewBase = class extends View {
    };
    _a59 = entityKind;
    __publicField(PgViewBase, _a59, "PgViewBase");
    PgViewConfig = Symbol.for("drizzle:PgViewConfig");
    PgView = class extends PgViewBase {
      constructor({ pgConfig, config }) {
        super(config);
        __publicField(this, _b6);
        if (pgConfig) {
          this[PgViewConfig] = {
            with: pgConfig.with
          };
        }
      }
    };
    _a60 = entityKind, _b6 = PgViewConfig;
    __publicField(PgView, _a60, "PgView");
    PgMaterializedViewConfig = Symbol.for("drizzle:PgMaterializedViewConfig");
    PgMaterializedView = class extends PgViewBase {
      constructor({ pgConfig, config }) {
        super(config);
        __publicField(this, _b7);
        this[PgMaterializedViewConfig] = {
          with: pgConfig?.with,
          using: pgConfig?.using,
          tablespace: pgConfig?.tablespace,
          withNoData: pgConfig?.withNoData
        };
      }
    };
    _a61 = entityKind, _b7 = PgMaterializedViewConfig;
    __publicField(PgMaterializedView, _a61, "PgMaterializedView");
    Relation = class {
      constructor(sourceTable, referencedTable, relationName) {
        __publicField(this, "sourceTable");
        __publicField(this, "referencedTable");
        __publicField(this, "relationName");
        __publicField(this, "referencedTableName");
        __publicField(this, "fieldName");
        this.sourceTable = sourceTable;
        this.referencedTable = referencedTable;
        this.relationName = relationName;
        this.referencedTableName = referencedTable[Table.Symbol.Name];
      }
    };
    _a62 = entityKind;
    __publicField(Relation, _a62, "Relation");
    Relations = class {
      constructor(table, config) {
        __publicField(this, "table");
        __publicField(this, "config");
        this.table = table;
        this.config = config;
      }
    };
    _a63 = entityKind;
    __publicField(Relations, _a63, "Relations");
    _One = class _One extends Relation {
      constructor(sourceTable, referencedTable, config, isNullable) {
        super(sourceTable, referencedTable, config?.relationName);
        __publicField(this, "config");
        __publicField(this, "isNullable");
        this.config = config;
        this.isNullable = isNullable;
      }
      withFieldName(fieldName) {
        const relation = new _One(this.sourceTable, this.referencedTable, this.config, this.isNullable);
        relation.fieldName = fieldName;
        return relation;
      }
    };
    _a64 = entityKind;
    __publicField(_One, _a64, "One");
    One = _One;
    _Many = class _Many extends Relation {
      constructor(sourceTable, referencedTable, config) {
        super(sourceTable, referencedTable, config?.relationName);
        __publicField(this, "config");
        this.config = config;
      }
      withFieldName(fieldName) {
        const relation = new _Many(this.sourceTable, this.referencedTable, this.config);
        relation.fieldName = fieldName;
        return relation;
      }
    };
    _a65 = entityKind;
    __publicField(_Many, _a65, "Many");
    Many = _Many;
    eq = (left, right) => {
      return sql2`${left} = ${bindIfParam(right, left)}`;
    };
    ne = (left, right) => {
      return sql2`${left} <> ${bindIfParam(right, left)}`;
    };
    gt = (left, right) => {
      return sql2`${left} > ${bindIfParam(right, left)}`;
    };
    gte = (left, right) => {
      return sql2`${left} >= ${bindIfParam(right, left)}`;
    };
    lt = (left, right) => {
      return sql2`${left} < ${bindIfParam(right, left)}`;
    };
    lte = (left, right) => {
      return sql2`${left} <= ${bindIfParam(right, left)}`;
    };
    FakePrimitiveParam = class {
    };
    _a66 = entityKind;
    __publicField(FakePrimitiveParam, _a66, "FakePrimitiveParam");
    StringChunk = class {
      constructor(value) {
        __publicField(this, "value");
        this.value = Array.isArray(value) ? value : [value];
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a67 = entityKind;
    __publicField(StringChunk, _a67, "StringChunk");
    _SQL = class _SQL {
      constructor(queryChunks) {
        __publicField(this, "queryChunks");
        /** @internal */
        __publicField(this, "decoder", noopDecoder);
        __publicField(this, "shouldInlineParams", false);
        this.queryChunks = queryChunks;
      }
      append(query) {
        this.queryChunks.push(...query.queryChunks);
        return this;
      }
      toQuery(config) {
        return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
          const query = this.buildQueryFromSourceParams(this.queryChunks, config);
          span?.setAttributes({
            "drizzle.query.text": query.sql,
            "drizzle.query.params": JSON.stringify(query.params)
          });
          return query;
        });
      }
      buildQueryFromSourceParams(chunks, _config) {
        const config = Object.assign({}, _config, {
          inlineParams: _config.inlineParams || this.shouldInlineParams,
          paramStartIndex: _config.paramStartIndex || { value: 0 }
        });
        const { escapeName, escapeParam, prepareTyping, inlineParams, paramStartIndex } = config;
        return mergeQueries(chunks.map((chunk) => {
          if (is(chunk, StringChunk)) {
            return { sql: chunk.value.join(""), params: [] };
          }
          if (is(chunk, Name)) {
            return { sql: escapeName(chunk.value), params: [] };
          }
          if (chunk === void 0) {
            return { sql: "", params: [] };
          }
          if (Array.isArray(chunk)) {
            const result = [new StringChunk("(")];
            for (const [i, p2] of chunk.entries()) {
              result.push(p2);
              if (i < chunk.length - 1) {
                result.push(new StringChunk(", "));
              }
            }
            result.push(new StringChunk(")"));
            return this.buildQueryFromSourceParams(result, config);
          }
          if (is(chunk, _SQL)) {
            return this.buildQueryFromSourceParams(chunk.queryChunks, {
              ...config,
              inlineParams: inlineParams || chunk.shouldInlineParams
            });
          }
          if (is(chunk, Table)) {
            const schemaName = chunk[Table.Symbol.Schema];
            const tableName = chunk[Table.Symbol.Name];
            return {
              sql: schemaName === void 0 ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
              params: []
            };
          }
          if (is(chunk, Column)) {
            return { sql: escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(chunk.name), params: [] };
          }
          if (is(chunk, View)) {
            const schemaName = chunk[ViewBaseConfig].schema;
            const viewName = chunk[ViewBaseConfig].name;
            return {
              sql: schemaName === void 0 ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
              params: []
            };
          }
          if (is(chunk, Param)) {
            const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
            if (is(mappedValue, _SQL)) {
              return this.buildQueryFromSourceParams([mappedValue], config);
            }
            if (inlineParams) {
              return { sql: this.mapInlineParam(mappedValue, config), params: [] };
            }
            let typings;
            if (prepareTyping !== void 0) {
              typings = [prepareTyping(chunk.encoder)];
            }
            return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
          }
          if (is(chunk, Placeholder)) {
            return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
          }
          if (is(chunk, _SQL.Aliased) && chunk.fieldAlias !== void 0) {
            return { sql: escapeName(chunk.fieldAlias), params: [] };
          }
          if (is(chunk, Subquery)) {
            if (chunk[SubqueryConfig].isWith) {
              return { sql: escapeName(chunk[SubqueryConfig].alias), params: [] };
            }
            return this.buildQueryFromSourceParams([
              new StringChunk("("),
              chunk[SubqueryConfig].sql,
              new StringChunk(") "),
              new Name(chunk[SubqueryConfig].alias)
            ], config);
          }
          if (isSQLWrapper(chunk)) {
            return this.buildQueryFromSourceParams([
              new StringChunk("("),
              chunk.getSQL(),
              new StringChunk(")")
            ], config);
          }
          if (is(chunk, Relation)) {
            return this.buildQueryFromSourceParams([
              chunk.sourceTable,
              new StringChunk("."),
              sql2.identifier(chunk.fieldName)
            ], config);
          }
          if (inlineParams) {
            return { sql: this.mapInlineParam(chunk, config), params: [] };
          }
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
        }));
      }
      mapInlineParam(chunk, { escapeString }) {
        if (chunk === null) {
          return "null";
        }
        if (typeof chunk === "number" || typeof chunk === "boolean") {
          return chunk.toString();
        }
        if (typeof chunk === "string") {
          return escapeString(chunk);
        }
        if (typeof chunk === "object") {
          const mappedValueAsString = chunk.toString();
          if (mappedValueAsString === "[object Object]") {
            return escapeString(JSON.stringify(chunk));
          }
          return escapeString(mappedValueAsString);
        }
        throw new Error("Unexpected param value: " + chunk);
      }
      getSQL() {
        return this;
      }
      as(alias) {
        if (alias === void 0) {
          return this;
        }
        return new _SQL.Aliased(this, alias);
      }
      mapWith(decoder) {
        this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
        return this;
      }
      inlineParams() {
        this.shouldInlineParams = true;
        return this;
      }
    };
    _a68 = entityKind;
    __publicField(_SQL, _a68, "SQL");
    SQL = _SQL;
    Name = class {
      constructor(value) {
        __publicField(this, "value");
        __publicField(this, "brand");
        this.value = value;
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a69 = entityKind;
    __publicField(Name, _a69, "Name");
    noopDecoder = {
      mapFromDriverValue: (value) => value
    };
    noopEncoder = {
      mapToDriverValue: (value) => value
    };
    noopMapper = {
      ...noopDecoder,
      ...noopEncoder
    };
    Param = class {
      /**
       * @param value - Parameter value
       * @param encoder - Encoder to convert the value to a driver parameter
       */
      constructor(value, encoder3 = noopEncoder) {
        __publicField(this, "value");
        __publicField(this, "encoder");
        __publicField(this, "brand");
        this.value = value;
        this.encoder = encoder3;
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a70 = entityKind;
    __publicField(Param, _a70, "Param");
    (function(sql3) {
      function empty() {
        return new SQL([]);
      }
      sql3.empty = empty;
      function fromList(list) {
        return new SQL(list);
      }
      sql3.fromList = fromList;
      function raw(str) {
        return new SQL([new StringChunk(str)]);
      }
      sql3.raw = raw;
      function join(chunks, separator) {
        const result = [];
        for (const [i, chunk] of chunks.entries()) {
          if (i > 0 && separator !== void 0) {
            result.push(separator);
          }
          result.push(chunk);
        }
        return new SQL(result);
      }
      sql3.join = join;
      function identifier(value) {
        return new Name(value);
      }
      sql3.identifier = identifier;
      function placeholder2(name2) {
        return new Placeholder(name2);
      }
      sql3.placeholder = placeholder2;
      function param2(value, encoder3) {
        return new Param(value, encoder3);
      }
      sql3.param = param2;
    })(sql2 || (sql2 = {}));
    (function(SQL2) {
      var _a299;
      const _Aliased = class _Aliased {
        constructor(sql3, fieldAlias) {
          __publicField(this, "sql");
          __publicField(this, "fieldAlias");
          /** @internal */
          __publicField(this, "isSelectionField", false);
          this.sql = sql3;
          this.fieldAlias = fieldAlias;
        }
        getSQL() {
          return this.sql;
        }
        /** @internal */
        clone() {
          return new _Aliased(this.sql, this.fieldAlias);
        }
      };
      _a299 = entityKind;
      __publicField(_Aliased, _a299, "SQL.Aliased");
      let Aliased = _Aliased;
      SQL2.Aliased = Aliased;
    })(SQL || (SQL = {}));
    Placeholder = class {
      constructor(name2) {
        __publicField(this, "name");
        this.name = name2;
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a71 = entityKind;
    __publicField(Placeholder, _a71, "Placeholder");
    Column.prototype.getSQL = function() {
      return new SQL([this]);
    };
    ColumnAliasProxyHandler = class {
      constructor(table) {
        __publicField(this, "table");
        this.table = table;
      }
      get(columnObj, prop) {
        if (prop === "table") {
          return this.table;
        }
        return columnObj[prop];
      }
    };
    _a72 = entityKind;
    __publicField(ColumnAliasProxyHandler, _a72, "ColumnAliasProxyHandler");
    TableAliasProxyHandler = class {
      constructor(alias, replaceOriginalName) {
        __publicField(this, "alias");
        __publicField(this, "replaceOriginalName");
        this.alias = alias;
        this.replaceOriginalName = replaceOriginalName;
      }
      get(target, prop) {
        if (prop === Table.Symbol.IsAlias) {
          return true;
        }
        if (prop === Table.Symbol.Name) {
          return this.alias;
        }
        if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
          return this.alias;
        }
        if (prop === ViewBaseConfig) {
          return {
            ...target[ViewBaseConfig],
            name: this.alias,
            isAlias: true
          };
        }
        if (prop === Table.Symbol.Columns) {
          const columns = target[Table.Symbol.Columns];
          if (!columns) {
            return columns;
          }
          const proxiedColumns = {};
          Object.keys(columns).map((key2) => {
            proxiedColumns[key2] = new Proxy(columns[key2], new ColumnAliasProxyHandler(new Proxy(target, this)));
          });
          return proxiedColumns;
        }
        const value = target[prop];
        if (is(value, Column)) {
          return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
        }
        return value;
      }
    };
    _a73 = entityKind;
    __publicField(TableAliasProxyHandler, _a73, "TableAliasProxyHandler");
    RelationTableAliasProxyHandler = class {
      constructor(alias) {
        __publicField(this, "alias");
        this.alias = alias;
      }
      get(target, prop) {
        if (prop === "sourceTable") {
          return aliasedTable(target.sourceTable, this.alias);
        }
        return target[prop];
      }
    };
    _a74 = entityKind;
    __publicField(RelationTableAliasProxyHandler, _a74, "RelationTableAliasProxyHandler");
  }
});

// node_modules/drizzle-orm/index.mjs
var _a75, ConsoleLogWriter, _a76, DefaultLogger, _a77, NoopLogger;
var init_drizzle_orm = __esm({
  "node_modules/drizzle-orm/index.mjs"() {
    init_alias_cf8e03cd();
    init_alias_cf8e03cd();
    ConsoleLogWriter = class {
      write(message) {
        console.log(message);
      }
    };
    _a75 = entityKind;
    __publicField(ConsoleLogWriter, _a75, "ConsoleLogWriter");
    DefaultLogger = class {
      constructor(config) {
        __publicField(this, "writer");
        this.writer = config?.writer ?? new ConsoleLogWriter();
      }
      logQuery(query, params) {
        const stringifiedParams = params.map((p2) => {
          try {
            return JSON.stringify(p2);
          } catch {
            return String(p2);
          }
        });
        const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
        this.writer.write(`Query: ${query}${paramsStr}`);
      }
    };
    _a76 = entityKind;
    __publicField(DefaultLogger, _a76, "DefaultLogger");
    NoopLogger = class {
      logQuery() {
      }
    };
    _a77 = entityKind;
    __publicField(NoopLogger, _a77, "NoopLogger");
  }
});

// node_modules/drizzle-orm/session-6ea797a6.mjs
var _a78, PgDelete, _a79, PgInsertBuilder, _a80, PgInsert, _a81, PgRefreshMaterializedView, _a82, PgUpdateBuilder, _a83, PgUpdate, _a84, RelationalQueryBuilder, _a85, PgRelationalQuery, _a86, PgDatabase, _a87, PreparedQuery, _a88, PgSession, _a89, PgTransaction;
var init_session_6ea797a6 = __esm({
  "node_modules/drizzle-orm/session-6ea797a6.mjs"() {
    init_alias_cf8e03cd();
    PgDelete = class extends QueryPromise {
      constructor(table, session, dialect) {
        super();
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "config");
        __publicField(this, "execute", (placeholderValues) => {
          return tracer.startActiveSpan("drizzle.operation", () => {
            return this._prepare().execute(placeholderValues);
          });
        });
        this.session = session;
        this.dialect = dialect;
        this.config = { table };
      }
      where(where) {
        this.config.where = where;
        return this;
      }
      returning(fields = this.config.table[Table.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildDeleteQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      _prepare(name2) {
        return tracer.startActiveSpan("drizzle.prepareQuery", () => {
          return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name2);
        });
      }
      prepare(name2) {
        return this._prepare(name2);
      }
    };
    _a78 = entityKind;
    __publicField(PgDelete, _a78, "PgDelete");
    PgInsertBuilder = class {
      constructor(table, session, dialect) {
        __publicField(this, "table");
        __publicField(this, "session");
        __publicField(this, "dialect");
        this.table = table;
        this.session = session;
        this.dialect = dialect;
      }
      values(values) {
        values = Array.isArray(values) ? values : [values];
        if (values.length === 0) {
          throw new Error("values() must be called with at least one value");
        }
        const mappedValues = values.map((entry) => {
          const result = {};
          const cols = this.table[Table.Symbol.Columns];
          for (const colKey of Object.keys(entry)) {
            const colValue = entry[colKey];
            result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
          }
          return result;
        });
        return new PgInsert(this.table, mappedValues, this.session, this.dialect);
      }
    };
    _a79 = entityKind;
    __publicField(PgInsertBuilder, _a79, "PgInsertBuilder");
    PgInsert = class extends QueryPromise {
      constructor(table, values, session, dialect) {
        super();
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "config");
        __publicField(this, "execute", (placeholderValues) => {
          return tracer.startActiveSpan("drizzle.operation", () => {
            return this._prepare().execute(placeholderValues);
          });
        });
        this.session = session;
        this.dialect = dialect;
        this.config = { table, values };
      }
      returning(fields = this.config.table[Table.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      onConflictDoNothing(config = {}) {
        if (config.target === void 0) {
          this.config.onConflict = sql2`do nothing`;
        } else {
          let targetColumn = "";
          targetColumn = Array.isArray(config.target) ? config.target.map((it) => this.dialect.escapeName(it.name)).join(",") : this.dialect.escapeName(config.target.name);
          const whereSql = config.where ? sql2` where ${config.where}` : void 0;
          this.config.onConflict = sql2`(${sql2.raw(targetColumn)}) do nothing${whereSql}`;
        }
        return this;
      }
      onConflictDoUpdate(config) {
        const whereSql = config.where ? sql2` where ${config.where}` : void 0;
        const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config.set));
        let targetColumn = "";
        targetColumn = Array.isArray(config.target) ? config.target.map((it) => this.dialect.escapeName(it.name)).join(",") : this.dialect.escapeName(config.target.name);
        this.config.onConflict = sql2`(${sql2.raw(targetColumn)}) do update set ${setSql}${whereSql}`;
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildInsertQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      _prepare(name2) {
        return tracer.startActiveSpan("drizzle.prepareQuery", () => {
          return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name2);
        });
      }
      prepare(name2) {
        return this._prepare(name2);
      }
    };
    _a80 = entityKind;
    __publicField(PgInsert, _a80, "PgInsert");
    PgRefreshMaterializedView = class extends QueryPromise {
      constructor(view, session, dialect) {
        super();
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "config");
        __publicField(this, "execute", (placeholderValues) => {
          return tracer.startActiveSpan("drizzle.operation", () => {
            return this._prepare().execute(placeholderValues);
          });
        });
        this.session = session;
        this.dialect = dialect;
        this.config = { view };
      }
      concurrently() {
        if (this.config.withNoData !== void 0) {
          throw new Error("Cannot use concurrently and withNoData together");
        }
        this.config.concurrently = true;
        return this;
      }
      withNoData() {
        if (this.config.concurrently !== void 0) {
          throw new Error("Cannot use concurrently and withNoData together");
        }
        this.config.withNoData = true;
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildRefreshMaterializedViewQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      _prepare(name2) {
        return tracer.startActiveSpan("drizzle.prepareQuery", () => {
          return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), void 0, name2);
        });
      }
      prepare(name2) {
        return this._prepare(name2);
      }
    };
    _a81 = entityKind;
    __publicField(PgRefreshMaterializedView, _a81, "PgRefreshMaterializedView");
    PgUpdateBuilder = class {
      constructor(table, session, dialect) {
        __publicField(this, "table");
        __publicField(this, "session");
        __publicField(this, "dialect");
        this.table = table;
        this.session = session;
        this.dialect = dialect;
      }
      set(values) {
        return new PgUpdate(this.table, mapUpdateSet(this.table, values), this.session, this.dialect);
      }
    };
    _a82 = entityKind;
    __publicField(PgUpdateBuilder, _a82, "PgUpdateBuilder");
    PgUpdate = class extends QueryPromise {
      constructor(table, set, session, dialect) {
        super();
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "config");
        __publicField(this, "execute", (placeholderValues) => {
          return this._prepare().execute(placeholderValues);
        });
        this.session = session;
        this.dialect = dialect;
        this.config = { set, table };
      }
      where(where) {
        this.config.where = where;
        return this;
      }
      returning(fields = this.config.table[Table.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      _prepare(name2) {
        return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name2);
      }
      prepare(name2) {
        return this._prepare(name2);
      }
    };
    _a83 = entityKind;
    __publicField(PgUpdate, _a83, "PgUpdate");
    RelationalQueryBuilder = class {
      constructor(fullSchema, schema2, tableNamesMap, table, tableConfig, dialect, session) {
        __publicField(this, "fullSchema");
        __publicField(this, "schema");
        __publicField(this, "tableNamesMap");
        __publicField(this, "table");
        __publicField(this, "tableConfig");
        __publicField(this, "dialect");
        __publicField(this, "session");
        this.fullSchema = fullSchema;
        this.schema = schema2;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
      }
      findMany(config) {
        return new PgRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many");
      }
      findFirst(config) {
        return new PgRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? { ...config, limit: 1 } : { limit: 1 }, "first");
      }
    };
    _a84 = entityKind;
    __publicField(RelationalQueryBuilder, _a84, "PgRelationalQueryBuilder");
    PgRelationalQuery = class extends QueryPromise {
      constructor(fullSchema, schema2, tableNamesMap, table, tableConfig, dialect, session, config, mode) {
        super();
        __publicField(this, "fullSchema");
        __publicField(this, "schema");
        __publicField(this, "tableNamesMap");
        __publicField(this, "table");
        __publicField(this, "tableConfig");
        __publicField(this, "dialect");
        __publicField(this, "session");
        __publicField(this, "config");
        __publicField(this, "mode");
        this.fullSchema = fullSchema;
        this.schema = schema2;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.config = config;
        this.mode = mode;
      }
      _prepare(name2) {
        return tracer.startActiveSpan("drizzle.prepareQuery", () => {
          const { query, builtQuery } = this._toSQL();
          return this.session.prepareQuery(builtQuery, void 0, name2, (rawRows, mapColumnValue) => {
            const rows = rawRows.map((row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue));
            if (this.mode === "first") {
              return rows[0];
            }
            return rows;
          });
        });
      }
      prepare(name2) {
        return this._prepare(name2);
      }
      _toSQL() {
        const query = this.dialect.buildRelationalQueryWithoutPK({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        });
        const builtQuery = this.dialect.sqlToQuery(query.sql);
        return { query, builtQuery };
      }
      toSQL() {
        return this._toSQL().builtQuery;
      }
      execute() {
        return tracer.startActiveSpan("drizzle.operation", () => {
          return this._prepare().execute();
        });
      }
    };
    _a85 = entityKind;
    __publicField(PgRelationalQuery, _a85, "PgRelationalQuery");
    PgDatabase = class {
      constructor(dialect, session, schema2) {
        __publicField(this, "dialect");
        __publicField(this, "session");
        __publicField(this, "query");
        this.dialect = dialect;
        this.session = session;
        this._ = schema2 ? { schema: schema2.schema, tableNamesMap: schema2.tableNamesMap } : { schema: void 0, tableNamesMap: {} };
        this.query = {};
        if (this._.schema) {
          for (const [tableName, columns] of Object.entries(this._.schema)) {
            this.query[tableName] = new RelationalQueryBuilder(schema2.fullSchema, this._.schema, this._.tableNamesMap, schema2.fullSchema[tableName], columns, dialect, session);
          }
        }
      }
      $with(alias) {
        return {
          as(qb) {
            if (typeof qb === "function") {
              qb = qb(new QueryBuilder());
            }
            return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
          }
        };
      }
      with(...queries) {
        const self = this;
        function select(fields) {
          return new PgSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries
          });
        }
        return { select };
      }
      select(fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect
        });
      }
      selectDistinct(fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect,
          distinct: true
        });
      }
      selectDistinctOn(on, fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect,
          distinct: { on }
        });
      }
      update(table) {
        return new PgUpdateBuilder(table, this.session, this.dialect);
      }
      insert(table) {
        return new PgInsertBuilder(table, this.session, this.dialect);
      }
      delete(table) {
        return new PgDelete(table, this.session, this.dialect);
      }
      refreshMaterializedView(view) {
        return new PgRefreshMaterializedView(view, this.session, this.dialect);
      }
      execute(query) {
        return this.session.execute(query.getSQL());
      }
      transaction(transaction, config) {
        return this.session.transaction(transaction, config);
      }
    };
    _a86 = entityKind;
    __publicField(PgDatabase, _a86, "PgDatabase");
    PreparedQuery = class {
      constructor() {
        /** @internal */
        __publicField(this, "joinsNotNullableMap");
      }
    };
    _a87 = entityKind;
    __publicField(PreparedQuery, _a87, "PgPreparedQuery");
    PgSession = class {
      constructor(dialect) {
        __publicField(this, "dialect");
        this.dialect = dialect;
      }
      execute(query) {
        return tracer.startActiveSpan("drizzle.operation", () => {
          const prepared = tracer.startActiveSpan("drizzle.prepareQuery", () => {
            return this.prepareQuery(this.dialect.sqlToQuery(query), void 0, void 0);
          });
          return prepared.execute();
        });
      }
      all(query) {
        return this.prepareQuery(this.dialect.sqlToQuery(query), void 0, void 0).all();
      }
    };
    _a88 = entityKind;
    __publicField(PgSession, _a88, "PgSession");
    PgTransaction = class extends PgDatabase {
      constructor(dialect, session, schema2, nestedIndex = 0) {
        super(dialect, session, schema2);
        __publicField(this, "schema");
        __publicField(this, "nestedIndex");
        this.schema = schema2;
        this.nestedIndex = nestedIndex;
      }
      rollback() {
        throw new TransactionRollbackError();
      }
      /** @internal */
      getTransactionConfigSQL(config) {
        const chunks = [];
        if (config.isolationLevel) {
          chunks.push(`isolation level ${config.isolationLevel}`);
        }
        if (config.accessMode) {
          chunks.push(config.accessMode);
        }
        if (typeof config.deferrable === "boolean") {
          chunks.push(config.deferrable ? "deferrable" : "not deferrable");
        }
        return sql2.raw(chunks.join(" "));
      }
      setTransaction(config) {
        return this.session.execute(sql2`set transaction ${this.getTransactionConfigSQL(config)}`);
      }
    };
    _a89 = entityKind;
    __publicField(PgTransaction, _a89, "PgTransaction");
  }
});

// node_modules/drizzle-orm/vercel-postgres/index.mjs
function drizzle(client, config = {}) {
  const dialect = new PgDialect();
  let logger;
  if (config.logger === true) {
    logger = new DefaultLogger();
  } else if (config.logger !== false) {
    logger = config.logger;
  }
  let schema2;
  if (config.schema) {
    const tablesConfig = extractTablesRelationalConfig(config.schema, createTableRelationsHelpers);
    schema2 = {
      fullSchema: config.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const driver = new VercelPgDriver(client, dialect, { logger });
  const session = driver.createSession(schema2);
  return new PgDatabase(dialect, session, schema2);
}
var _a90, VercelPgPreparedQuery, _a91, _VercelPgSession, VercelPgSession, _a92, _VercelPgTransaction, VercelPgTransaction, _a93, VercelPgDriver;
var init_vercel_postgres = __esm({
  "node_modules/drizzle-orm/vercel-postgres/index.mjs"() {
    init_alias_cf8e03cd();
    init_drizzle_orm();
    init_session_6ea797a6();
    init_index_node();
    VercelPgPreparedQuery = class extends PreparedQuery {
      constructor(client, queryString, params, logger, fields, name2, customResultMapper) {
        super();
        __publicField(this, "client");
        __publicField(this, "params");
        __publicField(this, "logger");
        __publicField(this, "fields");
        __publicField(this, "customResultMapper");
        __publicField(this, "rawQuery");
        __publicField(this, "query");
        this.client = client;
        this.params = params;
        this.logger = logger;
        this.fields = fields;
        this.customResultMapper = customResultMapper;
        this.rawQuery = {
          name: name2,
          text: queryString
        };
        this.query = {
          name: name2,
          text: queryString,
          rowMode: "array"
        };
      }
      async execute(placeholderValues = {}) {
        const params = fillPlaceholders(this.params, placeholderValues);
        this.logger.logQuery(this.rawQuery.text, params);
        const { fields, rawQuery, client, query, joinsNotNullableMap, customResultMapper } = this;
        if (!fields && !customResultMapper) {
          return client.query(rawQuery, params);
        }
        const { rows } = await client.query(query, params);
        if (customResultMapper) {
          return customResultMapper(rows);
        }
        return rows.map((row) => mapResultRow(fields, row, joinsNotNullableMap));
      }
      all(placeholderValues = {}) {
        const params = fillPlaceholders(this.params, placeholderValues);
        this.logger.logQuery(this.rawQuery.text, params);
        return this.client.query(this.rawQuery, params).then((result) => result.rows);
      }
      values(placeholderValues = {}) {
        const params = fillPlaceholders(this.params, placeholderValues);
        this.logger.logQuery(this.rawQuery.text, params);
        return this.client.query(this.query, params).then((result) => result.rows);
      }
    };
    _a90 = entityKind;
    __publicField(VercelPgPreparedQuery, _a90, "VercelPgPreparedQuery");
    _VercelPgSession = class _VercelPgSession extends PgSession {
      constructor(client, dialect, schema2, options2 = {}) {
        super(dialect);
        __publicField(this, "client");
        __publicField(this, "schema");
        __publicField(this, "options");
        __publicField(this, "logger");
        this.client = client;
        this.schema = schema2;
        this.options = options2;
        this.logger = options2.logger ?? new NoopLogger();
      }
      prepareQuery(query, fields, name2, customResultMapper) {
        return new VercelPgPreparedQuery(this.client, query.sql, query.params, this.logger, fields, name2, customResultMapper);
      }
      async query(query, params) {
        this.logger.logQuery(query, params);
        const result = await this.client.query({
          rowMode: "array",
          text: query,
          values: params
        });
        return result;
      }
      async queryObjects(query, params) {
        return this.client.query(query, params);
      }
      async transaction(transaction, config) {
        const session = this.client instanceof VercelPool ? new _VercelPgSession(await this.client.connect(), this.dialect, this.schema, this.options) : this;
        const tx = new VercelPgTransaction(this.dialect, session, this.schema);
        await tx.execute(sql2`begin${config ? sql2` ${tx.getTransactionConfigSQL(config)}` : void 0}`);
        try {
          const result = await transaction(tx);
          await tx.execute(sql2`commit`);
          return result;
        } catch (error2) {
          await tx.execute(sql2`rollback`);
          throw error2;
        } finally {
          if (this.client instanceof VercelPool) {
            session.client.release();
          }
        }
      }
    };
    _a91 = entityKind;
    __publicField(_VercelPgSession, _a91, "VercelPgSession");
    VercelPgSession = _VercelPgSession;
    _VercelPgTransaction = class _VercelPgTransaction extends PgTransaction {
      async transaction(transaction) {
        const savepointName = `sp${this.nestedIndex + 1}`;
        const tx = new _VercelPgTransaction(this.dialect, this.session, this.schema, this.nestedIndex + 1);
        await tx.execute(sql2.raw(`savepoint ${savepointName}`));
        try {
          const result = await transaction(tx);
          await tx.execute(sql2.raw(`release savepoint ${savepointName}`));
          return result;
        } catch (err) {
          await tx.execute(sql2.raw(`rollback to savepoint ${savepointName}`));
          throw err;
        }
      }
    };
    _a92 = entityKind;
    __publicField(_VercelPgTransaction, _a92, "VercelPgTransaction");
    VercelPgTransaction = _VercelPgTransaction;
    VercelPgDriver = class {
      constructor(client, dialect, options2 = {}) {
        __publicField(this, "client");
        __publicField(this, "dialect");
        __publicField(this, "options");
        this.client = client;
        this.dialect = dialect;
        this.options = options2;
        this.initMappers();
      }
      createSession(schema2) {
        return new VercelPgSession(this.client, this.dialect, schema2, { logger: this.options.logger });
      }
      initMappers() {
      }
    };
    _a93 = entityKind;
    __publicField(VercelPgDriver, _a93, "VercelPgDriver");
  }
});

// node_modules/drizzle-orm/pg-core/index.mjs
function serial(name2) {
  return new PgSerialBuilder(name2);
}
function varchar(name2, config = {}) {
  return new PgVarcharBuilder(name2, config);
}
var _a94, PgBigInt53Builder, _a95, PgBigInt53, _a96, PgBigInt64Builder, _a97, PgBigInt64, _a98, PgBigSerial53Builder, _a99, PgBigSerial53, _a100, PgBigSerial64Builder, _a101, PgBigSerial64, _a102, PgBooleanBuilder, _a103, PgBoolean, _a104, PgCharBuilder, _a105, PgChar, _a106, PgCidrBuilder, _a107, PgCidr, _a108, PgCustomColumnBuilder, _a109, PgCustomColumn, _a110, PgDoublePrecisionBuilder, _a111, PgDoublePrecision, isPgEnumSym, _a112, PgEnumColumnBuilder, _a113, PgEnumColumn, _a114, PgInetBuilder, _a115, PgInet, _a116, PgIntegerBuilder, _a117, PgInteger, _a118, PgIntervalBuilder, _a119, PgInterval, _a120, PgMacaddrBuilder, _a121, PgMacaddr, _a122, PgMacaddr8Builder, _a123, PgMacaddr8, _a124, PgRealBuilder, _a125, PgReal, _a126, PgSerialBuilder, _a127, PgSerial, _a128, PgSmallIntBuilder, _a129, PgSmallInt, _a130, PgSmallSerialBuilder, _a131, PgSmallSerial, _a132, PgTextBuilder, _a133, PgText, _a134, PgVarcharBuilder, _a135, PgVarchar, _a136, PgSchema;
var init_pg_core = __esm({
  "node_modules/drizzle-orm/pg-core/index.mjs"() {
    init_alias_cf8e03cd();
    init_alias_cf8e03cd();
    PgBigInt53Builder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "number", "PgBigInt53");
      }
      /** @internal */
      build(table) {
        return new PgBigInt53(table, this.config);
      }
    };
    _a94 = entityKind;
    __publicField(PgBigInt53Builder, _a94, "PgBigInt53Builder");
    PgBigInt53 = class extends PgColumn {
      getSQLType() {
        return "bigint";
      }
      mapFromDriverValue(value) {
        if (typeof value === "number") {
          return value;
        }
        return Number(value);
      }
    };
    _a95 = entityKind;
    __publicField(PgBigInt53, _a95, "PgBigInt53");
    PgBigInt64Builder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "bigint", "PgBigInt64");
      }
      /** @internal */
      build(table) {
        return new PgBigInt64(table, this.config);
      }
    };
    _a96 = entityKind;
    __publicField(PgBigInt64Builder, _a96, "PgBigInt64Builder");
    PgBigInt64 = class extends PgColumn {
      getSQLType() {
        return "bigint";
      }
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      mapFromDriverValue(value) {
        return BigInt(value);
      }
    };
    _a97 = entityKind;
    __publicField(PgBigInt64, _a97, "PgBigInt64");
    PgBigSerial53Builder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "number", "PgBigSerial53");
        this.config.hasDefault = true;
        this.config.notNull = true;
      }
      /** @internal */
      build(table) {
        return new PgBigSerial53(table, this.config);
      }
    };
    _a98 = entityKind;
    __publicField(PgBigSerial53Builder, _a98, "PgBigSerial53Builder");
    PgBigSerial53 = class extends PgColumn {
      getSQLType() {
        return "bigserial";
      }
      mapFromDriverValue(value) {
        if (typeof value === "number") {
          return value;
        }
        return Number(value);
      }
    };
    _a99 = entityKind;
    __publicField(PgBigSerial53, _a99, "PgBigSerial53");
    PgBigSerial64Builder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "bigint", "PgBigSerial64");
        this.config.hasDefault = true;
      }
      /** @internal */
      build(table) {
        return new PgBigSerial64(table, this.config);
      }
    };
    _a100 = entityKind;
    __publicField(PgBigSerial64Builder, _a100, "PgBigSerial64Builder");
    PgBigSerial64 = class extends PgColumn {
      getSQLType() {
        return "bigserial";
      }
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      mapFromDriverValue(value) {
        return BigInt(value);
      }
    };
    _a101 = entityKind;
    __publicField(PgBigSerial64, _a101, "PgBigSerial64");
    PgBooleanBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "boolean", "PgBoolean");
      }
      /** @internal */
      build(table) {
        return new PgBoolean(table, this.config);
      }
    };
    _a102 = entityKind;
    __publicField(PgBooleanBuilder, _a102, "PgBooleanBuilder");
    PgBoolean = class extends PgColumn {
      getSQLType() {
        return "boolean";
      }
    };
    _a103 = entityKind;
    __publicField(PgBoolean, _a103, "PgBoolean");
    PgCharBuilder = class extends PgColumnBuilder {
      constructor(name2, config) {
        super(name2, "string", "PgChar");
        this.config.length = config.length;
        this.config.enumValues = config.enum;
      }
      /** @internal */
      build(table) {
        return new PgChar(table, this.config);
      }
    };
    _a104 = entityKind;
    __publicField(PgCharBuilder, _a104, "PgCharBuilder");
    PgChar = class extends PgColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "length", this.config.length);
        __publicField(this, "enumValues", this.config.enumValues);
      }
      getSQLType() {
        return this.length === void 0 ? `char` : `char(${this.length})`;
      }
    };
    _a105 = entityKind;
    __publicField(PgChar, _a105, "PgChar");
    PgCidrBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "string", "PgCidr");
      }
      /** @internal */
      build(table) {
        return new PgCidr(table, this.config);
      }
    };
    _a106 = entityKind;
    __publicField(PgCidrBuilder, _a106, "PgCidrBuilder");
    PgCidr = class extends PgColumn {
      getSQLType() {
        return "cidr";
      }
    };
    _a107 = entityKind;
    __publicField(PgCidr, _a107, "PgCidr");
    PgCustomColumnBuilder = class extends PgColumnBuilder {
      constructor(name2, fieldConfig, customTypeParams) {
        super(name2, "custom", "PgCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
      }
      /** @internal */
      build(table) {
        return new PgCustomColumn(table, this.config);
      }
    };
    _a108 = entityKind;
    __publicField(PgCustomColumnBuilder, _a108, "PgCustomColumnBuilder");
    PgCustomColumn = class extends PgColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "sqlName");
        __publicField(this, "mapTo");
        __publicField(this, "mapFrom");
        this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
        this.mapTo = config.customTypeParams.toDriver;
        this.mapFrom = config.customTypeParams.fromDriver;
      }
      getSQLType() {
        return this.sqlName;
      }
      mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
      }
      mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
      }
    };
    _a109 = entityKind;
    __publicField(PgCustomColumn, _a109, "PgCustomColumn");
    PgDoublePrecisionBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "number", "PgDoublePrecision");
      }
      /** @internal */
      build(table) {
        return new PgDoublePrecision(table, this.config);
      }
    };
    _a110 = entityKind;
    __publicField(PgDoublePrecisionBuilder, _a110, "PgDoublePrecisionBuilder");
    PgDoublePrecision = class extends PgColumn {
      getSQLType() {
        return "double precision";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number.parseFloat(value);
        }
        return value;
      }
    };
    _a111 = entityKind;
    __publicField(PgDoublePrecision, _a111, "PgDoublePrecision");
    isPgEnumSym = Symbol.for("drizzle:isPgEnum");
    PgEnumColumnBuilder = class extends PgColumnBuilder {
      constructor(name2, enumInstance) {
        super(name2, "string", "PgEnumColumn");
        this.config.enum = enumInstance;
      }
      /** @internal */
      build(table) {
        return new PgEnumColumn(table, this.config);
      }
    };
    _a112 = entityKind;
    __publicField(PgEnumColumnBuilder, _a112, "PgEnumColumnBuilder");
    PgEnumColumn = class extends PgColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "enum", this.config.enum);
        __publicField(this, "enumValues", this.config.enum.enumValues);
        this.enum = config.enum;
      }
      getSQLType() {
        return this.enum.enumName;
      }
    };
    _a113 = entityKind;
    __publicField(PgEnumColumn, _a113, "PgEnumColumn");
    PgInetBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "string", "PgInet");
      }
      /** @internal */
      build(table) {
        return new PgInet(table, this.config);
      }
    };
    _a114 = entityKind;
    __publicField(PgInetBuilder, _a114, "PgInetBuilder");
    PgInet = class extends PgColumn {
      getSQLType() {
        return "inet";
      }
    };
    _a115 = entityKind;
    __publicField(PgInet, _a115, "PgInet");
    PgIntegerBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "number", "PgInteger");
      }
      /** @internal */
      build(table) {
        return new PgInteger(table, this.config);
      }
    };
    _a116 = entityKind;
    __publicField(PgIntegerBuilder, _a116, "PgIntegerBuilder");
    PgInteger = class extends PgColumn {
      getSQLType() {
        return "integer";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number.parseInt(value);
        }
        return value;
      }
    };
    _a117 = entityKind;
    __publicField(PgInteger, _a117, "PgInteger");
    PgIntervalBuilder = class extends PgColumnBuilder {
      constructor(name2, intervalConfig) {
        super(name2, "string", "PgInterval");
        this.config.intervalConfig = intervalConfig;
      }
      /** @internal */
      build(table) {
        return new PgInterval(table, this.config);
      }
    };
    _a118 = entityKind;
    __publicField(PgIntervalBuilder, _a118, "PgIntervalBuilder");
    PgInterval = class extends PgColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "fields", this.config.intervalConfig.fields);
        __publicField(this, "precision", this.config.intervalConfig.precision);
      }
      getSQLType() {
        const fields = this.fields ? ` ${this.fields}` : "";
        const precision = this.precision ? `(${this.precision})` : "";
        return `interval${fields}${precision}`;
      }
    };
    _a119 = entityKind;
    __publicField(PgInterval, _a119, "PgInterval");
    PgMacaddrBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "string", "PgMacaddr");
      }
      /** @internal */
      build(table) {
        return new PgMacaddr(table, this.config);
      }
    };
    _a120 = entityKind;
    __publicField(PgMacaddrBuilder, _a120, "PgMacaddrBuilder");
    PgMacaddr = class extends PgColumn {
      getSQLType() {
        return "macaddr";
      }
    };
    _a121 = entityKind;
    __publicField(PgMacaddr, _a121, "PgMacaddr");
    PgMacaddr8Builder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "string", "PgMacaddr8");
      }
      /** @internal */
      build(table) {
        return new PgMacaddr8(table, this.config);
      }
    };
    _a122 = entityKind;
    __publicField(PgMacaddr8Builder, _a122, "PgMacaddr8Builder");
    PgMacaddr8 = class extends PgColumn {
      getSQLType() {
        return "macaddr8";
      }
    };
    _a123 = entityKind;
    __publicField(PgMacaddr8, _a123, "PgMacaddr8");
    PgRealBuilder = class extends PgColumnBuilder {
      constructor(name2, length) {
        super(name2, "number", "PgReal");
        this.config.length = length;
      }
      /** @internal */
      build(table) {
        return new PgReal(table, this.config);
      }
    };
    _a124 = entityKind;
    __publicField(PgRealBuilder, _a124, "PgRealBuilder");
    PgReal = class extends PgColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "mapFromDriverValue", (value) => {
          if (typeof value === "string") {
            return Number.parseFloat(value);
          }
          return value;
        });
      }
      getSQLType() {
        return "real";
      }
    };
    _a125 = entityKind;
    __publicField(PgReal, _a125, "PgReal");
    PgSerialBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "number", "PgSerial");
        this.config.hasDefault = true;
        this.config.notNull = true;
      }
      /** @internal */
      build(table) {
        return new PgSerial(table, this.config);
      }
    };
    _a126 = entityKind;
    __publicField(PgSerialBuilder, _a126, "PgSerialBuilder");
    PgSerial = class extends PgColumn {
      getSQLType() {
        return "serial";
      }
    };
    _a127 = entityKind;
    __publicField(PgSerial, _a127, "PgSerial");
    PgSmallIntBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "number", "PgSmallInt");
      }
      /** @internal */
      build(table) {
        return new PgSmallInt(table, this.config);
      }
    };
    _a128 = entityKind;
    __publicField(PgSmallIntBuilder, _a128, "PgSmallIntBuilder");
    PgSmallInt = class extends PgColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "mapFromDriverValue", (value) => {
          if (typeof value === "string") {
            return Number(value);
          }
          return value;
        });
      }
      getSQLType() {
        return "smallint";
      }
    };
    _a129 = entityKind;
    __publicField(PgSmallInt, _a129, "PgSmallInt");
    PgSmallSerialBuilder = class extends PgColumnBuilder {
      constructor(name2) {
        super(name2, "number", "PgSmallSerial");
        this.config.hasDefault = true;
        this.config.notNull = true;
      }
      /** @internal */
      build(table) {
        return new PgSmallSerial(table, this.config);
      }
    };
    _a130 = entityKind;
    __publicField(PgSmallSerialBuilder, _a130, "PgSmallSerialBuilder");
    PgSmallSerial = class extends PgColumn {
      getSQLType() {
        return "smallserial";
      }
    };
    _a131 = entityKind;
    __publicField(PgSmallSerial, _a131, "PgSmallSerial");
    PgTextBuilder = class extends PgColumnBuilder {
      constructor(name2, config) {
        super(name2, "string", "PgText");
        this.config.enumValues = config.enum;
      }
      /** @internal */
      build(table) {
        return new PgText(table, this.config);
      }
    };
    _a132 = entityKind;
    __publicField(PgTextBuilder, _a132, "PgTextBuilder");
    PgText = class extends PgColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "enumValues", this.config.enumValues);
      }
      getSQLType() {
        return "text";
      }
    };
    _a133 = entityKind;
    __publicField(PgText, _a133, "PgText");
    PgVarcharBuilder = class extends PgColumnBuilder {
      constructor(name2, config) {
        super(name2, "string", "PgVarchar");
        this.config.length = config.length;
        this.config.enumValues = config.enum;
      }
      /** @internal */
      build(table) {
        return new PgVarchar(table, this.config);
      }
    };
    _a134 = entityKind;
    __publicField(PgVarcharBuilder, _a134, "PgVarcharBuilder");
    PgVarchar = class extends PgColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "length", this.config.length);
        __publicField(this, "enumValues", this.config.enumValues);
      }
      getSQLType() {
        return this.length === void 0 ? `varchar` : `varchar(${this.length})`;
      }
    };
    _a135 = entityKind;
    __publicField(PgVarchar, _a135, "PgVarchar");
    PgSchema = class {
      constructor(schemaName) {
        __publicField(this, "schemaName");
        __publicField(this, "table", (name2, columns, extraConfig) => {
          return pgTableWithSchema(name2, columns, extraConfig, this.schemaName);
        });
        __publicField(this, "view", (name2, columns) => {
          return pgViewWithSchema(name2, columns, this.schemaName);
        });
        __publicField(this, "materializedView", (name2, columns) => {
          return pgMaterializedViewWithSchema(name2, columns, this.schemaName);
        });
        this.schemaName = schemaName;
      }
    };
    _a136 = entityKind;
    __publicField(PgSchema, _a136, "PgSchema");
  }
});

// node_modules/drizzle-orm/view-23898f21.mjs
function mysqlTableWithSchema(name2, columns, extraConfig, schema2, baseName = name2) {
  const rawTable = new MySqlTable(name2, schema2, baseName);
  const builtColumns = Object.fromEntries(Object.entries(columns).map(([name3, colBuilderBase]) => {
    const colBuilder = colBuilderBase;
    const column = colBuilder.build(rawTable);
    rawTable[InlineForeignKeys2].push(...colBuilder.buildForeignKeys(column, rawTable));
    return [name3, column];
  }));
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  if (extraConfig) {
    table[MySqlTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
function uniqueKeyName2(table, columns) {
  return `${table[MySqlTable.Symbol.Name]}_${columns.join("_")}_unique`;
}
function mysqlViewWithSchema(name2, selection, schema2) {
  if (selection) {
    return new ManualViewBuilder2(name2, selection, schema2);
  }
  return new ViewBuilder2(name2, schema2);
}
var InlineForeignKeys2, _a137, _b8, _c3, _d2, MySqlTable, mysqlTable, _a138, ForeignKeyBuilder2, _a139, ForeignKey2, _a140, UniqueConstraintBuilder2, _a141, UniqueOnConstraintBuilder2, _a142, UniqueConstraint2, _a143, MySqlColumnBuilder, _a144, MySqlColumn, _a145, MySqlColumnBuilderWithAutoIncrement, _a146, MySqlColumnWithAutoIncrement, _a147, MySqlDelete, _a148, MySqlInsertBuilder, _a149, MySqlInsert, _a150, MySqlDialect, _a151, MySqlSelectBuilder, _a152, MySqlSelectQueryBuilder, _a153, MySqlSelect, _a154, QueryBuilder2, _a155, RelationalQueryBuilder2, _a156, MySqlRelationalQuery, _a157, MySqlDatabase, _a158, PreparedQuery2, _a159, MySqlSession, _a160, MySqlTransaction, _a161, MySqlUpdateBuilder, _a162, MySqlUpdate, _a163, ViewBuilderCore, _a164, ViewBuilder2, _a165, ManualViewBuilder2, _a166, MySqlViewBase, MySqlViewConfig, _a167, _b9, MySqlView;
var init_view_23898f21 = __esm({
  "node_modules/drizzle-orm/view-23898f21.mjs"() {
    init_alias_cf8e03cd();
    InlineForeignKeys2 = Symbol.for("drizzle:MySqlInlineForeignKeys");
    MySqlTable = class extends Table {
      constructor() {
        super(...arguments);
        /** @internal */
        __publicField(this, _b8);
        /** @internal */
        __publicField(this, _c3, []);
        /** @internal */
        __publicField(this, _d2);
      }
    };
    _a137 = entityKind, _b8 = Table.Symbol.Columns, _c3 = InlineForeignKeys2, _d2 = Table.Symbol.ExtraConfigBuilder;
    __publicField(MySqlTable, _a137, "MySqlTable");
    /** @internal */
    __publicField(MySqlTable, "Symbol", Object.assign({}, Table.Symbol, {
      InlineForeignKeys: InlineForeignKeys2
    }));
    mysqlTable = (name2, columns, extraConfig) => {
      return mysqlTableWithSchema(name2, columns, extraConfig, void 0, name2);
    };
    ForeignKeyBuilder2 = class {
      constructor(config, actions) {
        /** @internal */
        __publicField(this, "reference");
        /** @internal */
        __publicField(this, "_onUpdate");
        /** @internal */
        __publicField(this, "_onDelete");
        this.reference = () => {
          const { columns, foreignColumns } = config();
          return { columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions) {
          this._onUpdate = actions.onUpdate;
          this._onDelete = actions.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey2(table, this);
      }
    };
    _a138 = entityKind;
    __publicField(ForeignKeyBuilder2, _a138, "MySqlForeignKeyBuilder");
    ForeignKey2 = class {
      constructor(table, builder) {
        __publicField(this, "table");
        __publicField(this, "reference");
        __publicField(this, "onUpdate");
        __publicField(this, "onDelete");
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      getName() {
        const { columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[MySqlTable.Symbol.Name],
          ...columnNames,
          foreignColumns[0].table[MySqlTable.Symbol.Name],
          ...foreignColumnNames
        ];
        return `${chunks.join("_")}_fk`;
      }
    };
    _a139 = entityKind;
    __publicField(ForeignKey2, _a139, "MySqlForeignKey");
    UniqueConstraintBuilder2 = class {
      constructor(columns, name2) {
        __publicField(this, "name");
        /** @internal */
        __publicField(this, "columns");
        this.name = name2;
        this.columns = columns;
      }
      /** @internal */
      build(table) {
        return new UniqueConstraint2(table, this.columns, this.name);
      }
    };
    _a140 = entityKind;
    __publicField(UniqueConstraintBuilder2, _a140, "MySqlUniqueConstraintBuilder");
    UniqueOnConstraintBuilder2 = class {
      constructor(name2) {
        /** @internal */
        __publicField(this, "name");
        this.name = name2;
      }
      on(...columns) {
        return new UniqueConstraintBuilder2(columns, this.name);
      }
    };
    _a141 = entityKind;
    __publicField(UniqueOnConstraintBuilder2, _a141, "MySqlUniqueOnConstraintBuilder");
    UniqueConstraint2 = class {
      constructor(table, columns, name2) {
        __publicField(this, "table");
        __publicField(this, "columns");
        __publicField(this, "name");
        __publicField(this, "nullsNotDistinct", false);
        this.table = table;
        this.columns = columns;
        this.name = name2 ?? uniqueKeyName2(this.table, this.columns.map((column) => column.name));
      }
      getName() {
        return this.name;
      }
    };
    _a142 = entityKind;
    __publicField(UniqueConstraint2, _a142, "MySqlUniqueConstraint");
    MySqlColumnBuilder = class extends ColumnBuilder {
      constructor() {
        super(...arguments);
        __publicField(this, "foreignKeyConfigs", []);
      }
      references(ref, actions = {}) {
        this.foreignKeyConfigs.push({ ref, actions });
        return this;
      }
      unique(name2) {
        this.config.isUnique = true;
        this.config.uniqueName = name2;
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions }) => {
          return ((ref2, actions2) => {
            const builder = new ForeignKeyBuilder2(() => {
              const foreignColumn = ref2();
              return { columns: [column], foreignColumns: [foreignColumn] };
            });
            if (actions2.onUpdate) {
              builder.onUpdate(actions2.onUpdate);
            }
            if (actions2.onDelete) {
              builder.onDelete(actions2.onDelete);
            }
            return builder.build(table);
          })(ref, actions);
        });
      }
    };
    _a143 = entityKind;
    __publicField(MySqlColumnBuilder, _a143, "MySqlColumnBuilder");
    MySqlColumn = class extends Column {
      constructor(table, config) {
        if (!config.uniqueName) {
          config.uniqueName = uniqueKeyName2(table, [config.name]);
        }
        super(table, config);
        __publicField(this, "table");
        this.table = table;
      }
    };
    _a144 = entityKind;
    __publicField(MySqlColumn, _a144, "MySqlColumn");
    MySqlColumnBuilderWithAutoIncrement = class extends MySqlColumnBuilder {
      constructor(name2, dataType, columnType) {
        super(name2, dataType, columnType);
        this.config.autoIncrement = false;
      }
      autoincrement() {
        this.config.autoIncrement = true;
        this.config.hasDefault = true;
        return this;
      }
    };
    _a145 = entityKind;
    __publicField(MySqlColumnBuilderWithAutoIncrement, _a145, "MySqlColumnBuilderWithAutoIncrement");
    MySqlColumnWithAutoIncrement = class extends MySqlColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "autoIncrement", this.config.autoIncrement);
      }
    };
    _a146 = entityKind;
    __publicField(MySqlColumnWithAutoIncrement, _a146, "MySqlColumnWithAutoIncrement");
    MySqlDelete = class extends QueryPromise {
      constructor(table, session, dialect) {
        super();
        __publicField(this, "table");
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "config");
        __publicField(this, "execute", (placeholderValues) => {
          return this.prepare().execute(placeholderValues);
        });
        __publicField(this, "createIterator", () => {
          const self = this;
          return async function* (placeholderValues) {
            yield* self.prepare().iterator(placeholderValues);
          };
        });
        __publicField(this, "iterator", this.createIterator());
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.config = { table };
      }
      where(where) {
        this.config.where = where;
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildDeleteQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      prepare() {
        return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning);
      }
    };
    _a147 = entityKind;
    __publicField(MySqlDelete, _a147, "MySqlDelete");
    MySqlInsertBuilder = class {
      constructor(table, session, dialect) {
        __publicField(this, "table");
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "shouldIgnore", false);
        this.table = table;
        this.session = session;
        this.dialect = dialect;
      }
      ignore() {
        this.shouldIgnore = true;
        return this;
      }
      values(values) {
        values = Array.isArray(values) ? values : [values];
        if (values.length === 0) {
          throw new Error("values() must be called with at least one value");
        }
        const mappedValues = values.map((entry) => {
          const result = {};
          const cols = this.table[Table.Symbol.Columns];
          for (const colKey of Object.keys(entry)) {
            const colValue = entry[colKey];
            result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
          }
          return result;
        });
        return new MySqlInsert(this.table, mappedValues, this.shouldIgnore, this.session, this.dialect);
      }
    };
    _a148 = entityKind;
    __publicField(MySqlInsertBuilder, _a148, "MySqlInsertBuilder");
    MySqlInsert = class extends QueryPromise {
      constructor(table, values, ignore, session, dialect) {
        super();
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "config");
        __publicField(this, "execute", (placeholderValues) => {
          return this.prepare().execute(placeholderValues);
        });
        __publicField(this, "createIterator", () => {
          const self = this;
          return async function* (placeholderValues) {
            yield* self.prepare().iterator(placeholderValues);
          };
        });
        __publicField(this, "iterator", this.createIterator());
        this.session = session;
        this.dialect = dialect;
        this.config = { table, values, ignore };
      }
      onDuplicateKeyUpdate(config) {
        const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config.set));
        this.config.onConflict = sql2`update ${setSql}`;
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildInsertQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      prepare() {
        return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), void 0);
      }
    };
    _a149 = entityKind;
    __publicField(MySqlInsert, _a149, "MySqlInsert");
    MySqlDialect = class {
      async migrate(migrations, session, config) {
        const migrationsTable = config.migrationsTable ?? "__drizzle_migrations";
        const migrationTableCreate = sql2`
			create table if not exists ${sql2.identifier(migrationsTable)} (
				id serial primary key,
				hash text not null,
				created_at bigint
			)
		`;
        await session.execute(migrationTableCreate);
        const dbMigrations = await session.all(sql2`select id, hash, created_at from ${sql2.identifier(migrationsTable)} order by created_at desc limit 1`);
        const lastDbMigration = dbMigrations[0];
        await session.transaction(async (tx) => {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration.created_at) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                await tx.execute(sql2.raw(stmt));
              }
              await tx.execute(sql2`insert into ${sql2.identifier(migrationsTable)} (\`hash\`, \`created_at\`) values(${migration.hash}, ${migration.folderMillis})`);
            }
          }
        });
      }
      escapeName(name2) {
        return `\`${name2}\``;
      }
      escapeParam(_num) {
        return `?`;
      }
      escapeString(str) {
        return `'${str.replace(/'/g, "''")}'`;
      }
      buildDeleteQuery({ table, where, returning }) {
        const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql2` where ${where}` : void 0;
        return sql2`delete from ${table}${whereSql}${returningSql}`;
      }
      buildUpdateSet(table, set) {
        const setEntries = Object.entries(set);
        const setSize = setEntries.length;
        return sql2.join(setEntries.flatMap(([colName, value], i) => {
          const col = table[Table.Symbol.Columns][colName];
          const res = sql2`${sql2.identifier(col.name)} = ${value}`;
          if (i < setSize - 1) {
            return [res, sql2.raw(", ")];
          }
          return [res];
        }));
      }
      buildUpdateQuery({ table, set, where, returning }) {
        const setSql = this.buildUpdateSet(table, set);
        const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql2` where ${where}` : void 0;
        return sql2`update ${table} set ${setSql}${whereSql}${returningSql}`;
      }
      /**
       * Builds selection SQL with provided fields/expressions
       *
       * Examples:
       *
       * `select <selection> from`
       *
       * `insert ... returning <selection>`
       *
       * If `isSingleTable` is true, then columns won't be prefixed with table name
       */
      buildSelection(fields, { isSingleTable = false } = {}) {
        const columnsLen = fields.length;
        const chunks = fields.flatMap(({ field }, i) => {
          const chunk = [];
          if (is(field, SQL.Aliased) && field.isSelectionField) {
            chunk.push(sql2.identifier(field.fieldAlias));
          } else if (is(field, SQL.Aliased) || is(field, SQL)) {
            const query = is(field, SQL.Aliased) ? field.sql : field;
            if (isSingleTable) {
              chunk.push(new SQL(query.queryChunks.map((c2) => {
                if (is(c2, MySqlColumn)) {
                  return sql2.identifier(c2.name);
                }
                return c2;
              })));
            } else {
              chunk.push(query);
            }
            if (is(field, SQL.Aliased)) {
              chunk.push(sql2` as ${sql2.identifier(field.fieldAlias)}`);
            }
          } else if (is(field, Column)) {
            if (isSingleTable) {
              chunk.push(sql2.identifier(field.name));
            } else {
              chunk.push(field);
            }
          }
          if (i < columnsLen - 1) {
            chunk.push(sql2`, `);
          }
          return chunk;
        });
        return sql2.join(chunks);
      }
      buildSelectQuery({ withList, fields, fieldsFlat, where, having, table, joins, orderBy, groupBy, limit, offset, lockingClause, distinct }) {
        const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
        for (const f2 of fieldsList) {
          if (is(f2.field, Column) && getTableName(f2.field.table) !== (is(table, Subquery) ? table[SubqueryConfig].alias : is(table, MySqlViewBase) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : getTableName(table)) && !((table2) => joins?.some(({ alias }) => alias === (table2[Table.Symbol.IsAlias] ? getTableName(table2) : table2[Table.Symbol.BaseName])))(f2.field.table)) {
            const tableName = getTableName(f2.field.table);
            throw new Error(`Your "${f2.path.join("->")}" field references a column "${tableName}"."${f2.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
          }
        }
        const isSingleTable = !joins || joins.length === 0;
        let withSql;
        if (withList?.length) {
          const withSqlChunks = [sql2`with `];
          for (const [i, w] of withList.entries()) {
            withSqlChunks.push(sql2`${sql2.identifier(w[SubqueryConfig].alias)} as (${w[SubqueryConfig].sql})`);
            if (i < withList.length - 1) {
              withSqlChunks.push(sql2`, `);
            }
          }
          withSqlChunks.push(sql2` `);
          withSql = sql2.join(withSqlChunks);
        }
        const distinctSql = distinct ? sql2` distinct` : void 0;
        const selection = this.buildSelection(fieldsList, { isSingleTable });
        const tableSql = (() => {
          if (is(table, Table) && table[Table.Symbol.OriginalName] !== table[Table.Symbol.Name]) {
            return sql2`${sql2.identifier(table[Table.Symbol.OriginalName])} ${sql2.identifier(table[Table.Symbol.Name])}`;
          }
          return table;
        })();
        const joinsArray = [];
        if (joins) {
          for (const [index11, joinMeta] of joins.entries()) {
            if (index11 === 0) {
              joinsArray.push(sql2` `);
            }
            const table2 = joinMeta.table;
            const lateralSql = joinMeta.lateral ? sql2` lateral` : void 0;
            if (is(table2, MySqlTable)) {
              const tableName = table2[MySqlTable.Symbol.Name];
              const tableSchema = table2[MySqlTable.Symbol.Schema];
              const origTableName = table2[MySqlTable.Symbol.OriginalName];
              const alias = tableName === origTableName ? void 0 : joinMeta.alias;
              joinsArray.push(sql2`${sql2.raw(joinMeta.joinType)} join${lateralSql} ${tableSchema ? sql2`${sql2.identifier(tableSchema)}.` : void 0}${sql2.identifier(origTableName)}${alias && sql2` ${sql2.identifier(alias)}`} on ${joinMeta.on}`);
            } else if (is(table2, View)) {
              const viewName = table2[ViewBaseConfig].name;
              const viewSchema = table2[ViewBaseConfig].schema;
              const origViewName = table2[ViewBaseConfig].originalName;
              const alias = viewName === origViewName ? void 0 : joinMeta.alias;
              joinsArray.push(sql2`${sql2.raw(joinMeta.joinType)} join${lateralSql} ${viewSchema ? sql2`${sql2.identifier(viewSchema)}.` : void 0}${sql2.identifier(origViewName)}${alias && sql2` ${sql2.identifier(alias)}`} on ${joinMeta.on}`);
            } else {
              joinsArray.push(sql2`${sql2.raw(joinMeta.joinType)} join${lateralSql} ${table2} on ${joinMeta.on}`);
            }
            if (index11 < joins.length - 1) {
              joinsArray.push(sql2` `);
            }
          }
        }
        const joinsSql = sql2.join(joinsArray);
        const whereSql = where ? sql2` where ${where}` : void 0;
        const havingSql = having ? sql2` having ${having}` : void 0;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
          orderBySql = sql2` order by ${sql2.join(orderBy, sql2`, `)}`;
        }
        let groupBySql;
        if (groupBy && groupBy.length > 0) {
          groupBySql = sql2` group by ${sql2.join(groupBy, sql2`, `)}`;
        }
        const limitSql = limit ? sql2` limit ${limit}` : void 0;
        const offsetSql = offset ? sql2` offset ${offset}` : void 0;
        let lockingClausesSql;
        if (lockingClause) {
          const { config, strength } = lockingClause;
          lockingClausesSql = sql2` for ${sql2.raw(strength)}`;
          if (config.noWait) {
            lockingClausesSql.append(sql2` no wait`);
          } else if (config.skipLocked) {
            lockingClausesSql.append(sql2` skip locked`);
          }
        }
        return sql2`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}${lockingClausesSql}`;
      }
      buildInsertQuery({ table, values, ignore, onConflict }) {
        const valuesSqlList = [];
        const columns = table[Table.Symbol.Columns];
        const colEntries = Object.entries(columns);
        const insertOrder = colEntries.map(([, column]) => sql2.identifier(column.name));
        for (const [valueIndex, value] of values.entries()) {
          const valueList = [];
          for (const [fieldName, col] of colEntries) {
            const colValue = value[fieldName];
            if (colValue === void 0 || is(colValue, Param) && colValue.value === void 0) {
              if (col.defaultFn !== void 0) {
                const defaultFnResult = col.defaultFn();
                const defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql2.param(defaultFnResult, col);
                valueList.push(defaultValue);
              } else {
                valueList.push(sql2`default`);
              }
            } else {
              valueList.push(colValue);
            }
          }
          valuesSqlList.push(valueList);
          if (valueIndex < values.length - 1) {
            valuesSqlList.push(sql2`, `);
          }
        }
        const valuesSql = sql2.join(valuesSqlList);
        const ignoreSql = ignore ? sql2` ignore` : void 0;
        const onConflictSql = onConflict ? sql2` on duplicate key ${onConflict}` : void 0;
        return sql2`insert${ignoreSql} into ${table} ${insertOrder} values ${valuesSql}${onConflictSql}`;
      }
      sqlToQuery(sql3) {
        return sql3.toQuery({
          escapeName: this.escapeName,
          escapeParam: this.escapeParam,
          escapeString: this.escapeString
        });
      }
      buildRelationalQuery({ fullSchema, schema: schema2, tableNamesMap, table, tableConfig, queryConfig: config, tableAlias, nestedQueryRelation, joinOn }) {
        let selection = [];
        let limit, offset, orderBy, where;
        const joins = [];
        if (config === true) {
          const selectionEntries = Object.entries(tableConfig.columns);
          selection = selectionEntries.map(([key2, value]) => ({
            dbKey: value.name,
            tsKey: key2,
            field: aliasedTableColumn(value, tableAlias),
            relationTableTsKey: void 0,
            isJson: false,
            selection: []
          }));
        } else {
          const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key2, value]) => [key2, aliasedTableColumn(value, tableAlias)]));
          if (config.where) {
            const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, getOperators()) : config.where;
            where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
          }
          const fieldsSelection = [];
          let selectedColumns = [];
          if (config.columns) {
            let isIncludeMode = false;
            for (const [field, value] of Object.entries(config.columns)) {
              if (value === void 0) {
                continue;
              }
              if (field in tableConfig.columns) {
                if (!isIncludeMode && value === true) {
                  isIncludeMode = true;
                }
                selectedColumns.push(field);
              }
            }
            if (selectedColumns.length > 0) {
              selectedColumns = isIncludeMode ? selectedColumns.filter((c2) => config.columns?.[c2] === true) : Object.keys(tableConfig.columns).filter((key2) => !selectedColumns.includes(key2));
            }
          } else {
            selectedColumns = Object.keys(tableConfig.columns);
          }
          for (const field of selectedColumns) {
            const column = tableConfig.columns[field];
            fieldsSelection.push({ tsKey: field, value: column });
          }
          let selectedRelations = [];
          if (config.with) {
            selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
          }
          let extras;
          if (config.extras) {
            extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql: sql2 }) : config.extras;
            for (const [tsKey, value] of Object.entries(extras)) {
              fieldsSelection.push({
                tsKey,
                value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
              });
            }
          }
          for (const { tsKey, value } of fieldsSelection) {
            selection.push({
              dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
              tsKey,
              field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
              relationTableTsKey: void 0,
              isJson: false,
              selection: []
            });
          }
          let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, getOrderByOperators()) : config.orderBy ?? [];
          if (!Array.isArray(orderByOrig)) {
            orderByOrig = [orderByOrig];
          }
          orderBy = orderByOrig.map((orderByValue) => {
            if (is(orderByValue, Column)) {
              return aliasedTableColumn(orderByValue, tableAlias);
            }
            return mapColumnsInSQLToAlias(orderByValue, tableAlias);
          });
          limit = config.limit;
          offset = config.offset;
          for (const { tsKey: selectedRelationTsKey, queryConfig: selectedRelationConfigValue, relation } of selectedRelations) {
            const normalizedRelation = normalizeRelation(schema2, tableNamesMap, relation);
            const relationTableName = relation.referencedTable[Table.Symbol.Name];
            const relationTableTsName = tableNamesMap[relationTableName];
            const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
            const joinOn2 = and(...normalizedRelation.fields.map((field2, i) => eq(aliasedTableColumn(normalizedRelation.references[i], relationTableAlias), aliasedTableColumn(field2, tableAlias))));
            const builtRelation = this.buildRelationalQuery({
              fullSchema,
              schema: schema2,
              tableNamesMap,
              table: fullSchema[relationTableTsName],
              tableConfig: schema2[relationTableTsName],
              queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
              tableAlias: relationTableAlias,
              joinOn: joinOn2,
              nestedQueryRelation: relation
            });
            const field = sql2`${sql2.identifier(relationTableAlias)}.${sql2.identifier("data")}`.as(selectedRelationTsKey);
            joins.push({
              on: sql2`true`,
              table: new Subquery(builtRelation.sql, {}, relationTableAlias),
              alias: relationTableAlias,
              joinType: "left",
              lateral: true
            });
            selection.push({
              dbKey: selectedRelationTsKey,
              tsKey: selectedRelationTsKey,
              field,
              relationTableTsKey: relationTableTsName,
              isJson: true,
              selection: builtRelation.selection
            });
          }
        }
        if (selection.length === 0) {
          throw new DrizzleError(`No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")`);
        }
        let result;
        where = and(joinOn, where);
        if (nestedQueryRelation) {
          let field = sql2`json_array(${sql2.join(selection.map(({ field: field2, tsKey, isJson }) => isJson ? sql2`${sql2.identifier(`${tableAlias}_${tsKey}`)}.${sql2.identifier("data")}` : is(field2, SQL.Aliased) ? field2.sql : field2), sql2`, `)})`;
          if (is(nestedQueryRelation, Many)) {
            field = sql2`coalesce(json_arrayagg(${field}), json_array())`;
          }
          const nestedSelection = [{
            dbKey: "data",
            tsKey: "data",
            field: field.as("data"),
            isJson: true,
            relationTableTsKey: tableConfig.tsName,
            selection
          }];
          const needsSubquery = limit !== void 0 || offset !== void 0 || (orderBy?.length ?? 0) > 0;
          if (needsSubquery) {
            result = this.buildSelectQuery({
              table: aliasedTable(table, tableAlias),
              fields: {},
              fieldsFlat: [
                {
                  path: [],
                  field: sql2.raw("*")
                },
                ...(orderBy?.length ?? 0) > 0 ? [{
                  path: [],
                  field: sql2`row_number() over (order by ${sql2.join(orderBy, sql2`, `)})`
                }] : []
              ],
              where,
              limit,
              offset
            });
            where = void 0;
            limit = void 0;
            offset = void 0;
            orderBy = void 0;
          } else {
            result = aliasedTable(table, tableAlias);
          }
          result = this.buildSelectQuery({
            table: is(result, MySqlTable) ? result : new Subquery(result, {}, tableAlias),
            fields: {},
            fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
              path: [],
              field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
            })),
            joins,
            where,
            limit,
            offset,
            orderBy
          });
        } else {
          result = this.buildSelectQuery({
            table: aliasedTable(table, tableAlias),
            fields: {},
            fieldsFlat: selection.map(({ field }) => ({
              path: [],
              field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
            })),
            joins,
            where,
            limit,
            offset,
            orderBy
          });
        }
        return {
          tableTsKey: tableConfig.tsName,
          sql: result,
          selection
        };
      }
      buildRelationalQueryWithoutLateralSubqueries({ fullSchema, schema: schema2, tableNamesMap, table, tableConfig, queryConfig: config, tableAlias, nestedQueryRelation, joinOn }) {
        let selection = [];
        let limit, offset, orderBy = [], where;
        if (config === true) {
          const selectionEntries = Object.entries(tableConfig.columns);
          selection = selectionEntries.map(([key2, value]) => ({
            dbKey: value.name,
            tsKey: key2,
            field: aliasedTableColumn(value, tableAlias),
            relationTableTsKey: void 0,
            isJson: false,
            selection: []
          }));
        } else {
          const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key2, value]) => [key2, aliasedTableColumn(value, tableAlias)]));
          if (config.where) {
            const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, getOperators()) : config.where;
            where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
          }
          const fieldsSelection = [];
          let selectedColumns = [];
          if (config.columns) {
            let isIncludeMode = false;
            for (const [field, value] of Object.entries(config.columns)) {
              if (value === void 0) {
                continue;
              }
              if (field in tableConfig.columns) {
                if (!isIncludeMode && value === true) {
                  isIncludeMode = true;
                }
                selectedColumns.push(field);
              }
            }
            if (selectedColumns.length > 0) {
              selectedColumns = isIncludeMode ? selectedColumns.filter((c2) => config.columns?.[c2] === true) : Object.keys(tableConfig.columns).filter((key2) => !selectedColumns.includes(key2));
            }
          } else {
            selectedColumns = Object.keys(tableConfig.columns);
          }
          for (const field of selectedColumns) {
            const column = tableConfig.columns[field];
            fieldsSelection.push({ tsKey: field, value: column });
          }
          let selectedRelations = [];
          if (config.with) {
            selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
          }
          let extras;
          if (config.extras) {
            extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql: sql2 }) : config.extras;
            for (const [tsKey, value] of Object.entries(extras)) {
              fieldsSelection.push({
                tsKey,
                value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
              });
            }
          }
          for (const { tsKey, value } of fieldsSelection) {
            selection.push({
              dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
              tsKey,
              field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
              relationTableTsKey: void 0,
              isJson: false,
              selection: []
            });
          }
          let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, getOrderByOperators()) : config.orderBy ?? [];
          if (!Array.isArray(orderByOrig)) {
            orderByOrig = [orderByOrig];
          }
          orderBy = orderByOrig.map((orderByValue) => {
            if (is(orderByValue, Column)) {
              return aliasedTableColumn(orderByValue, tableAlias);
            }
            return mapColumnsInSQLToAlias(orderByValue, tableAlias);
          });
          limit = config.limit;
          offset = config.offset;
          for (const { tsKey: selectedRelationTsKey, queryConfig: selectedRelationConfigValue, relation } of selectedRelations) {
            const normalizedRelation = normalizeRelation(schema2, tableNamesMap, relation);
            const relationTableName = relation.referencedTable[Table.Symbol.Name];
            const relationTableTsName = tableNamesMap[relationTableName];
            const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
            const joinOn2 = and(...normalizedRelation.fields.map((field2, i) => eq(aliasedTableColumn(normalizedRelation.references[i], relationTableAlias), aliasedTableColumn(field2, tableAlias))));
            const builtRelation = this.buildRelationalQueryWithoutLateralSubqueries({
              fullSchema,
              schema: schema2,
              tableNamesMap,
              table: fullSchema[relationTableTsName],
              tableConfig: schema2[relationTableTsName],
              queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
              tableAlias: relationTableAlias,
              joinOn: joinOn2,
              nestedQueryRelation: relation
            });
            let fieldSql = sql2`(${builtRelation.sql})`;
            if (is(relation, Many)) {
              fieldSql = sql2`coalesce(${fieldSql}, json_array())`;
            }
            const field = fieldSql.as(selectedRelationTsKey);
            selection.push({
              dbKey: selectedRelationTsKey,
              tsKey: selectedRelationTsKey,
              field,
              relationTableTsKey: relationTableTsName,
              isJson: true,
              selection: builtRelation.selection
            });
          }
        }
        if (selection.length === 0) {
          throw new DrizzleError(`No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`);
        }
        let result;
        where = and(joinOn, where);
        if (nestedQueryRelation) {
          let field = sql2`json_array(${sql2.join(selection.map(({ field: field2 }) => is(field2, MySqlColumn) ? sql2.identifier(field2.name) : is(field2, SQL.Aliased) ? field2.sql : field2), sql2`, `)})`;
          if (is(nestedQueryRelation, Many)) {
            field = sql2`json_arrayagg(${field})`;
          }
          const nestedSelection = [{
            dbKey: "data",
            tsKey: "data",
            field,
            isJson: true,
            relationTableTsKey: tableConfig.tsName,
            selection
          }];
          const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
          if (needsSubquery) {
            result = this.buildSelectQuery({
              table: aliasedTable(table, tableAlias),
              fields: {},
              fieldsFlat: [
                {
                  path: [],
                  field: sql2.raw("*")
                },
                ...orderBy.length > 0 ? [{
                  path: [],
                  field: sql2`row_number() over (order by ${sql2.join(orderBy, sql2`, `)})`
                }] : []
              ],
              where,
              limit,
              offset
            });
            where = void 0;
            limit = void 0;
            offset = void 0;
            orderBy = void 0;
          } else {
            result = aliasedTable(table, tableAlias);
          }
          result = this.buildSelectQuery({
            table: is(result, MySqlTable) ? result : new Subquery(result, {}, tableAlias),
            fields: {},
            fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
              path: [],
              field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
            })),
            where,
            limit,
            offset,
            orderBy
          });
        } else {
          result = this.buildSelectQuery({
            table: aliasedTable(table, tableAlias),
            fields: {},
            fieldsFlat: selection.map(({ field }) => ({
              path: [],
              field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
            })),
            where,
            limit,
            offset,
            orderBy
          });
        }
        return {
          tableTsKey: tableConfig.tsName,
          sql: result,
          selection
        };
      }
    };
    _a150 = entityKind;
    __publicField(MySqlDialect, _a150, "MySqlDialect");
    MySqlSelectBuilder = class {
      constructor(config) {
        __publicField(this, "fields");
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "withList", []);
        __publicField(this, "distinct");
        this.fields = config.fields;
        this.session = config.session;
        this.dialect = config.dialect;
        if (config.withList) {
          this.withList = config.withList;
        }
        this.distinct = config.distinct;
      }
      from(source) {
        const isPartialSelect = !!this.fields;
        let fields;
        if (this.fields) {
          fields = this.fields;
        } else if (is(source, Subquery)) {
          fields = Object.fromEntries(Object.keys(source[SubqueryConfig].selection).map((key2) => [key2, source[key2]]));
        } else if (is(source, MySqlViewBase)) {
          fields = source[ViewBaseConfig].selectedFields;
        } else if (is(source, SQL)) {
          fields = {};
        } else {
          fields = getTableColumns(source);
        }
        return new MySqlSelect({
          table: source,
          fields,
          isPartialSelect,
          session: this.session,
          dialect: this.dialect,
          withList: this.withList,
          distinct: this.distinct
        });
      }
    };
    _a151 = entityKind;
    __publicField(MySqlSelectBuilder, _a151, "MySqlSelectBuilder");
    MySqlSelectQueryBuilder = class extends TypedQueryBuilder {
      constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
        super();
        __publicField(this, "_");
        __publicField(this, "config");
        __publicField(this, "joinsNotNullableMap");
        __publicField(this, "tableName");
        __publicField(this, "isPartialSelect");
        /** @internal */
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "leftJoin", this.createJoin("left"));
        __publicField(this, "rightJoin", this.createJoin("right"));
        __publicField(this, "innerJoin", this.createJoin("inner"));
        __publicField(this, "fullJoin", this.createJoin("full"));
        this.config = {
          withList,
          table,
          fields: { ...fields },
          distinct
        };
        this.isPartialSelect = isPartialSelect;
        this.session = session;
        this.dialect = dialect;
        this._ = {
          selectedFields: fields
        };
        this.tableName = getTableLikeName(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
      }
      createJoin(joinType) {
        return (table, on) => {
          const baseTableName = this.tableName;
          const tableName = getTableLikeName(table);
          if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (!this.isPartialSelect) {
            if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
              this.config.fields = {
                [baseTableName]: this.config.fields
              };
            }
            if (typeof tableName === "string" && !is(table, SQL)) {
              const selection = is(table, Subquery) ? table[SubqueryConfig].selection : is(table, View) ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
              this.config.fields[tableName] = selection;
            }
          }
          if (typeof on === "function") {
            on = on(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
          }
          if (!this.config.joins) {
            this.config.joins = [];
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          if (typeof tableName === "string") {
            switch (joinType) {
              case "left": {
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
              case "right": {
                this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key2]) => [key2, false]));
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "inner": {
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "full": {
                this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key2]) => [key2, false]));
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
            }
          }
          return this;
        };
      }
      where(where) {
        if (typeof where === "function") {
          where = where(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
        }
        this.config.where = where;
        return this;
      }
      having(having) {
        if (typeof having === "function") {
          having = having(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
        }
        this.config.having = having;
        return this;
      }
      groupBy(...columns) {
        if (typeof columns[0] === "function") {
          const groupBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
          this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
        } else {
          this.config.groupBy = columns;
        }
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
          this.config.orderBy = Array.isArray(orderBy) ? orderBy : [orderBy];
        } else {
          this.config.orderBy = columns;
        }
        return this;
      }
      limit(limit) {
        this.config.limit = limit;
        return this;
      }
      offset(offset) {
        this.config.offset = offset;
        return this;
      }
      for(strength, config = {}) {
        this.config.lockingClause = { strength, config };
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildSelectQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      as(alias) {
        return new Proxy(new Subquery(this.getSQL(), this.config.fields, alias), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
    _a152 = entityKind;
    __publicField(MySqlSelectQueryBuilder, _a152, "MySqlSelectQueryBuilder");
    MySqlSelect = class extends MySqlSelectQueryBuilder {
      constructor() {
        super(...arguments);
        __publicField(this, "execute", (placeholderValues) => {
          return this.prepare().execute(placeholderValues);
        });
        __publicField(this, "createIterator", () => {
          const self = this;
          return async function* (placeholderValues) {
            yield* self.prepare().iterator(placeholderValues);
          };
        });
        __publicField(this, "iterator", this.createIterator());
      }
      prepare() {
        if (!this.session) {
          throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        }
        const fieldsList = orderSelectedFields(this.config.fields);
        const query = this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), fieldsList);
        query.joinsNotNullableMap = this.joinsNotNullableMap;
        return query;
      }
    };
    _a153 = entityKind;
    __publicField(MySqlSelect, _a153, "MySqlSelect");
    applyMixins(MySqlSelect, [QueryPromise]);
    QueryBuilder2 = class {
      constructor() {
        __publicField(this, "dialect");
      }
      $with(alias) {
        const queryBuilder = this;
        return {
          as(qb) {
            if (typeof qb === "function") {
              qb = qb(queryBuilder);
            }
            return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
          }
        };
      }
      with(...queries) {
        const self = this;
        function select(fields) {
          return new MySqlSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new MySqlSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries,
            distinct: true
          });
        }
        return { select, selectDistinct };
      }
      select(fields) {
        return new MySqlSelectBuilder({ fields: fields ?? void 0, session: void 0, dialect: this.getDialect() });
      }
      selectDistinct(fields) {
        return new MySqlSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect(),
          distinct: true
        });
      }
      // Lazy load dialect to avoid circular dependency
      getDialect() {
        if (!this.dialect) {
          this.dialect = new MySqlDialect();
        }
        return this.dialect;
      }
    };
    _a154 = entityKind;
    __publicField(QueryBuilder2, _a154, "MySqlQueryBuilder");
    RelationalQueryBuilder2 = class {
      constructor(fullSchema, schema2, tableNamesMap, table, tableConfig, dialect, session, mode) {
        __publicField(this, "fullSchema");
        __publicField(this, "schema");
        __publicField(this, "tableNamesMap");
        __publicField(this, "table");
        __publicField(this, "tableConfig");
        __publicField(this, "dialect");
        __publicField(this, "session");
        __publicField(this, "mode");
        this.fullSchema = fullSchema;
        this.schema = schema2;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.mode = mode;
      }
      findMany(config) {
        return new MySqlRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many", this.mode);
      }
      findFirst(config) {
        return new MySqlRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? { ...config, limit: 1 } : { limit: 1 }, "first", this.mode);
      }
    };
    _a155 = entityKind;
    __publicField(RelationalQueryBuilder2, _a155, "MySqlRelationalQueryBuilder");
    MySqlRelationalQuery = class extends QueryPromise {
      constructor(fullSchema, schema2, tableNamesMap, table, tableConfig, dialect, session, config, queryMode, mode) {
        super();
        __publicField(this, "fullSchema");
        __publicField(this, "schema");
        __publicField(this, "tableNamesMap");
        __publicField(this, "table");
        __publicField(this, "tableConfig");
        __publicField(this, "dialect");
        __publicField(this, "session");
        __publicField(this, "config");
        __publicField(this, "queryMode");
        __publicField(this, "mode");
        this.fullSchema = fullSchema;
        this.schema = schema2;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.config = config;
        this.queryMode = queryMode;
        this.mode = mode;
      }
      prepare() {
        const { query, builtQuery } = this._toSQL();
        return this.session.prepareQuery(builtQuery, void 0, (rawRows) => {
          const rows = rawRows.map((row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection));
          if (this.queryMode === "first") {
            return rows[0];
          }
          return rows;
        });
      }
      _toSQL() {
        const query = this.mode === "planetscale" ? this.dialect.buildRelationalQueryWithoutLateralSubqueries({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        }) : this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        });
        const builtQuery = this.dialect.sqlToQuery(query.sql);
        return { builtQuery, query };
      }
      toSQL() {
        return this._toSQL().builtQuery;
      }
      execute() {
        return this.prepare().execute();
      }
    };
    _a156 = entityKind;
    __publicField(MySqlRelationalQuery, _a156, "MySqlRelationalQuery");
    MySqlDatabase = class {
      constructor(dialect, session, schema2, mode) {
        __publicField(this, "dialect");
        __publicField(this, "session");
        __publicField(this, "mode");
        __publicField(this, "query");
        this.dialect = dialect;
        this.session = session;
        this.mode = mode;
        this._ = schema2 ? { schema: schema2.schema, tableNamesMap: schema2.tableNamesMap } : { schema: void 0, tableNamesMap: {} };
        this.query = {};
        if (this._.schema) {
          for (const [tableName, columns] of Object.entries(this._.schema)) {
            this.query[tableName] = new RelationalQueryBuilder2(schema2.fullSchema, this._.schema, this._.tableNamesMap, schema2.fullSchema[tableName], columns, dialect, session, this.mode);
          }
        }
      }
      $with(alias) {
        return {
          as(qb) {
            if (typeof qb === "function") {
              qb = qb(new QueryBuilder2());
            }
            return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
          }
        };
      }
      with(...queries) {
        const self = this;
        function select(fields) {
          return new MySqlSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new MySqlSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries,
            distinct: true
          });
        }
        return { select, selectDistinct };
      }
      select(fields) {
        return new MySqlSelectBuilder({ fields: fields ?? void 0, session: this.session, dialect: this.dialect });
      }
      selectDistinct(fields) {
        return new MySqlSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect,
          distinct: true
        });
      }
      update(table) {
        return new MySqlUpdateBuilder(table, this.session, this.dialect);
      }
      insert(table) {
        return new MySqlInsertBuilder(table, this.session, this.dialect);
      }
      delete(table) {
        return new MySqlDelete(table, this.session, this.dialect);
      }
      execute(query) {
        return this.session.execute(query.getSQL());
      }
      transaction(transaction, config) {
        return this.session.transaction(transaction, config);
      }
    };
    _a157 = entityKind;
    __publicField(MySqlDatabase, _a157, "MySqlDatabase");
    PreparedQuery2 = class {
      constructor() {
        /** @internal */
        __publicField(this, "joinsNotNullableMap");
      }
    };
    _a158 = entityKind;
    __publicField(PreparedQuery2, _a158, "MySqlPreparedQuery");
    MySqlSession = class {
      constructor(dialect) {
        __publicField(this, "dialect");
        this.dialect = dialect;
      }
      execute(query) {
        return this.prepareQuery(this.dialect.sqlToQuery(query), void 0).execute();
      }
      getSetTransactionSQL(config) {
        const parts = [];
        if (config.isolationLevel) {
          parts.push(`isolation level ${config.isolationLevel}`);
        }
        return parts.length ? sql2.join(["set transaction ", parts.join(" ")]) : void 0;
      }
      getStartTransactionSQL(config) {
        const parts = [];
        if (config.withConsistentSnapshot) {
          parts.push("with consistent snapshot");
        }
        if (config.accessMode) {
          parts.push(config.accessMode);
        }
        return parts.length ? sql2.join(["start transaction ", parts.join(" ")]) : void 0;
      }
    };
    _a159 = entityKind;
    __publicField(MySqlSession, _a159, "MySqlSession");
    MySqlTransaction = class extends MySqlDatabase {
      constructor(dialect, session, schema2, nestedIndex, mode) {
        super(dialect, session, schema2, mode);
        __publicField(this, "schema");
        __publicField(this, "nestedIndex");
        this.schema = schema2;
        this.nestedIndex = nestedIndex;
      }
      rollback() {
        throw new TransactionRollbackError();
      }
    };
    _a160 = entityKind;
    __publicField(MySqlTransaction, _a160, "MySqlTransaction");
    MySqlUpdateBuilder = class {
      constructor(table, session, dialect) {
        __publicField(this, "table");
        __publicField(this, "session");
        __publicField(this, "dialect");
        this.table = table;
        this.session = session;
        this.dialect = dialect;
      }
      set(values) {
        return new MySqlUpdate(this.table, mapUpdateSet(this.table, values), this.session, this.dialect);
      }
    };
    _a161 = entityKind;
    __publicField(MySqlUpdateBuilder, _a161, "MySqlUpdateBuilder");
    MySqlUpdate = class extends QueryPromise {
      constructor(table, set, session, dialect) {
        super();
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "config");
        __publicField(this, "execute", (placeholderValues) => {
          return this.prepare().execute(placeholderValues);
        });
        __publicField(this, "createIterator", () => {
          const self = this;
          return async function* (placeholderValues) {
            yield* self.prepare().iterator(placeholderValues);
          };
        });
        __publicField(this, "iterator", this.createIterator());
        this.session = session;
        this.dialect = dialect;
        this.config = { set, table };
      }
      where(where) {
        this.config.where = where;
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      prepare() {
        return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning);
      }
    };
    _a162 = entityKind;
    __publicField(MySqlUpdate, _a162, "MySqlUpdate");
    ViewBuilderCore = class {
      constructor(name2, schema2) {
        __publicField(this, "name");
        __publicField(this, "schema");
        __publicField(this, "config", {});
        this.name = name2;
        this.schema = schema2;
      }
      algorithm(algorithm) {
        this.config.algorithm = algorithm;
        return this;
      }
      definer(definer) {
        this.config.definer = definer;
        return this;
      }
      sqlSecurity(sqlSecurity) {
        this.config.sqlSecurity = sqlSecurity;
        return this;
      }
      withCheckOption(withCheckOption) {
        this.config.withCheckOption = withCheckOption ?? "cascaded";
        return this;
      }
    };
    _a163 = entityKind;
    __publicField(ViewBuilderCore, _a163, "MySqlViewBuilder");
    ViewBuilder2 = class extends ViewBuilderCore {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder2());
        }
        const selectionProxy = new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        });
        const aliasedSelection = new Proxy(qb.getSelectedFields(), selectionProxy);
        return new Proxy(new MySqlView({
          mysqlConfig: this.config,
          config: {
            name: this.name,
            schema: this.schema,
            selectedFields: aliasedSelection,
            query: qb.getSQL().inlineParams()
          }
        }), selectionProxy);
      }
    };
    _a164 = entityKind;
    __publicField(ViewBuilder2, _a164, "MySqlViewBuilder");
    ManualViewBuilder2 = class extends ViewBuilderCore {
      constructor(name2, columns, schema2) {
        super(name2, schema2);
        __publicField(this, "columns");
        this.columns = getTableColumns(mysqlTable(name2, columns));
      }
      existing() {
        return new Proxy(new MySqlView({
          mysqlConfig: void 0,
          config: {
            name: this.name,
            schema: this.schema,
            selectedFields: this.columns,
            query: void 0
          }
        }), new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        }));
      }
      as(query) {
        return new Proxy(new MySqlView({
          mysqlConfig: this.config,
          config: {
            name: this.name,
            schema: this.schema,
            selectedFields: this.columns,
            query: query.inlineParams()
          }
        }), new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        }));
      }
    };
    _a165 = entityKind;
    __publicField(ManualViewBuilder2, _a165, "MySqlManualViewBuilder");
    MySqlViewBase = class extends View {
    };
    _a166 = entityKind;
    __publicField(MySqlViewBase, _a166, "MySqlViewBase");
    MySqlViewConfig = Symbol.for("drizzle:MySqlViewConfig");
    MySqlView = class extends MySqlViewBase {
      constructor({ mysqlConfig, config }) {
        super(config);
        __publicField(this, _b9);
        this[MySqlViewConfig] = mysqlConfig;
      }
    };
    _a167 = entityKind, _b9 = MySqlViewConfig;
    __publicField(MySqlView, _a167, "MySqlView");
  }
});

// node_modules/drizzle-orm/mysql-core/index.mjs
var _a168, MySqlBigInt53Builder, _a169, MySqlBigInt53, _a170, MySqlBigInt64Builder, _a171, MySqlBigInt64, _a172, MySqlBinaryBuilder, _a173, MySqlBinary, _a174, MySqlBooleanBuilder, _a175, MySqlBoolean, _a176, MySqlCharBuilder, _a177, MySqlChar, _a178, MySqlCustomColumnBuilder, _a179, MySqlCustomColumn, _a180, MySqlDateBuilder, _a181, MySqlDate, _a182, MySqlDateStringBuilder, _a183, MySqlDateString, _a184, MySqlDateTimeBuilder, _a185, MySqlDateTime, _a186, MySqlDateTimeStringBuilder, _a187, MySqlDateTimeString, _a188, MySqlDecimalBuilder, _a189, MySqlDecimal, _a190, MySqlDoubleBuilder, _a191, MySqlDouble, _a192, MySqlEnumColumnBuilder, _a193, MySqlEnumColumn, _a194, MySqlFloatBuilder, _a195, MySqlFloat, _a196, MySqlIntBuilder, _a197, MySqlInt, _a198, MySqlJsonBuilder, _a199, MySqlJson, _a200, MySqlMediumIntBuilder, _a201, MySqlMediumInt, _a202, MySqlRealBuilder, _a203, MySqlReal, _a204, MySqlSerialBuilder, _a205, MySqlSerial, _a206, MySqlSmallIntBuilder, _a207, MySqlSmallInt, _a208, MySqlTextBuilder, _a209, MySqlText, _a210, MySqlTimeBuilder, _a211, MySqlTime, _a212, MySqlDateColumnBaseBuilder, _a213, MySqlDateBaseColumn, _a214, MySqlTimestampBuilder, _a215, MySqlTimestamp, _a216, MySqlTimestampStringBuilder, _a217, MySqlTimestampString, _a218, MySqlTinyIntBuilder, _a219, MySqlTinyInt, _a220, MySqlVarBinaryBuilder, _a221, MySqlVarBinary, _a222, MySqlVarCharBuilder, _a223, MySqlVarChar, _a224, MySqlYearBuilder, _a225, MySqlYear, _a226, CheckBuilder2, _a227, Check2, _a228, IndexBuilderOn2, _a229, IndexBuilder2, _a230, Index2, _a231, PrimaryKeyBuilder2, _a232, PrimaryKey2, _a233, MySqlSchema;
var init_mysql_core = __esm({
  "node_modules/drizzle-orm/mysql-core/index.mjs"() {
    init_alias_cf8e03cd();
    init_view_23898f21();
    MySqlBigInt53Builder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2) {
        super(name2, "number", "MySqlBigInt53");
      }
      /** @internal */
      build(table) {
        return new MySqlBigInt53(table, this.config);
      }
    };
    _a168 = entityKind;
    __publicField(MySqlBigInt53Builder, _a168, "MySqlBigInt53Builder");
    MySqlBigInt53 = class extends MySqlColumnWithAutoIncrement {
      getSQLType() {
        return "bigint";
      }
      mapFromDriverValue(value) {
        if (typeof value === "number") {
          return value;
        }
        return Number(value);
      }
    };
    _a169 = entityKind;
    __publicField(MySqlBigInt53, _a169, "MySqlBigInt53");
    MySqlBigInt64Builder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2) {
        super(name2, "bigint", "MySqlBigInt64");
      }
      /** @internal */
      build(table) {
        return new MySqlBigInt64(table, this.config);
      }
    };
    _a170 = entityKind;
    __publicField(MySqlBigInt64Builder, _a170, "MySqlBigInt64Builder");
    MySqlBigInt64 = class extends MySqlColumnWithAutoIncrement {
      getSQLType() {
        return "bigint";
      }
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      mapFromDriverValue(value) {
        return BigInt(value);
      }
    };
    _a171 = entityKind;
    __publicField(MySqlBigInt64, _a171, "MySqlBigInt64");
    MySqlBinaryBuilder = class extends MySqlColumnBuilder {
      constructor(name2, length) {
        super(name2, "string", "MySqlBinary");
        this.config.length = length;
      }
      /** @internal */
      build(table) {
        return new MySqlBinary(table, this.config);
      }
    };
    _a172 = entityKind;
    __publicField(MySqlBinaryBuilder, _a172, "MySqlBinaryBuilder");
    MySqlBinary = class extends MySqlColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "length", this.config.length);
      }
      getSQLType() {
        return this.length === void 0 ? `binary` : `binary(${this.length})`;
      }
    };
    _a173 = entityKind;
    __publicField(MySqlBinary, _a173, "MySqlBinary");
    MySqlBooleanBuilder = class extends MySqlColumnBuilder {
      constructor(name2) {
        super(name2, "boolean", "MySqlBoolean");
      }
      /** @internal */
      build(table) {
        return new MySqlBoolean(table, this.config);
      }
    };
    _a174 = entityKind;
    __publicField(MySqlBooleanBuilder, _a174, "MySqlBooleanBuilder");
    MySqlBoolean = class extends MySqlColumn {
      getSQLType() {
        return "boolean";
      }
      mapFromDriverValue(value) {
        if (typeof value === "boolean") {
          return value;
        }
        return value === 1;
      }
    };
    _a175 = entityKind;
    __publicField(MySqlBoolean, _a175, "MySqlBoolean");
    MySqlCharBuilder = class extends MySqlColumnBuilder {
      constructor(name2, config) {
        super(name2, "string", "MySqlChar");
        this.config.length = config.length;
        this.config.enum = config.enum;
      }
      /** @internal */
      build(table) {
        return new MySqlChar(table, this.config);
      }
    };
    _a176 = entityKind;
    __publicField(MySqlCharBuilder, _a176, "MySqlCharBuilder");
    MySqlChar = class extends MySqlColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "length", this.config.length);
        __publicField(this, "enumValues", this.config.enum);
      }
      getSQLType() {
        return this.length === void 0 ? `char` : `char(${this.length})`;
      }
    };
    _a177 = entityKind;
    __publicField(MySqlChar, _a177, "MySqlChar");
    MySqlCustomColumnBuilder = class extends MySqlColumnBuilder {
      constructor(name2, fieldConfig, customTypeParams) {
        super(name2, "custom", "MySqlCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
      }
      /** @internal */
      build(table) {
        return new MySqlCustomColumn(table, this.config);
      }
    };
    _a178 = entityKind;
    __publicField(MySqlCustomColumnBuilder, _a178, "MySqlCustomColumnBuilder");
    MySqlCustomColumn = class extends MySqlColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "sqlName");
        __publicField(this, "mapTo");
        __publicField(this, "mapFrom");
        this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
        this.mapTo = config.customTypeParams.toDriver;
        this.mapFrom = config.customTypeParams.fromDriver;
      }
      getSQLType() {
        return this.sqlName;
      }
      mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
      }
      mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
      }
    };
    _a179 = entityKind;
    __publicField(MySqlCustomColumn, _a179, "MySqlCustomColumn");
    MySqlDateBuilder = class extends MySqlColumnBuilder {
      constructor(name2) {
        super(name2, "date", "MySqlDate");
      }
      /** @internal */
      build(table) {
        return new MySqlDate(table, this.config);
      }
    };
    _a180 = entityKind;
    __publicField(MySqlDateBuilder, _a180, "MySqlDateBuilder");
    MySqlDate = class extends MySqlColumn {
      constructor(table, config) {
        super(table, config);
      }
      getSQLType() {
        return `date`;
      }
      mapFromDriverValue(value) {
        return new Date(value);
      }
    };
    _a181 = entityKind;
    __publicField(MySqlDate, _a181, "MySqlDate");
    MySqlDateStringBuilder = class extends MySqlColumnBuilder {
      constructor(name2) {
        super(name2, "string", "MySqlDateString");
      }
      /** @internal */
      build(table) {
        return new MySqlDateString(table, this.config);
      }
    };
    _a182 = entityKind;
    __publicField(MySqlDateStringBuilder, _a182, "MySqlDateStringBuilder");
    MySqlDateString = class extends MySqlColumn {
      constructor(table, config) {
        super(table, config);
      }
      getSQLType() {
        return `date`;
      }
    };
    _a183 = entityKind;
    __publicField(MySqlDateString, _a183, "MySqlDateString");
    MySqlDateTimeBuilder = class extends MySqlColumnBuilder {
      constructor(name2, config) {
        super(name2, "date", "MySqlDateTime");
        this.config.fsp = config?.fsp;
      }
      /** @internal */
      build(table) {
        return new MySqlDateTime(table, this.config);
      }
    };
    _a184 = entityKind;
    __publicField(MySqlDateTimeBuilder, _a184, "MySqlDateTimeBuilder");
    MySqlDateTime = class extends MySqlColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "fsp");
        this.fsp = config.fsp;
      }
      getSQLType() {
        const precision = this.fsp === void 0 ? "" : `(${this.fsp})`;
        return `datetime${precision}`;
      }
      mapToDriverValue(value) {
        return value.toISOString().replace("T", " ").replace("Z", "");
      }
      mapFromDriverValue(value) {
        return /* @__PURE__ */ new Date(value.replace(" ", "T") + "Z");
      }
    };
    _a185 = entityKind;
    __publicField(MySqlDateTime, _a185, "MySqlDateTime");
    MySqlDateTimeStringBuilder = class extends MySqlColumnBuilder {
      constructor(name2, config) {
        super(name2, "string", "MySqlDateTimeString");
        this.config.fsp = config?.fsp;
      }
      /** @internal */
      build(table) {
        return new MySqlDateTimeString(table, this.config);
      }
    };
    _a186 = entityKind;
    __publicField(MySqlDateTimeStringBuilder, _a186, "MySqlDateTimeStringBuilder");
    MySqlDateTimeString = class extends MySqlColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "fsp");
        this.fsp = config.fsp;
      }
      getSQLType() {
        const precision = this.fsp === void 0 ? "" : `(${this.fsp})`;
        return `datetime${precision}`;
      }
    };
    _a187 = entityKind;
    __publicField(MySqlDateTimeString, _a187, "MySqlDateTimeString");
    MySqlDecimalBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2, precision, scale) {
        super(name2, "string", "MySqlDecimal");
        this.config.precision = precision;
        this.config.scale = scale;
      }
      /** @internal */
      build(table) {
        return new MySqlDecimal(table, this.config);
      }
    };
    _a188 = entityKind;
    __publicField(MySqlDecimalBuilder, _a188, "MySqlDecimalBuilder");
    MySqlDecimal = class extends MySqlColumnWithAutoIncrement {
      constructor() {
        super(...arguments);
        __publicField(this, "precision", this.config.precision);
        __publicField(this, "scale", this.config.scale);
      }
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
          return `decimal(${this.precision},${this.scale})`;
        } else if (this.precision === void 0) {
          return "decimal";
        } else {
          return `decimal(${this.precision})`;
        }
      }
    };
    _a189 = entityKind;
    __publicField(MySqlDecimal, _a189, "MySqlDecimal");
    MySqlDoubleBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2, config) {
        super(name2, "number", "MySqlDouble");
        this.config.precision = config?.precision;
        this.config.scale = config?.scale;
      }
      /** @internal */
      build(table) {
        return new MySqlDouble(table, this.config);
      }
    };
    _a190 = entityKind;
    __publicField(MySqlDoubleBuilder, _a190, "MySqlDoubleBuilder");
    MySqlDouble = class extends MySqlColumnWithAutoIncrement {
      constructor() {
        super(...arguments);
        __publicField(this, "precision", this.config.precision);
        __publicField(this, "scale", this.config.scale);
      }
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
          return `double(${this.precision},${this.scale})`;
        } else if (this.precision === void 0) {
          return "double";
        } else {
          return `double(${this.precision})`;
        }
      }
    };
    _a191 = entityKind;
    __publicField(MySqlDouble, _a191, "MySqlDouble");
    MySqlEnumColumnBuilder = class extends MySqlColumnBuilder {
      constructor(name2, values) {
        super(name2, "string", "MySqlEnumColumn");
        this.config.enumValues = values;
      }
      /** @internal */
      build(table) {
        return new MySqlEnumColumn(table, this.config);
      }
    };
    _a192 = entityKind;
    __publicField(MySqlEnumColumnBuilder, _a192, "MySqlEnumColumnBuilder");
    MySqlEnumColumn = class extends MySqlColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "enumValues", this.config.enumValues);
      }
      getSQLType() {
        return `enum(${this.enumValues.map((value) => `'${value}'`).join(",")})`;
      }
    };
    _a193 = entityKind;
    __publicField(MySqlEnumColumn, _a193, "MySqlEnumColumn");
    MySqlFloatBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2) {
        super(name2, "number", "MySqlFloat");
      }
      /** @internal */
      build(table) {
        return new MySqlFloat(table, this.config);
      }
    };
    _a194 = entityKind;
    __publicField(MySqlFloatBuilder, _a194, "MySqlFloatBuilder");
    MySqlFloat = class extends MySqlColumnWithAutoIncrement {
      getSQLType() {
        return "float";
      }
    };
    _a195 = entityKind;
    __publicField(MySqlFloat, _a195, "MySqlFloat");
    MySqlIntBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2) {
        super(name2, "number", "MySqlInt");
      }
      /** @internal */
      build(table) {
        return new MySqlInt(table, this.config);
      }
    };
    _a196 = entityKind;
    __publicField(MySqlIntBuilder, _a196, "MySqlIntBuilder");
    MySqlInt = class extends MySqlColumnWithAutoIncrement {
      getSQLType() {
        return "int";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number(value);
        }
        return value;
      }
    };
    _a197 = entityKind;
    __publicField(MySqlInt, _a197, "MySqlInt");
    MySqlJsonBuilder = class extends MySqlColumnBuilder {
      constructor(name2) {
        super(name2, "json", "MySqlJson");
      }
      /** @internal */
      build(table) {
        return new MySqlJson(table, this.config);
      }
    };
    _a198 = entityKind;
    __publicField(MySqlJsonBuilder, _a198, "MySqlJsonBuilder");
    MySqlJson = class extends MySqlColumn {
      getSQLType() {
        return "json";
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
    };
    _a199 = entityKind;
    __publicField(MySqlJson, _a199, "MySqlJson");
    MySqlMediumIntBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2) {
        super(name2, "number", "MySqlMediumInt");
      }
      /** @internal */
      build(table) {
        return new MySqlMediumInt(table, this.config);
      }
    };
    _a200 = entityKind;
    __publicField(MySqlMediumIntBuilder, _a200, "MySqlMediumIntBuilder");
    MySqlMediumInt = class extends MySqlColumnWithAutoIncrement {
      getSQLType() {
        return "mediumint";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number(value);
        }
        return value;
      }
    };
    _a201 = entityKind;
    __publicField(MySqlMediumInt, _a201, "MySqlMediumInt");
    MySqlRealBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2, config) {
        super(name2, "number", "MySqlReal");
        this.config.precision = config?.precision;
        this.config.scale = config?.scale;
      }
      /** @internal */
      build(table) {
        return new MySqlReal(table, this.config);
      }
    };
    _a202 = entityKind;
    __publicField(MySqlRealBuilder, _a202, "MySqlRealBuilder");
    MySqlReal = class extends MySqlColumnWithAutoIncrement {
      constructor() {
        super(...arguments);
        __publicField(this, "precision", this.config.precision);
        __publicField(this, "scale", this.config.scale);
      }
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
          return `real(${this.precision}, ${this.scale})`;
        } else if (this.precision === void 0) {
          return "real";
        } else {
          return `real(${this.precision})`;
        }
      }
    };
    _a203 = entityKind;
    __publicField(MySqlReal, _a203, "MySqlReal");
    MySqlSerialBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2) {
        super(name2, "number", "MySqlSerial");
        this.config.hasDefault = true;
        this.config.autoIncrement = true;
      }
      /** @internal */
      build(table) {
        return new MySqlSerial(table, this.config);
      }
    };
    _a204 = entityKind;
    __publicField(MySqlSerialBuilder, _a204, "MySqlSerialBuilder");
    MySqlSerial = class extends MySqlColumnWithAutoIncrement {
      getSQLType() {
        return "serial";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number(value);
        }
        return value;
      }
    };
    _a205 = entityKind;
    __publicField(MySqlSerial, _a205, "MySqlSerial");
    MySqlSmallIntBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2) {
        super(name2, "number", "MySqlSmallInt");
      }
      /** @internal */
      build(table) {
        return new MySqlSmallInt(table, this.config);
      }
    };
    _a206 = entityKind;
    __publicField(MySqlSmallIntBuilder, _a206, "MySqlSmallIntBuilder");
    MySqlSmallInt = class extends MySqlColumnWithAutoIncrement {
      getSQLType() {
        return "smallint";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number(value);
        }
        return value;
      }
    };
    _a207 = entityKind;
    __publicField(MySqlSmallInt, _a207, "MySqlSmallInt");
    MySqlTextBuilder = class extends MySqlColumnBuilder {
      constructor(name2, textType, config) {
        super(name2, "string", "MySqlText");
        this.config.textType = textType;
        this.config.enumValues = config.enum;
      }
      /** @internal */
      build(table) {
        return new MySqlText(table, this.config);
      }
    };
    _a208 = entityKind;
    __publicField(MySqlTextBuilder, _a208, "MySqlTextBuilder");
    MySqlText = class extends MySqlColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "textType", this.config.textType);
        __publicField(this, "enumValues", this.config.enumValues);
      }
      getSQLType() {
        return this.textType;
      }
    };
    _a209 = entityKind;
    __publicField(MySqlText, _a209, "MySqlText");
    MySqlTimeBuilder = class extends MySqlColumnBuilder {
      constructor(name2, config) {
        super(name2, "string", "MySqlTime");
        this.config.fsp = config?.fsp;
      }
      /** @internal */
      build(table) {
        return new MySqlTime(table, this.config);
      }
    };
    _a210 = entityKind;
    __publicField(MySqlTimeBuilder, _a210, "MySqlTimeBuilder");
    MySqlTime = class extends MySqlColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "fsp", this.config.fsp);
      }
      getSQLType() {
        const precision = this.fsp === void 0 ? "" : `(${this.fsp})`;
        return `time${precision}`;
      }
    };
    _a211 = entityKind;
    __publicField(MySqlTime, _a211, "MySqlTime");
    MySqlDateColumnBaseBuilder = class extends MySqlColumnBuilder {
      defaultNow() {
        return this.default(sql2`(now())`);
      }
      // "on update now" also adds an implicit default value to the column - https://dev.mysql.com/doc/refman/8.0/en/timestamp-initialization.html
      onUpdateNow() {
        this.config.hasOnUpdateNow = true;
        this.config.hasDefault = true;
        return this;
      }
    };
    _a212 = entityKind;
    __publicField(MySqlDateColumnBaseBuilder, _a212, "MySqlDateColumnBuilder");
    MySqlDateBaseColumn = class extends MySqlColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "hasOnUpdateNow", this.config.hasOnUpdateNow);
      }
    };
    _a213 = entityKind;
    __publicField(MySqlDateBaseColumn, _a213, "MySqlDateColumn");
    MySqlTimestampBuilder = class extends MySqlDateColumnBaseBuilder {
      constructor(name2, config) {
        super(name2, "date", "MySqlTimestamp");
        this.config.fsp = config?.fsp;
      }
      /** @internal */
      build(table) {
        return new MySqlTimestamp(table, this.config);
      }
    };
    _a214 = entityKind;
    __publicField(MySqlTimestampBuilder, _a214, "MySqlTimestampBuilder");
    MySqlTimestamp = class extends MySqlDateBaseColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "fsp", this.config.fsp);
      }
      getSQLType() {
        const precision = this.fsp === void 0 ? "" : `(${this.fsp})`;
        return `timestamp${precision}`;
      }
      mapFromDriverValue(value) {
        return /* @__PURE__ */ new Date(value + "+0000");
      }
      mapToDriverValue(value) {
        return value.toISOString().slice(0, -1).replace("T", " ");
      }
    };
    _a215 = entityKind;
    __publicField(MySqlTimestamp, _a215, "MySqlTimestamp");
    MySqlTimestampStringBuilder = class extends MySqlDateColumnBaseBuilder {
      constructor(name2, config) {
        super(name2, "string", "MySqlTimestampString");
        this.config.fsp = config?.fsp;
      }
      /** @internal */
      build(table) {
        return new MySqlTimestampString(table, this.config);
      }
    };
    _a216 = entityKind;
    __publicField(MySqlTimestampStringBuilder, _a216, "MySqlTimestampStringBuilder");
    MySqlTimestampString = class extends MySqlDateBaseColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "fsp", this.config.fsp);
      }
      getSQLType() {
        const precision = this.fsp === void 0 ? "" : `(${this.fsp})`;
        return `timestamp${precision}`;
      }
    };
    _a217 = entityKind;
    __publicField(MySqlTimestampString, _a217, "MySqlTimestampString");
    MySqlTinyIntBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
      constructor(name2) {
        super(name2, "number", "MySqlTinyInt");
      }
      /** @internal */
      build(table) {
        return new MySqlTinyInt(table, this.config);
      }
    };
    _a218 = entityKind;
    __publicField(MySqlTinyIntBuilder, _a218, "MySqlTinyIntBuilder");
    MySqlTinyInt = class extends MySqlColumnWithAutoIncrement {
      getSQLType() {
        return "tinyint";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number(value);
        }
        return value;
      }
    };
    _a219 = entityKind;
    __publicField(MySqlTinyInt, _a219, "MySqlTinyInt");
    MySqlVarBinaryBuilder = class extends MySqlColumnBuilder {
      /** @internal */
      constructor(name2, config) {
        super(name2, "string", "MySqlVarBinary");
        this.config.length = config?.length;
      }
      /** @internal */
      build(table) {
        return new MySqlVarBinary(table, this.config);
      }
    };
    _a220 = entityKind;
    __publicField(MySqlVarBinaryBuilder, _a220, "MySqlVarBinaryBuilder");
    MySqlVarBinary = class extends MySqlColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "length", this.config.length);
      }
      getSQLType() {
        return this.length === void 0 ? `varbinary` : `varbinary(${this.length})`;
      }
    };
    _a221 = entityKind;
    __publicField(MySqlVarBinary, _a221, "MySqlVarBinary");
    MySqlVarCharBuilder = class extends MySqlColumnBuilder {
      /** @internal */
      constructor(name2, config) {
        super(name2, "string", "MySqlVarChar");
        this.config.length = config.length;
        this.config.enum = config.enum;
      }
      /** @internal */
      build(table) {
        return new MySqlVarChar(table, this.config);
      }
    };
    _a222 = entityKind;
    __publicField(MySqlVarCharBuilder, _a222, "MySqlVarCharBuilder");
    MySqlVarChar = class extends MySqlColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "length", this.config.length);
        __publicField(this, "enumValues", this.config.enum);
      }
      getSQLType() {
        return this.length === void 0 ? `varchar` : `varchar(${this.length})`;
      }
    };
    _a223 = entityKind;
    __publicField(MySqlVarChar, _a223, "MySqlVarChar");
    MySqlYearBuilder = class extends MySqlColumnBuilder {
      constructor(name2) {
        super(name2, "number", "MySqlYear");
      }
      /** @internal */
      build(table) {
        return new MySqlYear(table, this.config);
      }
    };
    _a224 = entityKind;
    __publicField(MySqlYearBuilder, _a224, "MySqlYearBuilder");
    MySqlYear = class extends MySqlColumn {
      getSQLType() {
        return `year`;
      }
    };
    _a225 = entityKind;
    __publicField(MySqlYear, _a225, "MySqlYear");
    CheckBuilder2 = class {
      constructor(name2, value) {
        __publicField(this, "name");
        __publicField(this, "value");
        __publicField(this, "brand");
        this.name = name2;
        this.value = value;
      }
      /** @internal */
      build(table) {
        return new Check2(table, this);
      }
    };
    _a226 = entityKind;
    __publicField(CheckBuilder2, _a226, "MySqlCheckBuilder");
    Check2 = class {
      constructor(table, builder) {
        __publicField(this, "table");
        __publicField(this, "name");
        __publicField(this, "value");
        this.table = table;
        this.name = builder.name;
        this.value = builder.value;
      }
    };
    _a227 = entityKind;
    __publicField(Check2, _a227, "MySqlCheck");
    IndexBuilderOn2 = class {
      constructor(name2, unique2) {
        __publicField(this, "name");
        __publicField(this, "unique");
        this.name = name2;
        this.unique = unique2;
      }
      on(...columns) {
        return new IndexBuilder2(this.name, columns, this.unique);
      }
    };
    _a228 = entityKind;
    __publicField(IndexBuilderOn2, _a228, "MySqlIndexBuilderOn");
    IndexBuilder2 = class {
      constructor(name2, columns, unique2) {
        /** @internal */
        __publicField(this, "config");
        this.config = {
          name: name2,
          columns,
          unique: unique2
        };
      }
      using(using) {
        this.config.using = using;
        return this;
      }
      algorythm(algorythm) {
        this.config.algorythm = algorythm;
        return this;
      }
      lock(lock) {
        this.config.lock = lock;
        return this;
      }
      /** @internal */
      build(table) {
        return new Index2(this.config, table);
      }
    };
    _a229 = entityKind;
    __publicField(IndexBuilder2, _a229, "MySqlIndexBuilder");
    Index2 = class {
      constructor(config, table) {
        __publicField(this, "config");
        this.config = { ...config, table };
      }
    };
    _a230 = entityKind;
    __publicField(Index2, _a230, "MySqlIndex");
    PrimaryKeyBuilder2 = class {
      constructor(columns) {
        /** @internal */
        __publicField(this, "columns");
        this.columns = columns;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey2(table, this.columns);
      }
    };
    _a231 = entityKind;
    __publicField(PrimaryKeyBuilder2, _a231, "MySqlPrimaryKeyBuilder");
    PrimaryKey2 = class {
      constructor(table, columns) {
        __publicField(this, "table");
        __publicField(this, "columns");
        this.table = table;
        this.columns = columns;
      }
      getName() {
        return `${this.table[MySqlTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    };
    _a232 = entityKind;
    __publicField(PrimaryKey2, _a232, "MySqlPrimaryKey");
    MySqlSchema = class {
      constructor(schemaName) {
        __publicField(this, "schemaName");
        __publicField(this, "table", (name2, columns, extraConfig) => {
          return mysqlTableWithSchema(name2, columns, extraConfig, this.schemaName);
        });
        __publicField(this, "view", (name2, columns) => {
          return mysqlViewWithSchema(name2, columns, this.schemaName);
        });
        this.schemaName = schemaName;
      }
    };
    _a233 = entityKind;
    __publicField(MySqlSchema, _a233, "MySqlSchema");
  }
});

// node_modules/drizzle-orm/session-afae3551.mjs
function sqliteTableBase(name2, columns, extraConfig, schema2, baseName = name2) {
  const rawTable = new SQLiteTable(name2, schema2, baseName);
  const builtColumns = Object.fromEntries(Object.entries(columns).map(([name3, colBuilderBase]) => {
    const colBuilder = colBuilderBase;
    const column = colBuilder.build(rawTable);
    rawTable[InlineForeignKeys3].push(...colBuilder.buildForeignKeys(column, rawTable));
    return [name3, column];
  }));
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  if (extraConfig) {
    table[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
function uniqueKeyName3(table, columns) {
  return `${table[SQLiteTable.Symbol.Name]}_${columns.join("_")}_unique`;
}
var InlineForeignKeys3, _a234, _b10, _c4, _d3, SQLiteTable, sqliteTable, _a235, SQLiteDelete, _a236, SQLiteInsertBuilder, _a237, SQLiteInsert, _a238, ForeignKeyBuilder3, _a239, ForeignKey3, _a240, UniqueConstraintBuilder3, _a241, UniqueOnConstraintBuilder3, _a242, UniqueConstraint3, _a243, SQLiteColumnBuilder, _a244, SQLiteColumn, _a245, ViewBuilderCore2, _a246, ViewBuilder3, _a247, ManualViewBuilder3, _a248, SQLiteViewBase, SQLiteViewConfig, _a249, _b11, SQLiteView, _a250, SQLiteDialect, _a251, SQLiteSyncDialect, _a252, SQLiteAsyncDialect, _a253, SQLiteSelectBuilder, _a254, SQLiteSelectQueryBuilder, _a255, SQLiteSelect, _a256, QueryBuilder3, _a257, SQLiteUpdateBuilder, _a258, SQLiteUpdate, _a259, RelationalQueryBuilder3, _a260, SQLiteRelationalQuery, _a261, SQLiteSyncRelationalQuery, _a262, SQLiteRaw, _a263, BaseSQLiteDatabase, _a264, ExecuteResultSync, _a265, _b12, PreparedQuery$1, _a266, SQLiteSession, _a267, SQLiteTransaction;
var init_session_afae3551 = __esm({
  "node_modules/drizzle-orm/session-afae3551.mjs"() {
    init_alias_cf8e03cd();
    InlineForeignKeys3 = Symbol.for("drizzle:SQLiteInlineForeignKeys");
    SQLiteTable = class extends Table {
      constructor() {
        super(...arguments);
        /** @internal */
        __publicField(this, _b10);
        /** @internal */
        __publicField(this, _c4, []);
        /** @internal */
        __publicField(this, _d3);
      }
    };
    _a234 = entityKind, _b10 = Table.Symbol.Columns, _c4 = InlineForeignKeys3, _d3 = Table.Symbol.ExtraConfigBuilder;
    __publicField(SQLiteTable, _a234, "SQLiteTable");
    /** @internal */
    __publicField(SQLiteTable, "Symbol", Object.assign({}, Table.Symbol, {
      InlineForeignKeys: InlineForeignKeys3
    }));
    sqliteTable = (name2, columns, extraConfig) => {
      return sqliteTableBase(name2, columns, extraConfig);
    };
    SQLiteDelete = class extends QueryPromise {
      constructor(table, session, dialect) {
        super();
        __publicField(this, "table");
        __publicField(this, "session");
        __publicField(this, "dialect");
        /** @internal */
        __publicField(this, "config");
        __publicField(this, "run", (placeholderValues) => {
          return this.prepare(true).run(placeholderValues);
        });
        __publicField(this, "all", (placeholderValues) => {
          return this.prepare(true).all(placeholderValues);
        });
        __publicField(this, "get", (placeholderValues) => {
          return this.prepare(true).get(placeholderValues);
        });
        __publicField(this, "values", (placeholderValues) => {
          return this.prepare(true).values(placeholderValues);
        });
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.config = { table };
      }
      where(where) {
        this.config.where = where;
        return this;
      }
      returning(fields = this.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildDeleteQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      prepare(isOneTimeQuery) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run");
      }
      async execute(placeholderValues) {
        return this.prepare(true).execute(placeholderValues);
      }
    };
    _a235 = entityKind;
    __publicField(SQLiteDelete, _a235, "SQLiteDelete");
    SQLiteInsertBuilder = class {
      constructor(table, session, dialect) {
        __publicField(this, "table");
        __publicField(this, "session");
        __publicField(this, "dialect");
        this.table = table;
        this.session = session;
        this.dialect = dialect;
      }
      values(values) {
        values = Array.isArray(values) ? values : [values];
        if (values.length === 0) {
          throw new Error("values() must be called with at least one value");
        }
        const mappedValues = values.map((entry) => {
          const result = {};
          const cols = this.table[Table.Symbol.Columns];
          for (const colKey of Object.keys(entry)) {
            const colValue = entry[colKey];
            result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
          }
          return result;
        });
        return new SQLiteInsert(this.table, mappedValues, this.session, this.dialect);
      }
    };
    _a236 = entityKind;
    __publicField(SQLiteInsertBuilder, _a236, "SQLiteInsertBuilder");
    SQLiteInsert = class extends QueryPromise {
      constructor(table, values, session, dialect) {
        super();
        __publicField(this, "session");
        __publicField(this, "dialect");
        /** @internal */
        __publicField(this, "config");
        __publicField(this, "run", (placeholderValues) => {
          return this.prepare(true).run(placeholderValues);
        });
        __publicField(this, "all", (placeholderValues) => {
          return this.prepare(true).all(placeholderValues);
        });
        __publicField(this, "get", (placeholderValues) => {
          return this.prepare(true).get(placeholderValues);
        });
        __publicField(this, "values", (placeholderValues) => {
          return this.prepare(true).values(placeholderValues);
        });
        this.session = session;
        this.dialect = dialect;
        this.config = { table, values };
      }
      returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      onConflictDoNothing(config = {}) {
        if (config.target === void 0) {
          this.config.onConflict = sql2`do nothing`;
        } else {
          const targetSql = Array.isArray(config.target) ? sql2`${config.target}` : sql2`${[config.target]}`;
          const whereSql = config.where ? sql2` where ${config.where}` : sql2``;
          this.config.onConflict = sql2`${targetSql} do nothing${whereSql}`;
        }
        return this;
      }
      onConflictDoUpdate(config) {
        const targetSql = Array.isArray(config.target) ? sql2`${config.target}` : sql2`${[config.target]}`;
        const whereSql = config.where ? sql2` where ${config.where}` : sql2``;
        const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config.set));
        this.config.onConflict = sql2`${targetSql} do update set ${setSql}${whereSql}`;
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildInsertQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      prepare(isOneTimeQuery) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run");
      }
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
    };
    _a237 = entityKind;
    __publicField(SQLiteInsert, _a237, "SQLiteInsert");
    ForeignKeyBuilder3 = class {
      constructor(config, actions) {
        /** @internal */
        __publicField(this, "reference");
        /** @internal */
        __publicField(this, "_onUpdate");
        /** @internal */
        __publicField(this, "_onDelete");
        this.reference = () => {
          const { columns, foreignColumns } = config();
          return { columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions) {
          this._onUpdate = actions.onUpdate;
          this._onDelete = actions.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey3(table, this);
      }
    };
    _a238 = entityKind;
    __publicField(ForeignKeyBuilder3, _a238, "SQLiteForeignKeyBuilder");
    ForeignKey3 = class {
      constructor(table, builder) {
        __publicField(this, "table");
        __publicField(this, "reference");
        __publicField(this, "onUpdate");
        __publicField(this, "onDelete");
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      getName() {
        const { columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[SQLiteTable.Symbol.Name],
          ...columnNames,
          foreignColumns[0].table[SQLiteTable.Symbol.Name],
          ...foreignColumnNames
        ];
        return `${chunks.join("_")}_fk`;
      }
    };
    _a239 = entityKind;
    __publicField(ForeignKey3, _a239, "SQLiteForeignKey");
    UniqueConstraintBuilder3 = class {
      constructor(columns, name2) {
        __publicField(this, "name");
        /** @internal */
        __publicField(this, "columns");
        this.name = name2;
        this.columns = columns;
      }
      /** @internal */
      build(table) {
        return new UniqueConstraint3(table, this.columns, this.name);
      }
    };
    _a240 = entityKind;
    __publicField(UniqueConstraintBuilder3, _a240, "SQLiteUniqueConstraintBuilder");
    UniqueOnConstraintBuilder3 = class {
      constructor(name2) {
        /** @internal */
        __publicField(this, "name");
        this.name = name2;
      }
      on(...columns) {
        return new UniqueConstraintBuilder3(columns, this.name);
      }
    };
    _a241 = entityKind;
    __publicField(UniqueOnConstraintBuilder3, _a241, "SQLiteUniqueOnConstraintBuilder");
    UniqueConstraint3 = class {
      constructor(table, columns, name2) {
        __publicField(this, "table");
        __publicField(this, "columns");
        __publicField(this, "name");
        this.table = table;
        this.columns = columns;
        this.name = name2 ?? uniqueKeyName3(this.table, this.columns.map((column) => column.name));
      }
      getName() {
        return this.name;
      }
    };
    _a242 = entityKind;
    __publicField(UniqueConstraint3, _a242, "SQLiteUniqueConstraint");
    SQLiteColumnBuilder = class extends ColumnBuilder {
      constructor() {
        super(...arguments);
        __publicField(this, "foreignKeyConfigs", []);
      }
      references(ref, actions = {}) {
        this.foreignKeyConfigs.push({ ref, actions });
        return this;
      }
      unique(name2) {
        this.config.isUnique = true;
        this.config.uniqueName = name2;
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions }) => {
          return ((ref2, actions2) => {
            const builder = new ForeignKeyBuilder3(() => {
              const foreignColumn = ref2();
              return { columns: [column], foreignColumns: [foreignColumn] };
            });
            if (actions2.onUpdate) {
              builder.onUpdate(actions2.onUpdate);
            }
            if (actions2.onDelete) {
              builder.onDelete(actions2.onDelete);
            }
            return builder.build(table);
          })(ref, actions);
        });
      }
    };
    _a243 = entityKind;
    __publicField(SQLiteColumnBuilder, _a243, "SQLiteColumnBuilder");
    SQLiteColumn = class extends Column {
      constructor(table, config) {
        if (!config.uniqueName) {
          config.uniqueName = uniqueKeyName3(table, [config.name]);
        }
        super(table, config);
        __publicField(this, "table");
        this.table = table;
      }
    };
    _a244 = entityKind;
    __publicField(SQLiteColumn, _a244, "SQLiteColumn");
    ViewBuilderCore2 = class {
      constructor(name2) {
        __publicField(this, "name");
        __publicField(this, "config", {});
        this.name = name2;
      }
    };
    _a245 = entityKind;
    __publicField(ViewBuilderCore2, _a245, "SQLiteViewBuilderCore");
    ViewBuilder3 = class extends ViewBuilderCore2 {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder3());
        }
        const selectionProxy = new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        });
        const aliasedSelectedFields = qb.getSelectedFields();
        return new Proxy(new SQLiteView({
          sqliteConfig: this.config,
          config: {
            name: this.name,
            schema: void 0,
            selectedFields: aliasedSelectedFields,
            query: qb.getSQL().inlineParams()
          }
        }), selectionProxy);
      }
    };
    _a246 = entityKind;
    __publicField(ViewBuilder3, _a246, "SQLiteViewBuilder");
    ManualViewBuilder3 = class extends ViewBuilderCore2 {
      constructor(name2, columns) {
        super(name2);
        __publicField(this, "columns");
        this.columns = getTableColumns(sqliteTable(name2, columns));
      }
      existing() {
        return new Proxy(new SQLiteView({
          sqliteConfig: void 0,
          config: {
            name: this.name,
            schema: void 0,
            selectedFields: this.columns,
            query: void 0
          }
        }), new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        }));
      }
      as(query) {
        return new Proxy(new SQLiteView({
          sqliteConfig: this.config,
          config: {
            name: this.name,
            schema: void 0,
            selectedFields: this.columns,
            query: query.inlineParams()
          }
        }), new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        }));
      }
    };
    _a247 = entityKind;
    __publicField(ManualViewBuilder3, _a247, "SQLiteManualViewBuilder");
    SQLiteViewBase = class extends View {
    };
    _a248 = entityKind;
    __publicField(SQLiteViewBase, _a248, "SQLiteViewBase");
    SQLiteViewConfig = Symbol.for("drizzle:SQLiteViewConfig");
    SQLiteView = class extends SQLiteViewBase {
      constructor({ sqliteConfig, config }) {
        super(config);
        /** @internal */
        __publicField(this, _b11);
        this[SQLiteViewConfig] = sqliteConfig;
      }
    };
    _a249 = entityKind, _b11 = SQLiteViewConfig;
    __publicField(SQLiteView, _a249, "SQLiteView");
    SQLiteDialect = class {
      escapeName(name2) {
        return `"${name2}"`;
      }
      escapeParam(_num) {
        return "?";
      }
      escapeString(str) {
        return `'${str.replace(/'/g, "''")}'`;
      }
      buildDeleteQuery({ table, where, returning }) {
        const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql2` where ${where}` : void 0;
        return sql2`delete from ${table}${whereSql}${returningSql}`;
      }
      buildUpdateSet(table, set) {
        const setEntries = Object.entries(set);
        const setSize = setEntries.length;
        return sql2.join(setEntries.flatMap(([colName, value], i) => {
          const col = table[Table.Symbol.Columns][colName];
          const res = sql2`${sql2.identifier(col.name)} = ${value}`;
          if (i < setSize - 1) {
            return [res, sql2.raw(", ")];
          }
          return [res];
        }));
      }
      buildUpdateQuery({ table, set, where, returning }) {
        const setSql = this.buildUpdateSet(table, set);
        const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql2` where ${where}` : void 0;
        return sql2`update ${table} set ${setSql}${whereSql}${returningSql}`;
      }
      /**
       * Builds selection SQL with provided fields/expressions
       *
       * Examples:
       *
       * `select <selection> from`
       *
       * `insert ... returning <selection>`
       *
       * If `isSingleTable` is true, then columns won't be prefixed with table name
       */
      buildSelection(fields, { isSingleTable = false } = {}) {
        const columnsLen = fields.length;
        const chunks = fields.flatMap(({ field }, i) => {
          const chunk = [];
          if (is(field, SQL.Aliased) && field.isSelectionField) {
            chunk.push(sql2.identifier(field.fieldAlias));
          } else if (is(field, SQL.Aliased) || is(field, SQL)) {
            const query = is(field, SQL.Aliased) ? field.sql : field;
            if (isSingleTable) {
              chunk.push(new SQL(query.queryChunks.map((c2) => {
                if (is(c2, Column)) {
                  return sql2.identifier(c2.name);
                }
                return c2;
              })));
            } else {
              chunk.push(query);
            }
            if (is(field, SQL.Aliased)) {
              chunk.push(sql2` as ${sql2.identifier(field.fieldAlias)}`);
            }
          } else if (is(field, Column)) {
            const tableName = field.table[Table.Symbol.Name];
            const columnName = field.name;
            if (isSingleTable) {
              chunk.push(sql2.identifier(columnName));
            } else {
              chunk.push(sql2`${sql2.identifier(tableName)}.${sql2.identifier(columnName)}`);
            }
          }
          if (i < columnsLen - 1) {
            chunk.push(sql2`, `);
          }
          return chunk;
        });
        return sql2.join(chunks);
      }
      buildSelectQuery({ withList, fields, fieldsFlat, where, having, table, joins, orderBy, groupBy, limit, offset, distinct }) {
        const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
        for (const f2 of fieldsList) {
          if (is(f2.field, Column) && getTableName(f2.field.table) !== (is(table, Subquery) ? table[SubqueryConfig].alias : is(table, SQLiteViewBase) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : getTableName(table)) && !((table2) => joins?.some(({ alias }) => alias === (table2[Table.Symbol.IsAlias] ? getTableName(table2) : table2[Table.Symbol.BaseName])))(f2.field.table)) {
            const tableName = getTableName(f2.field.table);
            throw new Error(`Your "${f2.path.join("->")}" field references a column "${tableName}"."${f2.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
          }
        }
        const isSingleTable = !joins || joins.length === 0;
        let withSql;
        if (withList?.length) {
          const withSqlChunks = [sql2`with `];
          for (const [i, w] of withList.entries()) {
            withSqlChunks.push(sql2`${sql2.identifier(w[SubqueryConfig].alias)} as (${w[SubqueryConfig].sql})`);
            if (i < withList.length - 1) {
              withSqlChunks.push(sql2`, `);
            }
          }
          withSqlChunks.push(sql2` `);
          withSql = sql2.join(withSqlChunks);
        }
        const distinctSql = distinct ? sql2` distinct` : void 0;
        const selection = this.buildSelection(fieldsList, { isSingleTable });
        const tableSql = (() => {
          if (is(table, Table) && table[Table.Symbol.OriginalName] !== table[Table.Symbol.Name]) {
            return sql2`${sql2.identifier(table[Table.Symbol.OriginalName])} ${sql2.identifier(table[Table.Symbol.Name])}`;
          }
          return table;
        })();
        const joinsArray = [];
        if (joins) {
          for (const [index11, joinMeta] of joins.entries()) {
            if (index11 === 0) {
              joinsArray.push(sql2` `);
            }
            const table2 = joinMeta.table;
            if (is(table2, SQLiteTable)) {
              const tableName = table2[SQLiteTable.Symbol.Name];
              const tableSchema = table2[SQLiteTable.Symbol.Schema];
              const origTableName = table2[SQLiteTable.Symbol.OriginalName];
              const alias = tableName === origTableName ? void 0 : joinMeta.alias;
              joinsArray.push(sql2`${sql2.raw(joinMeta.joinType)} join ${tableSchema ? sql2`${sql2.identifier(tableSchema)}.` : void 0}${sql2.identifier(origTableName)}${alias && sql2` ${sql2.identifier(alias)}`} on ${joinMeta.on}`);
            } else {
              joinsArray.push(sql2`${sql2.raw(joinMeta.joinType)} join ${table2} on ${joinMeta.on}`);
            }
            if (index11 < joins.length - 1) {
              joinsArray.push(sql2` `);
            }
          }
        }
        const joinsSql = sql2.join(joinsArray);
        const whereSql = where ? sql2` where ${where}` : void 0;
        const havingSql = having ? sql2` having ${having}` : void 0;
        const orderByList = [];
        if (orderBy) {
          for (const [index11, orderByValue] of orderBy.entries()) {
            orderByList.push(orderByValue);
            if (index11 < orderBy.length - 1) {
              orderByList.push(sql2`, `);
            }
          }
        }
        const groupByList = [];
        if (groupBy) {
          for (const [index11, groupByValue] of groupBy.entries()) {
            groupByList.push(groupByValue);
            if (index11 < groupBy.length - 1) {
              groupByList.push(sql2`, `);
            }
          }
        }
        const groupBySql = groupByList.length > 0 ? sql2` group by ${sql2.join(groupByList)}` : void 0;
        const orderBySql = orderByList.length > 0 ? sql2` order by ${sql2.join(orderByList)}` : void 0;
        const limitSql = limit ? sql2` limit ${limit}` : void 0;
        const offsetSql = offset ? sql2` offset ${offset}` : void 0;
        return sql2`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}`;
      }
      buildInsertQuery({ table, values, onConflict, returning }) {
        const valuesSqlList = [];
        const columns = table[Table.Symbol.Columns];
        const colEntries = Object.entries(columns);
        const insertOrder = colEntries.map(([, column]) => sql2.identifier(column.name));
        for (const [valueIndex, value] of values.entries()) {
          const valueList = [];
          for (const [fieldName, col] of colEntries) {
            const colValue = value[fieldName];
            if (colValue === void 0 || is(colValue, Param) && colValue.value === void 0) {
              let defaultValue;
              if (col.default !== null && col.default !== void 0) {
                defaultValue = is(col.default, SQL) ? col.default : sql2.param(col.default, col);
              } else if (col.defaultFn !== void 0) {
                const defaultFnResult = col.defaultFn();
                defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql2.param(defaultFnResult, col);
              } else {
                defaultValue = sql2`null`;
              }
              valueList.push(defaultValue);
            } else {
              valueList.push(colValue);
            }
          }
          valuesSqlList.push(valueList);
          if (valueIndex < values.length - 1) {
            valuesSqlList.push(sql2`, `);
          }
        }
        const valuesSql = sql2.join(valuesSqlList);
        const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const onConflictSql = onConflict ? sql2` on conflict ${onConflict}` : void 0;
        return sql2`insert into ${table} ${insertOrder} values ${valuesSql}${onConflictSql}${returningSql}`;
      }
      sqlToQuery(sql3) {
        return sql3.toQuery({
          escapeName: this.escapeName,
          escapeParam: this.escapeParam,
          escapeString: this.escapeString
        });
      }
      buildRelationalQuery({ fullSchema, schema: schema2, tableNamesMap, table, tableConfig, queryConfig: config, tableAlias, nestedQueryRelation, joinOn }) {
        let selection = [];
        let limit, offset, orderBy = [], where;
        const joins = [];
        if (config === true) {
          const selectionEntries = Object.entries(tableConfig.columns);
          selection = selectionEntries.map(([key2, value]) => ({
            dbKey: value.name,
            tsKey: key2,
            field: aliasedTableColumn(value, tableAlias),
            relationTableTsKey: void 0,
            isJson: false,
            selection: []
          }));
        } else {
          const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key2, value]) => [key2, aliasedTableColumn(value, tableAlias)]));
          if (config.where) {
            const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, getOperators()) : config.where;
            where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
          }
          const fieldsSelection = [];
          let selectedColumns = [];
          if (config.columns) {
            let isIncludeMode = false;
            for (const [field, value] of Object.entries(config.columns)) {
              if (value === void 0) {
                continue;
              }
              if (field in tableConfig.columns) {
                if (!isIncludeMode && value === true) {
                  isIncludeMode = true;
                }
                selectedColumns.push(field);
              }
            }
            if (selectedColumns.length > 0) {
              selectedColumns = isIncludeMode ? selectedColumns.filter((c2) => config.columns?.[c2] === true) : Object.keys(tableConfig.columns).filter((key2) => !selectedColumns.includes(key2));
            }
          } else {
            selectedColumns = Object.keys(tableConfig.columns);
          }
          for (const field of selectedColumns) {
            const column = tableConfig.columns[field];
            fieldsSelection.push({ tsKey: field, value: column });
          }
          let selectedRelations = [];
          if (config.with) {
            selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
          }
          let extras;
          if (config.extras) {
            extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql: sql2 }) : config.extras;
            for (const [tsKey, value] of Object.entries(extras)) {
              fieldsSelection.push({
                tsKey,
                value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
              });
            }
          }
          for (const { tsKey, value } of fieldsSelection) {
            selection.push({
              dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
              tsKey,
              field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
              relationTableTsKey: void 0,
              isJson: false,
              selection: []
            });
          }
          let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, getOrderByOperators()) : config.orderBy ?? [];
          if (!Array.isArray(orderByOrig)) {
            orderByOrig = [orderByOrig];
          }
          orderBy = orderByOrig.map((orderByValue) => {
            if (is(orderByValue, Column)) {
              return aliasedTableColumn(orderByValue, tableAlias);
            }
            return mapColumnsInSQLToAlias(orderByValue, tableAlias);
          });
          limit = config.limit;
          offset = config.offset;
          for (const { tsKey: selectedRelationTsKey, queryConfig: selectedRelationConfigValue, relation } of selectedRelations) {
            const normalizedRelation = normalizeRelation(schema2, tableNamesMap, relation);
            const relationTableName = relation.referencedTable[Table.Symbol.Name];
            const relationTableTsName = tableNamesMap[relationTableName];
            const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
            const joinOn2 = and(...normalizedRelation.fields.map((field2, i) => eq(aliasedTableColumn(normalizedRelation.references[i], relationTableAlias), aliasedTableColumn(field2, tableAlias))));
            const builtRelation = this.buildRelationalQuery({
              fullSchema,
              schema: schema2,
              tableNamesMap,
              table: fullSchema[relationTableTsName],
              tableConfig: schema2[relationTableTsName],
              queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
              tableAlias: relationTableAlias,
              joinOn: joinOn2,
              nestedQueryRelation: relation
            });
            const field = sql2`(${builtRelation.sql})`.as(selectedRelationTsKey);
            selection.push({
              dbKey: selectedRelationTsKey,
              tsKey: selectedRelationTsKey,
              field,
              relationTableTsKey: relationTableTsName,
              isJson: true,
              selection: builtRelation.selection
            });
          }
        }
        if (selection.length === 0) {
          throw new DrizzleError(`No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`);
        }
        let result;
        where = and(joinOn, where);
        if (nestedQueryRelation) {
          let field = sql2`json_array(${sql2.join(selection.map(({ field: field2 }) => is(field2, SQLiteColumn) ? sql2.identifier(field2.name) : is(field2, SQL.Aliased) ? field2.sql : field2), sql2`, `)})`;
          if (is(nestedQueryRelation, Many)) {
            field = sql2`coalesce(json_group_array(${field}), json_array())`;
          }
          const nestedSelection = [{
            dbKey: "data",
            tsKey: "data",
            field: field.as("data"),
            isJson: true,
            relationTableTsKey: tableConfig.tsName,
            selection
          }];
          const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
          if (needsSubquery) {
            result = this.buildSelectQuery({
              table: aliasedTable(table, tableAlias),
              fields: {},
              fieldsFlat: [
                {
                  path: [],
                  field: sql2.raw("*")
                }
              ],
              where,
              limit,
              offset,
              orderBy
            });
            where = void 0;
            limit = void 0;
            offset = void 0;
            orderBy = void 0;
          } else {
            result = aliasedTable(table, tableAlias);
          }
          result = this.buildSelectQuery({
            table: is(result, SQLiteTable) ? result : new Subquery(result, {}, tableAlias),
            fields: {},
            fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
              path: [],
              field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
            })),
            joins,
            where,
            limit,
            offset,
            orderBy
          });
        } else {
          result = this.buildSelectQuery({
            table: aliasedTable(table, tableAlias),
            fields: {},
            fieldsFlat: selection.map(({ field }) => ({
              path: [],
              field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
            })),
            joins,
            where,
            limit,
            offset,
            orderBy
          });
        }
        return {
          tableTsKey: tableConfig.tsName,
          sql: result,
          selection
        };
      }
    };
    _a250 = entityKind;
    __publicField(SQLiteDialect, _a250, "SQLiteDialect");
    SQLiteSyncDialect = class extends SQLiteDialect {
      migrate(migrations, session) {
        const migrationTableCreate = sql2`
			CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        session.run(migrationTableCreate);
        const dbMigrations = session.values(sql2`SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1`);
        const lastDbMigration = dbMigrations[0] ?? void 0;
        session.run(sql2`BEGIN`);
        try {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                session.run(sql2.raw(stmt));
              }
              session.run(sql2`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`);
            }
          }
          session.run(sql2`COMMIT`);
        } catch (e) {
          session.run(sql2`ROLLBACK`);
          throw e;
        }
      }
    };
    _a251 = entityKind;
    __publicField(SQLiteSyncDialect, _a251, "SQLiteSyncDialect");
    SQLiteAsyncDialect = class extends SQLiteDialect {
      async migrate(migrations, session) {
        const migrationTableCreate = sql2`
			CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        await session.run(migrationTableCreate);
        const dbMigrations = await session.values(sql2`SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1`);
        const lastDbMigration = dbMigrations[0] ?? void 0;
        await session.transaction(async (tx) => {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                await tx.run(sql2.raw(stmt));
              }
              await tx.run(sql2`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`);
            }
          }
        });
      }
    };
    _a252 = entityKind;
    __publicField(SQLiteAsyncDialect, _a252, "SQLiteAsyncDialect");
    SQLiteSelectBuilder = class {
      constructor(config) {
        __publicField(this, "fields");
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "withList");
        __publicField(this, "distinct");
        this.fields = config.fields;
        this.session = config.session;
        this.dialect = config.dialect;
        this.withList = config.withList;
        this.distinct = config.distinct;
      }
      from(source) {
        const isPartialSelect = !!this.fields;
        let fields;
        if (this.fields) {
          fields = this.fields;
        } else if (is(source, Subquery)) {
          fields = Object.fromEntries(Object.keys(source[SubqueryConfig].selection).map((key2) => [key2, source[key2]]));
        } else if (is(source, SQLiteViewBase)) {
          fields = source[ViewBaseConfig].selectedFields;
        } else if (is(source, SQL)) {
          fields = {};
        } else {
          fields = getTableColumns(source);
        }
        return new SQLiteSelect({
          table: source,
          fields,
          isPartialSelect,
          session: this.session,
          dialect: this.dialect,
          withList: this.withList,
          distinct: this.distinct
        });
      }
    };
    _a253 = entityKind;
    __publicField(SQLiteSelectBuilder, _a253, "SQLiteSelectBuilder");
    SQLiteSelectQueryBuilder = class extends TypedQueryBuilder {
      constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
        super();
        __publicField(this, "_");
        /** @internal */
        __publicField(this, "config");
        __publicField(this, "joinsNotNullableMap");
        __publicField(this, "tableName");
        __publicField(this, "isPartialSelect");
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "leftJoin", this.createJoin("left"));
        __publicField(this, "rightJoin", this.createJoin("right"));
        __publicField(this, "innerJoin", this.createJoin("inner"));
        __publicField(this, "fullJoin", this.createJoin("full"));
        this.config = {
          withList,
          table,
          fields: { ...fields },
          distinct
        };
        this.isPartialSelect = isPartialSelect;
        this.session = session;
        this.dialect = dialect;
        this._ = {
          selectedFields: fields
        };
        this.tableName = getTableLikeName(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
      }
      createJoin(joinType) {
        return (table, on) => {
          const baseTableName = this.tableName;
          const tableName = getTableLikeName(table);
          if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (!this.isPartialSelect) {
            if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
              this.config.fields = {
                [baseTableName]: this.config.fields
              };
            }
            if (typeof tableName === "string" && !is(table, SQL)) {
              const selection = is(table, Subquery) ? table[SubqueryConfig].selection : is(table, View) ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
              this.config.fields[tableName] = selection;
            }
          }
          if (typeof on === "function") {
            on = on(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
          }
          if (!this.config.joins) {
            this.config.joins = [];
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          if (typeof tableName === "string") {
            switch (joinType) {
              case "left": {
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
              case "right": {
                this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key2]) => [key2, false]));
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "inner": {
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "full": {
                this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key2]) => [key2, false]));
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
            }
          }
          return this;
        };
      }
      where(where) {
        if (typeof where === "function") {
          where = where(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
        }
        this.config.where = where;
        return this;
      }
      having(having) {
        if (typeof having === "function") {
          having = having(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
        }
        this.config.having = having;
        return this;
      }
      groupBy(...columns) {
        if (typeof columns[0] === "function") {
          const groupBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
          this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
        } else {
          this.config.groupBy = columns;
        }
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
          this.config.orderBy = Array.isArray(orderBy) ? orderBy : [orderBy];
        } else {
          this.config.orderBy = columns;
        }
        return this;
      }
      limit(limit) {
        this.config.limit = limit;
        return this;
      }
      offset(offset) {
        this.config.offset = offset;
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildSelectQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      as(alias) {
        return new Proxy(new Subquery(this.getSQL(), this.config.fields, alias), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
      getSelectedFields() {
        return new Proxy(this.config.fields, new SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
    _a254 = entityKind;
    __publicField(SQLiteSelectQueryBuilder, _a254, "SQLiteSelectQueryBuilder");
    SQLiteSelect = class extends SQLiteSelectQueryBuilder {
      constructor() {
        super(...arguments);
        __publicField(this, "run", (placeholderValues) => {
          return this.prepare(true).run(placeholderValues);
        });
        __publicField(this, "all", (placeholderValues) => {
          return this.prepare(true).all(placeholderValues);
        });
        __publicField(this, "get", (placeholderValues) => {
          return this.prepare(true).get(placeholderValues);
        });
        __publicField(this, "values", (placeholderValues) => {
          return this.prepare(true).values(placeholderValues);
        });
      }
      prepare(isOneTimeQuery) {
        if (!this.session) {
          throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        }
        const fieldsList = orderSelectedFields(this.config.fields);
        const query = this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), fieldsList, "all");
        query.joinsNotNullableMap = this.joinsNotNullableMap;
        return query;
      }
      async execute() {
        return this.all();
      }
    };
    _a255 = entityKind;
    __publicField(SQLiteSelect, _a255, "SQLiteSelect");
    applyMixins(SQLiteSelect, [QueryPromise]);
    QueryBuilder3 = class {
      constructor() {
        __publicField(this, "dialect");
      }
      $with(alias) {
        const queryBuilder = this;
        return {
          as(qb) {
            if (typeof qb === "function") {
              qb = qb(queryBuilder);
            }
            return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
          }
        };
      }
      with(...queries) {
        const self = this;
        function select(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries,
            distinct: true
          });
        }
        return { select, selectDistinct };
      }
      select(fields) {
        return new SQLiteSelectBuilder({ fields: fields ?? void 0, session: void 0, dialect: this.getDialect() });
      }
      selectDistinct(fields) {
        return new SQLiteSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect(),
          distinct: true
        });
      }
      // Lazy load dialect to avoid circular dependency
      getDialect() {
        if (!this.dialect) {
          this.dialect = new SQLiteSyncDialect();
        }
        return this.dialect;
      }
    };
    _a256 = entityKind;
    __publicField(QueryBuilder3, _a256, "SQLiteQueryBuilder");
    SQLiteUpdateBuilder = class {
      constructor(table, session, dialect) {
        __publicField(this, "table");
        __publicField(this, "session");
        __publicField(this, "dialect");
        this.table = table;
        this.session = session;
        this.dialect = dialect;
      }
      set(values) {
        return new SQLiteUpdate(this.table, mapUpdateSet(this.table, values), this.session, this.dialect);
      }
    };
    _a257 = entityKind;
    __publicField(SQLiteUpdateBuilder, _a257, "SQLiteUpdateBuilder");
    SQLiteUpdate = class extends QueryPromise {
      constructor(table, set, session, dialect) {
        super();
        __publicField(this, "session");
        __publicField(this, "dialect");
        /** @internal */
        __publicField(this, "config");
        __publicField(this, "run", (placeholderValues) => {
          return this.prepare(true).run(placeholderValues);
        });
        __publicField(this, "all", (placeholderValues) => {
          return this.prepare(true).all(placeholderValues);
        });
        __publicField(this, "get", (placeholderValues) => {
          return this.prepare(true).get(placeholderValues);
        });
        __publicField(this, "values", (placeholderValues) => {
          return this.prepare(true).values(placeholderValues);
        });
        this.session = session;
        this.dialect = dialect;
        this.config = { set, table };
      }
      where(where) {
        this.config.where = where;
        return this;
      }
      returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      prepare(isOneTimeQuery) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run");
      }
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
    };
    _a258 = entityKind;
    __publicField(SQLiteUpdate, _a258, "SQLiteUpdate");
    RelationalQueryBuilder3 = class {
      constructor(mode, fullSchema, schema2, tableNamesMap, table, tableConfig, dialect, session) {
        __publicField(this, "mode");
        __publicField(this, "fullSchema");
        __publicField(this, "schema");
        __publicField(this, "tableNamesMap");
        __publicField(this, "table");
        __publicField(this, "tableConfig");
        __publicField(this, "dialect");
        __publicField(this, "session");
        this.mode = mode;
        this.fullSchema = fullSchema;
        this.schema = schema2;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
      }
      findMany(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many");
      }
      findFirst(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? { ...config, limit: 1 } : { limit: 1 }, "first") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? { ...config, limit: 1 } : { limit: 1 }, "first");
      }
    };
    _a259 = entityKind;
    __publicField(RelationalQueryBuilder3, _a259, "SQLiteAsyncRelationalQueryBuilder");
    SQLiteRelationalQuery = class extends QueryPromise {
      constructor(fullSchema, schema2, tableNamesMap, table, tableConfig, dialect, session, config, mode) {
        super();
        __publicField(this, "fullSchema");
        __publicField(this, "schema");
        __publicField(this, "tableNamesMap");
        __publicField(this, "table");
        __publicField(this, "tableConfig");
        __publicField(this, "dialect");
        __publicField(this, "session");
        __publicField(this, "config");
        /** @internal */
        __publicField(this, "mode");
        this.fullSchema = fullSchema;
        this.schema = schema2;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.config = config;
        this.mode = mode;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        }).sql;
      }
      prepare() {
        const { query, builtQuery } = this._toSQL();
        return this.session.prepareQuery(builtQuery, void 0, this.mode === "first" ? "get" : "all", (rawRows, mapColumnValue) => {
          const rows = rawRows.map((row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue));
          if (this.mode === "first") {
            return rows[0];
          }
          return rows;
        });
      }
      _toSQL() {
        const query = this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        });
        const builtQuery = this.dialect.sqlToQuery(query.sql);
        return { query, builtQuery };
      }
      toSQL() {
        return this._toSQL().builtQuery;
      }
      /** @internal */
      executeRaw() {
        if (this.mode === "first") {
          return this.prepare().get();
        }
        return this.prepare().all();
      }
      async execute() {
        return this.executeRaw();
      }
    };
    _a260 = entityKind;
    __publicField(SQLiteRelationalQuery, _a260, "SQLiteAsyncRelationalQuery");
    SQLiteSyncRelationalQuery = class extends SQLiteRelationalQuery {
      sync() {
        return this.executeRaw();
      }
    };
    _a261 = entityKind;
    __publicField(SQLiteSyncRelationalQuery, _a261, "SQLiteSyncRelationalQuery");
    SQLiteRaw = class extends QueryPromise {
      constructor(cb, getSQLCb, action) {
        super();
        __publicField(this, "cb");
        __publicField(this, "getSQLCb");
        /** @internal */
        __publicField(this, "config");
        this.cb = cb;
        this.getSQLCb = getSQLCb;
        this.config = { action };
      }
      /** @internal */
      getSQL() {
        return this.getSQLCb();
      }
      async execute() {
        return this.cb();
      }
    };
    _a262 = entityKind;
    __publicField(SQLiteRaw, _a262, "SQLiteRaw");
    BaseSQLiteDatabase = class {
      constructor(resultKind, dialect, session, schema2) {
        __publicField(this, "resultKind");
        __publicField(this, "dialect");
        __publicField(this, "session");
        __publicField(this, "query");
        this.resultKind = resultKind;
        this.dialect = dialect;
        this.session = session;
        this._ = schema2 ? { schema: schema2.schema, tableNamesMap: schema2.tableNamesMap } : { schema: void 0, tableNamesMap: {} };
        this.query = {};
        if (this._.schema) {
          for (const [tableName, columns] of Object.entries(this._.schema)) {
            this.query[tableName] = new RelationalQueryBuilder3(resultKind, schema2.fullSchema, this._.schema, this._.tableNamesMap, schema2.fullSchema[tableName], columns, dialect, session);
          }
        }
      }
      $with(alias) {
        return {
          as(qb) {
            if (typeof qb === "function") {
              qb = qb(new QueryBuilder3());
            }
            return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
          }
        };
      }
      with(...queries) {
        const self = this;
        function select(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries,
            distinct: true
          });
        }
        return { select, selectDistinct };
      }
      select(fields) {
        return new SQLiteSelectBuilder({ fields: fields ?? void 0, session: this.session, dialect: this.dialect });
      }
      selectDistinct(fields) {
        return new SQLiteSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect,
          distinct: true
        });
      }
      update(table) {
        return new SQLiteUpdateBuilder(table, this.session, this.dialect);
      }
      insert(into) {
        return new SQLiteInsertBuilder(into, this.session, this.dialect);
      }
      delete(from) {
        return new SQLiteDelete(from, this.session, this.dialect);
      }
      run(query) {
        const sql3 = query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(async () => this.session.run(sql3), () => sql3, "run");
        }
        return this.session.run(sql3);
      }
      all(query) {
        const sql3 = query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(async () => this.session.all(sql3), () => sql3, "all");
        }
        return this.session.all(sql3);
      }
      get(query) {
        const sql3 = query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(async () => this.session.get(sql3), () => sql3, "get");
        }
        return this.session.get(sql3);
      }
      values(query) {
        const sql3 = query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(async () => this.session.values(sql3), () => sql3, "values");
        }
        return this.session.values(sql3);
      }
      transaction(transaction, config) {
        return this.session.transaction(transaction, config);
      }
    };
    _a263 = entityKind;
    __publicField(BaseSQLiteDatabase, _a263, "BaseSQLiteDatabase");
    ExecuteResultSync = class extends QueryPromise {
      constructor(resultCb) {
        super();
        __publicField(this, "resultCb");
        this.resultCb = resultCb;
      }
      async execute() {
        return this.resultCb();
      }
      sync() {
        return this.resultCb();
      }
    };
    _a264 = entityKind;
    __publicField(ExecuteResultSync, _a264, "ExecuteResultSync");
    PreparedQuery$1 = (_b12 = class {
      constructor(mode, executeMethod) {
        __publicField(this, "mode");
        __publicField(this, "executeMethod");
        /** @internal */
        __publicField(this, "joinsNotNullableMap");
        this.mode = mode;
        this.executeMethod = executeMethod;
      }
      execute(placeholderValues) {
        if (this.mode === "async") {
          return this[this.executeMethod](placeholderValues);
        }
        return new ExecuteResultSync(() => this[this.executeMethod](placeholderValues));
      }
    }, _a265 = entityKind, __publicField(_b12, _a265, "PreparedQuery"), _b12);
    SQLiteSession = class {
      constructor(dialect) {
        __publicField(this, "dialect");
        this.dialect = dialect;
      }
      prepareOneTimeQuery(query, fields, executeMethod) {
        return this.prepareQuery(query, fields, executeMethod);
      }
      run(query) {
        const staticQuery = this.dialect.sqlToQuery(query);
        try {
          return this.prepareOneTimeQuery(staticQuery, void 0, "run").run();
        } catch (err) {
          throw DrizzleError.wrap(err, `Failed to run the query '${staticQuery.sql}'`);
        }
      }
      all(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run").all();
      }
      get(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run").get();
      }
      values(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run").values();
      }
    };
    _a266 = entityKind;
    __publicField(SQLiteSession, _a266, "SQLiteSession");
    SQLiteTransaction = class extends BaseSQLiteDatabase {
      constructor(resultType, dialect, session, schema2, nestedIndex = 0) {
        super(resultType, dialect, session, schema2);
        __publicField(this, "schema");
        __publicField(this, "nestedIndex");
        this.schema = schema2;
        this.nestedIndex = nestedIndex;
      }
      rollback() {
        throw new TransactionRollbackError();
      }
    };
    _a267 = entityKind;
    __publicField(SQLiteTransaction, _a267, "SQLiteTransaction");
  }
});

// node_modules/drizzle-orm/sqlite-core/index.mjs
var _a268, SQLiteBigIntBuilder, _a269, SQLiteBigInt, _a270, SQLiteBlobJsonBuilder, _a271, SQLiteBlobJson, _a272, SQLiteBlobBufferBuilder, _a273, SQLiteBlobBuffer, _a274, SQLiteCustomColumnBuilder, _a275, SQLiteCustomColumn, _a276, SQLiteBaseIntegerBuilder, _a277, SQLiteBaseInteger, _a278, SQLiteIntegerBuilder, _a279, SQLiteInteger, _a280, SQLiteTimestampBuilder, _a281, SQLiteTimestamp, _a282, SQLiteBooleanBuilder, _a283, SQLiteBoolean, _a284, SQLiteNumericBuilder, _a285, SQLiteNumeric, _a286, SQLiteRealBuilder, _a287, SQLiteReal, _a288, SQLiteTextBuilder, _a289, SQLiteText, _a290, SQLiteTextJsonBuilder, _a291, SQLiteTextJson, _a292, CheckBuilder3, _a293, Check3, _a294, IndexBuilderOn3, _a295, IndexBuilder3, _a296, Index3, _a297, PrimaryKeyBuilder3, _a298, PrimaryKey3;
var init_sqlite_core = __esm({
  "node_modules/drizzle-orm/sqlite-core/index.mjs"() {
    init_alias_cf8e03cd();
    init_session_afae3551();
    SQLiteBigIntBuilder = class extends SQLiteColumnBuilder {
      constructor(name2) {
        super(name2, "bigint", "SQLiteBigInt");
      }
      /** @internal */
      build(table) {
        return new SQLiteBigInt(table, this.config);
      }
    };
    _a268 = entityKind;
    __publicField(SQLiteBigIntBuilder, _a268, "SQLiteBigIntBuilder");
    SQLiteBigInt = class extends SQLiteColumn {
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue(value) {
        return BigInt(value.toString());
      }
      mapToDriverValue(value) {
        return Buffer.from(value.toString());
      }
    };
    _a269 = entityKind;
    __publicField(SQLiteBigInt, _a269, "SQLiteBigInt");
    SQLiteBlobJsonBuilder = class extends SQLiteColumnBuilder {
      constructor(name2) {
        super(name2, "json", "SQLiteBlobJson");
      }
      /** @internal */
      build(table) {
        return new SQLiteBlobJson(table, this.config);
      }
    };
    _a270 = entityKind;
    __publicField(SQLiteBlobJsonBuilder, _a270, "SQLiteBlobJsonBuilder");
    SQLiteBlobJson = class extends SQLiteColumn {
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue(value) {
        return JSON.parse(value.toString());
      }
      mapToDriverValue(value) {
        return Buffer.from(JSON.stringify(value));
      }
    };
    _a271 = entityKind;
    __publicField(SQLiteBlobJson, _a271, "SQLiteBlobJson");
    SQLiteBlobBufferBuilder = class extends SQLiteColumnBuilder {
      constructor(name2) {
        super(name2, "buffer", "SQLiteBlobBuffer");
      }
      /** @internal */
      build(table) {
        return new SQLiteBlobBuffer(table, this.config);
      }
    };
    _a272 = entityKind;
    __publicField(SQLiteBlobBufferBuilder, _a272, "SQLiteBlobBufferBuilder");
    SQLiteBlobBuffer = class extends SQLiteColumn {
      getSQLType() {
        return "blob";
      }
    };
    _a273 = entityKind;
    __publicField(SQLiteBlobBuffer, _a273, "SQLiteBlobBuffer");
    SQLiteCustomColumnBuilder = class extends SQLiteColumnBuilder {
      constructor(name2, fieldConfig, customTypeParams) {
        super(name2, "custom", "SQLiteCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
      }
      /** @internal */
      build(table) {
        return new SQLiteCustomColumn(table, this.config);
      }
    };
    _a274 = entityKind;
    __publicField(SQLiteCustomColumnBuilder, _a274, "SQLiteCustomColumnBuilder");
    SQLiteCustomColumn = class extends SQLiteColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "sqlName");
        __publicField(this, "mapTo");
        __publicField(this, "mapFrom");
        this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
        this.mapTo = config.customTypeParams.toDriver;
        this.mapFrom = config.customTypeParams.fromDriver;
      }
      getSQLType() {
        return this.sqlName;
      }
      mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
      }
      mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
      }
    };
    _a275 = entityKind;
    __publicField(SQLiteCustomColumn, _a275, "SQLiteCustomColumn");
    SQLiteBaseIntegerBuilder = class extends SQLiteColumnBuilder {
      constructor(name2, dataType, columnType) {
        super(name2, dataType, columnType);
        this.config.autoIncrement = false;
      }
      primaryKey(config) {
        if (config?.autoIncrement) {
          this.config.autoIncrement = true;
        }
        this.config.hasDefault = true;
        return super.primaryKey();
      }
    };
    _a276 = entityKind;
    __publicField(SQLiteBaseIntegerBuilder, _a276, "SQLiteBaseIntegerBuilder");
    SQLiteBaseInteger = class extends SQLiteColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "autoIncrement", this.config.autoIncrement);
      }
      getSQLType() {
        return "integer";
      }
    };
    _a277 = entityKind;
    __publicField(SQLiteBaseInteger, _a277, "SQLiteBaseInteger");
    SQLiteIntegerBuilder = class extends SQLiteBaseIntegerBuilder {
      constructor(name2) {
        super(name2, "number", "SQLiteInteger");
      }
      build(table) {
        return new SQLiteInteger(table, this.config);
      }
    };
    _a278 = entityKind;
    __publicField(SQLiteIntegerBuilder, _a278, "SQLiteIntegerBuilder");
    SQLiteInteger = class extends SQLiteBaseInteger {
    };
    _a279 = entityKind;
    __publicField(SQLiteInteger, _a279, "SQLiteInteger");
    SQLiteTimestampBuilder = class extends SQLiteBaseIntegerBuilder {
      constructor(name2, mode) {
        super(name2, "date", "SQLiteTimestamp");
        this.config.mode = mode;
      }
      /**
       * @deprecated Use `default()` with your own expression instead.
       *
       * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
       */
      defaultNow() {
        return this.default(sql2`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
      }
      build(table) {
        return new SQLiteTimestamp(table, this.config);
      }
    };
    _a280 = entityKind;
    __publicField(SQLiteTimestampBuilder, _a280, "SQLiteTimestampBuilder");
    SQLiteTimestamp = class extends SQLiteBaseInteger {
      constructor() {
        super(...arguments);
        __publicField(this, "mode", this.config.mode);
      }
      mapFromDriverValue(value) {
        if (this.config.mode === "timestamp") {
          return new Date(value * 1e3);
        }
        return new Date(value);
      }
      mapToDriverValue(value) {
        const unix = value.getTime();
        if (this.config.mode === "timestamp") {
          return Math.floor(unix / 1e3);
        }
        return unix;
      }
    };
    _a281 = entityKind;
    __publicField(SQLiteTimestamp, _a281, "SQLiteTimestamp");
    SQLiteBooleanBuilder = class extends SQLiteBaseIntegerBuilder {
      constructor(name2, mode) {
        super(name2, "boolean", "SQLiteBoolean");
        this.config.mode = mode;
      }
      build(table) {
        return new SQLiteBoolean(table, this.config);
      }
    };
    _a282 = entityKind;
    __publicField(SQLiteBooleanBuilder, _a282, "SQLiteBooleanBuilder");
    SQLiteBoolean = class extends SQLiteBaseInteger {
      constructor() {
        super(...arguments);
        __publicField(this, "mode", this.config.mode);
      }
      mapFromDriverValue(value) {
        return Number(value) === 1;
      }
      mapToDriverValue(value) {
        return value ? 1 : 0;
      }
    };
    _a283 = entityKind;
    __publicField(SQLiteBoolean, _a283, "SQLiteBoolean");
    SQLiteNumericBuilder = class extends SQLiteColumnBuilder {
      constructor(name2) {
        super(name2, "string", "SQLiteNumeric");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumeric(table, this.config);
      }
    };
    _a284 = entityKind;
    __publicField(SQLiteNumericBuilder, _a284, "SQLiteNumericBuilder");
    SQLiteNumeric = class extends SQLiteColumn {
      getSQLType() {
        return "numeric";
      }
    };
    _a285 = entityKind;
    __publicField(SQLiteNumeric, _a285, "SQLiteNumeric");
    SQLiteRealBuilder = class extends SQLiteColumnBuilder {
      constructor(name2) {
        super(name2, "number", "SQLiteReal");
      }
      /** @internal */
      build(table) {
        return new SQLiteReal(table, this.config);
      }
    };
    _a286 = entityKind;
    __publicField(SQLiteRealBuilder, _a286, "SQLiteRealBuilder");
    SQLiteReal = class extends SQLiteColumn {
      getSQLType() {
        return "real";
      }
    };
    _a287 = entityKind;
    __publicField(SQLiteReal, _a287, "SQLiteReal");
    SQLiteTextBuilder = class extends SQLiteColumnBuilder {
      constructor(name2, config) {
        super(name2, "string", "SQLiteText");
        this.config.enumValues = config.enum;
        this.config.length = config.length;
      }
      /** @internal */
      build(table) {
        return new SQLiteText(table, this.config);
      }
    };
    _a288 = entityKind;
    __publicField(SQLiteTextBuilder, _a288, "SQLiteTextBuilder");
    SQLiteText = class extends SQLiteColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "enumValues", this.config.enumValues);
        __publicField(this, "length", this.config.length);
      }
      getSQLType() {
        return `text${this.config.length ? `(${this.config.length})` : ""}`;
      }
    };
    _a289 = entityKind;
    __publicField(SQLiteText, _a289, "SQLiteText");
    SQLiteTextJsonBuilder = class extends SQLiteColumnBuilder {
      constructor(name2) {
        super(name2, "json", "SQLiteTextJson");
      }
      /** @internal */
      build(table) {
        return new SQLiteTextJson(table, this.config);
      }
    };
    _a290 = entityKind;
    __publicField(SQLiteTextJsonBuilder, _a290, "SQLiteTextJsonBuilder");
    SQLiteTextJson = class extends SQLiteColumn {
      getSQLType() {
        return "text";
      }
      mapFromDriverValue(value) {
        return JSON.parse(value);
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
    };
    _a291 = entityKind;
    __publicField(SQLiteTextJson, _a291, "SQLiteTextJson");
    CheckBuilder3 = class {
      constructor(name2, value) {
        __publicField(this, "name");
        __publicField(this, "value");
        __publicField(this, "brand");
        this.name = name2;
        this.value = value;
      }
      build(table) {
        return new Check3(table, this);
      }
    };
    _a292 = entityKind;
    __publicField(CheckBuilder3, _a292, "SQLiteCheckBuilder");
    Check3 = class {
      constructor(table, builder) {
        __publicField(this, "table");
        __publicField(this, "name");
        __publicField(this, "value");
        this.table = table;
        this.name = builder.name;
        this.value = builder.value;
      }
    };
    _a293 = entityKind;
    __publicField(Check3, _a293, "SQLiteCheck");
    IndexBuilderOn3 = class {
      constructor(name2, unique2) {
        __publicField(this, "name");
        __publicField(this, "unique");
        this.name = name2;
        this.unique = unique2;
      }
      on(...columns) {
        return new IndexBuilder3(this.name, columns, this.unique);
      }
    };
    _a294 = entityKind;
    __publicField(IndexBuilderOn3, _a294, "SQLiteIndexBuilderOn");
    IndexBuilder3 = class {
      constructor(name2, columns, unique2) {
        /** @internal */
        __publicField(this, "config");
        this.config = {
          name: name2,
          columns,
          unique: unique2,
          where: void 0
        };
      }
      /**
       * Condition for partial index.
       */
      where(condition) {
        this.config.where = condition;
        return this;
      }
      /** @internal */
      build(table) {
        return new Index3(this.config, table);
      }
    };
    _a295 = entityKind;
    __publicField(IndexBuilder3, _a295, "SQLiteIndexBuilder");
    Index3 = class {
      constructor(config, table) {
        __publicField(this, "config");
        this.config = { ...config, table };
      }
    };
    _a296 = entityKind;
    __publicField(Index3, _a296, "SQLiteIndex");
    PrimaryKeyBuilder3 = class {
      constructor(columns) {
        /** @internal */
        __publicField(this, "columns");
        this.columns = columns;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey3(table, this.columns);
      }
    };
    _a297 = entityKind;
    __publicField(PrimaryKeyBuilder3, _a297, "SQLitePrimaryKeyBuilder");
    PrimaryKey3 = class {
      constructor(table, columns) {
        __publicField(this, "table");
        __publicField(this, "columns");
        this.table = table;
        this.columns = columns;
      }
      getName() {
        return `${this.table[SQLiteTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    };
    _a298 = entityKind;
    __publicField(PrimaryKey3, _a298, "SQLitePrimaryKey");
  }
});

// node_modules/zod/lib/index.mjs
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
function deepPartialify(schema2) {
  if (schema2 instanceof ZodObject) {
    const newShape = {};
    for (const key2 in schema2.shape) {
      const fieldSchema = schema2.shape[key2];
      newShape[key2] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema2._def,
      shape: () => newShape
    });
  } else if (schema2 instanceof ZodArray) {
    return new ZodArray({
      ...schema2._def,
      type: deepPartialify(schema2.element)
    });
  } else if (schema2 instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodTuple) {
    return ZodTuple.create(schema2.items.map((item) => deepPartialify(item)));
  } else {
    return schema2;
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key2) => bKeys.indexOf(key2) !== -1);
    const newObj = { ...a, ...b };
    for (const key2 of sharedKeys) {
      const sharedValue = mergeValues(a[key2], b[key2]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key2] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index11 = 0; index11 < a.length; index11++) {
      const itemA = a[index11];
      const itemB = b[index11];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var util, objectUtil, ZodParsedType, getParsedType, ZodIssueCode, quotelessJson, ZodError, errorMap, overrideErrorMap, makeIssue, EMPTY_PATH, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync, errorUtil, ParseInputLazyPath, handleResult, ZodType, cuidRegex, cuid2Regex, ulidRegex, uuidRegex, emailRegex, emojiRegex, ipv4Regex, ipv6Regex, datetimeRegex, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, ZodObject, ZodUnion, getDiscriminator, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodCatch, ZodNaN, BRAND, ZodBranded, ZodPipeline, ZodReadonly, custom, late, ZodFirstPartyTypeKind, instanceOfType, stringType, numberType, nanType, bigIntType, booleanType, dateType, symbolType, undefinedType, nullType, anyType, unknownType, neverType, voidType, arrayType, objectType, strictObjectType, unionType, discriminatedUnionType, intersectionType, tupleType, recordType, mapType, setType, functionType, lazyType, literalType, enumType, nativeEnumType, promiseType, effectsType, optionalType, nullableType, preprocessType, pipelineType, ostring, onumber, oboolean, coerce, NEVER, z;
var init_lib = __esm({
  "node_modules/zod/lib/index.mjs"() {
    (function(util2) {
      util2.assertEqual = (val) => val;
      function assertIs(_arg) {
      }
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key2 in object) {
          if (Object.prototype.hasOwnProperty.call(object, key2)) {
            keys.push(key2);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
      function joinValues(array2, separator = " | ") {
        return array2.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (util = {}));
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
          // second overwrites first
        };
      };
    })(objectUtil || (objectUtil = {}));
    ZodParsedType = util.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    getParsedType = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return ZodParsedType.undefined;
        case "string":
          return ZodParsedType.string;
        case "number":
          return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
          return ZodParsedType.boolean;
        case "function":
          return ZodParsedType.function;
        case "bigint":
          return ZodParsedType.bigint;
        case "symbol":
          return ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return ZodParsedType.array;
          }
          if (data === null) {
            return ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return ZodParsedType.date;
          }
          return ZodParsedType.object;
        default:
          return ZodParsedType.unknown;
      }
    };
    ZodIssueCode = util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    quotelessJson = (obj) => {
      const json3 = JSON.stringify(obj, null, 2);
      return json3.replace(/"([^"]+)":/g, "$1:");
    };
    ZodError = class extends Error {
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      get errors() {
        return this.issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error2) => {
          for (const issue of error2.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    ZodError.create = (issues) => {
      const error2 = new ZodError(issues);
      return error2;
    };
    errorMap = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodIssueCode.invalid_type:
          if (issue.received === ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint")
            message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util.assertNever(issue);
      }
      return { message };
    };
    overrideErrorMap = errorMap;
    makeIssue = (params) => {
      const { data, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      let errorMessage = "";
      const maps = errorMaps.filter((m2) => !!m2).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message || errorMessage
      };
    };
    EMPTY_PATH = [];
    ParseStatus = class _ParseStatus {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s2 of results) {
          if (s2.status === "aborted")
            return INVALID;
          if (s2.status === "dirty")
            status.dirty();
          arrayValue.push(s2.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          syncPairs.push({
            key: await pair.key,
            value: await pair.value
          });
        }
        return _ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key: key2, value } = pair;
          if (key2.status === "aborted")
            return INVALID;
          if (value.status === "aborted")
            return INVALID;
          if (key2.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (key2.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key2.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    INVALID = Object.freeze({
      status: "aborted"
    });
    DIRTY = (value) => ({ status: "dirty", value });
    OK = (value) => ({ status: "valid", value });
    isAborted = (x) => x.status === "aborted";
    isDirty = (x) => x.status === "dirty";
    isValid = (x) => x.status === "valid";
    isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
    })(errorUtil || (errorUtil = {}));
    ParseInputLazyPath = class {
      constructor(parent, value, path, key2) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key2;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (this._key instanceof Array) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    };
    handleResult = (ctx, result) => {
      if (isValid(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error)
              return this._error;
            const error2 = new ZodError(ctx.common.issues);
            this._error = error2;
            return this._error;
          }
        };
      }
    };
    ZodType = class {
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
      }
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return getParsedType(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        var _a299;
        const ctx = {
          common: {
            issues: [],
            async: (_a299 = params === null || params === void 0 ? void 0 : params.async) !== null && _a299 !== void 0 ? _a299 : false,
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            async: true
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check2, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check2(val);
          const setError = () => ctx.addIssue({
            code: ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check2, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check2(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this, this._def);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects({
          ...processCreateParams(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          ...processCreateParams(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          ...processCreateParams(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      readonly() {
        return ZodReadonly.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    cuidRegex = /^c[^\s-]{8,}$/i;
    cuid2Regex = /^[a-z][a-z0-9]*$/;
    ulidRegex = /[0-9A-HJKMNP-TV-Z]{26}/;
    uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    emailRegex = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;
    ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
    ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
    datetimeRegex = (args) => {
      if (args.precision) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
        }
      } else if (args.precision === 0) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
        }
      } else {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
        }
      }
    };
    ZodString = class _ZodString extends ZodType {
      constructor() {
        super(...arguments);
        this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
          validation,
          code: ZodIssueCode.invalid_string,
          ...errorUtil.errToObj(message)
        });
        this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
        this.trim = () => new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
        this.toLowerCase = () => new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }]
        });
        this.toUpperCase = () => new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }]
        });
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(
            ctx2,
            {
              code: ZodIssueCode.invalid_type,
              expected: ZodParsedType.string,
              received: ctx2.parsedType
            }
            //
          );
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check2 of this._def.checks) {
          if (check2.kind === "min") {
            if (input.data.length < check2.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check2.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "max") {
            if (input.data.length > check2.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check2.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "length") {
            const tooBig = input.data.length > check2.value;
            const tooSmall = input.data.length < check2.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_big,
                  maximum: check2.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check2.message
                });
              } else if (tooSmall) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_small,
                  minimum: check2.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check2.message
                });
              }
              status.dirty();
            }
          } else if (check2.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "email",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "emoji") {
            if (!emojiRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "emoji",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "uuid",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid2",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "ulid") {
            if (!ulidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ulid",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "url") {
            try {
              new URL(input.data);
            } catch (_a299) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "url",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "regex") {
            check2.regex.lastIndex = 0;
            const testResult = check2.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "regex",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "trim") {
            input.data = input.data.trim();
          } else if (check2.kind === "includes") {
            if (!input.data.includes(check2.value, check2.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { includes: check2.value, position: check2.position },
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check2.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check2.kind === "startsWith") {
            if (!input.data.startsWith(check2.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { startsWith: check2.value },
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "endsWith") {
            if (!input.data.endsWith(check2.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { endsWith: check2.value },
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "datetime") {
            const regex = datetimeRegex(check2);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "ip") {
            if (!isValidIP(input.data, check2.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ip",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check2);
          }
        }
        return { status: status.value, value: input.data };
      }
      _addCheck(check2) {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, check2]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
      }
      emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
      }
      cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
      }
      ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
      }
      ip(options2) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options2) });
      }
      datetime(options2) {
        var _a299;
        if (typeof options2 === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            message: options2
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof (options2 === null || options2 === void 0 ? void 0 : options2.precision) === "undefined" ? null : options2 === null || options2 === void 0 ? void 0 : options2.precision,
          offset: (_a299 = options2 === null || options2 === void 0 ? void 0 : options2.offset) !== null && _a299 !== void 0 ? _a299 : false,
          ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
        });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil.errToObj(message)
        });
      }
      includes(value, options2) {
        return this._addCheck({
          kind: "includes",
          value,
          position: options2 === null || options2 === void 0 ? void 0 : options2.position,
          ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil.errToObj(message)
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodString.create = (params) => {
      var _a299;
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a299 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a299 !== void 0 ? _a299 : false,
        ...processCreateParams(params)
      });
    };
    ZodNumber = class _ZodNumber extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.number,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check2 of this._def.checks) {
          if (check2.kind === "int") {
            if (!util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "min") {
            const tooSmall = check2.inclusive ? input.data < check2.value : input.data <= check2.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check2.value,
                type: "number",
                inclusive: check2.inclusive,
                exact: false,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "max") {
            const tooBig = check2.inclusive ? input.data > check2.value : input.data >= check2.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check2.value,
                type: "number",
                inclusive: check2.inclusive,
                exact: false,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check2.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check2.value,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_finite,
                message: check2.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check2);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check2) {
        return new _ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check2]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil.toString(message)
        });
      }
      safe(message) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil.toString(message)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodBigInt = class _ZodBigInt extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.bigint,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check2 of this._def.checks) {
          if (check2.kind === "min") {
            const tooSmall = check2.inclusive ? input.data < check2.value : input.data <= check2.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                type: "bigint",
                minimum: check2.value,
                inclusive: check2.inclusive,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "max") {
            const tooBig = check2.inclusive ? input.data > check2.value : input.data >= check2.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                type: "bigint",
                maximum: check2.value,
                inclusive: check2.inclusive,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "multipleOf") {
            if (input.data % check2.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check2.value,
                message: check2.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check2);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodBigInt({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check2) {
        return new _ZodBigInt({
          ...this._def,
          checks: [...this._def.checks, check2]
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodBigInt.create = (params) => {
      var _a299;
      return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a299 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a299 !== void 0 ? _a299 : false,
        ...processCreateParams(params)
      });
    };
    ZodBoolean = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodDate = class _ZodDate extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.date,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        if (isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_date
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check2 of this._def.checks) {
          if (check2.kind === "min") {
            if (input.data.getTime() < check2.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                message: check2.message,
                inclusive: true,
                exact: false,
                minimum: check2.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check2.kind === "max") {
            if (input.data.getTime() > check2.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                message: check2.message,
                inclusive: true,
                exact: false,
                maximum: check2.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util.assertNever(check2);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check2) {
        return new _ZodDate({
          ...this._def,
          checks: [...this._def.checks, check2]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    ZodSymbol = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    ZodUndefined = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    ZodNull = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.null,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    ZodAny = class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    ZodUnknown = class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    ZodNever = class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.never,
          received: ctx.parsedType
        });
        return INVALID;
      }
    };
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    ZodVoid = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.void,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    ZodArray = class _ZodArray extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            addIssueToContext(ctx, {
              code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new _ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new _ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new _ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodArray.create = (schema2, params) => {
      return new ZodArray({
        type: schema2,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    ZodObject = class _ZodObject extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        return this._cached = { shape, keys };
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key2 in ctx.data) {
            if (!shapeKeys.includes(key2)) {
              extraKeys.push(key2);
            }
          }
        }
        const pairs = [];
        for (const key2 of shapeKeys) {
          const keyValidator = shape[key2];
          const value = ctx.data[key2];
          pairs.push({
            key: { status: "valid", value: key2 },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key2)),
            alwaysSet: key2 in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key2 of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key2 },
                value: { status: "valid", value: ctx.data[key2] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip")
            ;
          else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key2 of extraKeys) {
            const value = ctx.data[key2];
            pairs.push({
              key: { status: "valid", value: key2 },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key2)
                //, ctx.child(key), value, getParsedType(value)
              ),
              alwaysSet: key2 in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key2 = await pair.key;
              syncPairs.push({
                key: key2,
                value: await pair.value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil.errToObj;
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              var _a299, _b13, _c5, _d4;
              const defaultError = (_c5 = (_b13 = (_a299 = this._def).errorMap) === null || _b13 === void 0 ? void 0 : _b13.call(_a299, issue, ctx).message) !== null && _c5 !== void 0 ? _c5 : ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: (_d4 = errorUtil.errToObj(message).message) !== null && _d4 !== void 0 ? _d4 : defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      // const AugmentFactory =
      //   <Def extends ZodObjectDef>(def: Def) =>
      //   <Augmentation extends ZodRawShape>(
      //     augmentation: Augmentation
      //   ): ZodObject<
      //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
      //     Def["unknownKeys"],
      //     Def["catchall"]
      //   > => {
      //     return new ZodObject({
      //       ...def,
      //       shape: () => ({
      //         ...def.shape(),
      //         ...augmentation,
      //       }),
      //     }) as any;
      //   };
      extend(augmentation) {
        return new _ZodObject({
          ...this._def,
          shape: () => ({
            ...this._def.shape(),
            ...augmentation
          })
        });
      }
      /**
       * Prior to zod@1.0.12 there was a bug in the
       * inferred type of merged objects. Please
       * upgrade if you are experiencing issues.
       */
      merge(merging) {
        const merged = new _ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => ({
            ...this._def.shape(),
            ...merging._def.shape()
          }),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      // merge<
      //   Incoming extends AnyZodObject,
      //   Augmentation extends Incoming["shape"],
      //   NewOutput extends {
      //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
      //       ? Augmentation[k]["_output"]
      //       : k extends keyof Output
      //       ? Output[k]
      //       : never;
      //   },
      //   NewInput extends {
      //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
      //       ? Augmentation[k]["_input"]
      //       : k extends keyof Input
      //       ? Input[k]
      //       : never;
      //   }
      // >(
      //   merging: Incoming
      // ): ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"],
      //   NewOutput,
      //   NewInput
      // > {
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      setKey(key2, schema2) {
        return this.augment({ [key2]: schema2 });
      }
      // merge<Incoming extends AnyZodObject>(
      //   merging: Incoming
      // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
      // ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"]
      // > {
      //   // const mergedShape = objectUtil.mergeShapes(
      //   //   this._def.shape(),
      //   //   merging._def.shape()
      //   // );
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      catchall(index11) {
        return new _ZodObject({
          ...this._def,
          catchall: index11
        });
      }
      pick(mask) {
        const shape = {};
        util.objectKeys(mask).forEach((key2) => {
          if (mask[key2] && this.shape[key2]) {
            shape[key2] = this.shape[key2];
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        util.objectKeys(this.shape).forEach((key2) => {
          if (!mask[key2]) {
            shape[key2] = this.shape[key2];
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      /**
       * @deprecated
       */
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key2) => {
          const fieldSchema = this.shape[key2];
          if (mask && !mask[key2]) {
            newShape[key2] = fieldSchema;
          } else {
            newShape[key2] = fieldSchema.optional();
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key2) => {
          if (mask && !mask[key2]) {
            newShape[key2] = this.shape[key2];
          } else {
            const fieldSchema = this.shape[key2];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key2] = newField;
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum(util.objectKeys(this.shape));
      }
    };
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options2 = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options2.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options2) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError(issues2));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    ZodUnion.create = (types2, params) => {
      return new ZodUnion({
        options: types2,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    getDiscriminator = (type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return Object.keys(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else {
        return null;
      }
    };
    ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      /**
       * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
       * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
       * have a different value for each object in the union.
       * @param discriminator the name of the discriminator property
       * @param types an array of object schemas
       * @param params
       */
      static create(discriminator, options2, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options2) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new _ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options: options2,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    };
    ZodIntersection = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if (isAborted(parsedLeft) || isAborted(parsedRight)) {
            return INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_intersection_types
            });
            return INVALID;
          }
          if (isDirty(parsedLeft) || isDirty(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    ZodTuple = class _ZodTuple extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema2 = this._def.items[itemIndex] || this._def.rest;
          if (!schema2)
            return null;
          return schema2._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return ParseStatus.mergeArray(status, results);
          });
        } else {
          return ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new _ZodTuple({
          ...this._def,
          rest
        });
      }
    };
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    ZodRecord = class _ZodRecord extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key2 in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key2, ctx.path, key2)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key2], ctx.path, key2))
          });
        }
        if (ctx.common.async) {
          return ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new _ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new _ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    };
    ZodMap = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key2, value], index11) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key2, ctx.path, [index11, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index11, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key2 = await pair.key;
              const value = await pair.value;
              if (key2.status === "aborted" || value.status === "aborted") {
                return INVALID;
              }
              if (key2.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key2.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key2 = pair.key;
            const value = pair.value;
            if (key2.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key2.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key2.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    ZodSet = class _ZodSet extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.set,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new _ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new _ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    ZodFunction = class _ZodFunction extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: ctx.parsedType
          });
          return INVALID;
        }
        function makeArgsIssue(args, error2) {
          return makeIssue({
            data: args,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_arguments,
              argumentsError: error2
            }
          });
        }
        function makeReturnsIssue(returns, error2) {
          return makeIssue({
            data: returns,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_return_type,
              returnTypeError: error2
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          const me = this;
          return OK(async function(...args) {
            const error2 = new ZodError([]);
            const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
              error2.addIssue(makeArgsIssue(args, e));
              throw error2;
            });
            const result = await Reflect.apply(fn, this, parsedArgs);
            const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error2.addIssue(makeReturnsIssue(result, e));
              throw error2;
            });
            return parsedReturns;
          });
        } else {
          const me = this;
          return OK(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new _ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new _ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new _ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    };
    ZodLazy = class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    ZodLiteral = class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    ZodEnum = class _ZodEnum extends ZodType {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (this._def.values.indexOf(input.data) === -1) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values) {
        return _ZodEnum.create(values);
      }
      exclude(values) {
        return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
      }
    };
    ZodEnum.create = createZodEnum;
    ZodNativeEnum = class extends ZodType {
      _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (nativeEnumValues.indexOf(input.data) === -1) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    ZodPromise = class extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.promise,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    ZodPromise.create = (schema2, params) => {
      return new ZodPromise({
        type: schema2,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    ZodEffects = class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
          addIssue: (arg) => {
            addIssueToContext(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data, checkCtx);
          if (ctx.common.issues.length) {
            return {
              status: "dirty",
              value: ctx.data
            };
          }
          if (ctx.common.async) {
            return Promise.resolve(processed).then((processed2) => {
              return this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
            });
          } else {
            return this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
          }
        }
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base2 = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!isValid(base2))
              return base2;
            const result = effect.transform(base2.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base2) => {
              if (!isValid(base2))
                return base2;
              return Promise.resolve(effect.transform(base2.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
            });
          }
        }
        util.assertNever(effect);
      }
    };
    ZodEffects.create = (schema2, effect, params) => {
      return new ZodEffects({
        schema: schema2,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema2, params) => {
      return new ZodEffects({
        schema: schema2,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    ZodOptional = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
          return OK(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    ZodNullable = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
          return OK(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    ZodDefault = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    ZodCatch = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          }
        };
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: {
            ...newCtx
          }
        });
        if (isAsync(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params)
      });
    };
    ZodNaN = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.nan,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    BRAND = Symbol("zod_brand");
    ZodBranded = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    ZodPipeline = class _ZodPipeline extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return DIRTY(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new _ZodPipeline({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    ZodReadonly = class extends ZodType {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        if (isValid(result)) {
          result.value = Object.freeze(result.value);
        }
        return result;
      }
    };
    ZodReadonly.create = (type, params) => {
      return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params)
      });
    };
    custom = (check2, params = {}, fatal) => {
      if (check2)
        return ZodAny.create().superRefine((data, ctx) => {
          var _a299, _b13;
          if (!check2(data)) {
            const p2 = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
            const _fatal = (_b13 = (_a299 = p2.fatal) !== null && _a299 !== void 0 ? _a299 : fatal) !== null && _b13 !== void 0 ? _b13 : true;
            const p22 = typeof p2 === "string" ? { message: p2 } : p2;
            ctx.addIssue({ code: "custom", ...p22, fatal: _fatal });
          }
        });
      return ZodAny.create();
    };
    late = {
      object: ZodObject.lazycreate
    };
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    instanceOfType = (cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => custom((data) => data instanceof cls, params);
    stringType = ZodString.create;
    numberType = ZodNumber.create;
    nanType = ZodNaN.create;
    bigIntType = ZodBigInt.create;
    booleanType = ZodBoolean.create;
    dateType = ZodDate.create;
    symbolType = ZodSymbol.create;
    undefinedType = ZodUndefined.create;
    nullType = ZodNull.create;
    anyType = ZodAny.create;
    unknownType = ZodUnknown.create;
    neverType = ZodNever.create;
    voidType = ZodVoid.create;
    arrayType = ZodArray.create;
    objectType = ZodObject.create;
    strictObjectType = ZodObject.strictCreate;
    unionType = ZodUnion.create;
    discriminatedUnionType = ZodDiscriminatedUnion.create;
    intersectionType = ZodIntersection.create;
    tupleType = ZodTuple.create;
    recordType = ZodRecord.create;
    mapType = ZodMap.create;
    setType = ZodSet.create;
    functionType = ZodFunction.create;
    lazyType = ZodLazy.create;
    literalType = ZodLiteral.create;
    enumType = ZodEnum.create;
    nativeEnumType = ZodNativeEnum.create;
    promiseType = ZodPromise.create;
    effectsType = ZodEffects.create;
    optionalType = ZodOptional.create;
    nullableType = ZodNullable.create;
    preprocessType = ZodEffects.createWithPreprocess;
    pipelineType = ZodPipeline.create;
    ostring = () => stringType().optional();
    onumber = () => numberType().optional();
    oboolean = () => booleanType().optional();
    coerce = {
      string: (arg) => ZodString.create({ ...arg, coerce: true }),
      number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
      boolean: (arg) => ZodBoolean.create({
        ...arg,
        coerce: true
      }),
      bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
      date: (arg) => ZodDate.create({ ...arg, coerce: true })
    };
    NEVER = INVALID;
    z = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      defaultErrorMap: errorMap,
      setErrorMap,
      getErrorMap,
      makeIssue,
      EMPTY_PATH,
      addIssueToContext,
      ParseStatus,
      INVALID,
      DIRTY,
      OK,
      isAborted,
      isDirty,
      isValid,
      isAsync,
      get util() {
        return util;
      },
      get objectUtil() {
        return objectUtil;
      },
      ZodParsedType,
      getParsedType,
      ZodType,
      ZodString,
      ZodNumber,
      ZodBigInt,
      ZodBoolean,
      ZodDate,
      ZodSymbol,
      ZodUndefined,
      ZodNull,
      ZodAny,
      ZodUnknown,
      ZodNever,
      ZodVoid,
      ZodArray,
      ZodObject,
      ZodUnion,
      ZodDiscriminatedUnion,
      ZodIntersection,
      ZodTuple,
      ZodRecord,
      ZodMap,
      ZodSet,
      ZodFunction,
      ZodLazy,
      ZodLiteral,
      ZodEnum,
      ZodNativeEnum,
      ZodPromise,
      ZodEffects,
      ZodTransformer: ZodEffects,
      ZodOptional,
      ZodNullable,
      ZodDefault,
      ZodCatch,
      ZodNaN,
      BRAND,
      ZodBranded,
      ZodPipeline,
      ZodReadonly,
      custom,
      Schema: ZodType,
      ZodSchema: ZodType,
      late,
      get ZodFirstPartyTypeKind() {
        return ZodFirstPartyTypeKind;
      },
      coerce,
      any: anyType,
      array: arrayType,
      bigint: bigIntType,
      boolean: booleanType,
      date: dateType,
      discriminatedUnion: discriminatedUnionType,
      effect: effectsType,
      "enum": enumType,
      "function": functionType,
      "instanceof": instanceOfType,
      intersection: intersectionType,
      lazy: lazyType,
      literal: literalType,
      map: mapType,
      nan: nanType,
      nativeEnum: nativeEnumType,
      never: neverType,
      "null": nullType,
      nullable: nullableType,
      number: numberType,
      object: objectType,
      oboolean,
      onumber,
      optional: optionalType,
      ostring,
      pipeline: pipelineType,
      preprocess: preprocessType,
      promise: promiseType,
      record: recordType,
      set: setType,
      strictObject: strictObjectType,
      string: stringType,
      symbol: symbolType,
      transformer: effectsType,
      tuple: tupleType,
      "undefined": undefinedType,
      union: unionType,
      unknown: unknownType,
      "void": voidType,
      NEVER,
      ZodIssueCode,
      quotelessJson,
      ZodError
    });
  }
});

// node_modules/drizzle-zod/index.mjs
function c(t, n) {
  const r = getTableColumns(t), o = Object.entries(r);
  let i = Object.fromEntries(o.map(([e, t2]) => [e, p(t2)]));
  n && (i = Object.assign(i, Object.fromEntries(Object.entries(n).map(([e, t2]) => [e, "function" == typeof t2 ? t2(i) : t2]))));
  for (const [e, t2] of o)
    t2.notNull ? t2.hasDefault && (i[e] = i[e].optional()) : i[e] = i[e].nullable().optional();
  return z.object(i);
}
function p(e) {
  let m2;
  if (function(e2) {
    return "enumValues" in e2 && Array.isArray(e2.enumValues) && e2.enumValues.length > 0;
  }(e) && (m2 = e.enumValues.length ? z.enum(e.enumValues) : z.string()), !m2) {
    if (is(e, PgUUID))
      m2 = z.string().uuid();
    else if ("custom" === e.dataType)
      m2 = z.any();
    else if ("json" === e.dataType)
      m2 = f;
    else if ("array" === e.dataType)
      m2 = z.array(p(e.baseColumn));
    else if ("number" === e.dataType)
      m2 = z.number();
    else if ("bigint" === e.dataType)
      m2 = z.bigint();
    else if ("boolean" === e.dataType)
      m2 = z.boolean();
    else if ("date" === e.dataType)
      m2 = z.date();
    else if ("string" === e.dataType) {
      let i = z.string();
      (is(e, PgChar) || is(e, PgVarchar) || is(e, MySqlVarChar) || is(e, MySqlVarBinary) || is(e, MySqlChar) || is(e, SQLiteText)) && "number" == typeof e.length && (i = i.max(e.length)), m2 = i;
    }
  }
  return m2 || (m2 = z.any()), m2;
}
var m, f;
var init_drizzle_zod = __esm({
  "node_modules/drizzle-zod/index.mjs"() {
    init_drizzle_orm();
    init_mysql_core();
    init_pg_core();
    init_sqlite_core();
    init_lib();
    m = z.union([z.string(), z.number(), z.boolean(), z.null()]);
    f = z.lazy(() => z.union([m, z.array(f), z.record(f)]));
  }
});

// .svelte-kit/output/server/chunks/db.js
var pgUsers, insertUserSchema, schema, db2;
var init_db = __esm({
  ".svelte-kit/output/server/chunks/db.js"() {
    init_index_node();
    init_vercel_postgres();
    init_pg_core();
    init_drizzle_zod();
    pgUsers = pgTable("users", {
      id: serial("id").primaryKey().notNull(),
      created_at: timestamp("created_at").defaultNow().notNull(),
      name: varchar("name", { length: 256 }).notNull()
    });
    insertUserSchema = c(pgUsers);
    schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      insertUserSchema,
      pgUsers
    }, Symbol.toStringTag, { value: "Module" }));
    db2 = drizzle(sql, { schema });
  }
});

// .svelte-kit/output/server/entries/endpoints/api/v1/users/_server.ts.js
var server_ts_exports = {};
__export(server_ts_exports, {
  GET: () => GET
});
async function GET() {
  try {
    const result = await db2.select().from(pgUsers);
    return json(result);
  } catch {
    throw error(403);
  }
}
var init_server_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/v1/users/_server.ts.js"() {
    init_db();
    init_chunks();
  }
});

// .svelte-kit/output/server/entries/endpoints/api/v1/users/new/_server.ts.js
var server_ts_exports2 = {};
__export(server_ts_exports2, {
  POST: () => POST
});
async function POST({ request }) {
  const requestParaseResult = insertUserSchema.safeParse(await request.json());
  if (!requestParaseResult.success) {
    console.log("/api/users/new | ERROR! Invalid request.");
    return new Response();
  }
  await db2.insert(pgUsers).values(requestParaseResult.data);
  console.log("/api/users/new | inserted new user:", requestParaseResult.data);
  return new Response();
}
var init_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/v1/users/new/_server.ts.js"() {
    init_db();
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  let { data_2 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  if ($$props.data_2 === void 0 && $$bindings.data_2 && data_2 !== void 0)
    $$bindings.data_2(data_2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${constructors[2] ? `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${validate_component(constructors[2] || missing_component, "svelte:component").$$render(
                  $$result,
                  { data: data_2, form, this: components[2] },
                  {
                    this: ($$value) => {
                      components[2] = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            }
          )}` : `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1jftzx2"
};
function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_chunks();

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom2 = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom2.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom2.has(thing)) {
      return custom2.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name2, thing) => {
      params.push(name2);
      if (custom2.has(thing)) {
        values.push(
          /** @type {string} */
          custom2.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name2}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name2}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name2}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name2}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name2 = "";
  do {
    name2 = chars[num % chars.length] + name2;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name2) ? `${name2}0` : name2;
}
function escape_unsafe_char(c2) {
  return escaped[c2] || c2;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom2 = [];
  for (const key2 in reducers) {
    custom2.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p2 = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index12 = p2++;
    indexes.set(thing, index12);
    for (const { key: key2, fn } of custom2) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index12] = `["${key2}",${flatten(value2)}]`;
        return index12;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index12] = str;
    return index12;
  }
  const index11 = flatten(value);
  if (index11 < 0)
    return `${index11}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_ssr();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD"
]);
var PAGE_METHODS = /* @__PURE__ */ new Set(["GET", "POST", "HEAD"]);
function negotiate(accept, types2) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types2) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types2.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param2 = params[i];
    let value = values[i - buffered];
    if (param2.chained && param2.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param2.rest)
        result[param2.name] = "";
      continue;
    }
    if (!param2.matcher || matchers[param2.matcher](value)) {
      result[param2.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param2.chained) {
        buffered = 0;
      }
      continue;
    }
    if (param2.optional && param2.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | import('../runtime/control.js').HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod2, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod2).join(", ")
    }
  });
}
function allowed_methods(mod2) {
  const allowed = Array.from(ENDPOINT_METHODS).filter((method) => method in mod2);
  if ("GET" in mod2 || "HEAD" in mod2)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod2, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod2[method] || mod2.fallback;
  if (method === "HEAD" && mod2.GET && !mod2.HEAD) {
    handler = mod2.GET;
  }
  if (!handler) {
    return method_not_allowed(mod2, method);
  }
  const prerender = mod2.prerender ?? state.prerender_default;
  if (prerender && (mod2.POST || mod2.PATCH || mod2.PUT || mod2.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (ENDPOINT_METHODS.has(method) && !PAGE_METHODS.has(method)) {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect2) {
  return action_json({
    type: "redirect",
    status: redirect2.status,
    location: redirect2.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name2 = "default";
  for (const param2 of url.searchParams) {
    if (param2[0].startsWith("/")) {
      name2 = param2[0].slice(1);
      if (name2 === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name2];
  if (!action) {
    throw new Error(`No action with name '${name2}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: cloned_headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c2 = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c2;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f2, r) => {
    fulfil = f2;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets10 = new Set(client.stylesheets);
  const fonts10 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets10.add(url);
      for (const url of node.fonts)
        fonts10.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets10) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts10) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder2 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p2, i) => p2.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json22, status = 200) {
  return text(typeof json22 === "string" ? json22 : JSON.stringify(json22), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect2) {
  return json_response({
    type: "redirect",
    location: redirect2.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod2 = leaf_node.server;
      if (mod2?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p2 of server_promises)
      p2.catch(() => {
      });
    for (const p2 of load_promises)
      p2.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index11 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index11]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults2 = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name2, opts) {
      const c2 = new_cookies[name2];
      if (c2 && domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
        return c2.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name2];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c2 of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
          cookies2[c2.name] = c2.value;
        }
      }
      return Object.entries(cookies2).map(([name2, value]) => ({ name: name2, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name2, value, opts = {}) {
      set_internal(name2, value, { ...defaults2, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name2, opts = {}) {
      cookies.set(name2, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name2, value, opts) {
      return (0, import_cookie.serialize)(name2, value, {
        ...defaults2,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name2 in parsed) {
        combined_cookies[name2] = parsed[name2];
      }
    }
    return Object.entries(combined_cookies).map(([name2, value]) => `${name2}=${value}`).join("; ");
  }
  function set_internal(name2, value, opts) {
    const path = opts.path ?? default_path;
    new_cookies[name2] = {
      name: name2,
      value,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name: name2, value, options: options2 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name2, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name: name2, value, ...options3 } = set_cookie_parser.parseString(str);
            set_internal(
              name2,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
var valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
var valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
var valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
var valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "fallback",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
var validate_layout_exports = validator(valid_layout_exports);
var validate_page_exports = validator(valid_page_exports);
var validate_layout_server_exports = validator(valid_layout_server_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod2 = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod2, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    set_private_env(
      filter_private_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    set_public_env(
      filter_public_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    if (!__privateGet(this, _options).hooks) {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve }) => resolve(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/vercel-tmp/fn/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["favicon.png", "fonts/overpass/overpass-mono-v16-latin-300.woff2", "fonts/overpass/overpass-mono-v16-latin-500.woff2", "fonts/overpass/overpass-mono-v16-latin-600.woff2", "fonts/overpass/overpass-mono-v16-latin-700.woff2", "fonts/overpass/overpass-mono-v16-latin-regular.woff2", "fonts/overpass/overpass-v13-latin-100.woff2", "fonts/overpass/overpass-v13-latin-100italic.woff2", "fonts/overpass/overpass-v13-latin-200.woff2", "fonts/overpass/overpass-v13-latin-200italic.woff2", "fonts/overpass/overpass-v13-latin-300.woff2", "fonts/overpass/overpass-v13-latin-300italic.woff2", "fonts/overpass/overpass-v13-latin-500.woff2", "fonts/overpass/overpass-v13-latin-500italic.woff2", "fonts/overpass/overpass-v13-latin-600.woff2", "fonts/overpass/overpass-v13-latin-600italic.woff2", "fonts/overpass/overpass-v13-latin-700.woff2", "fonts/overpass/overpass-v13-latin-700italic.woff2", "fonts/overpass/overpass-v13-latin-800.woff2", "fonts/overpass/overpass-v13-latin-800italic.woff2", "fonts/overpass/overpass-v13-latin-900.woff2", "fonts/overpass/overpass-v13-latin-900italic.woff2", "fonts/overpass/overpass-v13-latin-italic.woff2", "fonts/overpass/overpass-v13-latin-regular.woff2"]),
    mimeTypes: { ".png": "image/png", ".woff2": "font/woff2" },
    _: {
      client: { "start": "_app/immutable/entry/start.6cfb585b.js", "app": "_app/immutable/entry/app.ed7d8b8b.js", "imports": ["_app/immutable/entry/start.6cfb585b.js", "_app/immutable/chunks/scheduler.e108d1fd.js", "_app/immutable/chunks/singletons.c3d64619.js", "_app/immutable/chunks/control.f5b05b5f.js", "_app/immutable/entry/app.ed7d8b8b.js", "_app/immutable/chunks/scheduler.e108d1fd.js", "_app/immutable/chunks/index.c5e6bafe.js"], "stylesheets": [], "fonts": [] },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8))),
        __memo(() => Promise.resolve().then(() => (init__9(), __exports9)))
      ],
      routes: [
        {
          id: "/(app)",
          pattern: /^\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 4 },
          endpoint: null
        },
        {
          id: "/api/v1/users",
          pattern: /^\/api\/v1\/users\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts(), server_ts_exports)))
        },
        {
          id: "/api/v1/users/new",
          pattern: /^\/api\/v1\/users\/new\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts2(), server_ts_exports2)))
        },
        {
          id: "/(docs)/docs",
          pattern: /^\/docs\/?$/,
          params: [],
          page: { layouts: [0, 3], errors: [1, ,], leaf: 5 },
          endpoint: null
        },
        {
          id: "/(docs)/docs/api",
          pattern: /^\/docs\/api\/?$/,
          params: [],
          page: { layouts: [0, 3], errors: [1, ,], leaf: 6 },
          endpoint: null
        },
        {
          id: "/(docs)/docs/api/v1",
          pattern: /^\/docs\/api\/v1\/?$/,
          params: [],
          page: { layouts: [0, 3], errors: [1, ,], leaf: 7 },
          endpoint: null
        },
        {
          id: "/(docs)/docs/api/v1/[resource]",
          pattern: /^\/docs\/api\/v1\/([^/]+?)\/?$/,
          params: [{ "name": "resource", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 3], errors: [1, ,], leaf: 8 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      }
    }
  };
})();

// .svelte-kit/vercel-tmp/fn/edge.js
var server = new Server(manifest);
var initialized = server.init({
  env: (
    /** @type {Record<string, string>} */
    process.env
  )
});
var edge_default = async (request, context) => {
  await initialized;
  return server.respond(request, {
    getClientAddress() {
      return (
        /** @type {string} */
        request.headers.get("x-forwarded-for")
      );
    },
    platform: {
      context
    }
  });
};
export {
  edge_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@neondatabase/serverless/index.js:
  (*! Bundled license information:
  
  ieee754/index.js:
    (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  buffer/index.js:
    (*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     *)
  *)
*/
//# sourceMappingURL=index.js.map
