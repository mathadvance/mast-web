import Question from "./Question"

export const bgQuestions: Question[] = [ // Background questions
    {
        question: "How did you find out about the program?",
        placeholder: "Around 1 sentence...",
        category: "background",
        answer: "discover",
    },
    {
        question: "If you are comfortable with sharing, what state are you from?",
        placeholder: "State or country...",
        desc: `If you are not comfortable sharing this information, please input "Prefer not to answer."`,
        category: "background",
        answer: "location"
    },
    {
        type: "textarea",
        question: "What got you interested in mathematics?",
        placeholder: "A short paragraph...",
        category: "background",
        answer: "interest"
    },
    {
        type: "textarea",
        question: "What do you hope to gain from MAST?",
        placeholder: "A short paragraph...",
        category: "background",
        answer: "gain",
    }
]

export const contestQuestions: Question[] = [ // Contest questions
    {
        question: "Most recent AMC scores (A/B)",
        placeholder: "Indicate the year and version for each score...",
        category: "contest",
        answer: "amc"
    },
    {
        question: "Most recent AIME score (indicate I/II)",
        placeholder: "Indicate the year and version for your score...",
        category: "contest",
        answer: "aime",
    },
    {
        question: "Most recent USA(J)MO score, if applicable",
        placeholder: `Put "did not qualify" if you have never qualified...`,
        category: "contest",
        answer: "oly",
    }, {
        question: "Other notable results",
        placeholder: "A list...",
        desc: "For international students: list national contest results here.",
        type: "textarea",
        category: "contest",
        answer: "other"
    }
]