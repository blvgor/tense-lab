/* =========================================================
   Tense Lab — app logic
========================================================= */

/* ---------- helpers ---------- */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const TNAME = Object.fromEntries(TENSES.map(t => [t.id, t.name]));
const TIDX  = Object.fromEntries(TENSES.map((t,i) => [t.id, i]));
function shuffle(a){ a=[...a]; for(let i=a.length-1;i>0;i--){ const j=Math.random()*(i+1)|0; [a[i],a[j]]=[a[j],a[i]]; } return a; }
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;");

/* ---------- icons (inline SVG, stroke 1.8) ---------- */
const I = {
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  checkC:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m8.4 12.3 2.4 2.4 4.9-5.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  xC:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6" stroke-linecap="round"/></svg>',
  zap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 11-12h-7l1-8z"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 22s8-4 8-10V6l-8-3-8 3v6c0 6 8 10 8 10z"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
  compass:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2z"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35 3.9 13.2a5.4 5.4 0 1 1 7.63-7.64l.47.47.47-.47a5.4 5.4 0 0 1 7.63 7.64L12 21.35z"/></svg>',
  speaker:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7" stroke-linecap="round"/><path d="M18.5 5.5a9 9 0 0 1 0 13" stroke-linecap="round"/></svg>'
};

/* ---------- persistent state ---------- */
const LS_KEY = "tenselab-v2";
let S = { stats:{tense:{},mode:{}}, answered:0, correct:0, best:{sprint:0,survival:0}, decks:{}, lessons:{}, sprintDur:60 };
try{ const raw = localStorage.getItem(LS_KEY); if(raw) S = Object.assign(S, JSON.parse(raw)); }catch(e){}
S.lessons = S.lessons || {};
S.best = S.best || {};
if(!S.best.sprintBy) S.best.sprintBy = S.best.sprint ? {60:S.best.sprint} : {};
if(!S.sprintDur) S.sprintDur = 60;
function saveS(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(S)); }catch(e){} }
function recordAnswer(tid, mode, ok){
  S.answered++; if(ok) S.correct++;
  const t = S.stats.tense[tid] = S.stats.tense[tid] || {c:0,t:0};
  t.t++; if(ok) t.c++;
  const m = S.stats.mode[mode] = S.stats.mode[mode] || {c:0,t:0};
  m.t++; if(ok) m.c++;
  saveS();
}

/* ---------- tabs ---------- */
function switchTab(name){
  $$('.tab').forEach(t=>t.classList.toggle('active', t.dataset.tab===name));
  $$('.panel').forEach(p=>p.classList.toggle('active', p.id===name));
  window.scrollTo({top:0,behavior:'smooth'});
  stopSprint();
  if(name==='learn' && typeof renderLearnPath==='function') renderLearnPath();
  if(name==='practice' && !PR.queue.length) startPractice();
  if(name==='games') renderGamesHub();
  if(name==='cards' && !FC.session) renderDecks();
  if(name==='progress') renderDash();
}
$$('.tab').forEach(t=>t.addEventListener('click', ()=>switchTab(t.dataset.tab)));

/* ---------- modal: full tense breakdown ---------- */
const modalBg = $('#modalBg'), modalEl = $('#modal');
function openModalById(id){
  const t = TENSES[TIDX[id]];
  modalEl.innerHTML = `
    <div class="modal-top">
      <button class="close" aria-label="Close">${I.x}</button>
      <div class="num">Tense ${t.n} · ${t.time} · ${t.aspect}</div>
      <h3>${t.name}</h3>
      <div class="gloss">${t.gloss}</div>
      <div class="rugloss">${t.ru}</div>
    </div>
    <div class="modal-body">
      <div class="block">
        <h4>The idea</h4>
        <div class="desc">${t.longDesc}</div>
      </div>
      <div class="block">
        <h4>How to build it</h4>
        <div class="formula">${t.form}</div>
      </div>
      <div class="block">
        <h4>When &amp; where to use it</h4>
        <ul class="uselist">${t.uses.map(u=>`<li><span><b>${u[0]}</b> — ${u[1]}</span></li>`).join('')}</ul>
      </div>
      <div class="block">
        <h4>Examples</h4>
        <div class="exlist">${t.examples.map(e=>`<div class="exs">${e[0]}<span class="note">${e[1]}</span></div>`).join('')}</div>
      </div>
      <div class="block">
        <h4>Signal words</h4>
        <div class="signals">${t.signals.map(s=>`<span class="signal">${s}</span>`).join('')}</div>
      </div>
      <div class="block">
        <h4>Common mistakes</h4>
        ${t.mistakes.map(m=>`<div class="warn"><b class="x">✕ ${m.bad}</b><br><span class="fix">✓ ${m.fix}</span><br><span style="display:block;margin-top:8px">${m.note}</span></div>`).join('')}
      </div>
      <div class="block">
        <h4>In IELTS</h4>
        <div class="ielts-note">
          <span class="part">Writing</span>${t.ielts.w}
          <span class="part">Speaking</span>${t.ielts.s}
          <span class="part">Band 8 tip</span>${t.ielts.tip}
        </div>
      </div>
    </div>`;
  modalEl.querySelector('.close').addEventListener('click', closeModal);
  modalBg.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){ modalBg.classList.remove('open'); document.body.style.overflow=''; }
modalBg.addEventListener('click', e=>{ if(e.target===modalBg) closeModal(); });

