// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import Select from "react-select"
// import { debounce } from "lodash"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import "react-quill/dist/quill.snow.css"
// import ReactQuill from "react-quill"
// import { ChevronDown, Image, Play } from "lucide-react"

// const AddCourse = () => {
//   const [errors, setErrors] = useState({
//     courseBannerImage: "",
//     courseIntroVideo: "",
//   })
//   const navigate = useNavigate()
//   const [activeTab, setActiveTab] = useState("basic")
//   const [error, setError] = useState({})
//   const [isLoading, setIsLoading] = useState(false)

//   const [courseData, setCourseData] = useState({
//     course_title: "",
//     course_category_name: [],
//     course_level_name: [],
//     course_description: "",
//     course_banner_image: null,
//     course_intro_video: null,
//     requirements: "",
//     course_price: 0,
//     after_discount_price: 0,
//     coupon_code: "",
//     course_language_name: [],
//     discount_percent: 0,
//     learning_objectives: "",
//     target_audience: "",
//     time_spent_on_course: "",
//   })

//   const handleInputChange = (e) => {
//     setCourseData({ ...courseData, [e.target.name]: e.target.value })
//   }

//   const handleSelectChange = (name) => (selectedOptions) => {
//     if (selectedOptions && selectedOptions.length > 0) {
//       const selectedLabels = selectedOptions.map((option) => option.label)
//       const selectedValues = selectedOptions.map((option) => option.value)

//       setCourseData((prevData) => ({
//         ...prevData,
//         [`${name}_names`]: selectedLabels,
//         [`${name}_ids`]: selectedValues,
//       }))

//       console.log(`Updated ${name}:`, selectedOptions)
//     } else {
//       console.warn(`No options selected for ${name}`)
//       setCourseData((prevData) => ({
//         ...prevData,
//         [`${name}_names`]: [],
//         [`${name}_ids`]: [],
//       }))
//     }
//   }

//   const handleEditorChange = (value) => {
//     setCourseData({ ...courseData, course_description: value })
//   }

//   const handleFileChange = (e) => {
//     const { name, files } = e.target
//     const file = files[0]

//     if (name === "course_banner_image" && file) {
//       if (!["image/jpeg", "image/png"].includes(file.type)) {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           courseBannerImage: "Invalid file type. Only JPEG and PNG are allowed.",
//         }))
//         toast.error("Invalid file type. Only JPEG and PNG are allowed.")
//         return
//       } else {
//         setErrors((prevErrors) => ({ ...prevErrors, courseBannerImage: "" }))
//       }
//     }

//     if (name === "course_intro_video" && file) {
//       if (file.type !== "video/mp4") {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           courseIntroVideo: "Invalid file type. Only MP4 is allowed.",
//         }))
//         toast.error("Invalid file type. Only MP4 is allowed.")
//         return
//       } else {
//         setErrors((prevErrors) => ({ ...prevErrors, courseIntroVideo: "" }))
//       }
//     }

//     setCourseData((prevData) => ({
//       ...prevData,
//       [name]: file || "",
//     }))
//   }

//   useEffect(() => {
//     if (courseData.course_price && courseData.discount_percent) {
//       const price = Number.parseFloat(courseData.course_price)
//       const discount = Number.parseFloat(courseData.discount_percent)
//       const discountedPrice = price - price * (discount / 100)
//       setCourseData((prevData) => ({
//         ...prevData,
//         after_discount_price: discountedPrice.toFixed(2),
//       }))
//     }
//   }, [courseData.course_price, courseData.discount_percent])

//   const handleSave = debounce(async () => {
//     console.log("check")
//     await saveCourse()
//   }, 3000)

//   const saveCourse = async () => {
//     setIsLoading(true)
//     try {
//       const formData = new FormData()
//       console.log(courseData)

//       for (const key in courseData) {
//         if (key === "course_banner_image" || key === "course_intro_video") {
//           if (courseData[key] instanceof File) {
//             formData.append(key, courseData[key], courseData[key]?.name)
//           }
//         } else {
//           formData.append(key, courseData[key])
//         }
//       }
//       console.log(formData, "FormData contents")

