<!-- Profile README for https://github.com/zanwenfu -->

<h1 align="center">Zanwen (Ryan) Fu</h1>

<p align="center">
  <b>Software Engineer & Founder</b><br/>
  Agentic Systems • Distributed Backends • AI Developer Tooling
  <br/>
  M.S. Computer Science (AI/ML), Duke University
</p>

<p align="center">
  <a href="mailto:zanwen.fu@duke.edu">
    <img alt="Email" src="https://img.shields.io/badge/Email-zanwen.fu%40duke.edu-red">
  </a>
  <a href="https://www.linkedin.com/in/zanwenfu">
    <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-@zanwenfu-blue?logo=linkedin">
  </a>
  <a href="https://github.com/zanwenfu">
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-zanwenfu-181717?logo=github&logoColor=white">
  </a>
</p>

---

## 👋 About

I am a Software Engineer and M.S. Computer Science (AI/ML) student at Duke University, focused on building **production-grade agentic AI systems**—from multi-agent orchestration and LLM tooling to the distributed backends that run them reliably at scale.

I am the sole founder and engineer of **VYNN AI** (https://vynnai.com), an agentic financial analyst platform built end-to-end, spanning multi-agent orchestration (LangGraph), real-time market data pipelines, and autonomous LLM-driven analysis deployed in production.

Previously, I designed core components of **AutoCodeRover**, an autonomous code repair system acquired by **Sonar**, integrating agentic reasoning directly into JetBrains IDEs and improving autonomous repair performance to **46% on SWE-bench Verified**. I have also conducted research on **multi-agent LLM frameworks for large-scale medical text mining**, currently under review at **NEJM AI**.

I am interested in building **autonomous AI agents that operate reliably in real-world systems**, with an emphasis on correctness, observability, and production readiness over demo performance.

---

## 🚀 Selected Work

### **VYNN AI** — Agentic Financial Analyst Platform  
🔗 https://vynnai.com  
**Founder & Software Engineer**

- Built and deployed an agentic financial analysis platform as sole engineer, orchestrating multi-agent workflows with **LangGraph**, tool-augmented reasoning, and **Model Context Protocol (MCP)** self-retrieval to generate structured long-form financial reports
- Architected production backends on Hetzner Cloud using **FastAPI (async)**, **Redis**, **MongoDB**, Dockerized services, and **Caddy**, enabling real-time **SSE/WebSocket** streaming and fault-tolerant async job orchestration
- Designed a full valuation engine supporting financial projections, DCF modeling, sensitivity analysis, and automated HTML/PDF report generation via a **React/TypeScript** dashboard
- Optimized parallel agent execution with caching and scheduling, **reducing end-to-end analysis latency by 72%** in production

---

### **AutoCodeRover (Sonar)** — IDE-Integrated Autonomous Program Repair  
🔗 https://www.sonarsource.com/company/press-releases/sonar-acquires-autocoderover-to-supercharge-developers-with-ai-agents/  
**Software Engineer** · *Acquired by Sonar*

- Built an end-to-end **JetBrains IDE extension in Kotlin**, integrating SonarLint, PSI inspections, REST APIs, and multithreaded background workers with UI-thread synchronization
- Designed an **AST-level Patch Alignment** mechanism using **GumTree** to reconcile LLM-generated patches with live developer edits, eliminating structural merge conflicts
- Implemented a distributed autonomous repair pipeline with build/test failure detection, replay-loop reasoning, and a **Self-Repair Agent** coordinating IDE ↔ backend execution
- Improved autonomous repair performance to **46% SWE-bench Verified** and **37% Lite** by enhancing agentic self-repair and failure recovery strategies

---

### **Multi-Agent LLM Framework for Systematic Reviews** — NUS UROP  
**AI Researcher**

- Developed a multi-agent LLM framework for large-scale citation screening using **Chain-of-Thought**, **PICOS evaluation**, and **LLM-as-a-Judge**, achieving **99.5% sensitivity** and **87.9% specificity** across 15 systematic reviews (~150K abstracts)
- Led collaboration with medical researchers; primary contributor to manuscript under review at **NEJM AI (2025)** demonstrating scalable agentic automation for medical text mining

---

## 🧰 Core Technical Focus

**Languages**  
Python, Kotlin, Java, TypeScript/JavaScript, C#, Swift, SQL, R

**Systems & Backend**  
Distributed systems, async architectures, FastAPI, REST APIs, Docker, Redis, MongoDB, CI/CD, Linux, multithreading & concurrency

**Agentic AI & Tooling**  
Multi-agent workflows, LLM tooling, SWE-bench, Self-RAG, evaluation pipelines, developer-facing AI systems

---

## 📫 Contact

- **Email:** zanwen.fu@duke.edu  
- **LinkedIn:** https://www.linkedin.com/in/zanwenfu  

---

<sub>Last updated: Feb 2026</sub>
