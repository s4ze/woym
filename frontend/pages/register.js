import Link from 'next/link';
import React from 'react';

import Card from '@/components/Card';
import Layout from '@/components/Layout';

import "../styles/globals.css";

const RegisterPage = () => {
    var email = '';
    var name = '';
    var password = '';
    var confirmPassword = '';

    return (
        <Layout hideSidebar={true}>
            <div className='h-screen flex items-center'>
                <div className='max-w-sm mx-auto grow -mt-8'>
                    <h1 className='text-6xl mb-4 text-gray-300'>Login</h1>
                    <Card>
                        <div className='m-2'>
                            <div className='m-2'>
                                <h2 className='text-2xl mb-0 font-medium text-gray-600'>E-mail</h2>
                                <input className='border-2 rounded-md p-2 w-full' type='email'/>
                            </div>
                            <div className='m-2'>
                                <h2 className='text-2xl mb-0 font-medium text-gray-600'>Name</h2>
                                <input className='border-2 rounded-md p-2 w-full' type='text'/>
                            </div>
                            <div className='m-2'>
                                <h2 className='text-2xl mb-0 font-medium text-gray-600'>Password</h2>
                                <input className='border-2 rounded-md p-2 w-full' type='text'/>
                            </div>
                            <div className='m-2'>
                                <h2 className='text-2xl mb-0 font-medium text-gray-600'>Confirm password</h2>
                                <input className='border-2 rounded-md p-2 w-full' type='text'/>
                            </div>
                            <div className='mx-2 mt-3 mb-0'>
                                <Link href='/'>
                                    <button className='bg-woymBlue text-white text-lg py-2 rounded-lg w-full'>Sign up</button>
                                </Link>
                            </div>
                            <div className='m-2 mt-0 text-center'>
                                <Link href='/login' className='hover:text-woymBlue hover:underline text-xs'>Login</Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}

export default RegisterPage;
