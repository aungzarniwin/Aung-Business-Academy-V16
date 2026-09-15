/* =========================================================
AUNG BUSINESS ACADEMY V16
BUSINESS GROWTH OS
app.js — FULL REPLACEMENT
========================================================= */

(() => {
“use strict”;

/* =======================================================
STORAGE
======================================================= */

const STORAGE = {
progress: “aba_v16_progress”,
goals: “aba_v16_goals”,
tasks: “aba_v16_tasks”,
profile: “aba_v16_profile”,
plan: “aba_v16_plan”,
settings: “aba_v16_settings”
};

const DEFAULT_PROFILE = {
name: “Aung Zar Ni Win”,
role: “Business Manager”,
company: “”,
phone: “”,
email: “”,
bio: “”
};

const DEFAULT_SETTINGS = {
notifications: true,
dailyGoal: 30,
compactMode: false
};

/* =======================================================
STATE
======================================================= */

const state = {
currentPage: “dashboard”,
currentLesson: null,
profile: load(STORAGE.profile, DEFAULT_PROFILE),
settings: load(STORAGE.settings, DEFAULT_SETTINGS),
progress: load(STORAGE.progress, {}),
goals: load(STORAGE.goals, []),
tasks: load(STORAGE.tasks, []),
plan: load(STORAGE.plan, “free”)
};

/* =======================================================
FALLBACK LESSONS
External lesson files can add more lessons.
======================================================= */

const FALLBACK_LESSONS = [
{
id: “foundation-01”,
course: “Business Management Foundation”,
category: “Business Foundation”,
title: “Manager တစ်ယောက်ရဲ့ အဓိကတာဝန်က ဘာလဲ?”,
duration: 15,
level: “Beginner”,
premium: false,
description: “Manager တစ်ယောက်ရဲ့ တကယ့်တာဝန်ကို လက်တွေ့ Business Situation နဲ့ လေ့လာပါ။”,
objectives: [
“Manager နဲ့ Staff ကွာခြားချက်ကို နားလည်ရန်”,
“Manager ရဲ့ အဓိကတာဝန်များကို သိရှိရန်”,
“Target ကို Team Action အဖြစ်ပြောင်းရန်”,
“Business Management Cycle ကို အသုံးချရန်”
],
sections: [
{
heading: “Real Business Situation”,
content: “Manager ဆိုတာ ရာထူးနာမည်တစ်ခုတည်း မဟုတ်ပါဘူး။ Manager ရဲ့ တန်ဖိုးက လူ၊ အချိန်၊ ငွေ၊ Resource တွေကို အသုံးချပြီး Business Result ထုတ်ပေးနိုင်ခြင်းမှာ ရှိပါတယ်။”
},
{
heading: “Why It Matters”,
content: “Individual Performer ကောင်းတာနဲ့ Team Performance ကောင်းတာ မတူပါဘူး။ Manager ရဲ့အလုပ်က ကိုယ်တိုင်အလုပ်အားလုံးလုပ်တာမဟုတ်ဘဲ Team တစ်ခုလုံး Result ရအောင် စီမံပေးတာဖြစ်ပါတယ်။”
},
{
heading: “Manager Framework”,
content: “Direction → People → Numbers → Execution ဆိုတဲ့ Framework ကို သုံးပါ။ ဘာကိုရောက်ရမလဲ၊ ဘယ်သူကဘာလုပ်မလဲ၊ Number ဘယ်လောက်ရပြီလဲ၊ Execution ဘယ်လိုရှိလဲဆိုတာ အမြဲကြည့်ပါ။”
},
{
heading: “Business Numbers”,
content: “Target, Actual, Achievement %, Growth %, Gross Profit, Margin, Customer, Distribution, Collection နဲ့ Expense တွေဟာ Manager တစ်ယောက်သိထားရမယ့် အခြေခံ Business Numbers တွေပါ။”
},
{
heading: “Manager Operating Cycle”,
content: “PLAN → EXECUTE → MEASURE → ANALYZE → IMPROVE → REPEAT ဆိုတဲ့ Cycle ကို နေ့စဉ်၊ အပတ်စဉ် အသုံးချပါ။”
},
{
heading: “Real Example”,
content: “Sales Team ၅ ယောက်ရဲ့ Monthly Target က 500M ဖြစ်ပြီး Actual က 430M ဆိုရင် Achievement 86% ဖြစ်ပါတယ်။ Market မကောင်းဘူးလို့ပဲ မပြောဘဲ Customer, Coverage, Stock, People နဲ့ Competition ကို Root Cause အဖြစ် ခွဲခြမ်းပါ။”
},
{
heading: “Practical Exercise”,
content: “သင့် Team ရဲ့ Target နဲ့ Actual ကို ရေးပါ။ Achievement % နဲ့ Gap ကိုတွက်ပါ။ Gap ဖြစ်စေတဲ့အကြောင်းရင်းကို People / Customer-Market / Execution အဖြစ် ခွဲပါ။ နောက် ၇ ရက် Action Plan တစ်ခုရေးပါ။”
},
{
heading: “Decision Challenge”,
content: “Salesperson တစ်ယောက် Target 100% ရပေမယ့် New Customer မရှာ၊ Team ကိုမကူညီ၊ Report နောက်ကျ၊ Customer Complaint များနေတယ်ဆိုရင် Result တစ်ခုတည်းနဲ့ မဆုံးဖြတ်ပါနဲ့။ RESULT + BEHAVIOR + FUTURE POTENTIAL ကို အတူကြည့်ပါ။”
},
{
heading: “Apply Tomorrow”,
content: “Team Member တစ်ယောက်ချင်းစီနဲ့ ၁၅ မိနစ်စကားပြောပါ။ Result ဘယ်လောက်လဲ? Problem ဘာလဲ? Next Action ဘာလဲ? ဆိုတဲ့ မေးခွန်း ၃ ခုကို မေးပြီး Support နဲ့ Follow-up လုပ်ပါ။”
}
],
keyPoints: [
“Manager ဆိုတာ Title မဟုတ်ဘဲ Business Result ထုတ်ပေးနိုင်သူဖြစ်တယ်။”,
“Numbers မသိဘဲ Business ကို မစီမံနိုင်ဘူး။”,
“Target → Actual → Gap → Root Cause → Action”,
“Manager ရဲ့အလုပ်က အားလုံးကို ကိုယ်တိုင်လုပ်တာမဟုတ်ဘူး။”,
“PLAN → EXECUTE → MEASURE → ANALYZE → IMPROVE → REPEAT”
]
},
{
id: “foundation-02”,
course: “Business Management Foundation”,
category: “Business Foundation”,
title: “Business ကို Numbers နဲ့ ဘယ်လိုစီမံမလဲ?”,
duration: 15,
level: “Beginner”,
premium: false,
description: “Business Manager တစ်ယောက်အတွက် အရေးကြီးတဲ့ Business Numbers တွေကို လက်တွေ့အသုံးချပါ။”,
objectives: [
“Target နဲ့ Actual ကို ခွဲခြားနိုင်ရန်”,
“Achievement နဲ့ Gap တွက်နိုင်ရန်”,
“Growth ကို နားလည်ရန်”,
“Number ကနေ Root Cause ရှာနိုင်ရန်”
],
sections: [
{
heading: “Real Business Situation”,
content: “Sales တက်နေတယ်ဆိုတာ Business က အမြဲကောင်းနေတယ်လို့ မဆိုလိုပါဘူး။ Sales တက်ပေမယ့် Margin ကျနိုင်ပါတယ်။ Revenue တက်ပေမယ့် Collection မရနိုင်ပါတယ်။”
},
{
heading: “Core Numbers”,
content: “Target, Actual, Achievement %, Gap, Growth %, Gross Profit, Gross Margin, Collection, Expense နဲ့ Customer Count တို့ကို အခြေခံ Numbers အဖြစ် စောင့်ကြည့်ပါ။”
},
{
heading: “Manager Rule”,
content: “Number တစ်ခုကိုမြင်ရုံနဲ့ မဆုံးဖြတ်ပါနဲ့။ Number → Change → Reason → Action ဆိုတဲ့ Logic နဲ့ စဉ်းစားပါ။”
},
{
heading: “Practical Example”,
content: “Monthly Target 100M၊ Actual 85M ဆိုရင် Achievement 85% ဖြစ်ပြီး Gap 15M ဖြစ်ပါတယ်။ Gap ကို Customer, Product, People, Execution အလိုက် ခွဲခြမ်းပါ။”
},
{
heading: “Apply Tomorrow”,
content: “မနက်တိုင်း Target, Yesterday Actual, MTD Actual, Achievement, Gap, Collection နဲ့ Key Problem ကို ၁၀ မိနစ်အတွင်း Review လုပ်ပါ။”
}
],
keyPoints: [
“Revenue တစ်ခုတည်းကို မကြည့်ပါနဲ့။”,
“Achievement % ကို ပုံမှန်ကြည့်ပါ။”,
“Gap ရှိရင် Root Cause ရှာပါ။”,
“Number တိုင်းမှာ Action တစ်ခုရှိရမယ်။”
]
},
{
id: “leadership-01”,
course: “Leadership”,
category: “Leadership”,
title: “Team Performance တိုးအောင် ဘယ်လိုဦးဆောင်မလဲ?”,
duration: 15,
level: “Intermediate”,
premium: true,
description: “Micromanagement မလုပ်ဘဲ Coaching နဲ့ Accountability တည်ဆောက်ပါ။”,
objectives: [
“Clear Expectation သတ်မှတ်ရန်”,
“Coaching နဲ့ Micromanagement ကွာခြားရန်”,
“Feedback ပေးနိုင်ရန်”,
“Accountability တည်ဆောက်ရန်”
],
sections: [
{
heading: “Leadership Principle”,
content: “Leader က လူတွေကို အမြဲလိုက်ထိန်းချုပ်နေရတာမဟုတ်ပါဘူး။ ဘာလုပ်ရမလဲ၊ ဘာကြောင့်လုပ်ရမလဲ၊ ဘယ် Result ကိုမျှော်လင့်လဲဆိုတာ ရှင်းလင်းစွာပြောပြီး Ownership ပေးရပါတယ်။”
},
{
heading: “Leadership Framework”,
content: “SET EXPECTATION → COACH → REVIEW → EMPOWER ဆိုတဲ့ Framework ကို အသုံးချပါ။”
},
{
heading: “Real Example”,
content: “Salesperson Target မရရင် အပြစ်တင်မယ့်အစား Customer Segment, Coverage, Conversion နဲ့ Activity ကို အတူတကွကြည့်ပြီး Next Action ချမှတ်ပါ။”
},
{
heading: “Apply Tomorrow”,
content: “Team Member တစ်ယောက်ကိုရွေးပြီး Goal တစ်ခု၊ Problem တစ်ခု၊ Next Action တစ်ခုကို အတူတကွ သတ်မှတ်ပါ။”
}
],
keyPoints: [
“Clear Expectation”,
“Coaching”,
“Regular Review”,
“Ownership”,
“Accountability”
]
}
];

/* =======================================================
HELPERS
======================================================= */

function load(key, fallback) {
try {
const value = localStorage.getItem(key);
return value ? JSON.parse(value) : fallback;
} catch (error) {
return fallback;
}
}

function save(key, value) {
try {
localStorage.setItem(key, JSON.stringify(value));
} catch (error) {
console.warn(“Storage error”, error);
}
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
return new Intl.NumberFormat(“en-US”, {
maximumFractionDigits: 0
}).format(Number(value) || 0);
}

function pct(value) {
const n = Number(value) || 0;
return ${n.toFixed(n % 1 === 0 ? 0 : 1)}%;
}

function calcAchievement(actual, target) {
const t = Number(target) || 0;
return t ? (Number(actual) / t) * 100 : 0;
}

function slug(value) {
return String(value || “”)
.toLowerCase()
.replace(/[^a-z0-9]+/g, “-”)
.replace(/^-|-$/g, “”);
}

function today() {
return new Date().toISOString().slice(0, 10);
}

function getLessons() {
const list = […FALLBACK_LESSONS];

const names = [
  "ABA_LESSONS",
  "ACADEMY_BUSINESS_FUNDAMENTALS",
  "ACADEMY_LEADERSHIP",
  "ACADEMY_STRATEGY",
  "ACADEMY_MARKETING",
  "ACADEMY_SALES",
  "ACADEMY_FINANCE",
  "ACADEMY_PEOPLE",
  "ACADEMY_OPERATIONS"
];
names.forEach((name) => {
  const data = window[name];
  if (Array.isArray(data)) {
    list.push(...data);
  } else if (data && Array.isArray(data.lessons)) {
    list.push(...data.lessons);
  }
});
const unique = new Map();
list.forEach((lesson, index) => {
  if (!lesson) return;
  const id =
    lesson.id ||
    `${slug(lesson.category || lesson.course || "lesson")}-${index}`;
  unique.set(id, {
    ...lesson,
    id,
    title: lesson.title || `Lesson ${index + 1}`,
    course: lesson.course || lesson.category || "Business Academy",
    category: lesson.category || "Business Foundation",
    duration: lesson.duration || 15,
    level: lesson.level || "Beginner",
    premium: Boolean(lesson.premium),
    sections: Array.isArray(lesson.sections) ? lesson.sections : [],
    objectives: Array.isArray(lesson.objectives)
      ? lesson.objectives
      : [],
    keyPoints: Array.isArray(lesson.keyPoints)
      ? lesson.keyPoints
      : []
  });
});
return Array.from(unique.values());

}

function completedCount() {
return getLessons().filter((l) => state.progress[l.id]).length;
}

function overallProgress() {
const total = getLessons().length;
return total ? Math.round((completedCount() / total) * 100) : 0;
}

function isComplete(id) {
return Boolean(state.progress[id]);
}

function categoryList() {
const map = new Map();

getLessons().forEach((lesson) => {
  if (!map.has(lesson.category)) {
    map.set(lesson.category, []);
  }
  map.get(lesson.category).push(lesson);
});
const defaults = [
  "Business Foundation",
  "Leadership",
  "Strategy",
  "Marketing",
  "Sales",
  "Finance",
  "People",
  "Operations"
];
defaults.forEach((category) => {
  if (!map.has(category)) {
    map.set(category, []);
  }
});
return Array.from(map.entries()).map(([name, lessons]) => ({
  name,
  lessons
}));

}

function iconForCategory(category) {
const icons = {
“Business Foundation”: “🏢”,
Leadership: “👥”,
Strategy: “♟️”,
Marketing: “📣”,
Sales: “📈”,
Finance: “💰”,
People: “🧑‍🤝‍🧑”,
Operations: “⚙️”
};

return icons[category] || "📚";

}

function toast(message, type = “success”) {
const container = document.getElementById(“toastContainer”);
if (!container) return;

const item = document.createElement("div");
item.className = `toast toast-${type}`;
item.innerHTML = `
  <span>${type === "success" ? "✓" : "!"}</span>
  <strong>${esc(message)}</strong>
`;
container.appendChild(item);
setTimeout(() => {
  item.classList.add("toast-hide");
  setTimeout(() => item.remove(), 300);
}, 2600);

}

function setMain(html) {
const main = document.getElementById(“app-main”);
if (!main) return;
main.innerHTML = html;
window.scrollTo({ top: 0, behavior: “smooth” });
}

function closeMobileMenu() {
document.body.classList.remove(“sidebar-open”);

const overlay = document.querySelector(".mobile-overlay");
if (overlay) overlay.classList.remove("show");

}

function openMobileMenu() {
document.body.classList.add(“sidebar-open”);

const overlay = document.querySelector(".mobile-overlay");
if (overlay) overlay.classList.add("show");

}

function updateHeader(title) {
const titleEl = document.querySelector(”.topbar-title”);
if (titleEl) titleEl.textContent = title;

const crumb = document.querySelector(".topbar-breadcrumb");
if (crumb) crumb.textContent = `AUNG BUSINESS ACADEMY / ${title.toUpperCase()}`;

}

function setActiveNav(page) {
document.querySelectorAll(”[data-page]”).forEach((el) => {
el.classList.toggle(
“active”,
el.getAttribute(“data-page”) === page
);
});
}

function pageHeader(title, subtitle, action = “”) {
return <div class="page-header"> <div> <div class="eyebrow">AUNG BUSINESS ACADEMY</div> <h1>${esc(title)}</h1> <p>${esc(subtitle || "")}</p> </div> ${action} </div>;
}

function card(title, content, extra = “”) {
return <section class="card ${extra}"> <div class="card-header"> <h3>${esc(title)}</h3> </div> <div class="card-body">${content}</div> </section>;
}

function lockedCard(title, description) {
return <div class="locked-card"> <div class="lock-icon">🔒</div> <h3>${esc(title)}</h3> <p>${esc(description)}</p> <button class="btn btn-primary" data-page="premium"> Upgrade to Growth Pro </button> </div>;
}

/* =======================================================
ROUTER
======================================================= */

function navigate(page, params = {}) {
state.currentPage = page;
state.currentLesson = params.lessonId || null;

closeMobileMenu();
render();

}

function render() {
const page = state.currentPage;

setActiveNav(page);
const titles = {
  dashboard: "Dashboard",
  today: "Today",
  goals: "My Goals",
  academy: "Business Academy",
  lessons: "Lessons",
  "business-foundation": "Business Foundation",
  leadership: "Leadership",
  strategy: "Strategy",
  marketing: "Marketing",
  sales: "Sales",
  finance: "Finance",
  people: "People",
  operations: "Operations",
  "sales-target": "Sales Target",
  pricing: "Pricing Calculator",
  kpi: "KPI & Scorecard",
  customer: "Customer Plan",
  planner: "Action Planner",
  "business-plan": "Business Plan",
  performance: "Performance",
  "sales-analysis": "Sales Analysis",
  "profit-analysis": "Profit Analysis",
  reports: "Reports",
  "ai-business": "AI Business Coach",
  "ai-sales": "AI Sales Coach",
  "ai-problem": "AI Problem Solver",
  "cv-builder": "CV Builder",
  interview: "Interview Coach",
  career: "Career Growth",
  profile: "Profile",
  settings: "Settings",
  premium: "Growth Pro"
};
updateHeader(titles[page] || "Dashboard");
const routes = {
  dashboard: renderDashboard,
  today: renderToday,
  goals: renderGoals,
  academy: renderAcademy,
  lessons: renderLessons,
  "business-foundation": () =>
    renderCategory("Business Foundation"),
  leadership: () => renderCategory("Leadership"),
  strategy: () => renderCategory("Strategy"),
  marketing: () => renderCategory("Marketing"),
  sales: () => renderCategory("Sales"),
  finance: () => renderCategory("Finance"),
  people: () => renderCategory("People"),
  operations: () => renderCategory("Operations"),
  "sales-target": renderSalesTarget,
  pricing: renderPricing,
  kpi: renderKPI,
  customer: renderCustomerPlan,
  planner: renderPlanner,
  "business-plan": renderBusinessPlan,
  performance: renderPerformance,
  "sales-analysis": renderSalesAnalysis,
  "profit-analysis": renderProfitAnalysis,
  reports: renderReports,
  "ai-business": () =>
    renderAI("AI Business Coach", "Business strategy, planning and decision support."),
  "ai-sales": () =>
    renderAI("AI Sales Coach", "Sales execution, team coaching and target achievement."),
  "ai-problem": () =>
    renderAI("AI Problem Solver", "Analyze business problems and build practical action plans."),
  "cv-builder": renderCVBuilder,
  interview: renderInterview,
  career: renderCareer,
  profile: renderProfile,
  settings: renderSettings,
  premium: renderPremium
};
const renderer = routes[page] || renderDashboard;
renderer();

}

/* =======================================================
DASHBOARD
======================================================= */

function renderDashboard() {
const lessons = getLessons();
const completed = completedCount();
const progress = overallProgress();

const nextLesson =
  lessons.find((lesson) => !isComplete(lesson.id)) || lessons[0];
const todayTasks = state.tasks.filter((task) => task.date === today());
const completedTasks = todayTasks.filter((task) => task.done).length;
const goalsActive = state.goals.filter((goal) => !goal.done).length;
setMain(`
  ${pageHeader(
    "Business Growth Dashboard",
    "Learn → Plan → Execute → Measure → Improve",
    `<button class="btn btn-primary" data-page="today">Today's Focus →</button>`
  )}
  <section class="dashboard-hero">
    <div class="hero-copy">
      <span class="badge">V16.0 • BUSINESS GROWTH OS</span>
      <h2>Build a better business,<br>one decision at a time.</h2>
      <p>
        Your learning, planning, execution and performance tools
        are connected in one professional workspace.
      </p>
      <div class="hero-actions">
        <button class="btn btn-primary" data-page="academy">
          Continue Learning
        </button>
        <button class="btn btn-secondary" data-page="sales-target">
          Open Manager Tools
        </button>
      </div>
    </div>
    <div class="hero-score">
      <div class="score-ring" style="--progress:${progress * 3.6}deg">
        <div>
          <strong>${progress}%</strong>
          <span>Learning</span>
        </div>
      </div>
      <small>${completed} of ${lessons.length} lessons completed</small>
    </div>
  </section>
  <div class="stats-grid">
    <div class="stat-card">
      <span class="stat-icon">📚</span>
      <small>Total Lessons</small>
      <strong>${lessons.length}</strong>
      <span>Available in Academy</span>
    </div>
    <div class="stat-card">
      <span class="stat-icon">✓</span>
      <small>Completed</small>
      <strong>${completed}</strong>
      <span>${progress}% overall progress</span>
    </div>
    <div class="stat-card">
      <span class="stat-icon">🎯</span>
      <small>Active Goals</small>
      <strong>${goalsActive}</strong>
      <span>Goals to execute</span>
    </div>
    <div class="stat-card">
      <span class="stat-icon">⚡</span>
      <small>Today's Tasks</small>
      <strong>${completedTasks}/${todayTasks.length}</strong>
      <span>Execution progress</span>
    </div>
  </div>
  <div class="dashboard-grid">
    ${card(
      "Continue Learning",
      nextLesson
        ? `
          <div class="continue-lesson">
            <div class="lesson-number">01</div>
            <div class="continue-info">
              <span>${esc(nextLesson.category)}</span>
              <h3>${esc(nextLesson.title)}</h3>
              <p>${esc(nextLesson.description || "")}</p>
              <div class="lesson-meta">
                <span>⏱ ${nextLesson.duration} min</span>
                <span>•</span>
                <span>${esc(nextLesson.level)}</span>
                ${nextLesson.premium ? "<span>• 🔒 Pro</span>" : ""}
              </div>
            </div>
            <button
              class="btn btn-primary"
              data-lesson="${esc(nextLesson.id)}">
              ${isComplete(nextLesson.id) ? "Review" : "Start Lesson"}
            </button>
          </div>
        `
        : `<div class="empty-state">No lessons available.</div>`
    )}
    ${card(
      "Today's Focus",
      `
        <div class="today-focus">
          <div class="focus-item">
            <span>🎯</span>
            <div>
              <strong>Set one business priority</strong>
              <small>Focus on the action with the highest impact.</small>
            </div>
          </div>
          <div class="focus-item">
            <span>📊</span>
            <div>
              <strong>Review your numbers</strong>
              <small>Target → Actual → Gap → Action.</small>
            </div>
          </div>
          <div class="focus-item">
            <span>👥</span>
            <div>
              <strong>Coach one team member</strong>
              <small>Ask about Result, Problem and Next Action.</small>
            </div>
          </div>
        </div>
      `
    )}
  </div>
  <section class="section-block">
    <div class="section-title-row">
      <div>
        <span class="eyebrow">YOUR GROWTH SYSTEM</span>
        <h2>Learn → Plan → Execute → Measure → Improve</h2>
      </div>
    </div>
    <div class="roadmap">
      <div class="roadmap-step">
        <b>01</b>
        <span>📚</span>
        <h3>Learn</h3>
        <p>Build practical business knowledge.</p>
      </div>
      <div class="roadmap-line"></div>
      <div class="roadmap-step">
        <b>02</b>
        <span>🎯</span>
        <h3>Plan</h3>
        <p>Turn knowledge into measurable goals.</p>
      </div>
      <div class="roadmap-line"></div>
      <div class="roadmap-step">
        <b>03</b>
        <span>⚡</span>
        <h3>Execute</h3>
        <p>Move from strategy to action.</p>
      </div>
      <div class="roadmap-line"></div>
      <div class="roadmap-step">
        <b>04</b>
        <span>📊</span>
        <h3>Measure</h3>
        <p>Track numbers and performance.</p>
      </div>
      <div class="roadmap-line"></div>
      <div class="roadmap-step">
        <b>05</b>
        <span>🔄</span>
        <h3>Improve</h3>
        <p>Find gaps and improve continuously.</p>
      </div>
    </div>
  </section>
`);

}

/* =======================================================
TODAY
======================================================= */

function renderToday() {
let tasks = state.tasks.filter((task) => task.date === today());

setMain(`
  ${pageHeader(
    "Today",
    "Turn your priorities into actions.",
    `<button class="btn btn-primary" id="addTaskBtn">+ Add Task</button>`
  )}
  <div class="stats-grid">
    <div class="stat-card">
      <small>Daily Goal</small>
      <strong>${state.settings.dailyGoal} min</strong>
      <span>Learning target</span>
    </div>
    <div class="stat-card">
      <small>Tasks</small>
      <strong>${tasks.length}</strong>
      <span>Today's actions</span>
    </div>
    <div class="stat-card">
      <small>Completed</small>
      <strong>${tasks.filter(t => t.done).length}</strong>
      <span>Execution</span>
    </div>
    <div class="stat-card">
      <small>Progress</small>
      <strong>${
        tasks.length
          ? Math.round(tasks.filter(t => t.done).length / tasks.length * 100)
          : 0
      }%</strong>
      <span>Today's execution</span>
    </div>
  </div>
  ${card(
    "Today's Action Plan",
    tasks.length
      ? `
        <div class="task-list">
          ${tasks.map((task) => `
            <label class="task-row ${task.done ? "done" : ""}">
              <input
                type="checkbox"
                data-task-toggle="${esc(task.id)}"
                ${task.done ? "checked" : ""}
              >
              <span class="task-check"></span>
              <span class="task-content">
                <strong>${esc(task.title)}</strong>
                <small>${esc(task.note || "Business action")}</small>
              </span>
              <span class="task-priority">${esc(task.priority || "Normal")}</span>
            </label>
          `).join("")}
        </div>
      `
      : `
        <div class="empty-state">
          <div>🎯</div>
          <h3>No tasks for today</h3>
          <p>Add 1–3 important actions that will move your business forward.</p>
          <button class="btn btn-primary" id="addTaskBtn2">+ Add First Task</button>
        </div>
      `
  )}
  ${card(
    "Manager Daily Routine",
    `
      <div class="checklist">
        <div>✓ Review yesterday's result</div>
        <div>✓ Check today's target</div>
        <div>✓ Identify the biggest gap</div>
        <div>✓ Coach one person</div>
        <div>✓ Confirm today's actions</div>
        <div>✓ Review progress before ending the day</div>
      </div>
    `
  )}
`);
document.querySelectorAll("[data-task-toggle]").forEach((input) => {
  input.addEventListener("change", () => {
    const id = input.dataset.taskToggle;
    const task = state.tasks.find((item) => item.id === id);
    if (task) {
      task.done = input.checked;
      save(STORAGE.tasks, state.tasks);
      renderToday();
    }
  });
});
document.getElementById("addTaskBtn")?.addEventListener("click", addTask);
document.getElementById("addTaskBtn2")?.addEventListener("click", addTask);

}

function addTask() {
showModal(
“Add Today’s Task”,
`
Task
      <div class="form-field full">
        <label>Note</label>
        <textarea id="taskNote" placeholder="Why is this important?"></textarea>
      </div>
      <div class="form-field">
        <label>Priority</label>
        <select id="taskPriority">
          <option>High</option>
          <option selected>Normal</option>
          <option>Low</option>
        </select>
      </div>
      <button class="btn btn-primary full" type="submit">
        Add Task
      </button>
    </form>
  `
);
document.getElementById("taskForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  state.tasks.push({
    id: `task-${Date.now()}`,
    date: today(),
    title: document.getElementById("taskTitle").value,
    note: document.getElementById("taskNote").value,
    priority: document.getElementById("taskPriority").value,
    done: false
  });
  save(STORAGE.tasks, state.tasks);
  closeModal();
  toast("Task added");
  renderToday();
});

}

/* =======================================================
GOALS
======================================================= */

function renderGoals() {
const goals = state.goals;

setMain(`
  ${pageHeader(
    "My Goals",
    "Create measurable goals and execute them.",
    `<button class="btn btn-primary" id="addGoalBtn">+ New Goal</button>`
  )}
  ${
    goals.length
      ? `
        <div class="goal-grid">
          ${goals.map((goal) => {
            const progress = goal.target
              ? Math.min(100, Math.round((goal.current / goal.target) * 100))
              : 0;
            return `
              <div class="goal-card ${goal.done ? "goal-done" : ""}">
                <div class="goal-top">
                  <span class="badge">${esc(goal.category || "Business")}</span>
                  <button class="icon-btn" data-delete-goal="${esc(goal.id)}">×</button>
                </div>
                <h3>${esc(goal.title)}</h3>
                <p>${esc(goal.deadline || "No deadline")}</p>
                <div class="progress-bar">
                  <span style="width:${progress}%"></span>
                </div>
                <div class="goal-values">
                  <strong>${money(goal.current)}</strong>
                  <span>/ ${money(goal.target)}</span>
                </div>
                <div class="goal-actions">
                  <button class="btn btn-secondary" data-update-goal="${esc(goal.id)}">
                    Update
                  </button>
                  ${
                    !goal.done
                      ? `<button class="btn btn-primary" data-complete-goal="${esc(goal.id)}">Complete</button>`
                      : `<span class="success-label">✓ Completed</span>`
                  }
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `
      : `
        <div class="empty-state">
          <div>🎯</div>
          <h3>No goals yet</h3>
          <p>Set your first measurable business goal.</p>
          <button class="btn btn-primary" id="addGoalBtn2">Create Goal</button>
        </div>
      `
  }
`);
document.getElementById("addGoalBtn")?.addEventListener("click", addGoal);
document.getElementById("addGoalBtn2")?.addEventListener("click", addGoal);
document.querySelectorAll("[data-delete-goal]").forEach((button) => {
  button.addEventListener("click", () => {
    state.goals = state.goals.filter(
      (goal) => goal.id !== button.dataset.deleteGoal
    );
    save(STORAGE.goals, state.goals);
    renderGoals();
  });
});
document.querySelectorAll("[data-complete-goal]").forEach((button) => {
  button.addEventListener("click", () => {
    const goal = state.goals.find(
      (item) => item.id === button.dataset.completeGoal
    );
    if (goal) {
      goal.done = true;
      goal.current = goal.target;
      save(STORAGE.goals, state.goals);
      toast("Goal completed");
      renderGoals();
    }
  });
});
document.querySelectorAll("[data-update-goal]").forEach((button) => {
  button.addEventListener("click", () => {
    const goal = state.goals.find(
      (item) => item.id === button.dataset.updateGoal
    );
    if (!goal) return;
    showModal(
      "Update Goal",
      `
        <form id="updateGoalForm" class="form-grid">
          <div class="form-field full">
            <label>Current Progress</label>
            <input id="goalCurrent" type="number" value="${goal.current}">
          </div>
          <button class="btn btn-primary full" type="submit">
            Save Progress
          </button>
        </form>
      `
    );
    document.getElementById("updateGoalForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      goal.current = Number(document.getElementById("goalCurrent").value) || 0;
      save(STORAGE.goals, state.goals);
      closeModal();
      renderGoals();
    });
  });
});

}

