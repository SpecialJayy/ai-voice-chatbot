//@ts-nocheck
"use client"
import Image from "next/image"
import 'regenerator-runtime/runtime'
import { FC, useState } from "react"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { calculateOverrideValues } from "next/dist/server/font-utils"

interface TextProps {}

export default function Home() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()
  // const startListening = () => {SpeechRecognition.startListening({ continuous: true });}
  // const stopListening = () => SpeechRecognition.stopListening

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>
  }

  const [editableTranscript, setEditableTranscript] = useState('')

  const reset = () => {
    console.log("reset")
    setEditableTranscript("")
    resetTranscript
  }

  const handleHold = () => {
    reset
    SpeechRecognition.startListening({ continous: true });
  }

  const handleRelease = () =>{
    SpeechRecognition.stopListening({ continous: true })
    console.log("stop")
    console.log(transcript)
    setEditableTranscript(transcript);
  }

  const sendQuery = () => {
    console.log()
  }

  // let message= "Hello World";
  // let utterance = new SpeechSynthesisUtterance(message);  
  // speechSynthesis.speak(utterance);

  return (
    <div className="main">
      <p className="header">Wygenerowany tekst:</p>
      <textarea className="zapytanie"  value={listening ? transcript : editableTranscript } onChange={(e) => setEditableTranscript(e.target.value)}></textarea>
      <div className="buttons">
        <button className="button" onClick={reset}>Resetuj</button>
        <button className="button" onClick={sendQuery}>Wyślij</button>
      </div>
        <p className="">Mikrofon: {listening ? 'Mów teraz' : 'wyłączony'}</p>
      <div className="">
        <button 
        className={`dictaphone ${listening ? 'dictaphoneActive' : ''}`}
        onMouseDown={handleHold}
        onMouseUp={handleRelease}
        >
          <Image src="/./images/microphone.png" width={100} height={100} alt="mikrofon" />
        </button>

        {/* <button className="btn btn-primary btn-sm" onClick={SpeechRecognition.startListening}>Start</button>
        <button className="btn btn-secondary btn-sm" onClick={SpeechRecognition.stopListening}>Stop</button>
        <button className="btn btn-accent btn-sm" onClick={resetTranscript}>Reset</button> */}
      </div>
    </div>
  );
}