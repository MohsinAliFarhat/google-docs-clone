import { sendPostRequest } from "./SendRequests"
import { sendGetRequest } from "./SendRequests";
import {sendPutRequest} from './SendRequests';

const signUp = async (data) => {
   return sendPostRequest(`auth/signup`, data);
}

const signIn = async (data) => {
   return sendPostRequest(`auth/signin`, data);
}

const getAllDocumentsOfAUser = () => {
   return sendGetRequest(`documents/listAll`);
}

const createDocument = (data) => {
   return sendPostRequest(`documents/create`,data)
}

const updateDocument = (id, data) => {
   return sendPutRequest(`documents/${id}`,data)
}

const fetchSingleDocument = (id) => {
   return sendGetRequest(`documents/${id}`)
}

export { signUp, signIn, getAllDocumentsOfAUser, createDocument, updateDocument, fetchSingleDocument };