function addGoal() {
showModal(
“Create Business Goal”,
`
Goal
      <div class="form-field">
        <label>Category</label>
        <select id="goalCategory">
          <option>Sales</option>
          <option>Profit</option>
          <option>Customer</option>
          <option>People</option>
          <option>Career</option>
          <option>Business</option>
        </select>
      </div>
      <div class="form-field">
        <label>Target</label>
        <input id="goalTarget" type="number" required placeholder="100000000">
      </div>
      <div class="form-field">
        <label>Current</label>
        <input id="goalCurrent" type="number" value="0">
      </div>
      <div class="form-field">
        <label>Deadline</label>
        <input id="goalDeadline" type="date">
      </div>
      <button class="btn btn-primary full" type="submit">
        Create Goal
      </button>
    </form>
  `
);
document.getElementById("goalForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  state.goals.push({
    id: `goal-${Date.now()}`,
    title: document.getElementById("goalTitle").value,
    category: document.getElementById("goalCategory").value,
    target: Number(document.getElementById("goalTarget").value) || 0,
    current: Number(document.getElementById("goalCurrent").value) || 0,
    deadline: document.getElementById("goalDeadline").value,
    done: false
  });
  save(STORAGE.goals, state.goals);
  closeModal();
  toast("Goal created");
  renderGoals();
});

}

