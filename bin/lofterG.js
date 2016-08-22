#!/usr/bin/env node

/**
 * LOFTER Generator 
 * A Light CLI toll for building lofter project easily
 * @author paoloo1995 toolve@foxmail.com
 * 2016-08-17
 */


var fs = require('fs');
var program = require('commander');
var colors = require('colors');
var initJS = require('./initJS');
var initFtl = require('./initFtl');
var startTime = (new Date()).getTime();
require('shelljs/global');

console.log('Start...'.green);

//Delete template files
function rmFiles() {
    exec('rm ./lofter-generator/pc.ftl');
    exec('rm ./lofter-generator/mobile.ftl');
    exec('rm ./lofter-generator/nej-m.js');
    exec('rm ./lofter-generator/nej-v.js');
    exec('rm ./lofter-generator/nej-c.js');
    exec('rm ./lofter-generator/nej-pc.js');
    exec('rm  -rf ./lofter-generator/.git');
}

//renameFolder
function renameFolder(name) {
    exec('cp -r ./lofter-generator ' + name);
    exec('rm  -rf ./lofter-generator');
}

program
    .version('0.0.1')
    .usage('<commoand> [options] <project name>')
    .option('-j, --js','create LOFTER js project')
    .option('-f, --ftl','create LOFTER ftl projet')
    .option('-p, --pc','PC mode')
    .option('-m, --mobile','mobile mode')


program
    .command('remove <project name>')
    .description('remove project')
    .action(function(proname) {
        exec('rm  -rf ./' + proname);
        console.log('Project has removed.')
        console.log('End.\n'.green);
        console.log('--------------------------------------');
        console.log('LOFTER Project removed in'.green,String((new Date()).getTime() - startTime + 'ms').yellow);
        console.log('--------------------------------------');
    })

program
    .command('init <project name>')
    .description('init project')
    .action(function(proname) {
        var m = program.mobile,
            f = program.ftl,
            p = program.pc,
            j = program.js;
        var name = proname;
        var noErrorFlag = true;
        if ( (!(j || f)) || (j && f) ) { //you can only choose one of "-j" or "-f"
            console.log('Error:'.red);
            console.error('You can\'t choose both js template and ftl template!'.red);
            console.error('You can\'t choose none of js template and ftl template also!'.red);
            return;
        }

        if (!!j) {
            noErrorFlag = initJS(m,p,name);
        }
        if (!!f) {
            noErrorFlag = initFtl(m,p,name);
        }
        if (!noErrorFlag) {
            console.log('End.\n'.red);
            console.log('Some error accured.');
            return ;
        }

        rmFiles();

        renameFolder(proname);

        console.log('End.\n'.green);
        console.log('--------------------------------------');
        console.log('LOFTER Project Initialized in'.green,String((new Date()).getTime() - startTime + 'ms').yellow);
        console.log('--------------------------------------');
    });


program.parse(process.argv);

