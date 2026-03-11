let isCopied = false;

function updateOutput() {
  const x = (f => f(f, Math.floor(Date.now() / 10)))((f, n) => n < 26 ? (n + 10).toString(36) : f(f, Math.floor(n / 26)) + (n % 26 + 10).toString(36));

  const outputElement = document.getElementById('output').querySelector('span');
  outputElement.textContent = x;
}

function copyToClipboard() {
  const outputContainer = document.getElementById('output');
  const outputSpan = outputContainer.querySelector('span');
  const text = outputSpan.textContent;

  navigator.clipboard.writeText(text).then(() => {
    isCopied = true;

    outputContainer.classList.add('copied');
    outputSpan.textContent = 'Copied!';

    setTimeout(() => {
      isCopied = false;
      outputContainer.classList.remove('copied');
      updateOutput();
    }, 2000);
  });
}

setInterval(() => {
  if (!isCopied) {
    updateOutput();
  }
}, 100);

document.getElementById('output').addEventListener('click', copyToClipboard);

document.querySelectorAll('textarea').forEach(textarea => {
  textarea.addEventListener('click', () => {
    textarea.select();
  });
});

updateOutput();
