module.exports = async function (request, showSpinner, hideSpinner) {
  const start = Date.now();
  const result = await request();
  const elapsed = Date.now() - start;

  if (elapsed >= 250) {
    showSpinner();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    hideSpinner();
  }

  return result;
};
