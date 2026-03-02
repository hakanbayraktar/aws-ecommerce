import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || 'us-east-1_mock',
                userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || 'mock',
            }
        }
    });
};
