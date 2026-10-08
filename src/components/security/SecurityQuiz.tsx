import { useState } from 'react';
import { TOPICS } from './topics';
import { LabFrame, SecStyles, tr, type L, type Lang } from './ui';

/** Scenario quiz: read what happened, name the attack. */

const l = (zh: string, en: string, de: string): L => ({ zh, en, de });

const QUESTIONS: { scene: L; options: string[]; answer: string; why: L }[] = [
  {
    scene: l(
      '有人在商品評論寫了 <img src=x onerror=…>，之後每個打開那頁的使用者，帳號都被盜了。',
      'Someone posts a product review containing <img src=x onerror=…>. Every user who opens that page gets their account stolen.',
      'Jemand schreibt eine Bewertung mit <img src=x onerror=…>. Jeder, der die Seite öffnet, verliert sein Konto.'
    ),
    options: ['csrf', 'xss', 'clickjacking', 'cors'],
    answer: 'xss',
    why: l('評論被當成 HTML 執行，onerror 裡的程式碼在每個讀者的瀏覽器跑起來，是儲存型 XSS。', 'The review is rendered as HTML and the onerror code runs in every reader\'s browser: stored XSS.', 'Die Bewertung wird als HTML gerendert und onerror läuft bei jedem Leser: Stored XSS.'),
  },
  {
    scene: l(
      '你登入網銀後，在另一個分頁點開一篇「免費抽獎」文章，什麼都沒按，帳戶卻少了一筆錢。',
      'While logged in to your bank, you open a "free giveaway" article in another tab. You click nothing, yet money leaves your account.',
      'Eingeloggt bei der Bank öffnest du in einem anderen Tab einen „Gratis-Gewinnspiel"-Artikel. Ohne Klick fehlt Geld.'
    ),
    options: ['redirect', 'csrf', 'xss', 'mixed'],
    answer: 'csrf',
    why: l('文章裡藏了自動送出的表單，瀏覽器自動帶上銀行 Cookie，銀行以為是你本人。', 'The article hides an auto-submitting form; the browser attaches your bank cookie and the bank thinks it was you.', 'Ein verstecktes Formular sendet sich selbst ab, der Browser hängt das Bank-Cookie an.'),
  },
  {
    scene: l(
      '「刪除使用者」按鈕只有管理員看得到，但一般使用者用 fetch 就把別人的帳號刪掉了。',
      'Only admins can see the "Delete user" button, yet a regular user deletes other accounts with fetch.',
      'Nur Admins sehen „Nutzer löschen", trotzdem löscht ein normaler Nutzer per fetch fremde Konten.'
    ),
    options: ['authz', 'sourcemap', 'csrf', 'secrets'],
    answer: 'authz',
    why: l('權限只做在前端，後端沒有再檢查角色和擁有者。', 'Permissions only live in the frontend; the backend never re-checks role or ownership.', 'Rechte gibt es nur im Frontend; das Backend prüft Rolle und Eigentümer nicht.'),
  },
  {
    scene: l(
      'API 的回應會把請求的 Origin 原封不動放進 Access-Control-Allow-Origin，並允許 credentials。',
      'The API copies the request Origin straight into Access-Control-Allow-Origin and allows credentials.',
      'Die API übernimmt den Origin direkt in Access-Control-Allow-Origin und erlaubt Credentials.'
    ),
    options: ['csp', 'cors', 'redirect', 'clickjacking'],
    answer: 'cors',
    why: l('照抄 Origin 等於對所有網站開門，任何網站都能用使用者身分讀你的 API。', 'Echoing the Origin opens the door to every site; any site can read your API as the user.', 'Das Spiegeln des Origin öffnet jeder Seite die Tür zur API im Namen des Nutzers.'),
  },
  {
    scene: l(
      '官方寄來的信連結是 real-bank.com/login?next=//evil.io，點了之後卻停在一個長得一樣的假登入頁。',
      'An official-looking email links to real-bank.com/login?next=//evil.io, and you end up on an identical fake login page.',
      'Eine offizielle Mail verlinkt auf real-bank.com/login?next=//evil.io, und du landest auf einer identischen Fälschung.'
    ),
    options: ['mixed', 'xss', 'redirect', 'sri'],
    answer: 'redirect',
    why: l('next 參數沒驗證，//evil.io 以 / 開頭卻是外部網址，使用者被導走。', 'The next parameter is unchecked; //evil.io starts with / but is an external URL.', 'next wird nicht geprüft; //evil.io beginnt mit /, ist aber extern.'),
  },
  {
    scene: l(
      '一次 npm update 之後，網站開始把使用者輸入的資料送到一個陌生網域。',
      'After an npm update, the site starts sending user input to an unknown domain.',
      'Nach einem npm update schickt die Seite Nutzereingaben an eine unbekannte Domain.'
    ),
    options: ['supply', 'console', 'cors', 'token'],
    answer: 'supply',
    why: l('某個依賴發布了惡意新版本，^ 版號規則讓專案自動升級進來。', 'A dependency shipped a malicious version and the ^ range pulled it in automatically.', 'Eine Abhängigkeit hat eine bösartige Version veröffentlicht, der ^-Bereich holte sie automatisch.'),
  },
  {
    scene: l(
      '正式網站上，任何人打開 DevTools 都能看到完整、有註解的 React 原始碼。',
      'On the production site, anyone opening DevTools sees the full, commented React source.',
      'Auf der Produktivseite sieht jeder in den DevTools den kompletten, kommentierten React-Code.'
    ),
    options: ['secrets', 'sourcemap', 'console', 'csp'],
    answer: 'sourcemap',
    why: l('.map 檔跟著部署上線，DevTools 自動把壓縮過的程式碼還原。', 'The .map files were deployed, so DevTools restores the minified code automatically.', 'Die .map-Dateien wurden mit deployt, die DevTools stellen den Code wieder her.'),
  },
];

