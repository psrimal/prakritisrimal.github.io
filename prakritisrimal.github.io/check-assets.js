#!/usr/bin/env node
/*
 * check-assets.js
 * Run from the repo root:  node check-assets.js
 *
 * Walks every .html file, pulls out every local src / href / data-src / data-poster,
 * and checks the file actually exists WITH THE EXACT CASE.
 *
 * This exists because Windows does not care about case and GitHub Pages does.
 * A page that works perfectly on your desktop will 404 live, and the only symptom
 * is a blank slot. This catches it before you push.
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', 'node_modules', 'archive', 'media-src', '.claude']);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/* exact-case existence check, walking one path segment at a time */
function existsExact(rel) {
  const parts = rel.split('/').filter(Boolean);
  let cur = ROOT;
  for (const part of parts) {
    let entries;
    try { entries = fs.readdirSync(cur); } catch { return { ok: false, reason: 'missing' }; }
    if (entries.includes(part)) { cur = path.join(cur, part); continue; }
    const ci = entries.find(e => e.toLowerCase() === part.toLowerCase());
    if (ci) return { ok: false, reason: 'case', found: ci, wanted: part };
    return { ok: false, reason: 'missing' };
  }
  return { ok: true };
}

const ATTR = /(?:\bsrc|\bhref|\bposter|\bdata-src|\bdata-poster|\bdata-logo)\s*=\s*"([^"]+)"/g;

const htmlFiles = walk(ROOT).filter(f => f.endsWith('.html'));
let problems = 0, checked = 0;
const referenced = new Set();

for (const file of htmlFiles) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const text = fs.readFileSync(file, 'utf8');
  const issues = [];
  let m;
  ATTR.lastIndex = 0;
  while ((m = ATTR.exec(text))) {
    const v = m[1].trim();
    if (!v) continue;
    if (/^(https?:|mailto:|tel:|data:|#|\/\/)/i.test(v)) continue;
    /* skip template placeholders: these live inside script tags and are
       filled in at runtime, e.g. href="${c.link}" */
    if (/\$\{|\{\{|<%/.test(v)) continue;
    if (/['"]\s*\+|\+\s*['"]/.test(v)) continue;   /* built by string concat at runtime */
    const clean = v.split('#')[0].split('?')[0];
    if (!clean) continue;
    checked++;
    referenced.add(clean);
    const r = existsExact(clean);
    if (!r.ok) {
      issues.push(r.reason === 'case'
        ? `  CASE     ${clean}   (on disk it is "${r.found}", html says "${r.wanted}")`
        : `  MISSING  ${clean}`);
    }
  }
  if (issues.length) {
    problems += issues.length;
    console.log(`\n${rel}`);
    console.log([...new Set(issues)].join('\n'));
  }
}

/* assets present but never referenced: usually a filename that drifted */
const orphans = walk(path.join(ROOT, 'assets'))
  .map(f => path.relative(ROOT, f).split(path.sep).join('/'))
  .filter(f => !referenced.has(f));

console.log(`\n${checked} local references checked across ${htmlFiles.length} html files.`);
if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.log('WARNING: no index.html at the repo root. GitHub Pages will show a 404.');
  problems++;
}
if (!fs.existsSync(path.join(ROOT, '.nojekyll'))) {
  console.log('WARNING: no .nojekyll file. Folders starting with _ will be dropped.');
}
if (orphans.length) {
  console.log(`\n${orphans.length} file(s) in assets/ that nothing links to:`);
  orphans.slice(0, 40).forEach(f => console.log('  ' + f));
  if (orphans.length > 40) console.log(`  ... and ${orphans.length - 40} more`);
}

console.log(problems ? `\n${problems} problem(s). Fix before pushing.` : '\nAll references resolve. Safe to push.');
process.exit(problems ? 1 : 0);
