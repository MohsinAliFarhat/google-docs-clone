import React, { useState } from 'react'
import "./SignInModal.css";
import ReactModal from 'react-modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { ButtonSpinner } from '../ButtonSpinner/ButtonSpinner';
import { signIn } from '../../api';
import { DangerAlert } from '../DangerAlert/DangerAlert';
import { useNavigate } from 'react-router-dom';

export const SignInModal = (props) => {
    const [errorMsg, seterrorMsg] = useState('')
    const [loadingSpinner, setloadingSpinner] = useState(false);
    const [userLoginForm, setuserLoginForm] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();


    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuserLoginForm({ ...userLoginForm, [name]: value });
    }

    const closeModal = () => {
        props.closeModal();
    }

    const signInUser = (e) => {
        e.preventDefault();
        setloadingSpinner(true);
        //Api call
        signIn(userLoginForm).then(res => {
            localStorage.setItem("accessToken",res.data.token)
            localStorage.setItem("name",res.data.name)
            navigate('/documents');
            seterrorMsg('');
            setloadingSpinner(false);

        }).catch(err => {

            seterrorMsg(err.response.data.message);
            setloadingSpinner(false);

        });

    }

    return (
        <>
            <ReactModal
                isOpen={props.showModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <CloseButton className='position-absolute top-0 end-0 me-3 mt-2' onClick={closeModal} />
                <div className='mt-5 w-75 mx-auto'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" onChange={handleInput} name="email" value={userLoginForm.email} id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={handleInput} name="password" value={userLoginForm.password} id="exampleInputPassword1" />
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary min-w-100" onClick={signInUser}>
                                {loadingSpinner && <ButtonSpinner />} {!loadingSpinner && <>Sign In</>}
                            </button>
                        </div>
                    </form>
                    <div className='mt-2'>
                        {errorMsg && <DangerAlert className="mt-3" errMsg={errorMsg} />}
                    </div>
                </div>
            </ReactModal>
        </>
    )
}

// Modal Styles
const customStyles = {
    content: {
        maxWidth: "500px",
        width: "80%",
        maxHeight: "500px",
        height: "40%",
        minHeight: "400px",
        margin: "auto"
    },
};