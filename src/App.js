import './App.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { ContactContext } from './context/ContactContext';
import _ from 'lodash';

import { useImmer } from 'use-immer';

// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';

import {
  AddContact,
  Contact,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { getAllContacts, getAllGroups, createContact, deleteContact } from './services/contactService';
import { CURRENTLINE, PURPLE, YELLOW, FOREGROUND, COMMENT } from './helpers/colors';

function App() {

  const navigate = useNavigate();

  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [contact, setContact] = useImmer({});
  const [groups, setGroups] = useImmer([]);





  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setFilteredContacts(contactsData);

        const { data: groupsData } = await getAllGroups();
        setGroups(groupsData);

        setLoading(false);


      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [])


  // const createContactForm = async (values) => {
  //   // event.preventDefault();

  //   try {
  //     setLoading(true);

  //     //abortEarly:false
  //     //یعنی تمام خطاها را برای من نمایش
  //     // await contactSchema.validate(contact,{abortEarly:false});

  //     // const { status, data } = await createContact(contact);
  //     const { status, data } = await createContact(values);

  //     /**
  //      * 1- rerender -> forceRende
  //      * 2- setContact(data)
  //      */

  //     if (status === 201) {

  //       ///نباید مستقیم استیت را تغییر داد
  //       // const allContacts = [...contacts, data];
  //       // setContacts(allContacts);
  //       // setFilteredContacts(allContacts);

  //       const allContacts = [...contacts, data];
  //       setContacts(allContacts);
  //       setFilteredContacts(allContacts);

  //       // setContact({});
  //       // setErrors([]);


  //       //روش 1
  //       setLoading(prevLoading => !prevLoading);

  //       //روش 2
  //       //setLoading(!loading);

  //       navigate("/contacts");
  //     }



  //   } catch (error) {
  //     // console.log(error);
  //     // console.log(error.inner);

  //     // setErrors(error.inner);

  //     setLoading(false);
  //   }

  // }

  const createContactForm = async (values) => {
    try {
      setLoading((draft) => !draft);

      const { status, data } = await createContact(values);


      if (status === 201) {
        // toast.success('مخاطب اضافه شد', {
        //   position: "top-right",
        //   autoClose:5000
        //   });
          toast.success('مخاطب اضافه شد')

        //روش اول بدون immer
        // const allContacts = [...contacts, data];
        // setContacts(allContacts);
        // setFilteredContacts(allContacts);

        //روش دوم با immer
        setContacts((draft) => { draft.push(data) });
        setFilteredContacts((draft) => { draft.push(data) });


        setLoading(prevLoading => !prevLoading);
        navigate("/contacts");
      }



    } catch (error) {
      setLoading(false);
    }

  }


  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  }

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="p-4" dir="rtl" style={{ backgroundColor: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: '1em' }}>
            <h1 style={{ color: YELLOW }}>حذف مخاطب</h1>
            <p style={{ color: FOREGROUND }}>آیا از حذف {contactFullname} مطمئن هستید؟</p>

            <button style={{ backgroundColor: PURPLE }} className="btn mx-2" onClick={() => { removeContact(contactId); onClose(); }}>مطمئن هستم</button>
            <button style={{ backgroundColor: COMMENT }} className="btn" onClick={() => { onClose(); }}>انصراف</button>

          </div>
        )
      }
    })
  }

  const removeContact = async (contactId) => {

    //copy contact before requset
    const contactsBackup = [...contacts];
    try {
      setLoading(true);

      /*
     * NOTE
     * 1- forceRender -> setForceRender(!forceRender)
     * 2- send requset server
     * 3- delete local state
     * 4- delete local state before sending requset server 
     */

      //روش دوم با immer
      setContacts(draft => draft.filter(c => c.id != contactId));
      setFilteredContacts(draft => draft.filter(c => c.id != contactId));

      //  بدون immer
      // const updateContact = contacts.filter(c => c.id != contactId);
      // setContacts(updateContact);
      // setFilteredContacts(updateContact);

      const { status } = await deleteContact(contactId);


      if (status != 200) {

        setContacts(contactsBackup);
        setFilteredContacts(contactsBackup);

      }

      setLoading(false);

    } catch (error) {
      console.log(error);
      setContacts(contactsBackup);
      setFilteredContacts(contactsBackup);
      setLoading(false);
    }
  }



  let filterSetTimeOut;
  // const contactSearch = (query) => {
  //   // setContactQuery({ ...contactQuery, text: event.target.value });

  //   // const allContacts = contacts.filter((contact) => {
  //   //   return contact.fullname
  //   //     ///.toLowerCase()
  //   //     .includes(event.target.value);
  //   // });
  //   if(!query) return setFilteredContacts([...contacts]);

  //   clearTimeout(filterSetTimeOut);


  //   filterSetTimeOut = setTimeout(()=>{
  //     setFilteredContacts(contacts.filter((contact) => {
  //       return contact.fullname
  //         ///.toLowerCase()
  //         .includes(query);
  //     }));
  //   },1000)
  //    console.log(query);

  // }

  const contactSearch = _.debounce((query) => {
    if (!query) return setFilteredContacts([...contacts]);

    ///بدون immer
    // setFilteredContacts(contacts.filter((contact) => {
    //   return contact.fullname
    //     ///.toLowerCase()
    //     .includes(query);
    // }));
    // console.log(query);

    //با immer
    setFilteredContacts(
      (draft) => draft.filter((c) => c.fullname.toLowerCase().includes(query.toLowerCase()))
    );

  }, 1000);


  return (
    <ContactContext.Provider value={{
      loading: loading,
      setLoading: setLoading,
      contact: contact,
      setContact: setContact,

      ///اگر نام کلید با مقدار برابر بود میتوان فقط یکی را نوشت
      contacts,
      setContacts,
      filteredContacts,
      setFilteredContacts,
      groups,
      // contactQuery,
      onContactChange,
      deleteContact: confirmDelete,
      createContact: createContactForm,
      contactSearch,

    }}>
      <div>
        {/* <ToastContainer
          position="top-right"       
          rtl
          autoClose={5000}
        />
        <ToastContainer /> */}
        <Toaster />
        <Navbar />
        <Routes>
          {/* بصورت خودکار زمانی که روت رفتیم ری دایرکت به ادرس مخطابین شو */}
          <Route path="/" element={<Navigate to="/contacts" />} />

          <Route path="/contacts" element={<Contacts />} />

          <Route path="/contacts/add" element={<AddContact />} />

          <Route path="/contacts/:contactId" element={<ViewContact />} />

          <Route path="/contacts/edit/:contactId" element={<EditContact />} />

        </Routes>
      </div>
    </ContactContext.Provider>
  );
}

export default App;
