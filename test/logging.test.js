/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-env mocha */
const assert = require('assert');
const logging = require('../src/logging.js');

describe('Testing logging', () => {
  it('createTestLogger creates a logger with debug log level', () => {
    const log = logging.createTestLogger();
    log.info('hello info');
    log.debug('hello debug');
    log.trace('hello trace');
    assert.strictEqual(log.getOutput(), 'info: hello info\ndebug: hello debug\n');
  });

  it('createTestLogger strips colors', () => {
    const log = logging.createTestLogger();
    log.info('\u001b[31;1;4mhello\u001b[0m');
    assert.strictEqual(log.getOutput(), 'info: hello\n');
  });

  it('createTestLogger keeps colors', () => {
    const log = logging.createTestLogger({ keepANSI: true });
    log.info('\u001b[31;1;4mhello\u001b[0m');
    assert.strictEqual(log.getOutput(), 'info: \u001b[31;1;4mhello\u001b[0m\n');
  });

  it('createTestLogger can use specific log level', () => {
    const log = logging.createTestLogger({ level: 'info' });
    log.info('hello info');
    log.debug('hello debug');
    log.trace('hello trace');
    assert.strictEqual(log.getOutput(), 'info: hello info\n');
  });
});
