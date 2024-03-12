import { Copy, Key } from "lucide-react";

export default function Header() {
  return (
    <header className="p-5">
      <h1 className="flex items-center justify-center mb-4 text-4xl">Gerador de Senhas</h1>
      <span className="flex justify-center gap-3">
        <Copy size={24}/> para copiar sua senha.
        <Key size={24}/> para gerar sua senha.
      </span> 
    </header>
  )
}