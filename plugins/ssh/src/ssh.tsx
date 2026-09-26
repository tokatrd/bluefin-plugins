import { Clipboard, GeneratorContext } from "@project-gauntlet/api/helpers";

type Prefs = {
    hosts: string;
};

export default function SshGenerator({ add, entrypointPreferences }: GeneratorContext<Record<string, never>, Prefs>): void {
    const hosts = (entrypointPreferences.hosts || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    for (const host of hosts) {
        add(`ssh-${host}`, {
            name: `SSH ${host}`,
            actions: [
                {
                    label: "Copy ssh command",
                    run: async () => {
                        await Clipboard.writeText(`ssh ${host}`);
                    },
                },
            ],
        });
    }
}
