import {surpriseMePrompts} from "../constants"

function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length);
    const newPrompt = surpriseMePrompts[randomIndex];
    return (newPrompt === prompt)?getRandomPrompt(prompt):newPrompt;
}

export { getRandomPrompt}