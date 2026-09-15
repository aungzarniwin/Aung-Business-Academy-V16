/* =========================================================
   AUNG BUSINESS ACADEMY V16
   BUSINESS GROWTH OS
   ERROR-SAFE APPLICATION CORE
   ========================================================= */

var APP_VERSION = "16.1";
var initialized = false;
var rendering = false;

var KEYS = {
    progress: "aba_v16_progress",
    goals: "aba_v16_goals",
    tasks: "aba_v16_tasks",
    profile: "aba_v16_profile",
    settings: "aba_v16_settings",
    plan: "aba_v16_business_plan"
};

var DEFAULT_PROFILE = {
    name: "Aung Zar Ni Win",
    role: "Business Manager"
};

var DEFAULT_SETTINGS = {
    growthMode: true,
    notifications: true
};

var FALLBACK_LESSONS = [
    {
        id: "foundation-01",
        course: "Business Foundation",
        category: "Business Foundation",
        title: "Manager တစ်ယောက်ရဲ့ အဓိကတာဝန်က ဘာလဲ?",
        duration: 15,
        premium: false,
        description: "Manager တစ်ယောက်အနေနဲ့ လူ၊ နံပါတ်နဲ့ Execution ကို ဘယ်လိုစီမံမလဲ?",
        sections: [
            {
                title: "Real Business Situation",
                content: "Sales Target 500 သိန်းရှိတဲ့ Team တစ်ခုက Actual 430 သိန်းပဲ ရရှိနေတယ်ဆိုပါစို့။ Manager ရဲ့တာဝန်က ကိုယ်တိုင်အကုန်လိုက်ရောင်းဖို့မဟုတ်ဘဲ Gap ရဲ့ Root Cause ကိုရှာပြီး Team ကို Action ချမှတ်ပေးဖို့ ဖြစ်ပါတယ်။"
            },
            {
                title: "Why It Matters",
                content: "Excellent Staff ဖြစ်တာနဲ့ Excellent Manager ဖြစ်တာ မတူပါဘူး။ Manager က ကိုယ်တိုင် Result ထုတ်တာထက် Team ကနေ Result ထွက်လာအောင် System တည်ဆောက်ရပါတယ်။"
            },
            {
                title: "Manager Framework",
                content: "Manager ရဲ့ အဓိကအလုပ်တွေက Direction, People, Numbers, Execution ဖြစ်ပါတယ်။ Target → Actual → Gap → Root Cause → Action ဆိုတဲ့ Cycle ကို အမြဲအသုံးပြုပါ။"
            },
            {
                title: "Real Example",
                content: "Target 500M၊ Actual 430M ဖြစ်ရင် Achievement = 86% ဖြစ်ပါတယ်။ Gap = 70M ဖြစ်ပါတယ်။ Customer coverage၊ Stock availability၊ Team productivity၊ Competition စတာတွေကို Root Cause အနေနဲ့ စစ်ဆေးရပါမယ်။"
            },
            {
                title: "Practical Exercise",
                content: "သင့် Team ရဲ့ လက်ရှိ Target နဲ့ Actual ကိုရေးပါ။ Gap ကိုတွက်ပါ။ Gap ဖြစ်ရတဲ့ အကြောင်းရင်း 3 ခုရေးပြီး နောက် 7 ရက်အတွင်း လုပ်မယ့် Action 3 ခု သတ်မှတ်ပါ။"
            },
            {
                title: "Decision Challenge",
                content: "Team Member တစ်ယောက်ရဲ့ Sales ကျနေတယ်ဆိုရင် Manager က သူ့အစား အလုပ်လုပ်ပေးမလား၊ ဒါမှမဟုတ် Root Cause ရှာပြီး Coaching လုပ်မလား? ရေရှည်အတွက် Coaching + Accountability ကိုရွေးပါ။"
            },
            {
                title: "Key Takeaways",
                content: "Manager = Direction + People + Numbers + Execution. Manager က အလုပ်အားလုံးကို ကိုယ်တိုင်လုပ်သူမဟုတ်ပါ။ Team ကို Result ထုတ်နိုင်အောင် System တည်ဆောက်သူဖြစ်ပါတယ်။"
            },
            {
                title: "Apply Tomorrow",
                content: "မနက်ဖြန် Team Meeting မှာ Target → Actual → Gap → Root Cause → Action ကို 15 မိနစ်အတွင်း ပြန်လည်သုံးသပ်ပါ။"
            }
        ]
    },
    {
        id: "foundation-02",
        course: "Business Foundation",
        category: "Business Foundation",
        title: "Business ကို Numbers နဲ့ ဘယ်လိုစီမံမလဲ?",
        duration: 15,
        premium: false,
        description: "Business Decision တွေကို Data နဲ့ချမှတ်နိုင်အောင် အခြေခံ Numbers တွေကို လေ့လာပါ။",
        sections: [
            {
                title: "Real Business Situation",
                content: "Sales တက်နေသော်လည်း Profit ကျနေတဲ့ Business တွေရှိပါတယ်။ Revenue တစ်ခုတည်းကိုကြည့်ပြီး Business ကောင်းတယ်လို့ မဆုံးဖြတ်သင့်ပါဘူး။"
            },
            {
                title: "Why It Matters",
                content: "Manager တစ်ယောက်အနေနဲ့ Revenue, Cost, Profit, Margin, Cash Flow, Achievement စတဲ့ Numbers တွေကို နားလည်ရပါမယ်။"
            },
            {
                title: "Manager Framework",
                content: "Target, Actual, Achievement %, Growth %, Gross Profit, Margin, Customer, Distribution, Collection နဲ့ Expense ကို ပုံမှန်စောင့်ကြည့်ပါ။"
            },
            {
                title: "Real Example",
                content: "Target 100M၊ Actual 90M ဆိုရင် Achievement = 90% ဖြစ်ပါတယ်။ Gap = 10M ဖြစ်ပါတယ်။ Gap ကို Product, People, Customer, Territory နဲ့ Execution အလိုက် ခွဲခြမ်းပါ။"
            },
            {
                title: "Practical Exercise",
                content: "သင့် Business ရဲ့ Target, Actual, Achievement နဲ့ Gap ကို ဒီနေ့တွက်ကြည့်ပါ။"
            },
            {
                title: "Decision Challenge",
                content: "Sales 20% တက်ပေမယ့် Margin 5% ကျနေတယ်ဆိုရင် Sales တက်တာကိုပဲ ကြည့်မလား? မကြည့်သင့်ပါဘူး။ Revenue နဲ့ Profit နှစ်ခုလုံးကို ကြည့်ရပါမယ်။"
            },
            {
                title: "Key Takeaways",
                content: "Numbers က Business ရဲ့ Language ဖြစ်ပါတယ်။ Data မရှိရင် Decision က Guess ဖြစ်နိုင်ပါတယ်။"
            },
            {
                title: "Apply Tomorrow",
                content: "Daily Dashboard တစ်ခုမှာ Target, Actual, Achievement, Gap နဲ့ Profit ကို ထည့်သွင်းစောင့်ကြည့်ပါ။"
            }
        ]
    },
    {
        id: "leadership-01",
        course: "Leadership",
        category: "Leadership",
        title: "Team Performance တိုးအောင် ဘယ်လိုဦးဆောင်မလဲ?",
        duration: 15,
        premium: false,
        description: "Team ကို Micromanage မလုပ်ဘဲ Performance တိုးတက်အောင် ဦးဆောင်နည်း။",
        sections: [
            {
                title: "Real Business Situation",
                content: "Team Performance မကောင်းတဲ့အခါ Manager က အလုပ်အားလုံးကို ကိုယ်တိုင်လိုက်လုပ်ရင် ရေရှည်မှာ Team မတိုးတက်ပါဘူး။"
            },
            {
                title: "Why It Matters",
                content: "Strong Manager ဆိုတာ လူတိုင်းကို ကိုယ်တိုင်ထိန်းချုပ်သူမဟုတ်ဘဲ Team Member တစ်ယောက်ချင်းစီကို Ownership ရှိလာအောင်လုပ်ပေးနိုင်သူ ဖြစ်ပါတယ်။"
            },
            {
                title: "Manager Framework",
                content: "Clear Expectations → Coaching → Regular Review → Feedback → Accountability ဆိုတဲ့ Leadership Cycle ကို အသုံးပြုပါ။"
            },
            {
                title: "Real Example",
                content: "Sales Representative တစ်ယောက်ရဲ့ Target မပြည့်ရင် သူ့အစား Customer Visit လိုက်မလုပ်ပေးဘဲ ဘယ် Customer တွေ၊ ဘယ် Product တွေ၊ ဘယ် Activity တွေမှာ Gap ဖြစ်နေလဲ ရှာဖွေပါ။"
            },
            {
                title: "Practical Exercise",
                content: "Team Member တစ်ယောက်ကိုရွေးပြီး သူ့ရဲ့ Strength 2 ခု၊ Improvement Area 2 ခုနဲ့ Next Action 2 ခုရေးပါ။"
            },
            {
                title: "Decision Challenge",
                content: "Manager က Team ကို အမြဲပြောပြပြီး အမြဲစစ်ဆေးနေရမလား? မဟုတ်ပါဘူး။ Clear Expectation ပေးပြီး Ownership ပေးရပါမယ်။"
            },
            {
                title: "Key Takeaways",
                content: "Leadership ရဲ့ ရည်ရွယ်ချက်က Team ကို Manager မရှိလည်း အလုပ်ကောင်းကောင်းလုပ်နိုင်အောင် တည်ဆောက်ပေးခြင်း ဖြစ်ပါတယ်။"
            },
            {
                title: "Apply Tomorrow",
                content: "Team Member တစ်ယောက်နဲ့ 15 မိနစ် Coaching Conversation လုပ်ပြီး သူ့ရဲ့ Next Action ကို သတ်မှတ်ပေးပါ။"
            }
        ]
    }
];