const T: Record<string, L> = {
  title: { zh: '小測驗：這是哪一種攻擊？', en: 'Quiz: which attack is this?', de: 'Quiz: Welcher Angriff ist das?' },
  hint: { zh: '讀完情境，選出最符合的攻擊。', en: 'Read the scenario and pick the matching attack.', de: 'Lies das Szenario und wähle den passenden Angriff.' },
  q: { zh: '第', en: 'Question', de: 'Frage' },
  right: { zh: '✓ 答對了！', en: '✓ Correct!', de: '✓ Richtig!' },
  wrong: { zh: '✗ 不是這個。正確答案：', en: '✗ Not quite. The answer is:', de: '✗ Nicht ganz. Richtig ist:' },
  next: { zh: '下一題 →', en: 'Next →', de: 'Weiter →' },
  finish: { zh: '看結果', en: 'See results', de: 'Ergebnis' },
  score: { zh: '你的分數', en: 'Your score', de: 'Dein Ergebnis' },
  perfect: { zh: '全對！你已經能從症狀反推攻擊手法了。', en: 'Perfect! You can now tell the attack from its symptoms.', de: 'Perfekt! Du erkennst Angriffe an ihren Symptomen.' },
  good: { zh: '不錯！答錯的題目可以回去看那一段的攻擊流程。', en: 'Nice! Revisit the attack flow for the ones you missed.', de: 'Gut! Schau dir den Ablauf der verpassten Fragen nochmal an.' },
  retry: { zh: '↻ 再玩一次', en: '↻ Try again', de: '↻ Nochmal' },
  anim: { zh: '看動畫', en: 'Watch animation', de: 'Animation ansehen' },
};

