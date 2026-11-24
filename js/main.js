const I18N = {
    fr: {
        facultyName: "Faculté de Technologie",
        searchBtn: "Rechercher",
        navHome: "Accueil & Plan",
        navSchedule: "Emplois du temps",
        navTeachers: "Enseignants",
        navStudents: "Listes & Moyenne",
        navClaims: "Réclamations",
        heroYear: "Année Universitaire 2026 / 2027 — Semestre 1",
        heroTitle: "Gestion Pédagogique des Départements FT",
        heroDesc: "Plateforme unifiée de la Faculté de Technologie : planning officiel en temps réel, annuaire des enseignants, listes d'étudiants, calculateur LMD et suivi des réclamations.",
        ctaSchedule: "Consulter les Emplois du Temps",
        ctaSitemap: "Plan du Site",
        liveActiveClasses: "Séances actives en ce moment :",
        liveFreeRooms: "Salles & Labos libres actuellement :",
        statSpec: "Spécialités",
        statStud: "Étudiants",
        statProf: "Enseignants",
        statDoc: "Doctorants",
        statAts: "Personnel ATS",
        deptSectionTitle: "Filières & Spécialités (Faculté de Technologie)",
        sitemapTitle: "Plan du Site (Architecture Complète)"
    },
    ar: {
        facultyName: "كلية التكنولوجيا — بومرداس",
        searchBtn: "بحث سريع",
        navHome: "الرئيسية وخريطة الموقع",
        navSchedule: "جداول التوقيت",
        navTeachers: "الأساتذة",
        navStudents: "قوائم الطلبة والمعدل",
        navClaims: "الشكاوى والطعون",
        heroYear: "السنة الجامعية 2026 / 2027 — السداسي الأول",
        heroTitle: "البوابة الرقمية لتسيير أقسام كلية التكنولوجيا",
        heroDesc: "منصة موحدة لطلبة وأساتذة جامعة أمحمد بوقرة بومرداس: جداول التوقيت الرسمية، القاعات الشاغرة لحظياً، دليل الأساتذة، قوائم الطلبة وحاسبة المعدل LMD.",
        ctaSchedule: "تصفح جداول التوقيت",
        ctaSitemap: "خريطة الموقع",
        liveActiveClasses: "الحصص الجارية حالياً في الكلية:",
        liveFreeRooms: "القاعات والمخابر الشاغرة الآن:",
        statSpec: "تخصص",
        statStud: "طالب",
        statProf: "أستاذ",
        statDoc: "طالب دكتوراه",
        statAts: "موظف إداري وتقني",
        deptSectionTitle: "التخصصات والشعب البيداغوجية",
        sitemapTitle: "خريطة الموقع (الهيكلة الشاملة)"
    }
};

let simulatedState = null;

function getActiveDayAndSlot() {
    if (simulatedState) return simulatedState;

    const daysMap = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const now = new Date();
    const dayName = daysMap[now.getDay()];
    const mins = now.getHours() * 60 + now.getMinutes();

    let slotIndex = -1;
    if (mins >= 480 && mins <= 570) slotIndex = 0;       // 08:00 - 09:30
    else if (mins >= 580 && mins <= 670) slotIndex = 1;  // 09:40 - 11:10
    else if (mins >= 680 && mins <= 770) slotIndex = 2;  // 11:20 - 12:50
    else if (mins >= 780 && mins <= 870) slotIndex = 3;  // 13:00 - 14:30
    else if (mins >= 880 && mins <= 970) slotIndex = 4;  // 14:40 - 16:10
    else if (mins >= 980 && mins <= 1070) slotIndex = 5; // 16:20 - 17:50

    return { day: dayName, slot: slotIndex, isSimulated: false };
}

