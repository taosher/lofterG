#!/usr/bin/env node

/**
 * LOFTER Generator 
 * A Light CLI toll for building lofter project easily
 * @author paoloo1995 toolve@foxmail.com
 * 2016-08-17
 */

var colors = require('colors');
var fs = require('fs');
var through2 = require('through2');
require('shelljs/global');
//change "xxx" to "Xxx"
var upperCaseWord = function(str) {
    var Str = str[0].toUpperCase() + str.substr(1);
    return Str;
}

//replace '{project}' str to project name
var specify = function(proName,templateName) {
    fs.createReadStream('./lofter-generator/'+ templateName + '.js')
        .pipe(through2(function(chunk,enc,cb){
            var str = chunk.toString();
            str = str.replace(/{project}/g,proName).replace(/{Project}/g,upperCaseWord(proName))
            this.push(new Buffer(str));
            cb();
        }))
        .pipe(fs.createWriteStream('./lofter-generator/' + proName + '.js'));
} 

//main function
function init(isMobile,isPC,proName) {
    var mobileMode = false;
    if ((isMobile)&&(!isPC)) {
        mobileMode = true;
    } else if ((!isMobile)&&(isPC)) {
        mobileMode = false;
    } else {
        console.error('Error:'.red);
        console.error('You can choose Mobile Mode or PC Mode'.red);
        console.error('But you can\'t choose both.'.red);
        return false ;
    }
    exec('git clone ssh://git@xxxx/xxxxxx/lofter-generator.git');
    if (!mobileMode) {
        console.log('choose template:','pc'.yellow);
        specify(proName,'nej-pc');
    } else {
        console.log('choose template:','mobile'.yellow);
        specify('m'+proName,'nej-m');
        specify('v'+proName,'nej-v');
        specify('c'+proName,'nej-c');
    }
    return true;
}

module.exports = init;
