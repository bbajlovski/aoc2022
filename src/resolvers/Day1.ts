import fs from "fs";
import readline from "readline";
import events from "events";
   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    var maxCalories = 0;
    var currentCalories = 0;    
    reader.on('line', (line) => {
        if (!line && !(line.trim())) {
            maxCalories = currentCalories > maxCalories ? currentCalories : maxCalories;
            currentCalories = 0;            
        } else {
            currentCalories += (+line);
        }
    });
    maxCalories = currentCalories > maxCalories ? currentCalories : maxCalories;

    await events.once(reader, 'close');

    return "" + maxCalories;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    var firstCalories = 0;
    var secondCalories = 0;
    var thirdCalories = 0;
    var currentCalories = 0;    
    reader.on('line', (line) => {
        if (!line && !(line.trim())) {
            if (currentCalories > firstCalories) {
                thirdCalories = secondCalories;
                secondCalories = firstCalories;
                firstCalories = currentCalories;                
            } else if (currentCalories > secondCalories) {
                thirdCalories = secondCalories;
                secondCalories = currentCalories;
            } else if (currentCalories > thirdCalories) {
                thirdCalories = currentCalories;
            }
            currentCalories = 0;
        } else {
            currentCalories += (+line);
        }
    });
    if (currentCalories > firstCalories) {
        firstCalories = currentCalories;
    } else if (currentCalories > secondCalories) {
        secondCalories = currentCalories;
    } else if (currentCalories > thirdCalories) {
        thirdCalories = currentCalories;
    };

    await events.once(reader, 'close');

    return "" + firstCalories + "," + secondCalories + "," + thirdCalories + ", total " + (firstCalories + secondCalories + thirdCalories);
}
