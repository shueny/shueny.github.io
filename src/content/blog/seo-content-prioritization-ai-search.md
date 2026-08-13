---
title: 'Content Prioritization for AI Search: What to Double Down On, What to Stop Making'
description: 'AI can answer the question, but the transaction still happens on your site. A walkthrough of Aleyda Solis’ AI search content prioritization guide — the four page types to raise, the four that now need a judgment call, and a six-criteria scorecard for ranking your topic list.'
pubDate: 2026-08-13
cover: '/images/blog/seo-content-prioritization-banner.svg'
category: 'Engineering & Insights'
draft: false
---

# Content Prioritization for AI Search: What to Double Down On, What to Stop Making

_Day 28 of "30 Days, 30 SEO Notes."_

For a decade, content strategy in SEO was roughly: find keywords → ship pages → wait for rankings. AI search broke that chain. A user's question can now be answered inside a chat interface, with no click to anyone's website.

But one thing did not change: **the transaction still happens on your site**. An AI assistant can tell someone roughly what a plan costs; it cannot book, quote, or check out for them. So the real question isn't "should I still publish content?" — it's "which kind of content deserves the budget now?"

Aleyda Solis wrote a genuinely dense [content prioritization guide](https://www.aleydasolis.com/en/ai-search/content-prioritization-ai-search/) on exactly this. Below is my read of it, plus where I'd push further.

---

## 1. The four page types to prioritize

### Transactional pages

Pricing, booking, quotes, applications, checkout. These pages historically got a couple of sentences and a form, on the assumption that anyone landing there already had intent.

Now they should carry the full picture: **price ranges, eligibility, limits, the process, what to prepare, what happens next**. The logic is direct — AI can answer the question, but the final transaction still lands on your site. Spell out the conditions and you give AI something citable *and* pre-qualify the person who arrives.

### Official reference pages

Product specs, compatibility, warranty, policies, release notes, documentation. Their value sits entirely in the word *official*: you are the only authoritative source for this data.

If you have a lot of it, **don't bury it in a PDF or one giant page**. Split it by product, model, version, and feature into URLs that can be found on their own, so AI has a specific, addressable, citable official source. An 80-page spec PDF is, for practical purposes, invisible.

### First-party data that changes

Live pricing, stock, service areas, store locations, job openings, system status.

The advantage of this data is precisely that it **goes stale**. To answer with current information, a model has to come back to your source — it cannot bluff from training data. Perishable first-party data is one of the few content types with a built-in, recurring reason to be fetched.

### FAQs — with a condition

Aleyda puts FAQs in the high-priority bucket too, but the point is how you split them: **don't cram everything into one endless FAQ page**.

Different devices, versions, error messages, and use cases deserve their own pages *when the answers genuinely differ*. This is the micro-intent clustering argument again — writing the same question 100 ways for 100 keywords is worthless, but 100 questions with 100 different answers is 100 legitimate pages.

---

## 2. The four that now need a judgment call

This is the more interesting half. None of these are forbidden — they just need one gate in front of them.

| Content type | The test (it is not keywords) |
| --- | --- |
| FAQ | Is the **answer** actually different? Not whether the keyword is |
| Comparison pages | Do you have your **own criteria, data, and use cases**? Not just a swapped competitor name |
| Programmatic SEO | Does each URL carry **different data or a different need**? Not public data × 10,000 city names |
| Tool pages | Can AI just do it in one line? Only tools needing **live data, proprietary data, or many inputs** earn a page |

Tool pages deserve a sentence more. If a converter is something a model resolves conversationally in one line, a dedicated page barely justifies itself. But a tool that needs today's rate, *your* internal pricing table, and seven user inputs before it can compute anything is the opposite case — it becomes a reason to visit that AI cannot absorb.

---

## 3. What to make less of

The low-priority list isn't controversial:

- **Plain definition posts** ("what is X")
- **Tutorials that restate the search results**
- **Rewritten news**
- **Traffic posts too far from what you actually sell**

What they share: once AI has answered, the user has no remaining reason to visit you.

---

## 4. The six scoring criteria

Aleyda ends with a prioritization table that scores every topic on six things:

<div style="overflow-x:auto">
<table>
<thead>
<tr><th>Criterion</th><th>The question to ask</th></tr>
</thead>
<tbody>
<tr><td>Post-answer visit need</td><td>After AI answers, is there <strong>still</strong> a reason to come to your site?</td></tr>
<tr><td>Citation likelihood</td><td>Is this <strong>likely to be cited</strong> as a source?</td></tr>
<tr><td>Brand mention potential</td><td>Would your <strong>brand name appear</strong> in the answer?</td></tr>
<tr><td>Business value</td><td><strong>How close to revenue</strong> is this topic?</td></tr>
<tr><td>Unique data</td><td>Do you have data <strong>nobody else can get</strong>?</td></tr>
<tr><td>Production &amp; maintenance cost</td><td>What does it take to build — and to <strong>keep alive</strong> afterwards?</td></tr>
</tbody>
</table>
</div>

Higher is better on the first five; lower is better on the last. When I run this myself I score each 1–5 and total it as "sum of the first five − cost." That arithmetic is mine, not hers — the original table has its own columns and scoring logic, so read the source for the canonical version.

### What it looks like in practice

Run a few typical topics through it and the spread is hard to ignore (scores are illustrative — rescore against your own business):

<div style="overflow-x:auto">
<table>
<thead>
<tr><th>Topic</th><th>Visit</th><th>Cite</th><th>Brand</th><th>Value</th><th>Unique</th><th>Cost</th><th>Total</th></tr>
</thead>
<tbody>
<tr><td>Plan pricing &amp; eligibility page</td><td>5</td><td>4</td><td>5</td><td>5</td><td>5</td><td>2</td><td><strong>22</strong></td></tr>
<tr><td>Per-model compatibility matrix</td><td>4</td><td>5</td><td>5</td><td>3</td><td>5</td><td>3</td><td><strong>19</strong></td></tr>
<tr><td>Live service-area / stock lookup</td><td>5</td><td>4</td><td>4</td><td>4</td><td>5</td><td>4</td><td><strong>18</strong></td></tr>
<tr><td>"What is X" definition post</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td><strong>4</strong></td></tr>
</tbody>
</table>
</div>

That is not a small gap — it is an order of magnitude. Which is the whole reason to run the table: it forces you to admit that the topics at the top of your list probably don't belong there.

---

## 5. How to actually use it

The takeaway isn't "stop writing." It's operational:

**Take the 50 topics you were about to write, score all of them on these six criteria, and spend the budget on the high scorers first.**

Most people finish that exercise with two findings. The "big traffic" topics at the top of the list score badly. And the boring spec pages, eligibility pages, and data pages that kept getting pushed to the bottom score absurdly well — which is usually also why nobody wanted to write them.

---

**Original article and table:** [Content Prioritization for AI Search — Aleyda Solis](https://www.aleydasolis.com/en/ai-search/content-prioritization-ai-search/)
