// import { useEffect, useState, useContext } from "react";
// import { ContactContext } from "../../context/ContactContext";

// import { Link, useNavigate, useParams } from "react-router-dom";

// import {
//   getContact,
//   updateContact,
// } from "../../services/contactService";
// import { Spinner } from "../";
// import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";

// const EditContact = () => {

//   const { loading, setLoading, groups , contacts, setContacts , setFilteredContacts} = useContext(ContactContext);

//   const { contactId } = useParams();
//   const navigate = useNavigate();

//   const [contact, setContact] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const { data: contactData } = await getContact(contactId);

//         setLoading(false);
//         setContact(contactData);

//       } catch (err) {
//         console.log(err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const onContactChange = (event) => {
//     setContact({
//       ...contact,
//         [event.target.name]: event.target.value,
//     });
//   };

//   const submitForm = async (event) => {
//     event.preventDefault();
//     try {
//       setLoading(true);
//       const { data , status } = await updateContact(contact, contactId);
      
//       /*
//        * NOTE
//        * 1- forceRender -> setForceRender(!forceRender)
//        * 2- send requset server
//        * 3- update local state
//        * 4- update local state before sending requset server - first: copy stete , update state, send requst, status==200 ->success, status==error -> setStae(copy stete)
//        */

//       if (status==200) {
  
//         setLoading(false);

//         const allContacts=[...contacts];
//         const contactIndex=allContacts.findIndex(c=>c.id==parseInt(contactId));

//         console.log("before update",allContacts[contactIndex]);

//         allContacts[contactIndex]={...data};

//         console.log("after update",allContacts[contactIndex]);

//         setContacts(allContacts);
//         setFilteredContacts(allContacts);

//         navigate("/contacts");

//       }


//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };


  
//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <>
//           <section className="p-3">
//             <div className="container">
//               <div className="row my-2">
//                 <div className="col text-center">
//                   <p className="h4 fw-bold" style={{ color: ORANGE }}>
//                     ویرایش مخاطب
//                   </p>
//                 </div>
//               </div>
//               <hr style={{ backgroundColor: ORANGE }} />
//               <div
//                 className="row p-2 w-75 mx-auto align-items-center"
//                 style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
//               >
//                 <div className="col-md-8">
//                   <form onSubmit={submitForm}>
//                     <div className="mb-2">
//                       <input
//                         name="fullname"
//                         type="text"
//                         className="form-control"
//                         value={contact.fullname}
//                         onChange={onContactChange}
//                         required={true}
//                         placeholder="نام و نام خانوادگی"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         name="photo"
//                         type="text"
//                         value={contact.photo}
//                         onChange={onContactChange}
//                         className="form-control"
//                         required={true}
//                         placeholder="آدرس تصویر"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         name="mobile"
//                         type="number"
//                         className="form-control"
//                         value={contact.mobile}
//                         onChange={onContactChange}
//                         required={true}
//                         placeholder="شماره موبایل"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         name="email"
//                         type="email"
//                         className="form-control"
//                         value={contact.email}
//                         onChange={onContactChange}
//                         required={true}
//                         placeholder="آدرس ایمیل"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         name="job"
//                         type="text"
//                         className="form-control"
//                         value={contact.job}
//                         onChange={onContactChange}
//                         required={true}
//                         placeholder="شغل"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <select
//                         name="group"
//                         value={contact.group}
//                         onChange={onContactChange}
//                         required={true}
//                         className="form-control"
//                       >
//                         <option value="">انتخاب گروه</option>
//                         {groups.length > 0 &&
//                           groups.map((group) => (
//                             <option key={group.id} value={group.id}>
//                               {group.name}
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         type="submit"
//                         className="btn"
//                         style={{ backgroundColor: PURPLE }}
//                         value="ویرایش مخاطب"
//                       />
//                       <Link
//                         to={"/contacts"}
//                         className="btn mx-2"
//                         style={{ backgroundColor: COMMENT }}
//                       >
//                         انصراف
//                       </Link>
//                     </div>
//                   </form>
//                 </div>
//                 <div className="col-md-4">
//                   <img
//                     src={contact.photo}
//                     className="img-fluid rounded"
//                     style={{ border: `1px solid ${PURPLE}` }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="text-center mt-1">
//               <img
//                 src={require("../../assets/man-taking-note.png")}
//                 height="300px"
//                 style={{ opacity: "60%" }}
//               />
//             </div>
//           </section>
//         </>
//       )}
//     </>
//   );
// };

// export default EditContact;

import { useEffect, useState, useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { contactSchema } from "./../../validations/contactValidation";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getContact,
  updateContact,
} from "../../services/contactService";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { useImmer } from 'use-immer';

const EditContact = () => {

  const { loading, setLoading, groups , contacts, setContacts , setFilteredContacts} = useContext(ContactContext);

  const { contactId } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);

        setLoading(false);
        setContact(contactData);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onContactChange = (event) => {
    setContact({
      ...contact,
        [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (values) => {
    // event.preventDefault();
    try {
      setLoading(true);
      const { data , status } = await updateContact(values, contactId);

      if (status==200) {
  
        setLoading(false);

        // const allContacts=[...contacts];
        // const contactIndex=allContacts.findIndex(c=>c.id==parseInt(contactId));

        // console.log("before update",allContacts[contactIndex]);

        // allContacts[contactIndex]={...data};

        // console.log("after update",allContacts[contactIndex]);


        //با immer
        setContacts((draft)=>{
          const contactIndex= draft.findIndex(c=>c.id==parseInt(contactId));
          draft[contactIndex]={...data};

        });
        setFilteredContacts((draft)=>{
          const contactIndex= draft.findIndex(c=>c.id==parseInt(contactId));
          draft[contactIndex]={...data};

        });

        navigate("/contacts");

      }


    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                <Formik
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      submitForm(values);
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          name="fullname"
                          type="text"
                          className="form-control"
                          placeholder="نام و نام خانوادگی"
                        />
                        <ErrorMessage name="fullname" render={msg=><div className="text-danger">{msg}</div>}/>
                      </div>
                      <div className="mb-2">
                        <Field
                          name="photo"
                          type="text"
                          className="form-control"
                          placeholder="آدرس تصویر"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="mobile"
                          type="number"
                          className="form-control"
                          placeholder="شماره موبایل"
                        />
                        <ErrorMessage name="mobile" render={msg=><div className="text-danger">{msg}</div>} />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="آدرس ایمیل"
                        />
                        <ErrorMessage name="email" render={msg=><div className="text-danger">{msg}</div>} />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="job"
                          type="text"
                          className="form-control"
                          placeholder="شغل"
                        />
                        <ErrorMessage name="job" render={msg=><div className="text-danger">{msg}</div>} />
                      </div>
                      <div className="mb-2">
                        <Field
                          as="select"
                          name="group"
                          className="form-control"
                        >
                          <option value="">انتخاب گروه</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage name="group" render={msg=><div className="text-danger">{msg}</div>} />

                      </div>
                      <div className="mx-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          value="ساخت مخاطب"
                        />
                        <Link
                          to={"/contacts"}
                          className="btn mx-2"
                          style={{ backgroundColor: COMMENT }}
                        >
                          انصراف
                        </Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;


