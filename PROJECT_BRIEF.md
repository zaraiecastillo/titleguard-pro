# Title Guard AI: Core Logic & "Red Flag" Directory

## 1. The Mission
Analyze property documents (Deeds, Mortgages, Liens, Tax Records) to identify "Clouds on Title" within minutes. The goal is to flag issues on Day 1 of a listing that usually take 10 days for a human title officer to find.

## 2. Critical "Red Flag" Triggers
The AI must trigger a High-Risk (Red) or Caution (Yellow) alert if the following conditions are met:

### A. Chain of Title Integrity (The "Who" Test)
- **Trigger**: The "Grantee" (Buyer) on the most recently recorded Deed does not match the name of the Seller on the current Sales Contract.
- **Logic**: Look for "Wild Deeds" or missing links in ownership.
- **Secondary Check**: If the owner is a Trust (e.g., The Smith Family Trust), flag if the contract is signed by an individual (John Smith) without identifying them as a Trustee.

### B. Unreleased Encumbrances (The "Debt" Test)
- **Trigger**: A Mortgage or Deed of Trust was recorded (e.g., 2018) but no "Satisfaction of Mortgage," "Release of Lien," or "Deed of Reconveyance" has been recorded since.
- **Logic**: The AI must assume the debt is still active unless a release document is found.

### C. Involuntary Liens (The "Legal" Test)
- **Trigger**: Scan documents for keywords: Lis Pendens, Mechanic’s Lien, Tax Warrant, Judgment, Notice of Commencement.
- **Logic**: Any active lien filed against the property or the owner's name must be flagged for curative payoff.

### D. Marital & Probate Status (The "Family" Test)
- **Trigger**: The deed lists the owner as "Married," but the current contract only has one signature.
- **Logic**: In many states, a spouse must sign even if they aren't on the title.
- **Trigger**: One of the owners on the deed is deceased.
- **Logic**: Flag the need for Letters of Administration or a Death Certificate to be recorded.

### E. Legal Description Consistency (The "What" Test)
- **Trigger**: The Lot Number, Block Number, or "Metes and Bounds" (footage/bearings) change between the current deed and the previous one.
- **Logic**: Flag for a potential survey discrepancy or "Scribener's Error."

## 3. Analysis Output (The Report)
The website must display the results in this specific format:
1. **Risk Score**: 🟢 Clear | 🟡 Caution | 🔴 High Risk
2. **Verified Owner**: [Current Legal Owner Name]
3. **Active Encumbrances**: [List of open mortgages/liens found]
4. **The "Closing Killer" List**: [Bullet points of specific issues]
5. **Curative Recommendation**: [Actionable step for the Realtor, e.g., "Request payoff letter from Chase Bank."]
