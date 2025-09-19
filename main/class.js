function downloadFile(filename, content, type="text/plain") {
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }


    document.getElementById("download-html").onclick = () => {
      fetch("index.html") 
        .then(r => r.text())
        .then(text => {
          downloadFile("my-page.html", text, "text/html");
        });
    };

    document.getElementById("download-css").onclick = () => {
      fetch("class.css")
        .then(r => r.text())
        .then(text => {
          downloadFile("my-style.css", text, "text/css");
        });
    };
