#!/usr/bin/env node
let command = null;

try {
    command = require(`${process.cwd()}/node_modules/hub`);
} catch (e) {
    command = require("hub");
}