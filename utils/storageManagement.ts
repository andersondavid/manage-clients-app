import * as FileSystem from "expo-file-system";
import { IFullData } from "../types";

export const writeDatabaseFile = async (
	data: IFullData
): Promise<ErrorEvent | undefined> => {
	const fileUri = FileSystem.documentDirectory + "database.json";
	console.log(fileUri);

	try {
		FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
			encoding: FileSystem.EncodingType.UTF8,
		});

		return
	} catch (err: any) {
		console.log(err.message);
	}

};

export const readDatabaseFile = async (): Promise<
	string | ErrorEvent | undefined
> => {
	const fileUri = FileSystem.documentDirectory + "database.json";

	try {
		const databaseAsString = await FileSystem.readAsStringAsync(fileUri, {
			encoding: FileSystem.EncodingType.UTF8,
		});

		return databaseAsString;
	} catch (err: any) {
		console.log(err.message);
	}
};
