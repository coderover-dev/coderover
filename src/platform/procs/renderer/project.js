// In renderer process (web page).
window.ipcRenderer.on(
    'project-opened', (event, arg) => {
        console.log("project opened");
        console.log(arg)
    })


export function openProject() {
    console.log("open prj:: begin")
    window.ipcRenderer.send('open-project', '')
    console.log("open prj:: end")
}
