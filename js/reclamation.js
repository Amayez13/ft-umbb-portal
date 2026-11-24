document.addEventListener("DOMContentLoaded", () => {
    const claimDept = document.getElementById("claimDept");
    const claimModule = document.getElementById("claimModule");
    const claimTeacher = document.getElementById("claimTeacher");
    const claimForm = document.getElementById("claimForm");
    const claimsHistoryList = document.getElementById("claimsHistoryList");
    const trackSearchInput = document.getElementById("trackSearchInput");
    const receiptModal = document.getElementById("receiptModal");
    const receiptContent = document.getElementById("receiptContent");
    const closeReceiptBtn = document.getElementById("closeReceiptBtn");

    function populateModulesAndTeachers() {
        const dept = claimDept.value;
        const modulesSet = new Set();

        if (typeof TIMETABLES !== "undefined" && TIMETABLES[dept]) {
            Object.values(TIMETABLES[dept]).forEach(week => {
                Object.values(week).forEach(slots => {
                    slots.forEach(s => {
                        if (s && s.module) modulesSet.add(s.module);
                    });
                });
            });
        }

        if (modulesSet.size === 0) {
            ["Technologies Web", "Sécurité des Réseaux", "Traitement du Signal", "Automatique Linéaire", "Électronique Numérique"].forEach(m => modulesSet.add(m));
        }

        claimModule.innerHTML = [...modulesSet].sort().map(m => `<option value="${m}">${m}</option>`).join("");

        let teachersList = [];
        if (typeof TEACHERS !== "undefined") {
            teachersList = TEACHERS.filter(t => t.dept === dept);
            if (teachersList.length === 0) teachersList = TEACHERS.slice(0, 20);
        }

        claimTeacher.innerHTML = teachersList.length > 0
            ? teachersList.map(t => `<option value="${t.name}">${t.name} (${t.grade})</option>`).join("")
            : `<option value="Responsable du Module">Responsable du Module</option>`;
    }

    if (claimDept) {
        claimDept.addEventListener("change", populateModulesAndTeachers);
        populateModulesAndTeachers();
    }

    let claimsStorage = JSON.parse(localStorage.getItem("ft_reclamations") || "[]");

    function saveClaims() {
        localStorage.setItem("ft_reclamations", JSON.stringify(claimsStorage));
    }

    function renderClaimsHistory() {
        if (!claimsHistoryList) return;
        const q = (trackSearchInput?.value || "").toLowerCase().trim();
        const filtered = claimsStorage.filter(c =>
            c.id.toLowerCase().includes(q) ||
            c.matricule.includes(q) ||
            c.module.toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
            claimsHistoryList.innerHTML = `<p style="text-align: center; color: var(--text-muted); font-size: 0.86rem; padding: 1.5rem 0;">Aucune réclamation enregistrée pour le moment.</p>`;
            return;
        }

        claimsHistoryList.innerHTML = filtered.map(c => `
            <div style="background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong style="color: var(--primary); font-size: 0.88rem;">${c.id}</strong>
                    <span class="status-badge status-free" style="font-size: 0.7rem;">En cours d'examen</span>
                </div>
                <div style="font-weight: 700; font-size: 0.86rem;">${c.module} — ${c.type}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin: 3px 0 8px;">
                    Matricule : ${c.matricule} • ${c.date}
                </div>
                <button type="button" onclick="openReceipt('${c.id}')" class="btn btn-outline" style="font-size: 0.78rem; padding: 5px 10px; width: 100%;">
                    Voir & Imprimer le Récépissé
                </button>
            </div>
        `).join("");
    }

    window.openReceipt = function (claimId) {
        const claim = claimsStorage.find(c => c.id === claimId);
        if (!claim || !receiptModal) return;

        receiptContent.innerHTML = `
            <p><strong>Numéro de Suivi :</strong> <span style="color: var(--accent); font-weight: 800;">${claim.id}</span></p>
            <p><strong>Date & Heure de Dépôt :</strong> ${claim.date}</p>
            <p><strong>Étudiant :</strong> ${claim.fullName} (Matricule : ${claim.matricule})</p>
            <p><strong>Filière :</strong> Département ${claim.dept}</p>
            <p><strong>Module & Enseignant :</strong> ${claim.module} — ${claim.teacher}</p>
            <p><strong>Objet :</strong> ${claim.type}</p>
            <div style="background: var(--bg); padding: 10px; border-radius: 8px; border: 1px solid var(--border); margin-top: 8px;">
                <strong>Détail :</strong><br>${claim.message}
            </div>
            <p style="margin-top: 12px; font-size: 0.78rem; color: var(--text-muted);">
                Ce récépissé numérique atteste du dépôt de votre recours auprès de l'administration de la Faculté de Technologie (UMBB).
            </p>
        `;
        receiptModal.classList.add("open");
    };

    if (closeReceiptBtn) {
        closeReceiptBtn.addEventListener("click", () => receiptModal.classList.remove("open"));
    }

    if (claimForm) {
        claimForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const randomNum = Math.floor(10000 + Math.random() * 90000);
            const trackingId = `REC-2026-${randomNum}`;
            const nowStr = new Date().toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });

            const newClaim = {
                id: trackingId,
                matricule: document.getElementById("claimMatricule").value.trim(),
                fullName: document.getElementById("claimFullName").value.trim(),
                email: document.getElementById("claimEmail").value.trim(),
                dept: claimDept.value,
                module: claimModule.value,
                teacher: claimTeacher.value,
                type: document.getElementById("claimType").value,
                message: document.getElementById("claimMessage").value.trim(),
                date: nowStr
            };

            claimsStorage.unshift(newClaim);
            saveClaims();
            renderClaimsHistory();
            claimForm.reset();
            populateModulesAndTeachers();
            window.openReceipt(trackingId);
        });
    }

    if (trackSearchInput) {
        trackSearchInput.addEventListener("input", renderClaimsHistory);
    }

    renderClaimsHistory();
});
