import React from 'react'
import { useState } from 'react';
import "./SignUp.css";
import { ButtonSpinner } from '../ButtonSpinner/ButtonSpinner';
import { signUp } from '../../api';
import { DangerAlert } from '../DangerAlert/DangerAlert';

export const SignUp = () => {
    // Variables
    const [userSignUpForm, setuserSignUpForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errorMsg, seterrorMsg] = useState('')
    const [loadingSpinner, setloadingSpinner] = useState(false);

    // Methods
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuserSignUpForm({ ...userSignUpForm, [name]: value });
    }

    const signUpUser = async (e) => {
        e.preventDefault();
        setloadingSpinner(true);
        
        signUp(userSignUpForm).then(res => {

            seterrorMsg('');
            setloadingSpinner(false);

        }).catch(err => {

            seterrorMsg(err.response.data.message);
            setloadingSpinner(false);

        });

    }

    // View
    return (
        <>
            <div className='main-content w-75 mx-auto'>
            <h1 className="text-center mx-auto signup-label">Sign Up & Collaborate in Real Time!</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" autoComplete="off" onChange={handleInput} required={true} value={userSignUpForm.name} name="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" autoComplete="off" onChange={handleInput} required={true} value={userSignUpForm.email} name="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" min={5} className="form-control" autoComplete="off" onChange={handleInput} required={true} value={userSignUpForm.password} name="password" />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary min-w-100" onClick={signUpUser}>
                            {loadingSpinner && <ButtonSpinner />} {!loadingSpinner && <>Let's Go!</>}
                        </button>
                    </div>
                </form>
                <div className='mt-2'>
                    {errorMsg && <DangerAlert className="mt-3" errMsg={errorMsg} />}
                </div>
            </div>
        </>
    )
}
