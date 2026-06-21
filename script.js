const questions = [
{
question:"What does HTML stand for?",
options:["Hyper Text Markup Language","Home Tool Markup Language","Hyper Transfer Markup Language","Hyperlinks Text Mark Language"],
answer:0
},
{
question:"Which language is used for styling web pages?",
options:["Java","Python","CSS","C++"],
answer:2
},
{
question:"Which language adds interactivity to websites?",
options:["HTML","CSS","JavaScript","SQL"],
answer:2
},
{
question:"Which tag is used to create a hyperlink?",
options:["<link>","<a>","<href>","<url>"],
answer:1
},
{
question:"What does CSS stand for?",
options:["Creative Style Sheets","Cascading Style Sheets","Computer Style System","Colorful Style Sheets"],
answer:1
},
{
question:"Which company developed JavaScript?",
options:["Google","Microsoft","Netscape","Apple"],
answer:2
},
{
question:"Which method selects an element by ID?",
options:["querySelector()","getElementById()","getElementsByClassName()","selectById()"],
answer:1
},
{
question:"Which symbol is used for comments in JavaScript?",
options:["//","#","<!-- -->","**"],
answer:0
},
{
question:"Which HTML tag is used for images?",
options:["<img>","<image>","<pic>","<src>"],
answer:0
},
{
question:"Which property changes text color in CSS?",
options:["font-color","text-color","color","background-color"],
answer:2
}
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    loadQuestion();
});

function loadQuestion(){

    clearInterval(timer);

    const q = questions[currentQuestion];

    document.getElementById("counter").innerText =
    `Question ${currentQuestion + 1} of ${questions.length}`;

    let progress =
    ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progress-bar").style.width =
    progress + "%";

    questionEl.textContent = q.question;

    optionsEl.innerHTML = "";

    q.options.forEach((option,index)=>{

        const btn = document.createElement("button");

        btn.innerText = option;
        btn.classList.add("option");

        btn.onclick = () => {

            document.querySelectorAll(".option").forEach(button=>{
                button.disabled = true;
            });

            if(index === q.answer){
                btn.classList.add("correct");
                score++;
            }
            else{
                btn.classList.add("wrong");
                document.querySelectorAll(".option")[q.answer]
                .classList.add("correct");
            }
        };

        optionsEl.appendChild(btn);
    });

    startTimer();
}

function startTimer(){

    timeLeft = 15;

    document.getElementById("timer").innerText = timeLeft;

    timer = setInterval(()=>{

        timeLeft--;

        document.getElementById("timer").innerText = timeLeft;

        if(timeLeft <= 0){
            clearInterval(timer);

            currentQuestion++;

            if(currentQuestion < questions.length){
                loadQuestion();
            }
            else{
                showResult();
            }
        }

    },1000);
}

nextBtn.addEventListener("click",()=>{

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    }
    else{
        showResult();
    }

});

function showResult(){

    clearInterval(timer);

    quizScreen.style.display = "none";
    resultScreen.style.display = "block";

    let message = "";

    if(score >= 9){
        message = "🏆 Excellent!";
    }
    else if(score >= 7){
        message = "🎉 Great Job!";
    }
    else if(score >= 5){
        message = "👍 Good Effort!";
    }
    else{
        message = "📚 Keep Practicing!";
    }

    document.getElementById("score").innerHTML =
    `${message}<br><br>Your Score: ${score}/${questions.length}`;
}
