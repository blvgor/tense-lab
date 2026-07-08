/* =========================================================
   DATA — IELTS playbook + cloze drills
========================================================= */

const IELTS_GUIDE = [
  {
    tag:"THE CRITERIA", title:"What Band 8 actually requires",
    intro:"In the official descriptors, Band 8 for Grammatical Range & Accuracy means: <b>“uses a wide range of structures; the majority of sentences are error-free; makes only very occasional errors or inappropriacies.”</b> Decode that into a strategy:",
    rows:[
      ["Range ≠ exotic tenses", "It means using the <i>natural</i> tense for each idea and varying your structures where the content allows. Twelve clean Present Simples score worse than a natural mix of Simple, Perfect and one Future Perfect."],
      ["Accuracy is king", "One correct Past Perfect earns more than three shaky ones. If you're less than ~90% sure a rare tense fits, use the simpler correct one."],
      ["Error-free sentences", "Examiners literally count the proportion of sentences with no errors. The tense slips in this trainer's Error Hunt are exactly the ones that break that count."],
      ["Show, don't force", "Plant range where it's natural: a “since” phrase invites Present Perfect, a “by 2030” invites Future Perfect, a story invites the narrative trio. Never bolt a tense on for show."]
    ]
  },
  {
    tag:"WRITING TASK 1", title:"The Task 1 tense playbook",
    intro:"Task 1 (Academic) is a tense minefield with a simple map: <b>look at the dates on the chart</b> — they dictate every verb.",
    rows:[
      ["Describing the chart itself", "Always Present Simple — the graph shows its data permanently.<span class='m'>The graph <span class='hl'>shows</span> / The chart <span class='hl'>illustrates</span> / The table <span class='hl'>compares</span>…</span>"],
      ["Data dated in the past (1990–2010)", "Past Simple — the period is closed.<span class='m'>Car ownership <span class='hl'>rose</span> steadily and <span class='hl'>peaked</span> at 80% in 2005.</span>"],
      ["Change reaching the present (since 2015)", "Present Perfect — the bridge tense.<span class='m'>Sales <span class='hl'>have doubled</span> since 2015 and <span class='hl'>have been rising</span> steadily.</span>"],
      ["A milestone before a past date", "Past Perfect with “by”.<span class='m'>By 2010, the number <span class='hl'>had tripled</span>.</span>"],
      ["Projections (to 2030 and beyond)", "will / is expected to — and Future Perfect for “by + date”.<span class='m'>By 2035, the share <span class='hl'>will have reached</span> 40% / <span class='hl'>is projected to reach</span> 40%.</span>"],
      ["Processes & maps", "Present Simple, usually passive.<span class='m'>The beans <span class='hl'>are roasted</span>, then the mixture <span class='hl'>is cooled</span>.</span>"]
    ]
  },
  {
    tag:"WRITING TASK 2", title:"The Task 2 tense playbook",
    intro:"Essays run on a <b>Present Simple backbone</b> — arguments and generalisations — with deliberate excursions that earn the range mark:",
    rows:[
      ["Arguments & general claims", "Present Simple.<span class='m'>Public transport <span class='hl'>reduces</span> congestion and <span class='hl'>benefits</span> the environment.</span>"],
      ["Recent developments (intro paragraphs)", "Present Perfect — “in recent years / over the past decade”.<span class='m'>Online education <span class='hl'>has become</span> increasingly popular.</span>"],
      ["Current trends", "Present Continuous.<span class='m'>Cities <span class='hl'>are growing</span> faster than infrastructure can adapt.</span>"],
      ["Consequences & solutions", "First conditional — and mind the clause split.<span class='m'>If governments <span class='hl'>invest</span> in transit, congestion <span class='hl'>will fall</span>.</span>"],
      ["Historical contrast", "Past Simple.<span class='m'>Twenty years ago, few households <span class='hl'>owned</span> a computer.</span>"],
      ["Predictions in conclusions", "Hedged future — the Band 8 register.<span class='m'>AI <span class='hl'>is likely to transform</span> / <span class='hl'>will probably reshape</span> entire industries.</span>"]
    ]
  },
  {
    tag:"SPEAKING", title:"The Speaking tense playbook",
    intro:"Each part of the Speaking test quietly targets different tenses. Know the mapping and you can prepare range in advance:",
    rows:[
      ["Part 1 — you & your routine", "Present Simple + Continuous, Present Perfect for “how long”.<span class='m'>I <span class='hl'>work</span> in IT · I<span class='hl'>'m currently taking</span> a design course · I<span class='hl'>'ve been living</span> here since 2019.</span>"],
      ["Part 2 — the story (cue card)", "The narrative trio: Past Simple for plot, Past Continuous for scenes, Past Perfect for flashbacks.<span class='m'>I <span class='hl'>was travelling</span> with friends when the car <span class='hl'>broke</span> down — I<span class='hl'>'d never seen</span> my friend panic before.</span>"],
      ["Part 2 — ongoing topics", "Present Perfect Continuous for hobbies and long-running interests.<span class='m'>I<span class='hl'>'ve been playing</span> the guitar since I was ten.</span>"],
      ["Part 3 — abstract discussion", "Present Simple backbone + Perfect for changes + hedged future.<span class='m'>Attitudes <span class='hl'>have shifted</span> — and I suspect people <span class='hl'>will be working</span> very differently in twenty years.</span>"]
    ]
  }
];

