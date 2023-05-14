export class DataService {
	// public async createSpace(name: string, location: string, photo?: File) {
	public async createSpace(name: string, location: string, photo?: File) {
		console.log(name, location, photo);
		return '123';
	}

	public isAuthorized() {
		return true;
	}
}
