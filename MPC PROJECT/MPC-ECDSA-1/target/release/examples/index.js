const express = require('express');
const app = express();
const cors = require('cors');
const fs = require("fs");
let keys1 = require("./keys.store1") || null;
// let keys2 = require("./local-share2.json") || null;
// let keys3 = require("./local-share3.json") || null;
app.use(cors());
app.use(express.json());



const { exec } = require('child_process');

const channel = async (log = true, command) => {
    return new Promise(function (resolve, reject) {
        console.log("Command:::",command);
      exec(command, (err, stdout, stderr) => {
        if (err) {
          if (log) {
            console.log(stderr);
          }
          reject({ err, stdout, stderr });
        } else {
          if (log) {
            console.log(stdout);
          }
          resolve({ stdout, stderr });
        }
      });
    });
  };


  app.get('/build', async (req, res) => {
    try {
        let buildCommand = 'cargo build --release --examples --no-default-features --features curv-kzen/num-bigint';
        let temp = await channel(true, buildCommand);
        res.send(temp);
    } catch(e) {
        console.error("error : ", e);
    }
});


app.get('/keygen1', async (req, res) => {
    try {
        let keygenCommand = './gg18_keygen_client http://127.0.0.1:8000 keys.store1.json';
        let temp = await channel(true, keygenCommand);
        res.send(temp);
    } catch(e) {
        console.error("error : ", e);
    }
});

// app.get('/keygen2', async (req, res) => {
//     try {
//         let keygenCommand = './gg20_keygen -t 1 -n 3 -i 2 --output local-share2.json';
//         let temp = await channel(true, keygenCommand);
//         res.send(temp);
//     } catch(e) {
//         console.error("error : ", e);
//     }
// });

// app.get('/keygen3', async (req, res) => {
//     try {
//         let keygenCommand = './gg20_keygen -t 1 -n 3 -i 3 --output local-share3.json';
//         let temp = await channel(true,keygenCommand);
//         res.send(temp);
//     } catch(e) {
//         console.error("error : ", e);
//     }
// });


app.post('/sign1', async (req, res) => {
    try {
        console.log("Body:::" ,req.body);
        let body = req.body;
        console.log(body);
        let signCommand = './gg18_sign_client http://127.0.0.1:8000 keys.store1.json' + " " + `"${body.message}"`;
        let temp = await channel(true,signCommand);
        res.send(temp);
    } catch(e) {
        console.error("error : ", e);
    }
});

app.post('/sign2', async (req, res) => {
    try {
        console.log("Body:::" ,req.body);
        let body = req.body;
        console.log(body.message);
        let signCommand = './gg18_sign_client http://127.0.0.1:8000 keys.store2.json' + " " + `"${body.message}"`;
        let temp = await channel(true, signCommand);
        res.send(temp);
    } catch(e) {
        console.error("error : ", e);
    }
});

app.post('/verify', async (req, res) => {
    try {
        console.log("Body:::" ,req.body);
        let body = req.body;
        console.log(body.message);
        let signCommand = './gg20_signing --address https://098e-2405-201-1f-19ec-408d-3bea-e12d-b1e.in.ngrok.io -p 1,2 --data-to-sign' + " " + `"${body.message}"` + " " +  '-l local-share1.json --verify ' + `--r "[${body.r}]"` + ` --s "[${body.s}]"`;
        let temp = await channel(true, signCommand);
        res.send(temp);
    } catch(e) {
        console.error("error : ", e);
    }
});

app.get('/getKeyFile', async (req, res) => {
    try {
        res.send({key1:keys1, key2:keys2, key3:keys3});
    } catch(e) {
        console.error("error : ", e);
    }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});