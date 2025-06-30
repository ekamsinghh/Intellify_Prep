const questionAnswerPrompt = (role, experience, topics, numberOfQuestions) => (`
    You are an AI trained to generate technical interview questions ans answers.

    Task:
    -Role: ${role}
    -Experience: ${experience}
    -Main topics to focus on: ${topics}
    -Number of questions to generate: ${numberOfQuestions}
    -For each question generate a detailed answer.
    -If answer requires a code example, add the required code block to explain the concept.
    -Keep Formatting very clean and give to the point answers.
    -Return a pure json array like:
    [
        {
            "question": "Question 1",
            "answer": "Answer 1"
        },
        {
            "question": "Question 2",
            "answer": "Answer 2"
        }
        ...
    ]

    Important Instruction: Do not add any extra text. only return valid JSON of the type aforementioned.
    Also,don't give lengthy answers.
`);

const conceptExplanationPrompt = (question) => (`
    You are an AI trained to explain concepts for the given interview questions.

    Task:

    -Explain the following interview question and it's concept in depth as if you're teaching a beginner developer.
    -Question: ${question}
    -After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    -If answer requires a code example, add the required code block to explain the concept.
    -Keep Formatting very clean.
    -Return a pure json object like:
    {
        "title": "Short title here?",
        "explanation": "Explanation here."
    }

    Important: Do not add any extra text outside the json format. Only return valid JSON.
`);

module.exports = { 
    questionAnswerPrompt,
    conceptExplanationPrompt 
};