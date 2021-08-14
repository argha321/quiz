const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice"));
const box=document.querySelector(".questionbox");
const scoreText=document.getElementById("score");
const scores=document.querySelector("#scores");
const dots=document.querySelectorAll(".dot");
let a=document.getElementById("a");
let b=document.getElementById("b");
let c=document.getElementById("c");
let d=document.getElementById("d");
let i=0;
var timeLeft=10;
var timer=document.getElementById("time");
let currentQuestion={};
let accept=false;
let score=0;
let questioncounter=0;
let avq=[];

let questions=[
    {
        question:"Which program is used by web clients to view the web pages?",
        choice1:"Web browser",
        choice2:"protocal",
        choice3:"web server",
        choice4:"All the above",
        answer:1
    },
    {
        question:"HTML allows us to use ___ levels of headings.",
        choice1:"Two",
        choice2:"Four",
        choice3:"Five",
        choice4:"six",
        answer:4
    },
    {
        question:"Which tag is used to provide additional information about the page that is not visible in the browser?",
        choice1:"Anchor tag",
        choice2:"Mega tag",
        choice3:"Comment tag",
        choice4:"Body tag",
        answer:2
    },
    {
        question:"Who is Known as the father of World Wide Web (WWW)?",
        choice1:"Robert Cailliau",
        choice2:"Tim Thompson",
        choice3:"Charles Darwin",
        choice4:"Tim Berners-Lee",
        answer:4
    },
    {
        question:"CSS stands for -",
        choice1:"Cascade style sheets",
        choice2:"Color and style sheets",
        choice3:"Cascading style sheets",
        choice4:"None of the above",
        answer:3
    }
];

const CORRECT_ANS=10;
const MAX_QUESTION=questions.length;

startGame=()=>{
    
   questioncounter=0;
    score=0;
    avq=[...questions];
    time();
    getNewQuestion();
};

getNewQuestion=()=>{
    
    if(i<5){
    dots[i].style.backgroundColor="green";
    }
    questioncounter++;
    const questionIndex=Math.floor(Math.random()*avq.length);
    currentQuestion=avq[questionIndex];
    console.log(avq.length);
    if(avq.length<1){
        
        box.style.display="none";
        scores.classList.add("finalscore");
        for(let i=0;i<MAX_QUESTION;i++)
        {
            dots[i].style.display="none";
        }
        timer.style.display="none";
        
    }
    else if(avq.length>=1){
    question.innerText=currentQuestion.question;
    
    i++;
    choices.forEach(choice=>{
        const number=choice.dataset["number"];

        choice.innerText=currentQuestion["choice"+number];
    });
    }
    avq.splice(questionIndex,1);
    accept=true;
};


choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
        if(!accept) return;
       timer.style.display="none";
       timeLeft=10;
        accept=true;
        const seletChoice=e.target;
        const selectedAnswer=seletChoice.dataset["number"];

        const answercheck=selectedAnswer==currentQuestion.answer?"correct":"incorrect";

        if(answercheck=="correct"){
            incrementScore(CORRECT_ANS)
            
        }
        if(answercheck=="incorrect"){
          switch(currentQuestion.answer)
          {
              case 1:a.classList.add("correct");
                     break;
              case 2:
                b.classList.add("correct");
                 break;
            case 3:
                c.classList.add("correct");
                 break;
            case 4:d.classList.add("correct");
            break;
          }
        }
        seletChoice.parentElement.classList.add(answercheck);
        setTimeout(()=>{
            
            seletChoice.parentElement.classList.remove(answercheck);
            if(answercheck=="incorrect"){
                switch(currentQuestion.answer)
                {
                    case 1:a.classList.remove("correct");
                           break;
                    case 2:
                      b.classList.remove("correct");
                       break;
                  case 3:
                      c.classList.remove("correct");
                       break;
                  case 4:d.classList.remove("correct");
                  break;
                }
              }
              
              timer.style.display="block";
              timer.style.color="black";
            getNewQuestion();
            
        },1000);        
    });

    
});




incrementScore=num=>{
    score+=num;
    scoreText.innerText=score;

};

startGame();

//timer
function time(){


var timeId=setInterval(countdown,1000);
function countdown(){
    if(timeLeft==-1)
    {
        timeLeft=10;
        timer.style.color="black";
        doit();
    }
    
    else{
        if(timeLeft<5){
            timer.style.color="red";
        }
        timer.innerText='Time-' + timeLeft + 'S';
        timeLeft--;
    }
}
}
function doit(){
    getNewQuestion();
}
