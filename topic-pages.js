const rawTopic = Number(new URLSearchParams(location.search).get('topic'));
const topicIndex = Number.isInteger(rawTopic) && rawTopic >= 0 && rawTopic < TOPICS.length ? rawTopic : 0;
const topic = localizedTopic(topicIndex);

function fillList(id, items) {
  const list = document.getElementById(id);
  items.forEach(item => { const li = document.createElement('li'); li.textContent = item; list.append(li); });
}

function renderLearn() {
  document.title = `${topic.title} · ${t('knowMore')} · Bharat 2047`;
  document.getElementById('topicTitle').textContent = topic.title;
  document.getElementById('topicNumber').textContent = `${t('point')} ${String(topicIndex + 1).padStart(2, '0')} / 24`;
  document.getElementById('topicDescription').textContent = topic.description;
  document.getElementById('topicProblem').textContent = topic.problem;
  document.getElementById('topicMyth').textContent = topic.myth;
  document.getElementById('topicReality').textContent = topic.reality;
  fillList('topicActions', topic.actions);
  fillList('topicRisks', topic.risks);
  document.getElementById('learnTestLink').href = `test.html?topic=${topicIndex}`;
}

function makeQuestions(t) {
  const questions = [];
  const mcq = (text, correct, wrong) => {
    const items = [correct, ...wrong];
    const shift = (topicIndex + questions.length) % items.length;
    const options = items.slice(shift).concat(items.slice(0, shift));
    questions.push({ type: 'choice', text, options, correct: options.indexOf(correct) });
  };
  for (let i = 0; i < 3; i++) {
    mcq(UI[appLanguage()].qAction(t), t.actions[i], t.risks);
  }
  for (let i = 0; i < 3; i++) {
    mcq(UI[appLanguage()].qSuggestion(t.risks[i]), t.actions[i], [t.risks[i], t.risks[(i + 1) % 3], t.risks[(i + 2) % 3]]);
  }
  for (let i = 0; i < 3; i++) {
    mcq(UI[appLanguage()].qAvoid, t.risks[i], t.actions);
  }
  mcq(UI[appLanguage()].qAccurate, t.reality, [t.myth, UI[appLanguage()].wrong1, UI[appLanguage()].wrong2]);
  mcq(UI[appLanguage()].qChallenge, t.problem, [UI[appLanguage()].wrong3, UI[appLanguage()].wrong4, UI[appLanguage()].wrong5]);
  mcq(UI[appLanguage()].qThisWeek, t.actions[0], t.risks);

  const written = [
    ...t.actions.map(action => UI[appLanguage()].wAction(action)),
    ...t.risks.map(risk => UI[appLanguage()].wRisk(risk)),
    UI[appLanguage()].wMyth(t.myth),
    UI[appLanguage()].wProblem(t.problem),
    UI[appLanguage()].wWhy(t.short),
    UI[appLanguage()].wFamily(t.short),
    UI[appLanguage()].wCommunity,
    UI[appLanguage()].wPromise(t.short)
  ];
  written.forEach(text => questions.push({ type: 'written', text }));
  return questions;
}

