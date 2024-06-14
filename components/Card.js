function Card({ children, noPadding }) {
    let classes = 'bg-white shadow-md rounded-md mb-5';

    if (!noPadding) classes += ' p-4';

    return (
        <div className={classes}>
            {children}
        </div>
    );
}

export default Card;
