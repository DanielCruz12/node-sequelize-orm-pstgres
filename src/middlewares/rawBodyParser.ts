import bodyParser from 'body-parser';

export const rawBodyParser = bodyParser.raw({ type: 'application/json' });
