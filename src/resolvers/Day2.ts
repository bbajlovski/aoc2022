import fs from "fs";
import readline from "readline";
import events from "events";
   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    var totalScore = 0;

    var roundScore = 0;
    reader.on('line', (line) => {
        var moves = line.replace( /[^a-cx-zA-CX-Z]/g , "").toUpperCase();
        roundScore = getShapeValue(moves) + getMoveResult(moves);
        console.log(roundScore);
        totalScore = totalScore + roundScore;
    });
    

    await events.once(reader, 'close');

    return "" + totalScore;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });
 
    reader.on('line', (line) => {

    });

    await events.once(reader, 'close');

    return "";
}

const getShapeValue = (moves: string): number => {
    var value = 0;

    switch (moves.split("")[1]) {
        case "X": {
            value = 1;
            break;
        }
        case "Y":{
            value = 2;
            break;
        }
        case "Z":{
            value = 3;
            break;
        }
        default:{
            value = 0;
            break;
        }
    }

    return value;
} 

const getMoveResult = (moves: string): number => {
    var value = 0;

    moves = moves.replace("A", "1");
    moves = moves.replace("B", "2");
    moves = moves.replace("C", "3");
    moves = moves.replace("X", "1");
    moves = moves.replace("Y", "2");
    moves = moves.replace("Z", "3");

    console.log(moves);
    var compare = (+(moves.split("")[0])) - (+(moves.split("")[1]));
    console.log("compare: ", compare);
    if (compare === 0) {
        value = 3
    }

    if (compare < 0) {
        value = 6;
    }

    return value;
} 