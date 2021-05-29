function handleFatalError(error) {
    console.error(error.message);
    console.error(error.stack);

}

module.exports = handleFatalError;