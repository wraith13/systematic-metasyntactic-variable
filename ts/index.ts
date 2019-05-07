import { minamo } from "./minamo.js";

export module index
{
    const application = Object.freeze
    (
        {
            title: "Systematic Metasyntactic Variables",
            description: "What is this? : By providing multiple serieses of metasyntax variables, you can express the existence of different serieses when using metasyntax variables.",
            dataPath: "data",
        }
    );
    export const getList = (dictionary: { [key:string] : string }) =>
        Object.keys(dictionary).map(key => dictionary[key]).reduce((a, b) => a.concat(b), []);
    export const render = (list: string[]) => list.join(", ");
    export const onload = async (): Promise<void> =>
    {
        document.title = application.title;
        minamo.dom.appendChildren
        (
            document.body,
            [
                {
                    tag: "h1",
                    id: application.title.replace(/\W/, "-"),
                    children: application.title
                },
                application.description
            ]
        );
        const dataIndex = JSON.parse
        (
            await minamo.http.get(`${application.dataPath}/@index.json`)
        );
        minamo.dom.appendChildren
        (
            document.body,
            await Promise.all
            (
                Object.keys(dataIndex).map
                (
                    async key =>
                    [
                        {
                            tag: "h2",
                            id: key.replace(/\W/, "-"),
                            children: key
                        },
                        render
                        (
                            getList
                            (
                                JSON.parse
                                (
                                    await minamo.http.get(`${application.dataPath}/${dataIndex[key]}`)
                                )
                            )
                        )
                    ]
                )
            )
        );
    };
}
