import * as React from "react";
import * as ReactDOM from "react-dom/client"
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";
import {getAll, getRandomQuiz} from "./quizzes";
const root = ReactDOM.createRoot(document.getElementById("app"));
import {useState} from "react";
const QUIZ=getAll();

function FrontPage()
{
    console.log(QUIZ);
    return (<div>
        <h1>
            Quiz
        </h1>
            <li><Link to="/quiz">New Quiz</Link></li>
            <li><Link to="/quiz/new">Make New Quiz</Link></li>
            <li><Link to="/quiz/all">Show all questions</Link></li>

    </div>);
}


function Application()
{

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}></Route>
            <Route path="/quiz" element={<DisplayQuiz/>}>  </Route>
            <Route path="/quiz/new" element={<AddNewQuestion />}>  </Route>
            <Route path="/quiz/all" element={<DisplayAll quiz={QUIZ}/> }>  </Route>

        </Routes>
    </BrowserRouter>
}

root.render(
    <Application/>
);
function DisplayAll({quiz})
{
    return <>
        <h1>All questions</h1>
        {
            quiz.map(q =>
                <>
                    <h2>{q.question}</h2>
                        <div>{q.answer1}  | {q.answer2}</div>
                        <div>{q.answer3}  | {q.answer4}</div>
                        <div>{q.correctAnswer}</div>
                </>
        )}
    </>
}

function DisplayQuiz() {


    const quiz=getRandomQuiz();
    this.answer=quiz.correctAnswer;

    const navigate=useNavigate();

    function checkAnswer(e,id,answer)
    {
        e.preventDefault();
        {
            if (id===answer)
            {
                alert("Correct");
                navigate("/quiz");

            } else {
                alert("incorrct try again");
            }
        }

    }
    return (
        <><div>{quiz.question}</div>
            <button  onClick={e => checkAnswer( e,quiz.correctAnswer,1)}>{quiz.answer1}</button>
            <button  onClick={e => checkAnswer( e,quiz.correctAnswer,2)}>{quiz.answer2}</button>
            <button  onClick={e => checkAnswer( e,quiz.correctAnswer,3)}>{quiz.answer3}</button>
            <button  onClick={e => checkAnswer(e, quiz.correctAnswer,4)}>{quiz.answer4}</button>
        </>);
}

function AddNewQuestion()
{
    const [question,setQuestion] = useState("sdaf");
    const [ans1,setAns1] = useState("asdf");
    const [ans2,setAns2] = useState("asdf");
    const [ans3,setAns3] = useState("sd");
    const [ans4,setAns4] = useState("asdf");
    const [correctAnswer,setCorrectAnswer] = useState(1);

    const navigate=useNavigate();
    function handleSubmit(e ){
        e.preventDefault();
        QUIZ.push(question,ans1,ans2,ans3,ans4,correctAnswer);
        navigate("/");
    }
    return(
      <form onSubmit={handleSubmit}>
        <>
            <div><label> Question: <input value={question}  onChange={e => setQuestion(e.target.value)}/></label></div>
            <div><label> Answer 1: <input value={ans1} onChange={e => setAns1(e.target.value)}/></label></div>
            <div><label> Answer 2: <input value={ans2}  onChange={e => setAns2(e.target.value)}/></label></div>
            <div><label> Answer 3: <input value={ans3}  onChange={e => setAns3(e.target.value)}/></label></div>
            <div><label> Answer 4: <input value={ans4}  onChange={e => setAns4(e.target.value)}/></label></div>
            <div><label> Correct number: <input value={correctAnswer}  onChange={e => setCorrectAnswer(Number(e.target.value))}/></label></div>
            <button>Submit</button>
          </>
      </form>
    );
}


/**
 * Argument type {ans3: string, ans2: string, ans4: string, question: string, ans1: string, correctAnswer: number} is not assignable to parameter type
 *               {question: string, answer3: string, answer2: string, answer4: string, correctAnswer: number, answer1: string} |
 *               {question: string, answer3: string, answer2: string, answer4: string, correctAnswer: number, answer1: string} |
 *               {question: string, answer3: string, answer2: string, answer4: string, correctAnswer: number, answer1: string} |
 *               {question: string, answer3: string, answer2: string, answer4: string, correctAnswer: number, answer1: string}
 *  Inspection info: Reports a JavaScript call expression where the arguments do not match the signature of the referenced function, including the types of arguments and their number. Also, reports if the overloading function doesn't match the overloaded one in terms of parameters and return types.
 * TypeScript code is ignored.
 */