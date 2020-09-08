/**
 *
 * create by grg on 2020/5/25
 *
 * @flow
 */
const createActions = require('@lugia/devtools-material').createActions;
const path = require('path');

const targetPath = path.join(__dirname, '../actions');
const invalid = [];

async function createActionsMetaFile() {
  await createActions({ targetPath, invalid });
}

createActionsMetaFile();
