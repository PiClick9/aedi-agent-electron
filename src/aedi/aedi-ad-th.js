var aedi_once = true;
if (!window.aedi_script) {
  window.aedi_script = true;

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
                  type: 'characterData',
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
                              type: 'childList',
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
                              type: 'characterData',
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
                                  type: 'characterData',
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
                                -1 === (g = l(y, m, T, 'node'))
                                  ? s.c &&
                                    (e.push(
                                      i({
                                        type: 'childList',
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
                                        type: 'childList',
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
                      type: 'attributes',
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
                  type: 'attributes',
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
        var c = document.createElement('i');
        c.style.top = 0;
        var d = (c = 'null' != c.attributes.style.value)
            ? function (t, e) {
                return e.value;
              }
            : function (t, e) {
                return 'style' !== e.name ? e.value : t.style.cssText;
              },
          p = 1;
        return e;
      })(void 0)),
      (function (t, e) {
        'use strict';
        if (
          'IntersectionObserver' in t &&
          'IntersectionObserverEntry' in t &&
          'intersectionRatio' in t.IntersectionObserverEntry.prototype
        )
          'isIntersecting' in t.IntersectionObserverEntry.prototype ||
            Object.defineProperty(
              t.IntersectionObserverEntry.prototype,
              'isIntersecting',
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
                  throw new Error('target must be an Element');
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
                  if ('number' != typeof t || isNaN(t) || t < 0 || t > 1)
                    throw new Error(
                      'threshold must be a number between 0 and 1 inclusively'
                    );
                  return t !== i[e - 1];
                })
              );
            }),
            (o.prototype._parseRootMargin = function (t) {
              var e = (t || '0px').split(/\s+/).map(function (t) {
                var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                if (!e)
                  throw new Error(
                    'rootMargin must be specified in pixels or percent'
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
                  : (r(t, 'resize', this._checkForIntersections, !0),
                    r(e, 'scroll', this._checkForIntersections, !0),
                    this.USE_MUTATION_OBSERVER &&
                      'MutationObserver' in t &&
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
                a(t, 'resize', this._checkForIntersections, !0),
                a(e, 'scroll', this._checkForIntersections, !0),
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
              if ('none' != t.getComputedStyle(i).display) {
                for (
                  var o, r, a, l, d, p, h, u, g = s(i), m = c(i), f = !1;
                  !f;

                ) {
                  var v = null,
                    y = 1 == m.nodeType ? t.getComputedStyle(m) : {};
                  if ('none' == y.display) return;
                  if (
                    (m == this.root || m == e
                      ? ((f = !0), (v = n))
                      : m != e.body &&
                        m != e.documentElement &&
                        'visible' != y.overflow &&
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
                  return 'px' == e.unit
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
          if ('function' != typeof t)
            throw new Error('callback must be a function');
          if (r.root && 1 != r.root.nodeType)
            throw new Error('root must be an Element');
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
              .join(' '));
        }
        function r(t, e, i, n) {
          'function' == typeof t.addEventListener
            ? t.addEventListener(e, i, n || !1)
            : 'function' == typeof t.attachEvent && t.attachEvent('on' + e, i);
        }
        function a(t, e, i, n) {
          'function' == typeof t.removeEventListener
            ? t.removeEventListener(e, i, n || !1)
            : 'function' == typeof t.detatchEvent &&
              t.detatchEvent('on' + e, i);
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
        'object' == typeof exports && 'undefined' != typeof module
          ? (module.exports = e())
          : (t.lozad = e());
      })(this, function () {
        'use strict';
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
          e = 'undefined' != typeof document && document.documentMode,
          i = {
            rootMargin: '0px',
            threshold: 0,
            load: function (t) {
              if ('picture' === t.nodeName.toLowerCase()) {
                var i = document.createElement('img');
                e &&
                  t.getAttribute('data-iesrc') &&
                  (i.src = t.getAttribute('data-iesrc')),
                  t.getAttribute('data-alt') &&
                    (i.alt = t.getAttribute('data-alt')),
                  t.appendChild(i);
              }
              if (
                'video' === t.nodeName.toLowerCase() &&
                !t.getAttribute('data-src') &&
                t.children
              ) {
                for (
                  var n = t.children, o = void 0, r = 0;
                  r <= n.length - 1;
                  r++
                )
                  (o = n[r].getAttribute('data-src')) && (n[r].src = o);
                t.load();
              }
              t.getAttribute('data-src') &&
                (t.src = t.getAttribute('data-src')),
                t.getAttribute('data-srcset') &&
                  t.setAttribute('srcset', t.getAttribute('data-srcset')),
                t.getAttribute('data-background-image') &&
                  (t.style.backgroundImage =
                    "url('" + t.getAttribute('data-background-image') + "')"),
                t.getAttribute('data-toggle-class') &&
                  t.classList.toggle(t.getAttribute('data-toggle-class'));
            },
            loaded: function () {},
          };
        function n(t) {
          t.setAttribute('data-loaded', !0);
        }
        var o = function (t) {
          return 'true' === t.getAttribute('data-loaded');
        };
        return function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : '.lozad',
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
        var o = '_jsonp_' + t++;
        e.match(/\?/) ? (e += '&callback=' + o) : (e += '?callback=' + o);
        var r = document.createElement('script');
        (r.type = 'text/javascript'),
          (r.src = e),
          (window[o] = function (t) {
            i.call(n || window, t),
              document.getElementsByTagName('head')[0].removeChild(r),
              (r = null);
            try {
              delete window[o];
            } catch (t) {
              window[o] = void 0;
            }
          }),
          document.getElementsByTagName('head')[0].appendChild(r);
      };
    })(),
    Aedi = function () {
      this.initialize.apply(this, arguments);
    };
  Aedi.prototype = {
    initialize: function (t) {
      (this.ai_version = 'v1'),
        this.nation,
        (this.baseUrl = this.getBaseURL()),
        (this.interval = {}),
        (this.link = {}),
        (this.canvas = {}),
        (this.filter = 'win16|win32|win64|mac'),
        (this.ad_link = {}),
        (this.adCnt = 0),
        (this.maxFillerCnt = 5),
        (this.mb_id = ''),
        // uid 체크 (aedi User ID)
        (this.uid = this.getCookie('_pa')),
        (null !== this.uid && 21 === this.uid.length) ||
          (this.uid = this.uidCreate()),
        // 만료날짜 갱신
        this.setCookie('_pa', this.uid, 365),
        // 광고소재용
        (this.mask = new Image()),
        (this.over = new Image()),
        (this.over_2x = new Image()),
        (this.over_amber = new Image()),
        (this.over_aedi = new Image()),
        (this.ad = new Image()),
        (this.pass = new Image()),
        (this.ld = new Image()),
        (this.mask.src = 'https://thcdn2.aedi.ai/img/cover/mask.png'),
        (this.over.src = 'https://thcdn2.aedi.ai/img/cover/over.png'),
        (this.over_amber.src =
          'https://thcdn2.aedi.ai/img/cover/over_amber.png'),
        (this.over_aedi.src = 'https://thcdn2.aedi.ai/img/cover/over_aedi.png'),
        (this.over_2x.src = 'https://thcdn2.aedi.ai/img/cover/over_2x.png'),
        (this.ad.src = 'https://thcdn2.aedi.ai/img/cover/ad_kr3.png'),
        //"kr" == this.nation ? this.ad.src = "https://thcdn2.aedi.ai/img/cover/ad_kr3.png" : this.ad.src = "https://thcdn2.aedi.ai/img/cover/ad_cn.png",
        (this.is_pv = false);
        //전역변수
        (this.is_apikey = "");
        (this.is_imgSelect = "");
        (this.is_writingTime = "");
      this.seen = new Array();
      document.createElement('img').src =
        'https://thimp.aedi.ai/loc/?v=' + encodeURIComponent(location.href);
    },
    getBaseURL: function () {
      // var t = document.getElementsByTagName("script")
      //   , e = null;
      // for (i = 0; i < t.length; i++)
      //   if (t[i].src) {
      //     if ("aedi" == (e = (e = (e = (e = (e = t[i].src.replace("https:", "")).replace("http:", "")).replace("//", "")).split("/"))[0].replace("api.", "")).substring(0, 7))
      //       return this.nation = e.replace("aedi.", ""),
      //         e
      //   } else
      //     ;
      // return null
      this.nation = 'th';
      return 'aedi.ai';
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
      var e = document.cookie.match('(^|;) ?' + t + '=([^;]*)(;|$)');
      return e ? e[2] : null;
    },
    deleteCookie: function (t) {
      document.cookie = t + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    uidCreate: function () {
      return (
        parseInt(1e10 * Math.random()) +
        '.' +
        parseInt(new Date().getTime() / 1e3)
      );
    },
    offset3: function (t) {
      var section = document.getElementsByTagName('section');
      var sectionMarginTop = 0;
      if (section.length && window.location.host.indexOf('korea.com')) {
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
      var padding_top =
        Number(style.getPropertyValue('padding-top').replace('px', '')) || 0;
      var padding_left =
        Number(style.getPropertyValue('padding-left').replace('px', '')) || 0;
      var bodyPosition =['parapuan', 'tribunnews'].some(domain => window.location.hostname.includes(domain)) ? 0: document.body.getBoundingClientRect().top + window.scrollY;
      var sindonewsAdTop = (document.querySelector('.warp-ads-paralax')?.offsetHeight) + 5|| 0
      
      return (
        'relative' == window.getComputedStyle(document.body).position &&
          (i -= o.left),
        (-1 == a.indexOf('mobile') && -1 == a.indexOf('/zxnews/')) ||
          (document.getElementById('title') &&
            (r = parseInt(
              window.getComputedStyle(document.getElementById('title'), null)
                .marginTop
            ))),
        {
          top: e.top + n - r - sectionMarginTop + padding_top - bodyPosition - sindonewsAdTop,
          left: e.left + i + padding_left,
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
      (t.style.width = i * e + 'px'), (t.style.height = n * e + 'px');
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
    tracking_log: function () {
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
        } else {
          return false;
        }
      }
    },

    // 광고소재 생성
    adThumb: function (
      img_url,
      imp_url,
      canvas,
      offset,
      abf_info,
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

      var ctx = canvas.getContext('2d');

      function setImageOnload() {
        img.onload = function () {
          ctx.scale(devicePixelRatioValue, devicePixelRatioValue);
          var els = document.querySelectorAll('.pxButton');
          if (abf_info === null || abf_info === undefined || abf_info =='' || abf_info.status== 'F' || abf_info.resize_ratio === null) {
            var scale = (canvas.width - 40*2 < this.width) ? (canvas.width - 40*2) / this.width : 1;
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
          for (var x = 0; x < els.length; x++) els[x].style.display = '';
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

          // ABF정보가 있고 성공이면
          null !== abf_info &&
            'S' == abf_info.status &&
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
            (canvas.style.width = 166 * display_ratio + 'px'),
            (canvas.style.height = 184 * display_ratio + 'px'),
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
            (ctx.globalCompositeOperation = 'destination-in'),
            // 이미지 크롭
            ctx.drawImage(
              self.mask,
              -1,
              -1,
              166 * display_ratio,
              184 * display_ratio
            ),
            // 이미지 합성
            (ctx.globalCompositeOperation = 'source-over'),
            is_aedi == 1
              ? ctx.drawImage(
                  self.over_aedi,
                  0,
                  0,
                  166 * display_ratio,
                  184 * display_ratio
                )
              : ctx.drawImage(
                  self.over_2x,
                  0,
                  0,
                  166 * display_ratio,
                  184 * display_ratio
                ),
            // ctx.drawImage(self.over_2x, 0, 0, 166 * display_ratio, 184 * display_ratio);
            void 0 !== offset &&
              null != offset.width &&
              offset.width > 0 &&
              ((mm =
                (offset.width < 360 && offset.height < 200)
                  ? 0.6
                  : (window.location.hostname.includes('kompas') ? window.innerWidth * 0.4 : offset.width * 0.4) / parseInt(canvas.style.width)) < 1
                ? self.resizeTo(canvas, mm)
                : (mm = 1)),
            (ctx.globalCompositeOperation = 'source-over'),
            'th' == self.nation
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

      if (self.tracking_log()) {
        //grid.id 요청
        var trackingImg = document.querySelector('.aedi_tracking_log');
        if (trackingImg) {
          var dataSrc = trackingImg.getAttribute('data-src');
          var log_img = new Image();
          log_img.src = dataSrc;

          var pv_imp = new Image();
          if (pv_imp_url) pv_imp.src = pv_imp_url + '&u=' + self.uid;
          else {
            if (imp_url && imp_url.includes('pv=1')) {
              pv_imp.src = imp_url + '&u=' + self.uid;
            } else if (imp2_url && imp2_url.includes('pv=1')) {
              pv_imp.src = imp2_url + '&u=' + self.uid;
            }
          }
        } else {
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

      var ctx = canvas.getContext('2d');

      function processABFInfo(
        abf_info,
        w1,
        h1,
        devicePixelRatioValue,
        display_ratio,
        ctx,
        canvas
      ) {
        if (abf_info === null || abf_info === undefined) {
          abf_info = {
            status: 'S',
            color: [
              [255, 255, 255],
              [255, 255, 255],
            ],
            lt_point: [20, 20],
            padded_rb_point: [335, 400],
            resize_ratio: 0.40625,
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
              ? canvas.setAttribute('class', 'aedi-brand-product-mobile')
              : canvas.setAttribute('class', 'aedi-brand-product'));
          ctx.scale(devicePixelRatioValue, devicePixelRatioValue);
          var els = document.querySelectorAll('.pxButton');
          for (var x = 0; x < els.length; x++) els[x].style.display = '';
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
          var abfCi = processABFInfo(
            abf_info_to_use,
            w1,
            h1,
            devicePixelRatioValue,
            display_ratio,
            ctx,
            canvas
          );
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
            (ctx.globalCompositeOperation = 'destination-in'),
            // 이미지 크롭
            ctx.drawImage(
              self.mask,
              -1,
              -1,
              166 * display_ratio,
              184 * display_ratio
            ),
            // 이미지 합성
            (ctx.globalCompositeOperation = 'source-over'),
            is_aedi == 1
              ? ctx.drawImage(
                  self.over_aedi,
                  0,
                  0,
                  166 * display_ratio,
                  184 * display_ratio
                )
              : ctx.drawImage(
                  self.over_2x,
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
                  : (window.location.hostname.includes('kompas') ? window.innerWidth * 0.4 : offset.width * 0.4) / parseInt(canvas.style.width)) < 1
                ? self.resizeTo(canvas, mm)
                : (mm = 1)),
            (ctx.globalCompositeOperation = 'source-over'),
            'kr' == self.nation
              ? ctx.drawImage(self.ad, 97 * display_ratio - 8, 0)
              : ctx.drawImage(self.ad, 97 * display_ratio - 8, 0);
        };
      }

      if (self.mask.complete && self.over.complete) {
        canvas.removeAttribute('class');
        // 초기에 첫 번째 이미지 로드
        setImageOnload(abf_logo);
      } else {
        // 이미지 로딩이 늦어져 mask, over 이미지가 미로딩 상태인 case
        // interval을 통해 mask, over 이미지가 로딩될 때까지 interval로 체크
        const interval = setInterval(function () {
          if (!self.mask.complete || !self.over.complete) {
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

      if (self.tracking_log()) {
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
      void 0 !== this.canvas[t] && (this.canvas[t].style.display = 'none');
    },
    // 매칭광고 보이기
    adShow: function (t) {
      void 0 !== this.canvas[t] && (this.canvas[t].style.display = '');
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
    adOpen2:function(api_key, imgSt, dateSt, img_cap = null, intv = 0){
      self.is_apikey = api_key;
      self.is_imgSelect = imgSt;
      self.is_writingTime = dateSt;

      var is_img = document.querySelectorAll(imgSt);
      var is_date = "";

      if(window.location.hostname.includes('rctiplus.com')){
          document.querySelectorAll(dateSt).forEach(function(script) {
            var data = JSON.parse(script.textContent);
            if (data['@type'] === 'NewsArticle' && data.datePublished) {
               is_date = (data.datePublished) 
            }
          });
      }else{
        is_date = document.querySelector(dateSt);
      }

      this.adOpen(self.is_apikey, is_img, is_date, img_cap = null, intv = 0)
    },
    // 매칭광고시작
    adOpen:async function (api_key, img, date, img_cap = null, intv = 0) {
      if (!img.length || img.length == 0) {
        return;
      }

      // nextjs 이미지 placeholder 체크 대응
      const retry = (img_el) => {
        return new Promise((resolve) => {
          const check = () => {
            const src = img_el.getAttribute('src');
            const get_img = document.querySelector(`img[src="${src}"]`);
            const has_blur = window.getComputedStyle(get_img).filter.includes('blur');

            if(has_blur){
              setTimeout(check, 100);
            } else {
              resolve(get_img);
            }
          };
          check();
        });
      }

      await Promise.all(Array.from(img).map(el => retry(el))).then(function(newImgArray) {
        img = newImgArray; // 실제 이미지들로 교체
      });
      // nextjs 이미지 placeholder 체크 대응 끝

      if (intv === 0 && window.aedi_api_key?.includes(api_key)) {
        return;
      }

      window.aedi_api_key += ',' + api_key;

      date = void 0 !== date ? date : 'skip';
      var attr = void 0 !== attr ? attr : 'src';
      var self = this;
      var title =
        null !== document.querySelector("meta[property='og:title']") && '' !== document.querySelector("meta[property='og:title']").getAttribute('content')
          ? document
              .querySelector("meta[property='og:title']")
              .getAttribute('content')
          : null !== document.querySelector('title')
          ? document.querySelector('title').innerText
          : null !== document.querySelector('.title-content')
          ? document.querySelector('.title-content').innerText
          : '';
      var referer = top.location.href;
      var s = {
        '1641aa11b09b9ad3b9aef5099cc570d5': 440847,
        '7b290ea88cd2b39e4357dce2b26b69c8': 440848,
        ef77215951ccdd7ee937d75f9186633a: 440849,
        ea8c8b90dbfc0d14651f8df66995ab13: 440850,
        '6fa8d277f1df39363c606a7f55a3f7da': 440851,
      };

      var imgLength = img.length;
      if(aedi_once){
        aedi_once = false;
        var APIURL =
          'https://thmagic.' +
          self.baseUrl +
          '/' +
          self.ai_version +
          '/post_log?api_key=' +
          api_key +
          '&title=' +
          encodeURIComponent(title) +
          '&referer=' +
          encodeURIComponent(referer) +
          '&images=' +
          imgLength;
        loadJSONP(APIURL, function (api_key) {});
      }
      
      if (typeof jQuery === 'undefined') {
        if (void 0 !== api_key && void 0 !== img) {
          if (!(void 0 !== imgLength && imgLength > 0))
            return self.adCreate(api_key, img, attr, date, img_cap);
          if ('kr' !== self.nation) c = imgLength > 3 ? 3 : imgLength;
          for (var d = 0; d < imgLength; d++) {
            if (img_cap == null)
              img[d] && self.adCreate(api_key, img[d], attr, date, img_cap);
            else
              img[d] &&
                self.adCreate(api_key, img[d], attr, date, img_cap, img_cap[d]);
          }
        }
      } else {
        if ('kr' !== self.nation)
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
        window.addEventListener('message', function (msg) {
          if (typeof msg.data == 'string') {
            if (msg.data.indexOf('-AD-OPEN') > -1) {
              var ad_id = msg.data.replace('-AD-OPEN', '');
              document.getElementById('aedi-div-' + ad_id).style.display = '';
            } else if (msg.data.indexOf('-AD-CLOSE') > -1) {
              var ad_id = msg.data.replace('-AD-CLOSE', '');
              if (document.getElementById('aedi-div-' + ad_id) !== undefined)
                document.getElementById('aedi-div-' + ad_id).remove();
            }
          }
          // else { if (t.data.indexOf('-AD-CLOSE')) t.data == r + "-AD-CLOSE" && document.getElementById("aedi-div-" + r).remove(); }
        });
      }

      function injectScript(path, callback) {
        var newScript = document.createElement('script');
        newScript.src = path;
        newScript.type = 'text/javascript';
        document.body.appendChild(newScript);

        newScript.onload = callback;
      }

      var setCookie = function (name, value, hour) {
        var date = new Date();
        date.setTime(date.getTime() + hour * 60 * 60 * 1000);
        document.cookie =
          name +
          '=' +
          value +
          ';SameSite=None; Secure;expires=' +
          date.toUTCString() +
          ';';
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
      if ('ai' == o) {
        var p = document.getElementById('aedi-div-' + n).children[2],
          h = p.getContext('2d');
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
              (h.strokeStyle = 'transparent'),
              h.stroke(),
              (h.fillStyle = 'transparent'),
              h.fill();
          }),
          (p.width = p.width / d),
          (p.height = p.height / d);
      } else if ('updown' == o) {
        var u = (w = document.getElementById('aedi-div-' + n)
            .children[2]).getContext('2d'),
          g = (b = document.getElementById('aedi-div-' + n)
            .children[3]).getContext('2d'),
          m = (I = document.getElementById('aedi-div-' + n)
            .children[4]).getContext('2d'),
          f = (T = document.getElementById('aedi-div-' + n)
            .children[5]).getContext('2d'),
          v = document.getElementById('aedi-div-' + n).children[6],
          y = v.getContext('2d');
        u.scale(d, d),
          g.scale(d, d),
          m.scale(d, d),
          f.scale(d, d),
          y.scale(d, d),
          ((_ = new Array())[0] = new Image()),
          (_[0].src = 'https://thcdn2.aedi.ai/img/paper2_1.png'),
          (_[1] = new Image()),
          (_[1].src = 'https://thcdn2.aedi.ai/img/paper2_2.png'),
          (_[2] = new Image()),
          (_[2].src = 'https://thcdn2.aedi.ai/img/paper2_3.png'),
          (_[3] = new Image()),
          (_[3].src = 'https://thcdn2.aedi.ai/img/paper2_4.png');
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
                  'pc' == s
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
                      (g.strokeStyle = 'transparent'),
                      g.stroke(),
                      (g.fillStyle = 'transparent'),
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
                      (m.strokeStyle = 'transparent'),
                      m.stroke(),
                      (m.fillStyle = 'transparent'),
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
                      (f.strokeStyle = 'transparent'),
                      f.stroke(),
                      (f.fillStyle = 'transparent'),
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
                      (y.strokeStyle = 'transparent'),
                      y.stroke(),
                      (y.fillStyle = 'transparent'),
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
                      (g.strokeStyle = 'transparent'),
                      g.stroke(),
                      (g.fillStyle = 'transparent'),
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
                      (m.strokeStyle = 'transparent'),
                      m.stroke(),
                      (m.fillStyle = 'transparent'),
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
                      (f.strokeStyle = 'transparent'),
                      f.stroke(),
                      (f.fillStyle = 'transparent'),
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
                      (y.strokeStyle = 'transparent'),
                      y.stroke(),
                      (y.fillStyle = 'transparent'),
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
      } else if ('left2right' == o) {
        var w = document.getElementById('aedi-div-' + n).children[2],
          b = document.getElementById('aedi-div-' + n).children[3],
          I = document.getElementById('aedi-div-' + n).children[4],
          T = document.getElementById('aedi-div-' + n).children[5];
        (u = w.getContext('2d')),
          (g = b.getContext('2d')),
          (m = I.getContext('2d')),
          (f = T.getContext('2d'));
        u.scale(d, d), g.scale(d, d), m.scale(d, d), f.scale(d, d);
        var _ = new Array();
        k = 0;
        (_[0] = new Image()),
          (_[1] = new Image()),
          (_[2] = new Image()),
          'pc' == s
            ? ((_[0].src = 'https://thcdn2.aedi.ai/img/01-ad-fold-165.png'),
              (_[1].src = 'https://thcdn2.aedi.ai/img/02-ad-fold-165.png'),
              (_[2].src = 'https://thcdn2.aedi.ai/img/03-ad-fold-165.png'))
            : ((_[0].src = 'https://thcdn2.aedi.ai/img/01-ad-fold-132.png'),
              (_[1].src = 'https://thcdn2.aedi.ai/img/02-ad-fold-132.png'),
              (_[2].src = 'https://thcdn2.aedi.ai/img/03-ad-fold-132.png')),
          (c.onload = function () {
            for (var t = 0; t < _.length; t++)
              _[t].onload = function () {
                if (++k == _.length) {
                  var t = _[0],
                    n = _[1],
                    o = _[2];
                  'pc' == s
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
                      (g.strokeStyle = 'transparent'),
                      g.stroke(),
                      (g.fillStyle = 'transparent'),
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
                      (m.strokeStyle = 'transparent'),
                      m.stroke(),
                      (m.fillStyle = 'transparent'),
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
                      (f.strokeStyle = 'transparent'),
                      f.stroke(),
                      (f.fillStyle = 'transparent'),
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
                      (g.strokeStyle = 'transparent'),
                      g.stroke(),
                      (g.fillStyle = 'transparent'),
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
                      (m.strokeStyle = 'transparent'),
                      m.stroke(),
                      (m.fillStyle = 'transparent'),
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
                      (f.strokeStyle = 'transparent'),
                      f.stroke(),
                      (f.fillStyle = 'transparent'),
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
      var r = 'ad_' + self.adCnt++;
  
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
            'JS-LAZYLOAD' == img.classList[a].toUpperCase() ||
            img.src.includes('noimage')) &&
            (attr = 'data-src');
          if (img.src.includes('data:image')) {
            attr = 'data-lazy-src';
          }
        }

      var s = img.getAttribute(attr);

      if (s == null && attr == 'data-src')
        s = img.getAttribute('data-original'); //newspic
      if (s == null && attr == 'data-src') s = img.getAttribute('data-src'); //newspic
      if (s == null && attr == 'data-lazy-src')
        s = img.getAttribute('data-src'); //khaosod
      if(window.location.hostname.includes('okezone')){
        s = img.getAttribute('data-original') || img.getAttribute('data-cfsrc'); //okezone
        if (!s) {
          s = img.getAttribute('src');
        }
      }

      null == s && 'src' !== attr && (s = img.getAttribute('src'));
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
          null !== document.querySelector("meta[property='og:title']").getAttribute('content') && '' !== document.querySelector("meta[property='og:title']").getAttribute('content')
            ? document
                .querySelector("meta[property='og:title']")
                .getAttribute('content')
            : null !== document.querySelector('title')
            ? document.querySelector('title').innerText
            : null !== document.querySelector('.title-content')
            ? document.querySelector('.title-content').innerText
            : '';
        c = top.location.href,
        url =
          'https://thmagic.' +
          self.baseUrl +
          '/' +
          self.ai_version +
          '/get_ad?api_key=' +
          api_key +
          '&content_url=' +
          encodeURIComponent(s) +
          '&title=' +
          encodeURIComponent(l) +
          '&referer=' +
          encodeURIComponent(c) +
          '&write=' +
          encodeURIComponent(date) +
          "&aedi_cpgn=" + 
          encodeURIComponent(aedi_cpgn) +
          '&u=' +
          self.uid +
          "&alt=" + 
          encodeURIComponent(alt) + 
          '&mb_id=' +
          encodeURIComponent(self.mb_id) +
          '&ad_id=' +
          encodeURIComponent(r) +
          '&size=' +
          img.clientWidth +
          'x' +
          img.clientHeight;

      var psrfp = this.getCookie('psrfp');
      if (psrfp) url += '&fp=' + psrfp;

      function lozad_ad(responseJson) {
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
                responseJson.data.resize_ratio
                  ? responseJson.data.resize_ratio
                  : 1,
                responseJson.data.imp2_url,
                responseJson.data.pv_imp_url,
                responseJson.data.is_aedi
              );
          }
        } else {
          lozad(img, {
            threshold: 0.1,
            load: function (i) {
              if (void 0 !== self.canvas[r]) {
                var n = self.offset3(img),
                  a = img.getAttribute('aedi-z-index');
                a && (self.canvas[r].style.zIndex = a);
                if (responseJson.data?.template === 'LOGO_EDGE') {
                  self.logo_edge_Thumb(
                    responseJson.data.img_url,
                    responseJson.data?.logo_url,
                    responseJson.data.imp_url,
                    self.canvas[r],
                    n,
                    responseJson.data.abf_info,
                    responseJson.data?.abf_logo,
                    responseJson.data.resize_ratio
                      ? responseJson.data.resize_ratio
                      : 1,
                    responseJson.data.imp2_url,
                    responseJson.data.pv_imp_url,
                    responseJson.data.is_aedi
                  );
                } else {
                  self.adThumb(
                    responseJson.data.img_url,
                    responseJson.data.imp_url,
                    self.canvas[r],
                    n,
                    responseJson.data.abf_info,
                    responseJson.data.resize_ratio
                      ? responseJson.data.resize_ratio
                      : 1,
                    responseJson.data.imp2_url,
                    responseJson.data.pv_imp_url,
                    responseJson.data.is_aedi
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
            a = img.getAttribute('aedi-z-index');
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
              responseJson.data.is_aedi
            );
        } else {
          reject(new Error('Canvas not found'));
        }
      }

      // function isElementOverflowing(element) {
      //   console.log(element);
      //   // 엘리먼트의 위치와 크기를 가져옵니다.
      //   var elementRect = element.getBoundingClientRect();

      //   // 부모 또는 가장 가까운 스크롤 가능한 조상 엘리먼트 (div, section 등)를 가져옵니다.
      //   var parent = element.parentNode;

      //   // 부모 엘리먼트의 가시 영역 크기
      //   var parentRect = parent.getBoundingClientRect();

      //   // 엘리먼트가 부모 엘리먼트의 가시 영역을 벗어나는지 확인
      //   var isOverflowing = (
      //     elementRect.top < parentRect.top || // 위쪽으로 벗어나는 경우
      //     elementRect.left < parentRect.left || // 왼쪽으로 벗어나는 경우
      //     elementRect.bottom > parentRect.bottom || // 아래쪽으로 벗어나는 경우
      //     elementRect.right > parentRect.right // 오른쪽으로 벗어나는 경우
      //   );

      //   return isOverflowing;
      // }
      function showCanvasAD(responseJson) {
        // if( img.width > 0 && img.width < 200 ) {
        //   if(seen.indexOf(img) > -1 ){
        //     return -1;
        //   }else {
        //     seen.push(img);
        //   }
        // }
        if (
          'queue transfer success' != responseJson.msg &&
          'queue' != responseJson.code
        )
          if (
            void 0 !== responseJson.status &&
            'SUCCESS' == responseJson.status &&
            img.width > 0
          )
            img.removeAttribute('data-loaded'),
              responseJson.data.img_url.indexOf('.gif') > -1 &&
                ((responseJson.data.abf_info.status = 'S'),
                (responseJson.data.abf_info.color = [
                  [255, 255, 255],
                  [255, 255, 255],
                ]),
                (responseJson.data.abf_info.lt_point = [20, 20]),
                (responseJson.data.abf_info.padded_rb_point = [335, 400]),
                (responseJson.data.abf_info.resize_ratio = 0.40625)),
              (self.canvas[r] = document.createElement('canvas')),
              (self.canvas[r].style.display = 'none'),
              (self.canvas[r].style.zIndex = responseJson.data.zIndex),
              (self.link[r] = document.createElement('a')),
              (self.link[r].style.position = 'static'),
              self.link[r].setAttribute('class', 'aedi-link'),
              (self.link[r].target = '_blank'),
              self.link[r].addEventListener('touchend', touchEvent, false),
              self.link[r].setAttribute(
                'sensibility',
                responseJson.data.sensibility
              ),
              (self.link[r].style.zIndex = responseJson.data.zIndex),
              // (self.link[r].style.display = isElementOverflowing(self.link[r])),
              navigator.platform &&
                (0 > self.filter.indexOf(navigator.platform.toLowerCase())
                  ? (self.canvas[r].setAttribute(
                      'class',
                      'aedi-product-mobile'
                    ),
                    (self.link[r].href =
                      responseJson.data.click_url + '&u=' + self.uid))
                  : (self.canvas[r].setAttribute('class', 'aedi-product'),
                    (self.link[r].href =
                      responseJson.data.click_url + '&u=' + self.uid))),
              responseJson.data.img_url.indexOf('.gif') > -1
                ? null
                : self.link[r].appendChild(self.canvas[r]), // draw canvas
              (self.ad_link[r] = document.createElement('a')),
              (self.ad_link[r].target = '_blank'),
              'aedi.kr' == self.baseUrl
                ? (self.ad_link[r].href = 'https://www.aedi.me')
                : (self.ad_link[r].href = 'https://esa.' + self.baseUrl),
              self.ad_link[r].setAttribute('class', 'aedi-home'),
              self.ad_link[r].setAttribute('aria-label', 'aedi ai-ad platform'),
              self.link[r].appendChild(self.ad_link[r]),
              (f = document.createElement('div')),
              f.setAttribute('class', 'pxButton'),
              f.setAttribute(
                'style',
                'display:none;z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;'
              ),
              (f.innerHTML = "<span style='color:#fff;'>X</span>"),
              (f.style.zIndex = responseJson.data.zIndex),
              (f.onclick = function (e) {
                e.preventDefault();
                e.target.closest('.aedi-link').remove();
                e.target.remove();
                // $(this).parents('.aedi-link').remove();
                // $(this).remove();
              }),
              (responseJson.data.img_url.indexOf('.gif') > -1 &&
                navigator.appName == 'Netscape' &&
                navigator.userAgent.toLowerCase().indexOf('trident') != -1) ||
              navigator.userAgent.toLowerCase().indexOf('msie') != -1
                ? null
                : self.link[r].appendChild(f),
              responseJson.data.img_url.indexOf('.gif') == -1
                ? self.link[r].appendChild(f)
                : null,
              (c = document.createElement('div')),
              (adImg = document.createElement('div')),
              adImg.setAttribute('id', 'aedi-container'),
              (m = document.createElement('div')),
              (m.id = 'aedi-over'),
              navigator.platform &&
                (0 > self.filter.indexOf(navigator.platform.toLowerCase())
                  ? (c.setAttribute('class', 'aedi-product-mobile'), // 모바일
                    adImg.setAttribute(
                      'style',
                      'width:' +
                        136 * responseJson.data.resize_ratio +
                        'px;height:' +
                        154 * responseJson.data.resize_ratio +
                        'px;position:absolute;background-size:cover;background-repeat:no-repeat;'
                    ),
                    (adImg.style.clipPath =
                      'polygon(0px 0px, ' +
                      106 * responseJson.data.resize_ratio +
                      'px 0px, ' +
                      95 * responseJson.data.resize_ratio +
                      'px ' +
                      10 * responseJson.data.resize_ratio +
                      'px,0px ' +
                      138 * responseJson.data.resize_ratio +
                      'px)'),
                    m.setAttribute(
                      'style',
                      'width:' +
                        136 * responseJson.data.resize_ratio +
                        'px;height:' +
                        154 * responseJson.data.resize_ratio +
                        'px;position:absolute;background-size:contain;background-repeat:no-repeat;pointer-events:none;'
                    ))
                  : (c.setAttribute('class', 'aedi-product'), // PC
                    adImg.setAttribute(
                      'style',
                      'width:' +
                        166 * responseJson.data.resize_ratio +
                        'px;height:' +
                        184 * responseJson.data.resize_ratio +
                        'px;position:absolute;background-size:cover;background-repeat:no-repeat;'
                    ),
                    (adImg.style.clipPath =
                      'polygon(0px 0px, ' +
                      130 * responseJson.data.resize_ratio +
                      'px 0px, ' +
                      116 * responseJson.data.resize_ratio +
                      'px ' +
                      10 * responseJson.data.resize_ratio +
                      'px,0px ' +
                      170 * responseJson.data.resize_ratio +
                      'px)'),
                    m.setAttribute(
                      'style',
                      'width:' +
                        166 * responseJson.data.resize_ratio +
                        'px;height:' +
                        184 * responseJson.data.resize_ratio +
                        'px;position:absolute;background-size:contain;background-repeat:no-repeat;pointer-events:none;'
                    ))),
              (adImg.style.backgroundImage =
                'url("' + responseJson.data.img_url + '")'),
              (m.style.backgroundImage = 'url("' + self.over_2x.src + '")'),
              c.appendChild(adImg),
              c.appendChild(m),
              responseJson.data.img_url.indexOf('.gif') > -1 &&
              !(
                (navigator.appName == 'Netscape' &&
                  navigator.userAgent.toLowerCase().indexOf('trident') != -1) ||
                navigator.userAgent.toLowerCase().indexOf('msie') != -1
              )
                ? self.link[r].appendChild(c)
                : null, // draw container only .gif image
              ['okezone'].some(domain => window.location.hostname.includes(domain)) && document.querySelector("#app")
                ? document.querySelector("#app").appendChild(self.link[r])
                : ['sindonews'].some(domain => window.location.hostname.includes(domain)) && document.querySelector("#content-paralax") 
                ? document.querySelector("#content-paralax").appendChild(self.link[r])
                : document.body.appendChild(self.link[r]),
              (self.interval[r] = setInterval(function () {

                if(this.is_imgSelect){
                  img = document.querySelectorAll(this.is_imgSelect)[self.adCnt - 1];
                }

                var t = self.offset3(img);

                if (img.complete && self.isVisible(img)) {
                  if (
                    ((self.canvas[r].style.left = t.left + 'px'),
                    (self.canvas[r].style.top = t.top + 'px'),
                    (self.canvas[r].style.display = ''),
                    'th' == self.nation)
                  ) {
                    var i = self.canvas[r].style.width;
                    var j = 16;
                    i = parseInt(i, 10) / 2;
                    self.ad_link[r].style.left = t.left + 100 + 'px';
                    self.ad_link[r].style.top = t.top + 'px';
                    self.ad_link[r].style.display = '';
                    f.style.left = t.left + 'px';
                    f.style.top = window.location.hostname.includes('khaosod') ? t.top + 'px' : t.top - j + 'px';
                    c.style.left = t.left - 1 + 'px';
                    c.style.top = t.top - 1 + 'px';
                  }
                } else (self.canvas[r].style.display = 'none'), 'th' == self.nation && (self.ad_link[r].style.display = 'none');
              }, 100)),
              loadPrequired(),
              //태국 lazyload관련 광고 노출 수정
              lozad_ad(responseJson);
          else if (
            void 0 !== responseJson.status &&
            'FILLER_AD' == responseJson.status &&
            parseInt(r.split('_')[1]) < self.maxFillerCnt
          ) {
            var i = window.devicePixelRatio || 1,
              n = responseJson.data.iframe_src,
              a = responseJson.data.iframe_width,
              l = responseJson.data.iframe_height,
              c = responseJson.data.template,
              d = 'pc';
            // 수동 AI
            if ('kr' == self.nation || null == self.nation) {
              img.removeAttribute('data-loaded');
              var p = document.createElement('div');
              if (
                ((p.id = 'aedi-div-' + r), (p.style.zIndex = 101), 'ai' == c)
              ) {
                var h = '166',
                  u = '184';
                (p.innerHTML =
                  '<iframe id="' +
                  r.split('.')[0] +
                  '" class="aedi-iframe" src="' +
                  n +
                  '" width="' +
                  a +
                  '" height="' +
                  l +
                  '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" style="opacity:0;"></iframe>'),
                  ((f = document.createElement('div')).id = 'aedi-div-' + r),
                  f.setAttribute('class', 'pxButton'),
                  f.setAttribute(
                    'style',
                    'z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;display:none'
                  ),
                  (f.style.zIndex = 99999),
                  (f.innerHTML = '<span>X</span>'),
                  (f.onclick = function () {
                    document
                      .querySelector("div[id='aedi-div-" + r + "']")
                      .remove();
                  }),
                  p.appendChild(f);
                for (var g = 1, m = 1; m <= g; m++) {
                  ((v = document.createElement('canvas')).id = 'aedi-ai-' + m),
                    (v.className = 'aedi-ai-ad-' + r.split('.')[0]),
                    (v.width = h * i),
                    (v.height = u * i),
                    v.setAttribute(
                      'style',
                      'z-index:2;pointer-events:none;position:absolute;left:0px;opacity:0'
                    ),
                    p.appendChild(v);
                }
              }
              // left2right , updown
              else {
                if (150 == a)
                  if ('updown' == c) (h = '165'), (u = '188');
                  else (h = '165'), (u = '150');
                else if (120 == a) {
                  if ('updown' == c) (h = '131'), (u = '152');
                  else (h = '132'), (u = '120');
                  d = 'mobile';
                }
                var f;
                // updown
                if (
                  ((p.innerHTML =
                    '<iframe id="' +
                    r.split('.')[0] +
                    '" class="aedi-iframe" src="' +
                    n +
                    '" width="' +
                    a +
                    '" height="' +
                    l +
                    '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" style="opacity:0;"></iframe>'),
                  ((f = document.createElement('div')).id = 'aedi-div-' + r),
                  f.setAttribute('class', 'pxButton'),
                  f.setAttribute(
                    'style',
                    'z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;display:none'
                  ),
                  (f.style.zIndex = 99999),
                  (f.innerHTML = '<span>X</span>'),
                  (f.onclick = function () {
                    document
                      .querySelector("div[id='aedi-div-" + r + "']")
                      .remove();
                  }),
                  p.appendChild(f),
                  'updown' == c)
                )
                  g = 4;
                // left2right
                else if ('left2right' == c) g = 3;

                if (
                  responseJson.fillerCover == undefined ||
                  responseJson.fillerCover == 'T'
                ) {
                  for (m = 0; m <= g; m++) {
                    var v;
                    ((v = document.createElement('canvas')).id =
                      'aedi-paper-' + m),
                      (v.className = 'aedi-net-ad-' + r.split('.')[0]),
                      (v.width = h * i),
                      (v.height = u * i),
                      v.setAttribute(
                        'style',
                        'z-index:2;pointer-events:none;position:absolute;left:0px;display:none'
                      );
                    p.appendChild(v);
                  }
                }
              }
              document.body.appendChild(p);

              if (
                responseJson.fillerCover == undefined ||
                responseJson.fillerCover == 'T'
              ) {
                var y = setInterval(function () {
                  img.complete &&
                    self.isVisible(img) &&
                    (self.imgCrop(s, img.width, img.height, r, c, h, u, d),
                    clearInterval(y));
                }, 100);
              }

              window.addEventListener('message', function (t) {
                if (typeof t.data == 'string') {
                  // console.log(t.data.indexOf('-DSP-AD-CLOSE'), t.data.indexOf('-AD-CLOSE'), t.data.indexOf('-AD-OPEN'))
                  if (t.data.indexOf('-DSP-ADDCLASS') > -1) {
                    document.getElementById(
                      'aedi-div-' + t.data.split('-')[0]
                    ).className = t.data.split('-')[1];
                  } else if (t.data.indexOf('-AD-OPEN') > -1) {
                    t.data == r + '-AD-OPEN' &&
                      iframeloaded(c, r.split('.')[0]);
                  } else if (t.data.indexOf('-DSP-AD-CLOSE') > -1) {
                    document.querySelector('.' + t.data.split('-')[0]).remove();
                  } else {
                    if (t.data.indexOf('-AD-CLOSE'))
                      t.data == r + '-AD-CLOSE' &&
                        document.getElementById('aedi-div-' + r).remove();
                  }
                }
              });
              var k = document.getElementById('aedi-div-' + r);
              (k.style.position = 'absolute'),
                (self.interval[r] = setInterval(function () {
                  var t = self.offset3(img);
                  img.complete &&
                    self.isVisible(img) &&
                    ((k.style.left = t.left + 'px'),
                    (k.style.top = t.top + 'px'));
                }, 100));
            }
          }
      }

      function showCanvasDoubleAD(responseJson, el, index = r) {
        var c_index = r + index;
        if (
          'queue transfer success' != responseJson.msg &&
          'queue' != responseJson.code
        )
          if (
            void 0 !== responseJson.status &&
            'SUCCESS' == responseJson.status &&
            img.width > 0 &&
            responseJson.data
          ) {
            img.removeAttribute('data-loaded'),
              el.img_url.indexOf('.gif') > -1 &&
                ((el.abf_info.status = 'S'),
                (el.abf_info.color = [
                  [255, 255, 255],
                  [255, 255, 255],
                ]),
                (el.abf_info.lt_point = [20, 20]),
                (el.abf_info.padded_rb_point = [335, 400]),
                (el.abf_info.resize_ratio = 0.40625)),
              (self.canvas[c_index] = document.createElement('canvas')),
              (self.canvas[c_index].style.display = 'none'),
              (self.canvas[c_index].style.zIndex = responseJson.data.zIndex),
              (self.link[r] = document.createElement('a')),
              (self.link[r].style.position = 'static'),
              self.link[r].setAttribute('class', `aedi-link` + r),
              (self.link[r].target = '_blank'),
              self.link[r].addEventListener('touchend', touchEvent, false),
              self.link[r].setAttribute(
                'sensibility',
                responseJson.data.sensibility
              ),
              (self.link[r].style.zIndex = responseJson.data.zIndex),
              navigator.platform &&
                (0 > self.filter.indexOf(navigator.platform.toLowerCase())
                  ? (self.canvas[c_index].setAttribute(
                      'class',
                      responseJson.data.cnt == 1
                        ? 'aedi-product-mobile'
                        : 'aedi-double-product-mobile'
                    ),
                    (self.link[r].href = el.click_url + '&u=' + self.uid))
                  : (self.canvas[c_index].setAttribute(
                      'class',
                      responseJson.data.cnt == 1
                        ? 'aedi-product'
                        : 'aedi-double-product'
                    ),
                    (self.link[r].href = el.click_url + '&u=' + self.uid))),
              self.link[r].appendChild(self.canvas[c_index]), // draw canvas
              (self.ad_link[r] = document.createElement('a')),
              (self.ad_link[r].target = '_blank'),
              'aedi.kr' == self.baseUrl
                ? (self.ad_link[r].href = 'https://www.aedi.me')
                : (self.ad_link[r].href = 'https://global.' + self.baseUrl),
              self.ad_link[r].setAttribute('class', 'aedi-home'),
              self.ad_link[r].setAttribute('aria-label', 'aedi ai-ad platform'),
              self.link[r].appendChild(self.ad_link[r]),
              (f = document.createElement('div')),
              f.setAttribute('class', 'pxButton'),
              f.setAttribute(
                'style',
                'display:none;z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;'
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
              adImg.setAttribute('id', 'aedi-container'),
              (m = document.createElement('div')),
              (m.id = 'aedi-over'),
              navigator.platform &&
                (0 > self.filter.indexOf(navigator.platform.toLowerCase())
                  ? (c.setAttribute(
                      'class',
                      responseJson.data.cnt == 1
                        ? 'aedi-product-mobile'
                        : 'aedi-double-product-mobile'
                    ), // 모바일
                    adImg.setAttribute(
                      'style',
                      'width:' +
                        136 * responseJson.data.resize_ratio +
                        'px;height:' +
                        154 * responseJson.data.resize_ratio +
                        'px;position:absolute;background-size:cover;background-repeat:no-repeat;'
                    ),
                    (adImg.style.clipPath =
                      'polygon(0px 0px, ' +
                      106 * responseJson.data.resize_ratio +
                      'px 0px, ' +
                      95 * responseJson.data.resize_ratio +
                      'px ' +
                      10 * responseJson.data.resize_ratio +
                      'px,0px ' +
                      138 * responseJson.data.resize_ratio +
                      'px)'),
                    m.setAttribute(
                      'style',
                      'width:' +
                        136 * responseJson.data.resize_ratio +
                        'px;height:' +
                        154 * responseJson.data.resize_ratio +
                        'px;position:absolute;background-size:contain;background-repeat:no-repeat;pointer-events:none;'
                    ))
                  : (c.setAttribute(
                      'class',
                      responseJson.data.cnt == 1
                        ? 'aedi-product'
                        : 'aedi-double-product'
                    ), // PC
                    adImg.setAttribute(
                      'style',
                      'width:' +
                        166 * responseJson.data.resize_ratio +
                        'px;height:' +
                        184 * responseJson.data.resize_ratio +
                        'px;position:absolute;background-size:cover;background-repeat:no-repeat;'
                    ),
                    (adImg.style.clipPath =
                      'polygon(0px 0px, ' +
                      130 * responseJson.data.resize_ratio +
                      'px 0px, ' +
                      116 * responseJson.data.resize_ratio +
                      'px ' +
                      10 * responseJson.data.resize_ratio +
                      'px,0px ' +
                      170 * responseJson.data.resize_ratio +
                      'px)'),
                    m.setAttribute(
                      'style',
                      'width:' +
                        166 * responseJson.data.resize_ratio +
                        'px;height:' +
                        184 * responseJson.data.resize_ratio +
                        'px;position:absolute;background-size:contain;background-repeat:no-repeat;pointer-events:none;'
                    ))),
              (adImg.style.backgroundImage = 'url("' + el.img_url + '")'),
              (m.style.backgroundImage = 'url("' + self.over_2x.src + '")'),
              c.appendChild(adImg),
              c.appendChild(m),
              el.img_url.indexOf('.gif') > -1 &&
              !(
                (navigator.appName == 'Netscape' &&
                  navigator.userAgent.toLowerCase().indexOf('trident') != -1) ||
                navigator.userAgent.toLowerCase().indexOf('msie') != -1
              )
                ? self.link[r].appendChild(c)
                : null, // draw container only .gif image
              document.body.appendChild(self.link[r]),
              (self.interval[c_index] = setInterval(function () {
                var t = self.offset3(img);
                if (img.complete && self.isVisible(img)) {
                  if (
                    ((self.canvas[c_index].style.left = t.left + 'px'),
                    (self.canvas[c_index].style.top = t.top + 'px'),
                    (self.canvas[c_index].style.display = ''),
                    'kr' !== self.nation)
                  ) {
                    var i = self.canvas[c_index].style.width;
                    var j = 16;
                    i = parseInt(i, 10) / 2;
                    self.ad_link[r].style.left = t.left + 100 + 'px';
                    self.ad_link[r].style.top = t.top + 'px';
                    self.ad_link[r].style.display = '';
                    f.style.left = t.left + 'px';
                    f.style.top = window.location.hostname.includes('khaosod') ? t.top + 'px' : t.top - j + 'px';
                    c.style.left = t.left - 1 + 'px';
                    c.style.top = t.top - 1 + 'px';
                  }
                } else (self.canvas[c_index].style.display = 'none'), 'th' == self.nation && (self.ad_link[r].style.display = 'none');
              }, 100)),
              loadPrequired(),
              doubleShow(el, c_index, responseJson);
            return self.link[r];
          } else if (
            void 0 !== responseJson.status &&
            'FILLER_AD' == responseJson.status &&
            parseInt(r.split('_')[1]) < self.maxFillerCnt
          ) {
            var i = window.devicePixelRatio || 1,
              n = responseJson.data.iframe_src,
              a = responseJson.data.iframe_width,
              l = responseJson.data.iframe_height,
              c = responseJson.data.template,
              d = 'pc';
            // 수동 AI
            if ('kr' == self.nation || null == self.nation) {
              img.removeAttribute('data-loaded');
              var p = document.createElement('div');
              if (
                ((p.id = 'aedi-div-' + r), (p.style.zIndex = 101), 'ai' == c)
              ) {
                var h = '166',
                  u = '184';
                (p.innerHTML =
                  '<iframe id="' +
                  r.split('.')[0] +
                  '" class="aedi-iframe" src="' +
                  n +
                  '" width="' +
                  a +
                  '" height="' +
                  l +
                  '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" style="opacity:0;"></iframe>'),
                  ((f = document.createElement('div')).id = 'aedi-div-' + r),
                  f.setAttribute('class', 'pxButton'),
                  f.setAttribute(
                    'style',
                    'z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;display:none'
                  ),
                  (f.style.zIndex = 99999),
                  (f.innerHTML = '<span>X</span>'),
                  (f.onclick = function () {
                    document
                      .querySelector("div[id='aedi-div-" + r + "']")
                      .remove();
                  }),
                  p.appendChild(f);
                for (var g = 1, m = 1; m <= g; m++) {
                  ((v = document.createElement('canvas')).id = 'aedi-ai-' + m),
                    (v.className = 'aedi-ai-ad-' + r.split('.')[0]),
                    (v.width = h * i),
                    (v.height = u * i),
                    v.setAttribute(
                      'style',
                      'z-index:2;pointer-events:none;position:absolute;left:0px;opacity:0'
                    ),
                    p.appendChild(v);
                }
              }
              // left2right , updown
              else {
                if (150 == a)
                  if ('updown' == c) (h = '165'), (u = '188');
                  else (h = '165'), (u = '150');
                else if (120 == a) {
                  if ('updown' == c) (h = '131'), (u = '152');
                  else (h = '132'), (u = '120');
                  d = 'mobile';
                }
                var f;
                // updown
                if (
                  ((p.innerHTML =
                    '<iframe id="' +
                    r.split('.')[0] +
                    '" class="aedi-iframe" src="' +
                    n +
                    '" width="' +
                    a +
                    '" height="' +
                    l +
                    '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" style="opacity:0;"></iframe>'),
                  ((f = document.createElement('div')).id = 'aedi-div-' + r),
                  f.setAttribute('class', 'pxButton'),
                  f.setAttribute(
                    'style',
                    'z-index:10;width:16px;height:16px;background: #A9AEAF;color:white;font-family:Arial;font-size:14px;border:1px solid #A9AEAF;cursor:pointer;font-weight:600;line-height:14px;top:-14px;left:0px;position:absolute;text-align:center;display:none'
                  ),
                  (f.style.zIndex = 99999),
                  (f.innerHTML = '<span>X</span>'),
                  (f.onclick = function () {
                    document
                      .querySelector("div[id='aedi-div-" + r + "']")
                      .remove();
                  }),
                  p.appendChild(f),
                  'updown' == c)
                )
                  g = 4;
                // left2right
                else if ('left2right' == c) g = 3;

                if (
                  responseJson.fillerCover == undefined ||
                  responseJson.fillerCover == 'T'
                ) {
                  for (m = 0; m <= g; m++) {
                    var v;
                    ((v = document.createElement('canvas')).id =
                      'aedi-paper-' + m),
                      (v.className = 'aedi-net-ad-' + r.split('.')[0]),
                      (v.width = h * i),
                      (v.height = u * i),
                      v.setAttribute(
                        'style',
                        'z-index:2;pointer-events:none;position:absolute;left:0px;display:none'
                      );
                    p.appendChild(v);
                  }
                }
              }
              document.body.appendChild(p);

              if (
                responseJson.fillerCover == undefined ||
                responseJson.fillerCover == 'T'
              ) {
                var y = setInterval(function () {
                  img.complete &&
                    self.isVisible(img) &&
                    (self.imgCrop(s, img.width, img.height, r, c, h, u, d),
                    clearInterval(y));
                }, 100);
              }

              window.addEventListener('message', function (t) {
                if (typeof t.data == 'string') {
                  // console.log(t.data.indexOf('-DSP-AD-CLOSE'), t.data.indexOf('-AD-CLOSE'), t.data.indexOf('-AD-OPEN'))
                  if (t.data.indexOf('-DSP-ADDCLASS') > -1) {
                    document.getElementById(
                      'aedi-div-' + t.data.split('-')[0]
                    ).className = t.data.split('-')[1];
                  } else if (t.data.indexOf('-AD-OPEN') > -1) {
                    t.data == r + '-AD-OPEN' &&
                      iframeloaded(c, r.split('.')[0]);
                  } else if (t.data.indexOf('-DSP-AD-CLOSE') > -1) {
                    document.querySelector('.' + t.data.split('-')[0]).remove();
                  } else {
                    if (t.data.indexOf('-AD-CLOSE'))
                      t.data == r + '-AD-CLOSE' &&
                        document.getElementById('aedi-div-' + r).remove();
                  }
                }
              });
              var k = document.getElementById('aedi-div-' + r);
              (k.style.position = 'absolute'),
                (self.interval[index] = setInterval(function () {
                  var t = self.offset3(img);
                  img.complete &&
                    self.isVisible(img) &&
                    ((k.style.left = t.left + 'px'),
                    (k.style.top = t.top + 'px'));
                }, 100));
            }
          }
      }

      function showAD(url) {
        // console.log(location.host);
        return (
          loadJSONP(url, function (responseJson) {
            if (!responseJson || responseJson.length == 0) return;
            if (
              responseJson.template !== undefined &&
              responseJson.template === 'secretbox'
            ) {
              show_secret_box(responseJson);
              // page view 로그는 한번만 남긴다.
              pv_imp_url = responseJson.data.pv_imp_url;
              if (self.is_pv === false) {
                var pv_imp = new Image();
                pv_imp.src = pv_imp_url + '&u=' + self.uid;
                self.is_pv = true;
              }
            } else if (
              responseJson.template !== undefined &&
              responseJson.template === 'DOUBLE_EDGE'
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
            } else if (
              responseJson.ver !== undefined &&
              responseJson.ver === '2'
            ) {
              var imageOffsetTop = img.offsetTop;
              var imageOffsetLeft = img.offsetLeft;
              // addiv.setAttribute("style", "width: " + resp.data.width + "px; z-index: 1; padding: 0; cursor: pointer;position: absolute;text-align: center;overflow: visible; margin:" + newsImageMargin + "; top:" + imageOffsetTop + "px; left:" + imageOffsetLeft + "px;"),

              // var imgrect = img.getBoundingClientRect();
              img.parentNode.style.position = 'static';
              var addiv = document.createElement('div');
              var newsImageMargin = window
                .getComputedStyle(img)
                .getPropertyValue('margin');
              addiv.id = 'aedi-div-' + r;
              addiv.setAttribute('class', 'pxButton');
              addiv.setAttribute(
                'style',
                'width: ' +
                  responseJson.data.width +
                  'px !important; height: 160px; z-index: 1; padding: 0; cursor: pointer;position: absolute;text-align: center;overflow: visible; margin:' +
                  newsImageMargin +
                  'px;'
              ),
                addiv.setAttribute('marginwidth', '0');
              addiv.setAttribute('marginheight', '0');
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

              var adframe = document.createElement('iframe');
              adframe.src = responseJson.data.src;
              adframe.width = responseJson.data.width;
              adframe.height = responseJson.data.height;
              adframe.setAttribute(
                'style',
                'position: relative;left: 0; top: 0; margin: 0; padding: 0; left:' +
                  responseJson.left +
                  '; width:' +
                  responseJson.data.width +
                  'px; height:' +
                  responseJson.data.height +
                  'px;'
              );
              adframe.setAttribute('frameborder', '0');
              adframe.setAttribute('scrolling', 'no');
              adframe.setAttribute('marginwidth', '0');
              adframe.setAttribute('marginheight', '0');
              adframe.setAttribute('vspace', '0');
              adframe.setAttribute('hspace', '0');
              adframe.setAttribute('allowtransparency', 'true');
              addiv.appendChild(adframe);
              img.before(addiv);

              // page view 로그는 한번만 남긴다.
              pv_imp_url = responseJson.pv_imp_url;
              if (self.is_pv === false) {
                var pv_imp = new Image();
                pv_imp.src = pv_imp_url + '&u=' + self.uid;
                self.is_pv = true;
              }
            } else if (
              responseJson.ver === undefined &&
              responseJson.status === 'SUCCESS'
            ) {
              // var responseJson = {
              //   "status": "SUCCESS",
              //   "data": {
              //       "cnt": 2,
              //       "product": [{
              //           "img_url": "//m.media-amazon.com/images/I/516-CJo-W+L._MCnd_AC_UL320_.jpg",
              //           "imp_url": "https://usstat.aedi.ai/v1/pimg?k=JFkOwojN4QzM6I1SFZVSMpDMyEjOXJ1S6AFNNRjVHdzQwI0X1ATNxoDN0UDN6UzNkdTOwIWMmV2NkZGM5ETZ4EmZwIzM0QTZ5cTYidDZ6IDM2oTN0UDN",
              //           "imp2_url": "https://uslog.aedi.ai/log/log.php?k=JFkOwojN4QzM6I1SFZVSMpDMyEjOXJ1S6AFNNRjVHdzQwI0X1ATNxoDN0UDN6UzNkdTOwIWMmV2NkZGM5ETZ4EmZwIzM0QTZ5cTYidDZ6IDM2oTN0UDN&s=602&ad=AI",
              //           "pv_imp_url": "https://uslog.aedi.ai/log/log.php?k=JFkOwojN4QzM6I1SFZVSMpDMyEjOXJ1S6AFNNRjVHdzQwI0X1ATNxoDN0UDN6UzNkdTOwIWMmV2NkZGM5ETZ4EmZwIzM0QTZ5cTYidDZ6IDM2oTN0UDN&s=602&ad=AI&pv=1",
              //           "click_url": "https://uscl.aedi.ai/v1/link?au=4544&fp=&ik=1335646121.1711089816&k=JFkOwojN4QzM6I1SFZVSMpDMyEjOXJ1S6AFNNRjVHdzQwI0X1ATNxoDN0UDN6UzNkdTOwIWMmV2NkZGM5ETZ4EmZwIzM0QTZ5cTYidDZ6IDM2oTN0UDN&t=%3DAjMtUDMpRWZh1zZhR3PyUjN0EzXx8lcz1jZlJ3LQRTT0Y1R3MEMC9Cck9SbvNmLu9meh1WYuc3d39yL6MHc0RHa&loc=aHR0cHM6Ly93d3cuc3R5bGVjcmF6ZS5jb20vYXJ0aWNsZXMvYmVzdC1la291YWVyLXdvbWVuLXN3aW1zdWl0Lw%3D%3D",
              //           "abf_info": {
              //               "class": "Default",
              //               "padded_rb_point": [207, 320],
              //               "resize_ratio": 0.41875,
              //               "lt_point": [7.16418, 11.9403],
              //               "color": [[255, 255, 255], [255, 255, 255]],
              //               "status": "S"
              //           }
              //       }, {
              //           "img_url": "//www.classsup.com/shopimages/okcom2017/0180040000542.jpg",
              //           "imp_url": "https://stat.aedi.ai/v1/pimg?k=%3DkUQ6AjO2UjNzojULVkVJxkOwITM6clULpTO3UzXyEjNxoTMzgzM6kDO0YmMzUzNmBDNyETMyQjM4QGO5MzNjVGN2YTNiNGZ6kTN2ojN0UzM",
              //           "imp2_url": "https://log.aedi.ai/log/log.php?k=%3DkUQ6AjO2UjNzojULVkVJxkOwITM6clULpTO3UzXyEjNxoTMzgzM6kDO0YmMzUzNmBDNyETMyQjM4QGO5MzNjVGN2YTNiNGZ6kTN2ojN0UzM&s=659&ad=AI",
              //           "pv_imp_url": "https://log.aedi.ai/log/log.php?k=%3DkUQ6AjO2UjNzojULVkVJxkOwITM6clULpTO3UzXyEjNxoTMzgzM6kDO0YmMzUzNmBDNyETMyQjM4QGO5MzNjVGN2YTNiNGZ6kTN2ojN0UzM&s=659&ad=AI&pv=1",
              //           "click_url": "https://cl.aedi.ai/v1/link?au=3831&fp=&ik=1508592352.1711090659&k=%3DkUQ6AjO2UjNzojULVkVJxkOwITM6clULpTO3UzXyEjNxoTMzgzM6kDO0YmMzUzNmBDNyETMyQjM4QGO5MzNjVGN2YTNiNGZ6kTN2ojN0UzM&t=5cTN9QWa1RmbhJnY%2FwWb0hmL4VGZul2Lt92YuAXdzN3chx2Yuc3d39yL6MHc0RHa&loc=aHR0cHM6Ly93d3cuaW5jaGVvbmlsYm8uY29tL25ld3MvYXJ0aWNsZVZpZXcuaHRtbD9pZHhubz0xMjQwMTIz",
              //           "abf_info": {
              //               "class": "Default",
              //               "padded_rb_point": [600, 600],
              //               "resize_ratio": 0.22333,
              //               "lt_point": [13.43304, 22.38839],
              //               "color": [[228, 228, 228], [221, 222, 217]],
              //               "status": "S"
              //           }
              //       }],
              //       "pv_imp_url": "https://log.aedi.ai/log/log.php?k=%3DkUQ6AjO2UjNzojULVkVJxkOwITM6clULpTO3UzXyEjNxoTMzgzM6kDO0YmMzUzNmBDNyETMyQjM4QGO5MzNjVGN2YTNiNGZ6kTN2ojN0UzM&s=659&ad=AI&pv=1",
              //       "resize_ratio": 1.14,
              //       "sensibility": "0.07",
              //       "serer_ip": "192.168.56.101",
              //       "zIndex": "10",
              //       "c_key": "dcb5664ec7398d824211240f7532f489",
              //       "is_amber": 0,
              //       "is_aedi": 1
              //   }
              // }
              //      var responseJson = {
              //     "status": "SUCCESS",
              //   "data": {
              //       "template": "LOGO_EDGE",
              //       "img_url": "//img.mytheresa.com/1000/1000/95/jpeg/catalog/product/ab/P00922877.jpg",
              //       "logo_url": "https://static.piclick.kr/images/logos/5501.jpg",
              //       "imp_url": "",
              //       "imp2_url": "https://log.aedi.ai/log/log.php?k=%3DkUQ6AjOxATN1ojULVkVJxkOwATM6clULpzN3gjMykDMwA1X0EzMyoDNyUTN6ATY5MmYiNDZlhjZmJWNiRGMxczNlRjY4cjZmFWZkJWZ6MTO0ojNyEzM&s=493&ad=AI",
              //       "pv_imp_url": "https://log.aedi.ai/log/log.php?k=%3DkUQ6AjOxATN1ojULVkVJxkOwATM6clULpzN3gjMykDMwA1X0EzMyoDNyUTN6ATY5MmYiNDZlhjZmJWNiRGMxczNlRjY4cjZmFWZkJWZ6MTO0ojNyEzM&s=493&ad=AI&pv=1",
              //       "click_url": "https://cl.aedi.ai/v1/link?au=5524&fp=ec8a7e55716b6b6b98e22c9847949aa1&ik=1907964325.1721701766&k=%3DkUQ6AjOxATN1ojULVkVJxkOwATM6clULpzN3gjMykDMwA1X0EzMyoDNyUTN6ATY5MmYiNDZlhjZmJWNiRGMxczNlRjY4cjZmFWZkJWZ6MTO0ojNyEzM&t=3cDOyITOwADcts2YhxmYtIXZ6FGbi1CZlR3chVmci1SZsdmbpNXLpxWYtF2atEWby9mbGJTJuVWbvdnRyUybrZkMlI3aGJTJt92YuE2clJXZoRXet5yd3dnRyUiRyUSQzUycwRHdo1DbyV3P4cjNyYDNzETLzQjM2QDMxATMts2Ypx2YvQXZu5yd2x2biBHZuc3d39yL6MHc0RHa&loc=aHR0cHM6Ly9mYW5uc3Rhci50Zi5jby5rci9mbm5ld3MvcmVhZC8xMTQ5ODAjX1BB",
              //       "abf_info": {
              //           "class": "Outer",
              //           "color": [[241, 241, 241], [241, 241, 241]],
              //           "lt_point": [134, 0],
              //           "padded_rb_point": [1002.9473684210526, 1000],
              //           "resize_ratio": 0.14960629921259844,
              //           "status": "S",
              //           "statuscode": "210",
              //           "time": 0.346088171005249,
              //           "img_key": "938cd8bc530a3dd74305df07daca787b"
              //       },
              //       "abf_logo": {
              //           "class": "Top",
              //           "color": [[255, 255, 255], [255, 255, 255]],
              //           "lt_point": [0, 0],
              //           "padded_rb_point": [332, 368],
              //           "resize_ratio": 0.5,
              //           "status": "S",
              //           "statuscode": "210",
              //           "time": 0.1833019256591797
              //       },
              //       "resize_ratio": 1.14,
              //       "sensibility": "0.07",
              //       "serer_ip": "10.5.0.8",
              //       "zIndex": "10",
              //       "c_key": "ebdeaff78b4e7710db5bff8ed3bbc9a0",
              //       "is_amber": 0,
              //       "is_aedi": 1
              //   }
              // };
              if (responseJson.data.cnt) {
                async function processAds() {
                  var aedi_el = [];

                  for (var index = 0; index < responseJson.data.cnt; index++) {
                    var el = responseJson.data.product[index];

                    aedi_el.push(showCanvasDoubleAD(responseJson, el, index));
                  }

                  if (responseJson.data.cnt > 1) {
                    aedi_el[0].style.display = 'none';
                    setInterval(() => {
                      if (
                        window.getComputedStyle(aedi_el[0]).display !== 'none'
                      ) {
                        aedi_el[0].style.display = 'none';
                        if (aedi_el[1]) {
                          aedi_el[1].style.display = 'block';
                        }
                      } else {
                        aedi_el[0].style.display = 'block';
                        if (aedi_el[1]) {
                          aedi_el[1].style.display = 'none';
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
        const aedi_div = document.createElement('div');
        const aedi_wrap = document.createElement('div');
        const aedi_pos = document.createElement('div');
        const aedi_logoBox = document.createElement('div');
        const aedi_logoAD = document.createElement('a');
        const aedi_logoImg = new Image();
        aedi_logoImg.src = 'https://thcdn2.aedi.ai/common/img/aediAI_blue.png';
        aedi_logoImg.style.width = 'auto !important';

        if (scroll_flag === '0') {
          var aedi_style =
            'position:relative; left:0; bottom:0; height:0px; border: 1px solid #ddd; z-index:100;';
        } else {
          var aedi_style =
            'position:absolute; left:0; bottom:0; height:0px; overflow:hidden; border: 1px solid #ddd; z-index:-1000';
          aedi_style = aedi_style + 'transition: ' + String(view_speed) + 's;';
          aedi_style =
            aedi_style + 'transform:translateY(-' + String(pic_height) + 'px);';
        }

        //bottom box wrapper
        aedi_pos.setAttribute('class', 'pic_position');
        aedi_pos.setAttribute(
          'style',
          'position: relative; display:flex; justify-content:center'
        );

        aedi_wrap.setAttribute('class', 'aedi_bottom_wrapper');
        aedi_wrap.setAttribute('id', 'pbox_second');
        aedi_wrap.setAttribute(
          'style',
          'width:100%; min-width:(' +
            ad_minWith +
            'px); position:absolute; left:0; bottom:0; overflow:hidden; margin-top: 14px;z-index:-1000; height:0; transition: ' +
            Number(view_speed) +
            's; transform:translateY(-' +
            Number(pic_height) +
            'px);'
        );

        aedi_logoBox.setAttribute('class', 'aedi_logo_box');
        aedi_logoBox.appendChild(aedi_logoAD);
        aedi_logoBox.setAttribute(
          'style',
          'width:100%; height:20px; display:flex; align-items:center; justify-content: flex-end; transition: ' +
            Number(view_speed + 0.4) +
            's; transform:translateY(-' +
            Number(pic_height) * 2 +
            'px);'
        );

        aedi_logoAD.setAttribute('href', 'https://www.aedi.me');
        aedi_logoAD.setAttribute('target', '_blank');
        aedi_logoAD.setAttribute('style', 'margin-right:2px; height:100%');
        aedi_logoAD.appendChild(aedi_logoImg);

        aedi_div.setAttribute('class', 'aedi_bottom');
        aedi_div.setAttribute(
          'style',
          'position:absolute; left:0; bottom:0; width:99.8%; height:86%; border: 1px solid #ddd; transition: ' +
            Number(view_speed + 0.5) +
            's; transform:translateY(-' +
            Number(pic_height) +
            'px);'
        );

        aedi_box.after(aedi_pos);
        aedi_wrap.appendChild(aedi_logoBox);
        aedi_wrap.appendChild(aedi_div);
        aedi_div.insertAdjacentHTML('beforeend', ad_HTML);
        aedi_pos.appendChild(aedi_wrap);

        const elbottom = aedi_wrap;
        const bottom_box = aedi_div;

        const aedi_box_create = function () {
          elbottom.classList.add('pic_height');
          bottom_box.classList.add('pic_trans');
          const pic_move = elbottom;
          const pic_trans = bottom_box;
          const bottomItem = bottom_box.getElementsByClassName(
            'prd_secretbox_wrapper'
          );

          if (pic_move !== null) {
            for (let i = 0; i < bottomItem.length; i++) {
              const pic_infoboxName =
                bottomItem[i].querySelector('.pic_infoboxName');
              const pic_infobox = bottomItem[i].querySelector('.pic_infobox');
              const pic_infoboxPrice =
                bottomItem[i].querySelector('.pic_price');
              if (pic_infobox) {
                pic_infobox.style.opacity = '0';
                pic_infobox.style.animationName = 'aedi_fadeup';
                pic_infobox.style.animationDuration = '1.4s';
                pic_infobox.style.animationDelay = '1s';
                pic_infobox.style.animationTimingFunction = 'ease';
                pic_infobox.style.animationFillMode = 'forwards';
              }
              if (pic_infoboxName && pic_infobox && pic_infoboxPrice) {
                bottomItem[i].addEventListener('mouseover', function () {
                  pic_infobox.style.opacity = '1';
                  pic_infobox.style.animationName = 'aedi_heightUp';
                  pic_infobox.style.transition = '1s';
                  pic_infobox.style.animationDuration = '0.5s';
                  pic_infobox.style.animationDelay = '0s';
                  pic_infobox.style.animationFillMode = 'forwards';
                  pic_infoboxPrice.style.height = '68px';
                  pic_infoboxName.style.animationName = 'aedi_heightUp';
                  pic_infoboxName.style.transition = '1s';
                  pic_infoboxName.style.animationDuration = '0.5s';
                  pic_infoboxName.style.animationDelay = '0s';
                  pic_infoboxName.style.animationTimingFunction = 'ease';
                  pic_infoboxName.style.animationFillMode = 'forwards';
                });
                bottomItem[i].addEventListener('mouseout', function () {
                  pic_infobox.style.opacity = '1';
                  pic_infobox.style.animationName = 'aedi_InfoheightDown';
                  pic_infobox.style.transition = '1s';
                  pic_infobox.style.animationDuration = '0.5s';
                  pic_infobox.style.animationDelay = '0s';
                  pic_infobox.style.animationFillMode = 'forwards';
                  pic_infoboxPrice.style.height = '26px';
                  pic_infoboxName.style.animationName = 'aedi_heightDown';
                  pic_infoboxName.style.transition = '1s';
                  pic_infoboxName.style.animationDuration = '0.5s';
                  pic_infoboxName.style.animationDelay = '0s';
                  pic_infoboxName.style.animationTimingFunction = 'ease';
                  pic_infoboxName.style.animationFillMode = 'forwards';
                });
              }
            }
            pic_move.style.position = 'relative';
            pic_move.style.minWidth = ad_minWith + 'px';
            pic_move.style.transform = 'translateY(0px)';
            pic_move.style.height = pic_height + 'px';
            pic_move.style.zIndex = '1000';
            pic_move.style.maxWidth = ad_maxWith + 'px';
            pic_trans.style.transform = 'translateY(0px)';
            aedi_logoBox.style.transform = 'translateY(0px)';
            bottomItem[bottomItem.length - 1].style.borderRight = 'none';
          }
        };

        if (scroll_flag === '1') {
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
    if ((rand = Math.random()) < self.getAttribute('sensibility'))
      window.open(self.href, '_blank');
  };

  var touchEvent2 = function (elem, e) {
    var self = elem;
    if ((rand = Math.random()) < self.getAttribute('sensibility'))
      window.open(self.href, '_blank');
  };

  var iframeloaded = function (t, e) {
    switch (t) {
      case 'ai':
        $('.pxButton').css('display', ''),
          $('.aedi-iframe#' + e).css('opacity', '1'),
          $('.aedi-ai-ad-' + e).css('opacity', '1');
        // ,
        // setInterval(function () {
        //   "none" == $(".aedi-ai-ad-" + e).css("display") ? ($(".aedi-iframe#" + e).css("opacity", "1"),
        //     $(".aedi-ai-ad-" + e).css("display", "")) : ($(".aedi-iframe#" + e).css("opacity", "0"),
        //       $(".aedi-ai-ad-" + e).css("display", "none"))
        // }, 2e3);
        break;
      case 'left2right':
        var i = 0,
          n = 80,
          o = 100,
          r = 160;
        setInterval(function () {
          $('.pxButton').css('display', ''),
            $('.aedi-iframe').css('opacity', '1'),
            i == n + 1
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-3"]').css(
                  'display',
                  ''
                ))
              : i == n + 2
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-2"]').css(
                  'display',
                  ''
                ))
              : i == n + 3
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-1"]').css(
                  'display',
                  ''
                ))
              : i <= o && i > n + 3
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-0"]').css(
                  'display',
                  ''
                ))
              : i == o + 1
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-1"]').css(
                  'display',
                  ''
                ))
              : i == o + 2
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-2"]').css(
                  'display',
                  ''
                ))
              : ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-3"]').css(
                  'display',
                  ''
                )),
            ++i == r && (i = 0);
        }, 30);
        break;
      case 'updown':
        (i = 0), (n = 80), (o = 100), (r = 160);
        setInterval(function () {
          $('.pxButton').css('display', ''),
            $('.aedi-iframe').css('opacity', '1'),
            i == n + 1
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-4"]').css(
                  'display',
                  ''
                ))
              : i == n + 2
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-3"]').css(
                  'display',
                  ''
                ))
              : i == n + 3
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-2"]').css(
                  'display',
                  ''
                ))
              : i == n + 4
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-1"]').css(
                  'display',
                  ''
                ))
              : i <= o && i > n + 4
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-0"]').css(
                  'display',
                  ''
                ))
              : i == o + 1
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-1"]').css(
                  'display',
                  ''
                ))
              : i == o + 2
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-2"]').css(
                  'display',
                  ''
                ))
              : i == o + 3
              ? ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-3"]').css(
                  'display',
                  ''
                ))
              : ($('.aedi-net-ad-' + e).css('display', 'none'),
                $('.aedi-net-ad-' + e + '[id="aedi-paper-4"]').css(
                  'display',
                  ''
                )),
            ++i == r && (i = 0);
        }, 30);
        break;
    }
  };

  var aisum_previousUrl = location.href.split('#')[0];

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


        console.log('[AEDI] SPA page changed from', aisum_currentUrl, 'to', location.href);

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




      if (document.location.href.startsWith('https://www.tnews.co.th/') || document.location.href.startsWith('https://www.khaosod.co.th/')) {
        var intv = setInterval(() => {
          if (document.querySelector('.visible-content .widget-btn')) {
            var widgetBtn = document.querySelector('.visible-content .widget-btn');
            if (widgetBtn) {
              clearInterval(intv);
              
              // 버튼 클릭 이벤트 리스너 추가
              widgetBtn.addEventListener('click', () => {
                var divs = document.querySelectorAll('.pxButton');
                divs.forEach(function (div, index) {
                  var aediLink = div.closest('.aedi-link');
                  if (aediLink) {
                    aediLink.style.display = '';
                  }
                  div.style.display = '';
                });
              });
        
              // 처음에는 버튼을 감춰두는 코드 실행
              var divs = document.querySelectorAll('.pxButton');
              divs.forEach(function (div, index) {
                var aediLink = div.closest('.aedi-link');
                if (aediLink) {
                  aediLink.style.display = 'none';
                }
                div.style.display = 'none';
              });
            }
          }
        }, 500);
      }
    }
  });

  const aisum_config = { subtree: true, childList: true };
  aisum_observer.observe(document, aisum_config);
}