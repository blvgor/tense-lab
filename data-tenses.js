/* =========================================================
   DATA — 12 tenses, full breakdowns
========================================================= */
const TENSES = [
  /* ---------- PRESENT ---------- */
  {
    id:"ps", n:"01", time:"present", aspect:"simple", level:"core",
    name:"Present Simple",
    gloss:"Facts, habits, routines, timetables — things generally true, not tied to this moment.",
    ru:"<b>По-русски:</b> «я делаю (вообще, регулярно)». Не про «прямо сейчас», а про то, что верно всегда или повторяется: привычки, факты, расписания.",
    longDesc:"Present Simple is the tense of <b>general time</b>. It doesn't say anything about this exact moment — it says “this is how things are”: what you do regularly, what is always true, what happens on a schedule. That's why it covers both <i>I drink coffee every morning</i> (habit) and <i>The train leaves at 6</i> (timetable): neither is about right now, both are about how the world normally works.",
    form:'<span class="k">I / you / we / they</span> + base verb → I <b>work</b><br><span class="k">he / she / it</span> + verb <b>+ s</b> → she <b>works</b><br>Negative: <b>don\'t / doesn\'t</b> + base → he <b>doesn\'t work</b><br>Question: <b>Do / Does</b> + subject + base → <b>Does</b> she <b>work</b>?',
    uses:[
      ["Habits & routines","things repeated regularly. <i>I go to the gym on Mondays. She checks email at 9.</i>"],
      ["General facts & truths","things that are simply true. <i>Water boils at 100°C. Prices depend on demand.</i>"],
      ["Timetables & schedules","officially fixed events, even future ones. <i>The train leaves at 6pm. The course starts in May.</i>"],
      ["States, opinions, feelings","with state verbs. <i>I know him. She likes jazz. It seems fair.</i>"],
      ["Zero conditional & time clauses","<i>If you heat ice, it melts. I'll call you when I arrive</i> (not <span style='color:#ff5b4f'>will arrive</span>)."]
    ],
    examples:[
      ["I <span class='hl'>check</span> my email every morning.","habit — happens regularly, not necessarily now"],
      ["The gym <span class='hl'>closes</span> at 11pm.","schedule / fixed fact"],
      ["He <span class='hl'>doesn't eat</span> meat.","a general truth about him"],
      ["Most people <span class='hl'>commute</span> by public transport in my city.","generalisation — the backbone of IELTS essays"]
    ],
    signals:["every day","usually","often","always","never","rarely","on Mondays","as a rule","generally"],
    mistakes:[
      {bad:"He go to work by bus.", fix:"He goes to work by bus.", note:"Third person singular (he/she/it) takes <b>-s</b>. This tiny slip is one of the most common accuracy errors at every level — examiners notice it instantly."},
      {bad:"I will call you when I will arrive.", fix:"I will call you when I arrive.", note:"After <b>when / if / as soon as / until</b> in time clauses, use Present Simple for future meaning — never “will”."}
    ],
    ielts:{
      w:"The backbone of <b>Writing Task 2</b>: arguments, generalisations and opinions live in Present Simple (<i>Governments play a key role… This trend affects…</i>). In <b>Task 1</b> it describes the chart itself: <i>The graph shows / illustrates…</i>",
      s:"<b>Part 1</b> runs on it: questions about your routine, job, hometown. <b>Part 3</b> too — abstract discussion is mostly Present Simple.",
      tip:"Band 8 isn't about avoiding Present Simple — it's about keeping it error-free. Nail every third-person <b>-s</b> and don't drift into “will” inside if/when-clauses."
    }
  },
  {
    id:"pc", n:"02", time:"present", aspect:"continuous", level:"core",
    name:"Present Continuous",
    gloss:"In progress right now, temporary “around now”, changing trends, or a fixed near-future arrangement.",
    ru:"<b>По-русски:</b> «я делаю (прямо сейчас / временно)». Действие в процессе: в эту минуту, в этот период жизни, или уже согласованный план на ближайшее будущее.",
    longDesc:"Present Continuous zooms in on an action <b>in progress</b>. The core idea is “unfinished and temporary”: it started, it hasn't ended, and it won't last forever. From this one idea come all its uses — happening this second (<i>she's calling</i>), happening around now (<i>I'm reading a great book</i>), a situation that is changing (<i>prices are rising</i>), and even a personal arrangement in the near future (<i>we're meeting at 5</i> — the plan is already “in progress”).",
    form:'<span class="k">am / is / are</span> + verb<b>-ing</b><br>I <b>am</b> · he/she/it <b>is</b> · you/we/they <b>are</b><br>Negative: am/is/are + <b>not</b> + -ing → she <b>isn\'t working</b><br>Question: <b>Is</b> she <b>working</b>?',
    uses:[
      ["Happening right now","at this exact moment. <i>Be quiet — the baby is sleeping.</i>"],
      ["Around now / temporary","true these days, but not permanent. <i>I'm staying with a friend this month.</i>"],
      ["Changing situations & trends","<i>The climate is getting warmer. More people are working remotely.</i> Gold for IELTS Part 3."],
      ["Fixed personal arrangements","already agreed with someone, near future. <i>We're flying to Berlin on Friday.</i>"],
      ["Annoying habits (with always)","emotional colouring. <i>He's always losing his keys!</i>"]
    ],
    examples:[
      ["Sorry, I can't talk — I <span class='hl'>am driving</span>.","in progress at this second"],
      ["She <span class='hl'>is taking</span> an IELTS course this autumn.","temporary, around now"],
      ["Cities <span class='hl'>are becoming</span> more crowded every year.","a developing trend"],
      ["I <span class='hl'>am meeting</span> the landlord tomorrow at 10.","a fixed arrangement, not just an intention"]
    ],
    signals:["now","right now","at the moment","currently","today","this week","these days","Look!","Listen!"],
    mistakes:[
      {bad:"I am knowing the answer.", fix:"I know the answer.", note:"State verbs — <b>know, like, want, believe, understand, seem, own</b> — describe states, not processes, so they normally refuse -ing. This is a classic exam trap."},
      {bad:"I working on a new project.", fix:"I am working on a new project.", note:"The auxiliary <b>am/is/are</b> is not optional — dropping it is a frequent slip in fast speech and writing."}
    ],
    ielts:{
      w:"In <b>Task 1</b> it describes ongoing change when the data reaches the present: <i>The share of renewables is currently rising.</i> In <b>Task 2</b> — current developments: <i>Universities are increasingly moving online.</i>",
      s:"<b>Part 1</b>: what you're doing these days (courses, books, projects). <b>Part 3</b>: trends — <i>people are relying more and more on…</i>",
      tip:"A natural “currently + Present Continuous” sentence in your Task 2 introduction instantly signals range: <i>Remote work is currently reshaping how cities function.</i>"
    }
  },
  {
    id:"pp", n:"03", time:"present", aspect:"perfect", level:"core",
    name:"Present Perfect",
    gloss:"A past action with a link to now: experience, a visible result, news, or “from then until now”.",
    ru:"<b>По-русски:</b> «я (уже) сделал — и это важно сейчас». Мост между прошлым и настоящим: опыт за жизнь, результат «на руках», новость, или «с тех пор и до сих пор».",
    longDesc:"Present Perfect is a <b>bridge tense</b>: the action is in the past, but the sentence is really about <b>now</b>. <i>I've lost my keys</i> isn't about the moment of losing — it's about the fact that right now I can't get in. That's why it refuses finished-time words like <i>yesterday</i>: the moment you pin the action to a finished time, the bridge to “now” breaks and English switches to Past Simple. If you master one distinction for IELTS, make it this one.",
    form:'<span class="k">have / has</span> + past participle (V3)<br>I/you/we/they <b>have</b> · he/she/it <b>has</b><br>done · seen · been · gone · made · written…<br>Negative: <b>haven\'t / hasn\'t</b> + V3 &nbsp;·&nbsp; Question: <b>Have</b> you <b>seen</b>…?',
    uses:[
      ["Life experience — no time given","<i>I have visited twelve countries. Have you ever tried surfing?</i> The “when” doesn't matter, the experience does."],
      ["Past action, present result","<i>I've lost my keys</i> (I can't get in now). <i>She's broken her leg</i> (it's in a cast now)."],
      ["Unfinished period: since / for","started in the past, still true. <i>I've lived here for five years. It's been cold since Monday.</i>"],
      ["News & recent events","<i>Scientists have discovered a new species. She has just left.</i>"],
      ["With just / already / yet","<i>I've already sent it. Have you finished yet?</i>"]
    ],
    examples:[
      ["I <span class='hl'>have never been</span> to Japan.","experience up to now — no specific time"],
      ["She <span class='hl'>has just finished</span> her shift.","recent event, relevant this minute"],
      ["We <span class='hl'>have known</span> each other since 2018.","started in the past, still true — since + starting point"],
      ["Online shopping <span class='hl'>has transformed</span> the retail sector.","a change whose result we see today — pure IELTS gold"]
    ],
    signals:["ever","never","just","already","yet","since","for","so far","recently","over the past decade"],
    mistakes:[
      {bad:"I have seen him yesterday.", fix:"I saw him yesterday.", note:"<b>Yesterday</b> is a finished time — it cuts the bridge to now, so Past Simple is required. Any finished-time word (last week, in 2020, ago) forces Past Simple."},
      {bad:"I am living here for five years.", fix:"I have lived here for five years.", note:"Duration up to now is Present Perfect territory. Russian «я живу здесь 5 лет» tempts you into Present tense — resist it."},
      {bad:"She has went home.", fix:"She has gone home.", note:"After have/has you need the <b>third form</b> (participle), not the second: go → went → <b>gone</b>."}
    ],
    ielts:{
      w:"<b>Task 1</b>: changes reaching the present — <i>Sales have doubled since 2015.</i> <b>Task 2</b>: developments — <i>Technology has changed how we communicate.</i> An examiner favourite.",
      s:"<b>Part 1</b>: experience questions (<i>Have you ever…?</i>). <b>Part 3</b>: <i>Attitudes have shifted over the past decade…</i>",
      tip:"The single biggest tense-related band-killer is Present Perfect + finished time (<i>have visited last year</i>). Band 8 = zero of these. Self-check: if you can ask “when exactly?” and answer it, use Past Simple."
    }
  },
  {
    id:"ppc", n:"04", time:"present", aspect:"perfect continuous", level:"adv",
    name:"Present Perfect Continuous",
    gloss:"An activity running from the past up to now — emphasis on duration and effort, or on fresh side-effects.",
    ru:"<b>По-русски:</b> «я делаю (уже N часов/лет) и всё ещё / только что закончил». Акцент на длительности процесса — «сижу над этим три часа», «бегал — поэтому вспотел».",
    longDesc:"Where Present Perfect looks at the <b>result</b> (<i>I've written three emails</i> — they're done), Present Perfect Continuous looks at the <b>activity itself</b> and how long it's been going on (<i>I've been writing emails all morning</i> — that's where my morning went). It also explains visible evidence: <i>Why are you red? — I've been running.</i> The action may have just stopped, but its traces are all over the present.",
    form:'<span class="k">have / has been</span> + verb<b>-ing</b><br>I <b>have been waiting</b> · she <b>has been working</b><br>Negative: haven\'t/hasn\'t been + -ing<br>Question: <b>How long have</b> you <b>been learning</b> English?',
    uses:[
      ["Duration up to now","emphasises how long. <i>I've been preparing for IELTS for three months.</i>"],
      ["Recently stopped, visible traces","<i>Your eyes are red — have you been crying? The ground is wet; it's been raining.</i>"],
      ["Temporary ongoing situations","<i>She's been staying with us while her flat is renovated.</i>"],
      ["Repeated recent activity","<i>He's been calling me all day.</i>"]
    ],
    examples:[
      ["I <span class='hl'>have been learning</span> English since school.","the process, still ongoing — how long is the point"],
      ["She<span class='hl'>'s been working</span> here for ten years.","duration up to now (also fine: has worked)"],
      ["Sorry about the mess — I<span class='hl'>'ve been painting</span> the flat.","activity explains the present evidence"],
      ["Governments <span class='hl'>have been investing</span> heavily in renewables.","ongoing sustained effort — strong IELTS sentence"]
    ],
    signals:["for","since","all day","all morning","lately","recently","how long…?"],
    mistakes:[
      {bad:"I have been knowing him for years.", fix:"I have known him for years.", note:"State verbs (know, like, own, believe) don't take continuous forms even here — duration with states is plain Present Perfect."},
      {bad:"I have been writing three essays today.", fix:"I have written three essays today.", note:"A counted result (three essays — done) wants Present Perfect. Continuous is for the unfinished process, not the completed count."}
    ],
    ielts:{
      w:"<b>Task 2</b>: sustained ongoing efforts — <i>Scientists have been warning about this for decades.</i> Sparingly in <b>Task 1</b>: <i>has been rising steadily since 2010</i>.",
      s:"<b>Part 1</b>: <i>How long have you been living / studying / doing…?</i> — answer in kind. <b>Part 2</b>: <i>I've been playing the guitar since I was ten.</i>",
      tip:"One accurate <i>have been -ing</i> per Speaking part is an easy range point: “How long…?” questions are an open invitation. Just never pair it with a state verb."
    }
  },

  /* ---------- PAST ---------- */
  {
    id:"pas", n:"05", time:"past", aspect:"simple", level:"core",
    name:"Past Simple",
    gloss:"Finished actions at a known past time — the default tense for stories and completed facts.",
    ru:"<b>По-русски:</b> «я сделал (тогда-то)». Законченное действие в известный момент прошлого: вчера, в 2019-м, когда мне было 10. Главное время любой истории.",
    longDesc:"Past Simple is the workhorse of the past: an action happened, finished, and the time is either stated (<i>in 2019, yesterday</i>) or obvious from context. It carries the <b>main storyline</b> of any narrative — each Past Simple verb moves events one step forward: <i>I woke up, made coffee, and left.</i> If Present Perfect is a bridge to now, Past Simple is a closed chapter: the connection to the present is cut.",
    form:'Regular: verb <b>+ ed</b> → worked, played, studied<br>Irregular: 2nd form → go→<b>went</b>, see→<b>saw</b>, buy→<b>bought</b><br>Negative: <b>didn\'t</b> + base → I <b>didn\'t go</b><br>Question: <b>Did</b> you <b>go</b>?',
    uses:[
      ["Finished action, stated time","<i>We signed the contract in March. He called an hour ago.</i>"],
      ["A chain of events (storyline)","<i>She opened the door, saw the mess, and screamed.</i> The skeleton of Speaking Part 2 stories."],
      ["Finished periods & past states","<i>I lived in Kyiv for three years</i> (not any more). <i>As a kid, I hated broccoli.</i>"],
      ["Past facts in essays & reports","<i>In 1990, car ownership stood at 30%.</i> The default for past-dated data in Task 1."]
    ],
    examples:[
      ["I <span class='hl'>bought</span> new headphones yesterday.","finished action, stated finished time"],
      ["We <span class='hl'>didn't go</span> out last weekend.","negative — base verb after didn't"],
      ["<span class='hl'>Did</span> you <span class='hl'>call</span> her back?","question — did + base verb"],
      ["The figure <span class='hl'>rose</span> sharply between 2000 and 2010.","past-dated data — Task 1 core"]
    ],
    signals:["yesterday","last week","ago","in 2020","when I was…","at first","then","afterwards"],
    mistakes:[
      {bad:"I didn't went home.", fix:"I didn't go home.", note:"<b>Did</b> already carries the past — the main verb goes back to base form. “Didn't went” doubles the past marking."},
      {bad:"He teached me everything.", fix:"He taught me everything.", note:"Irregular verbs keep their own forms; regularising them (teached, buyed, catched) is a highly visible accuracy error. Drill them in the Flashcards deck."}
    ],
    ielts:{
      w:"<b>Task 1</b>: the default whenever the data is dated in the past — <i>rose, fell, peaked, remained stable</i>. <b>Task 2</b>: historical support — <i>Twenty years ago, few households owned a computer.</i>",
      s:"<b>Part 2</b> stories run on it: it moves the plot. Also Part 1 questions about your childhood or past habits.",
      tip:"For Band 8, pair it deliberately: Past Simple for plot + Past Continuous for background + Past Perfect for pre-history. That trio, clean, is exactly what “wide range” means in a story."
    }
  },
  {
    id:"pac", n:"06", time:"past", aspect:"continuous", level:"core",
    name:"Past Continuous",
    gloss:"An action in progress at a past moment — the scenery and background of a story.",
    ru:"<b>По-русски:</b> «я делал (в тот момент)». Процесс, который шёл в конкретный момент прошлого: «я готовил, когда ты позвонил». Фон, декорации истории.",
    longDesc:"Past Continuous freezes a past moment and shows what was <b>in progress</b> around it. Alone it answers “what was happening at 8pm?”; with Past Simple it builds the classic frame of every good story: a long background action (<i>I was walking home…</i>) interrupted by a short event (<i>…when it started to rain</i>). It doesn't move the plot — it paints the scene the plot happens in.",
    form:'<span class="k">was / were</span> + verb<b>-ing</b><br>I/he/she/it <b>was</b> · you/we/they <b>were</b><br>Negative: <b>wasn\'t / weren\'t</b> + -ing<br>Often paired with <b>when</b> + Past Simple',
    uses:[
      ["In progress at a past moment","<i>At 8pm I was cooking dinner.</i>"],
      ["Background interrupted by an event","<i>I was walking home when it started to rain.</i> The long action is Continuous, the interruption is Simple."],
      ["Two parallel past actions","<i>She was reading while he was cooking.</i>"],
      ["Scene-setting & atmosphere","<i>The sun was shining, people were chatting outside…</i> Openings of Part 2 stories."]
    ],
    examples:[
      ["I <span class='hl'>was working</span> when you texted me.","longer background action, interrupted"],
      ["What <span class='hl'>were</span> you <span class='hl'>doing</span> at 10pm?","in progress at that exact past moment"],
      ["While I <span class='hl'>was revising</span>, my flatmate <span class='hl'>was gaming</span>.","two parallel processes"],
      ["It <span class='hl'>was getting</span> dark, so we turned back.","developing past situation"]
    ],
    signals:["while","when","as","at 8pm","all evening","at that moment","meanwhile"],
    mistakes:[
      {bad:"When she called, I cooked dinner.", fix:"When she called, I was cooking dinner.", note:"“I cooked” makes the cooking happen <i>after</i> the call, as the next event. If it was already in progress, it must be <b>was cooking</b> — the meaning literally changes."},
      {bad:"I was liking the film.", fix:"I liked the film.", note:"State verbs stay out of continuous forms in the past too."}
    ],
    ielts:{
      w:"Rare in Task 1; in <b>Task 2</b> occasionally for vivid past framing. Its real home is Speaking.",
      s:"<b>Part 2</b> scene-setting is where it shines: <i>I was travelling with friends, everyone was laughing, the sun was setting — and then everything went wrong.</i>",
      tip:"Open a Part 2 story with two Past Continuous clauses before the first plot verb. It sounds native, buys thinking time, and shows range in the first ten seconds."
    }
  },
  {
    id:"pap", n:"07", time:"past", aspect:"perfect", level:"adv",
    name:"Past Perfect",
    gloss:"“Past before the past” — an action already completed before another past moment.",
    ru:"<b>По-русски:</b> «я (уже) сделал ДО того». Предпрошедшее: действие завершилось раньше другого прошлого события. «Поезд ушёл до того, как мы приехали».",
    longDesc:"Past Perfect puts events in order when you're already in the past: it marks the thing that happened <b>first</b>. <i>When we arrived, the film had started</i> — the film began before our arrival (we missed the opening). Compare: <i>When we arrived, the film started</i> — it began the moment we walked in. One auxiliary changes the whole sequence. English relies on this instead of «уже… до того» — and using it correctly is a clear marker of a Band 7.5+ speaker.",
    form:'<span class="k">had</span> + past participle (V3) — same for all persons<br>I/she/they <b>had finished</b> · <b>hadn\'t seen</b> · <b>Had</b> you <b>met</b>…?<br>Often with: by the time · before · after · already · when',
    uses:[
      ["Earlier of two past events","<i>The train had left before we reached the station.</i>"],
      ["Past experience up to a past moment","<i>By 2015, she had lived in four countries.</i>"],
      ["Explaining a past state by pre-history","<i>He was exhausted because he hadn't slept.</i>"],
      ["Reported speech backshift","<i>She said she had already sent the report.</i>"]
    ],
    examples:[
      ["When we arrived, the film <span class='hl'>had</span> already <span class='hl'>started</span>.","the film began first — we missed the opening"],
      ["I <span class='hl'>had never flown</span> before that trip.","experience up to a past moment"],
      ["She was upset because she <span class='hl'>had failed</span> the mock test.","pre-history explains the past state"],
      ["By 2010, the figure <span class='hl'>had doubled</span>.","completed change before a past reference point — Task 1"]
    ],
    signals:["by the time","before","after","already (in past)","when (for the earlier event)","by 2010"],
    mistakes:[
      {bad:"After he left, I had washed the dishes.", fix:"After he left, I washed the dishes.", note:"Past Perfect marks the <b>earlier</b> event. Here the washing came second, so it's plain Past Simple. Don't sprinkle “had” for decoration — it changes the order of events."},
      {bad:"When I arrived, the meeting started.", fix:"When I arrived, the meeting had started.", note:"…if the meeting was already underway. Without <b>had</b>, the meeting starts at the moment of your arrival."}
    ],
    ielts:{
      w:"<b>Task 1</b>: <i>By 2010, the number had tripled</i> — a “by + date” sentence with Past Perfect is an elegant range move. <b>Task 2</b>: ordering historical developments.",
      s:"<b>Part 2</b>: one clean flashback line — <i>I'd never seen anything like it before</i> — instantly upgrades a story.",
      tip:"You rarely need more than one or two Past Perfects per story. One accurate <i>by the time / I'd never… before</i> earns the range credit; five in a row sounds unnatural."
    }
  },
  {
    id:"papc", n:"08", time:"past", aspect:"perfect continuous", level:"adv",
    name:"Past Perfect Continuous",
    gloss:"An activity that had been running for some time before a past moment — duration before the past.",
    ru:"<b>По-русски:</b> «я делал (уже N часов) к тому моменту». Длительность до прошлого момента: «мы прождали час, когда автобус наконец пришёл».",
    longDesc:"Take Present Perfect Continuous (<i>I've been waiting for an hour</i>) and shift the whole scene into the past: <i>I had been waiting for an hour when the bus finally came.</i> That's Past Perfect Continuous — it measures <b>how long an activity had been running</b> before a past event, or explains a past state through prior activity (<i>his eyes were red because he had been crying</i>). Rare, but when the context fits, nothing else sounds right.",
    form:'<span class="k">had been</span> + verb<b>-ing</b> — same for all persons<br>We <b>had been waiting</b> · she <b>hadn\'t been sleeping</b><br>Question: <b>How long had</b> they <b>been working</b>…?',
    uses:[
      ["Duration before a past moment","<i>We had been waiting for an hour when the bus arrived.</i>"],
      ["Cause of a past state","<i>He was tired because he had been working all night.</i>"],
      ["Activity interrupted in the past","<i>She had been living there for a decade before she moved.</i>"]
    ],
    examples:[
      ["We <span class='hl'>had been waiting</span> for an hour when the bus finally came.","duration measured up to a past event"],
      ["His eyes were red — he <span class='hl'>had been crying</span>.","prior activity explains the past evidence"],
      ["I <span class='hl'>had been studying</span> English for years before I first used it abroad.","long process before a past milestone"],
      ["The company <span class='hl'>had been losing</span> money for years before it closed.","sustained trend leading to a past outcome"]
    ],
    signals:["for + period … when","how long … before","by the time (+ duration)","all night (before a past event)"],
    mistakes:[
      {bad:"I had been knowing about it for a while.", fix:"I had known about it for a while.", note:"State verbs skip the continuous everywhere — with duration they take plain Past Perfect."},
      {bad:"We were waiting for an hour when the bus came.", fix:"We had been waiting for an hour when the bus came.", note:"“Were waiting” just paints the scene; only <b>had been waiting</b> carries the meaning “a whole hour had accumulated by then”."}
    ],
    ielts:{
      w:"Occasional in <b>Task 2</b> narrative support: <i>Regulators had been ignoring the problem for years before the crisis hit.</i>",
      s:"<b>Part 2</b>: one line like <i>I'd been planning that trip for months, so when it collapsed…</i> is a genuine Band 8 flex — rare, accurate, natural.",
      tip:"This is the rarest tense in real usage. One correct instance across the whole exam is plenty — and it will not go unnoticed."
    }
  },

  /* ---------- FUTURE ---------- */
  {
    id:"fs", n:"09", time:"future", aspect:"simple", level:"core",
    name:"Future Simple (will / going to)",
    gloss:"Predictions, spontaneous decisions, promises — and “going to” for plans and visible evidence.",
    ru:"<b>По-русски:</b> «я сделаю / собираюсь сделать». <b>will</b> — решение в момент речи, обещание, прогноз-мнение; <b>going to</b> — намерение (уже решил) и прогноз по очевидным признакам.",
    longDesc:"English splits the simple future in two. <b>Will</b> is the future of the <i>moment of speaking</i>: snap decisions (<i>I'll get it</i>), promises (<i>I won't tell anyone</i>), and predictions from opinion (<i>I think it'll rain</i>). <b>Going to</b> is the future that <i>already exists in your head or in the evidence</i>: intentions decided earlier (<i>we're going to move</i>) and predictions you can literally see coming (<i>look at those clouds — it's going to rain</i>). Choosing between them correctly is what makes your future sound natural rather than textbook.",
    form:'<span class="k">will</span> + base verb → I <b>will call</b> / I<b>\'ll call</b> · negative: <b>won\'t</b><br><span class="k">am / is / are going to</span> + base verb → we<b>\'re going to launch</b><br>Question: <b>Will</b> you…? / <b>Are</b> you <b>going to</b>…?',
    uses:[
      ["will — decision made right now","<i>It's cold — I'll close the window.</i> The decision is born as you speak."],
      ["will — prediction, opinion","<i>I think remote work will keep growing. You'll love this film.</i> Often with think / probably / expect."],
      ["will — promises, offers, refusals","<i>I'll help you. I won't be late. The car won't start.</i>"],
      ["going to — prior intention","<i>We're going to redesign the site.</i> Decided before this conversation."],
      ["going to — prediction from evidence","<i>She's going to have a baby. Careful — you're going to drop it!</i>"]
    ],
    examples:[
      ["I think our team <span class='hl'>will win</span>.","prediction based on opinion"],
      ["Someone's at the door — I<span class='hl'>'ll get</span> it.","spontaneous decision, made this second"],
      ["We<span class='hl'>'re going to</span> launch the app in autumn.","plan decided in advance"],
      ["Look at the sky — it<span class='hl'>'s going to</span> rain.","prediction from visible evidence"]
    ],
    signals:["tomorrow","next week","soon","in 2030","probably","I think…","I expect…","definitely"],
    mistakes:[
      {bad:"I will to call you.", fix:"I will call you.", note:"<b>Will</b> is a modal — it takes the bare infinitive, no “to”, and never changes form (no “wills”)."},
      {bad:"I'll visit my parents this weekend. (already arranged)", fix:"I'm going to visit / I'm visiting my parents this weekend.", note:"For plans made earlier, “will” sounds like you just decided. Use <b>going to</b> (intention) or Present Continuous (firm arrangement)."}
    ],
    ielts:{
      w:"<b>Task 1</b> with projections: <i>The figure will reach 60% by 2030 / is expected to reach…</i> <b>Task 2</b>: consequences — <i>If cities invest in transit, congestion will fall.</i>",
      s:"<b>Part 3</b> future questions: hedge like a Band 8 — <i>will probably / is likely to / might well</i> instead of a bare “will”.",
      tip:"In academic writing, dress the future up: <i>is expected to / is projected to / is likely to</i>. A bare “will” everywhere reads as spoken English; the hedged forms are exactly the “range” examiners want."
    }
  },
  {
    id:"fc", n:"10", time:"future", aspect:"continuous", level:"adv",
    name:"Future Continuous",
    gloss:"An action that will be in progress at a specific future moment — “this time tomorrow I'll be flying”.",
    ru:"<b>По-русски:</b> «я буду делать (в тот момент)». Процесс в конкретный момент будущего: «завтра в это время я буду лететь в Лондон». Также вежливое «Will you be using…?»",
    longDesc:"Future Continuous points at a future moment and says what will be <b>in progress</b> there: <i>This time tomorrow, I'll be sitting on a plane.</i> It also covers events that will happen “in the natural course of things” (<i>I'll be passing the shop anyway</i>) and powers one of the most polite questions in English: <i>Will you be using the car tonight?</i> — asking about someone's plans without pressuring them.",
    form:'<span class="k">will be</span> + verb<b>-ing</b> — same for all persons<br>I <b>will be working</b> · they <b>won\'t be sleeping</b><br>Question: <b>Will</b> you <b>be joining</b> us?',
    uses:[
      ["In progress at a future moment","<i>At 9am tomorrow, I'll be taking my exam.</i>"],
      ["Events in the natural course of things","<i>I'll be seeing her at the meeting anyway, so I'll pass it on.</i>"],
      ["Polite questions about plans","<i>Will you be checking out today?</i> — softer than “Will you check out?”"],
      ["Future background for another event","<i>Don't call at 8 — we'll be having dinner.</i>"]
    ],
    examples:[
      ["This time next week, I<span class='hl'>'ll be lying</span> on a beach.","in progress at that future moment"],
      ["Don't call at 8 — we<span class='hl'>'ll be having</span> dinner.","future action as background"],
      ["<span class='hl'>Will</span> you <span class='hl'>be using</span> the projector, or can I take it?","polite enquiry about plans"],
      ["By mid-century, most people <span class='hl'>will be living</span> in cities.","ongoing future state — Part 3 material"]
    ],
    signals:["this time tomorrow","at 9am tomorrow","still","during (a future period)","when you arrive (…I'll be waiting)"],
    mistakes:[
      {bad:"This time tomorrow I will fly to London.", fix:"This time tomorrow I will be flying to London.", note:"“Will fly” states the bare fact; “this time tomorrow” points inside the action, so the process form is needed — <b>will be flying</b>."},
      {bad:"I will be knowing the results tomorrow.", fix:"I will know the results tomorrow.", note:"State verbs stay simple in the future too."}
    ],
    ielts:{
      w:"Occasional in <b>Task 2</b> conclusions about the future: <i>Within a decade, most students will be studying at least partly online.</i>",
      s:"<b>Part 3</b> predictions: <i>In twenty years, people will still be commuting, but they'll be doing it very differently.</i> Sounds effortlessly advanced.",
      tip:"A “this time next year, I'll be…” sentence is an easy, natural way to show future range in Speaking — much fresher than another plain “will”."
    }
  },
  {
    id:"fp", n:"11", time:"future", aspect:"perfect", level:"adv",
    name:"Future Perfect",
    gloss:"Completed before a future deadline — “by 2030, the figure will have doubled”.",
    ru:"<b>По-русски:</b> «я (уже) сделаю К тому моменту». Действие завершится до будущего дедлайна: «к 2030 году цифра удвоится», «к пятнице я закончу отчёт».",
    longDesc:"Future Perfect looks <b>back from a future point</b>: pick a deadline (<i>by Friday, by 2030, by the time you arrive</i>) and state what will already be finished when that moment comes. <i>By 2030, the number of EV owners will have tripled</i> — we're standing in 2030 and looking at a completed change. It's the signature tense of forecasts and deadlines, and in IELTS Task 1 charts with projections it's practically a cheat code.",
    form:'<span class="k">will have</span> + past participle (V3) — same for all persons<br>I <b>will have finished</b> · it <b>won\'t have changed</b><br>Almost always with <b>by</b>: by Friday · by 2030 · by the time…',
    uses:[
      ["Completed before a future deadline","<i>I'll have finished the report by Friday.</i>"],
      ["Future milestones & totals","<i>By June, we'll have lived here for ten years.</i>"],
      ["Projections in data","<i>By 2035, the share will have risen to 40%.</i>"],
      ["Confident assumption about the present","<i>You'll have heard the news, I suppose.</i> (rarer, conversational)"]
    ],
    examples:[
      ["By 2030, the figure <span class='hl'>will have doubled</span>.","completed change, viewed from a future point — Task 1 gold"],
      ["I<span class='hl'>'ll have finished</span> the draft by the time you wake up.","done before a future reference event"],
      ["By next month, she<span class='hl'>'ll have saved</span> enough for the trip.","a total reached by a deadline"],
      ["They <span class='hl'>won't have completed</span> the bridge by winter.","negative: not done by the deadline"]
    ],
    signals:["by 2030","by Friday","by the time…","by then","in ten years' time"],
    mistakes:[
      {bad:"By 2030, the population will double.", fix:"By 2030, the population will have doubled.", note:"With a <b>by</b>-deadline, English wants the completed-by-then form. “Will double” says it happens at/after that point; <b>will have doubled</b> says it's already done when 2030 arrives."},
      {bad:"I will have finish by Monday.", fix:"I will have finished by Monday.", note:"After “will have” comes the participle (V3) — the -ed/third form isn't optional."}
    ],
    ielts:{
      w:"<b>Task 1</b> with projected data is its natural habitat: <i>By 2040, renewables will have overtaken coal.</i> One such sentence per projection chart = instant range credit.",
      s:"<b>Part 3</b>: <i>By the time today's students retire, the job market will have changed beyond recognition.</i>",
      tip:"Memorise the frame “By + future date, X will have + V3”. It's a reusable Band 8 sentence skeleton for any chart with a forecast — accurate, formal, and rare enough to stand out."
    }
  },
  {
    id:"fpc", n:"12", time:"future", aspect:"perfect continuous", level:"adv",
    name:"Future Perfect Continuous",
    gloss:"How long an activity will have been running by a future point — duration measured at a future deadline.",
    ru:"<b>По-русски:</b> «к тому моменту я буду делать это уже N лет». Стаж, измеренный в будущем: «к маю я буду работать здесь уже десять лет».",
    longDesc:"The rarest of the twelve: it measures <b>accumulated duration at a future checkpoint</b>. <i>By May, I'll have been working here for ten years</i> — when May arrives, my “stage counter” hits ten. You'll use it perhaps once a month in real life, but it completes the system beautifully: same perfect-continuous idea as <i>I've been working here for ten years</i>, just projected forward.",
    form:'<span class="k">will have been</span> + verb<b>-ing</b> — same for all persons<br>She <b>will have been teaching</b> for 20 years<br>Almost always with: by + time · for + period',
    uses:[
      ["Duration reached at a future point","<i>By May, I'll have been working here for ten years.</i>"],
      ["Emphasising sustained effort into the future","<i>By graduation, she'll have been studying English for half her life.</i>"]
    ],
    examples:[
      ["By May, I <span class='hl'>will have been working</span> here for ten years.","the ten-year mark arrives in May"],
      ["By the final exam, we<span class='hl'>'ll have been preparing</span> for eight months.","accumulated preparation at a future checkpoint"],
      ["Next year they<span class='hl'>'ll have been living</span> together for a decade.","duration milestone in the future"],
      ["By 2030, the plant <span class='hl'>will have been operating</span> for half a century.","formal register — works in writing too"]
    ],
    signals:["by … for …","by the time … for + period","by next year"],
    mistakes:[
      {bad:"By May I will have been knowing her for a year.", fix:"By May I will have known her for a year.", note:"State verbs take Future Perfect (will have known), never the continuous — the rule follows you all the way to tense #12."},
      {bad:"I will have been finished by then.", fix:"I will have finished by then.", note:"Don't mix the frames: completed result = <b>will have finished</b>; duration of activity = <b>will have been working</b>. “Will have been finished” accidentally turns it passive."}
    ],
    ielts:{
      w:"Very rare in writing — use only if the duration itself is the point: <i>By 2030, the scheme will have been running for 20 years.</i>",
      s:"<b>Part 3</b> flex, used once: <i>By the time I retire, I'll have been paying taxes for forty years.</i> Deploy with a smile.",
      tip:"Know it, recognise it, keep one prepared example. Forcing it where Future Perfect suffices sounds strained — precision beats exotica at Band 8."
    }
  }
];

