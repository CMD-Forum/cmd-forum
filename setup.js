function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

console.log('\x1b[33m%s\x1b[0m', 'Sorry, this isn\'t available yet.');
sleep(5000);