


const mobileLogger = document.getElementById("mobile-logger");
const filenameToRetrieve = "account17.json";

function writeJSONToFile(data)
{
    const jsonData = JSON.stringify(data);
    const isAndroid = isCordova() && device.platform.toLowerCase() === "android";

    if (isAndroid)
    {
        // Write to Android persistent data path using cordova-plugin-file
        console.log('using android');
        mobileLogger.textContent = mobileLogger.textContent + "\n" + "writing in android";
        return writeJSONToFileToAndroid(jsonData);
    } else
    {
        // Write to web environment persistent storage
        console.log('using browser');
        mobileLogger.textContent = mobileLogger.textContent + "\n" + "writing in browser";
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
                                fileWriter.onerror = function (error)
                                {
                                    mobileLogger.textContent = mobileLogger.textContent + "\n" + "WA1: " + error;
                                    reject(false);
                                };
                                const blob = new Blob([jsonData], { type: "application/json" });
                                fileWriter.write(blob);
                            },
                            function (error)
                            {
                                mobileLogger.textContent = mobileLogger.textContent + "\n" + "WA2: " + error;
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
                                fileWriter.onerror = function (error)
                                {
                                    mobileLogger.textContent = mobileLogger.textContent + "\n" + "WB1: " + error;
                                    reject(false);
                                };
                                const blob = new Blob([jsonData], { type: "application/json" });
                                fileWriter.write(blob);
                            },
                            function (error)
                            {
                                mobileLogger.textContent = mobileLogger.textContent + "\n" + "WB2: " + error;
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
    const isAndroid = isCordova() && device.platform.toLowerCase() === "android";

    if (isAndroid)
    {
        mobileLogger.textContent = mobileLogger.textContent + "\n" + "reading in android";
        return readJSONFromFileAndroid();
    } else
    {
        // Read from web environment persistent storage
        mobileLogger.textContent = mobileLogger.textContent + "\n" + "reading in browser";
        return readJSONFromFileWeb();
    }
}

// Function to check if running in Cordova environment
function isCordova()
{
    return typeof cordova !== "undefined";
}

// Function to read JSON data from Android persistent data path
function readJSONFromFileAndroid()
{
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

                        mobileLogger.textContent = mobileLogger.textContent + "\n" + "RA1: " + error;
                        reject(false);
                    }
                );
            },
            function ()
            {
                mobileLogger.textContent = mobileLogger.textContent + "\n" + "RA2: " + error;
                reject(false);
            }
        );
    });
}

function readJSONFromFileWeb()
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
                    function (error)
                    {
                        mobileLogger.textContent = mobileLogger.textContent + "\n" + "RB1: " + error;
                        reject(false);
                    }
                );
            },
            function (error)
            {
                mobileLogger.textContent = mobileLogger.textContent + "\n" + "RB2: " + error;
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