/* Timeline positions (core six) */
const TL = [
  {ref:"ps",  pos:52, sub:"around now"},
  {ref:"pc",  pos:50, sub:"right now"},
  {ref:"pp",  pos:38, sub:"past → now"},
  {ref:"pas", pos:22, sub:"a point back"},
  {ref:"pac", pos:14, sub:"in progress, past"},
  {ref:"fs",  pos:80, sub:"ahead"}
];

/* Matrix: aspect columns */
const MATRIX_COLS = [
  {aspect:"simple",   label:"Simple",   idea:"fact / whole action"},
  {aspect:"continuous", label:"Continuous", idea:"in progress"},
  {aspect:"perfect",  label:"Perfect",  idea:"completed before a point"},
  {aspect:"perfect continuous", label:"Perfect Continuous", idea:"duration up to a point"}
];
const MATRIX_ROWS = [
  {time:"present", label:"Present"},
  {time:"past",    label:"Past"},
  {time:"future",  label:"Future"}
];
const MATRIX_SAMPLES = {
  ps:"I work", pc:"I am working", pp:"I have worked", ppc:"I have been working",
  pas:"I worked", pac:"I was working", pap:"I had worked", papc:"I had been working",
  fs:"I will work", fc:"I will be working", fp:"I will have worked", fpc:"I will have been working"
};

