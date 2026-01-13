window.location.href = "career/career.html";
function downloadFile(filename, content, type="text/plain") {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("download-all").onclick = () => {
        fetch("home.html") 
            .then(r => r.text())
            .then(text => {
                downloadFile("my-page.html", text, "text/html");
            });
        fetch("home.css")
            .then(r => r.text())
            .then(text => {
                downloadFile("my-style.css", text, "text/css");
            });
    };
});