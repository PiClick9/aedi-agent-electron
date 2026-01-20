
if (!window.aedi_script) {
  window.aedi_script = true;
  function aecle(ul) {
    document.querySelectorAll("iframe." + ul).forEach(function (el) {
      el.remove();
    });
  }

  var seen = new Array();
  var loadPrequired = function () {
    (window.MutationObserver =
      window.MutationObserver ||
      (function (t) {
        function e(t) {
          (this.i = []), (this.m = t);
        }
        function i(e) {
          var i,
            n = {
              type: null,
              target: null,
              addedNodes: [],
              removedNodes: [],
              previousSibling: null,
              nextSibling: null,
              attributeName: null,
              attributeNamespace: null,
              oldValue: null,
            };
          for (i in e) n[i] !== t && e[i] !== t && (n[i] = e[i]);
          return n;
        }
        function n(e, n) {
          var s = r(e, n);
          return function (c) {
            var d,
              p = c.length;
            n.a &&
              3 === e.nodeType &&
              e.nodeValue !== s.a &&
              c.push(
                new i({
                  type: "characterData",
                  target: e,
                  oldValue: s.a,
                })
              ),
              n.b && s.b && o(c, e, s.b, n.f),
              (n.c || n.g) &&
                (d = (function (e, n, r, s) {
                  function c(t, n, r, a, l) {
                    var c,
                      p,
                      h,
                      u = t.length - 1;
                    for (l = -~((u - l) / 2); (h = t.pop()); )
                      (c = r[h.j]),
                        (p = a[h.l]),
                        s.c &&
                          l &&
                          Math.abs(h.j - h.l) >= u &&
                          (e.push(
                            i({
                              type: "childList",
                              target: n,
                              addedNodes: [c],
                              removedNodes: [c],
                              nextSibling: c.nextSibling,
                              previousSibling: c.previousSibling,
                            })
                          ),
                          l--),
                        s.b && p.b && o(e, c, p.b, s.f),
                        s.a &&
                          3 === c.nodeType &&
                          c.nodeValue !== p.a &&
                          e.push(
                            i({
                              type: "characterData",
                              target: c,
                              oldValue: p.a,
                            })
                          ),
                        s.g && d(c, p);
                  }
                  function d(n, r) {
                    for (
                      var h,
                        u,
                        g,
                        m,
                        f,
                        v = n.childNodes,
                        y = r.c,
                        k = v.length,
                        w = y ? y.length : 0,
                        b = 0,
                        I = 0,
                        T = 0;
                      I < k || T < w;

                    )
                      (m = v[I]),
                        (f = (g = y[T]) && g.node),
                        m === f
                          ? (s.b && g.b && o(e, m, g.b, s.f),
                            s.a &&
                              g.a !== t &&
                              m.nodeValue !== g.a &&
                              e.push(
                                i({
                                  type: "characterData",
                                  target: m,
                                  oldValue: g.a,
                                })
                              ),
                            u && c(u, n, v, y, b),
                            s.g &&
                              (m.childNodes.length || (g.c && g.c.length)) &&
                              d(m, g),
                            I++,
                            T++)
                          : ((p = !0),
                            h || ((h = {}), (u = [])),
                            m &&
                              (h[(g = a(m))] ||
                                ((h[g] = !0),
                                -1 === (g = l(y, m, T, "node"))
                                  ? s.c &&
                                    (e.push(
                                      i({
                                        type: "childList",
                                        target: n,
                                        addedNodes: [m],
                                        nextSibling: m.nextSibling,
                                        previousSibling: m.previousSibling,
                                      })
                                    ),
                                    b++)
                                  : u.push({
                                      j: I,
                                      l: g,
                                    })),
                              I++),
                            f &&
                              f !== v[I] &&
                              (h[(g = a(f))] ||
                                ((h[g] = !0),
                                -1 === (g = l(v, f, I))
                                  ? s.c &&
                                    (e.push(
                                      i({
                                        type: "childList",
                                        target: r.node,
                                        removedNodes: [f],
                                        nextSibling: y[T + 1],
                                        previousSibling: y[T - 1],
                                      })
                                    ),
                                    b--)
                                  : u.push({
                                      j: g,
                                      l: T,
                                    })),
                              T++));
                    u && c(u, n, v, y, b);
                  }
                  var p;
                  return d(n, r), p;
                })(c, e, s, n)),
              (d || c.length !== p) && (s = r(e, n));
          };
        }
        function o(e, n, o, r) {
          for (var a, s, l = {}, c = n.attributes, p = c.length; p--; )
            (s = (a = c[p]).name),
              (r && r[s] === t) ||
                (d(n, a) !== o[s] &&
                  e.push(
                    i({
                      type: "attributes",
                      target: n,
                      attributeName: s,
                      oldValue: o[s],
                      attributeNamespace: a.namespaceURI,
                    })
                  ),
                (l[s] = !0));
          for (s in o)
            l[s] ||
              e.push(
                i({
                  target: n,
                  type: "attributes",
                  attributeName: s,
                  oldValue: o[s],
                })
              );
        }
        function r(t, e) {
          var i = !0;
          return (function t(n) {
            var o = {
              node: n,
            };
            return (
              !e.a || (3 !== n.nodeType && 8 !== n.nodeType)
                ? (e.b &&
                    i &&
                    1 === n.nodeType &&
                    (o.b = s(n.attributes, function (t, i) {
                      return (e.f && !e.f[i.name]) || (t[i.name] = d(n, i)), t;
                    })),
                  i &&
                    (e.c || e.a || (e.b && e.g)) &&
                    (o.c = (function (t, e) {
                      for (var i = [], n = 0; n < t.length; n++)
                        i[n] = e(t[n], n, t);
                      return i;
                    })(n.childNodes, t)),
                  (i = e.g))
                : (o.a = n.nodeValue),
              o
            );
          })(t);
        }
        function a(t) {
          try {
            return t.id || (t.mo_id = t.mo_id || p++);
          } catch (e) {
            try {
              return t.nodeValue;
            } catch (t) {
              return p++;
            }
          }
        }
        function s(t, e) {
          for (var i = {}, n = 0; n < t.length; n++) i = e(i, t[n], n, t);
          return i;
        }
        function l(t, e, i, n) {
          for (; i < t.length; i++) if ((n ? t[i][n] : t[i]) === e) return i;
          return -1;
        }
        (e._period = 30),
          (e.prototype = {
            observe: function (t, i) {
              for (
                var o = {
                    b: !!(
                      i.attributes ||
                      i.attributeFilter ||
                      i.attributeOldValue
                    ),
                    c: !!i.childList,
                    g: !!i.subtree,
                    a: !(!i.characterData && !i.characterDataOldValue),
                  },
                  r = this.i,
                  a = 0;
                a < r.length;
                a++
              )
                r[a].s === t && r.splice(a, 1);
              i.attributeFilter &&
                (o.f = s(i.attributeFilter, function (t, e) {
                  return (t[e] = !0), t;
                })),
                r.push({
                  s: t,
                  o: n(t, o),
                }),
                this.h ||
                  (function (t) {
                    !(function i() {
                      var n = t.takeRecords();
                      n.length && t.m(n, t), (t.h = setTimeout(i, e._period));
                    })();
                  })(this);
            },
            takeRecords: function () {
              for (var t = [], e = this.i, i = 0; i < e.length; i++) e[i].o(t);
              return t;
            },
            disconnect: function () {
              (this.i = []), clearTimeout(this.h), (this.h = null);
            },
          });
        var c = document.createElement("i");
        c.style.top = 0;
        var d = (c = "null" != c.attributes.style.value)
            ? function (t, e) {
                return e.value;
              }
            : function (t, e) {
                return "style" !== e.name ? e.value : t.style.cssText;
              },
          p = 1;
        return e;
      })(void 0)),
      (function (t, e) {
        "use strict";
        if (
          "IntersectionObserver" in t &&
          "IntersectionObserverEntry" in t &&
          "intersectionRatio" in t.IntersectionObserverEntry.prototype
        )
          "isIntersecting" in t.IntersectionObserverEntry.prototype ||
            Object.defineProperty(
              t.IntersectionObserverEntry.prototype,
              "isIntersecting",
              {
                get: function () {
                  return this.intersectionRatio > 0;
                },
              }
            );
        else {
          var i = [];
          (o.prototype.THROTTLE_TIMEOUT = 100),
            (o.prototype.POLL_INTERVAL = null),
            (o.prototype.USE_MUTATION_OBSERVER = !0),
            (o.prototype.observe = function (t) {
              if (
                !this._observationTargets.some(function (e) {
                  return e.element == t;
                })
              ) {
                if (!t || 1 != t.nodeType)
                  throw new Error("target must be an Element");
                this._registerInstance(),
                  this._observationTargets.push({
                    element: t,
                    entry: null,
                  }),
                  this._monitorIntersections(),
                  this._checkForIntersections();
              }
            }),
            (o.prototype.unobserve = function (t) {
              (this._observationTargets = this._observationTargets.filter(
                function (e) {
                  return e.element != t;
                }
              )),
                this._observationTargets.length ||
                  (this._unmonitorIntersections(), this._unregisterInstance());
            }),
            (o.prototype.disconnect = function () {
              (this._observationTargets = []),
                this._unmonitorIntersections(),
                this._unregisterInstance();
            }),
            (o.prototype.takeRecords = function () {
              var t = this._queuedEntries.slice();
              return (this._queuedEntries = []), t;
            }),
            (o.prototype._initThresholds = function (t) {
              var e = t || [0];
              return (
                Array.isArray(e) || (e = [e]),
                e.sort().filter(function (t, e, i) {
                  if ("number" != typeof t || isNaN(t) || t < 0 || t > 1)
                    throw new Error(
                      "threshold must be a number between 0 and 1 inclusively"
                    );
                  return t !== i[e - 1];
                })
              );
            }),
            (o.prototype._parseRootMargin = function (t) {
              var e = (t || "0px").split(/\s+/).map(function (t) {
                var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                if (!e)
                  throw new Error(
                    "rootMargin must be specified in pixels or percent"
                  );
                return {
                  value: parseFloat(e[1]),
                  unit: e[2],
                };
              });
              return (
                (e[1] = e[1] || e[0]),
                (e[2] = e[2] || e[0]),
                (e[3] = e[3] || e[1]),
                e
              );
            }),
            (o.prototype._monitorIntersections = function () {
              this._monitoringIntersections ||
                ((this._monitoringIntersections = !0),
                this.POLL_INTERVAL
                  ? (this._monitoringInterval = setInterval(
                      this._checkForIntersections,
                      this.POLL_INTERVAL
                    ))
                  : (r(t, "resize", this._checkForIntersections, !0),
                    r(e, "scroll", this._checkForIntersections, !0),
                    this.USE_MUTATION_OBSERVER &&
                      "MutationObserver" in t &&
                      ((this._domObserver = new MutationObserver(
                        this._checkForIntersections
                      )),
                      this._domObserver.observe(e, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0,
                      }))));
            }),
            (o.prototype._unmonitorIntersections = function () {
              this._monitoringIntersections &&
                ((this._monitoringIntersections = !1),
                clearInterval(this._monitoringInterval),
                (this._monitoringInterval = null),
                a(t, "resize", this._checkForIntersections, !0),
                a(e, "scroll", this._checkForIntersections, !0),
                this._domObserver &&
                  (this._domObserver.disconnect(), (this._domObserver = null)));
            }),
            (o.prototype._checkForIntersections = function () {
              var e = this._rootIsInDom(),
                i = e
                  ? this._getRootRect()
                  : {
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      width: 0,
                      height: 0,
                    };
              this._observationTargets.forEach(function (o) {
                var r = o.element,
                  a = s(r),
                  l = this._rootContainsTarget(r),
                  c = o.entry,
                  d = e && l && this._computeTargetAndRootIntersection(r, i),
                  p = (o.entry = new n({
                    time: t.performance && performance.now && performance.now(),
                    target: r,
                    boundingClientRect: a,
                    rootBounds: i,
                    intersectionRect: d,
                  }));
                c
                  ? e && l
                    ? this._hasCrossedThreshold(c, p) &&
                      this._queuedEntries.push(p)
                    : c && c.isIntersecting && this._queuedEntries.push(p)
                  : this._queuedEntries.push(p);
              }, this),
                this._queuedEntries.length &&
                  this._callback(this.takeRecords(), this);
            }),
            (o.prototype._computeTargetAndRootIntersection = function (i, n) {
              if ("none" != t.getComputedStyle(i).display) {
                for (
                  var o, r, a, l, d, p, h, u, g = s(i), m = c(i), f = !1;
                  !f;

                ) {
                  var v = null,
                    y = 1 == m.nodeType ? t.getComputedStyle(m) : {};
                  if ("none" == y.display) return;
                  if (
                    (m == this.root || m == e
                      ? ((f = !0), (v = n))
                      : m != e.body &&
                        m != e.documentElement &&
                        "visible" != y.overflow &&
                        (v = s(m)),
                    v &&
                      ((o = v),
                      (r = g),
                      void 0,
                      void 0,
                      void 0,
                      void 0,
                      void 0,
                      void 0,
                      (a = Math.max(o.top, r.top)),
                      (l = Math.min(o.bottom, r.bottom)),
                      (d = Math.max(o.left, r.left)),
                      (u = l - a),
                      !(g = (h = (p = Math.min(o.right, r.right)) - d) >= 0 &&
                        u >= 0 && {
                          top: a,
                          bottom: l,
                          left: d,
                          right: p,
                          width: h,
                          height: u,
                        })))
                  )
                    break;
                  m = c(m);
                }
                return g;
              }
            }),
            (o.prototype._getRootRect = function () {
              var t;
              if (this.root) t = s(this.root);
              else {
                var i = e.documentElement,
                  n = e.body;
                t = {
                  top: 0,
                  left: 0,
                  right: i.clientWidth || n.clientWidth,
                  width: i.clientWidth || n.clientWidth,
                  bottom: i.clientHeight || n.clientHeight,
                  height: i.clientHeight || n.clientHeight,
                };
              }
              return this._expandRectByRootMargin(t);
            }),
            (o.prototype._expandRectByRootMargin = function (t) {
              var e = this._rootMarginValues.map(function (e, i) {
                  return "px" == e.unit
                    ? e.value
                    : (e.value * (i % 2 ? t.width : t.height)) / 100;
                }),
                i = {
                  top: t.top - e[0],
                  right: t.right + e[1],
                  bottom: t.bottom + e[2],
                  left: t.left - e[3],
                };
              return (
                (i.width = i.right - i.left), (i.height = i.bottom - i.top), i
              );
            }),
            (o.prototype._hasCrossedThreshold = function (t, e) {
              var i = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
                n = e.isIntersecting ? e.intersectionRatio || 0 : -1;
              if (i !== n)
                for (var o = 0; o < this.thresholds.length; o++) {
                  var r = this.thresholds[o];
                  if (r == i || r == n || r < i != r < n) return !0;
                }
            }),
            (o.prototype._rootIsInDom = function () {
              return !this.root || l(e, this.root);
            }),
            (o.prototype._rootContainsTarget = function (t) {
              return l(this.root || e, t);
            }),
            (o.prototype._registerInstance = function () {
              i.indexOf(this) < 0 && i.push(this);
            }),
            (o.prototype._unregisterInstance = function () {
              var t = i.indexOf(this);
              -1 != t && i.splice(t, 1);
            }),
            (t.IntersectionObserver = o),
            (t.IntersectionObserverEntry = n);
        }
        function n(t) {
          (this.time = t.time),
            (this.target = t.target),
            (this.rootBounds = t.rootBounds),
            (this.boundingClientRect = t.boundingClientRect),
            (this.intersectionRect = t.intersectionRect || {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: 0,
              height: 0,
            }),
            (this.isIntersecting = !!t.intersectionRect);
          var e = this.boundingClientRect,
            i = e.width * e.height,
            n = this.intersectionRect,
            o = n.width * n.height;
          this.intersectionRatio = i
            ? Number((o / i).toFixed(4))
            : this.isIntersecting
            ? 1
            : 0;
        }
        function o(t, e) {
          var i,
            n,
            o,
            r = e || {};
          if ("function" != typeof t)
            throw new Error("callback must be a function");
          if (r.root && 1 != r.root.nodeType)
            throw new Error("root must be an Element");
          (this._checkForIntersections =
            ((i = this._checkForIntersections.bind(this)),
            (n = this.THROTTLE_TIMEOUT),
            (o = null),
            function () {
              o ||
                (o = setTimeout(function () {
                  i(), (o = null);
                }, n));
            })),
            (this._callback = t),
            (this._observationTargets = []),
            (this._queuedEntries = []),
            (this._rootMarginValues = this._parseRootMargin(r.rootMargin)),
            (this.thresholds = this._initThresholds(r.threshold)),
            (this.root = r.root || null),
            (this.rootMargin = this._rootMarginValues
              .map(function (t) {
                return t.value + t.unit;
              })
              .join(" "));
        }
        function r(t, e, i, n) {
          "function" == typeof t.addEventListener
            ? t.addEventListener(e, i, n || !1)
            : "function" == typeof t.attachEvent && t.attachEvent("on" + e, i);
        }
        function a(t, e, i, n) {
          "function" == typeof t.removeEventListener
            ? t.removeEventListener(e, i, n || !1)
            : "function" == typeof t.detatchEvent &&
              t.detatchEvent("on" + e, i);
        }
        function s(t) {
          var e;
          try {
            e = t.getBoundingClientRect();
          } catch (t) {}
          return e
            ? ((e.width && e.height) ||
                (e = {
                  top: e.top,
                  right: e.right,
                  bottom: e.bottom,
                  left: e.left,
                  width: e.right - e.left,
                  height: e.bottom - e.top,
                }),
              e)
            : {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0,
              };
        }
        function l(t, e) {
          for (var i = e; i; ) {
            if (i == t) return !0;
            i = c(i);
          }
          return !1;
        }
        function c(t) {
          var e = t.parentNode;
          return e && 11 == e.nodeType && e.host
            ? e.host
            : e && e.assignedSlot
            ? e.assignedSlot.parentNode
            : e;
        }
      })(window, document),
      (function (t, e) {
        "object" == typeof exports && "undefined" != typeof module
          ? (module.exports = e())
          : (t.lozad = e());
      })(this, function () {
        "use strict";
        var t =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var n in i)
                  Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
              }
              return t;
            },
          e = "undefined" != typeof document && document.documentMode,
          i = {
            rootMargin: "0px",
            threshold: 0,
            load: function (t) {
              if ("picture" === t.nodeName.toLowerCase()) {
                var i = document.createElement("img");
                e &&
                  t.getAttribute("data-iesrc") &&
                  (i.src = t.getAttribute("data-iesrc")),
                  t.getAttribute("data-alt") &&
                    (i.alt = t.getAttribute("data-alt")),
                  t.appendChild(i);
              }
              if (
                "video" === t.nodeName.toLowerCase() &&
                !t.getAttribute("data-src") &&
                t.children
              ) {
                for (
                  var n = t.children, o = void 0, r = 0;
                  r <= n.length - 1;
                  r++
                )
                  (o = n[r].getAttribute("data-src")) && (n[r].src = o);
                t.load();
              }
              t.getAttribute("data-src") &&
                (t.src = t.getAttribute("data-src")),
                t.getAttribute("data-srcset") &&
                  t.setAttribute("srcset", t.getAttribute("data-srcset")),
                t.getAttribute("data-background-image") &&
                  (t.style.backgroundImage =
                    "url('" + t.getAttribute("data-background-image") + "')"),
                t.getAttribute("data-toggle-class") &&
                  t.classList.toggle(t.getAttribute("data-toggle-class"));
            },
            loaded: function () {},
          };
        function n(t) {
          t.setAttribute("data-loaded", !0);
        }
        var o = function (t) {
          return "true" === t.getAttribute("data-loaded");
        };
        return function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : ".lozad",
            r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            a = t({}, i, r),
            s = a.root,
            l = a.rootMargin,
            c = a.threshold,
            d = a.load,
            p = a.loaded,
            h = void 0;
          return (
            window.IntersectionObserver &&
              (h = new IntersectionObserver(
                (function (t, e) {
                  return function (i, r) {
                    i.forEach(function (i) {
                      (i.intersectionRatio > 0 || i.isIntersecting) &&
                        (r.unobserve(i.target),
                        o(i.target) || (t(i.target), n(i.target), e(i.target)));
                    });
                  };
                })(d, p),
                {
                  root: s,
                  rootMargin: l,
                  threshold: c,
                }
              )),
            {
              observe: function () {
                for (
                  var t = (function (t) {
                      var e =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : document;
                      return t instanceof Element
                        ? [t]
                        : t instanceof NodeList
                        ? t
                        : e.querySelectorAll(t);
                    })(e, s),
                    i = 0;
                  i < t.length;
                  i++
                )
                  o(t[i]) ||
                    (h ? h.observe(t[i]) : (d(t[i]), n(t[i]), p(t[i])));
              },
              triggerLoad: function (t) {
                o(t) || (d(t), n(t), p(t));
              },
              observer: h,
            }
          );
        };
      });
  };

  var loadJSONP = (function () {
      var t = +new Date();
      return function (e, i, n) {
        var o = "_jsonp_" + t++;
        e.match(/\?/) ? (e += "&callback=" + o) : (e += "?callback=" + o);
        var r = document.createElement("script");
        (r.type = "text/javascript"),
          (r.src = e),
          (window[o] = function (t) {
            i.call(n || window, t),
              document.getElementsByTagName("head")[0].removeChild(r),
              (r = null);
            try {
              delete window[o];
            } catch (t) {
              window[o] = void 0;
            }
          }),
          document.getElementsByTagName("head")[0].appendChild(r);
      };
    })(),
    Aedi = function () {
      this.initialize.apply(this, arguments);
    };
  Aedi.prototype = {
    initialize: function (t) {
      (this.ai_version = "v1"),
        this.nation,
        (this.baseUrl = this.getBaseURL()),
        (this.interval = {}),
        (this.link = {}),
        (this.canvas = {}),
        (this.filter = "win16|win32|win64|mac"),
        (this.ad_link = {}),
        (this.adCnt = 0),
        (this.maxFillerCnt = 5),
        (this.mb_id = ""),
        // uid 체크 (aedi User ID)
        (this.uid = this.getCookie("_pa")),
        (null !== this.uid && 21 === this.uid.length) ||
          (this.uid = this.uidCreate()),
        // 만료날짜 갱신
        this.setCookie("_pa", this.uid, 365),
        // 광고소재용
        (this.mask = new Image()),
        (this.over = new Image()),
        (this.over_2x = new Image()),
        (this.over_amber = new Image()),
        (this.over_aedi = new Image()),
        (this.ad = new Image()),
        (this.pass = new Image()),
        (this.ld = new Image()),
        (this.mask.src = "https://cdn2.aedi.ai/img/cover/mask.png"),
        (this.over.src = "https://cdn2.aedi.ai/img/cover/over.png"),
        (this.over_amber.src = "https://cdn2.aedi.ai/img/cover/over_amber.png"),
        (this.over_aedi.src = "https://cdn2.aedi.ai/img/cover/over_aedi.png"),
        (this.over_2x.src = "https://cdn2.aedi.ai/img/cover/over_2x.png"),
        // this.ad.src = "https://cdn2.aedi.ai/img/cover/ad_kr3.png",
        // "kr" == this.nation ? this.ad.src = "https://cdn2.aedi.ai/img/cover/ad_kr3.png" : this.ad.src = "https://cdn2.aedi.ai/img/cover/ad_cn.png",
        (this.is_pv = false);
         //전역변수
        (this.is_apikey = "");
        (this.is_imgSelect = "");
        (this.is_writingTime = "");
      this.seen = new Array();
      // ABF 및 광고 응답 데이터 저장소 (AediAgent 연동용)
      this.abfData = {};
      this.adResponseData = {};
      document.createElement("img").src =
        "https://imp.aedi.ai/loc/?v=" + encodeURIComponent(location.href);
    },
    getBaseURL: function () {
      this.nation = "kr";
      return "aedi.ai";
    },
    setCookie: function (t, e, i, isHours = false) {
      var n = new Date();
      if (isHours) {
        n.setTime(n.getTime() + i * 60 * 60 * 1e3); 
      } else {
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3); 
      }
      document.cookie = t + '=' + e + ';expires=' + n.toUTCString() + ';path=/';
    },
    getCookie: function (t) {
      var e = document.cookie.match("(^|;) ?" + t + "=([^;]*)(;|$)");
      return e ? e[2] : null;
    },    
    deleteCookie: function (t) {
      document.cookie = t + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
    uidCreate: function () {
      return (
        parseInt(1e10 * Math.random()) +
        "." +
        parseInt(new Date().getTime() / 1e3)
      );
    },
    offset3: function (t) {
      var section = document.getElementsByTagName("section");
      var sectionMarginTop = 0;
      if (section.length && (window.location.host.includes("m.stylem.mt.co.kr") || window.location.host.includes("korea.com"))
      ) {
        sectionMarginTop =
          parseInt(section[0].style.marginTop) > 0
            ? parseInt(section[0].style.marginTop)
            : 0;
      }
      var e = t.getBoundingClientRect(),
        i = window.pageXOffset || document.documentElement.scrollLeft,
        n = window.pageYOffset || document.documentElement.scrollTop,
        o = document.body.getBoundingClientRect(),
        r = 0,
        a = top.location.href;

      var style = window.getComputedStyle(t);
      var padding =
        Number(style.getPropertyValue("padding-left").replace("px", "")) || 0;

      var computedStyleBody = window.getComputedStyle(document.body);
      var bodyMarginTop = parseFloat(computedStyleBody.getPropertyValue("margin-top"));

      return (
        "relative" == window.getComputedStyle(document.body).position &&
          (i -= o.left),
        (-1 == a.indexOf("mobile") && -1 == a.indexOf("/zxnews/")) ||
          (document.getElementById("title") &&
            (r = parseInt(
              window.getComputedStyle(document.getElementById("title"), null)
                .marginTop
            ))),
        {
          top: e.top + n - r - sectionMarginTop - bodyMarginTop,
          left: e.left + i + padding,
          height: e.bottom - e.top,
          width: e.right - e.left,
        }
      );
    },
    sleep: function (t) {
      for (
        var e = new Date().getTime(), i = 0;
        i < 1e7 && !(new Date().getTime() - e > t);
        i++
      );
    },
    // 리사이즈
    resizeTo: function (t, e) {
      var i = parseInt(t.style.width),
        n = parseInt(t.style.height);
      (t.style.width = i * e + "px"), (t.style.height = n * e + "px");
    },
    // 캔버스 출력 좌표 및 사이즈 정보 반환
    getCanvasParam: function (t, e, i) {
      var n = t?.width,
        o = t?.height,
        r = e.pos1.x,
        a = e.pos1.y,
        s = e.pos2.x - e.pos1.x,
        l = e.pos2.y - e.pos1.y,
        c = s,
        d = l;
      (!i.dpr || i.dpr < 1) && (i.dpr = 1);
      var p = 1,
        h = 1;
      return (
        r + s > n && (p = (s = n - r) / c),
        a + l > o && (h = (l = o - a) / d),
        {
          crop: {
            x: r,
            y: a,
            w: s,
            h: l,
          },
          canvas: {
            x: 0,
            y: 0,
            w: c * e.ratio * p,
            h: d * e.ratio * h,
          },
        }
      );
    },
    //트래킹로그
    tracking_log: function() {

      var currentUrl = encodeURIComponent(window.location.href); // URL 인코딩
  
      var currentTime = new Date().getTime();
      var cookieValue = this.getCookie(currentUrl);
      
      if (!cookieValue) {
        // 쿠키가 없을 때, 쿠키를 설정한다.
        this.setCookie(currentUrl, currentTime, 1, true);
        return true;
      } else {
        var storedTime = parseInt(cookieValue, 10);
        if (currentTime - storedTime <= 10000) {
            return true;
        }else{
          return false;
        }
      }
    },
    // 광고소재 생성
    // p_box 좌표를 이용해 상품 중심 크롭 파라미터 계산
    getCanvasParamFromPBox: function(imgWidth, imgHeight, p_box, canvasW, canvasH) {
      // p_box: [x_min, y_min, x_max, y_max] (0~1 정규화된 좌표)
      console.log('[AEDI] getCanvasParamFromPBox 입력:', {imgWidth, imgHeight, p_box, canvasW, canvasH});

      var pboxArr;
      if (typeof p_box === 'string') {
        try {
          pboxArr = JSON.parse(p_box);
          console.log('[AEDI] p_box 문자열 파싱 결과:', pboxArr);
        } catch (e) {
          console.log('[AEDI] p_box 파싱 에러:', e);
          return null;
        }
      } else {
        pboxArr = p_box;
        console.log('[AEDI] p_box 배열 사용:', pboxArr);
      }

      if (!pboxArr || pboxArr.length !== 4) {
        console.log('[AEDI] p_box 유효하지 않음:', pboxArr);
        return null;
      }

      // 정규화 좌표를 픽셀 좌표로 변환
      var boxX1 = imgWidth * pboxArr[0];
      var boxY1 = imgHeight * pboxArr[1];
      var boxX2 = imgWidth * pboxArr[2];
      var boxY2 = imgHeight * pboxArr[3];

      console.log('[AEDI] 픽셀 좌표 변환:', {boxX1, boxY1, boxX2, boxY2});

      // 상품 박스 크기
      var boxWidth = boxX2 - boxX1;
      var boxHeight = boxY2 - boxY1;

      // 캔버스 비율
      var canvasRatio = canvasH / canvasW;

      // 보이는 삼각형 영역: (0,0), (125,0), (0,165)
      var DIAG_SLOPE = 165 / 125; // 1.32
      var padding = 5;
      var pboxAspect = boxWidth / boxHeight;

      // 삼각형에 맞는 최대 p_box 크기 계산
      var maxW_right = 120 - padding;
      var maxH_bottom = 160 - padding;
      var maxW_diag = (165 - padding * (2 + DIAG_SLOPE)) / (1/pboxAspect + DIAG_SLOPE);

      var targetPboxW = Math.min(maxW_right, maxW_diag);
      var targetPboxH = targetPboxW / pboxAspect;

      if (targetPboxH > maxH_bottom) {
        targetPboxH = maxH_bottom;
        targetPboxW = targetPboxH * pboxAspect;
      }

      console.log('[AEDI] 목표 p_box 크기:', {targetPboxW, targetPboxH});

      // 핵심: clamping 없이 p_box를 왼쪽에 배치할 수 있는 최대 cropWidth 계산
      var maxCropWidthNoClamping = (imgWidth - boxX1) / (1 - padding / canvasW);
      console.log('[AEDI] clamping 없는 최대 cropWidth:', maxCropWidthNoClamping);

      // 목표 p_box 크기를 달성하는 cropWidth
      var idealCropWidth = (boxWidth * canvasW) / targetPboxW;

      // 실제 사용할 cropWidth 결정
      var cropWidth = Math.min(idealCropWidth, maxCropWidthNoClamping);

      // 최소 cropWidth: p_box 주변에 20% 여유
      var minCropWidth = boxWidth * 1.2;
      if (cropWidth < minCropWidth) {
        cropWidth = minCropWidth;
      }

      var cropHeight = cropWidth * canvasRatio;

      // 크롭이 이미지보다 크면 이미지 크기로 제한
      if (cropWidth > imgWidth) {
        cropWidth = imgWidth;
        cropHeight = cropWidth * canvasRatio;
      }
      if (cropHeight > imgHeight) {
        cropHeight = imgHeight;
        cropWidth = cropHeight / canvasRatio;
      }

      // 실제 p_box 캔버스 크기
      var finalPboxW = (boxWidth / cropWidth) * canvasW;
      var finalPboxH = (boxHeight / cropHeight) * canvasH;

      console.log('[AEDI] 실제 p_box 캔버스 크기:', {finalPboxW, finalPboxH});
      console.log('[AEDI] 사용할 cropWidth:', cropWidth);

      // 삼각형 중심(centroid) 계산: (125/3, 165/3) ≈ (41.67, 55)
      var triangleCenterX = 125 / 3;
      var triangleCenterY = 165 / 3;

      // p_box 중심
      var boxCenterX = (boxX1 + boxX2) / 2;
      var boxCenterY = (boxY1 + boxY2) / 2;

      // cropX, cropY 계산: p_box 중심이 삼각형 중심에 오도록
      var cropX = boxCenterX - (triangleCenterX * cropWidth / canvasW);
      var cropY = boxCenterY - (triangleCenterY * cropHeight / canvasH);

      console.log('[AEDI] 초기 crop 위치:', {cropX, cropY, cropWidth, cropHeight});

      // 이미지 경계 체크
      if (cropX < 0) cropX = 0;
      if (cropY < 0) cropY = 0;
      if (cropX + cropWidth > imgWidth) cropX = imgWidth - cropWidth;
      if (cropY + cropHeight > imgHeight) cropY = imgHeight - cropHeight;

      console.log('[AEDI] 경계 조정 후 crop 위치:', {cropX, cropY});

      // 최종 p_box 캔버스 위치
      var finalPboxX1 = ((boxX1 - cropX) / cropWidth) * canvasW;
      var finalPboxY1 = ((boxY1 - cropY) / cropHeight) * canvasH;
      var finalPboxX2 = finalPboxX1 + finalPboxW;
      var finalPboxY2 = finalPboxY1 + finalPboxH;

      console.log('[AEDI] 최종 p_box 위치:', {finalPboxX1, finalPboxY1, finalPboxX2, finalPboxY2});

      // 대각선 체크
      var diagY = 165 - DIAG_SLOPE * finalPboxX2;
      var isInTriangle = finalPboxX1 >= 0 && finalPboxY1 >= 0 &&
                         finalPboxX2 <= 125 && finalPboxY2 <= diagY + 5;

      console.log('[AEDI] 삼각형 내부 체크:', {isInTriangle, diagY, finalPboxY2});
      console.log('[AEDI] 최종 크롭 영역:', {cropX, cropY, cropWidth, cropHeight});

      return {
        crop: {
          x: cropX,
          y: cropY,
          w: cropWidth,
          h: cropHeight
        },
        canvas: {
          x: 0,
          y: 0,
          w: canvasW,
          h: canvasH
        }
      };
    },
    adThumb: function (
      img_url,
      imp_url,
      canvas,
      offset,
      abf_info,
      display_ratio,
      imp2_url,
      pv_imp_url,
      is_aedi = 0,
      p_box = null
    ) {
      var self = this;
      var img = new Image();
      var imp = new Image();

      // 이미지 전체크기
      var canvasWidth = 166;
      var canvasHeight = 184;

      // 해상도 체크( 모바일 해상도 배수 값)
      var devicePixelRatioValue = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * devicePixelRatioValue * display_ratio;
      canvas.height = canvasHeight * devicePixelRatioValue * display_ratio;
      var ctx = canvas.getContext("2d");

      function setImageOnload() {
        img.onload = function () {
          ctx.scale(devicePixelRatioValue, devicePixelRatioValue);
          var els = document.querySelectorAll(".pxButton");
          if (abf_info === null || abf_info === undefined || abf_info =='' || abf_info.status== 'F' || abf_info.resize_ratio === null) {
            function isMobile() {
              const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
              return mobileRegex.test(navigator.userAgent);
            }
            if (isMobile()) {
              const canvas_width = canvas.width / devicePixelRatioValue / 2;
              var scale = (this.width > canvas_width) ? canvas_width / this.width : 1;
            } else {
              var scale = (this.width > canvas.width / 2) ? (canvas.width / 2) / this.width : 1;
            }

            abf_info = {
              status: "S",
              color: [
                [255, 255, 255],
                [255, 255, 255]
              ],
              lt_point: [20,20],
              padded_rb_point: [this.width, this.height],
              resize_ratio: scale
            };
          }
          for (var x = 0; x < els.length; x++) els[x].style.display = "";
          var w1 = this.width,
            h1 = this.height,
            w0 = 136 * display_ratio,
            h0 = 166 * display_ratio,
            _w1 = (h1 / 176) * w0,
            _h1 = (h1 / 176) * h0,
            t = 0,
            l = 0;
          h1 > _h1 && (t = (h1 - _h1) / 1.75), w1 > _w1 && (l = (w1 - _w1) / 1);

          var ci = {
            crop: {
              x: l,
              y: t,
              w: w1 - l,
              h: h1 - t,
            },
            canvas: {
              x: 0,
              y: 0,
              w: w0,
              h: h0,
            },
          };

          // p_box가 있고 AediAgent가 활성화되어 있을 때만 상품 중심으로 크롭
          var useP_box = p_box && typeof window.AediAgent !== 'undefined';
          if (useP_box) {
            console.log('[AEDI Agent] p_box 사용:', p_box);
            // 기본 캔버스 크기(136, 166)를 사용하여 비율 계산 (display_ratio 영향 제거)
            var pboxCi = self.getCanvasParamFromPBox(w1, h1, p_box, 136, 166);
            console.log('[AEDI Agent] p_box 크롭 영역:', pboxCi);
            if (pboxCi) {
              ci = pboxCi;
              // p_box 사용 시에도 배경색은 abf_info에서 가져옴
              if (abf_info && abf_info.color) {
                // 상단 배경색
                ctx.fillStyle = "rgb(" + abf_info.color[0][0] + ", " + abf_info.color[0][1] + ", " + abf_info.color[0][2] + ")";
                ctx.fillRect(0, 0, 136 * display_ratio, (166 * display_ratio) / 2);
                // 하단 배경색
                ctx.fillStyle = "rgb(" + abf_info.color[1][0] + ", " + abf_info.color[1][1] + ", " + abf_info.color[1][2] + ")";
                ctx.fillRect(0, 83, 136 * display_ratio, 166 * display_ratio);
              }
              // 스타일 사이즈 정의
              canvas.style.width = 166 * display_ratio + "px";
              canvas.style.height = 184 * display_ratio + "px";
              // 이미지 그리기
              ctx.drawImage(
                img,
                ci.crop.x,
                ci.crop.y,
                ci.crop.w,
                ci.crop.h,
                ci.canvas.x * display_ratio,
                ci.canvas.y * display_ratio,
                ci.canvas.w * display_ratio,
                ci.canvas.h * display_ratio
              );
              // 마스크 적용
              ctx.globalCompositeOperation = "destination-in";
              ctx.drawImage(self.mask, -1, -1, 166 * display_ratio, 184 * display_ratio);
              // 오버레이 합성
              ctx.globalCompositeOperation = "source-over";
              ctx.drawImage(self.over_aedi, 0, 0, 166 * display_ratio, 184 * display_ratio);
              // 리사이즈
              if (offset !== undefined && offset.width !== null && offset.width > 0) {
                var mm = (offset.width < 360 && offset.height < 200)
                  ? 0.6
                  : (offset.width * 0.4) / parseInt(canvas.style.width);
                if (mm < 1) {
                  window.location.hostname.includes('newspub.kr') ? self.resizeTo(canvas, mm * 0.8) : self.resizeTo(canvas, mm);
                }
              }
              // 광고 라벨
              ctx.globalCompositeOperation = "source-over";
              ctx.drawImage(self.ad, 97 * display_ratio - 8, 0);
              return; // p_box 처리 완료
            }
          }

          // ABF정보가 있고 성공이면 (기존 로직)
          null !== abf_info &&
            "S" == abf_info.status &&
            ((ci = self.getCanvasParam(
              this,
              {
                pos1: {
                  x: abf_info.lt_point[0],
                  y: abf_info.lt_point[1],
                },
                pos2: {
                  x: abf_info.padded_rb_point[0],
                  y: abf_info.padded_rb_point[1],
                },
                ratio: abf_info.resize_ratio,
              },
              {
                width: w1,
                height: h1,
                dpr: devicePixelRatioValue,
              }
            )),
            // 우측 상단 배경 색상 정의 (상반부)
            abf_info.color ? 
            (ctx.fillStyle =
              "rgb(" +
              abf_info.color[0][0] +
              ", " +
              abf_info.color[0][1] +
              ", " +
              abf_info.color[0][2] +
              ")") : (ctx.fillStyle = "rgb(255,255,255)"),
            ctx.fillRect(0, 0, 136 * display_ratio, (166 * display_ratio) / 2),
            // 좌측 하단 배경 색상 정의 (하반부)
            abf_info.color ? 
            (ctx.fillStyle =
              "rgb(" +
              abf_info.color[1][0] +
              ", " +
              abf_info.color[1][1] +
              ", " +
              abf_info.color[1][2] +
              ")") : (ctx.fillStyle = "rgb(255,255,255)"),
            ctx.fillRect(0, 83, 136 * display_ratio, 166 * display_ratio)),
            // 스타일에서 실제 표현 사이즈 정의
            (canvas.style.width = 166 * display_ratio + "px"),
            (canvas.style.height = 184 * display_ratio + "px"),
            // 이미지 로드
            ctx.drawImage(
              img,
              ci.crop.x,
              ci.crop.y,
              ci.crop.w,
              ci.crop.h,
              ci.canvas.x * display_ratio,
              ci.canvas.y * display_ratio,
              ci.canvas.w * display_ratio,
              ci.canvas.h * display_ratio
            ),
            (ctx.globalCompositeOperation = "destination-in"),
            // 이미지 크롭
            ctx.drawImage(
              self.mask,
              -1,
              -1,
              166 * display_ratio,
              184 * display_ratio
            ),
            // 이미지 합성
            (ctx.globalCompositeOperation = "source-over"),
            is_aedi == 1
              ? ctx.drawImage(
                  self.over_aedi,
                  0,
                  0,
                  166 * display_ratio,
                  184 * display_ratio
                )
              : ctx.drawImage(
                  self.over_aedi,
                  0,
                  0,
                  166 * display_ratio,
                  184 * display_ratio
                ),
            void 0 !== offset &&
              null != offset.width &&
              offset.width > 0 &&
              ((mm =
                (offset.width < 360 && offset.height < 200)
                    ? 0.6
                    : (offset.width * 0.4) / parseInt(canvas.style.width)) < 1
                ? window.location.hostname.includes('newspub.kr') ? self.resizeTo(canvas, mm * 0.8) : self.resizeTo(canvas, mm)
                : (mm = 1)),
            (ctx.globalCompositeOperation = "source-over"),
            "kr" == self.nation
              ? ctx.drawImage(self.ad, 97 * display_ratio - 8, 0)
              : ctx.drawImage(self.ad, 97 * display_ratio - 8, 0);
        };
      }

      if (self.mask.complete && self.over.complete) {
        setImageOnload();
      } else {
        // 이미지 로딩이 늦어져 mask, over 이미지가 미로딩 상태인 case
        // interval을 통해 mask, over 이미지가 로딩될 때까지 interval로 체크
        const interval = setInterval(function () {
          if (!self.mask.complete || !self.over.complete) return;

          clearInterval(interval);
          setImageOnload();
        }, 100);
      }

      img.src = img_url;
      if(self.tracking_log()){
        if (imp_url) imp.src = imp_url + '&u=' + self.uid;
        imp2_url = imp2_url || null;
        if (imp2_url) {
          var imp2 = new Image();
          imp2.src = imp2_url + '&u=' + self.uid;
        }
        pv_imp_url = pv_imp_url || null;
        //새로고침 할때마다 호출 됩니다(24-07-17 확인)
        if (self.is_pv === false && pv_imp_url !== null) {
          var pv_imp = new Image();
          pv_imp.src = pv_imp_url + '&u=' + self.uid;
          self.is_pv = true;
        }
      }
    },
    // 브랜드 엣지 광고 소재 생성
    logo_edge_Thumb: function (
      img_url,
      logo_url,
      imp_url,
      canvas,
      offset,
      abf_info,
      abf_logo,
      display_ratio,
      imp2_url,
      pv_imp_url,
      is_aedi = 0
    ) {
      var self = this;
      var img = new Image();
      var imp = new Image();

      // 이미지 전체크기
      var canvasWidth = 166;
      var canvasHeight = 184;

      // 해상도 체크( 모바일 해상도 배수 값)
      var devicePixelRatioValue = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * devicePixelRatioValue * display_ratio;
      canvas.height = canvasHeight * devicePixelRatioValue * display_ratio;

      var ctx = canvas.getContext("2d");

      function processABFInfo(abf_info, w1, h1, devicePixelRatioValue, display_ratio, ctx, canvas) {
        if (abf_info === null || abf_info === undefined) {
          abf_info = {
            status: "S",
            color: [
                [255, 255, 255],
                [255, 255, 255]
            ],
            lt_point: [20, 20],
            padded_rb_point: [335, 400],
            resize_ratio: 0.40625
          };
        }
        if (abf_info.status === 'S') {
          const ci = self.getCanvasParam(
            this.width,
            {
              pos1: {
                x: abf_info.lt_point[0],
                y: abf_info.lt_point[1],
              },
              pos2: {
                x: abf_info.padded_rb_point[0],
                y: abf_info.padded_rb_point[1],
              },
              ratio: abf_info.resize_ratio,
            },
            {
              width: w1,
              height: h1,
              dpr: devicePixelRatioValue,
            }
          );

          // Define background color for the top right (upper half)
          ctx.fillStyle = `rgb(${abf_info.color[0][0]}, ${abf_info.color[0][1]}, ${abf_info.color[0][2]})`;
          ctx.fillRect(0, 0, 136 * display_ratio, (166 * display_ratio) / 2);

          // Define background color for the bottom left (lower half)
          ctx.fillStyle = `rgb(${abf_info.color[1][0]}, ${abf_info.color[1][1]}, ${abf_info.color[1][2]})`;
          ctx.fillRect(0, 83, 136 * display_ratio, 166 * display_ratio);

          // Define the actual display size in the style
          canvas.style.width = `${166 * display_ratio}px`;
          canvas.style.height = `${184 * display_ratio}px`;

          return ci; // Return the ci object to use in setImageOnload
        }
      }

      function setImageOnload(abf_info_to_use) {
        img.onload = function () {
          // 초기화
          ctx.setTransform(1, 0, 0, 1, 0, 0); // 스케일을 초기화
          ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 지우기
          navigator.platform &&
                (0 > self.filter.indexOf(navigator.platform.toLowerCase())
                  ? (canvas.setAttribute(
                      "class",
                      "aedi-brand-product-mobile"
                    ))
                  : (canvas.setAttribute("class", "aedi-brand-product")));
          ctx.scale(devicePixelRatioValue, devicePixelRatioValue);
          var els = document.querySelectorAll(".pxButton");
          for (var x = 0; x < els.length; x++) els[x].style.display = "";
          var w1 = this.width,
            h1 = this.height,
            w0 = 136 * display_ratio,
            h0 = 166 * display_ratio,
            _w1 = (h1 / 176) * w0,
            _h1 = (h1 / 176) * h0,
            t = 0,
            l = 0;
          h1 > _h1 && (t = (h1 - _h1) / 1.75), w1 > _w1 && (l = (w1 - _w1) / 1);

          var ci = {
            crop: {
              x: l,
              y: t,
              w: w1 - l,
              h: h1 - t,
            },
            canvas: {
              x: 0,
              y: 0,
              w: w0,
              h: h0,
            },
          };

          // ABF 정보를 처리하는 함수 호출
          var abfCi = processABFInfo(abf_info_to_use, w1, h1, devicePixelRatioValue, display_ratio, ctx, canvas);
          if (abfCi) {
            ci = abfCi;
          }

          // 이미지 로드
          ctx.drawImage(
            img,
            ci.crop.x,
            ci.crop.y,
            ci.crop.w,
            ci.crop.h,
            ci.canvas.x * display_ratio,
            ci.canvas.y * display_ratio,
            ci.canvas.w * display_ratio,
            ci.canvas.h * display_ratio
          ),
          (ctx.globalCompositeOperation = "destination-in"),
          // 이미지 크롭
          ctx.drawImage(
            self.mask,
            -1,
            -1,
            166 * display_ratio,
            184 * display_ratio
          ),
          // 이미지 합성
          (ctx.globalCompositeOperation = "source-over"),
          is_aedi == 1
            ? ctx.drawImage(
                self.over_aedi,
                0,
                0,
                166 * display_ratio,
                184 * display_ratio
              )
            : ctx.drawImage(
                self.over_aedi,
                0,
                0,
                166 * display_ratio,
                184 * display_ratio
              ),
          void 0 !== offset &&
            null != offset.width &&
            offset.width > 0 &&
            ((mm =
              (offset.width < 360 && offset.height < 200)
                  ? 0.6
                  : (offset.width * 0.4) / parseInt(canvas.style.width)) < 1
              ? self.resizeTo(canvas, mm)
              : (mm = 1)),
          (ctx.globalCompositeOperation = "source-over"),
          "kr" == self.nation
            ? ctx.drawImage(self.ad, 97 * display_ratio - 8, 0)
            : ctx.drawImage(self.ad, 97 * display_ratio - 8, 0);
        };
      }

      if (self.mask.complete && self.over.complete) {
        canvas.removeAttribute("class")
        // 초기에 첫 번째 이미지 로드
        setImageOnload(abf_logo);
      } else {
        // 이미지 로딩이 늦어져 mask, over 이미지가 미로딩 상태인 case
        // interval을 통해 mask, over 이미지가 로딩될 때까지 interval로 체크
        const interval = setInterval(function () {
          if (!self.mask.complete || !self.over.complete){
            return;
          } 

          clearInterval(interval);
          // 초기에 첫 번째 이미지 로드
          setImageOnload(abf_logo);
        }, 100);
      }

      img.src = logo_url;

      var canvasParent = canvas.closest('.aedi-link');
      var canvasButton = canvas.nextElementSibling.nextElementSibling;

      function startImageRotationLoop() {
        // 1. 로고 1초간 보이기
        canvasParent.style.visibility = "visible";
        img.src = logo_url;
        setImageOnload(abf_logo);

        setTimeout(() => {
          // 2. 상품 5초간 보이기
          img.src = img_url;
          setImageOnload(abf_info);

          setTimeout(() => {
            // 3. 1초간 아무것도 안 보이기
            canvasParent.style.visibility = "hidden";
            canvasButton.style.visibility = "visible";

            setTimeout(() => {
              // 4. 다시 반복
              startImageRotationLoop();
            }, 1000); // 1초간 숨김
          }, 4000); // 5초간 상품
        }, 1000); // 1초간 로고
      }
    

      if (self.mask.complete && self.over.complete && canvas) {
        startImageRotationLoop();
      }


      if(self.tracking_log()){
        if (imp_url) imp.src = imp_url + '&u=' + self.uid;
        imp2_url = imp2_url || null;
        if (imp2_url) {
          var imp2 = new Image();
          imp2.src = imp2_url + '&u=' + self.uid;
        }
        pv_imp_url = pv_imp_url || null;
        //새로고침 할때마다 호출 됩니다(24-07-17 확인)
        if (self.is_pv === false && pv_imp_url !== null) {
          var pv_imp = new Image();
          pv_imp.src = pv_imp_url + '&u=' + self.uid;
          self.is_pv = true;
        }
      }
    },
    // 매칭광고 안보이기
    adHide: function (t) {
      void 0 !== this.canvas[t] && (this.canvas[t].style.display = "none");
    },
    // 매칭광고 보이기
    adShow: function (t) {
      void 0 !== this.canvas[t] && (this.canvas[t].style.display = "");
    },
    // 매칭광고종료
    adClose: function (t) {
      void 0 !== this.link[t] &&
        (clearInterval(this.interval[t]),
        this.canvas[t].remove(),
        this.link[t].remove(),
        delete this.interval[t],
        delete this.canvas[t],
        delete this.link[t]);
    },
    // 매칭광고 안보이기
    adHideAll: function () {
      var t = this;
      Object.keys(t.link).forEach(function (e) {
        t.adHide(e);
      });
    },
    // 매칭광고 보이기
    adShowAll: function () {
      var t = this;
      Object.keys(t.link).forEach(function (e) {
        t.adShow(e);
      });
    },
    // 매칭광고종료
    adCloseAll: function () {
      var t = this;
      Object.keys(t.link).forEach(function (e) {
        t.adClose(e);
      });
      seen.length = 0;
    },
    adOpen2:function(api_key, imgSt, dateSt, img_cap = null){
      self.is_apikey = api_key;
      self.is_imgSelect = imgSt;
      self.is_writingTime = dateSt;

      var is_img = document.querySelectorAll(imgSt);
      console.log(imgSt);
      
      console.log(is_img);
      
      var is_date = document.querySelector(dateSt).content;

      this.adOpen(self.is_apikey, is_img, is_date, img_cap = null)
    },
    // 매칭광고시작
    adOpen: function (api_key, img, date, img_cap = null) {
      if (img?.length == 0) {
        return;
      }

      window.aedi_api_key += "," + api_key;

      date = void 0 !== date ? date : "skip";
      var attr = void 0 !== attr ? attr : "src";
      var self = this;
      var title =
        null !== document.querySelector("meta[property='og:title']")
          ? document.querySelector("meta[property='og:title']").outerHTML.split('content="')[1].replace(/\"|\=|\>/g,'')
          : null !== document.querySelector("title")
          ? document.querySelector("title").innerText
          : "";
      if(window.location.hostname.includes('fannstar')){
        title = document.querySelector('.articleTitle').innerText;
      }
      if(window.location.hostname.includes('stoo')){
        title = document.querySelector('#newstitle').innerText;
      }
      var referer = top.location.href;
      var s = {
        "1641aa11b09b9ad3b9aef5099cc570d5": 440847,
        "7b290ea88cd2b39e4357dce2b26b69c8": 440848,
        ef77215951ccdd7ee937d75f9186633a: 440849,
        ea8c8b90dbfc0d14651f8df66995ab13: 440850,
        "6fa8d277f1df39363c606a7f55a3f7da": 440851,
      };

      var imgLength = img.length;
      var APIURL =
        "https://magic." +
        self.baseUrl +
        "/" +
        self.ai_version +
        "/post_log?api_key=" +
        api_key +
        "&title=" +
        encodeURIComponent(title) +
        "&referer=" +
        encodeURIComponent(referer) +
        "&images=" +
        imgLength;
      loadJSONP(APIURL, function (api_key) {});

      if (typeof jQuery === undefined) {
        if (void 0 !== api_key && void 0 !== img) {
          if (!(void 0 !== imgLength && imgLength > 0))
            return self.adCreate(api_key, img, attr, date, img_cap);
          if ("kr" !== self.nation) c = imgLength > 3 ? 3 : imgLength;
          for (var d = 0; d < imgLength; d++) {
            if (img_cap == null)
              img[d] && self.adCreate(api_key, img[d], attr, date, img_cap);
            else
              img[d] &&
                self.adCreate(api_key, img[d], attr, date, img_cap, img_cap[d]);
          }
        }
      } else {
        if ("kr" !== self.nation)
          // china, forec to limit 3 ad request...
          c = imgLength > 3 ? 3 : imgLength;

        if (imgLength === undefined) {
          img && self.adCreate(api_key, img, attr, date, img_cap);
        } else {
          for (var d = 0; d < imgLength; d++) {
            if (img_cap == null)
              img[d] && self.adCreate(api_key, img[d], attr, date, img_cap);
            else
              img[d] &&
                self.adCreate(api_key, img[d], attr, date, img_cap, img_cap[d]);
          }
        }
        window.addEventListener("message", function (msg) {
          if (typeof msg.data == "string") {
            if (msg.data.indexOf("-AD-OPEN") > -1) {
              var ad_id = msg.data.replace("-AD-OPEN", "");
              document.getElementById("aedi-div-" + ad_id).style.display = "";
            } else if (msg.data.indexOf("-AD-CLOSE") > -1) {
              var ad_id = msg.data.replace("-AD-CLOSE", "");
              if (document.getElementById("aedi-div-" + ad_id) !== undefined)
                document.getElementById("aedi-div-" + ad_id).remove();
            }
          }
          // else { if (t.data.indexOf('-AD-CLOSE')) t.data == r + "-AD-CLOSE" && document.getElementById("aedi-div-" + r).remove(); }
        });
      }

      function injectScript(path, callback) {
        var newScript = document.createElement("script");
        newScript.src = path;
        newScript.type = "text/javascript";
        document.body.appendChild(newScript);

        newScript.onload = callback;
      }

      var setCookie = function (name, value, hour) {
        var date = new Date();
        date.setTime(date.getTime() + hour * 60 * 60 * 1000);
        document.cookie =
          name +
          "=" +
          value +
          ";SameSite=None; Secure;expires=" +
          date.toUTCString() +
          ";";
      };

      // check finger print id....
      // if (!this.getCookie("psrfp")) {
      //   // polyfill 로딩 후 fingerprintJS 로딩
      //   injectScript(
      //     "https://fingerprint.aedi.ai/polyfill.min.js",
      //     function () {
      //       injectScript("https://fingerprint.aedi.ai", function () {
      //         var fpPromise = FingerprintJS.load();
      //         fpPromise
      //           .then(function (fp) {
      //             return fp.get();
      //           })
      //           .then(function (result) {
      //             var psrfp = result.visitorId;
      //             console.log(psrfp);
      //             setCookie("psrfp", psrfp, 90); // 3개월
      //           });
      //       });
      //     }
      //   );
      // }
    },
    isVisible: function (t) {
      return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
    },
    // ai : 수동 AI매칭, updown : 필러 위아래 템플릿, // left2right : 필러 좌우템플릿
    imgCrop: function (t, e, i, n, o, r, a, s) {
      var l = this,
        c = new Image();
      c.src = t;
      var d = window.devicePixelRatio || 1;
      if ("ai" == o) {
        var p = document.getElementById("aedi-div-" + n).children[2],
          h = p.getContext("2d");
        h.scale(d, d),
          (c.onload = function () {
            h.moveTo(125, 0),
              h.lineTo(166, 0),
              h.lineTo(166, 184),
              h.lineTo(0, 184),
              h.lineTo(0, 165),
              h.lineTo(125, 0),
              h.closePath(),
              h.clip(),
              h.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
              h.drawImage(l.over, 0, 0),
              (h.strokeStyle = "transparent"),
              h.stroke(),
              (h.fillStyle = "transparent"),
              h.fill();
          }),
          (p.width = p.width / d),
          (p.height = p.height / d);
      } else if ("updown" == o) {
        var u = (w = document.getElementById("aedi-div-" + n)
            .children[2]).getContext("2d"),
          g = (b = document.getElementById("aedi-div-" + n)
            .children[3]).getContext("2d"),
          m = (I = document.getElementById("aedi-div-" + n)
            .children[4]).getContext("2d"),
          f = (T = document.getElementById("aedi-div-" + n)
            .children[5]).getContext("2d"),
          v = document.getElementById("aedi-div-" + n).children[6],
          y = v.getContext("2d");
        u.scale(d, d),
          g.scale(d, d),
          m.scale(d, d),
          f.scale(d, d),
          y.scale(d, d),
          ((_ = new Array())[0] = new Image()),
          (_[0].src = "https://cdn2.aedi.ai/img/paper2_1.png"),
          (_[1] = new Image()),
          (_[1].src = "https://cdn2.aedi.ai/img/paper2_2.png"),
          (_[2] = new Image()),
          (_[2].src = "https://cdn2.aedi.ai/img/paper2_3.png"),
          (_[3] = new Image()),
          (_[3].src = "https://cdn2.aedi.ai/img/paper2_4.png");
        var k = 0;
        c.onload = function () {
          for (var t = 0; t < _.length; t++)
            _[t].onload = function () {
              if (++k == _.length) {
                var t = _[0],
                  n = _[1],
                  o = _[2],
                  l = _[3];
                u.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                  "pc" == s
                    ? (g.moveTo(126, 0),
                      g.lineTo(r, 0),
                      g.lineTo(r, a),
                      g.lineTo(0, a),
                      g.lineTo(0, 28),
                      g.lineTo(126, 0),
                      g.closePath(),
                      g.clip(),
                      g.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      g.drawImage(t, 0, 0, r, a),
                      (g.strokeStyle = "transparent"),
                      g.stroke(),
                      (g.fillStyle = "transparent"),
                      g.fill(),
                      m.moveTo(r, 24),
                      m.lineTo(r, a),
                      m.lineTo(0, a),
                      m.lineTo(0, 56),
                      m.lineTo(r, 24),
                      m.closePath(),
                      m.clip(),
                      m.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      m.drawImage(n, 0, 0, r, a),
                      (m.strokeStyle = "transparent"),
                      m.stroke(),
                      (m.fillStyle = "transparent"),
                      m.fill(),
                      f.moveTo(r, 50),
                      f.lineTo(r, a),
                      f.lineTo(0, a),
                      f.lineTo(0, 80),
                      f.lineTo(r, 50),
                      f.closePath(),
                      f.clip(),
                      f.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      f.drawImage(o, 0, 0, r, a),
                      (f.strokeStyle = "transparent"),
                      f.stroke(),
                      (f.fillStyle = "transparent"),
                      f.fill(),
                      y.moveTo(r, 105),
                      y.lineTo(r, a),
                      y.lineTo(0, a),
                      y.lineTo(0, 136),
                      y.lineTo(r, 105),
                      y.closePath(),
                      y.clip(),
                      y.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      y.drawImage(l, 0, 0, r, a),
                      (y.strokeStyle = "transparent"),
                      y.stroke(),
                      (y.fillStyle = "transparent"),
                      y.fill())
                    : (g.moveTo(115, 0),
                      g.lineTo(r, 0),
                      g.lineTo(r, a),
                      g.lineTo(0, a),
                      g.lineTo(0, 22),
                      g.lineTo(115, 0),
                      g.closePath(),
                      g.clip(),
                      g.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      g.drawImage(t, 0, 0, r, a),
                      (g.strokeStyle = "transparent"),
                      g.stroke(),
                      (g.fillStyle = "transparent"),
                      g.fill(),
                      m.moveTo(r, 20),
                      m.lineTo(r, a),
                      m.lineTo(0, a),
                      m.lineTo(0, 47),
                      m.lineTo(r, 20),
                      m.closePath(),
                      m.clip(),
                      m.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      m.drawImage(n, 0, 0, r, a),
                      (m.strokeStyle = "transparent"),
                      m.stroke(),
                      (m.fillStyle = "transparent"),
                      m.fill(),
                      f.moveTo(r, 40),
                      f.lineTo(r, a),
                      f.lineTo(0, a),
                      f.lineTo(0, 64),
                      f.lineTo(r, 40),
                      f.closePath(),
                      f.clip(),
                      f.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      f.drawImage(o, 0, 0, r, a),
                      (f.strokeStyle = "transparent"),
                      f.stroke(),
                      (f.fillStyle = "transparent"),
                      f.fill(),
                      y.moveTo(r, 85),
                      y.lineTo(r, a),
                      y.lineTo(0, a),
                      y.lineTo(0, 111),
                      y.lineTo(r, 85),
                      y.closePath(),
                      y.clip(),
                      y.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      y.drawImage(l, 0, 0, r, a),
                      (y.strokeStyle = "transparent"),
                      y.stroke(),
                      (y.fillStyle = "transparent"),
                      y.fill());
              }
            };
          (w.width = b.width / d),
            (w.height = b.height / d),
            (b.width = b.width / d),
            (b.height = b.height / d),
            (I.width = I.width / d),
            (I.height = I.height / d),
            (T.width = T.width / d),
            (T.height = T.height / d),
            (v.width = v.width / d),
            (v.height = v.height / d);
        };
      } else if ("left2right" == o) {
        var w = document.getElementById("aedi-div-" + n).children[2],
          b = document.getElementById("aedi-div-" + n).children[3],
          I = document.getElementById("aedi-div-" + n).children[4],
          T = document.getElementById("aedi-div-" + n).children[5];
        (u = w.getContext("2d")),
          (g = b.getContext("2d")),
          (m = I.getContext("2d")),
          (f = T.getContext("2d"));
        u.scale(d, d), g.scale(d, d), m.scale(d, d), f.scale(d, d);
        var _ = new Array();
        k = 0;
        (_[0] = new Image()),
          (_[1] = new Image()),
          (_[2] = new Image()),
          "pc" == s
            ? ((_[0].src = "https://cdn2.aedi.ai/img/01-ad-fold-165.png"),
              (_[1].src = "https://cdn2.aedi.ai/img/02-ad-fold-165.png"),
              (_[2].src = "https://cdn2.aedi.ai/img/03-ad-fold-165.png"))
            : ((_[0].src = "https://cdn2.aedi.ai/img/01-ad-fold-132.png"),
              (_[1].src = "https://cdn2.aedi.ai/img/02-ad-fold-132.png"),
              (_[2].src = "https://cdn2.aedi.ai/img/03-ad-fold-132.png")),
          (c.onload = function () {
            for (var t = 0; t < _.length; t++)
              _[t].onload = function () {
                if (++k == _.length) {
                  var t = _[0],
                    n = _[1],
                    o = _[2];
                  "pc" == s
                    ? (u.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      g.moveTo(30, 0),
                      g.lineTo(r, 0),
                      g.lineTo(r, a),
                      g.lineTo(0, a),
                      g.lineTo(0, 122),
                      g.lineTo(30, 0),
                      g.closePath(),
                      g.clip(),
                      g.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      g.drawImage(t, 0, 0, r, a),
                      (g.strokeStyle = "transparent"),
                      g.stroke(),
                      (g.fillStyle = "transparent"),
                      g.fill(),
                      m.moveTo(96, 0),
                      m.lineTo(r, 0),
                      m.lineTo(r, a),
                      m.lineTo(65, a),
                      m.lineTo(96, 0),
                      m.closePath(),
                      m.clip(),
                      m.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      m.drawImage(n, 0, 0, r, a),
                      (m.strokeStyle = "transparent"),
                      m.stroke(),
                      (m.fillStyle = "transparent"),
                      m.fill(),
                      f.moveTo(126, 0),
                      f.lineTo(r, 0),
                      f.lineTo(r, a),
                      f.lineTo(97, a),
                      f.lineTo(126, 0),
                      f.closePath(),
                      f.clip(),
                      f.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      f.drawImage(o, 0, 0, r, a),
                      (f.strokeStyle = "transparent"),
                      f.stroke(),
                      (f.fillStyle = "transparent"),
                      f.fill())
                    : (u.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      g.moveTo(23, 0),
                      g.lineTo(r, 0),
                      g.lineTo(r, a),
                      g.lineTo(0, a),
                      g.lineTo(0, 97),
                      g.lineTo(23, 0),
                      g.closePath(),
                      g.clip(),
                      g.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      g.drawImage(t, 0, 0, r, a),
                      (g.strokeStyle = "transparent"),
                      g.stroke(),
                      (g.fillStyle = "transparent"),
                      g.fill(),
                      m.moveTo(77, 0),
                      m.lineTo(r, 0),
                      m.lineTo(r, a),
                      m.lineTo(52, a),
                      m.lineTo(77, 0),
                      m.closePath(),
                      m.clip(),
                      m.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      m.drawImage(n, 0, 0, r, a),
                      (m.strokeStyle = "transparent"),
                      m.stroke(),
                      (m.fillStyle = "transparent"),
                      m.fill(),
                      f.moveTo(102, 0),
                      f.lineTo(r, 0),
                      f.lineTo(r, a),
                      f.lineTo(78, a),
                      f.lineTo(102, 0),
                      f.closePath(),
                      f.clip(),
                      f.drawImage(c, 0, 0, c.width, c.height, 0, 0, e, i),
                      f.drawImage(o, 0, 0, r, a),
                      (f.strokeStyle = "transparent"),
                      f.stroke(),
                      (f.fillStyle = "transparent"),
                      f.fill());
                }
              };
            (w.width = b.width / d),
              (w.height = b.height / d),
              (b.width = b.width / d),
              (b.height = b.height / d),
              (I.width = I.width / d),
              (I.height = I.height / d),
              (T.width = T.width / d),
              (T.height = T.height / d);
          });
      }
    },
    // img, attr, date
    adCreate: function (api_key, img, attr, date, img_cap, cap = null) {
      var self = this;
      var r = "ad_" + self.adCnt++;

      // if(img.width < 200 || img.height < 200) {
      //   if(seen.indexOf(img) > -1 ){
      //     return -1;
      //   }else {
      //     seen.push(img);
      //   }
      // }
      function get_query(url = '') {
        if (url == '') url = document.location.href;
        var qs = url.substring(url.indexOf('?') + 1).split('&');
        for (var i = 0, result = {}; i < qs.length; i++) {
          qs[i] = qs[i].split('=');
          if (qs[i][0] == '') continue;
          result[qs[i][0]] = decodeURIComponent(qs[i][1]);
        }
        return result;
      }
      
      s_params = get_query();
      if (seen[api_key] === undefined) seen[api_key] = new Array();
      if (seen[api_key].indexOf(img) > -1) {
        return -1;
      } else {
        seen[api_key].push(img);
      }

      setTimeout(() => {
        seen[api_key] = seen[api_key].filter(image => img !== image); // 엣지가 사라지는 경우 다시 나타날 수 있도록
      },1000)

      if (img.classList)
        for (var a = 0; a < img.classList.length; a++) {
          ('LAZY' == img.classList[a].toUpperCase() ||
            'post-image' == img.classList[a] ||
            'LOZAD' == img.classList[a].toUpperCase() ||
            'LAZYLOAD' == img.classList[a].toUpperCase() ||
            'LAZYLOADED' == img.classList[a].toUpperCase() ||
            img.src.includes('noimage')) &&
            (attr = 'data-src');
            img.src.includes('thumbnail_default.jpg') &&
            (attr = 'data-src');
          if (img.src.includes('data:image')) {
            attr = 'data-lazy-src';
          }
        }
        
        if(window.location.hostname.includes('ytn.co.kr') && !img.getAttribute(attr)){
          attr = 'data-src'
        }
      var s = img.getAttribute(attr);
      if (s == null && attr == "data-src")
        s = img.getAttribute("data-original"); //newspic
      if (s == null && attr == "data-src") s = img.getAttribute("data-src"); //newspic
      null == s && "src" !== attr && (s = img.getAttribute("src"));
      // _next/image?url= 형태의 URL에서 실제 이미지 URL 추출
      if (s && s.includes('_next/image?url=')) {
        try {
          var urlParams = new URLSearchParams(s.split('?')[1]);
          var realUrl = urlParams.get('url');
          if (realUrl) {
            s = realUrl;
          }
        } catch (e) {}
      }
      
      var aedi_cpgn = "";
      if (s_params['aedi_cpgn'] !== undefined) aedi_cpgn = s_params['aedi_cpgn'];
      
      var alt = img.getAttribute('alt') ? img.getAttribute('alt'): "";
      var l =
          null !== document.querySelector("meta[property='og:title']")
            ? document.querySelector("meta[property='og:title']").outerHTML.split('content="')[1].replace(/\"|\=|\>/g,'')
            : null !== document.querySelector("title")
            ? document.querySelector("title").innerText
            : "";
        if(window.location.hostname.includes('fannstar')){
          l = document.querySelector('.articleTitle').innerText;
        }
        if(window.location.hostname.includes('stoo')){
          l = document.querySelector('#newstitle').innerText;
        }
        c = top.location.href,
        url =
          "https://magic." +
          self.baseUrl +
          "/" +
          self.ai_version +
          "/get_ad?api_key=" +
          api_key +
          "&content_url=" +
          encodeURIComponent(s) +
          "&title=" +
          encodeURIComponent(l) +
          "&referer=" +
          encodeURIComponent(c) +
          "&write=" +
          encodeURIComponent(date) +
          "&aedi_cpgn=" + 
          encodeURIComponent(aedi_cpgn) +
          "&u=" +
          self.uid +
          "&alt=" + 
          encodeURIComponent(alt) + 
          "&mb_id=" +
          encodeURIComponent(self.mb_id) +
          "&ad_id=" +
          encodeURIComponent(r) +
          "&size=" +
          img.clientWidth +
          "x" +
          img.clientHeight;

      var psrfp = this.getCookie("psrfp");
      if (psrfp) url += "&fp=" + psrfp;
      function lozad_ad(responseJson) {
        console.log('[AEDI] lozad_ad called for:', r, responseJson);
        // ABF 및 광고 응답 정보를 aedi 객체에 저장
        if (responseJson.data) {
          // 저장소가 없으면 초기화
          if (!self.abfData) self.abfData = {};
          if (!self.adResponseData) self.adResponseData = {};

          if (responseJson.data.abf_info) {
            self.abfData[r] = responseJson.data.abf_info;
          }
          self.adResponseData[r] = {
            img_url: responseJson.data.img_url,
            imp_url: responseJson.data.imp_url,
            imp2_url: responseJson.data.imp2_url,
            pv_imp_url: responseJson.data.pv_imp_url,
            resize_ratio: responseJson.data.resize_ratio || 1,
            is_aedi: responseJson.data.is_aedi || 0,
            p_box: responseJson.data.p_box || null
          };
          console.log('[AEDI] Data saved - abfData:', self.abfData[r], 'adResponseData:', self.adResponseData[r]);
          // AediAgent에도 동기화
          if (typeof window.AediAgent !== 'undefined') {
            window.AediAgent.abfData[r] = self.abfData[r];
            window.AediAgent.adResponseData[r] = self.adResponseData[r];
            window.AediAgent.log && window.AediAgent.log('Data stored for ' + r);
          }
        }

        if (img.classList.contains('lozad')) {
          if (void 0 !== self.canvas[r]) {
            var n = self.offset3(img),
              a = img.getAttribute('aedi-z-index');
            a && (self.canvas[r].style.zIndex = a),
              self.adThumb(
                responseJson.data.img_url,
                responseJson.data.imp_url,
                self.canvas[r],
                n,
                responseJson.data.abf_info,
                responseJson.data.resize_ratio ? responseJson.data.resize_ratio : 1,
                responseJson.data.imp2_url,
                responseJson.data.pv_imp_url,
                responseJson.data.is_aedi,
                responseJson.data.p_box || null
              );
          }
        } else {
          lozad(img, {
            threshold: 0.1,
            load: function (i) {
              if (void 0 !== self.canvas[r]) {
                var n = self.offset3(img),
                  a = img.getAttribute('aedi-z-index');
                a && (self.canvas[r].style.zIndex = a)
                if(responseJson.data?.template === "LOGO_EDGE"){
                  self.logo_edge_Thumb(
                    responseJson.data.img_url,
                    responseJson.data?.logo_url,
                    responseJson.data.imp_url,
                    self.canvas[r],
                    n,
                    responseJson.data.abf_info,
                    responseJson.data?.abf_logo,
                    responseJson.data.resize_ratio ? responseJson.data.resize_ratio : 1,
                    responseJson.data.imp2_url,
                    responseJson.data.pv_imp_url,
                    responseJson.data.is_aedi
                  );
                }else{
                  self.adThumb(
                    responseJson.data.img_url,
                    responseJson.data.imp_url,
                    self.canvas[r],
                    n,
                    responseJson.data.abf_info,
                    responseJson.data.resize_ratio ? responseJson.data.resize_ratio : 1,
                    responseJson.data.imp2_url,
                    responseJson.data.pv_imp_url,
                    responseJson.data.is_aedi,
                    responseJson.data.p_box || null
                  );
                }
              }
            },
          }).observe();
        }
      }

      async function doubleShow(el, index, responseJson) {
        if (void 0 !== self.canvas[index]) {
          var n = self.offset3(img),
            a = img.getAttribute("aedi-z-index");
          a && (self.canvas[index].style.zIndex = a),
            await self.adThumb(
              el.img_url,
              el.imp_url,
              self.canvas[index],
              n,
              el.abf_info,
              el.resize_ratio ? el.resize_ratio : 1,
              el.imp2_url,
              responseJson.data.pv_imp_url,
              responseJson.data.is_aedi,
              el.p_box || responseJson.data.p_box || null
            );
        } else {
          reject(new Error("Canvas not found"));
        }
      }

      function showCanvasAD(responseJson) {
        // ABF 및 광고 응답 정보를 aedi 객체에 저장
        if (responseJson.data) {
          // 저장소가 없으면 초기화
          if (!self.abfData) self.abfData = {};
          if (!self.adResponseData) self.adResponseData = {};

          if (responseJson.data.abf_info) {
            self.abfData[r] = responseJson.data.abf_info;
          }
          self.adResponseData[r] = {
            img_url: responseJson.data.img_url,
            imp_url: responseJson.data.imp_url,
            imp2_url: responseJson.data.imp2_url,
            pv_imp_url: responseJson.data.pv_imp_url,
            resize_ratio: responseJson.data.resize_ratio || 1,
            is_aedi: responseJson.data.is_aedi || 0,
            p_box: responseJson.data.p_box || null
          };
          // AediAgent에도 동기화
          if (typeof window.AediAgent !== 'undefined') {
            window.AediAgent.abfData[r] = self.abfData[r];
            window.AediAgent.adResponseData[r] = self.adResponseData[r];
            window.AediAgent.log && window.AediAgent.log('Data stored for ' + r);
          }
        }

        // if( img.width > 0 && img.width < 200 ) {
        //   if(seen.indexOf(img) > -1 ){
        //     return -1;
        //   }else {
        //     seen.push(img);
        //   }
        // }
        if (responseJson.data.ext_script) {
          var cj_script = responseJson.data.ext_script;
          var cj_function = new Function(cj_script);

          cj_function();
        }
        if (
          "queue transfer success" != responseJson.msg &&
          "queue" != responseJson.code
        )
          if (
            void 0 !== responseJson.status &&
            "SUCCESS" == responseJson.status &&
            img.width > 0
          )
            img.removeAttribute("data-loaded"),
              responseJson.data.img_url.indexOf(".gif") > -1 &&
                ((responseJson.data.abf_info.status = "S"),
                (responseJson.data.abf_info.color = [
                  [255, 255, 255],
                  [255, 255, 255],
                ]),
                (responseJson.data.abf_info.lt_point = [20, 20]),
                (responseJson.data.abf_info.padded_rb_point = [335, 400]),
                (responseJson.data.abf_info.resize_ratio = 0.40625)),
              (self.canvas[r] = document.createElement("canvas")),
              (self.canvas[r].style.display = "none"),
              (self.canvas[r].style.zIndex = responseJson.data.zIndex),
              (self.link[r] = document.createElement("a")),
              (self.link[r].style.position = "static"),
              self.link[r].setAttribute("class", "aedi-link"),
              self.link[r].setAttribute("data-aedi-page-url", location.href),
              (self.link[r].target = "_blank"),
              self.link[r].addEventListener("touchend", touchEvent, false),
              self.link[r].setAttribute(
                "sensibility",
                responseJson.data.sensibility
              ),
              (self.link[r].style.zIndex = responseJson.data.zIndex),
              navigator.platform &&
                (0 > self.filter.indexOf(navigator.platform.toLowerCase())
                  ? (self.canvas[r].setAttribute(
                      "class",
                      "aedi-product-mobile"
                    ),
                    (self.link[r].href =
                      responseJson.data.click_url + "&u=" + self.uid + "&ma=" + responseJson.data?.matching))
                  : (self.canvas[r].setAttribute("class", "aedi-product"),
                    (self.link[r].href =
                      responseJson.data.click_url + "&u=" + self.uid + "&ma=" + responseJson.data?.matching))),
              responseJson.data.img_url.indexOf(".gif") > -1
                ? null
                : self.link[r].appendChild(self.canvas[r]), // draw canvas
              (self.ad_link[r] = document.createElement("a")),
              (self.ad_link[r].target = "_blank"),
              "aedi.ai" == self.baseUrl
                ? (self.ad_link[r].href = "https://www.aedi.ai")
                : (self.ad_link[r].href = "https://www." + self.baseUrl),
              self.ad_link[r].setAttribute("class", "aedi-home"),
              self.ad_link[r].setAttribute("aria-label", "aedi ai-ad platform"),
              self.link[r].appendChild(self.ad_link[r]),
              (f = document.createElement("div")),
              f.setAttribute("class", "pxButton"),
              f.setAttribute(
                "style",
                "display:none;z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;"
              ),
              (f.innerHTML = "<span style='color:#fff;'>X</span>"),
              (f.style.zIndex = responseJson.data.zIndex),
              (f.onclick = function (e) {
                e.preventDefault();
                e.target.closest(".aedi-link").remove();
                e.target.remove();
                // $(this).parents('.aedi-link').remove();
                // $(this).remove();
              }),
              (responseJson.data.img_url.indexOf(".gif") > -1 &&
                navigator.appName == "Netscape" &&
                navigator.userAgent.toLowerCase().indexOf("trident") != -1) ||
              navigator.userAgent.toLowerCase().indexOf("msie") != -1
                ? null
                : self.link[r].appendChild(f),
              responseJson.data.img_url.indexOf(".gif") == -1
                ? self.link[r].appendChild(f)
                : null,
              (c = document.createElement("div")),
              (adImg = document.createElement("div")),
              adImg.setAttribute("id", "aedi-container"),
              adImg.style.zIndex = responseJson.data.zIndex,
              (m = document.createElement("div")),
              (m.id = "aedi-over"),
              navigator.platform &&
                (0 > self.filter.indexOf(navigator.platform.toLowerCase())
                  ? (c.setAttribute("class", "aedi-product-mobile"), // 모바일
                    adImg.setAttribute(
                      "style",
                      "width:" +
                        136 * responseJson.data.resize_ratio +
                        "px;height:" +
                        154 * responseJson.data.resize_ratio +
                        "px;position:absolute;background-size:cover;background-repeat:no-repeat;"
                    ),
                    (adImg.style.clipPath =
                      "polygon(0px 0px, " +
                      106 * responseJson.data.resize_ratio +
                      "px 0px, " +
                      95 * responseJson.data.resize_ratio +
                      "px " +
                      10 * responseJson.data.resize_ratio +
                      "px,0px " +
                      138 * responseJson.data.resize_ratio +
                      "px)"),
                    m.setAttribute(
                      "style",
                      "width:" +
                        136 * responseJson.data.resize_ratio +
                        "px;height:" +
                        154 * responseJson.data.resize_ratio +
                        "px;position:absolute;background-size:contain;background-repeat:no-repeat;pointer-events:none;"
                    ))
                  : (c.setAttribute("class", "aedi-product"), // PC
                    adImg.setAttribute(
                      "style",
                      "width:" +
                        166 * responseJson.data.resize_ratio +
                        "px;height:" +
                        184 * responseJson.data.resize_ratio +
                        "px;position:absolute;background-size:cover;background-repeat:no-repeat;"
                    ),
                    (adImg.style.clipPath =
                      "polygon(0px 0px, " +
                      130 * responseJson.data.resize_ratio +
                      "px 0px, " +
                      116 * responseJson.data.resize_ratio +
                      "px " +
                      10 * responseJson.data.resize_ratio +
                      "px,0px " +
                      170 * responseJson.data.resize_ratio +
                      "px)"),
                    m.setAttribute(
                      "style",
                      "width:" +
                        166 * responseJson.data.resize_ratio +
                        "px;height:" +
                        184 * responseJson.data.resize_ratio +
                        "px;position:absolute;background-size:contain;background-repeat:no-repeat;"
                    ))),
                    c.style.zIndex = responseJson.data.zIndex,
              (adImg.style.backgroundImage =
                'url("' + responseJson.data.img_url + '")'),
              (m.style.backgroundImage = 'url("' + self.over_aedi.src + '")'),
              c.appendChild(adImg),
              c.appendChild(m),
              responseJson.data.img_url.indexOf(".gif") > -1 &&
              !(
                (navigator.appName == "Netscape" &&
                  navigator.userAgent.toLowerCase().indexOf("trident") != -1) ||
                navigator.userAgent.toLowerCase().indexOf("msie") != -1
              )
                ? self.link[r].appendChild(c)
                : null, // draw container only .gif image
              document.body.appendChild(self.link[r]),
              (self.interval[r] = setInterval(function () {
                var t = self.offset3(img);
                
                if (img.complete && self.isVisible(img)) {
                  if (
                    ((self.canvas[r].style.left = t.left + "px"),
                    (self.canvas[r].style.top = t.top + "px"),
                    (self.canvas[r].style.display = ""),
                    "kr" == self.nation)
                  ) {
                    var i = self.canvas[r].style.width;
                    var j = 16;
                    i = parseInt(i, 10) / 2;
                    
                    self.ad_link[r].style.left = t.left + i + + 5 +"px";
                    self.ad_link[r].style.top = t.top + "px";
                    self.ad_link[r].style.display = "";
                    f.style.left = t.left + "px";
                    f.style.top = t.top - j + "px";
                    c.style.left = t.left - 1 + "px";
                    c.style.top = t.top - 1 + "px";
                  }
                } else (self.canvas[r].style.display = "none"), "kr" == self.nation && (self.ad_link[r].style.display = "none");
              }, 100)),
              loadPrequired(),
             
              lozad_ad(responseJson);
          else if (
            void 0 !== responseJson.status &&
            "FILLER_AD" == responseJson.status &&
            parseInt(r.split("_")[1]) < self.maxFillerCnt
          ) {
            var i = window.devicePixelRatio || 1,
              n = responseJson.data.iframe_src,
              a = responseJson.data.iframe_width,
              l = responseJson.data.iframe_height,
              c = responseJson.data.template,
              d = "pc";
            // 수동 AI
            if ("kr" == self.nation || null == self.nation) {
              img.removeAttribute("data-loaded");
              var p = document.createElement("div");
              if (
                ((p.id = "aedi-div-" + r), (p.style.zIndex = 101), "ai" == c)
              ) {
                var h = "166",
                  u = "184";
                (p.innerHTML =
                  '<iframe id="' +
                  r.split(".")[0] +
                  '" class="aedi-iframe" src="' +
                  n +
                  '" width="' +
                  a +
                  '" height="' +
                  l +
                  '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" style="opacity:0;"></iframe>'),
                  ((f = document.createElement("div")).id = "aedi-div-" + r),
                  f.setAttribute("class", "pxButton"),
                  f.setAttribute(
                    "style",
                    "z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;display:none"
                  ),
                  (f.style.zIndex = 99999),
                  (f.innerHTML = "<span>X</span>"),
                  (f.onclick = function () {
                    document
                      .querySelector("div[id='aedi-div-" + r + "']")
                      .remove();
                  }),
                  p.appendChild(f);
                for (var g = 1, m = 1; m <= g; m++) {
                  ((v = document.createElement("canvas")).id = "aedi-ai-" + m),
                    (v.className = "aedi-ai-ad-" + r.split(".")[0]),
                    (v.width = h * i),
                    (v.height = u * i),
                    v.setAttribute(
                      "style",
                      "z-index:2;pointer-events:none;position:absolute;left:0px;opacity:0"
                    ),
                    p.appendChild(v);
                }
              }
              // left2right , updown
              else {
                if (150 == a)
                  if ("updown" == c) (h = "165"), (u = "188");
                  else (h = "165"), (u = "150");
                else if (120 == a) {
                  if ("updown" == c) (h = "131"), (u = "152");
                  else (h = "132"), (u = "120");
                  d = "mobile";
                }
                var f;
                // updown
                if (
                  ((p.innerHTML =
                    '<iframe id="' +
                    r.split(".")[0] +
                    '" class="aedi-iframe" src="' +
                    n +
                    '" width="' +
                    a +
                    '" height="' +
                    l +
                    '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" style="opacity:0;"></iframe>'),
                  ((f = document.createElement("div")).id = "aedi-div-" + r),
                  f.setAttribute("class", "pxButton"),
                  f.setAttribute(
                    "style",
                    "z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;display:none"
                  ),
                  (f.style.zIndex = 99999),
                  (f.innerHTML = "<span>X</span>"),
                  (f.onclick = function () {
                    document
                      .querySelector("div[id='aedi-div-" + r + "']")
                      .remove();
                  }),
                  p.appendChild(f),
                  "updown" == c)
                )
                  g = 4;
                // left2right
                else if ("left2right" == c) g = 3;

                if (
                  responseJson.fillerCover == undefined ||
                  responseJson.fillerCover == "T"
                ) {
                  for (m = 0; m <= g; m++) {
                    var v;
                    ((v = document.createElement("canvas")).id =
                      "aedi-paper-" + m),
                      (v.className = "aedi-net-ad-" + r.split(".")[0]),
                      (v.width = h * i),
                      (v.height = u * i),
                      v.setAttribute(
                        "style",
                        "z-index:2;pointer-events:none;position:absolute;left:0px;display:none"
                      );
                    p.appendChild(v);
                  }
                }
              }
              document.body.appendChild(p);

              if (
                responseJson.fillerCover == undefined ||
                responseJson.fillerCover == "T"
              ) {
                var y = setInterval(function () {
                  img.complete &&
                    self.isVisible(img) &&
                    (self.imgCrop(s, img.width, img.height, r, c, h, u, d),
                    clearInterval(y));
                }, 100);
              }

              window.addEventListener("message", function (t) {
                if (typeof t.data == "string") {
                  // console.log(t.data.indexOf('-DSP-AD-CLOSE'), t.data.indexOf('-AD-CLOSE'), t.data.indexOf('-AD-OPEN'))
                  if (t.data.indexOf("-DSP-ADDCLASS") > -1) {
                    document.getElementById(
                      "aedi-div-" + t.data.split("-")[0]
                    ).className = t.data.split("-")[1];
                  } else if (t.data.indexOf("-AD-OPEN") > -1) {
                    t.data == r + "-AD-OPEN" &&
                      iframeloaded(c, r.split(".")[0]);
                  } else if (t.data.indexOf("-DSP-AD-CLOSE") > -1) {
                    document.querySelector("." + t.data.split("-")[0]).remove();
                  } else {
                    if (t.data.indexOf("-AD-CLOSE"))
                      t.data == r + "-AD-CLOSE" &&
                        document.getElementById("aedi-div-" + r).remove();
                  }
                }
              });
              var k = document.getElementById("aedi-div-" + r);
              (k.style.position = "absolute"),
                (self.interval[r] = setInterval(function () {
                  var t = self.offset3(img);
                  img.complete &&
                    self.isVisible(img) &&
                    ((k.style.left = t.left + "px"),
                    (k.style.top = t.top + "px"));
                }, 100));
            }
          }
      }
      
      function showCanvasDoubleAD(responseJson, el, index = r) {
        var c_index = r + index;
        if (
          "queue transfer success" != responseJson.msg &&
          "queue" != responseJson.code
        )
          if (
            void 0 !== responseJson.status &&
            "SUCCESS" == responseJson.status &&
            img.width > 0 &&
            responseJson.data
          ) {
            img.removeAttribute("data-loaded"),
              el.img_url.indexOf(".gif") > -1 &&
                ((el.abf_info.status = "S"),
                (el.abf_info.color = [
                  [255, 255, 255],
                  [255, 255, 255],
                ]),
                (el.abf_info.lt_point = [20, 20]),
                (el.abf_info.padded_rb_point = [335, 400]),
                (el.abf_info.resize_ratio = 0.40625)),
              (self.canvas[c_index] = document.createElement("canvas")),
              (self.canvas[c_index].style.display = "none"),
              (self.canvas[c_index].style.zIndex = responseJson.data.zIndex),
              (self.link[r] = document.createElement("a")),
              (self.link[r].style.position = "static"),
              self.link[r].setAttribute("class", `aedi-link` + r),
              self.link[r].setAttribute("data-aedi-page-url", location.href),
              (self.link[r].target = "_blank"),
              self.link[r].addEventListener("touchend", touchEvent, false),
              self.link[r].setAttribute(
                "sensibility",
                responseJson.data.sensibility
              ),
              (self.link[r].style.zIndex = responseJson.data.zIndex),
              navigator.platform &&
                (0 > self.filter.indexOf(navigator.platform.toLowerCase())
                  ? (self.canvas[c_index].setAttribute(
                      "class",
                      responseJson.data.cnt == 1
                        ? "aedi-product-mobile"
                        : "aedi-double-product-mobile"
                    ),
                    (self.link[r].href = el.click_url + "&u=" + self.uid + "&ma=" + responseJson.data?.matching))
                  : (self.canvas[c_index].setAttribute(
                      "class",
                      responseJson.data.cnt == 1
                        ? "aedi-product"
                        : "aedi-double-product"
                    ),
                    (self.link[r].href = el.click_url + "&u=" + self.uid + "&ma=" + responseJson.data?.matching))),
              self.link[r].appendChild(self.canvas[c_index]), // draw canvas
              (self.ad_link[r] = document.createElement("a")),
              (self.ad_link[r].target = "_blank"),
              "aedi.ai" == self.baseUrl
                ? (self.ad_link[r].href = "https://www.aedi.ai")
                : (self.ad_link[r].href = "https://www." + self.baseUrl),
              self.ad_link[r].setAttribute("class", "aedi-home"),
              self.ad_link[r].setAttribute("aria-label", "aedi ai-ad platform"),
              self.link[r].appendChild(self.ad_link[r]),
              (f = document.createElement("div")),
              f.setAttribute("class", "pxButton"),
              f.setAttribute(
                "style",
                "display:none;z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;"
              ),
              (f.innerHTML = "<span style='color:#fff;'>X</span>"),
              (f.style.zIndex = responseJson.data.zIndex),
              (f.onclick = function (e) {
                e.preventDefault();
                var elements = document.querySelectorAll(`.aedi-link` + r);
                elements.forEach(function (element) {
                  element.remove();
                });
                e.target.remove();
                // e.target.closest(`.aedi-link`+r).remove();
                // $(this).parents('.aedi-link').remove();
                // $(this).remove();
              }),
              // (el.img_url.indexOf('.gif') > -1 && (navigator.appName == 'Netscape' && navigator.userAgent.toLowerCase().indexOf('trident') != -1) || (navigator.userAgent.toLowerCase().indexOf("msie") != -1)) ? null : self.link[r].appendChild(f),
              el.img_url.indexOf('.gif') == -1
                ? self.link[r].appendChild(f)
                : null,
              (c = document.createElement('div')),
              (adImg = document.createElement('div')),
              adImg.setAttribute("id", "aedi-container"),
              adImg.style.zIndex = responseJson.data.zIndex,
              (m = document.createElement("div")),
              (m.id = "aedi-over"),
              navigator.platform &&
                (0 > self.filter.indexOf(navigator.platform.toLowerCase())
                  ? (c.setAttribute(
                      "class",
                      responseJson.data.cnt == 1
                        ? "aedi-product-mobile"
                        : "aedi-double-product-mobile"
                    ), // 모바일
                    adImg.setAttribute(
                      "style",
                      "width:" +
                        136 * responseJson.data.resize_ratio +
                        "px;height:" +
                        154 * responseJson.data.resize_ratio +
                        "px;position:absolute;background-size:cover;background-repeat:no-repeat;"
                    ),
                    (adImg.style.clipPath =
                      "polygon(0px 0px, " +
                      106 * responseJson.data.resize_ratio +
                      "px 0px, " +
                      95 * responseJson.data.resize_ratio +
                      "px " +
                      10 * responseJson.data.resize_ratio +
                      "px,0px " +
                      138 * responseJson.data.resize_ratio +
                      "px)"),
                    m.setAttribute(
                      "style",
                      "width:" +
                        136 * responseJson.data.resize_ratio +
                        "px;height:" +
                        154 * responseJson.data.resize_ratio +
                        "px;position:absolute;background-size:contain;background-repeat:no-repeat;pointer-events:none;"
                    ))
                  : (c.setAttribute(
                      "class",
                      responseJson.data.cnt == 1
                        ? "aedi-product"
                        : "aedi-double-product"
                    ), // PC
                    adImg.setAttribute(
                      "style",
                      "width:" +
                        166 * responseJson.data.resize_ratio +
                        "px;height:" +
                        184 * responseJson.data.resize_ratio +
                        "px;position:absolute;background-size:cover;background-repeat:no-repeat;"
                    ),
                    (adImg.style.clipPath =
                      "polygon(0px 0px, " +
                      130 * responseJson.data.resize_ratio +
                      "px 0px, " +
                      116 * responseJson.data.resize_ratio +
                      "px " +
                      10 * responseJson.data.resize_ratio +
                      "px,0px " +
                      170 * responseJson.data.resize_ratio +
                      "px)"),
                    m.setAttribute(
                      "style",
                      "width:" +
                        166 * responseJson.data.resize_ratio +
                        "px;height:" +
                        184 * responseJson.data.resize_ratio +
                        "px;position:absolute;background-size:contain;background-repeat:no-repeat;pointer-events:none;"
                    ))),
                    c.style.zIndex = responseJson.data.zIndex,
              (adImg.style.backgroundImage = 'url("' + el.img_url + '")'),
              (m.style.backgroundImage = 'url("' + self.over_aedi.src + '")'),
              c.appendChild(adImg),
              c.appendChild(m),
              el.img_url.indexOf(".gif") > -1 &&
              !(
                (navigator.appName == "Netscape" &&
                  navigator.userAgent.toLowerCase().indexOf("trident") != -1) ||
                navigator.userAgent.toLowerCase().indexOf("msie") != -1
              )
                ? self.link[r].appendChild(c)
                : null, // draw container only .gif image
              document.body.appendChild(self.link[r]),
              (self.interval[c_index] = setInterval(function () {
                var t = self.offset3(img);
                if (img.complete && self.isVisible(img)) {
                  if (
                    ((self.canvas[c_index].style.left = t.left + "px"),
                    (self.canvas[c_index].style.top = t.top + "px"),
                    (self.canvas[c_index].style.display = ""),
                    "kr" == self.nation)
                  ) {
                    var i = self.canvas[c_index].style.width;
                    var j = 16;
                    i = parseInt(i, 10) / 2;
                    self.ad_link[r].style.left = t.left + 100 + "px";
                    self.ad_link[r].style.top = t.top + "px";
                    self.ad_link[r].style.display = "";
                    f.style.left = t.left + "px";
                    f.style.top = t.top - j + "px";
                    c.style.left = t.left - 1 + "px";
                    c.style.top = t.top - 1 + "px";
                  }
                } else (self.canvas[c_index].style.display = "none"), "kr" == self.nation && (self.ad_link[r].style.display = "none");
              }, 100)),
              loadPrequired(),
              doubleShow(el, c_index, responseJson);
            return self.link[r];
          } else if (
            void 0 !== responseJson.status &&
            "FILLER_AD" == responseJson.status &&
            parseInt(r.split("_")[1]) < self.maxFillerCnt
          ) {
            var i = window.devicePixelRatio || 1,
              n = responseJson.data.iframe_src,
              a = responseJson.data.iframe_width,
              l = responseJson.data.iframe_height,
              c = responseJson.data.template,
              d = "pc";
            // 수동 AI
            if ("kr" == self.nation || null == self.nation) {
              img.removeAttribute("data-loaded");
              var p = document.createElement("div");
              if (
                ((p.id = "aedi-div-" + r), (p.style.zIndex = 101), "ai" == c)
              ) {
                var h = "166",
                  u = "184";
                (p.innerHTML =
                  '<iframe id="' +
                  r.split(".")[0] +
                  '" class="aedi-iframe" src="' +
                  n +
                  '" width="' +
                  a +
                  '" height="' +
                  l +
                  '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" style="opacity:0;"></iframe>'),
                  ((f = document.createElement("div")).id = "aedi-div-" + r),
                  f.setAttribute("class", "pxButton"),
                  f.setAttribute(
                    "style",
                    "z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;display:none"
                  ),
                  (f.style.zIndex = 99999),
                  (f.innerHTML = "<span>X</span>"),
                  (f.onclick = function () {
                    document
                      .querySelector("div[id='aedi-div-" + r + "']")
                      .remove();
                  }),
                  p.appendChild(f);
                for (var g = 1, m = 1; m <= g; m++) {
                  ((v = document.createElement("canvas")).id = "aedi-ai-" + m),
                    (v.className = "aedi-ai-ad-" + r.split(".")[0]),
                    (v.width = h * i),
                    (v.height = u * i),
                    v.setAttribute(
                      "style",
                      "z-index:2;pointer-events:none;position:absolute;left:0px;opacity:0"
                    ),
                    p.appendChild(v);
                }
              }
              // left2right , updown
              else {
                if (150 == a)
                  if ("updown" == c) (h = "165"), (u = "188");
                  else (h = "165"), (u = "150");
                else if (120 == a) {
                  if ("updown" == c) (h = "131"), (u = "152");
                  else (h = "132"), (u = "120");
                  d = "mobile";
                }
                var f;
                // updown
                if (
                  ((p.innerHTML =
                    '<iframe id="' +
                    r.split(".")[0] +
                    '" class="aedi-iframe" src="' +
                    n +
                    '" width="' +
                    a +
                    '" height="' +
                    l +
                    '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" style="opacity:0;"></iframe>'),
                  ((f = document.createElement("div")).id = "aedi-div-" + r),
                  f.setAttribute("class", "pxButton"),
                  f.setAttribute(
                    "style",
                    "z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;display:none"
                  ),
                  (f.style.zIndex = 99999),
                  (f.innerHTML = "<span>X</span>"),
                  (f.onclick = function () {
                    document
                      .querySelector("div[id='aedi-div-" + r + "']")
                      .remove();
                  }),
                  p.appendChild(f),
                  "updown" == c)
                )
                  g = 4;
                // left2right
                else if ("left2right" == c) g = 3;

                if (
                  responseJson.fillerCover == undefined ||
                  responseJson.fillerCover == "T"
                ) {
                  for (m = 0; m <= g; m++) {
                    var v;
                    ((v = document.createElement("canvas")).id =
                      "aedi-paper-" + m),
                      (v.className = "aedi-net-ad-" + r.split(".")[0]),
                      (v.width = h * i),
                      (v.height = u * i),
                      v.setAttribute(
                        "style",
                        "z-index:2;pointer-events:none;position:absolute;left:0px;display:none"
                      );
                    p.appendChild(v);
                  }
                }
              }
              document.body.appendChild(p);

              if (
                responseJson.fillerCover == undefined ||
                responseJson.fillerCover == "T"
              ) {
                var y = setInterval(function () {
                  img.complete &&
                    self.isVisible(img) &&
                    (self.imgCrop(s, img.width, img.height, r, c, h, u, d),
                    clearInterval(y));
                }, 100);
              }

              window.addEventListener("message", function (t) {
                if (typeof t.data == "string") {
                  // console.log(t.data.indexOf('-DSP-AD-CLOSE'), t.data.indexOf('-AD-CLOSE'), t.data.indexOf('-AD-OPEN'))
                  if (t.data.indexOf("-DSP-ADDCLASS") > -1) {
                    document.getElementById(
                      "aedi-div-" + t.data.split("-")[0]
                    ).className = t.data.split("-")[1];
                  } else if (t.data.indexOf("-AD-OPEN") > -1) {
                    t.data == r + "-AD-OPEN" &&
                      iframeloaded(c, r.split(".")[0]);
                  } else if (t.data.indexOf("-DSP-AD-CLOSE") > -1) {
                    document.querySelector("." + t.data.split("-")[0]).remove();
                  } else {
                    if (t.data.indexOf("-AD-CLOSE"))
                      t.data == r + "-AD-CLOSE" &&
                        document.getElementById("aedi-div-" + r).remove();
                  }
                }
              });
              var k = document.getElementById("aedi-div-" + r);
              (k.style.position = "absolute"),
                (self.interval[index] = setInterval(function () {
                  var t = self.offset3(img);
                  img.complete &&
                    self.isVisible(img) &&
                    ((k.style.left = t.left + "px"),
                    (k.style.top = t.top + "px"));
                }, 100));
            }
          }          
      } 
      function showAD(url) {        
        // console.log(location.host);
        return (
          loadJSONP(url, function (responseJson) {
            if (!responseJson || responseJson.length == 0) return;
            if(responseJson.template === "bott_edge"){
              bottedge(img,responseJson.data.ad_html)
            }
            if( responseJson && responseJson.cover) {
              // console.log("cover action start");
              var ifr = document.createElement("iframe");
              ifr.src = responseJson.cover;
              ifr.className = "genco";
              ifr.style = "display:none;";
              setInterval(aecle, 4000, ifr.className);
              img.before(ifr);              
            }
            if (
              responseJson.template !== undefined &&
              responseJson.template === "secretbox"
            ) {
              show_secret_box(responseJson);
              // page view 로그는 한번만 남긴다.
              pv_imp_url = responseJson.data.pv_imp_url;
              if (self.is_pv === false) {
                var pv_imp = new Image();
                pv_imp.src = pv_imp_url + "&u=" + self.uid;
                self.is_pv = true;
              }
            } 
            else if (
              responseJson.ver !== undefined &&
              responseJson.template === "DOUBLE_EDGE"
            ) {
              if (responseJson.data.cnt) {
                async function processAds() {
                  for (var index = 0; index < responseJson.data.cnt; index++) {
                    var el = responseJson.data.product[index];
                    showCanvasDoubleAD(responseJson, el, index);
                  }
                }
                processAds(responseJson);
              } else {
                showCanvasAD(responseJson);
              }
            }else if (responseJson.ver !== undefined && responseJson.ver === '2') {
              var imageOffsetTop = img.offsetTop;
              var imageOffsetLeft = img.offsetLeft;
              // addiv.setAttribute("style", "width: " + resp.data.width + "px; z-index: 1; padding: 0; cursor: pointer;position: absolute;text-align: center;overflow: visible; margin:" + newsImageMargin + "; top:" + imageOffsetTop + "px; left:" + imageOffsetLeft + "px;"),

              // var imgrect = img.getBoundingClientRect();
              img.parentNode.style.position = "static";
              var addiv = document.createElement("div");
              var newsImageMargin = window
                .getComputedStyle(img)
                .getPropertyValue("margin");
              addiv.id = "aedi-div-" + r;
              addiv.setAttribute("class", "pxButton");
              addiv.setAttribute(
                "style",
                "width: " +
                  responseJson.data.width +
                  "px !important; height: 160px; z-index: 1; padding: 0; cursor: pointer;position: absolute;text-align: center;overflow: visible; margin:" +
                  newsImageMargin +
                  ";top: " + img.offsetTop + "px"
              ),
                addiv.setAttribute("marginwidth", "0");
              addiv.setAttribute("marginheight", "0");
              addiv.style.zIndex = responseJson.data.zIndex;
              // 이미지를 감싸는 컨테이너가 이미지보다 더 클 경우 계산 후 margin 추가
              // var imgMarginValue = (imgrect.left - img.parentNode.offsetLeft ) / 2;
              // console.log("ad div = " + r + " margin1 =" + img.parentNode.offsetLeft  + "img offset =" + imgrect.left + "parentwidth="  + img.parentNode.offsetWidth + ", imgwidth = " + img.offsetWidth);
              // addiv.style.left = imgMarginValue + "px";

              // addiv.style.left = imageOffsetLeft;
              // addiv.style.top = imageOffsetTop;

              // if (img.offsetWidth < img.parentNode.offsetWidth) {
              //   var imgMarginValue = (img.parentNode.offsetWidth - img.offsetWidth ) / 2;
              //   addiv.style.left = imgMarginValue + "px";
              // }

              // // 이미지가 컨테이너보다 더 클 경우 계산
              // if (img.offsetWidth > img.parentNode.offsetWidth) {
              //    var imgMarginValue = (img.offsetWidth - img.parentNode.offsetWidth) / 2;
              //    addiv.style.left = imgMarginValue + "px";
              // }
              addiv.innerHTML =
                '<div style="width: 18px !important;height: 18px;background-color: #A9AEAF;color: white;font-size: 16px;font-weight: 600;text-align: center;line-height: 16px;margin: 0;cursor: pointer;display: inline-block; position: absolute; top: -16px; left:' +
                responseJson.left +
                '";>X</div>';
              addiv.onclick = function () {
                document.querySelector("div[id='aedi-div-" + r + "']").remove();
              };

              var adframe = document.createElement("iframe");
              adframe.src = responseJson.data.src;
              adframe.width = responseJson.data.width;
              adframe.height = responseJson.data.height;
              adframe.setAttribute(
                "style",
                "position: relative;left: 0; top: 0; margin: 0; padding: 0; left:" +
                  responseJson.left +
                  "; width:" +
                  responseJson.data.width +
                  "px; height:" +
                  responseJson.data.height +
                  "px;"
              );
              adframe.setAttribute("frameborder", "0");
              adframe.setAttribute("scrolling", "no");
              adframe.setAttribute("marginwidth", "0");
              adframe.setAttribute("marginheight", "0");
              adframe.setAttribute("vspace", "0");
              adframe.setAttribute("hspace", "0");
              adframe.setAttribute("allowtransparency", "true");
              addiv.appendChild(adframe);
              img.before(addiv);

              // page view 로그는 한번만 남긴다.
              pv_imp_url = responseJson.pv_imp_url;
              if (self.is_pv === false) {
                var pv_imp = new Image();
                pv_imp.src = pv_imp_url + "&u=" + self.uid;
                self.is_pv = true;
              }
            } else if (
              responseJson.ver === undefined &&
              responseJson.status === "SUCCESS"
            ) {
    //           var responseJson = {
    //             "status": "SUCCESS",
    // "data": {
    //     "img_url": "//img1a.coupangcdn.com/image/vendor_inventory/6a70/91ea6fe320a8e4c4e86ac3884fd830a0846868b312d26807dfa3ca678c55.jpg",
    //     "imp_url": "",
    //     "imp2_url": "https://log.aedi.ai/log/log.php?k=%3DkUQ6AjO2cTN6I1SFZVSMpDM2ozVStkO2gTM1IDM2gzN48lM2EjO3YjNyoTZ2UDMiBTZ0QDZzQTMyMGN5UmYwITZykTMiFWZyczMkpTN4oDMwMjM&s=85&ad=AI",
    //     "pv_imp_url": "https://log.aedi.ai/log/log.php?k=%3DkUQ6AjO2cTN6I1SFZVSMpDM2ozVStkO2gTM1IDM2gzN48lM2EjO3YjNyoTZ2UDMiBTZ0QDZzQTMyMGN5UmYwITZykTMiFWZyczMkpTN4oDMwMjM&s=85&ad=AI&pv=1",
    //     "click_url": "https://cl.aedi.ai/v1/link?au=2667&fp=&ik=995968289.1758249920&k=%3DkUQ6AjO2cTN6I1SFZVSMpDM2ozVStkO2gTM1IDM2gzN48lM2EjO3YjNyoTZ2UDMiBTZ0QDZzQTMyMGN5UmYwITZykTMiFWZyczMkpTN4oDMwMjM&t=%3D%3DQbvNmLhVmcvt2c3VmbyFGdz5yd3dXPlNmc192c0ZSN40TbhJXYwJWdzZSaht2Ypx2YpBXPklmY1NnJwADMwADMwADMwADMwADMw0iM3ETLwYVPklWZjFmc0ZCO4gzN2kjNGFUPnFGdwxmJ2gTM1IDM2gzN40zZhR3YmYDOxUjMwYDO3gTP5V2SldWYw9DUENlRGF0LlJ3Lt92YucmbhBXdvNmLr5Was9yL6MHc0RHa&loc=aHR0cHM6Ly93d3cuc3Rhcm5ld3Nrb3JlYS5jb20vbXVzaWMvMjAyNS8wOS8xOS8yMDI1MDkxOTEwMjUzNDUzOTE1&ma=PM_FREE",
    //     "abf_info": {
    //         "class": "Outer",
    //         "color": [[248, 247, 245], [245, 244, 242]],
    //         "lt_point": [112, 161],
    //         "padded_rb_point": [519.7894736842105, 600],
    //         "resize_ratio": 0.3187919463087248,
    //         "status": "S",
    //         "statuscode": "210",
    //         "time": 0.2536888122558594,
    //         "img_key": "00fc19fd9a2a63b2346ad5d02156c1f6"
    //     },
    //     "resize_ratio": 1.14,
    //     "sensibility": "0.20",
    //     "serer_ip": "10.5.0.32",
    //     "zIndex": "10",
    //     "c_key": "d372eab192e20be94c2143d44e0b056e",
    //     "is_amber": 0,
    //     "is_aedi": 1,
    //     "campaign_id": "576",
    //     "au_id": "2667",
    //     "matching": "PM_FREE",
    //     "matching_history": "1)PM 2)SM 3)KM 4)PM_RPM 5)PM_FREE "
    // }
    //         };
            if (responseJson.data.cnt) {
              async function processAds() {
                var aedi_el = [];

                for (var index = 0; index < responseJson.data.cnt; index++) {
                  var el = responseJson.data.product[index];

                  aedi_el.push(showCanvasDoubleAD(responseJson, el, index));
                }

                if (responseJson.data.cnt > 1) {
                  aedi_el[0].style.display = "none";
                  setInterval(() => {
                    if (
                      window.getComputedStyle(aedi_el[0]).display !== "none"
                    ) {
                      aedi_el[0].style.display = "none";
                      if (aedi_el[1]) {
                        aedi_el[1].style.display = "block";
                      }
                    } else {
                      aedi_el[0].style.display = "block";
                      if (aedi_el[1]) {
                        aedi_el[1].style.display = "none";
                      }
                    }
                  }, 2500);
                  return;
                }
              }
              processAds(responseJson);
            } else {
                showCanvasAD(responseJson);
              }
            }
          }),
          r
        );
      }

      function get_cap_selector(img_parent, cap_selector) {
        // 패런트와 동일 레벨 엘리먼트 검색...
        var checker = img_parent;
        var i = 0;
        while (i++ < 3) {
          checker = checker.nextElementSibling;
          if (checker == null) break;
          for (var j = 0; j < cap_selector.length; j++) {
            if (checker == cap_selector[j]) {
              return cap_selector[j];
            }
          }
        }

        // 패런트의 차일드 엘리먼트 검색...
        for (i = 0; i < img_parent.childNodes.length; i++) {
          for (var j = 0; j < cap_selector.length; j++) {
            if (img_parent.childNodes[i] == cap_selector[j]) {
              console.log(cap_selector[j]);
              return cap_selector[j];
            }
          }
        }
        return null;
      }

      function aedi_secret_box(
        cap_selector,
        img_selector,
        ad_HTML,
        view_speed,
        pic_height,
        scroll_flag,
        img_cap_check,
        ad_minWith,
        ad_maxWith
      ) {
        //img_selector -> 해당 이미지 select
        //ad_HTML -> 템플릿
        //view_speed -> transition 속도 조절
        //pic_height -> secretbox 높이
        //scroll_flag -> Y 일때 스크롤 시 이벤트 발동

        if (cap === undefined) cap_selector = null;
        if (cap_selector == null) cap_selector = img_selector;
        else {
          if (img_cap_check) {
            var img_parent = img_selector.parentNode;
            cap_selector = get_cap_selector(img_parent, cap_selector);
            if (cap_selector == null) cap_selector = img_selector;
          } else {
            cap_selector = cap;
          }
        }

        //cap_selector = document.querySelector("div.news_bm table table");
        const aedi_box = cap_selector;
        const aedi_div = document.createElement("div");
        const aedi_wrap = document.createElement("div");
        const aedi_pos = document.createElement("div");
        const aedi_logoBox = document.createElement("div");
        const aedi_logoAD = document.createElement("a");
        const aedi_logoImg = new Image();
        aedi_logoImg.src = "https://cdn2.aedi.ai/common/img/aediAI_blue.png";
        aedi_logoImg.style.width = "auto !important";

        if (scroll_flag === "0") {
          var aedi_style =
            "position:relative; left:0; bottom:0; height:0px; border: 1px solid #ddd; z-index:100;";
        } else {
          var aedi_style =
            "position:absolute; left:0; bottom:0; height:0px; overflow:hidden; border: 1px solid #ddd; z-index:-1000";
          aedi_style = aedi_style + "transition: " + String(view_speed) + "s;";
          aedi_style =
            aedi_style + "transform:translateY(-" + String(pic_height) + "px);";
        }

        //bottom box wrapper
        aedi_pos.setAttribute("class", "pic_position");
        aedi_pos.setAttribute(
          "style",
          "position: relative; display:flex; justify-content:center"
        );

        aedi_wrap.setAttribute("class", "aedi_bottom_wrapper");
        aedi_wrap.setAttribute("id", "pbox_second");
        aedi_wrap.setAttribute(
          "style",
          "width:100%; min-width:(" +
            ad_minWith +
            "px); position:absolute; left:0; bottom:0; overflow:hidden; margin-top: 14px;z-index:-1000; height:0; transition: " +
            Number(view_speed) +
            "s; transform:translateY(-" +
            Number(pic_height) +
            "px);"
        );

        aedi_logoBox.setAttribute("class", "aedi_logo_box");
        aedi_logoBox.appendChild(aedi_logoAD);
        aedi_logoBox.setAttribute(
          "style",
          "width:100%; height:20px; display:flex; align-items:center; justify-content: flex-end; transition: " +
            Number(view_speed + 0.4) +
            "s; transform:translateY(-" +
            Number(pic_height) * 2 +
            "px);"
        );

        aedi_logoAD.setAttribute("href", "https://www.aedi.ai");
        aedi_logoAD.setAttribute("target", "_blank");
        aedi_logoAD.setAttribute("style", "margin-right:2px; height:100%; display: flex; align-items: center;");
        aedi_logoAD.appendChild(aedi_logoImg);

        aedi_div.setAttribute("class", "aedi_bottom");
        aedi_div.setAttribute(
          "style",
          "position:absolute; left:0; bottom:0; width:99.8%; height:86%; margin-bottom: 0; border: 1px solid #ddd; transition: " +
            Number(view_speed + 0.5) +
            "s; transform:translateY(-" +
            Number(pic_height) +
            "px);"
        );

        aedi_box.after(aedi_pos);
        aedi_wrap.appendChild(aedi_logoBox);
        aedi_wrap.appendChild(aedi_div);
        aedi_div.insertAdjacentHTML("beforeend", ad_HTML);
        aedi_pos.appendChild(aedi_wrap);

        const elbottom = aedi_wrap;
        const bottom_box = aedi_div;

        const aedi_box_create = function () {
          elbottom.classList.add("pic_height");
          bottom_box.classList.add("pic_trans");
          const pic_move = elbottom;
          const pic_trans = bottom_box;
          const bottomItem = bottom_box.getElementsByClassName(
            "prd_secretbox_wrapper"
          );

          if (pic_move !== null) {
            for (let i = 0; i < bottomItem.length; i++) {
              const pic_infoboxName =
                bottomItem[i].querySelector(".pic_infoboxName");
              const pic_infobox = bottomItem[i].querySelector(".pic_infobox");
              const pic_infoboxPrice =
                bottomItem[i].querySelector(".pic_price");
              if (pic_infobox) {
                pic_infobox.style.opacity = "0";
                pic_infobox.style.animationName = "aedi_fadeup";
                pic_infobox.style.animationDuration = "1.4s";
                pic_infobox.style.animationDelay = "1s";
                pic_infobox.style.animationTimingFunction = "ease";
                pic_infobox.style.animationFillMode = "forwards";
              }
              if (pic_infoboxName && pic_infobox && pic_infoboxPrice) {
                bottomItem[i].addEventListener("mouseover", function () {
                  pic_infobox.style.opacity = "1";
                  pic_infobox.style.animationName = "aedi_heightUp";
                  pic_infobox.style.transition = "1s";
                  pic_infobox.style.animationDuration = "0.5s";
                  pic_infobox.style.animationDelay = "0s";
                  pic_infobox.style.animationFillMode = "forwards";
                  pic_infoboxPrice.style.height = "68px";
                  pic_infoboxName.style.animationName = "aedi_heightUp";
                  pic_infoboxName.style.transition = "1s";
                  pic_infoboxName.style.animationDuration = "0.5s";
                  pic_infoboxName.style.animationDelay = "0s";
                  pic_infoboxName.style.animationTimingFunction = "ease";
                  pic_infoboxName.style.animationFillMode = "forwards";
                });
                bottomItem[i].addEventListener("mouseout", function () {
                  pic_infobox.style.opacity = "1";
                  pic_infobox.style.animationName = "aedi_InfoheightDown";
                  pic_infobox.style.transition = "1s";
                  pic_infobox.style.animationDuration = "0.5s";
                  pic_infobox.style.animationDelay = "0s";
                  pic_infobox.style.animationFillMode = "forwards";
                  pic_infoboxPrice.style.height = "26px";
                  pic_infoboxName.style.animationName = "aedi_heightDown";
                  pic_infoboxName.style.transition = "1s";
                  pic_infoboxName.style.animationDuration = "0.5s";
                  pic_infoboxName.style.animationDelay = "0s";
                  pic_infoboxName.style.animationTimingFunction = "ease";
                  pic_infoboxName.style.animationFillMode = "forwards";
                });
              }
            }
            pic_move.style.position = "relative";
            pic_move.style.minWidth = ad_minWith + "px";
            pic_move.style.transform = "translateY(0px)";
            pic_move.style.height = pic_height + "px";
            pic_move.style.zIndex = "1000";
            pic_move.style.maxWidth = ad_maxWith + "px";
            pic_trans.style.transform = "translateY(0px)";
            aedi_logoBox.style.transform = "translateY(0px)";
            bottomItem[bottomItem.length - 1].style.borderRight = "none";
          }
        };

        if (scroll_flag === "1") {
          onVisible(elbottom, aedi_box_create);
        } else {
          aedi_box_create();
        }
        function onVisible(element, callback) {
          new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
              if (entry.intersectionRatio > 0) {
                callback(element);
                observer.disconnect();
              }
            });
          }).observe(element);
        }
      }
      function bottedge(img, ad_HTML, overlapPx = 0) {
      const pictureEl = img.closest('picture');
      const anchor = pictureEl || img;
      const getW = () => img.getBoundingClientRect().width;

      function decideFrontW(w) { return w >= 600 ? 600 : 330; }

      function extractAdHeight(html) {
        try {
          const m = html.match(/window\.CFG\s*=\s*({[\s\S]*?});/);
          if (m) {
            const cfg = Function(`"use strict";return (${m[1]})`)();
            const adH = Number(cfg?.vars?.adH);
            const h   = Number(cfg?.vars?.h);
            return (Number.isFinite(adH) && adH > 0) ? adH
                : (Number.isFinite(h)   && h   > 0) ? h
                : 100;
          }
        } catch (_) {}
        return 100;
      }

      function normalizeAdHTML(html, outerW, frontW) {
        const hasHTML = /<\s*html[\s>]/i.test(html);
        const resetCSS = `
          <style>
            html, body {
              margin:0!important;
              padding:0!important;
              background:transparent!important;
              width:100%!important;
              height:100%!important;
              overflow:hidden!important;
            }
            body {
              position:relative!important;
            }
            .wrap, .ad-wrap {
              position:absolute!important;
              left:0!important;
              right:0!important;
              bottom:0!important;
              width:100%!important;
              display:block;
              min-height:0!important;
              padding:0!important;
              margin:0!important;
              background:transparent!important;
            }
            .wrap .ad, .ad-wrap .ad {
              margin:0!important;
            }
            .sub_bg {
              width:100%!important;
            }
            .ad {
              width:100%!important;
              max-width:${outerW}px!important;
              margin:0 auto!important;
            }
            .ad__front, .main_bg {
              width:${frontW}px!important;
              max-width:${frontW}px!important;
              margin:0 auto!important;
            }
          </style>
        `.trim();

        if (hasHTML) {
          if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, resetCSS + "\n</head>");
          return resetCSS + html;
        }
        return resetCSS + html;
      }

      // 고유 ID
      const frameId = 'bottedge-' + Math.random().toString(36).slice(2);

      // 래퍼 & 아이프레임 생성
      const iframe = document.createElement('iframe');
      iframe.className = 'bottedge-ad';
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('allowtransparency', 'true');
      iframe.setAttribute(
        'sandbox',
        'allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
      );
      iframe.dataset.frameId = frameId;
      iframe.name = frameId;

      const imgCS = getComputedStyle(img);
      const wrap = document.createElement('div');
      wrap.className = 'bottedge-ad-wrap';
      wrap.dataset.frameId = frameId;
      Object.assign(wrap.style, {
        overflow: 'visible',
        position: 'relative',
        display: 'block',
        width: getW() + 'px',
        marginLeft: imgCS.marginLeft,
        marginRight: imgCS.marginRight,
        marginTop: '0px',
        background: 'transparent',
      });

      Object.assign(iframe.style, {
        width: '100%',
        height: '0px',
        border: 'none',
        display: 'block',
        background: 'transparent',
        colorScheme: 'none',
      });

      const srcdocShell = `
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          html, body {
            margin:0; padding:0;
            width:100%; height:100%;
            background:transparent; overflow:hidden;
          }
        </style>
      `;

      // 상태 & 핸들 보관
      let ro = null;
      let resizeHandler = null;
      let isClosed = false;
      let injectedOnce = false;  // 🔴 HTML 한 번만 주입하기 위한 플래그

      // 닫기 핸들러 (메시지 수신)
      const onMessage = (e) => {
        const d = e && e.data;
        if (!d || d.type !== 'AEDI_BOTTEDGE_CLOSE' || d.id !== frameId) return;
        if (isClosed) return;
        isClosed = true;

        try { if (ro) ro.disconnect(); } catch {}
        if (resizeHandler) window.removeEventListener('resize', resizeHandler);
        window.removeEventListener('message', onMessage);

        iframe.style.height = '0px';
        wrap.style.marginTop = '0px';
        wrap.style.display = 'none';

        const adWrap = document.querySelector('.bottedge-ad-wrap');
        if (adWrap) {
          const iconOrigin = adWrap.parentElement.querySelector('.icon-origin');
          if (iconOrigin) {
            iconOrigin.style.bottom = '10px';
          }
        }

        try { iframe.srcdoc = '<!doctype html><title>closed</title>'; } catch {}

        try { wrap.remove(); }
        catch {
          if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
        }
      };
      window.addEventListener('message', onMessage);

      // DOM 삽입
      (anchor).insertAdjacentElement('afterend', wrap);
      wrap.appendChild(iframe);

      function updateBox() {
        if (isClosed) return;

        const outerW = getW();
        const frontW = decideFrontW(outerW);

        if (outerW > 0) wrap.style.width = outerW + 'px';

        const cs = getComputedStyle(img);
        wrap.style.marginLeft = cs.marginLeft;
        wrap.style.marginRight = cs.marginRight;

        const picCS2 = pictureEl ? getComputedStyle(pictureEl) : null;
        const imgMb2 = parseFloat(cs.marginBottom) || 0;
        const picMb2 = picCS2 ? (parseFloat(picCS2.marginBottom) || 0) : 0;
        const baseOffset = pictureEl ? 30 : 41;

        if (window.location.hostname.includes('dispatch')) {
          wrap.style.marginTop = '0px';
        } else {
          wrap.style.marginTop =
            (-(picMb2) - imgMb2 - baseOffset - (overlapPx || 0)) + 'px';
        }

        const adWrap = document.querySelector('.bottedge-ad-wrap');
        if (adWrap) {
          const iconOrigin = adWrap.parentElement.querySelector('.icon-origin');
          if (iconOrigin) {
            iconOrigin.style.bottom = '110px';
          }
        }

        const newH = extractAdHeight(ad_HTML);
        if (Number.isFinite(newH) && newH > 0 && iframe.style.height !== newH + 'px') {
          iframe.style.height = newH + 'px';
        }

        if (injectedOnce) {
          return; // 리사이즈 시에는 더 이상 srcdoc 재주입 X → PV 스크립트 재실행도 X
        }
        injectedOnce = true;

        const composed = srcdocShell + normalizeAdHTML(ad_HTML, outerW, frontW);
        const withFrameId = composed
          .replace(/(['"])__FRAME_ID__\1/g, `'${frameId}'`)
          .replace(/__FRAME_ID__/g, frameId);

        iframe.srcdoc = withFrameId;
      }

      if (!img.complete) {
        img.addEventListener('load', updateBox, { once: true });
      } else {
        updateBox();
      }

      if ('ResizeObserver' in window) {
        ro = new ResizeObserver(() => {
          if (!isClosed) updateBox();
        });
        ro.observe(img);
      } else {
        resizeHandler = () => {
          if (!isClosed) updateBox();
        };
        window.addEventListener('resize', resizeHandler);
      }
    }

      function show_secret_box(resp) {
        aedi_secret_box(
          img_cap,
          img,
          resp.data.ad_html,
          resp.data.speed,
          resp.data.height,
          resp.data.scroll,
          resp.data.img_cap_check,
          resp.data.ad_minWith,
          resp.data.ad_maxWith
        );
      }
      showAD(url);
    },
  };
  var touchEvent = function (e) {
    var self = this;
    if ((rand = Math.random()) < self.getAttribute("sensibility"))
      window.open(self.href, "_blank");
  };

  var touchEvent2 = function (elem, e) {
    var self = elem;
    if ((rand = Math.random()) < self.getAttribute("sensibility"))
      window.open(self.href, "_blank");
  };

  var iframeloaded = function (t, e) {
    switch (t) {
      case "ai":
        $(".pxButton").css("display", ""),
          $(".aedi-iframe#" + e).css("opacity", "1"),
          $(".aedi-ai-ad-" + e).css("opacity", "1");
        // ,
        // setInterval(function () {
        //   "none" == $(".aedi-ai-ad-" + e).css("display") ? ($(".aedi-iframe#" + e).css("opacity", "1"),
        //     $(".aedi-ai-ad-" + e).css("display", "")) : ($(".aedi-iframe#" + e).css("opacity", "0"),
        //       $(".aedi-ai-ad-" + e).css("display", "none"))
        // }, 2e3);
        break;
      case "left2right":
        var i = 0,
          n = 80,
          o = 100,
          r = 160;
        setInterval(function () {
          $(".pxButton").css("display", ""),
            $(".aedi-iframe").css("opacity", "1"),
            i == n + 1
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-3"]').css(
                  "display",
                  ""
                ))
              : i == n + 2
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-2"]').css(
                  "display",
                  ""
                ))
              : i == n + 3
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-1"]').css(
                  "display",
                  ""
                ))
              : i <= o && i > n + 3
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-0"]').css(
                  "display",
                  ""
                ))
              : i == o + 1
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-1"]').css(
                  "display",
                  ""
                ))
              : i == o + 2
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-2"]').css(
                  "display",
                  ""
                ))
              : ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-3"]').css(
                  "display",
                  ""
                )),
            ++i == r && (i = 0);
        }, 30);
        break;
      case "updown":
        (i = 0), (n = 80), (o = 100), (r = 160);
        setInterval(function () {
          $(".pxButton").css("display", ""),
            $(".aedi-iframe").css("opacity", "1"),
            i == n + 1
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-4"]').css(
                  "display",
                  ""
                ))
              : i == n + 2
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-3"]').css(
                  "display",
                  ""
                ))
              : i == n + 3
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-2"]').css(
                  "display",
                  ""
                ))
              : i == n + 4
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-1"]').css(
                  "display",
                  ""
                ))
              : i <= o && i > n + 4
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-0"]').css(
                  "display",
                  ""
                ))
              : i == o + 1
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-1"]').css(
                  "display",
                  ""
                ))
              : i == o + 2
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-2"]').css(
                  "display",
                  ""
                ))
              : i == o + 3
              ? ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-3"]').css(
                  "display",
                  ""
                ))
              : ($(".aedi-net-ad-" + e).css("display", "none"),
                $(".aedi-net-ad-" + e + '[id="aedi-paper-4"]').css(
                  "display",
                  ""
                )),
            ++i == r && (i = 0);
        }, 30);
        break;
    }
  };


  var aisum_previousUrl = location.href;  // 초기값을 현재 URL로 설정
  const aisum_observer = new MutationObserver(function () {
    
    var aisum_currentUrl = location.href.split('#')[0];
        
    if (aisum_previousUrl !== aisum_currentUrl) {
      aisum_previousUrl = aisum_currentUrl;
      // SPA 환경에서만 정리 로직 실행

        // URL의 해시(#)만 변경된 경우 제외       
        setTimeout(function () {
          if (typeof aedi !== 'undefined' && typeof aedi.adOpen2 === 'function') {
            console.log('[AEDI] Re-initializing ads after SPA navigation');
            window.aedi_api_key = "";
            aedi.adOpen2(self.is_apikey, self.is_imgSelect, self.is_writingTime, null, 0);
          }
        }, 500);


        console.log('[AEDI] SPA page changed from', aisum_previousUrl, 'to', location.href);

        // 기존 interval 정리
        if (typeof aedi !== 'undefined' && aedi.interval) {
          Object.keys(aedi.interval).forEach(function (key) {
            clearInterval(aedi.interval[key]);
            delete aedi.interval[key];
          });
          console.log('[AEDI] Cleared all intervals');
        }

        // 기존 canvas, link, ad_link 객체 정리
        if (typeof aedi !== 'undefined') {
          if (aedi.canvas) {
            Object.keys(aedi.canvas).forEach(function (key) {
              if (aedi.canvas[key] && aedi.canvas[key].remove) {
                aedi.canvas[key].remove();
              }
              delete aedi.canvas[key];
            });
          }
          if (aedi.link) {
            Object.keys(aedi.link).forEach(function (key) {
              if (aedi.link[key] && aedi.link[key].remove) {
                aedi.link[key].remove();
              }
              delete aedi.link[key];
            });
          }
          if (aedi.ad_link) {
            Object.keys(aedi.ad_link).forEach(function (key) {
              if (aedi.ad_link[key] && aedi.ad_link[key].remove) {
                aedi.ad_link[key].remove();
              }
              delete aedi.ad_link[key];
            });
          }
        }

        // 이전 페이지에서 생성된 광고만 삭제 (data-aedi-page-url 속성으로 구분)
        var aediLinks = document.querySelectorAll('[class^="aedi-link"]');
        aediLinks.forEach(function (link) {
          var linkUrl = link.getAttribute('data-aedi-page-url');
          // 현재 페이지 URL과 다른 경우에만 삭제
          if (linkUrl && linkUrl !== location.href) {
            console.log('[AEDI] Removing old ad from:', linkUrl);
            link.remove();
          } else if (!linkUrl) {
            // data-aedi-page-url 속성이 없는 이전 광고도 삭제
            console.log('[AEDI] Removing ad without page-url attribute');
            link.remove();
          }
        });

        // pxButton도 정리 (부모 aedi-link가 없는 경우)
        var divs = document.querySelectorAll('.pxButton');
        divs.forEach(function (div) {
          if (!div.closest('[class^="aedi-link"]')) {
            div.remove();
          }
        });
    }

  });
  const aisum_config = { subtree: true, childList: true };
  aisum_observer.observe(document, aisum_config);
}
//디스패치 시크릿배너 노출
const observer = new MutationObserver((mutationsList) => {
  if (window.location.hostname.includes('dispatch')) {
    for (const mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        // 추가된 노드가 .pic_position 또는 .icon-origin 인지 확인
        const isPicPosition = node.classList.contains('pic_position');
        const isIconOrigin = node.classList.contains('icon-origin');

        if (isPicPosition || isIconOrigin) {
          const parent = node.parentElement;
          if (!parent) continue;

          const picPosition = parent.querySelector('.pic_position');
          const iconOrigin = parent.querySelector('.icon-origin');

          if (picPosition && iconOrigin) {
            const currentBottom = parseFloat(window.getComputedStyle(iconOrigin).bottom) || 0;
            const addHeight = picPosition.offsetHeight;
            const newBottom = currentBottom + addHeight;

            // 이전 값을 저장해두기 (dataset 사용)
            iconOrigin.dataset.originalBottom = currentBottom;
            iconOrigin.style.bottom = `${newBottom}px`;

            // 닫기 버튼 클릭 이벤트 등록 (한 번만)
            const closeButton = picPosition.querySelector('.pxButton');
            if (closeButton && !closeButton.dataset.listenerAttached) {
              closeButton.dataset.listenerAttached = "true"; // 중복 방지

              closeButton.addEventListener('click', () => {
                const origin = parent.querySelector('.icon-origin');
                if (origin && origin.dataset.originalBottom !== undefined) {
                  origin.style.bottom = `${origin.dataset.originalBottom}px`;
                  delete origin.dataset.originalBottom; // 초기화
                }
              });
            }
          }
        }
      }
    }
  }
});

// 감시 시작
const target = document.body || document.documentElement; // body가 없으면 루트
observer.observe(target, { childList: true, subtree: true });