//       // Simulating API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       console.log("Course saved successfully:", formData)
//       toast.success("Course created successfully!")
//       setTimeout(() => {
//         navigate("/instructor/instructor-dashboard")
//       }, 2000)
//     } catch (error) {
//       console.error("Error details:", error)
//       toast.error("Failed to create section. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const categoryOptions = [
//     { label: "Web Development", value: "web-dev" },
//     { label: "Mobile Development", value: "mobile-dev" },
//     { label: "Data Science", value: "data-science" },
//   ]

//   const levelOptions = [
//     { label: "Beginner", value: "beginner" },
//     { label: "Intermediate", value: "intermediate" },
//     { label: "Advanced", value: "advanced" },
//   ]

//   const languageOptions = [{ id: 1, label: "English", value: "English" }]

//   const selectStyle = {
//     control: (base) => ({
//       ...base,
//       border: "1px solid #e2e8f0",
//       borderRadius: "0.375rem",
//       minHeight: "2.5rem",
//     }),
//     menu: (base) => ({
//       ...base,
//       borderRadius: "0.375rem",
//       marginTop: "0.5rem",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isSelected ? "#3b82f6" : state.isFocused ? "#e2e8f0" : "white",
//       color: state.isSelected ? "white" : "black",
//     }),
//   }

//   const validateForm = (tab) => {
//     let isValid = true
//     const newErrors = {}

//     const basicFields = [
//       "course_title",
//       "course_category_name",
//       "course_level_name",
//       "course_description",
//       "course_language_name",
//       "learning_objectives",
//       "target_audience",
//       "time_spent_on_course",
//     ]

//     const fieldsToValidate = tab === "basic" ? basicFields : []

//     console.log("Fields to validate:", fieldsToValidate)
//     console.log("Current courseData:", courseData)

//     fieldsToValidate.forEach((field) => {
//       if (!courseData[field]) {
//         newErrors[field] = "This field is required"
//         isValid = false
//         console.log(`Validation failed for field: ${field}`)
//       }
//     })

//     setError(newErrors)
//     console.log("Errors after validation:", newErrors)

//     return isValid
//   }

//   const handleContinue = () => {
//     if (validateForm("basic")) {
//       console.log("Validation successful, moving to the next step")
//       setActiveTab("media")
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold mb-2">Add New Course</h2>
//         <nav className="text-sm breadcrumbs">
//           <ol className="list-none p-0 inline-flex">
//             <li className="flex items-center">
//               <Link to="/home" className="text-blue-600 hover:text-blue-800">
//                 Home
//               </Link>
//               <span className="mx-2">/</span>
//             </li>
//             <li className="flex items-center">Add New Course</li>
//           </ol>
//         </nav>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="p-6">
//           <div className="flex mb-8">
//             <div className={`flex-1 text-center ${activeTab === "basic" ? "text-blue-600 font-semibold" : ""}`}>
//               <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">1</span>
//               Basic Information
//             </div>
//             <div className={`flex-1 text-center ${activeTab === "media" ? "text-blue-600 font-semibold" : ""}`}>
//               <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">2</span>
//               Courses Media
//             </div>
//             <div className={`flex-1 text-center ${activeTab === "settings" ? "text-blue-600 font-semibold" : ""}`}>
//               <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">3</span>
//               Settings
//             </div>
//           </div>

