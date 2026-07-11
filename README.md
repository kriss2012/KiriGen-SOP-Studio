# Team SOP Generator: Technical Documentation & User Guide

Turn messy process notes — including raw Loom transcripts, chaotic Slack threads, voice memo brain-dumps, and stream-of-consciousness rambling — into clean, highly structured operating documents your team can actually execute. This tool transforms unorganized institutional knowledge into production-ready SOPs, onboarding guides, high-density checklists, or QA frameworks.

This application is built as a single, self-contained, zero-dependency web page. There is no server architecture, no installation process, and no build step. It operates entirely client-side, calling the Anthropic API directly from the user's browser using a "Bring Your Own Key" (BYOK) model.

---

## 🚀 Quick Start Guide

Follow these steps to deploy and start running the generator locally on your machine:

1. **Extract the Package:** Unzip the downloaded project folder to a directory of your choice.
2. **Launch the Interface:** Double-click `index.html` or drag the file directly into any modern web browser (*Google Chrome, Apple Safari, Mozilla Firefox, or Microsoft Edge*).
3. **Configure Authentication:**
   * Click on the **⚙ API Settings** gear icon in the interface.
   * Paste your active Anthropic API key into the input field.
   * *Missing a key?* You can provision one instantly at the [Anthropic Developer Console](https://anthropic.com).
   * **Optional Security Preference:** Toggle the *"Remember key on this device"* checkbox to persist your key across browser sessions. This utilizes the browser's native `localStorage` API. The key is isolated to your local origin and is never transmitted to any third-party infrastructure.
4. **Select Document Framework:** Choose one of the four core output types (*SOP, Onboarding Doc, Checklist, or QA System*) depending on your targeted end-user.
5. **Ingest Raw Material:**
   * Paste your raw, unedited transcripts, notes, or messages into the **"Raw material"** text area.
   * Alternatively, use the **"Attach a .txt/.md file"** interface to upload text-based files directly from your file system.
6. **Inject Process Context (Highly Recommended):** 
   * Fill out the **Process Name** (e.g., *Monthly Payroll Reconciliation*).
   * Define **Who runs the process** (e.g., *Junior Accountant / HR Lead*). 
   * Providing these specific parameters forces the underlying LLM to ground its output, mitigating generic text generation and ensuring accurate operational syntax.
7. **Execute:** Click the **Generate document** button.

---

## 🔄 Document Workspace & Post-Generation Actions

Once execution completes, your finalized asset renders in the right-hand preview pane. It is styled natively to resemble a physical, real-world operational document—complete with automated document-control headers, version metadata slots, and strictly ordered sequential steps.

From the preview pane, you can leverage several native productivity actions:

* **Copy Markdown:** Copies the raw, unrendered Markdown string straight to your clipboard. This is optimized for immediate pasting into team knowledge bases like **Notion, Google Docs, Confluence, Slite, or Obsidian**.
* **Download `.md`:** Generates and downloads a physical Markdown file directly to your local download directory for offline source-control storage.
* **Print / Export PDF:** Triggers your browser's native print engine. The CSS includes specific `@media print` stylesheets that strip away web UI elements (buttons, sidebars, settings), giving you a pristine, corporate-ready PDF printout.
* **Regenerate / Iterate:** Iteratively re-run the prompt against the same raw material. This is highly effective if you have modified the process name, targeted operator, or adjusted the targeted detail level.

> 💡 **Session Persistence Matrix:** Every document generated within an active browser session is stored in an in-memory tab strip running directly underneath the document viewer. You can safely flip back and forth between completely different generated SOPs without losing state or risk overriding your previous work. Refreshing the tab will clear this volatile session cache.

---

## 📊 Deep Dive: The Four Core Document Architectures

The system uses highly tailored, structural system prompts to shape raw inputs into four distinct operational shapes. You can further modify these shapes using the depth slider (**Concise**, **Standard**, or **Thorough**).

| Document Type | Core Objective | Primary Structural Components Included | Ideal Target Audience |
| :--- | :--- | :--- | :--- |
| **SOP (Standard Operating Procedure)** | Establishes a formal, repeatable organizational baseline for recurring operations. | Document Control Header, Purpose Statement, Required Tooling Stack, Chronological Numbered Steps, Definition of Done (DoD). | Experienced Operators, System Admins, Cross-trained Teammates. |
| **Onboarding Guide** | Bridges the gap between mechanical execution and organizational theory. | Contextual "Why" Statements, Conceptual Deep Dives, Common Pitfalls, Industry Glossary, Success Metrics. | New Hires, External Contractors, Interns. |
| **Checklist** | Maximizes scannability and mitigates human error during real-time execution. | Chronological Phases (Pre-flight, Execution, Post-flight), Interactive Checkboxes, High-density Fragments. | Field Operators, Live Deployment Engineers, Daily Sync Routines. |
| **QA System** | Constructs a defensive framework to audit, catch anomalies, and govern outputs. | Pass/Fail Criteria Checklist, Boundary Conditions, Escalation Matrix Paths, Mandatory Review Cadence. | Quality Assurance Teams, Managers, Peer Reviewers. |

---

## 🔑 Security Topology & API Management

Because this utility relies entirely on a client-side architecture, maintaining strict security boundaries is paramount.

* **Direct Transport Vector:** Your API key interacts solely with `https://anthropic.com`. It moves exclusively from your machine's browser sandbox to Anthropic's secure endpoints over an encrypted HTTPS layer.
* **No Database/Backend Middleware:** There is zero server logging, proxy tracking, or third-party collection telemetry implemented in this project.
* **Deployment Warnings:** 
  * ❌ **Do not host this file unmodified on a public, unauthenticated URL.** If an attacker scrapes the file and discovers an embedded key in the source code or local storage, your API account can be drained.
  * ❌ **Do not distribute modified versions of the file with your personal key hardcoded** into the script blocks.
  * 😎 **Internal Team Distribution:** To distribute this tool safely within your organization, share the raw source files via private repositories (e.g., GitHub, GitLab) or internal zip networks. Instruct every individual contributor to provision and input their own isolated Anthropic API key.

---

## 🛠️ Advanced Tweak Guide & Architectural Customization

Because the entire application architecture is consolidated into a singular `index.html` file, you can modify fonts, prompts, and models instantly using a standard code editor (such as VS Code or Cursor).

### 1. Changing the AI Engine (Model)
Locate the HTML element handling the API configurations and find the default model field. It defaults to Anthropic's flagship operational model:
```html
<!-- Locate this within your API settings form block -->
<input type="text" id="modelSelect" value="claude-3-5-sonnet-20241022">
```
*You can swap this configuration string out to target other Anthropic models, such as `claude-3-5-haiku-20241022` for ultra-fast, lower-cost processing cycles.*

### 2. Tuning Prompt Engineering Instructions
Scroll to the bottom of the file inside the primary `<script>` tag. You will find a global configuration object named `TYPE_INSTRUCTIONS`. This houses the system prompts for the generator:
```javascript
const TYPE_INSTRUCTIONS = {
    SOP: "You are an expert operations manager. Structural requirements: Create a rigorous, numbered standard operating procedure...",
    ONBOARDING: "You are an empathetic team mentor. Translate the following raw data into an onboarding guide that explains the core 'why'...",
    CHECKLIST: "Extract all actionable steps into micro-tasks grouped by phase...",
    QA: "Analyze the input text for critical failure points and build an inspection framework..."
};
```
*Feel free to append your own corporate formatting rules, specific structural constraints, or prohibited phrases directly into these template strings.*

### 3. Modifying Design Tokens (CSS Variables)
To update the aesthetic formatting or align the output engine with your official corporate brand identity, navigate to the top of the `<style>` block and alter the defined CSS Custom Properties:
```css
:root {
  --paper: #ffffff;     /* Document canvas color */
  --ink: #1e293b;       /* Primary structural typography */
  --blueprint: #2563eb; /* Highlighting, headers, accents */
  --stamp: #dc2626;     /* Alerts, critical status markers */
  --manila: #f8fafc;    /* Background control panel hue */
}
```

---

## ❓ Deep Troubleshooting Matrix

| Symptoms | Root Cause Analysis | Remediation Protocol |
| :--- | :--- | :--- |
| **"Add your Anthropic API key..." banner remains.** | The browser context cannot read an active key string from memory. | Click open the **⚙ API Settings** tab, ensure the key string is fully populated, and verify it begins with the official production signature `sk-ant-`. |
| **401 Unauthorized Response Error** | The provided API token is invalid, expired, revoked, or lacks adequate billing permissions. | Log into your Anthropic Developer Console. Verify your credit balance is positive, ensure the key hasn't been disabled, and re-copy the token string carefully. |
