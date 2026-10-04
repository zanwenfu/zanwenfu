<h1 align="center">Zanwen Fu</h1>

<p align="center">
  <b>Founder &amp; Engineer. I build AI agents people can depend on.</b><br/>
  <a href="https://zanwenfu.com"><b>zanwenfu.com</b></a>
</p>

<p align="center">
  <sub>
    <a href="https://www.linkedin.com/in/zanwenfu">LinkedIn</a> &nbsp;·&nbsp;
    <a href="https://x.com/zanwenfu">X</a> &nbsp;·&nbsp;
    <a href="mailto:zanwen.fu@duke.edu">zanwen.fu@duke.edu</a>
  </sub>
</p>

<p align="center">
  <sub>
    Founder, <b>VYNN AI</b> · prev <b>AutoCodeRover</b> (acquired by Sonar), <b>Robinhood</b> Agentic AI, <b>Binance</b> Web3 Wallet<br/>
    MS Computer Science (AI/ML) @ <b>Duke</b> · BComp CS with Distinction @ <b>NUS</b>
  </sub>
</p>

---

Agents are easy to demo and hard to depend on. The model is rarely what decides whether one holds up. Everything around it is: memory, rollback, verification, and an honest report of what it actually did. That's what I build.

### Projects

**[VYNN AI](https://vynnai.com)** &nbsp;·&nbsp; _founder and sole engineer · 2025 to now · [agent code](https://github.com/Agentic-Analyst/stock-analyst) · [blog](https://zanwenfu.com/blog/vynnai_blog)_

A personal financial analyst for every investor. Ask about any company, fund, coin or prediction market and get a sourced report and a live Excel model in about two minutes. 5K+ users, and the first 500 came with zero marketing spend, from posting raw analyses in investing communities.

The model never writes a number. A deterministic valuation engine computes every figure, a validator rejects any figure that doesn't match it, and when the valuation methods disagree, VYNN withholds the target instead of picking one. Every release is checked nightly against reference valuations for 100 companies.

**[errata-bench](https://errata-bench.com)** &nbsp;·&nbsp; _creator · 2026 · [code](https://github.com/zanwenfu/errata-bench) · [leaderboard](https://errata-bench.com/leaderboard) · [dataset](https://huggingface.co/datasets/zanwenfu/errata-bench-v1)_

Do coding agents tell the truth about their own work? 55 tasks rebuilt from real moments in [SWE-chat](https://arxiv.org/abs/2604.20779) where a developer caught an agent misreporting. A new model takes the agent's place with working tools, and every claim in its final report is checked against what it actually did.

In the first run across six models, 44–73% of each model's answers claimed something it hadn't established. When an agent worked on a bug but left it unfixed, 2.5% of its reports said so. The comparison rule was registered before any comparison was computed. A collector has already gathered 4,140 new sessions for the next release.

**[Agent OS](https://github.com/zanwenfu/taste-is-all-you-need)** &nbsp;·&nbsp; _creator · 2026 · [design thesis](https://zanwenfu.com/blog/agent_harness_blog)_

An operating system for AI agents, with git as its memory. A central brain plans, each piece of work runs as its own process on its own branch, and an observe-only monitor certifies the end state. Only certified work is delivered, and a failed attempt is rolled back but never erased. It already runs real benchmark tasks end to end: 29 trials on errata-bench.

**[AutoCodeRover](https://github.com/AutoCodeRoverSG/auto-code-rover)** &nbsp;·&nbsp; _research engineer · 2024 to 2025 · [acquired by Sonar](https://www.sonarsource.com/company/press-releases/sonar-acquires-autocoderover-to-supercharge-developers-with-ai-agents/) · [blog](https://zanwenfu.com/blog/acr_blog)_

One of the first agents to fix real GitHub issues on its own. I worked on the repair backend that reached 51.6% on SWE-bench Verified (Jan 2025), building a Self-Fix loop that diagnoses a failed patch, finds the stage that caused it, and replays from there. I built the [JetBrains plugin](https://github.com/zanwenfu/jetbrains-ide-plugin) end to end in Kotlin, including a three-way merge on the syntax tree so the agent's fix lands on top of the developer's latest edits.

Sonar's Foundation Agent, built on AutoCodeRover's technology, later reached [#1 on the unfiltered SWE-bench leaderboard](https://www.sonarsource.com/company/press-releases/sonar-claims-top-spot-on-swe-bench-leaderboard/) (79.2% Verified, Feb 2026).

---

### Research

- **[LUMINA](https://github.com/zanwenfu/agentic-reviewers-for-SRMA)** · first author, [manuscript](https://github.com/zanwenfu/agentic-reviewers-for-SRMA/blob/main/docs/paper/LUMINA_manuscript.pdf). Four agents that screen citations for medical systematic reviews: 98.2% sensitivity and 87.9% specificity across 15 published reviews (~150K citations), at under a cent per citation.
- **[architectural-damping](https://github.com/zanwenfu/architectural-damping)** · The deterministic calculator between VYNN's LLM layer and its users absorbed 83% of successful prompt injections on an offline replica, and that figure was predicted from the calculator's source before the pilot ran (6 of 6 predictions held).
- **[speculative-decoding-t4](https://github.com/zanwenfu/speculative-decoding-t4)** · Sequoia's cost model predicts a 1.68x speedup on a T4; I measured 0.56x. A four-term decomposition reconciles the gap to within 1.1%.
- **[football-llm-scaling](https://github.com/zanwenfu/football-llm-scaling)** · QLoRA beats 5-shot prompting by 12.5 points under the usual metric, and ties it exactly (42.2%) once a prediction has to be internally coherent. The gap was the metric, not the model.

### Writing

- **[Beyond the Harness: An Operating System for AI Agents](https://zanwenfu.com/blog/agent_harness_blog)**: git as agent memory, and why everyone stops at the OS metaphor.
- **[From Research Agent to Acquired Product](https://zanwenfu.com/blog/acr_blog)**: merging agent fixes into live code, and the gap between benchmarks and developer experience.
- **[Building VYNN AI: 50K LOC, One Engineer](https://zanwenfu.com/blog/vynnai_blog)**: keeping language models away from the numbers, and what real users teach you about reliability.

---

<p align="center">
  <sub>
    Building agent infrastructure or evals? I'd like to hear about it: <a href="mailto:zanwen.fu@duke.edu">zanwen.fu@duke.edu</a>
  </sub>
</p>