/* =======================================================
ACADEMY
======================================================= */

function renderAcademy() {
const cats = categoryList();

setMain(`
  ${pageHeader(
    "Business Academy",
    "Practical business learning for managers and entrepreneurs."
  )}
  <div class="academy-intro">
    <div>
      <span class="badge">PROFESSIONAL BUSINESS LEARNING</span>
      <h2>Build business capability, not just knowledge.</h2>
      <p>
        Every lesson is designed around real business situations,
        practical frameworks and actions you can apply immediately.
      </p>
    </div>
  </div>
  <div class="section-title-row">
    <div>
      <span class="eyebrow">MASTER BUSINESS</span>
      <h2>Learning Categories</h2>
    </div>
  </div>
  <div class="category-grid">
    ${cats.map((cat) => {
      const done = cat.lessons.filter((l) => isComplete(l.id)).length;
      const total = cat.lessons.length;
      return `
        <button
          class="category-card"
          data-page="${slug(cat.name)}"
        >
          <span class="category-icon">${iconForCategory(cat.name)}</span>
          <span class="category-content">
            <strong>${esc(cat.name)}</strong>
            <small>${total} lessons • ${done} completed</small>
          </span>
          <span class="category-arrow">→</span>
        </button>
      `;
    }).join("")}
  </div>
  ${card(
    "Recommended Learning Path",
    `
      <div class="learning-path">
        <div><b>01</b><span>Business Foundation</span><small>Understand how business works</small></div>
        <div><b>02</b><span>Leadership</span><small>Build high-performing teams</small></div>
        <div><b>03</b><span>Strategy</span><small>Make better decisions</small></div>
        <div><b>04</b><span>Marketing & Sales</span><small>Create revenue growth</small></div>
        <div><b>05</b><span>Finance</span><small>Understand profit and cash</small></div>
        <div><b>06</b><span>Operations</span><small>Build repeatable systems</small></div>
      </div>
    `
  )}
`);

}

