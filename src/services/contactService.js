import axios from 'axios';

const SERVER_URL = "http://localhost:3001";

//@desc get all contacts
//@route GET http://localhost:3001/contacts
export const getAllContacts=()=>{
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
};

//@desc get contact with contactId
//@route GET http://localhost:3001/contacts/:contactId
export const getContact=(contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
};

export const getAllGroups=()=>{
    const url = `${SERVER_URL}/Groups`;
    return axios.get(url);
};

export const getGroup=(groupId)=>{
    const url = `${SERVER_URL}/Groups/${groupId}`;
    return axios.get(url);
};

export const createContact=(contact)=>{
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url,contact);
};

export const updateContact=(contact,contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url,contact);
};

export const deleteContact=(contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
};