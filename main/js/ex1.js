function showJoke() {
    const jokes = [
        "Why did the computer go to the doctor? Because it had a virus!",
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why was the JavaScript developer sad? Because he didn't 'null' his feelings.",
        "Why did the web developer leave the restaurant? Because of the table layout."
    ];
    alert(jokes[Math.floor(Math.random() * jokes.length)]);
}


function changeBgColor() {
    document.body.style.background = `hsl(${Math.random()*360}, 70%, 85%)`;
}



let count = 0;
function showCount() {
    count++;
    alert('You clicked ' + count + ' times!');
}

function showClock() {
    let clock = document.getElementById('clock');
    if (!clock) {
        clock = document.createElement('div');
        clock.id = 'clock';
        clock.style.position = 'fixed';
        clock.style.top = '20px';
        clock.style.right = '20px';
        clock.style.background = '#fffbe6';
        clock.style.padding = '12px 24px';
        clock.style.borderRadius = '12px';
        clock.style.fontSize = '1.5em';
        clock.style.boxShadow = '0 2px 8px #ccc';
        document.body.appendChild(clock);
    }
    function updateClock() {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();
    }
    updateClock();
    clearInterval(window.clockInterval);
    window.clockInterval = setInterval(updateClock, 1000);
}
// Use: <button onclick="showClock()">Show Clock</button>
function emojiShower() {
    const emojis = ['1','😂','🌈','🍕','🚀','🐱','💡','🏖️','🍔','😎'];
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random()*100 + '%';
        emoji.style.top = Math.random()*100 + '%';
        emoji.style.fontSize = (Math.random()*2+1) + 'em';
        emoji.style.zIndex = 9999;
        emoji.style.pointerEvents = 'none';
        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), 1200);
    }
}
// Use: <button onclick="emojiShower()">Emoji Shower</button>
