import { useState } from "react";
import { ReactElement } from "react";
import { Clipboard } from "@project-gauntlet/api/helpers";
import { Action, ActionPanel, Form } from "@project-gauntlet/api/components";

export default function OllamaView(): ReactElement {
    const [prompt, setPrompt] = useState<string>("");
    const [model, setModel] = useState<string>("llama3.1:8b");
    const [answer, setAnswer] = useState<string>("");
    const [busy, setBusy] = useState<boolean>(false);

    async function ask(): Promise<void> {
        setBusy(true);
        try {
            const res = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model: model, prompt: prompt, stream: false }),
            });
            const data = await res.json();
            setAnswer(typeof data.response === "string" ? data.response : JSON.stringify(data));
        } catch (e) {
            setAnswer("Ollama unreachable — is `ollama serve` running? " + String(e));
        } finally {
            setBusy(false);
        }
    }

    return (
        <Form
            isLoading={busy}
            actions={
                <ActionPanel>
                    <Action label="Ask" onAction={ask} />
                    <Action
                        label="Copy answer"
                        onAction={async () => {
                            await Clipboard.writeText(answer);
                        }}
                    />
                </ActionPanel>
            }
        >
            <Form.TextField label="Model" value={model} onChange={setModel} />
            <Form.TextField label="Prompt" value={prompt} onChange={setPrompt} />
            <Form.TextField label="Answer" value={answer} onChange={() => {}} />
        </Form>
    );
}
