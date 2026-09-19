<h1 align="center">Zanwen Fu</h1>

<p align="center">
  <b>AI engineer shipping production agentic systems</b><br/>
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
    Founder, <b>VYNN AI</b> · ex-Research engineer, <b>AutoCodeRover</b> (acquired by Sonar) · ex-MLE, <b>Robinhood</b> Agentic AI · ex-SWE, <b>Binance</b> Web3 Wallet<br/>
    MS Computer Science (AI/ML) @ <b>Duke</b> · BComp CS with Distinction @ <b>NUS</b>
  </sub>
</p>

---

I build agentic systems that survive production. The model is the easy part. The harness around it, memory, rollback, verification, and everything that sits between the LLM and the user, is where reliability actually lives. Two of the projects below are that thesis as code; the other two are the systems that taught it to me.

<!-- Optional, and worth it: one diagram here. The git-as-OS figure from the Agent OS post is the right one.
<p align="center"><img src="assets/agent-os.png" width="640" alt="Agent OS: git as the memory substrate"/></p>
-->

---

### Projects

**[Agent OS](https://github.com/zanwenfu/taste-is-all-you-need)** &nbsp;·&nbsp; _git-native harness for long-horizon coding agents · 2026 · [design thesis](https://zanwenfu.com/blog/agent_harness_blog)_

The idea: treat git as the operating system for a coding agent. Branches are processes, commits are checkpoints, and rollback is a primitive, so a long-running agent can be paused, inspected, and rewound instead of restarted. A Planner, Workers, and a Monitor run at separate model sizes, so no agent grades its own work.

Early result: in a controlled study against repair-in-place and no-recovery arms, gating rollback on test regression lifted SWE-bench Verified resolve from 55.0% to 63.2% and eliminated all 9 contaminated final states. Ongoing; the argument is in [Beyond the Harness](https://zanwenfu.com/blog/agent_harness_blog).

**[Errata-Bench](https://github.com/zanwenfu/errata-bench)** &nbsp;·&nbsp; _self-improving benchmark from real developer corrections · 2026_

The idea: the clearest signal of where coding agents fail is the moment a developer corrects one. Errata-Bench distills those corrections into a benchmark for user alignment: hallucinated claims, hidden failures, and false confidence, the failures that pass the tests and still lose the user's trust.

A Claude Code plugin captures live session feedback, so every correction can become a new task and the benchmark grows with use instead of going stale. Ongoing and open source.

**[VYNN AI](https://github.com/Agentic-Analyst/stock-analyst)** &nbsp;·&nbsp; _founder and sole engineer · 2025 to now · [vynnai.com](https://vynnai.com) · [blog](https://zanwenfu.com/blog/vynnai_blog)_

Ask any market question and get an analyst report in under 90 seconds for about $0.03; the same report takes a human 6 to 12 hours. 5K registered beta users, and the first 500 came with zero marketing spend, from posting raw analyses in investing communities and sending people to the app when they asked for it.

A ReAct agent plans over 20 tools and 7 LangGraph sub-agents. The LLM never invents a number: a deterministic DCF engine owns every valuation, a validator rejects mismatched figures, unsupported ratings, and any report under 95% citation coverage, and when the two valuation legs don't converge the report withholds the target rather than pick one.

Releases gate on a nightly regression over 100 QQQ companies. Every analysis runs in its own one-shot container and streams per-agent progress over SSE. The agent is open source; the control plane and web app are private.

**[AutoCodeRover](https://github.com/zanwenfu/auto-code-rover)** &nbsp;·&nbsp; _research engineer, employee #5 · 2024 to 2025 · [acquired by Sonar](https://www.sonarsource.com/company/press-releases/sonar-acquires-autocoderover-to-supercharge-developers-with-ai-agents/) · [blog](https://zanwenfu.com/blog/acr_blog)_

Autonomous program repair, on a five-person team, through the Sonar acquisition. Landed the recovery and replay layer in the pipeline that hit 51.6% on SWE-bench Verified (pass@3, Jan 2025, $0.65 per issue).

The Self-Fix Agent closes the loop on failed patches: an LLM-as-judge pinpoints which pipeline stage failed, writes corrective feedback, and replays from that stage with upstream state intact. Patch Alignment does a GumTree three-way AST merge so concurrent human and agent edits to the same function land without structural conflicts. The [JetBrains plugin](https://github.com/zanwenfu/jetbrains-ide-plugin), written end-to-end in Kotlin, captures build and test failures, enriches context through PSI, and fixes embedded SonarLint findings in batch.

AutoCodeRover evolved into the Sonar Foundation Agent, [#1 on the unfiltered SWE-bench leaderboard](https://www.sonarsource.com/company/press-releases/sonar-claims-top-spot-on-swe-bench-leaderboard/) at 79.2% Verified / 52.62% Full (Feb 2026).

---

### Research

- **[LUMINA](https://github.com/zanwenfu/agentic-reviewers-for-SRMA)** · first author, [manuscript](https://github.com/zanwenfu/agentic-reviewers-for-SRMA/blob/main/docs/paper/LUMINA_manuscript.pdf). Four-agent citation screener for systematic reviews: 0.982 mean sensitivity and 0.879 specificity across 15 reviews (~150K citations) at $0.007 per citation, and perfect 1.000 sensitivity on the four Tran et al. 2024 benchmark reviews with 20 to 40 point specificity gains over their GPT-3.5 pipeline.
- **[architectural-damping](https://github.com/zanwenfu/architectural-damping)** · Duke ECE 590. The deterministic calculator between VYNN's LLM layer and its users absorbed 83% of successful prompt injections on an offline replica, and that 83% was predicted from the calculator's source before the pilot ran (6 of 6 predictions held).
- **[speculative-decoding-t4](https://github.com/zanwenfu/speculative-decoding-t4)** · Duke CS 590. Sequoia's cost model predicts a 1.68x speedup on a T4; measured 0.56x. A four-term decomposition reconciles the gap to within 1.1%, and shows the standard KV-persistence optimization flips sign on T4.
- **[football-llm-scaling](https://github.com/zanwenfu/football-llm-scaling)** · Duke ECE 590. QLoRA beats 5-shot ICL by 12.5pp under the usual score-overrides-text convention and ties it exactly (42.2%) once a prediction has to be internally coherent. The gap was the metric, not the model.

---

### What I think

**The harness is the bottleneck, not the model.** When agents fail in production, the infrastructure around the LLM broke. Agent OS is what I think that infrastructure should look like; [Beyond the Harness](https://zanwenfu.com/blog/agent_harness_blog) is the argument.

**Usually right isn't good enough.** Errata-Bench measures whether an agent checks before it concludes. VYNN's validator exists because LLMs fabricate financial numbers; Patch Alignment exists because `git apply` fails when code has diverged. Systems that run unsupervised have to hold on the edge cases, not the common ones.

**The layer between the LLM and the user is a defense, and you can measure it.** In the architectural-damping study a deterministic layer absorbed 83% of LLM-layer compromise before it reached anyone, and the figure was predictable from source code. That layer should be designed on purpose, not left over from whatever the LLM didn't do.

---

### Writing

- **[Beyond the Harness: An Operating System for AI Agents](https://zanwenfu.com/blog/agent_harness_blog)**, git worktrees as agent memory, CLI-first tool discovery, and why everyone stops at the OS metaphor.
- **[From Research Agent to Acquired Product](https://zanwenfu.com/blog/acr_blog)**, AST-level patch merging, interactive feedback loops, and the gap between benchmarks and developer UX.
- **[Building VYNN AI: 50K LOC, One Engineer](https://zanwenfu.com/blog/vynnai_blog)**, semantic and symbolic separation, architectural mistakes, and what real users teach you about agent reliability.

---

<p align="center">
  <sub>
    Looking for a full-time role building agent infrastructure, harnesses, and evals, starting 2027, on a team that ships. If you're building something hard, I'd like to hear about it.<br/>
    <a href="mailto:zanwen.fu@duke.edu">zanwen.fu@duke.edu</a>
  </sub>
</p>

<sub><em>Last updated: September 2026</em></sub>
