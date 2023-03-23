// import { Configuration, OpenAIApi } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import { useEffect, useRef, useState } from 'react';
import avatar from './assets/ava.jpg'
import Chat from './components/Chat'
import useChatHistory from './hooks/useChatHistory'
import useLocalStorage from './hooks/useLocalStorage';

const defaultApiKey = "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";


function App() {
  const { addChat, addLoadingChat, chatHistory, removeLoadingChat } = useChatHistory()
  const [loading, setLoading] = useState(false)
  const [showApiInput, setShowApiInput] = useState(false)
  const [openai, setOpenAi] = useState(null)
  const [apiKey, setApiKey] = useState('')
  const { setToLS, getFromLS } = useLocalStorage()

  const bottomRef = useRef(null)

  const handleChangeApiKey = (e) => {
    e.preventDefault()

    setShowApiInput(false)
    setToLS('api-key', apiKey)

    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);
    setOpenAi(openai)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const chat = e.target.chat
    addChat(chat.value, true)

    addLoadingChat(false)

    const param = {
      model: "text-davinci-003",
      prompt: chat.value,
      max_tokens: 200,
    }

    openai.createCompletion(param)
      .then(res => {
        console.log('res', res)
        const data = res.data.choices[0].text
        setLoading(false)
        addChat(data, false)
        removeLoadingChat()
      })
      .catch(e => {
        const { status, message } = e.response
        setLoading(false)
        if (status === 401) {
          alert('api key wrong!!')
        } else {
          alert('something wrong!!')
        }
      })

    chat.value = ''
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })

    if (!getFromLS('api-key')) {
      setToLS('api-key', defaultApiKey)
      setApiKey(defaultApiKey)
      const configuration = new Configuration({ apiKey: defaultApiKey });
      const openai = new OpenAIApi(configuration);
      setOpenAi(openai)
    } else {
      setApiKey(getFromLS('api-key'))
      const configuration = new Configuration({ apiKey: getFromLS('api-key') });
      const openai = new OpenAIApi(configuration);
      setOpenAi(openai)
    }


  }, [chatHistory])

  return (
    <div className='h-screen flex flex-col text-gray-700 bg-orange-50'>
      <div className="header flex justify-between items-center bg-orange-600 px-4 lg:px-32 md:px-16 py-4">
        <div className='flex items-center'>
          <img src={avatar} className='rounded-full mr-8 w-12 h-12 object-cover' alt="avatar" />
          <p className='text-lg font-bold text-white'>ChatGPT Gadungan</p>
        </div>
        <div className='text-white flex items-center'>
          <div className='mr-2'>
            Api Key:
          </div>
          {
            showApiInput ?
              <form className='flex items-center' onSubmit={handleChangeApiKey} >
                <input type='text' name='apikey' value={apiKey} onChange={(e) => setApiKey(e.target.value)} className='w-full min-w-min py-2 px-4 text-gray-700 rounded-md' placeholder='Your Api Key' />
                <button type='submit' onClick={() => setShowApiInput(prev => !prev)} className='text-white px-4 py-2 font-bold  ml-4 bg-red-400 hover:bg-red-500 active:bg-red-600 disabled:bg-red-300'>Cancel</button>
              </form>
              :
              <button type='submit' onClick={() => setShowApiInput(prev => !prev)} className='text-white px-4 py-2 font-bold  ml-4 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 disabled:bg-orange-300'>Change</button>
          }
        </div>
      </div>
      <div className=" lg:px-32 md:px-16 chat-area overflow-auto flex-1 ">
        {/* <Chat myChat={true} time={'12:09'} >
          Anda bertanya, kami kabur
        </Chat> */}
        {
          chatHistory.length ?
            chatHistory.map(item => {
              return (
                <Chat key={item.id} myChat={item.myChat} time={item.time} >
                  {item.text}
                </Chat>
              )
            }) :
            <div className="text-gray-200 h-full flex justify-center items-center font-semibold italic text-xl">
              <p>
                Masih kosong gan
              </p>
            </div>
        }
        <div ref={bottomRef} />
      </div>
      <div className="typing-area border-t-2 shadow shadow-orange-200 bg-orange-100 ">
        <form onSubmit={handleSubmit}>
          <div className="flex py-2 px-4 lg:px-32 md:px-16">
            <input autoComplete='off' className='flex-1 py-2 px-4 rounded-md' type="text" placeholder='Ketik disini' name='chat' />
            <button disabled={loading} className='text-white px-4 py-2 font-bold text-lg ml-4 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 disabled:bg-orange-300 ' >Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
