import React, { useEffect, useState } from 'react'
import "./ListDocuments.css";
import DocIcon from '../../assets/doc-icon.svg'
import { Header } from "../Header/Header"
import { useNavigate } from 'react-router-dom';
import { getAllDocumentsOfAUser } from '../../api';
import { createDocument } from '../../api';

export const ListDocuments = () => {
    const navigate = useNavigate();
    const [documents, setdocuments] = useState([])

    useEffect(() => {
        const getDocuments = async () => {
            const documents = await getAllDocumentsOfAUser();
            setdocuments(documents.data.documents);
        }
        getDocuments();
    }, [])

    const createNewDocument = async () => {
        const d = new Date();
        let time = d.getTime();
        const newDocument = await createDocument({ createdAt: time })
        navigate(`/documents/${newDocument.data._id}`);
    }


    const openDocument = (documentId) => {
        navigate(`/documents/${documentId}`);
    }

    return (
        <>
            <Header />
            <div className="documents mt-5">
                <div className='text-center btn btn-success max-w-10' onClick={createNewDocument}>
                    Create new Document
                </div>
                <h1 className='display-6 mt-5'>Your Documents</h1>
                <ul>
                    {documents?.map(document =>
                    (
                        <li key={document._id} onClick={() => openDocument(document._id)}>
                            <div className='d-flex flex-row'>
                                <img src={DocIcon} />
                                <span className='ms-2'>{document.title}</span>
                            </div>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </>
    )
}
