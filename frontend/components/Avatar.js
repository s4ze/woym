function Avatar ({ size }) {
    let width = 'w-12';
    if (size === 'lg') {
        width = 'w-36';
    }

    return (
        <div className={`${width} rounded-full overflow-hidden`}>
            <img src='https://i.pinimg.com/originals/e1/1f/06/e11f0644f5cac8de0c875cf246dc35dc.jpg'/>
        </div>
    );
}

export default Avatar;
