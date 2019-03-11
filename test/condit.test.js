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
  let existingenv;
  let missingenv;

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

  it('hasenvs tests for environment variable presence', () => {
    const envnum1 = Math.floor(Math.random() * 100);
    const envname1 = `TEST_ENV_${envnum1}`;
    process.env[envname1] = envnum1;
    const envnum2 = Math.floor(Math.random() * 100);
    const envname2 = `TEST_ENV_${envnum2}`;
    process.env[envname2] = envnum2;
    const testenv = condit.hasenvs([envname1, envname2]);
    assert.equal(typeof testenv, 'function');
    assert.equal(testenv(), true);
    delete process.env[envname1];
    delete process.env[envname2];
  });

  it('hasenvs tests for total environment variable absence', () => {
    const envnum1 = Math.floor(Math.random() * 100);
    const envname1 = `TEST_ENV_${envnum1}`;
    delete process.env[envname1];
    const envnum2 = Math.floor(Math.random() * 100);
    const envname2 = `TEST_ENV_${envnum2}`;
    delete process.env[envname2];
    const testenv = condit.hasenvs([envname1, envname2]);
    assert.equal(typeof testenv, 'function');
    assert.equal(testenv(), false);
    delete process.env[envname1];
    delete process.env[envname2];
  });

  it('hasenvs tests for partial environment variable absence', () => {
    const envnum1 = Math.floor(Math.random() * 100);
    const envname1 = `TEST_ENV_${envnum1}`;
    process.env[envname1] = envnum1;
    const envnum2 = Math.floor(Math.random() * 100);
    const envname2 = `TEST_ENV_${envnum2}`;
    delete process.env[envname2];
    const testenv = condit.hasenvs([envname1, envname2]);
    assert.equal(typeof testenv, 'function');
    assert.equal(testenv(), false);
    delete process.env[envname1];
    delete process.env[envname2];
  });

  after('Clean up test environment', () => {
    delete process.env[missingenv];
  });

  condit('Run test that depends on existing environment variable', condit.hasenv('HOME'), () => {
    assert.ok(process.env.HOME);
  });


  condit('Skip test that depends on missing environment variable', condit.hasenv(missingenv), () => {
    // this will fail when it is executed, but the test should be skipped
    assert.ok(process.env[existingenv]);
  });
});
