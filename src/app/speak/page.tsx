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

  }

  const listen = () => {
    const tekscior = "odpowiedź"
    let utterance = new SpeechSynthesisUtterance(tekscior);  
    speechSynthesis.speak(utterance);
  }

  return (
    <div className="main">
      <p className="header">Wygenerowany tekst:</p>
      <div className="chat">
        <textarea className="zapytanie"  value={listening ? transcript : editableTranscript } onChange={(e) => setEditableTranscript(e.target.value)}></textarea>
        <div className="odpytanie">
          <button className="speaker"
          onClick={listen}
          >
          <Image src="/./images/speaker.png" width={25} height={25} alt="głośnik" />
          </button>
        </div>
      </div>
      <div className="buttons">
        <button className="button" onClick={reset}>Resetuj</button>
        <button className="button" onClick={sendQuery}>Wyślij</button>
        <button 
        className={`dictaphone ${listening ? 'dictaphoneActive' : ''}`}
        onMouseDown={handleHold}
        onMouseUp={handleRelease}
        >
          <Image src="/./images/microphone.png" width={50} height={50} alt="mikrofon" />
        </button>
      </div>
        <p className="">Mikrofon: {listening ? 'Mów teraz' : 'wyłączony'}</p>
      <div className="">
        {/* <button className="btn btn-primary btn-sm" onClick={SpeechRecognition.startListening}>Start</button>
        <button className="btn btn-secondary btn-sm" onClick={SpeechRecognition.stopListening}>Stop</button>
        <button className="btn btn-accent btn-sm" onClick={resetTranscript}>Reset</button> */}
      </div>
    </div>
  );
}