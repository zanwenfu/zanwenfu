<h1 align="center">Zanwen (Ryan) Fu</h1>

<p align="center">
  <b>ML Engineer · Founder</b><br/>
  Building agentic systems — from reasoning loops to production backends.<br/>
</p>

<p align="center">
  <a href="https://zanwenfu.com"><img alt="Website" src="https://img.shields.io/badge/zanwenfu.com-8A2BE2"></a>
  <a href="https://www.linkedin.com/in/zanwenfu"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-@zanwenfu-0A66C2?logo=linkedin&logoColor=white"></a>
  <a href="mailto:zanwen.fu@duke.edu"><img alt="Email" src="https://img.shields.io/badge/Email-zanwen.fu%40duke.edu-EA4335"></a>
</p>

---

Incoming MLE at **Robinhood** (Agentic AI) · M.S. CS (AI/ML) at **Duke** · B.Comp. CS at **NUS**

Currently interested in: agent harness, context engineering, long-running agent evaluation

---

### What I've shipped

**[VYNN AI](https://github.com/Agentic-Analyst)** — Agentic financial analyst platform (sole engineer, ~500 users, 50K+ LOC)

LangGraph supervisor orchestrates 5 specialized agents for end-to-end equity research: data scraping → DCF modeling (6 sector strategies) → news intelligence → report generation — all in under 7 minutes. The hard part wasn't the LLM calls; it was making the numbers trustworthy. The recommendation engine uses a 3-layer architecture: deterministic math (`RecommendationCalculator`) → LLM narrative → regex-based validator that blocks publication if citation coverage drops below 95%. Built a custom 1,293-line Excel formula evaluator so the DCF workbook and downstream JSON stay perfectly consistent without requiring Excel. Nightly CI runs a golden-dataset regression suite across 100 QQQ companies and blocks deployment if valuations drift beyond threshold.

→ [`stock-analyst`](https://github.com/Agentic-Analyst/stock-analyst) (agent backend)

---

**[AutoCodeRover](https://github.com/zanwenfu/auto-code-rover)** — Autonomous code repair agent · *Core technology [acquired by Sonar](https://www.sonarsource.com/company/press-releases/sonar-acquires-autocoderover-to-supercharge-developers-with-ai-agents/)*

Designed the **Self-Fix Agent**: when a patch fails to apply, an LLM-as-a-Judge diagnoses which pipeline stage (Context Retrieval or Patch Generation) caused the failure, generates corrective feedback, and replays from that stage — preserving upstream state via UUID-targeted responses. Also built a **stateful replay mechanism** so developers can inject feedback on any intermediate LLM response and trigger selective re-execution downstream. Result: **51.6% on SWE-bench Verified** (up from 38.4%), 1.8× patch precision over next-best open-source agent.

→ [`auto-code-rover`](https://github.com/zanwenfu/auto-code-rover) (agent backend) · [`Jetbrains-IDE-Plugin`](https://github.com/zanwenfu/Jetbrains-IDE-Plugin) (Kotlin, end-to-end)

---

**[ACR JetBrains Plugin](https://github.com/zanwenfu/Jetbrains-IDE-Plugin)** — IDE-integrated autonomous repair

Built end-to-end in Kotlin. Three things I'm most proud of: (1) **GumTree 3-way AST merge** — when you've edited code while the agent is patching the same file remotely, the plugin reconciles baseline → your edits → agent's patch at the AST level, not text level. (2) **PSI-based context enrichment** — before sending a task to ACR, the plugin extracts symbol references, cursor history (last 10 positions), and open files to narrow the agent's search scope. (3) **Embedded SonarLint** — runs static analysis locally, then lets you one-click send any issue to ACR for autonomous fixing.

---

**[LUMINA](https://github.com/zanwenfu/Agentic-AI-for-Systematic-Reviews)** — Multi-agent citation screening for medical systematic reviews (first author)

Four-agent pipeline: classifier triage → PICOS-guided Chain-of-Thought screening → LLM-as-a-Judge reviewer → self-correction agent. Evaluated across 15 SRMAs (~150K citations from BMJ, JAMA, Lancet). **98.2% sensitivity** (10 of 15 at perfect 100%) with 35× fewer missed studies vs. prior baselines, at $0.007/article.

---

<sub>Last updated: Mar 2026</sub>
