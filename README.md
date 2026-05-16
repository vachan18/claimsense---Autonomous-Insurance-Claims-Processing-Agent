# claimsense---Autonomous-Insurance-Claims-Processing-Agent
# ClaimSense v4 — Autonomous FNOL Intelligence Platform

## LIVE DEPLOYMENT LINK - https://claimsense.netlify.app/

A single-file, zero-install, browser-based AI platform for processing First Notice of Loss (FNOL) insurance claims. Open the HTML file, configure your API key, and start processing claims in seconds.

---

## What's New in v4

| Feature | Detail |
|---|---|
| 🌗 **Light / Dark theme** | Toggle in sidebar — preference saved across sessions |
| 💾 **Persistent history** | Claims survive page refresh via localStorage (up to 200 claims) |
| ✏️ **Inline field editing** | Click any extracted field value to correct it — updates JSON & confidence live |
| ⚠️ **Fraud Risk Meter** | Visual 0–100 score combining keywords, route, confidence, and missing fields |
| 🔍 **Claim comparison** | Select any two history entries → side-by-side diff with highlighted differences |
| 🖨️ **Print / PDF export** | Print-optimised stylesheet produces a clean one-pager per claim |
| ⌨️ **Keyboard shortcuts** | `Ctrl+Enter` run · `Ctrl+L` sample · `Ctrl+K` clear · `Ctrl+P` print |
| 🤖 **Multi-provider AI** | Anthropic, OpenAI, Groq, Google Gemini — all configurable from Settings page |

---

## Getting Started

### 1. Open the file
Open `claimsense-v4.html` in Chrome, Firefox, Edge, or Safari. No server, no install.

### 2. Configure your API key
Click **API Settings** in the sidebar. Select your provider, paste your key, click **Save Settings**.

### 3. Process a claim
Go to **Process FNOL** → paste claim text or upload `.txt` / `.pdf` → click **Run Agent** (or `Ctrl+Enter`).

---

## Supported AI Providers

