import BG from "./assets/BG_2x.png"

import icon_1 from "./assets/icon.png"
import icon_2 from "./assets/icon-1.png"
import icon_3 from "./assets/icon-2.png"
import icon_4 from "./assets/icon-3.png"

import { ChevronRight } from "lucide-react"
import { useRef } from "react"
import { api } from "./util/api"

const items = [
  {
    icon: icon_1,
    name: "As últimas inovações",
    description: "Mantenha-se atualizado com as mais recentes tecnologias e acessórios que vão revolucionar a forma como você trabalha."
  },

  {
    icon: icon_2,
    name: "Reviews detalhadas",
    description: "Analisamos os produtos mais populares do mercado para que você possa fazer as escolhas certas."
  },

  {
    icon: icon_3,
    name: "Dicas de organização",
    description: "Aumente sua eficiência e proteja sua saúde com conselhos especializados sobre ergonomia e organização."
  },

  {
    icon: icon_4,
    name: "Ofertas exclusivas",
    description: "Como membro da nossa comunidade, você terá acesso a descontos e promoções especiais em produtos selecionados."
  },

]

export function App() {
  const emailInputRef = useRef<HTMLInputElement | null>(null)

  function handleSendMail() {
    const e = emailInputRef.current?.value

    api.post(`/`, { email: e }).then(res => console.log(res.data))
  }

  return (
    <div className="bg-neutral-950 h-screen flex items-center justify-center">
      <img src={BG} alt="" className="h-screen min-w-fit absolute top-0 right-0"/>

      <div className="max-w-[76rem] min-w-[720px] absolute top-40">
        <div className="flex flex-col gap-8 max-w-[32rem]">

          <div className="flex flex-col gap-4">
            <p className="font-medium text-sm text-transparent inline-block bg-clip-text bg-gradient-to-r from-[#996DFF] to-[#C7AFFF]">NEWSLETTER EXCLUSIVA</p>
            <h1 className="font-bold text-white text-5xl">Workspace inspiration</h1>
          </div>

          <h2 className="text-[#C4C4CC] text-xl">
            Assine nossa newsletter e transforme seu espaço de trabalho em um oásis de produtividade!
          </h2>

          <div className="flex gap-2">
            <input 
              className="bg-[#202024] py-4 px-3 w-72 rounded-md text-white focus:ring-1 focus:ring-[#996DFF] focus:outline-none" 
              type="text"
              placeholder="Digite seu e-mail"
              ref={emailInputRef}
              name="emailInput"
            />
            <button 
              className="bg-gradient-to-r from-[#996DFF] to-[#C7AFFF] p-4 rounded-md font-bold flex gap-2 hover:opacity-90 transition-all"
              onClick={handleSendMail}
            >
              QUERO RECEBER
              <ChevronRight /> 
            </button>
          </div>
        </div>

        <div className="flex gap-10 mt-40">
          {
            items.map(i => (
              <div key={i.name}>
                <img src={i.icon} alt="" className="w-12 h-12 mb-4"/>
                <h2 className="text-lg text-white mb-2">{i.name}</h2>
                <p className="text-sm text-[#C4C4CC]">{i.description}</p>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}
