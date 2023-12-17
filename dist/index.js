(() => {
  var e = {
    351: function (e, t, r) {
      'use strict';
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r];
                },
              });
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var s =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== 'default' && Object.hasOwnProperty.call(e, r))
                n(t, e, r);
          s(t, e);
          return t;
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.issue = t.issueCommand = void 0;
      const o = i(r(37));
      const a = r(278);
      function issueCommand(e, t, r) {
        const n = new Command(e, t, r);
        process.stdout.write(n.toString() + o.EOL);
      }
      t.issueCommand = issueCommand;
      function issue(e, t = '') {
        issueCommand(e, {}, t);
      }
      t.issue = issue;
      const u = '::';
      class Command {
        constructor(e, t, r) {
          if (!e) {
            e = 'missing.command';
          }
          this.command = e;
          this.properties = t;
          this.message = r;
        }
        toString() {
          let e = u + this.command;
          if (this.properties && Object.keys(this.properties).length > 0) {
            e += ' ';
            let t = true;
            for (const r in this.properties) {
              if (this.properties.hasOwnProperty(r)) {
                const n = this.properties[r];
                if (n) {
                  if (t) {
                    t = false;
                  } else {
                    e += ',';
                  }
                  e += `${r}=${escapeProperty(n)}`;
                }
              }
            }
          }
          e += `${u}${escapeData(this.message)}`;
          return e;
        }
      }
      function escapeData(e) {
        return a
          .toCommandValue(e)
          .replace(/%/g, '%25')
          .replace(/\r/g, '%0D')
          .replace(/\n/g, '%0A');
      }
      function escapeProperty(e) {
        return a
          .toCommandValue(e)
          .replace(/%/g, '%25')
          .replace(/\r/g, '%0D')
          .replace(/\n/g, '%0A')
          .replace(/:/g, '%3A')
          .replace(/,/g, '%2C');
      }
    },
    186: function (e, t, r) {
      'use strict';
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r];
                },
              });
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var s =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== 'default' && Object.hasOwnProperty.call(e, r))
                n(t, e, r);
          s(t, e);
          return t;
        };
      var o =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          function adopt(e) {
            return e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                });
          }
          return new (r || (r = Promise))(function (r, s) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                s(e);
              }
            }
            function rejected(e) {
              try {
                step(n['throw'](e));
              } catch (e) {
                s(e);
              }
            }
            function step(e) {
              e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.getIDToken =
        t.getState =
        t.saveState =
        t.group =
        t.endGroup =
        t.startGroup =
        t.info =
        t.notice =
        t.warning =
        t.error =
        t.debug =
        t.isDebug =
        t.setFailed =
        t.setCommandEcho =
        t.setOutput =
        t.getBooleanInput =
        t.getMultilineInput =
        t.getInput =
        t.addPath =
        t.setSecret =
        t.exportVariable =
        t.ExitCode =
          void 0;
      const a = r(351);
      const u = r(717);
      const c = r(278);
      const l = i(r(37));
      const f = i(r(17));
      const d = r(41);
      var p;
      (function (e) {
        e[(e['Success'] = 0)] = 'Success';
        e[(e['Failure'] = 1)] = 'Failure';
      })((p = t.ExitCode || (t.ExitCode = {})));
      function exportVariable(e, t) {
        const r = c.toCommandValue(t);
        process.env[e] = r;
        const n = process.env['GITHUB_ENV'] || '';
        if (n) {
          return u.issueFileCommand('ENV', u.prepareKeyValueMessage(e, t));
        }
        a.issueCommand('set-env', { name: e }, r);
      }
      t.exportVariable = exportVariable;
      function setSecret(e) {
        a.issueCommand('add-mask', {}, e);
      }
      t.setSecret = setSecret;
      function addPath(e) {
        const t = process.env['GITHUB_PATH'] || '';
        if (t) {
          u.issueFileCommand('PATH', e);
        } else {
          a.issueCommand('add-path', {}, e);
        }
        process.env['PATH'] = `${e}${f.delimiter}${process.env['PATH']}`;
      }
      t.addPath = addPath;
      function getInput(e, t) {
        const r =
          process.env[`INPUT_${e.replace(/ /g, '_').toUpperCase()}`] || '';
        if (t && t.required && !r) {
          throw new Error(`Input required and not supplied: ${e}`);
        }
        if (t && t.trimWhitespace === false) {
          return r;
        }
        return r.trim();
      }
      t.getInput = getInput;
      function getMultilineInput(e, t) {
        const r = getInput(e, t)
          .split('\n')
          .filter((e) => e !== '');
        if (t && t.trimWhitespace === false) {
          return r;
        }
        return r.map((e) => e.trim());
      }
      t.getMultilineInput = getMultilineInput;
      function getBooleanInput(e, t) {
        const r = ['true', 'True', 'TRUE'];
        const n = ['false', 'False', 'FALSE'];
        const s = getInput(e, t);
        if (r.includes(s)) return true;
        if (n.includes(s)) return false;
        throw new TypeError(
          `Input does not meet YAML 1.2 "Core Schema" specification: ${e}\n` +
            `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``,
        );
      }
      t.getBooleanInput = getBooleanInput;
      function setOutput(e, t) {
        const r = process.env['GITHUB_OUTPUT'] || '';
        if (r) {
          return u.issueFileCommand('OUTPUT', u.prepareKeyValueMessage(e, t));
        }
        process.stdout.write(l.EOL);
        a.issueCommand('set-output', { name: e }, c.toCommandValue(t));
      }
      t.setOutput = setOutput;
      function setCommandEcho(e) {
        a.issue('echo', e ? 'on' : 'off');
      }
      t.setCommandEcho = setCommandEcho;
      function setFailed(e) {
        process.exitCode = p.Failure;
        error(e);
      }
      t.setFailed = setFailed;
      function isDebug() {
        return process.env['RUNNER_DEBUG'] === '1';
      }
      t.isDebug = isDebug;
      function debug(e) {
        a.issueCommand('debug', {}, e);
      }
      t.debug = debug;
      function error(e, t = {}) {
        a.issueCommand(
          'error',
          c.toCommandProperties(t),
          e instanceof Error ? e.toString() : e,
        );
      }
      t.error = error;
      function warning(e, t = {}) {
        a.issueCommand(
          'warning',
          c.toCommandProperties(t),
          e instanceof Error ? e.toString() : e,
        );
      }
      t.warning = warning;
      function notice(e, t = {}) {
        a.issueCommand(
          'notice',
          c.toCommandProperties(t),
          e instanceof Error ? e.toString() : e,
        );
      }
      t.notice = notice;
      function info(e) {
        process.stdout.write(e + l.EOL);
      }
      t.info = info;
      function startGroup(e) {
        a.issue('group', e);
      }
      t.startGroup = startGroup;
      function endGroup() {
        a.issue('endgroup');
      }
      t.endGroup = endGroup;
      function group(e, t) {
        return o(this, void 0, void 0, function* () {
          startGroup(e);
          let r;
          try {
            r = yield t();
          } finally {
            endGroup();
          }
          return r;
        });
      }
      t.group = group;
      function saveState(e, t) {
        const r = process.env['GITHUB_STATE'] || '';
        if (r) {
          return u.issueFileCommand('STATE', u.prepareKeyValueMessage(e, t));
        }
        a.issueCommand('save-state', { name: e }, c.toCommandValue(t));
      }
      t.saveState = saveState;
      function getState(e) {
        return process.env[`STATE_${e}`] || '';
      }
      t.getState = getState;
      function getIDToken(e) {
        return o(this, void 0, void 0, function* () {
          return yield d.OidcClient.getIDToken(e);
        });
      }
      t.getIDToken = getIDToken;
      var h = r(327);
      Object.defineProperty(t, 'summary', {
        enumerable: true,
        get: function () {
          return h.summary;
        },
      });
      var g = r(327);
      Object.defineProperty(t, 'markdownSummary', {
        enumerable: true,
        get: function () {
          return g.markdownSummary;
        },
      });
      var v = r(981);
      Object.defineProperty(t, 'toPosixPath', {
        enumerable: true,
        get: function () {
          return v.toPosixPath;
        },
      });
      Object.defineProperty(t, 'toWin32Path', {
        enumerable: true,
        get: function () {
          return v.toWin32Path;
        },
      });
      Object.defineProperty(t, 'toPlatformPath', {
        enumerable: true,
        get: function () {
          return v.toPlatformPath;
        },
      });
    },
    717: function (e, t, r) {
      'use strict';
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r];
                },
              });
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var s =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== 'default' && Object.hasOwnProperty.call(e, r))
                n(t, e, r);
          s(t, e);
          return t;
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.prepareKeyValueMessage = t.issueFileCommand = void 0;
      const o = i(r(147));
      const a = i(r(37));
      const u = r(840);
      const c = r(278);
      function issueFileCommand(e, t) {
        const r = process.env[`GITHUB_${e}`];
        if (!r) {
          throw new Error(
            `Unable to find environment variable for file command ${e}`,
          );
        }
        if (!o.existsSync(r)) {
          throw new Error(`Missing file at path: ${r}`);
        }
        o.appendFileSync(r, `${c.toCommandValue(t)}${a.EOL}`, {
          encoding: 'utf8',
        });
      }
      t.issueFileCommand = issueFileCommand;
      function prepareKeyValueMessage(e, t) {
        const r = `ghadelimiter_${u.v4()}`;
        const n = c.toCommandValue(t);
        if (e.includes(r)) {
          throw new Error(
            `Unexpected input: name should not contain the delimiter "${r}"`,
          );
        }
        if (n.includes(r)) {
          throw new Error(
            `Unexpected input: value should not contain the delimiter "${r}"`,
          );
        }
        return `${e}<<${r}${a.EOL}${n}${a.EOL}${r}`;
      }
      t.prepareKeyValueMessage = prepareKeyValueMessage;
    },
    41: function (e, t, r) {
      'use strict';
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          function adopt(e) {
            return e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                });
          }
          return new (r || (r = Promise))(function (r, s) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                s(e);
              }
            }
            function rejected(e) {
              try {
                step(n['throw'](e));
              } catch (e) {
                s(e);
              }
            }
            function step(e) {
              e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.OidcClient = void 0;
      const s = r(255);
      const i = r(526);
      const o = r(186);
      class OidcClient {
        static createHttpClient(e = true, t = 10) {
          const r = { allowRetries: e, maxRetries: t };
          return new s.HttpClient(
            'actions/oidc-client',
            [new i.BearerCredentialHandler(OidcClient.getRequestToken())],
            r,
          );
        }
        static getRequestToken() {
          const e = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
          if (!e) {
            throw new Error(
              'Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable',
            );
          }
          return e;
        }
        static getIDTokenUrl() {
          const e = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
          if (!e) {
            throw new Error(
              'Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable',
            );
          }
          return e;
        }
        static getCall(e) {
          var t;
          return n(this, void 0, void 0, function* () {
            const r = OidcClient.createHttpClient();
            const n = yield r.getJson(e).catch((e) => {
              throw new Error(
                `Failed to get ID Token. \n \n        Error Code : ${e.statusCode}\n \n        Error Message: ${e.result.message}`,
              );
            });
            const s =
              (t = n.result) === null || t === void 0 ? void 0 : t.value;
            if (!s) {
              throw new Error('Response json body do not have ID Token field');
            }
            return s;
          });
        }
        static getIDToken(e) {
          return n(this, void 0, void 0, function* () {
            try {
              let t = OidcClient.getIDTokenUrl();
              if (e) {
                const r = encodeURIComponent(e);
                t = `${t}&audience=${r}`;
              }
              o.debug(`ID token url is ${t}`);
              const r = yield OidcClient.getCall(t);
              o.setSecret(r);
              return r;
            } catch (e) {
              throw new Error(`Error message: ${e.message}`);
            }
          });
        }
      }
      t.OidcClient = OidcClient;
    },
    981: function (e, t, r) {
      'use strict';
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r];
                },
              });
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var s =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== 'default' && Object.hasOwnProperty.call(e, r))
                n(t, e, r);
          s(t, e);
          return t;
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.toPlatformPath = t.toWin32Path = t.toPosixPath = void 0;
      const o = i(r(17));
      function toPosixPath(e) {
        return e.replace(/[\\]/g, '/');
      }
      t.toPosixPath = toPosixPath;
      function toWin32Path(e) {
        return e.replace(/[/]/g, '\\');
      }
      t.toWin32Path = toWin32Path;
      function toPlatformPath(e) {
        return e.replace(/[/\\]/g, o.sep);
      }
      t.toPlatformPath = toPlatformPath;
    },
    327: function (e, t, r) {
      'use strict';
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          function adopt(e) {
            return e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                });
          }
          return new (r || (r = Promise))(function (r, s) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                s(e);
              }
            }
            function rejected(e) {
              try {
                step(n['throw'](e));
              } catch (e) {
                s(e);
              }
            }
            function step(e) {
              e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.summary =
        t.markdownSummary =
        t.SUMMARY_DOCS_URL =
        t.SUMMARY_ENV_VAR =
          void 0;
      const s = r(37);
      const i = r(147);
      const { access: o, appendFile: a, writeFile: u } = i.promises;
      t.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
      t.SUMMARY_DOCS_URL =
        'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
      class Summary {
        constructor() {
          this._buffer = '';
        }
        filePath() {
          return n(this, void 0, void 0, function* () {
            if (this._filePath) {
              return this._filePath;
            }
            const e = process.env[t.SUMMARY_ENV_VAR];
            if (!e) {
              throw new Error(
                `Unable to find environment variable for $${t.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`,
              );
            }
            try {
              yield o(e, i.constants.R_OK | i.constants.W_OK);
            } catch (t) {
              throw new Error(
                `Unable to access summary file: '${e}'. Check if the file has correct read/write permissions.`,
              );
            }
            this._filePath = e;
            return this._filePath;
          });
        }
        wrap(e, t, r = {}) {
          const n = Object.entries(r)
            .map(([e, t]) => ` ${e}="${t}"`)
            .join('');
          if (!t) {
            return `<${e}${n}>`;
          }
          return `<${e}${n}>${t}</${e}>`;
        }
        write(e) {
          return n(this, void 0, void 0, function* () {
            const t = !!(e === null || e === void 0 ? void 0 : e.overwrite);
            const r = yield this.filePath();
            const n = t ? u : a;
            yield n(r, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
          });
        }
        clear() {
          return n(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
          });
        }
        stringify() {
          return this._buffer;
        }
        isEmptyBuffer() {
          return this._buffer.length === 0;
        }
        emptyBuffer() {
          this._buffer = '';
          return this;
        }
        addRaw(e, t = false) {
          this._buffer += e;
          return t ? this.addEOL() : this;
        }
        addEOL() {
          return this.addRaw(s.EOL);
        }
        addCodeBlock(e, t) {
          const r = Object.assign({}, t && { lang: t });
          const n = this.wrap('pre', this.wrap('code', e), r);
          return this.addRaw(n).addEOL();
        }
        addList(e, t = false) {
          const r = t ? 'ol' : 'ul';
          const n = e.map((e) => this.wrap('li', e)).join('');
          const s = this.wrap(r, n);
          return this.addRaw(s).addEOL();
        }
        addTable(e) {
          const t = e
            .map((e) => {
              const t = e
                .map((e) => {
                  if (typeof e === 'string') {
                    return this.wrap('td', e);
                  }
                  const { header: t, data: r, colspan: n, rowspan: s } = e;
                  const i = t ? 'th' : 'td';
                  const o = Object.assign(
                    Object.assign({}, n && { colspan: n }),
                    s && { rowspan: s },
                  );
                  return this.wrap(i, r, o);
                })
                .join('');
              return this.wrap('tr', t);
            })
            .join('');
          const r = this.wrap('table', t);
          return this.addRaw(r).addEOL();
        }
        addDetails(e, t) {
          const r = this.wrap('details', this.wrap('summary', e) + t);
          return this.addRaw(r).addEOL();
        }
        addImage(e, t, r) {
          const { width: n, height: s } = r || {};
          const i = Object.assign(
            Object.assign({}, n && { width: n }),
            s && { height: s },
          );
          const o = this.wrap(
            'img',
            null,
            Object.assign({ src: e, alt: t }, i),
          );
          return this.addRaw(o).addEOL();
        }
        addHeading(e, t) {
          const r = `h${t}`;
          const n = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(r) ? r : 'h1';
          const s = this.wrap(n, e);
          return this.addRaw(s).addEOL();
        }
        addSeparator() {
          const e = this.wrap('hr', null);
          return this.addRaw(e).addEOL();
        }
        addBreak() {
          const e = this.wrap('br', null);
          return this.addRaw(e).addEOL();
        }
        addQuote(e, t) {
          const r = Object.assign({}, t && { cite: t });
          const n = this.wrap('blockquote', e, r);
          return this.addRaw(n).addEOL();
        }
        addLink(e, t) {
          const r = this.wrap('a', e, { href: t });
          return this.addRaw(r).addEOL();
        }
      }
      const c = new Summary();
      t.markdownSummary = c;
      t.summary = c;
    },
    278: (e, t) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t.toCommandProperties = t.toCommandValue = void 0;
      function toCommandValue(e) {
        if (e === null || e === undefined) {
          return '';
        } else if (typeof e === 'string' || e instanceof String) {
          return e;
        }
        return JSON.stringify(e);
      }
      t.toCommandValue = toCommandValue;
      function toCommandProperties(e) {
        if (!Object.keys(e).length) {
          return {};
        }
        return {
          title: e.title,
          file: e.file,
          line: e.startLine,
          endLine: e.endLine,
          col: e.startColumn,
          endColumn: e.endColumn,
        };
      }
      t.toCommandProperties = toCommandProperties;
    },
    526: function (e, t) {
      'use strict';
      var r =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          function adopt(e) {
            return e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                });
          }
          return new (r || (r = Promise))(function (r, s) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                s(e);
              }
            }
            function rejected(e) {
              try {
                step(n['throw'](e));
              } catch (e) {
                s(e);
              }
            }
            function step(e) {
              e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.PersonalAccessTokenCredentialHandler =
        t.BearerCredentialHandler =
        t.BasicCredentialHandler =
          void 0;
      class BasicCredentialHandler {
        constructor(e, t) {
          this.username = e;
          this.password = t;
        }
        prepareRequest(e) {
          if (!e.headers) {
            throw Error('The request has no headers');
          }
          e.headers['Authorization'] = `Basic ${Buffer.from(
            `${this.username}:${this.password}`,
          ).toString('base64')}`;
        }
        canHandleAuthentication() {
          return false;
        }
        handleAuthentication() {
          return r(this, void 0, void 0, function* () {
            throw new Error('not implemented');
          });
        }
      }
      t.BasicCredentialHandler = BasicCredentialHandler;
      class BearerCredentialHandler {
        constructor(e) {
          this.token = e;
        }
        prepareRequest(e) {
          if (!e.headers) {
            throw Error('The request has no headers');
          }
          e.headers['Authorization'] = `Bearer ${this.token}`;
        }
        canHandleAuthentication() {
          return false;
        }
        handleAuthentication() {
          return r(this, void 0, void 0, function* () {
            throw new Error('not implemented');
          });
        }
      }
      t.BearerCredentialHandler = BearerCredentialHandler;
      class PersonalAccessTokenCredentialHandler {
        constructor(e) {
          this.token = e;
        }
        prepareRequest(e) {
          if (!e.headers) {
            throw Error('The request has no headers');
          }
          e.headers['Authorization'] = `Basic ${Buffer.from(
            `PAT:${this.token}`,
          ).toString('base64')}`;
        }
        canHandleAuthentication() {
          return false;
        }
        handleAuthentication() {
          return r(this, void 0, void 0, function* () {
            throw new Error('not implemented');
          });
        }
      }
      t.PersonalAccessTokenCredentialHandler =
        PersonalAccessTokenCredentialHandler;
    },
    255: function (e, t, r) {
      'use strict';
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r];
                },
              });
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var s =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== 'default' && Object.hasOwnProperty.call(e, r))
                n(t, e, r);
          s(t, e);
          return t;
        };
      var o =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          function adopt(e) {
            return e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                });
          }
          return new (r || (r = Promise))(function (r, s) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                s(e);
              }
            }
            function rejected(e) {
              try {
                step(n['throw'](e));
              } catch (e) {
                s(e);
              }
            }
            function step(e) {
              e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.HttpClient =
        t.isHttps =
        t.HttpClientResponse =
        t.HttpClientError =
        t.getProxyUrl =
        t.MediaTypes =
        t.Headers =
        t.HttpCodes =
          void 0;
      const a = i(r(685));
      const u = i(r(687));
      const c = i(r(835));
      const l = i(r(294));
      var f;
      (function (e) {
        e[(e['OK'] = 200)] = 'OK';
        e[(e['MultipleChoices'] = 300)] = 'MultipleChoices';
        e[(e['MovedPermanently'] = 301)] = 'MovedPermanently';
        e[(e['ResourceMoved'] = 302)] = 'ResourceMoved';
        e[(e['SeeOther'] = 303)] = 'SeeOther';
        e[(e['NotModified'] = 304)] = 'NotModified';
        e[(e['UseProxy'] = 305)] = 'UseProxy';
        e[(e['SwitchProxy'] = 306)] = 'SwitchProxy';
        e[(e['TemporaryRedirect'] = 307)] = 'TemporaryRedirect';
        e[(e['PermanentRedirect'] = 308)] = 'PermanentRedirect';
        e[(e['BadRequest'] = 400)] = 'BadRequest';
        e[(e['Unauthorized'] = 401)] = 'Unauthorized';
        e[(e['PaymentRequired'] = 402)] = 'PaymentRequired';
        e[(e['Forbidden'] = 403)] = 'Forbidden';
        e[(e['NotFound'] = 404)] = 'NotFound';
        e[(e['MethodNotAllowed'] = 405)] = 'MethodNotAllowed';
        e[(e['NotAcceptable'] = 406)] = 'NotAcceptable';
        e[(e['ProxyAuthenticationRequired'] = 407)] =
          'ProxyAuthenticationRequired';
        e[(e['RequestTimeout'] = 408)] = 'RequestTimeout';
        e[(e['Conflict'] = 409)] = 'Conflict';
        e[(e['Gone'] = 410)] = 'Gone';
        e[(e['TooManyRequests'] = 429)] = 'TooManyRequests';
        e[(e['InternalServerError'] = 500)] = 'InternalServerError';
        e[(e['NotImplemented'] = 501)] = 'NotImplemented';
        e[(e['BadGateway'] = 502)] = 'BadGateway';
        e[(e['ServiceUnavailable'] = 503)] = 'ServiceUnavailable';
        e[(e['GatewayTimeout'] = 504)] = 'GatewayTimeout';
      })((f = t.HttpCodes || (t.HttpCodes = {})));
      var d;
      (function (e) {
        e['Accept'] = 'accept';
        e['ContentType'] = 'content-type';
      })((d = t.Headers || (t.Headers = {})));
      var p;
      (function (e) {
        e['ApplicationJson'] = 'application/json';
      })((p = t.MediaTypes || (t.MediaTypes = {})));
      function getProxyUrl(e) {
        const t = c.getProxyUrl(new URL(e));
        return t ? t.href : '';
      }
      t.getProxyUrl = getProxyUrl;
      const h = [
        f.MovedPermanently,
        f.ResourceMoved,
        f.SeeOther,
        f.TemporaryRedirect,
        f.PermanentRedirect,
      ];
      const g = [f.BadGateway, f.ServiceUnavailable, f.GatewayTimeout];
      const v = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
      const _ = 10;
      const b = 5;
      class HttpClientError extends Error {
        constructor(e, t) {
          super(e);
          this.name = 'HttpClientError';
          this.statusCode = t;
          Object.setPrototypeOf(this, HttpClientError.prototype);
        }
      }
      t.HttpClientError = HttpClientError;
      class HttpClientResponse {
        constructor(e) {
          this.message = e;
        }
        readBody() {
          return o(this, void 0, void 0, function* () {
            return new Promise((e) =>
              o(this, void 0, void 0, function* () {
                let t = Buffer.alloc(0);
                this.message.on('data', (e) => {
                  t = Buffer.concat([t, e]);
                });
                this.message.on('end', () => {
                  e(t.toString());
                });
              }),
            );
          });
        }
      }
      t.HttpClientResponse = HttpClientResponse;
      function isHttps(e) {
        const t = new URL(e);
        return t.protocol === 'https:';
      }
      t.isHttps = isHttps;
      class HttpClient {
        constructor(e, t, r) {
          this._ignoreSslError = false;
          this._allowRedirects = true;
          this._allowRedirectDowngrade = false;
          this._maxRedirects = 50;
          this._allowRetries = false;
          this._maxRetries = 1;
          this._keepAlive = false;
          this._disposed = false;
          this.userAgent = e;
          this.handlers = t || [];
          this.requestOptions = r;
          if (r) {
            if (r.ignoreSslError != null) {
              this._ignoreSslError = r.ignoreSslError;
            }
            this._socketTimeout = r.socketTimeout;
            if (r.allowRedirects != null) {
              this._allowRedirects = r.allowRedirects;
            }
            if (r.allowRedirectDowngrade != null) {
              this._allowRedirectDowngrade = r.allowRedirectDowngrade;
            }
            if (r.maxRedirects != null) {
              this._maxRedirects = Math.max(r.maxRedirects, 0);
            }
            if (r.keepAlive != null) {
              this._keepAlive = r.keepAlive;
            }
            if (r.allowRetries != null) {
              this._allowRetries = r.allowRetries;
            }
            if (r.maxRetries != null) {
              this._maxRetries = r.maxRetries;
            }
          }
        }
        options(e, t) {
          return o(this, void 0, void 0, function* () {
            return this.request('OPTIONS', e, null, t || {});
          });
        }
        get(e, t) {
          return o(this, void 0, void 0, function* () {
            return this.request('GET', e, null, t || {});
          });
        }
        del(e, t) {
          return o(this, void 0, void 0, function* () {
            return this.request('DELETE', e, null, t || {});
          });
        }
        post(e, t, r) {
          return o(this, void 0, void 0, function* () {
            return this.request('POST', e, t, r || {});
          });
        }
        patch(e, t, r) {
          return o(this, void 0, void 0, function* () {
            return this.request('PATCH', e, t, r || {});
          });
        }
        put(e, t, r) {
          return o(this, void 0, void 0, function* () {
            return this.request('PUT', e, t, r || {});
          });
        }
        head(e, t) {
          return o(this, void 0, void 0, function* () {
            return this.request('HEAD', e, null, t || {});
          });
        }
        sendStream(e, t, r, n) {
          return o(this, void 0, void 0, function* () {
            return this.request(e, t, r, n);
          });
        }
        getJson(e, t = {}) {
          return o(this, void 0, void 0, function* () {
            t[d.Accept] = this._getExistingOrDefaultHeader(
              t,
              d.Accept,
              p.ApplicationJson,
            );
            const r = yield this.get(e, t);
            return this._processResponse(r, this.requestOptions);
          });
        }
        postJson(e, t, r = {}) {
          return o(this, void 0, void 0, function* () {
            const n = JSON.stringify(t, null, 2);
            r[d.Accept] = this._getExistingOrDefaultHeader(
              r,
              d.Accept,
              p.ApplicationJson,
            );
            r[d.ContentType] = this._getExistingOrDefaultHeader(
              r,
              d.ContentType,
              p.ApplicationJson,
            );
            const s = yield this.post(e, n, r);
            return this._processResponse(s, this.requestOptions);
          });
        }
        putJson(e, t, r = {}) {
          return o(this, void 0, void 0, function* () {
            const n = JSON.stringify(t, null, 2);
            r[d.Accept] = this._getExistingOrDefaultHeader(
              r,
              d.Accept,
              p.ApplicationJson,
            );
            r[d.ContentType] = this._getExistingOrDefaultHeader(
              r,
              d.ContentType,
              p.ApplicationJson,
            );
            const s = yield this.put(e, n, r);
            return this._processResponse(s, this.requestOptions);
          });
        }
        patchJson(e, t, r = {}) {
          return o(this, void 0, void 0, function* () {
            const n = JSON.stringify(t, null, 2);
            r[d.Accept] = this._getExistingOrDefaultHeader(
              r,
              d.Accept,
              p.ApplicationJson,
            );
            r[d.ContentType] = this._getExistingOrDefaultHeader(
              r,
              d.ContentType,
              p.ApplicationJson,
            );
            const s = yield this.patch(e, n, r);
            return this._processResponse(s, this.requestOptions);
          });
        }
        request(e, t, r, n) {
          return o(this, void 0, void 0, function* () {
            if (this._disposed) {
              throw new Error('Client has already been disposed.');
            }
            const s = new URL(t);
            let i = this._prepareRequest(e, s, n);
            const o =
              this._allowRetries && v.includes(e) ? this._maxRetries + 1 : 1;
            let a = 0;
            let u;
            do {
              u = yield this.requestRaw(i, r);
              if (u && u.message && u.message.statusCode === f.Unauthorized) {
                let e;
                for (const t of this.handlers) {
                  if (t.canHandleAuthentication(u)) {
                    e = t;
                    break;
                  }
                }
                if (e) {
                  return e.handleAuthentication(this, i, r);
                } else {
                  return u;
                }
              }
              let t = this._maxRedirects;
              while (
                u.message.statusCode &&
                h.includes(u.message.statusCode) &&
                this._allowRedirects &&
                t > 0
              ) {
                const o = u.message.headers['location'];
                if (!o) {
                  break;
                }
                const a = new URL(o);
                if (
                  s.protocol === 'https:' &&
                  s.protocol !== a.protocol &&
                  !this._allowRedirectDowngrade
                ) {
                  throw new Error(
                    'Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.',
                  );
                }
                yield u.readBody();
                if (a.hostname !== s.hostname) {
                  for (const e in n) {
                    if (e.toLowerCase() === 'authorization') {
                      delete n[e];
                    }
                  }
                }
                i = this._prepareRequest(e, a, n);
                u = yield this.requestRaw(i, r);
                t--;
              }
              if (!u.message.statusCode || !g.includes(u.message.statusCode)) {
                return u;
              }
              a += 1;
              if (a < o) {
                yield u.readBody();
                yield this._performExponentialBackoff(a);
              }
            } while (a < o);
            return u;
          });
        }
        dispose() {
          if (this._agent) {
            this._agent.destroy();
          }
          this._disposed = true;
        }
        requestRaw(e, t) {
          return o(this, void 0, void 0, function* () {
            return new Promise((r, n) => {
              function callbackForResult(e, t) {
                if (e) {
                  n(e);
                } else if (!t) {
                  n(new Error('Unknown error'));
                } else {
                  r(t);
                }
              }
              this.requestRawWithCallback(e, t, callbackForResult);
            });
          });
        }
        requestRawWithCallback(e, t, r) {
          if (typeof t === 'string') {
            if (!e.options.headers) {
              e.options.headers = {};
            }
            e.options.headers['Content-Length'] = Buffer.byteLength(t, 'utf8');
          }
          let n = false;
          function handleResult(e, t) {
            if (!n) {
              n = true;
              r(e, t);
            }
          }
          const s = e.httpModule.request(e.options, (e) => {
            const t = new HttpClientResponse(e);
            handleResult(undefined, t);
          });
          let i;
          s.on('socket', (e) => {
            i = e;
          });
          s.setTimeout(this._socketTimeout || 3 * 6e4, () => {
            if (i) {
              i.end();
            }
            handleResult(new Error(`Request timeout: ${e.options.path}`));
          });
          s.on('error', function (e) {
            handleResult(e);
          });
          if (t && typeof t === 'string') {
            s.write(t, 'utf8');
          }
          if (t && typeof t !== 'string') {
            t.on('close', function () {
              s.end();
            });
            t.pipe(s);
          } else {
            s.end();
          }
        }
        getAgent(e) {
          const t = new URL(e);
          return this._getAgent(t);
        }
        _prepareRequest(e, t, r) {
          const n = {};
          n.parsedUrl = t;
          const s = n.parsedUrl.protocol === 'https:';
          n.httpModule = s ? u : a;
          const i = s ? 443 : 80;
          n.options = {};
          n.options.host = n.parsedUrl.hostname;
          n.options.port = n.parsedUrl.port ? parseInt(n.parsedUrl.port) : i;
          n.options.path =
            (n.parsedUrl.pathname || '') + (n.parsedUrl.search || '');
          n.options.method = e;
          n.options.headers = this._mergeHeaders(r);
          if (this.userAgent != null) {
            n.options.headers['user-agent'] = this.userAgent;
          }
          n.options.agent = this._getAgent(n.parsedUrl);
          if (this.handlers) {
            for (const e of this.handlers) {
              e.prepareRequest(n.options);
            }
          }
          return n;
        }
        _mergeHeaders(e) {
          if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign(
              {},
              lowercaseKeys(this.requestOptions.headers),
              lowercaseKeys(e || {}),
            );
          }
          return lowercaseKeys(e || {});
        }
        _getExistingOrDefaultHeader(e, t, r) {
          let n;
          if (this.requestOptions && this.requestOptions.headers) {
            n = lowercaseKeys(this.requestOptions.headers)[t];
          }
          return e[t] || n || r;
        }
        _getAgent(e) {
          let t;
          const r = c.getProxyUrl(e);
          const n = r && r.hostname;
          if (this._keepAlive && n) {
            t = this._proxyAgent;
          }
          if (this._keepAlive && !n) {
            t = this._agent;
          }
          if (t) {
            return t;
          }
          const s = e.protocol === 'https:';
          let i = 100;
          if (this.requestOptions) {
            i = this.requestOptions.maxSockets || a.globalAgent.maxSockets;
          }
          if (r && r.hostname) {
            const e = {
              maxSockets: i,
              keepAlive: this._keepAlive,
              proxy: Object.assign(
                Object.assign(
                  {},
                  (r.username || r.password) && {
                    proxyAuth: `${r.username}:${r.password}`,
                  },
                ),
                { host: r.hostname, port: r.port },
              ),
            };
            let n;
            const o = r.protocol === 'https:';
            if (s) {
              n = o ? l.httpsOverHttps : l.httpsOverHttp;
            } else {
              n = o ? l.httpOverHttps : l.httpOverHttp;
            }
            t = n(e);
            this._proxyAgent = t;
          }
          if (this._keepAlive && !t) {
            const e = { keepAlive: this._keepAlive, maxSockets: i };
            t = s ? new u.Agent(e) : new a.Agent(e);
            this._agent = t;
          }
          if (!t) {
            t = s ? u.globalAgent : a.globalAgent;
          }
          if (s && this._ignoreSslError) {
            t.options = Object.assign(t.options || {}, {
              rejectUnauthorized: false,
            });
          }
          return t;
        }
        _performExponentialBackoff(e) {
          return o(this, void 0, void 0, function* () {
            e = Math.min(_, e);
            const t = b * Math.pow(2, e);
            return new Promise((e) => setTimeout(() => e(), t));
          });
        }
        _processResponse(e, t) {
          return o(this, void 0, void 0, function* () {
            return new Promise((r, n) =>
              o(this, void 0, void 0, function* () {
                const s = e.message.statusCode || 0;
                const i = { statusCode: s, result: null, headers: {} };
                if (s === f.NotFound) {
                  r(i);
                }
                function dateTimeDeserializer(e, t) {
                  if (typeof t === 'string') {
                    const e = new Date(t);
                    if (!isNaN(e.valueOf())) {
                      return e;
                    }
                  }
                  return t;
                }
                let o;
                let a;
                try {
                  a = yield e.readBody();
                  if (a && a.length > 0) {
                    if (t && t.deserializeDates) {
                      o = JSON.parse(a, dateTimeDeserializer);
                    } else {
                      o = JSON.parse(a);
                    }
                    i.result = o;
                  }
                  i.headers = e.message.headers;
                } catch (e) {}
                if (s > 299) {
                  let e;
                  if (o && o.message) {
                    e = o.message;
                  } else if (a && a.length > 0) {
                    e = a;
                  } else {
                    e = `Failed request: (${s})`;
                  }
                  const t = new HttpClientError(e, s);
                  t.result = i.result;
                  n(t);
                } else {
                  r(i);
                }
              }),
            );
          });
        }
      }
      t.HttpClient = HttpClient;
      const lowercaseKeys = (e) =>
        Object.keys(e).reduce((t, r) => ((t[r.toLowerCase()] = e[r]), t), {});
    },
    835: (e, t) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t.checkBypass = t.getProxyUrl = void 0;
      function getProxyUrl(e) {
        const t = e.protocol === 'https:';
        if (checkBypass(e)) {
          return undefined;
        }
        const r = (() => {
          if (t) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
          } else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
          }
        })();
        if (r) {
          return new URL(r);
        } else {
          return undefined;
        }
      }
      t.getProxyUrl = getProxyUrl;
      function checkBypass(e) {
        if (!e.hostname) {
          return false;
        }
        const t = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
        if (!t) {
          return false;
        }
        let r;
        if (e.port) {
          r = Number(e.port);
        } else if (e.protocol === 'http:') {
          r = 80;
        } else if (e.protocol === 'https:') {
          r = 443;
        }
        const n = [e.hostname.toUpperCase()];
        if (typeof r === 'number') {
          n.push(`${n[0]}:${r}`);
        }
        for (const e of t
          .split(',')
          .map((e) => e.trim().toUpperCase())
          .filter((e) => e)) {
          if (n.some((t) => t === e)) {
            return true;
          }
        }
        return false;
      }
      t.checkBypass = checkBypass;
    },
    417: (e) => {
      'use strict';
      e.exports = balanced;
      function balanced(e, t, r) {
        if (e instanceof RegExp) e = maybeMatch(e, r);
        if (t instanceof RegExp) t = maybeMatch(t, r);
        var n = range(e, t, r);
        return (
          n && {
            start: n[0],
            end: n[1],
            pre: r.slice(0, n[0]),
            body: r.slice(n[0] + e.length, n[1]),
            post: r.slice(n[1] + t.length),
          }
        );
      }
      function maybeMatch(e, t) {
        var r = t.match(e);
        return r ? r[0] : null;
      }
      balanced.range = range;
      function range(e, t, r) {
        var n, s, i, o, a;
        var u = r.indexOf(e);
        var c = r.indexOf(t, u + 1);
        var l = u;
        if (u >= 0 && c > 0) {
          if (e === t) {
            return [u, c];
          }
          n = [];
          i = r.length;
          while (l >= 0 && !a) {
            if (l == u) {
              n.push(l);
              u = r.indexOf(e, l + 1);
            } else if (n.length == 1) {
              a = [n.pop(), c];
            } else {
              s = n.pop();
              if (s < i) {
                i = s;
                o = c;
              }
              c = r.indexOf(t, l + 1);
            }
            l = u < c && u >= 0 ? u : c;
          }
          if (n.length) {
            a = [i, o];
          }
        }
        return a;
      }
    },
    850: (e, t, r) => {
      var n = r(417);
      e.exports = expandTop;
      var s = '\0SLASH' + Math.random() + '\0';
      var i = '\0OPEN' + Math.random() + '\0';
      var o = '\0CLOSE' + Math.random() + '\0';
      var a = '\0COMMA' + Math.random() + '\0';
      var u = '\0PERIOD' + Math.random() + '\0';
      function numeric(e) {
        return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
      }
      function escapeBraces(e) {
        return e
          .split('\\\\')
          .join(s)
          .split('\\{')
          .join(i)
          .split('\\}')
          .join(o)
          .split('\\,')
          .join(a)
          .split('\\.')
          .join(u);
      }
      function unescapeBraces(e) {
        return e
          .split(s)
          .join('\\')
          .split(i)
          .join('{')
          .split(o)
          .join('}')
          .split(a)
          .join(',')
          .split(u)
          .join('.');
      }
      function parseCommaParts(e) {
        if (!e) return [''];
        var t = [];
        var r = n('{', '}', e);
        if (!r) return e.split(',');
        var s = r.pre;
        var i = r.body;
        var o = r.post;
        var a = s.split(',');
        a[a.length - 1] += '{' + i + '}';
        var u = parseCommaParts(o);
        if (o.length) {
          a[a.length - 1] += u.shift();
          a.push.apply(a, u);
        }
        t.push.apply(t, a);
        return t;
      }
      function expandTop(e) {
        if (!e) return [];
        if (e.substr(0, 2) === '{}') {
          e = '\\{\\}' + e.substr(2);
        }
        return expand(escapeBraces(e), true).map(unescapeBraces);
      }
      function embrace(e) {
        return '{' + e + '}';
      }
      function isPadded(e) {
        return /^-?0\d/.test(e);
      }
      function lte(e, t) {
        return e <= t;
      }
      function gte(e, t) {
        return e >= t;
      }
      function expand(e, t) {
        var r = [];
        var s = n('{', '}', e);
        if (!s) return [e];
        var i = s.pre;
        var a = s.post.length ? expand(s.post, false) : [''];
        if (/\$$/.test(s.pre)) {
          for (var u = 0; u < a.length; u++) {
            var c = i + '{' + s.body + '}' + a[u];
            r.push(c);
          }
        } else {
          var l = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body);
          var f = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body);
          var d = l || f;
          var p = s.body.indexOf(',') >= 0;
          if (!d && !p) {
            if (s.post.match(/,.*\}/)) {
              e = s.pre + '{' + s.body + o + s.post;
              return expand(e);
            }
            return [e];
          }
          var h;
          if (d) {
            h = s.body.split(/\.\./);
          } else {
            h = parseCommaParts(s.body);
            if (h.length === 1) {
              h = expand(h[0], false).map(embrace);
              if (h.length === 1) {
                return a.map(function (e) {
                  return s.pre + h[0] + e;
                });
              }
            }
          }
          var g;
          if (d) {
            var v = numeric(h[0]);
            var _ = numeric(h[1]);
            var b = Math.max(h[0].length, h[1].length);
            var y = h.length == 3 ? Math.abs(numeric(h[2])) : 1;
            var w = lte;
            var O = _ < v;
            if (O) {
              y *= -1;
              w = gte;
            }
            var R = h.some(isPadded);
            g = [];
            for (var C = v; w(C, _); C += y) {
              var E;
              if (f) {
                E = String.fromCharCode(C);
                if (E === '\\') E = '';
              } else {
                E = String(C);
                if (R) {
                  var P = b - E.length;
                  if (P > 0) {
                    var x = new Array(P + 1).join('0');
                    if (C < 0) E = '-' + x + E.slice(1);
                    else E = x + E;
                  }
                }
              }
              g.push(E);
            }
          } else {
            g = [];
            for (var S = 0; S < h.length; S++) {
              g.push.apply(g, expand(h[S], false));
            }
          }
          for (var S = 0; S < g.length; S++) {
            for (var u = 0; u < a.length; u++) {
              var c = i + g[S] + a[u];
              if (!t || d || c) r.push(c);
            }
          }
        }
        return r;
      }
    },
    917: (e) => {
      const t =
        typeof process === 'object' && process && process.platform === 'win32';
      e.exports = t ? { sep: '\\' } : { sep: '/' };
    },
    973: (e, t, r) => {
      const n = (e.exports = (e, t, r = {}) => {
        assertValidPattern(t);
        if (!r.nocomment && t.charAt(0) === '#') {
          return false;
        }
        return new Minimatch(t, r).match(e);
      });
      e.exports = n;
      const s = r(917);
      n.sep = s.sep;
      const i = Symbol('globstar **');
      n.GLOBSTAR = i;
      const o = r(850);
      const a = {
        '!': { open: '(?:(?!(?:', close: '))[^/]*?)' },
        '?': { open: '(?:', close: ')?' },
        '+': { open: '(?:', close: ')+' },
        '*': { open: '(?:', close: ')*' },
        '@': { open: '(?:', close: ')' },
      };
      const u = '[^/]';
      const c = u + '*?';
      const l = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?';
      const f = '(?:(?!(?:\\/|^)\\.).)*?';
      const charSet = (e) =>
        e.split('').reduce((e, t) => {
          e[t] = true;
          return e;
        }, {});
      const d = charSet('().*{}+?[]^$\\!');
      const p = charSet('[.(');
      const h = /\/+/;
      n.filter =
        (e, t = {}) =>
        (r, s, i) =>
          n(r, e, t);
      const ext = (e, t = {}) => {
        const r = {};
        Object.keys(e).forEach((t) => (r[t] = e[t]));
        Object.keys(t).forEach((e) => (r[e] = t[e]));
        return r;
      };
      n.defaults = (e) => {
        if (!e || typeof e !== 'object' || !Object.keys(e).length) {
          return n;
        }
        const t = n;
        const m = (r, n, s) => t(r, n, ext(e, s));
        m.Minimatch = class Minimatch extends t.Minimatch {
          constructor(t, r) {
            super(t, ext(e, r));
          }
        };
        m.Minimatch.defaults = (r) => t.defaults(ext(e, r)).Minimatch;
        m.filter = (r, n) => t.filter(r, ext(e, n));
        m.defaults = (r) => t.defaults(ext(e, r));
        m.makeRe = (r, n) => t.makeRe(r, ext(e, n));
        m.braceExpand = (r, n) => t.braceExpand(r, ext(e, n));
        m.match = (r, n, s) => t.match(r, n, ext(e, s));
        return m;
      };
      n.braceExpand = (e, t) => braceExpand(e, t);
      const braceExpand = (e, t = {}) => {
        assertValidPattern(e);
        if (t.nobrace || !/\{(?:(?!\{).)*\}/.test(e)) {
          return [e];
        }
        return o(e);
      };
      const g = 1024 * 64;
      const assertValidPattern = (e) => {
        if (typeof e !== 'string') {
          throw new TypeError('invalid pattern');
        }
        if (e.length > g) {
          throw new TypeError('pattern is too long');
        }
      };
      const v = Symbol('subparse');
      n.makeRe = (e, t) => new Minimatch(e, t || {}).makeRe();
      n.match = (e, t, r = {}) => {
        const n = new Minimatch(t, r);
        e = e.filter((e) => n.match(e));
        if (n.options.nonull && !e.length) {
          e.push(t);
        }
        return e;
      };
      const globUnescape = (e) => e.replace(/\\(.)/g, '$1');
      const charUnescape = (e) => e.replace(/\\([^-\]])/g, '$1');
      const regExpEscape = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const braExpEscape = (e) => e.replace(/[[\]\\]/g, '\\$&');
      class Minimatch {
        constructor(e, t) {
          assertValidPattern(e);
          if (!t) t = {};
          this.options = t;
          this.set = [];
          this.pattern = e;
          this.windowsPathsNoEscape =
            !!t.windowsPathsNoEscape || t.allowWindowsEscape === false;
          if (this.windowsPathsNoEscape) {
            this.pattern = this.pattern.replace(/\\/g, '/');
          }
          this.regexp = null;
          this.negate = false;
          this.comment = false;
          this.empty = false;
          this.partial = !!t.partial;
          this.make();
        }
        debug() {}
        make() {
          const e = this.pattern;
          const t = this.options;
          if (!t.nocomment && e.charAt(0) === '#') {
            this.comment = true;
            return;
          }
          if (!e) {
            this.empty = true;
            return;
          }
          this.parseNegate();
          let r = (this.globSet = this.braceExpand());
          if (t.debug) this.debug = (...e) => console.error(...e);
          this.debug(this.pattern, r);
          r = this.globParts = r.map((e) => e.split(h));
          this.debug(this.pattern, r);
          r = r.map((e, t, r) => e.map(this.parse, this));
          this.debug(this.pattern, r);
          r = r.filter((e) => e.indexOf(false) === -1);
          this.debug(this.pattern, r);
          this.set = r;
        }
        parseNegate() {
          if (this.options.nonegate) return;
          const e = this.pattern;
          let t = false;
          let r = 0;
          for (let n = 0; n < e.length && e.charAt(n) === '!'; n++) {
            t = !t;
            r++;
          }
          if (r) this.pattern = e.slice(r);
          this.negate = t;
        }
        matchOne(e, t, r) {
          var n = this.options;
          this.debug('matchOne', { this: this, file: e, pattern: t });
          this.debug('matchOne', e.length, t.length);
          for (
            var s = 0, o = 0, a = e.length, u = t.length;
            s < a && o < u;
            s++, o++
          ) {
            this.debug('matchOne loop');
            var c = t[o];
            var l = e[s];
            this.debug(t, c, l);
            if (c === false) return false;
            if (c === i) {
              this.debug('GLOBSTAR', [t, c, l]);
              var f = s;
              var d = o + 1;
              if (d === u) {
                this.debug('** at the end');
                for (; s < a; s++) {
                  if (
                    e[s] === '.' ||
                    e[s] === '..' ||
                    (!n.dot && e[s].charAt(0) === '.')
                  )
                    return false;
                }
                return true;
              }
              while (f < a) {
                var p = e[f];
                this.debug('\nglobstar while', e, f, t, d, p);
                if (this.matchOne(e.slice(f), t.slice(d), r)) {
                  this.debug('globstar found match!', f, a, p);
                  return true;
                } else {
                  if (
                    p === '.' ||
                    p === '..' ||
                    (!n.dot && p.charAt(0) === '.')
                  ) {
                    this.debug('dot detected!', e, f, t, d);
                    break;
                  }
                  this.debug('globstar swallow a segment, and continue');
                  f++;
                }
              }
              if (r) {
                this.debug('\n>>> no match, partial?', e, f, t, d);
                if (f === a) return true;
              }
              return false;
            }
            var h;
            if (typeof c === 'string') {
              h = l === c;
              this.debug('string match', c, l, h);
            } else {
              h = l.match(c);
              this.debug('pattern match', c, l, h);
            }
            if (!h) return false;
          }
          if (s === a && o === u) {
            return true;
          } else if (s === a) {
            return r;
          } else if (o === u) {
            return s === a - 1 && e[s] === '';
          }
          throw new Error('wtf?');
        }
        braceExpand() {
          return braceExpand(this.pattern, this.options);
        }
        parse(e, t) {
          assertValidPattern(e);
          const r = this.options;
          if (e === '**') {
            if (!r.noglobstar) return i;
            else e = '*';
          }
          if (e === '') return '';
          let n = '';
          let s = false;
          let o = false;
          const l = [];
          const f = [];
          let h;
          let g = false;
          let _ = -1;
          let b = -1;
          let y;
          let w;
          let O;
          let R = e.charAt(0) === '.';
          let C = r.dot || R;
          const patternStart = () =>
            R ? '' : C ? '(?!(?:^|\\/)\\.{1,2}(?:$|\\/))' : '(?!\\.)';
          const subPatternStart = (e) =>
            e.charAt(0) === '.'
              ? ''
              : r.dot
                ? '(?!(?:^|\\/)\\.{1,2}(?:$|\\/))'
                : '(?!\\.)';
          const clearStateChar = () => {
            if (h) {
              switch (h) {
                case '*':
                  n += c;
                  s = true;
                  break;
                case '?':
                  n += u;
                  s = true;
                  break;
                default:
                  n += '\\' + h;
                  break;
              }
              this.debug('clearStateChar %j %j', h, n);
              h = false;
            }
          };
          for (let t = 0, i; t < e.length && (i = e.charAt(t)); t++) {
            this.debug('%s\t%s %s %j', e, t, n, i);
            if (o) {
              if (i === '/') {
                return false;
              }
              if (d[i]) {
                n += '\\';
              }
              n += i;
              o = false;
              continue;
            }
            switch (i) {
              case '/': {
                return false;
              }
              case '\\':
                if (g && e.charAt(t + 1) === '-') {
                  n += i;
                  continue;
                }
                clearStateChar();
                o = true;
                continue;
              case '?':
              case '*':
              case '+':
              case '@':
              case '!':
                this.debug('%s\t%s %s %j <-- stateChar', e, t, n, i);
                if (g) {
                  this.debug('  in class');
                  if (i === '!' && t === b + 1) i = '^';
                  n += i;
                  continue;
                }
                this.debug('call clearStateChar %j', h);
                clearStateChar();
                h = i;
                if (r.noext) clearStateChar();
                continue;
              case '(': {
                if (g) {
                  n += '(';
                  continue;
                }
                if (!h) {
                  n += '\\(';
                  continue;
                }
                const r = {
                  type: h,
                  start: t - 1,
                  reStart: n.length,
                  open: a[h].open,
                  close: a[h].close,
                };
                this.debug(this.pattern, '\t', r);
                l.push(r);
                n += r.open;
                if (r.start === 0 && r.type !== '!') {
                  R = true;
                  n += subPatternStart(e.slice(t + 1));
                }
                this.debug('plType %j %j', h, n);
                h = false;
                continue;
              }
              case ')': {
                const e = l[l.length - 1];
                if (g || !e) {
                  n += '\\)';
                  continue;
                }
                l.pop();
                clearStateChar();
                s = true;
                w = e;
                n += w.close;
                if (w.type === '!') {
                  f.push(Object.assign(w, { reEnd: n.length }));
                }
                continue;
              }
              case '|': {
                const r = l[l.length - 1];
                if (g || !r) {
                  n += '\\|';
                  continue;
                }
                clearStateChar();
                n += '|';
                if (r.start === 0 && r.type !== '!') {
                  R = true;
                  n += subPatternStart(e.slice(t + 1));
                }
                continue;
              }
              case '[':
                clearStateChar();
                if (g) {
                  n += '\\' + i;
                  continue;
                }
                g = true;
                b = t;
                _ = n.length;
                n += i;
                continue;
              case ']':
                if (t === b + 1 || !g) {
                  n += '\\' + i;
                  continue;
                }
                y = e.substring(b + 1, t);
                try {
                  RegExp('[' + braExpEscape(charUnescape(y)) + ']');
                  n += i;
                } catch (e) {
                  n = n.substring(0, _) + '(?:$.)';
                }
                s = true;
                g = false;
                continue;
              default:
                clearStateChar();
                if (d[i] && !(i === '^' && g)) {
                  n += '\\';
                }
                n += i;
                break;
            }
          }
          if (g) {
            y = e.slice(b + 1);
            O = this.parse(y, v);
            n = n.substring(0, _) + '\\[' + O[0];
            s = s || O[1];
          }
          for (w = l.pop(); w; w = l.pop()) {
            let e;
            e = n.slice(w.reStart + w.open.length);
            this.debug('setting tail', n, w);
            e = e.replace(/((?:\\{2}){0,64})(\\?)\|/g, (e, t, r) => {
              if (!r) {
                r = '\\';
              }
              return t + t + r + '|';
            });
            this.debug('tail=%j\n   %s', e, e, w, n);
            const t = w.type === '*' ? c : w.type === '?' ? u : '\\' + w.type;
            s = true;
            n = n.slice(0, w.reStart) + t + '\\(' + e;
          }
          clearStateChar();
          if (o) {
            n += '\\\\';
          }
          const E = p[n.charAt(0)];
          for (let e = f.length - 1; e > -1; e--) {
            const r = f[e];
            const s = n.slice(0, r.reStart);
            const i = n.slice(r.reStart, r.reEnd - 8);
            let o = n.slice(r.reEnd);
            const a = n.slice(r.reEnd - 8, r.reEnd) + o;
            const u = s.split(')').length;
            const c = s.split('(').length - u;
            let l = o;
            for (let e = 0; e < c; e++) {
              l = l.replace(/\)[+*?]?/, '');
            }
            o = l;
            const d = o === '' && t !== v ? '(?:$|\\/)' : '';
            n = s + i + o + d + a;
          }
          if (n !== '' && s) {
            n = '(?=.)' + n;
          }
          if (E) {
            n = patternStart() + n;
          }
          if (t === v) {
            return [n, s];
          }
          if (r.nocase && !s) {
            s = e.toUpperCase() !== e.toLowerCase();
          }
          if (!s) {
            return globUnescape(e);
          }
          const P = r.nocase ? 'i' : '';
          try {
            return Object.assign(new RegExp('^' + n + '$', P), {
              _glob: e,
              _src: n,
            });
          } catch (e) {
            return new RegExp('$.');
          }
        }
        makeRe() {
          if (this.regexp || this.regexp === false) return this.regexp;
          const e = this.set;
          if (!e.length) {
            this.regexp = false;
            return this.regexp;
          }
          const t = this.options;
          const r = t.noglobstar ? c : t.dot ? l : f;
          const n = t.nocase ? 'i' : '';
          let s = e
            .map((e) => {
              e = e
                .map((e) =>
                  typeof e === 'string'
                    ? regExpEscape(e)
                    : e === i
                      ? i
                      : e._src,
                )
                .reduce((e, t) => {
                  if (!(e[e.length - 1] === i && t === i)) {
                    e.push(t);
                  }
                  return e;
                }, []);
              e.forEach((t, n) => {
                if (t !== i || e[n - 1] === i) {
                  return;
                }
                if (n === 0) {
                  if (e.length > 1) {
                    e[n + 1] = '(?:\\/|' + r + '\\/)?' + e[n + 1];
                  } else {
                    e[n] = r;
                  }
                } else if (n === e.length - 1) {
                  e[n - 1] += '(?:\\/|' + r + ')?';
                } else {
                  e[n - 1] += '(?:\\/|\\/' + r + '\\/)' + e[n + 1];
                  e[n + 1] = i;
                }
              });
              return e.filter((e) => e !== i).join('/');
            })
            .join('|');
          s = '^(?:' + s + ')$';
          if (this.negate) s = '^(?!' + s + ').*$';
          try {
            this.regexp = new RegExp(s, n);
          } catch (e) {
            this.regexp = false;
          }
          return this.regexp;
        }
        match(e, t = this.partial) {
          this.debug('match', e, this.pattern);
          if (this.comment) return false;
          if (this.empty) return e === '';
          if (e === '/' && t) return true;
          const r = this.options;
          if (s.sep !== '/') {
            e = e.split(s.sep).join('/');
          }
          e = e.split(h);
          this.debug(this.pattern, 'split', e);
          const n = this.set;
          this.debug(this.pattern, 'set', n);
          let i;
          for (let t = e.length - 1; t >= 0; t--) {
            i = e[t];
            if (i) break;
          }
          for (let s = 0; s < n.length; s++) {
            const o = n[s];
            let a = e;
            if (r.matchBase && o.length === 1) {
              a = [i];
            }
            const u = this.matchOne(a, o, t);
            if (u) {
              if (r.flipNegate) return true;
              return !this.negate;
            }
          }
          if (r.flipNegate) return false;
          return this.negate;
        }
        static defaults(e) {
          return n.defaults(e).Minimatch;
        }
      }
      n.Minimatch = Minimatch;
    },
    294: (e, t, r) => {
      e.exports = r(219);
    },
    219: (e, t, r) => {
      'use strict';
      var n = r(808);
      var s = r(404);
      var i = r(685);
      var o = r(687);
      var a = r(361);
      var u = r(491);
      var c = r(837);
      t.httpOverHttp = httpOverHttp;
      t.httpsOverHttp = httpsOverHttp;
      t.httpOverHttps = httpOverHttps;
      t.httpsOverHttps = httpsOverHttps;
      function httpOverHttp(e) {
        var t = new TunnelingAgent(e);
        t.request = i.request;
        return t;
      }
      function httpsOverHttp(e) {
        var t = new TunnelingAgent(e);
        t.request = i.request;
        t.createSocket = createSecureSocket;
        t.defaultPort = 443;
        return t;
      }
      function httpOverHttps(e) {
        var t = new TunnelingAgent(e);
        t.request = o.request;
        return t;
      }
      function httpsOverHttps(e) {
        var t = new TunnelingAgent(e);
        t.request = o.request;
        t.createSocket = createSecureSocket;
        t.defaultPort = 443;
        return t;
      }
      function TunnelingAgent(e) {
        var t = this;
        t.options = e || {};
        t.proxyOptions = t.options.proxy || {};
        t.maxSockets = t.options.maxSockets || i.Agent.defaultMaxSockets;
        t.requests = [];
        t.sockets = [];
        t.on('free', function onFree(e, r, n, s) {
          var i = toOptions(r, n, s);
          for (var o = 0, a = t.requests.length; o < a; ++o) {
            var u = t.requests[o];
            if (u.host === i.host && u.port === i.port) {
              t.requests.splice(o, 1);
              u.request.onSocket(e);
              return;
            }
          }
          e.destroy();
          t.removeSocket(e);
        });
      }
      c.inherits(TunnelingAgent, a.EventEmitter);
      TunnelingAgent.prototype.addRequest = function addRequest(e, t, r, n) {
        var s = this;
        var i = mergeOptions({ request: e }, s.options, toOptions(t, r, n));
        if (s.sockets.length >= this.maxSockets) {
          s.requests.push(i);
          return;
        }
        s.createSocket(i, function (t) {
          t.on('free', onFree);
          t.on('close', onCloseOrRemove);
          t.on('agentRemove', onCloseOrRemove);
          e.onSocket(t);
          function onFree() {
            s.emit('free', t, i);
          }
          function onCloseOrRemove(e) {
            s.removeSocket(t);
            t.removeListener('free', onFree);
            t.removeListener('close', onCloseOrRemove);
            t.removeListener('agentRemove', onCloseOrRemove);
          }
        });
      };
      TunnelingAgent.prototype.createSocket = function createSocket(e, t) {
        var r = this;
        var n = {};
        r.sockets.push(n);
        var s = mergeOptions({}, r.proxyOptions, {
          method: 'CONNECT',
          path: e.host + ':' + e.port,
          agent: false,
          headers: { host: e.host + ':' + e.port },
        });
        if (e.localAddress) {
          s.localAddress = e.localAddress;
        }
        if (s.proxyAuth) {
          s.headers = s.headers || {};
          s.headers['Proxy-Authorization'] =
            'Basic ' + new Buffer(s.proxyAuth).toString('base64');
        }
        l('making CONNECT request');
        var i = r.request(s);
        i.useChunkedEncodingByDefault = false;
        i.once('response', onResponse);
        i.once('upgrade', onUpgrade);
        i.once('connect', onConnect);
        i.once('error', onError);
        i.end();
        function onResponse(e) {
          e.upgrade = true;
        }
        function onUpgrade(e, t, r) {
          process.nextTick(function () {
            onConnect(e, t, r);
          });
        }
        function onConnect(s, o, a) {
          i.removeAllListeners();
          o.removeAllListeners();
          if (s.statusCode !== 200) {
            l(
              'tunneling socket could not be established, statusCode=%d',
              s.statusCode,
            );
            o.destroy();
            var u = new Error(
              'tunneling socket could not be established, ' +
                'statusCode=' +
                s.statusCode,
            );
            u.code = 'ECONNRESET';
            e.request.emit('error', u);
            r.removeSocket(n);
            return;
          }
          if (a.length > 0) {
            l('got illegal response body from proxy');
            o.destroy();
            var u = new Error('got illegal response body from proxy');
            u.code = 'ECONNRESET';
            e.request.emit('error', u);
            r.removeSocket(n);
            return;
          }
          l('tunneling connection has established');
          r.sockets[r.sockets.indexOf(n)] = o;
          return t(o);
        }
        function onError(t) {
          i.removeAllListeners();
          l(
            'tunneling socket could not be established, cause=%s\n',
            t.message,
            t.stack,
          );
          var s = new Error(
            'tunneling socket could not be established, ' +
              'cause=' +
              t.message,
          );
          s.code = 'ECONNRESET';
          e.request.emit('error', s);
          r.removeSocket(n);
        }
      };
      TunnelingAgent.prototype.removeSocket = function removeSocket(e) {
        var t = this.sockets.indexOf(e);
        if (t === -1) {
          return;
        }
        this.sockets.splice(t, 1);
        var r = this.requests.shift();
        if (r) {
          this.createSocket(r, function (e) {
            r.request.onSocket(e);
          });
        }
      };
      function createSecureSocket(e, t) {
        var r = this;
        TunnelingAgent.prototype.createSocket.call(r, e, function (n) {
          var i = e.request.getHeader('host');
          var o = mergeOptions({}, r.options, {
            socket: n,
            servername: i ? i.replace(/:.*$/, '') : e.host,
          });
          var a = s.connect(0, o);
          r.sockets[r.sockets.indexOf(n)] = a;
          t(a);
        });
      }
      function toOptions(e, t, r) {
        if (typeof e === 'string') {
          return { host: e, port: t, localAddress: r };
        }
        return e;
      }
      function mergeOptions(e) {
        for (var t = 1, r = arguments.length; t < r; ++t) {
          var n = arguments[t];
          if (typeof n === 'object') {
            var s = Object.keys(n);
            for (var i = 0, o = s.length; i < o; ++i) {
              var a = s[i];
              if (n[a] !== undefined) {
                e[a] = n[a];
              }
            }
          }
        }
        return e;
      }
      var l;
      if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
        l = function () {
          var e = Array.prototype.slice.call(arguments);
          if (typeof e[0] === 'string') {
            e[0] = 'TUNNEL: ' + e[0];
          } else {
            e.unshift('TUNNEL:');
          }
          console.error.apply(console, e);
        };
      } else {
        l = function () {};
      }
      t.debug = l;
    },
    840: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      Object.defineProperty(t, 'v1', {
        enumerable: true,
        get: function () {
          return n.default;
        },
      });
      Object.defineProperty(t, 'v3', {
        enumerable: true,
        get: function () {
          return s.default;
        },
      });
      Object.defineProperty(t, 'v4', {
        enumerable: true,
        get: function () {
          return i.default;
        },
      });
      Object.defineProperty(t, 'v5', {
        enumerable: true,
        get: function () {
          return o.default;
        },
      });
      Object.defineProperty(t, 'NIL', {
        enumerable: true,
        get: function () {
          return a.default;
        },
      });
      Object.defineProperty(t, 'version', {
        enumerable: true,
        get: function () {
          return u.default;
        },
      });
      Object.defineProperty(t, 'validate', {
        enumerable: true,
        get: function () {
          return c.default;
        },
      });
      Object.defineProperty(t, 'stringify', {
        enumerable: true,
        get: function () {
          return l.default;
        },
      });
      Object.defineProperty(t, 'parse', {
        enumerable: true,
        get: function () {
          return f.default;
        },
      });
      var n = _interopRequireDefault(r(628));
      var s = _interopRequireDefault(r(409));
      var i = _interopRequireDefault(r(122));
      var o = _interopRequireDefault(r(120));
      var a = _interopRequireDefault(r(332));
      var u = _interopRequireDefault(r(595));
      var c = _interopRequireDefault(r(900));
      var l = _interopRequireDefault(r(950));
      var f = _interopRequireDefault(r(746));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
    },
    569: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var n = _interopRequireDefault(r(113));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function md5(e) {
        if (Array.isArray(e)) {
          e = Buffer.from(e);
        } else if (typeof e === 'string') {
          e = Buffer.from(e, 'utf8');
        }
        return n.default.createHash('md5').update(e).digest();
      }
      var s = md5;
      t['default'] = s;
    },
    332: (e, t) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var r = '00000000-0000-0000-0000-000000000000';
      t['default'] = r;
    },
    746: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var n = _interopRequireDefault(r(900));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function parse(e) {
        if (!(0, n.default)(e)) {
          throw TypeError('Invalid UUID');
        }
        let t;
        const r = new Uint8Array(16);
        r[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24;
        r[1] = (t >>> 16) & 255;
        r[2] = (t >>> 8) & 255;
        r[3] = t & 255;
        r[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8;
        r[5] = t & 255;
        r[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8;
        r[7] = t & 255;
        r[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8;
        r[9] = t & 255;
        r[10] = ((t = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255;
        r[11] = (t / 4294967296) & 255;
        r[12] = (t >>> 24) & 255;
        r[13] = (t >>> 16) & 255;
        r[14] = (t >>> 8) & 255;
        r[15] = t & 255;
        return r;
      }
      var s = parse;
      t['default'] = s;
    },
    814: (e, t) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var r =
        /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      t['default'] = r;
    },
    807: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = rng;
      var n = _interopRequireDefault(r(113));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const s = new Uint8Array(256);
      let i = s.length;
      function rng() {
        if (i > s.length - 16) {
          n.default.randomFillSync(s);
          i = 0;
        }
        return s.slice(i, (i += 16));
      }
    },
    274: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var n = _interopRequireDefault(r(113));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function sha1(e) {
        if (Array.isArray(e)) {
          e = Buffer.from(e);
        } else if (typeof e === 'string') {
          e = Buffer.from(e, 'utf8');
        }
        return n.default.createHash('sha1').update(e).digest();
      }
      var s = sha1;
      t['default'] = s;
    },
    950: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var n = _interopRequireDefault(r(900));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const s = [];
      for (let e = 0; e < 256; ++e) {
        s.push((e + 256).toString(16).substr(1));
      }
      function stringify(e, t = 0) {
        const r = (
          s[e[t + 0]] +
          s[e[t + 1]] +
          s[e[t + 2]] +
          s[e[t + 3]] +
          '-' +
          s[e[t + 4]] +
          s[e[t + 5]] +
          '-' +
          s[e[t + 6]] +
          s[e[t + 7]] +
          '-' +
          s[e[t + 8]] +
          s[e[t + 9]] +
          '-' +
          s[e[t + 10]] +
          s[e[t + 11]] +
          s[e[t + 12]] +
          s[e[t + 13]] +
          s[e[t + 14]] +
          s[e[t + 15]]
        ).toLowerCase();
        if (!(0, n.default)(r)) {
          throw TypeError('Stringified UUID is invalid');
        }
        return r;
      }
      var i = stringify;
      t['default'] = i;
    },
    628: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var n = _interopRequireDefault(r(807));
      var s = _interopRequireDefault(r(950));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      let i;
      let o;
      let a = 0;
      let u = 0;
      function v1(e, t, r) {
        let c = (t && r) || 0;
        const l = t || new Array(16);
        e = e || {};
        let f = e.node || i;
        let d = e.clockseq !== undefined ? e.clockseq : o;
        if (f == null || d == null) {
          const t = e.random || (e.rng || n.default)();
          if (f == null) {
            f = i = [t[0] | 1, t[1], t[2], t[3], t[4], t[5]];
          }
          if (d == null) {
            d = o = ((t[6] << 8) | t[7]) & 16383;
          }
        }
        let p = e.msecs !== undefined ? e.msecs : Date.now();
        let h = e.nsecs !== undefined ? e.nsecs : u + 1;
        const g = p - a + (h - u) / 1e4;
        if (g < 0 && e.clockseq === undefined) {
          d = (d + 1) & 16383;
        }
        if ((g < 0 || p > a) && e.nsecs === undefined) {
          h = 0;
        }
        if (h >= 1e4) {
          throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        }
        a = p;
        u = h;
        o = d;
        p += 122192928e5;
        const v = ((p & 268435455) * 1e4 + h) % 4294967296;
        l[c++] = (v >>> 24) & 255;
        l[c++] = (v >>> 16) & 255;
        l[c++] = (v >>> 8) & 255;
        l[c++] = v & 255;
        const _ = ((p / 4294967296) * 1e4) & 268435455;
        l[c++] = (_ >>> 8) & 255;
        l[c++] = _ & 255;
        l[c++] = ((_ >>> 24) & 15) | 16;
        l[c++] = (_ >>> 16) & 255;
        l[c++] = (d >>> 8) | 128;
        l[c++] = d & 255;
        for (let e = 0; e < 6; ++e) {
          l[c + e] = f[e];
        }
        return t || (0, s.default)(l);
      }
      var c = v1;
      t['default'] = c;
    },
    409: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var n = _interopRequireDefault(r(998));
      var s = _interopRequireDefault(r(569));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const i = (0, n.default)('v3', 48, s.default);
      var o = i;
      t['default'] = o;
    },
    998: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = _default;
      t.URL = t.DNS = void 0;
      var n = _interopRequireDefault(r(950));
      var s = _interopRequireDefault(r(746));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function stringToBytes(e) {
        e = unescape(encodeURIComponent(e));
        const t = [];
        for (let r = 0; r < e.length; ++r) {
          t.push(e.charCodeAt(r));
        }
        return t;
      }
      const i = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
      t.DNS = i;
      const o = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
      t.URL = o;
      function _default(e, t, r) {
        function generateUUID(e, i, o, a) {
          if (typeof e === 'string') {
            e = stringToBytes(e);
          }
          if (typeof i === 'string') {
            i = (0, s.default)(i);
          }
          if (i.length !== 16) {
            throw TypeError(
              'Namespace must be array-like (16 iterable integer values, 0-255)',
            );
          }
          let u = new Uint8Array(16 + e.length);
          u.set(i);
          u.set(e, i.length);
          u = r(u);
          u[6] = (u[6] & 15) | t;
          u[8] = (u[8] & 63) | 128;
          if (o) {
            a = a || 0;
            for (let e = 0; e < 16; ++e) {
              o[a + e] = u[e];
            }
            return o;
          }
          return (0, n.default)(u);
        }
        try {
          generateUUID.name = e;
        } catch (e) {}
        generateUUID.DNS = i;
        generateUUID.URL = o;
        return generateUUID;
      }
    },
    122: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var n = _interopRequireDefault(r(807));
      var s = _interopRequireDefault(r(950));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function v4(e, t, r) {
        e = e || {};
        const i = e.random || (e.rng || n.default)();
        i[6] = (i[6] & 15) | 64;
        i[8] = (i[8] & 63) | 128;
        if (t) {
          r = r || 0;
          for (let e = 0; e < 16; ++e) {
            t[r + e] = i[e];
          }
          return t;
        }
        return (0, s.default)(i);
      }
      var i = v4;
      t['default'] = i;
    },
    120: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var n = _interopRequireDefault(r(998));
      var s = _interopRequireDefault(r(274));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const i = (0, n.default)('v5', 80, s.default);
      var o = i;
      t['default'] = o;
    },
    900: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var n = _interopRequireDefault(r(814));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function validate(e) {
        return typeof e === 'string' && n.default.test(e);
      }
      var s = validate;
      t['default'] = s;
    },
    595: (e, t, r) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var n = _interopRequireDefault(r(900));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function version(e) {
        if (!(0, n.default)(e)) {
          throw TypeError('Invalid UUID');
        }
        return parseInt(e.substr(14, 1), 16);
      }
      var s = version;
      t['default'] = s;
    },
    491: (e) => {
      'use strict';
      e.exports = require('assert');
    },
    113: (e) => {
      'use strict';
      e.exports = require('crypto');
    },
    361: (e) => {
      'use strict';
      e.exports = require('events');
    },
    147: (e) => {
      'use strict';
      e.exports = require('fs');
    },
    685: (e) => {
      'use strict';
      e.exports = require('http');
    },
    687: (e) => {
      'use strict';
      e.exports = require('https');
    },
    808: (e) => {
      'use strict';
      e.exports = require('net');
    },
    37: (e) => {
      'use strict';
      e.exports = require('os');
    },
    17: (e) => {
      'use strict';
      e.exports = require('path');
    },
    404: (e) => {
      'use strict';
      e.exports = require('tls');
    },
    837: (e) => {
      'use strict';
      e.exports = require('util');
    },
  };
  var t = {};
  function __nccwpck_require__(r) {
    var n = t[r];
    if (n !== undefined) {
      return n.exports;
    }
    var s = (t[r] = { exports: {} });
    var i = true;
    try {
      e[r].call(s.exports, s, s.exports, __nccwpck_require__);
      i = false;
    } finally {
      if (i) delete t[r];
    }
    return s.exports;
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/';
  var r = {};
  (() => {
    const e = __nccwpck_require__(186);
    const t = __nccwpck_require__(147);
    const r = __nccwpck_require__(973);
    const n = 'changedFiles';
    const s = 'deletedFiles';
    const i = 'timestamp';
    function buildCodeownersMap() {
      const e = t.readFileSync('.github/CODEOWNERS', 'utf8');
      const r = e.split('\n');
      let n;
      const s = new Map();
      for (let e of r) {
        if (e.substring(0, 1) != '#' && e.length > 1) {
          if (e.indexOf('\\ ') !== -1) {
            n = handleFilepathWithSpace(e);
          } else {
            n = e.split(' ');
          }
          if (n.length > 1) {
            n[0] = cleanPath(n[0]);
            s.set(n[0], getCodeowners(n));
          }
        }
      }
      return s;
    }
    function buildIgnoreList() {
      const e = [];
      const r = '.codeownersignore';
      if (!t.existsSync(r)) {
        return e;
      }
      const n = t.readFileSync(r, 'utf8').split('\n');
      for (let t of n) {
        if (t.substring(0, 1) !== '#' && t.length > 1) {
          if (t.indexOf(' #') !== -1) {
            t = t.substring(0, t.indexOf(' #'));
          }
          e.push(cleanPath(t));
        }
      }
      return e;
    }
    function cleanPath(e) {
      if (e != '/*' && e.substring(0, 1) == '/') {
        e = e.substring(1);
      }
      return e;
    }
    function getChangedFilesWithoutOwnership(e, t, r, n) {
      const s = [...t.keys()];
      let i = [...e];
      let o = [];
      o = n != '' ? o.concat(n) : o;
      o = r != '' ? o.concat(r) : o;
      for (let t of e) {
        o.forEach((e) => {
          if (t.includes(e)) {
            removeFromList(i, t);
          }
        });
        for (let e of s) {
          if (e == '*') {
            return [];
          }
          if (isMatch(t, e)) {
            removeFromList(i, t);
          }
        }
      }
      return i;
    }
    function getCodeowners(e) {
      e.splice(0, 1);
      for (let t = 0; t < e.length; t++) {
        if (e[t].substring(0, 1) == '#') {
          e.splice(t);
        }
      }
      return [...e];
    }
    function isFileExtensionMatch(e, t) {
      if (t.substring(0, 2) == '*.') {
        return e.includes(t.substring(1));
      }
      return false;
    }
    function handleFilepathWithSpace(e) {
      let t = null;
      let r = '';
      let n;
      let s = false;
      while (!s) {
        if (e.indexOf('\\ ') !== -1) {
          n = e.indexOf('\\ ');
          r += e.substring(0, n) + ' ';
          e = e.substring(n + 2);
          if (e[0] == '@') {
            r = r.substring(0, r.length - 1);
            t.push(r, ...e.split(' '));
            s = true;
          }
        } else if (e.indexOf(' ') !== -1) {
          n = e.indexOf(' ');
          r += e.substring(0, n);
          e = e.substring(n + 1);
          t = [r, ...e.split(' ')];
          s = true;
        } else {
          r += e;
          t = [r];
          s = true;
        }
      }
      return t;
    }
    function handleWhiteSpaceInFilepaths(e) {
      const t = [];
      let r = '';
      let n;
      let s;
      let i = false;
      while (!i) {
        if (e.indexOf(' ') === -1) {
          r += e;
          e = '';
        } else if (e.substring(0, 1) == '.') {
          n = e.indexOf(' ');
          r += e.substring(0, n);
          e = e.substring(n + 1);
        } else if (e.substring(0, 7) == 'LICENSE') {
          r += e.substring(0, 7);
          e = e.substring(8);
        } else {
          s = e.indexOf('.');
          r += e.substring(0, s);
          e = e.substring(s);
          if (e.indexOf(' ') !== -1) {
            n = e.indexOf(' ');
            r += e.substring(0, n);
            e = e.substring(n + 1);
          } else {
            r += e;
            e = '';
          }
        }
        t.push(r);
        r = '';
        if (e == '') {
          i = true;
        }
      }
      return t;
    }
    function isFirstLevelDirectoryMatch(e, t) {
      if (t.indexOf('/*') !== -1) {
        if (t == '/*') {
          return !e.includes('/');
        } else {
          let r = e.split('/');
          let n = r[r.length - 2];
          return t.includes(n);
        }
      }
      return false;
    }
    function isFullDirectoryMatch(e, t) {
      if (t.substring(t.length - 1) == '/') {
        return e.includes(t.substring(1));
      }
      return false;
    }
    function isMatch(e, t) {
      const n = [
        r,
        isFileExtensionMatch,
        isFullDirectoryMatch,
        isFirstLevelDirectoryMatch,
      ];
      for (let r of n) {
        if (r(e, t)) {
          return true;
        }
      }
      return false;
    }
    function removeFromList(e, t) {
      const r = e.indexOf(t);
      if (e[r] == t) {
        e.splice(e.indexOf(t), 1);
      }
    }
    function verifyCodeowners() {
      const t = e.getInput(n);
      const r = handleWhiteSpaceInFilepaths(t);
      const o = e.getInput(s);
      const a = handleWhiteSpaceInFilepaths(o);
      const u = buildIgnoreList();
      const c = buildCodeownersMap();
      const l = getChangedFilesWithoutOwnership(r, c, a, u);
      let f = null;
      if (l.length > 0) {
        f = '\n' + 'There are files without ownership in this work:' + '\n';
        l.forEach((e) => {
          f += e + '\n';
        });
        f +=
          '\n' +
          'Please update the CODEOWNERS file to take ownership over the updated files ' +
          'following the Code Owners best practices within the nCino Development Guide:' +
          '\n' +
          'https://github.com/ncino/ncino-development-guide/blob/main/Best%20Practices/Code%20Owners.md' +
          '\n' +
          'If files should be ignored or have no ownership, they can be added to the .codeownersignore file. ' +
          'For reference, see the `.codeownersignore` file information in the codeowner-verifier README:' +
          '\n' +
          'https://github.com/ncino/codeowner-verifier#.codeownersignore';
      }
      if (f != null) {
        e.setFailed(f);
      }
      e.setOutput(i, new Date().toTimeString());
    }
    verifyCodeowners();
  })();
  module.exports = r;
})();