/* =========================================================
   REFERENCE — matrix + timeline + compare + tips
========================================================= */
(function renderMatrix(){
  const wrap = $('#matrix');
  let html = '<div class="matrix"><div class="mx-corner"></div>';
  MATRIX_COLS.forEach(c=> html += `<div class="mx-col"><b>${c.label}</b>${c.idea}</div>`);
  MATRIX_ROWS.forEach(r=>{
    html += `<div class="mx-row">${r.label}</div>`;
    MATRIX_COLS.forEach(c=>{
      const t = TENSES.find(x=>x.time===r.time && x.aspect===c.aspect);
      html += `<button class="mx-cell ${t.level==='core'?'core':''}" data-id="${t.id}">
        <div class="t">${t.name.replace(' (will / going to)','')}</div>
        <div class="f">${MATRIX_SAMPLES[t.id]}</div>
        <div class="e">${t.gloss.split('—')[0].split('.')[0]}</div>
      </button>`;
    });
  });
  html += '</div>';
  wrap.innerHTML = html;
  wrap.querySelectorAll('.mx-cell').forEach(b=>b.addEventListener('click',()=>openModalById(b.dataset.id)));
})();

(function renderTimeline(){
  const tlEl = $('#tlmarks');
  TL.forEach(m=>{
    const t = TENSES[TIDX[m.ref]];
    const d = document.createElement('div');
    d.className='tl-mark';
    d.style.left = m.pos+'%';
    d.innerHTML = `<div class="bar"></div><div class="lbl">${t.name.replace(' (will / going to)','')}</div><div class="sub">${m.sub}</div>`;
    tlEl.appendChild(d);
  });
  function stagger(){
    const marks=[...tlEl.children];
    if(window.innerWidth<=760){ marks.forEach(m=>m.style.top=''); return; }
    const rows=[6,72,6,72,124,6];
    marks.forEach((m,i)=>{ m.style.top=(rows[i]||6)+'px'; });
  }
  stagger();
  window.addEventListener('resize', stagger);
})();

