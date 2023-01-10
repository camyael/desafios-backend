// la extencion .cjs hace que corra sin el type module, como una version anterior
// sin el config no lo interpretaba como archivo de configuracion, asi ejecuta sus opciones
module.exports = {
    apps: [
        {
            name: "ServidorFork",
            script: 'src/app.js',
            env: {
                PORT: 8080
            }
        },
        {
            name: "ServidorClusterizado",
            script: 'src/app.js',
            env: {
                PORT: 8081
            },
            exec_mode: "cluster",
            instances: 2
        },
        {
            name: "ServidorClusterizado2",
            script: 'src/app.js',
            env: {
                PORT: 8082
            },
            exec_mode: "cluster",
            instances: 2
        },
        {
            name: "ServidorClusterizado3",
            script: 'src/app.js',
            env: {
                PORT: 8083
            },
            exec_mode: "cluster",
            instances: 2
        },
        {
            name: "ServidorClusterizado4",
            script: 'src/app.js',
            env: {
                PORT: 8084
            },
            exec_mode: "cluster",
            instances: 2
        },
        {
            name: "ServidorClusterizado5",
            script: 'src/app.js',
            env: {
                PORT: 8085
            },
            exec_mode: "cluster",
            instances: 2
        }
    ]
}