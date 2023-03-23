import React, { useState } from 'react'

function useLocalStorage() {

    const setToLS = (key, value) => {
        value = JSON.stringify(value)
        localStorage.setItem(key, value)
    }

    const getFromLS = (key) => {

        return JSON.parse(localStorage.getItem(key))
    }

    return {
        setToLS, getFromLS
    }
}

export default useLocalStorage