import React, { useState } from 'react'
import ChatLoading from '../components/ChatLoading'
import { getCurrentTime } from '../helper/getCurrentTime'
import uniqid from 'uniqid'

function useChatHistory() {
    const [chatHistory, setChatHistory] = useState([])

    const addLoadingChat = (myChat = false) => {
        const temp = {
            id: uniqid(),
            text: <ChatLoading />,
            time: getCurrentTime(),
            myChat: myChat,
            loading: true,
        }

        setChatHistory(prev => [...prev, temp])
    }

    const addChat = (text, myChat = false) => {
        const temp = {
            id: uniqid(),
            text: text,
            time: getCurrentTime(),
            myChat: myChat,
            loading: false,
        }
        setChatHistory(prev => [...prev, temp])
    }

    const removeLoadingChat = () => {
        setChatHistory(prev => prev.filter(item => !item.loading))
    }

    return { chatHistory, addChat, addLoadingChat, removeLoadingChat }
}

export default useChatHistory