export default class Question {
    question: string;
    placeholder: string;
    answer: string;
    category: string;
    type?: string;
    desc?: string;
    constructor() {
        this.type = "input"
    }
}