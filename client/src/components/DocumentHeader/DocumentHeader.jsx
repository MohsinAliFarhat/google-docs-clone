import React from 'react'
import { useState } from 'react';
import GoogleDocsIcon from '../../assets/google-docs-icon.svg';
import { updateDocument, fetchSingleDocument } from '../../api/index';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

export const DocumentHeader = (props) => {
    const [documentName, setdocumentName] = useState("");
    const [timeOut, settimeOutId] = useState("");
    const [showSaving, setShowSaving] = useState(false);
    const navigate = useNavigate();
    const [showCopied, setshowCopied] = useState()

    const getDocumentName = async () => {
        const res = await fetchSingleDocument(props.documentId);
        setdocumentName(res.data.title)
    }

    const updateDocumentName = async () => {
        const res = await updateDocument(props.documentId, { title: documentName });
        setShowSaving(false);
    }

    const documentNameChange = (event) => {
        setShowSaving(true);
        if (timeOut) clearTimeout(timeOut);
        setdocumentName(event.target.value)
        const timeOutId = setTimeout(updateDocumentName, 1000);
        settimeOutId(timeOutId);
    }

    useEffect(() => {
        getDocumentName();

    }, [])

    const navigateToDocumentsList = () => {
        navigate('/documents')
    }

    const clickOnShare = () => {
        setshowCopied(true)
        navigator.clipboard.writeText(window.location.href)
        setTimeout(()=>setshowCopied(false), 1000);
    }

    return (
        <div className='d-flex p-2 border-bottom'>

            <div className='icon p-2'>
                <img src={GoogleDocsIcon} onClick={navigateToDocumentsList} alt="" role="button" />
            </div>
            <div className='p-3 px-1'>
                <input type="text" className='document-name' onChange={documentNameChange} value={documentName} />
            </div>
            <div className='p-3'>
                {showSaving && <>Saving...</>}
            </div>
            <div className='mt-3 ms-auto me-5'>
                <Tooltip title="Copy Link">
                    <button type="button" className="btn btn-primary" onClick={clickOnShare}>
                        {showCopied ? <>Copied</> : <>Copy Link</>}
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}
