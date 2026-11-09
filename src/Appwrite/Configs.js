import { Client, TablesDB, Storage, ID , Query, Permission, Role} from "appwrite";
import config from "../Config";
console.log("URL:", import.meta.env.VITE_APPWRITE_URL);
console.log("Project ID:", import.meta.env.VITE_APPWRITE_PROJECT_ID);
console.log("Config URL:", config.appwriteURL);
const client = new Client()
 .setProject(config.projectId)
    .setEndpoint(config.appwriteURL);
const tablesDB = new TablesDB(client);
const storage = new Storage(client);

export  async  function createPost({title, slug, content, featuredImage, status, userId}){

        try {
    
return await tablesDB.createRow({
    databaseId: config.databaseId,
    tableId: config.collectionId,
  rowId:  slug,
    data:{
Title:title,
content:[content],
image:featuredImage,
status,
userid:userId
    },
    permissions: [
        Permission.read(Role.users()),         
        Permission.update(Role.user(userId)),  
        Permission.delete(Role.user(userId)), 
      ],
})
        }catch(err){
          console.log("createPost error:", err.message);
        }
    }
  export   async function updatePost(slug,{title,  content, featuredImage, status}) {
        try{
return await tablesDB.updateRow({
databaseId: config.databaseId,
    tableId: config.collectionId,
 rowId:  slug,
    data:{
     Title:   title,
content:[content],
image:featuredImage,
status,
    }

})
        }catch(err){
console.log(err)
        }
    }
export async function  deletePost(slug) {
    try{
    return await tablesDB.deleteRow({
        databaseId: config.databaseId,
    tableId: config.collectionId,
 rowId:  slug,
    });
    } catch(err) {
        console.log(err)
        return false;
    }
}
 export async function  getPost(slug) {
    try {
        return await tablesDB.getRow({
            databaseId: config.databaseId,
            tableId: config.collectionId,
            rowId: slug,
        });
    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error);
        return false;
    }
}
 export async function  getPosts(queries=[Query.equal("status","active")]){
try{
return await tablesDB.listRows({
     databaseId: config.databaseId,
            tableId: config.collectionId,
queries
});
}catch (err){
console.log(err);
}
}
//file services
export async function  uploadFile(file) {
    try{
  return await storage.createFile({
       bucketId: config.bucketID,
    fileId: ID.unique(),
    file: file,
  })
    }catch(err) {
        console.log(err);
        return false;
    }
}
  export async function deleteFile(fileId) {
try{
   await storage.deleteFile({
            bucketId: config.bucketID,
            fileId: fileId,
        });
        return true;
}catch{
    console.log("error")
    return false;
}
}
export function getFilePreview(fileId) {
    try {
return storage.getFilePreview({
        bucketId: config.bucketID,
        fileId: fileId,
    });
    }catch(err) {
        console.log("error in getting file preview")
    }
    
}
export function getFileView(fileId) {
    try {
  return storage.getFileView({
    bucketId: config.bucketID,
    fileId: fileId,
  });
    }catch(err) {
        console.log("error in viewing the image")
    }

}