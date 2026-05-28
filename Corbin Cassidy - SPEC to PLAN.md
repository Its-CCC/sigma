## **Overview**

You have a spec — your problem statement, your mechanics, and your required features. A spec says **what** to build. Before you write code, you need a plan for **how** and in **what order** to build it. That's what a tech lead does: they turn a spec into an ordered, dependency-aware build plan.

You don't have to invent every task from a blank page — use your AI partner to help generate a first-draft plan.md. But the AI can't make the important calls for you: **what order to build in, which tasks block others, and how your data is structured.** That thinking is your job, and it's the difference between a plan that works and a pile of tasks.

By the end of this activity, you will create a [plan.md](http://plan.md) doc with your AI agent that will instruct how your agent will build the game. 

---

## **Part 1: Break the Spec into Tasks**

**Goal:** Turn the spec into a list of concrete build tasks.

**Do This:** Ask your AI partner to help generate a first-draft task list from your spec. Then **review it** — add anything missing, cut anything irrelevant, and reword anything vague. You own the final list, not the AI. **NOTE:** If you haven’t already added this to your specs, then you should add it now, **your game MUST be multi-player and playable on a local network**.  

*Starter prompt:* "Here is my spec for a browser-based guessing game: \[paste your Part 1 summary\]. List the concrete build tasks needed to make it, from setting up the page to saving a high score. Keep each task small and specific."

| Task ID and Title | Task Description |
| :---- | ----- |
| T1 |  |
| T2 |  |
| T3 |  |
| T4 |  |
| T5 |  |
| T6 |  |
| T7 |  |
| T8 |  |

**Tip:** A good task is small enough to finish in one sitting and concrete enough that you'd know when it's done. "Make the game" is not a task. "Fetch one stimulus from the API and log it to the console" is a task.

---

## **Part 2: Find the Dependencies (What Blocks What)**

**Goal:** Figure out which tasks must happen before others.

A **blocker** is a task that must finish before another can start. You can't score a guess before you can capture a guess. You can't display a stimulus before you fetch one.

**Do This:** For each task, note what must be done first, and what could happen at the same time.

| Task ID | Depends On *(must be done first)* | Could Run in Parallel With |
| ----- | ----- | ----- |
| T1 |  |  |
| T2 |  |  |
| T3 |  |  |
| T4 |  |  |
| T5 |  |  |
| T6 |  |  |
| T7 |  |  |
| T8 |  |  |

---

## **Part 3: Map Your Data Architecture**

**Goal:** Plan what data your game uses, where it lives, and how it moves. This is the part that's hardest to change later, so it's worth thinking through now.

**Data architecture** means three things: *what* data exists, *where* it lives, and *how* it flows between parts of your app.

**Do This (1 of 2):** Inventory your data. For each piece, name where it comes from and where it lives while the game runs.

| Data | Where It Comes From *(API / player input / calculation)* | Where It Lives *(app variable / localStorage / the API)* |
| ----- | ----- | ----- |
| Stimulus (image/audio/text) |  |  |
| Correct answer |  |  |
| Player's guess |  |  |
| Round score |  |  |
| Running total |  |  |
| High score |  |  |

**Do This (2 of 2):** Describe the flow. In order, trace how data moves through one round of your game — from the API all the way to the screen and back into storage.

| Data Flow *(Example: "API → fetch() → stored in a variable → shown on screen → player guesses → compared to the correct answer → score calculated → added to running total → next round → at game end, high score saved to localStorage")* |
| ----- |
|  |

---

## 

## **Reflection**

**1\. Which task unblocks the most other tasks? Why does that make it important to do early?**

|  |
| :---: |

**2\. Which task is the riskiest — most likely to break, or to take longer than you expect? What's your backup plan if it does?**

|  |
| :---: |

**3\. What did sequencing your tasks reveal that you hadn't thought about when you were just designing?**

|  |
| :---: |

---

## **Submission Checklist**

* \[ \] Reviewed task list — not just the AI's first draft (Part 1\)  
* \[ \] Dependency map with blockers and parallel work identified (Part 2\)  
* \[ \] Data inventory and data flow (Part 3\)  
* \[ \] Reflection completed

