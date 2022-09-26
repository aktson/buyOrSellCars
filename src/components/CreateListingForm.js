import React from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireStoreDb } from "../firebase.config";
import { serverTimestamp, addDoc, collection } from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import Loader from './Loader';
import ErrorSpan from './ErrorSpan';
import { Input, Button } from "@material-tailwind/react";
import { toast } from 'react-toastify';

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const FILE_SIZE = 160 * 1024;

const schema = yup.object().shape({
    km: yup.number().typeError("Must be a number").required("Kilometer stand is required"),
    city: yup.string().required("Please enter City or Town "),
    name: yup.string().required("Name is required"),
    price: yup.number().typeError("Must be a number").required("Price is required"),
    gear: yup.string().required("Please specify car gear type"),
    type: yup.string().required("Type is missing"),
    year: yup.number().typeError("Must be a number").required("Year is missing"),
    images: yup.mixed().required("Please add file")
})

function CreateListingForm() {

    const [userRef, setUserRef] = React.useState("");

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

    const auth = getAuth();
    const navigate = useNavigate();

    const isMounted = React.useRef(true);

    React.useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserRef(user.uid)
                } else {
                    navigate("/sign-in")
                }
            })

        }
        return () => {
            isMounted.current = false
        }

    }, [isMounted])

    async function handleFormSubmit(data) {
        const formData = { ...data, userRef }


        //Store image in firebase
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

                const storageRef = ref(storage, "images/" + fileName);

                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        reject(error)
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            })
        }

        const imgUrls = await Promise.all([...formData.images].map(image => storeImage(image))
        ).catch(() => {
            toast.error("Images not uploaded")
            return
        })

        const formDataCopy = { ...formData, imgUrls, timestamp: serverTimestamp() }

        delete formDataCopy.images;

        const docRef = await addDoc(collection(fireStoreDb, "listings"), formDataCopy);
        toast.success("Listings saved")
        navigate("/")
        console.log(formDataCopy)

    }

    return (
        <div className="container mx-auto my-6">
            <form className='max-w-xl mx-auto shadow-lg p-4 flex flex-col gap-3' onSubmit={handleSubmit(handleFormSubmit)}>
                <h2>Sell Car</h2>
                <div>
                    <Input variant="outlined" label="Name" color='teal' {...register("name")} />
                    {errors.name && <ErrorSpan message={errors.name.message} />}
                </div>
                <div>
                    <Input variant="outlined" label="Price" type="number" color='teal' {...register("price")} />
                    {errors.price && <ErrorSpan message={errors.price.message} />}
                </div>
                <div className='flex gap-3'>
                    <div className='flex flex-col w-full'>
                        <Input variant="outlined" label="Year" color='teal'  {...register("year")} />
                        {errors.year && <ErrorSpan message={errors.year.message} />}
                    </div>
                    <div className='flex flex-col w-full'>
                        <Input variant="outlined" label="Kilometer" type="number" color='teal' {...register("km")} />
                        {errors.year && <ErrorSpan message={errors.year.message} />}
                    </div>
                </div>
                <div className='flex gap-3'>
                    <div className='flex flex-col w-full'>
                        <select label="Gear Type" {...register("type")} className=" select"  >
                            <option value='Bensin'>Bensin</option>
                            <option value='Diesel'>Diesel</option>
                            <option value='Hybrid'>Hybrid</option>
                            <option value='Electric'>Electric</option>
                        </select>
                        {errors.type && <ErrorSpan message={errors.type.message} />}
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className="flex gap-10">
                            <select label="Gear" {...register("gear")} className=" select"  >
                                <option value='Automatic'>Automatic</option>
                                <option value='Manual'>Manual</option>
                            </select>
                        </div>
                        {errors.gear && <ErrorSpan message={errors.gear.message} />}
                    </div>
                </div>
                <div>
                    <Input variant="outlined" label="City/Town" color='teal' {...register("city")} />
                    {errors.city && <ErrorSpan message={errors.city.message} />}
                </div>
                <div>
                    <Input variant="outlined" label="Images" color='teal' type="file" accept='.jpeg, .jpg, .png' multiple {...register("images")} />
                    {errors.images && <ErrorSpan message={errors.images.message} />}
                </div>
                <Button className="my-4 bg-primary-dark" type='submit' >Add to Sell</Button>
            </form>
        </div >
    )
}

export default CreateListingForm