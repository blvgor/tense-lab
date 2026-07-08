/* =========================================================
   Tense Lab — lesson engine
   Duolingo-style course: 12 lessons, one per tense.
   Step kinds: theory-idea, theory-form, tf, which, mcq,
   order, type, listen, error, ielts.
   Loads after app.js — uses its helpers and state.
========================================================= */

/* ---------- text helpers ---------- */
const stripTags = s => s.replace(/<[^>]*>/g, '');
function hlParts(html){
  const out = [];
  const re = /<span class=['"]hl['"]>([\s\S]*?)<\/span>/g;
  let m;
  while((m = re.exec(html))) out.push(stripTags(m[1]));
  return out;
}

/* ---------- speech ---------- */
const TTS_OK = 'speechSynthesis' in window;
let VOICE = null;
function pickVoice(){
  const vs = speechSynthesis.getVoices();
  VOICE = vs.find(v => v.lang === 'en-US' && /Google|Samantha|Aria/i.test(v.name))
       || vs.find(v => /^en(-|_)US/.test(v.lang))
       || vs.find(v => /^en(-|_)/.test(v.lang)) || null;
}
if(TTS_OK){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(text, rate = 1){
  if(!TTS_OK) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if(VOICE) u.voice = VOICE;
  u.lang = 'en-US'; u.rate = rate;
  speechSynthesis.speak(u);
}

/* =========================================================
   COURSE PATH
========================================================= */
const UNITS = [
  {time:"present", label:"Unit 1 · Present"},
  {time:"past",    label:"Unit 2 · Past"},
  {time:"future",  label:"Unit 3 · Future"}
];

function lessonStat(id){ return (S.lessons || {})[id]; }

function renderLearnPath(){
  const el = $('#learn-path');
  if(!el) return;
  const doneTotal = TENSES.filter(t => lessonStat(t.id) && lessonStat(t.id).done).length;
  const nextT = TENSES.find(t => !(lessonStat(t.id) && lessonStat(t.id).done));
  const nextId = nextT ? nextT.id : null;

  let html = '';
  UNITS.forEach(u => {
    const ts = TENSES.filter(t => t.time === u.time);
    const done = ts.filter(t => lessonStat(t.id) && lessonStat(t.id).done).length;
    html += `<div class="unit">
      <div class="unit-h"><span class="overline">${u.label}</span><span class="unit-cnt">${done}/${ts.length}</span></div>`;
    ts.forEach(t => {
      const st = lessonStat(t.id);
      const isDone = st && st.done;
      const cls = isDone ? 'done' : (t.id === nextId ? 'next' : '');
      html += `<div class="lsn ${cls}">
        <button class="lsn-go" data-lesson="${t.id}">
          <span class="lsn-dot">${isDone ? I.check : +t.n}</span>
          <span class="lsn-main">
            <span class="lsn-name">${t.name}</span>
            <span class="lsn-gloss">${t.gloss}</span>
          </span>
        </button>
        <div class="lsn-side">
          ${isDone
            ? `<span class="lsn-score">${st.best}%</span>`
            : (t.id === nextId ? `<span class="lsn-cta">Start →</span>` : '')}
          <button class="lsn-ref" data-ref="${t.id}">Guide</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  });
  el.innerHTML = html;

  el.querySelectorAll('[data-lesson]').forEach(b => b.addEventListener('click', () => startLesson(b.dataset.lesson)));
  el.querySelectorAll('[data-ref]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); openModalById(b.dataset.ref); }));

  $('#courseFill').style.width = (doneTotal / TENSES.length * 100) + '%';
  $('#courseCount').textContent = `${doneTotal} of ${TENSES.length} complete`;
}

/* =========================================================
   LESSON BUILDER
========================================================= */
function buildLesson(t){
  const tid = t.id;
  const pools = {
    which: shuffle(BANK.filter(q => q.type === 'which' && q.tid === tid)),
    fill:  shuffle(BANK.filter(q => q.type === 'fill'  && q.tid === tid)),
    type:  shuffle(BANK.filter(q => q.type === 'type'  && q.tid === tid)),
    error: shuffle(BANK.filter(q => q.type === 'error' && q.tid === tid)),
    ielts: shuffle(BANK.filter(q => q.type === 'ielts' && q.tid === tid)),
    /* discrimination: a "which tense?" item from a close contrast tense */
    contrast: shuffle(BANK.filter(q =>
      q.type === 'which' && q.tid !== tid && OPTS6[tid].slice(0, 4).includes(q.tid)))
  };
  const cur = {which:0, fill:0, type:0, error:0, ielts:0, contrast:0};
  const pull = k => pools[k][cur[k]++];

  const exs = t.examples.map(e => ({
    html: e[0], note: e[1],
    plain: stripTags(e[0]),
    hls: hlParts(e[0])
  }));
  const listenPool = shuffle(exs.filter(e => e.hls.length === 1 && e.plain.split(/\s+/).length <= 14));
  const orderPool  = shuffle(exs.filter(e => {
    const w = e.plain.split(/\s+/);
    return w.length >= 4 && w.length <= 9 && !/[—“”"]/.test(e.plain);
  }));
  const used = new Set();
  const takeEx = pool => {
    const e = pool.find(x => !used.has(x.plain));
    if(e) used.add(e.plain);
    return e;
  };
  const mist = shuffle(t.mistakes.slice());

  const steps = [];
  const add = s => { if(s) steps.push(s); };

  add({k:'theory-idea', t});
  add({k:'theory-form', t});
  if(mist[0]) add({k:'tf', m:mist[0], t});
  { const q = pull('which'); if(q) add({k:'which', q, t}); }
  { const q = pull('fill');  if(q) add({k:'mcq', q, t}); }
  { const e = takeEx(orderPool); if(e) add({k:'order', ex:e, t}); }
  { const q = pull('type');  if(q) add({k:'type', q, t}); }
  { const e = TTS_OK && takeEx(listenPool);
    if(e) add({k:'listen', ex:e, t});
    else { const q = pull('fill'); if(q) add({k:'mcq', q, t}); } }
  { const q = pull('fill');  if(q) add({k:'mcq', q, t}); }
  { const q = pull('error') || pull('which'); if(q) add({k: q.type === 'error' ? 'error' : 'which', q, t}); }
  if(mist[1]) add({k:'tf', m:mist[1], t});
  { const q = pull('type') || pull('fill'); if(q) add({k: q.type === 'type' ? 'type' : 'mcq', q, t}); }
  { const e = TTS_OK && takeEx(listenPool);
    if(e) add({k:'listen', ex:e, t});
    else { const e2 = takeEx(orderPool); if(e2) add({k:'order', ex:e2, t}); } }
  { const q = pull('contrast'); if(q) add({k:'which', q, t, contrast:true}); }
  { const q = pull('ielts'); if(q) add({k:'ielts', q, t}); }

  return steps;
}

/* =========================================================
   ENGINE
========================================================= */
const LSN = {
  on:false, t:null, steps:[], idx:0,
  correct:0, total:0,
  checked:false, sel:null, orderSel:[], answer:null, done:false
};
const lessonOv = $('#lessonOv');

function startLesson(id){
  const t = TENSES[TIDX[id]];
  LSN.on = true; LSN.t = t;
  LSN.steps = buildLesson(t);
  LSN.idx = 0; LSN.correct = 0;
  LSN.total = LSN.steps.filter(s => !s.k.startsWith('theory')).length;
  LSN.done = false;

  lessonOv.innerHTML = `
    <div class="lesson-bar">
      <button class="icon-btn" id="lsQuit" aria-label="Quit lesson">${I.x}</button>
      <div class="lesson-track"><i id="lsFill"></i></div>
      <span class="lesson-step" id="lsStep"></span>
    </div>
    <div class="lesson-body"><div class="lesson-col" id="lsCol"></div></div>
    <div class="lesson-foot" id="lsFoot">
      <div class="lesson-foot-in">
        <div class="ls-fb" id="lsFb"></div>
        <button class="btn ls-btn" id="lsBtn">Check</button>
      </div>
    </div>`;
  lessonOv.classList.add('open');
  document.body.style.overflow = 'hidden';
  $('#lsQuit').addEventListener('click', quitLesson);
  $('#lsBtn').addEventListener('click', lsAction);
  renderLessonStep();
}

function quitLesson(){
  if(TTS_OK) speechSynthesis.cancel();
  LSN.on = false;
  lessonOv.classList.remove('open');
  document.body.style.overflow = '';
  renderLearnPath();
}

const KICKER = {
  tf:"True or false", which:"Which tense?", mcq:"Fill the gap",
  order:"Build the sentence", type:"Type the form",
  listen:"Listen and complete", error:"Fix the mistake", ielts:"IELTS context"
};

function renderLessonStep(){
  const s = LSN.steps[LSN.idx];
  const col = $('#lsCol');
  const foot = $('#lsFoot');
  LSN.checked = false; LSN.sel = null; LSN.orderSel = [];

  $('#lsFill').style.width = (LSN.idx / LSN.steps.length * 100) + '%';
  $('#lsStep').textContent = `${LSN.idx + 1} / ${LSN.steps.length}`;
  foot.className = 'lesson-foot';
  $('#lsFb').innerHTML = '';
  const btn = $('#lsBtn');
  btn.textContent = s.k.startsWith('theory') ? 'Continue' : 'Check';
  btn.disabled = false;

  if(s.k === 'theory-idea'){
    col.innerHTML = `
      <div class="ls-theory">
        <p class="overline">Lesson ${+s.t.n} · The idea</p>
        <h2>${s.t.name}</h2>
        <div class="ls-body">${s.t.longDesc}</div>
        <div class="ls-ru">${s.t.ru}</div>
      </div>`;
    return;
  }
  if(s.k === 'theory-form'){
    col.innerHTML = `
      <div class="ls-theory">
        <p class="overline">How to build it</p>
        <h2>${s.t.name}</h2>
        <div class="ls-formula">${s.t.form}</div>
        <div class="ls-signals">${s.t.signals.slice(0, 8).map(x => `<span class="signal">${x}</span>`).join('')}</div>
        <div class="ls-exs">${s.t.examples.slice(0, 2).map(e =>
          `<div class="ls-ex">${e[0]}<span class="note">${e[1]}</span></div>`).join('')}</div>
      </div>`;
    return;
  }

  btn.disabled = true;
  const kick = `<p class="overline ls-kicker">${KICKER[s.k]}${s.k === 'ielts' && s.q.part ? ` · ${s.q.part}` : ''}${s.contrast ? '' : ` · ${s.t.name}`}</p>`;

  if(s.k === 'tf'){
    const showBad = Math.random() < 0.5;
    s.shown = showBad ? s.m.bad : s.m.fix;
    s.answerIdx = showBad ? 1 : 0; /* 0 = Correct, 1 = Incorrect */
    col.innerHTML = `${kick}
      <h2 class="ls-q">“${s.shown}”</h2>
      <p class="ls-hint">Is this sentence grammatically correct?</p>
      <div class="copts">
        ${['Correct','Incorrect'].map((o, i) =>
          `<button class="copt" data-i="${i}"><span class="key">${i + 1}</span><span>${o}</span></button>`).join('')}
      </div>`;
    bindOpts();
    return;
  }

  if(s.k === 'which'){
    s.opts = shuffle(OPTS6[s.q.tid].slice(0, 4)).map(id => TNAME[id]);
    s.answer = TNAME[s.q.tid];
    col.innerHTML = `${kick}
      <h2 class="ls-q">${s.q.s}</h2>
      <p class="ls-hint">Which tense is the highlighted verb?</p>
      ${optsHTML(s.opts)}`;
    bindOpts();
    return;
  }

  if(s.k === 'mcq' || s.k === 'ielts' || s.k === 'error'){
    s.opts = shuffle([s.q.correct, ...s.q.wrong]);
    s.answer = s.q.correct;
    const text = s.k === 'error' ? s.q.s : s.q.stem.replace('___', '<span class="gap">___</span>');
    const hint = s.k === 'error' ? 'The highlighted part is wrong — choose the correction.'
               : s.k === 'ielts' ? 'Choose the form an examiner would expect.'
               : 'Choose the correct form.';
    col.innerHTML = `${kick}
      <h2 class="ls-q">${text}</h2>
      <p class="ls-hint">${hint}</p>
      ${optsHTML(s.opts)}`;
    bindOpts();
    return;
  }

  if(s.k === 'type'){
    col.innerHTML = `${kick}
      <h2 class="ls-q">${s.q.stem.replace('___', '<span class="gap">___</span>')}</h2>
      <p class="ls-hint">Type the correct form of the verb in brackets.</p>
      <input class="ls-input" id="lsIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer…">`;
    bindInput();
    return;
  }

  if(s.k === 'listen'){
    const gapped = s.ex.html.replace(/<span class=['"]hl['"]>[\s\S]*?<\/span>/, '<span class="gap">______</span>');
    s.answer = s.ex.hls[0];
    col.innerHTML = `${kick}
      <div class="ls-audio">
        <button class="play-lg" id="lsPlay" aria-label="Play sentence">${I.speaker}</button>
        <button class="play-slow" id="lsSlow">${I.speaker} Slow</button>
      </div>
      <h2 class="ls-q">${gapped}</h2>
      <p class="ls-hint">Listen, then type the missing words.</p>
      <input class="ls-input" id="lsIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type what you hear…">`;
    $('#lsPlay').addEventListener('click', () => speak(s.ex.plain, 0.95));
    $('#lsSlow').addEventListener('click', () => speak(s.ex.plain, 0.6));
    bindInput();
    speak(s.ex.plain, 0.95);
    return;
  }

  if(s.k === 'order'){
    s.words = s.ex.plain.split(/\s+/);
    let poolWords = shuffle(s.words.map((w, i) => ({w, i})));
    if(poolWords.map(x => x.w).join(' ') === s.ex.plain) poolWords = poolWords.slice().reverse();
    s.pool = poolWords;
    col.innerHTML = `${kick}
      <p class="ls-hint" style="margin-top:0">Tap the words in the right order.</p>
      <div class="ls-answer" id="lsAns"></div>
      <div class="ls-pool" id="lsPool">
        ${poolWords.map((x, pi) => `<button class="wchip" data-p="${pi}">${x.w}</button>`).join('')}
      </div>`;
    $('#lsPool').querySelectorAll('.wchip').forEach(ch => ch.addEventListener('click', () => {
      if(LSN.checked || ch.classList.contains('ghosted')) return;
      ch.classList.add('ghosted');
      LSN.orderSel.push(+ch.dataset.p);
      renderOrderAnswer(s);
    }));
    return;
  }
}

function renderOrderAnswer(s){
  const ans = $('#lsAns');
  ans.innerHTML = LSN.orderSel.map(pi =>
    `<button class="wchip" data-p="${pi}">${s.pool[pi].w}</button>`).join('');
  ans.querySelectorAll('.wchip').forEach(ch => ch.addEventListener('click', () => {
    if(LSN.checked) return;
    const pi = +ch.dataset.p;
    LSN.orderSel = LSN.orderSel.filter(x => x !== pi);
    const poolChip = $('#lsPool').querySelector(`[data-p="${pi}"]`);
    if(poolChip) poolChip.classList.remove('ghosted');
    renderOrderAnswer(s);
  }));
  $('#lsBtn').disabled = LSN.orderSel.length !== s.words.length;
}

function optsHTML(list){
  return `<div class="copts">${list.map((o, i) =>
    `<button class="copt" data-i="${i}"><span class="key">${i + 1}</span><span>${o}</span></button>`).join('')}</div>`;
}
function bindOpts(){
  $('#lsCol').querySelectorAll('.copt').forEach(b => b.addEventListener('click', () => {
    if(LSN.checked) return;
    $('#lsCol').querySelectorAll('.copt').forEach(x => x.classList.remove('sel'));
    b.classList.add('sel');
    LSN.sel = +b.dataset.i;
    $('#lsBtn').disabled = false;
    b.blur();
  }));
}
function bindInput(){
  const inp = $('#lsIn');
  inp.focus();
  inp.addEventListener('input', () => { $('#lsBtn').disabled = !inp.value.trim(); });
  inp.addEventListener('keydown', e => {
    if(e.key === 'Enter'){ e.preventDefault(); if(!$('#lsBtn').disabled) lsAction(); }
  });
}

/* ---------- check / advance ---------- */
function lsAction(){
  const s = LSN.steps[LSN.idx];
  if(LSN.done){ quitLesson(); return; }
  if(s.k.startsWith('theory') || LSN.checked){ lsNext(); return; }
  lsCheck(s);
}

function lsCheck(s){
  let ok = false, correctText = '', why = '';

  if(s.k === 'tf'){
    ok = LSN.sel === s.answerIdx;
    correctText = s.answerIdx === 0 ? 'Correct' : `Incorrect — should be: “${s.m.fix}”`;
    why = s.m.note;
    markOpts(s.answerIdx);
  }
  else if(s.k === 'which' || s.k === 'mcq' || s.k === 'ielts' || s.k === 'error'){
    const rightIdx = s.opts.indexOf(s.answer);
    ok = LSN.sel === rightIdx;
    correctText = s.answer;
    why = s.q.why || '';
    markOpts(rightIdx);
  }
  else if(s.k === 'type'){
    const inp = $('#lsIn');
    const val = normalizeTyped(inp.value);
    ok = s.q.answers.some(a => normalizeTyped(a) === val);
    correctText = s.q.answers[0];
    why = s.q.why || '';
    inp.disabled = true;
    inp.classList.add(ok ? 'right' : 'wrong');
  }
  else if(s.k === 'listen'){
    const inp = $('#lsIn');
    const val = normalizeTyped(inp.value);
    ok = normalizeTyped(s.answer) === val;
    correctText = s.answer;
    why = s.ex.note ? `${s.ex.plain} — ${s.ex.note}.` : s.ex.plain;
    inp.disabled = true;
    inp.classList.add(ok ? 'right' : 'wrong');
  }
  else if(s.k === 'order'){
    const built = LSN.orderSel.map(pi => s.pool[pi].w).join(' ');
    ok = built === s.ex.plain;
    correctText = s.ex.plain;
    why = s.ex.note ? `${s.ex.note}.` : '';
    const ans = $('#lsAns');
    ans.classList.add(ok ? 'right' : 'wrong');
  }

  LSN.checked = true;
  if(ok) LSN.correct++;
  recordAnswer(s.q ? s.q.tid : s.t.id, 'lesson', ok);

  const foot = $('#lsFoot');
  foot.classList.add(ok ? 'ok' : 'bad');
  $('#lsFb').innerHTML = `
    <div class="verdict">${ok ? I.checkC : I.xC}${ok ? 'Correct' : 'Not quite'}</div>
    <div class="fb-why">${ok ? '' : `<b>Answer:</b> ${correctText}${why ? ' · ' : ''}`}${why}</div>`;
  const btn = $('#lsBtn');
  btn.textContent = 'Continue';
  btn.disabled = false;
  btn.focus();
}

function markOpts(rightIdx){
  $('#lsCol').querySelectorAll('.copt').forEach(b => {
    b.disabled = true;
    const i = +b.dataset.i;
    if(i === rightIdx) b.classList.add('right');
    else if(i === LSN.sel) b.classList.add('wrong');
    b.classList.remove('sel');
  });
}

function lsNext(){
  if(TTS_OK) speechSynthesis.cancel();
  LSN.idx++;
  if(LSN.idx >= LSN.steps.length){ endLesson(); return; }
  renderLessonStep();
}

function endLesson(){
  const t = LSN.t;
  const pct = LSN.total ? Math.round(LSN.correct / LSN.total * 100) : 100;
  const prev = lessonStat(t.id) || {};
  S.lessons = S.lessons || {};
  S.lessons[t.id] = {
    done: true,
    best: Math.max(prev.best || 0, pct),
    runs: (prev.runs || 0) + 1
  };
  saveS();
  LSN.done = true;

  const msg = pct >= 90 ? 'Near-perfect. This tense is yours — the next one is waiting.'
            : pct >= 70 ? 'Solid work. Re-run the lesson later to push the score up.'
            : 'A good first pass. Open the Guide for this tense, then run the lesson again.';

  $('#lsFill').style.width = '100%';
  $('#lsStep').textContent = 'Done';
  $('#lsCol').innerHTML = `
    <div class="ls-end">
      <div class="end-pct">${pct}<span>%</span></div>
      <h2>Lesson complete</h2>
      <p>${msg}</p>
      <div class="ls-end-stats">
        <div><div class="n">${LSN.correct}/${LSN.total}</div><div class="l">correct</div></div>
        <div><div class="n">${S.lessons[t.id].best}%</div><div class="l">best score</div></div>
        <div><div class="n">${S.lessons[t.id].runs}</div><div class="l">runs</div></div>
      </div>
    </div>`;
  const foot = $('#lsFoot');
  foot.className = 'lesson-foot ok';
  $('#lsFb').innerHTML = `<div class="verdict">${I.checkC}${t.name}</div>`;
  const btn = $('#lsBtn');
  btn.textContent = 'Finish';
  btn.disabled = false;
  btn.focus();
}

/* ---------- keyboard ---------- */
document.addEventListener('keydown', e => {
  if(!LSN.on) return;
  if(e.key === 'Escape'){ quitLesson(); return; }
  const tag = e.target.tagName;
  if(e.key === 'Enter'){
    if(tag === 'BUTTON' || tag === 'INPUT') return; /* native handling */
    const btn = $('#lsBtn');
    if(btn && !btn.disabled){ e.preventDefault(); lsAction(); }
    return;
  }
  if(tag === 'INPUT' || tag === 'TEXTAREA') return;
  if(/^[1-9]$/.test(e.key) && !LSN.checked){
    const btn = $$('#lsCol .copt')[+e.key - 1];
    if(btn) btn.click();
  }
});

/* ---------- init ---------- */
renderLearnPath();
