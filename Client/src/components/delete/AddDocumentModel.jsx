import React, { useState, useRef, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress';
import Loader from '../Loader'

import CloseIcon from '@mui/icons-material/Close';


import './adddocs.css'
function AddDocumentModel({ listen, setListen }) {
    // useState
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const { modelAddDocument } = useContext(Context)
    const { loader, setLoader } = useContext(Context)
    const inputFile = useRef(null)



    // useForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    // handle functions
    const handleCloseModel = () => {
        modelAddDocument.current.classList.remove('active')
    }
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    // Form Submit 
    const submitForm = (data) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("matricule", data.matricule);
        formData.append("subject", data.subject);
        formData.append("description", data.description);
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/documents/upload`, formData).then((response) => {
            console.log(response.data)
            inputFile.current.value = ""
            reset()
            setListen(!listen)
            setLoader(false)
            window.alert(response.data)
        }).catch((error) => {
            console.log(error)
            setLoader(false)
            if (error.response) {
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
            }
        })
    }
    return (
        <>
            <div className="overlay-add-document"  >
                <form onSubmit={handleSubmit(submitForm)} >
                    <div className="model-add-document" ref={modelAddDocument}>

                        <div className="model-header-add-document">
                            <h5>New Document</h5>
                            <CloseIcon className="testIcon" sx={{ cursor: 'pointer' }} onClick={handleCloseModel} />
                        </div>

                        <div className="model-content-add-document">
                            <div className="docs-reciver">
                                To
                                <input
                                    type="number"
                                    min="0"
                                    {...register("matricule")}
                                    style={{ border: 'none', width: '96%', padding: '0 5px', outline: 'none' }}
                                    required
                                />
                            </div>
                            <div className="docs-subject docs-reciver">
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    {...register("subject")}
                                    style={{ border: 'none', width: '100%', padding: '0', outline: 'none' }}
                                />
                            </div>
                            <div className="docs-content docs-reciver">
                                <textarea
                                    placeholder="Text"
                                    cols="30" rows="14"
                                    {...register("description")}
                                    style={{ border: 'none', fontSize: '14px', width: '100%', outline: 'none' }}
                                >
                                </textarea>
                                <input
                                    type="file"
                                    ref={inputFile}
                                    onChange={saveFile}
                                    required
                                />
                            </div>
                        </div>

                        <div className="model-footer-add-document">
                            <div>
                                {loader ?
                                    <CircularProgress sx={{ marginLeft: '110px', size: 10 }} />
                                    :
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-add-document">
                                        Send
                                    </button>
                                }
                            </div>
                        </div>

                    </div>
                </form>
            </div>

        </>
    )
}

export default AddDocumentModel