| Provider | Default Model | Key Format | Get Key |
|---|---|---|---|
| **Anthropic** | `claude-sonnet-4-20250514` | `sk-ant-…` | [console.anthropic.com](https://console.anthropic.com) |
| **OpenAI** | `gpt-4o` | `sk-…` | [platform.openai.com](https://platform.openai.com) |
| **Groq** | `llama-3.3-70b-versatile` | `gsk_…` | [console.groq.com](https://console.groq.com) |
| **Google Gemini** | `gemini-1.5-flash` | `AIza…` | [aistudio.google.com](https://aistudio.google.com) |

You can override the model in the **Model Override** field (e.g. `gpt-4o-mini`, `gemini-2.0-flash`, `llama-3.1-8b-instant`).

> API keys are stored in `sessionStorage` (cleared when tab closes) and never logged or sent anywhere except the chosen provider's API.

---

## Features in Depth

### Process FNOL
- Paste raw text or upload `.txt` / `.pdf` files (PDF text extracted via PDF.js)
- Extracts all 16 mandatory FNOL fields with per-field confidence scores (0–100%)
- **Click any field value** to edit it inline — corrections update the JSON output and confidence score instantly
- Automatic routing with full reasoning text
- Copy JSON · Export JSON · Print claim (formatted one-pager)

### Fraud Risk Meter
A composite 0–100 score computed from:
- **Keyword hits** in description/reasoning: fraud, staged, inconsistent, fabricated, suspicious, duplicate, exaggerated, collusion, etc. (+15 per hit)
- **Route bonus**: Investigation Flag adds +35
- **Confidence penalty**: overall confidence < 50% adds +20
- **Missing fields**: more than 4 missing adds +10

| Score | Label |
|---|---|
| 0–29 | 🟢 Low Risk — Appears Legitimate |
| 30–59 | 🟡 Medium Risk — Review Carefully |
| 60–100 | 🔴 High Risk — Flag for Investigation |

### Claims History
- **Persistent across sessions** — up to 200 claims stored in `localStorage`
- Fraud risk score shown per card in the list
- **Compare any two claims**: check two entries → click Compare → side-by-side diff with highlighted differing fields
- Export all history as JSON or CSV

### Batch Processing
- Upload multiple `.txt` files at once
- Sequential processing with live status (Queued → Processing → Done / Error)
- All results saved to history automatically
- Export batch results as JSON or CSV

### Analytics Dashboard
- Route distribution donut chart
- Claims by policyholder bar chart
- Damage estimate distribution (bucketed)
- Missing field frequency bar chart
- KPIs: Total Claims · Total Damage · Average Confidence

### Keyboard Shortcuts
| Shortcut | Action |
|---|---|
| `Ctrl + Enter` | Run agent on current input |
| `Ctrl + L` | Load next sample FNOL |
| `Ctrl + K` | Clear textarea |
| `Ctrl + P` | Print current claim result |

### Print / PDF Export
A dedicated `@media print` stylesheet hides all navigation, sidebar, and UI chrome, rendering only the claim result in a clean black-and-white format. Use your browser's **Save as PDF** option to create a portable document.

### Light / Dark Theme
Click the sun/moon icon in the sidebar logo area. Preference is saved to `localStorage` and restored on next open.

---

## The 16 Mandatory FNOL Fields

| Category | Fields |
|---|---|
| **Policy** | Policy Number, Policyholder Name, Effective Dates |
| **Incident** | Incident Date, Incident Time, Incident Location, Incident Description |
| **Parties** | Claimant Name, Third Parties, Contact Details |
| **Asset & Financial** | Asset Type, Asset ID, Estimated Damage, Claim Type, Attachments, Initial Estimate |

---

## Routing Rules (Priority Order)

1. **Investigation Flag** — Description contains: fraud, staged, inconsistent, fabricated
2. **Specialist Queue** — Claim Type is "Injury"
3. **Manual Review** — Any mandatory field is missing
4. **Fast-track** — Estimated damage < ₹25,000 and all fields present
5. **Manual Review** — All other cases

---

## Customisation

### Change the system prompt
Find `const SYS = \`...\`` in the `<script>` section. Modify routing rules, add fields, or adjust confidence logic. The model is instructed to return raw JSON matching a specific schema.

### Change default models
In the `PROVIDERS` object, edit the `defaultModel` value for any provider.

### Add a new AI provider
1. Add an entry to `PROVIDERS` with `name`, `defaultModel`, `placeholder`, `hint`, `validate`
2. Add a `provider-card` div in the Settings page HTML
3. Add a case in `callAgent()` implementing the provider's API call

### Change fraud keywords
Edit the `FRAUD_KEYWORDS` array at the top of the script section.

### Adjust fraud score weights
In `computeFraudScore()`, change the `+15`, `+35`, `+20`, `+10` values to tune sensitivity.

---

## Data Storage

| Data | Storage | Cleared when |
|---|---|---|
| API key | `sessionStorage` | Tab / browser closes |
| Provider selection | `sessionStorage` | Tab / browser closes |
| Claims history | `localStorage` | User clicks "Clear All" or calls `localStorage.clear()` |
| Theme preference | `localStorage` | User switches theme again |

All data stays in the browser. Nothing is sent to any server except the AI provider API calls.

---

## Browser Requirements

Works in any browser supporting ES2020+ and the Fetch API. Tested in Chrome 120+, Firefox 121+, Edge 120+, Safari 17+. An internet connection is required on first load for Google Fonts and PDF.js (loaded from cdnjs).

---

## File Structure

Everything lives in a single `.html` file (~2500 lines):

```
claimsense-v4.html
├── <style>
│   ├── CSS variables (dark + light theme)          ← v4: light theme added
│   ├── Sidebar, nav, buttons, panels
│   ├── Result, loading animation, fields grid
│   ├── Fraud meter styles                          ← v4: new
│   ├── Inline edit styles                          ← v4: new
│   ├── Compare modal styles                        ← v4: new
│   ├── Print stylesheet (@media print)             ← v4: new
│   ├── Analytics, history, batch, rules
│   └── Settings page
├── <body>
│   ├── #splash          Boot animation
│   ├── .sidebar         Nav + theme toggle + status  ← v4: theme toggle
│   └── .main
│       ├── #page-process    Single claim + fraud meter + inline edit
│       ├── #page-batch      Batch processing
│       ├── #page-analytics  Charts & KPIs
│       ├── #page-history    Persistent history + compare  ← v4: updated
│       ├── #page-rules      Routing rules reference
│       ├── #page-settings   API key & provider config
│       ├── #compare-modal   Side-by-side diff modal  ← v4: new
│       └── .kbd-hint        Keyboard shortcut bar    ← v4: new
└── <script>
    ├── PROVIDERS           Multi-provider config
    ├── Theme               toggleTheme()
    ├── Persistent history  saveHistory() / loadHistory()    ← v4: new
    ├── Fraud meter         computeFraudScore() / renderFraudMeter()  ← v4: new
    ├── Inline edit         makeFieldEditable()              ← v4: new
    ├── Compare             toggleCompare() / openCompare()  ← v4: new
    ├── Print               printClaim()                     ← v4: new
    ├── Keyboard shortcuts  document.addEventListener keydown  ← v4: new
    ├── Settings            selectProvider() / saveSettings()
    ├── Agent               runAgent() / callAgent() (multi-provider)
    ├── Batch               runBatch() / renderBatchQueue()
    ├── History             renderHistory() + compareSelected state
    └── Analytics           renderAnalytics()
```

---

## Version History

| Version | Key Additions |
|---|---|
| v1 | Core FNOL extraction, Anthropic only |
| v2 | Batch processing, analytics dashboard, history |
| v3 | Multi-provider AI (OpenAI, Groq, Gemini), API Settings page, Save button |
| **v4** | Light/dark theme, persistent history, inline editing, fraud risk meter, claim comparison, print export, keyboard shortcuts |
