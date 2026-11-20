document.addEventListener("DOMContentLoaded", () => {
    // 1. التبديل بين تبويب المكتبة 3D وتبويب محاكي القاعات الفارغة
    const tabBtns = document.querySelectorAll(".tab-btn");
    const librarySection = document.getElementById("librarySection");
    const roomsSection = document.getElementById("roomsSection");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const target = btn.getAttribute("data-target");
            if (librarySection) librarySection.style.display = target === "librarySection" ? "block" : "none";
            if (roomsSection) roomsSection.style.display = target === "roomsSection" ? "block" : "none";
        });
    });

    // 2. محاكي البحث عن القاعات الفارغة للمراجعة (يعتمد على TIMETABLES في data.js)
    const simDaySelect = document.getElementById("simDaySelect");
    const simSlotSelect = document.getElementById("simSlotSelect");
    const simTypeFilter = document.getElementById("simTypeFilter");
    const freeRoomsResults = document.getElementById("freeRoomsResults");
    const freeRoomsCount = document.getElementById("freeRoomsCount");

    function classifyRoom(roomName) {
        const r = roomName.toUpperCase();
        if (r.startsWith("AP") || /^A\d/.test(r)) return "AMPHI";
        if (r.includes("INFO") || r.includes("RC") || r.includes("LAB") || r.includes("AT") || r.includes("EEA") || r.includes("C011") || r.includes("C31")) return "LABO";
        return "SALLE";
    }

    function updateFreeRoomsSimulator() {
        if (!simDaySelect || typeof TIMETABLES === "undefined") return;
        const selectedDay = simDaySelect.value;
        const selectedSlot = parseInt(simSlotSelect.value, 10);
        const typeFilter = simTypeFilter.value;

        const allRooms = new Set();
        const busyNow = new Set();
        const busyNext = new Set();

        Object.values(TIMETABLES).forEach(groups => {
            Object.values(groups).forEach(week => {
                Object.entries(week).forEach(([day, slots]) => {
                    slots.forEach((s, idx) => {
                        if (s && s.room) {
                            allRooms.add(s.room);
                            if (day === selectedDay && idx === selectedSlot) busyNow.add(s.room);
                            if (day === selectedDay && idx === selectedSlot + 1) busyNext.add(s.room);
                        }
                    });
                });
            });
        });

        const available = [...allRooms].filter(room => {
            if (busyNow.has(room)) return false;
            if (typeFilter !== "ALL" && classifyRoom(room) !== typeFilter) return false;
            return true;
        }).sort();

        if (freeRoomsCount) {
            freeRoomsCount.textContent = `${available.length} espaces disponibles pour réviser (${selectedDay})`;
        }
        if (freeRoomsResults) {
            freeRoomsResults.innerHTML = available.map(room => {
                const type = classifyRoom(room);
                const nextStatus = selectedSlot < 5
                    ? (busyNext.has(room) ? "Occupée au créneau suivant" : "Libre aussi au créneau suivant")
                    : "Dernier créneau de la journée";
                return `
                    <div class="room-result-card">
                        <div>
                            <strong style="font-size: 1.05rem;">${room}</strong>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">${nextStatus}</div>
                        </div>
                        <span class="dept-code" style="margin: 0;">${type}</span>
                    </div>
                `;
            }).join("");
        }
    }

    if (simDaySelect) {
        simDaySelect.addEventListener("change", updateFreeRoomsSimulator);
        simSlotSelect.addEventListener("change", updateFreeRoomsSimulator);
        simTypeFilter.addEventListener("change", updateFreeRoomsSimulator);
        updateFreeRoomsSimulator();
    }

    // 3. أوقات عمل المكتبة (أيام عادية 08:30 - 17:30 | أيام الامتحانات 08:30 - 00:00)
    let isExamPeriod = false;
    const examModeToggle = document.getElementById("examModeToggle");
    const libHoursText = document.getElementById("libHoursText");
    const libOpenBadge = document.getElementById("libOpenBadge");

    function updateLibraryHours() {
        if (!libHoursText || !libOpenBadge || !examModeToggle) return;
        const now = new Date();
        const mins = now.getHours() * 60 + now.getMinutes();
        const openMins = 8 * 60 + 30;
        const closeMins = isExamPeriod ? (24 * 60) : (17 * 60 + 30);

        const isOpen = mins >= openMins && mins < closeMins;
        libHoursText.innerHTML = isExamPeriod
            ? `Période d'Examens (Nocturne) : <strong>08:30 — 00:00 (Minuit)</strong>`
            : `Horaires normaux : <strong>08:30 — 17:30</strong>`;

        libOpenBadge.textContent = isOpen ? "Ouverte" : "Fermée (Mode Démo Actif)";
        libOpenBadge.className = `status-badge ${isOpen ? "status-free" : "status-busy"}`;
        examModeToggle.textContent = isExamPeriod
            ? "Revenir aux Horaires Normaux (17:30)"
            : "Basculer en Mode Examens (08:30 — 00:00)";
    }

    if (examModeToggle) {
        examModeToggle.addEventListener("click", () => {
            isExamPeriod = !isExamPeriod;
            updateLibraryHours();
        });
        updateLibraryHours();
    }

    // 4. نظام الطوابق الثلاثة 3D (1: استقبال | 2: طاولات T-01..T-12 | 3: طاولات T-13..T-24)
    let activeFloor = 2; // يبدأ بالطابق الثاني لإظهار الطاولات 3D مباشرة
    let is3DView = true;
    let rotZ = -28;

    const FLOOR_2_TABLES = [
        { id: "T-01", x: 75,  y: 75,  rot: -14 },
        { id: "T-02", x: 195, y: 55,  rot: -6 },
        { id: "T-03", x: 315, y: 55,  rot: 0 },
        { id: "T-04", x: 435, y: 70,  rot: 10 },

        { id: "T-05", x: 75,  y: 195, rot: -14 },
        { id: "T-06", x: 195, y: 175, rot: -6 },
        { id: "T-07", x: 315, y: 175, rot: 0 },
        { id: "T-08", x: 435, y: 190, rot: 10 },

        { id: "T-09", x: 75,  y: 315, rot: -14 },
        { id: "T-10", x: 195, y: 295, rot: -6 },
        { id: "T-11", x: 315, y: 295, rot: 0 },
        { id: "T-12", x: 435, y: 310, rot: 10 }
    ];

    const FLOOR_3_TABLES = [
        { id: "T-13", x: 80,  y: 70,  rot: 0 },
        { id: "T-14", x: 205, y: 70,  rot: 0 },
        { id: "T-15", x: 330, y: 70,  rot: 0 },
        { id: "T-16", x: 455, y: 70,  rot: 0 },

        { id: "T-17", x: 80,  y: 195, rot: 0 },
        { id: "T-18", x: 205, y: 195, rot: 0 },
        { id: "T-19", x: 330, y: 195, rot: 0 },
        { id: "T-20", x: 455, y: 195, rot: 0 },

        { id: "T-21", x: 80,  y: 320, rot: 0 },
        { id: "T-22", x: 205, y: 320, rot: 0 },
        { id: "T-23", x: 330, y: 320, rot: 0 },
        { id: "T-24", x: 455, y: 320, rot: 0 }
    ];

    let seatsState = JSON.parse(localStorage.getItem("ft_library_seats") || "null");
    if (!seatsState) {
        seatsState = {
            "T-02": { matricule: "20213108****", name: "Étudiant M2", since: Date.now() - 12 * 60000 },
            "T-06": { matricule: "21213104****", name: "Étudiant L3", since: Date.now() - 25 * 60000 },
            "T-11": { matricule: "20223109****", name: "Étudiant M1", since: Date.now() - 5 * 60000 },
            "T-15": { matricule: "20213102****", name: "Étudiant M2", since: Date.now() - 19 * 60000 },
            "T-20": { matricule: "21213107****", name: "Étudiant L3", since: Date.now() - 8 * 60000 }
        };
        localStorage.setItem("ft_library_seats", JSON.stringify(seatsState));
    }

    let currentStudent = JSON.parse(localStorage.getItem("ft_student_user") || "null");
    let selectedTableForScan = null;
    let toastTimeout = null;

    const studentLoginForm = document.getElementById("studentLoginForm");
    const studentDashboard = document.getElementById("studentDashboard");
    const loggedStudentInfo = document.getElementById("loggedStudentInfo");
    const activeSeatInfo = document.getElementById("activeSeatInfo");
    const seatTimerDisplay = document.getElementById("seatTimerDisplay");
    const sim30MinBtn = document.getElementById("sim30MinBtn");
    const releaseSeatBtn = document.getElementById("releaseSeatBtn");
    const logoutStudentBtn = document.getElementById("logoutStudentBtn");
    const isoBuilding = document.getElementById("isoBuilding");
    const floorSubtitle = document.getElementById("floorSubtitle");

    function saveSeats() {
        localStorage.setItem("ft_library_seats", JSON.stringify(seatsState));
    }

    function getMySeatId() {
        if (!currentStudent) return null;
        return Object.keys(seatsState).find(id => seatsState[id]?.matricule === currentStudent.matricule) || null;
    }

    function applyCameraTransform() {
        if (!isoBuilding) return;
        if (is3DView) {
            isoBuilding.style.transform = `rotateX(52deg) rotateZ(${rotZ}deg) scale(0.88)`;
        } else {
            isoBuilding.style.transform = `rotateX(0deg) rotateZ(0deg) scale(0.95)`;
        }
    }

    function generateQrSvg(text) {
        let cells = "";
        let hash = 0;
        for (let i = 0; i < text.length; i++) hash = ((hash << 5) - hash) + text.charCodeAt(i);
        const size = 15;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const inFinder = (r < 4 && c < 4) || (r < 4 && c > size - 5) || (r > size - 5 && c < 4);
                const bit = inFinder
                    ? (r === 0 || r === 3 || c === 0 || c === 3 || r === size - 1 || r === size - 4 || c === size - 1 || c === size - 4 || (r === 1 && c === 1) || (r === 2 && c === 2))
                    : (((hash + r * 17 + c * 31) & 3) === 0);
                if (bit) cells += `<rect x="${c * 10}" y="${r * 10}" width="10" height="10" fill="#0b2545"/>`;
            }
        }
        return `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">${cells}</svg>`;
    }

    function renderDeskHtml(t, mySeat) {
        const occ = seatsState[t.id];
        const isMine = t.id === mySeat;
        const cls = isMine ? "mine" : (occ ? "occupied" : "free");
        const statusText = isMine ? "Ma Place" : (occ ? "Occupée" : "Libre");
        return `
            <button type="button" class="iso-desk ${cls}"
                style="left: ${t.x}px; top: ${t.y}px; transform: translateZ(14px) rotateZ(${t.rot}deg);"
                onclick="handleSeatClick('${t.id}')">
                <span class="desk-id">${t.id}</span>
                <span class="desk-tag">${statusText}</span>
            </button>
        `;
    }

    function renderBuilding3D() {
        if (!isoBuilding) return;
        const mySeat = getMySeatId();

        const free2 = FLOOR_2_TABLES.filter(t => !seatsState[t.id]).length;
        const free3 = FLOOR_3_TABLES.filter(t => !seatsState[t.id]).length;
        const f2El = document.getElementById("floor2Count");
        const f3El = document.getElementById("floor3Count");
        if (f2El) f2El.textContent = `${free2}/12 libres`;
        if (f3El) f3El.textContent = `${free3}/12 libres`;

        document.querySelectorAll(".floor-btn").forEach(btn => {
            btn.classList.toggle("active", parseInt(btn.dataset.floor, 10) === activeFloor);
        });

        const wallsHtml = `
            <div class="iso-wall-top">
                <div class="wall-window-h"></div>
                <div class="wall-window-h"></div>
                <div class="wall-window-h"></div>
                <div class="wall-window-h"></div>
            </div>
            <div class="iso-wall-left">
                <div class="wall-window-v"></div>
                <div class="wall-window-v"></div>
                <div class="wall-window-v"></div>
            </div>
        `;

        if (activeFloor === 1) {
            if (floorSubtitle) floorSubtitle.textContent = "1er Étage : Réception, orientation, catalogues et prêt d'ouvrages (Aucune table d'étude)";
            isoBuilding.innerHTML = `
                ${wallsHtml}
                <div class="zone-tag" style="top: 20px; left: 265px;">1ER ÉTAGE — HALL DE RÉCEPTION</div>
                <div class="zone-tag" style="top: 170px; left: 295px;">Comptoir d'Accueil & Prêt</div>
                <div class="reception-counter">
                    <span>ACCUEIL & BIBLIOTHÉCAIRES</span>
                    <span style="font-size:0.7rem; font-weight:500; color:#fde047;">Scan Carte Étudiant & Orientation</span>
                </div>

                <div class="kiosk-station">Bornes Catalogues OPAC</div>

                <div class="iso-bookshelf" style="top: 40px; left: 30px; width: 150px; height: 26px;">NOUVEAUTÉS</div>
                <div class="iso-bookshelf" style="top: 40px; right: 30px; width: 150px; height: 26px;">PÉRIODIQUES</div>
                <div class="iso-bookshelf" style="top: 130px; right: 24px; width: 26px; height: 180px;">CASIERS</div>

                <div class="lounge-sofa">
                    <div class="sofa-piece"></div>
                    <div class="sofa-piece"></div>
                    <span style="font-size:0.68rem; font-weight:800; color:#334155;">Espace Détente & Presse</span>
                </div>

                <div class="iso-stairs" onclick="switchFloor(2)" title="Monter au 2ème étage">
                    <span>Monter 2e Étage ↑</span>
                </div>
            `;
        } else if (activeFloor === 2) {
            if (floorSubtitle) floorSubtitle.textContent = "2ème Étage : Salle de Lecture Principale — Tables T-01 à T-12 (Cliquez sur une table pour scanner son QR)";
            const desksHtml = FLOOR_2_TABLES.map(t => renderDeskHtml(t, mySeat)).join("");
            isoBuilding.innerHTML = `
                ${wallsHtml}
                <div class="zone-tag" style="top: 16px; left: 220px;">2ÈME ÉTAGE — SALLE DE LECTURE SILENCIEUSE</div>
                <div class="zone-tag" style="bottom: 18px; left: 190px;">Rayonnages Génie Électrique & Télécoms</div>
                ${desksHtml}
                <div class="iso-bookshelf" style="top: 65px; right: 24px; width: 28px; height: 270px;">LIVRES</div>
                <div class="iso-bookshelf" style="bottom: 52px; left: 160px; width: 290px; height: 24px;">ARCHIVES & THÈSES</div>
                <div class="iso-stairs" onclick="switchFloor(3)" title="Monter au 3ème étage">
                    <span>Monter 3e Étage ↑</span>
                </div>
            `;
        } else {
            if (floorSubtitle) floorSubtitle.textContent = "3ème Étage : Espace Collaboratif & Postes Connectés — Tables T-13 à T-24";
            const desksHtml = FLOOR_3_TABLES.map(t => renderDeskHtml(t, mySeat)).join("");
            isoBuilding.innerHTML = `
                ${wallsHtml}
                <div class="zone-tag" style="top: 16px; left: 210px;">3ÈME ÉTAGE — ESPACE TECH & GROUPES</div>
                <div class="zone-tag" style="bottom: 18px; left: 195px;">Zone Prises Électriques & Wi-Fi Haut Débit</div>
                ${desksHtml}
                <div class="iso-bookshelf" style="top: 65px; right: 24px; width: 28px; height: 270px;">REVUES</div>
                <div class="iso-bookshelf" style="bottom: 52px; left: 160px; width: 290px; height: 24px;">MÉMOIRES M2</div>
                <div class="iso-stairs" onclick="switchFloor(1)" title="Descendre à la réception">
                    <span>Accueil (1er) ↓</span>
                </div>
            `;
        }

        applyCameraTransform();
    }

    window.switchFloor = function (floorNum) {
        activeFloor = floorNum;
        renderBuilding3D();
    };

    document.querySelectorAll(".floor-btn").forEach(btn => {
        btn.addEventListener("click", () => switchFloor(parseInt(btn.dataset.floor, 10)));
    });

    const toggle3DBtn = document.getElementById("toggle3DBtn");
    const rotateLeftBtn = document.getElementById("rotateLeftBtn");
    const rotateRightBtn = document.getElementById("rotateRightBtn");

    if (toggle3DBtn) {
        toggle3DBtn.addEventListener("click", () => {
            is3DView = !is3DView;
            applyCameraTransform();
        });
    }
    if (rotateLeftBtn) {
        rotateLeftBtn.addEventListener("click", () => {
            is3DView = true;
            rotZ -= 12;
            applyCameraTransform();
        });
    }
    if (rotateRightBtn) {
        rotateRightBtn.addEventListener("click", () => {
            is3DView = true;
            rotZ += 12;
            applyCameraTransform();
        });
    }

    // 5. إدارة حساب الطالب ومسح رمز QR
    function updateAccountUI() {
        if (!studentLoginForm) return;
        if (!currentStudent) {
            studentLoginForm.style.display = "flex";
            studentDashboard.style.display = "none";
            renderBuilding3D();
            return;
        }

        studentLoginForm.style.display = "none";
        studentDashboard.style.display = "flex";
        loggedStudentInfo.textContent = `${currentStudent.name} (Matricule : ${currentStudent.matricule})`;

        const mySeat = getMySeatId();
        if (mySeat) {
            activeSeatInfo.innerHTML = `Place occupée : <strong>${mySeat}</strong> — Vérification automatique toutes les 30 min.`;
            seatTimerDisplay.style.display = "inline-block";
            sim30MinBtn.style.display = "inline-flex";
            releaseSeatBtn.style.display = "inline-flex";
        } else {
            activeSeatInfo.textContent = "Aucune table réservée. Cliquez sur une table libre (verte) pour scanner son QR Code.";
            seatTimerDisplay.style.display = "none";
            sim30MinBtn.style.display = "none";
            releaseSeatBtn.style.display = "none";
        }
        renderBuilding3D();
    }

    if (studentLoginForm) {
        studentLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            currentStudent = {
                matricule: document.getElementById("studentMatricule").value.trim(),
                name: document.getElementById("studentName").value.trim()
            };
            localStorage.setItem("ft_student_user", JSON.stringify(currentStudent));
            updateAccountUI();
        });
    }

    if (logoutStudentBtn) {
        logoutStudentBtn.addEventListener("click", () => {
            currentStudent = null;
            localStorage.removeItem("ft_student_user");
            updateAccountUI();
        });
    }

    const qrModal = document.getElementById("qrModal");
    window.handleSeatClick = function (tableId) {
        const occ = seatsState[tableId];
        if (occ && (!currentStudent || occ.matricule !== currentStudent.matricule)) {
            alert(`La table ${tableId} est actuellement occupée par l'étudiant (${occ.matricule}).`);
            return;
        }
        if (!currentStudent) {
            alert("Veuillez d'abord vous connecter avec votre matricule étudiant dans la barre ci-dessus.");
            document.getElementById("studentMatricule").focus();
            return;
        }
        if (occ && occ.matricule === currentStudent.matricule) {
            if (confirm(`Voulez-vous scanner la sortie et libérer votre table ${tableId} ?`)) {
                delete seatsState[tableId];
                saveSeats();
                updateAccountUI();
            }
            return;
        }

        selectedTableForScan = tableId;
        document.getElementById("qrModalTitle").textContent = `QR Code — Table ${tableId}`;
        document.getElementById("qrSvgContainer").innerHTML = generateQrSvg(`UMBB-FT-LIB-${tableId}`);
        qrModal.classList.add("open");
    };

    const closeQrModalBtn = document.getElementById("closeQrModalBtn");
    if (closeQrModalBtn) {
        closeQrModalBtn.addEventListener("click", () => qrModal.classList.remove("open"));
    }

    const confirmScanBtn = document.getElementById("confirmScanBtn");
    if (confirmScanBtn) {
        confirmScanBtn.addEventListener("click", () => {
            if (!selectedTableForScan || !currentStudent) return;
            const oldSeat = getMySeatId();
            if (oldSeat) delete seatsState[oldSeat];

            seatsState[selectedTableForScan] = {
                matricule: currentStudent.matricule,
                name: currentStudent.name,
                since: Date.now()
            };
            saveSeats();
            qrModal.classList.remove("open");
            updateAccountUI();
        });
    }

    if (releaseSeatBtn) {
        releaseSeatBtn.addEventListener("click", () => {
            const mySeat = getMySeatId();
            if (mySeat) {
                delete seatsState[mySeat];
                saveSeats();
                hidePingToast();
                updateAccountUI();
            }
        });
    }

    // 6. مؤقت التحقق التلقائي كل 30 دقيقة
    const pingToast = document.getElementById("pingToast");
    const pingCountdown = document.getElementById("pingCountdown");

    function trigger30MinVerification() {
        const mySeat = getMySeatId();
        if (!mySeat || !pingToast || pingToast.classList.contains("show")) return;

        pingToast.classList.add("show");
        let secondsLeft = 15;
        pingCountdown.textContent = `${secondsLeft}s`;

        clearInterval(toastTimeout);
        toastTimeout = setInterval(() => {
            secondsLeft--;
            pingCountdown.textContent = `${secondsLeft}s`;
            if (secondsLeft <= 0) {
                delete seatsState[mySeat];
                saveSeats();
                hidePingToast();
                updateAccountUI();
                alert(`Temps écoulé : la table ${mySeat} a été libérée automatiquement.`);
            }
        }, 1000);
    }

    function hidePingToast() {
        if (pingToast) pingToast.classList.remove("show");
        clearInterval(toastTimeout);
    }

    const extendSeatBtn = document.getElementById("extendSeatBtn");
    if (extendSeatBtn) {
        extendSeatBtn.addEventListener("click", () => {
            const mySeat = getMySeatId();
            if (mySeat && seatsState[mySeat]) {
                seatsState[mySeat].since = Date.now();
                saveSeats();
            }
            hidePingToast();
            updateAccountUI();
        });
    }

    const declineSeatBtn = document.getElementById("declineSeatBtn");
    if (declineSeatBtn) {
        declineSeatBtn.addEventListener("click", () => {
            const mySeat = getMySeatId();
            if (mySeat) {
                delete seatsState[mySeat];
                saveSeats();
            }
            hidePingToast();
            updateAccountUI();
        });
    }

    if (sim30MinBtn) {
        sim30MinBtn.addEventListener("click", trigger30MinVerification);
    }

    setInterval(() => {
        const mySeat = getMySeatId();
        if (!mySeat || !seatsState[mySeat] || !seatTimerDisplay) return;
        const elapsedMs = Date.now() - seatsState[mySeat].since;
        const remainingMs = Math.max(0, 30 * 60000 - elapsedMs);
        const mins = Math.floor(remainingMs / 60000);
        const secs = Math.floor((remainingMs % 60000) / 1000);
        seatTimerDisplay.textContent = `Prochain check : ${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

        if (elapsedMs >= 30 * 60000) {
            trigger30MinVerification();
        }
    }, 1000);

    // تشغيل العرض الأولي فوراً
    updateAccountUI();
});