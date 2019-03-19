#!/usr/bin/env node
/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

if (process.env.SNYK_PROJECT_ID) {
  require('@snyk/nodejs-runtime-agent')({
    projectId: process.env.SNYK_PROJECT_ID,
    beaconIntervalMs: 1000,
  });
} else {
  if (process.env.CI) {
    console.error('Error: SNYK_PROJECT_ID not set, required for all CI test runs');
    process.exit(-1);
  } else {
    console.log('Warning: SNYK_PROJECT_ID not set, no runtime security monitoring will be applied');
  }
}

require('mocha/lib/cli/index').main();
