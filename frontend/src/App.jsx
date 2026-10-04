import React, { useEffect, useMemo, useState } from "react";
import "./index.css";

const API = "http://127.0.0.1:8000";

const ROLES = [
  "Reservoir Engineer",
  "Production Engineer",
  "Field Operator",
  "AI Analyst",
  "Operations Manager",
  "Administrator",
];

/* =========================================================
   ROLE MENUS
========================================================= */

const ROLE_PAGES = {
  "Reservoir Engineer": [
    { id: "command", label: "Command Center", icon: "⌂" },
    { id: "reservoir", label: "Reservoir Twin", icon: "◉" },
    { id: "reservoir-analysis", label: "Reservoir Analysis", icon: "◇" },
    { id: "css-design", label: "CSS Design", icon: "♨" },
    { id: "whatif", label: "What-If Simulator", icon: "◆" },
    { id: "reports", label: "Reservoir Reports", icon: "▥" },
  ],

  "Production Engineer": [
    { id: "production", label: "Production Monitor", icon: "⌂" },
    { id: "srp", label: "SRP Operations", icon: "⚙" },
    {
      id: "production-optimization",
      label: "Production Optimization",
      icon: "◆",
    },
    { id: "css", label: "CSS Operations", icon: "♨" },
    { id: "whatif", label: "What-If Simulator", icon: "◇" },
    { id: "reports", label: "Production Reports", icon: "▥" },
  ],

  "Field Operator": [
    { id: "field", label: "Field Dashboard", icon: "⌂" },
    { id: "well-operations", label: "Well Operations", icon: "◉" },
    { id: "css", label: "CSS Control", icon: "♨" },
    { id: "srp", label: "SRP Control", icon: "⚙" },
    { id: "work-orders", label: "Work Orders", icon: "▣" },
    { id: "alerts", label: "Alerts", icon: "!" },
  ],

  "AI Analyst": [
    { id: "ai", label: "AI Command Center", icon: "✦" },
    { id: "prediction", label: "Prediction Engine", icon: "◈" },
    { id: "whatif", label: "What-If Simulator", icon: "◇" },
    { id: "optimization", label: "AI Optimization", icon: "◆" },
    {
      id: "model-performance",
      label: "Model Performance",
      icon: "▥",
    },
    { id: "ai-reports", label: "AI Reports", icon: "▤" },
  ],

  "Operations Manager": [
    { id: "operations", label: "Operations Command", icon: "⌂" },
    { id: "approvals", label: "Plan Approvals", icon: "✓" },
    { id: "production", label: "Production Overview", icon: "▥" },
    { id: "field", label: "Field Status", icon: "◉" },
    { id: "decision", label: "Decision Center", icon: "◆" },
    { id: "reports", label: "Management Reports", icon: "▤" },
  ],

  Administrator: [
    { id: "admin", label: "Admin Dashboard", icon: "⌂" },
    { id: "users", label: "Users & Roles", icon: "♙" },
    {
      id: "configuration",
      label: "System Configuration",
      icon: "⚙",
    },
    { id: "audit", label: "Audit Log", icon: "▤" },
    { id: "data", label: "Data Management", icon: "▦" },
    { id: "system", label: "System Health", icon: "◉" },
  ],
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  English: {
    "Command Center": "Command Center",
    "Reservoir Twin": "Reservoir Twin",
    "Reservoir Analysis": "Reservoir Analysis",
    "CSS Design": "CSS Design",
    "What-If Simulator": "What-If Simulator",
    "Reservoir Reports": "Reservoir Reports",

    "Production Monitor": "Production Monitor",
    "SRP Operations": "SRP Operations",
    "Production Optimization": "Production Optimization",
    "CSS Operations": "CSS Operations",
    "Production Reports": "Production Reports",

    "Field Dashboard": "Field Dashboard",
    "Well Operations": "Well Operations",
    "CSS Control": "CSS Control",
    "SRP Control": "SRP Control",
    "Work Orders": "Work Orders",
    Alerts: "Alerts",

    "AI Command Center": "AI Command Center",
    "Prediction Engine": "Prediction Engine",
    "AI Optimization": "AI Optimization",
    "Model Performance": "Model Performance",
    "AI Reports": "AI Reports",

    "Operations Command": "Operations Command",
    "Plan Approvals": "Plan Approvals",
    "Production Overview": "Production Overview",
    "Field Status": "Field Status",
    "Decision Center": "Decision Center",
    "Management Reports": "Management Reports",

    "Admin Dashboard": "Admin Dashboard",
    "Users & Roles": "Users & Roles",
    "System Configuration": "System Configuration",
    "Audit Log": "Audit Log",
    "Data Management": "Data Management",
    "System Health": "System Health",

    "Live Field Status": "Live Field Status",
    "Reservoir Temperature": "Reservoir Temperature",
    Production: "Production",
    Temperature: "Temperature",
    Pressure: "Pressure",
    Viscosity: "Viscosity",
    "Equipment Risk": "Equipment Risk",
    "Steam Volume": "Steam Volume",
    "Soak Time": "Soak Time",
    "Stroke Length": "Stroke Length",
    SPM: "SPM",
    "Start CSS": "Start CSS",
    "Stop CSS": "Stop CSS",
    "Start SRP": "Start SRP",
    "Update SRP": "Update SRP",
    "Create Plan": "Create Plan",
    Approve: "Approve",
    Execute: "Execute",
    Logout: "Logout",
    "Digital Twin Online": "Digital Twin Online",
    "Well-to-Surface Optimization Control":
      "Well-to-Surface Optimization Control",
    "AI Engine": "AI Engine",
    "Simulation Results": "Simulation Results",
    "Predicted Production": "Predicted Production",
    "Predicted Energy": "Predicted Energy",
    "Equipment Risk": "Equipment Risk",
    "Oil Viscosity": "Oil Viscosity",
    "AI Model": "AI Model",
    "Model Status": "Model Status",
    Active: "Active",
    "System Healthy": "System Healthy",
    "System Status": "System Status",
    "Connected": "Connected",
    "Simulated Live": "Simulated Live",
  },

  Telugu: {
    "Command Center": "కమాండ్ సెంటర్",
    "Reservoir Twin": "రిజర్వాయర్ ట్విన్",
    "Reservoir Analysis": "రిజర్వాయర్ విశ్లేషణ",
    "CSS Design": "CSS డిజైన్",
    "What-If Simulator": "వాట్-ఇఫ్ సిమ్యులేటర్",
    "Reservoir Reports": "రిజర్వాయర్ నివేదికలు",

    "Production Monitor": "ఉత్పత్తి మానిటర్",
    "SRP Operations": "SRP కార్యకలాపాలు",
    "Production Optimization": "ఉత్పత్తి ఆప్టిమైజేషన్",
    "CSS Operations": "CSS కార్యకలాపాలు",
    "Production Reports": "ఉత్పత్తి నివేదికలు",

    "Field Dashboard": "ఫీల్డ్ డ్యాష్‌బోర్డ్",
    "Well Operations": "బావి కార్యకలాపాలు",
    "CSS Control": "CSS నియంత్రణ",
    "SRP Control": "SRP నియంత్రణ",
    "Work Orders": "వర్క్ ఆర్డర్లు",
    Alerts: "హెచ్చరికలు",

    "AI Command Center": "AI కమాండ్ సెంటర్",
    "Prediction Engine": "అంచనా ఇంజిన్",
    "AI Optimization": "AI ఆప్టిమైజేషన్",
    "Model Performance": "మోడల్ పనితీరు",
    "AI Reports": "AI నివేదికలు",

    "Operations Command": "ఆపరేషన్స్ కమాండ్",
    "Plan Approvals": "ప్లాన్ ఆమోదాలు",
    "Production Overview": "ఉత్పత్తి అవలోకనం",
    "Field Status": "ఫీల్డ్ స్థితి",
    "Decision Center": "నిర్ణయ కేంద్రం",
    "Management Reports": "నిర్వహణ నివేదికలు",

    "Admin Dashboard": "అడ్మిన్ డ్యాష్‌బోర్డ్",
    "Users & Roles": "వినియోగదారులు & పాత్రలు",
    "System Configuration": "సిస్టమ్ కాన్ఫిగరేషన్",
    "Audit Log": "ఆడిట్ లాగ్",
    "Data Management": "డేటా నిర్వహణ",
    "System Health": "సిస్టమ్ ఆరోగ్యం",

    "Live Field Status": "లైవ్ ఫీల్డ్ స్థితి",
    "Reservoir Temperature": "రిజర్వాయర్ ఉష్ణోగ్రత",
    Production: "ఉత్పత్తి",
    Temperature: "ఉష్ణోగ్రత",
    Pressure: "పీడనం",
    Viscosity: "స్నిగ్ధత",
    "Equipment Risk": "పరికర ప్రమాదం",
    "Steam Volume": "ఆవిరి పరిమాణం",
    "Soak Time": "సోక్ సమయం",
    "Stroke Length": "స్ట్రోక్ పొడవు",
    SPM: "SPM",
    "Start CSS": "CSS ప్రారంభించండి",
    "Stop CSS": "CSS ఆపండి",
    "Start SRP": "SRP ప్రారంభించండి",
    "Update SRP": "SRP నవీకరించండి",
    "Create Plan": "ప్లాన్ సృష్టించండి",
    Approve: "ఆమోదించండి",
    Execute: "అమలు చేయండి",
    Logout: "లాగ్ అవుట్",
    "Digital Twin Online": "డిజిటల్ ట్విన్ ఆన్‌లైన్",
    "Well-to-Surface Optimization Control":
      "వెల్-టు-సర్ఫేస్ ఆప్టిమైజేషన్ నియంత్రణ",
    "AI Engine": "AI ఇంజిన్",
    "Simulation Results": "సిమ్యులేషన్ ఫలితాలు",
    "Predicted Production": "అంచనా ఉత్పత్తి",
    "Predicted Energy": "అంచనా శక్తి",
    "Equipment Risk": "పరికర ప్రమాదం",
    "Oil Viscosity": "చమురు స్నిగ్ధత",
    "AI Model": "AI మోడల్",
    "Model Status": "మోడల్ స్థితి",
    Active: "క్రియాశీలం",
    "System Healthy": "సిస్టమ్ ఆరోగ్యంగా ఉంది",
    "System Status": "సిస్టమ్ స్థితి",
    Connected: "కనెక్ట్ అయింది",
    "Simulated Live": "సిమ్యులేటెడ్ లైవ్",
  },

  Hindi: {
    "Command Center": "कमांड सेंटर",
    "Reservoir Twin": "रिज़र्वायर ट्विन",
    "Reservoir Analysis": "रिज़र्वायर विश्लेषण",
    "CSS Design": "CSS डिज़ाइन",
    "What-If Simulator": "व्हाट-इफ सिम्युलेटर",
    "Reservoir Reports": "रिज़र्वायर रिपोर्ट",

    "Production Monitor": "उत्पादन मॉनिटर",
    "SRP Operations": "SRP संचालन",
    "Production Optimization": "उत्पादन अनुकूलन",
    "CSS Operations": "CSS संचालन",
    "Production Reports": "उत्पादन रिपोर्ट",

    "Field Dashboard": "फील्ड डैशबोर्ड",
    "Well Operations": "कुआँ संचालन",
    "CSS Control": "CSS नियंत्रण",
    "SRP Control": "SRP नियंत्रण",
    "Work Orders": "वर्क ऑर्डर",
    Alerts: "अलर्ट",

    "AI Command Center": "AI कमांड सेंटर",
    "Prediction Engine": "पूर्वानुमान इंजन",
    "AI Optimization": "AI अनुकूलन",
    "Model Performance": "मॉडल प्रदर्शन",
    "AI Reports": "AI रिपोर्ट",

    "Operations Command": "ऑपरेशंस कमांड",
    "Plan Approvals": "प्लान अनुमोदन",
    "Production Overview": "उत्पादन अवलोकन",
    "Field Status": "फील्ड स्थिति",
    "Decision Center": "निर्णय केंद्र",
    "Management Reports": "प्रबंधन रिपोर्ट",

    "Admin Dashboard": "एडमिन डैशबोर्ड",
    "Users & Roles": "उपयोगकर्ता और भूमिकाएँ",
    "System Configuration": "सिस्टम कॉन्फ़िगरेशन",
    "Audit Log": "ऑडिट लॉग",
    "Data Management": "डेटा प्रबंधन",
    "System Health": "सिस्टम स्वास्थ्य",

    "Live Field Status": "लाइव फील्ड स्थिति",
    "Reservoir Temperature": "रिज़र्वायर तापमान",
    Production: "उत्पादन",
    Temperature: "तापमान",
    Pressure: "दबाव",
    Viscosity: "श्यानता",
    "Equipment Risk": "उपकरण जोखिम",
    "Steam Volume": "भाप मात्रा",
    "Soak Time": "सोखने का समय",
    "Stroke Length": "स्ट्रोक लंबाई",
    SPM: "SPM",
    "Start CSS": "CSS शुरू करें",
    "Stop CSS": "CSS रोकें",
    "Start SRP": "SRP शुरू करें",
    "Update SRP": "SRP अपडेट करें",
    "Create Plan": "प्लान बनाएँ",
    Approve: "अनुमोदित करें",
    Execute: "लागू करें",
    Logout: "लॉग आउट",
    "Digital Twin Online": "डिजिटल ट्विन ऑनलाइन",
    "Well-to-Surface Optimization Control":
      "वेल-टू-सर्फेस अनुकूलन नियंत्रण",
    "AI Engine": "AI इंजन",
    "Simulation Results": "सिमुलेशन परिणाम",
    "Predicted Production": "अनुमानित उत्पादन",
    "Predicted Energy": "अनुमानित ऊर्जा",
    "Oil Viscosity": "तेल श्यानता",
    "AI Model": "AI मॉडल",
    "Model Status": "मॉडल स्थिति",
    Active: "सक्रिय",
    "System Healthy": "सिस्टम स्वस्थ",
    "System Status": "सिस्टम स्थिति",
    Connected: "कनेक्टेड",
    "Simulated Live": "सिम्युलेटेड लाइव",
  },

  Tamil: {
    "Command Center": "கட்டளை மையம்",
    "Reservoir Twin": "ரிசர்வாயர் ட்வின்",
    "Reservoir Analysis": "ரிசர்வாயர் பகுப்பாய்வு",
    "CSS Design": "CSS வடிவமைப்பு",
    "What-If Simulator": "வாட்-இஃப் சிமுலேட்டர்",
    "Reservoir Reports": "ரிசர்வாயர் அறிக்கைகள்",

    "Production Monitor": "உற்பத்தி கண்காணிப்பு",
    "SRP Operations": "SRP செயல்பாடுகள்",
    "Production Optimization": "உற்பத்தி மேம்படுத்தல்",
    "CSS Operations": "CSS செயல்பாடுகள்",
    "Production Reports": "உற்பத்தி அறிக்கைகள்",

    "Field Dashboard": "புல டாஷ்போர்டு",
    "Well Operations": "கிணறு செயல்பாடுகள்",
    "CSS Control": "CSS கட்டுப்பாடு",
    "SRP Control": "SRP கட்டுப்பாடு",
    "Work Orders": "வேலை ஆணைகள்",
    Alerts: "எச்சரிக்கைகள்",

    "AI Command Center": "AI கட்டளை மையம்",
    "Prediction Engine": "கணிப்பு இயந்திரம்",
    "AI Optimization": "AI மேம்படுத்தல்",
    "Model Performance": "மாதிரி செயல்திறன்",
    "AI Reports": "AI அறிக்கைகள்",

    "Operations Command": "செயல்பாட்டு கட்டளை",
    "Plan Approvals": "திட்ட அனுமதிகள்",
    "Production Overview": "உற்பத்தி மேலோட்டம்",
    "Field Status": "புல நிலை",
    "Decision Center": "முடிவு மையம்",
    "Management Reports": "மேலாண்மை அறிக்கைகள்",

    "Admin Dashboard": "நிர்வாக டாஷ்போர்டு",
    "Users & Roles": "பயனர்கள் மற்றும் பாத்திரங்கள்",
    "System Configuration": "கணினி அமைப்பு",
    "Audit Log": "ஆடிட் பதிவு",
    "Data Management": "தரவு மேலாண்மை",
    "System Health": "கணினி ஆரோக்கியம்",

    "Production": "உற்பத்தி",
    "Temperature": "வெப்பநிலை",
    "Pressure": "அழுத்தம்",
    "Viscosity": "பாகுத்தன்மை",
    "Equipment Risk": "உபகரண ஆபத்து",
    "Steam Volume": "நீராவி அளவு",
    "Soak Time": "சோக் நேரம்",
    "Stroke Length": "ஸ்ட்ரோக் நீளம்",
    "Start CSS": "CSS தொடங்கு",
    "Stop CSS": "CSS நிறுத்து",
    "Start SRP": "SRP தொடங்கு",
    "Update SRP": "SRP புதுப்பி",
    "Create Plan": "திட்டம் உருவாக்கு",
    Approve: "அனுமதி",
    Execute: "செயல்படுத்து",
    Logout: "வெளியேறு",
    "Digital Twin Online": "டிஜிட்டல் ட்வின் ஆன்லைன்",
  },

  Kannada: {
    "Command Center": "ಕಮಾಂಡ್ ಸೆಂಟರ್",
    "Reservoir Twin": "ರಿಸರ್ವಾಯರ್ ಟ್ವಿನ್",
    "Reservoir Analysis": "ರಿಸರ್ವಾಯರ್ ವಿಶ್ಲೇಷಣೆ",
    "CSS Design": "CSS ವಿನ್ಯಾಸ",
    "What-If Simulator": "ವಾಟ್-ಇಫ್ ಸಿಮ್ಯುಲೇಟರ್",
    "Reservoir Reports": "ರಿಸರ್ವಾಯರ್ ವರದಿಗಳು",

    "Production Monitor": "ಉತ್ಪಾದನಾ ಮಾನಿಟರ್",
    "SRP Operations": "SRP ಕಾರ್ಯಾಚರಣೆಗಳು",
    "Production Optimization": "ಉತ್ಪಾದನಾ ಆಪ್ಟಿಮೈಸೇಶನ್",
    "CSS Operations": "CSS ಕಾರ್ಯಾಚರಣೆಗಳು",
    "Production Reports": "ಉತ್ಪಾದನಾ ವರದಿಗಳು",

    "Field Dashboard": "ಫೀಲ್ಡ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "Well Operations": "ಬಾವಿ ಕಾರ್ಯಾಚರಣೆಗಳು",
    "CSS Control": "CSS ನಿಯಂತ್ರಣ",
    "SRP Control": "SRP ನಿಯಂತ್ರಣ",
    "Work Orders": "ಕೆಲಸದ ಆದೇಶಗಳು",
    Alerts: "ಎಚ್ಚರಿಕೆಗಳು",

    "AI Command Center": "AI ಕಮಾಂಡ್ ಸೆಂಟರ್",
    "Prediction Engine": "ಮುನ್ಸೂಚನೆ ಎಂಜಿನ್",
    "AI Optimization": "AI ಆಪ್ಟಿಮೈಸೇಶನ್",
    "Model Performance": "ಮಾದರಿ ಕಾರ್ಯಕ್ಷಮತೆ",
    "AI Reports": "AI ವರದಿಗಳು",

    "Operations Command": "ಆಪರೇಷನ್ಸ್ ಕಮಾಂಡ್",
    "Plan Approvals": "ಯೋಜನೆ ಅನುಮೋದನೆಗಳು",
    "Production Overview": "ಉತ್ಪಾದನಾ ಅವಲೋಕನ",
    "Field Status": "ಫೀಲ್ಡ್ ಸ್ಥಿತಿ",
    "Decision Center": "ನಿರ್ಧಾರ ಕೇಂದ್ರ",
    "Management Reports": "ನಿರ್ವಹಣಾ ವರದಿಗಳು",

    "Admin Dashboard": "ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "Users & Roles": "ಬಳಕೆದಾರರು ಮತ್ತು ಪಾತ್ರಗಳು",
    "System Configuration": "ಸಿಸ್ಟಮ್ ಕಾನ್ಫಿಗರೇಶನ್",
    "Audit Log": "ಆಡಿಟ್ ಲಾಗ್",
    "Data Management": "ಡೇಟಾ ನಿರ್ವಹಣೆ",
    "System Health": "ಸಿಸ್ಟಮ್ ಆರೋಗ್ಯ",

    Production: "ಉತ್ಪಾದನೆ",
    Temperature: "ತಾಪಮಾನ",
    Pressure: "ಒತ್ತಡ",
    Viscosity: "ಸ್ನಿಗ್ಧತೆ",
    "Equipment Risk": "ಉಪಕರಣ ಅಪಾಯ",
    "Steam Volume": "ಆವಿ ಪ್ರಮಾಣ",
    "Soak Time": "ಸೋಕ್ ಸಮಯ",
    "Stroke Length": "ಸ್ಟ್ರೋಕ್ ಉದ್ದ",
    "Start CSS": "CSS ಪ್ರಾರಂಭಿಸಿ",
    "Stop CSS": "CSS ನಿಲ್ಲಿಸಿ",
    "Start SRP": "SRP ಪ್ರಾರಂಭಿಸಿ",
    "Update SRP": "SRP ನವೀಕರಿಸಿ",
    "Create Plan": "ಯೋಜನೆ ರಚಿಸಿ",
    Approve: "ಅನುಮೋದಿಸಿ",
    Execute: "ಕಾರ್ಯಗತಗೊಳಿಸಿ",
    Logout: "ಲಾಗ್ ಔಟ್",
    "Digital Twin Online": "ಡಿಜಿಟಲ್ ಟ್ವಿನ್ ಆನ್‌ಲೈನ್",
  },
};

