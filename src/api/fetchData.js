// src/api/fetchData.js
import { databases } from './appwriteConfig';
import { Query } from 'appwrite';

const appWriteDatabaseID = process.env.EXPO_PUBLIC_DATABASE_ID;
const appWriteCollectionID = process.env.EXPO_PUBLIC_COLLECTION_CONTADOR_ID;

export const fetchData = async (startDate, endDate) => {
  try {
    const response = await databases.listDocuments(appWriteDatabaseID, appWriteCollectionID, [
      Query.between('Data', startDate, endDate)
    ]);
    return response.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};
