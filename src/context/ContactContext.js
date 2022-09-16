import {createContext} from 'react';

export const ContactContext = createContext({
    loading:false,
    setLoading:()=>{} , ///this is Function

    contact:{},
    setContact:()=>{},

    contacts:[],
    setContacts:()=>{},

    filteredContacts:[],
    setFilteredContacts:()=>{},
    
    contactQuery:{},
    groups:[],

    errors:[],
    
    onContactChange:()=>{},
    deleteContact:()=>{},
    updateContact:()=>{},
    createContact:()=>{},
    contactSearch:()=>{}

});