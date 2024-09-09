// src/api/appwriteConfig.js
import { Client, Databases } from 'appwrite';

const client = new Client();

const appWriteURL = process.env.EXPO_PUBLIC_APPWRITE_URL;
const appWriteProjectID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
client.setEndpoint(appWriteURL).setProject(appWriteProjectID);

export const databases = new Databases(client);
