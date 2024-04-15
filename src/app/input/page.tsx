"use client"

import React, {useState} from "react";

export default function Input() {

    const [answer, setAnswer] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData: FormData = new FormData(e.currentTarget);
        fetch("api/", {
            method: "POST",
            body: formData,
        })
            .then(async response => setAnswer(await response.json()))
            .catch(error => console.log(error));
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col rounded max-w-[500px] mb-10 mx-auto space-y-2"
            >
                <input
                    type="text"
                    name="question"
                    id="question"
                    placeholder="Question"
                    className="border rounded h-10 px-3 text-black"
                    required
                />
                <button
                    type="submit"
                    className="bg-amber-400 disabled:bg-amber-100 transition text-white rounded py-2 px-3"
                >
                    Send your question
                </button>
            </form>
            <div>
                {answer}
            </div>
        </div>
    )
}