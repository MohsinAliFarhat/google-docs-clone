import React, { useState, useEffect, useCallback } from 'react'
import "./Document.css";
import Quill from "quill";
import 'quill/dist/quill.snow.css';
import { DocumentHeader } from "../DocumentHeader/DocumentHeader";
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

export const Document = () => {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [timeOutId, setTimeOutId] = useState("")

  const TOOL_BAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'cde-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  const wrapperRef = useCallback(wrapper => {
    if (!wrapper) return;

    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOL_BAR_OPTIONS } })
    setQuill(q);
    q.disable();
    q.setText('Loading...')
  }, [])

  //For socket connection
  useEffect(() => {

    const s = io('http://localhost:3000')
    setSocket(s)
    return () => s.disconnect();

  }, [])

  //For sending live changes to connected users with same documentId
  useEffect(() => {

    if (!socket || !quill) return

    const handler = (delta, oldDelta, source) => {

      if (source != "user") return;
      socket.emit('send-changes', delta);


      if (timeOutId) clearTimeout(timeOutId);

      const tId = setTimeout(documentSaveHandler, 1000);
      setTimeOutId(tId);

    }

    quill.on('text-change', handler);

    return () => quill.off('text-change', handler)
  }, [socket, quill,timeOutId])

  //For recieving live changes from user with same documentId
  useEffect(() => {

    if (!socket || !quill) return

    const handler = (delta) => {
      quill.updateContents(delta);
    }

    socket.on('recieve-changes', handler);

    return () => socket.off('recieve-changes', handler)
  }, [socket, quill])

  //Loading the document first time from DB
  useEffect(() => {

    if (!socket || !quill) return

    const handler = (document) => {
      quill.setContents(document);
      quill.enable();
    }

    socket.once('load-document', handler);
    socket.emit('get-document', documentId);

  }, [socket, quill, documentId]);

  const documentSaveHandler = () => {
    socket.emit('save-document', quill.getContents())
  }

  return (
    <>
      <DocumentHeader documentId={documentId} />
      <div className='container shadow-lg p-3 mb-5 bg-white rounded mt-3' ref={wrapperRef}>
      </div>
    </>
  )
}