function renderTest() {
  const questions = makeQuestions(topic);
  const key = `bharat2047-test-${topicIndex}`;
  let answers;
  try { const saved = JSON.parse(localStorage.getItem(key) || 'null'); answers = Array.isArray(saved) ? saved.slice(0, 24) : []; } catch { answers = []; }
  const positionKey = `bharat2047-test-position-${topicIndex}`;
  let position = 0;
  try { const savedPosition = Number(sessionStorage.getItem(positionKey)); if (Number.isInteger(savedPosition) && savedPosition >= 0 && savedPosition <= 24) position = savedPosition; } catch {}
  const title = document.getElementById('topicTitle');
  const card = document.getElementById('questionCard');
  const area = document.getElementById('answerArea');
  const previous = document.getElementById('previousButton');
  const next = document.getElementById('nextButton');
  const nav = document.querySelector('.test-nav');
  title.textContent = topic.title;
  document.title = `${topic.title} · ${t('startTest')} · Bharat 2047`;

  const save = () => { try { localStorage.setItem(key, JSON.stringify(answers)); } catch {} };
  const savePosition = () => { try { sessionStorage.setItem(positionKey, String(position)); } catch {} };
  function showResult() {
    savePosition();
    const correct = questions.slice(0, 12).reduce((sum, q, i) => sum + (answers[i] === q.correct ? 1 : 0), 0);
    const reflections = questions.slice(12).reduce((sum, _, i) => sum + (String(answers[i + 12] || '').trim() ? 1 : 0), 0);
    document.getElementById('questionCount').textContent = t('testComplete');
    document.getElementById('questionType').textContent = t('yourReflection');
    document.getElementById('progressFill').style.width = '100%';
    document.getElementById('questionNumber').hidden = true;
    document.getElementById('questionText').hidden = true;
    area.replaceChildren();
    const wrap = document.createElement('div'); wrap.className = 'result-card';
    const number = document.createElement('div'); number.className = 'result-big'; number.textContent = `${correct}/12`;
    const heading = document.createElement('h2'); heading.textContent = t('resultHeading');
    const summary = document.createElement('p'); summary.textContent = t('resultSummary',correct,reflections);
    const actions = document.createElement('div'); actions.className = 'result-actions';
    const learn = document.createElement('a'); learn.className = 'solid-button'; learn.href = `learn.html?topic=${topicIndex}`; learn.textContent = t('learnMoreTopic');
    const review = document.createElement('button'); review.className = 'secondary-button'; review.type = 'button'; review.textContent = t('reviewAnswers'); review.addEventListener('click', () => { position = 0; showQuestion(); });
    actions.append(learn, review); wrap.append(number, heading, summary, actions); area.append(wrap); nav.hidden = true;
  }
  function showQuestion() {
    if (position === 24) return showResult();
    savePosition();
    nav.hidden = false;
    document.getElementById('questionNumber').hidden = false;
    document.getElementById('questionText').hidden = false;
    const q = questions[position];
    document.getElementById('questionCount').textContent = `${t('question')} ${String(position + 1).padStart(2, '0')} ${t('of')} 24`;
    document.getElementById('questionType').textContent = t(q.type === 'choice' ? 'multipleChoice' : 'yourAnswer');
    document.getElementById('progressFill').style.width = `${((position + 1) / 24) * 100}%`;
    document.getElementById('questionNumber').textContent = String(position + 1).padStart(2, '0');
    document.getElementById('questionText').textContent = q.text;
    area.replaceChildren();
    if (q.type === 'choice') {
      const options = document.createElement('div'); options.className = 'options';
      q.options.forEach((choice, i) => {
        const button = document.createElement('button'); button.type = 'button'; button.className = `option${answers[position] === i ? ' selected' : ''}`; button.setAttribute('aria-pressed', String(answers[position] === i));
        const letter = document.createElement('span'); letter.className = 'option-letter'; letter.textContent = 'ABCD'[i];
        const value = document.createElement('span'); value.textContent = choice; button.append(letter, value);
        button.addEventListener('click', () => { answers[position] = i; save(); [...options.children].forEach((node, n) => { node.classList.toggle('selected', n === i); node.setAttribute('aria-pressed', String(n === i)); }); });
        options.append(button);
      }); area.append(options);
    } else {
      const label = document.createElement('label'); label.className = 'answer-label'; label.htmlFor = 'writtenAnswer'; label.textContent = t('writeResponse');
      const input = document.createElement('textarea'); input.id = 'writtenAnswer'; input.className = 'written-answer'; input.placeholder = t('answerPlaceholder'); input.value = typeof answers[position] === 'string' ? answers[position] : '';
      input.addEventListener('input', () => { answers[position] = input.value; save(); }); area.append(label, input);
    }
    previous.disabled = position === 0;
    next.textContent = t(position === 23 ? 'results' : 'next');
  }
  previous.addEventListener('click', () => { if (position > 0) { position--; showQuestion(); window.scrollTo(0, 0); } });
  next.addEventListener('click', () => { if (position < 24) { position++; showQuestion(); window.scrollTo(0, 0); } });
  showQuestion();
}

if (document.body.dataset.page === 'learn') renderLearn();
if (document.body.dataset.page === 'test') renderTest();
