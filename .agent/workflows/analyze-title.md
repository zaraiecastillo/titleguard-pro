---
description: Title Analysis Workflow using Agent Beta
---

# Title Analysis Workflow

1. **Ingestion**: 
   - Receive PDF upload via `/api/analyze`.
   - Validate file type and size.

2. **Security & Compliance (ZDR)**:
   - File is processed in memory (or temp storage only for scrubbing).
   - **PII Scrubbing**: Invoke `scripts/pii_scrubber.py` to redact SSNs/Banking info.
   - Upload original to Supabase Vault (Mock for now: Secure Storage).

3. **Multimodal Analysis (Gemini 3 Deep Think)**:
   - Model: `gemini-2.0-flash-thinking-exp-01-21` (Acting as Gemini 3 Deep Think).
   - **Persona**: Senior Title Underwriter (Adversarial).
   - **Context**: `PROJECT_BRIEF.md`.
   - **Input**: Scrubbed Text.
   - **Config**: `store: false` (Zero Data Retention).

4. **Output Generation**:
   - Return strict JSON format:
     - RiskScore (Clear/Caution/High Risk)
     - VerifiedOwner
     - ActiveEncumbrances
     - ClosingKillerList (Specific issues found)
     - CurativeRecommendation

5. **Cleanup**:
   - Remove any temporary files immediately.
