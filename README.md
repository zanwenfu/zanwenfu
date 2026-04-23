<h1 align="center">Zanwen (Ryan) Fu</h1>

<p align="center">
  <b>ML Engineer · Founder</b><br/>
  <a href="https://zanwenfu.com"><b>zanwenfu.com</b></a>
</p>

<p align="center">
  <sub>
    <a href="https://www.linkedin.com/in/zanwenfu">LinkedIn</a> &nbsp;·&nbsp;
    <a href="mailto:zanwen.fu@duke.edu">zanwen.fu@duke.edu</a>
  </sub>
</p>

<p align="center">
  <sub>
    Incoming MLE @ <b>Robinhood</b> Central AI · May 2026<br/>
    MS Computer Science (AI/ML) @ <b>Duke</b> · BComp CS with Distinction @ <b>NUS</b>
  </sub>
</p>

---

I build agentic AI systems that survive production. The model is the easy part. The **harness** around it — memory, rollback, observability, the architecture between the LLM and the user — is where reliability actually lives.

Most of my work is one argument from three angles: **(1)** production reliability when agents serve real users, **(2)** recovery when an agent's first attempt is wrong, **(3)** infrastructure for agents themselves.

---

### Three projects

**[VYNN AI](https://github.com/Agentic-Analyst)** &nbsp;·&nbsp; _sole engineer · ~500 pilot users · [vynnai.com](https://vynnai.com)_

Institutional equity research end-to-end in under 7 minutes. LangGraph supervisor orchestrates 7 specialized agents; **the LLM never touches a number**. All financial math is deterministic Python; LLMs produce narrative that a regex validator blocks if citation coverage drops below 95%. A custom 1,293-line Excel formula evaluator keeps the DCF workbook and downstream JSON consistent without requiring Excel at runtime. Reproducibility validated empirically: CV 0.016–0.035 across 9 production runs, paraphrase stability 0.983.

→ [stock-analyst](https://github.com/Agentic-Analyst/stock-analyst) &nbsp;·&nbsp; [api-runner](https://github.com/Agentic-Analyst/api-runner) &nbsp;·&nbsp; [vynnai-web](https://github.com/Agentic-Analyst/vynnai-web) &nbsp;·&nbsp; [blog](https://zanwenfu.com/blog/vynnai_blog)

---

**[AutoCodeRover](https://github.com/zanwenfu/auto-code-rover)** &nbsp;·&nbsp; _[acquired by Sonar](https://www.sonarsource.com/company/press-releases/sonar-acquires-autocoderover-to-supercharge-developers-with-ai-agents/) · ISSTA 2024_

Autonomous code repair agent. I designed the **Self-Fix Agent** — when a patch fails, an LLM-as-a-Judge diagnoses which pipeline stage failed, generates corrective feedback, and replays from that stage while preserving upstream state via UUID-targeted responses. I also built the **JetBrains IDE plugin** end-to-end in Kotlin: GumTree 3-way AST merge, PSI-based context enrichment, embedded SonarLint 10.3.0. AutoCodeRover moved from **38.4% → 51.6% on SWE-bench Verified** during my contribution period; Sonar's [Foundation Agent](https://www.sonarsource.com/blog/introducing-sonar-foundation-agent/), built on the core, reached [**79.2% on Verified**](https://www.sonarsource.com/company/press-releases/sonar-claims-top-spot-on-swe-bench-leaderboard/) — top-ranked among autonomous remediation agents as of Feb 2026.

→ [auto-code-rover](https://github.com/zanwenfu/auto-code-rover) &nbsp;·&nbsp; [jetbrains-ide-plugin](https://github.com/zanwenfu/jetbrains-ide-plugin) &nbsp;·&nbsp; [blog](https://zanwenfu.com/blog/acr_blog)

---

**[taste](https://github.com/zanwenfu/taste-is-all-you-need)** &nbsp;·&nbsp; _Agent OS kernel · v0 shipped_

The implementation of the thesis in [Beyond the Harness](https://zanwenfu.com/blog/agent_harness_blog). Planner / Worker / Monitor split across three Claude tiers on git as the memory substrate: branches are execution contexts, commits are checkpoints, `git worktree` is process isolation, `git reset --hard` is rollback. Three demos shipped with committed transcripts and full cost telemetry — real-Claude run at **$0.0964 / 43s / 15-of-15 tests green**, parallel worktrees at **~60% wall-clock reduction**, hermetic rollback where a regression is caught by pytest and the session branch stays clean. 40 tests, CI-green, `pip install`-able.

→ [taste-is-all-you-need](https://github.com/zanwenfu/taste-is-all-you-need) &nbsp;·&nbsp; [design thesis](https://zanwenfu.com/blog/agent_harness_blog)

---

### Selected research

| | |
|---|---|
| **[LUMINA](https://github.com/zanwenfu/agentic-reviewers-for-SRMA)** | Four-agent citation screening for medical systematic reviews. **0.982 mean sensitivity / 0.018 FNR across 15 SRMAs** (~150K citations). On 4 held-out benchmark SRMAs from Tran et al. 2024 (*Ann Intern Med*), **perfect 1.000 sensitivity with 20–40pp specificity improvements** over their GPT-3.5 PICOS baseline. Sole first author. |
| **[architectural-damping](https://github.com/zanwenfu/architectural-damping)** | A deterministic downstream calculator absorbs **83% of LLM-layer prompt-injection successes** — and the exact figure (`ρ = 0.83`) is predictable *ex ante* from source code. **6/6 frozen attackability predictions held** on the pilot. Identifies *attack-surface rotation* as a failure mode distinct from Nasr et al. 2025's ASR recovery. System under study: VYNN AI (offline replica). |
| **[speculative-decoding-t4](https://github.com/zanwenfu/speculative-decoding-t4)** | Sequoia predicts 1.68× speedup on T4; I measured 0.56×. A four-term decomposition reconciles the 3× gap to **within 1.1% of measurement noise**. The natural A100 optimization (cross-iteration KV persistence) **measurably worsens** T4 — the fourth hidden assumption, surfaced by attempting the optimization. |
| **[football-llm-scaling](https://github.com/zanwenfu/football-llm-scaling)** | QLoRA appears to beat 5-shot ICL by 7pp on structured match prediction. Under a **coherence-required** metric (label + score + ground truth all agreeing), the advantage disappears: the parser was silently rescuing QLoRA outputs. General taxonomy for detecting parser-rescue on any multi-field benchmark. |

---

### What I've learned

**The harness is the bottleneck, not the model.** When agents fail in production, the infrastructure around the LLM broke — not the LLM itself. [taste](https://github.com/zanwenfu/taste-is-all-you-need) is my attempt at what that infrastructure should look like; [Beyond the Harness](https://zanwenfu.com/blog/agent_harness_blog) is the argument behind it.

**Context engineering is the real leverage.** Most agent failures I've debugged trace back to what the agent didn't know, not what it reasoned poorly about. The architectural-damping study extends this outward: even what lives *between* the LLM and the user is a context layer, and it can absorb LLM-layer compromise before it reaches anyone.

**"Usually right" isn't good enough.** VYNN's recommendation validator exists because LLMs fabricate financial numbers. ACR's GumTree merge exists because `git apply` fails when code has diverged. The speculative-decoding gap showed a cost model with "usually right" assumptions can predict 1.68× and deliver 0.56× on different hardware. Systems that run unsupervised have to hold on the edge cases, not just the common ones.

---

### Writing

- **[Beyond the Harness: An Operating System for AI Agents](https://zanwenfu.com/blog/agent_harness_blog)** — Git worktree as agent memory, CLI-first tool discovery, why everyone stops at the OS metaphor.
- **[From Research Agent to Acquired Product](https://zanwenfu.com/blog/acr_blog)** — AST-level patch merging, interactive feedback loops, the gap between benchmarks and developer UX.
- **[Building VYNN AI: 50K LOC, One Engineer](https://zanwenfu.com/blog/vynnai_blog)** — Semantic–symbolic separation, architectural mistakes, and what 500 real users teach you about agent reliability.

---

<p align="center">
  <sub>
    Open to full-time SWE / ML engineering roles starting 2027. If you're building something hard, I'd love to hear about it.<br/>
    <a href="mailto:zanwen.fu@duke.edu">zanwen.fu@duke.edu</a>
  </sub>
</p>

<sub><em>Last updated: April 2026</em></sub>
