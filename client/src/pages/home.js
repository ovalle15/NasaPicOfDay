window.renderApp = async () => {
    const root = document.getElementById('my-little-app-main');

    root.insertAdjacentHTML(
        'beforeend',
        `<h1>'WEEEE RENDERING!'</h1><p>Rendered on the client side.</p>`,
    );
}