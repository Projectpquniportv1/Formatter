
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

