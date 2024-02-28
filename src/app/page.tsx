"use client"

import React, { useState } from "react";
import { Copy } from 'lucide-react'
import { Key } from "lucide-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [password, setPassword] = useState<string>('')
  const [options, setOptions] = useState({
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecialChars: true
  })

  function gerarSenha(tamanho: number): string {
    let caracteres = '';
    if (options.includeLowercase) caracteres += 'abcdefghijklmnopqrstuvwxyz'
    if (options.includeUppercase) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.includeNumbers) caracteres += '0123456789'
    if (options.includeSpecialChars) caracteres += '!@#$%^&*()-_'

    let senha = '';
    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres.charAt(indice);
    }
    return senha;
  }

  const gerarNovaSenha = () => {
    const newPassword = gerarSenha(12);
    setPassword(newPassword);
  };

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }))
  }

  const copiarSenha = () => {
    navigator.clipboard.writeText(password).then(notify)
  };

  function notify() {
    toast.success("Senha copiada para a área de transferência!")
  }

  return (
    <div className="text-white">
      <ToastContainer/>
      <header className="mt-4">
        <h1 className="flex items-center justify-center mb-4 text-4xl">Gerador de Senhas</h1>
        <span className="flex justify-center gap-3">
          <Copy size={24}/> para copiar sua senha.
          <Key size={24}/> para gerar sua senha.
        </span> 
      </header>

      <div className="text-2xl flex justify-center items-center max-w-[640px] mx-auto mt-20 bg-gray-700 p-[9px] rounded-full">
        {password}
        <div className="flex ml-10 gap-4">
          <Copy onClick={copiarSenha} cursor="pointer" size={25}/>
          <Key onClick={gerarNovaSenha} cursor="pointer" size={25}/>
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
