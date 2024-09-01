import { aws_ecs, aws_autoscaling } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Compatibility } from 'aws-cdk-lib/aws-ecs'

export class TestConstruct extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id)

      const cluster = new aws_ecs.Cluster(this, 'test-cluster')

      const autoScalingGroup = new aws_autoscaling.AutoScalingGroup(this, 'test-asg', {
        vpc: cluster.vpc,
        // TODO: launchTemplate
      })

      const asgProvider = new aws_ecs.AsgCapacityProvider(this, 'test-asg-provider', {
        autoScalingGroup
      })

      cluster.addAsgCapacityProvider(asgProvider)

      const taskDefinition = new aws_ecs.TaskDefinition(this, 'test-task', {
        compatibility: Compatibility.EC2_AND_FARGATE,
        cpu: '256',
        memoryMiB: '512',
        ephemeralStorageGiB: 1
      })

      taskDefinition.addContainer('test-container', {
        image: aws_ecs.ContainerImage.fromRegistry('alpine')
      })

      const service = new aws_ecs.Ec2Service(this, 'test-service', {
        cluster,
        taskDefinition
      })
    }
  }