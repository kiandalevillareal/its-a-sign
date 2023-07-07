


const mobileLogger = document.getElementById("mobile-logger");
const filenameToRetrieve = "account24.json";

function writeJSONToFile(data)
{
    const jsonData = JSON.stringify(data);

    if (isPlatformAndroid())
    {
        return writeJSONToFileToAndroid(jsonData);
    } else
    {
        return writeJSONToFileToBrowser(jsonData);
    }
}

function isPlatformAndroid()
{
    return /android/i.test(navigator.userAgent);
}

// Function to check if running in Cordova environment
function isCordova()
{
    return typeof cordova !== "undefined";
}


function writeJSONToFileToAndroid(data)
{
    mobileLogger.textContent = mobileLogger.textContent + "\n" + "WA";
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
                                fileWriter.onerror = function (error)
                                {
                                    reject(false);
                                };
                                const blob = new Blob([jsonData], { type: "application/json" });
                                fileWriter.write(blob);
                            },
                            function (error)
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
    mobileLogger.textContent = mobileLogger.textContent + "\n" + "WB";
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
                                fileWriter.onerror = function (error)
                                {
                                    reject(false);
                                };
                                const blob = new Blob([jsonData], { type: "application/json" });
                                fileWriter.write(blob);
                            },
                            function (error)
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
    if (isPlatformAndroid())
    {
        return readJSONFromFileAndroid();
    } else
    {
        return readJSONFromFileWeb();
    }
}

// Function to read JSON data from Android persistent data path
function readJSONFromFileAndroid()
{
    mobileLogger.textContent = mobileLogger.textContent + "\n" + "RA";
    return new Promise((resolve, reject) =>
    {
        window.resolveLocalFileSystemURL(
            cordova.file.dataDirectory,
            function (dirEntry)
            {
                dirEntry.getFile(
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
                    function (error)
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

function readJSONFromFileWeb()
{
    mobileLogger.textContent = mobileLogger.textContent + "\n" + "RB";
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
                    function (error)
                    {
                        reject(false);
                    }
                );
            },
            function (error)
            {
                reject(false);
            }
        );
    });
}



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
