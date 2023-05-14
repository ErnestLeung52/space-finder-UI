import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { AuthService } from './AuthService';
import { DataStack } from '../../../space-finder/output.json';

export class DataService {
	private authService: AuthService;
	private s3Client: S3Client | undefined;
	private awsRegion = 'us-west-1';

	constructor(authService: AuthService) {
		this.authService = authService;
	}

	public async createSpace(name: string, location: string, photo?: File) {
		console.log('calling create space!!');
		// Retrieve ideneityId, accessKeyId, secretAccessKeyId, sessionToken... from cognito, in order to do any AWS SDK action that the authenticated roles allow us

		if (photo) {
			const uploadUrl = await this.uploadPublicFile(photo);
			console.log(uploadUrl);
		}

		return '123';
	}

	private async uploadPublicFile(file: File) {
		const credentials = await this.authService.getTemporaryCredentials();

		console.log(0);
		console.log(credentials);

		// Lazy init
		if (!this.s3Client) {
			console.log('????????');
			this.s3Client = new S3Client({
				credentials: credentials as any,
				region: this.awsRegion,
			});
		}

		console.log(1);

		console.log(this.s3Client);

		// Need bucket from the output of CDK deployment -> store file into bucket
		const command = new PutObjectCommand({
			Bucket: DataStack.SpaceFinderPhotosBucketName,
			Key: file.name,
			ACL: 'public-read',
			Body: file,
		});

		console.log(2);

		await this.s3Client.send(command);

		console.log(3);
		// URL for the newly uploaded file
		return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`;
	}

	public isAuthorized() {
		return true;
	}
}
