const DEPARTMENTS = {
    RT: "Réseaux et Télécommunications (RT)",
    AUTO: "Automatique & Informatique Industrielle (AUTO)",
    ELEC: "Électronique & Systèmes Embarqués (ELEC)",
    ELCT: "Électrotechnique & Machines Électriques (ELCT)",
    CIL: "Commande Industrielle (CIL)",
    BIO: "Génie Biomédical (BIO)"
};

// جداول التوقيت الرسمية S1 2026/2027 (6 حصص يومياً من 08:00 إلى 17:50)
const TIMETABLES = {
    RT: {
        "MRT25/A — Master 2 (Groupe A)": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "RESEAUX-IOT", type: "Cours", room: "AP3", prof: "V. TARZI" },
                { module: "VIDEO-AUDIO-SUR-IP", type: "TP", room: "RC9/A-INFO", prof: "V. AISSANI" },
                { module: "RESEAUX SANS FIL (R-S-F)", type: "TP", room: "RC13-INFO", prof: "V. AISSANI" },
                { module: "TECHNO-WEB", type: "TP", room: "RC01-INFO", prof: "V. TARZI" },
                null, null
            ],
            Lundi: [
                { module: "VIDEO-AUDIO-SUR-IP", type: "Cours", room: "AP4", prof: "H. AKLIOUAT" },
                { module: "TECHNO-WEB", type: "Cours", room: "AP4", prof: "S. MECHID" },
                null,
                { module: "VIDEO-AUDIO-SUR-IP", type: "TD", room: "B36", prof: "V. AISSANI" },
                null,
                { module: "RECH-DOC (En ligne)", type: "Cours", room: "A25", prof: "S. FELLAG" }
            ],
            Mardi: [
                { module: "TECHNO-WEB", type: "TD", room: "B36", prof: "S. MECHID" },
                { module: "CRYPT-SEC-RESEAU", type: "TD", room: "B36", prof: "M. HEDIR" },
                { module: "RESEAUX F MOB", type: "TD", room: "B36", prof: "Y. MERAIHI" },
                { module: "CRYPT-SEC-RESEAU", type: "Cours", room: "AP3", prof: "M. HEDIR" },
                null, null
            ],
            Mercredi: [
                { module: "RESEAUX-IOT", type: "TP", room: "RC9/B-INFO", prof: "V. TARZI" },
                { module: "CRYPT-SEC-RESEAUX", type: "TP", room: "B23", prof: "L. MEBREK" },
                { module: "CRYPT-SEC-RESEAUX", type: "TP", room: "B23", prof: "L. MEBREK" },
                null, null, null
            ],
            Jeudi: [
                { module: "RESEAUX SANS FIL", type: "Cours", room: "AP3", prof: "Y. MERAIHI" },
                { module: "RESEAUX SANS FIL", type: "Cours", room: "AP3", prof: "Y. MERAIHI" },
                null,
                { module: "REVERS-ENG", type: "Cours", room: "B36", prof: "T. BENMECHIREH" },
                { module: "REVERS-ENG", type: "TP", room: "B36", prof: "T. BENMECHIREH" },
                null
            ]
        },
        "MRT25/B — Master 2 (Groupe B)": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "RESEAUX-IOT", type: "Cours", room: "AP3", prof: "V. TARZI" },
                null,
                { module: "TECHNO-WEB", type: "TP", room: "RC9/B-INFO", prof: "V. TARZI" },
                { module: "RESEAUX SANS FIL (R-S-F)", type: "TP", room: "RC13-INFO", prof: "V. AISSANI" },
                { module: "VIDEO-AUDIO-SUR-IP", type: "TP", room: "RC9/A-INFO", prof: "V. AISSANI" },
                null
            ],
            Lundi: [
                { module: "VIDEO-AUDIO-SUR-IP", type: "Cours", room: "AP4", prof: "H. AKLIOUAT" },
                { module: "TECHNO-WEB", type: "Cours", room: "AP4", prof: "S. MECHID" },
                null,
                { module: "VIDEO-AUDIO-SUR-IP", type: "TD", room: "B36", prof: "V. AISSANI" },
                null,
                { module: "RECH-DOC (En ligne)", type: "Cours", room: "A25", prof: "S. FELLAG" }
            ],
            Mardi: [
                { module: "RESEAUX F MOB", type: "TD", room: "A13", prof: "Y. MERAIHI" },
                { module: "TECHNO-WEB", type: "TD", room: "B38", prof: "S. MECHID" },
                { module: "CRYPT-SEC-RESEAU", type: "TD", room: "B38", prof: "M. HEDIR" },
                { module: "CRYPT-SEC-RESEAU", type: "Cours", room: "AP3", prof: "M. HEDIR" },
                null, null
            ],
            Mercredi: [
                null,
                { module: "RESEAUX-IOT", type: "TP", room: "RC17-INFO", prof: "V. TARZI" },
                null,
                { module: "CRYPT-SEC-RESEAUX", type: "TP", room: "B23", prof: "L. MEBREK" },
                { module: "CRYPT-SEC-RESEAUX", type: "TP", room: "B23", prof: "L. MEBREK" },
                null
            ],
            Jeudi: [
                { module: "RESEAUX SANS FIL", type: "Cours", room: "AP3", prof: "Y. MERAIHI" },
                { module: "RESEAUX SANS FIL", type: "Cours", room: "AP3", prof: "Y. MERAIHI" },
                null,
                { module: "REVERS-ENG", type: "Cours", room: "B36", prof: "T. BENMECHIREH" },
                { module: "REVERS-ENG", type: "TP", room: "B36", prof: "T. BENMECHIREH" },
                null
            ]
        },
        "MRT26/A — Master 1 (Groupe A)": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "COMM-NUM-AV", type: "TP", room: "RC16-INFO", prof: "H. HAMOUNI" },
                { module: "SYS-LINUX/EAD", type: "TP", room: "RC9/B-INFO", prof: "V. TARZI" },
                null,
                { module: "PROG-AV EN PYTHON", type: "TP", room: "RC16-INFO", prof: "L. MEBREK" },
                null,
                { module: "ETHIQUE ET DEONTOLOGIE", type: "Cours", room: "B43", prof: "En ligne" }
            ],
            Lundi: [
                { module: "PROG-AV EN PYTHON", type: "Cours", room: "B01", prof: "S. MECHID" },
                { module: "PROPAG-ANT", type: "Cours", room: "B04", prof: "N. MESSAOUDI" },
                null,
                { module: "SYS-LINUX/EAD", type: "Cours", room: "B04", prof: "S. MECHID" },
                null, null
            ],
            Mardi: [
                { module: "TRAIT-AV-SIGN", type: "TP", room: "RC9/A-INFO", prof: "M. LAOUAR" },
                { module: "COMM-NUM-AV", type: "TD", room: "B311", prof: "W. BELAOURA" },
                null,
                { module: "PROPAG-ANT", type: "TD", room: "B04", prof: "N. MAHSAS" },
                null, null
            ],
            Mercredi: [
                { module: "COMM-NUM-AVANCE", type: "Cours", room: "B210", prof: "W. BELAOURA" },
                { module: "COMM-NUM-AVANCE", type: "Cours", room: "B210", prof: "W. BELAOURA" },
                null,
                { module: "ROUTAGE IP", type: "TP", room: "RC10-INFO", prof: "H. DAFEUR" },
                { module: "ROUTAGE IP", type: "Cours", room: "AP3", prof: "H. DAFEUR" },
                null
            ],
            Jeudi: [
                null,
                { module: "ROUTAGE IP", type: "TD", room: "B39", prof: "H. DAFEUR" },
                null,
                { module: "TRAIT-AV-SIGN", type: "Cours", room: "B43", prof: "M. HEDIR" },
                { module: "TRAIT-AV-SIGN", type: "TD", room: "B39", prof: "M. HEDIR" },
                null
            ]
        },
        "LTEL24/A — Licence 3 Télécoms": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "TRAIT-SIGNAL", type: "Cours", room: "B418", prof: "A. HADIDI" },
                { module: "SYST-RESEAUX-TELE", type: "Cours", room: "B418", prof: "A. YAHIAOUI" },
                { module: "SUPPORT-TRANS (En ligne)", type: "Cours", room: "B44", prof: "F. RAHMOUNE" },
                { module: "COMM-ANALOG", type: "TP", room: "C310-INFO", prof: "L. KASSOURI" },
                null,
                { module: "TELEPHONIE ET DROIT", type: "Cours", room: "B49", prof: "F. RAHMOUNE" }
            ],
            Lundi: [
                { module: "COMM-ANALOG", type: "Cours", room: "B43", prof: "H. AKLIOUAT" },
                { module: "COMM-ANALOG", type: "Cours", room: "B43", prof: "H. AKLIOUAT" },
                { module: "ONDE ET PROPAG", type: "TD", room: "B41", prof: "N. MAHSAS" },
                { module: "COMM-ANALOG", type: "TD", room: "B41", prof: "M. LAOUAR" },
                null,
                { module: "CAPTEURS MES-TELE", type: "Cours", room: "B419", prof: "F. RAHMOUNE" }
            ],
            Mardi: [
                { module: "SYST-RESEAUX-TELE", type: "TD", room: "B41", prof: "A. YAHIAOUI" },
                { module: "ONDE ET PROPAG", type: "TP", room: "RC16-INFO", prof: "A. YAHIAOUI" },
                { module: "TRAIT-SIGNAL", type: "TP", room: "RC9/B-INFO", prof: "Z. NABI" },
                { module: "CALCULATEUR-INTERF", type: "TP", room: "RC13-INFO", prof: "K. AKKOUCHE" },
                null, null
            ],
            Mercredi: [
                { module: "CALCULATEUR-INTERF", type: "Cours", room: "B210", prof: "K. BAICHE" },
                { module: "ONDE ET PROPAG", type: "Cours", room: "B02", prof: "N. MESSAOUDI" },
                null,
                { module: "TRAIT-SIGNAL", type: "TD", room: "B312", prof: "S. BELHADJ" },
                null, null
            ],
            Jeudi: [null, null, null, null, null, null]
        }
    },
    AUTO: {
        "MAI-25/A — Master 2 Automatique": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "COMM-ROBOT", type: "TD", room: "B04", prof: "A. ZAHAF" },
                { module: "COMM-ROBOT", type: "Cours", room: "AP3", prof: "A. ZAHAF" },
                null, null, null, null
            ],
            Lundi: [
                null,
                { module: "SYSTEMES EVEN DISCRETS", type: "Cours", room: "AP3", prof: "A. ZAHAF" },
                { module: "SYSTEMES EVEN DISCRETS", type: "TD", room: "B35", prof: "A. ZAHAF" },
                { module: "REVERS-ENG", type: "Cours", room: "AP4", prof: "K. MESKINE" },
                { module: "REVERS-ENG", type: "TP", room: "B35", prof: "K. MESKINE" },
                { module: "RECHERCHE-DOC-CONC", type: "Cours", room: "AP3", prof: "A. RAHMOUNE" }
            ],
            Mardi: [null, null, null, null, null, null],
            Mercredi: [
                { module: "FPGA-PROG", type: "TD", room: "B35", prof: "A. DJALAB" },
                { module: "FPGA-PROG", type: "Cours", room: "B416", prof: "A. DJALAB" },
                { module: "FPGA-PROG", type: "TP", room: "RC17-INFO", prof: "R. BENMANSOUR" },
                null,
                { module: "COMM-ROBOT", type: "TP", room: "RC9/A-INFO", prof: "S. AZZOUGUI" },
                null
            ],
            Jeudi: [
                null,
                { module: "COMM-AVANCEE", type: "TD", room: "B35", prof: "S. RIACHE" },
                { module: "COMM-AVANCEE", type: "Cours", room: "AP3", prof: "S. RIACHE" },
                { module: "SUPER-IND", type: "Cours", room: "AP3", prof: "A. AREZKI" },
                null, null
            ]
        },
        "LAUT-24/A — Licence 3 Automatique": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "COMMANDES SYST LINEAIRE", type: "Cours", room: "AP5", prof: "M. HAMADACHE" },
                { module: "ELECTRONIQUE DE PUISSANCES", type: "TD", room: "B41", prof: "N. AICHOUNE" },
                { module: "COMMANDES SYST LINEAIRE", type: "TP", room: "RC01-INFO", prof: "M. HAMADACHE" },
                { module: "ELECTRONIQUE DE PUISSANCES", type: "Cours", room: "B43", prof: "N. AICHOUNE" },
                null, null
            ],
            Lundi: [
                null,
                { module: "MODEL & IDENTIF DES SYST", type: "Cours", room: "B417", prof: "N. GABOUR" },
                { module: "PROGRAMMATION EN C++", type: "TP", room: "C312GE", prof: "N. GABOUR" },
                { module: "COMMANDES SYST LINEAIRE", type: "TD", room: "B41", prof: "M. HAMADACHE" },
                null, null
            ],
            Mardi: [
                { module: "MODEL & IDENTIF DES SYST", type: "TP", room: "RC10-INFO", prof: "N. GABOUR" },
                { module: "PROGRAMMATION EN C++", type: "Cours", room: "B417", prof: "N. GABOUR" },
                null, null, null, null
            ],
            Mercredi: [
                { module: "MICROPROCESSEUR & MICROCONT", type: "Cours", room: "A26", prof: "Y. TRIKI" },
                { module: "MICROPROCESSEUR & MICROCONT", type: "TD", room: "B41", prof: "Y. TRIKI" },
                { module: "MICROPROCESSEUR & MICROCONT", type: "TP", room: "C310-INFO", prof: "K. DICHOU" },
                { module: "ELECTRONIQUE DE PUISSANCES", type: "TP", room: "RC01-INFO", prof: "N. AICHOUNE" },
                { module: "MICROPROCESSEUR & MICROCONT", type: "Cours", room: "AP2", prof: "Y. TRIKI" },
                { module: "ENERG-RENOUV (En ligne)", type: "Cours", room: "B42", prof: "Y. TRIKI" }
            ],
            Jeudi: [null, null, null, null, null, null]
        }
    },
    ELEC: {
        "MESE25/A — Master 2 Systèmes Embarqués": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                null,
                { module: "SYST EMBARQUES", type: "TP", room: "RC13-INFO", prof: "R. HAMMACHI" },
                { module: "RES-COMM-IND", type: "Cours", room: "B37", prof: "H. CHEBI" },
                null, null, null
            ],
            Lundi: [
                null,
                { module: "SYS-EMB", type: "Cours", room: "B37", prof: "R. HAMMACHI" },
                { module: "SYS-EMB", type: "TD", room: "B32", prof: "R. HAMMACHI" },
                null, null,
                { module: "RECHERCHE-DOC-CONC", type: "Cours", room: "AP3", prof: "A. RAHMOUNE" }
            ],
            Mardi: [
                { module: "REVERS-ENG", type: "Cours", room: "C32", prof: "K. MESKINE" },
                { module: "SYSTEMES TEMPS REEL", type: "TP", room: "RC9/A-INFO", prof: "K. KESSAISSIA" },
                { module: "SYSTEMES TEMPS REEL", type: "Cours", room: "B37", prof: "K. KESSAISSIA" },
                { module: "SYSTEMES TEMPS REEL", type: "Cours", room: "B37", prof: "K. KESSAISSIA" },
                { module: "REVERS-ENG", type: "TP", room: "A27", prof: "K. MESKINE" },
                null
            ],
            Mercredi: [null, null, null, null, null, null],
            Jeudi: [
                { module: "RES-COMM-IND", type: "TP", room: "C011-TEL-BIO", prof: "D. SAIDI" },
                { module: "ETUDE-REAL-PROJ", type: "TP", room: "RC10-INFO", prof: "A. LEGBEDJ" },
                { module: "INTELLIG ARTIFICIELLE", type: "Cours", room: "B37", prof: "L. MEBREK" },
                null, null, null
            ]
        },
        "LELEC N-24/A — Licence 3 Électronique": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "FONCTION-ELECTRONIQUE", type: "TD", room: "B416", prof: "Z. TOUATI" },
                { module: "FONCTION D'ELECTRONIQUE", type: "Cours", room: "B416", prof: "Z. TOUATI" },
                null, null, null, null
            ],
            Lundi: [
                { module: "TRAIT DE SIGNAL", type: "TP", room: "C37-INFO", prof: "S. MASSOUT" },
                null,
                { module: "FONCTION D'ELECTRONIQUE", type: "TP", room: "B211", prof: "B. HAMDANI" },
                { module: "TRAIT DE SIGNAL", type: "Cours", room: "B416", prof: "S. MASSOUT" },
                null, null
            ],
            Mardi: [
                { module: "TRAIT DE SIGNAL", type: "TD", room: "B42", prof: "S. MASSOUT" },
                { module: "TRAVAUX AVANT PROJET", type: "Cours", room: "B418", prof: "H. AKROUM" },
                { module: "SYST A MICROPROCESSEURS", type: "TD", room: "B46", prof: "I. MAHDI" },
                null, null,
                { module: "PROPAGATION D'ONDES", type: "Cours", room: "B46", prof: "N. MESSAOUDI" }
            ],
            Mercredi: [
                { module: "SYST A MICROPROCESSEURS", type: "Cours", room: "B417", prof: "I. MAHDI" },
                { module: "SYST A MICROPROCESSEURS", type: "Cours", room: "B417", prof: "I. MAHDI" },
                { module: "RESAUX INFORMATIQUES", type: "Cours", room: "B44", prof: "F. BESMI" },
                { module: "TRAVAUX AVANT PROJET", type: "TP", room: "B211", prof: "H. AKROUM" },
                null, null
            ],
            Jeudi: [
                { module: "RESAUX INFORMATIQUES", type: "TP", room: "RC13-INFO", prof: "C. KHELIFI" },
                null,
                { module: "RESAUX INFORMATIQUES", type: "TD", room: "B41", prof: "C. KHELIFI" },
                { module: "SYST A MICROPROCESSEURS", type: "TP", room: "RC9/B-INFO", prof: "K. AKKOUCHE" },
                null,
                { module: "TECH-FAB-CIRCUIT-INTEG", type: "Cours", room: "B46", prof: "K. HARRAR" }
            ]
        }
    },
    ELCT: {
        "MME25 — Master 2 Machines Électriques": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [null, null, null, null, null, null],
            Lundi: [
                null, null,
                { module: "IDENT-MACH-ELCT", type: "Cours", room: "AP6", prof: "A. AIBECHE" },
                { module: "MACHINES ELECT-SPECIAL", type: "Cours", room: "A26", prof: "A. AZZOUZA" },
                { module: "ECH-REP-MACH-ELEC", type: "Cours", room: "A26", prof: "A. AZZOUZA" },
                null
            ],
            Mardi: [
                { module: "IDENT-MACH-ELCT", type: "TP", room: "C011-TEL-BIO", prof: "A. AIBECHE" },
                { module: "MACHINES ELECT", type: "TP", room: "RC19-INF", prof: "A. AZZOUZA" },
                { module: "MACHINES ELECT-SPECIAL", type: "TD", room: "B32", prof: "A. AZZOUZA" },
                null, null, null
            ],
            Mercredi: [
                null,
                { module: "REG-TRANS-MACH", type: "TP", room: "C312GE", prof: "Z. LARABI" },
                { module: "CONCEP-ASSI-ORD", type: "Cours", room: "B32", prof: "T. ABDELOUAHED" },
                null, null, null
            ],
            Jeudi: [
                { module: "REG-TRANS-MACH", type: "TD", room: "B32", prof: "Z. LARABI" },
                { module: "REG-TRANS-MACH", type: "Cours", room: "B32", prof: "Z. LARABI" },
                { module: "REVERS-ENG", type: "TP", room: "B413", prof: "H. BOUZERKOUNE" },
                { module: "REVERS-ENG", type: "Cours", room: "B210", prof: "H. BOUZERKOUNE" },
                { module: "CONCEP-ASSI-ORD-MACH", type: "TP", room: "C310-INFO", prof: "T. ABDELOUAHED" },
                { module: "RECHERCHE-DOC-CONC", type: "Cours", room: "B41", prof: "H. AKROUM" }
            ]
        },
        "LELECT-24/A — Licence 3 Électrotechnique": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "SYST ASSERVIS", type: "Cours", room: "B04", prof: "B. IKHLEF" },
                { module: "THEORIE DE CHAMP", type: "Cours", room: "B43", prof: "M. HAMEL" },
                null,
                { module: "SYST ASSERVIS", type: "TD", room: "B06", prof: "B. IKHLEF" },
                null,
                { module: "CAPTEURS ET METROLOGIE", type: "Cours", room: "B417", prof: "B. FARES" }
            ],
            Lundi: [
                { module: "RESEAUX ELECTRIQUES", type: "Cours", room: "B04", prof: "N. M'ZIOU" },
                { module: "SYST ASSERVIS", type: "TP", room: "RC10-INFO", prof: "N. CHERRAT" },
                { module: "ELECTRONIQUE DE PUISSANCE", type: "Cours", room: "B417", prof: "A. BOUDOUDA" },
                null, null, null
            ],
            Mardi: [
                { module: "RESEAUX ELECTRIQUES", type: "TD", room: "B06", prof: "N. M'ZIOU" },
                { module: "ELECTRONIQUE DE PUISSANCE", type: "TD", room: "B310", prof: "A. BOUDOUDA" },
                { module: "SCHEMAS ET APPAREILLAGE", type: "Cours", room: "B22", prof: "N. AICHOUNE" },
                { module: "RESEAUX ELECTRIQUES", type: "Cours", room: "AP3", prof: "N. M'ZIOU" },
                null, null
            ],
            Mercredi: [
                null,
                { module: "THEORIE DE CHAMP", type: "TD", room: "B416", prof: "M. HAMEL" },
                null,
                { module: "SCHEMAS ET APPAREILLAGE", type: "TP", room: "EEA2-Machin", prof: "F. TALEB" },
                null,
                { module: "LOGICIEL DE SIMULATION", type: "Cours", room: "B412", prof: "H. NECHAF" }
            ],
            Jeudi: [
                null,
                { module: "CAPTEURS ET METROLOGIE", type: "TP", room: "RC10-INFO", prof: "Y. GACEB" },
                { module: "ELECTRONIQUE DE PUISSANCE", type: "TP", room: "RC10-INFO", prof: "Y. GACEB" },
                { module: "RESEAUX ELECTRIQUES", type: "TP", room: "RC10-INFO", prof: "B. FARES" },
                null, null
            ]
        }
    },
    CIL: {
        "MCIL-25 — Master 2 Commande Industrielle": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "COMM-ROBOTS-MANIP", type: "Cours", room: "B26", prof: "S. AZZOUGUI" },
                { module: "COMM-AVANCEE", type: "TD", room: "B26", prof: "L. MILOUDI" },
                { module: "COMM-AVANCEE", type: "Cours", room: "B26", prof: "L. MILOUDI" },
                { module: "COMM-ROBOTS-MANIP", type: "TD", room: "B412", prof: "S. AZZOUGUI" },
                { module: "COMM-ROBOTS-MANIP", type: "TP", room: "C310-INFO", prof: "S. AZZOUGUI" },
                null
            ],
            Lundi: [
                { module: "REVERS-ENG", type: "Cours", room: "B311", prof: "T. BENMECHIREH" },
                { module: "COMM-INTELLIG", type: "Cours", room: "B26", prof: "H. NECHAF" },
                { module: "COMM-INTELLIG", type: "TD", room: "B26", prof: "H. NECHAF" },
                null, null, null
            ],
            Mardi: [
                null,
                { module: "FPGA-PROG VHDL", type: "Cours", room: "B26", prof: "N. BENSAFI" },
                { module: "COMM-AVANCEE", type: "Cours", room: "B26", prof: "L. MILOUDI" },
                null, null,
                { module: "RECH-DOC-CONCEP-MEM", type: "Cours", room: "B02", prof: "N. KACIMI" }
            ],
            Mercredi: [
                null,
                { module: "SYS-EVEN-DISCRETS", type: "Cours", room: "B31", prof: "Y. BOUKRI" },
                { module: "REVERS-ENG", type: "TP", room: "B26", prof: "T. BENMECHIREH" },
                null,
                { module: "SUPERV-INDUST", type: "Cours", room: "B26", prof: "A. AREZKI" },
                null
            ],
            Jeudi: [
                { module: "SYS-EVEN-DISCRETS", type: "TD", room: "B31", prof: "Y. BOUKRI" },
                null,
                { module: "COMM-AVANCEE", type: "TP", room: "RC13-INFO", prof: "Z. KOUFI" },
                { module: "FPGA-PROG VHDL", type: "TD", room: "B26", prof: "N. BENSAFI" },
                { module: "FPGA-PROG VHDL", type: "TP", room: "RC16-INFO", prof: "N. BENSAFI" },
                null
            ]
        },
        "LMCIL-24/A — Licence 3 Commande Ind.": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "COMM-SYST-LINEAIRES", type: "TD", room: "B31", prof: "L. MILOUDI" },
                null,
                { module: "SYST-ASSERV", type: "TP", room: "C310-INFO", prof: "S. LATRECHE" },
                null, null,
                { module: "ENERG-RENOUV", type: "Cours", room: "B311", prof: "A. DJALAB" }
            ],
            Lundi: [
                { module: "MICROPROCESSEURS", type: "Cours", room: "B210", prof: "M. METIDJI" },
                { module: "PROGRAMMATION C++", type: "Cours", room: "B210", prof: "M. NEKKAA" },
                { module: "PROGRAMMATION C++", type: "TP", room: "RC01-INFO", prof: "M. NEKKAA" },
                { module: "MICROPROCESSEURS", type: "TD", room: "B311", prof: "M. METIDJI" },
                null,
                { module: "NORMES ET CERTIFICATION", type: "Cours", room: "B311", prof: "L. RADJEF" }
            ],
            Mardi: [
                { module: "ELECTRONIQUE DE PUISSANCES", type: "TD", room: "B42", prof: "A. AHRICHE" },
                { module: "ELECTRONIQUE DE PUISSANCES", type: "Cours", room: "B43", prof: "A. AHRICHE" },
                { module: "ELECTRONIQUE DE PUISSANCES", type: "TP", room: "RC13-INFO", prof: "Y. GACEB" },
                { module: "COMM-SYST-LINEAIRES", type: "Cours", room: "AP5", prof: "L. MILOUDI" },
                null, null
            ],
            Mercredi: [
                { module: "SYST-ASSERV", type: "Cours", room: "B04", prof: "S. LATRECHE" },
                { module: "SYST-ASSERV", type: "TD", room: "A13", prof: "S. LATRECHE" },
                null, null, null, null
            ],
            Jeudi: [
                { module: "MICROPROCESSEURS", type: "Cours", room: "B210", prof: "M. METIDJI" },
                { module: "MICROPROCESSEURS", type: "TP", room: "C310-INFO", prof: "M. METIDJI" },
                { module: "COMM-SYST-LINEAIRES", type: "TP", room: "RC16-INFO", prof: "W. KADER" },
                null, null, null
            ]
        }
    },
    BIO: {
        "MBIO-25 — Master 2 Génie Biomédical": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                null, null, null,
                { module: "REVERS-ENG", type: "Cours", room: "B418", prof: "Z. TOUATI" },
                { module: "REVERS-ENG", type: "TP", room: "B418", prof: "Z. TOUATI" },
                null
            ],
            Lundi: [
                { module: "INST-FONCT", type: "Cours", room: "B210", prof: "Z. TOUATI" },
                { module: "INST-FONCT", type: "TD", room: "B23", prof: "Z. TOUATI" },
                null,
                { module: "SYS-EMB", type: "TP", room: "B46", prof: "H. BOUMERIDJA" },
                null, null
            ],
            Mardi: [
                { module: "SYS-EMB", type: "Cours", room: "B46", prof: "H. BOUMERIDJA" },
                { module: "SYS-EMB", type: "TD", room: "B46", prof: "H. BOUMERIDJA" },
                { module: "GEST-PROJET-SYS-S", type: "Cours", room: "B04", prof: "S. MECHID" },
                { module: "GEST-PROJET-SYS-S", type: "TP", room: "B23", prof: "S. MECHID" },
                { module: "RECH-DOC (En ligne)", type: "Cours", room: "B46", prof: "S. FELLAG" },
                null
            ],
            Mercredi: [
                null,
                { module: "INST-IMAG-MED", type: "Cours", room: "B46", prof: "M. AMMAR" },
                { module: "INST-IMAG-MED", type: "TD", room: "B46", prof: "M. AMMAR" },
                { module: "BIOCAPTEURS", type: "TP", room: "RC9/A-INFO", prof: "K. AKKOUCHE" },
                { module: "BIOCAPTEURS", type: "Cours", room: "A12", prof: "D. MABROUK" },
                null
            ],
            Jeudi: [
                null,
                { module: "BIOCAPTEURS", type: "TD", room: "C011-TEL-BIO", prof: "D. MABROUK" },
                { module: "INST-IMAG-MED", type: "TP", room: "C310-INFO", prof: "M. AMMAR" },
                { module: "MOD-SYS-BIOM", type: "Cours", room: "B46", prof: "M. AMMAR" },
                { module: "MOD-SYS-BIOM", type: "TP", room: "C37-INFO", prof: "M. AMMAR" },
                null
            ]
        },
        "LBIO-24 — Licence 3 Biomédical": {
            Samedi: [null, null, null, null, null, null],
            Dimanche: [
                { module: "ASSER-CONT-REG", type: "Cours", room: "B419", prof: "S. FELLAG" },
                { module: "ASSER-CONT-REG", type: "Cours", room: "B419", prof: "S. FELLAG" },
                { module: "ASSER-CONT-REG", type: "TD", room: "A21", prof: "S. FELLAG" },
                null, null, null
            ],
            Lundi: [
                null,
                { module: "BIOPHYSIQUE", type: "TP", room: "C37-INFO", prof: "K. MESSAOUDENE" },
                { module: "TRAIT-SIGNAL", type: "TP", room: "C312-GE", prof: "L. RADJEF" },
                { module: "BIOPHYSIQUE", type: "TD", room: "B419", prof: "K. MESSAOUDENE" },
                null, null
            ],
            Mardi: [
                { module: "BIOPHYSIQUE", type: "Cours", room: "B48", prof: "K. MESSAOUDENE" },
                { module: "OND-APP", type: "Cours", room: "B42", prof: "R. HAROUN" },
                { module: "INFO-MED", type: "Cours", room: "B419", prof: "I. SEDJELMACI" },
                { module: "INFO-MED", type: "TP", room: "C312GE", prof: "I. SEDJELMACI" },
                null,
                { module: "TERM-NORM-MED", type: "Cours", room: "B48", prof: "S. BELKACEM" }
            ],
            Mercredi: [
                { module: "ELECT-GENERALE", type: "TP", room: "RC9/A-INFO", prof: "F. HOCINE" },
                { module: "ELECT-GENERALE", type: "Cours", room: "B419", prof: "F. HOCINE" },
                { module: "ELECT-GENERALE", type: "TD", room: "B419", prof: "F. HOCINE" },
                null, null, null
            ],
            Jeudi: [
                { module: "TRAIT-SIGNAL", type: "Cours", room: "A15", prof: "Z. NABI" },
                null,
                { module: "TRAIT-SIGNAL", type: "TD", room: "A16", prof: "Z. NABI" },
                null, null,
                { module: "MAINT-ASSIST-ORD", type: "Cours", room: "B48", prof: "R. HAROUN" }
            ]
        }
    }
};

