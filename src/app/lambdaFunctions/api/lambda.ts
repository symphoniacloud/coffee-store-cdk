import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda'
import { generateMessage } from '../../domain/messageGenerator'

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> {
  console.log('API Lambda was called')
  const name = event.queryStringParameters?.['name']

  return {
    statusCode: 200,
    body: generateMessage(name)
  }
}