function renderLessons() {
const lessons = getLessons();

setMain(`
  ${pageHeader(
    "Lessons",
    "Choose a lesson and start building practical business skills."
  )}
  <div class="lesson-filter">
    <input id="lessonSearch" placeholder="Search lessons...">
    <select id="lessonCategoryFilter">
      <option value="">All Categories</option>
      ${categoryList().map((c) => `<option>${esc(c.name)}</option>`).join("")}
    </select>
  </div>
  <div class="lesson-grid" id="lessonGrid">
    ${lessonCards(lessons)}
  </div>
`);
document.getElementById("lessonSearch")?.addEventListener("input", filterLessons);
document.getElementById("lessonCategoryFilter")?.addEventListener("change", filterLessons);

}

function lessonCards(lessons) {
if (!lessons.length) {
return <div class="empty-state"><h3>No lessons found</h3></div>;
}

return lessons.map((lesson, index) => `
  <article class="lesson-card ${lesson.premium ? "premium-lesson" : ""}">
    <div class="lesson-card-top">
      <span class="lesson-index">${String(index + 1).padStart(2, "0")}</span>
      ${lesson.premium ? `<span class="premium-label">PRO</span>` : `<span class="free-label">FREE</span>`}
    </div>
    <span class="eyebrow">${esc(lesson.category)}</span>
    <h3>${esc(lesson.title)}</h3>
    <p>${esc(lesson.description || "")}</p>
    <div class="lesson-meta">
      <span>⏱ ${lesson.duration} min</span>
      <span>${esc(lesson.level)}</span>
      ${isComplete(lesson.id) ? "<span>✓ Completed</span>" : ""}
    </div>
    <button class="btn ${lesson.premium && state.plan !== "pro" ? "btn-secondary" : "btn-primary"}"
            data-lesson="${esc(lesson.id)}">
      ${
        lesson.premium && state.plan !== "pro"
          ? "🔒 Unlock"
          : isComplete(lesson.id)
            ? "Review Lesson"
            : "Start Lesson"
      }
    </button>
  </article>
`).join("");

}

function filterLessons() {
const search =
document.getElementById(“lessonSearch”)?.value.toLowerCase() || “”;

const category =
  document.getElementById("lessonCategoryFilter")?.value || "";
const filtered = getLessons().filter((lesson) => {
  const matchesSearch =
    !search ||
    lesson.title.toLowerCase().includes(search) ||
    (lesson.description || "").toLowerCase().includes(search);
  const matchesCategory =
    !category || lesson.category === category;
  return matchesSearch && matchesCategory;
});
const grid = document.getElementById("lessonGrid");
if (grid) grid.innerHTML = lessonCards(filtered);

}

function renderCategory(category) {
const lessons = getLessons().filter(
(lesson) => lesson.category === category
);

const done = lessons.filter((lesson) => isComplete(lesson.id)).length;
setMain(`
  ${pageHeader(
    category,
    `${done} of ${lessons.length} lessons completed`,
    `<button class="btn btn-secondary" data-page="academy">← Academy</button>`
  )}
  <div class="course-overview">
    <div class="course-icon">${iconForCategory(category)}</div>
    <div>
      <span class="badge">${esc(category)}</span>
      <h2>${esc(category)} Mastery</h2>
      <p>Practical lessons designed for real-world business execution.</p>
    </div>
  </div>
  <div class="progress-summary">
    <div>
      <strong>${lessons.length ? Math.round(done / lessons.length * 100) : 0}%</strong>
      <span>Course Progress</span>
    </div>
    <div class="progress-bar">
      <span style="width:${lessons.length ? done / lessons.length * 100 : 0}%"></span>
    </div>
  </div>
  <div class="lesson-grid">
    ${lessonCards(lessons)}
  </div>
`);

}

/* =======================================================
LESSON DETAIL
======================================================= */

function openLesson(id) {
const lesson = getLessons().find((item) => item.id === id);

if (!lesson) {
  toast("Lesson not found", "error");
  return;
}
if (lesson.premium && state.plan !== "pro") {
  navigate("premium");
  toast("This lesson is part of Growth Pro", "error");
  return;
}
state.currentLesson = id;
renderLessonDetail(lesson);

}

function renderLessonDetail(lesson) {
const complete = isComplete(lesson.id);

setMain(`
  <div class="lesson-detail-page">
    <div class="lesson-detail-top">
      <button class="btn btn-secondary" id="backLessonBtn">
        ← Back to Lessons
      </button>
      <span class="badge">${esc(lesson.category)}</span>
    </div>
    <div class="lesson-detail-layout">
      <article class="lesson-content">
        <div class="lesson-title-block">
          <span class="eyebrow">${esc(lesson.course)}</span>
          <h1>${esc(lesson.title)}</h1>
          <p>${esc(lesson.description || "")}</p>
          <div class="lesson-meta large">
            <span>⏱ ${lesson.duration} minutes</span>
            <span>•</span>
            <span>${esc(lesson.level)}</span>
            ${complete ? `<span>• ✓ Completed</span>` : ""}
          </div>
        </div>
        ${
          lesson.objectives.length
            ? `
              <div class="lesson-objectives">
                <h3>ဒီ Lesson ပြီးသွားရင်...</h3>
                <ul>
                  ${lesson.objectives.map((item) => `<li>✓ ${esc(item)}</li>`).join("")}
                </ul>
              </div>
            `
            : ""
        }
        ${
          lesson.sections.length
            ? lesson.sections.map((section, index) => `
              <section class="lesson-section">
                <div class="section-number">${String(index + 1).padStart(2, "0")}</div>
                <div>
                  <span class="eyebrow">${esc(section.heading)}</span>
                  <p>${esc(section.content)}</p>
                </div>
              </section>
            `).join("")
            : `<div class="empty-state">Lesson content coming soon.</div>`
        }
        ${
          lesson.keyPoints.length
            ? `
              <div class="key-points-box">
                <span class="eyebrow">KEY TAKEAWAYS</span>
                <h2>အဓိကမှတ်ထားရမယ့်အချက်များ</h2>
                <ul>
                  ${lesson.keyPoints.map((point) => `<li>✓ ${esc(point)}</li>`).join("")}
                </ul>
              </div>
            `
            : ""
        }
        <div class="lesson-complete-box">
          ${
            complete
              ? `
                <div>
                  <strong>✓ Lesson Completed</strong>
                  <p>ဒီ Lesson ကို ပြီးမြောက်ထားပါတယ်။</p>
                </div>
                <button class="btn btn-secondary" data-page="lessons">
                  Continue Learning
                </button>
              `
              : `
                <div>
                  <strong>Ready to apply?</strong>
                  <p>ဒီ Lesson မှာ သင်ယူထားတာကို လက်တွေ့အသုံးချပါ။</p>
                </div>
                <button class="btn btn-primary" id="completeLessonBtn">
                  ✓ Mark as Completed
                </button>
              `
          }
        </div>
      </article>
      <aside class="lesson-sidebar">
        <div class="lesson-side-card">
          <span class="eyebrow">YOUR PROGRESS</span>
          <strong>${overallProgress()}%</strong>
          <div class="progress-bar">
            <span style="width:${overallProgress()}%"></span>
          </div>
          <small>${completedCount()} lessons completed</small>
        </div>
        <div class="lesson-side-card">
          <span class="eyebrow">APPLY TOMORROW</span>
          <p>
            Lesson ထဲက အချက်တစ်ခုကို ရွေးပြီး
            နောက်အလုပ်လုပ်ရက်မှာ လက်တွေ့အသုံးချပါ။
          </p>
        </div>
      </aside>
    </div>
  </div>
`);
document.getElementById("backLessonBtn")?.addEventListener("click", () => {
  navigate("lessons");
});
document.getElementById("completeLessonBtn")?.addEventListener("click", () => {
  state.progress[lesson.id] = {
    completedAt: new Date().toISOString()
  };
  save(STORAGE.progress, state.progress);
  toast("Lesson completed successfully");
  renderLessonDetail(lesson);
});

}