//           {activeTab === "basic" && (
//             <div>
//               <h4 className="text-xl font-semibold mb-4">Basic Information</h4>
//               <form>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_title">
//                     Course Title
//                   </label>
//                   <input
//                     type="text"
//                     id="course_title"
//                     name="course_title"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="Title of your Course"
//                     onChange={handleInputChange}
//                   />
//                   {error.course_title && <p className="text-red-500 text-xs italic">{error.course_title}</p>}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Courses Category / Discipline</label>
//                   <Select
//                     options={categoryOptions}
//                     onChange={handleSelectChange("course_category")}
//                     placeholder="Select Category"
//                     styles={selectStyle}
//                     isMulti
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Courses Level</label>
//                   <Select
//                     options={levelOptions}
//                     onChange={handleSelectChange("course_level")}
//                     placeholder="Select Level"
//                     styles={selectStyle}
//                     isMulti
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Course Language</label>
//                   <div className="relative">
//                     <Select
//                       options={languageOptions}
//                       onChange={handleSelectChange("course_language_name")}
//                       placeholder="Select Language"
//                       styles={selectStyle}
//                     />
//                     <ChevronDown
//                       className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none"
//                       size={20}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Course Description</label>
//                   <ReactQuill
//                     onChange={handleEditorChange}
//                     placeholder="Enter course description..."
//                     className="h-48 mb-4"
//                   />
//                   {error.course_description && (
//                     <p className="text-red-500 text-xs italic">{error.course_description}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">What you will Learn</label>
//                   <textarea
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     name="learning_objectives"
//                     value={courseData.learning_objectives}
//                     onChange={handleInputChange}
//                   ></textarea>
//                   {error.learning_objectives && (
//                     <p className="text-red-500 text-xs italic">{error.learning_objectives}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Who is this Course for?</label>
//                   <input
//                     type="text"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     name="target_audience"
//                     placeholder="Target Audience"
//                     value={courseData.target_audience}
//                     onChange={handleInputChange}
//                   />
//                   {error.target_audience && <p className="text-red-500 text-xs italic">{error.target_audience}</p>}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Time Spent on Course (in hour)</label>
//                   <input
//                     type="text"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     name="time_spent_on_course"
//                     placeholder="Time spent on courses"
//                     value={courseData.time_spent_on_course}
//                     onChange={handleInputChange}
//                   />
//                   {error.time_spent_on_course && (
//                     <p className="text-red-500 text-xs italic">{error.time_spent_on_course}</p>
//                   )}
//                 </div>
//               </form>
//               <div className="mt-6">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   onClick={handleContinue}
//                 >
//                   Continue
//                 </button>
//               </div>
//             </div>
//           )}

//           {activeTab === "media" && (
//             <div>
//               <h4 className="text-xl font-semibold mb-4">Courses Media</h4>
//               <form>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Course cover image</label>
//                   <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6">
//                     <input
//                       type="file"
//                       name="course_banner_image"
//                       onChange={handleFileChange}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     />
//                     <div className="text-center">
//                       <Image className="mx-auto h-12 w-12 text-gray-400" />
//                       <p className="mt-1 text-sm text-gray-600">
//                         {courseData.course_banner_image
//                           ? courseData.course_banner_image.name
//                           : "Click to upload or drag and drop"}
//                       </p>
//                     </div>
//                   </div>
//                   {errors.courseBannerImage && (
//                     <p className="text-red-500 text-xs italic mt-2">{errors.courseBannerImage}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Course Intro Video (MP4)</label>
//                   <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6">
//                     <input
//                       type="file"
//                       name="course_intro_video"
//                       onChange={handleFileChange}
//                       accept=".mp4"
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     />
//                     <div className="text-center">
//                       <Play className="mx-auto h-12 w-12 text-gray-400" />
//                       <p className="mt-1 text-sm text-gray-600">
//                         {courseData.course_intro_video
//                           ? courseData.course_intro_video.name
//                           : "Click to upload or drag and drop"}
//                       </p>
//                     </div>
//                   </div>
//                   {errors.courseIntroVideo && (
//                     <p className="text-red-500 text-xs italic mt-2">{errors.courseIntroVideo}</p>
//                   )}
//                 </div>

