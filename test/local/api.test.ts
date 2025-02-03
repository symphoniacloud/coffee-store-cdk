import { expect, test } from 'vitest'
import { handler } from '../../src/app/lambdaFunctions/api/lambda'
import { EmptyAPIGatewayProxyEvent } from './testSupport'

test('lambda function should return expected message when no name passed', async () => {
  const result = await handler(EmptyAPIGatewayProxyEvent)

  const expectedResult = {
    statusCode: 200,
    body: "Hello, anonymous! (pass 'name' query string parameter to give a more friendly greeting)"
  }

  expect(result).toEqual(expectedResult)
})

test('lambda function should return expected message when name on query string', async () => {
  const result = await handler({
    ...EmptyAPIGatewayProxyEvent,
    queryStringParameters: { name: 'Alice' }
  })

  const expectedResult = {
    statusCode: 200,
    body: 'Hello, Alice!'
  }

  expect(result).toEqual(expectedResult)
})
