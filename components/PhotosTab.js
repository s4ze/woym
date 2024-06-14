import React from 'react';
import Card from './Card';

const PhotosTab = () => {
    return (
        <Card>
            <div className='grid grid-cols-2 gap-4'>
                <div className='rounded-md overflow-hidden h-48 flex items-center shadow-md'>
                    <img src='https://images.unsplash.com/photo-1613639874322-60e5afb8e8dd?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
                </div>
                <div className='rounded-md overflow-hidden h-48 flex items-center shadow-md'>
                    <img src='https://images.unsplash.com/photo-1613639212313-e30d05d9b032?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
                </div>
                <div>
                    <img src=''/>
                </div>
            </div>
        </Card>
    );
}

export default PhotosTab;
