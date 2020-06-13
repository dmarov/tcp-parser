const yargs = require('yargs');
const fs = require('fs');
const YAML = require('yaml');
const net = require('net');

const argv = yargs
    .config('config', 'path to yaml file', cfgPath => {
        const cfg = fs.readFileSync(cfgPath, 'utf-8');
        return YAML.parse(cfg);
    })
    .option('port', {
        alias: 'p',
        demandOption: true,
        default: '10021',
        describe: 'port number to listen',
        type: 'string'
    })
    .option('parser', {
        demandOption: true,
        describe: 'parser to use',
        type: 'string'
    })
    .argv;

const parser = require(`${argv.parser}`);

const server = net.createServer((c) => {

    c.on('connect', () => {
        console.log('connection established');
    });

    c.on('data', data => {
        return parser(data);
    });

    c.on('end', () => {
        console.log('connection ended');
    });
});

server.on('error', (err) => {

    console.log('error occured');
    console.log(err);
});

server.listen(argv.port, () => {

    console.log(`server started on ${argv.port} port`);
});