export default function SecurityQuiz({ lang = 'en' }: { lang?: Lang }) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = QUESTIONS[i];
  const name = (id: string) => `${TOPICS[id].num} ${tr(TOPICS[id].title, lang)}`;

  const choose = (id: string) => {
    if (pick) return;
    setPick(id);
    if (id === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i === QUESTIONS.length - 1) return setDone(true);
    setI(i + 1);
    setPick(null);
  };
  const restart = () => {
    setI(0);
    setPick(null);
    setScore(0);
    setDone(false);
  };

  return (
    <LabFrame lang={lang} title={tr(T.title, lang)} hint={tr(T.hint, lang)} testId="quiz">
      <SecStyles />
      {done ? (
        <div className="sec-pop text-center" data-testid="quiz-result">
          <div className="sec-px mb-2 text-[18px] text-[#222034] [text-shadow:3px_3px_0_#fff]">
            {score === QUESTIONS.length ? '★ STAGE CLEAR! ★' : 'NICE TRY!'}
          </div>
          <div className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#5A4E7C]">{tr(T.score, lang)}</div>
          <div className="sec-px my-2 text-4xl">
            {score}
            <span className="text-xl text-[#5A4E7C]"> / {QUESTIONS.length}</span>
          </div>
          <div className="mb-2 flex justify-center gap-1.5" aria-hidden>
            {QUESTIONS.map((_, j) => (
              <span key={j} className={'inline-block h-5 w-5 border-2 border-[#222034] ' + (j < score ? 'sec-coin' : 'bg-[#C9CCEB]')} />
            ))}
          </div>
          <div className="m-0 text-sm">{score === QUESTIONS.length ? tr(T.perfect, lang) : tr(T.good, lang)}</div>
          <button type="button" onClick={restart} className="sec-btn mt-3 border-[3px] border-[#222034] bg-[#FFC93C] px-4 py-2 text-xs font-extrabold">
            {tr(T.retry, lang)}
          </button>
        </div>
      ) : (
        <div key={i} className="sec-pop">
          <div className="mb-2 flex items-center gap-2">
            <span className="sec-px border-2 border-[#222034] bg-[#2C2F6B] px-2 py-0.5 text-[11px] text-[#FFC93C]">
              {lang === 'zh' ? `${tr(T.q, lang)} ${i + 1} / ${QUESTIONS.length} 題` : `${tr(T.q, lang)} ${i + 1} / ${QUESTIONS.length}`}
            </span>
            <div className="flex gap-1">
              {QUESTIONS.map((_, j) => (
                <span key={j} className={'h-3 w-3 border-2 border-[#222034] ' + (j < i ? 'bg-[#2C2F6B]' : j === i ? 'sec-coin' : 'bg-white')} />
              ))}
            </div>
          </div>
          <div className="m-0 mb-3 text-[15px] font-semibold leading-relaxed" data-testid="quiz-scene">
            {tr(q.scene, lang)}
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {q.options.map((id) => {
              const isAns = id === q.answer;
              const chosen = id === pick;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => choose(id)}
                  disabled={!!pick}
                  data-testid={`quiz-opt-${id}`}
                  className={
                    'sec-btn border-[3px] px-3 py-2 text-left text-sm font-bold ' +
                    (!pick
                      ? 'border-[#222034] bg-[#FFF4D6] hover:bg-white'
                      : isAns
                        ? 'border-[#222034] bg-[#FFC93C]'
                        : chosen
                          ? 'border-[#E43B44] bg-[#FFE0E3] text-[#8A1020]'
                          : 'border-[#9FA3E3] bg-[#FFF4D6] opacity-50')
                  }
                >
                  {name(id)}
                </button>
              );
            })}
          </div>
          {pick && (
            <div
              className="sec-pop relative mt-4 border-4 border-white bg-[#2C2F6B] px-3 py-2 text-sm text-white shadow-[0_0_0_3px_#222034,6px_6px_0_3px_#222034]"
              role="status"
              data-testid="quiz-feedback"
            >
              {pick === q.answer && (
                <span aria-hidden className="sec-px sec-rise absolute -top-6 right-4 text-[14px] text-[#FFC93C] [text-shadow:2px_2px_0_#222034]">
                  +100
                </span>
              )}
              <div className="font-extrabold">
                {pick === q.answer ? tr(T.right, lang) : `${tr(T.wrong, lang)} ${name(q.answer)}`}
              </div>
              <div className="mt-1 text-[#DCDDFF]">{tr(q.why, lang)}</div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <a href={`/security/${TOPICS[q.answer].file}`} className="text-xs font-bold text-[#FFC93C] underline underline-offset-4">
                  ▶ {tr(T.anim, lang)}
                </a>
                <button type="button" onClick={next} data-testid="quiz-next" className="sec-btn border-[3px] border-[#222034] bg-[#FFC93C] px-3 py-1 text-xs font-extrabold text-[#222034]">
                  {i === QUESTIONS.length - 1 ? tr(T.finish, lang) : tr(T.next, lang)}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </LabFrame>
  );
}
