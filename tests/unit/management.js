import test from 'ava'
import sinon from 'sinon'
import axios from 'axios'
import globalIdentity from '../../dist'
import { Authorization } from '../../dist/authorization'
import { Management } from '../../dist/management'

let sandbox
const resolved = (data) => new Promise((r) => r({ data }));
const gim = globalIdentity();

test.beforeEach(() => {
  sandbox = sinon.sandbox.create()
})

test.afterEach(() => {
  sandbox.restore()
})

test('Management: get all user roles by email', async (t) => {
  const data = {
    "roles": [
      {
        "roleName": "role1",
        "description": "Coments about the user in the application",
        "active": true
      },
      {
        "roleName": "role2",
        "comment": "Coments about the role in the application",
        "active": true
      }
    ],
    "Success": true,
    "OperationReport": []
  }

  sandbox.stub(axios, 'get').returns(resolved(data));
  const response = await management.getUserRoles('test@email.com')

  t.is(data.roles.length, response.roles.length)
  t.is(data.roles[0].roleName, response.roles[0].roleName)
}, 'should be return user roles')

test('Management: assosiate roles to user', async (t) => {
  const data = {
    "Success": true,
    "OperationReport": []
  }

  sandbox.stub(axios, 'post').returns(resolved(data));
  const response = await management.associeateRolesToUser('test@email.com', ['role1', 'role2'])

  t.true(response.Success)
}, 'should be return success')

test('Management: assosiate roles to user', async (t) => {
  const promise = management.associeateRolesToUser('test@email.com', [])
  const error = await t.throws(promise)

  t.is(error.message, 'You must provide roles')
}, 'should be returned an error when roles array is empty')

test('Management: add new user an application', async (t) => {
  const data = {
  "userKey": "00000000-0000-0000-0000-000000000000",
  "Success": true,
  "OperationReport": []
}

  sandbox.stub(axios, 'post').returns(resolved(data));
  const response = await management.associeateRolesToUser(
    'test@email.com',
    'name test',
    'password123',
    'comment'
  )

  t.true(response.Success)
}, 'should be return success')
