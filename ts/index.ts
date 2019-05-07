import { minamo } from "./minamo.js";

export module index
{
    export const onload = async (): Promise<void> =>
    {
        const title = "Systematic Metasyntactic Variables";
        document.title = title;
        minamo.dom.appendChildren
        (
            document.body,
            [
                {
                    tag: "h1",
                    children: title
                }
            ]
        );
    };
}
