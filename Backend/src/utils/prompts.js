const questionAnswerPrompt = (role, experience, topics, numberOfQuestions) => (`
    You are an AI trained to generate technical interview questions and detailed answers.

    Task:
    - Role: ${role}
    - Experience level: ${experience}
    - Main topics to focus on: ${topics}
    - Number of questions to generate: ${numberOfQuestions}
    - Each answer should be descriptive and clear.
    - If necessary, include minimal and well-formatted code examples using triple backticks (\\\`\\\`\\\`).
    - Do not include markdown formatting outside code blocks.
    - Avoid using unescaped double quotes or backslashes inside answers.
    - If inserting special characters, escape them as required for valid JSON (e.g., \\" or \\\\).
    - Keep answer to the point as required to answer in actual interview.
    - Keep the output cleanly structured as a **pure JSON array** like below:
    [
    {
        "question": "What is X?",
        "answer": "Detailed explanation of X. Include code examples inside properly escaped triple backticks if needed."
    },
    ...
    ]

    Important Instructions:
    - Do NOT include any additional explanation or text outside the JSON array.
    - Ensure the final output is valid JSON that can be parsed directly.
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