

const filenameToRetrieve = "account11.json";

function writeJSONToFile(data)
{
    const jsonData = JSON.stringify(data);

    return new Promise((resolve, reject) =>
    {
        window.webkitRequestFileSystem(
            window.PERSISTENT,
            5 * 1024 * 1024, // 5MB storage space (change as needed)
            function (fileSystem)
            {
                fileSystem.root.getFile(
                    filenameToRetrieve,
                    { create: true },
                    function (fileEntry)
                    {
                        fileEntry.createWriter(
                            function (fileWriter)
                            {
                                fileWriter.onwriteend = function ()
                                {
                                    resolve(true);
                                };
                                fileWriter.onerror = function (e)
                                {
                                    reject(false);
                                };
                                const blob = new Blob([jsonData], { type: "application/json" });
                                fileWriter.write(blob);
                            },
                            function ()
                            {
                                reject(false);
                            }
                        );
                    },
                    function ()
                    {
                        reject(false);
                    }
                );
            },
            function ()
            {
                reject(false);
            }
        );
    });
}

function readJSONFile()
{
    return new Promise((resolve, reject) =>
    {
        window.webkitRequestFileSystem(
            window.PERSISTENT,
            5 * 1024 * 1024, // 5MB storage space (change as needed)
            function (fileSystem)
            {
                fileSystem.root.getFile(
                    filenameToRetrieve,
                    { create: false },
                    function (fileEntry)
                    {
                        fileEntry.file(function (file)
                        {
                            const reader = new FileReader();
                            reader.onloadend = function ()
                            {
                                const jsonData = JSON.parse(reader.result);
                                resolve(jsonData);
                            };
                            reader.readAsText(file);
                        });
                    },
                    function ()
                    {
                        reject(false);
                    }
                );
            },
            function ()
            {
                reject(false);
            }
        );
    });
}