// قائمة الأساتذة المحدثة مع المقاييس والتخصص الفعلي لكل أستاذ من الجداول
const TEACHERS = [
    { name: "MECHID Samira", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Technologies Web (M2 RT), Python Avancé & Linux (M1 RT), Gestion de Projet (M2 BIO)", email: "s.mechid@univ-boumerdes.dz" },
    { name: "MERAIHI Yassine", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Réseaux Sans Fil & Réseaux Mobiles (M2 RT)", email: "y.meraihi@univ-boumerdes.dz" },
    { name: "HEDIR Mehdia", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Cryptographie & Sécurité des Réseaux (M2 RT), Traitement Avancé du Signal (M1 RT)", email: "m.hedir@univ-boumerdes.dz" },
    { name: "AKLIOUAT Hacene", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Vidéo & Audio sur IP (M2 RT), Communications Analogiques (L3 TEL), Électronique Fond. (L2 TEL)", email: "h.akliouat@univ-boumerdes.dz" },
    { name: "TARZI Mouna", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Réseaux IoT & TP Techno-Web (M2 RT), TP Linux (M1 RT)", email: "tarzimouna26@gmail.com" },
    { name: "MEBREK Lisa", grade: "Enseignant-Chercheur", dept: "RT", specialty: "TP Cryptographie & Sécurité (M2 RT), TP Python (M1 RT), Intelligence Artificielle (M2 ESE)", email: "Lisamebrek63@gmail.com" },
    { name: "AISSANI Imene", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Vidéo-Audio sur IP & Réseaux Sans Fil (M2 RT)", email: "aissaniimene12@gmail.com" },
    { name: "Benmechirah Tasnime", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Reverse Engineering (M2 RT & M2 CIL), Programmation Python (L2 TEL & L2 BIO)", email: "tasnimebenmechirah@gmail.com" },
    { name: "FELLAG Sid Ali", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Recherche Documentaire (M2 RT & M2 BIO), Asservissement & Régulation (L3 BIO)", email: "s.fellag@univ-boumerdes.dz" },
    { name: "Belaoura Widad", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Communications Numériques Avancées (M1 RT)", email: "w.belaoura@univ-boumerdes.dz" },
    { name: "DAFEUR Hakim", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Routage IP — Cours, TD & TP (M1 RT)", email: "hakimdafeur@yahoo.fr" },
    { name: "Laouar Maroua", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Traitement Avancé du Signal (M1 RT), Communications Analogiques (L3 TEL)", email: "maroualaouar.tlcb@gmail.com" },
    { name: "Hamouni Houda", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Communications Numériques Avancées (M1 RT), Python Avancé (M1 AUTO)", email: "hamounihouda@gmail.com" },
    { name: "YAHIAOUI Amina Fatima zahra", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Systèmes & Réseaux Télécoms (L3 TEL), Programmation Avancée Python (M1 AUTO/ESE/BIO)", email: "am.yahiaoui@univ-boumerdes.dz" },
    { name: "BAICHE Karim", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Calculateurs et Interfaces (L3 TEL)", email: "kbaiche@univ-boumerdes.dz" },
    { name: "RAHMOUNE Fayçal", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Supports de Transmission, Téléphonie & Droit, Capteurs Télécoms (L3 TEL)", email: "faycal.rahmoune@univ-boumerdes.dz" },
    { name: "HADIDI Anfel", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Traitement du Signal (L3 TEL)", email: "a.hadidi@univ-boumerdes.dz" },
    { name: "Kassouri Lydia", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Communications Analogiques — TP (L3 TEL)", email: "kassourilydia53@gmail.com" },
    { name: "MAHSAS Nesrine", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Ondes et Propagation (L3 TEL & M1 RT)", email: "mahsasnesrine2020@gmail.com" },
    { name: "Mahsas Maroua", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Analyse 3 (L2 TEL), Optimisation (M1 AUTO)", email: "mahsasmaroua50@gmail.com" },
    { name: "Boulanouar Hasna", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Électrotechnique Fondamentale (L2 TEL & L2 BIO), État de l'Art Génie Électrique (L2 AUTO)", email: "hasna_res@yahoo.fr" },
    { name: "Berouaken Yousra", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Réseaux et Télécommunications", email: "berouakenyousra@gmail.com" },
    { name: "Amam Wissal", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Analyse 3 (L2 AUTO & L2 BIO)", email: "wissal.amam@gmail.com" },
    { name: "Boubakri Lamine", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Réseaux et Systèmes Télécoms", email: "mstboubakri@gmail.com" },
    { name: "IRINISLIMANE Maissa", grade: "Enseignant-Chercheur", dept: "RT", specialty: "Réseaux et Télécommunications", email: "maissaromi66@gmail.com" },

    // AUTO (Automatique et Informatique Industrielle)
    { name: "HAMADACHE Moussa", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Commande des Systèmes Linéaires — Cours, TD & TP (L3 AUTO)", email: "m.hamadache2@univ-boumerdes.dz" },
    { name: "Gabour Nour el houda", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Modélisation & Identification des Systèmes, Programmation C++ (L3 AUTO)", email: "n.gabour@univ-boumerdes.dz" },
    { name: "Triki Yacine", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Microprocesseurs & Microcontrôleurs, Énergies Renouvelables (L3 AUTO)", email: "y.triki@univ-boumerdes.dz" },
    { name: "ZAHAF Abdelmalek", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Commande des Robots & Systèmes à Événements Discrets (M2 AUTO)", email: "zahaf.abdelmalek@univ-boumerdes.dz" },
    { name: "RIACHE Samah", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Commande Avancée — Cours & TD (M2 AUTO)", email: "samahriache@univ-boumerdes.dz" },
    { name: "Meskine Khedidja", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Reverse Engineering — Cours & TP (M2 AUTO & M2 ESE)", email: "k.meskine@univ-boumerdes.dz" },
    { name: "Arezki Aziz", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Supervision Industrielle (M2 AUTO & M2 CIL), Circuits de Conditionnement (M1 BIO)", email: "arezkiaziz02@gmail.com" },
    { name: "Koufi Ziad", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Supervision Industrielle TP (M2 AUTO), Commande Avancée TP (M2 CIL)", email: "koufiziad43@gmail.com" },
    { name: "Benmansour Radja", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Programmation FPGA — TP (M2 AUTO)", email: "radjaben27@gmail.com" },
    { name: "Azzougui Safia", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Commande des Robots Manipulateurs (M2 AUTO & M2 CIL)", email: "safiaazzougui@gmail.com" },
    { name: "RAHMOUNE Adel", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Recherche Documentaire et Conception (M2 AUTO & M2 ESE)", email: "ad.rahmoune@univ-boumerdes.dz" },
    { name: "ZERMOUT Abdelaziz", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Programmation Orientée Objet (M1 AUTO)", email: "az.zermout@univ-boumerdes.dz" },
    { name: "KHELOUAT Lila", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Systèmes Linéaires Multivariables (M1 AUTO)", email: "l.khelouat@univ-boumerdes.dz" },
    { name: "Toubal Maamar Alla Eddine", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Association Convertisseurs-Machines & Véhicule Électrique (M1 AUTO & M1 CIL)", email: "a.toubalmaamar@univ-boumerdes.dz" },
    { name: "HERBADJI Wafa", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Optimisation (M1 AUTO), Électronique de Puissance (M1 BIO)", email: "w.herbadji@univ-boumerdes.dz" },
    { name: "Boubezari Meriem", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Optimisation — TP (M1 AUTO & M1 CIL)", email: "boubezarimery@gmail.com" },
    { name: "Bouzegzeg Yasmine", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Systèmes Linéaires Multivariables — TD & TP (M1 AUTO & M1 CIL)", email: "yasmin.bouzegzeg@gmail.com" },
    { name: "BELHABCHIA Malik", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Programmation Python (L2 AUTO, L2 ELCT, L2 ELEC)", email: "m.belhabchia@univ-boumerdes.dz" },
    { name: "Khalfaoui Faycal", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Analyse 3 (L2 AUTO, L2 BIO, L2 ELCT, L2 ELEC, L2 TEL)", email: "khalfaouifaycalingm@gmail.com" },
    { name: "Madaci Bouthaina", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Électrotechnique Fondamentale (L2 AUTO & L2 ELEC)", email: "bouthainamadaci@gmail.com" },
    { name: "Ziane Sarah", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Électrotechnique — TP (L2 AUTO & L2 ELCT)", email: "sarahziane31@gmail.com" },
    { name: "KABACHE Sabah", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Ondes et Vibrations (L2 AUTO, L2 ELCT, L2 TEL)", email: "sabahkabache@gmail.com" },
    { name: "Zara Abdeldjebar", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Ondes et Vibrations — TP (L2 AUTO)", email: "a.zara@univ-boumerdes.dz" },
    { name: "Benaissa Alaeddine", grade: "Enseignant-Chercheur", dept: "AUTO", specialty: "Probabilités et Statistiques (L2 AUTO, L2 ELCT, L2 ELEC)", email: "atefdin@gmail.com" },

    // ELEC (Électronique & Systèmes Embarqués)
    { name: "HAMMACHI Radhouane", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Systèmes Embarqués (M2 ESE), État de l'Art Génie Électrique (L2 ELCT/TEL)", email: "r.hammachi@univ-boumerdes.dz" },
    { name: "Kessaissia Karima", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Systèmes Temps Réel — Cours, TD & TP (M2 ESE)", email: "k.kessaissia@univ-boumerdes.dz" },
    { name: "Hocine Chebi", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Réseaux et Communications Industrielles (M2 ESE)", email: "chebi.hocine@yahoo.fr" },
    { name: "Legbedj Asma", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Étude et Réalisation de Projet (M2 ESE), Électronique de Puissance TP (M1 MME)", email: "legbedjasma@gmail.com" },
    { name: "Saidi Dihia", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Réseaux et Communications Industrielles — TP (M2 ESE)", email: "dihiasaidi59@gmail.com" },
    { name: "ZERROUKI Fodil", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Systèmes à Microcontrôleurs & Microprocesseurs (M1 ESE)", email: "f.zerrouki@univ-boumerdes.dz" },
    { name: "Harrar Khaled", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Programmation C++ Embarqué (M1 ESE), Fabrication Circuits Intégrés (L3 ELEC)", email: "khaled.harrar@univ-boumerdes.dz" },
    { name: "YAKHELEF Yassine", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Asservissements Numériques Avancés (M1 ESE), Optimisation (M1 CIL)", email: "y.yakhelef@univ-boumerdes.dz" },
    { name: "BOUMERIDJA Hafida", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Électronique Numérique Avancée FPGA (M1 ESE), Systèmes Embarqués (M2 BIO)", email: "h.boumeridja@univ-boumerdes.dz" },
    { name: "MOUSSAOUI Siham", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Traitement du Signal Avancé (M1 ESE), Probabilités & Statistiques (L2 BIO/TEL)", email: "s.moussaoui@univ-boumerdes.dz" },
    { name: "Bougeuttaya Sara", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "FPGA-VHDL TP (M1 ESE), Probabilités & Statistiques TD (L2 AUTO/ELCT/ELEC)", email: "bougeuttayasara026@gmail.com" },
    { name: "DICHOU Karima", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Éthique & Déontologie (M1 ESE), TP Microprocesseurs (L3 AUTO)", email: "dichou.karima2014@gmail.com" },
    { name: "Mahdi Ismahane", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Systèmes à Microprocesseurs (L3 ELEC), Programmation Python (L2 BIO/TEL)", email: "ismahane.mahdi@univ-boumerdes.dz" },
    { name: "TOUATI Zineeddine", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Fonctions d'Électronique (L3 ELEC), Instrumentation & Reverse Eng. (M2 BIO)", email: "z.touati@univ-boumerdes.dz" },
    { name: "MASSOUT Samia", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Traitement de Signal — Cours, TD & TP (L3 ELEC)", email: "af_samia@yahoo.fr" },
    { name: "AKROUM Hamza", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Travaux Avant Projet (L3 ELEC), Recherche Documentaire (M2 MME)", email: "akroum@univ-boumerdes.dz" },
    { name: "BESMI Fatma Zohra", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Réseaux Informatiques (L3 ELEC), Ondes & Vibrations (L2 ELEC), Réseaux Ind. (M1 CIL)", email: "f.besmi@univ-boumerdes.dz" },
    { name: "Khelifi Cheima", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Réseaux Informatiques — TD & TP (L3 ELEC)", email: "khelificheima9@gmail.com" },
    { name: "Hamdani Baya", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Fonctions d'Électronique — TP (L3 ELEC & L2 ELEC)", email: "bhamdani_ise@yahoo.com" },
    { name: "AKKOUCHE Katia", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "TP Microprocesseurs (L3 ELEC), Calculateurs (L3 TEL), Biocapteurs (M2 BIO)", email: "katia.akk28@gmail.com" },
    { name: "FOURA Imane", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Technologie des Composants Électroniques (L3 ELEC)", email: "i.foura@univ-boumerdes.dz" },
    { name: "BENSAFI Noureddine", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Électronique Fondamentale (L2 AUTO/ELCT), FPGA-VHDL (M2 CIL)", email: "n.bensafi@univ-boumerdes.dz" },
    { name: "Guellal Meriem", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Analyse 3 & Électronique (L2 AUTO, L2 ELCT, L2 ELEC)", email: "m.guellal@univ-boumerdes.dz" },
    { name: "Si mohamed Kamelia", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Électronique Fondamentale — TP (L2 AUTO, L2 BIO, L2 ELCT, L2 TEL)", email: "kameliasimohamed@gmail.com" },
    { name: "Rezkallahi Menouer", grade: "Enseignant-Chercheur", dept: "ELEC", specialty: "Électrotechnique — TP (L2 AUTO, L2 BIO, L2 ELEC, L2 TEL)", email: "rezkkallahimenouer@gmail.com" },

    // ELCT (Électrotechnique & Machines Électriques)
    { name: "Abdeslame Djamila", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Commande des Machines Électriques (M2 MME), Association Convertisseurs TP (M1 AUTO)", email: "abdeslamdj@yahoo.fr" },
    { name: "Aibeche Abderrezak", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Identification des Machines (M2 MME), Réseaux Transport & Distribution (M1 MME)", email: "aibeche_umbb@univ-boumerdes.dz" },
    { name: "Zina Larabi", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Régimes Transitoires des Machines Électriques (M2 MME)", email: "z.larabi@univ-boumerdes.dz" },
    { name: "Azzouza Asma", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Machines Électriques Spéciales — Cours, TD & TP (M2 MME)", email: "a.azzouza@univ-boumerdes.dz" },
    { name: "ABDELOUAHED Touhami", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Conception Assistée par Ordinateur — CAO Machines (M2 MME)", email: "abdelouahed.touhami@univ-bechar.dz" },
    { name: "Bouzerkoune Hana", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Reverse Engineering — Cours & TP (M2 MME)", email: "hanabouz03@gmail.com" },
    { name: "CHERRAT Nidhal", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Méthodes Numériques & Optimisation (M1 MME), Systèmes Asservis TP (L3 ELCT)", email: "cherratnidhal@yahoo.fr" },
    { name: "BOUDOUDA Aimad", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Électronique de Puissance Avancée (M1 MME & L3 ELCT)", email: "a.boudouda@univ-boumerdes.dz" },
    { name: "HAMEL Meziane", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Machines Électriques Approfondies (M1 MME), Théorie de Champ (L3 ELCT)", email: "m.hamel@univ-boumerdes.dz" },
    { name: "FELLAH Sidra", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Programmation Avancée Python (M1 MME), Analyse 3 TD (L2 ELEC)", email: "fellahsidratel@gmail.com" },
    { name: "Gadouche Zoubir", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Machines Électriques — TP (M1 MME)", email: "gadouche.zoubir@gmail.com" },
    { name: "IKHLEF Boualem", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Systèmes Asservis — Cours & TD (L3 ELCT)", email: "b.ikhlef@univ-boumerdes.dz" },
    { name: "M'ZIOU Nassima", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Réseaux Électriques (L3 ELCT), Électrotechnique Fondamentale (L2 ELCT)", email: "n.mziou@univ-boumerdes.dz" },
    { name: "AICHOUNE Nadia", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Schémas et Appareillage (L3 ELCT), Électronique de Puissance (L3 AUTO)", email: "nadiachn641@gmail.com" },
    { name: "Gaceb Yousra", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Capteurs & Métrologie, Électronique de Puissance TP (L3 ELCT/CIL, M1 BIO)", email: "gacebyousra8@gmail.com" },
    { name: "Taleb Faddi", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Schémas et Appareillage — TP (L3 ELCT)", email: "fadditaleb@gmail.com" },
    { name: "Fares Belynda", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Capteurs & Métrologie, Réseaux Électriques TP (L3 ELCT)", email: "faresbelynda32@gmail.com" },
    { name: "Belkessa Maya", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Ondes et Vibrations — TD (L2 ELCT)", email: "belkessa.maya.st.14@gmail.com" },
    { name: "Belhadj Safia", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Électrotechnique TP (L2 ELCT), Traitement du Signal TD (L3 TEL)", email: "belhadj.safia.st.32@gmail.com" },
    { name: "Ratiba Fellag", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Ondes et Vibrations — TP (L2 ELCT & L2 BIO)", email: "fellagratiba@gmail.com" },
    { name: "BAICHE Karim", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Électrotechnique & Interfaces", email: "kbaiche@univ-boumerdes.dz" },
    { name: "ACHELI Dalila", grade: "Enseignant-Chercheur", dept: "ELCT", specialty: "Génie Électrique", email: "d.acheli@univ-boumerdes.dz" },

    // CIL (Commande Industrielle)
    { name: "MILOUDI Lalia", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Commande Avancée (M2 CIL), Commande des Systèmes Linéaires (L3 CIL)", email: "lamiloudi@univ-boumerdes.dz" },
    { name: "NECHAF Hassiba", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Commande Intelligente (M2 CIL), Logiciel de Simulation (L3 ELCT)", email: "h.nechaf@univ-boumerdes.dz" },
    { name: "Boukri Yousra", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Systèmes à Événements Discrets — Cours & TD (M2 CIL)", email: "yousraboukri99@gmail.com" },
    { name: "Kacimi Nora", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Recherche Documentaire & Conception Mémoire (M2 CIL)", email: "n.kacimi@univ-boumerdes.dz" },
    { name: "Guelifet Haoua", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Systèmes Linéaires Multivariables (M1 CIL)", email: "haouaguelifet@gmail.com" },
    { name: "Touahria Rima", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Traitement du Signal Avancé — Cours & TD (M1 CIL)", email: "touahria.rimaa@gmail.com" },
    { name: "NEKKAA Messaouda", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Programmation Avancée Python (M1 CIL), Programmation C++ (L3 CIL)", email: "m.nekkaa@univ-boumerdes.dz" },
    { name: "Sai Meriem", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Association Convertisseurs-Machines TP (M1 CIL), Réseaux Transport TP (M1 MME)", email: "saimeriem199@gmail.com" },
    { name: "RADJEF Lilia", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Normes et Certification (L3 CIL), Traitement du Signal Avancé TP (M1 CIL & L3 BIO)", email: "l.radjef@univ-boumerdes.dz" },
    { name: "AHRICHE Aimad", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Électronique de Puissances — Cours & TD (L3 CIL)", email: "a.ahriche@univ-boumerdes.dz" },
    { name: "LATRECHE Sadjia", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Systèmes Asservis — Cours, TD & TP (L3 CIL)", email: "s.latreche@univ-boumerdes.dz" },
    { name: "Kader Wissam", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Commande Systèmes Linéaires TP (L3 CIL), Commande Avancée TP (M2 AUTO)", email: "kader.wissam.st.05@gmail.com" },
    { name: "DJALAB Aicha", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Énergies Renouvelables (L3 CIL), Programmation FPGA (M2 AUTO)", email: "a.djalab@univ-boumerdes.dz" },
    { name: "Allaouchiche Nesrine", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Commande Industrielle", email: "allaouchicheserine18@gmail.com" },
    { name: "AMRAOUI Sabrina", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Automatique & Commande", email: "sabrina.amraoui@ummto.dz" },
    { name: "Benaissa Alaeddine", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Mathématiques Appliquées", email: "atefdin@gmail.com" },
    { name: "Benmansour Radja", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Systèmes Numériques", email: "radjaben27@gmail.com" },
    { name: "Bouaraki Nacira", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Génie Électrique", email: "bounaci456@gmail.com" },
    { name: "Nezzal Amel", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Commande & Systèmes", email: "amelnezzal@gmail.com" },
    { name: "Rahmoune Chamseddine", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Commande Industrielle", email: "Ch.rahmoune@univ-boumerdes.dz" },
    { name: "RACHDA El Taani", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Automatique", email: "r.eltaani@univ-boumerdes.dz" },
    { name: "BOUTADJINE Ahmed", grade: "Enseignant-Chercheur", dept: "CIL", specialty: "Systèmes Industriels", email: "boutadjine92@gmail.com" },

    // BIO (Génie Biomédical)
    { name: "AMMAR Mohamed", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Instrumentation & Imagerie Médicale, Modélisation Systèmes Biomédicaux (M2 BIO)", email: "m.ammar@univ-boumerdes.dz" },
    { name: "MABROUK Djeddi", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Biocapteurs (M2 BIO), Ondes & Vibrations (L2 BIO), Traitement du Signal (M1 AUTO)", email: "djeddimabrouk@yahoo.com" },
    { name: "BENNIA Fatima", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Radiobiologie et Radioprotection — Cours, TD & TP (M1 BIO)", email: "f.bennia@univ-boumerdes.dz" },
    { name: "Ibticeme SEDJELMACI", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Traitement Avancé du Signal (M1 BIO), Informatique Médicale (L3 BIO)", email: "i.sedjelmaci@univ-boumerdes.dz" },
    { name: "HOCINE Faiza", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Fonctions Principales d'Électronique (M1 BIO), Électrotechnique Générale (L3 BIO)", email: "faiza_ho@yahoo.fr" },
    { name: "MESSAOUDENE Khadidja", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Biophysique — Cours, TD & TP (L3 BIO)", email: "k.messaoudene@univ-boumerdes.dz" },
    { name: "HAROUN Radia", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Ondes Appliquées & Maintenance Assistée par Ordinateur (L3 BIO)", email: "rd_haroun@yahoo.fr" },
    { name: "Nabi Zahia", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Traitement du Signal (L3 BIO, L3 TEL, M1 AUTO, M1 ESE)", email: "z.nabi.ensg@gmail.com" },
    { name: "Belkacem Samia", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Terminologie & Normalisation Médicale (L3 BIO), Électronique Fondamentale (L2 BIO)", email: "s.belkacem@univ-boumerdes.dz" },
    { name: "Bounechache Foudil", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Génie Biomédical", email: "foudilbounchache@gmail.com" },
    { name: "Grine Ali", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Instrumentation Biomédicale", email: "aligrine@yahoo.fr" },
    { name: "Guedifa Réda", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Électronique Biomédicale", email: "r.guedifa@univ-boumerdes.dz" },
    { name: "Yahiaoui Manel", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Génie Biomédical", email: "manel.manel.yh@gmail.com" },
    { name: "Nadjeh Lina", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Biomédical & Signaux", email: "lina12nadjeh@gmail.com" },
    { name: "Berouaken Nesrine", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Génie Biomédical", email: "berouakennesrine@gmail.com" },
    { name: "Aklil Ikram", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Génie Biomédical", email: "i.aklil@univ-boumerdes.dz" },
    { name: "Layachi Maroua", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Génie Biomédical", email: "layachi.marouaa@gmail.com" },
    { name: "Kechouane Manel", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Génie Biomédical", email: "kechouane.manel56@gmail.com" },
    { name: "Ladjici Nourelhouda", grade: "Enseignant-Chercheur", dept: "BIO", specialty: "Génie Biomédical", email: "ladjicinourelhouda23@gmail.com" }
];

// قوائم الطلبة للتحميل
const STUDENT_LISTS = [
    { dept: "RT", level: "Master 2 — Réseaux et Télécommunications (MRT25 / A & B)", count: 44, year: "2026-2027", file: "Liste_Etudiants_MRT25_M2.csv" },
    { dept: "RT", level: "Master 1 — Réseaux et Télécommunications (MRT26 / A & B)", count: 52, year: "2026-2027", file: "Liste_Etudiants_MRT26_M1.csv" },
    { dept: "RT", level: "Licence 3 — Télécommunications (LTEL24 / A & B)", count: 68, year: "2026-2027", file: "Liste_Etudiants_LTEL24_L3.csv" },
    { dept: "AUTO", level: "Master 2 — Automatique & Informatique Ind. (MAI-25)", count: 64, year: "2026-2027", file: "Liste_Etudiants_MAI25_M2.csv" },
    { dept: "AUTO", level: "Licence 3 — Automatique (LAUT-24)", count: 72, year: "2026-2027", file: "Liste_Etudiants_LAUT24_L3.csv" },
    { dept: "ELEC", level: "Master 2 — Électronique des Systèmes Embarqués (MESE25)", count: 48, year: "2026-2027", file: "Liste_Etudiants_MESE25_M2.csv" },
    { dept: "ELCT", level: "Master 2 — Machines Électriques (MME25)", count: 39, year: "2026-2027", file: "Liste_Etudiants_MME25_M2.csv" },
    { dept: "CIL", level: "Master 2 — Commande Industrielle (MCIL-25)", count: 41, year: "2026-2027", file: "Liste_Etudiants_MCIL25_M2.csv" },
    { dept: "BIO", level: "Master 2 — Génie Biomédical (MBIO-25)", count: 35, year: "2026-2027", file: "Liste_Etudiants_MBIO25_M2.csv" }
];