#!/usr/bin/env node

/**
 * @file tool entry file
 * @author Henry Yang
 */

const program = require('commander')
const config = require('./../package.json')
const tool = require('./../lib')

program.version(`v${config.version}`)
  .option('-o, --output [path]', 'Directory of output')
  .parse(process.argv)

tool(program.output || './')
