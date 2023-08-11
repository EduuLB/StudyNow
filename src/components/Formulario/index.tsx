import React, { useState } from 'react'
import Botao from "./Botao"
import style from './Formulario.module.scss'
import { ITarefa } from '../../types/tarefa'
import { v4 as uuidv4 } from 'uuid'

interface Props {
    setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>
}

function Formulario ({setTarefas} : Props) {

    const [tarefa, setTarefa] = useState({
        tarefa: "",
        tempo: "00:00:00"
    })

    function adicionarTarefa(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        setTarefas(tarefasAntigas => 
            [ 
                ...tarefasAntigas, 
                    {
                    ...tarefa,
                    selecionado: false,
                    completado: false,
                    id: uuidv4()
                }
            ]
        );
        setTarefa({
            tarefa: "",
            tempo: "00:00"
        })
    }

    return(
        <form 
        className={style.novaTarefa}
        onSubmit={adicionarTarefa}
        >
            <div className={style.inputContainer}>
                <label htmlFor="tarefa">
                    Adicione um novo Estudo
                </label>
                <input 
                    type="text"
                    name="tarefa"
                    id="tarefa"
                    placeholder="O que você quer estudar"
                    value={tarefa.tarefa}
                    onChange={evento => setTarefa({ ...tarefa, tarefa: evento.target.value})}
                    required
                />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="tempo">
                    Tempo
                </label>
                <input 
                    type="time"
                    step="1"
                    name="tempo"
                    id="tempo"
                    value={tarefa.tempo}
                    onChange={evento => setTarefa({ ...tarefa, tempo: evento.target.value})}
                    min="00:00:00"
                    max="01:30:00"
                    required 
                
                />
            </div>
            <Botao type='submit'>
                Adicionar
            </Botao>

        </form>
    )
}

export default Formulario