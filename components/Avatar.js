function Avatar ({ size }) {
    let width = 'w-12';
    if (size === 'lg') {
        width = 'w-36';
    }

    return (
        <div className={`${width} rounded-full overflow-hidden`}>
            <img src='https://yt3.googleusercontent.com/GbNZ376PtR6w-cUMn9zWCrU1HhvG5m-8R7rFeadGmwT6ueb8CnWyO4OgyJIrEZrm_c2W1EDd=s176-c-k-c0x00ffffff-no-rj' />
        </div>
    );
}

export default Avatar;
