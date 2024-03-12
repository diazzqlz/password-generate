"use client"

import React, { useState } from "react";
import { Copy } from 'lucide-react'
import { Key } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { notify } from "@/services/notify";

import Header from '@/components/Header'

export default function Home() {
  const [password, setPassword] = useState<string>('')
  const [options, setOptions] = useState({
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecialChars: true
  })

  function generatePassword(size: number): string {
    let caracteres = '';
    if (options.includeLowercase) caracteres += 'abcdefghijklmnopqrstuvwxyz'
    if (options.includeUppercase) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.includeNumbers) caracteres += '0123456789'
    if (options.includeSpecialChars) caracteres += '!@#$%^&*()-_'

    let senha = '';
    for (let i = 0; i < size; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres.charAt(indice);
    }
    return senha;
  }

  const generateNewPassword = () => {
    const newPassword = generatePassword(12);
    setPassword(newPassword);
  };

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }))
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password).then(notify)
  };

  return (
    <div className="text-white">
      <ToastContainer/>
      <Header/>

      <div className="text-2xl flex justify-center items-center max-w-[640px] mx-auto mt-20 bg-gray-700 p-[9px] rounded-full">
        {password}
        <div className="flex ml-10 gap-4">
          <Copy onClick={copyPassword} cursor="pointer" size={25}/>
          <Key onClick={generateNewPassword} cursor="pointer" size={25}/>
        </div>
      </div>

      <div className="flex justify-center mt-3 font-bold gap-4">
        <label>
          <input
            type="checkbox"
            checked={options.includeLowercase}
            onChange={() => handleOptionChange('includeLowercase')}
          />
          Letras minúsculas
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={options.includeUppercase}
            onChange={() => handleOptionChange('includeUppercase')}
          />
          Letras maiúsculas
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={options.includeNumbers}
            onChange={() => handleOptionChange('includeNumbers')}
          />
          Números
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={options.includeSpecialChars}
            onChange={() => handleOptionChange('includeSpecialChars')}
          />
          Caracteres especiais
        </label>
      </div>
    </div>
  );
}
