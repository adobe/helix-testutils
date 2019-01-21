/*
 * Copyright 2018 Adobe. All rights reserved.
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
const condit = require('../src/condit');

describe('Testing condit', () => {
  it('hasenv tests for environment variable presence', () => {
    const envnum = Math.floor(Math.random() * 100);
    const envname = `TEST_ENV_${envnum}`;
    process.env[envname] = envnum;
    const testenv = condit.hasenv(envname);
    assert.equal(typeof testenv, 'function');
    assert.equal(testenv(), true);
    delete process.env[envname];
  });

  it('hasenv tests for environment variable absence', () => {
    const envnum = Math.floor(Math.random() * 100);
    const envname = `TEST_ENV_${envnum}`;
    delete process.env[envname];
    const testenv = condit.hasenv(envname);
    assert.equal(typeof testenv, 'function');
    assert.equal(testenv(), false);
  });
});
