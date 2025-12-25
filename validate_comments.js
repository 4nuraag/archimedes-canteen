const fs = require('fs');

try {
    const css = fs.readFileSync('styles.css', 'utf8');
    let inComment = false;
    const lines = css.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        for (let j = 0; j < line.length; j++) {
            if (!inComment && line[j] === '/' && line[j + 1] === '*') {
                inComment = true;
                j++;
            } else if (inComment && line[j] === '*' && line[j + 1] === '/') {
                inComment = false;
                j++;
            }
        }
    }

    if (inComment) {
        console.log("Error: Unclosed comment found at end of file.");
    } else {
        console.log("Comments Validation: OK");
    }
} catch (err) {
    console.error(err);
}
