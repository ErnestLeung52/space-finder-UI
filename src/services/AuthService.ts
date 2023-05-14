import { type CognitoUser } from '@aws-amplify/auth';
import { Amplify, Auth } from 'aws-amplify';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

// Need IDs from AuthStack from Backend
import { AuthStack } from '../../../space-finder/output.json';

const awsRegion = 'us-west-1';

Amplify.configure({
	Auth: {
		mandatorySignIn: false,
		region: awsRegion,
		userPoolId: AuthStack.SpaceUserPoolId,
		userPoolWebClientId: AuthStack.SpaceUserPoolClientId,
		identityPoolId: AuthStack.SpaceIdentityPoolId,
		authenticationFlowType: 'USER_PASSWORD_AUTH',
	},
});

export class AuthService {
	// Lazy initialization: all data inside authService(data service) will either have the states of object or undefined. When try to access it, if it's undefined, we will initialize it.
	private user: CognitoUser | undefined;
	private jwtToken: string | undefined;
	private temporaryCredentials: object | undefined;

	public async login(userName: string, password: string): Promise<object | undefined> {
		try {
			this.user = (await Auth.signIn(userName, password)) as CognitoUser;
			// Need jwt to generate temp credentials
			this.jwtToken = this.user?.getSignInUserSession()?.getIdToken().getJwtToken();
			return this.user;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	}

	public async getTemporaryCredentials() {
		if (this.temporaryCredentials) {
			return this.temporaryCredentials;
		}

		this.temporaryCredentials = await this.generateTemporaryCredentials();

		return this.temporaryCredentials;
	}

	public getUserName() {
		return this.user?.getUsername();
	}

	// Retrieve ideneityId, accessKeyId, secretAccessKeyId, sessionToken... from cognito
	private async generateTemporaryCredentials() {
		const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthStack.SpaceUserPoolId}`;

		const cognitoIdentity = new CognitoIdentityClient({
			credentials: fromCognitoIdentityPool({
				// Backend has region stored as global, client-side needs configure
				clientConfig: {
					region: awsRegion,
				},
				identityPoolId: AuthStack.SpaceIdentityPoolId,
				logins: {
					// [cognitoIdentityPool]: this.jwtToken!
					[cognitoIdentityPool]: this.jwtToken ?? '',
				},
			}),
		});

		const credentials = await cognitoIdentity.config.credentials();

		return credentials;
	}
}
