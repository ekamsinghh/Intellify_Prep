const { GoogleGenAI } = require('@google/genai');
const { GEMINI_API_KEY }= require('../config/index');
const { questionAnswerPrompt, conceptExplanationPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const generateInterviewQuestions = async (req,res) => {
    try{
        const { role, experience, topics, numberOfQuestions } = req.body;

        if(!role || !experience || !topics || !numberOfQuestions){
            return res.status(400).json({
                message: "Missing required fields",
                data: {},
                success: false,
                error: "Information Missing"
            });
        };

        const prompt= questionAnswerPrompt(role, experience, topics, numberOfQuestions);
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-lite',
            contents: prompt,
        });

        const content=response.text;

        const json_content=content.replace(/^```json\s*/,"")// for removing starting ```json
        .replace(/```$/,"")// for removing ending ```
        .trim();// for removing extra spaces

        const data= JSON.parse(json_content);
        return res.status(200).json({
            message: "Questions generated successfully",
            data: data,
            success: true,
            error: {}
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Failed in generating questions",
            data: {},
            success: false,
            error: err.message || "Server Side Error"
        });
    }
}

const generateConceptExplanation = async (req,res) => {
    try{
        const { question } = req.body;

        if(!question){
            return res.status(400).json({
                message: "Missing required fields",
                data: {},
                success: false,
                error: "Information Missing"
            });
        };

        const prompt= conceptExplanationPrompt(question);
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-lite',
            contents: prompt,
        });

        const content=response.text;

        const json_content=content.replace(/^```json\s*/,"")// for removing starting ```json
        .replace(/```$/,"")// for removing ending ```
        .trim();// for removing extra spaces

        const data= JSON.parse(json_content);
        return res.status(200).json({
            message: "Explanation generated successfully",
            data: data,
            success: true,
            error: {}
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Failed in generating explanation",
            data: {},
            success: false,
            error: err.message || "Server Side Error"
        });
    }
}

module.exports = {
    generateInterviewQuestions,
    generateConceptExplanation
};