//                 <div className="flex justify-between mt-6">
//                   <button
//                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     onClick={() => setActiveTab("basic")}
//                   >
//                     Previous
//                   </button>
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     onClick={() => setActiveTab("settings")}
//                   >
//                     Continue
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {activeTab === "settings" && (
//             <div>
//               <h4 className="text-xl font-semibold mb-4">Course Settings</h4>
//               <form>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Note by Trainer</label>
//                   <textarea
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     name="requirements"
//                     value={courseData.requirements}
//                     onChange={handleInputChange}
//                   ></textarea>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Course Price</label>
//                   <input
//                     type="number"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="0"
//                     name="course_price"
//                     value={courseData.course_price}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Discount Percent</label>
//                   <input
//                     type="number"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="0"
//                     name="discount_percent"
//                     value={courseData.discount_percent}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Price After Discount</label>
//                   <input
//                     type="number"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="0"
//                     name="after_discount_price"
//                     value={courseData.after_discount_price}
//                     readOnly
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">Coupon Code</label>
//                   <input
//                     type="text"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="Enter coupon code"
//                     name="coupon_code"
//                     value={courseData.coupon_code}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="flex justify-between mt-6">
//                   <button
//                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     onClick={() => setActiveTab("media")}
//                   >
//                     Previous
//                   </button>
//                   <button
//                     className={`${
//                       isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
//                     } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
//                     onClick={handleSave}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Saving...
//                       </>
//                     ) : (
//                       "Save Course"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AddCourse

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { debounce } from "lodash"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "react-quill/dist/quill.snow.css"

import BasicInformationForm from "./BasicInformationForm"
import CourseMediaForm from "./CourseMediaForm"
import CourseSettingsForm from "./CourseSettingsForm"

const AddCourse = () => {
  const [errors, setErrors] = useState({
    courseBannerImage: "",
    courseIntroVideo: "",
  })
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("basic")
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const [courseData, setCourseData] = useState({
    course_title: "",
    course_category_name: [],
    course_level_name: [],
    course_description: "",
    course_banner_image: null,
    course_intro_video: null,
    requirements: "",
    course_price: 0,
    after_discount_price: 0,
    coupon_code: "",
    course_language_name: [],
    discount_percent: 0,
    learning_objectives: "",
    target_audience: "",
    time_spent_on_course: "",
  })

  const handleInputChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name) => (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedLabels = selectedOptions.map((option) => option.label)
      const selectedValues = selectedOptions.map((option) => option.value)

      setCourseData((prevData) => ({
        ...prevData,
        [`${name}_names`]: selectedLabels,
        [`${name}_ids`]: selectedValues,
      }))

      console.log(`Updated ${name}:`, selectedOptions)
    } else {
      console.warn(`No options selected for ${name}`)
      setCourseData((prevData) => ({
        ...prevData,
        [`${name}_names`]: [],
        [`${name}_ids`]: [],
      }))
    }
  }

  const handleEditorChange = (value) => {
    setCourseData({ ...courseData, course_description: value })
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    const file = files[0]

    if (name === "course_banner_image" && file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          courseBannerImage: "Invalid file type. Only JPEG and PNG are allowed.",
        }))
        toast.error("Invalid file type. Only JPEG and PNG are allowed.")
        return
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, courseBannerImage: "" }))
      }
    }

    if (name === "course_intro_video" && file) {
      if (file.type !== "video/mp4") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          courseIntroVideo: "Invalid file type. Only MP4 is allowed.",
        }))
        toast.error("Invalid file type. Only MP4 is allowed.")
        return
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, courseIntroVideo: "" }))
      }
    }

    setCourseData((prevData) => ({
      ...prevData,
      [name]: file || "",
    }))
  }

  useEffect(() => {
    if (courseData.course_price && courseData.discount_percent) {
      const price = Number.parseFloat(courseData.course_price)
      const discount = Number.parseFloat(courseData.discount_percent)
      const discountedPrice = price - price * (discount / 100)
      setCourseData((prevData) => ({
        ...prevData,
        after_discount_price: discountedPrice.toFixed(2),
      }))
    }
  }, [courseData.course_price, courseData.discount_percent])

  const handleSave = debounce(async () => {
    console.log("check")
    await saveCourse()
  }, 3000)

  const saveCourse = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      console.log(courseData)

      for (const key in courseData) {
        if (key === "course_banner_image" || key === "course_intro_video") {
          if (courseData[key] instanceof File) {
            formData.append(key, courseData[key], courseData[key]?.name)
          }
        } else {
          formData.append(key, courseData[key])
        }
      }
      console.log(formData, "FormData contents")

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Course saved successfully:", formData)
      toast.success("Course created successfully!")
      setTimeout(() => {
        navigate("/admin-dashboard/dashboard")
      }, 2000)
    } catch (error) {
      console.error("Error details:", error)
      toast.error("Failed to create section. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const categoryOptions = [
    { label: "Web Development", value: "web-dev" },
    { label: "Mobile Development", value: "mobile-dev" },
    { label: "Data Science", value: "data-science" },
  ]

  const levelOptions = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ]

  const languageOptions = [{ id: 1, label: "English", value: "English" }]

  const selectStyle = {
    control: (base) => ({
      ...base,
      border: "1px solid #e2e8f0",
      borderRadius: "0.375rem",
      minHeight: "2.5rem",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.375rem",
      marginTop: "0.5rem",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#3b82f6" : state.isFocused ? "#e2e8f0" : "white",
      color: state.isSelected ? "white" : "black",
    }),
  }

  const validateForm = (tab) => {
    let isValid = true
    const newErrors = {}

    const basicFields = [
      "course_title",
      "course_category_name",
      "course_level_name",
      "course_description",
      "course_language_name",
      "learning_objectives",
      "target_audience",
      "time_spent_on_course",
    ]

    const fieldsToValidate = tab === "basic" ? basicFields : []

    console.log("Fields to validate:", fieldsToValidate)
    console.log("Current courseData:", courseData)

    fieldsToValidate.forEach((field) => {
      if (!courseData[field]) {
        newErrors[field] = "This field is required"
        isValid = false
        console.log(`Validation failed for field: ${field}`)
      }
    })

    setError(newErrors)
    console.log("Errors after validation:", newErrors)

    return isValid
  }

  const handleContinue = () => {
    if (validateForm("basic")) {
      console.log("Validation successful, moving to the next step")
      setActiveTab("media")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Add New Course</h2>
        <nav className="text-sm breadcrumbs">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/home" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">Add New Course</li>
          </ol>
        </nav>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex mb-8">
            <div className={`flex-1 text-center ${activeTab === "basic" ? "text-blue-600 font-semibold" : ""}`}>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">1</span>
              Basic Information
            </div>
            <div className={`flex-1 text-center ${activeTab === "media" ? "text-blue-600 font-semibold" : ""}`}>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">2</span>
              Courses Media
            </div>
            <div className={`flex-1 text-center ${activeTab === "settings" ? "text-blue-600 font-semibold" : ""}`}>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">3</span>
              Settings
            </div>
          </div>

          {activeTab === "basic" && (
            <BasicInformationForm
              courseData={courseData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleEditorChange={handleEditorChange}
              error={error}
              categoryOptions={categoryOptions}
              levelOptions={levelOptions}
              languageOptions={languageOptions}
              selectStyle={selectStyle}
            />
          )}

          {activeTab === "media" && (
            <CourseMediaForm courseData={courseData} handleFileChange={handleFileChange} errors={errors} />
          )}

          {activeTab === "settings" && (
            <CourseSettingsForm courseData={courseData} handleInputChange={handleInputChange} />
          )}

          <div className="mt-8 flex justify-between">
            {activeTab !== "basic" && (
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setActiveTab(activeTab === "media" ? "basic" : "media")}
              >
                Previous
              </button>
            )}
            {activeTab !== "settings" ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setActiveTab(activeTab === "basic" ? "media" : "settings")}
              >
                Continue
              </button>
            ) : (
              <button
                className={`${
                  isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  "Save Course"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCourse

