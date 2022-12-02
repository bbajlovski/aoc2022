import * as utils from "./Utils";

export class DayView {

    id: number;
    answerOne: string;
    answerTwo: string;
    executionTimeOne: number;
    executionTimeTwo: number;
    input: string;

    constructor(
        day: string
    ) {        
        
        this.answerOne = "TBD";
        this.answerTwo = "TBD";
        this.executionTimeOne = 0;
        this.executionTimeTwo = 0;
        this.input = "";

        if (utils.isNumeric(day)) {
            this.id = +day;
            this.input = "./inputs/day" + this.id +".txt";

        } else {
            this.id = -1;
            this.answerOne = "N/A";
            this.answerTwo = "N/A";
        }
    }

    resolve = async (): Promise<any> => { 
        if (this.id > 0) {
            await import("./helpers/Day" + this.id).then((day) => {
                const dayHelper = new day.Helper(this.input);
                
                var start = new Date().getTime();
                this.answerOne = dayHelper.resolveOne().then();
                this.executionTimeOne = new Date().getTime() - start;

                start = new Date().getTime();
                this.answerTwo = dayHelper.resolveTwo();
                this.executionTimeTwo = new Date().getTime() - start;
                
            }).catch((error) => {
                console.log(`\nDay ${this.id} not implemented yet!`);
            });
        }
    }
}