function t(language, value) {
  return TRANSLATIONS[language]?.[value] || value;
}

/* =========================================================
   HELPERS
========================================================= */

function getInitialLanguage() {
  return localStorage.getItem("baghewala_language") || "English";
}

function safeText(value) {
  if (value === null || value === undefined) return "";

  if (typeof value === "string") return value;

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => safeText(item))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof value === "object") {
    return (
      value.message ||
      value.detail ||
      value.error ||
      value.status ||
      JSON.stringify(value)
    );
  }

  return String(value);
}

async function apiRequest(path, options = {}, token = null) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API}${path}`, {
    ...options,
    headers,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      safeText(data?.detail || data?.message || `HTTP ${response.status}`)
    );
  }

  return data;
}

/* =========================================================
   LANGUAGE SELECTOR
========================================================= */

function LanguageSelector({ language, setLanguage }) {
  return (
    <select
      className="language-selector"
      value={language}
      onChange={(e) => {
        const next = e.target.value;
        localStorage.setItem("baghewala_language", next);
        setLanguage(next);
      }}
    >
      <option value="English">English</option>
      <option value="Telugu">తెలుగు</option>
      <option value="Hindi">हिन्दी</option>
      <option value="Tamil">தமிழ்</option>
      <option value="Kannada">ಕನ್ನಡ</option>
    </select>
  );
}

/* =========================================================
   LANDING
========================================================= */

function LandingPage({ onEnter, language, setLanguage }) {
  return (
    <div className="landing-page">
      <div className="landing-language">
        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
        />
      </div>

      <div className="landing-logo">◇</div>

      <h1>BAGHEWALA</h1>

      <div className="landing-subtitle">
        AI DIGITAL TWIN
      </div>

      <div className="landing-description">
        {t(
          language,
          "Well-to-Surface Optimization Control"
        )}
      </div>

      <div className="landing-features">
        <span>RESERVOIR</span>
        <span>CSS</span>
        <span>SRP</span>
        <span>AI ENGINE</span>
      </div>

      <button
        className="landing-button"
        onClick={onEnter}
      >
        ENTER CONTROL ROOM →
      </button>

      <div className="landing-footer">
        BW-05 ACTIVE WELL • BAGHEWALA FIELD
      </div>
    </div>
  );
}

/* =========================================================
   AUTH
========================================================= */

function AuthPage({
  onLogin,
  language,
  setLanguage,
  loading,
  error,
}) {
  const [username, setUsername] = useState("analyst");
  const [password, setPassword] = useState("analyst123");
  const [role, setRole] = useState("AI Analyst");

  const submit = async (e) => {
    e.preventDefault();

    await onLogin({
      username,
      password,
      role,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-language">
        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
        />
      </div>

      <div className="auth-card">
        <div className="auth-logo">◇</div>

        <h1>BAGHEWALA</h1>

        <div className="auth-brand">
          AI DIGITAL TWIN
        </div>

        <p>
          Well-to-Surface CSS + SRP Optimization Platform
        </p>

        <form onSubmit={submit}>
          <label>USERNAME</label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />

          <label>PASSWORD</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <label>ROLE</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {ROLES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {error && (
            <div className="auth-message">
              {safeText(error)}
            </div>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "CONNECTING..."
              : "ENTER CONTROL ROOM"}
          </button>
        </form>

        <div className="demo-access">
          <strong>DEMO ACCESS</strong>

          engineer / engineer123
          <br />

          analyst / analyst123
          <br />

          manager / manager123
          <br />

          operator / operator123
          <br />

          production / production123
          <br />

          admin / admin123
        </div>

        <div className="prototype-note">
          PROTOTYPE • SYNTHETIC TELEMETRY • BW-05
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  user,
  page,
  setPage,
  language,
  onLogout,
}) {
  const pages =
    ROLE_PAGES[user?.role] ||
    ROLE_PAGES["Reservoir Engineer"];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">◇</div>

        <div>
          <strong>BAGHEWALA</strong>
          <small>AI DIGITAL TWIN</small>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="user-dot" />

        <div>
          <strong>{user?.username}</strong>

          <small>
            {user?.role}
          </small>
        </div>
      </div>

      <nav>
        {pages.map((item) => (
          <button
            key={item.id}
            className={
              page === item.id
                ? "active"
                : ""
            }
            onClick={() => setPage(item.id)}
          >
            <span className="nav-icon">
              {item.icon}
            </span>

            <span>
              {t(language, item.label)}
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-status">
          <span />
          {t(
            language,
            "Digital Twin Online"
          )}
        </div>

        <button
          className="control-btn secondary"
          style={{
            width: "100%",
            marginTop: "15px",
          }}
          onClick={onLogout}
        >
          ↪ {t(language, "Logout")}
        </button>
      </div>
    </aside>
  );
}

/* =========================================================
   TOPBAR
========================================================= */

function Topbar({
  user,
  language,
  setLanguage,
  twin,
}) {
  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">
          BW-05
        </div>

        <div className="topbar-subtitle">
          Baghewala Field
        </div>
      </div>

      <div className="topbar-right">
        <div className="live-indicator">
          <span />
          LIVE
        </div>

        <div className="topbar-role">
          {user?.role}
        </div>

        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
        />

        <div className="live-indicator">
          <span />
          {t(language, "Connected")}
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   COMMON COMPONENTS
========================================================= */

function PageHeader({
  title,
  subtitle,
  language,
}) {
  return (
    <div className="page-header">
      <div>
        <h1>{t(language, title)}</h1>

        {subtitle && (
          <p>{t(language, subtitle)}</p>
        )}
      </div>

      <div className="header-line" />
    </div>
  );
}

function KPI({
  label,
  value,
  unit,
  status,
  language,
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">
        {t(language, label)}
      </div>

      <div className="kpi-value">
        {value ?? "--"}

        {unit && (
          <span>{unit}</span>
        )}
      </div>

      {status && (
        <div className="kpi-status">
          {t(language, status)}
        </div>
      )}
    </div>
  );
}

function Panel({
  title,
  children,
  language,
}) {
  return (
    <section className="panel">
      {title && (
        <div className="panel-title">
          {t(language, title)}
        </div>
      )}

      <div className="panel-content">
        {children}
      </div>
    </section>
  );
}

function MetricBox({
  label,
  value,
  unit,
  language,
}) {
  return (
    <div className="metric-box">
      <span>
        {t(language, label)}
      </span>

      <strong>
        {value ?? "--"}{" "}
        {unit || ""}
      </strong>
    </div>
  );
}

function Button({
  children,
  onClick,
  danger = false,
  secondary = false,
  disabled = false,
}) {
  return (
    <button
      className={`control-btn ${
        danger ? "danger" : ""
      } ${secondary ? "secondary" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/* =========================================================
   COMMAND CENTER
========================================================= */

function CommandCenter({
  twin,
  language,
  user,
}) {
  const production =
    twin?.production ??
    twin?.daily_production ??
    254;

  const temperature =
    twin?.temperature ?? 70;

  const pressure =
    twin?.pressure ?? 20;

  const viscosity =
    twin?.viscosity ?? 630;

  const risk =
    twin?.equipment_risk ??
    twin?.risk ??
    27;

  return (
    <>
      <PageHeader
        title="Command Center"
        subtitle="Well-to-Surface Optimization Control"
        language={language}
      />

      <div className="kpi-grid">
        <KPI
          label="Production"
          value={Number(production).toFixed(1)}
          unit="bbl/d"
          status="CURRENT"
          language={language}
        />

        <KPI
          label="Temperature"
          value={Number(temperature).toFixed(1)}
          unit="°C"
          status="LIVE"
          language={language}
        />

        <KPI
          label="Pressure"
          value={Number(pressure).toFixed(1)}
          unit="bar"
          status="LIVE"
          language={language}
        />

        <KPI
          label="Viscosity"
          value={Number(viscosity).toFixed(0)}
          unit="cP"
          status="ESTIMATED"
          language={language}
        />

        <KPI
          label="Equipment Risk"
          value={Number(risk).toFixed(1)}
          unit="%"
          status={
            Number(risk) < 35
              ? "NORMAL"
              : "ATTENTION"
          }
          language={language}
        />
      </div>

      <div className="dashboard-grid">
        <Panel
          title="Live Field Status"
          language={language}
        >
          <FieldMap />
        </Panel>

        <Panel
          title="Well-to-Surface Workflow"
          language={language}
        >
          <div className="workflow">
            <div className="workflow-step">
              <div className="workflow-number">
                01
              </div>
              RESERVOIR
            </div>

            <div className="workflow-arrow">
              →
            </div>

            <div className="workflow-step">
              <div className="workflow-number">
                02
              </div>
              CSS
            </div>

            <div className="workflow-arrow">
              →
            </div>

            <div className="workflow-step">
              <div className="workflow-number">
                03
              </div>
              SRP
            </div>

            <div className="workflow-arrow">
              →
            </div>

            <div className="workflow-step">
              <div className="workflow-number">
                04
              </div>
              PRODUCTION
            </div>
          </div>

          <div className="state-grid">
            <div className="state-row">
              <span>Well</span>
              <strong>BW-05</strong>
            </div>

            <div className="state-row">
              <span>Role</span>
              <strong>{user?.role}</strong>
            </div>

            <div className="state-row">
              <span>CSS</span>
              <strong>
                {twin?.css_status || "READY"}
              </strong>
            </div>

            <div className="state-row">
              <span>SRP</span>
              <strong>
                {twin?.srp_status || "RUNNING"}
              </strong>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   FIELD MAP
========================================================= */

function FieldMap() {
  return (
    <div className="field-map">
      <div className="field-grid" />

      <div className="field-road" />

      <div className="field-well well-a">
        BW-05
      </div>

      <div className="field-well well-b">
        BW-03
      </div>

      <div className="field-well well-c">
        BW-07
      </div>
    </div>
  );
}

/* =========================================================
   RESERVOIR TWIN
========================================================= */

function ReservoirTwin({
  twin,
  language,
}) {
  return (
    <>
      <PageHeader
        title="Reservoir Twin"
        subtitle="Thermal propagation and oil mobility"
        language={language}
      />

      <div className="reservoir-layout">
        <Panel
          title="Digital Reservoir Visualization"
          language={language}
        >
          <div className="large-reservoir">
            <div className="earth-surface">
              SURFACE • BAGHEWALA FIELD • BW-05
            </div>

            <div className="geo-layer layer-1" />
            <div className="geo-layer layer-2" />
            <div className="geo-layer layer-3" />

            <div className="heat-zone">
              <div className="heat-core" />
            </div>

            <div className="large-well">
              <div className="wellhead">
                BW-05
              </div>

              <div className="casing" />

              <div className="pump-depth">
                SRP
              </div>
            </div>

            <div className="steam-injection">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="oil-flow">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="reservoir-legend">
              <div>
                <i className="legend-steam" />
                STEAM / HEAT
              </div>

              <div>
                <i className="legend-oil" />
                HEAVY OIL
              </div>

              <div>
                <i className="legend-well" />
                WELL / SRP
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          title="Reservoir State"
          language={language}
        >
          <div className="twin-metrics">
            <MetricBox
              label="Temperature"
              value={Number(
                twin?.temperature ?? 70
              ).toFixed(1)}
              unit="°C"
              language={language}
            />

            <MetricBox
              label="Pressure"
              value={Number(
                twin?.pressure ?? 20
              ).toFixed(1)}
              unit="bar"
              language={language}
            />

            <MetricBox
              label="Oil Viscosity"
              value={Number(
                twin?.viscosity ?? 630
              ).toFixed(0)}
              unit="cP"
              language={language}
            />

            <MetricBox
              label="Steam Volume"
              value={
                twin?.steam_volume ?? 540
              }
              unit="m³"
              language={language}
            />

            <MetricBox
              label="Soak Time"
              value={
                twin?.soak_time ?? 28
              }
              unit="hr"
              language={language}
            />

            <MetricBox
              label="Production"
              value={Number(
                twin?.production ?? 254
              ).toFixed(1)}
              unit="bbl/d"
              language={language}
            />
          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <div className="state-row">
              <span>Phase</span>
              <strong>
                {twin?.phase ||
                  "Thermal Propagation"}
              </strong>
            </div>

            <div className="state-row">
              <span>Well</span>
              <strong>BW-05</strong>
            </div>

            <div className="state-row">
              <span>Field</span>
              <strong>Baghewala</strong>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   RESERVOIR ANALYSIS
========================================================= */

function ReservoirAnalysis({
  twin,
  language,
}) {
  return (
    <>
      <PageHeader
        title="Reservoir Analysis"
        subtitle="Thermal reservoir diagnostics"
        language={language}
      />

      <div className="kpi-grid">
        <KPI
          label="Temperature"
          value={Number(
            twin?.temperature ?? 70
          ).toFixed(1)}
          unit="°C"
          status="THERMAL STATE"
          language={language}
        />

        <KPI
          label="Pressure"
          value={Number(
            twin?.pressure ?? 20
          ).toFixed(1)}
          unit="bar"
          status="RESERVOIR"
          language={language}
        />

        <KPI
          label="Viscosity"
          value={Number(
            twin?.viscosity ?? 630
          ).toFixed(0)}
          unit="cP"
          status="HEAVY OIL"
          language={language}
        />

        <KPI
          label="Steam Volume"
          value={
            twin?.steam_volume ?? 540
          }
          unit="m³"
          status="CSS INPUT"
          language={language}
        />
      </div>

      <Panel
        title="Reservoir Interpretation"
        language={language}
      >
        <div className="state-grid">
          <div className="state-row">
            <span>Thermal propagation</span>
            <strong>ACTIVE</strong>
          </div>

          <div className="state-row">
            <span>Oil mobility</span>
            <strong>IMPROVING</strong>
          </div>

          <div className="state-row">
            <span>Steam response</span>
            <strong>POSITIVE</strong>
          </div>

          <div className="state-row">
            <span>Reservoir phase</span>
            <strong>
              {twin?.phase ||
                "Thermal Propagation"}
            </strong>
          </div>
        </div>
      </Panel>

      <Panel
        title="Thermal Response"
        language={language}
      >
        <ResponseBars
          items={[
            ["Temperature Response", 78],
            ["Viscosity Reduction", 64],
            ["Steam Utilization", 71],
            ["Oil Mobility", 68],
          ]}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   CSS DESIGN
========================================================= */

function CSSDesign({
  twin,
  language,
  onStart,
  onStop,
  onSoak,
}) {
  return (
    <>
      <PageHeader
        title="CSS Design"
        subtitle="Cyclic Steam Stimulation planning"
        language={language}
      />

      <div className="operations-grid">
        <Panel
          title="CSS Thermal System"
          language={language}
        >
          <div className="css-visual">
            <div className="steam-tank">
              <div className="tank-top" />

              <div className="tank-body">
                <div className="tank-level" />
              </div>

              <span>STEAM GENERATOR</span>
            </div>

            <div className="steam-pipeline">
              <span />
              <span />
              <span />
            </div>

            <div className="css-well">
              BW-05
              <br />
              INJECTION
            </div>
          </div>

          <div className="button-row">
            <Button onClick={onStart}>
              {t(language, "Start CSS")}
            </Button>

            <Button
              danger
              onClick={onStop}
            >
              {t(language, "Stop CSS")}
            </Button>

            <Button
              secondary
              onClick={onSoak}
            >
              START SOAK
            </Button>
          </div>
        </Panel>

        <Panel
          title="CSS Parameters"
          language={language}
        >
          <MetricBox
            label="Steam Volume"
            value={
              twin?.steam_volume ?? 540
            }
            unit="m³"
            language={language}
          />

          <MetricBox
            label="Soak Time"
            value={
              twin?.soak_time ?? 28
            }
            unit="hr"
            language={language}
          />

          <div
            style={{
              marginTop: "15px",
            }}
          >
            <div className="state-row">
              <span>Status</span>
              <strong>
                {twin?.css_status ||
                  "READY"}
              </strong>
            </div>

            <div className="state-row">
              <span>Temperature</span>
              <strong>
                {twin?.temperature ?? 70} °C
              </strong>
            </div>

            <div className="state-row">
              <span>Pressure</span>
              <strong>
                {twin?.pressure ?? 20} bar
              </strong>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   SRP OPERATIONS
========================================================= */

function SRPOperations({
  twin,
  language,
  onStart,
  onUpdate,
}) {
  const [spm, setSpm] = useState(
    twin?.spm ?? 8
  );

  const [stroke, setStroke] =
    useState(
      twin?.stroke_length ?? 2.6
    );

  return (
    <>
      <PageHeader
        title="SRP Operations"
        subtitle="Sucker rod pump optimization"
        language={language}
      />

      <div className="srp-grid">
        <Panel
          title="Pumpjack Digital Twin"
          language={language}
        >
          <div className="pumpjack">
            <div className="pump-base" />

            <div className="pump-tower">
              <div />
              <div />
              <div />
            </div>

            <div className="pump-beam">
              <div className="horse-head" />
            </div>

            <div className="pump-rod" />

            <div className="pump-cylinder" />

            <div className="pump-wheel" />
          </div>

          <div className="srp-status">
            <span className="status-dot" />
            {twin?.srp_status ||
              "RUNNING"}
          </div>
        </Panel>

        <Panel
          title="Pump Parameters"
          language={language}
        >
          <div className="slider-box">
            <div className="slider-head">
              <span>SPM</span>

              <strong>
                {spm}
              </strong>
            </div>

            <input
              type="range"
              min="4"
              max="12"
              step="1"
              value={spm}
              onChange={(e) =>
                setSpm(
                  Number(e.target.value)
                )
              }
            />

            <div className="slider-scale">
              <span>4</span>
              <span>8</span>
              <span>12</span>
            </div>
          </div>

          <div className="slider-box">
            <div className="slider-head">
              <span>
                {t(
                  language,
                  "Stroke Length"
                )}
              </span>

              <strong>
                {stroke.toFixed(1)} m
              </strong>
            </div>

            <input
              type="range"
              min="1.5"
              max="3.5"
              step="0.1"
              value={stroke}
              onChange={(e) =>
                setStroke(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <Button
            onClick={() =>
              onUpdate(spm, stroke)
            }
          >
            {t(
              language,
              "Update SRP"
            )}
          </Button>

          <Button onClick={onStart}>
            {t(
              language,
              "Start SRP"
            )}
          </Button>
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   FIELD OPERATOR
========================================================= */

function FieldDashboard({
  twin,
  language,
}) {
  return (
    <>
      <PageHeader
        title="Field Dashboard"
        subtitle="Real-time field execution status"
        language={language}
      />

      <div className="kpi-grid">
        <KPI
          label="Production"
          value={Number(
            twin?.production ?? 254
          ).toFixed(1)}
          unit="bbl/d"
          status="LIVE"
          language={language}
        />

        <KPI
          label="CSS Status"
          value={
            twin?.css_status || "READY"
          }
          status="FIELD"
          language={language}
        />

        <KPI
          label="SRP Status"
          value={
            twin?.srp_status || "RUNNING"
          }
          status="FIELD"
          language={language}
        />

        <KPI
          label="Equipment Risk"
          value={Number(
            twin?.equipment_risk ?? 27
          ).toFixed(1)}
          unit="%"
          status="MONITOR"
          language={language}
        />
      </div>

      <Panel
        title="Field Map"
        language={language}
      >
        <FieldMap />
      </Panel>
    </>
  );
}

/* =========================================================
   WELL OPERATIONS
========================================================= */

function WellOperations({
  twin,
  language,
}) {
  return (
    <>
      <PageHeader
        title="Well Operations"
        subtitle="BW-05 operational state"
        language={language}
      />

      <Panel
        title="Well Status"
        language={language}
      >
        <div className="state-grid">
          <div className="state-row">
            <span>Well</span>
            <strong>BW-05</strong>
          </div>

          <div className="state-row">
            <span>Field</span>
            <strong>Baghewala</strong>
          </div>

          <div className="state-row">
            <span>CSS</span>
            <strong>
              {twin?.css_status ||
                "READY"}
            </strong>
          </div>

          <div className="state-row">
            <span>SRP</span>
            <strong>
              {twin?.srp_status ||
                "RUNNING"}
            </strong>
          </div>

          <div className="state-row">
            <span>Phase</span>
            <strong>
              {twin?.phase ||
                "Monitoring"}
            </strong>
          </div>

          <div className="state-row">
            <span>Plan</span>
            <strong>
              {twin?.plan_status ||
                "No pending plan"}
            </strong>
          </div>
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   WORK ORDERS
========================================================= */

function WorkOrders({
  language,
}) {
  const orders = [
    [
      "WO-001",
      "Inspect SRP drive",
      "HIGH",
    ],
    [
      "WO-002",
      "Verify steam injection",
      "MEDIUM",
    ],
    [
      "WO-003",
      "Check wellhead pressure",
      "LOW",
    ],
  ];

  return (
    <>
      <PageHeader
        title="Work Orders"
        subtitle="Field execution tasks"
        language={language}
      />

      <Panel
        title="Active Work Orders"
        language={language}
      >
        <div className="alerts-list">
          {orders.map((item) => (
            <div
              className={`alert-card ${
                item[2] === "HIGH"
                  ? "high"
                  : item[2] === "MEDIUM"
                  ? "medium"
                  : "low"
              }`}
              key={item[0]}
            >
              <div className="alert-level">
                {item[2]}
              </div>

              <div>
                <strong>
                  {item[0]}
                </strong>

                <div
                  style={{
                    marginTop: "5px",
                  }}
                >
                  {item[1]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   ALERTS
========================================================= */

function Alerts({
  twin,
  language,
}) {
  const risk =
    Number(
      twin?.equipment_risk ?? 27
    );

  return (
    <>
      <PageHeader
        title="Alerts"
        subtitle="Operational notifications"
        language={language}
      />

      <div className="alerts-list">
        <div className="alert-card low">
          <div className="alert-level">
            NORMAL
          </div>

          CSS thermal response is within
          expected operating range.
        </div>

        <div className="alert-card medium">
          <div className="alert-level">
            MONITOR
          </div>

          Equipment risk currently at{" "}
          {risk.toFixed(1)}%.
        </div>

        <div className="alert-card low">
          <div className="alert-level">
            INFO
          </div>

          Digital Twin synchronization
          is active for BW-05.
        </div>
      </div>
    </>
  );
}

/* =========================================================
   AI COMMAND CENTER
========================================================= */

function AICommandCenter({
  language,
  aiStatus,
}) {
  return (
    <>
      <PageHeader
        title="AI Command Center"
        subtitle="AI-assisted well optimization"
        language={language}
      />

      <Panel
        title="AI Decision Pipeline"
        language={language}
      >
        <div className="ai-flow">
          <div className="ai-box">
            <div className="ai-icon">
              ◉
            </div>
            TELEMETRY
          </div>

          <div className="flow-arrow">
            →
          </div>

          <div className="ai-box">
            <div className="ai-icon">
              ◈
            </div>
            PREDICTION
          </div>

          <div className="flow-arrow">
            →
          </div>

          <div className="ai-box">
            <div className="ai-icon">
              ◆
            </div>
            OPTIMIZATION
          </div>

          <div className="flow-arrow">
            →
          </div>

          <div className="ai-box">
            <div className="ai-icon">
              ✓
            </div>
            DECISION
          </div>
        </div>
      </Panel>

      <div className="ai-status-grid">
        <div>
          <span>MODEL</span>
          <strong>
            {aiStatus?.model ||
              "Random Forest Ensemble"}
          </strong>
        </div>

        <div>
          <span>STATUS</span>
          <strong className="text-green">
            {aiStatus?.status ||
              "ACTIVE"}
          </strong>
        </div>

        <div>
          <span>DATA MODE</span>
          <strong>
            Synthetic Telemetry
          </strong>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   PREDICTION
========================================================= */

function PredictionEngine({
  twin,
  language,
}) {
  return (
    <>
      <PageHeader
        title="Prediction Engine"
        subtitle="AI production and risk prediction"
        language={language}
      />

      <div className="prediction-grid">
        <MetricBox
          label="Predicted Production"
          value={Number(
            twin?.production ?? 254
          ).toFixed(1)}
          unit="bbl/d"
          language={language}
        />

        <MetricBox
          label="Predicted Energy"
          value={Number(
            twin?.energy ?? 82
          ).toFixed(1)}
          unit="index"
          language={language}
        />

        <MetricBox
          label="Equipment Risk"
          value={Number(
            twin?.equipment_risk ?? 27
          ).toFixed(1)}
          unit="%"
          language={language}
        />

        <MetricBox
          label="Oil Viscosity"
          value={Number(
            twin?.viscosity ?? 630
          ).toFixed(0)}
          unit="cP"
          language={language}
        />
      </div>

      <Panel
        title="AI Confidence"
        language={language}
      >
        <ResponseBars
          items={[
            ["Production Prediction", 89],
            ["Risk Prediction", 84],
            ["Viscosity Prediction", 81],
            ["Energy Prediction", 87],
          ]}
        />
      </Panel>
    </>
  );
}

/* =========================================================
   WHAT IF
========================================================= */

function WhatIfSimulator({
  language,
  onSimulate,
  result,
}) {
  const [steam, setSteam] =
    useState(540);

  const [pressure, setPressure] =
    useState(20);

  const [soak, setSoak] =
    useState(28);

  const [spm, setSpm] =
    useState(8);

  return (
    <>
      <PageHeader
        title="What-If Simulator"
        subtitle="Test operating scenarios before execution"
        language={language}
      />

      <div className="whatif-layout">
        <Panel
          title="Scenario Inputs"
          language={language}
        >
          <Slider
            label="Steam Volume"
            value={steam}
            min={400}
            max={700}
            step={10}
            unit="m³"
            onChange={setSteam}
          />

          <Slider
            label="Pressure"
            value={pressure}
            min={14}
            max={24}
            step={1}
            unit="bar"
            onChange={setPressure}
          />

          <Slider
            label="Soak Time"
            value={soak}
            min={18}
            max={36}
            step={1}
            unit="hr"
            onChange={setSoak}
          />

          <Slider
            label="SPM"
            value={spm}
            min={5}
            max={10}
            step={1}
            unit="SPM"
            onChange={setSpm}
          />

          <Button
            onClick={() =>
              onSimulate({
                temperature: 70,
                pressure,
                steam_volume: steam,
                soak_time: soak,
                spm,
                stroke_length: 2.6,
              })
            }
          >
            RUN SIMULATION
          </Button>
        </Panel>

        <Panel
          title="Simulation Results"
          language={language}
        >
          <div className="result-highlight">
            <span>
              {t(
                language,
                "Predicted Production"
              )}
            </span>

            <strong>
              {result?.production ??
                "--"}
            </strong>

            <small>
              bbl/d
            </small>
          </div>

          <div className="response-bars">
            <ResponseItem
              label="Energy"
              value={
                result?.energy ?? "--"
              }
              percent={70}
            />

            <ResponseItem
              label="Equipment Risk"
              value={
                result?.risk ?? "--"
              }
              percent={
                Math.min(
                  100,
                  Number(
                    result?.risk ?? 27
                  )
                )
              }
            />

            <ResponseItem
              label="Viscosity"
              value={
                result?.viscosity ?? "--"
              }
              percent={58}
            />
          </div>
        </Panel>
      </div>
    </>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}) {
  return (
    <div className="slider-box">
      <div className="slider-head">
        <span>{label}</span>

        <strong>
          {value} {unit}
        </strong>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) =>
          onChange(
            Number(e.target.value)
          )
        }
      />

      <div className="slider-scale">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function ResponseItem({
  label,
  value,
  percent,
}) {
  return (
    <div>
      <div className="response-head">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <div className="bar-track">
        <div
          className="bar-fill"
          style={{
            width: `${Math.max(
              3,
              Math.min(100, percent)
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

function ResponseBars({ items }) {
  return (
    <div className="response-bars">
      {items.map((item) => (
        <ResponseItem
          key={item[0]}
          label={item[0]}
          value={`${item[1]}%`}
          percent={item[1]}
        />
      ))}
    </div>
  );
}

/* =========================================================
   AI OPTIMIZATION
========================================================= */

function AIOptimization({
  language,
  onCreatePlan,
  twin,
}) {
  return (
    <>
      <PageHeader
        title="AI Optimization"
        subtitle="Recommended operating strategy"
        language={language}
      />

      <Panel
        title="Recommended Plan"
        language={language}
      >
        <div className="state-grid">
          <div className="state-row">
            <span>Well</span>
            <strong>BW-05</strong>
          </div>

          <div className="state-row">
            <span>Steam</span>
            <strong>600 m³</strong>
          </div>

          <div className="state-row">
            <span>Soak</span>
            <strong>30 hr</strong>
          </div>

          <div className="state-row">
            <span>SPM</span>
            <strong>8</strong>
          </div>

          <div className="state-row">
            <span>Stroke</span>
            <strong>2.6 m</strong>
          </div>

          <div className="state-row">
            <span>Expected Production</span>
            <strong>
              {Number(
                twin?.production ?? 254
              ).toFixed(1)}{" "}
              bbl/d
            </strong>
          </div>
        </div>

        <div className="button-row">
          <Button
            onClick={() =>
              onCreatePlan({
                steam_volume: 600,
                soak_time: 30,
                spm: 8,
                stroke_length: 2.6,
              })
            }
          >
            CREATE OPERATING PLAN
          </Button>
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   MODEL PERFORMANCE
========================================================= */

function ModelPerformance({
  language,
}) {
  return (
    <>
      <PageHeader
        title="Model Performance"
        subtitle="AI model monitoring"
        language={language}
      />

      <div className="ai-status-grid">
        <div>
          <span>PRODUCTION MODEL</span>
          <strong>ACTIVE</strong>
        </div>

        <div>
          <span>ENERGY MODEL</span>
          <strong>ACTIVE</strong>
        </div>

        <div>
          <span>RISK MODEL</span>
          <strong>ACTIVE</strong>
        </div>

        <div>
          <span>VISCOSITY MODEL</span>
          <strong>ACTIVE</strong>
        </div>

        <div>
          <span>MODEL TYPE</span>
          <strong>Random Forest</strong>
        </div>

        <div>
          <span>DATA MODE</span>
          <strong>Synthetic</strong>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   PRODUCTION
========================================================= */

function ProductionMonitor({
  twin,
  language,
}) {
  const values = [
    205,
    219,
    231,
    240,
    247,
    254,
    251,
    259,
    263,
    Number(
      twin?.production ?? 254
    ),
  ];

  return (
    <>
      <PageHeader
        title="Production Monitor"
        subtitle="Well production response"
        language={language}
      />

      <div className="kpi-grid">
        <KPI
          label="Production"
          value={Number(
            twin?.production ?? 254
          ).toFixed(1)}
          unit="bbl/d"
          status="LIVE"
          language={language}
        />

        <KPI
          label="Energy"
          value={Number(
            twin?.energy ?? 82
          ).toFixed(1)}
          unit="index"
          status="MONITORING"
          language={language}
        />

        <KPI
          label="Equipment Risk"
          value={Number(
            twin?.equipment_risk ?? 27
          ).toFixed(1)}
          unit="%"
          status="NORMAL"
          language={language}
        />

        <KPI
          label="Viscosity"
          value={Number(
            twin?.viscosity ?? 630
          ).toFixed(0)}
          unit="cP"
          status="ESTIMATED"
          language={language}
        />
      </div>

      <Panel
        title="Production Trend"
        language={language}
      >
        <div className="chart">
          {values.map((value, index) => {
            const height =
              Math.max(
                10,
                ((value - 180) /
                  100) *
                  100
              );

            return (
              <div
                className="chart-column"
                key={index}
              >
                <div
                  className="chart-bar"
                  style={{
                    height: `${height}%`,
                  }}
                />

                <small>
                  T{index + 1}
                </small>
              </div>
            );
          })}
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   PRODUCTION OPTIMIZATION
========================================================= */

function ProductionOptimization({
  twin,
  language,
}) {
  return (
    <>
      <PageHeader
        title="Production Optimization"
        subtitle="Well-to-surface production strategy"
        language={language}
      />

      <Panel
        title="Production Drivers"
        language={language}
      >
        <ResponseBars
          items={[
            ["Thermal Effect", 82],
            ["Pump Efficiency", 74],
            ["Oil Mobility", 68],
            ["Energy Efficiency", 71],
            ["Equipment Reliability", 79],
          ]}
        />
      </Panel>

      <Panel
        title="Current Production State"
        language={language}
      >
        <div className="state-grid">
          <div className="state-row">
            <span>Production</span>
            <strong>
              {Number(
                twin?.production ?? 254
              ).toFixed(1)}{" "}
              bbl/d
            </strong>
          </div>

          <div className="state-row">
            <span>Temperature</span>
            <strong>
              {twin?.temperature ?? 70} °C
            </strong>
          </div>

          <div className="state-row">
            <span>SPM</span>
            <strong>
              {twin?.spm ?? 8}
            </strong>
          </div>

          <div className="state-row">
            <span>Stroke</span>
            <strong>
              {twin?.stroke_length ?? 2.6} m
            </strong>
          </div>
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   APPROVALS
========================================================= */

function Approvals({
  plans,
  language,
  onApprove,
}) {
  return (
    <>
      <PageHeader
        title="Plan Approvals"
        subtitle="Operations management approval queue"
        language={language}
      />

      <Panel
        title="Operating Plans"
        language={language}
      >
        {!plans?.length ? (
          <div className="empty-state">
            No operating plans pending approval.
          </div>
        ) : (
          <div className="approval-list">
            {plans.map((plan, index) => (
              <div
                className="approval-card"
                key={
                  plan.id || index
                }
              >
                <div>
                  <span>PLAN</span>
                  <strong>
                    {plan.id ||
                      `PLAN-${index + 1}`}
                  </strong>
                </div>

                <div>
                  <span>STEAM</span>
                  <strong>
                    {plan.steam_volume ??
                      "--"}{" "}
                    m³
                  </strong>
                </div>

                <div>
                  <span>SOAK</span>
                  <strong>
                    {plan.soak_time ??
                      "--"}{" "}
                    hr
                  </strong>
                </div>

                <div>
                  <span>STATUS</span>
                  <strong>
                    {plan.status ||
                      "PENDING"}
                  </strong>
                </div>

                <Button
                  onClick={() =>
                    onApprove(
                      plan.id
                    )
                  }
                >
                  APPROVE
                </Button>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}

/* =========================================================
   DECISION CENTER
========================================================= */

function DecisionCenter({
  twin,
  plans,
  language,
}) {
  return (
    <>
      <PageHeader
        title="Decision Center"
        subtitle="Integrated operational decision support"
        language={language}
      />

      <div className="kpi-grid">
        <KPI
          label="Production"
          value={Number(
            twin?.production ?? 254
          ).toFixed(1)}
          unit="bbl/d"
          status="CURRENT"
          language={language}
        />

        <KPI
          label="Risk"
          value={Number(
            twin?.equipment_risk ?? 27
          ).toFixed(1)}
          unit="%"
          status="MONITOR"
          language={language}
        />

        <KPI
          label="Pending Plans"
          value={plans?.length ?? 0}
          status="APPROVAL"
          language={language}
        />

        <KPI
          label="Well"
          value="BW-05"
          status="ACTIVE"
          language={language}
        />
      </div>

      <Panel
        title="Decision Chain"
        language={language}
      >
        <div className="workflow">
          <div className="workflow-step">
            <div className="workflow-number">
              01
            </div>
            ENGINEERING
          </div>

          <div className="workflow-arrow">
            →
          </div>

          <div className="workflow-step">
            <div className="workflow-number">
              02
            </div>
            AI
          </div>

          <div className="workflow-arrow">
            →
          </div>

          <div className="workflow-step">
            <div className="workflow-number">
              03
            </div>
            MANAGER
          </div>

          <div className="workflow-arrow">
            →
          </div>

          <div className="workflow-step">
            <div className="workflow-number">
              04
            </div>
            FIELD
          </div>

          <div className="workflow-arrow">
            →
          </div>

          <div className="workflow-step">
            <div className="workflow-number">
              05
            </div>
            PRODUCTION
          </div>
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   ADMIN
========================================================= */

function AdminDashboard({
  language,
}) {
  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Platform administration"
        language={language}
      />

      <div className="kpi-grid">
        <KPI
          label="Users"
          value="6"
          status="ACTIVE"
          language={language}
        />

        <KPI
          label="API"
          value="ONLINE"
          status="CONNECTED"
          language={language}
        />

        <KPI
          label="Digital Twin"
          value="ONLINE"
          status="ACTIVE"
          language={language}
        />

        <KPI
          label="Data Mode"
          value="SYNTHETIC"
          status="PROTOTYPE"
          language={language}
        />
      </div>
    </>
  );
}

function UsersRoles({
  language,
}) {
  return (
    <>
      <PageHeader
        title="Users & Roles"
        subtitle="Platform access control"
        language={language}
      />

      <div className="roles-grid">
        {ROLES.map((role, index) => (
          <div
            className="role-card"
            key={role}
          >
            <div className="role-avatar">
              {index + 1}
            </div>

            <div>
              <strong>{role}</strong>

              <small>
                ROLE ACCESS ACTIVE
              </small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Configuration({
  language,
}) {
  return (
    <>
      <PageHeader
        title="System Configuration"
        subtitle="Digital Twin configuration"
        language={language}
      />

      <Panel
        title="System Parameters"
        language={language}
      >
        <div className="state-grid">
          <div className="state-row">
            <span>Well</span>
            <strong>BW-05</strong>
          </div>

          <div className="state-row">
            <span>Field</span>
            <strong>Baghewala</strong>
          </div>

          <div className="state-row">
            <span>Backend</span>
            <strong>FastAPI</strong>
          </div>

          <div className="state-row">
            <span>Frontend</span>
            <strong>React</strong>
          </div>

          <div className="state-row">
            <span>AI Engine</span>
            <strong>ACTIVE</strong>
          </div>

          <div className="state-row">
            <span>Data Source</span>
            <strong>SYNTHETIC</strong>
          </div>
        </div>
      </Panel>
    </>
  );
}

function DataManagement({
  language,
}) {
  return (
    <>
      <PageHeader
        title="Data Management"
        subtitle="Digital Twin data services"
        language={language}
      />

      <Panel
        title="Data Sources"
        language={language}
      >
        <div className="state-grid">
          <div className="state-row">
            <span>Well telemetry</span>
            <strong>CONNECTED</strong>
          </div>

          <div className="state-row">
            <span>Reservoir data</span>
            <strong>AVAILABLE</strong>
          </div>

          <div className="state-row">
            <span>Production data</span>
            <strong>AVAILABLE</strong>
          </div>

          <div className="state-row">
            <span>AI training data</span>
            <strong>LOADED</strong>
          </div>
        </div>
      </Panel>
    </>
  );
}

function SystemHealth({
  language,
}) {
  return (
    <>
      <PageHeader
        title="System Health"
        subtitle="Platform service monitoring"
        language={language}
      />

      <div className="ai-status-grid">
        <div>
          <span>FASTAPI</span>
          <strong className="text-green">
            ONLINE
          </strong>
        </div>

        <div>
          <span>REACT</span>
          <strong className="text-green">
            ONLINE
          </strong>
        </div>

        <div>
          <span>AI ENGINE</span>
          <strong className="text-green">
            ACTIVE
          </strong>
        </div>

        <div>
          <span>DIGITAL TWIN</span>
          <strong className="text-green">
            SYNCHRONIZED
          </strong>
        </div>

        <div>
          <span>API LATENCY</span>
          <strong>
            LOW
          </strong>
        </div>

        <div>
          <span>DATA MODE</span>
          <strong>
            SYNTHETIC
          </strong>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   AUDIT LOG
========================================================= */

function AuditLog({
  events,
  language,
}) {
  return (
    <>
      <PageHeader
        title="Audit Log"
        subtitle="System activity history"
        language={language}
      />

      <Panel
        title="Recent Activity"
        language={language}
      >
        {!events?.length ? (
          <div className="empty-state">
            No audit events available.
          </div>
        ) : (
          <div className="audit-table">
            <div className="audit-header">
              <div>TIME</div>
              <div>USER</div>
              <div>ACTION</div>
              <div>STATUS</div>
            </div>

            {events.map(
              (event, index) => (
                <div
                  className="audit-row"
                  key={index}
                >
                  <div>
                    {event.time ||
                      event.timestamp ||
                      "--"}
                  </div>

                  <div>
                    {event.username ||
                      event.user ||
                      "--"}
                  </div>

                  <div>
                    {safeText(
                      event.action ||
                        event.event ||
                        "--"
                    )}
                  </div>

                  <div>
                    {event.status ||
                      "OK"}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </Panel>
    </>
  );
}

/* =========================================================
   REPORTS
========================================================= */

function Reports({
  language,
  title = "Reports",
}) {
  return (
    <>
      <PageHeader
        title={title}
        subtitle="Digital Twin analytical reporting"
        language={language}
      />

      <div className="kpi-grid">
        <KPI
          label="Production"
          value="254"
          unit="bbl/d"
          status="CURRENT"
          language={language}
        />

        <KPI
          label="Energy"
          value="82"
          unit="index"
          status="CURRENT"
          language={language}
        />

        <KPI
          label="Risk"
          value="27"
          unit="%"
          status="NORMAL"
          language={language}
        />

        <KPI
          label="Viscosity"
          value="630"
          unit="cP"
          status="ESTIMATED"
          language={language}
        />
      </div>

      <Panel
        title="Production Trend"
        language={language}
      >
        <div className="chart">
          {[62, 68, 73, 79, 82, 88, 84, 91].map(
            (height, index) => (
              <div
                className="chart-column"
                key={index}
              >
                <div
                  className="chart-bar"
                  style={{
                    height: `${height}%`,
                  }}
                />

                <small>
                  D{index + 1}
                </small>
              </div>
            )
          )}
        </div>
      </Panel>
    </>
  );
}


/* =========================================================
   3D FIELD / RESERVOIR / CSS VIEWS
========================================================= */

function ThreeDStyles(){return <style>{`
.d3{display:grid;gap:14px}.d3k{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.d3k>div,.d3p{background:#0b1824;border:1px solid #203849;border-radius:12px;padding:12px}.d3k small{display:block;color:#7891a2;font-size:10px}.d3k strong{display:block;font-size:21px;margin-top:4px;color:#e5f4fb}.d3scene{position:relative;height:500px;overflow:hidden;border:1px solid #203849;border-radius:16px;background:#0a1722;perspective:1000px}.d3ground{position:absolute;inset:22% -8% -20%;background:linear-gradient(135deg,#55473c,#302b2b 55%,#513928);transform:rotateX(58deg);transform-origin:top center}.d3grid{position:absolute;inset:27% 4% 0;background-image:linear-gradient(#aebdb51a 1px,transparent 1px),linear-gradient(90deg,#aebdb51a 1px,transparent 1px);background-size:45px 45px;transform:rotateX(58deg);transform-origin:top center}.d3surface{position:absolute;left:0;right:0;top:21%;height:18px;background:#65786c;border-bottom:2px solid #aeb8ad;z-index:5}.d3road{position:absolute;left:-5%;top:55%;width:110%;height:13px;background:#20272a;transform:rotate(-8deg);z-index:2}.d3plant{position:absolute;left:5%;top:8%;width:125px;padding:10px;background:#102b38;border:1px solid #3d7181;border-radius:10px;color:#bceff5;font-size:10px;z-index:10}.d3well{position:absolute;transform:translate(-50%,-50%);width:65px;height:72px;border:0;background:none;color:#dcebf0;cursor:pointer;z-index:12}.d3head{position:absolute;left:21px;top:25px;width:25px;height:18px;background:linear-gradient(90deg,#52666e,#d4e1e5,#52666e);border-radius:4px}.d3beam{position:absolute;left:4px;top:8px;width:48px;height:6px;background:#aebdc2;border-radius:6px;transform-origin:80% 50%;transition:transform .35s}.d3wheel{position:absolute;left:38px;top:0;width:18px;height:18px;border:3px solid #748991;border-radius:50%}.d3rod{position:absolute;left:47px;top:14px;width:3px;height:40px;background:#d9e5e8;transition:transform .35s}.d3status{position:absolute;top:44px;left:52px;font-size:8px;white-space:nowrap}.d3label{position:absolute;top:56px;left:5px;font-size:9px;white-space:nowrap}.d3well.sel .d3head{box-shadow:0 0 0 3px #55d6e855,0 0 20px #55d6e888}.d3heat{position:absolute;left:52%;top:62%;width:300px;height:170px;transform:translate(-50%,-50%) rotateX(60deg);border-radius:50%;background:radial-gradient(ellipse,#e9834d99,#d4573f44 40%,transparent 72%);border:1px dashed #ed9c7080;z-index:4;transition:width .4s,height .4s}.d3info{display:grid;grid-template-columns:1.2fr 1fr;gap:12px}.d3row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #193040;font-size:12px}.d3row span{color:#7891a2}.d3bar{height:7px;background:#172a37;border-radius:8px;overflow:hidden;margin:5px 0 10px}.d3bar i{display:block;height:100%;background:#55d6e8;transition:width .4s}.d3controls label{display:flex;justify-content:space-between;color:#7891a2;font-size:11px;margin-top:10px}.d3controls input{width:100%;accent-color:#55d6e8}.d3actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.d3actions button{border:1px solid #294354;background:#0c1c28;color:#dcebf0;border-radius:8px;padding:10px 12px;cursor:pointer}.d3actions .primary{border-color:#55d6e8;background:#103b48}.d3reservoir{position:absolute;left:50%;top:52%;width:440px;height:250px;transform:translate(-50%,-50%) rotateX(58deg);transform-style:preserve-3d}.d3layer{position:absolute;inset:0;border-radius:50%;border:1px solid #86624e;background:#503a2e;box-shadow:0 28px 0 #3e3029,0 56px 0 #5b3e2a}.d3heat2{position:absolute;left:50%;top:58%;width:260px;height:140px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(ellipse,#ef8c55aa,#d6533d44,transparent 72%);transition:width .4s,height .4s}.d3well2{position:absolute;left:50%;top:5%;height:90%;width:11px;background:linear-gradient(90deg,#526a73,#d9e4e8,#526a73);transform:rotateX(-58deg);z-index:5}.d3oil{position:absolute;width:10px;height:10px;border-radius:50%;background:#e0a044;box-shadow:0 0 7px #c77c2b;transition:transform .5s}.d3steam{position:absolute;width:8px;height:8px;border-radius:50%;background:#c8f5ff;box-shadow:0 0 8px #8cecff;transition:transform .5s}.d3pump{position:absolute;right:8%;top:12%;width:110px;height:80px;z-index:8}.d3pump .d3beam{width:95px;height:8px;top:18px}.d3pump .d3wheel{left:64px;top:53px;width:26px;height:26px}.d3tower{position:absolute;left:68px;top:28px;width:6px;height:48px;background:#73868e;transform:rotate(15deg)}
@media(max-width:850px){.d3k{grid-template-columns:1fr 1fr}.d3info{grid-template-columns:1fr}.d3scene{height:440px}}
`}</style>}

function Field3DStatus({twin,language}){
 const [selected,setSelected]=useState("BW-05"),[tick,setTick]=useState(0);
 useEffect(()=>{const id=setInterval(()=>setTick(v=>v+1),900);return()=>clearInterval(id)},[]);
 const base=Number(twin?.production??254.7),temp=Number(twin?.temperature??70),pressure=Number(twin?.pressure??20),risk=Number(twin?.equipment_risk??27);
 const wells=[['BW-01',12,28,'NORMAL',.82],['BW-02',29,18,'NORMAL',.91],['BW-03',49,29,'CSS',.76],['BW-05',62,48,'PRODUCING',1],['BW-07',80,31,'WARNING',.69],['BW-08',25,69,'NORMAL',.88],['BW-11',51,78,'CSS',.72],['BW-14',80,70,'ALERT',.54]];
 const statusColor=s=>s==='ALERT'?'#ff5d67':s==='WARNING'?'#f6c453':s==='CSS'?'#55d6e8':'#55e39a';
 const sw=wells.find(w=>w[0]===selected)||wells[3];
 return <><PageHeader title="Live Field Status" subtitle="3D field operations and simulated telemetry" language={language}/><ThreeDStyles/><div className="d3"><div className="d3k"><div><small>ACTIVE WELLS</small><strong>18</strong></div><div><small>CSS CYCLES</small><strong>7</strong></div><div><small>SRP RUNNING</small><strong>15</strong></div><div><small>FIELD PRODUCTION</small><strong>{Math.round(base*6.8)} bpd</strong></div></div><div className="d3scene"><div className="d3ground"/><div className="d3grid"/><div className="d3surface"/><div className="d3road"/><div className="d3plant"><b>STEAM FACILITY</b><br/>CSS supply · {twin?.steam_volume??540} m³</div><div className="d3heat"/>{wells.map((w,i)=><button type="button" key={w[0]} className={`d3well ${selected===w[0]?'sel':''}`} style={{left:`${w[1]}%`,top:`${w[2]}%`}} onClick={()=>setSelected(w[0])}><span className="d3beam" style={{transform:`rotate(${Math.sin((tick+i)*.7)*8}deg)`}}/><span className="d3wheel"/><span className="d3head"/><span className="d3rod" style={{transform:`translateY(${Math.sin((tick+i)*.7)*6}px)`}}/><span className="d3status" style={{color:statusColor(w[3])}}>● {w[3]}</span><span className="d3label">{w[0]}</span></button>)}<div className="d3p" style={{position:'absolute',left:14,bottom:14,zIndex:20,fontSize:10}}>🟢 Normal &nbsp; 🔵 CSS &nbsp; 🟡 Warning &nbsp; 🔴 Alert</div></div><div className="d3info"><div className="d3p"><h3 style={{marginTop:0}}>{sw[0]} · Selected Well</h3><div className="d3row"><span>Status</span><strong style={{color:statusColor(sw[3])}}>● {sw[3]}</strong></div><div className="d3row"><span>Temperature</span><strong>{(temp+(sw[0]==='BW-05'?21.8:8)).toFixed(1)} °C</strong></div><div className="d3row"><span>Pressure</span><strong>{(pressure+(sw[0]==='BW-05'?1.4:.6)).toFixed(1)} bar</strong></div><div className="d3row"><span>Production</span><strong>{Math.round(base*sw[4])} bpd</strong></div><div className="d3row"><span>Equipment Risk</span><strong>{Math.round(risk+(sw[3]==='ALERT'?20:sw[3]==='WARNING'?9:0))}%</strong></div></div><div className="d3p"><h3 style={{marginTop:0}}>Live Telemetry</h3>{[['Temperature',78],['Pressure',72],['SRP Load',55+risk],['Production',Math.min(100,base/3)]].map(x=><div key={x[0]}><div className="d3row"><span>{x[0]}</span><strong>{Math.round(x[1])}{x[0]==='Production'?' bpd':'%'}</strong></div><div className="d3bar"><i style={{width:`${Math.min(100,x[1])}%`}}/></div></div>)}</div></div><div className="d3p"><h3 style={{marginTop:0}}>Field Alerts</h3><div className="d3row"><span>BW-07</span><strong style={{color:'#f6c453'}}>SRP load increasing</strong></div><div className="d3row"><span>BW-11</span><strong style={{color:'#55d6e8'}}>CSS soak period active</strong></div><div className="d3row"><span>BW-14</span><strong style={{color:'#ff5d67'}}>Pressure deviation detected</strong></div></div></div></>;
}

function ReservoirTwin3D({twin,language}){
 const [steam,setSteam]=useState(Number(twin?.steam_volume??540)),[soak,setSoak]=useState(Number(twin?.soak_time??28)),[tick,setTick]=useState(0);
 useEffect(()=>{const id=setInterval(()=>setTick(v=>v+1),800);return()=>clearInterval(id)},[]);
 const temp=70+(steam-400)*.035+(soak-18)*.22,visc=Math.max(390,630-(temp-70)*5.2),prod=220+(temp-70)*1.15+(Number(twin?.spm??8)-5)*7,scale=.8+(steam-400)/800+(soak-18)/100;
 return <><PageHeader title="Reservoir Twin" subtitle="3D thermal reservoir and oil mobility model" language={language}/><ThreeDStyles/><div className="d3info"><div className="d3scene"><div className="d3surface"/><div className="d3reservoir"><div className="d3layer"/><div className="d3heat2" style={{width:260*scale,height:140*scale}}/><div className="d3well2"/>{[0,1,2,3,4,5].map(i=><span key={'s'+i} className="d3steam" style={{left:`${48+i%2*3}%`,top:`${25+i*8}%`,transform:`translateY(${(tick*20+i*18)%150}px)`}}/>)}{[0,1,2,3,4,5].map(i=><span key={'o'+i} className="d3oil" style={{left:`${25+i*8}%`,top:`${55+(i%3)*9}%`,transform:`translate(${((tick+i)%5)*12}px,${Math.sin((tick+i)*.8)*8}px)`}}/>)}</div><div className="d3plant">STEAM INJECTION<br/>{steam} m³</div><div className="d3pump"><span className="d3beam" style={{transform:`rotate(${Math.sin(tick)*8}deg)`}}/><span className="d3tower"/><span className="d3wheel"/></div><div className="d3p" style={{position:'absolute',left:14,bottom:14,zIndex:20,fontSize:10}}>STEAM → HEAT FRONT → OIL MOBILITY → SRP</div></div><div className="d3p d3controls"><h3 style={{marginTop:0}}>Reservoir State</h3><div className="d3row"><span>Temperature</span><strong>{temp.toFixed(1)} °C</strong></div><div className="d3row"><span>Viscosity</span><strong>{Math.round(visc)} cP</strong></div><div className="d3row"><span>Pressure</span><strong>{Number(twin?.pressure??20).toFixed(1)} bar</strong></div><div className="d3row"><span>Production</span><strong>{Math.round(prod)} bpd</strong></div><label><span>Steam Volume</span><b>{steam} m³</b></label><input type="range" min="400" max="700" step="10" value={steam} onChange={e=>setSteam(Number(e.target.value))}/><label><span>Soak Time</span><b>{soak} hr</b></label><input type="range" min="18" max="36" value={soak} onChange={e=>setSoak(Number(e.target.value))}/></div></div></>;
}

function CSSDesign3D({twin,language,onStart,onStop,onSoak}){
 const [steam,setSteam]=useState(Number(twin?.steam_volume??540)),[soak,setSoak]=useState(Number(twin?.soak_time??28)),[pressure,setPressure]=useState(Number(twin?.pressure??20)),[phase,setPhase]=useState(0);
 useEffect(()=>{const id=setInterval(()=>setPhase(v=>(v+1)%3),2200);return()=>clearInterval(id)},[]);
 const temp=70+(steam-400)*.035+(soak-18)*.22,visc=Math.max(390,630-(temp-70)*5.2),prod=220+(temp-70)*1.15+(pressure-14)*1.4,labels=['STEAM INJECTION','SOAK PERIOD','OIL PRODUCTION'];
 return <><PageHeader title="CSS Design" subtitle="3D cyclic steam design and cycle planning" language={language}/><ThreeDStyles/><div className="d3info"><div className="d3scene"><div className="d3surface"/><div className="d3ground"/><div className="d3heat" style={{width:220+(steam-400)*.45,height:135+(soak-18)*2.5}}/><div className="d3plant">STEAM UNIT<br/>{steam} m³ cycle</div><div className="d3well" style={{left:'44%',top:'55%'}}><span className="d3head"/></div><div className="d3well" style={{left:'68%',top:'55%'}}><span className="d3head"/></div><div className="d3pump" style={{right:'7%',top:'12%'}}><span className="d3beam" style={{transform:`rotate(${Math.sin(phase)*8}deg)`}}/><span className="d3tower"/><span className="d3wheel"/></div>{[0,1,2,3,4].map(i=><span key={'s'+i} className="d3steam" style={{left:`${43+(i%2)*3}%`,top:`${38+((i+phase)*8)%35}%`}}/>)}{[0,1,2,3,4,5].map(i=><span key={'o'+i} className="d3oil" style={{left:`${48+((i+phase)*4)%20}%`,top:`${63+(i%3)*6}%`}}/>)}<div className="d3p" style={{position:'absolute',left:'40%',top:'44%',zIndex:20,fontSize:10}}>{labels[phase]}</div></div><div className="d3p d3controls"><h3 style={{marginTop:0}}>CSS Cycle Parameters</h3><label><span>Steam Volume</span><b>{steam} m³</b></label><input type="range" min="400" max="700" step="10" value={steam} onChange={e=>setSteam(Number(e.target.value))}/><label><span>Soak Time</span><b>{soak} hr</b></label><input type="range" min="18" max="36" value={soak} onChange={e=>setSoak(Number(e.target.value))}/><label><span>Pressure</span><b>{pressure} bar</b></label><input type="range" min="14" max="24" value={pressure} onChange={e=>setPressure(Number(e.target.value))}/><div className="d3row"><span>Temperature</span><strong>{temp.toFixed(1)} °C</strong></div><div className="d3row"><span>Viscosity</span><strong>{Math.round(visc)} cP</strong></div><div className="d3row"><span>Predicted Production</span><strong>{Math.round(prod)} bpd</strong></div><div className="d3actions"><button className="primary" onClick={onStart}>{t(language,'Start CSS')}</button><button onClick={onSoak}>START SOAK</button><button onClick={onStop}>STOP CSS</button></div></div></div></>;
}


/* =========================================================
   MAIN PAGE ROUTER
========================================================= */

function PageRouter({
  page,
  user,
  language,
  twin,
  aiStatus,
  plans,
  events,
  actions,
}) {
  switch (page) {
    case "command":
      return (
        <CommandCenter
          twin={twin}
          language={language}
          user={user}
        />
      );

    case "reservoir":
      return (
        <ReservoirTwin3D
          twin={twin}
          language={language}
        />
      );

    case "reservoir-analysis":
      return (
        <ReservoirAnalysis
          twin={twin}
          language={language}
        />
      );

    case "css-design":
      return (
        <CSSDesign3D
          twin={twin}
          language={language}
          onStart={actions.startCSS}
          onStop={actions.stopCSS}
          onSoak={actions.soakCSS}
        />
      );

    case "css":
      return (
        <CSSDesign3D
          twin={twin}
          language={language}
          onStart={actions.startCSS}
          onStop={actions.stopCSS}
          onSoak={actions.soakCSS}
        />
      );

    case "srp":
      return (
        <SRPOperations
          twin={twin}
          language={language}
          onStart={actions.startSRP}
          onUpdate={actions.updateSRP}
        />
      );

    case "field":
      return (
        <Field3DStatus
          twin={twin}
          language={language}
        />
      );

    case "well-operations":
      return (
        <WellOperations
          twin={twin}
          language={language}
        />
      );

    case "work-orders":
      return (
        <WorkOrders
          language={language}
        />
      );

    case "alerts":
      return (
        <Alerts
          twin={twin}
          language={language}
        />
      );

    case "ai":
      return (
        <AICommandCenter
          language={language}
          aiStatus={aiStatus}
        />
      );

    case "prediction":
      return (
        <PredictionEngine
          twin={twin}
          language={language}
        />
      );

    case "whatif":
      return (
        <WhatIfSimulator
          language={language}
          onSimulate={actions.simulate}
          result={actions.simulationResult}
        />
      );

    case "optimization":
      return (
        <AIOptimization
          language={language}
          onCreatePlan={
            actions.createPlan
          }
          twin={twin}
        />
      );

    case "model-performance":
      return (
        <ModelPerformance
          language={language}
        />
      );

    case "production":
      return (
        <ProductionMonitor
          twin={twin}
          language={language}
        />
      );

    case "production-optimization":
      return (
        <ProductionOptimization
          twin={twin}
          language={language}
        />
      );

    case "approvals":
      return (
        <Approvals
          plans={plans}
          language={language}
          onApprove={actions.approvePlan}
        />
      );

    case "operations":
      return (
        <CommandCenter
          twin={twin}
          language={language}
          user={user}
        />
      );

    case "decision":
      return (
        <DecisionCenter
          twin={twin}
          plans={plans}
          language={language}
        />
      );

    case "admin":
      return (
        <AdminDashboard
          language={language}
        />
      );

    case "users":
      return (
        <UsersRoles
          language={language}
        />
      );

    case "configuration":
      return (
        <Configuration
          language={language}
        />
      );

    case "data":
      return (
        <DataManagement
          language={language}
        />
      );

    case "system":
      return (
        <SystemHealth
          language={language}
        />
      );

    case "audit":
      return (
        <AuditLog
          events={events}
          language={language}
        />
      );

    case "reports":
      return (
        <Reports
          language={language}
          title={
            user?.role ===
            "Production Engineer"
              ? "Production Reports"
              : user?.role ===
                "Operations Manager"
              ? "Management Reports"
              : "Reservoir Reports"
          }
        />
      );

    case "ai-reports":
      return (
        <Reports
          language={language}
          title="AI Reports"
        />
      );

    default:
      return (
        <CommandCenter
          twin={twin}
          language={language}
          user={user}
        />
      );
  }
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [language, setLanguage] =
    useState(getInitialLanguage);

  const [screen, setScreen] =
    useState("landing");

  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(
      localStorage.getItem(
        "baghewala_token"
      )
    );

  const [page, setPage] =
    useState("command");

  const [twin, setTwin] =
    useState(null);

  const [aiStatus, setAiStatus] =
    useState(null);

  const [plans, setPlans] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [simulationResult, setSimulationResult] =
    useState(null);

  /* =====================================================
     RESTORE SESSION
  ===================================================== */

  useEffect(() => {
    if (!token) return;

    restoreSession();
  }, [token]);

  async function restoreSession() {
    try {
      const me = await apiRequest(
        "/api/auth/me",
        {},
        token
      );

      const restoredUser =
        me?.user || me;

      setUser(restoredUser);
      setScreen("app");

      const rolePages =
        ROLE_PAGES[
          restoredUser?.role
        ] ||
        ROLE_PAGES[
          "Reservoir Engineer"
        ];

      setPage(
        rolePages[0]?.id ||
          "command"
      );

      await loadDashboard(token);
    } catch {
      localStorage.removeItem(
        "baghewala_token"
      );

      setToken(null);
      setUser(null);
      setScreen("landing");
    }
  }

  /* =====================================================
     DASHBOARD DATA
  ===================================================== */

  async function loadDashboard(
    authToken = token
  ) {
    try {
      const [
        twinData,
        aiData,
        plansData,
        auditData,
      ] = await Promise.all([
        apiRequest(
          "/api/twin/status",
          {},
          authToken
        ).catch(() => null),

        apiRequest(
          "/api/ai/status",
          {},
          authToken
        ).catch(() => null),

        apiRequest(
          "/api/plans",
          {},
          authToken
        ).catch(() => []),

        apiRequest(
          "/api/audit",
          {},
          authToken
        ).catch(() => []),
      ]);

      if (twinData) {
        setTwin(
          twinData?.twin ||
            twinData
        );
      }

      if (aiData) {
        setAiStatus(
          aiData?.ai ||
            aiData
        );
      }

      setPlans(
        Array.isArray(
          plansData
        )
          ? plansData
          : plansData?.plans ||
            []
      );

      setEvents(
        Array.isArray(
          auditData
        )
          ? auditData
          : auditData?.events ||
            auditData?.audit ||
            []
      );
    } catch (err) {
      setError(
        safeText(err.message)
      );
    }
  }

  /* =====================================================
     LOGIN
  ===================================================== */

  async function handleLogin({
    username,
    password,
    role,
  }) {
    setLoading(true);
    setError("");

    try {
      const result =
        await apiRequest(
          "/api/auth/login",
          {
            method: "POST",
            body: JSON.stringify({
              username,
              password,
              role,
            }),
          }
        );

      const newToken =
        result?.token ||
        result?.access_token ||
        result?.session_token;

      const loggedUser =
        result?.user || {
          username,
          role,
        };

      if (!newToken) {
        throw new Error(
          "Login succeeded but no session token was returned by the backend."
        );
      }

      localStorage.setItem(
        "baghewala_token",
        newToken
      );

      setToken(newToken);
      setUser(loggedUser);
      setScreen("app");

      const rolePages =
        ROLE_PAGES[role] ||
        ROLE_PAGES[
          "Reservoir Engineer"
        ];

      setPage(
        rolePages[0]?.id ||
          "command"
      );

      await loadDashboard(
        newToken
      );
    } catch (err) {
      setError(
        safeText(
          err?.message ||
            "Invalid username or password"
        )
      );
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     LOGOUT
  ===================================================== */

  async function logout() {
    try {
      if (token) {
        await apiRequest(
          "/api/auth/logout",
          {
            method: "POST",
          },
          token
        );
      }
    } catch {
      // Local logout continues even if backend logout fails.
    }

    localStorage.removeItem(
      "baghewala_token"
    );

    setToken(null);
    setUser(null);
    setTwin(null);
    setAiStatus(null);
    setPlans([]);
    setEvents([]);
    setPage("command");
    setScreen("landing");
  }

  /* =====================================================
     CSS
  ===================================================== */

  async function startCSS() {
    try {
      setError("");

      const result =
        await apiRequest(
          "/api/twin/css/start",
          {
            method: "POST",
          },
          token
        );

      setTwin(
        result?.twin ||
          result
      );

      await loadDashboard();
    } catch (err) {
      setError(
        safeText(err.message)
      );
    }
  }

  async function stopCSS() {
    try {
      setError("");

      const result =
        await apiRequest(
          "/api/twin/css/stop",
          {
            method: "POST",
          },
          token
        );

      setTwin(
        result?.twin ||
          result
      );

      await loadDashboard();
    } catch (err) {
      setError(
        safeText(err.message)
      );
    }
  }

  async function soakCSS() {
    try {
      setError("");

      const result =
        await apiRequest(
          "/api/twin/css/soak",
          {
            method: "POST",
          },
          token
        );

      setTwin(
        result?.twin ||
          result
      );

      await loadDashboard();
    } catch (err) {
      setError(
        safeText(err.message)
      );
    }
  }

  /* =====================================================
     SRP
  ===================================================== */

  async function startSRP() {
    try {
      setError("");

      const result =
        await apiRequest(
          "/api/twin/srp/start",
          {
            method: "POST",
          },
          token
        );

      setTwin(
        result?.twin ||
          result
      );

      await loadDashboard();
    } catch (err) {
      setError(
        safeText(err.message)
      );
    }
  }

  async function updateSRP(
    spm,
    stroke
  ) {
    try {
      setError("");

      const result =
        await apiRequest(
          "/api/twin/srp/update",
          {
            method: "POST",
            body: JSON.stringify({
              spm,
              stroke_length:
                stroke,
            }),
          },
          token
        );

      setTwin(
        result?.twin ||
          result
      );

      await loadDashboard();
    } catch (err) {
      setError(
        safeText(err.message)
      );
    }
  }

  /* =====================================================
     AI SIMULATION
  ===================================================== */

  async function simulate(
    parameters
  ) {
    try {
      setError("");

      const result =
        await apiRequest(
          "/api/ai/simulate",
          {
            method: "POST",
            body: JSON.stringify(
              parameters
            ),
          },
          token
        );

      setSimulationResult(
        result?.result ||
          result
      );
    } catch (err) {
      setError(
        safeText(err.message)
      );
    }
  }

  /* =====================================================
     PLAN
  ===================================================== */

  async function createPlan(
    plan
  ) {
    try {
      setError("");

      await apiRequest(
        "/api/plans",
        {
          method: "POST",
          body: JSON.stringify({
            well: "BW-05",
            ...plan,
          }),
        },
        token
      );

      await loadDashboard();

      alert(
        "Operating plan created successfully."
      );
    } catch (err) {
      setError(
        safeText(err.message)
      );
    }
  }

  async function approvePlan(
    planId
  ) {
    try {
      setError("");

      await apiRequest(
        "/api/plans/approve",
        {
          method: "POST",
          body: JSON.stringify({
            plan_id: planId,
          }),
        },
        token
      );

      await loadDashboard();

      alert(
        "Operating plan approved."
      );
    } catch (err) {
      setError(
        safeText(err.message)
      );
    }
  }

  async function executePlan(
    planId
  ) {
    try {
      setError("");

      await apiRequest(
        "/api/plans/execute",
        {
          method: "POST",
          body: JSON.stringify({
            plan_id: planId,
          }),
        },
        token
      );

      await loadDashboard();

      alert(
        "Operating plan executed."
      );
    } catch (err) {
      setError(
        safeText(err.message)
      );
    }
  }

  /* =====================================================
     DEFAULT PAGE
  ===================================================== */

  const availablePages = useMemo(() => {
    return (
      ROLE_PAGES[
        user?.role
      ] ||
      ROLE_PAGES[
        "Reservoir Engineer"
      ]
    );
  }, [user]);

  /* =====================================================
     RENDER LANDING
  ===================================================== */

  if (screen === "landing") {
    return (
      <LandingPage
        onEnter={() =>
          setScreen("login")
        }
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  /* =====================================================
     RENDER LOGIN
  ===================================================== */

  if (screen === "login") {
    return (
      <AuthPage
        onLogin={handleLogin}
        language={language}
        setLanguage={setLanguage}
        loading={loading}
        error={error}
      />
    );
  }

  /* =====================================================
     RENDER APP
  ===================================================== */

  return (
    <div className="app-shell">
      <Sidebar
        user={user}
        page={page}
        setPage={setPage}
        language={language}
        onLogout={logout}
      />

      <main className="main-content">
        <Topbar
          user={user}
          language={language}
          setLanguage={setLanguage}
          twin={twin}
        />

        {error && (
          <div className="global-error">
            <span>
              {safeText(error)}
            </span>

            <button
              onClick={() =>
                setError("")
              }
            >
              ×
            </button>
          </div>
        )}

        <div className="page-container">
          <PageRouter
            page={page}
            user={user}
            language={language}
            twin={twin}
            aiStatus={aiStatus}
            plans={plans}
            events={events}
            actions={{
              startCSS,
              stopCSS,
              soakCSS,
              startSRP,
              updateSRP,
              simulate,
              simulationResult,
              createPlan,
              approvePlan,
              executePlan,
            }}
          />
        </div>
      </main>
    </div>
  );
}