const BAND_KILLERS = [
  {t:"Present Perfect + finished time", x:"I have visited Rome last year.", ok:"I visited Rome last year.", d:"The single most common tense error in IELTS writing. A dated past time (last year, in 2020, ago) forces Past Simple — no exceptions."},
  {t:"“will” inside time/if clauses", x:"When I will arrive, I'll call you.", ok:"When I arrive, I'll call you.", d:"After when, if, as soon as, until, before, after — Present Simple carries the future. Mark the future once, in the main clause."},
  {t:"State verbs in continuous", x:"I am knowing / I have been knowing him.", ok:"I know him / I have known him.", d:"know, like, want, believe, understand, seem, own, belong — no -ing forms, in any tense."},
  {t:"Missing Past Perfect in sequences", x:"When we arrived, the film started.", ok:"When we arrived, the film had started.", d:"If the first event must be complete before the second, drop the “had” and examiners read a different story — you arrived exactly at the opening credits."},
  {t:"Regularised irregular verbs", x:"He teached / buyed / catched.", ok:"He taught / bought / caught.", d:"Highly visible errors that examiners can't miss. Drill the Irregular verbs deck until V2/V3 are automatic."},
  {t:"Present tense for duration up to now", x:"I am living here for five years.", ok:"I have lived / have been living here for five years.", d:"Russian uses present tense here («живу здесь 5 лет») — English demands the Perfect bridge. A signature L1-interference error."},
  {t:"Double past with did", x:"She didn't went / Did you saw?", ok:"She didn't go / Did you see?", d:"“Did” already carries the past — the main verb returns to base form."},
  {t:"been vs gone", x:"She has gone to Rome twice.", ok:"She has been to Rome twice.", d:"has been = visited and returned; has gone = left and is still there. Mixing them creates accidental comedy."}
];

/* Cloze drills — segments alternate text and gaps.
   gap: {opts:[correct first], note} — options shuffled at render. */
