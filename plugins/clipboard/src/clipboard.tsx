import { useState } from "react";
import { ReactElement } from "react";
import { Clipboard } from "@project-gauntlet/api/helpers";
import { ActionPanel, List } from "@project-gauntlet/api/components";

export default function ClipboardView(): ReactElement {
    const [last, setLast] = useState<string>("(nothing read yet)");

    return (
        <List
            actions={
                <ActionPanel>
                    <ActionPanel.Action
                        label={"Run"}
                        onAction={async (id) => {
                            switch (id) {
                                case "read": {
                                    setLast(await Clipboard.readText());
                                    break;
                                }
                                case "write": {
                                    await Clipboard.writeText(last);
                                    break;
                                }
                                case "clear": {
                                    await Clipboard.clear();
                                    setLast("(cleared)");
                                    break;
                                }
                            }
                        }}
                    />
                </ActionPanel>
            }
        >
            <List.Item id={"last"} title={last} />
            <List.Item id={"read"} title={"Read text into the item above"} />
            <List.Item id={"write"} title={"Write the text above back to clipboard"} />
            <List.Item id={"clear"} title={"Clear the clipboard"} />
        </List>
    );
}