/* Compare table */
const COMPARE = [
  ["Present Simple","Habit / fact / schedule","I <b>work</b> from home."],
  ["Present Continuous","Now / temporary / trend / arrangement","I <b>am working</b> right now."],
  ["Present Perfect","Past linked to now: result, experience, since/for","I <b>have worked</b> here for years."],
  ["Present Perfect Continuous","Duration of activity up to now","I <b>have been working</b> all morning."],
  ["Past Simple","Finished action at a known past time","I <b>worked</b> there in 2020."],
  ["Past Continuous","In progress at a past moment (background)","I <b>was working</b> when you called."],
  ["Past Perfect","Completed before another past event","I <b>had worked</b> there before I moved."],
  ["Past Perfect Continuous","Duration before a past moment","I <b>had been working</b> for hours when it happened."],
  ["Future Simple","Prediction / decision now / plan (going to)","I <b>will work</b> tomorrow."],
  ["Future Continuous","In progress at a future moment","I <b>will be working</b> at 9am tomorrow."],
  ["Future Perfect","Completed by a future deadline","I <b>will have worked</b> here 10 years by May."],
  ["Future Perfect Continuous","Duration reached at a future point","By May I <b>will have been working</b> here 10 years."]
];

/* Decision shortcuts */
const TIPS = [
  {t:"Present Simple vs Continuous", d:"Simple = always / generally true; Continuous = now or temporary. <i>I play guitar</i> (I'm a guitarist) vs <i>I'm playing guitar</i> (at this moment). Test: can you add “in general”? → Simple. “At the moment”? → Continuous."},
  {t:"Past Simple vs Present Perfect", d:"Ask: “when exactly?” If you can answer (<i>yesterday, in 2020</i>) → Past Simple. If the time is open or irrelevant and the point is the result/experience now → Present Perfect. <i>I saw it yesterday</i> vs <i>I've seen it (so no spoilers, please)</i>."},
  {t:"Present Perfect vs Perfect Continuous", d:"Result vs process. <i>I've written three emails</i> (they're done — count the result) vs <i>I've been writing emails all morning</i> (that's where the time went). Visible side-effects (sweat, mess, red eyes) → Continuous."},
  {t:"Past Simple vs Past Perfect", d:"Two past events? The earlier one takes <b>had</b>. <i>When we arrived, the film had started</i> (we missed the start) vs <i>the film started</i> (right as we walked in). No second event — no Past Perfect."},
  {t:"will vs going to", d:"Deciding as you speak → <b>will</b> (<i>I'll get it!</i>). Decided earlier → <b>going to</b> (<i>We're going to move</i>). Visible evidence → <b>going to</b> (<i>it's going to rain</i>). Opinion-prediction → either, usually <b>will</b> with “I think”."},
  {t:"Past Continuous vs Past Simple", d:"The long background action = Continuous, the short interrupting event = Simple. <i>I was sleeping when the alarm rang.</i> Flip them and the story stops making sense."},
  {t:"since vs for", d:"<b>since</b> + starting point (<i>since 2019, since Monday</i>); <b>for</b> + length (<i>for five years, for a while</i>). Both scream Perfect: <i>I've lived here since 2019 / for five years.</i>"},
  {t:"Future Perfect vs Future Simple", d:"See a “by + deadline”? Completed-by-then meaning wants <b>will have + V3</b>: <i>By 2030 the figure will have doubled.</i> Plain <i>will double</i> just predicts the event, not its completion by the date."},
  {t:"State verbs — the universal filter", d:"<b>know, like, love, want, believe, understand, seem, own, belong, need</b> avoid ALL continuous forms: not <i>am knowing</i>, not <i>have been knowing</i>, not <i>will be knowing</i>. When in doubt, keep states simple."},
  {t:"Time clauses eat “will”", d:"After <b>when, if, as soon as, until, before, after</b> referring to the future — Present Simple: <i>I'll call you when I <b>arrive</b>. If it <b>rains</b>, we'll cancel.</i> A double-will here is a top-3 exam error."}
];
