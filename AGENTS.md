# CampusBite AI Development Instructions

Read design.md before frontend work.

## Priority

1. Working application
2. Dataset accuracy
3. Simple architecture
4. Usability
5. Visual polish

## Technology

Use the existing project:

- Next.js
- TypeScript
- React
- Gemini API using @google/genai
- csv-parse
- CSS

Do not replace the framework.

## Keep It Simple

Do not add:

- database
- authentication
- accounts
- admin dashboard
- unnecessary state management
- unnecessary libraries
- unnecessary abstraction

## Dataset

All factual food information must come from:

data/menu-kantin.csv

Never invent:

- menu
- price
- stall
- description
- image

Missing prices must not be interpreted as zero or free.

## Images

Menu images are available under:

public/menu-images/

Normalize CSV image paths when needed.

## Gemini

Gemini API calls must happen server-side.

Read the API key from:

GEMINI_API_KEY

Never expose the API key to client-side JavaScript.

## Agentic Behavior

Gemini should determine which menu tool is needed.

Available capabilities should include:

- search menu
- filter by budget
- filter by stall
- find cheapest or most expensive
- compare menu
- list stalls

Tool execution must use deterministic application code and the CSV dataset.

## Quality

Do not rewrite working code without reason.

Run validation after meaningful changes.

Keep implementation easy to understand.
