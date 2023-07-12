import type { AWS } from '@serverless/typescript';

import hello from 'src/functions/hello';

const serverlessConfiguration: AWS = {
  service: 'typescript-serverless-boilerplate',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-offline', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SLACK_SIGNING_SECRET: '${env:SLACK_SIGNING_SECRET}',
      SLACK_BOT_TOKEN: '${env:SLACK_BOT_TOKEN}',
    },
  },
  functions: { hello },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