/* =======================================================
SALES TARGET CALCULATOR
======================================================= */

function renderSalesTarget() {
setMain(`
${pageHeader(
“Sales Target Calculator”,
“Convert business targets into practical daily and team targets.”
)}

  <div class="calculator-layout">
    ${card(
      "Target Inputs",
      `
        <form id="salesTargetForm" class="form-grid">
          <div class="form-field">
            <label>Monthly Target</label>
            <input id="monthlyTarget" type="number" placeholder="100000000" required>
          </div>
          <div class="form-field">
            <label>Working Days</label>
            <input id="workingDays" type="number" value="26" required>
          </div>
          <div class="form-field">
            <label>Team Size</label>
            <input id="teamSize" type="number" value="5" required>
          </div>
          <div class="form-field">
            <label>Average Order Value</label>
            <input id="aov" type="number" value="100000" required>
          </div>
          <button class="btn btn-primary full" type="submit">
            Calculate Target
          </button>
        </form>
      `
    )}
    <div id="salesTargetResult"></div>
  </div>
`);
document.getElementById("salesTargetForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const monthly = Number(document.getElementById("monthlyTarget").value) || 0;
  const days = Number(document.getElementById("workingDays").value) || 1;
  const team = Number(document.getElementById("teamSize").value) || 1;
  const aov = Number(document.getElementById("aov").value) || 1;
  const daily = monthly / days;
  const perPerson = monthly / team;
  const dailyPerPerson = daily / team;
  const orders = monthly / aov;
  const dailyOrders = orders / days;
  document.getElementById("salesTargetResult").innerHTML = `
    <div class="result-panel">
      <span class="eyebrow">CALCULATION RESULT</span>
      <h2>Monthly Target: ${money(monthly)}</h2>
      <div class="result-grid">
        <div>
          <small>Daily Team Target</small>
          <strong>${money(daily)}</strong>
        </div>
        <div>
          <small>Per Person / Month</small>
          <strong>${money(perPerson)}</strong>
        </div>
        <div>
          <small>Per Person / Day</small>
          <strong>${money(dailyPerPerson)}</strong>
        </div>
        <div>
          <small>Required Orders / Month</small>
          <strong>${money(orders)}</strong>
        </div>
        <div>
          <small>Required Orders / Day</small>
          <strong>${dailyOrders.toFixed(1)}</strong>
        </div>
      </div>
      <div class="insight-box">
        <strong>Manager Insight</strong>
        <p>
          Monthly Target ကို Daily Target နဲ့ Individual Target အဖြစ်
          ခွဲပြီး Team တစ်ခုချင်းစီကို ရှင်းလင်းစွာ ပေးနိုင်ပါပြီ။
        </p>
      </div>
    </div>
  `;
});

}

/* =======================================================
PRICING CALCULATOR
======================================================= */

function renderPricing() {
setMain(`
${pageHeader(
“Pricing Calculator”,
“Understand cost, margin, markup and selling price.”
)}

  <div class="calculator-layout">
    ${card(
      "Pricing Inputs",
      `
        <form id="pricingForm" class="form-grid">
          <div class="form-field">
            <label>Product Cost</label>
            <input id="productCost" type="number" placeholder="70000" required>
          </div>
          <div class="form-field">
            <label>Desired Margin %</label>
            <input id="desiredMargin" type="number" value="30" required>
          </div>
          <div class="form-field">
            <label>Quantity</label>
            <input id="priceQuantity" type="number" value="1">
          </div>
          <button class="btn btn-primary full" type="submit">
            Calculate Price
          </button>
        </form>
      `
    )}
    <div id="pricingResult"></div>
  </div>
`);
document.getElementById("pricingForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const cost = Number(document.getElementById("productCost").value) || 0;
  const margin = Number(document.getElementById("desiredMargin").value) || 0;
  const quantity = Number(document.getElementById("priceQuantity").value) || 1;
  const price = margin >= 100
    ? 0
    : cost / (1 - margin / 100);
  const profit = price - cost;
  const total = price * quantity;
  document.getElementById("pricingResult").innerHTML = `
    <div class="result-panel">
      <span class="eyebrow">RECOMMENDED PRICE</span>
      <h2>${money(price)} MMK</h2>
      <div class="result-grid">
        <div>
          <small>Cost</small>
          <strong>${money(cost)}</strong>
        </div>
        <div>
          <small>Margin</small>
          <strong>${pct(margin)}</strong>
        </div>
        <div>
          <small>Profit / Unit</small>
          <strong>${money(profit)}</strong>
        </div>
        <div>
          <small>Total / Quantity</small>
          <strong>${money(total)}</strong>
        </div>
      </div>
    </div>
  `;
});

}

/* =======================================================
KPI
======================================================= */

function renderKPI() {
setMain(`
${pageHeader(
“KPI & Scorecard”,
“Measure the numbers that matter.”
)}

  <div class="kpi-grid">
    <div class="kpi-card">
      <span>📈</span>
      <small>Sales Achievement</small>
      <strong id="kpiSales">0%</strong>
      <input id="kpiSalesInput" type="number" placeholder="Achievement %">
    </div>
    <div class="kpi-card">
      <span>👥</span>
      <small>Team Productivity</small>
      <strong id="kpiTeam">0%</strong>
      <input id="kpiTeamInput" type="number" placeholder="Productivity %">
    </div>
    <div class="kpi-card">
      <span>🏪</span>
      <small>Distribution</small>
      <strong id="kpiDistribution">0%</strong>
      <input id="kpiDistributionInput" type="number" placeholder="Distribution %">
    </div>
    <div class="kpi-card">
      <span>💰</span>
      <small>Collection</small>
      <strong id="kpiCollection">0%</strong>
      <input id="kpiCollectionInput" type="number" placeholder="Collection %">
    </div>
  </div>
  ${card(
    "Manager Score",
    `
      <div class="manager-score-result" id="managerScore">
        Enter KPI values above to calculate your score.
      </div>
    `
  )}
`);
const inputs = document.querySelectorAll(
  "#kpiSalesInput,#kpiTeamInput,#kpiDistributionInput,#kpiCollectionInput"
);
inputs.forEach((input) => {
  input.addEventListener("input", calculateKPI);
});

}

function calculateKPI() {
const values = [
Number(document.getElementById(“kpiSalesInput”)?.value) || 0,
Number(document.getElementById(“kpiTeamInput”)?.value) || 0,
Number(document.getElementById(“kpiDistributionInput”)?.value) || 0,
Number(document.getElementById(“kpiCollectionInput”)?.value) || 0
];

document.getElementById("kpiSales").textContent = pct(values[0]);
document.getElementById("kpiTeam").textContent = pct(values[1]);
document.getElementById("kpiDistribution").textContent = pct(values[2]);
document.getElementById("kpiCollection").textContent = pct(values[3]);
const score = values.reduce((a, b) => a + b, 0) / 4;
let level = "Needs Improvement";
if (score >= 90) level = "Excellent";
else if (score >= 80) level = "Strong";
else if (score >= 70) level = "Good";
else if (score >= 60) level = "Developing";
document.getElementById("managerScore").innerHTML = `
  <strong>${pct(score)}</strong>
  <span>${level}</span>
  <p>
    Overall score ကို တစ်ခုတည်းမကြည့်ဘဲ KPI တစ်ခုချင်းစီရဲ့ Gap ကို
    Action Plan အဖြစ်ပြောင်းလဲပါ။
  </p>
`;

}

/* =======================================================
CUSTOMER PLAN
======================================================= */

function renderCustomerPlan() {
setMain(`
${pageHeader(
“Customer Plan”,
“Plan customers by value, potential and action.”
)}

  ${card(
    "Customer Planning Framework",
    `
      <div class="framework-grid">
        <div><b>01</b><strong>Current Value</strong><p>လက်ရှိ Revenue ဘယ်လောက်ပေးနေလဲ?</p></div>
        <div><b>02</b><strong>Potential</strong><p>နောက်ထပ် ဘယ်လောက်တိုးနိုင်လဲ?</p></div>
        <div><b>03</b><strong>Problem</strong><p>ဘာက Growth ကိုတားနေလဲ?</p></div>
        <div><b>04</b><strong>Action</strong><p>နောက်တစ်ဆင့် ဘာလုပ်မလဲ?</p></div>
      </div>
    `
  )}
  ${card(
    "Customer Action Template",
    `
      <div class="form-grid">
        <div class="form-field">
          <label>Customer</label>
          <input id="customerName" placeholder="Customer name">
        </div>
        <div class="form-field">
          <label>Current Sales</label>
          <input id="customerSales" type="number">
        </div>
        <div class="form-field">
          <label>Potential Sales</label>
          <input id="customerPotential" type="number">
        </div>
        <div class="form-field full">
          <label>Main Problem</label>
          <textarea id="customerProblem"></textarea>
        </div>
        <div class="form-field full">
          <label>Next Action</label>
          <textarea id="customerAction"></textarea>
        </div>
        <button class="btn btn-primary" id="saveCustomerPlan">
          Save Plan
        </button>
      </div>
    `
  )}
`);
document.getElementById("saveCustomerPlan")?.addEventListener("click", () => {
  toast("Customer plan saved");
});

}

/* =======================================================
ACTION PLANNER
======================================================= */

