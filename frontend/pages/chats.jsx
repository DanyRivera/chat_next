import Layout from '../layout/Layout';
import Chat from '../components/Chat';
import VistaChat from '../components/VistaChat';

const chats = () => {

    const arr = [1, 2, 3, 4, 5, 6]

    return (

        <Layout
            titulo="Chats"
        >
            <section>

                <div className='md:flex divide-x'>

                    <div className='md:w-1/4'>

                        <h1 className='my-5 ml-5 text-2xl md:text-3xl text-blue-600 font-bold'>Tus Chats</h1>

                        <div className={`${arr.length > 8 ? 'md:h-[570px] md:overflow-y-scroll' : ''}`}>
                            {arr.map(chat => (
                                <VistaChat />
                            ))}
                        </div>

                    </div>

                    <div className='hidden md:block md:w-3/4'>
                        <Chat />
                    </div>
                </div>

            </section>



        </Layout>

    )
}

export default chats