import { LambdaFunctionURLEvent } from 'aws-lambda/trigger/lambda-function-url'

export const EmptyLambdaFunctionURLEvent: LambdaFunctionURLEvent = {
  headers: {},
  isBase64Encoded: false,
  rawPath: '',
  rawQueryString: '',
  requestContext: {
    accountId: '',
    apiId: '',
    domainName: '',
    domainPrefix: '',
    http: {
      method: '',
      path: '',
      protocol: '',
      sourceIp: '',
      userAgent: ''
    },
    requestId: '',
    routeKey: '',
    stage: '',
    time: '',
    timeEpoch: 0
  },
  routeKey: '',
  version: ''
}
