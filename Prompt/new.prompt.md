

From the image/text I sent return an array of JSON objects that I can copy and matches the scheme.
Make the explanation:
      1. Sstep by step and detailed
      2. Easy to understand by newbies.
      3. Look good and readable with the help of necessary html elements and css.
Keep the answers as short as possiblie (max 3 lines) use <br> to make line breaks don't use ""\n"
      
**CRITICAL INSTRUCTIONS:**
1. Break down each multi-part question into individual JSON objects for EVERY sub-part
2. For the Question `content` field, create complete, self-contained questions by:
- Removing the "A)", "B)", "i)", "ii)" prefixes from the question text
- Rephrasing sub-parts into full, grammatically complete questions
- Example: Instead of "i) Definition and occurrence" use "Write on carbohydrate with respect to Definition and occurrence"
3. For the Answer `content` field, provide only the direct answer without repeating the question structure
4. Use consistent naming in the `name` field: "Question 1a)i", "Question 1a)ii", etc.

```json
{
  "type": "Question",
  "name": "Question 70",
  "topic": [
    "Mammals",
    "Primates",
    "Evolution"
  ] ,
  "Question": {
    "content": "Primates first evolved from a small group of arboreal mammals called _______.",
    "type": "OBJ",
    "options": [
      "Homo sapiens",
      "Archonta",
      "Archontasis",
      "Homo erectus"
    ]
  },
  "Answer": {
    "type": "string",
    "content": "Archonta"
  },
  "Explanation": {  
    "type": "string",
    "content": "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Primate Origins</h4>\n <p>The solution key indicates the answer is <strong>B (Archonta)</strong>.</p>\n <div style='margin-bottom: 12px;'>\n <strong style='color: var(--strongColor);'>Classification</strong><br>\n Archonta is a superorder that traditionally groups Primates with Bats (Chiroptera), Colugos (Dermoptera), and Tree Shrews (Scandentia), suggesting a common arboreal ancestor.\n </div>\n</div>"
  }
},

```

use topics from here in the topic property.(topics can be more than the ones here.)
```json
"topics": [
"Dormancy",
"Biology",
"Birds",
"Skeleton",
"Feathers",
"Mammals",
"Primates"
],
```
For headings
```josn
{
"type": "heading",
"heading": "This is the heading",
"Subheading": "This is the sub-heading"
},
```
topic array can be more than one and outside the topics I provided .

Use this css root
```css
/*our colors*/
:root {
--mainBlue: #003d99;
--blue: #4361ee;
--readBlue: #001111;
--darkReadBlue: #162B4A;
--lightBlue: #5BD3FD;
--dullBlue: #0086c5;
--darkTheme: #003366;
--greenBg: #26D200;
--greenCBg: #8AEC74;
--greenBgL: #f6ffed;
--greenText: #013510;
--red: #f44336;
--white: #fff;
--darkWhite: #f5f7fa;
--whiteTransBorder: #ffffff33;
--transparentBlack: rgba(0, 0, 0, 0.1);
--overBlack: #000000E0;
--ash: #333;
--lightAsh: #AFB4BB;
--transparentLightAsh: #AFB4BB17;
--black: #000;
--yellow: #FFF9C4;
--orange: #F37A12;
--orangeBgL: #FFE6D0;
--orangeBgD: #AC8B66;
}

/*Default theme*/
:root {
--strongColor: var(--mainBlue);
--overlay: var(--overBlack);
--loadRingBr: var(--whiteTransBorder);

--instBg: var(--yellow);
--questionBlue: var(--lightBlue);
--cAns: var(--greenBg);
--icAns: var(--red);

--ansT: var(--greenText);
--ansBtnBg: var(--transparentBlack);
--SQbtn: var(--bodyTextColor);

}

html {
color-scheme: light dark;
}

@media (prefers-color-scheme:light) {
:root {
--themeSliderBg: var(--lightBlue);
--instCl: var(--bodyTextColor);
--bodyTextColor: var(--readBlue);
--bodyBackground: var(--white);
--explainBg: var(--darkWhite);
--explainColor: var(--darkReadBlue);
--ansL: var(--white);
--ansD: var(--greenCBg);
--warningBg: var(--orangeBgL);
--infoBg: lightSkyBlue;
--infoCl: var(--dullBlue);

--preset-bg-color: var(--transparentLightAsh);

}
}
@media (prefers-color-scheme:Dark) {

/* The Dark theme */
:root {
--transparentBlack: var(--transparentLightAsh);
--themeSliderBg: var(--lightAsh);
--instCl: var(--bodyBackground);
--bodyTextColor: var(--white);
--bodyBackground: var(--darkTheme);
--explainBg: var(--bodyBackground);
--explainColor: var(--bodyTextColor);
--ansL: var(--greenBg);
--ansD: var(--greenBg);
--warningBg: var(--orangeBgD);
--infoBg: var(--strongColor);
--infoCl: var(--bodyTextColor);
--preset-bg-color: var(--ash);
}
}
```
use MathJax syntax \\( \\)for equations and chemical reactions to make it more readable. use as little as possible.

break the equation into different lines, avoid long lines of equations
use necessary html elements.
Use the css variables root given for colors.

IF it's a subjective question then change "type": "OBJ" to "type":"subjective"
and remove options property.
let answers just be the final answer.

Remove the (a), (b), etc... the app will label the options by itself.

And don't skip any question!
