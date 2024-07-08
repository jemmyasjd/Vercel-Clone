const express = require('express');
const { generateSlug } = require('random-word-slugs');
const { ECSClient, RunTaskCommand } = require('@aws-sdk/client-ecs');
const { Server } = require('socket.io');
const Redis = require('ioredis');

const app = express();
const PORT = 9000;

const subscriber = new Redis('');
const io = new Server({ cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('subscribe', (channel) => {
    socket.join(channel);
    socket.emit('message', `Joined ${channel}`);
  });
});

io.listen(9002, () => console.log('Socket Server 9002'));

const ecsClient = new ECSClient({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: '',
    secretAccessKey: ''
  }
});

const config = {
  CLUSTER: 'arn:aws:ecs:ap-south-1:654654432022:cluster/build-cluster',
  TASK: 'arn:aws:ecs:ap-south-1:654654432022:task-definition/builder-task'
};

app.use(express.json());

app.post('/project', async (req, res) => {
  const { gitURL, slug } = req.body;
  const projectSlug = slug || generateSlug();

  const command = new RunTaskCommand({
    cluster: config.CLUSTER,
    taskDefinition: config.TASK,
    launchType: 'FARGATE',
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: 'ENABLED',
        subnets: ['subnet-0327e21a0db2f4d9f', 'subnet-0cc22b94ac21d7aaf', 'subnet-04e5ed89ed1839c77'],
        securityGroups: ['sg-04d4c6cd74c608a9b']
      }
    },
    overrides: {
      containerOverrides: [
        {
          name: 'builder-image',
          environment: [
            { name: 'GIT_REPOSITORY_URL', value: gitURL },
            { name: 'PROJECT_ID', value: projectSlug }
          ]
        }
      ]
    }
  });

  try {
    await ecsClient.send(command);
    res.json({ status: 'queued', data: { projectSlug, url: `http://${projectSlug}.localhost:8000` } });
  } catch (error) {
    console.error('Error running ECS task', error);
    res.status(500).json({ status: 'error', message: 'Failed to start ECS task' });
  }
});

async function initRedisSubscribe() {
  try {
    await subscriber.psubscribe('logs:*');
    console.log('Subscribed to logs...');
    subscriber.on('pmessage', (pattern, channel, message) => {
      io.to(channel).emit('message', message);
    });
  } catch (error) {
    console.error('Error subscribing to Redis channels', error);
  }
}

subscriber.on('error', (error) => {
  console.error('Redis connection error', error);
});

initRedisSubscribe();

app.listen(PORT, () => {
  console.log(`API server running... ${PORT}`);
});
