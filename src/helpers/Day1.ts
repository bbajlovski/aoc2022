import fs from "fs";
import readline from "readline";
import events from "events";

export class Helper  {
    filename: string;
    constructor(
        filename: string
    ) {
        this.filename = filename;
    }

    resolveOne = async (): Promise<any> => {
        const reader = readline.createInterface({
        input: fs.createReadStream(this.filename),
        crlfDelay: Infinity
        });
    
        reader.on('line', (line) => {
        console.log(`Line from file: ${line}`);
        });
    
        await events.once(reader, 'close');
    
        console.log('Reading file line by line with readline done.');
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
      

        return "OK1";
    }

    resolveTwo = () => {
        return "OK2";
    }
}