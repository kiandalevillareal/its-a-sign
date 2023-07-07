

const filenameToRetrieve = "account14.json";

function writeJSONToFile(data)
{
    const jsonData = JSON.stringify(data);
    const isAndroid = isCordova() && device.platform.toLowerCase() === "android";

    if (isAndroid)
    {
        // Write to Android persistent data path using cordova-plugin-file
        console.log('using android');
        return writeJSONToFileToAndroid(jsonData);
    } else
    {
        // Write to web environment persistent storage
        console.log('using browser');
        return writeJSONToFileToBrowser(jsonData);
    }
}

// Function to check if running in Cordova environment
function isCordova()
{
    return typeof cordova !== "undefined";
}


function writeJSONToFileToAndroid(data)
{
    const jsonData = JSON.stringify(data);
    const fileData = cordova.file.dataDirectory; // Persistent data path

    return new Promise((resolve, reject) =>
    {
        window.resolveLocalFileSystemURL(
            fileData,
            function (dirEntry)
            {
                dirEntry.getFile(
                    filenameToRetrieve,
                    { create: true, exclusive: false },
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
function writeJSONToFileToBrowser(data)
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


// const filenameToRetrieve = "account13.json";

// function writeJSONToFile(data)
// {
//     const jsonData = JSON.stringify(data);

//     return new Promise((resolve, reject) =>
//     {
//         window.webkitRequestFileSystem(
//             window.PERSISTENT,
//             5 * 1024 * 1024, // 5MB storage space (change as needed)
//             function (fileSystem)
//             {
//                 fileSystem.root.getFile(
//                     filenameToRetrieve,
//                     { create: true },
//                     function (fileEntry)
//                     {
//                         fileEntry.createWriter(
//                             function (fileWriter)
//                             {
//                                 fileWriter.onwriteend = function ()
//                                 {
//                                     resolve(true);
//                                 };
//                                 fileWriter.onerror = function (e)
//                                 {
//                                     reject(false);
//                                 };
//                                 const blob = new Blob([jsonData], { type: "application/json" });
//                                 fileWriter.write(blob);
//                             },
//                             function ()
//                             {
//                                 reject(false);
//                             }
//                         );
//                     },
//                     function ()
//                     {
//                         reject(false);
//                     }
//                 );
//             },
//             function ()
//             {
//                 reject(false);
//             }
//         );
//     });
// }

// function readJSONFile()
// {
//     return new Promise((resolve, reject) =>
//     {
//         window.webkitRequestFileSystem(
//             window.PERSISTENT,
//             5 * 1024 * 1024, // 5MB storage space (change as needed)
//             function (fileSystem)
//             {
//                 fileSystem.root.getFile(
//                     filenameToRetrieve,
//                     { create: false },
//                     function (fileEntry)
//                     {
//                         fileEntry.file(function (file)
//                         {
//                             const reader = new FileReader();
//                             reader.onloadend = function ()
//                             {
//                                 const jsonData = JSON.parse(reader.result);
//                                 resolve(jsonData);
//                             };
//                             reader.readAsText(file);
//                         });
//                     },
//                     function ()
//                     {
//                         reject(false);
//                     }
//                 );
//             },
//             function ()
//             {
//                 reject(false);
//             }
//         );
//     });
// }
