import { App, AwsLambdaReceiver } from '@slack/bolt';
import { AwsCallback, AwsEvent } from '@slack/bolt/dist/receivers/AwsLambdaReceiver';
import { isGenericMessageEvent } from '@libs/helper';

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env['SLACK_SIGNING_SECRET'] as string,
});

const app = new App({
  token: process.env['SLACK_BOT_TOKEN'] as string,
  receiver: awsLambdaReceiver,
});

app.message('hello', async ({ message, say }) => {
  if (!isGenericMessageEvent(message)) {
    return;
  }

  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me',
          },
          action_id: 'button_click',
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

app.view('view_1', async ({ body, ack, view, client, logger }) => {
  await ack();

  const val = view.state.values['block_1']?.['input_1']?.['value'];
  if (!val) {
    logger.error('No value found');
    return;
  }

  try {
    await client.chat.postMessage({
      channel: view.private_metadata,
      text: `<@${body.user.id}> submitted ${val}`,
    });
  } catch (error) {
    logger.error(error);
  }
});

app.command('/slash', async ({ logger, body, client, ack, say }) => {
  await ack();

  try {
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        private_metadata: body.channel_id,
        type: 'modal',
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Modal title',
        },
        blocks: [
          {
            type: 'input',
            block_id: 'block_1',
            label: {
              type: 'plain_text',
              text: 'What are your hopes and dreams?',
            },
            element: {
              type: 'plain_text_input',
              action_id: 'input_1',
            },
          },
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit',
        },
      },
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }

  await say(`<@${body.user_id}> called /slash`);
});

app.action('button_click', async ({ body, ack, say }) => {
  await ack();

  await say(`<@${body.user.id}> clicked the button`);
});

module.exports.main = async (event: AwsEvent, context: any, callback: AwsCallback) => {
  const handler = await awsLambdaReceiver.start();

  return handler(event, context, callback);
};
