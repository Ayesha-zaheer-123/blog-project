import { Client, Account, ID } from "appwrite";
import config from "../Config";
import React from "react";
const client = new Client()
    .setProject(config.projectId)
    .setEndpoint(config.appwriteURL);
const account = new Account(client);
export  async function  Login({email,password}) {
    try {
    const result=await account.createEmailPasswordSession({
    email: email,
    password: password
});
return result
    }catch(err) {
        console.log("LOgin is not possible")
         throw err;
    }
}
export async function getCurrentUser() {
    try{
        return  await account.get()
    }catch (err) {
         console.log("getCurrentUser error:", err.message);
    return null;
    }
}
export async function createAccount({name,email,password}) {
try {
    const user = await account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name:name
    });
    console.log(user)
    await Login({email,password})
    return user;
} catch (e){
    console.error("Account creation si not possible ")
     console.error(e.message)
     throw e;
}
}
 export  async function  Logout() {
        try{
return await account.deleteSession({ sessionId: 'current' })
        }catch(err){
throw(err)
        }
    }
