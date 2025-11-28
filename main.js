document.addEventListener('DOMContentLoaded', async function() {
 // Your code here
 console.log('DOM fully loaded and parsed');
 //Pro user function
 let signUrl = 'https://projectpq.name.ng/pro'; //signInPage
 
 //get variable to store the user.
 let theUser;
 
 if (!localStorage.getItem('projectpqprouser')) {
  //No user. Redirect to login
  // myAlert('follow', 'Please login', () => window.location.href = signUrl)
 }
 
 //get user and write him on script 
 theUser = JSON.parse(localStorage.getItem('projectpqprouser')); //Store the user 
 //let API_key = theUser.id|| '56655';
 let API_key = '56655';
 
 async function updateUser(user) {
  theUser = user;
  localStorage.setItem('projectpqprouser', JSON.stringify(user));
  
  // myAlert('confirmation', `You have successful recieved ${thePaper[0].code} ${thePaper[0].session}. \n And you have only ${theUser.tokens} tokens left! `)
 }
 
 
 
 /*

 //Day and Night theme Function
 let lightImg;
 let darkImg;
 lightImg = darkImg;

 function DayOrNigth() {
  if (document.body.classList.contains('dark')) {
   localStorage.setItem('theme', 'dark');
   Id("body").style.background = "#003366";
   Id("theme_icon").src = darkImg;
  } else {
   localStorage.setItem('theme', 'light');
   // Id("body").style.background = "#fff";
   Id("theme_icon").src = lightImg;
  }
 }

 //Night and Day mode
 const themeToggle = getElement('#themeToggle');

 // Check for saved user preference for theme
 if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.checked = true;
 }

 // Event listener to change theme
 themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  DayOrNigth();
 });
 DayOrNigth();
 */
 
 
 
 //Handle the Past Questions.
 let L = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
 let QuizAnswers = [];
 let userAnswer = [];
 
 let thePaper;
 let Topics = [];
 let allQuestions = [];
 
 //Custom functions
 const DOM = {
  get(selector, storeAs = null) { //get one
   const element = document.querySelector(selector);
   if (storeAs) {
    this[storeAs] = element;
   }
   return element;
  },
  
  getAll(selector, storeAs = null) { //get multiple 
   const elements = document.querySelectorAll(selector);
   if (storeAs) {
    this[storeAs] = elements;
   }
   return elements;
  }
 };
 //style elements
 function styleFunc(ele) { //Styling 
  return {
   set: function(pro, value) {
    ele.style[pro] = value;
    return this; // Return the object for chaining
   },
   addStyles: function(styles) {
    Object.assign(ele.style, styles);
    return this; // Return the object for chaining
   }
  };
 }
 //loading function
 var loadingFunc = {
  loader: DOM.get("#Loading"),
  start: () => styleFunc(loadingFunc.loader).set('display', 'block'),
  end: () => styleFunc(loadingFunc.loader).set('display', 'none'),
 }
 
 
 /*

 //Get the course and year from link
 const urlParams = new URLSearchParams(window.location.search);
 const PastCourse = urlParams.get('PastCourse');
 let PastYea = urlParams.get('PastYear');
 if (!PastCourse || !PastYea) {
  myAlert('follow', 'Please a course and session', () => window.location.href = '../')
 }
 console.log(`Displaying Course : ${PastCourse} for year : ${PastYea}`);

 let PastYear = PastYea.split('/').join('_');

 // Splits into ["2022", "2023"], then joins with "_"
 */
 
 //Get the question past first
 async function getPQ() {
  
  loadingFunc.start();
  try {
   /*
     if (!localStorage.getItem('thePaper')) {
      //No user. Redirect to login
      return myAlert('follow', 'Please select a course and any session', () => window.location.href = "../");
     }
     
     //extra the past question
     thePaper = JSON.parse(localStorage.getItem('thePaper')); //Store the user 
     //Display the past question
     pqRender.start(thePaper);
     */
   let res = await fetch('./PQ/view.json');
   thePaper = await res.json();
   
   pqRender.start(thePaper)
   //  Orderer(data.pq);
   //update the user object.
   // updateUser(data.user);
   //end loading 
   loadingFunc.end();
  } catch (e) {
   loadingFunc.end();
   if (e.message === 'Failed to failed') {
    myAlert('warning', 'Please check your internet connection and try again later.');
   } else {
    myAlert('warning', e.message);
   }
  }
 };
 
 const pqRender = {
  start: (array) => {
   /*Handles the response*/
   //reseting
   DOM.get('#Page').innerHTML = '<header id="header"></header>';
   QuizAnswers = [];
   nonObjQuizAnswers = [];
   userAnswer = [];
   nonObjAnswer = [];
   allQuestions = []
   
   //go through the each item
   array.forEach((item) => {
    switch (item.type) {
     case 'pageInfo': // Title
      pqRender.title(item);
      break;
     case 'Question': // Questions 
      pqRender.question(item);
      allQuestions.push(item);
      
      break;
     case 'Instruction': //Exam instruction(s)
      pqRender.instruction(item);
      break;
     case 'img': // images
      pqRender.img(item);
      break;
     case 'media': // Media 
      pqRender.media(item);
      break;
     case 'heading': // heading 
      pqRender.heading(item);
      break;
     case 'myAds': // my custom ads
      pqRender.ads(item);
      break;
     default: // the default act
    }
   });
   
   //Check if Equations are showing 
   pqRender.equation();
   //answer Button alive
   pqRender.showAns();
   //animation for overlay images 
   theAnim();
  },
  
  quiz: (array) => {
   /*Handles the response*/
   //reseting
   DOM.get('#Page').innerHTML = '<header id="header"></header>';
   QuizAnswers = [];
   nonObjQuizAnswers = [];
   userAnswer = [];
   nonObjAnswer = [];
   
   
   //go through the each item
   array.forEach((item) => {
    switch (item.type) {
     case 'pageInfo': // Title
      pqRender.title(item);
      break;
     case 'Question': // Questions 
      pqRender.question(item);
      break;
     case 'Instruction': //Exam instruction(s)
      pqRender.instruction(item);
      break;
     case 'myAds': // my custom ads
      pqRender.ads(item);
      break;
     default: // the default act
    }
   });
   
   //Check if Equations are showing 
   pqRender.equation();
   //answer Button alive
   pqRender.showAns();
   //animation for overlay images 
   theAnim();
  },
  
  //Make equations work
  equation: () => {
   if (window.MathJax) {
    MathJax.typesetPromise().catch(err => console.log(
     'MathJax error:', err));
   }
  },
  //Exam title 
  title: function(line) {
   if (line.kind === 'pureOBJ') {
    //show start Quiz button
    styleFunc(DOM.get('#quizBtn')).set('display', 'block')
   }
   //get the topics array
   Topics = line.Topics;
   //Create the exam title 
   let Title = `<h2 id='courseTitle'>${line.code} (${line.session})</h2>`;
   let Container = document.createElement('div');
   Container.id = 'paperTitle';
   //add the exam title to the DOM
   Container.innerHTML = Title;
   DOM.get('#header').appendChild(Container);
  },
  //Exam Questions 
  question: function(line) {
   //Question container 
   let question = document.createElement('div');
   question.className = 'question';
   //Question head and body
   question.innerHTML = `<h3 class='Question_Title'>${line.name}</h3>
            <p class="question_Text">
            ${line.Question.content}
            </p>`;
   //Quiz head and body
   let quizQuestion = document.createElement('div');
   quizQuestion.className = 'quizQuestion';
   quizQuestion.innerHTML =
    `<p>  <b class='Question_Title'> ${line.name} </b> : ${line.Question.content}</p>`;
   
   //Objective options
   if (line.Question.type === 'OBJ') {
    //Options container 
    let options = document.createElement('div');
    options.className = 'options';
    let quizOptions = document.createElement('div');
    quizOptions.className = 'quizOptions';
    
    //Arrangements of options
    for (let i = 0; i < line.Question.options.length; i++) {
     /*Question Options*/
     let oneOption = document.createElement('span');
     oneOption.innerHTML = `${L[i]}. ${line.Question.options[i]}`;
     options.appendChild(oneOption);
     
     /*Quiz Options*/
     // Create the radio input element
     const radioInput = document.createElement('input');
     radioInput.type = 'radio';
     radioInput.name = line.name;
     radioInput.value = line.Question.options[i];
     radioInput.id = `${line.name}_${i}`; // Adding index to make ID unique
     
     // Create the label element
     const label = document.createElement('label');
     label.htmlFor = radioInput.id;
     label.textContent = line.Question.options[i];
     
     // container for a quiz option
     let quizOptionContainer = document.createElement('div');
     quizOptionContainer.className = 'anOption';
     
     // Append all elements to the quizOptions container
     quizOptionContainer.appendChild(radioInput);
     quizOptionContainer.appendChild(label);
     //added to quiz options
     quizOptions.appendChild(quizOptionContainer);
     //Mark answer 
     if (line.Question.options[i] === line.Answer.content) {
      radioInput.className = 'correctAnswerOpt';
      quizOptionContainer.className = 'correctAnswer anOption';
     }
    }
    //Add options to the questions/quizs container
    question.appendChild(options);
    quizQuestion.appendChild(quizOptions);
   }
   
   /* The show answer button*/
   let ansBtn = document.createElement('button');
   ansBtn.className = 'ansBtn';
   ansBtn.innerText = '✅ Show Answer';
   //Make ans btn below answer 
   //question.appendChild(ansBtn);
   
   /*Hidden Answer*/
   let ANSH = document.createElement('div');
   ANSH.className = 'answer';
   ANSH.style.display = 'none';
   
   //Answer is just a text
   let ans = line.Answer.content;
   // Answer is an image
   if (line.Answer.type === 'img') {
    ans = `<img class = 'imgAns thumbnail' src='${line.Answer.content}' alt='${ line.Answer.alt}'/>`;
   }
   
   QuizAnswers.push(ans);
   
   let explainBtn = document.createElement('button');
   explainBtn.className = 'explainBtn';
   explainBtn.innerText = 'Explaination';
   explainBtn.onclick = () => {
    const commentBtn = DOM.get('#commentBtn');
    
    explainFunc(line.Explanation.content, line.Explanation
     .type);
    commentBtn.onclick = () => {
     const phoneNumber = '2349117624342'; // International format
     const message = `Hi, I have a comment on ${thePaper[0].code} Year ${thePaper[0].session}, ${line.name} : 
   _____`;
     
     window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
     );
    }
    if (window.MathJax) {
     MathJax.typesetPromise().catch(err => console.log(
      'MathJax error:', err));
    }
    
   }
   //Adds answer and explanation button to the Answer div
   ANSH.innerHTML = ans;
   ANSH.appendChild(explainBtn);
   //Adds answer div(ANSH) and answer button to the question div
   question.appendChild(ANSH);
   question.appendChild(ansBtn);
   
   /* Add the Quiz and question elements to the Question paper*/
   DOM.get('#Page').appendChild(question);
   DOM.get('#Page').appendChild(quizQuestion);
  },
  //Show Answers
  showAns: function() {
   let ansBtns = DOM.getAll('.ansBtn');
   let answers = DOM.getAll('.answer');
   let Qtns = DOM.getAll('.question');
   
   //Give all the buttons Life.
   for (let i = 0; i < ansBtns.length; i++) {
    ansBtns[i].onclick = () => {
     let ansView = answers[i].style.display;
     //Check if answer is already hidden
     if (ansView === 'grid') {
      answers[i].style.display = 'none';
      ansBtns[i].innerText = '✅ Show Answer';
      scrollTo(Qtns[i]);
     } else {
      setTimeout(() => {
       scrollTo(answers[i]);
      }, 100);
      answers[i].style.display = 'grid';
      ansBtns[i].innerText = '❌ Hide Answer';
     };
    }
   }
  },
  //Display Instructions
  instruction: function(line) {
   //create instructions container 
   let InstructionContainer = document.createElement('div');
   InstructionContainer.className = 'instruction';
   //Extract instruction/instructions
   let instructions = line.content;
   // check if more than one instructions
   let InstType = typeof instructions;
   if (InstType === 'string') {
    //one instruction
    InstructionContainer.innerHTML =
     `📌 <strong>Instruction:</strong> ${line.content} `;
   } else {
    //multiple instructions
    InstructionContainer.innerHTML = `<h3> 📌Instructions:</h3>`
    let instructionsC = document.createElement('ol');
    instructionsC.className = 'listOfInstruction';
    //Add all instructions 
    instructions.forEach((instruction) => {
     let anyInstruction = document.createElement('li');
     anyInstruction.innerHTML = instruction;
     instructionsC.appendChild(anyInstruction)
    });
    //Add instructions to instruction container 
    InstructionContainer.appendChild(instructionsC);
   }
   //Add instruction container  to visible DOM
   DOM.get('#header').appendChild(InstructionContainer);
  },
  
  // Display image
  img: function(line) {
   //Create image container, img element and the caption container.
   let imageContainer = document.createElement('div');
   let image = document.createElement('img');
   let imageCaption = document.createElement('div');
   //add the caption and give class name 
   imageCaption.innerHTML = line.Caption || 'Use the Image to answer Questions';
   imageCaption.className = 'imageCaption';
   //add the image 
   image.alt = line.alt || 'Fig X';
   image.className = 'Figure thumbnail';
   image.src = line.content;
   //Add to the image container 
   imageContainer.className = 'imageContainer';
   imageContainer.appendChild(image);
   imageContainer.appendChild(imageCaption);
   //Add to the DOM 
   DOM.get('#Page').appendChild(imageContainer);
  },
  //Display media
  media: function(line) {
   
  },
  //Display a heading
  heading: function(line) {
   //Create heading container, h2, text under heading
   let heading = document.createElement('header');
   let headingContainer = document.createElement('h2');
   let subHeadingContainer = document.createElement('span');
   //The main heading
   heading.className = 'heading';
   headingContainer.className = 'innerheading';
   headingContainer.innerHTML = line.heading;
   heading.appendChild(headingContainer);
   //if there is subheading
   if (line.Subheading) {
    subHeadingContainer.className = 'innerSubheading';
    subHeadingContainer.innerHTML = line.Subheading;
    heading.appendChild(subHeadingContainer);
    
   }
   DOM.get('#Page').appendChild(heading);
  },
 };
 
 let url = `https://procourses-v3yo.onrender.com/procourses/${API_key}`;
 //getPQ(`${url}/paper/${PastCourse}/${PastYear}`)
 await getPQ('./pq.jon');
 
 
 function randomItems(original, amount, shuffle) {
  // Make a copy of the original array to avoid modifying it
  const newArray = [...original];
  if (shuffle) {
   // Fisher-Yates shuffle algorithm
   for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
   }
  }
  // Return the first 'numberOfItems' elements
  return newArray.slice(0, amount);
 }; //select elements
 
 
 //For the GES quiz
 function enableGESQuiz(amount) {
  loadingFunc.start();
  //get all the questions
  let theQuestions = thePaper.slice(2); //Remove head
  theQuestions = randomItems(theQuestions, amount); //select elements
  
  let gesExam = [thePaper[0],
   thePaper[1],
   ...theQuestions
  ];
  //gesExam
  pqRender.start(gesExam);
  loadingFunc.end();
 }
 
 /*--- Take a break*/
 
 
 
 
 
 
 
 
 
 
 
 
 
 /*---------------Quiz Handler ----------*/
 //get the questions, options, Quiz questions 
 let normalQuestions = document.querySelectorAll('.question');
 let quizQuestions = document.querySelectorAll('.quizQuestion');
 let options = document.querySelectorAll('.anOption');
 
 
 //Request and Exit Quiz Buttons
 let quizBtn = getElement('#quizBtn');
 let exitQuizBtn = getElement('#exitQuizBtn');
 
 
 //functions
 // Configuration objects
 const question = {
  min: 1,
  max: normalQuestions.length,
  default: 6,
  interval: 5
 };
 const time = {
  min: 1,
  max: 60 * 4,
  default: 60,
  interval: 4
 };
 let quizPrefers = 3;
 
 // Main function to initialize the quiz settings
 function reqQuizSetting(questionConfig, timeConfig) {
  
  
  // Initialize elements
  const timeSlider = document.getElementById('timeSlider');
  const timeInput = document.getElementById('timeInput');
  const timePresetsContainer = document.getElementById('timePresets');
  const timeMinMarker = document.getElementById('timeMinMarker');
  const timeMaxMarker = document.getElementById('timeMaxMarker');
  
  const questionsSlider = document.getElementById('questionsSlider');
  const questionsInput = document.getElementById('questionsInput');
  const questionsPresetsContainer = document.getElementById('questionsPresets');
  const questionsMinMarker = document.getElementById('questionsMinMarker');
  const questionsMaxMarker = document.getElementById('questionsMaxMarker');
  
  const shuffleCheckbox = document.getElementById('shuffleQuestions');
  const startButton = document.getElementById('startQuizBtn');
  const cancelButton = document.getElementById('cancelQuizSettings');
  
  // Set up time configuration
  timeSlider.min = timeConfig.min;
  timeSlider.max = timeConfig.max;
  timeSlider.value = timeConfig.default;
  
  timeInput.min = timeConfig.min;
  timeInput.max = timeConfig.max;
  timeInput.value = timeConfig.default;
  
  timeMinMarker.textContent = `${timeConfig.min} min`;
  timeMaxMarker.textContent = `${timeConfig.max} mins`;
  
  // Generate time preset buttons
  generatePresetButtons(timePresetsContainer, timeConfig, 'time', timeConfig.default);
  
  // Set up questions configuration
  questionsSlider.min = questionConfig.min;
  questionsSlider.max = questionConfig.max;
  questionsSlider.value = questionConfig.default;
  
  questionsInput.min = questionConfig.min;
  questionsInput.max = questionConfig.max;
  questionsInput.value = questionConfig.default;
  
  questionsMinMarker.textContent = questionConfig.min;
  questionsMaxMarker.textContent = questionConfig.max;
  
  // Generate questions preset buttons
  generatePresetButtons(questionsPresetsContainer, questionConfig, 'questions', questionConfig.default);
  
  // Timer state update function
  function updateTimerState(value) {
   const time = parseInt(value, 10);
   
   // Update slider and input field values
   timeSlider.value = time;
   timeInput.value = time;
   
   // Update active state for preset buttons
   updateActivePresetButtons(timePresetsContainer, time);
   
   // Update slider track background
   updateSliderTrack(timeSlider, time, timeConfig.min, timeConfig.max);
  }
  
  // Questions state update function
  function updateQuestionsState(value) {
   const questions = parseInt(value, 10);
   
   // Update slider and input field values
   questionsSlider.value = questions;
   questionsInput.value = questions;
   
   // Update active state for preset buttons
   updateActivePresetButtons(questionsPresetsContainer, questions);
   
   // Update slider track background
   updateSliderTrack(questionsSlider, questions, questionConfig.min, questionConfig.max);
  }
  
  // Function to update the slider track color dynamically
  function updateSliderTrack(slider, value, min, max) {
   const percentage = ((value - min) / (max - min)) * 100;
   const color = `linear-gradient(to right, var(--blue) ${percentage}%, var(--transparentBlack) ${percentage}%)`;
   slider.style.background = color;
  }
  
  // Function to generate preset buttons
  function generatePresetButtons(container, config, type, defaultValue) {
   container.innerHTML = '';
   
   // Calculate number of preset buttons based on interval
   let numPresets = Math.floor((config.max - config.min) / config.interval) + 1;
   let previousValue = 4000;
   
   for (let i = 0; i < numPresets; i++) {
    let value = config.min + (i * config.interval);
    value = Math.round(value / 10) * 10;
    if (value < 1) {
     value = 1;
    }
    if (value <= config.max) {
     //No repeating 
     if (previousValue !== value) {
      const button = document.createElement('button');
      button.className = type === 'time' ? 'preset-btn' : 'questions-preset-btn';
      button.dataset[type] = value;
      button.textContent = type === 'time' ? `${value} mins` : value;
      
      // Mark the default value as active
      if (value === defaultValue) {
       button.classList.add('active');
       
      }
      
      container.appendChild(button);
      previousValue = value;
      
     }
    }
    
   }
  }
  
  // Function to update active state of preset buttons
  function updateActivePresetButtons(container, value) {
   const buttons = container.querySelectorAll('button');
   buttons.forEach(button => {
    const buttonValue = parseInt(button.textContent, 10);
    button.classList.toggle('active', buttonValue === value);
   });
  }
  
  // --- Event Listeners ---
  
  // Timer event listeners
  timeSlider.addEventListener('input', (e) => {
   updateTimerState(e.target.value);
  });
  
  timeInput.addEventListener('input', (e) => {
   let value = parseInt(e.target.value, 10);
   if (isNaN(value) || value < timeConfig.min) {
    value = timeConfig.min;
   }
   if (value > timeConfig.max) {
    value = timeConfig.max;
   }
   updateTimerState(value);
  });
  
  // Questions event listeners
  questionsSlider.addEventListener('input', (e) => {
   updateQuestionsState(e.target.value);
  });
  
  questionsInput.addEventListener('input', (e) => {
   let value = parseInt(e.target.value, 10);
   if (isNaN(value) || value < questionConfig.min) {
    value = questionConfig.min;
   }
   if (value > questionConfig.max) {
    value = questionConfig.max;
   }
   updateQuestionsState(value);
  });
  
  // Preset button event listeners (delegated)
  document.addEventListener('click', (e) => {
   if (e.target.matches('.preset-btn')) {
    updateTimerState(e.target.dataset.time);
   } else if (e.target.matches('.questions-preset-btn')) {
    updateQuestionsState(e.target.dataset.questions);
   }
  });
  
  // Control button event listeners
  startButton.onclick = () => {
   const time = Number(timeSlider.value);
   const questions = Number(questionsSlider.value);
   const shuffle = shuffleCheckbox.checked;
   myAlert('follow', `Starting quiz with ${questions} questions, ${time} minute timer, and shuffle ${shuffle ? 'enabled' : 'disabled'}!`);
   
   // Your quiz start logic goes here
   startQuiz({ questions, time, shuffle })
  };
  
  cancelButton.addEventListener('click', () => {
   styleFunc(DOM.get('#setTimeConBf')).set('display', 'none')
   alert('Settings selection cancelled');
   // Logic to close the component or modal
  });
  
  // Initial state setup
  updateTimerState(timeConfig.default);
  updateQuestionsState(questionConfig.default);
 }
 
 
 function reqQuiz() {
  reqQuizSetting(question, time);
  
  //permission to start the timer
  getElement('#setTimeConBf').style.display = 'block';
 }
 quizBtn.onclick = reqQuiz;
 
 function exitQuiz() {
  normalQuestions = document.querySelectorAll('.question');
  quizQuestions = document.querySelectorAll('.quizQuestion');
  options = document.querySelectorAll('.anOption');
  
  
  clearInterval(timerInterval); // Clear any existing timer
  //Make the interface to normal studying
  getElement('#quizBtn').style.display = 'block';
  getElement('#submitBtn').style.display = 'none';
  getElement('#exitQuizBtn').style.display = 'none';
  console.log('exit Quiz')
  getElement('#countdown').style.display = 'none';
  
  pqRender.start(thePaper);
  scrollTo(DOM.get('#header'));
  
  /*
  normalQuestions = document.querySelectorAll('.question');
  quizQuestions = document.querySelectorAll('.quizQuestion');
  options = document.querySelectorAll('.anOption');
  
  //remove correct and incorrect indicator 
  options.forEach((option) => option.style = 'background-color : transparent');
  //Display the normal questions
  normalQuestions.forEach((normalQuestion) => normalQuestion
   .style.display = 'block');
  //Hide the quiz questions
  quizQuestions.forEach((quizQuestion) => quizQuestion.style
   .display = 'none');
   */
 }
 exitQuizBtn.onclick = exitQuiz;
 
 const countdownDisplay = getElement('#countdown');
 const startBtn = getElement('#startBtn');
 let timeLeft; // 6 minutes in seconds
 let timerInterval;
 
 
 async function startQuiz(quizPrefers) {
  console.log('User set', quizPrefers)
  let quizPQ = allQuestions;
  
  quizPQ = randomItems(quizPQ, quizPrefers.questions, quizPrefers.shuffle);
  
  await pqRender.start([thePaper[0],
   thePaper[1],
   ...quizPQ
  ]);
  
  //Get settings first. Time, Questions, shuffle------
  let min = quizPrefers.time;
  
  
  
  
  
  // Render quiz
  getElement('#quizBtn').style.display = 'none';
  getElement('#submitBtn').style.display = 'block';
  getElement('#exitQuizBtn').style.display = 'block';
  
  normalQuestions = document.querySelectorAll('.question');
  quizQuestions = document.querySelectorAll('.quizQuestion');
  options = document.querySelectorAll('.anOption');
  
  
  options.forEach((option) => {
   let inputs = option.querySelectorAll('input');
   inputs.forEach((input) => input.checked = false);
   option.style = 'background-color : transparent'
  });
  
  normalQuestions.forEach((normalQuestion) => normalQuestion.style.display = 'none');
  
  quizQuestions.forEach((quizQuestion) => quizQuestion.style.display = 'block');
  
  
  
  //starting timer 
  
  //Display Count Down
  getElement('#countdown').style.display = 'grid';
  
  //convert to seconds
  timeLeft = min * 60;
  
  function updateCountDown() {
   const minutes = Math.floor(timeLeft / 60);
   const seconds = timeLeft % 60;
   
   // Add leading zeros if needed
   const display = `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
   countdownDisplay.style.backgroundColor = `#00FF6B`;
   countdownDisplay.textContent = display;
  }
  
  function startTimer() {
   updateCountDown();
   
   clearInterval(timerInterval); // Clear any existing timer
   
   timerInterval = setInterval(() => {
    timeLeft--;
    updateCountDown();
    let criticalMoment = min * 60 / 5;
    
    if (timeLeft < criticalMoment) {
     //critical moment
     countdownDisplay.style.backgroundColor = `red`;
    } else {}
    if (timeLeft <= 0) {
     //End of timer 
     clearInterval(timerInterval);
     countdownDisplay.textContent = "00:00";
     //submit Paper. says pens up!
     alert('Pens Up!');
     submitFunc();
    }
   }, 1000);
  }
  startTimer();
  
  //All codes ran
  getElement('#setTimeConBf').style.display = 'none';
  scrollTo(DOM.get('#header'));
  
 }
 
 //End Quiz
 getElement('#submitBtn').onclick = () => submitFunc();
 getElement('#closeResult').onclick = () => {
  scrollTo(DOM.get('#header'));
  getElement('#ResultDiv').style = 'display: none';
  
 };
 
 //get the user's answers
 async function submitFunc() {
  /*
  Get all the answers .
  Get all the user answer.
  Check correct and give score.
  */
  
  clearInterval(timerInterval); // Clear any existing timer
  
  //highlight correct answers 
  let options = DOM.getAll('.correctAnswer');
  options.forEach((option) => styleFunc(option).set('background-color', 'var(--cAns)'));
  
  
  // Score is zero by default 
  let score = 0;
  
  let quizOptions = DOM.getAll('.quizOptions');
  
  
  //get the selected answer 
  for (let i = 0; i < quizOptions.length; i++) {
   //selected option 
   let ans = quizOptions[i].querySelector('input:checked');
   let correctAns = await quizOptions[i].querySelector('.correctAnswerOpt');
   
   //the text
   let label;
   
   if (ans) {
    userAnswer[i] = ans;
    label = ans.parentElement;
    if (userAnswer[i] !== correctAns) {
     label.style = 'background : red';
    }
   } else {
    userAnswer[i] = 'null';
   }
   
   //check if correct 
   if (userAnswer[i] === correctAns) {
    score++;
   }
  };
  
  
  /*
  //Check if answer is correct 
  for (let i = 0; i < quizQuestions.length; i++) {
    if (userAnswer[i] === QuizAnswers[i]) {
      score++;
    } else {}
  }
  */
  //Display results
  const totalQuestions = quizOptions.length;
  const correctAnswers = score;
  const percentage = (correctAnswers / totalQuestions) * 100;
  
  //Text presentation 
  getElement('#correctAnswers').innerText =
   correctAnswers;
  getElement('#totalQuestions').innerText =
   totalQuestions;
  document.querySelector('.correct').innerHTML = correctAnswers;
  document.querySelector('.incorrect').innerHTML = totalQuestions -
   correctAnswers;
  
  // Update circle animation
  let cir = 2 * Math.PI * 40;
  document.querySelector('.circle-fill').style.strokeDashoffset = cir - (percentage / 100) * cir;
  let remark;
  if (percentage > 68) {
   remark = 'Great job! 🎉';
  } else if (percentage > 40) {
   remark = 'Try Harder👍🏽';
  } else {
   remark = "That's a bad score 🤦🏽‍♂️";
   
  }
  
  document.querySelector('.score-text').innerText = remark;
  getElement('#ResultDiv').style = 'display: flex';
  getElement('#submitBtn').style = 'display: none';
 }
 
 //Animations
 function theAnim() {
  //Variables
  const thumbnails = document.querySelectorAll(`.thumbnail`);
  const popupOverlay = getElement('#popupOverlay');
  const popupImage = getElement('#popupImage');
  const closeBtn = getElement('#closeBtn');
  const loadingSpinner = getElement('#loadingSpinner');
  
  
  // Add click event to each thumbnail with animation
  thumbnails.forEach(thumbnail => {
   thumbnail.onclick = () => {
    popupImage.src = thumbnail.src;
    popupImage.alt = thumbnail.alt;
    
    // Show loading spinner
    loadingSpinner.style.display = 'block';
    
    // Display the popup overlay with animation
    popupOverlay.style.display = 'flex';
    setTimeout(() => {
     popupOverlay.classList.add('active');
     
    }, 10);
    
    // Set the popup image source
    popupImage.onload = () => {
     loadingSpinner.style.display = 'none';
    };
    
    // Prevent scrolling on the body when popup is open
    document.body.style.overflow = 'hidden';
   }
  });
  
  // Close popup with animation
  function closePopup() {
   popupOverlay.classList.remove('active');
   setTimeout(() => {
     popupOverlay.style.display = 'none';
     document.body.style.overflow = 'auto';
    },
    300);
  }
  
  // Close popup when close button is clicked
  closeBtn.addEventListener('click',
   function() {
    closePopup();
   });
  
  // Close popup when clicking outside the image
  popupOverlay.addEventListener('click',
   (e) => {
    if (e.target === popupOverlay) {
     closePopup();
    }
   });
  
  // Close popup when pressing Escape key
  document.addEventListener('keydown',
   function(e) {
    if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
     closePopup();
    }
   });
 }
 
 //Explaintion
 //Our control handles
 const explanationContainer = getElement('#explanationContainer');
 const xExplainBtn = getElement('#xExplain');
 const explainDiv = getElement('#explanationContent');
 
 
 //Functions
 function showExplanation() {
  explanationContainer.style = 'display: grid';
  document.body.style.overflow = 'hidden';
  
 }
 
 function XExplanation() {
  document.body.style.overflow = 'auto';
  explanationContainer.style = 'display: none';
  explainDiv.innerHTML = ' ';
 }
 
 //Handling the Explanation types
 function explanationIsString(TheExp) {
  explainDiv.innerHTML = TheExp;
 }
 
 function explanationIsImg(TheExp) {
  explainDiv.style = 'display: grid';
  let TheExpImg = document.createElement('img');
  TheExpImg.className = 'explainImg';
  TheExpImg.src = TheExp;
  explainDiv.appendChild(TheExpImg);
 }
 
 function explanationIsImgs(TheExp) {
  TheExp.forEach((img) => explanationIsImg(img));
 }
 
 function explanationIsVideo(TheExp) {
  // Create the video element
  const video = document.createElement('video');
  video.controls = true;
  video.className = 'explainVid';
  
  // Create the source element
  const source = document.createElement('source');
  source.src = TheExp;
  source.type = 'video/mp4';
  
  // Append the source to the video
  video.appendChild(source);
  
  // Append the video to the document body (or any other element)
  explainDiv.appendChild(video);
 }
 
 function explanationIsYoutubeVid(TheExp) {
  
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${TheExp}`;
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.className = 'explainVid';
  // Append elements
  explainDiv.appendChild(iframe);
 }
 
 
 function explainFunc(content, type) {
  loadingFunc.start()
  explainDiv.innerHTML = ' ';
  switch (type) {
   case 'string':
    explanationIsString(content);
    break;
   case 'img':
    explanationIsImg(content);
    break;
   case 'imgs':
    explanationIsImgs(content);
    break;
   case 'video':
    explanationIsVideo(content);
    break;
   case 'youtubeVideo':
    explanationIsYoutubeVid(content);
    break;
   default:
    console.log('unknown Explanation format');
  }
  //Display the explanation.
  showExplanation();
  theAnim();
  loadingFunc.end();
 }
 
 xExplainBtn.onclick = XExplanation;
 xExplainBtn.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAFhSURBVGiB7ZgxTgMxEEW/d88A8QEQEuISHIL1HSi4Bg09DTdIBeIA3IKOPqJIT8AeGppEm+V7PQ5gzSsjzR//zaz914BhGIZhGDwCdBK8yOXRdfVeYXEjwYsM6NkaRwkP6OH851bhckXV5iLBy9YPy1XvgPRTXUep75gYbajAqGbwkanljEi6pRvPZK+WRGqU6fGYWnTpmGloZy2ghhktzezmmmY0tX7tKWr/u7Nnu2QhNUb04C9prU2j+FDLWVjNnU/ldGYWWNMEoGQEmH84akUd1byUa0Yzr6kHP9aMdug8TILdbVohOXOh8R9gozVGEy97E9tvEwdiExGlidDYRIxv4sOqiU/dJi4f/vp1EJW1ZFg8lzaaYkpDhuM7RoO8MnUXuQvIZa+W666Yes7I++acblzAqOYmnTC1lBH3uH5BjKcAkFK6r3UTD3ybEXkCAMSPM/fw9lqrl2EYhmE0xxdPjuZmUX53AAAAAABJRU5ErkJggg==';
 
 //my custom selector
 //scrolling function 
 function scrollTo(targetElement) {
  targetElement.scrollIntoView({
   behavior: 'smooth',
   block: 'center'
  });
 }
 
 function getElements(ele) { return document.querySelectorAll(ele) };
 
 function getElement(ele) { return document.querySelector(ele) };
 
 function myAlert(kind, message, okFunction = null) {
  const overlay = document.getElementById('alertOverlay');
  const header = document.getElementById('alertHeader');
  const icon = document.getElementById('alertIcon');
  const title = document.getElementById('alertTitle');
  const body = document.getElementById('alertMessage');
  const footer = document.getElementById('alertFooter');
  
  // Clear previous buttons
  footer.innerHTML = '';
  
  // Set message
  body.textContent = message;
  
  // Configure based on kind
  switch (kind) {
   case 'info':
    header.className = 'alertHeader info';
    icon.textContent = 'ℹ️';
    title.textContent = 'Information';
    addButton('OK', 'infoButton', () => hideAlert());
    break;
    
   case 'warning':
    header.className = 'alertHeader warning';
    icon.textContent = '⚠️';
    title.textContent = 'Warning';
    addButton('OK', 'warningButton', () => hideAlert());
    break;
    
   case 'follow':
    header.className = 'alertHeader confirmation';
    icon.textContent = 'ℹ️';
    title.textContent = 'Note';
    addButton('OK', 'infoButton', () => {
     if (okFunction) okFunction();
     hideAlert();
    });
    break;
    
   case 'confirmation':
    header.className = 'alertHeader confirmation';
    icon.textContent = '❓';
    title.textContent = 'Confirm';
    addButton('Cancel', 'cancelButton', () => hideAlert());
    
    addButton('OK', 'confirmButton', () => {
     if (okFunction) okFunction();
     hideAlert();
    });
    break;
    
   default:
    header.className = 'alertHeader info';
    icon.textContent = 'ℹ️';
    title.textContent = 'Alert';
    addButton('OK', 'infoButton', () => hideAlert());
  }
  
  // Show the alert
  overlay.style.display = 'flex';
  
  function addButton(text, className, onClick) {
   const button = document.createElement('button');
   button.className = `alertButton ${className}`;
   button.textContent = text;
   button.addEventListener('click', onClick);
   footer.appendChild(button);
  }
  
  function hideAlert() {
   overlay.style.display = 'none';
  }
 }
});