const fs = require('fs');

try {
    const css = fs.readFileSync('styles.css', 'utf8');
    let openBraces = 0;
    const lines = css.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let char of line) {
            if (char === '{') openBraces++;
            if (char === '}') openBraces--;
        }
        if (openBraces < 0) {
            console.log(`Error: Unexpected closing brace at line ${i + 1}`);
            process.exit(1);
        }
    }

    if (openBraces > 0) {
        console.log(`Error: Missing ${openBraces} closing brace(s) at end of file.`);
    } else {
        console.log("CSS Brace Validation: OK");
    }
} catch (err) {
    console.error(err);
}
