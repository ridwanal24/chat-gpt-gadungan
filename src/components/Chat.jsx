import React from 'react'

function Chat({ myChat = false, children, time = '' }) {
    return (
        <div className={`flex justify-${myChat ? 'end' : 'start'} chat-wrapper py-2 px-4`}>
            {/* <div className={`flex justify-end chat-wrapper py-2 px-4`}> */}
            <div className={`${myChat ? 'bg-orange-400 text-white' : 'bg-white'} shadow-md rounded-md py-2 min-w-1/3 max-w-2/3 px-4 break-words`}>
                <div>
                    {children}
                </div>
                <div className={`flex justify-end text-xs ${myChat ? 'text-orange-200' : 'text-gray-300'} `}>
                    {time}
                </div>
            </div>
        </div>
    )
}

export default Chat