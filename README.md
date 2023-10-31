# JavaScript Code Quiz

## Description

This timed practice quiz allows user to test their JavaScript knowledge. However, this quiz can easily be updated with questions on another subject, so that users can continue to test their knowledge.

This was honestly an overwhelming project, and I learned a lot. I had to really learn how to break this down into smaller steps, and then into even smaller steps.

## Installation

Access the code quiz [here](https://torfirst.github.io/code-quiz/). A web browser is required to access the password generator. 

## Usage

Go to https://torfirst.github.io/code-quiz/ to view the code quiz. To take the quiz, click on "Start Quiz," which will initiate a timer countdown of 60 seconds. Every correct answers gives 10 points, and every wrong answer takes away 10 points and subtracts 10 seconds from the remaining time. Users cannot get a score lower than a 0. At the end of the quiz, users can put their initials in and save their high score to the leaderboard.

Note: The score with 1 question wrong is 30; see below (right side is the cumulative total):
Q1 +10 = 10 
Q2 -10 = 0
Q3 +10 = 10 
Q4 +10 = 20 
Q5 +10 = 30

![This is what the leaderboard looks like with some high scores saved.](/assets/images/Leaderboard.png)

## Credits

I borrowed the questions and layout from the gif that was provided as a reference. It can be found in the assets folder and looks like this. ![Homework Demo Gif](/assets/images/04-web-apis-homework-demo.gif). I also received some guidance from a BCS tutor, David Elutilo, who helped me understand how to apply the dynamic HTML to switch from the intro text into the questions, and gave me advice on how to approach the displayNextQuestion function.

I used [this link](https://www.geeksforgeeks.org/how-to-create-css-rule-for-all-elements-except-one-class/#) to figure out how to target all elements except for one for button styling. I used [this link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) and [this link](https://www.w3schools.com/js/js_function_parameters.asp) for the checkAnswer function. I also looked to the mini project from the Web APIs week for guidance.

## License
 
License in repo. 