import { App, Stack } from 'aws-cdk-lib'
import { TestConstruct } from './construct'

const app = new App()

export const testStack = new Stack(app, 'test-stack', {
    stackName: 'test-stack'
})

export const testConstruct = new TestConstruct(testStack, 'test-construct')

