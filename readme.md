
# PPQ JSON Schema Documentation

This document outlines the structure for Past Questions (PPQ) JSON files. 
Each file consists of a **root array** containing a sequence of objects. These objects define the flow of the exam paper, including metadata, instructions, headings, images, and the questions themselves.

## Root Structure
The file must be a valid JSON array of objects.
`[ {Object}, {Object}, ... ]`

Each object in the array must have a `type` property. The valid types are:
1.  `pageInfo`
2.  `Instruction`
3.  `heading`
4.  `Question`
5.  `img`

---

## 1. Page Info (`pageInfo`)
**⚠️ Constraint:** This object describes the exam metadata. It must appear **only once** per file, typically as the first item.

### Properties
| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | String | Must be `"pageInfo"`. |
| `kind` | String | The exam format. <br>Accepted values: `"OBJ"`, `"THEORY"`, `"Subjective"`, or combinations (e.g., `"OBJ && THEORY"`). |
| `course_title`| String | The full name of the course (e.g., "General Chemistry 1"). |
| `code` | String | The course code (e.g., "CHM 130.1"). |
| `session` | String | The academic session (e.g., "2022/2023"). |
| `time` | String | Duration of the exam in minutes. |
| `topics` | Array[String]| A master list of topics covered in this exam. |

### Example
```json
{
  "type": "pageInfo",
  "kind": "OBJ",
  "course_title": "General Chemistry 1",
  "code": "CHM 130.1",
  "session": "2022/2023",
  "time": "90",
  "topics": [
    "Stoichiometry",
    "Organic Chemistry",
    "Periodic Table"
  ]
}
````

-----

## 2\. Instruction (`Instruction`)

Used to provide specific directions for the exam or a specific group of questions.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | String | Must be `"Instruction"`. |
| `content` | String / Array | The text of the instruction. Can be a single string or an array of strings for multi-line instructions. |

### Example

```json
{
  "type": "Instruction",
  "content": "Answer all questions in this section."
}
```

-----

## 3\. Heading (`heading`)

Used to divide the exam into sections.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | String | Must be `"heading"`. |
| `content` | String | The main title of the section (e.g., "Section A"). |
| `Subheading` | String | (Optional) Additional detail (e.g., "Answer only three questions"). |

### Example

```json
{
  "type": "heading",
  "content": "Section A",
  "Subheading": "Theory Questions"
}
```

-----

## 4\. Question (`Question`)

Defines a specific query, its options (if applicable), correct answer, and explanation.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | String | Must be `"Question"` (Note: This is the wrapper type). |
| `name` | String | The label for the question (e.g., "Question 1"). |
| `Question` | Object | The detailed question data object (Structure below). |

### The Inner `Question` Object Structure

| Key | Type | Description |
| :--- | :--- | :--- |
| `content` | String | The question text. |
| `type` | String | `"OBJ"`, `"Subjective"`, or `"Theory"`. |
| `option` | Array[String]| Required if type is `"OBJ"`. A list of possible answers. |
| `topic` | Array[String]| Tags related to the question topic. |
| `Answer` | Object | The solution data (Structure below). |
| `Explanation`| Object | Detailed reasoning for the answer (Structure below). |

### Answer & Explanation Objects

**Answer Object:**

  * `type`: `"string"` or `"img"`
  * `content`: The answer text or Image URL.
  * `alt`: Alt text (Required if type is `img`).

**Explanation Object:**

  * `type`: `"string"`, `"img"`, `"imgs"`, `"videos"`, or `"YouTube"`.
  * `content`: The explanation text, URL, or YouTube Video ID.
  * `alt`: Fallback text if media fails to load.

### Example (Objective Question)

```json
{
  "type": "Question",
  "name": "Question 1",
  "Question": {
    "content": "What is the atomic number of Carbon?",
    "type": "OBJ",
    "option": [
      "Six",
      "Eight",
      "Twelve",
      "Four"
    ],
    "topic": ["Periodic Table"],
    "Answer": {
      "type": "string",
      "content": "Six"
    },
    "Explanation": {
      "type": "string",
      "content": "Carbon is the 6th element on the periodic table."
    }
  }
}
```

-----

## 5\. Image Block (`img`)

Used to insert a standalone image that provides context for subsequent questions (e.g., a diagram or graph).

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | String | Must be `"img"`. |
| `content` | String | URL to the image source. |
| `alt` | String | Alternative text description for accessibility. |
| `Caption` | String | Text displayed below the image (e.g., "Use this diagram for Q5-10"). |
| `Topic` | Array[String]| Topics associated with this image. |

### Example

```json
{
  "type": "img",
  "content": "https://example.com/graph.png",
  "alt": "Graph of Exothermic Reaction",
  "Caption": "Fig 1.1: Reaction Pathway",
  "Topic": ["Chemical Kinetics"]
}
```

-----

## Formatting Guidelines

### Mathematical & Chemical Equations

All mathematical formulas and chemical equations must be formatted using **MathJax (LaTeX) syntax**.

  * **Inline equations:** use normal brackets `\\(\\)`.
      * Example: `\\(H_2O\\)` renders as water.
  * **Block equations:** use square brackets `\\[\\]`.
      * Example: `\\[E = mc^2\\]`

**Example Usage in JSON:**
```json
"content": "Calculate the molar mass of \\[H_2SO_4\\] given that \\(H=1, S=32, O=16\\)."
```

-----
-----
-----

-----


# 📋 How to Create Content

This guide outlines the workflow for converting past question papers into the structured JSON format required by the system.

## 🛠️ Prerequisites

* **Source Material:** Past question papers (PDF or Image format).
* **Graphics Tool:**  pixelab Photoshop, GIMP, Canva, or any photo editor.
* **Technical Knowledge:** Basic understanding of JSON structure.

---

## 🚀 Step-by-Step Guide

### 1. Source Material Preparation
* Obtain the target past question paper.
* **Batch Strategy:** Work in small batches. Select the first **7-9 questions** for initial processing.
* Capture clear screenshots of these selected questions.

### 2. Image Enhancement
Before submitting to AI, the image quality must be optimized for Optical Character Recognition (OCR).

```bash
# Quality Checklist:
[✓] High contrast (Dark text on light background)
[✓] Clear text (No blur)
[✓] Straight alignment
[✓] Minimal background noise
````

