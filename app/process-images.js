let glob = require("glob");
let fs = require("fs");

// options is optional
glob("./assets/**/*", {}, (er, files) => {
    let pieces = [];
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (!file.endsWith('.png')) continue;
        let piece = [file, ...file.replace('.png', '').replace(/ /g,'_').replace('./assets/', '').split('/')];
        pieces.push(piece);
    }

    let assets = {};
    for (let p = 0; p < pieces.length; p++) {
        let piece = pieces[p];
        let curPiece = assets;
        for (let i = 1; i < piece.length; i++) {
            let item = piece[i];
            if (i === piece.length - 1) {
                curPiece[item] = `require('.${piece[0]}')`;
            }
            else {
                if (!curPiece[item]) {
                    curPiece[item] = {};
                }
                curPiece = curPiece[item];
            }
        }
    }


    let result = JSON.stringify(assets, null, '\t').replace(/"require\('(.*)'\)"/g, (_, value) => {
        return "require('" + value + "')"
    });

    fs.writeFileSync("./src/assets.ts", `export const Assets = ${result};`);
    console.log(`Updated assets.ts with ${pieces.length} images.`)
});


