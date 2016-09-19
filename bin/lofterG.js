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
var cp = require('child_process');
require('shelljs/global');

//Delete template files
function rmFiles(name) {
    exec('del lofter-generator\\pc.ftl');
    exec('del lofter-generator\\mobile.ftl');
    exec('del lofter-generator\\nej-m.js');
    exec('del lofter-generator\\nej-v.js');
    exec('del lofter-generator\\nej-c.js');
    exec('del lofter-generator\\nej-pc.js');
    exec('rmdir lofter-generator\\.git /Q/S');
    
}

//renameFolder
function renameFolder(name) {
    // exec('xcopy lofter-generator ' + name + ' /Q/Y/I');
    // exec('rmdir lofter-generator /Q/S')
    // var str = 'ren lofter-generator ' +' '+ name; 
    // cp.exec('rename lofter-generator' + name ,function(){console.log('rename excute ' + name)})
    fs.rename('./lofter-generator','./'+name,function(err){
        if (!!err) {
            console.log('Rename Err:',err);
        } else {
            console.log('Rename ... 100%');
        }
    });
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
        console.log('Start...'.green);
        exec('rmdir ' + proname + ' /Q/S');
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
        console.log('Start...'.green);
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

        renameFolder(name);
        rmFiles();

        console.log('End.\n'.green);
        console.log('--------------------------------------');
        console.log('LOFTER Project Initialized in'.green,String((new Date()).getTime() - startTime + 'ms').yellow);
        console.log('--------------------------------------');
    });


program.parse(process.argv);

