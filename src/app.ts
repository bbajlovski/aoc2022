import { createInterface } from "readline";
import { DayView } from "./DayView";

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (questionText: string) =>
    new Promise<string>(resolve => readline.question(questionText, resolve))
        .finally(() => readline.close());

console.log("##################################");
console.log("# Welcome to Advent of Code 2022 #");
console.log("##################################\n");

const answer = async () => {
    await question("Pick a Day: ")
    .then(answer => {
        let dayView: DayView;
        dayView = new DayView(answer);
        dayView.resolve().then((result) => {
            console.log(`\n--> Day ${dayView.id} (data: ${dayView.input})`);
            console.log(`----> Part 1: ${dayView.answerOne} (${dayView.executionTimeOne}ms)`);
            console.log(`----> Part 2: ${dayView.answerTwo} (${dayView.executionTimeTwo}ms)`);
        });
    });
};

answer();