**Action:** Use your graphic design tool to crop out irrelevant headers/footers and adjust brightness/contrast.

### 3\. AI Processing

  * Navigate to the `prompts/` directory in the project.
  * Select the prompt template matching your subject (e.g., Chemistry, Math).
  * Submit your enhanced screenshot along with the prompt to the AI (Gemini pro or deepseek).
  * **Result:** The AI will return a formatted JSON array.

### 4\. Integration

  * Open `view.json` in your code editor.
  * Replace the existing question array with the new AI-generated data.
  * **Crucial:** Update the `pageInfo` object to match the current exam metadata.

**Example Metadata Update:**

```json
{
  "type": "pageInfo",
  "kind": "OBJ",
  "course_title": "General Chemistry 1",
  "code": "CHM 130.1",
  "session": "2022/2023",
  "time": "90",
  "topics": [
    "Stoichiometry",
    "Organic Chemistry",
    "Periodic Table"
  ]
}
```

### 5\. Validation & Testing

Do not commit without testing.

1.  **Preview:** Open `index.html` in your browser.
2.  **Functionality Check:** Ensure navigation works and questions are legible.
3.  **Content Verification:**
      * Compare AI answers against textbooks or Google Search.
      * Verify against the original PDF.

-----

## ✅ Quality Assurance Checklist

| Step | Action | Verification Criteria |
| :--- | :--- | :--- |
| **1** | **Image Clarity** | Is text readable without zooming in? |
| **2** | **AI Output** | Are all JSON commas and braces correct? |
| **3** | **Metadata** | Does `course_title` and `session` match the source? |
| **4** | **Answers** | Have complex answers been verified against 2+ sources? |
| **5** | **Functionality**| Do images load? Do options click correctly? |

-----

## ⚠️ Important Notes

> **Batch Processing:** Always process 7-9 questions at a time. Large batches confuse the AI.
>
> **Backup:** Keep a copy of the previous `view.json` before pasting new code.
>
> **Consistency:** Ensure formatting (bolding, spacing) remains uniform across sections.

-----

## 🔄 Workflow Summary

```mermaid
Source Material -> Screenshot -> Enhance Image -> AI Processing -> JSON Integration -> Testing -> Final Review
```

*(Text Version)*
`Source` → `Screenshot` → `Enhance` → `AI Processing` → `Integration` → `Testing` → `Review`

-----

## 🆘 Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **AI text is garbled** | Image quality is too low. Increase contrast and retry. |
| **Questions hidden** | Check for syntax errors in JSON (missing commas/brackets). |
| **Wrong Answers** | AI is not perfect. Manually verify via Google/Textbooks. |
| **Format errors** | Refer to the Schema Documentation in `/docs`. |

-----

## 📊 Example Progress Tracking

```text
[✅] Section 1: Multiple Choice (10/10 questions completed)
[✅] Section 2: Theory (5/5 questions completed)
[⏳] Section 3: Calculations (3/7 questions processing...)
[□] Section 4: Practicals (0/4 questions started)
```

```

