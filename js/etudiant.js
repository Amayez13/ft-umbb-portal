document.addEventListener("DOMContentLoaded", () => {
    const stuDeptSelect = document.getElementById("stuDeptSelect");
    const stuGroupSelect = document.getElementById("stuGroupSelect");
    const stuSearchInput = document.getElementById("stuSearchInput");
    const studentsTableBody = document.getElementById("studentsTableBody");
    const studentsCountLabel = document.getElementById("studentsCountLabel");
    const exportCsvBtn = document.getElementById("exportCsvBtn");

    const GROUPS_BY_DEPT = {
        RT: ["M2-RT (Groupe 1)", "M1-RT (Groupe 1)", "L3-TEL (Groupe 1)", "L3-TEL (Groupe 2)"],
        AUTO: ["M2-AUTO (Groupe 1)", "M1-AUTO (Groupe 1)", "L3-AUTO (Groupe 1)"],
        ELEC: ["M2-SE (Groupe 1)", "M1-ELEC (Groupe 1)", "L3-ELEC (Groupe 1)"],
        ELCT: ["M2-ELCT (Groupe 1)", "M1-ELCT (Groupe 1)", "L3-ELCT (Groupe 1)"],
        CIL: ["M2-CIL (Groupe 1)", "M1-CIL (Groupe 1)"],
        BIO: ["M2-BIO (Groupe 1)", "L3-BIO (Groupe 1)"]
    };

    // توليد قائمة طلبة واقعية بأرقام تسجيل مجهولة الاسم لحماية الخصوصية
    function getStudentsForGroup(dept, group) {
        const seedBase = dept.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) + group.length * 13;
        const list = [];
        for (let i = 1; i <= 24; i++) {
            const yearPrefix = group.startsWith("M2") ? "2121" : (group.startsWith("M1") ? "2222" : "2323");
            const serial = String(31040000 + ((seedBase * 97 + i * 313) % 899999)).padStart(8, "0");
            const matricule = `${yearPrefix}${serial}`;
            const anonCode = `ETU-${dept}-${String(i).padStart(2, "0")}`;
            list.push({
                num: i,
                matricule,
                anonCode,
                dept,
                group,
                status: i % 11 === 0 ? "Dette / Ajourné" : "Inscrit Régulier"
            });
        }
        return list;
    }

    let currentFilteredStudents = [];

    function renderStudentsTable() {
        if (!stuDeptSelect || !stuGroupSelect || !studentsTableBody) return;
        const dept = stuDeptSelect.value;
        const group = stuGroupSelect.value;
        const query = stuSearchInput.value.trim().toLowerCase();

        const all = getStudentsForGroup(dept, group);
        currentFilteredStudents = all.filter(s =>
            s.matricule.includes(query) || s.anonCode.toLowerCase().includes(query)
        );

        studentsCountLabel.textContent = `${currentFilteredStudents.length} étudiants affichés — ${group}`;

        studentsTableBody.innerHTML = currentFilteredStudents.map(s => `
            <tr>
                <td><strong>${String(s.num).padStart(2, "0")}</strong></td>
                <td style="font-family: monospace; font-weight: 700; font-size: 0.92rem;">${s.matricule}</td>
                <td>${s.anonCode}</td>
                <td><span class="dept-code" style="margin: 0;">${s.dept}</span></td>
                <td>${s.group}</td>
                <td><span class="status-badge ${s.status === "Inscrit Régulier" ? "status-free" : "status-busy"}">${s.status}</span></td>
            </tr>
        `).join("");
    }

    function updateGroupDropdown() {
        const dept = stuDeptSelect.value;
        const groups = GROUPS_BY_DEPT[dept] || ["Groupe 1"];
        stuGroupSelect.innerHTML = groups.map(g => `<option value="${g}">${g}</option>`).join("");
        renderStudentsTable();
    }

    if (stuDeptSelect) {
        const urlDept = new URLSearchParams(window.location.search).get("dept");
        if (urlDept && GROUPS_BY_DEPT[urlDept]) stuDeptSelect.value = urlDept;

        stuDeptSelect.addEventListener("change", updateGroupDropdown);
        stuGroupSelect.addEventListener("change", renderStudentsTable);
        stuSearchInput.addEventListener("input", renderStudentsTable);
        updateGroupDropdown();
    }

    // تصدير القائمة بصيغة CSV حقيقية عبر Blob
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener("click", () => {
            if (currentFilteredStudents.length === 0) return;
            const headers = ["Numero", "Matricule", "Identifiant", "Filiere", "Groupe", "Statut"];
            const rows = currentFilteredStudents.map(s => [
                s.num, `"${s.matricule}"`, s.anonCode, s.dept, `"${s.group}"`, `"${s.status}"`
            ]);
            const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map(r => r.join(";"))].join("\n");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Liste_Etudiants_${stuDeptSelect.value}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    // =========================================================
    // حاسبة المعدل بنظام LMD (40% TD/TP + 60% Examen)
    // =========================================================
    const lmdTableBody = document.getElementById("lmdTableBody");
    const lmdFinalAvg = document.getElementById("lmdFinalAvg");
    const lmdTotalCredits = document.getElementById("lmdTotalCredits");
    const lmdDecisionBadge = document.getElementById("lmdDecisionBadge");

    const DEFAULT_MODULES = [
        { name: "Technologies Web & Développement", coeff: 3, credits: 6, td: 14.5, exam: 13.0 },
        { name: "Sécurité & Cryptographie des Réseaux", coeff: 3, credits: 6, td: 13.0, exam: 12.5 },
        { name: "Réseaux Sans Fil & Mobiles (IoT)", coeff: 3, credits: 6, td: 12.0, exam: 11.5 },
        { name: "Routage Avancé & Qualité de Service", coeff: 2, credits: 4, td: 14.0, exam: 10.5 },
        { name: "Administration Systèmes & Linux", coeff: 2, credits: 4, td: 15.0, exam: 13.5 },
        { name: "Anglais Technique & Rédaction", coeff: 2, credits: 4, td: 14.0, exam: 14.0 }
    ];

    let modulesData = JSON.parse(JSON.stringify(DEFAULT_MODULES));

    function recalculateLMD() {
        let weightedSum = 0;
        let totalCoeff = 0;
        let earnedCredits = 0;
        let possibleCredits = 0;

        modulesData.forEach((m, index) => {
            const td = Math.min(20, Math.max(0, parseFloat(m.td) || 0));
            const exam = Math.min(20, Math.max(0, parseFloat(m.exam) || 0));
            const coeff = Math.max(1, parseFloat(m.coeff) || 1);
            const credits = Math.max(1, parseFloat(m.credits) || 1);

            const modAvg = td * 0.4 + exam * 0.6;
            weightedSum += modAvg * coeff;
            totalCoeff += coeff;
            possibleCredits += credits;

            if (modAvg >= 10) earnedCredits += credits;

            const avgCell = document.getElementById(`modAvg_${index}`);
            if (avgCell) {
                avgCell.textContent = modAvg.toFixed(2);
                avgCell.style.color = modAvg >= 10 ? "var(--success)" : "var(--danger)";
            }
        });

        const finalAvg = totalCoeff > 0 ? (weightedSum / totalCoeff) : 0;
        // في نظام LMD إذا كان المعدل العام >= 10 يكتسب الطالب كامل أرصدة السداسي (30) بالتعويض
        const finalCredits = finalAvg >= 10 ? possibleCredits : earnedCredits;

        lmdFinalAvg.textContent = `${finalAvg.toFixed(2)} / 20`;
        lmdTotalCredits.textContent = `${finalCredits} / ${possibleCredits}`;

        if (finalAvg >= 10) {
            lmdDecisionBadge.textContent = "ADMIS — Semestre Validé";
            lmdDecisionBadge.className = "status-badge status-free";
        } else {
            lmdDecisionBadge.textContent = "AJOURNÉ — Session de Rattrapage";
            lmdDecisionBadge.className = "status-badge status-busy";
        }
    }

    function renderLmdRows() {
        if (!lmdTableBody) return;
        lmdTableBody.innerHTML = modulesData.map((m, i) => `
            <tr>
                <td style="text-align: start; padding-inline-start: 12px;">
                    <input type="text" value="${m.name}" onchange="updateLmdField(${i}, 'name', this.value)"
                        style="width: 100%; padding: 6px 8px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text); font-weight: 600;">
                </td>
                <td><input type="number" min="1" max="6" value="${m.coeff}" oninput="updateLmdField(${i}, 'coeff', this.value)" style="width: 65px; padding: 6px; text-align: center; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text);"></td>
                <td><input type="number" min="1" max="10" value="${m.credits}" oninput="updateLmdField(${i}, 'credits', this.value)" style="width: 65px; padding: 6px; text-align: center; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text);"></td>
                <td><input type="number" step="0.25" min="0" max="20" value="${m.td}" oninput="updateLmdField(${i}, 'td', this.value)" style="width: 80px; padding: 6px; text-align: center; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text);"></td>
                <td><input type="number" step="0.25" min="0" max="20" value="${m.exam}" oninput="updateLmdField(${i}, 'exam', this.value)" style="width: 80px; padding: 6px; text-align: center; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text);"></td>
                <td><strong id="modAvg_${i}" style="font-size: 0.95rem;">0.00</strong></td>
                <td><button type="button" onclick="removeLmdRow(${i})" class="icon-btn" style="color: var(--danger); padding: 4px 9px;">✕</button></td>
            </tr>
        `).join("");
        recalculateLMD();
    }

    window.updateLmdField = function (index, field, value) {
        modulesData[index][field] = value;
        recalculateLMD();
    };

    window.removeLmdRow = function (index) {
        if (modulesData.length <= 1) return;
        modulesData.splice(index, 1);
        renderLmdRows();
    };

    const addModuleRowBtn = document.getElementById("addModuleRowBtn");
    const resetLmdBtn = document.getElementById("resetLmdBtn");

    if (addModuleRowBtn) {
        addModuleRowBtn.addEventListener("click", () => {
            modulesData.push({ name: "Nouveau Module", coeff: 2, credits: 4, td: 10, exam: 10 });
            renderLmdRows();
        });
    }
    if (resetLmdBtn) {
        resetLmdBtn.addEventListener("click", () => {
            modulesData = JSON.parse(JSON.stringify(DEFAULT_MODULES));
            renderLmdRows();
        });
    }

    renderLmdRows();
});