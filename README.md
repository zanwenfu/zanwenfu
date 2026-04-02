<h1 align="center">Zanwen (Ryan) Fu</h1>

<p align="center">
  <b>ML Engineer · Founder</b><br/>
  I build agentic AI systems that actually work in the real world —<br/>reliable, observable, and designed to survive production, not just demos.<br/>
</p>

<p align="center">
  <a href="https://zanwenfu.com"><img alt="Website" src="https://img.shields.io/badge/Website-zanwenfu.com-8A2BE2"></a>
  <a href="https://www.linkedin.com/in/zanwenfu"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-@zanwenfu-0A66C2?logo=linkedin&logoColor=white"></a>
  <a href="mailto:zanwen.fu@duke.edu"><img alt="Email" src="https://img.shields.io/badge/Email-zanwen.fu%40duke.edu-EA4335"></a>
</p>

---

**[Incoming MLE @ Robinhood (Agentic Team)](https://www.linkedin.com/posts/zanwenfu_excited-to-share-that-ill-be-joining-robinhood-activity-7428261017333358592-0lWI?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADcUZ6YBXnSd0HpcjwuknOH59R5whQK73Xc)** · M.S. CS (AI/ML) at **Duke** · B.Comp. CS (Hons, Distinction) at **NUS**

The agent itself is the easy part. The harness that makes it work overnight, unsupervised, and recoverable when it fails is what actually matters. I wrote about this in **[Beyond the Harness: An Operating System for AI Agents](https://zanwenfu.com/blog/agent_harness_blog)** — mapping OS primitives onto multi-agent infrastructure: git worktree as memory, branches as execution contexts, CLI-first tool discovery, and a transparency dashboard that turns every agent decision into an auditable commit.

---

### What I've shipped

**[VYNN AI](https://github.com/Agentic-Analyst)** — Agentic financial analyst platform &nbsp;·&nbsp; sole engineer &nbsp;·&nbsp; ~500 users &nbsp;·&nbsp; 50K+ LOC

LangGraph supervisor orchestrates 5 specialized agents for end-to-end equity research: data scraping → DCF modeling (6 sector strategies) → news intelligence → report generation — all in under 7 minutes. The hard part wasn't the LLM calls; it was making the numbers trustworthy. **Strict semantic-symbolic separation**: the LLM never touches a number. All financial computation is deterministic Python; the LLM writes prose around immutable `FixedNumbers`. The recommendation engine uses a **3-layer trust architecture**: deterministic math (`RecommendationCalculator`) → LLM narrative with citation IDs → regex-based validator that blocks publication if coverage drops below 95%. Built a custom 1,293-line Excel formula evaluator so the DCF workbook and downstream JSON stay perfectly consistent without requiring Excel. Nightly CI runs a **golden-dataset regression suite** across 100 QQQ companies and blocks deployment if valuations drift beyond threshold.

Full technical retrospective: **[Building VYNN AI: 50,000 Lines of Code, One Engineer, and Everything I Learned](https://zanwenfu.com/blog/vynnai_blog)**

→ [`stock-analyst`](https://github.com/Agentic-Analyst/stock-analyst) (agent backend) · [`vynnai-web`](https://github.com/Agentic-Analyst/vynnai-web) (platform frontend) · [`api-runner`](https://github.com/Agentic-Analyst/api-runner) (API layer)

---

**[AutoCodeRover](https://github.com/zanwenfu/auto-code-rover)** — Autonomous code repair agent &nbsp;·&nbsp; core technology **[acquired by Sonar](https://www.sonarsource.com/company/press-releases/sonar-acquires-autocoderover-to-supercharge-developers-with-ai-agents/)**

Designed the **Self-Fix Agent**: when a patch fails, an LLM-as-a-Judge diagnoses which pipeline stage caused the failure, generates corrective feedback, and replays from that stage — preserving upstream state via UUID-targeted responses. Built a **stateful replay mechanism** so developers can inject feedback on any intermediate reasoning step and trigger selective re-execution downstream. Result: **51.6% on SWE-bench Verified** (up from 38.4%), 1.8× patch precision over next-best open-source agent. Sonar's [Foundation Agent](https://www.sonarsource.com/blog/introducing-sonar-foundation-agent/), built on the AutoCodeRover core, has since reached **79.2%** — **[#1 on the SWE-bench leaderboard](https://www.sonarsource.com/company/press-releases/sonar-claims-top-spot-on-swe-bench-leaderboard/)** (Feb 2026).

I also built the **[JetBrains IDE plugin](https://github.com/zanwenfu/jetbrains-ide-plugin)** end-to-end in Kotlin to bring ACR into the developer workflow: **GumTree 3-way AST merge** that reconciles your live edits with the agent's patch at the tree-node level (Git diffs lines; GumTree diffs AST nodes, so a renamed variable and an added null-check merge cleanly), **PSI-based context enrichment** that extracts symbol references, cursor history, and open files to narrow the agent's search scope before it starts, and **embedded SonarLint Core 10.3.0** for one-click static analysis → autonomous fix.

Full design process: **[From Research Agent to Acquired Product](https://zanwenfu.com/blog/acr_blog)**

→ [`auto-code-rover`](https://github.com/zanwenfu/auto-code-rover) (agent backend) · [`jetbrains-ide-plugin`](https://github.com/zanwenfu/jetbrains-ide-plugin) (Kotlin, end-to-end)

---

**[AutoEvolve](https://github.com/zanwenfu/parameter-golf/tree/main/autoevolve)** — Autonomous research agent for [OpenAI's Parameter Golf](https://openai.com/index/parameter-golf/)

Instead of hand-tuning training scripts for the 16MB model challenge, I built an autonomous research loop — inspired by [Karpathy's autoresearch](https://github.com/karpathy/autoresearch) — that treats GPU hours as a scarce resource and maintains structured scientific memory across experiments. The agent proposes targeted mutations to a single training script, runs bounded experiments on H100, classifies outcomes, and iterates.

The design decisions that matter: an **incumbent/frontier search model** where only measured improvements replace the current best, but near-misses can open short-lived exploratory branches with bounded follow-on budget. A **structured memory dossier** generated deterministically from git-committed experiment state — organized by proposal family, outcome classification, and timing telemetry — instead of dumping raw logs back into context. A **repeat-family guard** that blocks the agent from re-proposing failed approaches unless it provides a concrete mechanism for why this time is different. Two-stage research strategy: discover plausible ideas under a longer **1×H100 proxy** budget, promote only the strongest to real **8×H100 final validation**. Designed for unattended overnight runs with automatic rollback and per-experiment git commits.

<!-- TODO: Add results when available, e.g.: "Over N overnight iterations, the agent discovered [technique], reaching X.XX val_bpb — [competitive context]." -->

→ [`autoevolve`](https://github.com/zanwenfu/parameter-golf/tree/main/autoevolve)

---

**[LUMINA](https://github.com/zanwenfu/Agentic-AI-for-Systematic-Reviews)** — Multi-agent citation screening for medical systematic reviews &nbsp;·&nbsp; first author

Four-agent pipeline that mirrors the human peer-review process: classifier triage → PICOS-guided Chain-of-Thought screening → LLM-as-a-Judge reviewer → self-correction agent that re-screens when the reviewer and screener disagree. Evaluated across 15 SRMAs (~150K citations from BMJ, JAMA, Lancet). **98.2% sensitivity** (10 of 15 at perfect 100%) with **35× fewer missed studies** vs. prior baselines, at <$0.01/article.

---

### What I think about

- **The harness is the bottleneck, not the model.** VYNN's regression suite, ACR's eval loop, and AutoEvolve's memory dossier taught me the same lesson: catching agent failures and learning from them matters more than improving the agent itself. I wrote about what a real agent infrastructure layer should look like — borrowing from OS design — in [Beyond the Harness](https://zanwenfu.com/blog/agent_harness_blog).

- **Context engineering is the real leverage.** Most agent failures I've debugged trace back to what the agent *didn't know*, not what it reasoned poorly about. PSI-based enrichment in the ACR plugin, blackboard-pattern state sharing in VYNN, AutoEvolve's memory dossier over raw transcripts — all different bets on the same problem: right information, right time, minimum noise.

- **"Usually right" isn't good enough.** VYNN's 3-layer recommendation validator exists because LLMs fabricate financial numbers. ACR's GumTree merge exists because `git apply` fails when code has diverged. AutoEvolve's two-stage proxy→validation exists because GPU hours are finite. I'm drawn to the engineering that makes agents trustworthy enough to run unsupervised.

---

### Writing

| | |
|---|---|
| **[Beyond the Harness: An Operating System for AI Agents](https://zanwenfu.com/blog/agent_harness_blog)** | Git worktree as agent memory, CLI-first tool discovery, and why everyone stops at the OS metaphor. |
| **[From Research Agent to Acquired Product](https://zanwenfu.com/blog/acr_blog)** | AST-level patch merging, interactive feedback loops, and the gap between benchmarks and developer UX. |
| **[Building VYNN AI](https://zanwenfu.com/blog/vynnai_blog)** | Semantic-symbolic separation, architectural mistakes, and what 500 real users teach you about agent reliability. |

---

<sub>Open to full-time SWE & ML engineering roles for 2027. Last updated: Mar 2026</sub>