const CLOZE = [
  {
    id:"cl1", tag:"WRITING TASK 1", title:"Line graph with a projection",
    brief:"A classic Task 1 report: past data, a change reaching the present, and a projection. Choose the verb for every gap, then check.",
    parts:[
      "The graph ", {opts:["shows","is showing","showed"], note:"Describing what the chart displays — a permanent fact → Present Simple."},
      " the percentage of households with high-speed internet access between 2000 and 2020, with projections to 2035. Access ",
      {opts:["stood","has stood","stands"], note:"“In 2000” — a dated past point → Past Simple: stood at 8%."},
      " at just 8% in 2000. Over the following decade it ",
      {opts:["rose","has risen","rises"], note:"Still inside the dated past period → Past Simple: rose."},
      " steadily, and by 2010 it ",
      {opts:["had reached","has reached","reaches"], note:"“By 2010” = a past checkpoint with the change complete before it → Past Perfect."},
      " 45%. Since then, growth ",
      {opts:["has slowed","slowed","slows"], note:"“Since then” — the period reaches the present → Present Perfect."},
      " slightly. At present, the figure ",
      {opts:["is approaching","approaches","approached"], note:"“At present” + change in progress → Present Continuous."},
      " 80%, and analysts expect that by 2035 it ",
      {opts:["will have climbed","has climbed","climbs"], note:"“By 2035” — future deadline, completed by then → Future Perfect."},
      " to almost 95%. If current trends ",
      {opts:["continue","will continue","continued"], note:"If-clause about a real future → Present Simple. No “will” inside the condition."},
      ", virtually every household ",
      {opts:["will enjoy","enjoys","enjoyed"], note:"The main clause of the conditional carries the future → will enjoy."},
      " high-speed access by mid-century."
    ]
  },
  {
    id:"cl2", tag:"SPEAKING PART 2", title:"A journey that didn't go as planned",
    brief:"A model Part 2 story built on the narrative trio: Past Simple plot, Past Continuous scenery, Past Perfect (Continuous) flashbacks.",
    parts:[
      "Last summer, my friends and I ", {opts:["decided","have decided","were deciding"], note:"“Last summer” — dated, finished → Past Simple. The first plot verb."},
      " to drive to the mountains. We ",
      {opts:["had been planning","were planning","have been planning"], note:"The planning had accumulated for months before the (past) trip → Past Perfect Continuous."},
      " the trip for months, so everyone was excited. We ",
      {opts:["left","had left","were leaving"], note:"Next event in the storyline → Past Simple."},
      " at dawn; the sun ",
      {opts:["was rising","rose","had risen"], note:"Scene-setting: the sunrise is background in progress → Past Continuous."},
      " and the roads were empty. After two hours, the car suddenly ",
      {opts:["broke","was breaking","had broken"], note:"“Suddenly” + a short plot event → Past Simple: broke down."},
      " down in the middle of nowhere. I ",
      {opts:["had never seen","never saw","have never seen"], note:"Experience missing up to that past moment → Past Perfect: had never seen."},
      " my friend panic before, but that morning he did. While we ",
      {opts:["were waiting","waited","had waited"], note:"“While” + ongoing background → Past Continuous."},
      " for the tow truck, it started to rain. By the time help ",
      {opts:["arrived","had arrived","was arriving"], note:"The later of the two events — plain Past Simple. (The waiting is the earlier one.)"},
      ", we ",
      {opts:["had been standing","were standing","have been standing"], note:"A full hour accumulated before that past moment → Past Perfect Continuous."},
      " in the rain for an hour. Looking back, I ",
      {opts:["have told","told","had told"], note:"From “that day” up to now — experience reaching the present → Present Perfect."},
      " that story a hundred times — it always gets a laugh."
    ]
  },
  {
    id:"cl3", tag:"WRITING TASK 2", title:"Essay paragraph: remote work",
    brief:"A Task 2 body paragraph mixing the Present Perfect intro, past contrast, current trends and a hedged conditional future.",
    parts:[
      "Remote work ", {opts:["has become","became","becomes"], note:"“The past decade” reaching now → Present Perfect: has become."},
      " one of the defining trends of the past decade. Before the pandemic, most companies ",
      {opts:["required","have required","require"], note:"“Before the pandemic” — a closed past period → Past Simple."},
      " employees to be in the office five days a week, and few managers ",
      {opts:["had considered","considered","have considered"], note:"Even earlier than that past situation → Past Perfect: had (ever) considered."},
      " flexible arrangements seriously. Today, attitudes ",
      {opts:["are changing","change","changed"], note:"“Today” + ongoing shift → Present Continuous: are changing rapidly."},
      " rapidly: employees increasingly ",
      {opts:["expect","are expecting","expected"], note:"A general present claim (and “expect” is state-like) → Present Simple."},
      " autonomy, and many firms now advertise hybrid roles. If this shift ",
      {opts:["continues","will continue","continued"], note:"Real-future conditional → Present Simple in the if-clause."},
      ", city centres ",
      {opts:["will look","look","looked"], note:"Main clause of the conditional → will look."},
      " very different, and by 2040 the traditional office ",
      {opts:["will have lost","loses","has lost"], note:"“By 2040” — future deadline, change complete by then → Future Perfect."},
      " much of its role."
    ]
  }
];