function computeCampusLiveStatus() {
    if (typeof TIMETABLES === "undefined") return { activeCount: 0, freeRooms: [], busyProfs: new Set() };

    const { day, slot } = getActiveDayAndSlot();
    const allRooms = new Set();
    const occupiedRooms = new Set();
    const busyProfs = new Set();
    let activeCount = 0;

    Object.values(TIMETABLES).forEach(groups => {
        Object.values(groups).forEach(week => {
            Object.entries(week).forEach(([d, slots]) => {
                slots.forEach((s, idx) => {
                    if (s && s.room) {
                        allRooms.add(s.room);
                        if (d === day && idx === slot) {
                            occupiedRooms.add(s.room);
                            activeCount++;
                            if (s.prof) busyProfs.add(s.prof.toUpperCase());
                        }
                    }
                });
            });
        });
    });

    const freeRooms = [...allRooms].filter(r => !occupiedRooms.has(r)).slice(0, 12);
    return { activeCount, freeRooms, busyProfs, day, slot };
}

document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById("themeToggle");
    if (localStorage.getItem("ft_theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("ft_theme", next);
        });
    }

    const langToggle = document.getElementById("langToggle");
    function applyLang(lang) {
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
        localStorage.setItem("ft_lang", lang);
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (I18N[lang]?.[key]) el.textContent = I18N[lang][key];
        });
    }
    const savedLang = localStorage.getItem("ft_lang") || "fr";
    applyLang(savedLang);

    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const nextLang = document.documentElement.getAttribute("lang") === "fr" ? "ar" : "fr";
            applyLang(nextLang);
        });
    }

    const burgerBtn = document.getElementById("burgerBtn");
    const navLinks = document.getElementById("navLinks");
    if (burgerBtn && navLinks) {
        burgerBtn.addEventListener("click", () => navLinks.classList.toggle("show"));
    }

    document.querySelectorAll(".counter").forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const step = Math.max(1, Math.ceil(target / 45));
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = current;
            }
        }, 25);
    });

    function refreshLiveDashboard() {
        const summaryEl = document.getElementById("activeClassesSummary");
        const roomsEl = document.getElementById("freeRoomsContainer");
        const labelEl = document.getElementById("liveTimeLabel");
        if (!summaryEl || !roomsEl) return;

        const status = computeCampusLiveStatus();
        const slotLabels = ["08:00-09:30", "09:40-11:10", "11:20-12:50", "13:00-14:30", "14:40-16:10", "16:20-17:50"];

        if (status.slot === -1 || status.day === "Vendredi") {
            labelEl.textContent = `${status.day} — Hors créneaux pédagogiques`;
            summaryEl.textContent = "Aucune séance en cours actuellement (Campus calme).";
            roomsEl.innerHTML = `<span class="room-chip">Toutes les salles (AP1–AP6, B01–B419, RC01–RC17) sont libres</span>`;
        } else {
            labelEl.textContent = `${status.day} • ${slotLabels[status.slot]}${simulatedState ? " (Simulation)" : ""}`;
            summaryEl.textContent = `${status.activeCount} groupes en cours/TP actuellement.`;
            roomsEl.innerHTML = status.freeRooms.map(r => `<span class="room-chip">${r}</span>`).join("");
        }
    }
    refreshLiveDashboard();

    const simBtn = document.getElementById("simulateTimeBtn");
    if (simBtn) {
        simBtn.addEventListener("click", () => {
            if (simulatedState) {
                simulatedState = null;
                simBtn.textContent = "Simuler Lundi 10:00";
            } else {
                simulatedState = { day: "Lundi", slot: 1, isSimulated: true };
                simBtn.textContent = "Revenir à l'heure réelle";
            }
            refreshLiveDashboard();
            if (typeof renderTimetable === "function") renderTimetable();
            if (typeof renderTeachers === "function") renderTeachers();
        });
    }

    const cmdOverlay = document.getElementById("cmdOverlay");
    const cmdInput = document.getElementById("cmdInput");
    const cmdResults = document.getElementById("cmdResults");
    const openSearchBtn = document.getElementById("openSearchBtn");
    const closeCmdBtn = document.getElementById("closeCmdBtn");

    function openCmd() {
        if (!cmdOverlay) return;
        cmdOverlay.classList.add("open");
        cmdInput.value = "";
        cmdInput.focus();
        runGlobalSearch("");
    }
    function closeCmd() {
        if (cmdOverlay) cmdOverlay.classList.remove("open");
    }

    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            openCmd();
        } else if (e.key === "Escape") {
            closeCmd();
        }
    });
    if (openSearchBtn) openSearchBtn.addEventListener("click", openCmd);
    if (closeCmdBtn) closeCmdBtn.addEventListener("click", closeCmd);
    if (cmdOverlay) {
        cmdOverlay.addEventListener("click", (e) => {
            if (e.target === cmdOverlay) closeCmd();
        });
    }

    function runGlobalSearch(q) {
        if (!cmdResults || typeof TEACHERS === "undefined") return;
        const query = q.toLowerCase().trim();
        let html = "";

        const matchedTeachers = TEACHERS.filter(t =>
            t.name.toLowerCase().includes(query) || t.specialty.toLowerCase().includes(query)
        ).slice(0, 6);

        matchedTeachers.forEach(t => {
            html += `<a href="enseignants.html?dept=${t.dept}" class="cmd-item">
                <div><strong>${t.name}</strong><div style="font-size:0.78rem;color:var(--text-muted);">${t.specialty}</div></div>
                <span class="dept-code" style="margin:0;">${t.dept}</span>
            </a>`;
        });

        if (typeof TIMETABLES !== "undefined" && query.length >= 2) {
            Object.entries(TIMETABLES).forEach(([dept, groups]) => {
                Object.entries(groups).forEach(([grp, week]) => {
                    Object.entries(week).forEach(([day, slots]) => {
                        slots.forEach(s => {
                            if (s && (s.module.toLowerCase().includes(query) || s.room.toLowerCase().includes(query))) {
                                html += `<a href="emplois.html?dept=${dept}" class="cmd-item">
                                    <div><strong>${s.module}</strong> (${s.type}) — <span style="color:var(--accent);">${s.room}</span>
                                    <div style="font-size:0.78rem;color:var(--text-muted);">${grp} • ${day} (${s.prof})</div></div>
                                    <span class="dept-code" style="margin:0;">${dept}</span>
                                </a>`;
                            }
                        });
                    });
                });
            });
        }

        cmdResults.innerHTML = html || `<p style="padding:1rem;text-align:center;color:var(--text-muted);">Tapez un nom d'enseignant, un module ou une salle...</p>`;
    }
    if (cmdInput) cmdInput.addEventListener("input", (e) => runGlobalSearch(e.target.value));

    const urlParams = new URLSearchParams(window.location.search);
    const paramDept = urlParams.get("dept");

    const deptSelect = document.getElementById("deptSelect");
    const groupSelect = document.getElementById("groupSelect");
    const timetableBody = document.getElementById("timetableBody");

    window.renderTimetable = function () {
        if (!deptSelect || !groupSelect || !timetableBody || typeof TIMETABLES === "undefined") return;
        const dept = deptSelect.value;
        const group = groupSelect.value;
        const schedule = TIMETABLES[dept]?.[group];
        const days = ["Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];
        const live = getActiveDayAndSlot();

        if (!schedule) return;

        timetableBody.innerHTML = days.map(day => {
            const slots = schedule[day] || [null, null, null, null, null, null];
            const cells = slots.map((slot, idx) => {
                if (!slot) return `<td style="color: var(--text-muted);">—</td>`;
                const isLive = (day === live.day && idx === live.slot);
                const badgeClass = slot.type === "Cours" ? "badge-cours" : (slot.type === "TD" ? "badge-td" : "badge-tp");
                return `
                    <td>
                        <div class="slot-box ${isLive ? "slot-live" : ""}">
                            ${isLive ? `<span class="live-pill">EN COURS</span>` : ""}
                            <span class="slot-title">${slot.module}</span>
                            <span class="slot-meta">${slot.prof} • ${slot.room}</span>
                            <span class="badge ${badgeClass}">${slot.type}</span>
                        </div>
                    </td>
                `;
            }).join("");
            return `<tr><td class="day-col">${day}</td>${cells}</tr>`;
        }).join("");
    };

    if (deptSelect && groupSelect && timetableBody && typeof TIMETABLES !== "undefined") {
        if (paramDept && TIMETABLES[paramDept]) deptSelect.value = paramDept;
        function updateGroups() {
            const groups = Object.keys(TIMETABLES[deptSelect.value] || {});
            groupSelect.innerHTML = groups.map(g => `<option value="${g}">${g}</option>`).join("");
            window.renderTimetable();
        }
        deptSelect.addEventListener("change", updateGroups);
        groupSelect.addEventListener("change", window.renderTimetable);
        updateGroups();
    }

    const teacherDeptFilter = document.getElementById("teacherDeptFilter");
    const teacherSearch = document.getElementById("teacherSearch");
    const teachersGrid = document.getElementById("teachersGrid");

    window.renderTeachers = function () {
        if (!teacherDeptFilter || !teacherSearch || !teachersGrid || typeof TEACHERS === "undefined") return;
        const dept = teacherDeptFilter.value;
        const query = teacherSearch.value.toLowerCase().trim();
        const { busyProfs } = computeCampusLiveStatus();

        const filtered = TEACHERS.filter(t => {
            const matchDept = dept === "ALL" || t.dept === dept;
            const matchQuery = t.name.toLowerCase().includes(query) || t.specialty.toLowerCase().includes(query);
            return matchDept && matchQuery;
        });

        if (filtered.length === 0) {
            teachersGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Aucun enseignant trouvé.</p>`;
            return;
        }

        teachersGrid.innerHTML = filtered.map(t => {
            const parts = t.name.split(" ");
            const initials = parts.slice(0, 2).map(n => n[0]).join("");
            const lastName = parts[0].toUpperCase();
            const isBusy = [...busyProfs].some(bp => bp.includes(lastName));

            return `
                <div class="card teacher-card">
                    <div>
                        <div class="teacher-header">
                            <div class="teacher-id">
                                <div class="avatar">${initials}</div>
                                <div>
                                    <h3 style="margin-bottom: 2px; font-size: 1.05rem;">${t.name}</h3>
                                    <span style="font-size: 0.78rem; color: var(--text-muted);">${t.grade} • <strong>${t.dept}</strong></span>
                                </div>
                            </div>
                            <span class="status-badge ${isBusy ? "status-busy" : "status-free"}">
                                ${isBusy ? "En séance" : "Disponible"}
                            </span>
                        </div>
                        <p style="font-size: 0.85rem; margin-bottom: 0.5rem;"><strong>Modules :</strong> ${t.specialty}</p>
                        <p style="font-size: 0.8rem; color: var(--text-muted);">Réception : Dimanche & Mardi (11:30 - 13:00)</p>
                        <p style="font-size: 0.82rem; color: var(--accent); font-weight: 600; margin-top: 4px;">${t.email}</p>
                    </div>
                    <div class="teacher-actions">
                        <a href="mailto:${t.email}?subject=Contact%20Étudiant%20FT-UMBB" class="btn">Email</a>
                        <button onclick="copyEmail('${t.email}', this)" class="btn btn-outline">Copier</button>
                        <button onclick="downloadVCard('${t.name}', '${t.email}', '${t.dept}')" class="btn btn-outline">vCard</button>
                    </div>
                </div>
            `;
        }).join("");
    };

    if (teacherDeptFilter && teacherSearch && teachersGrid && typeof TEACHERS !== "undefined") {
        if (paramDept && DEPARTMENTS[paramDept]) teacherDeptFilter.value = paramDept;
        teacherDeptFilter.addEventListener("change", window.renderTeachers);
        teacherSearch.addEventListener("input", window.renderTeachers);
        window.renderTeachers();
    }
});

function copyEmail(email, btn) {
    navigator.clipboard.writeText(email).then(() => {
        const old = btn.textContent;
        btn.textContent = "Copié !";
        setTimeout(() => btn.textContent = old, 1800);
    });
}

function downloadVCard(name, email, dept) {
    const vcf = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:Université M'hamed Bougara Boumerdès - FT (${dept})\nTITLE:Enseignant-Chercheur\nEMAIL;TYPE=INTERNET:${email}\nEND:VCARD`;
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportTimetableICS() {
    const deptSelect = document.getElementById("deptSelect");
    const groupSelect = document.getElementById("groupSelect");
    if (!deptSelect || !groupSelect || typeof TIMETABLES === "undefined") return;

    const dept = deptSelect.value;
    const group = groupSelect.value;
    const schedule = TIMETABLES[dept]?.[group];
    if (!schedule) return;

    const dayDates = {
        Samedi: "20261121",
        Dimanche: "20261122",
        Lundi: "20261123",
        Mardi: "20261124",
        Mercredi: "20261125",
        Jeudi: "20261126"
    };
    const slotTimes = [
        ["080000", "093000"],
        ["094000", "111000"],
        ["112000", "125000"],
        ["130000", "143000"],
        ["144000", "161000"],
        ["162000", "175000"]
    ];

    let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//FT UMBB//Emploi du Temps//FR\n";
    Object.entries(schedule).forEach(([day, slots]) => {
        const dateStr = dayDates[day];
        slots.forEach((s, idx) => {
            if (s && dateStr) {
                const [start, end] = slotTimes[idx];
                ics += `BEGIN:VEVENT\nSUMMARY:${s.module} (${s.type})\nLOCATION:${s.room} - FT UMBB\nDESCRIPTION:Enseignant: ${s.prof} | Groupe: ${group}\nDTSTART:${dateStr}T${start}\nDTEND:${dateStr}T${end}\nRRULE:FREQ=WEEKLY;COUNT=14\nEND:VEVENT\n`;
            }
        });
    });
    ics += "END:VCALENDAR";

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Emploi_${group.replace(/[^a-zA-Z0-9]/g, "_")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
}

/* =========================================================
UI ANIMATION & INTERACTION CONTROLLER (ALL PAGES)
   ========================================================= */
(function initModernAnimations() {
    // 1. Trigger smooth page entrance immediately
    requestAnimationFrame(() => {
        document.body.classList.add("page-ready");
    });

    // Fix back-button cache freeze (bfcache)
    window.addEventListener("pageshow", (e) => {
        if (e.persisted) {
            document.body.classList.remove("page-leaving");
            document.body.classList.add("page-ready");
        }
    });

    // 2. Smooth page exit transition when clicking internal HTML links
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;
        const href = link.getAttribute("href");
        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            link.target === "_blank" ||
            link.hasAttribute("download") ||
            e.ctrlKey || e.metaKey || e.shiftKey
        ) {
            return;
        }

        e.preventDefault();
        document.body.classList.add("page-leaving");
        setTimeout(() => {
            window.location.href = href;
        }, 240);
    });

    // 3. Glassmorphic sticky navbar elevation on scroll
    const headerEl = document.querySelector("header");
    if (headerEl) {
        window.addEventListener("scroll", () => {
            headerEl.classList.toggle("scrolled", window.scrollY > 18);
        }, { passive: true });
    }

    // 4. Mouse-tracking radial spotlight glow on cards
    document.addEventListener("mousemove", (e) => {
        const card = e.target.closest(".bento-card, .stat-card, .teacher-card");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    }, { passive: true });

    // 5. Staggered Scroll-Reveal Observer
    const revealSelector = ".hero-main, .live-panel, .stat-card, .bento-card, .sitemap-box, .controls-bar, .table-responsive, .arch-wrapper, .library-banner, .account-bar";
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

    document.querySelectorAll(revealSelector).forEach((el, idx) => {
        el.classList.add("reveal-item");
        // Stagger delay for sibling cards in grids
        const delay = (idx % 5) * 65;
        el.style.transitionDelay = `${delay}ms`;
        observer.observe(el);
    });
})();