$('#cmptable').innerHTML =
  `<tr><th>Tense</th><th>Use it for…</th><th>Example</th></tr>` +
  COMPARE.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td class="m">${r[2]}</td></tr>`).join('');

$('#tips').innerHTML = TIPS.map(tp=>
  `<div class="tip-item"><h3>${tp.t}</h3><p>${tp.d}</p></div>`).join('');

/* =========================================================
   PRACTICE ENGINE
========================================================= */
const TYPE_LABEL = {which:"WHICH TENSE?", fill:"FILL THE GAP", type:"TYPE THE FORM", error:"ERROR HUNT", ielts:"IELTS DRILL", lesson:"LESSONS"};
const PR = { mode:"mixed", len:10, queue:[], idx:0, score:0, streak:0, answered:false, perTense:{}, missed:[] };
const quizArea = $('#quiz-area');

function pool(mode){
  if(mode==="mixed") return BANK.slice();
  return BANK.filter(q=>q.type===mode);
}
function startPractice(mode, len){
  if(mode) PR.mode = mode;
  if(len) PR.len = len;
  $$('#mode-row .mode').forEach(b=>b.classList.toggle('active', b.dataset.mode===PR.mode));
  const p = pool(PR.mode);
  PR.queue = shuffle(p).slice(0, Math.min(PR.len, p.length));
  PR.idx=0; PR.score=0; PR.streak=0; PR.answered=false; PR.perTense={}; PR.missed=[];
  updatePracticeStats(); renderQ();
}
$$('#mode-row .mode').forEach(b=>b.addEventListener('click', ()=>startPractice(b.dataset.mode)));
$$('#len-row .lenb').forEach(b=>b.addEventListener('click', ()=>{
  $$('#len-row .lenb').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  startPractice(null, +b.dataset.len);
}));

function updatePracticeStats(){
  $('#score').textContent = PR.score;
  $('#streak').textContent = PR.streak;
  $('#qtotal').textContent = PR.queue.length;
}

function optionsHTML(list){
  const keys=['1','2','3','4','5','6'];
  const two = list.length===4 && list.every(o=>o.length<40);
  return `<div class="opts ${two?'two':''}">` + list.map((o,i)=>
    `<button class="opt" data-i="${i}" data-val="${esc(o)}">
       <span class="key">${keys[i]}</span><span>${o}</span><span class="mark"></span></button>`).join('') + `</div>`;
}

function renderQ(){
  PR.answered=false;
  const q = PR.queue[PR.idx];
  $('#qpos').textContent = PR.idx+1;
  $('#pfill').style.width = (PR.idx/PR.queue.length*100)+'%';

  let prompt='', opts='', correctVal='';
  if(q.type==="which"){
    prompt = `<div class="q-text">${q.s}</div><div class="q-hint">Which tense is the highlighted verb — and why?</div>`;
    const list = shuffle(OPTS6[q.tid]).map(id=>TNAME[id]);
    correctVal = TNAME[q.tid];
    opts = optionsHTML(list);
  } else if(q.type==="type"){
    prompt = `<div class="q-text">${q.stem.replace('___','<span class="gap">___</span>')}</div>
              <div class="q-hint">Type the correct form of the verb in brackets, then press <b>Enter</b>.</div>`;
    opts = `<div class="type-row">
              <input class="type-input" id="typeIn" autocomplete="off" spellcheck="false" placeholder="Type the verb form…">
              <button class="btn" id="checkBtn">Check</button>
            </div>`;
  } else {
    const hint = q.type==="error" ? "The highlighted part is wrong. Choose the correction."
               : q.type==="ielts" ? "Choose the form an examiner would expect."
               : "Choose the correct form.";
    const text = q.type==="error" ? q.s : q.stem.replace('___','<span class="gap">___</span>');
    prompt = `<div class="q-text">${text}</div><div class="q-hint">${hint}</div>`;
    const list = shuffle([q.correct, ...q.wrong]);
    correctVal = q.correct;
    opts = optionsHTML(list);
  }

  quizArea.innerHTML = `
    <div class="q-card">
      <div class="q-kicker">
        <span class="qtype">${TYPE_LABEL[q.type]}</span>
        ${q.part?`<span class="situ">${q.part.toUpperCase()}</span>`:''}
        <span>· ${q.situ}</span>
      </div>
      ${prompt}
      ${opts}
      <div class="feedback" id="fb"></div>
      <div class="next-row"><button class="btn" id="nextBtn" disabled>Next →</button></div>
    </div>`;

  if(q.type==="type"){
    const inp = $('#typeIn');
    inp.focus();
    $('#checkBtn').addEventListener('click', ()=>checkTyped(q));
    inp.addEventListener('keydown', e=>{
      if(e.key==='Enter'){ e.preventDefault(); PR.answered ? next() : checkTyped(q); }
    });
  } else {
    quizArea.querySelectorAll('.opt').forEach(btn=>{
      btn.addEventListener('click', ()=>chooseMCQ(q, btn, correctVal));
    });
  }
  $('#nextBtn').addEventListener('click', next);
}

function normalizeTyped(s){
  return s.toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').replace(/[.!?]+$/,'').trim();
}
function checkTyped(q){
  if(PR.answered) return;
  const inp = $('#typeIn');
  const val = normalizeTyped(inp.value);
  if(!val) { inp.focus(); return; }
  PR.answered = true;
  const ok = q.answers.some(a=>normalizeTyped(a)===val);
  inp.disabled = true;
  inp.classList.add(ok?'ok':'bad');
  afterAnswer(q, ok, q.answers[0]);
}
function chooseMCQ(q, btn, correctVal){
  if(PR.answered) return;
  PR.answered = true;
  const ok = btn.dataset.val === esc(correctVal);
  quizArea.querySelectorAll('.opt').forEach(o=>{
    o.disabled = true;
    if(o.dataset.val === esc(correctVal)){ o.classList.add('correct'); o.querySelector('.mark').textContent='✓'; }
  });
  if(!ok){ btn.classList.add('wrong'); btn.querySelector('.mark').textContent='✕'; }
  afterAnswer(q, ok, correctVal);
}
function afterAnswer(q, ok, correctVal){
  PR.perTense[q.tid] = PR.perTense[q.tid] || {c:0,t:0};
  PR.perTense[q.tid].t++;
  if(ok){ PR.score++; PR.streak++; PR.perTense[q.tid].c++; }
  else { PR.streak=0; PR.missed.push({q, correctVal}); }
  recordAnswer(q.tid, q.type, ok);
  updatePracticeStats();

  const fb = $('#fb');
  fb.className = 'feedback show ' + (ok?'ok':'no');
  fb.innerHTML = `
    <span class="verdict">${ok ? 'Correct' : `Not quite — the answer is “${correctVal}”`}</span>
    <span class="why">${q.why}</span>
    ${q.whyNot?`<div class="whynot"><b>Why the others are wrong:</b> ${q.whyNot}</div>`:''}
    ${q.tip?`<div class="tip"><b>IELTS →</b> ${q.tip}</div>`:''}
    <div class="tags"><span class="tag">${TNAME[q.tid]}</span><span class="tag">${TYPE_LABEL[q.type]}</span></div>`;
  const nb = $('#nextBtn');
  nb.disabled = false;
  nb.focus();
}
function next(){
  if(!PR.answered) return;
  PR.idx++;
  if(PR.idx >= PR.queue.length) showResults();
  else renderQ();
}

function showResults(){
  $('#pfill').style.width='100%';
  const pct = Math.round(PR.score/PR.queue.length*100);
  let title,msg;
  if(pct>=90){title="Band 8 material.";msg="Near-perfect accuracy. Switch modes or raise the length to 40 to keep the edge sharp.";}
  else if(pct>=70){title="Strong work.";msg="Solid grasp — study the review below: each missed item names its rule.";}
  else if(pct>=50){title="Getting there.";msg="The foundation is forming. Re-read the tenses you missed most, then run this mode again.";}
  else {title="Good start.";msg="Head back to Learn — the lessons explain every rule you met here.";}

  const bd = Object.entries(PR.perTense).map(([tid,d])=>{
    const p=Math.round(d.c/d.t*100);
    return `<div class="bd"><div class="n">${TNAME[tid]}</div><div class="v">${d.c}/${d.t}</div>
      <div class="track"><i style="width:${p}%"></i></div></div>`;
  }).join('');

  const review = PR.missed.length ? `
    <div class="review">
      <h4>Review your misses (${PR.missed.length})</h4>
      ${PR.missed.map(m=>{
        const text = m.q.type==='which'||m.q.type==='error' ? m.q.s : m.q.stem;
        return `<div class="review-item">
          <div class="rq">${text}</div>
          <div>→ <span class="ra">${m.correctVal}</span> · ${TNAME[m.q.tid]}</div>
          <div class="rw">${m.q.why}</div>
        </div>`;
      }).join('')}
    </div>` : '';

  quizArea.innerHTML = `
    <div class="results">
      <div class="score">${PR.score}<span class="of">/${PR.queue.length}</span></div>
      <h3>${title}</h3>
      <p>${msg}</p>
      <div class="breakdown">${bd}</div>
      <div class="results-actions">
        <button class="btn" id="againBtn">Try again →</button>
        <button class="btn ghost" id="learnBtn">Back to Learn</button>
      </div>
      ${review}
    </div>`;
  $('#againBtn').addEventListener('click', ()=>startPractice());
  $('#learnBtn').addEventListener('click', ()=>switchTab('learn'));
  PR.queue = PR.queue.slice(); // keep non-empty so tab switch doesn't restart mid-view
}

/* =========================================================
   GAMES
========================================================= */
const gamesArea = $('#games-area');
const MCQ_POOL = () => BANK.filter(q=>q.type!=='type');
let SPRINT = {timer:null, left:60, dur:60, score:0, on:false};
let SURV = {on:false, lives:3, streak:0, queue:[], idx:0};

const sprintBest = d => (S.best.sprintBy||{})[d] || 0;
const fmtDur = d => d % 60 === 0 ? (d/60)+' min' : d+'s';

function hubRow(icon, title, desc, side){
  return `<div class="hub-row">
    <span class="hub-ic">${icon}</span>
    <div class="hub-main"><h3>${title}</h3><p>${desc}</p></div>
    <div class="hub-side">${side}</div>
  </div>`;
}

function renderGamesHub(){
  stopSprint(); SURV.on=false;
  gamesArea.innerHTML = `<div class="hub">
    ${hubRow(I.zap, 'Sprint',
      'Race the clock — you pick how long, from 10 seconds to 10 minutes. Wrong answers cost nothing but time.',
      `<span class="hub-best">Best <b>${sprintBest(S.sprintDur)}</b> · ${fmtDur(S.sprintDur)}</span><button class="btn" id="startSprint">Play</button>`)}
    ${hubRow(I.layers, 'Match pairs',
      'Six sentences, six tenses. Match every sentence to its tense — mistakes shake the board and count against you.',
      `<span class="hub-best">Clean rounds <b>${S.best.match||0}</b></span><button class="btn" id="startMatch">Play</button>`)}
    ${hubRow(I.shield, 'Survival',
      'Three lives, endless questions from all five drill types. One streak, no mercy. How far can you go?',
      `<span class="hub-best">Best streak <b>${S.best.survival||0}</b></span><button class="btn" id="startSurv">Play</button>`)}
  </div>`;
  $('#startSprint').addEventListener('click', renderSprintSetup);
  $('#startMatch').addEventListener('click', startMatch);
  $('#startSurv').addEventListener('click', startSurvival);
}

/* --- Sprint --- */
function stopSprint(){ if(SPRINT.timer){ clearInterval(SPRINT.timer); SPRINT.timer=null; } SPRINT.on=false; }

function renderSprintSetup(){
  stopSprint();
  const durs = [30, 60, 90, 120];
  let sel = S.sprintDur || 60;
  gamesArea.innerHTML = `
    <div class="g-setup">
      <p class="overline">Sprint</p>
      <h2>How much time do you want?</h2>
      <p class="section-sub">Pick a preset or type your own — anything from 10 to 600 seconds. Bests are saved per duration.</p>
      <div class="dur-row">
        ${durs.map(d=>`<button class="dur-chip ${d===sel?'active':''}" data-d="${d}">${d}s</button>`).join('')}
        <input class="dur-custom" id="durCustom" type="number" min="10" max="600" placeholder="Custom (s)" value="${durs.includes(sel)?'':sel}">
      </div>
      <div class="setup-best" id="setupBest"></div>
      <div class="setup-actions">
        <button class="btn" id="sprintGo">Start sprint →</button>
        <button class="btn ghost" id="sprintBack">All games</button>
      </div>
    </div>`;
  const upd = ()=>{ $('#setupBest').innerHTML = `Your best for ${fmtDur(sel)} · <b>${sprintBest(sel)}</b>`; };
  upd();
  $$('.dur-chip').forEach(c=>c.addEventListener('click', ()=>{
    sel = +c.dataset.d;
    $('#durCustom').value='';
    $$('.dur-chip').forEach(x=>x.classList.toggle('active', x===c));
    upd();
  }));
  $('#durCustom').addEventListener('input', e=>{
    const v = Math.round(+e.target.value);
    if(v>=10 && v<=600){ sel=v; $$('.dur-chip').forEach(x=>x.classList.remove('active')); upd(); }
  });
  $('#sprintGo').addEventListener('click', ()=>{
    const cv = $('#durCustom').value.trim();
    if(cv) sel = Math.min(600, Math.max(10, Math.round(+cv) || 10));
    S.sprintDur = sel; saveS(); beginSprint(sel);
  });
  $('#sprintBack').addEventListener('click', renderGamesHub);
}

function beginSprint(dur){
  stopSprint();
  SPRINT = {timer:null, left:dur, dur, score:0, on:true, queue:shuffle(MCQ_POOL()), idx:0};
  gamesArea.innerHTML = `
    <div class="game-head">
      <div class="ginfo"><span>Score <b id="spScore">0</b></span><span>Time <b id="spTime">${dur}</b>s</span><span>Best <b>${sprintBest(dur)}</b></span></div>
      <button class="btn ghost" id="spQuit">Quit</button>
    </div>
    <div class="timer-track"><div class="timer-fill" id="spFill"></div></div>
    <div id="spQ"></div>`;
  $('#spQuit').addEventListener('click', renderGamesHub);
  SPRINT.timer = setInterval(()=>{
    SPRINT.left--;
    const f = $('#spFill'), t = $('#spTime');
    if(t) t.textContent = SPRINT.left;
    if(f){ f.style.width = (SPRINT.left/SPRINT.dur*100)+'%'; if(SPRINT.left<=10) f.classList.add('low'); }
    if(SPRINT.left<=0) endSprint();
  }, 1000);
  renderSprintQ();
}
function sprintNextIdx(st){ st.idx++; if(st.idx>=st.queue.length){ st.queue=shuffle(st.queue); st.idx=0; } }
function miniQ(q){
  let text, list, correctVal;
  if(q.type==="which"){ text=q.s; list=shuffle(OPTS6[q.tid]).map(id=>TNAME[id]); correctVal=TNAME[q.tid]; }
  else { text = q.type==="error" ? q.s : q.stem.replace('___','<span class="gap">___</span>');
         list = shuffle([q.correct,...q.wrong]); correctVal=q.correct; }
  return {text, list, correctVal};
}
function renderSprintQ(){
  if(!SPRINT.on) return;
  const q = SPRINT.queue[SPRINT.idx];
  const {text, list, correctVal} = miniQ(q);
  $('#spQ').innerHTML = `
    <div class="q-card">
      <div class="q-kicker"><span class="qtype">${TYPE_LABEL[q.type]}</span><span>· ${q.situ}</span></div>
      <div class="q-text">${text}</div>
      ${optionsHTML(list)}
    </div>`;
  $('#spQ').querySelectorAll('.opt').forEach(btn=>btn.addEventListener('click', ()=>{
    if(!SPRINT.on) return;
    const ok = btn.dataset.val === esc(correctVal);
    $('#spQ').querySelectorAll('.opt').forEach(o=>{
      o.disabled=true;
      if(o.dataset.val===esc(correctVal)){ o.classList.add('correct'); }
    });
    if(!ok) btn.classList.add('wrong');
    else { SPRINT.score++; $('#spScore').textContent=SPRINT.score; }
    recordAnswer(q.tid, 'sprint', ok);
    sprintNextIdx(SPRINT);
    setTimeout(()=>{ if(SPRINT.on) renderSprintQ(); }, ok?300:650);
  }));
}
function endSprint(){
  const score = SPRINT.score, dur = SPRINT.dur;
  stopSprint();
  const newBest = score > sprintBest(dur);
  if(newBest){ S.best.sprintBy[dur] = score; saveS(); }
  gamesArea.innerHTML = `
    <div class="game-over">
      <div class="big">${score}</div>
      ${newBest?`<div class="newbest">NEW BEST · ${fmtDur(dur)}</div>`:''}
      <p>${score>=dur/4?'Machine-gun grammar. Seriously impressive.':score>=dur/8?'Strong pace — accuracy under pressure is exactly what the exam tests.':'Speed comes with reps. One more run?'}</p>
      <div class="results-actions" style="margin-top:28px">
        <button class="btn" id="spAgain">Run it again →</button>
        <button class="btn ghost" id="spSetup">Change time</button>
        <button class="btn ghost" id="spBack">All games</button>
      </div>
    </div>`;
  $('#spAgain').addEventListener('click', ()=>beginSprint(dur));
  $('#spSetup').addEventListener('click', renderSprintSetup);
  $('#spBack').addEventListener('click', renderGamesHub);
}

/* --- Match pairs --- */
function startMatch(){
  stopSprint();
  const byTid = {};
  shuffle(BANK.filter(q=>q.type==='which')).forEach(q=>{ if(!byTid[q.tid]) byTid[q.tid]=q; });
  const pairs = shuffle(Object.values(byTid)).slice(0,6);
  const left = shuffle(pairs.map(p=>({tid:p.tid, html:p.s})));
  const right = shuffle(pairs.map(p=>({tid:p.tid, name:TNAME[p.tid]})));
  let selL=null, selR=null, done=0, mistakes=0, lock=false;

  gamesArea.innerHTML = `
    <div class="game-head">
      <div class="ginfo"><span>Pairs <b id="mDone">0</b>/6</span><span>Mistakes <b id="mMist">0</b></span></div>
      <button class="btn ghost" id="mQuit">Quit</button>
    </div>
    <div class="match-grid">
      <div class="match-col"><h4>Sentences</h4>${left.map((l,i)=>`<button class="match-item mi-l" data-tid="${l.tid}" data-i="${i}">${l.html}</button>`).join('')}</div>
      <div class="match-col"><h4>Tenses</h4>${right.map((r,i)=>`<button class="match-item mi-r" data-tid="${r.tid}" data-i="${i}">${r.name}</button>`).join('')}</div>
    </div>`;
  $('#mQuit').addEventListener('click', renderGamesHub);

  function trySelect(btn, side){
    if(lock || btn.classList.contains('done')) return;
    if(side==='l'){ $$('.mi-l').forEach(b=>b.classList.remove('sel')); btn.classList.add('sel'); selL=btn; }
    else { $$('.mi-r').forEach(b=>b.classList.remove('sel')); btn.classList.add('sel'); selR=btn; }
    if(selL && selR){
      lock=true;
      const ok = selL.dataset.tid === selR.dataset.tid;
      recordAnswer(selR.dataset.tid, 'match', ok);
      if(ok){
        selL.classList.remove('sel'); selR.classList.remove('sel');
        selL.classList.add('done'); selR.classList.add('done');
        done++; $('#mDone').textContent=done;
        selL=null; selR=null; lock=false;
        if(done===6){
          if(mistakes===0){ S.best.match=(S.best.match||0)+1; saveS(); }
          setTimeout(()=>{
            gamesArea.innerHTML = `
              <div class="game-over">
                <div class="big">6/6</div>
                ${mistakes===0?'<div class="newbest">CLEAN ROUND</div>':''}
                <p>${mistakes===0?'Flawless — not a single wrong pairing.':`Done with ${mistakes} mistake${mistakes>1?'s':''}. Clean rounds are counted — try for one.`}</p>
                <div class="results-actions" style="margin-top:28px">
                  <button class="btn" id="mAgain">New board →</button>
                  <button class="btn ghost" id="mBack">All games</button>
                </div>
              </div>`;
            $('#mAgain').addEventListener('click', startMatch);
            $('#mBack').addEventListener('click', renderGamesHub);
          }, 450);
        }
      } else {
        mistakes++; $('#mMist').textContent=mistakes;
        selL.classList.add('bad'); selR.classList.add('bad');
        const l=selL, r=selR;
        setTimeout(()=>{ l.classList.remove('bad','sel'); r.classList.remove('bad','sel'); selL=null; selR=null; lock=false; }, 500);
      }
    }
  }
  $$('.mi-l').forEach(b=>b.addEventListener('click', ()=>trySelect(b,'l')));
  $$('.mi-r').forEach(b=>b.addEventListener('click', ()=>trySelect(b,'r')));
}

/* --- Survival --- */
function livesHTML(n){
  return Array.from({length:3},(_,i)=>`<span class="${i<n?'':'off'}">${I.heart}</span>`).join('');
}
function startSurvival(){
  stopSprint();
  SURV = {on:true, lives:3, streak:0, queue:shuffle(MCQ_POOL()), idx:0};
  renderSurvQ();
}
function renderSurvQ(){
  if(!SURV.on) return;
  const q = SURV.queue[SURV.idx];
  const {text, list, correctVal} = miniQ(q);
  gamesArea.innerHTML = `
    <div class="game-head">
      <div class="ginfo"><span>Streak <b>${SURV.streak}</b></span><span>Best <b>${S.best.survival}</b></span></div>
      <div style="display:flex;gap:16px;align-items:center">
        <span class="lives">${livesHTML(SURV.lives)}</span>
        <button class="btn ghost" id="svQuit">Quit</button>
      </div>
    </div>
    <div class="q-card">
      <div class="q-kicker"><span class="qtype">${TYPE_LABEL[q.type]}</span>${q.part?`<span class="situ">${q.part.toUpperCase()}</span>`:''}<span>· ${q.situ}</span></div>
      <div class="q-text">${text}</div>
      ${optionsHTML(list)}
      <div class="feedback" id="svFb"></div>
    </div>`;
  $('#svQuit').addEventListener('click', renderGamesHub);
  gamesArea.querySelectorAll('.opt').forEach(btn=>btn.addEventListener('click', ()=>{
    if(!SURV.on) return;
    const ok = btn.dataset.val === esc(correctVal);
    gamesArea.querySelectorAll('.opt').forEach(o=>{
      o.disabled=true;
      if(o.dataset.val===esc(correctVal)) o.classList.add('correct');
    });
    recordAnswer(q.tid, 'survival', ok);
    if(ok){
      SURV.streak++;
      SURV.idx++; if(SURV.idx>=SURV.queue.length){ SURV.queue=shuffle(SURV.queue); SURV.idx=0; }
      setTimeout(()=>{ if(SURV.on) renderSurvQ(); }, 350);
    } else {
      btn.classList.add('wrong');
      SURV.lives--;
      const fb = $('#svFb');
      fb.className='feedback show no';
      fb.innerHTML = `<span class="verdict">−1 life · the answer is “${correctVal}”</span>${q.why}`;
      const hearts = gamesArea.querySelector('.lives');
      if(hearts) hearts.innerHTML = livesHTML(SURV.lives);
      if(SURV.lives<=0){ setTimeout(endSurvival, 1600); }
      else {
        SURV.idx++; if(SURV.idx>=SURV.queue.length){ SURV.queue=shuffle(SURV.queue); SURV.idx=0; }
        setTimeout(()=>{ if(SURV.on) renderSurvQ(); }, 1600);
      }
    }
  }));
}
function endSurvival(){
  SURV.on=false;
  const streak = SURV.streak;
  const newBest = streak > (S.best.survival||0);
  if(newBest){ S.best.survival = streak; saveS(); }
  gamesArea.innerHTML = `
    <div class="game-over">
      <div class="big">${streak}</div>
      ${newBest?'<div class="newbest">NEW BEST STREAK</div>':''}
      <p>${streak>=20?'That is a monstrous streak. Examiner-proof.':streak>=10?'Double digits — your instincts are getting sharp.':'Every run teaches a rule. Check the misses in Practice mode, then come back.'}</p>
      <div class="results-actions" style="margin-top:28px">
        <button class="btn" id="svAgain">One more life →</button>
        <button class="btn ghost" id="svBack">All games</button>
      </div>
    </div>`;
  $('#svAgain').addEventListener('click', startSurvival);
  $('#svBack').addEventListener('click', renderGamesHub);
}

/* =========================================================
   FLASHCARDS
========================================================= */
const cardsArea = $('#cards-area');
const FC = { session:null };
const DECK_ICONS = { triggers:I.target, verbs:I.zap, signals:I.compass };

function deckProgress(deck){
  const prog = S.decks[deck.id] || {};
  const mastered = deck.cards.filter((_,i)=>(prog[i]||0)>=2).length;
  return {mastered, total:deck.cards.length, pct:Math.round(mastered/deck.cards.length*100)};
}
function renderDecks(){
  FC.session = null;
  cardsArea.innerHTML = `<div class="hub">` + DECKS.map(d=>{
    const p = deckProgress(d);
    return hubRow(DECK_ICONS[d.id]||I.target, d.name, d.desc,
      `<div class="deck-prog"><span class="deck-meta-line">${p.mastered}/${p.total} mastered</span><span class="deck-track"><i style="width:${p.pct}%"></i></span></div>
       <button class="btn" data-deck="${d.id}">Study</button>`);
  }).join('') + `</div>`;
  cardsArea.querySelectorAll('[data-deck]').forEach(b=>b.addEventListener('click', ()=>startDeck(b.dataset.deck)));
}
function startDeck(id){
  const deck = DECKS.find(d=>d.id===id);
  const prog = S.decks[id] = S.decks[id] || {};
  const order = deck.cards.map((_,i)=>i).sort((a,b)=>(prog[a]||0)-(prog[b]||0) || Math.random()-0.5);
  FC.session = { deck, queue:order.slice(0, Math.min(15, order.length)), total:Math.min(15, order.length), seen:0, again:0, flipped:false };
  renderCard();
}
function renderCard(){
  const s = FC.session;
  if(!s) return;
  if(!s.queue.length){
    cardsArea.innerHTML = `
      <div class="fc-stage"><div class="fc-done">
        <h3>Deck session complete</h3>
        <p>${s.total} cards · ${s.again} sent back for another look. Cards you marked “again” will surface first next time.</p>
        <div class="results-actions">
          <button class="btn" id="fcAgain">Another session →</button>
          <button class="btn ghost" id="fcBack">All decks</button>
        </div>
      </div></div>`;
    $('#fcAgain').addEventListener('click', ()=>startDeck(s.deck.id));
    $('#fcBack').addEventListener('click', renderDecks);
    return;
  }
  s.flipped = false;
  const idx = s.queue[0];
  const card = s.deck.cards[idx];
  cardsArea.innerHTML = `
    <div class="fc-stage">
      <div class="fc-top"><span>${s.deck.name}</span><span>Left <b>${s.queue.length}</b></span></div>
      <div class="fc-card" id="fcCard">
        <div class="fc-inner">
          <div class="fc-face">
            <div class="fc-kick">Prompt</div>
            <div class="fc-main">${card.f}</div>
            <div class="fc-flip-hint">click or Space to flip</div>
          </div>
          <div class="fc-face back">
            <div class="fc-kick">Answer</div>
            <div class="fc-main">${card.b}</div>
            <div class="fc-sub">${card.n||''}</div>
          </div>
        </div>
      </div>
      <div class="fc-actions">
        <button class="btn again" id="fcNo">Again <span class="kbd">1</span></button>
        <button class="btn" id="fcYes">Got it <span class="kbd">2</span></button>
      </div>
      <div class="fc-quit-row"><button id="fcQuit">End session</button></div>
    </div>`;
  $('#fcCard').addEventListener('click', flipCard);
  $('#fcNo').addEventListener('click', ()=>gradeCard(false));
  $('#fcYes').addEventListener('click', ()=>gradeCard(true));
  $('#fcQuit').addEventListener('click', renderDecks);
}
function flipCard(){
  const s = FC.session; if(!s) return;
  const el = $('#fcCard'); if(!el) return;
  s.flipped = !s.flipped;
  el.classList.toggle('flipped', s.flipped);
}
function gradeCard(good){
  const s = FC.session; if(!s || !s.queue.length) return;
  const idx = s.queue.shift();
  const prog = S.decks[s.deck.id];
  if(good){ prog[idx] = Math.min((prog[idx]||0)+1, 3); }
  else { prog[idx] = 0; s.again++; s.queue.splice(Math.min(3, s.queue.length), 0, idx); }
  saveS();
  renderCard();
}

/* =========================================================
   IELTS
========================================================= */
(function renderIELTS(){
  const area = $('#ielts-area');
  let html = '';
  IELTS_GUIDE.forEach(g=>{
    html += `<div class="guide-block">
      <h3><span class="gb-tag">${g.tag}</span>${g.title}</h3>
      <p>${g.intro}</p>
      <div class="gb-rows">${g.rows.map(r=>`<div class="gb-row"><div class="gb-when">${r[0]}</div><div class="gb-what">${r[1]}</div></div>`).join('')}</div>
    </div>`;
  });
  html += `<div class="guide-block">
    <h3><span class="gb-tag">ACCURACY</span>The eight band-killers</h3>
    <p>The tense errors examiners see most — and penalise hardest. Band 8 means <b>zero</b> of these in your test.</p>
    ${BAND_KILLERS.map((k,i)=>`<div class="killer"><span class="kn">0${i+1}</span><span><b>${k.t}.</b> <span class="x">${k.x}</span> → <span class="ok">${k.ok}</span><br>${k.d}</span></div>`).join('')}
  </div>`;
  html += `<div class="guide-block">
    <h3><span class="gb-tag">DRILL</span>Exam-context questions</h3>
    <p>24 questions written as real Task 1 / Task 2 / Speaking sentences — the same grammar, dressed exactly the way the exam dresses it.</p>
    <button class="btn" id="ieltsDrillBtn">Start the IELTS drill →</button>
  </div>`;
  CLOZE.forEach(c=>{
    html += `<div class="guide-block" id="${c.id}">
      <h3><span class="gb-tag">${c.tag}</span>${c.title}</h3>
      <p>${c.brief}</p>
      <div class="cloze-text"></div>
      <div class="cloze-actions">
        <button class="btn cz-check">Check answers</button>
        <button class="btn ghost cz-reset">Reset</button>
        <span class="cloze-score"></span>
      </div>
      <div class="cloze-notes"></div>
    </div>`;
  });
  area.innerHTML = html;
  $('#ieltsDrillBtn').addEventListener('click', ()=>{ switchTab('practice'); startPractice('ielts'); });
  CLOZE.forEach(setupCloze);
})();

function setupCloze(c){
  const block = document.getElementById(c.id);
  const textEl = block.querySelector('.cloze-text');
  const notesEl = block.querySelector('.cloze-notes');
  const scoreEl = block.querySelector('.cloze-score');
  function build(){
    let html = '', gi = 0;
    c.parts.forEach(p=>{
      if(typeof p === 'string') html += p;
      else {
        const opts = shuffle(p.opts);
        html += `<select data-g="${gi}" data-a="${esc(p.opts[0])}"><option value="">— choose —</option>${opts.map(o=>`<option value="${esc(o)}">${o}</option>`).join('')}</select>`;
        gi++;
      }
    });
    textEl.innerHTML = html;
    notesEl.innerHTML = ''; notesEl.classList.remove('show');
    scoreEl.textContent = '';
  }
  build();
  block.querySelector('.cz-reset').addEventListener('click', build);
  block.querySelector('.cz-check').addEventListener('click', ()=>{
    const sels = [...textEl.querySelectorAll('select')];
    const gaps = c.parts.filter(p=>typeof p!=='string');
    let ok = 0;
    let notes = '';
    sels.forEach((sel,i)=>{
      const right = sel.dataset.a;
      const good = sel.value === right;
      sel.classList.remove('ok','bad');
      sel.classList.add(good?'ok':'bad');
      if(good) ok++;
      notes += `<div class="cloze-note"><span class="cn-n">${good?'✓':'✕'} ${i+1}.</span><b>${gaps[i].opts[0]}</b> — ${gaps[i].note}</div>`;
    });
    scoreEl.innerHTML = `Score <b>${ok}/${sels.length}</b>`;
    notesEl.innerHTML = notes;
    notesEl.classList.add('show');
  });
}

/* =========================================================
   PROGRESS
========================================================= */
function renderDash(){
  const area = $('#dash-area');
  const acc = S.answered ? Math.round(S.correct/S.answered*100) : 0;
  const mastered = DECKS.reduce((n,d)=>n+deckProgress(d).mastered, 0);
  const totalCards = DECKS.reduce((n,d)=>n+d.cards.length, 0);
  const lessonsDone = TENSES.filter(t=>S.lessons[t.id] && S.lessons[t.id].done).length;
  const sprintTop = Math.max(0, ...Object.values(S.best.sprintBy||{}));

  const bars = TENSES.map(t=>{
    const st = S.stats.tense[t.id];
    const pct = st && st.t ? Math.round(st.c/st.t*100) : null;
    const cls = pct===null ? '' : pct<60 ? 'weak' : pct>=85 ? 'strong' : '';
    return `<div class="tense-bar ${cls}">
      <div class="tb-head"><span class="tb-name">${t.name}</span><span class="tb-pct">${pct===null?'—':pct+'% · '+st.t+(st.t===1?' try':' tries')}</span></div>
      <div class="track"><i style="width:${pct||0}%"></i></div>
    </div>`;
  }).join('');

  const weak = TENSES
    .map(t=>({t, st:S.stats.tense[t.id]}))
    .filter(x=>x.st && x.st.t>=4)
    .map(x=>({...x, pct:Math.round(x.st.c/x.st.t*100)}))
    .sort((a,b)=>a.pct-b.pct)
    .slice(0,3)
    .filter(x=>x.pct<85);

  const weakHtml = weak.length ? weak.map(x=>`
    <div class="weak-item">
      <div><div class="wi-name">${x.t.name}</div><div class="wi-acc">${x.pct}% accuracy · ${x.st.t} answers</div></div>
      <button class="btn" data-review="${x.t.id}">Review</button>
    </div>`).join('')
    : `<div class="dash-empty">${S.answered<10 ? 'Answer at least ten questions and your weak spots will show up here.' : 'No weak tenses right now — accuracy is solid across the board. Raise the difficulty: 40-question mixed runs and Survival.'}</div>`;

  area.innerHTML = `
    <div class="dash-top">
      <div class="dash-stat"><div class="n">Lessons</div><div class="v">${lessonsDone}<span class="u">/${TENSES.length}</span></div></div>
      <div class="dash-stat"><div class="n">Answered</div><div class="v">${S.answered}</div></div>
      <div class="dash-stat"><div class="n">Accuracy</div><div class="v">${acc}<span class="u">%</span></div></div>
      <div class="dash-stat"><div class="n">Sprint best</div><div class="v">${sprintTop}</div></div>
      <div class="dash-stat"><div class="n">Survival best</div><div class="v">${S.best.survival||0}</div></div>
      <div class="dash-stat"><div class="n">Cards</div><div class="v">${mastered}<span class="u">/${totalCards}</span></div></div>
    </div>
    <div class="dash-cols">
      <div class="dash-card"><h3>Accuracy by tense</h3>${bars}</div>
      <div class="dash-card">
        <h3>Hit these first</h3>
        <div class="weak-list">${weakHtml}</div>
        <h3 style="margin-top:40px">By activity</h3>
        ${Object.entries(S.stats.mode).filter(([m])=>TYPE_LABEL[m]).map(([m,d])=>{
          const p=Math.round(d.c/d.t*100);
          return `<div class="tense-bar"><div class="tb-head"><span class="tb-name">${TYPE_LABEL[m]}</span><span class="tb-pct">${p}% · ${d.t}</span></div><div class="track"><i style="width:${p}%"></i></div></div>`;
        }).join('') || '<div class="dash-empty">Run some lessons or drills to see per-type stats.</div>'}
      </div>
    </div>
    <div class="dash-reset"><button class="btn ghost" id="resetBtn">Reset all progress</button></div>`;
  area.querySelectorAll('[data-review]').forEach(b=>b.addEventListener('click', ()=>openModalById(b.dataset.review)));
  $('#resetBtn').addEventListener('click', ()=>{
    if(confirm('Reset all saved progress — lessons, stats, bests and flashcard mastery?')){
      S = { stats:{tense:{},mode:{}}, answered:0, correct:0, best:{sprint:0,survival:0,sprintBy:{}}, decks:{}, lessons:{}, sprintDur:60 };
      saveS(); renderDash();
    }
  });
}

/* =========================================================
   KEYBOARD
========================================================= */
document.addEventListener('keydown', e=>{
  if(typeof LSN !== 'undefined' && LSN.on) return; /* lesson overlay handles its own keys */
  if(e.key==='Escape'){ closeModal(); return; }
  const tag = e.target.tagName;
  if(tag==='INPUT' || tag==='SELECT' || tag==='TEXTAREA') return;
  if(modalBg.classList.contains('open')) return;

  const active = $('.panel.active');
  if(!active) return;

  if(active.id==='practice'){
    if(['1','2','3','4','5','6'].includes(e.key)){
      const btn = quizArea.querySelector(`.opt[data-i="${+e.key-1}"]`);
      if(btn && !PR.answered) btn.click();
    }
    if(e.key==='Enter'){
      const nb = $('#nextBtn');
      if(nb && !nb.disabled){ next(); }
      else { const ab = $('#againBtn'); if(ab) ab.click(); }
    }
  }
  if(active.id==='games'){
    if(['1','2','3','4','5','6'].includes(e.key)){
      const btn = gamesArea.querySelector(`.opt[data-i="${+e.key-1}"]:not(:disabled)`);
      if(btn) btn.click();
    }
  }
  if(active.id==='cards' && FC.session){
    if(e.key===' ' && tag!=='BUTTON'){ e.preventDefault(); flipCard(); }
    if(e.key==='1'){ gradeCard(false); }
    if(e.key==='2'){ gradeCard(true); }
  }
});

/* =========================================================
   INIT
========================================================= */
startPractice();