function renderPlanner() {
setMain(`
${pageHeader(
“Action Planner”,
“Turn a business problem into a clear action plan.”
)}

  ${card(
    "7-Day Action Plan",
    `
      <form id="plannerForm" class="form-grid">
        <div class="form-field full">
          <label>Business Problem</label>
          <textarea id="plannerProblem" required placeholder="What is the main problem?"></textarea>
        </div>
        <div class="form-field">
          <label>Root Cause</label>
          <input id="plannerCause" required placeholder="Why is it happening?">
        </div>
        <div class="form-field">
          <label>Owner</label>
          <input id="plannerOwner" placeholder="Who will own it?">
        </div>
        <div class="form-field full">
          <label>Action</label>
          <textarea id="plannerAction" required placeholder="What will you do?"></textarea>
        </div>
        <div class="form-field">
          <label>Measure</label>
          <input id="plannerMeasure" placeholder="How will you measure success?">
        </div>
        <div class="form-field">
          <label>Deadline</label>
          <input id="plannerDeadline" type="date">
        </div>
        <button class="btn btn-primary full" type="submit">
          Create Action Plan
        </button>
      </form>
    `
  )}
  <div id="plannerResult"></div>
`);
document.getElementById("plannerForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = `
    <div class="result-panel">
      <span class="eyebrow">ACTION PLAN</span>
      <h2>Problem → Root Cause → Action → Measure</h2>
      <div class="action-plan">
        <div><b>Problem</b><p>${esc(document.getElementById("plannerProblem").value)}</p></div>
        <div><b>Root Cause</b><p>${esc(document.getElementById("plannerCause").value)}</p></div>
        <div><b>Owner</b><p>${esc(document.getElementById("plannerOwner").value)}</p></div>
        <div><b>Action</b><p>${esc(document.getElementById("plannerAction").value)}</p></div>
        <div><b>Measure</b><p>${esc(document.getElementById("plannerMeasure").value)}</p></div>
        <div><b>Deadline</b><p>${esc(document.getElementById("plannerDeadline").value)}</p></div>
      </div>
    </div>
  `;
  document.getElementById("plannerResult").innerHTML = result;
  toast("Action plan created");
});

}

/* =======================================================
BUSINESS PLAN
======================================================= */

function renderBusinessPlan() {
setMain(`
${pageHeader(
“Business Plan”,
“Build a simple but practical business plan.”
)}

  ${card(
    "Business Growth Plan",
    `
      <form id="businessPlanForm" class="form-grid">
        <div class="form-field full">
          <label>Business / Project</label>
          <input id="bpBusiness" placeholder="Business name">
        </div>
        <div class="form-field full">
          <label>Customer</label>
          <textarea id="bpCustomer" placeholder="Who is your target customer?"></textarea>
        </div>
        <div class="form-field full">
          <label>Problem</label>
          <textarea id="bpProblem" placeholder="What problem are you solving?"></textarea>
        </div>
        <div class="form-field full">
          <label>Solution / Product</label>
          <textarea id="bpSolution" placeholder="What are you offering?"></textarea>
        </div>
        <div class="form-field">
          <label>Monthly Revenue Target</label>
          <input id="bpRevenue" type="number">
        </div>
        <div class="form-field">
          <label>Target Margin %</label>
          <input id="bpMargin" type="number" value="30">
        </div>
        <div class="form-field full">
          <label>90-Day Growth Goal</label>
          <textarea id="bpGoal"></textarea>
        </div>
        <button class="btn btn-primary full" type="submit">
          Generate Business Plan
        </button>
      </form>
    `
  )}
  <div id="businessPlanResult"></div>
`);
document.getElementById("businessPlanForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const business = document.getElementById("bpBusiness").value;
  const customer = document.getElementById("bpCustomer").value;
  const problem = document.getElementById("bpProblem").value;
  const solution = document.getElementById("bpSolution").value;
  const revenue = Number(document.getElementById("bpRevenue").value) || 0;
  const margin = Number(document.getElementById("bpMargin").value) || 0;
  const goal = document.getElementById("bpGoal").value;
  state.planData = {
    business,
    customer,
    problem,
    solution,
    revenue,
    margin,
    goal
  };
  save("aba_v16_business_plan", state.planData);
  document.getElementById("businessPlanResult").innerHTML = `
    <div class="business-plan-output">
      <span class="badge">BUSINESS PLAN</span>
      <h2>${esc(business || "My Business")}</h2>
      <div class="plan-section">
        <h3>Customer</h3>
        <p>${esc(customer)}</p>
      </div>
      <div class="plan-section">
        <h3>Problem</h3>
        <p>${esc(problem)}</p>
      </div>
      <div class="plan-section">
        <h3>Solution</h3>
        <p>${esc(solution)}</p>
      </div>
      <div class="plan-metrics">
        <div>
          <small>Revenue Target</small>
          <strong>${money(revenue)}</strong>
        </div>
        <div>
          <small>Target Margin</small>
          <strong>${pct(margin)}</strong>
        </div>
      </div>
      <div class="plan-section">
        <h3>90-Day Goal</h3>
        <p>${esc(goal)}</p>
      </div>
      <div class="insight-box">
        <strong>Next Step</strong>
        <p>
          ဒီ Plan ကို Action Planner ထဲမှာ 7-Day Action အဖြစ် ခွဲပြီး
          Execution စတင်ပါ။
        </p>
      </div>
    </div>
  `;
  toast("Business plan generated");
});

}

/* =======================================================
PERFORMANCE
======================================================= */

function renderPerformance() {
const lessons = getLessons();
const completed = completedCount();
const progress = overallProgress();

const goalsDone = state.goals.filter((g) => g.done).length;
const goalsTotal = state.goals.length;
setMain(`
  ${pageHeader(
    "Performance",
    "See your learning and execution performance."
  )}
  <div class="stats-grid">
    <div class="stat-card">
      <small>Learning</small>
      <strong>${progress}%</strong>
      <span>${completed}/${lessons.length} lessons</span>
    </div>
    <div class="stat-card">
      <small>Goals</small>
      <strong>${goalsTotal ? Math.round(goalsDone / goalsTotal * 100) : 0}%</strong>
      <span>${goalsDone}/${goalsTotal} completed</span>
    </div>
    <div class="stat-card">
      <small>Tasks</small>
      <strong>${state.tasks.filter(t => t.done).length}</strong>
      <span>Completed actions</span>
    </div>
    <div class="stat-card">
      <small>Plan</small>
      <strong>${state.plan === "pro" ? "PRO" : "FREE"}</strong>
      <span>Current membership</span>
    </div>
  </div>
  ${card(
    "Growth Score",
    `
      <div class="growth-score">
        <div class="score-ring large" style="--progress:${progress * 3.6}deg">
          <div>
            <strong>${progress}%</strong>
            <span>Learning</span>
          </div>
        </div>
        <div>
          <h3>Your Growth System</h3>
          <p>
            Knowledge တစ်ခုတည်းမဟုတ်ဘဲ Learning + Goals + Execution
            ကို အတူတကွတိုးတက်အောင်လုပ်ပါ။
          </p>
          <button class="btn btn-primary" data-page="today">
            Continue Execution
          </button>
        </div>
      </div>
    `
  )}
`);

}

/* =======================================================
SALES ANALYSIS
======================================================= */

function renderSalesAnalysis() {
setMain(`
${pageHeader(
“Sales Analysis”,
“Analyze sales performance using Target, Actual and Gap.”
)}

  ${card(
    "Sales Performance Analyzer",
    `
      <form id="salesAnalysisForm" class="form-grid">
        <div class="form-field">
          <label>Target</label>
          <input id="saTarget" type="number" value="100000000">
        </div>
        <div class="form-field">
          <label>Actual</label>
          <input id="saActual" type="number" value="85000000">
        </div>
        <div class="form-field">
          <label>Previous Period</label>
          <input id="saPrevious" type="number" value="80000000">
        </div>
        <button class="btn btn-primary full" type="submit">
          Analyze
        </button>
      </form>
    `
  )}
  <div id="salesAnalysisResult"></div>
`);
document.getElementById("salesAnalysisForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = Number(document.getElementById("saTarget").value) || 0;
  const actual = Number(document.getElementById("saActual").value) || 0;
  const previous = Number(document.getElementById("saPrevious").value) || 0;
  const achievement = calcAchievement(actual, target);
  const gap = target - actual;
  const growth = previous ? ((actual - previous) / previous) * 100 : 0;
  document.getElementById("salesAnalysisResult").innerHTML = `
    <div class="result-panel">
      <span class="eyebrow">SALES ANALYSIS</span>
      <div class="result-grid">
        <div>
          <small>Achievement</small>
          <strong>${pct(achievement)}</strong>
        </div>
        <div>
          <small>Gap</small>
          <strong>${money(gap)}</strong>
        </div>
        <div>
          <small>Growth</small>
          <strong>${pct(growth)}</strong>
        </div>
      </div>
      <div class="insight-box">
        <strong>Manager Diagnosis</strong>
        <p>
          ${achievement >= 100
            ? "Target achieved. Focus on sustainable growth and margin."
            : "Target gap ရှိနေပါတယ်။ Customer, Coverage, Product, People နဲ့ Execution Root Cause တွေကို ခွဲခြမ်းပါ။"}
        </p>
      </div>
    </div>
  `;
});

}

/* =======================================================
PROFIT ANALYSIS
======================================================= */

function renderProfitAnalysis() {
setMain(`
${pageHeader(
“Profit Analysis”,
“Revenue ကောင်းရုံနဲ့ မလုံလောက်ပါဘူး — Profit ကို နားလည်ပါ။”
)}

  ${card(
    "Profit Analyzer",
    `
      <form id="profitForm" class="form-grid">
        <div class="form-field">
          <label>Revenue</label>
          <input id="profitRevenue" type="number" value="100000000">
        </div>
        <div class="form-field">
          <label>Cost of Goods</label>
          <input id="profitCOGS" type="number" value="70000000">
        </div>
        <div class="form-field">
          <label>Operating Expenses</label>
          <input id="profitExpense" type="number" value="15000000">
        </div>
        <button class="btn btn-primary full" type="submit">
          Analyze Profit
        </button>
      </form>
    `
  )}
  <div id="profitResult"></div>
`);
document.getElementById("profitForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const revenue = Number(document.getElementById("profitRevenue").value) || 0;
  const cogs = Number(document.getElementById("profitCOGS").value) || 0;
  const expense = Number(document.getElementById("profitExpense").value) || 0;
  const grossProfit = revenue - cogs;
  const netProfit = grossProfit - expense;
  const grossMargin = revenue ? grossProfit / revenue * 100 : 0;
  const netMargin = revenue ? netProfit / revenue * 100 : 0;
  document.getElementById("profitResult").innerHTML = `
    <div class="result-panel">
      <span class="eyebrow">PROFIT ANALYSIS</span>
      <div class="result-grid">
        <div>
          <small>Gross Profit</small>
          <strong>${money(grossProfit)}</strong>
        </div>
        <div>
          <small>Gross Margin</small>
          <strong>${pct(grossMargin)}</strong>
        </div>
        <div>
          <small>Net Profit</small>
          <strong>${money(netProfit)}</strong>
        </div>
        <div>
          <small>Net Margin</small>
          <strong>${pct(netMargin)}</strong>
        </div>
      </div>
      <div class="insight-box">
        <strong>Manager Insight</strong>
        <p>
          Revenue တိုးလာတာနဲ့အတူ Gross Margin နဲ့ Net Margin ကိုပါ
          စောင့်ကြည့်ပါ။
        </p>
      </div>
    </div>
  `;
});

}

/* =======================================================
REPORTS
======================================================= */

function renderReports() {
const completed = completedCount();
const total = getLessons().length;

setMain(`
  ${pageHeader(
    "Reports",
    "A simple management summary for your current workspace."
  )}
  <div class="report-grid">
    <div class="report-card">
      <span>📚</span>
      <small>Academy</small>
      <strong>${completed}/${total}</strong>
      <p>Lessons completed</p>
    </div>
    <div class="report-card">
      <span>🎯</span>
      <small>Goals</small>
      <strong>${state.goals.length}</strong>
      <p>Business goals created</p>
    </div>
    <div class="report-card">
      <span>⚡</span>
      <small>Actions</small>
      <strong>${state.tasks.length}</strong>
      <p>Actions in workspace</p>
    </div>
    <div class="report-card">
      <span>💎</span>
      <small>Plan</small>
      <strong>${state.plan === "pro" ? "PRO" : "FREE"}</strong>
      <p>Current plan</p>
    </div>
  </div>
  ${card(
    "Management Review",
    `
      <div class="review-list">
        <div><strong>1. Result</strong><span>What did we achieve?</span></div>
        <div><strong>2. Gap</strong><span>Where are we below target?</span></div>
        <div><strong>3. Cause</strong><span>Why did the gap happen?</span></div>
        <div><strong>4. Action</strong><span>What will we do next?</span></div>
        <div><strong>5. Measure</strong><span>How will we know it worked?</span></div>
      </div>
    `
  )}
`);

}

/* =======================================================
AI PAGES
======================================================= */

function renderAI(title, subtitle) {
const locked = state.plan !== “pro”;

setMain(`
  ${pageHeader(
    title,
    subtitle
  )}
  ${
    locked
      ? lockedCard(
          title,
          "Growth Pro မှာ AI Business Intelligence, coaching prompts နဲ့ practical decision support ပါဝင်ပါမယ်။"
        )
      : `
        ${card(
          "AI Coach",
          `
            <div class="ai-chat">
              <div class="ai-welcome">
                <span class="ai-avatar">🤖</span>
                <div>
                  <strong>မင်္ဂလာပါ ${esc(state.profile.name)}</strong>
                  <p>သင့် Business Problem ကို ပြောပြပါ။</p>
                </div>
              </div>
              <textarea id="aiQuestion"
                placeholder="ဥပမာ — Sales target မရတာကို ဘယ်လိုရှာပြီး ဖြေရှင်းရမလဲ?"></textarea>
              <button class="btn btn-primary" id="askAI">
                Ask AI Coach
              </button>
              <div id="aiAnswer"></div>
            </div>
          `
        )}
      `
  )}
`);
if (!locked) {
  document.getElementById("askAI")?.addEventListener("click", () => {
    const question = document.getElementById("aiQuestion").value.trim();
    if (!question) {
      toast("Please enter your question", "error");
      return;
    }
    document.getElementById("aiAnswer").innerHTML = `
      <div class="ai-answer">
        <span class="eyebrow">BUSINESS COACH FRAMEWORK</span>
        <h3>အရင်ဆုံး Problem ကို ၄ ပိုင်းခွဲပါ</h3>
        <ol>
          <li>Current Result — လက်ရှိ Result ဘယ်လောက်လဲ?</li>
          <li>Gap — Target နဲ့ ဘယ်လောက်ကွာလဲ?</li>
          <li>Root Cause — ဘာကြောင့်ဖြစ်တာလဲ?</li>
          <li>Next Action — နောက် ၇ ရက်အတွင်း ဘာလုပ်မလဲ?</li>
        </ol>
        <p>
          AI API မချိတ်ဆက်ရသေးတဲ့ V16 base version ဖြစ်တဲ့အတွက်
          အခုအချိန်မှာ ဒီနေရာက Business Coaching Framework အဖြစ်
          အလုပ်လုပ်ပါတယ်။
        </p>
      </div>
    `;
  });
}

}

/* =======================================================
CV BUILDER
======================================================= */

function renderCVBuilder() {
setMain(`
${pageHeader(
“CV Builder”,
“Build a professional management CV.”
)}

  ${card(
    "Professional CV Information",
    `
      <form id="cvForm" class="form-grid">
        <div class="form-field">
          <label>Full Name</label>
          <input id="cvName" value="${esc(state.profile.name)}">
        </div>
        <div class="form-field">
          <label>Professional Title</label>
          <input id="cvTitle" value="Sales Manager | Business Growth">
        </div>
        <div class="form-field full">
          <label>Professional Summary</label>
          <textarea id="cvSummary">Experienced sales and business professional focused on revenue growth, team leadership, market expansion and execution excellence.</textarea>
        </div>
        <div class="form-field full">
          <label>Key Skills</label>
          <textarea id="cvSkills">Sales Management, Team Leadership, Distributor Management, Market Expansion, KPI Management, Business Analysis, Customer Development</textarea>
        </div>
        <button class="btn btn-primary full" type="submit">
          Generate CV Preview
        </button>
      </form>
    `
  )}
  <div id="cvResult"></div>
`);
document.getElementById("cvForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("cvResult").innerHTML = `
    <div class="cv-preview">
      <h1>${esc(document.getElementById("cvName").value)}</h1>
      <h3>${esc(document.getElementById("cvTitle").value)}</h3>
      <hr>
      <h2>Professional Summary</h2>
      <p>${esc(document.getElementById("cvSummary").value)}</p>
      <h2>Core Skills</h2>
      <p>${esc(document.getElementById("cvSkills").value)}</p>
      <button class="btn btn-secondary" onclick="window.print()">
        Print / Save PDF
      </button>
    </div>
  `;
  toast("CV preview generated");
});

}

/* =======================================================
INTERVIEW COACH
======================================================= */

function renderInterview() {
const questions = [
{
q: “Tell me about yourself.”,
hint: “Career experience → strengths → current role → future goal”
},
{
q: “How do you manage sales targets?”,
hint: “Target → breakdown → field execution → review → action”
},
{
q: “How do you handle an underperforming salesperson?”,
hint: “Data → root cause → coaching → action plan → follow-up”
},
{
q: “How do you motivate a sales team?”,
hint: “Clear expectation → recognition → coaching → ownership”
},
{
q: “How do you analyze a sales gap?”,
hint: “Customer → coverage → product → people → competition”
},
{
q: “Why should we hire you?”,
hint: “Experience + measurable results + leadership + business mindset”
}
];

setMain(`
  ${pageHeader(
    "Interview Coach",
    "Practice management and sales interview questions."
  )}
  <div class="interview-grid">
    ${questions.map((item, index) => `
      <div class="interview-card">
        <span>Q${index + 1}</span>
        <h3>${esc(item.q)}</h3>
        <p><strong>Answer Framework:</strong> ${esc(item.hint)}</p>
        <button class="btn btn-secondary"
                data-interview="${index}">
          Practice
        </button>
      </div>
    `).join("")}
  </div>
  <div id="interviewPractice"></div>
`);
document.querySelectorAll("[data-interview]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = questions[Number(button.dataset.interview)];
    document.getElementById("interviewPractice").innerHTML = `
      <div class="practice-panel">
        <span class="eyebrow">INTERVIEW PRACTICE</span>
        <h2>${esc(item.q)}</h2>
        <textarea id="interviewAnswer"
          placeholder="Type your answer here..."></textarea>
        <div class="insight-box">
          <strong>Framework</strong>
          <p>${esc(item.hint)}</p>
        </div>
        <button class="btn btn-primary" id="saveInterview">
          Save Practice
        </button>
      </div>
    `;
    document.getElementById("saveInterview")?.addEventListener("click", () => {
      toast("Interview practice saved");
    });
  });
});

}

/* =======================================================
CAREER
======================================================= */

function renderCareer() {
setMain(`
${pageHeader(
“Career Growth”,
“Build the skills required for the next level of management.”
)}

  <div class="career-grid">
    <div class="career-card">
      <span>01</span>
      <h3>Sales Leadership</h3>
      <p>Target, team management, coaching and execution.</p>
      <button class="btn btn-secondary" data-page="sales">Learn</button>
    </div>
    <div class="career-card">
      <span>02</span>
      <h3>Business Finance</h3>
      <p>Revenue, margin, profit and business decision making.</p>
      <button class="btn btn-secondary" data-page="finance">Learn</button>
    </div>
    <div class="career-card">
      <span>03</span>
      <h3>Strategic Thinking</h3>
      <p>Understand market, competition and growth opportunities.</p>
      <button class="btn btn-secondary" data-page="strategy">Learn</button>
    </div>
    <div class="career-card">
      <span>04</span>
      <h3>Executive Communication</h3>
      <p>Present numbers, problems and decisions clearly.</p>
      <button class="btn btn-secondary" data-page="interview">Practice</button>
    </div>
  </div>
  ${card(
    "Career Growth Formula",
    `
      <div class="formula-box">
        <strong>VALUE = RESULTS + LEADERSHIP + BUSINESS THINKING + COMMUNICATION</strong>
        <p>
          Next-level Manager ဖြစ်ချင်ရင် ကိုယ်တိုင် Result ရတာတင်မက
          Team Result နဲ့ Business Impact ကိုပါ ပြနိုင်ရပါမယ်။
        </p>
      </div>
    `
  )}
`);

}

/* =======================================================
PROFILE
======================================================= */

function renderProfile() {
setMain(`
${pageHeader(
“Profile”,
“Manage your professional profile.”
)}

  ${card(
    "Professional Profile",
    `
      <form id="profileForm" class="form-grid">
        <div class="form-field">
          <label>Name</label>
          <input id="profileName" value="${esc(state.profile.name)}">
        </div>
        <div class="form-field">
          <label>Role</label>
          <input id="profileRole" value="${esc(state.profile.role)}">
        </div>
        <div class="form-field">
          <label>Company</label>
          <input id="profileCompany" value="${esc(state.profile.company)}">
        </div>
        <div class="form-field">
          <label>Phone</label>
          <input id="profilePhone" value="${esc(state.profile.phone)}">
        </div>
        <div class="form-field full">
          <label>Email</label>
          <input id="profileEmail" type="email" value="${esc(state.profile.email)}">
        </div>
        <div class="form-field full">
          <label>Professional Bio</label>
          <textarea id="profileBio">${esc(state.profile.bio)}</textarea>
        </div>
        <button class="btn btn-primary full" type="submit">
          Save Profile
        </button>
      </form>
    `
  )}
`);
document.getElementById("profileForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  state.profile = {
    name: document.getElementById("profileName").value,
    role: document.getElementById("profileRole").value,
    company: document.getElementById("profileCompany").value,
    phone: document.getElementById("profilePhone").value,
    email: document.getElementById("profileEmail").value,
    bio: document.getElementById("profileBio").value
  };
  save(STORAGE.profile, state.profile);
  updateProfileUI();
  toast("Profile saved");
});

}

function updateProfileUI() {
document.querySelectorAll(”.profile-name”).forEach((el) => {
el.textContent = state.profile.name;
});

document.querySelectorAll(".profile-role").forEach((el) => {
  el.textContent = state.profile.role;
});

}

/* =======================================================
SETTINGS
======================================================= */

function renderSettings() {
setMain(`
${pageHeader(
“Settings”,
“Customize your Business Academy workspace.”
)}

  ${card(
    "Workspace Settings",
    `
      <div class="settings-list">
        <div class="setting-row">
          <div>
            <strong>Notifications</strong>
            <p>Show workspace notifications.</p>
          </div>
          <label class="switch">
            <input id="settingNotifications"
              type="checkbox"
              ${state.settings.notifications ? "checked" : ""}>
            <span></span>
          </label>
        </div>
        <div class="setting-row">
          <div>
            <strong>Daily Learning Goal</strong>
            <p>Minutes per day.</p>
          </div>
          <input
            id="settingDailyGoal"
            class="small-input"
            type="number"
            value="${state.settings.dailyGoal}">
        </div>
        <div class="setting-row">
          <div>
            <strong>Compact Mode</strong>
            <p>Reduce workspace spacing.</p>
          </div>
          <label class="switch">
            <input id="settingCompact"
              type="checkbox"
              ${state.settings.compactMode ? "checked" : ""}>
            <span></span>
          </label>
        </div>
      </div>
      <button class="btn btn-primary" id="saveSettings">
        Save Settings
      </button>
    `
  )}
  ${card(
    "Data Management",
    `
      <div class="settings-actions">
        <button class="btn btn-secondary" id="resetProgress">
          Reset Learning Progress
        </button>
        <button class="btn btn-danger" id="resetAll">
          Reset App Data
        </button>
      </div>
    `
  )}
`);
document.getElementById("saveSettings")?.addEventListener("click", () => {
  state.settings.notifications =
    document.getElementById("settingNotifications").checked;
  state.settings.dailyGoal =
    Number(document.getElementById("settingDailyGoal").value) || 30;
  state.settings.compactMode =
    document.getElementById("settingCompact").checked;
  save(STORAGE.settings, state.settings);
  document.body.classList.toggle(
    "compact-mode",
    state.settings.compactMode
  );
  toast("Settings saved");
});
document.getElementById("resetProgress")?.addEventListener("click", () => {
  if (!confirm("Reset all lesson progress?")) return;
  state.progress = {};
  save(STORAGE.progress, state.progress);
  toast("Learning progress reset");
  renderSettings();
});
document.getElementById("resetAll")?.addEventListener("click", () => {
  if (!confirm("Reset all Aung Business Academy data?")) return;
  Object.values(STORAGE).forEach((key) => {
    localStorage.removeItem(key);
  });
  location.reload();
});

}

/* =======================================================
PREMIUM
======================================================= */

function renderPremium() {
const pro = state.plan === “pro”;

setMain(`
  ${pageHeader(
    "Growth Pro",
    "Unlock the full Business Growth OS."
  )}
  <section class="premium-hero">
    <span class="badge">AUNG BUSINESS ACADEMY</span>
    <h1>Growth Pro</h1>
    <p>
      Learn deeper. Plan smarter. Execute faster.
    </p>
    ${
      pro
        ? `
          <div class="pro-active">
            <strong>✓ Growth Pro Active</strong>
            <p>Your workspace is currently using the Pro plan.</p>
          </div>
        `
        : `
          <div class="pricing-highlight">
            <span>COMING SOON</span>
            <strong>Growth Pro</strong>
            <p>Premium subscription system will be connected in the next release.</p>
            <button class="btn btn-primary" id="activateDemoPro">
              Activate Demo Pro
            </button>
          </div>
        `
    }
  </section>
  <div class="premium-feature-grid">
    <div>
      <span>📚</span>
      <h3>Advanced Academy</h3>
      <p>Advanced management lessons and frameworks.</p>
    </div>
    <div>
      <span>🤖</span>
      <h3>AI Business Coach</h3>
      <p>Business decision and planning support.</p>
    </div>
    <div>
      <span>📊</span>
      <h3>Advanced Analytics</h3>
      <p>Performance, sales and profit analysis.</p>
    </div>
    <div>
      <span>💼</span>
      <h3>Career Tools</h3>
      <p>Professional CV and interview tools.</p>
    </div>
  </div>
`);
document.getElementById("activateDemoPro")?.addEventListener("click", () => {
  state.plan = "pro";
  save(STORAGE.plan, state.plan);
  toast("Demo Growth Pro activated");
  renderPremium();
});

}

/* =======================================================
MODAL
======================================================= */

function showModal(title, content) {
const modal = document.getElementById(“globalModal”);

if (!modal) return;
modal.innerHTML = `
  <div class="modal-backdrop" data-close-modal></div>
  <div class="modal-dialog">
    <div class="modal-header">
      <h2>${esc(title)}</h2>
      <button class="modal-close" data-close-modal>×</button>
    </div>
    <div class="modal-content">
      ${content}
    </div>
  </div>
`;
modal.classList.add("show");
modal.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", closeModal);
});

}

function closeModal() {
const modal = document.getElementById(“globalModal”);
if (!modal) return;

modal.classList.remove("show");
modal.innerHTML = "";

}

/* =======================================================
GLOBAL EVENTS
======================================================= */

function setupEvents() {

document.addEventListener("click", (event) => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    const page = pageButton.dataset.page;
    if (page) {
      event.preventDefault();
      navigate(page);
      return;
    }
  }
  const lessonButton = event.target.closest("[data-lesson]");
  if (lessonButton) {
    event.preventDefault();
    openLesson(lessonButton.dataset.lesson);
  }
  const menuButton = event.target.closest("[data-menu-toggle]");
  if (menuButton) {
    event.preventDefault();
    openMobileMenu();
  }
  const closeButton = event.target.closest("[data-menu-close]");
  if (closeButton) {
    event.preventDefault();
    closeMobileMenu();
  }
});
document.querySelector(".mobile-overlay")?.addEventListener(
  "click",
  closeMobileMenu
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeMobileMenu();
  }
});

}

/* =======================================================
TOPBAR / MOBILE BUTTON COMPATIBILITY
======================================================= */

function ensureMobileMenuButton() {
const sidebar = document.querySelector(”.sidebar”);
const topbar = document.querySelector(”.topbar”);

if (!sidebar || !topbar) return;
let button = topbar.querySelector("[data-menu-toggle]");
if (!button) {
  button = document.createElement("button");
  button.className = "mobile-menu-btn";
  button.setAttribute("data-menu-toggle", "true");
  button.setAttribute("aria-label", "Open menu");
  button.innerHTML = "☰";
  topbar.prepend(button);
}
let close = sidebar.querySelector("[data-menu-close]");
if (!close) {
  close = document.createElement("button");
  close.className = "sidebar-close";
  close.setAttribute("data-menu-close", "true");
  close.setAttribute("aria-label", "Close menu");
  close.innerHTML = "×";
  sidebar.prepend(close);
}

}

/* =======================================================
NAVIGATION COMPATIBILITY
======================================================= */

function normalizeNavigation() {
document.querySelectorAll(”[data-page]”).forEach((item) => {
item.setAttribute(“role”, “button”);
});
}

/* =======================================================
FOOTER
======================================================= */

function ensureFooter() {
const main = document.getElementById(“app-main”);

if (!main) return;
let footer = document.querySelector(".app-footer");
if (!footer) {
  footer = document.createElement("footer");
  footer.className = "app-footer";
  footer.innerHTML = `
    <strong>Aung Business Academy</strong>
    <span>Business Growth OS</span>
    <small>Learn • Plan • Execute • Measure • Improve</small>
    <small>© 2026 Aung Business Academy</small>
  `;
  main.parentNode.appendChild(footer);
}

}

/* =======================================================
INITIAL TASKS
======================================================= */

function initializeTasks() {
if (!Array.isArray(state.tasks)) {
state.tasks = [];
}

if (!Array.isArray(state.goals)) {
  state.goals = [];
}
if (!state.profile || typeof state.profile !== "object") {
  state.profile = { ...DEFAULT_PROFILE };
}
if (!state.settings || typeof state.settings !== "object") {
  state.settings = { ...DEFAULT_SETTINGS };
}

}

/* =======================================================
INITIALIZE
======================================================= */

function init() {
initializeTasks();
ensureMobileMenuButton();
normalizeNavigation();
setupEvents();
ensureFooter();
updateProfileUI();

document.body.classList.toggle(
  "compact-mode",
  state.settings.compactMode
);
render();

}

/* =======================================================
GLOBAL API
======================================================= */

window.AungBusinessAcademy = {
navigate,
render,
openLesson,
getLessons,
state,
completeLesson(id) {
state.progress[id] = {
completedAt: new Date().toISOString()
};

  save(STORAGE.progress, state.progress);
  render();
},
resetProgress() {
  state.progress = {};
  save(STORAGE.progress, state.progress);
  render();
}

};

/* =======================================================
START
======================================================= */

if (document.readyState === “loading”) {
document.addEventListener(“DOMContentLoaded”, init);
} else {
init();
}

})();
