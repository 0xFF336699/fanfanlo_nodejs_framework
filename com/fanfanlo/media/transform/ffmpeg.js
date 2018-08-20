const exec = require('child_process').exec;
function gifTomp4(ffmpegPath, outPath, filePath, outputName, onError, onComplete){
    // ffmepgPath = /usr/src/ffmpeg/ffmpeg;
    // outPath = /usr/src/ffmpeg/;
    // filePath = /usr/src/ffmpeg/out.gif;
    let child = exec(`${ffmpegPath} -f gif -i ${filePath} -pix_fmt yuv420p -c:v libx264 -movflags +faststart -filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2' ${outPath}${outputName}`,
        (error, stdout, stderr) => {
            // console.log(`stdout: ${stdout}`);
            // console.log(`stderr: ${stderr}`);
            if (error !== null) {
                // console.log(`exec error: ${error}`);
                onError(error);
            } else {
                onComplete(stdout);
            }
            // console.log('complete');
        });
}

exports.gifToMp4 = gifTomp4;