var CATEGORIES = [
    "Business Foundation",
    "Leadership",
    "Strategy",
    "Marketing",
    "Sales",
    "Finance",
    "People",
    "Operations"
];

var state = {
    currentPage: "dashboard",
    currentLesson: null,
    profile: DEFAULT_PROFILE,
    settings: DEFAULT_SETTINGS,
    progress: {},
    goals: [],
    tasks: [],
    plan: {
        target: "",
        strategy: "",
        actions: ""
    }
};

/* =========================================================
   SAFE UTILITIES
   ========================================================= */

function $(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        return null;
    }
}

function $all(selector) {
    try {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    } catch (error) {
        return [];
    }
}

function safeParse(value, fallback) {
    if (!value) return fallback;

    try {
        var parsed = JSON.parse(value);
        return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (error) {
        return fallback;
    }
}

function safeStorageGet(key, fallback) {
    try {
        var value = localStorage.getItem(key);
        return value === null ? fallback : safeParse(value, fallback);
    } catch (error) {
        return fallback;
    }
}

function safeStorageSet(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        return false;
    }
}

function esc(value) {
    var text = value === null || value === undefined ? "" : String(value);

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function money(value) {
    var number = Number(value);

    if (!Number.isFinite(number)) {
        number = 0;
    }

    return number.toLocaleString("en-US");
}

function pct(value) {
    var number = Number(value);

    if (!Number.isFinite(number)) {
        number = 0;
    }

    return Math.max(0, Math.min(100, Math.round(number)));
}

function today() {
    try {
        return new Date().toISOString().slice(0, 10);
    } catch (error) {
        return "";
    }
}

function slug(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

/* =========================================================
   LOAD / SAVE
   ========================================================= */

function loadState() {
    var savedProfile = safeStorageGet(KEYS.profile, DEFAULT_PROFILE);
    var savedSettings = safeStorageGet(KEYS.settings, DEFAULT_SETTINGS);
    var savedProgress = safeStorageGet(KEYS.progress, {});
    var savedGoals = safeStorageGet(KEYS.goals, []);
    var savedTasks = safeStorageGet(KEYS.tasks, []);
    var savedPlan = safeStorageGet(KEYS.plan, {
        target: "",
        strategy: "",
        actions: ""
    });

    state.profile = {
        name: savedProfile && savedProfile.name ? savedProfile.name : DEFAULT_PROFILE.name,
        role: savedProfile && savedProfile.role ? savedProfile.role : DEFAULT_PROFILE.role
    };

    state.settings = {
        growthMode: savedSettings && savedSettings.growthMode !== false,
        notifications: savedSettings && savedSettings.notifications !== false
    };

    state.progress = savedProgress && typeof savedProgress === "object"
        ? savedProgress
        : {};

    state.goals = Array.isArray(savedGoals) ? savedGoals : [];
    state.tasks = Array.isArray(savedTasks) ? savedTasks : [];

    state.plan = savedPlan && typeof savedPlan === "object"
        ? savedPlan
        : {
            target: "",
            strategy: "",
            actions: ""
        };
}

function saveState() {
    safeStorageSet(KEYS.profile, state.profile);
    safeStorageSet(KEYS.settings, state.settings);
    safeStorageSet(KEYS.progress, state.progress);
    safeStorageSet(KEYS.goals, state.goals);
    safeStorageSet(KEYS.tasks, state.tasks);
    safeStorageSet(KEYS.plan, state.plan);
}

/* =========================================================
   LESSON ENGINE
   ========================================================= */

function normalizeLesson(raw, index) {
    if (!raw || typeof raw !== "object") {
        return null;
    }

    var lesson = {
        id: raw.id || ("lesson-" + (index + 1)),
        course: raw.course || raw.category || "Business Academy",
        category: raw.category || "Business Foundation",
        title: raw.title || ("Business Lesson " + (index + 1)),
        duration: Number(raw.duration) || 15,
        premium: raw.premium === true,
        description: raw.description || "",
        sections: Array.isArray(raw.sections) ? raw.sections : []
    };

    lesson.sections = lesson.sections.map(function (section) {
        if (!section || typeof section !== "object") {
            return null;
        }

        return {
            title: section.title || "Lesson",
            content: section.content || ""
        };
    }).filter(Boolean);

    if (!lesson.sections.length) {
        lesson.sections = [
            {
                title: "Lesson Content",
                content: lesson.description || "ဒီ Lesson ရဲ့ Content ကို ပြသပေးပါမယ်။"
            }
        ];
    }

    return lesson;
}

function getExternalLessons(globalName) {
    try {
        var data = window[globalName];

        if (Array.isArray(data)) {
            return data;
        }

        if (data && Array.isArray(data.lessons)) {
            return data.lessons;
        }

        return [];
    } catch (error) {
        return [];
    }
}

function getLessons() {
    var list = [];

    var globals = [
        "ABA_BUSINESS_FUNDAMENTALS",
        "ABA_LEADERSHIP",
        "ABA_STRATEGY",
        "ABA_MARKETING",
        "ABA_SALES",
        "ABA_FINANCE",
        "ABA_PEOPLE",
        "ABA_OPERATIONS"
    ];

    globals.forEach(function (name) {
        var external = getExternalLessons(name);

        external.forEach(function (lesson) {
            var normalized = normalizeLesson(lesson, list.length);

            if (normalized) {
                list.push(normalized);
            }
        });
    });

    FALLBACK_LESSONS.forEach(function (fallback) {
        var exists = list.some(function (lesson) {
            return lesson.id === fallback.id;
        });

        if (!exists) {
            var normalized = normalizeLesson(fallback, list.length);

            if (normalized) {
                list.push(normalized);
            }
        }
    });

    return list;
}

function findLesson(id) {
    var lessons = getLessons();

    for (var i = 0; i < lessons.length; i++) {
        if (lessons[i].id === id) {
            return lessons[i];
        }
    }

    return null;
}

function isComplete(id) {
    return state.progress[id] === true;
}

function completedCount() {
    var lessons = getLessons();

    return lessons.filter(function (lesson) {
        return isComplete(lesson.id);
    }).length;
}

function overallProgress() {
    var lessons = getLessons();

    if (!lessons.length) return 0;

    return Math.round((completedCount() / lessons.length) * 100);
}

function markComplete(id) {
    if (!id) return;

    state.progress[id] = true;
    saveState();

    toast("Lesson Completed ✓", "success");
    renderCurrentPage();
}

/* =========================================================
   UI
   ========================================================= */

function toast(message, type) {
    try {
        var container = $("#toastContainer");

        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            document.body.appendChild(container);
        }

        var item = document.createElement("div");

        item.className = "toast " + (type || "info");
        item.textContent = message;

        container.appendChild(item);

        setTimeout(function () {
            try {
                item.remove();
            } catch (error) {}
        }, 2800);
    } catch (error) {
        console.log(message);
    }
}

function closeMobileMenu() {
    var sidebar = $(".sidebar");
    var overlay = $(".mobile-overlay");

    if (sidebar) {
        sidebar.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("show");
    }
}

function openMobileMenu() {
    var sidebar = $(".sidebar");
    var overlay = $(".mobile-overlay");

    if (sidebar) {
        sidebar.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("show");
    }
}

function updateHeader(title) {
    var titleElement = $("#topbarTitle");
    var breadcrumb = $("#topbarBreadcrumb");

    if (titleElement) {
        titleElement.textContent = title || "Dashboard";
    }

    if (breadcrumb) {
        breadcrumb.textContent = "AUNG BUSINESS ACADEMY";
    }
}

function setActiveNav(page) {
    $all("[data-page]").forEach(function (item) {
        var target = item.getAttribute("data-page");

        if (target === page) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

function setMain(html) {
    var main = $("#app-main");

    if (!main) {
        main = document.createElement("main");
        main.id = "app-main";

        var root = document.body;

        if (root) {
            root.appendChild(main);
        }
    }

    if (main) {
        main.innerHTML = html;
    }

    return main;
}

function pageHeader(title, subtitle, actions) {
    return (
        '<div class="page-header">' +
            '<div>' +
                '<div class="eyebrow">AUNG BUSINESS ACADEMY</div>' +
                '<h1>' + esc(title) + '</h1>' +
                '<p>' + esc(subtitle || "") + '</p>' +
            '</div>' +
            '<div class="page-actions">' +
                (actions || "") +
            '</div>' +
        '</div>'
    );
}

function card(title, content, extraClass) {
    return (
        '<div class="card ' + (extraClass || "") + '">' +
            '<div class="card-title">' + esc(title) + '</div>' +
            '<div class="card-body">' + content + '</div>' +
        '</div>'
    );
}

function emptyState(title, text) {
    return (
        '<div class="empty-state">' +
            '<div class="empty-icon">◈</div>' +
            '<h3>' + esc(title) + '</h3>' +
            '<p>' + esc(text) + '</p>' +
        '</div>'
    );
}

/* =========================================================
   SAFE RENDER
   ========================================================= */

function renderPageSafely(renderer, title) {
    if (rendering) return;

    rendering = true;

    try {
        var html = renderer();

        if (typeof html !== "string") {
            throw new Error("Page renderer returned invalid content.");
        }

        setMain(html);
        updateHeader(title);
        setActiveNav(state.currentPage);
    } catch (error) {
        console.error("Aung Business Academy render error:", error);

        showPageError(title || "Workspace");
    } finally {
        rendering = false;
    }
}

function showPageError(title) {
    setMain(
        '<div class="page-content">' +
            pageHeader(
                title || "Workspace",
                "ဒီ Page ကို ဖွင့်ရာမှာ အခက်အခဲတစ်ခု ဖြစ်နေပါတယ်။"
            ) +
            '<div class="card">' +
                '<div class="card-body">' +
                    '<div class="empty-state">' +
                        '<div class="empty-icon">!</div>' +
                        '<h3>Workspace ကို မဖွင့်နိုင်သေးပါ</h3>' +
                        '<p>App ကို ပြန်ဖွင့်ပြီး ထပ်မံကြိုးစားပါ။ သင့် Data တွေကို မဖျက်ထားပါဘူး။</p>' +
                        '<button class="btn btn-primary" data-action="retry">↻ Retry</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    );
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {
    var lessons = getLessons();
    var progress = overallProgress();
    var completed = completedCount();

    var nextLesson = lessons.find(function (lesson) {
        return !isComplete(lesson.id);
    }) || lessons[0];

    return (
        '<div class="page-content">' +

            pageHeader(
                "Business Growth Dashboard",
                "Learn • Plan • Execute • Measure • Improve",
                '<button class="btn btn-primary" data-page="today">+ Today Plan</button>'
            ) +

            '<section class="dashboard-hero">' +
                '<div class="dashboard-hero-content">' +
                    '<div class="eyebrow">GROWTH MODE</div>' +
                    '<h2>Build a Better Business.</h2>' +
                    '<p>သင့် Business ကို Knowledge, Strategy, Execution နဲ့ တစ်ဆင့်ချင်းတိုးတက်အောင် စီမံပါ။</p>' +
                    '<div class="hero-actions">' +
                        '<button class="btn btn-primary" data-page="academy">Start Learning</button>' +
                        '<button class="btn btn-secondary" data-page="business-plan">Build Business Plan</button>' +
                    '</div>' +
                '</div>' +
                '<div class="score-ring">' +
                    '<strong>' + progress + '%</strong>' +
                    '<span>Progress</span>' +
                '</div>' +
            '</section>' +

            '<section class="stats-grid">' +
                statCard("Courses", "8", "Business Areas") +
                statCard("Lessons", String(lessons.length), "Available") +
                statCard("Completed", String(completed), "Lessons") +
                statCard("Progress", progress + "%", "Overall") +
            '</section>' +

            '<section class="content-grid two">' +
                card(
                    "Continue Learning",
                    nextLesson
                        ? '<div class="continue-lesson">' +
                            '<span class="badge">NEXT LESSON</span>' +
                            '<h3>' + esc(nextLesson.title) + '</h3>' +
                            '<p>' + esc(nextLesson.description) + '</p>' +
                            '<button class="btn btn-primary" data-lesson="' + esc(nextLesson.id) + '">Open Lesson →</button>' +
                          '</div>'
                        : emptyState("All Lessons Completed", "သင်ခန်းစာအားလုံး ပြီးဆုံးပါပြီ။")
                ) +

                card(
                    "Today's Focus",
                    '<div class="task-list">' +
                        '<div class="task-item"><span>01</span><div><strong>Learn</strong><small>Lesson တစ်ခုလေ့လာပါ</small></div></div>' +
                        '<div class="task-item"><span>02</span><div><strong>Plan</strong><small>Business Goal တစ်ခုချပါ</small></div></div>' +
                        '<div class="task-item"><span>03</span><div><strong>Execute</strong><small>Action တစ်ခုလုပ်ပါ</small></div></div>' +
                    '</div>'
                ) +
            '</section>' +

            '<section>' +
                '<div class="section-heading">' +
                    '<div><h2>Growth Roadmap</h2><p>Business Growth ကို Step-by-Step တည်ဆောက်ပါ။</p></div>' +
                '</div>' +
                '<div class="roadmap">' +
                    roadmapStep("01", "Learn", "Knowledge & Skills", true) +
                    roadmapStep("02", "Plan", "Strategy & Goals", progress >= 25) +
                    roadmapStep("03", "Execute", "Actions & Discipline", progress >= 50) +
                    roadmapStep("04", "Measure", "Numbers & KPI", progress >= 75) +
                    roadmapStep("05", "Improve", "Scale & Growth", progress >= 100) +
                '</div>' +
            '</section>' +

            footerHtml() +
        '</div>'
    );
}

function statCard(label, value, sub) {
    return (
        '<div class="stat-card">' +
            '<div class="stat-label">' + esc(label) + '</div>' +
            '<div class="stat-value">' + esc(value) + '</div>' +
            '<div class="stat-sub">' + esc(sub) + '</div>' +
        '</div>'
    );
}

function roadmapStep(number, title, text, active) {
    return (
        '<div class="roadmap-step ' + (active ? "active" : "") + '">' +
            '<span>' + number + '</span>' +
            '<strong>' + esc(title) + '</strong>' +
            '<small>' + esc(text) + '</small>' +
        '</div>'
    );
}

/* =========================================================
   TODAY
   ========================================================= */

function renderToday() {
    var tasks = state.tasks.filter(function (task) {
        return task.date === today();
    });

    return (
        '<div class="page-content">' +
            pageHeader(
                "Today",
                "ဒီနေ့အတွက် Business Growth Action တွေကို စီမံပါ။",
                '<button class="btn btn-primary" data-action="add-task">+ Add Task</button>'
            ) +

            '<div class="content-grid two">' +
                card(
                    "Today's Tasks",
                    tasks.length
                        ? '<div class="task-list">' +
                            tasks.map(function (task) {
                                return (
                                    '<div class="task-item">' +
                                        '<span>' + (task.done ? "✓" : "○") + '</span>' +
                                        '<div>' +
                                            '<strong>' + esc(task.title) + '</strong>' +
                                            '<small>' + esc(task.priority || "Normal") + '</small>' +
                                        '</div>' +
                                        '<button class="icon-btn" data-task="' + esc(task.id) + '">' + (task.done ? "↺" : "✓") + '</button>' +
                                    '</div>'
                                );
                            }).join("") +
                          '</div>'
                        : emptyState("No Tasks Yet", "ဒီနေ့လုပ်ဆောင်မယ့် Action တစ်ခုထည့်ပါ။")
                ) +

                card(
                    "Daily Growth Formula",
                    '<div class="formula-box">' +
                        '<strong>LEARN → PLAN → EXECUTE → REVIEW</strong>' +
                        '<p>နေ့တိုင်း Business ကို အနည်းဆုံး 1% တိုးတက်အောင်လုပ်ပါ။</p>' +
                    '</div>'
                ) +
            '</div>' +

            footerHtml() +
        '</div>'
    );
}

function addTask() {
    var title = window.prompt("ဒီနေ့လုပ်မယ့် Task ကိုရေးပါ");

    if (!title) return;

    state.tasks.push({
        id: "task-" + Date.now(),
        title: title,
        date: today(),
        priority: "High",
        done: false
    });

    saveState();
    toast("Task Added ✓", "success");
    renderCurrentPage();
}

function toggleTask(id) {
    state.tasks = state.tasks.map(function (task) {
        if (task.id === id) {
            task.done = !task.done;
        }

        return task;
    });

    saveState();
    renderCurrentPage();
}

/* =========================================================
   GOALS
   ========================================================= */

function renderGoals() {
    return (
        '<div class="page-content">' +
            pageHeader(
                "My Goals",
                "Business နဲ့ Career Growth အတွက် အရေးကြီးဆုံး Goal တွေကို သတ်မှတ်ပါ။",
                '<button class="btn btn-primary" data-action="add-goal">+ Add Goal</button>'
            ) +

            card(
                "Goal Board",
                state.goals.length
                    ? '<div class="goal-list">' +
                        state.goals.map(function (goal) {
                            return (
                                '<div class="goal-card">' +
                                    '<span class="badge">GOAL</span>' +
                                    '<h3>' + esc(goal.title) + '</h3>' +
                                    '<p>' + esc(goal.deadline || "No deadline") + '</p>' +
                                '</div>'
                            );
                        }).join("") +
                      '</div>'
                    : emptyState("No Goals Yet", "သင့်ရဲ့ အရေးကြီးဆုံး Business Goal တစ်ခုကို စတင်သတ်မှတ်ပါ။")
            ) +

            footerHtml() +
        '</div>'
    );
}

function addGoal() {
    var title = window.prompt("သင့် Goal ကိုရေးပါ");

    if (!title) return;

    state.goals.push({
        id: "goal-" + Date.now(),
        title: title,
        deadline: "Open"
    });

    saveState();
    toast("Goal Added ✓", "success");
    renderCurrentPage();
}

/* =========================================================
   ACADEMY
   ========================================================= */

function renderAcademy() {
    return (
        '<div class="page-content">' +
            pageHeader(
                "Master Business",
                "Business Management ရဲ့ Core Areas 8 ခုကို လေ့လာပါ။"
            ) +

            '<div class="category-grid">' +
                CATEGORIES.map(function (category, index) {
                    var count = getLessons().filter(function (lesson) {
                        return lesson.category === category;
                    }).length;

                    return (
                        '<div class="category-card" data-category="' + esc(category) + '">' +
                            '<div class="category-number">0' + (index + 1) + '</div>' +
                            '<h3>' + esc(category) + '</h3>' +
                            '<p>' + count + ' Lessons</p>' +
                            '<button class="btn btn-secondary" data-category="' + esc(category) + '">Explore →</button>' +
                        '</div>'
                    );
                }).join("") +
            '</div>' +

            '<div class="section-heading">' +
                '<div><h2>All Lessons</h2><p>Business Growth Curriculum</p></div>' +
            '</div>' +

            renderLessonCards(getLessons()) +

            footerHtml() +
        '</div>'
    );
}

function renderLessons() {
    return (
        '<div class="page-content">' +
            pageHeader(
                "Lessons",
                "15-minute practical business lessons."
            ) +
            renderLessonCards(getLessons()) +
            footerHtml() +
        '</div>'
    );
}

function renderLessonCards(lessons) {
    if (!lessons.length) {
        return emptyState("No Lessons", "Lesson မတွေ့ပါ။");
    }

    return (
        '<div class="lesson-grid">' +
            lessons.map(function (lesson, index) {
                return (
                    '<div class="lesson-card">' +
                        '<div class="lesson-card-top">' +
                            '<span class="badge">' + esc(lesson.category) + '</span>' +
                            '<span>' + lesson.duration + ' min</span>' +
                        '</div>' +
                        '<div class="lesson-number">' + String(index + 1).padStart(2, "0") + '</div>' +
                        '<h3>' + esc(lesson.title) + '</h3>' +
                        '<p>' + esc(lesson.description) + '</p>' +
                        '<div class="lesson-card-footer">' +
                            '<span>' + (isComplete(lesson.id) ? "✓ Completed" : "Not Started") + '</span>' +
                            '<button class="btn btn-secondary" data-lesson="' + esc(lesson.id) + '">Open →</button>' +
                        '</div>' +
                    '</div>'
                );
            }).join("") +
        '</div>'
    );
}

function renderCategory(category) {
    var lessons = getLessons().filter(function (lesson) {
        return lesson.category === category;
    });

    return (
        '<div class="page-content">' +
            pageHeader(
                category,
                "ဒီ Business Area ရဲ့ Lessons တွေကို လေ့လာပါ။",
                '<button class="btn btn-secondary" data-page="academy">← Academy</button>'
            ) +
            renderLessonCards(lessons) +
            footerHtml() +
        '</div>'
    );
}

/* =========================================================
   LESSON DETAIL
   ========================================================= */

function renderLessonDetail() {
    var lesson = findLesson(state.currentLesson);

    if (!lesson) {
        return (
            '<div class="page-content">' +
                pageHeader("Lesson Not Found", "ဒီ Lesson ကို မတွေ့ပါ။") +
                emptyState("Lesson Not Found", "Academy ကိုပြန်သွားပြီး Lesson တစ်ခုရွေးပါ။") +
            '</div>'
        );
    }

    return (
        '<div class="page-content">' +
            pageHeader(
                lesson.title,
                lesson.category + " • " + lesson.duration + " minutes",
                '<button class="btn btn-secondary" data-page="academy">← Back</button>'
            ) +

            '<div class="lesson-layout">' +
                '<article class="lesson-content">' +

                    '<div class="lesson-intro">' +
                        '<span class="badge">15-MINUTE BUSINESS LESSON</span>' +
                        '<h2>' + esc(lesson.title) + '</h2>' +
                        '<p>' + esc(lesson.description) + '</p>' +
                    '</div>' +

                    lesson.sections.map(function (section, index) {
                        return (
                            '<section class="lesson-section">' +
                                '<div class="section-number">0' + (index + 1) + '</div>' +
                                '<div>' +
                                    '<h3>' + esc(section.title) + '</h3>' +
                                    '<p>' + esc(section.content) + '</p>' +
                                '</div>' +
                            '</section>'
                        );
                    }).join("") +

                    '<div class="lesson-complete-box">' +
                        '<div>' +
                            '<strong>' + (isComplete(lesson.id) ? "Lesson Completed ✓" : "Finish This Lesson") + '</strong>' +
                            '<p>လေ့လာပြီးရင် Completed အဖြစ် မှတ်ထားပါ။</p>' +
                        '</div>' +
                        '<button class="btn btn-primary" data-complete="' + esc(lesson.id) + '">' +
                            (isComplete(lesson.id) ? "Completed ✓" : "Mark Complete") +
                        '</button>' +
                    '</div>' +

                '</article>' +

                '<aside class="lesson-sidebar">' +
                    '<div class="card">' +
                        '<div class="card-title">Your Progress</div>' +
                        '<div class="card-body">' +
                            '<div class="progress-bar"><span style="width:' + overallProgress() + '%"></span></div>' +
                            '<strong>' + overallProgress() + '%</strong>' +
                            '<p>' + completedCount() + ' lessons completed</p>' +
                        '</div>' +
                    '</div>' +
                '</aside>' +
            '</div>' +

            footerHtml() +
        '</div>'
    );
}

/* =========================================================
   TOOLS
   ========================================================= */

function renderToolsHome() {
    return (
        '<div class="page-content">' +
            pageHeader(
                "Manager Tools",
                "Business Decision တွေအတွက် Practical Tools"
            ) +

            '<div class="tool-grid">' +
                toolCard("Sales Target", "Target & Achievement Calculator", "sales-target") +
                toolCard("Pricing", "Margin & Selling Price Calculator", "pricing") +
                toolCard("KPI & Scorecard", "Team Performance Tracking", "kpi") +
                toolCard("Customer Plan", "Customer Growth Planning", "customer-plan") +
                toolCard("Action Planner", "7-Day Execution Plan", "action-planner") +
                toolCard("Business Plan", "Business Growth Planning", "business-plan") +
            '</div>' +

            footerHtml() +
        '</div>'
    );
}

function toolCard(title, description, page) {
    return (
        '<div class="tool-card">' +
            '<div class="tool-icon">◆</div>' +
            '<h3>' + esc(title) + '</h3>' +
            '<p>' + esc(description) + '</p>' +
            '<button class="btn btn-secondary" data-page="' + esc(page) + '">Open Tool →</button>' +
        '</div>'
    );
}

function renderSalesTarget() {
    return calculatorPage(
        "Sales Target Calculator",
        "Target, Actual နဲ့ Achievement ကိုတွက်ပါ။",
        '<div class="form-grid">' +
            inputField("targetInput", "Target", "0") +
            inputField("actualInput", "Actual", "0") +
        '</div>' +
        '<button class="btn btn-primary" data-action="calculate-target">Calculate</button>' +
        '<div id="targetResult" class="calculator-result"></div>'
    );
}

function renderPricing() {
    return calculatorPage(
        "Pricing Calculator",
        "Cost, Margin နဲ့ Selling Price ကိုတွက်ပါ။",
        '<div class="form-grid">' +
            inputField("costInput", "Cost", "0") +
            inputField("marginInput", "Target Margin %", "20") +
        '</div>' +
        '<button class="btn btn-primary" data-action="calculate-price">Calculate</button>' +
        '<div id="priceResult" class="calculator-result"></div>'
    );
}

function renderKPI() {
    return calculatorPage(
        "KPI & Scorecard",
        "Team KPI ကို ရိုးရှင်းစွာ စောင့်ကြည့်ပါ။",
        '<div class="form-grid">' +
            inputField("kpiTarget", "Target", "0") +
            inputField("kpiActual", "Actual", "0") +
        '</div>' +
        '<button class="btn btn-primary" data-action="calculate-kpi">Calculate</button>' +
        '<div id="kpiResult" class="calculator-result"></div>'
    );
}

function renderCustomerPlan() {
    return simplePlanner(
        "Customer Plan",
        "Key Customer တစ်ခုအတွက် Growth Plan ရေးပါ။",
        ["Customer Name", "Current Sales", "Growth Opportunity", "Next Action"]
    );
}

function renderActionPlanner() {
    return simplePlanner(
        "7-Day Action Planner",
        "Business Goal ကို 7-Day Execution Plan အဖြစ် ပြောင်းပါ။",
        ["Business Goal", "Day 1 Action", "Day 2 Action", "Day 3–7 Action"]
    );
}

function renderBusinessPlan() {
    return (
        '<div class="page-content">' +
            pageHeader(
                "Business Plan",
                "သင့် Business Growth Plan ကို တည်ဆောက်ပါ။"
            ) +

            '<div class="card">' +
                '<div class="card-body">' +
                    '<div class="form-stack">' +
                        textareaField("planTarget", "Business Target", state.plan.target) +
                        textareaField("planStrategy", "Growth Strategy", state.plan.strategy) +
                        textareaField("planActions", "Key Actions", state.plan.actions) +
                        '<button class="btn btn-primary" data-action="save-plan">Save Business Plan</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            footerHtml() +
        '</div>'
    );
}

function calculatorPage(title, subtitle, body) {
    return (
        '<div class="page-content">' +
            pageHeader(title, subtitle) +
            '<div class="calculator-wrap">' +
                '<div class="card">' +
                    '<div class="card-body">' +
                        body +
                    '</div>' +
                '</div>' +
            '</div>' +
            footerHtml() +
        '</div>'
    );
}

function inputField(id, label, value) {
    return (
        '<label class="form-field">' +
            '<span>' + esc(label) + '</span>' +
            '<input id="' + esc(id) + '" type="number" value="' + esc(value || "") + '">' +
        '</label>'
    );
}

function textareaField(id, label, value) {
    return (
        '<label class="form-field">' +
            '<span>' + esc(label) + '</span>' +
            '<textarea id="' + esc(id) + '" rows="5">' + esc(value || "") + '</textarea>' +
        '</label>'
    );
}

function simplePlanner(title, subtitle, fields) {
    return (
        '<div class="page-content">' +
            pageHeader(title, subtitle) +
            '<div class="card">' +
                '<div class="card-body">' +
                    '<div class="form-stack">' +
                        fields.map(function (field, index) {
                            return textareaField(
                                "planner-" + index,
                                field,
                                ""
                            );
                        }).join("") +
                        '<button class="btn btn-primary" data-action="save-planner">Save Plan</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            footerHtml() +
        '</div>'
    );
}

function calculateTarget() {
    var target = Number($("#targetInput") ? $("#targetInput").value : 0);
    var actual = Number($("#actualInput") ? $("#actualInput").value : 0);

    if (!Number.isFinite(target) || target <= 0) {
        toast("Target ထည့်ပါ", "error");
        return;
    }

    var achievement = (actual / target) * 100;
    var gap = target - actual;

    var result = $("#targetResult");

    if (result) {
        result.innerHTML =
            '<strong>Achievement: ' + pct(achievement) + '%</strong>' +
            '<p>Gap: ' + money(gap) + '</p>';
    }
}

function calculatePrice() {
    var cost = Number($("#costInput") ? $("#costInput").value : 0);
    var margin = Number($("#marginInput") ? $("#marginInput").value : 0);

    if (!Number.isFinite(cost) || cost <= 0) {
        toast("Cost ထည့်ပါ", "error");
        return;
    }

    if (!Number.isFinite(margin) || margin >= 100) {
        toast("Margin % မှန်ကန်စွာထည့်ပါ", "error");
        return;
    }

    var price = cost / (1 - margin / 100);

    var result = $("#priceResult");

    if (result) {
        result.innerHTML =
            '<strong>Selling Price: ' + money(price) + '</strong>' +
            '<p>Target Margin: ' + margin + '%</p>';
    }
}

function calculateKPI() {
    var target = Number($("#kpiTarget") ? $("#kpiTarget").value : 0);
    var actual = Number($("#kpiActual") ? $("#kpiActual").value : 0);

    if (!Number.isFinite(target) || target <= 0) {
        toast("KPI Target ထည့်ပါ", "error");
        return;
    }

    var achievement = (actual / target) * 100;

    var result = $("#kpiResult");

    if (result) {
        result.innerHTML =
            '<strong>KPI Achievement: ' + pct(achievement) + '%</strong>';
    }
}

function saveBusinessPlan() {
    state.plan.target = $("#planTarget") ? $("#planTarget").value : "";
    state.plan.strategy = $("#planStrategy") ? $("#planStrategy").value : "";
    state.plan.actions = $("#planActions") ? $("#planActions").value : "";

    saveState();
    toast("Business Plan Saved ✓", "success");
}

/* =========================================================
   INSIGHT
   ========================================================= */

function renderPerformance() {
    return analyticsPage(
        "Performance",
        "Business Performance Snapshot",
        [
            ["Learning Progress", overallProgress() + "%"],
            ["Completed Lessons", completedCount()],
            ["Today's Tasks", state.tasks.filter(function (t) { return t.date === today(); }).length],
            ["Goals", state.goals.length]
        ]
    );
}

function renderSalesAnalysis() {
    return analyticsPage(
        "Sales Analysis",
        "Sales Performance ကို Numbers နဲ့ သုံးသပ်ပါ။",
        [
            ["Target", "—"],
            ["Actual", "—"],
            ["Achievement", "—"],
            ["Growth", "—"]
        ]
    );
}

function renderProfitAnalysis() {
    return analyticsPage(
        "Profit Analysis",
        "Revenue, Cost နဲ့ Margin ကို သုံးသပ်ပါ။",
        [
            ["Revenue", "—"],
            ["Cost", "—"],
            ["Gross Profit", "—"],
            ["Margin", "—"]
        ]
    );
}

function renderReports() {
    return analyticsPage(
        "Reports",
        "Business Review အတွက် Management Summary",
        [
            ["Learning", overallProgress() + "%"],
            ["Goals", state.goals.length],
            ["Tasks", state.tasks.length],
            ["Completed", completedCount()]
        ]
    );
}

function analyticsPage(title, subtitle, metrics) {
    return (
        '<div class="page-content">' +
            pageHeader(title, subtitle) +
            '<div class="stats-grid">' +
                metrics.map(function (item) {
                    return statCard(item[0], item[1], "Management View");
                }).join("") +
            '</div>' +
            '<div class="card">' +
                '<div class="card-body">' +
                    '<div class="formula-box">' +
                        '<strong>MANAGEMENT REVIEW</strong>' +
                        '<p>Numbers → Analysis → Decision → Action → Review</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            footerHtml() +
        '</div>'
    );
}

/* =========================================================
   AI
   ========================================================= */

function renderAI(title, subtitle) {
    return (
        '<div class="page-content">' +
            pageHeader(title, subtitle) +

            '<div class="ai-page">' +
                '<div class="ai-hero">' +
                    '<span class="badge">AI BUSINESS INTELLIGENCE</span>' +
                    '<h2>Think Better. Decide Faster.</h2>' +
                    '<p>AI Coach ကိုအသုံးပြုပြီး Business Problem တွေကို Framework နဲ့ စဉ်းစားပါ။</p>' +
                '</div>' +

                '<div class="card">' +
                    '<div class="card-body">' +
                        '<label class="form-field">' +
                            '<span>Your Business Question</span>' +
                            '<textarea id="aiQuestion" rows="6" placeholder="ဥပမာ - Sales မတက်တာ ဘာကြောင့်လဲ?"></textarea>' +
                        '</label>' +
                        '<button class="btn btn-primary" data-action="ai-coach">Get Framework</button>' +
                        '<div id="aiResult" class="calculator-result"></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            footerHtml() +
        '</div>'
    );
}

function runAICoach() {
    var question = $("#aiQuestion") ? $("#aiQuestion").value.trim() : "";

    if (!question) {
        toast("Business Question ရေးပါ", "error");
        return;
    }

    var result = $("#aiResult");

    if (result) {
        result.innerHTML =
            '<strong>Manager Framework</strong>' +
            '<p>1. Problem ကို တိတိကျကျ သတ်မှတ်ပါ။</p>' +
            '<p>2. Data နဲ့ Actual Situation ကို စစ်ပါ။</p>' +
            '<p>3. Root Cause 3 ခုရှာပါ။</p>' +
            '<p>4. အကျိုးသက်ရောက်မှုအများဆုံး Action တစ်ခုရွေးပါ။</p>' +
            '<p>5. 7 ရက်အတွင်း Result ကို ပြန်တိုင်းပါ။</p>' +
            '<hr>' +
            '<p><strong>Your Question:</strong> ' + esc(question) + '</p>';
    }
}

/* =========================================================
   CAREER
   ========================================================= */

function renderCV() {
    return simplePlanner(
        "CV Builder",
        "Professional Manager CV အတွက် အချက်အလက်စုစည်းပါ။",
        ["Professional Summary", "Key Achievements", "Leadership Experience", "Skills"]
    );
}

function renderInterview() {
    return (
        '<div class="page-content">' +
            pageHeader(
                "Interview Coach",
                "Manager / Sales Manager Interview Preparation"
            ) +
            '<div class="card">' +
                '<div class="card-body">' +
                    '<h3>Practice Question</h3>' +
                    '<p>Tell me about your experience in driving sales performance.</p>' +
                    '<textarea id="interviewAnswer" rows="7" placeholder="Your answer..."></textarea>' +
                    '<button class="btn btn-primary" data-action="review-interview">Review Answer</button>' +
                    '<div id="interviewResult" class="calculator-result"></div>' +
                '</div>' +
            '</div>' +
            footerHtml() +
        '</div>'
    );
}

function reviewInterview() {
    var answer = $("#interviewAnswer") ? $("#interviewAnswer").value.trim() : "";
    var result = $("#interviewResult");

    if (!answer) {
        toast("Answer ရေးပါ", "error");
        return;
    }

    if (result) {
        result.innerHTML =
            '<strong>Answer Framework</strong>' +
            '<p>Situation → Action → Result → Learning</p>' +
            '<p>သင့် Answer မှာ Numbers, Team Leadership နဲ့ Business Result ပါအောင် ထည့်ပါ။</p>';
    }
}

function renderCareer() {
    return analyticsPage(
        "Career Growth",
        "Management Career ကို Strategic အနေနဲ့ တိုးတက်အောင်လုပ်ပါ။",
        [
            ["Leadership", "Build"],
            ["Business Skills", "Grow"],
            ["Numbers", "Master"],
            ["Career Value", "Increase"]
        ]
    );
}

/* =========================================================
   ACCOUNT
   ========================================================= */

function renderProfile() {
    return (
        '<div class="page-content">' +
            pageHeader("Profile", "သင့် Professional Profile") +
            '<div class="card">' +
                '<div class="card-body">' +
                    '<div class="profile-large">' +
                        '<div class="avatar-large">AZ</div>' +
                        '<h2>' + esc(state.profile.name) + '</h2>' +
                        '<p>' + esc(state.profile.role) + '</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            footerHtml() +
        '</div>'
    );
}

function renderSettings() {
    return (
        '<div class="page-content">' +
            pageHeader("Settings", "Aung Business Academy Settings") +

            '<div class="card">' +
                '<div class="card-body">' +

                    '<div class="setting-row">' +
                        '<div><strong>Growth Mode</strong><p>Business Growth workspace ကို အသုံးပြုမယ်။</p></div>' +
                        '<button class="btn btn-secondary" data-action="toggle-growth">' +
                            (state.settings.growthMode ? "ON" : "OFF") +
                        '</button>' +
                    '</div>' +

                    '<div class="setting-row">' +
                        '<div><strong>Notifications</strong><p>App Notifications</p></div>' +
                        '<button class="btn btn-secondary" data-action="toggle-notifications">' +
                            (state.settings.notifications ? "ON" : "OFF") +
                        '</button>' +
                    '</div>' +

                    '<div class="setting-row">' +
                        '<div><strong>Reset App</strong><p>Local data ကို ပြန်လည်စတင်မယ်။</p></div>' +
                        '<button class="btn btn-danger" data-action="reset-app">Reset</button>' +
                    '</div>' +

                '</div>' +
            '</div>' +

            footerHtml() +
        '</div>'
    );
}

/* =========================================================
   PREMIUM
   ========================================================= */

function renderGrowthPro() {
    return (
        '<div class="page-content">' +
            pageHeader(
                "Growth Pro",
                "Advanced Business Growth Workspace"
            ) +

            '<div class="premium-hero">' +
                '<span class="badge">PREMIUM</span>' +
                '<h2>Build. Execute. Scale.</h2>' +
                '<p>Advanced tools, AI coaching, business analytics နဲ့ professional learning ကို တစ်နေရာတည်းမှာ အသုံးပြုနိုင်မယ့် Growth Pro experience.</p>' +
                '<button class="btn btn-primary" data-action="premium-info">Coming Soon</button>' +
            '</div>' +

            '<div class="feature-grid">' +
                featureCard("AI Business Coach", "Business decision support") +
                featureCard("Advanced Reports", "Performance analytics") +
                featureCard("Business Planning", "Strategic planning") +
                featureCard("Premium Academy", "Advanced lessons") +
            '</div>' +

            footerHtml() +
        '</div>'
    );
}

function featureCard(title, text) {
    return (
        '<div class="feature-card">' +
            '<span>◆</span>' +
            '<h3>' + esc(title) + '</h3>' +
            '<p>' + esc(text) + '</p>' +
        '</div>'
    );
}

/* =========================================================
   FOOTER
   ========================================================= */

function footerHtml() {
    return (
        '<footer class="app-footer">' +
            '<strong>Aung Business Academy</strong>' +
            '<span>Business Growth OS</span>' +
            '<small>Learn • Plan • Execute • Measure • Improve</small>' +
            '<small>© 2026 Aung Business Academy</small>' +
        '</footer>'
    );
}

/* =========================================================
   ROUTER
   ========================================================= */

function navigate(page) {
    if (!page) {
        page = "dashboard";
    }

    closeMobileMenu();

    state.currentPage = page;

    renderCurrentPage();
}

function renderCurrentPage() {
    var page = state.currentPage;

    var routes = {
        dashboard: [renderDashboard, "Dashboard"],
        today: [renderToday, "Today"],
        goals: [renderGoals, "My Goals"],

        academy: [renderAcademy, "Business Academy"],
        lessons: [renderLessons, "Lessons"],

        "business-foundation": [function () {
            return renderCategory("Business Foundation");
        }, "Business Foundation"],

        leadership: [function () {
            return renderCategory("Leadership");
        }, "Leadership"],

        strategy: [function () {
            return renderCategory("Strategy");
        }, "Strategy"],

        marketing: [function () {
            return renderCategory("Marketing");
        }, "Marketing"],

        sales: [function () {
            return renderCategory("Sales");
        }, "Sales"],

        finance: [function () {
            return renderCategory("Finance");
        }, "Finance"],

        people: [function () {
            return renderCategory("People");
        }, "People"],

        operations: [function () {
            return renderCategory("Operations");
        }, "Operations"],

        tools: [renderToolsHome, "Manager Tools"],
        "sales-target": [renderSalesTarget, "Sales Target"],
        pricing: [renderPricing, "Pricing"],
        kpi: [renderKPI, "KPI & Scorecard"],
        "customer-plan": [renderCustomerPlan, "Customer Plan"],
        "action-planner": [renderActionPlanner, "Action Planner"],
        "business-plan": [renderBusinessPlan, "Business Plan"],

        performance: [renderPerformance, "Performance"],
        "sales-analysis": [renderSalesAnalysis, "Sales Analysis"],
        "profit-analysis": [renderProfitAnalysis, "Profit Analysis"],
        reports: [renderReports, "Reports"],

        "ai-business-coach": [function () {
            return renderAI("AI Business Coach", "Business Strategy & Decision Support");
        }, "AI Business Coach"],

        "ai-sales-coach": [function () {
            return renderAI("AI Sales Coach", "Sales Performance & Team Coaching");
        }, "AI Sales Coach"],

        "ai-problem-solver": [function () {
            return renderAI("AI Problem Solver", "Business Problem Solving Framework");
        }, "AI Problem Solver"],

        "cv-builder": [renderCV, "CV Builder"],
        "interview-coach": [renderInterview, "Interview Coach"],
        "career-growth": [renderCareer, "Career Growth"],

        profile: [renderProfile, "Profile"],
        settings: [renderSettings, "Settings"],

        "growth-pro": [renderGrowthPro, "Growth Pro"]
    };

    if (page === "lesson") {
        renderPageSafely(renderLessonDetail, "Lesson");
        return;
    }

    if (routes[page]) {
        renderPageSafely(routes[page][0], routes[page][1]);
        return;
    }

    state.currentPage = "dashboard";
    renderPageSafely(renderDashboard, "Dashboard");
}

/* =========================================================
   EVENTS
   ========================================================= */

function bindEvents() {
    document.addEventListener("click", function (event) {
        var target = event.target;

        if (!target) return;

        var pageButton = target.closest ? target.closest("[data-page]") : null;

        if (pageButton) {
            event.preventDefault();

            var page = pageButton.getAttribute("data-page");

            navigate(page);
            return;
        }

        var lessonButton = target.closest ? target.closest("[data-lesson]") : null;

        if (lessonButton) {
            event.preventDefault();

            openLesson(lessonButton.getAttribute("data-lesson"));
            return;
        }

        var categoryButton = target.closest ? target.closest("[data-category]") : null;

        if (categoryButton) {
            event.preventDefault();

            var category = categoryButton.getAttribute("data-category");

            state.currentPage = slug(category);
            renderPageSafely(function () {
                return renderCategory(category);
            }, category);

            return;
        }

        var completeButton = target.closest ? target.closest("[data-complete]") : null;

        if (completeButton) {
            event.preventDefault();

            markComplete(completeButton.getAttribute("data-complete"));
            return;
        }

        var actionButton = target.closest ? target.closest("[data-action]") : null;

        if (actionButton) {
            event.preventDefault();

            handleAction(actionButton.getAttribute("data-action"));
            return;
        }

        var taskButton = target.closest ? target.closest("[data-task]") : null;

        if (taskButton) {
            event.preventDefault();

            toggleTask(taskButton.getAttribute("data-task"));
            return;
        }

        if (
            target.classList &&
            (
                target.classList.contains("mobile-menu-btn") ||
                target.closest(".mobile-menu-btn")
            )
        ) {
            openMobileMenu();
            return;
        }

        if (
            target.classList &&
            (
                target.classList.contains("mobile-overlay") ||
                target.closest(".mobile-overlay")
            )
        ) {
            closeMobileMenu();
        }
    });
}

function handleAction(action) {
    switch (action) {
        case "retry":
            boot();
            break;

        case "add-task":
            addTask();
            break;

        case "add-goal":
            addGoal();
            break;

        case "calculate-target":
            calculateTarget();
            break;

        case "calculate-price":
            calculatePrice();
            break;

        case "calculate-kpi":
            calculateKPI();
            break;

        case "save-plan":
            saveBusinessPlan();
            break;

        case "save-planner":
            toast("Plan Saved ✓", "success");
            break;

        case "ai-coach":
            runAICoach();
            break;

        case "review-interview":
            reviewInterview();
            break;

        case "toggle-growth":
            state.settings.growthMode = !state.settings.growthMode;
            saveState();
            renderCurrentPage();
            break;

        case "toggle-notifications":
            state.settings.notifications = !state.settings.notifications;
            saveState();
            renderCurrentPage();
            break;

        case "reset-app":
            resetApp();
            break;

        case "premium-info":
            toast("Growth Pro is coming soon.", "info");
            break;

        default:
            break;
    }
}

function openLesson(id) {
    var lesson = findLesson(id);

    if (!lesson) {
        toast("Lesson မတွေ့ပါ", "error");
        return;
    }

    state.currentLesson = id;
    state.currentPage = "lesson";

    renderPageSafely(renderLessonDetail, "Lesson");
}

/* =========================================================
   RESET
   ========================================================= */

function resetApp() {
    var confirmed = window.confirm(
        "Aung Business Academy ရဲ့ Local Data တွေကို Reset လုပ်မလား?"
    );

    if (!confirmed) return;

    try {
        Object.keys(KEYS).forEach(function (key) {
            localStorage.removeItem(KEYS[key]);
        });
    } catch (error) {}

    state.profile = DEFAULT_PROFILE;
    state.settings = DEFAULT_SETTINGS;
    state.progress = {};
    state.goals = [];
    state.tasks = [];
    state.plan = {
        target: "",
        strategy: "",
        actions: ""
    };

    toast("App Reset Complete", "success");

    navigate("dashboard");
}

/* =========================================================
   GLOBAL ERROR BOUNDARY
   ========================================================= */

function installErrorBoundary() {
    window.onerror = function (message, source, line, column, error) {
        console.error(
            "Aung Business Academy Error:",
            message,
            source,
            line,
            column,
            error
        );

        if (!rendering) {
            toast("App မှာ Error တစ်ခုဖြစ်သွားပါတယ်။ Retry လုပ်ကြည့်ပါ။", "error");
        }

        return true;
    };

    window.addEventListener("unhandledrejection", function (event) {
        console.error(
            "Aung Business Academy Promise Error:",
            event && event.reason
        );

        if (!rendering) {
            toast("App Error ဖြစ်သွားပါတယ်။", "error");
        }
    });
}

/* =========================================================
   LOADING SCREEN
   ========================================================= */

function removeLoadingState() {
    try {
        var loading = $(".loading-screen");

        if (loading) {
            loading.remove();
        }
    } catch (error) {}
}

function showBootError(error) {
    console.error("Aung Business Academy boot error:", error);

    removeLoadingState();

    setMain(
        '<div class="page-content">' +
            pageHeader(
                "Workspace",
                "Aung Business Academy"
            ) +
            '<div class="card">' +
                '<div class="card-body">' +
                    '<div class="empty-state">' +
                        '<div class="empty-icon">!</div>' +
                        '<h3>Workspace ကို မဖွင့်နိုင်သေးပါ</h3>' +
                        '<p>App Initialization မှာ ပြဿနာတစ်ခုဖြစ်နေပါတယ်။ Retry ကိုနှိပ်ပြီး ပြန်စမ်းပါ။</p>' +
                        '<button class="btn btn-primary" data-action="retry">↻ Retry</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    );
}

/* =========================================================
   BOOT
   ========================================================= */

function boot() {
    if (initialized) {
        try {
            loadState();
            renderCurrentPage();
        } catch (error) {
            showBootError(error);
        }

        removeLoadingState();
        return;
    }

    initialized = true;

    try {
        loadState();
        installErrorBoundary();
        bindEvents();

        state.currentPage = "dashboard";

        renderCurrentPage();

    } catch (error) {
        showBootError(error);
    } finally {
        removeLoadingState();
    }
}

/* =========================================================
   PUBLIC API
   ========================================================= */

window.AungBusinessAcademy = {
    version: APP_VERSION,

    navigate: function (page) {
        navigate(page);
    },

    openLesson: function (id) {
        openLesson(id);
    },

    getLessons: function () {
        return getLessons();
    },

    getState: function () {
        return state;
    },

    resetApp: function () {
        resetApp();
    },

    reload: function () {
        initialized = false;
        boot();
    }
};

/* =========================================================
   START
   ========================================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
        boot();
    });
} else {
    boot();
}
