/* ============================================================
AUNG BUSINESS ACADEMY V16
BUSINESS GROWTH OS
ERROR-SAFE FULL REPLACEMENT
============================================================ */

(function () {
“use strict”;

/* ==========================================================
1. CONFIG
========================================================== */

const VERSION = “V16.1”;
const STORAGE = {
progress: “aba_v16_progress”,
goals: “aba_v16_goals”,
tasks: “aba_v16_tasks”,
profile: “aba_v16_profile”,
settings: “aba_v16_settings”,
businessPlan: “aba_v16_business_plan”
};

const DEFAULT_PROFILE = {
name: “Aung Zar Ni Win”,
role: “Business Manager”
};

const DEFAULT_SETTINGS = {
growthMode: true,
notifications: true
};

/* ==========================================================
2. SAFE STORAGE
========================================================== */

function readJSON(key, fallback) {
try {
const value = localStorage.getItem(key);
if (!value) return fallback;
const parsed = JSON.parse(value);
return parsed ?? fallback;
} catch (error) {
console.warn(”[ABA] Storage read error:”, key, error);
return fallback;
}
}

function writeJSON(key, value) {
try {
localStorage.setItem(key, JSON.stringify(value));
return true;
} catch (error) {
console.warn(”[ABA] Storage write error:”, key, error);
return false;
}
}

/* ==========================================================
3. APPLICATION STATE
========================================================== */

const state = {
currentPage: “dashboard”,
currentLesson: null,

profile: readJSON(STORAGE.profile, DEFAULT_PROFILE),
settings: readJSON(STORAGE.settings, DEFAULT_SETTINGS),
progress: readJSON(STORAGE.progress, {}),
goals: readJSON(STORAGE.goals, []),
tasks: readJSON(STORAGE.tasks, []),
businessPlan: readJSON(STORAGE.businessPlan, {}),
lessons: [],
lessonSources: {
  fundamentals: false,
  leadership: false,
  strategy: false,
  marketing: false,
  sales: false,
  finance: false,
  people: false,
  operations: false
}

};

/* ==========================================================
4. FALLBACK LESSONS
========================================================== */

const fallbackLessons = [
{
id: “foundation-01”,
category: “Business Foundation”,
course: “Business Management Foundation”,
lessonNumber: 1,
title: “Manager တစ်ယောက်ရဲ့ အဓိကတာဝန်က ဘာလဲ?”,
subtitle: “Result ကို လူ၊ အချိန်၊ ငွေကြေးနဲ့ Resource တွေကနေ ဖန်တီးခြင်း”,
duration: “15 min”,
isPremium: false,
sections: [
{
type: “situation”,
title: “၁။ Real Business Situation”,
content: “Manager ဆိုတာ Title တစ်ခုမဟုတ်ဘဲ Business Result ကို လူတွေနဲ့အတူ ဖန်တီးပေးနိုင်သူ ဖြစ်ပါတယ်။”
},
{
type: “why”,
title: “၂။ Why It Matters”,
content: “Manager က အလုပ်အားလုံးကို ကိုယ်တိုင်လုပ်တာမဟုတ်ပါဘူး။ Direction, People, Numbers နဲ့ Execution ကို စီမံရပါတယ်။”
},
{
type: “framework”,
title: “၃။ Manager Framework”,
content: “PLAN → EXECUTE → MEASURE → ANALYZE → IMPROVE → REPEAT”
},
{
type: “example”,
title: “၄။ Real Example”,
content: “Target 500M ဖြစ်ပြီး Actual 430M ဆိုရင် Achievement 86% ဖြစ်ပါတယ်။ Manager က Excuse မရှာဘဲ Gap ရဲ့ Root Cause ကိုရှာရပါတယ်။”
},
{
type: “exercise”,
title: “၅။ Practical Exercise”,
content: “Target, Actual, Achievement, Gap နဲ့ Root Cause ကိုရေးပြီး 7-Day Action Plan တစ်ခုရေးပါ။”
},
{
type: “challenge”,
title: “၆။ Decision Challenge”,
content: “Result တစ်ခုတည်းမကြည့်ဘဲ RESULT + BEHAVIOR + FUTURE POTENTIAL နဲ့ Team Member ကို အကဲဖြတ်ပါ။”
},
{
type: “takeaways”,
title: “၇။ Key Takeaways”,
content: “Target → Actual → Gap → Root Cause → 7-Day Action”
},
{
type: “tomorrow”,
title: “၈။ Apply Tomorrow”,
content: “Team Member တစ်ယောက်နဲ့ 15 မိနစ်စကားပြောပြီး Result, Problem, Action ဆိုတဲ့ မေးခွန်း 3 ခုကို အသုံးပြုပါ။”
}
]
},

{
  id: "foundation-02",
  category: "Business Foundation",
  course: "Business Management Foundation",
  lessonNumber: 2,
  title: "Business ကို Numbers နဲ့ ဘယ်လိုစီမံမလဲ?",
  subtitle: "Business Decision ကို Feeling မဟုတ်ဘဲ Data နဲ့ ချမှတ်ခြင်း",
  duration: "15 min",
  isPremium: false,
  sections: [
    {
      type: "situation",
      title: "၁။ Real Business Situation",
      content: "Sales တက်နေသော်လည်း Profit မတက်တဲ့ Business တွေရှိပါတယ်။ ဒါကြောင့် Sales တစ်ခုတည်းနဲ့ Business ကို မဆုံးဖြတ်သင့်ပါဘူး။"
    },
    {
      type: "why",
      title: "၂။ Why It Matters",
      content: "Target, Actual, Achievement, Growth, Profit, Margin, Customer, Distribution, Collection နဲ့ Expense တွေကို သိထားရပါမယ်။"
    },
    {
      type: "framework",
      title: "၃။ Manager Framework",
      content: "TARGET → ACTUAL → GAP → CAUSE → ACTION → RESULT"
    },
    {
      type: "example",
      title: "၄။ Real Example",
      content: "Monthly Target 100M၊ Actual 90M ဆိုရင် Achievement 90% ဖြစ်ပြီး Gap 10M ဖြစ်ပါတယ်။ Gap ရဲ့အကြောင်းရင်းကို Customer, People, Product, Competition အလိုက်ခွဲပါ။"
    },
    {
      type: "exercise",
      title: "၅။ Practical Exercise",
      content: "သင့်လုပ်ငန်းရဲ့ Target, Actual, Achievement %, Gap နဲ့ Profit ကို တစ်ပတ်စာ စာရင်းပြုစုပါ။"
    },
    {
      type: "challenge",
      title: "၆။ Decision Challenge",
      content: "Sales 20% တက်ပေမယ့် Margin 5% ကျနေတယ်ဆိုရင် Sales တက်တာကိုသာ အောင်မြင်မှုလို့ မသတ်မှတ်ပါနဲ့။"
    },
    {
      type: "takeaways",
      title: "၇။ Key Takeaways",
      content: "Business Manager တစ်ယောက်ဟာ Numbers ကို သိရုံမက Numbers နောက်က အကြောင်းရင်းကို နားလည်ရပါတယ်။"
    },
    {
      type: "tomorrow",
      title: "၈။ Apply Tomorrow",
      content: "မနက်ဖြန် Daily Business Dashboard တစ်ခုတည်ဆောက်ပြီး Target, Actual, Achievement, Gap, Action ၅ ခုကို နေ့တိုင်းကြည့်ပါ။"
    }
  ]
},
{
  id: "leadership-01",
  category: "Leadership",
  course: "Leadership Mastery",
  lessonNumber: 5,
  title: "Team Performance တိုးအောင် ဘယ်လိုဦးဆောင်မလဲ?",
  subtitle: "Micromanagement မလုပ်ဘဲ Accountability နဲ့ Performance တည်ဆောက်ခြင်း",
  duration: "15 min",
  isPremium: true,
  sections: [
    {
      type: "situation",
      title: "၁။ Real Business Situation",
      content: "Manager က Team Member တစ်ယောက်ချင်းစီကို အလုပ်တိုင်းလိုက်စစ်နေရင် Manager ကိုယ်တိုင် Bottleneck ဖြစ်လာနိုင်ပါတယ်။"
    },
    {
      type: "why",
      title: "၂။ Why It Matters",
      content: "Team Performance က Clear Expectation, Coaching, Accountability နဲ့ Regular Review ပေါ်မှာ အခြေခံပါတယ်။"
    },
    {
      type: "framework",
      title: "၃။ Manager Framework",
      content: "CLEAR EXPECTATION → COACH → REVIEW → ACCOUNTABILITY → IMPROVE"
    },
    {
      type: "example",
      title: "၄။ Real Example",
      content: "Salesperson တစ်ယောက်ရဲ့ Target 20M ဆိုရင် Result Target အပြင် Customer Visit, New Customer, Collection စတဲ့ Leading Activities တွေပါ သတ်မှတ်ပါ။"
    },
    {
      type: "exercise",
      title: "၅။ Practical Exercise",
      content: "Team Member တစ်ယောက်အတွက် Result KPI 2 ခုနဲ့ Activity KPI 3 ခုရေးပါ။"
    },
    {
      type: "challenge",
      title: "၆။ Decision Challenge",
      content: "Manager က Staff ရဲ့အလုပ်ကို ကိုယ်တိုင်ဝင်လုပ်ပေးတာထက် Staff ကို Problem Solve လုပ်နိုင်အောင် Coaching ပေးပါ။"
    },
    {
      type: "takeaways",
      title: "၇။ Key Takeaways",
      content: "Clear Expectation + Coaching + Accountability = Strong Team"
    },
    {
      type: "tomorrow",
      title: "၈။ Apply Tomorrow",
      content: "Team Member တစ်ယောက်ကို 15 မိနစ် Coaching Session လုပ်ပြီး Goal, Current Result, Blocker, Next Action ကို ဆွေးနွေးပါ။"
    }
  ]
}

];

/* ==========================================================
5. SAFE LESSON LOADING
========================================================== */

function addLessonSource(globalName, sourceName) {
try {
const data = window[globalName];

  if (Array.isArray(data)) {
    data.forEach(function (lesson) {
      if (lesson && lesson.id) {
        state.lessons.push(lesson);
      }
    });
    state.lessonSources[sourceName] = true;
    return true;
  }
} catch (error) {
  console.warn("[ABA] Lesson source error:", globalName, error);
}
return false;

}

function loadLessons() {
state.lessons = [];

const sources = [
  ["ABA_BUSINESS_FUNDAMENTALS", "fundamentals"],
  ["ABA_LEADERSHIP", "leadership"],
  ["ABA_STRATEGY", "strategy"],
  ["ABA_MARKETING", "marketing"],
  ["ABA_SALES", "sales"],
  ["ABA_FINANCE", "finance"],
  ["ABA_PEOPLE", "people"],
  ["ABA_OPERATIONS", "operations"]
];
sources.forEach(function (item) {
  addLessonSource(item[0], item[1]);
});
const loadedIds = {};
state.lessons.forEach(function (lesson) {
  loadedIds[lesson.id] = true;
});
fallbackLessons.forEach(function (lesson) {
  if (!loadedIds[lesson.id]) {
    state.lessons.push(lesson);
  }
});
state.lessons.sort(function (a, b) {
  return Number(a.lessonNumber || 0) - Number(b.lessonNumber || 0);
});
console.log(
  "[ABA] Lessons loaded:",
  state.lessons.length
);

}

/* ==========================================================
6. HELPERS
========================================================== */

function $(id) {
return document.getElementById(id);
}

function esc(value) {
return String(value ?? “”)
.replace(/&/g, “&”)
.replace(/</g, “<”)
.replace(/>/g, “>”)
.replace(/”/g, “"”)
.replace(/’/g, “'”);
}

function money(value) {
const number = Number(value) || 0;
return number.toLocaleString(“en-US”);
}

function pct(value) {
const number = Number(value) || 0;
return Math.max(0, Math.min(100, number));
}

function achievement(target, actual) {
const t = Number(target) || 0;
const a = Number(actual) || 0;

if (!t) return 0;
return Math.round((a / t) * 100);

}

function today() {
const d = new Date();

return d.getFullYear() +
  "-" +
  String(d.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(d.getDate()).padStart(2, "0");

}

function isComplete(id) {
return !!state.progress[id];
}

function completedCount() {
return state.lessons.filter(function (lesson) {
return isComplete(lesson.id);
}).length;
}

function overallProgress() {
if (!state.lessons.length) return 0;

return Math.round(
  (completedCount() / state.lessons.length) * 100
);

}

function getCategoryLessons(category) {
return state.lessons.filter(function (lesson) {
return lesson.category === category;
});
}

function categories() {
const map = {};

state.lessons.forEach(function (lesson) {
  if (lesson.category) {
    map[lesson.category] = true;
  }
});
return Object.keys(map);

}

function iconForCategory(category) {
const icons = {
“Business Foundation”: “📘”,
“Leadership”: “👥”,
“Strategy”: “🎯”,
“Marketing”: “📣”,
“Sales”: “💼”,
“Finance”: “💰”,
“People”: “👤”,
“Operations”: “⚙️”
};

return icons[category] || "📚";

}

/* ==========================================================
7. UI HELPERS
========================================================== */

function setMain(html) {
const main = $(“app-main”);

if (!main) {
  console.error("[ABA] #app-main not found.");
  return;
}
main.innerHTML = html;

}

function toast(message) {
const container = $(“toastContainer”);

if (!container) {
  console.log("[ABA]", message);
  return;
}
const item = document.createElement("div");
item.className = "toast";
item.textContent = message;
container.appendChild(item);
setTimeout(function () {
  item.remove();
}, 3000);

}

function closeModal() {
const modal = $(“globalModal”);

if (modal) {
  modal.classList.remove("open");
  modal.innerHTML = "";
}

}

function showModal(content) {
const modal = $(“globalModal”);

if (!modal) return;
modal.innerHTML = `
  <div class="modal-backdrop" onclick="window.ABA.closeModal()"></div>
  <div class="modal-panel">
    <button class="modal-close" onclick="window.ABA.closeModal()">×</button>
    ${content}
  </div>
`;
modal.classList.add("open");

}

function closeMobileMenu() {
document.body.classList.remove(“menu-open”);

const overlay = $("mobileOverlay");
if (overlay) {
  overlay.classList.remove("active");
}

}

function openMobileMenu() {
document.body.classList.add(“menu-open”);

const overlay = $("mobileOverlay");
if (overlay) {
  overlay.classList.add("active");
}

}

function updateHeader(title) {
const titleElement = document.querySelector(
“.topbar-title”
);

if (titleElement) {
  titleElement.textContent = title;
}

}

function setActiveNav(page) {
document.querySelectorAll(”[data-page]”).forEach(
function (item) {
item.classList.toggle(
“active”,
item.dataset.page === page
);
}
);
}

function pageHeader(title, subtitle) {
return <div class="page-header"> <div> <div class="eyebrow">AUNG BUSINESS ACADEMY</div> <h1>${esc(title)}</h1> <p>${esc(subtitle || "")}</p> </div> </div>;
}

function card(title, body, extraClass) {
return <div class="aba-card ${extraClass || ""}"> <div class="card-title">${esc(title)}</div> <div class="card-body">${body}</div> </div>;
}

/* ==========================================================
8. DASHBOARD
========================================================== */

function renderDashboard() {
state.currentPage = “dashboard”;

updateHeader("Dashboard");
setActiveNav("dashboard");
const progress = overallProgress();
const completed = completedCount();
const recentLesson = state.lessons.find(function (lesson) {
  return !isComplete(lesson.id);
}) || state.lessons[0];
setMain(`
  ${pageHeader(
    "Business Growth Dashboard",
    "Learn • Plan • Execute • Measure • Improve"
  )}
  <section class="dashboard-hero">
    <div>
      <span class="hero-label">GROWTH MODE</span>
      <h2>Build a stronger business.</h2>
      <p>
        Your workspace for practical business learning,
        execution and performance management.
      </p>
      <div class="hero-actions">
        <button class="primary-button"
          onclick="window.ABA.openPage('today')">
          Start Today's Plan →
        </button>
        <button class="secondary-button"
          onclick="window.ABA.openPage('lessons')">
          Continue Learning
        </button>
      </div>
    </div>
    <div class="score-ring" style="--progress:${progress * 3.6}deg">
      <div>
        <strong>${progress}%</strong>
        <span>Progress</span>
      </div>
    </div>
  </section>
  <div class="stats-grid">
    <div class="stat-card">
      <span>Courses</span>
      <strong>8</strong>
      <small>Business areas</small>
    </div>
    <div class="stat-card">
      <span>Lessons</span>
      <strong>${state.lessons.length}</strong>
      <small>Available lessons</small>
    </div>
    <div class="stat-card">
      <span>Completed</span>
      <strong>${completed}</strong>
      <small>Lessons completed</small>
    </div>
    <div class="stat-card">
      <span>Progress</span>
      <strong>${progress}%</strong>
      <small>Overall learning</small>
    </div>
  </div>
  <div class="dashboard-grid">
    ${recentLesson ? `
      <div class="continue-card">
        <div class="section-label">CONTINUE LEARNING</div>
        <h3>
          Lesson ${Number(recentLesson.lessonNumber || "")}:
          ${esc(recentLesson.title)}
        </h3>
        <p>
          ${esc(
            recentLesson.subtitle ||
            "Continue your business growth journey."
          )}
        </p>
        <button class="primary-button"
          onclick="window.ABA.openLesson('${esc(recentLesson.id)}')">
          Open Lesson →
        </button>
      </div>
    ` : ""}
    <div class="today-card">
      <div class="section-label">TODAY</div>
      <h3>Today's Business Focus</h3>
      <ul class="clean-list">
        <li>🎯 Review your most important target</li>
        <li>📊 Check yesterday's numbers</li>
        <li>👥 Coach one team member</li>
        <li>⚙️ Improve one process</li>
      </ul>
      <button class="secondary-button"
        onclick="window.ABA.openPage('today')">
        Open Today
      </button>
    </div>
  </div>
  <div class="growth-roadmap">
    <div class="section-heading">
      <div>
        <span class="section-label">GROWTH ROADMAP</span>
        <h2>Learn → Execute → Improve</h2>
      </div>
    </div>
    <div class="roadmap-grid">
      <div class="roadmap-step">
        <span>01</span>
        <strong>Learn</strong>
        <p>Build practical business knowledge.</p>
      </div>
      <div class="roadmap-step">
        <span>02</span>
        <strong>Plan</strong>
        <p>Turn knowledge into clear goals.</p>
      </div>
      <div class="roadmap-step">
        <span>03</span>
        <strong>Execute</strong>
        <p>Convert plans into daily actions.</p>
      </div>
      <div class="roadmap-step">
        <span>04</span>
        <strong>Measure</strong>
        <p>Use numbers to understand results.</p>
      </div>
      <div class="roadmap-step">
        <span>05</span>
        <strong>Improve</strong>
        <p>Fix bottlenecks and repeat.</p>
      </div>
    </div>
  </div>
  ${renderFooter()}
`);

}

/* ==========================================================
9. TODAY
========================================================== */

function renderToday() {
state.currentPage = “today”;

updateHeader("Today");
setActiveNav("today");
const todayTasks = state.tasks.filter(function (task) {
  return task.date === today();
});
setMain(`
  ${pageHeader(
    "Today's Execution",
    "Turn your priorities into measurable actions."
  )}
  <div class="tool-card">
    <div class="section-heading">
      <div>
        <span class="section-label">DAILY ACTION</span>
        <h2>What must get done today?</h2>
      </div>
    </div>
    <div class="inline-form">
      <input
        id="todayTaskInput"
        class="tool-input"
        type="text"
        placeholder="Enter today's important action..."
      >
      <button
        class="primary-button"
        onclick="window.ABA.addTask()">
        Add Task
      </button>
    </div>
  </div>
  <div class="list-card">
    <div class="section-heading">
      <div>
        <span class="section-label">TODAY'S TASKS</span>
        <h2>${todayTasks.length} Actions</h2>
      </div>
    </div>
    ${
      todayTasks.length
        ? todayTasks.map(function (task) {
            return `
              <div class="task-row">
                <button
                  class="check-button ${task.done ? "done" : ""}"
                  onclick="window.ABA.toggleTask('${esc(task.id)}')">
                  ${task.done ? "✓" : ""}
                </button>
                <span class="${task.done ? "task-done" : ""}">
                  ${esc(task.title)}
                </span>
              </div>
            `;
          }).join("")
        : `
          <div class="empty-state">
            <div class="empty-icon">✓</div>
            <h3>No tasks yet</h3>
            <p>Add one important action for today.</p>
          </div>
        `
    }
  </div>
  ${renderFooter()}
`);

}

function addTask() {
const input = $(“todayTaskInput”);

if (!input) return;
const title = input.value.trim();
if (!title) {
  toast("Task တစ်ခုရေးပါ။");
  return;
}
state.tasks.push({
  id: "task-" + Date.now(),
  title: title,
  date: today(),
  done: false
});
writeJSON(STORAGE.tasks, state.tasks);
toast("Task added.");
renderToday();

}

function toggleTask(id) {
const task = state.tasks.find(function (item) {
return item.id === id;
});

if (!task) return;
task.done = !task.done;
writeJSON(STORAGE.tasks, state.tasks);
renderToday();

}

/* ==========================================================
10. GOALS
========================================================== */

function renderGoals() {
state.currentPage = “goals”;

updateHeader("My Goals");
setActiveNav("goals");
setMain(`
  ${pageHeader(
    "My Goals",
    "Set measurable goals and track execution."
  )}
  <div class="tool-card">
    <h2>Add Business Goal</h2>
    <div class="form-grid">
      <input
        id="goalTitle"
        class="tool-input"
        placeholder="Goal title"
      >
      <input
        id="goalTarget"
        class="tool-input"
        type="number"
        placeholder="Target number"
      >
    </div>
    <button
      class="primary-button"
      onclick="window.ABA.addGoal()">
      Add Goal
    </button>
  </div>
  <div class="card-grid">
    ${
      state.goals.length
        ? state.goals.map(function (goal) {
            const achievementValue =
              achievement(goal.target, goal.actual);
            return `
              <div class="kpi-card">
                <span class="section-label">GOAL</span>
                <h3>${esc(goal.title)}</h3>
                <div class="kpi-number">
                  ${money(goal.actual)} /
                  ${money(goal.target)}
                </div>
                <div class="progress-bar">
                  <span style="width:${pct(achievementValue)}%"></span>
                </div>
                <small>
                  ${achievementValue}% achieved
                </small>
                <button
                  class="secondary-button"
                  onclick="window.ABA.updateGoal('${esc(goal.id)}')">
                  Update
                </button>
              </div>
            `;
          }).join("")
        : `
          <div class="empty-state">
            <div class="empty-icon">🎯</div>
            <h3>No goals yet</h3>
            <p>Create your first measurable business goal.</p>
          </div>
        `
    }
  </div>
  ${renderFooter()}
`);

}

function addGoal() {
const titleInput = $(“goalTitle”);
const targetInput = $(“goalTarget”);

if (!titleInput || !targetInput) return;
const title = titleInput.value.trim();
const target = Number(targetInput.value);
if (!title || !target) {
  toast("Goal title နဲ့ target ထည့်ပါ။");
  return;
}
state.goals.push({
  id: "goal-" + Date.now(),
  title: title,
  target: target,
  actual: 0
});
writeJSON(STORAGE.goals, state.goals);
toast("Goal added.");
renderGoals();

}

function updateGoal(id) {
const goal = state.goals.find(function (item) {
return item.id === id;
});

if (!goal) return;
const value = prompt(
  "Current actual number ထည့်ပါ။",
  String(goal.actual || 0)
);
if (value === null) return;
const actual = Number(value);
if (Number.isNaN(actual)) {
  toast("Number မှန်မှန်ထည့်ပါ။");
  return;
}
goal.actual = actual;
writeJSON(STORAGE.goals, state.goals);
renderGoals();

}

/* ==========================================================
11. ACADEMY
========================================================== */

function renderAcademy() {
state.currentPage = “academy”;

updateHeader("Business Academy");
setActiveNav("academy");
const cats = categories();
setMain(`
  ${pageHeader(
    "Master Business",
    "Practical business lessons designed for managers and entrepreneurs."
  )}
  <div class="academy-hero">
    <div>
      <span class="section-label">30-LESSON BUSINESS PROGRAM</span>
      <h2>Build your Business Management capability.</h2>
      <p>
        Foundation → Leadership → Strategy → Marketing →
        Sales → Finance → People → Operations
      </p>
    </div>
    <div class="hero-stat">
      <strong>${state.lessons.length}</strong>
      <span>Lessons</span>
    </div>
  </div>
  <div class="category-grid">
    ${cats.map(function (category) {
      const lessons = getCategoryLessons(category);
      const done = lessons.filter(function (lesson) {
        return isComplete(lesson.id);
      }).length;
      return `
        <button
          class="category-card"
          onclick="window.ABA.openCategory('${esc(category)}')">
          <span class="category-icon">
            ${iconForCategory(category)}
          </span>
          <strong>${esc(category)}</strong>
          <small>
            ${done}/${lessons.length} completed
          </small>
        </button>
      `;
    }).join("")}
  </div>
  ${renderFooter()}
`);

}

/* ==========================================================
12. LESSON LIST
========================================================== */

function renderLessons() {
state.currentPage = “lessons”;

updateHeader("Lessons");
setActiveNav("lessons");
setMain(`
  ${pageHeader(
    "All Lessons",
    "Choose a lesson and apply it directly to your business."
  )}
  <div class="lesson-toolbar">
    <input
      id="lessonSearch"
      class="tool-input"
      placeholder="Search lessons..."
      oninput="window.ABA.filterLessons(this.value)"
    >
  </div>
  <div id="lessonList" class="lesson-grid">
    ${lessonCards(state.lessons)}
  </div>
  ${renderFooter()}
`);

}

function lessonCards(list) {
if (!list.length) {
return <div class="empty-state"> <div class="empty-icon">📚</div> <h3>No lessons found</h3> <p>Try another search.</p> </div>;
}

return list.map(function (lesson) {
  const locked = !!lesson.isPremium;
  const done = isComplete(lesson.id);
  return `
    <article class="lesson-card ${locked ? "premium-lesson" : ""}">
      <div class="lesson-number">
        ${String(lesson.lessonNumber || "").padStart(2, "0")}
      </div>
      <div class="lesson-content">
        <div class="lesson-meta">
          <span>${esc(lesson.category || "Business")}</span>
          <span>${esc(lesson.duration || "15 min")}</span>
          ${
            locked
              ? `<span class="premium-badge">PRO</span>`
              : ""
          }
          ${
            done
              ? `<span class="complete-badge">✓ Done</span>`
              : ""
          }
        </div>
        <h3>${esc(lesson.title)}</h3>
        <p>
          ${esc(
            lesson.subtitle ||
            lesson.description ||
            "Practical business lesson."
          )}
        </p>
        <button
          class="${
            locked
              ? "secondary-button"
              : "primary-button"
          }"
          onclick="window.ABA.openLesson('${esc(lesson.id)}')">
          ${
            locked
              ? "View Lesson 🔒"
              : done
                ? "Review Lesson"
                : "Start Lesson →"
          }
        </button>
      </div>
    </article>
  `;
}).join("");

}

function filterLessons(value) {
const search = String(value || “”).toLowerCase();

const filtered = state.lessons.filter(function (lesson) {
  return (
    String(lesson.title || "")
      .toLowerCase()
      .includes(search) ||
    String(lesson.category || "")
      .toLowerCase()
      .includes(search) ||
    String(lesson.subtitle || "")
      .toLowerCase()
      .includes(search)
  );
});
const list = $("lessonList");
if (list) {
  list.innerHTML = lessonCards(filtered);
}

}

/* ==========================================================
13. CATEGORY
========================================================== */

function renderCategory(category) {
state.currentPage = “category”;

updateHeader(category);
setMain(`
  ${pageHeader(
    category,
    "Practical lessons and business management skills."
  )}
  <div class="lesson-grid">
    ${lessonCards(getCategoryLessons(category))}
  </div>
  <button
    class="secondary-button"
    onclick="window.ABA.openPage('lessons')">
    ← All Lessons
  </button>
  ${renderFooter()}
`);

}

/* ==========================================================
14. OPEN LESSON
========================================================== */

function openLesson(id) {
const lesson = state.lessons.find(function (item) {
return String(item.id) === String(id);
});

if (!lesson) {
  toast("Lesson မတွေ့ပါ။");
  return;
}
state.currentLesson = lesson;
closeMobileMenu();
if (lesson.isPremium) {
  showPremiumLesson(lesson);
  return;
}
renderLessonDetail(lesson);

}

function showPremiumLesson(lesson) {
showModal(`
    <div class="premium-icon">👑</div>
    <span class="section-label">GROWTH PRO</span>
    <h2>Premium Lesson</h2>
    <p>
      <strong>${esc(lesson.title)}</strong>
      သည် Growth Pro content ဖြစ်ပါတယ်။
    </p>
    <p>
      Advanced lessons, tools နဲ့ AI Business Coaching
      တွေကို Premium အဖြစ် unlock လုပ်နိုင်ပါမယ်။
    </p>
    <button
      class="primary-button"
      onclick="window.ABA.closeModal();window.ABA.openPage('growth-pro')">
      View Growth Pro →
    </button>
    <button
      class="secondary-button"
      onclick="window.ABA.closeModal()">
      Maybe Later
    </button>
  </div>
`);

}

function renderLessonDetail(lesson) {
state.currentPage = “lesson”;

updateHeader(
  "Lesson " + String(lesson.lessonNumber || "")
);
const index = state.lessons.findIndex(function (item) {
  return item.id === lesson.id;
});
const previous = state.lessons[index - 1];
const next = state.lessons[index + 1];
setMain(`
  <div class="lesson-detail-page">
    <button
      class="back-button"
      onclick="window.ABA.openPage('lessons')">
      ← Back to Lessons
    </button>
    <div class="lesson-detail-header">
      <span class="section-label">
        ${esc(lesson.category || "Business")}
      </span>
      <h1>
        Lesson ${Number(lesson.lessonNumber || "")}:
        ${esc(lesson.title)}
      </h1>
      <p>
        ${esc(lesson.subtitle || "")}
      </p>
      <div class="lesson-info">
        <span>⏱ ${esc(lesson.duration || "15 min")}</span>
        <span>
          ${isComplete(lesson.id) ? "✓ Completed" : "In Progress"}
        </span>
      </div>
    </div>
    <div class="lesson-layout">
      <article class="lesson-main-content">
        ${
          Array.isArray(lesson.sections)
            ? lesson.sections.map(function (section) {
                return `
                  <section class="lesson-section">
                    <h2>
                      ${esc(section.title || "")}
                    </h2>
                    <div class="lesson-text">
                      ${formatLessonText(section.content || "")}
                    </div>
                  </section>
                `;
              }).join("")
            : `
              <section class="lesson-section">
                <div class="lesson-text">
                  ${formatLessonText(
                    lesson.content ||
                    "ဒီ Lesson ရဲ့ Content မရှိသေးပါ။"
                  )}
                </div>
              </section>
            `
        }
        <div class="lesson-complete-box">
          ${
            isComplete(lesson.id)
              ? `
                <div class="completed-message">
                  ✓ Lesson Completed
                </div>
              `
              : `
                <button
                  class="primary-button"
                  onclick="window.ABA.completeLesson('${esc(lesson.id)}')">
                  ✓ Mark Lesson Complete
                </button>
              `
          }
        </div>
        <div class="lesson-navigation">
          ${
            previous
              ? `
                <button
                  class="secondary-button"
                  onclick="window.ABA.openLesson('${esc(previous.id)}')">
                  ← Previous
                </button>
              `
              : `<span></span>`
          }
          ${
            next
              ? `
                <button
                  class="primary-button"
                  onclick="window.ABA.openLesson('${esc(next.id)}')">
                  Next Lesson →
                </button>
              `
              : `
                <button
                  class="primary-button"
                  onclick="window.ABA.openPage('progress')">
                  View My Progress →
                </button>
              `
          }
        </div>
      </article>
      <aside class="lesson-sidebar">
        <div class="lesson-sidebar-card">
          <span class="section-label">YOUR PROGRESS</span>
          <strong>
            ${overallProgress()}%
          </strong>
          <div class="progress-bar">
            <span style="width:${overallProgress()}%"></span>
          </div>
          <small>
            ${completedCount()} of
            ${state.lessons.length} lessons completed
          </small>
        </div>
        <div class="lesson-sidebar-card">
          <span class="section-label">NEXT ACTION</span>
          <p>
            ဒီ Lesson မှာသင်ယူထားတာကို
            မနက်ဖြန် Business ထဲမှာ အသုံးချပါ။
          </p>
        </div>
      </aside>
    </div>
    ${renderFooter()}
  </div>
`);

}

function formatLessonText(text) {
return esc(text)
.replace(/\n\n/g, “”)
.replace(/\n/g, “”);
}

function completeLesson(id) {
state.progress[id] = true;

writeJSON(STORAGE.progress, state.progress);
toast("Lesson completed ✓");
const lesson = state.lessons.find(function (item) {
  return item.id === id;
});
if (lesson) {
  renderLessonDetail(lesson);
} else {
  renderLessons();
}

}

/* ==========================================================
15. PROGRESS
========================================================== */

function renderProgress() {
state.currentPage = “progress”;

updateHeader("My Progress");
setActiveNav("progress");
const progress = overallProgress();
const catProgress = categories().map(function (category) {
  const lessons = getCategoryLessons(category);
  const done = lessons.filter(function (lesson) {
    return isComplete(lesson.id);
  }).length;
  const value = lessons.length
    ? Math.round((done / lessons.length) * 100)
    : 0;
  return `
    <div class="progress-category">
      <div class="progress-category-header">
        <strong>
          ${iconForCategory(category)}
          ${esc(category)}
        </strong>
        <span>${value}%</span>
      </div>
      <div class="progress-bar">
        <span style="width:${value}%"></span>
      </div>
      <small>
        ${done}/${lessons.length} lessons completed
      </small>
    </div>
  `;
}).join("");
setMain(`
  ${pageHeader(
    "My Progress",
    "Track your learning and business growth journey."
  )}
  <div class="progress-hero">
    <div>
      <span class="section-label">OVERALL PROGRESS</span>
      <h2>${progress}%</h2>
      <p>
        ${completedCount()} of
        ${state.lessons.length} lessons completed.
      </p>
    </div>
    <div class="progress-bar large">
      <span style="width:${progress}%"></span>
    </div>
  </div>
  <div class="progress-list">
    ${catProgress}
  </div>
  ${renderFooter()}
`);

}

/* ==========================================================
16. SALES TARGET
========================================================== */

function renderSalesTarget() {
state.currentPage = “sales-target”;

updateHeader("Sales Target");
setActiveNav("sales-target");
setMain(`
  ${pageHeader(
    "Sales Target Calculator",
    "Break your monthly target into practical execution numbers."
  )}
  <div class="calculator-card">
    <div class="form-grid">
      <div>
        <label>Monthly Target</label>
        <input
          id="salesTarget"
          class="tool-input"
          type="number"
          placeholder="100000000"
        >
      </div>
      <div>
        <label>Working Days</label>
        <input
          id="salesDays"
          class="tool-input"
          type="number"
          value="26"
        >
      </div>
      <div>
        <label>Salespeople</label>
        <input
          id="salesPeople"
          class="tool-input"
          type="number"
          value="5"
        >
      </div>
    </div>
    <button
      class="primary-button"
      onclick="window.ABA.calculateSalesTarget()">
      Calculate →
    </button>
    <div id="salesTargetResult"></div>
  </div>
  ${renderFooter()}
`);

}

function calculateSalesTarget() {
const target = Number($(“salesTarget”)?.value) || 0;
const days = Number($(“salesDays”)?.value) || 1;
const people = Number($(“salesPeople”)?.value) || 1;

const daily = target / days;
const perPerson = target / people;
const perPersonDaily = target / people / days;
const result = $("salesTargetResult");
if (!result) return;
result.innerHTML = `
  <div class="result-grid">
    <div class="result-card">
      <span>Daily Team Target</span>
      <strong>${money(daily)}</strong>
    </div>
    <div class="result-card">
      <span>Monthly / Person</span>
      <strong>${money(perPerson)}</strong>
    </div>
    <div class="result-card">
      <span>Daily / Person</span>
      <strong>${money(perPersonDaily)}</strong>
    </div>
  </div>
`;

}

/* ==========================================================
17. PRICING
========================================================== */

function renderPricing() {
state.currentPage = “pricing”;

updateHeader("Pricing");
setActiveNav("pricing");
setMain(`
  ${pageHeader(
    "Pricing Calculator",
    "Understand cost, margin and selling price."
  )}
  <div class="calculator-card">
    <div class="form-grid">
      <div>
        <label>Cost</label>
        <input
          id="priceCost"
          class="tool-input"
          type="number"
          placeholder="10000"
        >
      </div>
      <div>
        <label>Desired Margin %</label>
        <input
          id="priceMargin"
          class="tool-input"
          type="number"
          value="30"
        >
      </div>
    </div>
    <button
      class="primary-button"
      onclick="window.ABA.calculatePricing()">
      Calculate Price →
    </button>
    <div id="pricingResult"></div>
  </div>
  ${renderFooter()}
`);

}

function calculatePricing() {
const cost = Number($(“priceCost”)?.value) || 0;
const margin = Number($(“priceMargin”)?.value) || 0;

if (margin >= 100) {
  toast("Margin 100% ထက်နည်းရပါမယ်။");
  return;
}
const sellingPrice = cost / (1 - margin / 100);
const grossProfit = sellingPrice - cost;
const result = $("pricingResult");
if (!result) return;
result.innerHTML = `
  <div class="result-grid">
    <div class="result-card">
      <span>Recommended Selling Price</span>
      <strong>${money(sellingPrice)}</strong>
    </div>
    <div class="result-card">
      <span>Gross Profit</span>
      <strong>${money(grossProfit)}</strong>
    </div>
    <div class="result-card">
      <span>Margin</span>
      <strong>${margin}%</strong>
    </div>
  </div>
`;

}

/* ==========================================================
18. KPI SCORECARD
========================================================== */

function renderKPI() {
state.currentPage = “kpi”;

updateHeader("KPI & Scorecard");
setActiveNav("kpi");
setMain(`
  ${pageHeader(
    "KPI & Scorecard",
    "Manage performance with clear numbers."
  )}
  <div class="card-grid">
    ${card(
      "Sales Achievement",
      `
        <div class="metric-big">86%</div>
        <div class="progress-bar">
          <span style="width:86%"></span>
        </div>
        <small>Target vs Actual</small>
      `
    )}
    ${card(
      "New Customers",
      `
        <div class="metric-big">24</div>
        <small>Monthly new customers</small>
      `
    )}
    ${card(
      "Collection",
      `
        <div class="metric-big">92%</div>
        <div class="progress-bar">
          <span style="width:92%"></span>
        </div>
        <small>Collection achievement</small>
      `
    )}
    ${card(
      "Team Productivity",
      `
        <div class="metric-big">78%</div>
        <div class="progress-bar">
          <span style="width:78%"></span>
        </div>
        <small>Activity effectiveness</small>
      `
    )}
  </div>
  ${renderFooter()}
`);

}

/* ==========================================================
19. CUSTOMER PLAN
========================================================== */

function renderCustomerPlan() {
state.currentPage = “customer-plan”;

updateHeader("Customer Plan");
setActiveNav("customer-plan");
setMain(`
  ${pageHeader(
    "Customer Plan",
    "Manage key customers with structured actions."
  )}
  <div class="tool-card">
    <div class="form-grid">
      <input
        id="customerName"
        class="tool-input"
        placeholder="Customer name"
      >
      <input
        id="customerValue"
        class="tool-input"
        placeholder="Monthly value"
      >
      <input
        id="customerAction"
        class="tool-input"
        placeholder="Next action"
      >
    </div>
    <button
      class="primary-button"
      onclick="window.ABA.saveCustomerPlan()">
      Save Customer Plan
    </button>
  </div>
  <div class="empty-state">
    <div class="empty-icon">👥</div>
    <h3>Customer planning workspace</h3>
    <p>
      Add customer plans as you execute your business strategy.
    </p>
  </div>
  ${renderFooter()}
`);

}

function saveCustomerPlan() {
toast(“Customer plan saved locally.”);
}

/* ==========================================================
20. ACTION PLANNER
========================================================== */

function renderActionPlanner() {
state.currentPage = “action-planner”;

updateHeader("Action Planner");
setActiveNav("action-planner");
setMain(`
  ${pageHeader(
    "Action Planner",
    "Convert business goals into clear actions."
  )}
  <div class="planner-grid">
    ${[
      ["01", "Priority", "What matters most?"],
      ["02", "Owner", "Who is responsible?"],
      ["03", "Deadline", "When must it happen?"],
      ["04", "Measure", "How will success be measured?"]
    ].map(function (item) {
      return `
        <div class="planner-card">
          <span>${item[0]}</span>
          <strong>${item[1]}</strong>
          <p>${item[2]}</p>
        </div>
      `;
    }).join("")}
  </div>
  ${renderFooter()}
`);

}

/* ==========================================================
21. BUSINESS PLAN
========================================================== */

function renderBusinessPlan() {
state.currentPage = “business-plan”;

updateHeader("Business Plan");
setActiveNav("business-plan");
const plan = state.businessPlan;
setMain(`
  ${pageHeader(
    "Business Plan",
    "Create a practical plan for your business."
  )}
  <div class="tool-card">
    <div class="form-grid">
      <input
        id="bpName"
        class="tool-input"
        value="${esc(plan.name || "")}"
        placeholder="Business Name"
      >
      <input
        id="bpType"
        class="tool-input"
        value="${esc(plan.type || "")}"
        placeholder="Business Type"
      >
      <input
        id="bpCustomer"
        class="tool-input"
        value="${esc(plan.customer || "")}"
        placeholder="Target Customer"
      >
      <input
        id="bpBudget"
        class="tool-input"
        value="${esc(plan.budget || "")}"
        placeholder="Starting Budget"
      >
      <input
        id="bpGoal"
        class="tool-input"
        value="${esc(plan.goal || "")}"
        placeholder="Business Goal"
      >
      <input
        id="bpLocation"
        class="tool-input"
        value="${esc(plan.location || "")}"
        placeholder="Market / Location"
      >
    </div>
    <button
      class="primary-button"
      onclick="window.ABA.saveBusinessPlan()">
      Save Business Plan
    </button>
  </div>
  ${renderFooter()}
`);

}

function saveBusinessPlan() {
state.businessPlan = {
name: $(“bpName”)?.value.trim() || “”,
type: $(“bpType”)?.value.trim() || “”,
customer: $(“bpCustomer”)?.value.trim() || “”,
budget: $(“bpBudget”)?.value.trim() || “”,
goal: $(“bpGoal”)?.value.trim() || “”,
location: $(“bpLocation”)?.value.trim() || “”
};

writeJSON(
  STORAGE.businessPlan,
  state.businessPlan
);
toast("Business Plan saved.");

}

/* ==========================================================
22. PERFORMANCE
========================================================== */

function renderPerformance() {
state.currentPage = “performance”;

updateHeader("Performance");
setActiveNav("performance");
setMain(`
  ${pageHeader(
    "Performance",
    "Understand what is working and what needs improvement."
  )}
  <div class="card-grid">
    ${card(
      "Overall Performance",
      `
        <div class="metric-big">82%</div>
        <div class="progress-bar">
          <span style="width:82%"></span>
        </div>
      `
    )}
    ${card(
      "Execution",
      `
        <div class="metric-big">76%</div>
        <div class="progress-bar">
          <span style="width:76%"></span>
        </div>
      `
    )}
    ${card(
      "Growth",
      `
        <div class="metric-big">68%</div>
        <div class="progress-bar">
          <span style="width:68%"></span>
        </div>
      `
    )}
  </div>
  ${renderFooter()}
`);

}

/* ==========================================================
23. SALES ANALYSIS
========================================================== */

function renderSalesAnalysis() {
state.currentPage = “sales-analysis”;

updateHeader("Sales Analysis");
setActiveNav("sales-analysis");
setMain(`
  ${pageHeader(
    "Sales Analysis",
    "Analyze target, actual, gap and growth."
  )}
  <div class="analysis-table">
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Target</th>
          <th>Actual</th>
          <th>Achievement</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sales</td>
          <td>100M</td>
          <td>86M</td>
          <td>86%</td>
        </tr>
        <tr>
          <td>New Customers</td>
          <td>30</td>
          <td>24</td>
          <td>80%</td>
        </tr>
        <tr>
          <td>Collection</td>
          <td>100%</td>
          <td>92%</td>
          <td>92%</td>
        </tr>
      </tbody>
    </table>
  </div>
  ${renderFooter()}
`);

}

/* ==========================================================
24. PROFIT ANALYSIS
========================================================== */

function renderProfitAnalysis() {
state.currentPage = “profit-analysis”;

updateHeader("Profit Analysis");
setActiveNav("profit-analysis");
setMain(`
  ${pageHeader(
    "Profit Analysis",
    "Understand Revenue, Cost, Gross Profit and Margin."
  )}
  <div class="card-grid">
    ${card(
      "Revenue",
      `<div class="metric-big">100M</div>`
    )}
    ${card(
      "Cost",
      `<div class="metric-big">70M</div>`
    )}
    ${card(
      "Gross Profit",
      `<div class="metric-big">30M</div>`
    )}
    ${card(
      "Gross Margin",
      `<div class="metric-big">30%</div>`
    )}
  </div>
  ${renderFooter()}
`);

}

/* ==========================================================
25. REPORTS
========================================================== */

function renderReports() {
state.currentPage = “reports”;

updateHeader("Reports");
setActiveNav("reports");
setMain(`
  ${pageHeader(
    "Reports",
    "Business reporting workspace."
  )}
  <div class="card-grid">
    <button
      class="report-card"
      onclick="window.ABA.openPage('sales-analysis')">
      <span>📈</span>
      <strong>Sales Report</strong>
      <small>Target vs Actual</small>
    </button>
    <button
      class="report-card"
      onclick="window.ABA.openPage('profit-analysis')">
      <span>💰</span>
      <strong>Profit Report</strong>
      <small>Revenue and margin</small>
    </button>
    <button
      class="report-card"
      onclick="window.ABA.openPage('performance')">
      <span>📊</span>
      <strong>Performance Report</strong>
      <small>Business performance</small>
    </button>
  </div>
  ${renderFooter()}
`);

}

/* ==========================================================
26. AI PAGES
========================================================== */

function renderAI(page, title, subtitle) {
state.currentPage = page;

updateHeader(title);
setActiveNav(page);
setMain(`
  ${pageHeader(title, subtitle)}
  <div class="ai-page">
    <div class="ai-hero">
      <div class="ai-icon">🤖</div>
      <div>
        <span class="section-label">AI BUSINESS INTELLIGENCE</span>
        <h2>${esc(title)}</h2>
        <p>
          Your AI assistant for practical business decisions.
        </p>
      </div>
    </div>
    <div class="ai-chat-box" id="aiChat">
      <div class="ai-message">
        <strong>AI Business Coach</strong>
        <p>
          AI connection မချိတ်ဆက်ရသေးပါက
          ဒီနေရာမှာ local business guidance ကို အသုံးပြုနိုင်ပါတယ်။
        </p>
      </div>
    </div>
    <div class="ai-input-row">
      <input
        id="aiQuestion"
        class="tool-input"
        placeholder="သင့် Business Problem ကိုရေးပါ..."
      >
      <button
        class="primary-button"
        onclick="window.ABA.askAI()">
        Ask AI
      </button>
    </div>
    <div class="ai-quick-grid">
      <button
        class="secondary-button"
        onclick="window.ABA.quickAI('Sales မတက်ရင် ဘာတွေစစ်ရမလဲ?')">
        Sales Problem
      </button>
      <button
        class="secondary-button"
        onclick="window.ABA.quickAI('Team Performance တိုးအောင် ဘာလုပ်ရမလဲ?')">
        Team Problem
      </button>
      <button
        class="secondary-button"
        onclick="window.ABA.quickAI('Profit Margin တိုးအောင် ဘာလုပ်ရမလဲ?')">
        Profit Problem
      </button>
    </div>
  </div>
  ${renderFooter()}
`);

}

function askAI() {
const input = $(“aiQuestion”);

if (!input) return;
const question = input.value.trim();
if (!question) {
  toast("မေးခွန်းရေးပါ။");
  return;
}
appendAIMessage("You", question);
const answer = localCoach(question);
setTimeout(function () {
  appendAIMessage(
    "AI Business Coach",
    answer
  );
}, 250);

}

function quickAI(question) {
const input = $(“aiQuestion”);

if (input) {
  input.value = question;
}
askAI();

}

function appendAIMessage(sender, message) {
const chat = $(“aiChat”);

if (!chat) return;
const div = document.createElement("div");
div.className = "ai-message";
div.innerHTML = `
  <strong>${esc(sender)}</strong>
  <p>${esc(message)}</p>
`;
chat.appendChild(div);
chat.scrollTop = chat.scrollHeight;

}

function localCoach(question) {
const q = question.toLowerCase();

if (
  q.includes("sales") ||
  q.includes("ရောင်း") ||
  q.includes("အရောင်း")
) {
  return "Sales မတက်ရင် Target → Actual → Gap ကိုအရင်စစ်ပါ။ ပြီးရင် Customer Coverage, Product Availability, Salesperson Activity, Conversion Rate နဲ့ Competition ကို Root Cause အဖြစ်ခွဲစစ်ပါ။";
}
if (
  q.includes("team") ||
  q.includes("staff") ||
  q.includes("ဝန်ထမ်း")
) {
  return "Team Performance အတွက် Clear Expectation → Coaching → Regular Review → Accountability ဆိုတဲ့ Cycle ကိုအသုံးပြုပါ။";
}
if (
  q.includes("profit") ||
  q.includes("အမြတ်")
) {
  return "Profit တိုးချင်ရင် Revenue တိုးတာတစ်ခုတည်းမကြည့်ပါနဲ့။ Price, Cost, Gross Margin, Product Mix နဲ့ Operating Expense ကိုအတူတူစစ်ပါ။";
}
return "ဒီ Business Problem ကို Target → Current Result → Gap → Root Cause → Action ဆိုတဲ့ Framework နဲ့ စတင်ခွဲခြမ်းကြည့်ပါ။ ပြီးရင် 7-Day Action တစ်ခု သတ်မှတ်ပြီး Result ကိုပြန်တိုင်းပါ။";

}

/* ==========================================================
27. CAREER
========================================================== */

function renderCVBuilder() {
state.currentPage = “cv-builder”;

updateHeader("CV Builder");
setActiveNav("cv-builder");
setMain(`
  ${pageHeader(
    "CV Builder",
    "Build a professional management-focused CV."
  )}
  <div class="tool-card">
    <div class="form-grid">
      <input
        id="cvName"
        class="tool-input"
        value="${esc(state.profile.name)}"
        placeholder="Full Name"
      >
      <input
        id="cvRole"
        class="tool-input"
        value="${esc(state.profile.role)}"
        placeholder="Current Role"
      >
    </div>
    <textarea
      id="cvSummary"
      class="tool-input"
      rows="7"
      placeholder="Professional Summary"></textarea>
    <button
      class="primary-button"
      onclick="window.ABA.generateCV()">
      Build CV Preview →
    </button>
    <div id="cvResult"></div>
  </div>
  ${renderFooter()}
`);

}

function generateCV() {
const name = $(“cvName”)?.value.trim() || state.profile.name;
const role = $(“cvRole”)?.value.trim() || state.profile.role;
const summary = $(“cvSummary”)?.value.trim() ||
“Experienced business and sales management professional focused on revenue growth, team leadership, market expansion and execution.”;

const result = $("cvResult");
if (!result) return;
result.innerHTML = `
  <div class="cv-preview">
    <h2>${esc(name)}</h2>
    <h3>${esc(role)}</h3>
    <hr>
    <h4>PROFESSIONAL SUMMARY</h4>
    <p>${esc(summary)}</p>
    <h4>CORE CAPABILITIES</h4>
    <p>
      Sales Management • Team Leadership •
      Business Development • Market Expansion •
      KPI Management • Distributor Management •
      Customer Management • Business Analysis
    </p>
  </div>
`;

}

function renderInterviewCoach() {
renderAI(
“interview-coach”,
“Interview Coach”,
“Prepare strong answers for management interviews.”
);
}

function renderCareerGrowth() {
state.currentPage = “career-growth”;

updateHeader("Career Growth");
setActiveNav("career-growth");
setMain(`
  ${pageHeader(
    "Career Growth",
    "Build the skills and results required for your next role."
  )}
  <div class="roadmap-grid">
    <div class="roadmap-step">
      <span>01</span>
      <strong>Capability</strong>
      <p>Strengthen management skills.</p>
    </div>
    <div class="roadmap-step">
      <span>02</span>
      <strong>Results</strong>
      <p>Document measurable achievements.</p>
    </div>
    <div class="roadmap-step">
      <span>03</span>
      <strong>Visibility</strong>
      <p>Build professional credibility.</p>
    </div>
    <div class="roadmap-step">
      <span>04</span>
      <strong>Opportunity</strong>
      <p>Target roles that match your value.</p>
    </div>
  </div>
  ${renderFooter()}
`);

}

/* ==========================================================
28. PROFILE
========================================================== */

function renderProfile() {
state.currentPage = “profile”;

updateHeader("Profile");
setActiveNav("profile");
setMain(`
  ${pageHeader(
    "My Profile",
    "Manage your Academy profile."
  )}
  <div class="profile-card">
    <div class="avatar-large">
      AZ
    </div>
    <div class="profile-form">
      <label>Name</label>
      <input
        id="profileName"
        class="tool-input"
        value="${esc(state.profile.name)}"
      >
      <label>Role</label>
      <input
        id="profileRole"
        class="tool-input"
        value="${esc(state.profile.role)}"
      >
      <button
        class="primary-button"
        onclick="window.ABA.saveProfile()">
        Save Profile
      </button>
    </div>
  </div>
  ${renderFooter()}
`);

}

function saveProfile() {
state.profile = {
name: $(“profileName”)?.value.trim() ||
DEFAULT_PROFILE.name,

  role: $("profileRole")?.value.trim() ||
    DEFAULT_PROFILE.role
};
writeJSON(
  STORAGE.profile,
  state.profile
);
updateProfileUI();
toast("Profile saved.");

}

function updateProfileUI() {
document.querySelectorAll(”.profile-name”).forEach(
function (element) {
element.textContent = state.profile.name;
}
);

document.querySelectorAll(".profile-role").forEach(
  function (element) {
    element.textContent = state.profile.role;
  }
);

}

/* ==========================================================
29. SETTINGS
========================================================== */

function renderSettings() {
state.currentPage = “settings”;

updateHeader("Settings");
setActiveNav("settings");
setMain(`
  ${pageHeader(
    "Settings",
    "Manage your Academy preferences."
  )}
  <div class="settings-card">
    <label class="setting-row">
      <span>
        <strong>Growth Mode</strong>
        <small>Keep your workspace focused on growth.</small>
      </span>
      <input
        type="checkbox"
        ${
          state.settings.growthMode
            ? "checked"
            : ""
        }
        onchange="window.ABA.toggleSetting('growthMode', this.checked)"
      >
    </label>
    <label class="setting-row">
      <span>
        <strong>Notifications</strong>
        <small>Enable Academy notifications.</small>
      </span>
      <input
        type="checkbox"
        ${
          state.settings.notifications
            ? "checked"
            : ""
        }
        onchange="window.ABA.toggleSetting('notifications', this.checked)"
      >
    </label>
  </div>
  <div class="tool-card">
    <span class="section-label">VERSION</span>
    <h3>Aung Business Academy ${VERSION}</h3>
    <p>
      Business Growth OS
    </p>
  </div>
  ${renderFooter()}
`);

}

function toggleSetting(key, value) {
state.settings[key] = !!value;

writeJSON(
  STORAGE.settings,
  state.settings
);
toast("Setting updated.");

}

/* ==========================================================
30. GROWTH PRO
========================================================== */

function renderGrowthPro() {
state.currentPage = “growth-pro”;

updateHeader("Growth Pro");
setActiveNav("growth-pro");
setMain(`
  ${pageHeader(
    "Growth Pro",
    "Unlock advanced business capability."
  )}
  <div class="premium-hero">
    <div class="premium-icon">👑</div>
    <span class="section-label">AUNG BUSINESS ACADEMY</span>
    <h2>Growth Pro</h2>
    <p>
      Advanced lessons, management tools,
      AI coaching and business intelligence.
    </p>
  </div>
  <div class="pricing-grid">
    <div class="pricing-card">
      <span>STARTER</span>
      <strong>Free</strong>
      <p>Core learning experience.</p>
      <button class="secondary-button">Current Plan</button>
    </div>
    <div class="pricing-card featured">
      <span>GROWTH PRO</span>
      <strong>Premium</strong>
      <p>Advanced lessons + tools + AI.</p>
      <button
        class="primary-button"
        onclick="window.ABA.showComingSoon()">
        Upgrade →
      </button>
    </div>
  </div>
  ${renderFooter()}
`);

}

function showComingSoon() {
showModal(`
    <div class="premium-icon">🚀</div>
    <h2>Growth Pro</h2>
    <p>
      Premium subscription system ကို
      နောက်အဆင့်မှာ ချိတ်ဆက်ပေးပါမယ်။
    </p>
    <p>
      အခုအချိန်မှာ Academy ရဲ့ learning,
      tools နဲ့ local progress system ကို အသုံးပြုနိုင်ပါတယ်။
    </p>
    <button
      class="primary-button"
      onclick="window.ABA.closeModal()">
      Continue
    </button>
  </div>
`);

}

/* ==========================================================
31. PAGE ROUTER
========================================================== */

function openPage(page) {
closeMobileMenu();

try {
  switch (page) {
    case "dashboard":
      renderDashboard();
      break;
    case "today":
      renderToday();
      break;
    case "goals":
      renderGoals();
      break;
    case "academy":
    case "business-foundation":
    case "leadership":
    case "strategy":
    case "marketing":
    case "sales":
    case "finance":
    case "people":
    case "operations":
      renderAcademy();
      break;
    case "lessons":
      renderLessons();
      break;
    case "progress":
      renderProgress();
      break;
    case "sales-target":
      renderSalesTarget();
      break;
    case "pricing":
      renderPricing();
      break;
    case "kpi":
      renderKPI();
      break;
    case "customer-plan":
      renderCustomerPlan();
      break;
    case "action-planner":
      renderActionPlanner();
      break;
    case "business-plan":
      renderBusinessPlan();
      break;
    case "performance":
      renderPerformance();
      break;
    case "sales-analysis":
      renderSalesAnalysis();
      break;
    case "profit-analysis":
      renderProfitAnalysis();
      break;
    case "reports":
      renderReports();
      break;
    case "ai-business-coach":
      renderAI(
        "ai-business-coach",
        "AI Business Coach",
        "Think through your business decisions."
      );
      break;
    case "ai-sales-coach":
      renderAI(
        "ai-sales-coach",
        "AI Sales Coach",
        "Improve sales execution and team performance."
      );
      break;
    case "ai-problem-solver":
      renderAI(
        "ai-problem-solver",
        "AI Problem Solver",
        "Break down business problems into practical actions."
      );
      break;
    case "cv-builder":
      renderCVBuilder();
      break;
    case "interview-coach":
      renderInterviewCoach();
      break;
    case "career-growth":
      renderCareerGrowth();
      break;
    case "profile":
      renderProfile();
      break;
    case "settings":
      renderSettings();
      break;
    case "growth-pro":
      renderGrowthPro();
      break;
    default:
      console.warn(
        "[ABA] Unknown page:",
        page
      );
      renderDashboard();
  }
} catch (error) {
  console.error(
    "[ABA] Page render error:",
    page,
    error
  );
  renderErrorPage(error, page);
}

}

/* ==========================================================
32. ERROR PAGE
========================================================== */

function renderErrorPage(error, page) {

updateHeader("Dashboard");
setMain(`
  <div class="error-state">
    <div class="error-icon">⚠️</div>
    <h1>Workspace Loading Error</h1>
    <p>
      Page "${esc(page)}" ကိုဖွင့်ရာမှာ
      ပြဿနာတစ်ခုဖြစ်သွားပါတယ်။
    </p>
    <p>
      Your saved learning progress ကို မဖျက်ထားပါဘူး။
    </p>
    <button
      class="primary-button"
      onclick="window.ABA.openPage('dashboard')">
      Return to Dashboard
    </button>
    <button
      class="secondary-button"
      onclick="window.location.reload()">
      Reload App
    </button>
  </div>
`);
console.error(
  "[ABA] Fatal page error:",
  error
);

}

/* ==========================================================
33. FOOTER
========================================================== */

function renderFooter() {
return `
    <strong>Aung Business Academy</strong>
    <span>Business Growth OS</span>
    <small>
      Learn • Plan • Execute • Measure • Improve
    </small>
    <small>
      © 2026 Aung Business Academy
    </small>
  </footer>
`;

}

/* ==========================================================
34. NAVIGATION EVENTS
========================================================== */

function bindNavigation() {

document.addEventListener(
  "click",
  function (event) {
    const nav = event.target.closest("[data-page]");
    if (nav) {
      event.preventDefault();
      const page = nav.dataset.page;
      if (page) {
        openPage(page);
      }
      return;
    }
    const menuButton =
      event.target.closest(
        "[data-mobile-menu], .menu-button, .hamburger"
      );
    if (menuButton) {
      event.preventDefault();
      openMobileMenu();
    }
    const overlay =
      event.target.closest("#mobileOverlay");
    if (overlay) {
      closeMobileMenu();
    }
  },
  false
);
const overlay = $("mobileOverlay");
if (overlay) {
  overlay.addEventListener(
    "click",
    closeMobileMenu
  );
}

}

/* ==========================================================
35. GLOBAL ERROR PROTECTION
========================================================== */

window.addEventListener(
“error”,
function (event) {

  console.error(
    "[ABA] Global JavaScript error:",
    event.error || event.message
  );
  const main = $("app-main");
  if (
    main &&
    main.innerText.includes(
      "Building your growth workspace"
    )
  ) {
    renderErrorPage(
      event.error || event.message,
      "initialization"
    );
  }
}

);

window.addEventListener(
“unhandledrejection”,
function (event) {

  console.error(
    "[ABA] Promise error:",
    event.reason
  );
}

);

/* ==========================================================
36. SAFE INITIALIZATION
========================================================== */

function init() {

console.log(
  "[ABA] Initializing Aung Business Academy",
  VERSION
);
try {
  loadLessons();
  bindNavigation();
  updateProfileUI();
  openPage("dashboard");
  console.log(
    "[ABA] Initialization complete."
  );
} catch (error) {
  console.error(
    "[ABA] Initialization failed:",
    error
  );
  renderErrorPage(
    error,
    "initialization"
  );
}

}

/* ==========================================================
37. PUBLIC API
========================================================== */

window.ABA = {
VERSION: VERSION,

state: state,
init: init,
openPage: openPage,
openLesson: openLesson,
closeModal: closeModal,
addTask: addTask,
toggleTask: toggleTask,
addGoal: addGoal,
updateGoal: updateGoal,
filterLessons: filterLessons,
completeLesson: completeLesson,
calculateSalesTarget: calculateSalesTarget,
calculatePricing: calculatePricing,
saveCustomerPlan: saveCustomerPlan,
saveBusinessPlan: saveBusinessPlan,
askAI: askAI,
quickAI: quickAI,
generateCV: generateCV,
saveProfile: saveProfile,
toggleSetting: toggleSetting,
showComingSoon: showComingSoon,
openCategory: function (category) {
  renderCategory(category);
}

};

/* ==========================================================
38. START
========================================================== */

if (
document.readyState === “loading”
) {

document.addEventListener(
  "DOMContentLoaded",
  init,
  { once: true }
);

} else {

init();

}

})();
