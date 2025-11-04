I want to open a very simple vue project and make a one page app with a few tabs. The goal is to make this site the number one place for people to search and look and learn about HS codes. Give me technical instructions how to open a new project/repo. keep any technical instructions very concise. I'm a senior engineer and know what everything does. Use tailwind css and vue router to support a simple 4 page app with tabs. tab 1) the HS code explorer tab 2) the HS product lookup. tab 3) the HS code game tab 4) HS code summary.

## Project Overview

This is a web application for visualizing and gamifying the Harmonized System (HS) codes - the international standardized system of names and numbers to classify traded products.

## Product Vision

The application consists of three main page concepts:

### 1. HS Code Explorer - Interactive Tree Visualization
A hierarchical navigation system that allows users to discover HS codes through a branching tree or sunburst chart:
- **Level 1 (Sections)**: 21 main categories (e.g., "Vegetable Products", "Textiles", "Machinery")
- **Level 2 (Chapters)**: First 2 digits of the code (e.g., Chapter 07: "Edible vegetables")
- **Level 3 (Headings)**: First 4 digits (e.g., 08.08: "Apples, pears and quinces")
- **Level 4 (Subheadings)**: Full 6-digit code (e.g., 0808.10: "Apples")

The visualization should include a "Code Builder" sidebar that assembles the HS code digit-by-digit as users navigate.

### 2. Search Tool
A search interface that translates common product names to HS codes:
- Accept natural language queries (e.g., "iPhone", "coffee", "cotton t-shirt")
- Animate the path through the hierarchical visualization to show classification logic

### 3. Trade Inspector Game
An educational game where users practice classifying products:
- Show name of common products
- Users navigate the interactive tree to find the correct 6-digit HS code
- Provide contextual feedback for wrong turns
- Score based on speed and accuracy

## Data Model

The HS code system is hierarchical:
- **Section**: Top-level category (21 total)
- **Chapter**: 2-digit code
- **Heading**: 4-digit code
- **Subheading**: 6-digit code (full HS code)

Each level builds upon the previous, creating a path from general to specific product classification.

## Key Implementation Considerations

### Data Source
There is a JSON file with all HS_codes and descriptions in the project root at the file ./hs_codes.json

### Visualization
The exploration can be done with simple expandable html cards. We don't need a specific graph or animation for it.

### Search Functionality
The search tool needs to map common product names to official HS code descriptions. This may require:
- A comprehensive product name dictionary
- Fuzzy matching capabilities
- Synonym handling (e.g., "cell phone" → "telephone for cellular networks")

### Game Mechanics
We will implement the game later.


