import notFound from '../../resources/img/imgNotFound.jpeg'


const Page404 = () => {
    return (
        <div style={{display: 'flex',gap: '10px', flexDirection: 'column', marginTop: '30px', alignItems: 'center'}}>
            <div className="notFound-img">
                <img src={notFound} alt="notFound" />
            </div>
            <p style={{fontSize: '29px',marginTop: '10px', fontWeight: 'bold', color: '#000000ff'}} className="notFound-descr">Somethink went wrong.</p>
        </div>
    )
}

export default Page404;