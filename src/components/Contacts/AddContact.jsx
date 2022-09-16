// import { Link } from "react-router-dom";

// import { Spinner } from "../";
// import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
// import { ContactContext } from "../../context/ContactContext";
// import { useContext } from "react";

// import { useFormik } from "formik";
// import { contactSchema } from "./../../validations/contactValidation";
// import { values } from "lodash";

// const AddContact = () => {
//   const { loading, contact, groups, createContact, onContactChange, errors } =
//     useContext(ContactContext);

//   const formik = useFormik({
//     initialValues: {
//       fullname: "",
//       photo: "",
//       mobile: "",
//       email: "",
//       job: "",
//       group: "",
//     },
//     validationSchema: contactSchema,
//     onSubmit: (values) => {
//       console.log(values);
//       createContact(values);
//     },
//   });

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <>
//           <section className="p-3">
//             <img
//               src={require("../../assets/man-taking-note.png")}
//               height="400px"
//               style={{
//                 position: "absolute",
//                 zIndex: "-1",
//                 top: "130px",
//                 left: "100px",
//                 opacity: "50%",
//               }}
//             />
//             <div className="container">
//               <div className="row">
//                 <div className="col">
//                   <p
//                     className="h4 fw-bold text-center"
//                     style={{ color: GREEN }}
//                   >
//                     ساخت مخاطب جدید
//                   </p>
//                 </div>
//               </div>
//               <hr style={{ backgroundColor: GREEN }} />
//               <div className="row mt-5">
//                 <div className="col-md-4">
//                   {/* {errors?.map((error,index)=>(
//                     <p className="text-danger alert alert-danger" key={index}>{error.message}</p>
//                   ))} */}
//                   <form onSubmit={formik.handleSubmit}>
//                     <div className="mb-2">
//                       <input
//                         id="fullname"
//                         name="fullname"
//                         type="text"
//                         // value={contact.fullname}
//                         // onChange={onContactChange}

//                         //value={formik.values.fullname}
//                         //onChange={formik.handleChange}

//                         //میخواهیم خطاها زمانی نشان دهد که روی همین المان باشیم
//                         //onBlur={formik.handleBlur}

//                         {
//                           ...formik.getFieldProps('fullname')
//                         }

//                         className="form-control"
//                         placeholder="نام و نام خانوادگی"
//                         // required={true}
//                       />
//                       {formik.touched.fullname && formik.errors.fullname ? (
//                         <div className="text-danger">
//                           {formik.errors.fullname}
//                         </div>
//                       ) : null}
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         id="photo"
//                         name="photo"
//                         type="text"
//                         // value={contact.photo}
//                         // onChange={onContactChange}

//                         value={formik.values.photo}
//                         onChange={formik.handleChange}
//                         className="form-control"
//                         // required={true}
//                         placeholder="آدرس تصویر"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         id="mobile"
//                         name="mobile"
//                         type="number"
//                         // value={contact.mobile}
//                         // onChange={onContactChange}

//                         value={formik.values.mobile}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="form-control"
//                         // required={true}
//                         placeholder="شماره موبایل"
//                       />
//                       {formik.touched.mobile && formik.errors.mobile ? (
//                         <div className="text-danger">
//                           {formik.errors.mobile}
//                         </div>
//                       ) : null}
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         id="email"
//                         type="email"
//                         name="email"
//                         // value={contact.email}
//                         // onChange={onContactChange}

//                         value={formik.values.email}
//                         onChange={formik.handleChange}

//                         onBlur={formik.handleBlur}

//                         className="form-control"
//                         // required={true}
//                         placeholder="آدرس ایمیل"
//                       />
//                       {formik.touched.email && formik.errors.email ? (
//                         <div className="text-danger">
//                           {formik.errors.email}
//                         </div>
//                       ) : null}
//                     </div>
//                     <div className="mb-2">
//                       <input
//                         id="job"
//                         type="text"
//                         name="job"
//                         // value={contact.job}
//                         // onChange={onContactChange}

//                         value={formik.values.job}
//                         onChange={formik.handleChange}

//                         onBlur={formik.handleBlur}

//                         className="form-control"
//                         // required={true}
//                         placeholder="شغل"
//                       />
//                       {formik.touched.job && formik.errors.job ? (
//                         <div className="text-danger">
//                           {formik.errors.job}
//                         </div>
//                       ) : null}
//                     </div>
//                     <div className="mb-2">
//                       <select
//                         id="group"
//                         name="group"
//                         // value={contact.group}
//                         // onChange={onContactChange}

//                         value={formik.values.group}
//                         onChange={formik.handleChange}

//                         onBlur={formik.handleBlur}

//                         // required={true}
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
//                       {formik.touched.group && formik.errors.group ? (
//                         <div className="text-danger">
//                           {formik.errors.group}
//                         </div>
//                       ) : null}
//                     </div>
//                     <div className="mx-2">
//                       <input
//                         type="submit"
//                         className="btn"
//                         style={{ backgroundColor: PURPLE }}
//                         value="ساخت مخاطب"
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
//               </div>
//             </div>
//           </section>
//         </>
//       )}
//     </>
//   );
// };

// export default AddContact;

import { Link } from "react-router-dom";

import { Spinner } from "../";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { ContactContext } from "../../context/ContactContext";
import { useContext } from "react";

import { useFormik, Formik, Field, ErrorMessage, Form } from "formik";
import { contactSchema } from "./../../validations/contactValidation";

const AddContact = () => {
  const { loading, groups, createContact } = useContext(ContactContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  <Formik
                    initialValues={{
                      fullname: "",
                      photo: "",
                      mobile: "",
                      email: "",
                      job: "",
                      group: "",
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      createContact(values);
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
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;
