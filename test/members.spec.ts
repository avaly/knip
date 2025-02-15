import test from 'node:test';
import assert from 'node:assert/strict';
import { main } from '../src/index.js';
import baseArguments from './fixtures/baseArguments.js';
import baseCounters from './fixtures/baseCounters.js';

test('Find unused enum and class members', async () => {
  const workingDir = 'test/fixtures/members';

  const { issues, counters } = await main({
    ...baseArguments,
    cwd: workingDir,
    workingDir,
  });

  assert.equal(Object.keys(issues.enumMembers['members.ts']).length, 1);
  assert(issues.enumMembers['members.ts']['B_Unused']);

  assert.equal(Object.keys(issues.classMembers['members.ts']).length, 4);
  assert(issues.classMembers['members.ts']['bUnusedPublic']);
  assert(issues.classMembers['members.ts']['cUnusedProp']);
  assert(issues.classMembers['members.ts']['dUnusedMember']);
  assert(issues.classMembers['members.ts']['eUnusedStatic']);

  assert.deepEqual(counters, {
    ...baseCounters,
    enumMembers: 1,
    classMembers: 4,
    processed: 2,
    total: 2,
  });
});
