import{Client,Account,Databases,Storage,Avatars} from "appwrite"

export const appwriteconfig={
    projectId:import.meta.env.VITE_APPWRITE_PROJECTID,
    url:import.meta.env.VITE_APPWRITE_URL,
    databaseId:import.meta.env.VITE_APPWRITE_DATABASEID,
    storageId:import.meta.env.VITE_APPWRITE_STORAGEID,
    userCollectionId:import.meta.env.VITE_APPWRITE_USERSID,
    postCollectionId:import.meta.env.VITE_APPWRITE_POSTSID,
    saveCollectionId:import.meta.env.VITE_APPWRITE_SAVESID
}

export const client=new Client()

client.setProject(appwriteconfig.projectId)
client.setEndpoint(appwriteconfig.url)

export const account=new Account(client)
export const databases=new Databases(client)
export const storage=new Storage(client)
export const avatars=new Avatars(client)

